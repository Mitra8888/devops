resource "aws_key_pair" "users" {
  key_name   = "devops-key"
  public_key = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBSOIA+DQRYj8rpxdBZHJcwrt22UlBhtdlHAizIu2GCa uros02@uros"
}