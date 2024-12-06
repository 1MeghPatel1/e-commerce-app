# Use the official Postgres image from Docker Hub
FROM postgres:latest

# Set environment variables (Optional: Customize if needed)
# Example: Set the default database name
ENV POSTGRES_DB=e_commerce

# Example: Set the username and password for PostgreSQL (Optional)
# ENV POSTGRES_USER=myuser
# ENV POSTGRES_PASSWORD=mypassword

# Expose the default Postgres port (5432)
EXPOSE 5432
