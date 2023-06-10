# Use the official PostgreSQL image as the base image
FROM postgres

# Set the environment variable for the PostgreSQL password
ENV POSTGRES_PASSWORD password
