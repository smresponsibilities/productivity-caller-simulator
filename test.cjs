const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
const elements = new Map();
function element() {
  return {children: [], style: {}, attributes: {}, textContent: '', innerHTML: '',
    classList: {add(){}, remove(){}},
    appendChild(child){this.children.push(child)}, insertBefore(child){this.children.unshift(child)},
    setAttribute(k,v){this.attributes[k]=v}, getAttribute(k){return this.attributes[k]}};
}
const document = {getElementById(id){if(!elements.has(id)) elements.set(id,element()); return elements.get(id)},
  createElement: element, createTextNode: text => ({textContent:text}), documentElement:element()};
const pending = new Map(); let id=0;
vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], {
  document, Date, matchMedia:()=>({matches:false}),
  setTimeout(fn){pending.set(++id,fn);return id}, clearTimeout(id){pending.delete(id)}
});
const get = id => document.getElementById(id);
const click = (id,label) => {const button=get(id).children.findLast(x=>x.textContent===label); assert.ok(button,label); button.onclick()};
assert.match(get('tbl').innerHTML, /Feature.*Productivity Caller.*TickTick.*Todoist.*Google Tasks/);
for(const feature of ['Alert Type','Lockscreen Wake','100% Offline','Subscription Cost','55 compiled']) assert.ok(get('tbl').innerHTML.includes(feature),feature);
click('ctrl','Fire reminder'); assert.match(get('callSub').textContent,/attempt 1 of 3/);
click('ctrl','Decline'); assert.equal(pending.size,1);
click('apps','Todoist'); assert.equal(pending.size,0);
click('ctrl','Fire reminder'); click('ctrl','Swipe away'); assert.match(get('verdict').textContent,/real apps may support repeat/);
click('apps','Productivity Caller'); click('ctrl','Fire reminder'); click('ctrl','Answer'); assert.equal(pending.size,0);
click('ctrl','Run again'); click('ctrl','Fire reminder'); assert.match(get('callSub').textContent,/attempt 1 of 3/);
click('prefs','Privacy and offline'); assert.match(get('tbl').innerHTML,/class="hl"/);
get('theme').onclick(); assert.equal(document.documentElement.getAttribute('data-theme'),'dark');
assert.equal((html.match(/<h2 /g)||[]).length,4);
for(const section of ['The Core Problem: Notification Blindness','Feature Comparison Matrix','Under the Hood &amp; Technical Metrics','Canonical Source &amp; Author Credit']) assert.ok(html.includes(section));
console.log('PASS: matrix, sections, app switching, timer cancellation, answer, retry reset, filters and theme');
