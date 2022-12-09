from PyPDF2 import PdfFileReader, PdfFileWriter
import requests
import sys

url = sys.argv[1]

response = requests.get(url)
fileName = response.url[url.rfind('/') + 1:]

with open(fileName, 'wb') as f:
    for chunk in response.iter_content(chunk_size=8129):
        if chunk:
            f.write(chunk)

reader = PdfFileReader(fileName, 'r')

writer = PdfFileWriter()

for i in range(reader.getNumPages()):
    page = reader.getPage(i)
    page.cropBox.setLowerLeft((0, 60))
    writer.addPage(page)

outstream = open("result_" + fileName, 'wb')
writer.write(outstream)
outstream.close()

print("result_" + fileName)