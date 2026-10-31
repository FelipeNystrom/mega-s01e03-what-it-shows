import{c as v,a as c,f as p}from"./D_5y8y9q.js";import{R as y}from"./CWWqOL8X.js";import{o as w,g,q as k,H as u,aF as _,w as h,i as x,v as T,j as R,t as D}from"./BYyude3B.js";import{i as F,l as A,s as S}from"./3wnuWTqM.js";import{C as j,Q as I}from"./BumWIXta.js";import{s as M}from"./wTHRPoO2.js";const $="0123456789ABCDEFGHJKMNPQRSTVWXYZ";function m(a,t){let e=t>>>0;for(let o=0;o<a.length;o++)e^=a.charCodeAt(o),e=Math.imul(e,16777619)>>>0;return e}function N(a){const t=a.trim(),e=m(t,2166136261),o=m(t,2654435769);let d=BigInt(e)<<8n|BigInt(o&255),r="";for(let n=0;n<8;n++)r=$[Number(d&31n)]+r,d>>=5n;return`DR-${r.slice(0,4)}-${r.slice(4)}`}var P=p('<p class="stamp svelte-1280m42">desk ref <b class="svelte-1280m42"> </b></p>'),B=p(`<p class="stamp missing svelte-1280m42">no desk ref: this page isn't signed (no <code>signature</code> in its frontmatter)</p>`);function C(a,t){w(t,!0);const e=_(()=>t.signature?N(t.signature):null);var o=v(),d=g(o);{var r=s=>{var i=P(),f=h(x(i)),b=T(f,!0);R(i),D(()=>M(b,u(e))),c(s,i)},n=s=>{var i=B();c(s,i)};F(d,s=>{u(e)?s(r):s(n,-1)})}c(a,o),k()}const l={layout:"runbook",title:"#4471 review · one queue, two date causes",owner:"FelipeNystrom",status:"reviewed",reviewed:"2026-10-31T00:00:00.000Z",signature:"FelipeNystrom · S01E03"},{layout:K,title:Q,owner:L,status:W,reviewed:Z,signature:J}=l;var q=p(`<h2>Finding: the merge concealed a second cause</h2> <p>The <a href="/kb/incidents/4471">original incident</a> says “one issue, one fix queued.” Its own
computed evidence contradicts that summary. A shared symptom—bookings on the wrong
date—is not a shared cause. Keep the parser investigation in <a href="https://github.com/FelipeNystrom/mega-s01e03-what-it-shows/issues/1" rel="nofollow">issue #1</a>, and
track the booking-form hint separately in <a href="https://github.com/FelipeNystrom/mega-s01e03-what-it-shows/issues/2" rel="nofollow">issue #2</a>.
Neither issue is evidence that a fix has shipped.</p> <h2>Recount from reports, not intake labels</h2> <p>The table below recomputes distinct report IDs, cause, intake-tag disagreement and
first/last receipt dates from the exported reports and tenant directory. Overlapping
export pages repeat IDs; repeated rows must not become additional customers or reports.
The same ID is counted once, not once per export row or once per matching subject.</p> <!> <p>The table’s “no ticket of its own” wording describes the original exported desk queue,
not the newly opened issue linked above. Its assignment of the majority to the old
incident is a bookkeeping convention, not proof that every report there has that cause.</p> <h3>Parser: day-first input interpreted month-first</h3> <p>The shared parser reads month before day. For a day-first tenant, app/email paths and
booking-v2 form input can therefore swap the intended month and day. Harbour Dental
is <code>en-GB</code>, booking-v2: <code>R-41200</code> describes 7 April becoming 4 July. Morrow Tax is <code>fr-FR</code>, booking-v2: <code>R-41205</code> describes 3 October becoming 10 March even though its
browser was <code>en-US</code> and intake called it <code>hint</code>. Tenant locale—not browser locale—is
the relevant setting. Correct the parser’s interpretation of the tenant’s input;
changing booking-v3’s hint does not repair this path.</p> <h3>Hint: booking-v3 instructs the wrong input order</h3> <p>For a day-first tenant, booking-v3 displays <code>MM/DD/YYYY</code> while the form reads the
input in the tenant’s day-first order. Following that instruction causes a different
swap. Copper Studio is <code>es-ES</code>, booking-v3: form report <code>R-41230</code> describes 6 January
becoming 1 June but was tagged <code>parser</code>. Alder Physio is <code>de-DE</code>, booking-v3: <code>R-41241</code> is another form-path example, with an <code>en-US</code> browser. Fix the displayed
instruction to agree with the tenant-aware form interpretation. Do not change this
form to parse month-first merely to make the incorrect hint true.</p> <p>The existing classifier uses tenant locale and form plus report channel: day-first
booking-v3 <strong>form</strong> reports are <code>hint</code>; other supported day-first paths are <code>parser</code>.
A booking-v3 tenant’s app report is not automatically a hint report. Intake tags are
initial guesses and must not be used to select either engineering fix.</p> <h2>Receipt time is not merge time</h2> <!> <p>The received series records when the desk first had each distinct report. The merged
series records when the desk attached it to this incident. The later bulk merge in
July is queue administration, not the onset of the product failures. For example, <code>R-41200</code> arrived on 1 April and was merged on 2 July; <code>R-41230</code> arrived on 17 April
and was also merged on 2 July. Use the table’s receipt ranges to describe each cause’s
observed history. Neither receipt dates nor a merge spike establish deployment dates
or the date the underlying bug was introduced.</p> <h2>What the one-day notes do—and do not—show</h2> <p>The table also renders the desk’s one-day-move notes under their tenant-classified
cause. For example, <code>R-41202</code> describes 11 May versus 12 May rather than an obvious
month/day swap. Preserve and investigate those descriptions; the existing classifier
still files them under <code>parser</code>. A desk note is not independent evidence of a third,
timezone-related product defect. Do not silently discard these reports or claim the
parser reproduction explains every detail of their bodies.</p> <h2>Repair the dedupe decision, not its history</h2> <p>The accepted <a href="/kb/triage/dedupe">triage page</a> follows <a href="/kb/decisions/0001-dedupe-by-subject">decision 0001</a>: normalize a subject and merge
without reading the body. The executable examples already refute that policy:</p> <ul><li>Alder Physio form versus app can share “Booking on the wrong date” but have different
causes: hint versus parser.</li> <li>Kettle Books app versus email can have different subjects but the same parser cause.</li> <li>Copper Studio and Morrow Tax form reports can share “Date is wrong” while using
different booking forms and therefore different causes.</li> <li><code>unknown.sender</code> cannot be assigned a cause from the tenant directory, even when
both subjects are identical.</li></ul> <p>This is a systemic desk merge error, not an additional date-product bug. For this
incident, dedupe exported rows by ID first, resolve the tenant, read the report and
channel, and compare the supported cause before merging. Subjects may help search;
they cannot authorize a merge. Group proven same-cause reports into their respective
issues, retain original IDs and receipt timestamps, and preserve a trace of the old
merge. Unknown tenants, unsupported locale/path combinations and contradictory
bodies need manual triage rather than a guess or an automatic merge.</p> <p>Leave the accepted ADR unchanged as a historical record of what the desk decided.
Record a superseding decision before treating the safer rule as accepted policy;
this signed review documents the contradiction and proposed correction, not a
retroactive rewrite of the old acceptance.</p> <!>`,1);function z(a,t){const e=A(t,["children","$$slots","$$events","$$legacy"]);y(a,S(()=>e,()=>l,{children:(o,d)=>{var r=q(),n=h(g(r),8);j(n,{ticket:4471});var s=h(n,16);I(s,{ticket:4471});var i=h(s,18);C(i,{get signature(){return J}}),c(o,r)},$$slots:{default:!0}}))}const V=Object.freeze(Object.defineProperty({__proto__:null,default:z,metadata:l},Symbol.toStringTag,{value:"Module"}));export{V as _,z as a};
