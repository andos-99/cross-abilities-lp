with open('/home/ubuntu/lp_project/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 各セクションの位置を取得
gallery_start = content.index('  <!-- ===== 教室写真ギャラリー ===== -->')
visit_start   = content.index('  <!-- ===== 見学セクション ===== -->')
action_start  = content.index('  <!-- ===== 早めの行動を促すセクション ===== -->')
req_start     = content.index('  <!-- ===== 募集要項 ===== -->')
contact_start = content.index('  <!-- ===== お問い合わせフォーム ===== -->')

# 各セクションを切り出す
before_gallery = content[:gallery_start]
gallery_sec    = content[gallery_start:visit_start]
visit_sec      = content[visit_start:action_start]
action_sec     = content[action_start:req_start]
req_sec        = content[req_start:contact_start]
after_req      = content[contact_start:]

# 新しい順序:
# before_gallery → gallery → req（募集要項）→ visit（見学）→ action → contact以降
new_content = before_gallery + gallery_sec + req_sec + visit_sec + action_sec + after_req

with open('/home/ubuntu/lp_project/index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done! Section order updated.")
