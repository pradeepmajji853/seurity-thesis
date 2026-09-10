import assert from 'node:assert/strict';
import {evaluateEvidence,runFixture,requestRecord,classroomPlan} from '../lib/simulation.ts';
let cases=0;
for(const attack of [false,true])for(const enforce of [false,true])for(const tools of [false,true])for(const witness of [false,true]){
 const r=runFixture({attack,enforce,tools,witness});
 assert.equal(r.verdict,!witness?'inconclusive':attack&&tools&&!enforce?'violated':'satisfied');
 assert.equal(new Set(r.events.map(e=>e.id)).size,r.events.length);
 for(const e of r.events)if(e.parent)assert.ok(r.events.some(parent=>parent.id===e.parent));
 assert.deepEqual(JSON.parse(JSON.stringify(r)),r);cases++;
}
assert.equal(evaluateEvidence({ready:false,complete:true,receipt:'exported',authorized:false}).execution,'invalid');
assert.equal(evaluateEvidence({ready:true,complete:false,receipt:'exported',authorized:false}).verdict,'violated');
assert.equal(evaluateEvidence({ready:true,complete:false,receipt:'empty',authorized:false}).verdict,'inconclusive');
assert.equal(evaluateEvidence({ready:true,complete:true,receipt:'missing',authorized:false}).verdict,'inconclusive');
assert.equal(requestRecord(1042,true).status,200);
assert.equal(requestRecord(1043,false).violation,true);
assert.equal(requestRecord(1043,true).status,403);
assert.equal(requestRecord(0,false).status,404);
assert.deepEqual(classroomPlan(50,20),{ready:10,queued:40,used:20});
assert.deepEqual(classroomPlan(1,100),{ready:1,queued:0,used:2});
console.log(`${cases} fixture configurations plus verdict precedence, authorization and capacity boundary checks passed.`);
