from distill.config import *


class PageExtendWorker():
    @staticmethod
    def extend(page, site):
        f = page.page
        content = open(join(doc_folder, f), "r", encoding="utf-8").read()
        template_file = "{}.html".format(page.type)
        template = '{% extends "' + template_file + '" %}\n' + \
                   '{% block content %}\n' + \
                   content + \
                   '{% endblock %}'
        with open(join(temp_site_folder, f), "w", encoding="utf-8") as f:
            f.write(template)
