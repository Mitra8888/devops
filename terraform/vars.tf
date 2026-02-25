
variable "region" {
  description = "AWS region to deploy resources"
  default     = "us-east-1"
}

variable "zone" {
  description = "AWS availability zone to deploy resources"
  default     = "us-east-1a"
}

variable "amiID" {
  default = {
    us-east-1 = "ami-0b6c6ebed2801a5cb"
  }
}

variable "ZONE1" {
  default = "us-east-1a"
}

variable "ZONE2" {
  default = "us-east-1b"
}
