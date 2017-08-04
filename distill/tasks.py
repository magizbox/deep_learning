# -*- coding: utf-8 -*-
import os
import shutil
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler
from jinja2 import Environment, select_autoescape, FileSystemLoader

from distill.extend import PageExtendWorker
from distill.site import load_site
from distill.config import *


def task_open_website():
    url = 'http://127.0.0.1:8000/index.html'
    webbrowser.open(url)


def task_run_server():
    os.chdir('site')
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    task_open_website()
    httpd.serve_forever()


def _bootstrap():
    try:
        shutil.rmtree(site_folder)
    except:
        pass
    try:
        shutil.rmtree(temp_site_folder)
    except:
        pass


def _copy_template():
    shutil.copytree(template_folder, temp_site_folder)


def _render_file(filename):
    site = load_site()
    env = Environment(
        autoescape=select_autoescape(['html', 'xml']),
        loader=FileSystemLoader(temp_site_folder))
    template = env.get_template(filename)
    output = template.render(site)
    with open(join(site_folder, filename), "w", encoding="utf-8") as f:
        f.write(output)


def _extend_template():
    site = load_site()
    for page in site["pages"]:
        PageExtendWorker.extend(page, site)


def _render_template():
    site = load_site()
    files = [p.page for p in site["pages"]]
    shutil.copytree(temp_site_folder, site_folder)
    for f in files:
        _render_file(f)


def _sweep():
    try:
        shutil.rmtree(temp_site_folder)
    except:
        pass


def task_build():
    _bootstrap()
    _copy_template()
    _extend_template()
    _render_template()
    _sweep()
    task_run_server()
