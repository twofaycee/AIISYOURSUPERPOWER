'use client'
import Link from 'next/link'
import {useEffect,useMemo,useState} from 'react'
const total=59
const modules=[['01','THE MINDSET',7,'/curriculum#module-01'],['02','MASTER AI',8,'/curriculum#module-02'],['03','FIND THE BUSINESS',7,'/curriculum#module-03'],['04','BUILD',7,'/curriculum#module-04'],['05','SELL',8,'/curriculum#module-05'],['06','BUILD THE MACHINE',6,'/curriculum#module-06'],['07','SCALE',6,'/curriculum#module-07'],['08','THE PERSON BEHIND THE BUSINESS',10,'/curriculum#module-08']]
export default function Dashboard(){
 const[done,setDone]=useState<string[]>([])
 useEffect(()=>setDone(JSON.parse(localStorage.getItem('a i s y s_completed')||'[]')),[])
 const pct=Math.round(done.length/total*100)
 return <div className="shell dash"><nav className="nav"><Link className="brand" href="/">AI IS YOUR SUPERPOWER<span>.</span></Link><div className="navlinks"><Link href="/curriculum">Curriculum</Link><Link href="/journal">Journal</Link><Link href="/capstone">Capstone</Link></div></nav>
 <main className="dashHero"><div className="eyebrow">YOUR BUILD ROOM</div><h1>Stop collecting information.<br/><em>Start creating evidence.</em></h1><p className="lead muted">One lesson. One action. One step closer to something real.</p>
 <div className="stats"><div className="stat"><strong>{pct}%</strong><span className="muted">course progress</span><div className="progressbar"><i style={{width:pct+'%'}}/></div></div><div className="stat"><strong>{done.length}</strong><span className="muted">lessons completed</span></div><div className="stat"><strong>{total-done.length}</strong><span className="muted">lessons remaining</span></div></div>
 <div className="card"><div className="eyebrow">START HERE</div><h2>Money follows value.</h2><p className="muted">Before tools, tactics and technology, learn how customers decide what is worth paying for.</p><Link className="btn" href="/lesson/money-follows-value">Open lesson →</Link></div>
 <section className="section"><div className="eyebrow">YOUR PATH</div><h2>Build. Sell. Scale.</h2><div className="grid">{modules.map(([n,t,count,href])=><Link className="card" href={href as string} key={n}><div className="eyebrow">MODULE {n} · {count} LESSONS</div><h3>{t}</h3><div className="progressbar"><i style={{width:'0%'}}/></div><p className="muted">Open module →</p></Link>)}</div></section>
 <section className="section"><div className="eyebrow">FINAL PROJECT</div><h2>Build something you can show.</h2><p className="muted">Your capstone turns the course into a real business blueprint: evidence, decisions and next actions.</p><Link className="btn" href="/capstone">Open the capstone →</Link></section>
 </main></div>
}