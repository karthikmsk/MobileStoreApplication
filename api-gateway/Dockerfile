# Use OpenJDK base image
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy the built JAR file into the image (adjust the filename as needed)
COPY target/*.jar app.jar

# Expose the service port (adjust based on service)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
