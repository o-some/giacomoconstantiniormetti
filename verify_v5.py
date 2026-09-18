from pathlib import Path
from bs4 import BeautifulSoup
p=Path(__file__).parent/'site'
for file,lang in [('index.html','de'),('en.html','en'),('it.html','it')]:
 s=BeautifulSoup((p/file).read_text(),'html.parser')
 ids=[e['id'] for e in s.select('[id]')]
 assert len(ids)==len(set(ids))
 assert len(s.select('h1'))==1 and s.html['lang']==lang
 assert s.select_one('.language-switch [aria-current=page]')['lang']==lang
 assert len(s.select('.language-switch a'))==3
 assert [e['data-count'] for e in s.select('[data-count]')]==['3','100','60']
 assert len(s.select('[data-count] .sr-only'))==3
 for e in s.select('[src],link[href],a[href]'):
  target=e.get('src',e.get('href','')).split('?')[0]
  if target.startswith('#'):assert target[1:] in ids, target
  elif '://' not in target:assert (p/target).exists(),target
 for a in s.select('[data-goal]'):
  assert a['data-goal'] in [e['value'] for e in s.select('input[name=goal]')]
 assert len(s.select('input[name=goal]'))==4
 for e in s.select('img'):assert 'alt' in e.attrs
 assert '↗' not in s.get_text()
 if lang!='de':
  text=s.get_text(' ',strip=True)
  for german in ['Dein Einstieg','Mein Fokus','Bitte auswählen','Was kostet','Dein Training','Minuten','Ernährung','Schließen','Stunde','Vorschau']:
   assert german not in text,(lang,german)
 print(file+': language, assets, anchors, form goals and stable counter labels passed.')
