#!/usr/bin/env bash
set -euo pipefail

# --- Config (override via env) ---
AWS_REGION="${AWS_REGION:-us-east-1}"
AWS_PROFILE="${AWS_PROFILE:-}"
BUILD_CMD="${BUILD_CMD:-npm run build}"
DIST_DIR="${DIST_DIR:-dist}"

# --- AWS CLI args (profile optional) ---
AWS_ARGS=(--region "$AWS_REGION")
[ -n "$AWS_PROFILE" ] && AWS_ARGS+=(--profile "$AWS_PROFILE")

echo "Building frontend: $BUILD_CMD"
eval "$BUILD_CMD"
[ -d "$DIST_DIR" ] || { echo "Build output not found: $DIST_DIR"; exit 1; }

echo "Reading CloudFormation exports..."
BUCKET="$(aws cloudformation list-exports "${AWS_ARGS[@]}" \
  --query "Exports[?Name=='VersoStat-FrontendBucketName'].Value" \
  --output text)"
DIST_ID="$(aws cloudformation list-exports "${AWS_ARGS[@]}" \
  --query "Exports[?Name=='VersoStat-FrontendDistributionId'].Value" \
  --output text)"

[ -n "$BUCKET" ] && [ "$BUCKET" != "None" ] || { echo "Missing export: VersoStat-FrontendBucketName"; exit 1; }
[ -n "$DIST_ID" ] && [ "$DIST_ID" != "None" ] || { echo "Missing export: VersoStat-FrontendDistributionId"; exit 1; }

echo "Bucket: $BUCKET"
echo "Distribution: $DIST_ID"

echo "Syncing assets to s3://$BUCKET (immutable cache)..."
aws s3 sync "$DIST_DIR/" "s3://$BUCKET" "${AWS_ARGS[@]}" \
  --delete \
  --exclude "index.html" \
  --cache-control "public,max-age=31536000,immutable" \
  --only-show-errors

echo "Uploading index.html (no-cache)..."
[ -f "$DIST_DIR/index.html" ] || { echo "index.html not found in $DIST_DIR"; exit 1; }
aws s3 cp "$DIST_DIR/index.html" "s3://$BUCKET/index.html" "${AWS_ARGS[@]}" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html; charset=utf-8" \
  --only-show-errors

echo "Creating CloudFront invalidation /* ..."
aws cloudfront create-invalidation "${AWS_ARGS[@]}" \
  --distribution-id "$DIST_ID" \
  --paths "/*" >/dev/null

echo "Deploy complete. Visit https://versostat.com"
