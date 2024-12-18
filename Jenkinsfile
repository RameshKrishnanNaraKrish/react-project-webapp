pipeline {
    agent any

    environment {
        DOCKER_IMAGE_TAG = "${env.BUILD_ID}"
        ECR_REPOSITORY_FRONTEND = 'reactprojectwebapp_frontend'
        DOCKER_HUB_REPOSITORY = 'rameshkrishnannarakrish/reactprojectwebapp_frontend'
        DOCKER_REGISTRY_URL = 'docker.io'
    }

    stages {
        stage('Checkout from Git') {
            steps {
                git branch: 'main', url: 'https://github.com/RameshKrishnanNaraKrish/react-project-webapp.git'
            }
        }

        stage('OWASP Dependency-Check Scan') {
            steps {
                dir('Application-Code/frontend') {
                    dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-Check'
                    dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
                }
            }
        }

        stage('Trivy File Scan') {
            steps {
                dir('Application-Code/frontend') {
                    sh 'trivy fs . > trivyfs.txt'
                }
            }
        }

        stage('Docker Login to Docker Hub') {
            steps {
                script {
                    // Use Jenkins credentials to log in to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin "$DOCKER_REGISTRY_URL"
                        '''
                    }
                }
            }
        }

        stage('Build and Push Docker Image to Docker Hub (frontend)') {
            steps {
                dir('frontend') {
                    script {
                        sh '''
                        docker build -t $DOCKER_HUB_REPOSITORY:$DOCKER_IMAGE_TAG .
                        docker tag $DOCKER_HUB_REPOSITORY:$DOCKER_IMAGE_TAG $DOCKER_HUB_REPOSITORY:$DOCKER_IMAGE_TAG
                        docker push $DOCKER_HUB_REPOSITORY:$DOCKER_IMAGE_TAG
                        '''
                    }
                }
            }
        }

        stage("TRIVY Image Scan") {
            steps {
                sh 'trivy image $DOCKER_HUB_REPOSITORY:$DOCKER_IMAGE_TAG > trivyimage.txt'
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/RameshKrishnanNaraKrish/react-project-webapp.git'
            }
        }
    }
}
