import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ECS } from "./constructs/ECS";
//import { S3 } from "./constructs/S3";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  //public readonly s3: S3;

  public readonly ecs: ECS;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //this.s3 = new S3(this, "S3");

    this.ecs = new ECS(this, "ECS");
  }
}
