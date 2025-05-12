#!/bin/bash
# Make sure each service has its own target jar built already
echo "Starting Eureka..."
cd eureka && mvn spring-boot:run &

echo "Starting API Gateway..."
cd ../api-gateway && mvn spring-boot:run &

echo "Starting User Service..."
cd ../user && mvn spring-boot:run &

echo "Starting Product Service..."
cd ../product && mvn spring-boot:run &

echo "Starting Wishlist Service..."
cd ../wishlist && mvn spring-boot:run &
