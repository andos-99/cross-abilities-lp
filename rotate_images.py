from PIL import Image
import os

# 上下逆さまになっている画像を180度回転して上書き保存
targets = [
    "/home/ubuntu/lp_project/images/optimized/classroom1.jpg",
    "/home/ubuntu/lp_project/images/optimized/classroom2.jpg",
]

for path in targets:
    img = Image.open(path)
    rotated = img.rotate(180)
    rotated.save(path, "JPEG", quality=90)
    print(f"Rotated: {os.path.basename(path)}")

print("Done.")
