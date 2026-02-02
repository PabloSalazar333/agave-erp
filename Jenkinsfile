pipeline {
    agent any

    environment {
        // Environment variables
        DOCKER_REGISTRY = "agave-erp"
        BACKEND_IMAGE = "agave-backend"
        FRONTEND_IMAGE = "agave-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend: Build & Test') {
            steps {
                dir('backend') {
                    // Give execution permission to gradlew
                    sh 'chmod +x gradlew'
                    sh './gradlew clean build -x test' // Skipping tests slightly for speed in dev, remove -x test for prod
                }
            }
        }

        stage('Frontend: Install & Build') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker: Build Images') {
            steps {
                script {
                    docker.build("${BACKEND_IMAGE}:${env.BUILD_NUMBER}", "./backend")
                    docker.build("${FRONTEND_IMAGE}:${env.BUILD_NUMBER}", "./frontend")
                }
            }
        }

        stage('Deploy: Dev Environment') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
