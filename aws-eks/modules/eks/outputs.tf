output "cluster_endopint" {
    description = "EKS cluster endpoint"
    value = aws_eks_cluster.main-eks-cluster.endpoint
}