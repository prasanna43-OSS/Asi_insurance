pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "your-dockerhub-username/static-website"
        DOCKER_TAG = "latest"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-username/your-repository.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
                        sh "docker push $DOCKER_IMAGE:$DOCKER_TAG"
                    }
                }
            }
        }

        stage('Deploy to AWS') {
            steps {
                script {
                    sh '''
                        ssh -i /path/to/your/key.pem ec2-user@<EC2_INSTANCE_PUBLIC_IP> "docker pull $DOCKER_IMAGE:$DOCKER_TAG && docker run -d -p 80:80 $DOCKER_IMAGE:$DOCKER_TAG"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
