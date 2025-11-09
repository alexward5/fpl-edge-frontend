import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
    aws_s3 as s3,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins,
    aws_certificatemanager as acm,
    aws_route53 as route53,
    aws_route53_targets as route53Targets,
} from "aws-cdk-lib";

export class FrontendPlatformStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const apexDomain = "versostat.com";
        const zone = route53.HostedZone.fromLookup(this, "Zone", {
            domainName: apexDomain,
        });

        // Private S3 bucket for site content (CloudFront-only via OAC)
        const siteBucket = new s3.Bucket(this, "SiteBucket", {
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryption: s3.BucketEncryption.S3_MANAGED,
            enforceSSL: true,
        });

        // ACM Certificate for CloudFront
        const cert = new acm.Certificate(this, "FrontendCert", {
            domainName: apexDomain, // "versostat.com"
            subjectAlternativeNames: [`www.${apexDomain}`], // "www.versostat.com"
            validation: acm.CertificateValidation.fromDns(zone),
        });
        // CloudFront distribution with OAC
        const distribution = new cloudfront.Distribution(
            this,
            "SiteDistribution",
            {
                defaultRootObject: "index.html",
                domainNames: [apexDomain, `www.${apexDomain}`], // ["versostat.com", "www.versostat.com"]
                certificate: cert,
                defaultBehavior: {
                    origin: origins.S3BucketOrigin.withOriginAccessControl(
                        siteBucket,
                    ),
                    viewerProtocolPolicy:
                        cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                    compress: true,
                    cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
                },
                errorResponses: [
                    {
                        httpStatus: 403,
                        responseHttpStatus: 200,
                        responsePagePath: "/index.html",
                        ttl: cdk.Duration.seconds(0),
                    },
                    {
                        httpStatus: 404,
                        responseHttpStatus: 200,
                        responsePagePath: "/index.html",
                        ttl: cdk.Duration.seconds(0),
                    },
                ],
            },
        );

        // Route 53 aliases: apex and www -> CloudFront
        new route53.ARecord(this, "ApexA", {
            zone,
            recordName: "",
            target: route53.RecordTarget.fromAlias(
                new route53Targets.CloudFrontTarget(distribution),
            ),
        });
        new route53.AaaaRecord(this, "ApexAAAA", {
            zone,
            recordName: "",
            target: route53.RecordTarget.fromAlias(
                new route53Targets.CloudFrontTarget(distribution),
            ),
        });
        new route53.ARecord(this, "WwwA", {
            zone,
            recordName: "www",
            target: route53.RecordTarget.fromAlias(
                new route53Targets.CloudFrontTarget(distribution),
            ),
        });
        new route53.AaaaRecord(this, "WwwAAAA", {
            zone,
            recordName: "www",
            target: route53.RecordTarget.fromAlias(
                new route53Targets.CloudFrontTarget(distribution),
            ),
        });

        new cdk.CfnOutput(this, "FrontendBucketName", {
            value: siteBucket.bucketName,
            exportName: "VersoStat-FrontendBucketName",
        });
        new cdk.CfnOutput(this, "FrontendDistributionId", {
            value: distribution.distributionId,
            exportName: "VersoStat-FrontendDistributionId",
        });
        new cdk.CfnOutput(this, "FrontendDomainName", {
            value: apexDomain,
            exportName: "VersoStat-FrontendDomainName",
        });
    }
}
