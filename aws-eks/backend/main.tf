provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = "mitra-devops-88"

  lifecycle {
    prevent_destroy = false
  }
}

terraform {
    backend "s3" {
        bucket = "mitra-devops-88"
        key = "dev/terraform-state-file"
        region = "us-east-1"
        encrypt = true
        use_lockfile = true
    }
}