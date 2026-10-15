# Héctor Romero · Portafolio

Sitio web de portafolio de Héctor Romero, fotógrafo gastronómico y comercial en Quito, Ecuador.
Cada tarjeta de proyecto enlaza a su caso completo en [Behance](https://www.behance.net/Photoshopiado).

- HTML, CSS y JavaScript sin build. Animaciones con GSAP + ScrollTrigger y scroll suave con Lenis (por CDN).
- SEO: meta tags, Open Graph, Twitter Card, JSON-LD (Person, ProfessionalService, WebSite), `sitemap.xml` y `robots.txt`.

## Ver en local

```bash
python -m http.server 5173
```

Abrir http://localhost:5173

## Editar proyectos

La lista de proyectos está al inicio de `main.js` (`PROJECTS`). Las imágenes van en `img/` y los logos de clientes en `logos/`.

## Si cambias la URL del sitio

Actualiza la URL en `index.html` (canonical, `og:url`, `og:image`, JSON-LD), `sitemap.xml` y `robots.txt`.
