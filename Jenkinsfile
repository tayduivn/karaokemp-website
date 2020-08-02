pipeline {
  triggers {
    pollSCM('* * * * *')
  }
  agent any
  stages{
     stage('build'){
       environment {
                 CI=true
                 //npm_config_prefix='frontend
                 JEST_JUNIT_OUTPUT_DIR='../reports'
               }
       parallel{
         stage('frontend'){
           environment {
              SERVICE='frontend'
            }
           /*when {
            changeset 'frontend/**'
          }*/
           stages{
             stage('Install packages') {
          steps {
            dir("${SERVICE}"){
              sh 'npm install'
            }
          }
        }
             stage('Unit Tests') {
          environment {
            JEST_JUNIT_OUTPUT_NAME="${SERVICE}.xml"
          }
      steps {
        dir("${SERVICE}"){
          sh 'npm test'
        }
        junit "reports/${SERVICE}.xml"
      }
    }
           }
         }
         
         stage('backend'){
            environment {
              SERVICE='backend'
            }
            /*when {
        changeset 'backend/**'
      }*/
              stages{
            stage('Install packages') {
      /*when {
        changeset 'backend/**'
      }*/
      steps {
        dir("${SERVICE}"){
          sh 'npm install'
        }      
    }
  }
    stage('Unit tests'){
      environment {
          JEST_JUNIT_OUTPUT_NAME="${SERVICE}.xml"
      }
      steps{
        dir("${SERVICE}"){
          sh 'npm test'

        }
        junit "reports/${SERVICE}.xml"
      }
    }
         }
           }
       }
     }
     stage('Publish Artifacts'){
       steps{
         echo "Publishing Artifacts"
       }
     }
     stage('Deploy'){
       parallel{
         stage('Integration'){
            steps{
              echo "Deploying to Integration"
           }
         }
         stage('QA'){
           steps{
             echo "Deploying to QA"
           }
         }
       }
     }
     stage('Acceptance Tests'){
        steps{
            echo 'Testing...'
        }
       }
      stage('Deploy to Production') {
            input {
                message "Deploy to Production?"
                ok "Deploy!"

                submitter "alice,bob"
                parameters {
                    string(name: 'Deployer', defaultValue: 'Ophirus Magnivus', description: "Who does order the deploy?")
                }
            }
            steps {
                echo "${Deployer} deployed to production! He is to blame!"
            }
        }  
  }   
}