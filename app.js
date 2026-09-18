'use strict';
document.documentElement.classList.add('js');
const menuButton=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('#mobile-nav');
function closeMenu(restoreFocus=false){menuButton.setAttribute('aria-expanded','false');mobileNav.hidden=true;document.body.classList.remove('menu-open');if(restoreFocus)menuButton.focus();}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));mobileNav.hidden=!open;document.body.classList.toggle('menu-open',open);});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>closeMenu()));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu(true);if(event.key==='Tab'&&!mobileNav.hidden){const links=[menuButton,...mobileNav.querySelectorAll('a')];const first=links[0],last=links[links.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
window.matchMedia('(min-width:761px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
document.querySelectorAll('.section h2,.principles article,.steps li,.section-label,.statement-content,.value-copy,.session-header').forEach(el=>el.classList.add('reveal'));
const motion=window.matchMedia('(prefers-reduced-motion:reduce)');
if('IntersectionObserver'in window&&!motion.matches){document.body.classList.add('motion');const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));}
document.querySelectorAll('[data-goal]').forEach(link=>link.addEventListener('click',()=>{document.querySelectorAll('input[name="goal"]').forEach(input=>{input.checked=input.value===link.dataset.goal;});}));
let preparedNote='';
document.querySelector('#entry-form').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);const goal=String(data.get('goal')||'');const rhythm=String(data.get('rhythm')||'');const note=String(data.get('note')||'').trim();preparedNote=['MEIN EINSTIEG · IORMETTI CONCEPTS','Fitness-Einzelcoaching · 100 € pro Stunde (60 Minuten)','','Mein Fokus: '+goal,'Mein Rhythmus: '+rhythm,...(note?['Was mir wichtig ist: '+note]:[]),'','Coaching-Wunsch. Noch nicht versendet; kein Termin gebucht. Kontaktweg wird ergänzt.'].join('\n');document.querySelector('#result-copy').textContent=goal+' · '+rhythm+'. Dein Coaching-Wunsch ist bereit. Lade ihn herunter; es wurde noch keine Anfrage versendet.';const result=document.querySelector('#entry-result');result.hidden=false;result.focus({preventScroll:true});result.scrollIntoView({behavior:motion.matches?'instant':'smooth',block:'nearest'});});
document.querySelector('#download-note').addEventListener('click',()=>{if(!preparedNote)return;const url=URL.createObjectURL(new Blob([preparedNote],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='Mein-Einstieg-Iormetti-Concepts.txt';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});

document.querySelector('#entry-form button[type=submit]').disabled=false;

// Scroll rendering is event-driven and coalesced into one frame; no scroll hijacking.
const progressBar=document.querySelector('.reading-progress');
const pageHeader=document.querySelector('.header');
const coachingDock=document.querySelector('.coaching-dock');
let dockDismissed=false;
try{dockDismissed=sessionStorage.getItem('ic-dock-dismissed')==='1';}catch{}
coachingDock.querySelector('.dock-close').addEventListener('click',()=>{
  dockDismissed=true;
  try{sessionStorage.setItem('ic-dock-dismissed','1');}catch{}
  coachingDock.classList.remove('is-visible');
  coachingDock.hidden=true;
});
const offerSection=document.querySelector('#angebot');
const heroSection=document.querySelector('.hero');
const animatedFrames=[...document.querySelectorAll('.portrait-hero,.person-portrait,.statement,.value-photo,.track-interlude')];
const activeFrames=new Set();
let scrollFrame=0;
function renderScroll(){
  scrollFrame=0;
  const y=window.scrollY;
  pageHeader.classList.toggle('scrolled',y>24);
  const showDock=!dockDismissed&&heroSection.getBoundingClientRect().bottom<0&&offerSection.getBoundingClientRect().top>window.innerHeight*.65&&!document.body.classList.contains('menu-open');
  coachingDock.classList.toggle('is-visible',showDock);
  if(motion.matches)return;
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progressBar.style.transform='scaleX('+Math.max(0,Math.min(1,max>0?y/max:0))+')';
  const range=window.innerWidth<=760?8:18;
  const positions=[...activeFrames].map(el=>({el,rect:el.getBoundingClientRect()}));
  positions.forEach(({el,rect})=>{const phase=(window.innerHeight/2-(rect.top+rect.height/2))/(window.innerHeight+rect.height);el.style.setProperty('--parallax-y',Math.max(-range,Math.min(range,phase*range*2)).toFixed(2)+'px');});
}
function queueScroll(){if(!scrollFrame)scrollFrame=requestAnimationFrame(renderScroll);}
if('IntersectionObserver'in window){
 const imageObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)activeFrames.add(entry.target);else activeFrames.delete(entry.target);});queueScroll();},{rootMargin:'80px'});
 animatedFrames.forEach(el=>imageObserver.observe(el));
 const stepObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('in-view',entry.isIntersecting)),{rootMargin:'-25% 0px -25% 0px',threshold:.1});
 document.querySelectorAll('.steps li').forEach(el=>stepObserver.observe(el));
}
window.addEventListener('scroll',queueScroll,{passive:true});
window.addEventListener('resize',queueScroll,{passive:true});
window.addEventListener('load',queueScroll,{once:true});
motion.addEventListener('change',()=>{if(motion.matches){document.body.classList.remove('motion');animatedFrames.forEach(el=>el.style.removeProperty('--parallax-y'));}queueScroll();});
queueScroll();
