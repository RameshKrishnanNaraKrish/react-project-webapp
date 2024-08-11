pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = '730335412393'
        AWS_REGION = 'us-east-1'
        ECR_REPOSITORY_FRONTEND = 'reactprojectwebapp_frontend'
        ECR_REPOSITORY_SERVICE1 = 'reactprojectwebapp_service1'
        ECR_REPOSITORY_SERVICE2 = 'reactprojectwebapp_service2'
        DOCKER_IMAGE_TAG = "${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Node.js and npm') {
            steps {
                script {
                    sh '''
                    sudo curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
                    sudo apt-get install -y nodejs
                    '''
                }
            }
        }

        stage('Install dependencies frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Install dependencies service1') {
            steps {
                dir('backend/service1') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Install dependencies service2') {
            steps {
                dir('backend/service2') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Login to ECR') {
            steps {
                script {
                    sh '''
                    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                    '''
                }
            }
        }

        stage('Build and Push Docker Image frontend') {
            steps {
                script {
                    sh '''
                    docker build -t $ECR_REPOSITORY_FRONTEND:$DOCKER_IMAGE_TAG ./frontend
                    docker tag $ECR_REPOSITORY_FRONTEND:$DOCKER_IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_FRONTEND:$DOCKER_IMAGE_TAG
                    docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_FRONTEND:$DOCKER_IMAGE_TAG
                    '''
                }
            }
        }

        stage('Build and Push Docker Image service1') {
            steps {
                script {
                    sh '''
                    docker build -t $ECR_REPOSITORY_SERVICE1:$DOCKER_IMAGE_TAG ./backend/service1
                    docker tag $ECR_REPOSITORY_SERVICE1:$DOCKER_IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_SERVICE1:$DOCKER_IMAGE_TAG
                    docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_SERVICE1:$DOCKER_IMAGE_TAG
                    '''
                }
            }
        }

        stage('Build and Push Docker Image service2') {
            steps {
                script {
                    sh '''
                    docker build -t $ECR_REPOSITORY_SERVICE2:$DOCKER_IMAGE_TAG ./backend/service2
                    docker tag $ECR_REPOSITORY_SERVICE2:$DOCKER_IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_SERVICE2:$DOCKER_IMAGE_TAG
                    docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_SERVICE2:$DOCKER_IMAGE_TAG
                    '''
                }
            }
        }

        stage('SonarCloud Scan') {
            steps {
                script {
                    withSonarQubeEnv('sonar-server') {
                        sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=react-project-webapp -Dsonar.projectKey=RameshKrishnanNaraKrish_react-project-webapp '''
                    }
                }
            }
        }

        stage('Update Helm Values') {
            steps {
                script {
                    sh '''
                    sed -i 's/tag: .*/tag: "${env.BUILD_ID}"/' helm/react-web-app-chart/values.yaml
                    git config --global user.email "actions@github.com"
                    git config --global user.name "GitHub Actions"
                    git add helm/react-web-app-chart/values.yaml
                    git commit -m "Update tag in Helm chart"
                    git push
                    '''
                }
            }
        }
    }
}
