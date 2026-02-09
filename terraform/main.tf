resource "aws_instance" "devops" {
  ami                         = var.amiID[var.region]
  instance_type               = "t2.micro"
  availability_zone           = var.zone
  key_name                    = "devops-key"
  vpc_security_group_ids      = [aws_security_group.devops-sg.id]
  associate_public_ip_address = true

  tags = {
    Name    = "devops-instance"
    Project = "devops"
  }

  user_data = file("dockersetup.sh")
  # provisioner "file" {
  #   source      = "dockersetup.sh"
  #   destination = "/tmp/dockersetup.sh"
  # }

  # connection {
  #   type        = "ssh"
  #   user        = "ubuntu"
  #   private_key = file("devops-key")
  #   host        = self.public_ip
  # }

  # provisioner "remote-exec" {
  #   inline = [
  #     "chmod +x /tmp/dockersetup.sh",
  #     "sudo bash /tmp/dockersetup.sh"
  #   ]

  # }

}
resource "aws_ec2_instance_state" "devops_state" {
  instance_id = aws_instance.devops.id
  state       = "running"
}

output "instance_public_ip" {
  description = "Devops instance public ip"
  value       = aws_instance.devops.public_ip
}