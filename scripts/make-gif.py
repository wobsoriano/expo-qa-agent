#!/usr/bin/env python3
"""Assemble polled simulator screenshots into a compact GIF.

Consecutive identical screens collapse into one frame, so the GIF shows the
run's distinct states rather than every poll. The status bar is cropped: its
clock changes on its own and would defeat that comparison.
"""
import pathlib
import sys

from PIL import Image

WIDTH = 320
STATUS_BAR_FRACTION = 0.05
FRAME_MS = 900


def main() -> int:
    frames_dir = pathlib.Path(sys.argv[1])
    out_path = sys.argv[2]

    frames: list[Image.Image] = []
    previous: bytes | None = None

    for path in sorted(frames_dir.glob("*.png")):
        image = Image.open(path).convert("RGB")
        image = image.crop((0, round(image.height * STATUS_BAR_FRACTION), image.width, image.height))
        image = image.resize((WIDTH, round(image.height * WIDTH / image.width)))
        current = image.tobytes()
        if current != previous:
            frames.append(image)
            previous = current

    if not frames:
        print("no frames captured", file=sys.stderr)
        return 1

    frames[0].save(
        out_path,
        save_all=True,
        append_images=frames[1:],
        duration=FRAME_MS,
        loop=0,
        optimize=True,
    )
    print(f"{len(frames)} distinct frames -> {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
