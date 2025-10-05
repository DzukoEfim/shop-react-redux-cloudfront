import { Construct } from "constructs";
import { aws_s3, aws_cloudfront_origins, aws_cloudfront, aws_s3_deployment, CfnOutput, RemovalPolicy } from 'aws-cdk-lib';

const staticPath = './resources/build'

export class DeploymentService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const hostingBucket = new aws_s3.Bucket(this, 'FrontEndStaticBucket', {
      blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const distribution = new aws_cloudfront.Distribution(
      this,
      'CloudFroinDistribution',
      {
        defaultBehavior: {
          origin: aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(hostingBucket),
          viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: 'index.html',
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
          },
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
          },
        ],
      }
    );

    new aws_s3_deployment.BucketDeployment(this, 'BucketDeployment', {
      sources: [aws_s3_deployment.Source.asset(staticPath)],
      destinationBucket: hostingBucket,
      distribution,
      distributionPaths: ['/*'],
    });

    new CfnOutput(this, 'CloudFrontUrl', {
      value: distribution.domainName,
      description: 'The distribution url',
      exportName: 'CloudfrontUrl',
    });

    new CfnOutput(this, 'BucketDomainName', {
      value: hostingBucket.bucketDomainName,
      description: 'The domainName of the S3 bucket',
      exportName: 'BucketDomainName',
    });

    new CfnOutput(this, 'BucketName', {
      value: hostingBucket.bucketName,
      description: 'The name of the S3 bucket',
      exportName: 'BucketName',
    });
  }
}