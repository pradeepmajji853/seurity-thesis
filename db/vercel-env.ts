// Next.js-only adapter, selected at build time. Secrets stay on the server.
// Sites uses the native cloudflare:workers module and its managed D1 binding.
function configuration(){
 const account=process.env.CLOUDFLARE_ACCOUNT_ID;
 const database=process.env.CLOUDFLARE_D1_DATABASE_ID;
 const token=process.env.CLOUDFLARE_D1_API_TOKEN;
 if(!account||!database||!token)return null;
 if(!/^[a-f0-9]{32}$/i.test(account)||! /^[a-f0-9-]{36}$/i.test(database))return null;
 return {account,database,token};
}
class Statement {
 constructor(private sql:string,private params:unknown[]=[]){ }
 bind(...params:unknown[]){return new Statement(this.sql,params)}
 async run(){
  const c=configuration();if(!c)throw new Error('Interest storage is not configured.');
  const res=await fetch(`https://api.cloudflare.com/client/v4/accounts/${c.account}/d1/database/${c.database}/query`,{method:'POST',headers:{Authorization:`Bearer ${c.token}`,'Content-Type':'application/json'},body:JSON.stringify({sql:this.sql,params:this.params}),signal:AbortSignal.timeout(10000),cache:'no-store'});
  if(!res.ok)throw new Error('Interest storage request failed.');
  const data=await res.json() as {success?:boolean;result?:{success?:boolean}[]};
  if(!data.success||!data.result?.length||data.result.some(r=>!r.success))throw new Error('Interest storage write failed.');
  return data.result[0];
 }
}
export const env={get DB(){return configuration()?{prepare:(sql:string)=>new Statement(sql)}:undefined}};
