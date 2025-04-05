FROM maven:3.9.4-eclipse-temurin-17 AS builder
WORKDIR /expense
COPY . .
RUN mvn clean package -DskipTests

# Usa una imagen ligera para ejecutar
FROM openjdk:17-jdk-alpine 
WORKDIR /expense
COPY --from=builder /expense/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
