FROM maven:3.9.9-amazoncorretto-21 AS build
WORKDIR /build

COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src

#RUN mvn clean flyway:migrate
RUN mvn clean package -DskipTests


FROM openjdk:21-jdk
ARG APP_VERSION=1.0.0
WORKDIR /app

ENV JAR_VERSION=${APP_VERSION}

COPY --from=build /build/target/statrack-${JAR_VERSION}.jar /app/
EXPOSE 8080
CMD java -jar statrack-${JAR_VERSION}.jar
