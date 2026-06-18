import requests
import urllib.parse
import re

API_KEY = "kicharisma"
query = "부산광역시 행정기구 설치 조례"
url = f"https://www.law.go.kr/DRF/lawSearch.do?OC={API_KEY}&target=ordin&type=XML&query={urllib.parse.quote(query)}&display=10&page=1"

res = requests.get(url)
print("Response text length:", len(res.text))
print(res.text[:1000])

pattern = r'<(?:ordin) id="\d+">(.*?)</(?:ordin)>'
for blk in re.finditer(pattern, res.text, re.DOTALL):
    b = blk.group(1)
    print("BLOCK:")
    print(b)
    mst_m = re.search(r'(?:MST|ID)=(\d+)', b, re.IGNORECASE)
    print("mst_m:", mst_m.group(0) if mst_m else "None")
