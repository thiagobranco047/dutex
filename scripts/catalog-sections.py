"""Desenha a seção transversal esquemática de cada família de perfil (imagem provisória até as fotos).

Uso: python3 scripts/catalog-sections.py "<pasta materiais>"
Gera <materiais>/_site-catalogo/secoes/{slug}.png; o scripts/catalog-images.py as converte para o site.
As letras (A, B, C, D, e) seguem os desenhos 03-GAL02-0092 a 0095. A forma é proporcional à medida
de referência indicada em cada família, mas é esquemática: as cotas valem pela tabela do site.
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(sys.argv[1]) / "_site-catalogo" / "secoes"
OUT.mkdir(parents=True, exist_ok=True)
W, H = 1400, 1050
INK, ZINC, BLUE, GREEN, GRAY = (43, 47, 54), (229, 233, 238), (11, 78, 134), (123, 203, 42), (110, 116, 126)

def font(size, bold=False):
    for name in (["DejaVuSans-Bold.ttf"] if bold else ["DejaVuSans.ttf"]):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            pass
    return ImageFont.load_default()

# Centro da linha da seção em mm (y para baixo) e cotas: (rótulo, p1, p2, deslocamento, lado)
SHAPES = {
    "perfil-u-simples": {
        "ref": "100 x 40",
        "pts": [(40, 0), (0, 0), (0, 100), (40, 100)],
        "dims": [("A", (0, 0), (0, 100), -22), ("B", (0, 100), (40, 100), 22)],
    },
    "perfil-u-enrijecido": {
        "ref": "100 x 50 x 15",
        "pts": [(50, 15), (50, 0), (0, 0), (0, 100), (50, 100), (50, 85)],
        "dims": [("A", (0, 0), (0, 100), -22), ("B", (0, 100), (50, 100), 22), ("C", (50, 0), (50, 15), 22)],
    },
    "perfil-l": {
        "ref": "50 x 50",
        "pts": [(0, 0), (0, 50), (50, 50)],
        "dims": [("A", (0, 0), (0, 50), -14), ("B", (0, 50), (50, 50), 14)],
    },
    "perfil-cartola": {
        "ref": "90 x 35 x 12 (crista 38)",
        "pts": [(0, 35), (12, 35), (26, 0), (64, 0), (78, 35), (90, 35)],
        "dims": [("A", (0, 35), (90, 35), 16), ("B", (90, 0), (90, 35), 10), ("C", (0, 35), (12, 35), -8), ("D", (26, 0), (64, 0), -10)],
    },
}

TITLES = {
    "perfil-u-simples": "Perfil U simples",
    "perfil-u-enrijecido": "Perfil U enrijecido (Ue)",
    "perfil-l": "Perfil L (cantoneira)",
    "perfil-cartola": "Perfil cartola",
}

def arrow_line(d, a, b, color, width=3):
    d.line([a, b], fill=color, width=width)
    for p in (a, b):
        d.ellipse([p[0] - 6, p[1] - 6, p[0] + 6, p[1] + 6], fill=color)

for slug, s in SHAPES.items():
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)
    xs = [p[0] for p in s["pts"]]; ys = [p[1] for p in s["pts"]]
    span = max(max(xs) - min(xs), max(ys) - min(ys))
    scale = 540 / span
    cx = W / 2 - (min(xs) + max(xs)) / 2 * scale
    cy = H / 2 - 10 - (min(ys) + max(ys)) / 2 * scale
    P = lambda p: (cx + p[0] * scale, cy + p[1] * scale)
    # espessura exagerada para leitura; raio r = e indicado no rodapé
    d.line([P(p) for p in s["pts"]], fill=INK, width=26, joint="curve")
    d.line([P(p) for p in s["pts"]], fill=ZINC, width=12, joint="curve")
    for label, p1, p2, off in s["dims"]:
        a, b = P(p1), P(p2)
        horizontal = abs(a[1] - b[1]) < 1
        o = off * scale / 10 * 4
        if horizontal:
            a2, b2 = (a[0], a[1] + o), (b[0], b[1] + o)
            d.line([a, a2], fill=GRAY, width=1); d.line([b, b2], fill=GRAY, width=1)
            arrow_line(d, a2, b2, BLUE)
            tx, ty = (a2[0] + b2[0]) / 2, a2[1] + (26 if o > 0 else -60)
        else:
            a2, b2 = (a[0] + o, a[1]), (b[0] + o, b[1])
            d.line([a, a2], fill=GRAY, width=1); d.line([b, b2], fill=GRAY, width=1)
            arrow_line(d, a2, b2, BLUE)
            tx, ty = a2[0] + (30 if o > 0 else -56), (a2[1] + b2[1]) / 2 - 22
        d.text((tx, ty), label, font=font(42, True), fill=BLUE, anchor="la" if horizontal is False else "ma")
    d.text((70, 60), TITLES[slug], font=font(46, True), fill=INK)
    d.text((70, 122), "Seção transversal esquemática", font=font(28), fill=GRAY)
    d.rectangle([70, H - 92, 70 + 14, H - 78], fill=GREEN)
    d.text((100, H - 100), f"Proporção de referência: {s['ref']} mm  ·  e = espessura, r = e  ·  medidas na tabela", font=font(26), fill=GRAY)
    img.save(OUT / f"{slug}.png")
    print(OUT / f"{slug}.png")
