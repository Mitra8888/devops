output "cluster_endpoints" {
  description = "EKS cluster endpoint"
  value       = module.eks.cluster_endopint
}