import { CfnOutput, RemovalPolicy, aws_s3 as s3 } from "aws-cdk-lib";
import { Distribution, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { Bucket, BucketAccessControl } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { ARecord, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { aws_certificatemanager as acm } from "aws-cdk-lib";
import { Construct } from "constructs";
import { resolve } from "path";
import { Route53 } from "./Route53";

interface Props {
  route53: Route53;
}

export class S3 extends Construct {
  public readonly web_bucket: Bucket;

  public readonly distribution: Distribution;

  public readonly web_bucket_deployment: BucketDeployment;

  constructor(scope: Construct, id: string, props: Props) {
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

    const certificateArn =
      "arn:aws:acm:us-east-1:533267189207:certificate/00247743-93d2-4388-a553-a9d90a1b8ffd";

    const certificate = acm.Certificate.fromCertificateArn(
      this,
      "StaticSiteCertificate",
      certificateArn
    );

    this.distribution = new Distribution(scope, "Frontend-Distribution", {
      certificate: certificate,
      domainNames: [DOMAIN_NAME],
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new S3Origin(this.web_bucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });

    new ARecord(scope, "FrontendAliasRecord", {
      zone: props.route53.hosted_zone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(this.distribution)),
      recordName: `${DOMAIN_NAME}`,
    });

    new CfnOutput(scope, "FrontendURL", {
      value: this.web_bucket.bucketWebsiteUrl,
    });
  }
}
