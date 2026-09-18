'use strict';
document.documentElement.classList.add('js');
const lang=document.documentElement.lang;
const copy={
 de:{title:'MEIN EINSTIEG · IORMETTI CONCEPTS',offer:'Fitness-Einzelcoaching · 100 € pro Stunde (60 Minuten)',focus:'Mein Fokus',rhythm:'Mein Rhythmus',note:'Was mir wichtig ist',disclaimer:'Coaching-Wunsch. Noch nicht versendet; kein Termin gebucht. Kontaktweg wird ergänzt.',ready:'Dein Coaching-Wunsch ist bereit. Lade ihn herunter; es wurde noch keine Anfrage versendet.',file:'Mein-Einstieg'},
 en:{title:'MY FIRST STEP · IORMETTI CONCEPTS',offer:'One-to-one fitness coaching · €100 per hour (60 minutes)',focus:'My focus',rhythm:'My schedule',note:'What matters to me',disclaimer:'Coaching preferences. Not sent; no session booked. Contact details will be added.',ready:'Your coaching preferences are ready to download. No enquiry has been sent.',file:'My-First-Step'},
 it:{title:'IL MIO PRIMO PASSO · IORMETTI CONCEPTS',offer:'Coaching fitness individuale · 100 € all’ora (60 minuti)',focus:'Il mio obiettivo',rhythm:'Il mio ritmo',note:'Cosa conta per me',disclaimer:'Preferenze per il coaching. Non inviate; nessuna sessione prenotata. Il contatto sarà aggiunto.',ready:'Le tue preferenze sono pronte da scaricare. Nessuna richiesta è stata inviata.',file:'Il-Mio-Primo-Passo'}
}[lang]||null;
const menuButton=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('#mobile-nav');
function closeMenu(restoreFocus=false){menuButton.setAttribute('aria-expanded','false');mobileNav.hidden=true;document.body.classList.remove('menu-open');if(restoreFocus)menuButton.focus();queueScroll();}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));mobileNav.hidden=!open;document.body.classList.toggle('menu-open',open);queueScroll();});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>closeMenu()));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden)closeMenu(true);if(event.key==='Tab'&&!mobileNav.hidden){const links=[menuButton,...mobileNav.querySelectorAll('a')];const first=links[0],last=links[links.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
window.matchMedia('(min-width:761px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
const motion=window.matchMedia('(prefers-reduced-motion:reduce)');
// One reveal per block. No nested transforms or repeated exit/entry animations.
document.querySelectorAll('.section h2,.principles article,.steps li,.section-label,.statement-content,.value-copy,.session-header').forEach(el=>{if(!el.closest('.reveal'))el.classList.add('reveal');});
document.querySelectorAll('.reveal .reveal').forEach(el=>el.classList.remove('reveal'));
let revealObserver;
if('IntersectionObserver'in window&&!motion.matches){
 document.body.classList.add('motion');
 revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});},{threshold:.01,rootMargin:'0px 0px 30px 0px'});
 document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
}
document.querySelectorAll('[data-goal]').forEach(link=>link.addEventListener('click',()=>{document.querySelectorAll('input[name="goal"]').forEach(input=>{input.checked=input.value===link.dataset.goal;});}));
let preparedNote='';
document.querySelector('#entry-form').addEventListener('submit',event=>{
 event.preventDefault();const data=new FormData(event.currentTarget);
 const chosen=event.currentTarget.querySelector('input[name="goal"]:checked');
 const goal=chosen?chosen.closest('label').querySelector('span').textContent:'';
 const rhythm=document.querySelector('#rhythm').selectedOptions[0].textContent;
 const note=String(data.get('note')||'').trim();
 preparedNote=[copy.title,copy.offer,'',copy.focus+': '+goal,copy.rhythm+': '+rhythm,...(note?[copy.note+': '+note]:[]),'',copy.disclaimer].join('\n');
 document.querySelector('#result-copy').textContent=goal+' · '+rhythm+'. '+copy.ready;
 const result=document.querySelector('#entry-result');result.hidden=false;result.focus({preventScroll:true});result.scrollIntoView({behavior:motion.matches?'instant':'smooth',block:'nearest'});
});
document.querySelector('#download-note').addEventListener('click',()=>{if(!preparedNote)return;const url=URL.createObjectURL(new Blob([preparedNote],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download=copy.file+'-Iormetti-Concepts.txt';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});
document.querySelector('#entry-form button[type=submit]').disabled=false;
// Language links retain the current section. Separate documents work without JavaScript.
document.querySelectorAll('.language-switch a').forEach(link=>link.addEventListener('click',()=>{link.hash=location.hash;}));
// Stable geometry: read everything before writes. Mobile has no scroll-linked image transforms.
const progressBar=document.querySelector('.reading-progress');
const pageHeader=document.querySelector('.header');
const coachingDock=document.querySelector('.coaching-dock');
let dockDismissed=false;
try{dockDismissed=sessionStorage.getItem('ic-dock-dismissed')==='1';}catch{}
coachingDock.hidden=dockDismissed;
coachingDock.querySelector('.dock-close').addEventListener('click',()=>{dockDismissed=true;try{sessionStorage.setItem('ic-dock-dismissed','1');}catch{}coachingDock.classList.remove('is-visible');coachingDock.hidden=true;});
const offerSection=document.querySelector('#angebot');
const heroSection=document.querySelector('.hero');
const desktopMotion=window.matchMedia('(min-width:1101px) and (pointer:fine)');
const animatedFrames=[...document.querySelectorAll('.statement,.value-photo,.track-interlude')];
const activeFrames=new Set();
let scrollFrame=0;
function renderScroll(){
 scrollFrame=0;
 const y=Math.max(0,window.scrollY),height=window.innerHeight;
 const max=document.documentElement.scrollHeight-height;
 const heroBottom=heroSection.getBoundingClientRect().bottom;
 const offerTop=offerSection.getBoundingClientRect().top;
 const positions=!motion.matches&&desktopMotion.matches?[...activeFrames].map(el=>({el,rect:el.getBoundingClientRect()})):[];
 const showDock=!dockDismissed&&heroBottom<-60&&offerTop>height&&!document.body.classList.contains('menu-open');
 pageHeader.classList.toggle('scrolled',y>24);
 coachingDock.classList.toggle('is-visible',showDock);
 if(motion.matches)return;
 progressBar.style.transform='scaleX('+Math.max(0,Math.min(1,max>0?y/max:0))+')';
 positions.forEach(({el,rect})=>{const phase=(height/2-(rect.top+rect.height/2))/(height+rect.height);el.style.setProperty('--parallax-y',Math.max(-12,Math.min(12,phase*24)).toFixed(2)+'px');});
}
function queueScroll(){if(!scrollFrame)scrollFrame=requestAnimationFrame(renderScroll);}
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)activeFrames.add(entry.target);else activeFrames.delete(entry.target);});queueScroll();},{rootMargin:'80px'});animatedFrames.forEach(el=>observer.observe(el));}
window.addEventListener('scroll',queueScroll,{passive:true});
window.addEventListener('resize',queueScroll,{passive:true});
window.addEventListener('load',queueScroll,{once:true});
if('ResizeObserver'in window)new ResizeObserver(queueScroll).observe(document.querySelector('main'));
desktopMotion.addEventListener('change',()=>{animatedFrames.forEach(el=>el.style.removeProperty('--parallax-y'));queueScroll();});
// A single short counter animation per quantity, with stable accessible final values.
const runningCounters=new Map();
const countEls=[...document.querySelectorAll('[data-count]')];
function finishCounter(el){const id=runningCounters.get(el);if(id)cancelAnimationFrame(id);runningCounters.delete(el);el.querySelector('span').textContent=el.dataset.count;}
let counterObserver;
if('IntersectionObserver'in window&&!motion.matches){
 counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  const el=entry.target;if(!entry.isIntersecting){if(runningCounters.has(el))finishCounter(el);return;}
  if(el.dataset.counted)return;el.dataset.counted='true';
  const value=Number(el.dataset.count),out=el.querySelector('span'),start=performance.now();
  const tick=now=>{if(motion.matches||document.hidden){finishCounter(el);return;}const t=Math.min(1,(now-start)/1100);out.textContent=String(Math.round(value*(1-Math.pow(1-t,3))));if(t<1)runningCounters.set(el,requestAnimationFrame(tick));else{finishCounter(el);counterObserver.unobserve(el);}};
  runningCounters.set(el,requestAnimationFrame(tick));
 }),{threshold:.7});countEls.forEach(el=>counterObserver.observe(el));
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)[...runningCounters.keys()].forEach(finishCounter);});
motion.addEventListener('change',()=>{if(motion.matches){document.body.classList.remove('motion');revealObserver?.disconnect();counterObserver?.disconnect();countEls.forEach(finishCounter);animatedFrames.forEach(el=>el.style.removeProperty('--parallax-y'));}queueScroll();});
queueScroll();
