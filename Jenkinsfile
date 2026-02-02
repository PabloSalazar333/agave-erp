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

        stage('Backend: Build Microservices') {
            parallel {
                stage('Build Discovery') {
                    steps {
                        dir('services/discovery') {
                            sh 'chmod +x gradlew'
                            sh './gradlew clean build -x test'
                        }
                    }
                }
                stage('Build Gateway') {
                    steps {
                        dir('services/gateway') {
                            sh 'chmod +x gradlew'
                            sh './gradlew clean build -x test'
                        }
                    }
                }
                stage('Build Identity') {
                    steps {
                        dir('services/identity') {
                            sh 'chmod +x gradlew'
                            sh './gradlew clean build -x test'
                        }
                    }
                }
                stage('Build Core Backend') {
                    steps {
                        dir('backend') {
                            sh 'chmod +x gradlew'
                            sh './gradlew clean build -x test'
                        }
                    }
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
                    docker.build("agave-discovery:${env.BUILD_NUMBER}", "./services/discovery")
                    docker.build("agave-gateway:${env.BUILD_NUMBER}", "./services/gateway")
                    docker.build("agave-identity:${env.BUILD_NUMBER}", "./services/identity")
                    docker.build("agave-core:${env.BUILD_NUMBER}", "./backend")
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
