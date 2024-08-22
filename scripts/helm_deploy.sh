#!/bin/bash
set -e

# Variables
HELM_RELEASE_NAME="react-web-app"
HELM_CHART_PATH="helm/react-web-app-chart/Blue"
KUBE_NAMESPACE="default"
KUBECONFIG_PATH="/home/ubuntu/.kube/config"
HELM_S3BUCKET_NAME="helms3bucket"

# Set KUBECONFIG environment variable
export KUBECONFIG=$KUBECONFIG_PATH

# Deploy the Helm chart
echo "Deploying Helm chart..."
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack
aws s3 cp s3://$HELM_S3BUCKET_NAME/helm/react-web-app-chart/Blue ./helm/react-web-app-chart/Blue/ --recursive || {
    echo "Failed to download Helm chart values from S3."
    exit 1
}

# Install or upgrade Helm release
helm upgrade --install $HELM_RELEASE_NAME $HELM_CHART_PATH --namespace $KUBE_NAMESPACE || {
    echo "Helm install/upgrade failed."
    exit 1
}

# Verify deployment
helm status $HELM_RELEASE_NAME || {
    echo "Helm status check failed."
    exit 1
}