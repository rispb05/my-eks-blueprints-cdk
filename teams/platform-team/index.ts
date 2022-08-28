import { ArnPrincipal } from "aws-cdk-lib/aws-iam";
import { PlatformTeam } from '@aws-quickstart/eks-blueprints';

export class TeamPlatform extends PlatformTeam {
    constructor(accountID: string) {
        super({
            name: "platform",
            users: [new ArnPrincipal(`arn:aws:iam::000989759046:user/b1-platform-team1`)]
        })
    }
}
