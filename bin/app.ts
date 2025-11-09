#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { FrontendPlatformStack } from "../lib/frontend-platform-stack.ts";

const app = new cdk.App();
new FrontendPlatformStack(app, "VersoStat-FrontendPlatformStack-prod", {
    env: { account: "586999013151", region: "us-east-1" },
});
