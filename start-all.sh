#!/bin/bash

# Start all services in the background
(cd eureka && mvn spring-boot:run) &
(cd user-service && mvn spring-boot:run) &
(cd product-service && mvn spring-boot:run) &
(cd wishlist-service && mvn spring-boot:run) &
(cd api-gateway && mvn spring-boot:run)
