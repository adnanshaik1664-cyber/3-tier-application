pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        FRONTEND_REPO = '148286034039.dkr.ecr.us-east-1.amazonaws.com/todo-frontend'
        BACKEND_REPO = '148286034039.dkr.ecr.us-east-1.amazonaws.com/todo-backend'
        CLUSTER_NAME = 'three-tier-cluster'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t todo-frontend ./Frontend'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t todo-backend ./backend'
            }
        }

        stage('Login to Amazon ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION | \
                docker login --username AWS --password-stdin 148286034039.dkr.ecr.us-east-1.amazonaws.com
                '''
            }
        }

        stage('Tag Images') {
            steps {
                sh '''
                docker tag todo-frontend:latest $FRONTEND_REPO:latest
                docker tag todo-backend:latest $BACKEND_REPO:latest
                '''
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                docker push $FRONTEND_REPO:latest
                docker push $BACKEND_REPO:latest
                '''
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh '''
                kubectl apply -f k8s/
                kubectl rollout restart deployment/frontend
                kubectl rollout restart deployment/backend
                '''
            }
        }
    }

    post {
        success {
            echo 'Application deployed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}
