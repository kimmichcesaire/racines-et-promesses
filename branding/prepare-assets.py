"""
Prepare technical declinations of the couple's validated logo.
Pure resize (and, for the "arbre" set, a straight rectangular crop to isolate
the tree from its medallion frame/signature) -- no pixel of the artwork itself
is ever redrawn or recolored. Requested by the couple: an animation showing
just the tree, on its own, from their exact logo.
Source of truth: branding/source/logo-lb-original.jpeg
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parent
SRC = ROOT / "source" / "logo-lb-original.jpeg"
FAVICON_DIR = ROOT / "favicon"
WEB_DIR = ROOT / "web"

FAVICON_DIR.mkdir(exist_ok=True)
WEB_DIR.mkdir(exist_ok=True)

img = Image.open(SRC).convert("RGB")
print(f"Source: {img.size[0]}x{img.size[1]}")

# Favicon / touch-icon sizes (browsers expect square-ish; we resize the full
# image as-is, no cropping -- the green background is part of the artwork).
favicon_sizes = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "favicon-48x48.png": 48,
    "apple-touch-icon-180x180.png": 180,
    "icon-512x512.png": 512,
}

for name, size in favicon_sizes.items():
    # keep aspect ratio, then pad to square with the artwork's own background tone
    ratio = size / max(img.size)
    new_w, new_h = int(img.size[0] * ratio), int(img.size[1] * ratio)
    resized = img.resize((new_w, new_h), Image.LANCZOS)
    canvas = Image.new("RGB", (size, size), (30, 40, 26))  # sampled deep-green tone
    canvas.paste(resized, ((size - new_w) // 2, (size - new_h) // 2))
    canvas.save(FAVICON_DIR / name, optimize=True)
    print(f"  -> favicon/{name}  ({size}x{size})")

# Web display sizes (header, footer) -- straight resize, original proportions.
web_widths = {
    "logo-lb-w320.png": 320,
    "logo-lb-w640.png": 640,
    "logo-lb-w832.png": 832,  # native resolution, re-encoded lossless
}
for name, w in web_widths.items():
    ratio = w / img.size[0]
    h = int(img.size[1] * ratio)
    resized = img.resize((w, h), Image.LANCZOS)
    resized.save(WEB_DIR / name, optimize=True)
    print(f"  -> web/{name}  ({w}x{h})")

# "Arbre seul" -- recadrage rectangulaire droit isolant le motif de l'arbre
# (feuillage, monogramme L&B tissé dans le tronc, racines, eau) en écartant
# le cadre feston doré et la signature "Luciana & Ben". Aucune retouche :
# uniquement les bords du cadrage sont resserrés, aucun pixel de l'arbre
# n'est modifié. Boîte choisie à l'oeil pour exclure le feston tout en
# gardant l'intégralité de l'arbre, racines et eau comprises.
tree_crop_box = (180, 210, 652, 800)
tree_img = img.crop(tree_crop_box)
print(f"Recadrage arbre: {tree_img.size[0]}x{tree_img.size[1]} (boîte {tree_crop_box})")

tree_widths = {
    "logo-lb-arbre-w320.png": 320,
    "logo-lb-arbre-w472.png": tree_img.size[0],  # résolution native du recadrage
}
for name, w in tree_widths.items():
    ratio = w / tree_img.size[0]
    h = int(tree_img.size[1] * ratio)
    resized = tree_img.resize((w, h), Image.LANCZOS)
    resized.save(WEB_DIR / name, optimize=True)
    print(f"  -> web/{name}  ({w}x{h})")

print("Done.")
