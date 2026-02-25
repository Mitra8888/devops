resource "aws_instance" "devops" {
  ami                         = var.amiID[var.region]
  instance_type               = "t2.micro"
  availability_zone           = var.zone
  key_name                    = "devops-key"
  subnet_id                   = aws_subnet.devops-pub-1.id
  vpc_security_group_ids      = [aws_security_group.devops-sg.id]
  associate_public_ip_address = true

  tags = {
    Name    = "devops-instance"
    Project = "devops"
  }

  user_data = file("dockersetup.sh")

}
resource "aws_ec2_instance_state" "devops_state" {
  instance_id = aws_instance.devops.id
  state       = "running"
}

output "devops_public_ip" {
  description = "Devops instance public ip"
  value       = aws_instance.devops.public_ip
}

output "devops_private_ip" {
  description = "Devops instance private ip"
  value       = aws_instance.devops.private_ip
}
resource "aws_instance" "grafana" {
  ami                         = var.amiID[var.region]
  instance_type               = "t2.micro"
  availability_zone           = var.zone
  key_name                    = "devops-key"
  subnet_id                   = aws_subnet.devops-pub-1.id
  vpc_security_group_ids      = [aws_security_group.grafana-sg.id]
  associate_public_ip_address = true

  tags = {
    Name    = "grafana-instance"
    Project = "devops"
  }
}

resource "aws_ec2_instance_state" "grafana_state" {
  instance_id = aws_instance.grafana.id
  state       = "running"
}

output "grafana_public_ip" {
  description = "Grafana instance public ip"
  value       = aws_instance.grafana.public_ip
}

output "grafana_private_ip" {
  description = "Grafana instance private ip"
  value       = aws_instance.grafana.private_ip
}

resource "aws_instance" "prometheus" {
  ami                         = var.amiID[var.region]
  instance_type               = "t2.micro"
  availability_zone           = var.zone
  key_name                    = "devops-key"
  vpc_security_group_ids      = [aws_security_group.prometheus-sg.id]
  associate_public_ip_address = true
  subnet_id                   = aws_subnet.devops-pub-1.id
  tags = {
    Name    = "prometheus-instance"
    Project = "devops"
  }
}

resource "aws_ec2_instance_state" "prometheus_state" {
  instance_id = aws_instance.prometheus.id
  state       = "running"
}

output "prometheus_public_ip" {
  description = "Prometheus instance public ip"
  value       = aws_instance.prometheus.public_ip
}

output "prometheus_private_ip" {
  description = "Prometheus instance private ip"
  value       = aws_instance.prometheus.private_ip
}

resource "aws_instance" "loki" {
  ami                         = var.amiID[var.region]
  instance_type               = "t2.micro"
  availability_zone           = var.zone
  key_name                    = "devops-key"
  vpc_security_group_ids      = [aws_security_group.loki-sg.id]
  associate_public_ip_address = true
  subnet_id                   = aws_subnet.devops-pub-1.id
  tags = {
    Name    = "loki-instance"
    Project = "devops"
  }
}

resource "aws_ec2_instance_state" "loki_state" {
  instance_id = aws_instance.loki.id
  state       = "running"
}

output "loki_public_ip" {
  description = "Loki instance public ip"
  value       = aws_instance.loki.public_ip
}

output "loki_private_ip" {
  description = "Loki instance private ip"
  value       = aws_instance.loki.private_ip
}


resource "local_file" "ansible_inventory" {
  content = templatefile("${path.module}/inventory.tmpl", {
    grafana_ip    = aws_instance.grafana.public_ip
    prometheus_ip = aws_instance.prometheus.public_ip
    loki_ip       = aws_instance.loki.public_ip
    devops_ip     = aws_instance.devops.public_ip
  })

  filename = "${path.module}/../ansible/inventory.yaml"
}