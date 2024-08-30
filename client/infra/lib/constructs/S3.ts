import { CfnOutput, RemovalPolicy, aws_s3 as s3 } from "aws-cdk-lib";
import { Bucket, BucketAccessControl } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { resolve } from "path";

export class S3 extends Construct {
  public readonly web_bucket: Bucket;

  public readonly web_bucket_deployment: BucketDeployment;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const DOMAIN_NAME = "fastapp.website";

    this.web_bucket = new Bucket(scope, "WebBucket", {
      bucketName: DOMAIN_NAME,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    this.web_bucket_deployment = new BucketDeployment(
      scope,
      "WebBucketDeployment",
      {
        sources: [Source.asset(resolve(__dirname, "..", "..", "..", "dist"))],
        destinationBucket: this.web_bucket,
      }
    );

    new CfnOutput(scope, "FrontendURL", {
      value: this.web_bucket.bucketWebsiteUrl,
    });
  }
}
