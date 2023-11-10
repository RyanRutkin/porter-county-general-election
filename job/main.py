from pypdf import PdfReader
from io import BytesIO
import urllib.request
import json
import hashlib

class DownloadGeneralElectionResults():
    def __init__(self):
        self.results = {
            'summary': None,
            'precinct': None,
        }
        self.downloadSummaryResults()
        self.downloadPrecinctResults()

    def downloadFileContents(self, url):
        with urllib.request.urlopen(url) as response:
            data = response.read()
            sha1hash = hashlib.sha1(data).hexdigest()
            pdfFile = PdfReader(BytesIO(data))
            output = ''
            for page in pdfFile.pages:
                output += page.extract_text()
            return output, sha1hash


    def downloadSummaryResults(self):
        print('Downloading summary results')
        output, sha1hash = self.downloadFileContents('https://www.porterco.org/DocumentCenter/View/16290/2023MunicipalSummaryUnofficial')
        self.results['summary'] = {
            'hash': sha1hash,
            'content': output
        }
        self.checkCompletion()

    def downloadPrecinctResults(self):
        print('Downloading precinct results')
        output, sha1hash = self.downloadFileContents('https://www.porterco.org/DocumentCenter/View/16289/2023MunicipalPrecinctUnofficial')
        self.results['precinct'] = {
            'hash': sha1hash,
            'content': output
        }
        self.checkCompletion()

    def checkCompletion(self):
        if self.results['summary'] is None or self.results['precinct'] is None:
            return

        with open('./app/src/data/results.json', 'w') as out_file:
            out_file.write(json.dumps(self.results))
            out_file.close()

def main():
    DownloadGeneralElectionResults()

if __name__ == '__main__':
    main()