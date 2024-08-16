#!/bin/bash
set -e

# Download Helm binary
HELM_VERSION="v3.12.0"
curl -fsSL -o /tmp/get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3

# Install Helm
chmod 700 /tmp/get_helm.sh
/tmp/get_helm.sh --version $HELM_VERSION

# Verify installation
helm version --short
