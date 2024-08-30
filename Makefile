CLUSTER_NAME=minuevoclusterdelinux
AWS_REGION=us-east-2
SERVICE_NAME=minuevoservice_cli
APPNAME=mi_app_por_cli

task:
	aws ecs register-task-definition --region ${AWS_REGION} \
    --cli-input-json file://task-definition-ec2.json

createService:
	aws ecs create-service \
    --cluster ${CLUSTER_NAME} \
    --service-name ${SERVICE_NAME} \
    --task-definition ${APPNAME} \
    --desired-count 1  \
    --launch-type EC2 \

updateService:
	aws ecs update-service --cluster ${CLUSTER_NAME} \
    --desired-count 0  \
    --service ${SERVICE_NAME} \
    --region ${AWS_REGION}  \
    --task-definition ${APPNAME}        


createRole:
	aws iam create-role --role-name ecsTaskExecutionRole \
    --assume-role-policy-document file://ecs-task-policy.json

	aws iam attach-role-policy --role-name ecsTaskExecutionRole \
    --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

createRepo:
	aws ecr create-repository \
    --repository-name sample-repo \
    --image-tag-mutability IMMUTABLE



