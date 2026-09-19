'use client'
import Link from 'next/link'
import {useEffect,useMemo,useState} from 'react'

const items=['Problem','Customer','Market evidence','Offer','Pricing','Product or service','Brand and positioning','Acquisition strategy','Sales process','Financial model','AI systems','Customer feedback','90-day plan']

type Entry={done:boolean;evidence:string;decision:string;next:string}
const blank=():Entry=>({done:false,evidence:'',decision:'',next:''})

export default function Capstone(){
 const[entries,setEntries]=useState<Entry[]>(Array(13).fill(null).map(blank))
 const[ready,setReady]=useState(false)
 useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem('aisy_capstone_v2')||'null');if(Array.isArray(saved)&&saved.length===13)setEntries(saved)}finally{setReady(true)}},[])
 const save=(next:Entry[])=>{setEntries(next);localStorage.setItem('aisy_capstone_v2',JSON.stringify(next))}
 const update=(i:number,key:keyof Entry,value:string|boolean)=>{const n=entries.map((e,j)=>j===i?{...e,[key]:value}:e);save(n)}
 const completed=entries.filter(e=>e.done).length
 const pct=Math.round(completed/items.length*100)
 const canFinish=entries.every(e=>e.done&&e.evidence.trim()&&e.decision.trim()&&e.next.trim())
 return <div className="shell">
  <nav className="nav"><Link className="brand" href="/">AI IS YOUR SUPERPOWER<span>.</span></Link><div className="navlinks"><Link href="/dashboard">Dashboard</Link><Link href="/curriculum">Curriculum</Link></div></nav>
  <main className="section">
   <div className="eyebrow">FINAL PROJECT</div><h1>THE CAPSTONE</h1>
   <p className="lead muted">Turn everything you learned into one operating blueprint. A checkbox does not count by itself: every section needs evidence, a decision, and a next action.</p>
   <div className="stats"><div className="stat"><strong>{completed}/13</strong><span className="muted">sections complete</span></div><div className="stat"><strong>{pct}%</strong><span className="muted">capstone progress</span><div className="progressbar"><i style={{width:pct+'%'}}/></div></div><div className="stat"><strong>{canFinish?'READY':'BUILDING'}</strong><span className="muted">capstone status</span></div></div>
   <div className="checklist">
    {items.map((x,i)=>{const e=entries[i];return <section className="checkitem" key={x}>
      <button onClick={()=>update(i,'done',!e.done)} style={{background:'none',border:0,color:'inherit',padding:0,cursor:'pointer',fontWeight:800,fontSize:'inherit'}}><b>{e.done?'✓':'○'} {String(i+1).padStart(2,'0')}</b> · {x}</button>
      <div className="capstoneGrid" style={{marginTop:15}}>
       <label><span className="eyebrow">EVIDENCE</span><textarea value={e.evidence} onChange={v=>update(i,'evidence',v.target.value)} placeholder="What did you observe, measure, test, or collect?" /></label>
       <label><span className="eyebrow">DECISION</span><textarea value={e.decision} onChange={v=>update(i,'decision',v.target.value)} placeholder="What are you choosing based on that evidence?" /></label>
      </div>
      <label style={{display:'block',marginTop:12}}><span className="eyebrow">NEXT ACTION</span><textarea style={{minHeight:90}} value={e.next} onChange={v=>update(i,'next',v.target.value)} placeholder="What will you do next, and by when?" /></label>
    </section>})}
   </div>
   <div className="quote" style={{marginTop:30}}>Your capstone is finished when every section contains evidence, a decision, and a next action.<small>Build it. Test it. Improve it.</small></div>
   <Link className="btn" href="/dashboard">Return to your build room →</Link>
  </main>
 </div>
}