from PIL import Image
import os

def optimize_image(src, dst, max_width=1200, quality=85):
    img = Image.open(src)
    w, h = img.size
    if w > max_width:
        ratio = max_width / w
        new_h = int(h * ratio)
        img = img.resize((max_width, new_h), Image.LANCZOS)
    img.save(dst, 'JPEG', quality=quality, optimize=True)
    print(f'Saved: {dst} ({img.size})')

os.makedirs('/home/ubuntu/lp_project/images/optimized', exist_ok=True)

# 教室写真（大きい画像 image5, image6）→ ヒーロー用
optimize_image(
    '/home/ubuntu/lp_project/images/facility/image5.jpeg',
    '/home/ubuntu/lp_project/images/optimized/classroom1.jpg',
    max_width=1400
)
optimize_image(
    '/home/ubuntu/lp_project/images/facility/image6.jpeg',
    '/home/ubuntu/lp_project/images/optimized/classroom2.jpg',
    max_width=1400
)

# 面談室 image3, image4
optimize_image(
    '/home/ubuntu/lp_project/images/facility/image3.jpeg',
    '/home/ubuntu/lp_project/images/optimized/meeting1.jpg',
    max_width=800
)
optimize_image(
    '/home/ubuntu/lp_project/images/facility/image4.jpeg',
    '/home/ubuntu/lp_project/images/optimized/meeting2.jpg',
    max_width=800
)

# 事務スペース image7
optimize_image(
    '/home/ubuntu/lp_project/images/facility/image7.jpeg',
    '/home/ubuntu/lp_project/images/optimized/office.jpg',
    max_width=800
)

# テキスト・書籍 image1, image2
optimize_image(
    '/home/ubuntu/lp_project/images/facility/image1.jpeg',
    '/home/ubuntu/lp_project/images/optimized/info_board.jpg',
    max_width=800
)
optimize_image(
    '/home/ubuntu/lp_project/images/facility/image2.jpeg',
    '/home/ubuntu/lp_project/images/optimized/books.jpg',
    max_width=800
)

# 建物外観
optimize_image(
    '/home/ubuntu/lp_project/images/building/image2.jpeg',
    '/home/ubuntu/lp_project/images/optimized/building.jpg',
    max_width=800
)

print("All done!")
