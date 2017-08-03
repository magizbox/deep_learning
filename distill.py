import os
from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("command")
args = parser.parse_args()
command = args.command
if command == 'serve':
    os.chdir('site')
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    url = 'http://127.0.0.1:8000/index.html'
    webbrowser.open(url)
    httpd.serve_forever()
