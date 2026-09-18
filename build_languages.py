from pathlib import Path
from bs4 import BeautifulSoup, Doctype
import json
root=Path(__file__).parent;p=root/'site'
sources=json.loads((root/'translation-source.json').read_text())
translations={}
for line in (root/'translations-v5.tsv').read_text().splitlines():
 i,en,it=line.split('\t');translations[int(i)]=(en,it)
unchanged={0,3,4,6,8,11,12,13,26,29,56,59,62,68,92,119,136,151,152,153,168,174,175,177,237}
assert set(range(len(sources)))==set(translations)|unchanged, set(range(len(sources)))-set(translations)-unchanged
original=(root/'template-de.html').read_text()
(p/'index.html').write_text(original)
for lang,index in [('en',0),('it',1)]:
 s=BeautifulSoup(original,'html.parser');s.html['lang']=lang
 mapping={sources[i]:values[index] for i,values in translations.items()}
 for n in list(s.find_all(string=True)):
  if isinstance(n,Doctype):continue
  t=str(n);trim=t.strip()
  if trim in mapping:n.replace_with(t.replace(trim,mapping[trim]))
 for el in s.find_all(True):
  for attr in ['alt','aria-label','placeholder']:
   if el.get(attr) in mapping:el[attr]=mapping[el[attr]]
 for el in s.select('meta[name=description]'):el['content']=mapping[el['content']]
 for a in s.select('.language-switch a'):
  a.attrs.pop('aria-current',None)
  if a['lang']==lang:a['aria-current']='page'
 (p/f'{lang}.html').write_text(str(s))
# Add accessible stable counter values and language-specific text to all three editions.
for file in ['index.html','en.html','it.html']:
 s=BeautifulSoup((p/file).read_text(),'html.parser')
 for el in s.select('[data-count]'):
  el.attrs.pop('aria-label',None)
  sr=s.new_tag('span');sr['class']='sr-only';sr.string=el['data-count'];el.append(sr)
 if file=='index.html':
  small=s.select_one('.footer small');small.string=small.get_text().replace('Weitere Sportmotive sind illustrative KI-Bilder.','Weitere Sport- und Foodmotive sind illustrative KI-Bilder.')
 (p/file).write_text(str(s))
print('All 264 strings covered in EN and IT; three static language editions built.')
