from os.path import dirname, join

project_folder = dirname(dirname(__file__))
site_folder = join(project_folder, 'site')
doc_folder = join(project_folder, 'docs')
template_folder = join(project_folder, "distill_template")
temp_site_folder = join(project_folder, '_site')
