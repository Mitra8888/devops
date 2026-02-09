terraform {
  backend "s3" {
    bucket = "devops-terraform-state-88"
    key    = "terraform/backend"
    region = "us-east-1"
  }
}