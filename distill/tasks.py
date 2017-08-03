import os
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler


def task_open_website():
    url = 'http://127.0.0.1:8000/index.html'
    webbrowser.open(url)


def task_run_server():
    os.chdir('site')
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    task_open_website()
    httpd.serve_forever()

def task_build():
    pass