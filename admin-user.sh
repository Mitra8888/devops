#!/bin/bash
docker exec -it mongo mongosh myappdb --eval '

db.customers.insertOne({
    name: "Admin",
    email: "admin@gmail.com",
    phone: "123456",
    role: "admin",
    date: new Date(),
    tasks: []
})'