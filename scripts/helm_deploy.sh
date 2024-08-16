#!/bin/bash
set -e

# Variables
HELM_RELEASE_NAME="react-web-app"
HELM_CHART_PATH="helm/react-web-app-chart"
KUBE_NAMESPACE="default"

# Deploy the Helm chart
echo "Deploying Helm chart..."
helm upgrade --install $HELM_RELEASE_NAME $HELM_CHART_PATH --namespace $KUBE_NAMESPACE

# Verify deployment
helm status $HELM_RELEASE_NAME
