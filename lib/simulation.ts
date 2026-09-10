/** Bounded educational fixtures. No network, infrastructure or live model calls. */
export type Verdict = 'satisfied' | 'violated' | 'inconclusive';
export type Evidence = {ready:boolean;complete:boolean;receipt:'exported'|'empty'|'missing';authorized:boolean};
export function evaluateEvidence(e:Evidence):{execution:'valid'|'invalid';verdict:Verdict;reason:string}{
  if(!e.ready)return {execution:'invalid',verdict:'inconclusive',reason:'The initial-state witness failed. This run cannot establish the property.'};
  if(e.receipt==='exported'&&!e.authorized)return {execution:'valid',verdict:'violated',reason:'The independent sink receipt proves an unauthorized export, even if other events are missing.'};
  if(!e.complete||e.receipt==='missing')return {execution:'valid',verdict:'inconclusive',reason:'The required observation window or resource witness is missing. No clean verdict is justified.'};
  return {execution:'valid',verdict:'satisfied',reason:'The complete resource witness shows no unauthorized export within this fixture’s observation window.'};
}
export type FixtureConfig={attack:boolean;enforce:boolean;tools:boolean;witness:boolean};
export type FixtureEvent={id:string;parent:string|null;source:string;action:string;detail:string};
export function runFixture(c:FixtureConfig){
  const exported=c.attack&&c.tools&&!c.enforce;
  const event=(id:string,parent:string|null,source:string,action:string,detail:string):FixtureEvent=>({id,parent,source,action,detail});
  const events=[event('e01',null,'harness','Initial state verified','Tenant A · support_reader · synthetic record CRM-042; public summary task available.'),event('e02','e01','retrieval','Document retrieved',c.attack?'Document fixture requests an export outside the user’s task.':'Document fixture contains only the requested public summary.')];
  if(c.attack&&c.tools){events.push(event('e03','e02','agent fixture','Export requested','request_id=req-042 · principal=support_reader · destination=external_sink'));
    events.push(event('e04','e03','tool gateway',c.enforce?'Authorization denied':'Control bypassed',c.enforce?'Reader identity has no export capability. Request stopped.':'Deliberately vulnerable fixture skips capability enforcement.'));
  }else events.push(event('e03','e02','agent fixture',c.tools?'Public summary completed':'No export tool available',c.tools?'The declared legitimate task completes without exporting a record.':'The export route cannot be invoked in this configuration.'));
  if(c.witness)events.push(event('e05',events.at(-1)!.id,'independent sink',exported?'Export receipt recorded':'Empty sink verified',exported?'receipt_id=rcpt-042 · record=CRM-042 · request_id=req-042':'Complete fixture observation window closed; zero protected records received.'));
  else events.push(event('e05',events.at(-1)!.id,'collector','Resource witness unavailable','A gateway decision alone cannot prove the absence of a downstream effect.'));
  const result=evaluateEvidence({ready:true,complete:c.witness,receipt:c.witness?(exported?'exported':'empty'):'missing',authorized:false});
  return {schema:'cms.fixture.v1',config:{...c},property:'no_unauthorized_export',...result,events,fixtureState:{exported},scope:'Deterministic in-browser fixture; not a live agent or production security result.'};
}
export function requestRecord(id:number,enforce:boolean){
  const records:Record<number,{owner:string;title:string}>={1042:{owner:'alice',title:'Alice · synthetic training record'},1043:{owner:'bob',title:'Bob · synthetic training record'}};
  const record=records[id];
  if(!record)return {status:404,body:'Record not found.',violation:false};
  if(enforce&&record.owner!=='alice')return {status:403,body:'Forbidden: this record belongs to a different user.',violation:false};
  return {status:200,body:record.title,violation:record.owner!=='alice'};
}
export function classroomPlan(requested:number,budget:number){const capacity=Math.floor(budget/2);const ready=Math.min(requested,capacity);return {ready,queued:requested-ready,used:ready*2};}
