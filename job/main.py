from pypdf import PdfReader
from io import BytesIO
import urllib.request
import json

with urllib.request.urlopen('https://www.porterco.org/DocumentCenter/View/15171/3-2022-General-Election-OFFICIAL-Summary') as response, open('./app/src/data/results.json', 'w') as out_file:
    data = response.read()
    pdfFile = PdfReader(BytesIO(data))
    output = ''
    for page in pdfFile.pages:
        output += page.extract_text()
    out_file.write('{"content":');
    out_file.write(json.dumps(output))
    out_file.write('}')
    out_file.close()
