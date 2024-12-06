### Starting docker container

```bash
docker run -d --name e-commerce-container \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -p 5432:5432 \
  e-commerce-db
```

