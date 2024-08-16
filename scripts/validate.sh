#!/bin/bash
set -e

# Variables
HELM_RELEASE_NAME="my-app"
KUBE_NAMESPACE="default"

# Validate deployment
echo "Validating deployment..."
kubectl get pods --namespace $KUBE_NAMESPACE | grep $HELM_RELEASE_NAME

# Additional validation checks can be added here
# For example: Checking service availability, health checks, etc.

echo "Deployment validation completed."
