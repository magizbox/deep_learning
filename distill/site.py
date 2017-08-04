from collections import ChainMap
import yaml
from distill.config import *

class Page:
    def __init__(self, properties):
        self.__dict__.update(properties)


class RawPage(Page):
    def __init__(self, properties):
        super(RawPage, self).__init__(properties)


class FrontPage(Page):
    def __init__(self, properties):
        super(FrontPage, self).__init__(properties)


class PostPage(Page):
    def __init__(self, properties):
        super(PostPage, self).__init__(properties)


class PageFactory:
    pages = {
        "raw": RawPage,
        "frontpage": FrontPage,
        "post": PostPage
    }

    @staticmethod
    def create(data):
        title = list(data.keys())[0]
        properties = dict(ChainMap(*data[title]))
        properties["title"] = title
        return PageFactory.pages[properties["type"]](properties)


def load_site():
    with open(join(project_folder, "distill.yml"), "r") as f:
        site = yaml.load(f)
        site["pages"] = [PageFactory.create(data) for data in site["pages"]]
        return site
