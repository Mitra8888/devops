provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket       = "mitra-devops-88"
    key          = "dev/terraform-state-file"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}

module "vpc" {
  source = "./modules/vpc"

  region              = var.region
  vpc_cidr            = var.vpc_cidr
  availability_zones  = var.availability_zones
  private_subnet_cidr = var.private_subnet_cidr
  public_subnet_cidr  = var.public_subnet_cidr
  eks_cluster_name    = var.eks_cluster_name
}

module "eks" {
  source = "./modules/eks"

  region           = var.region
  eks_cluster_name = var.eks_cluster_name
  cluster_version  = var.cluster_version
  vpc_id           = module.vpc.vpc_id
  subnet_id        = module.vpc.private_subnet_ids
  node_groups      = var.node_groups
}