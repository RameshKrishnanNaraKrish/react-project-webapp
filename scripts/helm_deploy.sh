#!/bin/bash
set -e

# Variables
HELM_RELEASE_NAME="react-web-app-chart"
HELM_CHART_PATH="helm/react-web-app-chart/Blue"
KUBE_NAMESPACE="default"
KUBECONFIG_PATH="/home/ubuntu/.kube/config"
HELM_S3BUCKET_NAME="helms3bucket"

# Set KUBECONFIG environment variable
export KUBECONFIG=$KUBECONFIG_PATH

# Check if KUBECONFIG file exists
if [ ! -f "$KUBECONFIG_PATH" ]; then
    echo "Kubeconfig file not found at $KUBECONFIG_PATH"
    exit 1
fi

# # Verify Kubernetes cluster access
# if ! kubectl get nodes >/dev/null 2>&1; then
#     echo "Cannot access Kubernetes cluster. Check kubeconfig."
#     exit 1
# fi

# Deploy the Helm chart
echo "Deploying Helm chart..."
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack
aws s3 cp s3://$HELM_S3BUCKET_NAME/$HELM_CHART_PATH ./$HELM_CHART_PATH --recursive || {
    echo "Failed to download Helm chart values from S3."
    exit 1
}

# Install or upgrade Helm release
sudo helm upgrade --install $HELM_RELEASE_NAME $HELM_CHART_PATH --namespace $KUBE_NAMESPACE -f $HELM_CHART_PATH/values.blue.yaml --kubeconfig $KUBECONFIG_PATH || {
    echo "Helm install/upgrade failed."
    exit 1
}

# Verify deployment
helm status $HELM_RELEASE_NAME || {
    echo "Helm status check failed."
    exit 1
}