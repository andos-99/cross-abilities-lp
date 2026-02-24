import zipfile
import os
import shutil

def extract_images_from_docx(docx_path, output_dir):
    """docxファイルから画像を抽出する"""
    os.makedirs(output_dir, exist_ok=True)
    with zipfile.ZipFile(docx_path, 'r') as z:
        for name in z.namelist():
            if name.startswith('word/media/'):
                filename = os.path.basename(name)
                if filename:
                    z.extract(name, '/tmp/docx_extract')
                    src = f'/tmp/docx_extract/{name}'
                    dst = os.path.join(output_dir, filename)
                    shutil.copy2(src, dst)
                    print(f'Extracted: {dst}')

# 教室写真docx
extract_images_from_docx(
    '/home/ubuntu/upload/情報掲示福利・テキスト・事務スペースの写真.docx',
    '/home/ubuntu/lp_project/images/facility'
)

# 新栄ビルdocx
extract_images_from_docx(
    '/home/ubuntu/upload/新栄ビル（503号）.docx',
    '/home/ubuntu/lp_project/images/building'
)

print("Done!")
