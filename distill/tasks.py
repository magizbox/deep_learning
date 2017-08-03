# -*- coding: utf-8 -*-
import os
import shutil
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler
from os.path import dirname, join
import yaml


def task_open_website():
    url = 'http://127.0.0.1:8000/index.html'
    webbrowser.open(url)


def task_run_server():
    os.chdir('site')
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    task_open_website()
    httpd.serve_forever()


def _remove_site_folder():
    project_folder = dirname(dirname(__file__))
    site_folder = join(project_folder, 'site')
    try:
        shutil.rmtree(site_folder)
    except:
        pass
    finally:
        pass


def _copy_template():
    project_folder = dirname(dirname(__file__))
    site_folder = join(project_folder, 'site')
    template_folder = join(project_folder, 'distill_template')
    shutil.copytree(template_folder, site_folder)


from jinja2 import Environment, select_autoescape, FileSystemLoader


def _render_file(filename):
    project_folder = dirname(dirname(__file__))
    template_folder = join(project_folder, "distill_template")
    site_folder = join(project_folder, "site")
    with open(join(project_folder, "distill.yml"), "r") as f:
        content = yaml.load(f)
    env = Environment(
        autoescape=select_autoescape(['html', 'xml']),
        loader=FileSystemLoader(template_folder))
    template = env.get_template(filename)
    output = template.render(content)
    with open(join(site_folder, filename), "w", encoding="utf-8") as f:
        f.write(output)


def _render_template():
    # files = ["index.html", "cnn.html", "rnn.html"]
    files = ["index.html", "cnn.html", "rnn.html", "get_started.html"]
    for f in files:
        _render_file(f)


def task_build():
    _remove_site_folder()
    _copy_template()
    _render_template()
    task_run_server()
