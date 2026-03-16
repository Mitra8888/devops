variable "region" {
    description = "AWS region"
    type = string
    default = "us-east-1"
}

variable "vpc_id"{
    description = "VPC ID for EKS cluster"
    type = string
}

variable "subnet_id" {
    description = "Subnet ID"
    type = list(string)
}

variable "eks_cluster_name" {
    description = "Name of EKS cluster"
    type = string
}

variable "cluster_version" {
    description = "Cluster version"
    type = string
}

variable "node_groups" {
    description = "EKS node group configuration variable"

    type = map(
        object({
            instante_types = list(string)
            capacity_type = string

            scaling_config = object({
              desired_size = number
              max_size = number 
              min_size = number 
            })
        })
    )
}