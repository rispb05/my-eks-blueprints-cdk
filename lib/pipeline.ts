// lib/pipeline.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';

import { TeamPlatform, TeamApplication } from '../teams';

export default class PipelineConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps){
    super(scope, id)

    const account = props?.env?.account!;
    const region = props?.env?.region!;

    const blueprint = blueprints.EksBlueprint.builder()
    .account(account)
    .region(region)
    .addOns()
    .teams(new TeamPlatform(account), new TeamApplication('b1appteam1',account));
  
    blueprints.CodePipelineStack.builder()
      .name("eks-blueprints-workshop-cdk-pipeline")
      .owner("rispb05")
      .repository({
          repoUrl: 'my-eks-blueprints-cdk',
          credentialsSecretName: 'github-token',
          targetRevision: 'main'
      })
      .wave({
        id: "envs",
        stages: [
          { id: "dev1", stackBuilder: blueprint.clone('us-west-2')},
          { id: "test1", stackBuilder: blueprint.clone('us-east-2')},
          { id: "prod1", stackBuilder: blueprint.clone('us-east-1')}
        ]
      })
      .build(scope, id+'-stack', props);
  }
}
