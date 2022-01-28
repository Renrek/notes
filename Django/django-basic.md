# Django Setup


[Recommended Tutorial](https://www.djangoproject.com/start/)

## Base Requirements
 - Python 3 and pip

## Development Setting Up
Note: These instructions are made using vsCode and Windows in mind.

1. Clone repo
1. Navigate to the base directory of the project with your IDE
1. Create virtual environment `python -m venv venv` from within the terminal. This should generate a directory within the base folder of the project.
1. Activate the virtual environment by the following command `. venv/Scripts/activate` "(venv)" Should now be displayed within your terminal indicating you are using a virtual space. [More Info - Python Docs](https://docs.python.org/3/library/venv.html) also [Additional Info](https://realpython.com/python-virtual-environments-a-primer/)
1. Install the package dependencies from the requirements.txt with the following command `pip install -r requirements.txt`
1. Migrate initial database by `python manage.py migrate` to set up existing models.
1. Start the server development server by `python manage.py runserver` which should start a server by default on [http://127.0.0.1:8000](http://127.0.0.1:8000)

## File Layout - work in progress
- core/ - for base pages such as home, login, about etc
- app/ - (not yet implemented) - location of Models and user interfaces(pages)
- templates/ - base files for constructing other html files, has boiler-plate html, note that app and core have their own template folders
- static/ - place to put css, images and javascript files

## Misc
- Already configured for bootstrap and jquery