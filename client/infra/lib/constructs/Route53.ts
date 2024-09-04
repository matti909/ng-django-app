import { HostedZone, IHostedZone } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";

export class Route53 extends Construct {
  public readonly hosted_zone: IHostedZone;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const DOMAIN_NAME = "fastapp.website";

    this.hosted_zone = HostedZone.fromLookup(scope, "react-front", {
      domainName: DOMAIN_NAME,
    });
  }
}
