import LessonClient from './lesson-client'

type Lesson={title:string;module:string;lead:string;principle:string;examples:string[];exercise:string;challenge:string;check:string;answer:string;milestone:string;next?:string}

const modules:[string,string,string[]][]=[
['01','THE MINDSET',['Money follows value','Income vs. wealth','Skills vs. shortcuts','Why people pay','Finding expensive problems','Opportunity vs. hype','The 10-problem challenge']],
['02','MASTER AI',['What AI actually does','Context is the multiplier','Prompt architecture','Research without getting fooled','AI writing and analysis','Multimodal AI','Automation and agents','Build your personal AI operating system']],
['03','FIND THE BUSINESS',['Problem discovery','Customer discovery','Pain and urgency','Competitor intelligence','Market size and signal','Offer hypotheses','48-hour validation']],
['04','BUILD',['Choose the right build path','AI service offers','Digital products','Prototypes and MVPs','No-code and code','User feedback loops','Ship before perfect']],
['05','SELL',['Positioning','Craft the offer','Pricing','Outreach','Content that earns attention','Sales conversations','Objections and follow-up','First customer challenge']],
['06','BUILD THE MACHINE',['Map the workflow','SOPs','Lead tracking','Customer operations','AI automations','The owner dashboard']],
['07','SCALE',['Know your numbers','Retention','Delegation','Hiring vs. automation','Reinvestment','Scale without chaos']],
['08','THE PERSON BEHIND THE BUSINESS',['Nobody is coming','Love being a beginner','Rejection is information','Stop comparing chapter 1 to chapter 20','Discipline when motivation disappears','Your reputation is an asset','Do not let lifestyle eat your future','Looking rich vs. becoming wealthy','Build something you would be proud to own','When you finally believe you can']]
]
const slug=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
const all=modules.flatMap(([n,title,lessons])=>lessons.map((title,i)=>({title,module:n+' · '+title})))
const moduleAdvice:Record<string,string>={
'01':'Value comes before tactics. Train yourself to notice problems, outcomes and evidence.',
'02':'AI is leverage, not authority. Give it context, constrain it, inspect its work and verify important claims.',
'03':'Do not build from imagination. Talk to customers, study alternatives and collect evidence before committing.',
'04':'The goal is not a beautiful prototype. The goal is a useful solution that can be tested by a real person.',
'05':'Selling is helping someone make a clear decision. Be specific about the problem, outcome, proof and next step.',
'06':'Systems turn repeated effort into an operating advantage. Document the work before trying to automate it.',
'07':'Growth magnifies whatever is already there. Know your economics, protect quality and scale only what works.',
'08':'The business reflects the operator. Build discipline, reputation, patience and the ability to learn from reality.'
}
function buildLesson(title:string,module:string,index:number):Lesson{
 const num=module.split(' ')[0]
 const lower=title.toLowerCase()
 const principle=moduleAdvice[num]||'Make the work concrete, test it in reality and let evidence change your mind.'
 const isAI=num==='02',isSales=num==='05',isBuild=num==='04',isScale=num==='07',isMind=num==='01'
 let exercise=''
 if(isAI) exercise='Open your current AI tool and run a small test related to "'+title+'". Record the input, output, what was useful, what was wrong or uncertain, and what you changed on the second attempt.'
 else if(isSales) exercise='Write a one-page version of your '+lower+' for your chosen customer. Include the problem, desired outcome, offer, proof you need, and one clear next step.'
 else if(isBuild) exercise='Define the smallest useful artifact for '+lower+'. Write who will use it, the job it performs, what “useful” means, and the fastest way to put it in front of one real person.'
 else if(isScale) exercise='Take one repeated part of your business plan and document its inputs, steps, owner, time required, quality standard and measurable output. Identify the first constraint you would fix before adding volume.'
 else if(isMind) exercise='Write three concrete observations connected to '+lower+'. For each, name the person affected, the cost, the current workaround, and the evidence you have versus what you are assuming.'
 else exercise='Create a one-page working note for '+lower+'. Define the objective, people involved, current process, desired outcome, biggest unknown and next experiment.'
 return {title,module,lead:'This lesson is designed to move you from knowing a concept to using it. '+principle,principle,examples:['A weak approach treats '+lower+' as an idea to admire. A strong approach turns it into a decision, artifact or experiment.','If the first attempt fails, that is information. Keep the evidence, identify the cause and improve the next attempt.'],exercise,challenge:'Finish the exercise before you continue. Then show the result to someone who can give you honest feedback—or test it against reality yourself.',check:'What is the operator’s job in '+lower+'?',answer:'Turn the concept into a concrete action, gather evidence, verify the result and improve based on what reality shows you.',milestone:'You are done when you have a saved artifact or experiment, a result you can inspect, and one specific next action.',next:all[index+1]?slug(all[index+1].title):undefined}
}
const custom:Record<string,Partial<Lesson>>={
'money-follows-value':{lead:'If you remember one thing from this course, remember this: money is a scoreboard for value exchanged—not a reward for wanting it badly.',principle:'Stop asking “How can I make money?” Start asking “What valuable outcome can I create for someone else?”',exercise:'List five situations where someone is already spending money to solve a problem. Write the outcome they are actually buying.',challenge:'Find one person or business today and ask what costs them time, money or stress every week. Do not pitch anything.',milestone:'You are done when you have five paid problems and one customer conversation written down.'},
'income-vs-wealth':{lead:'High income can change your life. Wealth is different: it is what you own, what it produces and how durable that production is.',principle:'Income is a flow. Wealth is the accumulation of assets, skills, relationships and systems that can keep producing value.'},
'skills-vs-shortcuts':{lead:'Tools change. Skills compound. The goal is not to memorize where a button lives; it is to become dangerous at solving problems.',principle:'Learn principles deeply enough that a new tool becomes an advantage instead of a reset.'},
'why-people-pay':{lead:'People rarely buy a feature. They buy a better future state: faster, safer, easier, cheaper, more profitable, more enjoyable or less stressful.',principle:'Your offer becomes stronger when you can name the before-state, after-state and reason your solution can bridge the gap.'},
'finding-expensive-problems':{principle:'Problem quality matters before solution cleverness.'},
'opportunity-vs-hype':{principle:'Evidence beats excitement.'},
'the-10-problem-challenge':{principle:'Do not write ten business ideas. Write ten problems real people or businesses already experience.',milestone:'Ten problems documented, three conversations completed, one problem selected for deeper validation.'}
}
const data:Record<string,Lesson>={}
all.forEach((x,i)=>{const d=buildLesson(x.title,x.module,i);data[slug(x.title)]={...d,...(custom[slug(x.title)]||{})}})
export default function LessonPage({params}:{params:{slug:string}}){const d=data[params.slug]||{title:'Lesson not found',module:'COURSE',lead:'Return to the curriculum and choose a lesson.',principle:'Build before you browse.',examples:['Choose a lesson from the curriculum.','Your progress is saved in this browser.'],exercise:'Complete the selected lesson.',challenge:'Take one concrete action.',check:'What comes next?',answer:'Return to the curriculum.',milestone:'Keep moving.'};return <LessonClient slug={params.slug} data={d}/>}
