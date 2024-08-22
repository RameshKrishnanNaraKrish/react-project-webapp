#!/bin/bash
set -e

# Variables
HELM_RELEASE_NAME="react-web-app"
HELM_CHART_PATH="helm/react-web-app-chart"
KUBE_NAMESPACE="default"
KUBECONFIG_PATH="/home/ubuntu/.kube/config"
HELM_S3BUCKET_NAME = "helms3bucket"

# Set KUBECONFIG environment variable
export KUBECONFIG=$KUBECONFIG_PATH

# Deploy the Helm chart
echo "Deploying Helm chart..."
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack
aws s3 cp s3://$HELM_S3BUCKET_NAME/helm/react-web-app-chart/Blue ./helm/react-web-app-chart/Blue/values.blue.yaml --recursive
helm upgrade --install $HELM_RELEASE_NAME $HELM_CHART_PATH --namespace $KUBE_NAMESPACE --kubeconfig $KUBECONFIG_PATH

# Verify deployment
helm status $HELM_RELEASE_NAME