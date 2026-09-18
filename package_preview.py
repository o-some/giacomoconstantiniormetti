"""Create an offline review file and ZIP from the current static site."""
from pathlib import Path
import base64
import re
import zipfile

root = Path(__file__).resolve().parent
site = root / 'site'
assets = site / 'assets'
html = (site / 'index.html').read_text()
css = (site / 'styles.css').read_text()
js = (site / 'app.js').read_text()
font = base64.b64encode((assets / 'BarlowCondensed-Bold.ttf').read_bytes()).decode()
css = css.replace('assets/BarlowCondensed-Bold.ttf', 'data:font/ttf;base64,' + font)
html = html.replace('<link rel="stylesheet" href="styles.css">', '<style>' + css + '</style>')
html = re.sub(r'<link rel="preload"[^>]+>', '', html)
html = html.replace('<script src="app.js" defer></script>', '<script>document.addEventListener("DOMContentLoaded",()=>{' + js + '});</script>')
for path in assets.iterdir():
    if path.suffix in {'.webp', '.svg'}:
        mime = 'image/webp' if path.suffix == '.webp' else 'image/svg+xml'
        html = html.replace('assets/' + path.name, 'data:' + mime + ';base64,' + base64.b64encode(path.read_bytes()).decode())
preview = root / 'Iormetti_Concepts_Vorschau_v1_1.html'
preview.write_text(html)
with zipfile.ZipFile(root / 'Iormetti_Concepts_Website_v1_1.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for path in sorted(root.rglob('*')):
        rel = path.relative_to(root)
        if not path.is_file() or '.git' in rel.parts or path.suffix == '.zip' or path.name == 'reference-044.png':
            continue
        if path.name.startswith('Iormetti_Concepts_Vorschau') and path != preview:
            continue
        archive.write(path, rel)
print(preview.name)
print('Iormetti_Concepts_Website_v1_1.zip')
