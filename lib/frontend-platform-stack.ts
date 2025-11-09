import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
    aws_s3 as s3,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins,
} from "aws-cdk-lib";

export class FrontendPlatformStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const siteBucket = new s3.Bucket(this, "SiteBucket", {
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryption: s3.BucketEncryption.S3_MANAGED,
            enforceSSL: true,
            versioned: false,
        });

        const headers = new cloudfront.ResponseHeadersPolicy(
            this,
            "SecurityHeaders",
            {
                securityHeadersBehavior: {
                    contentTypeOptions: { override: true },
                    frameOptions: {
                        frameOption: cloudfront.HeadersFrameOption.DENY,
                        override: true,
                    },
                    referrerPolicy: {
                        referrerPolicy:
                            cloudfront.HeadersReferrerPolicy.NO_REFERRER,
                        override: true,
                    },
                    strictTransportSecurity: {
                        accessControlMaxAge: cdk.Duration.days(365),
                        includeSubdomains: true,
                        preload: true,
                        override: true,
                    },
                    xssProtection: {
                        protection: true,
                        modeBlock: true,
                        override: true,
                    },
                },
            },
        );

        const dist = new cloudfront.Distribution(this, "SiteDistribution", {
            defaultRootObject: "index.html",
            defaultBehavior: {
                origin: origins.S3BucketOrigin.withOriginAccessControl(
                    siteBucket,
                ),
                viewerProtocolPolicy:
                    cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                compress: true,
                cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
                responseHeadersPolicy: headers,
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
        });

        new cdk.CfnOutput(this, "FrontendBucketName", {
            value: siteBucket.bucketName,
            exportName: "VersoStat-FrontendBucketName",
        });
        new cdk.CfnOutput(this, "FrontendDistributionId", {
            value: dist.distributionId,
            exportName: "VersoStat-FrontendDistributionId",
        });
        new cdk.CfnOutput(this, "FrontendDomainName", {
            value: dist.domainName,
            exportName: "VersoStat-FrontendDomainName",
        });
    }
}
