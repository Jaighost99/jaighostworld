#!/usr/bin/env python3
"""Optimise existing homepage artwork without deleting or changing original PNGs.

Creates visually high-fidelity WebP alternatives, checks dimensions and visual
fidelity, and only updates the homepage references for assets that save bytes.
Safe to re-run: a second run leaves already-converted references unchanged.
"""
from __future__ import annotations
import math
from pathlib import Path
from urllib.parse import quote

from PIL import Image, ImageChops, ImageStat

ROOT = Path(__file__).resolve().parents[1]
TARGETS = [
    ("assets/hero-jai-ghost.png", 93, False),
    ("assets/hero-world.png", 93, False),
    ("assets/JAI LOYAL Two Sides, One Artist Finished.png", 95, False),
    ("assets/what are their motives cover 1650x1650 for website.png", 95, False),
    ("assets/NO PULSE OFFICIAL COVER for website.png", 95, False),
    ("assets/ghost-loyal-apparel-bts.png", 94, False),
    ("assets/btnh-records-logo.png", 100, True),
]
FILES_TO_PATCH = [ROOT / "index.html", ROOT / "styles.css", ROOT / "ghost-experience.css"]


def preview_psnr(original: Image.Image, encoded: Image.Image) -> float:
    # Compare against a dark backdrop where this site's images appear.
    def on_dark(image: Image.Image) -> Image.Image:
        rgba = image.convert("RGBA")
        bg = Image.new("RGBA", rgba.size, (7, 7, 7, 255))
        bg.alpha_composite(rgba)
        return bg.convert("RGB")
    diff = ImageChops.difference(on_dark(original), on_dark(encoded))
    rms = ImageStat.Stat(diff).rms
    combined = math.sqrt(sum(v * v for v in rms) / len(rms))
    return 99.0 if combined == 0 else 20 * math.log10(255.0 / combined)


def convert_asset(path: str, quality: int, lossless: bool) -> tuple[str, str] | None:
    src = ROOT / path
    if not src.is_file():
        print(f"SKIP missing source: {path}")
        return None
    dst = src.with_suffix(".webp")
    with Image.open(src) as image:
        image.load()
        original_size = image.size
        mode = "RGBA" if "A" in image.getbands() or "transparency" in image.info else "RGB"
        clean = image.convert(mode)
        options = {"format": "WEBP", "method": 6, "lossless": lossless}
        if not lossless:
            options.update(quality=quality, exact=True)
        clean.save(dst, **options)
        with Image.open(dst) as decoded:
            if decoded.size != original_size:
                raise RuntimeError(f"Image dimensions changed for {src.name}")
            psnr = preview_psnr(clean, decoded)
        if psnr < 34:
            clean.save(dst, format="WEBP", method=6, quality=98, exact=True)
            with Image.open(dst) as decoded:
                psnr = preview_psnr(clean, decoded)
        if psnr < 34:
            clean.save(dst, format="WEBP", method=6, lossless=True)
            psnr = 99

    before, after = src.stat().st_size, dst.stat().st_size
    if after >= before * .92:
        print(f"KEEP original: {path}; optimized file saves less than 8%")
        dst.unlink(missing_ok=True)
        return None
    print(f"OPTIMIZED: {path}: {before // 1024}KB -> {after // 1024}KB "
          f"({(1 - after / before) * 100:.1f}% smaller); PSNR {psnr:.1f} dB")
    return (path, str(dst.relative_to(ROOT)))


def main() -> None:
    conversions = [result for p, q, lossless in TARGETS
                   if (result := convert_asset(p, q, lossless))]
    for filename in FILES_TO_PATCH:
        if not filename.is_file():
            continue
        contents = filename.read_text(encoding="utf-8")
        original = contents
        for src, dst in conversions:
            contents = contents.replace(src, dst)
            contents = contents.replace(quote(src, safe="/"), quote(dst, safe="/"))
        if contents != original:
            filename.write_text(contents, encoding="utf-8")
            print(f"UPDATED asset references in {filename.relative_to(ROOT)}")
    print(f"Finished: {len(conversions)} artwork assets optimized; originals retained.")


if __name__ == "__main__":
    main()
