# SmartVote CICD Pipeline
This project implements a CI/CD pipeline for building, testing, and deploying a SmartVote web application using Jenkins, Docker, and EC2.

## Table of Contents
- Overview
- Requirements
- Setup
- Pipeline Structure
- Deployment Instructions
- How It Works
- Conclusion

## Overview
The SmartVote application is a voting system with a frontend built using React.js and a backend built with Node.js and MongoDB. The CI/CD pipeline ensures the smooth build, test, and deployment process using Jenkins to an EC2 instance.

## Requirements
Before you proceed, make sure you have the following:

- Jenkins: Installed and configured with required plugins (e.g., Docker, Git, etc.).
- Docker: Docker installed on both your local machine and EC2 instance.
- EC2 Instance: A remote EC2 instance with SSH access.
- GitHub Repository: Your repository with the project code.
- Docker Hub: A Docker Hub account to push and pull Docker images.
- SSH Key: A key pair for SSH access to your EC2 instance.
- MongoDB URI: MongoDB connection string (e.g., hosted MongoDB instance).
- JWT_SECRET: A secret for signing JWT tokens for authentication.

## Setup
### 1. Clone the Repository
Start by cloning the repository into your local machine or Jenkins workspace.

```bash
git clone https://github.com/SomnathAmbati/SmartVote_CICD_PIPELINE.git
cd SmartVote_CICD_PIPELINE
```

### 2. Dockerfile Configuration
The project contains two Dockerfiles:

- Dockerfile.backend: Used for the backend image.
- Dockerfile.frontend: Used for the frontend image (React.js).

Make sure you configure the correct REACT_APP_BACKEND_URL or the EC2_PUBLIC_IP as needed.

## Pipeline Structure
The pipeline is structured to perform the following steps:

1. Checkout Code: Pulls the latest code from the repository.

2. Build & Push Docker Images:
   - Builds the frontend and backend Docker images.
   - Pushes the built images to Docker Hub.

3. Deploy to EC2 Instance:
   - SSH into the EC2 instance.
   - Pulls the Docker images from Docker Hub.
   - Sets up necessary environment variables in .env.
   - Deploys the application using docker-compose.

## Deployment Instructions
### 1. Create the .env file on EC2
The following environment variables must be set for both the backend and frontend applications:

- MONGO_URI: MongoDB URI connection string.
- JWT_SECRET: JWT secret key for authentication.
- PUBLIC_API_URL: The public URL for the API (e.g., EC2 IP with port).

The .env file is dynamically generated on the EC2 instance using the pipeline.

### 2. Configure Jenkins
Ensure that Jenkins is set up with the following credentials:

- Git Credentials (Git_Cred)
- Docker Hub Credentials (Docker_Cred)
- EC2 SSH Key (ec2_ssh_key)
- MongoDB URI (MONGO_URI)
- JWT Secret (JWT_SECRET)
  
The credentials listed above are securely managed within Jenkins using Jenkins Credentials Plugin. This ensures that sensitive information such as your MongoDB URI, JWT Secret, EC2 SSH Key, and Docker Hub credentials are never exposed in your Jenkins pipeline scripts or logs.

### 3. Jenkins Pipeline
Create a Jenkins pipeline job that uses the Jenkinsfile found in this repository. The pipeline will automatically:

- Pull the latest code.
- Build and push Docker images.
- Deploy the application to EC2.

### 4. EC2 Configuration
Ensure your EC2 instance is ready for deployment:

- Docker and Docker Compose should be installed.
- SSH access should be available with the private key.

### 5. Access the Application
Once deployed, the application will be accessible at http://<EC2-IP>:80.

## How It Works
### CI Pipeline:
- The Jenkins pipeline builds the frontend and backend Docker images.
- The REACT_APP_BACKEND_URL is dynamically set using the EC2 public IP during the pipeline run.
- Images are then pushed to Docker Hub.

### CD Pipeline:
- The EC2 instance fetches the latest Docker images.
- Environment variables such as MONGO_URI, JWT_SECRET, and PUBLIC_API_URL are used for the backend configuration.
- Docker Compose is used to start the containers and deploy the application.

### Debugging Steps
```bash
# Check all running containers
docker ps

# View container logs
docker logs smartvote-frontend
docker logs smartvote-backend
docker logs smartvote-nginx

# Check Nginx configuration
docker exec smartvote-nginx cat /etc/nginx/conf.d/default.conf

# Examine frontend files in Nginx
docker exec smartvote-nginx ls -la /usr/share/nginx/html

# Restart containers if needed
docker restart smartvote-nginx
docker restart smartvote-frontend
docker restart smartvote-backend

# Check environment variables
cat .env
```

## Conclusion
This pipeline automates the process of building, testing, and deploying the SmartVote application using Jenkins, Docker, and EC2. By integrating these tools, we ensure a robust CI/CD pipeline for seamless deployment and updates.

Once the deployment is complete, you can **access the SmartVote web application** by visiting: **http://<EC2_PUBLIC_IP>/9090**

**Frontend** -
![image](https://github.com/user-attachments/assets/e482ee92-56b6-4a29-b8fe-76137222c005)

**Backend** -
![image](https://github.com/user-attachments/assets/a2820199-7e4f-4950-8691-b4e199fa1b6c)


