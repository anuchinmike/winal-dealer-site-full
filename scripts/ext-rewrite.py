from pathlib import Path
import re

root = Path("/home/magency/projects/winal-dealer-site/site/src")
ext_re = re.compile(r"\.(?:jpe?g|png)(?=[\"'`\],)])")
changed = 0
for path in list(root.rglob("*.ts")) + list(root.rglob("*.tsx")):
    text = path.read_text(encoding="utf-8")
    original = text
    if path.name == "project-form-section.tsx":
        text = text.replace("interior.png", "interior.webp")
    else:
        text = ext_re.sub(".webp", text)
    if text != original:
        path.write_text(text, encoding="utf-8")
        changed += 1
        print(path.relative_to(root))
print("changed", changed)
