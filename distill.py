import argparse
from distill.tasks import task_run_server, task_build


tasks = {
    "serve": task_run_server,
    "build": task_build
}

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("command")
    args = parser.parse_args()
    command = args.command
    tasks[command]()
