pipeline {
    agent any
    environment {
        PATH = "/usr/bin:$PATH"
        tag = "1.0"
        dockerHubUser = "prasanna4344"
        containerName = "insure-me"
        httpPort = "8081"
    }
    stages {
        stage("Code Clone") {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/prasanna43-OSS/Asi_insurance.git']])
            }
        }
        stage("Maven Build") {
            steps {
                sh "mvn clean install -DskipTests"
            }
        }
        stage("Build Docker Image") {
            steps {
                sh "docker build -t ${dockerHubUser}/insure-me:${tag} ."
            }
        }
        stage("Push Image to Docker Hub") {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerHubAccount', passwordVariable: 'dockerPassword', usernameVariable: 'dockerUser')]) {
                    sh "docker login -u $dockerUser -p $dockerPassword"
                    sh "docker push $dockerUser/$containerName:$tag"
                }
            }
        }
        stage("Docker Container Deployment") {
            steps {
                sh "docker rm $containerName -f"
                sh "docker pull $dockerHubUser/$containerName:$tag"
                sh "docker run -d --rm -p $httpPort:$httpPort --name $containerName $dockerHubUser/$containerName:$tag"
                echo "Application started on port: ${httpPort} (http)"
            }
        }
    }
}
