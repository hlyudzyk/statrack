FROM maven:3.9.6-coretto-21 AS build
WORKDIR /build

COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src

#RUN mvn clean flyway:migrate
RUN mvn clean package -DskipTests



FROM openjdk:21-jdk
ARG PROFILE=dev
ARG APP_VERSION=1.0.0
#ARG SEED=
WORKDIR /app

ENV DB_URL=jdbc:postgresql://app-db:5432/statrack
ENV JAR_VERSION=${APP_VERSION}
ENV ACTIVE_PROFILE=${PROFILE}

COPY --from=build /build/target/statrack-${JAR_VERSION}.jar /app/
EXPOSE 8080
CMD java -jar -Dsspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} statrack-${JAR_VERSION}.jar
