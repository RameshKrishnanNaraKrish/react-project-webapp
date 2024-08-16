#!/bin/bash
set -e

# Variables
HELM_RELEASE_NAME="my-app"
KUBE_NAMESPACE="default"

# Clean up Helm release
echo "Cleaning up Helm release..."
helm uninstall $HELM_RELEASE_NAME --namespace $KUBE_NAMESPACE

# Additional clean-up steps can be added here
# For example: Deleting temporary files, resetting configurations, etc.

echo "Cleanup completed."
