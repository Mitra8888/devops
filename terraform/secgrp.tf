resource "aws_security_group" "devops-sg" {
  name        = "devops-sg"
  vpc_id      = aws_vpc.devops.id
  description = "Security group for devops instance"

  tags = {
    Name = "devops-sg"
  }
}

resource "aws_vpc_security_group_ingress_rule" "sshfrommyIP" {
  security_group_id = aws_security_group.devops-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

resource "aws_vpc_security_group_ingress_rule" "allow_http" {
  security_group_id = aws_security_group.devops-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
}
resource "aws_vpc_security_group_egress_rule" "devops_allowoOutBoundIPV4" {
  security_group_id = aws_security_group.devops-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}
resource "aws_vpc_security_group_egress_rule" "devops_allowoOutBoundIPV6" {
  security_group_id = aws_security_group.devops-sg.id
  cidr_ipv6         = "::/0"
  ip_protocol       = "-1"
}

resource "aws_vpc_security_group_ingress_rule" "allow_prometheus_to_devops" {
  security_group_id            = aws_security_group.devops-sg.id
  referenced_security_group_id = aws_security_group.prometheus-sg.id
  from_port                    = 80
  ip_protocol                  = "tcp"
  to_port                      = 80
}

resource "aws_vpc_security_group_ingress_rule" "allow_port_9100_myip" {
  security_group_id = aws_security_group.devops-sg.id
  cidr_ipv4         = "0.0.0.0/0" #MYIP
  from_port         = 9100
  ip_protocol       = "tcp"
  to_port           = 9100
}

resource "aws_vpc_security_group_ingress_rule" "allow_port_9100_prometheus" {
  security_group_id            = aws_security_group.devops-sg.id
  referenced_security_group_id = aws_security_group.prometheus-sg.id
  from_port                    = 9100
  ip_protocol                  = "tcp"
  to_port                      = 9100
}
resource "aws_security_group" "grafana-sg" {
  name        = "grafana-sg"
  description = "Security group for grafana instance"
  vpc_id      = aws_vpc.devops.id


  tags = {
    Name = "grafana-sg"
  }
}

resource "aws_vpc_security_group_ingress_rule" "allow_ssh_grafana" {
  security_group_id = aws_security_group.grafana-sg.id
  cidr_ipv4         = "0.0.0.0/0" #MYIP
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

resource "aws_vpc_security_group_ingress_rule" "allow_http_grafana" {
  security_group_id = aws_security_group.grafana-sg.id
  cidr_ipv4         = "0.0.0.0/0" #MYIP
  from_port         = 3000
  ip_protocol       = "tcp"
  to_port           = 3000
}

resource "aws_vpc_security_group_egress_rule" "grafana_allowoOutBoundIPV4" {
  security_group_id = aws_security_group.grafana-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}
resource "aws_vpc_security_group_egress_rule" "grafana_allowoOutBoundIPV6" {
  security_group_id = aws_security_group.grafana-sg.id
  cidr_ipv6         = "::/0"
  ip_protocol       = "-1"
}

resource "aws_security_group" "prometheus-sg" {
  name        = "prometheus-sg"
  description = "Security group for prometheus instance"
  vpc_id      = aws_vpc.devops.id

  tags = {
    Name = "prometheus-sg"
  }
}

resource "aws_vpc_security_group_ingress_rule" "allow_ssh_prometheus" {
  security_group_id = aws_security_group.prometheus-sg.id
  cidr_ipv4         = "0.0.0.0/0" #MYIP
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

resource "aws_vpc_security_group_ingress_rule" "allow_http_prometheus" {
  security_group_id = aws_security_group.prometheus-sg.id
  cidr_ipv4         = "0.0.0.0/0" #MYIP
  from_port         = 9090
  ip_protocol       = "tcp"
  to_port           = 9090
}

resource "aws_vpc_security_group_ingress_rule" "allow_grafana_to_prometheus" {
  security_group_id            = aws_security_group.prometheus-sg.id
  referenced_security_group_id = aws_security_group.grafana-sg.id
  from_port                    = 9090
  ip_protocol                  = "tcp"
  to_port                      = 9090
}
resource "aws_vpc_security_group_egress_rule" "prometheus_allowoOutBoundIPV4" {
  security_group_id = aws_security_group.prometheus-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}
resource "aws_vpc_security_group_egress_rule" "prometheus_allowoOutBoundIPV6" {
  security_group_id = aws_security_group.prometheus-sg.id
  cidr_ipv6         = "::/0"
  ip_protocol       = "-1"
}
resource "aws_security_group" "loki-sg" {
  name        = "loki-sg"
  vpc_id      = aws_vpc.devops.id
  description = "Security group for loki instance"

  tags = {
    Name = "loki-sg"
  }
}

resource "aws_vpc_security_group_ingress_rule" "allow_ssh_loki" {
  security_group_id = aws_security_group.loki-sg.id
  cidr_ipv4         = "0.0.0.0/0" #MYIP
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

resource "aws_vpc_security_group_ingress_rule" "allow_devops-sg" {
  security_group_id            = aws_security_group.loki-sg.id
  referenced_security_group_id = aws_security_group.devops-sg.id
  from_port                    = 3100
  ip_protocol                  = "tcp"
  to_port                      = 3100

}
resource "aws_vpc_security_group_ingress_rule" "allow-grafana_to_loki" {
  security_group_id            = aws_security_group.loki-sg.id
  referenced_security_group_id = aws_security_group.grafana-sg.id
  from_port                    = 3100
  ip_protocol                  = "tcp"
  to_port                      = 3100
}
resource "aws_vpc_security_group_egress_rule" "loki_allowoOutBoundIPV4" {
  security_group_id = aws_security_group.loki-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}
resource "aws_vpc_security_group_egress_rule" "loki_allowoOutBoundIPV6" {
  security_group_id = aws_security_group.loki-sg.id
  cidr_ipv6         = "::/0"
  ip_protocol       = "-1"
}
