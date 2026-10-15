# Genera dist/index.html (artefacto de una sola página) a partir de index.html + style.css + main.js
import re,shutil,os,glob
h=open('index.html',encoding='utf-8').read()
css=open('style.css',encoding='utf-8').read()
js=open('main.js',encoding='utf-8').read()
body=re.search(r'<body>(.*?)<script src="https://cdnjs',h,re.S).group(1)
js=js.replace("const imgSrc = p => CDN + p.img;","const imgSrc = p => 'img/' + p.img;").replace("const imgFallback = p => 'https://mir-s3-cdn-cf.behance.net/projects/404/' + p.img;","const imgFallback = p => 'img/' + p.img;")
assert "'img/' + p.img" in js
css=css.replace(":root{",":root{color-scheme:dark;",1)
out=f'''<title>Héctor Romero Fotografía</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>
{css}
</style>
{body}
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
<script>
{js}
</script>
'''
open('dist/index.html','w',encoding='utf-8').write(out)
os.makedirs('dist/logos',exist_ok=True)
for f in glob.glob('logos/*.png'): shutil.copy(f,'dist/logos/')
