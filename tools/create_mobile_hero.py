#!/usr/bin/env python3
"""Make a mobile-only, composition-matched Ghost World hero from ORIGINAL artwork.

The desktop image and original PNG remain untouched. The mobile image
simulates CSS object-fit:cover/object-position:52% center for a 390x710 viewport,
then resizes and quality-checks the result before use.
"""
from pathlib import Path
from PIL import Image, ImageChops, ImageStat
import math

root = Path(__file__).resolve().parents[1]
src = root / "assets/hero-jai-ghost.png"
dst = root / "assets/hero-jai-ghost-mobile.webp"
ratio = 390 / 710

with Image.open(src) as source:
    img = source.convert("RGBA") if ("A" in source.getbands() or "transparency" in source.info) else source.convert("RGB")
    w, h = img.size
    if w / h > ratio:
        cropw = max(1, round(h * ratio))
        x = round((w - cropw) * .52)
        box = (x, 0, x + cropw, h)
    else:
        croph = max(1, round(w / ratio))
        y = round((h - croph) * .5)
        box = (0, y, w, y + croph)
    mobile = img.crop(box)
    # No upscaling: at most ~2.3x pixels on an iPhone-width viewport.
    if mobile.width > 900:
        out_w = 900
        out_h = round(mobile.height * (out_w / mobile.width))
        mobile = mobile.resize((out_w, out_h), Image.Resampling.LANCZOS)

    def on_dark(x):
        bg = Image.new("RGBA", x.size, (7,7,7,255))
        bg.alpha_composite(x.convert("RGBA"))
        return bg.convert("RGB")
    src_rgb = on_dark(mobile)
    for quality in (81, 85, 89, 92, 95):
        mobile.save(dst, format="WEBP", method=6, quality=quality, exact=True)
        with Image.open(dst) as encoded:
            decoded = on_dark(encoded)
            rms = ImageStat.Stat(ImageChops.difference(src_rgb, decoded)).rms
            noise = math.sqrt(sum(v*v for v in rms) / 3)
            psnr = 99 if noise == 0 else 20 * math.log10(255 / noise)
        if psnr >= 38:
            break
    if psnr < 38:
        raise RuntimeError(f"Hero too distorted after encoding: {psnr:.1f} dB")
    print(f"MOBILE HERO source={w}x{h} crop={box}, encoded={mobile.size}, quality={quality}, PSNR={psnr:.1f} dB, bytes={dst.stat().st_size}, original_mobile_png_bytes={src.stat().st_size}")
