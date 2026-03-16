resource "aws_vpc" "devops_eks" {
    cidr_block = var.vpc_cidr
    enable_dns_hostnames = true
    enable_dns_support = true 

    tags = {
        Project = "devops"
        Environment = "dev"
    }
}

resource "aws_subnet" "public" {
    count = length(var.public_subnet_cidr)
    vpc_id = aws_vpc.devops_eks.id
    cidr_block = var.public_subnet_cidr[count.index]
    availability_zone = var.availability_zones[count.index]

    map_public_ip_on_launch = true

    tags = {
        Name = "pubic-subnet-${count.index + 1 }"
        Tier = "public"
    }
}


resource "aws_subnet" "private" {
    count = length(var.private_subnet_cidr)
    vpc_id = aws_vpc.devops_eks.id 
    cidr_block = var.private_subnet_cidr[count.index]
    availability_zone = var.availability_zones[count.index]

    map_public_ip_on_launch = false

    tags = {
        Name = "private-subnet-${count.index + 1}"
        Tier = "private"
    }
}

resource "aws_internet_gateway" "int-gw" {
    vpc_id = aws_vpc.devops_eks.id

    tags = {
        Name = "devops-gw"
    }
}

resource "aws_eip" "eip-nat"{
    count = length(var.public_subnet_cidr)
    domain = "vpc"
}


resource "aws_nat_gateway" "nat-gw" {
    count = length(var.public_subnet_cidr)
    allocation_id = aws_eip.eip-nat[count.index].id
    subnet_id = aws_subnet.public[count.index].id

    tags = {
        Name = "nat-gateway-${count.index + 1}"
    }
}

resource "aws_route_table" "public" {
    vpc_id = aws_vpc.devops_eks.id

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.int-gw.id
    }

    tags = {
        Name = "public-RT"
    }
}

resource "aws_route_table" "private" {
    count = length(var.private_subnet_cidr)
    vpc_id = aws_vpc.devops_eks.id

    route {
        cidr_block = "0.0.0.0/0"
        nat_gateway_id = aws_nat_gateway.nat-gw[count.index].id
    }

    tags = {
        Name = "private-RT-${count.index + 1}"
    }
}

resource "aws_route_table_association" "public" {
    count = length(var.public_subnet_cidr)
    subnet_id = aws_subnet.public[count.index].id
    route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
    count = length(var.private_subnet_cidr)
    subnet_id = aws_subnet.private[count.index].id
    route_table_id = aws_route_table.private[count.index].id
}
