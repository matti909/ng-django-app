import { Peer, Port, SecurityGroup, Vpc } from "aws-cdk-lib/aws-ec2";
import { Repository } from "aws-cdk-lib/aws-ecr";
import {
  Cluster,
  ContainerImage,
  FargateService,
  FargateTaskDefinition,
  LogDriver,
  Protocol,
} from "aws-cdk-lib/aws-ecs";
import { Construct } from "constructs";

export class ECS extends Construct {
  public readonly vpc: Vpc;

  public readonly cluster: Cluster;

  public readonly task_definition: FargateTaskDefinition;

  public readonly service: FargateService;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Crear la VPC
    this.vpc = new Vpc(this, "Vpc", { maxAzs: 2 });

    // Crear el cluster ECS
    this.cluster = new Cluster(this, "EcsCluster", {
      vpc: this.vpc,
      containerInsights: true,
    });

    // Obtener el repositorio ECR
    const repo = Repository.fromRepositoryArn(
      this,
      "Repository",
      "arn:aws:ecr:us-east-2:533267189207:repository/backendsocialapp"
    );

    // Definir la imagen del contenedor desde el repositorio ECR
    const image = ContainerImage.fromEcrRepository(repo, "latest");

    // Definir la task definition para Fargate
    this.task_definition = new FargateTaskDefinition(this, "TaskDefinition", {
      cpu: 1024,
      memoryLimitMiB: 3072,
    });

    // Agregar un contenedor a la task definition
    const container = this.task_definition.addContainer("backendsocialappv2", {
      image: image,
      cpu: 1024,
      memoryLimitMiB: 3072,
      memoryReservationMiB: 2048,
      logging: LogDriver.awsLogs({
        streamPrefix: "ecs",
      }),
    });

    // Agregar los puertos del contenedor
    container.addPortMappings({
      containerPort: 8000,
      hostPort: 8000,
      protocol: Protocol.TCP,
    });

    const securityGroup = new SecurityGroup(this, "SecurityGroup", {
      vpc: this.vpc,
      allowAllOutbound: true,
    });

    securityGroup.addIngressRule(
      Peer.anyIpv4(),
      Port.tcp(8000),
      "Allow traffic on port 8000"
    );

    // Crear el servicio Fargate
    this.service = new FargateService(this, "Service", {
      cluster: this.cluster,
      circuitBreaker: {
        rollback: true,
      },
      taskDefinition: this.task_definition,
      assignPublicIp: true,
      desiredCount: 1,
      securityGroups: [securityGroup],
      capacityProviderStrategies: [
        {
          capacityProvider: "FARGATE",
          weight: 1,
        },
        {
          capacityProvider: "FARGATE_SPOT",
          weight: 1,
        },
      ],
    });
  }
}
