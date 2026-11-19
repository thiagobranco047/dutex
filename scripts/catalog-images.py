"""Converte as fotos de produto da pasta de materiais da Dutex em WebP para o site.

Uso: python3 scripts/catalog-images.py "<pasta materiais>"
Renders do Figma em <materiais>/_site-catalogo/renders/{slug}/ entram antes das fotos de cada produto.
Gera public/images/produtos/{slug}/{n}.webp e lib/catalog/product-images.ts.
O mapeamento abaixo é a fonte da verdade: para trocar ou incluir uma foto, edite e rode de novo.
"""
import json, sys, shutil
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1])
OUT = ROOT / "public/images/produtos"
MANIFEST = ROOT / "lib/catalog/product-images.ts"
MAX = 1400

C = "04_Mídias e Redes Sociais/CATÁLOGO/Catalogo 2025/"
P = "02_Produtos/Produtos Indutrial Dutex Projetos/"
I = "02_Produtos/Imagens de produtos/"
W = "produtos/WhatsApp Image 2026-01-06 at "
K = "02_Produtos/Linha PP EXT/Cant 135X70/"
S = "02_Produtos/Colmeia - Separador/"

MAP = {
    "luvas-de-aco": [I + "20240412_133132.jpg", I + "20240412_133343.jpg"],
    "aneis-cartola": [C + "ANEL CARTOLA PINTURA .png", C + "ANEL CARTOLA PINTURA 01.png"],
    "colarinhos-de-protecao": [C + "COLARINHO DE PLÁSTICO Ø508.png", C + "COLARINHO DE PLÁSTICO Ø610.png", W + "15.18.08 (19).jpeg", W + "15.18.08 (11).jpeg"],
    "colarinhos-rotomoldados": [C + "COLARINHO ROTOMOLDAGEM.png", W + "15.18.10.jpeg", I + "WhatsApp_Image_2024-05-13_at_14.34.49-removebg-preview.png", I + "WhatsApp_Image_2024-05-13_at_14.48.29-removebg-preview.png"],
    "protetor-tubular": [C + "PROTEÇÃO TUBOLAR .png", W + "15.18.07.jpeg"],
    "bercos-para-bobinas": [W + "09.40.35.jpeg", W + "09.40.35 (3).jpeg"],
    "cantoneiras-plasticas": [K + "Bobina 135 70 amarração.jpg", K + "WhatsApp_Image_2024-03-06_at_10.47.14__1_-removebg-preview.png", C + "CANTONEIRA 70X70.png", C + "CANTONEIRA 230X130.png", P + "CANTONEIRA 100X100.png", C + "CANTONEIRA 102 ESQUERDA - DIREITA .png", K + "Bobina 135 70 disposição pallet.jpg", W + "15.18.08 (5).jpeg"],
    "cantoneiras-plissadas-plasticas": [C + "CANTONEIRA 110X70.png", W + "15.18.07 (1).jpeg", W + "15.18.08 (18).jpeg", W + "15.18.08 (9).jpeg", W + "15.18.10 (1).jpeg"],
    "cantoneiras-plissadas-metalicas": [C + "CANTONEIRAS PLISSADAS EM AÇO .png", P + "CANTONEIRAS PLISSADAS EM AÇO 01.png", I + "Clipped_image_20240412_133938.png", I + "20240412_133603.jpg", W + "15.18.08 (6).jpeg"],
    "chapas-metalicas-para-embalagem": [I + "20240412_135237.jpg"],
    "colmeias-separadoras": [C + "COLMEIA 50 01.png", C + "COLMEIA 100.png", C + "COLMEIA 110.png", C + "COLMEIA 120.png", C + "COLMEIA 50 05.png", C + "COLMEIA 50 06.png", S + "2.jpg", W + "15.18.08 (2).jpeg", W + "15.18.08 (3).jpeg", W + "15.18.08.jpeg"],
    "tabuleiros-separadores": [C + "TABULEIRO 310.png", C + "COLMEIA 50 03.png", W + "15.18.08 (12).jpeg"],
    "dutos-corrugados-pead": [I + "Imagem do WhatsApp de 2023-08-24 à(s) 16.24.17.jpg", I + "Imagem do WhatsApp de 2023-08-24 à(s) 16.24.182.jpg", I + "Imagem do WhatsApp de 2023-07-28 à(s) 13.58.21.jpg", I + "Imagem do WhatsApp de 2023-07-28 à(s) 13.56.37.jpg"],
    "chapas-e-blanks": ["Chapas blanks/Chapas_01.jpg"],
    # Seções esquemáticas geradas por scripts/catalog-sections.py (provisórias até as fotos reais)
    "perfil-u-simples": ["_site-catalogo/secoes/perfil-u-simples.png"],
    "perfil-u-enrijecido": ["_site-catalogo/secoes/perfil-u-enrijecido.png"],
    "perfil-l": ["_site-catalogo/secoes/perfil-l.png"],
    "perfil-cartola": ["_site-catalogo/secoes/perfil-cartola.png"],
    "manta-magnetica": [C + "MANTA COM PROTEÇÃO COM IMÃ.png"],
    "estrados-metalicos": [C + "ESTRADOS METALICOS .png", C + "ESTRADOS METALICOS 01.png"],
    "paletes-retornaveis": [C + "PALETE RETORNAVEIS .png"],
}

# Renders exportados do Figma (página Produtos): _site-catalogo/renders/{slug}/render-NN.png.
# Entram na frente das fotos do MAP. Para exportar: Ctrl+Shift+E no Figma, salvando nessa pasta.
RENDERS = SRC / "_site-catalogo" / "renders"

def renders_for(slug):
    folder = RENDERS / slug
    if not folder.is_dir():
        return []
    return [str(f.relative_to(SRC)).replace("\\", "/") for f in sorted(folder.glob("*.png")) + sorted(folder.glob("*.jpg"))]

slugs = list(MAP) + sorted(d.name for d in RENDERS.iterdir() if d.is_dir() and d.name not in MAP) if RENDERS.is_dir() else list(MAP)

manifest, missing = {}, []
for slug in slugs:
    files = renders_for(slug) + MAP.get(slug, [])
    folder = OUT / slug
    folder.mkdir(parents=True, exist_ok=True)
    manifest[slug] = []
    for n, rel in enumerate(files, 1):
        path = SRC / rel
        if not path.exists():
            missing.append(rel); continue
        img = ImageOps.exif_transpose(Image.open(path))
        if img.mode in ("RGBA", "LA", "P"):
            img = img.convert("RGBA")
            bg = Image.new("RGB", img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[-1])
            img = bg
        else:
            img = img.convert("RGB")
        img.thumbnail((MAX, MAX), Image.LANCZOS)
        name = f"{n:02d}.webp"
        img.save(folder / name, "WEBP", quality=74, method=6)
        manifest[slug].append({"src": f"/images/produtos/{slug}/{name}", "width": img.width, "height": img.height, "source": rel})

MANIFEST.parent.mkdir(parents=True, exist_ok=True)
MANIFEST.write_text("// Gerado por scripts/catalog-images.py. Não edite à mão.\n\nexport const productImages: Record<string, { src: string; width: number; height: number; source: string }[]> = "
                    + json.dumps(manifest, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
print(json.dumps({k: len(v) for k, v in manifest.items()}, ensure_ascii=False))
print("faltando:", missing)
