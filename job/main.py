from pypdf import PdfReader
from io import BytesIO
import urllib.request
import json
import hashlib

import requests

# cookies = {
#     'PHPSESSID': '0baabdad2f93b05c0ef99fa0e025b4f5',
# }

# headers = {
#     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
#     'Accept-Language': 'en-US,en;q=0.9',
#     'Cache-Control': 'no-cache',
#     'Connection': 'keep-alive',
#     # 'Cookie': 'PHPSESSID=0baabdad2f93b05c0ef99fa0e025b4f5',
#     'Pragma': 'no-cache',
#     'Sec-Fetch-Dest': 'document',
#     'Sec-Fetch-Mode': 'navigate',
#     'Sec-Fetch-Site': 'cross-site',
#     'Sec-Fetch-User': '?1',
#     'Upgrade-Insecure-Requests': '1',
#     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
#     'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
#     'sec-ch-ua-mobile': '?0',
#     'sec-ch-ua-platform': '"macOS"',
# }

# params = {
#     'fbclid': 'IwAR10l9FWGa10j4Hx6dDDaMFfzucJPOmtnJZjFzlel61gphbyvLhtTl_YbUg_aem_AfXkwQqDrUTXdEa4ZNKkgGREUZYBwcGHR6hSFrc-rJJW1bgi2uhEZ_2IH4-zH2FoW1o',
# }

# response = requests.get('https://www2.porterco.org/election-results.html', params=params, cookies=cookies, headers=headers)
# print(response.text)

class DownloadGeneralElectionResults():
    def __init__(self):
        self.results = {
            'summary': None,
            'precinct': None,
        }
        self.downloadSummaryResults()
        # self.downloadPrecinctResults()

    def downloadFileContents(self, url):
        with urllib.request.urlopen(url, {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            # 'Cookie': 'PHPSESSID=0baabdad2f93b05c0ef99fa0e025b4f5',
            'Pragma': 'no-cache',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
        }) as response:
            print('Request opened. Reading')
            data = response.read()
            print('Respoonse read')
            sha1hash = hashlib.sha1(data).hexdigest()
            pdfFile = PdfReader(BytesIO(data))
            output = ''
            for page in pdfFile.pages:
                output += page.extract_text()
            return output, sha1hash


    def downloadSummaryResults(self):
        print('Downloading precinct results')
        cookies = {
            'PHPSESSID': '0baabdad2f93b05c0ef99fa0e025b4f5',
        }

        headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            # 'Cookie': 'PHPSESSID=0baabdad2f93b05c0ef99fa0e025b4f5',
            'Pragma': 'no-cache',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
        }

        params = {
            'fbclid': 'IwAR10l9FWGa10j4Hx6dDDaMFfzucJPOmtnJZjFzlel61gphbyvLhtTl_YbUg_aem_AfXkwQqDrUTXdEa4ZNKkgGREUZYBwcGHR6hSFrc-rJJW1bgi2uhEZ_2IH4-zH2FoW1o',
        }

        response = requests.get('https://www2.porterco.org/election-results.html', params=params, cookies=cookies, headers=headers)
        # sha1hash = hashlib.sha1(response.text).hexdigest()
        self.results['summary'] = {
            'hash': '',
            'content': response.text
        }
        self.checkCompletion()

    def downloadPrecinctResults(self):
        print('Downloading precinct results')
        cookies = {
            'PHPSESSID': '0baabdad2f93b05c0ef99fa0e025b4f5',
        }

        headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            # 'Cookie': 'PHPSESSID=0baabdad2f93b05c0ef99fa0e025b4f5',
            'Pragma': 'no-cache',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
        }

        params = {
            'fbclid': 'IwAR10l9FWGa10j4Hx6dDDaMFfzucJPOmtnJZjFzlel61gphbyvLhtTl_YbUg_aem_AfXkwQqDrUTXdEa4ZNKkgGREUZYBwcGHR6hSFrc-rJJW1bgi2uhEZ_2IH4-zH2FoW1o',
        }

        response = requests.get('https://www2.porterco.org/election-results.html', params=params, cookies=cookies, headers=headers)
        # sha1hash = hashlib.sha1(response.text).hexdigest()
        self.results['precinct'] = {
            'hash': '',
            'content': response.text
        }
        self.checkCompletion()

    def checkCompletion(self):
        # self.results['summary'] is None or 
        if self.results['summary'] is None:
            return

        with open('./app/src/data/results.json', 'w') as out_file:
            out_file.write(json.dumps(self.results))
            out_file.close()

def main():
    DownloadGeneralElectionResults()

if __name__ == '__main__':
    main()