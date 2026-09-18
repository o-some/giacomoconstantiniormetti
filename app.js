'use strict';
document.documentElement.classList.add('js');
const menuButton=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('#mobile-nav');
function closeMenu(restoreFocus=false){menuButton.setAttribute('aria-expanded','false');mobileNav.hidden=true;document.body.classList.remove('menu-open');if(restoreFocus)menuButton.focus();}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));mobileNav.hidden=!open;document.body.classList.toggle('menu-open',open);});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>closeMenu()));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu(true);if(event.key==='Tab'&&!mobileNav.hidden){const links=[menuButton,...mobileNav.querySelectorAll('a')];const first=links[0],last=links[links.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
window.matchMedia('(min-width:761px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
const motion=window.matchMedia('(prefers-reduced-motion:reduce)');
if('IntersectionObserver'in window&&!motion.matches){document.body.classList.add('motion');const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));}
document.querySelectorAll('[data-goal]').forEach(link=>link.addEventListener('click',()=>{document.querySelectorAll('input[name="goal"]').forEach(input=>{input.checked=input.value===link.dataset.goal;});}));
let preparedNote='';
document.querySelector('#entry-form').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);const goal=String(data.get('goal')||'');const rhythm=String(data.get('rhythm')||'');const note=String(data.get('note')||'').trim();preparedNote=['MEIN EINSTIEG · IORMETTI CONCEPTS','','Mein Fokus: '+goal,'Mein Rhythmus: '+rhythm,...(note?['Was mir wichtig ist: '+note]:[]),'','Persönliche Gesprächsnotiz. Nicht versendet; kein Termin gebucht.'].join('\n');document.querySelector('#result-copy').textContent=goal+' · '+rhythm+'. Deine Notiz ist bereit zum Herunterladen.';const result=document.querySelector('#entry-result');result.hidden=false;result.focus({preventScroll:true});result.scrollIntoView({behavior:motion.matches?'instant':'smooth',block:'nearest'});});
document.querySelector('#download-note').addEventListener('click',()=>{if(!preparedNote)return;const url=URL.createObjectURL(new Blob([preparedNote],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='Mein-Einstieg-Iormetti-Concepts.txt';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});

document.querySelector('#entry-form button[type=submit]').disabled=false;
