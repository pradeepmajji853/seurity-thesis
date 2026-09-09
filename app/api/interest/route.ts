import {getRawDb} from '@/db';
import {interestSchema} from '@/lib/interest';
export async function POST(request:Request){
 const origin=request.headers.get('origin');
 if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'Please submit from the Labs website.'},{status:403});
 if(!request.headers.get('content-type')?.includes('application/json'))return Response.json({error:'Unsupported request format.'},{status:415});
 const reader=request.body?.getReader();if(!reader)return Response.json({error:'Missing registration details.'},{status:400});
 let bytes=0;const chunks:Uint8Array[]=[];
 while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.length;if(bytes>8192){await reader.cancel();return Response.json({error:'Registration is too long.'},{status:413})}chunks.push(value)}
 const raw=new Uint8Array(bytes);let offset=0;for(const c of chunks){raw.set(c,offset);offset+=c.length}
 let payload:unknown;try{payload=JSON.parse(new TextDecoder().decode(raw))}catch{return Response.json({error:'Invalid registration details.'},{status:400})}
 const parsed=interestSchema.safeParse(payload);if(!parsed.success)return Response.json({error:'Check your name, email, role and consent, then try again.'},{status:400});
 const p=parsed.data;if(p.website)return Response.json({ok:true});
 try{await getRawDb().prepare('INSERT INTO interests (id,name,email,role,organization,message,consent_version,created_at) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(email) DO NOTHING').bind(crypto.randomUUID(),p.name,p.email,p.role,p.organization,p.message,'labs-interest-v1',new Date().toISOString()).run();return Response.json({ok:true},{status:201,headers:{'Cache-Control':'no-store'}})}catch{console.error('Interest registration storage unavailable');return Response.json({error:'We could not save your interest. Your details are still here; please try again shortly.'},{status:503})}
}
