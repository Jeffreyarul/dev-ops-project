# dev-ops-project

A DevOps-focused student assignment tracker built with Flask and SQLite. This repository includes local app code, container packaging, CI/CD pipeline support, Kubernetes manifests, and Ansible deployment automation.

## Repository layout

- `backend/` - Flask application and Python dependencies
- `frontend/` - HTML templates and static assets
- `devops/` - infrastructure automation files
  - `devops/k8s/` - Kubernetes deployment/service manifests
  - `devops/ansible/` - Ansible playbook for deployment
- `Dockerfile` - container image build instructions
- `docker-compose.yml` - local compose setup
- `Jenkinsfile` - CI/CD pipeline definition
- `.github/workflows/docker.yml` - GitHub Actions Docker workflow

## Prerequisites

- Python 3.10+ installed
- Docker installed for container builds
- Git installed for repository management
- Optional: `kubectl`, `minikube`, `ansible`, and `ansible-galaxy` for DevOps automation

## Run locally (without Docker)

1. Create a Python virtual environment:
   - `python -m venv .venv`
2. Activate the environment:
   - macOS/Linux: `source .venv/bin/activate`
   - Windows (PowerShell): `.\.venv\Scripts\Activate`
3. Install dependencies:
   - `pip install -r backend/requirements.txt`
4. Start the Flask app:
   - `python backend/app.py`
5. Open the app in your browser:
   - `http://127.0.0.1:5000`

## Docker

Build and run the project in a Docker container:

```bash
cd c:/Users/ursra/Downloads/devops-assignment-tracker-clean-main
docker build -t dev-ops-project:latest .
docker run -d --name dev-ops-project -p 5000:5000 dev-ops-project:latest
```

Then open:

- `http://localhost:5000`

To stop and remove the container:

```bash
docker stop dev-ops-project
docker rm dev-ops-project
```

Alternatively, use Docker Compose:

```bash
docker compose up --build
```

## Jenkins pipeline

The `Jenkinsfile` is designed to support a simple CI/CD flow with stages such as:

- Install dependencies
- Run basic validation
- Build Docker image
- Deploy the container

Use Jenkins to execute the pipeline from the repository root.

## Kubernetes deployment

1. Build the Docker image:
   - `docker build -t dev-ops-project:latest .`
2. If using Minikube, load the image:
   - `minikube image load dev-ops-project:latest`
3. Apply manifests:
   - `kubectl apply -f devops/k8s/deployment.yaml`
   - `kubectl apply -f devops/k8s/service.yaml`
4. Verify resources:
   - `kubectl get pods`
   - `kubectl get svc assignment-tracker-service`

If you need to access the service locally with Minikube:

```bash
minikube service assignment-tracker-service --url
```

## Ansible deployment

Install required collection first:

```bash
ansible-galaxy collection install community.docker
```

Create an inventory file, for example `inventory.ini`:

```ini
[app]
your-server-ip ansible_user=ubuntu
```

Then run the playbook:

```bash
ansible-playbook -i inventory.ini devops/ansible/ansible-playbook.yml
```

The playbook installs Docker, starts the service, and runs the app container on port `5000`.

## GitHub repository

This project is published at: `https://github.com/Jeffreyarul/dev-ops-project`
