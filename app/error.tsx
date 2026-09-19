'use client'

import {useEffect} from 'react'

export default function GlobalError({error,reset}:{error:Error&{digest?:string};reset:()=>void}){
 useEffect(()=>{console.error(error)},[error])
 return <main style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:24,background:'#090909',color:'#f4f1ea',fontFamily:'Arial,Helvetica,sans-serif'}}><div style={{maxWidth:620,textAlign:'center'}}><p style={{letterSpacing:'.18em',fontSize:11,color:'#9aa099',fontWeight:800}}>AI IS YOUR SUPERPOWER</p><h1 style={{fontSize:'clamp(42px,7vw,76px)',letterSpacing:'-.05em',margin:'12px 0'}}>Something went wrong.</h1><p style={{color:'#999',lineHeight:1.6}}>Your progress is saved in this browser. Try the page again before leaving the course.</p><button onClick={()=>reset()} style={{marginTop:20,padding:'14px 20px',background:'#b9ff66',color:'#090909',border:0,fontWeight:900,cursor:'pointer'}}>Try again →</button></div></main>
}