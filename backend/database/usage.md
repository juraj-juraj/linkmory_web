# Starting database in docker

my\_sql.yaml is docker compose file.
To run it, use command:
```bash
sudo docker-compose -f run_db.yaml up -d
```

This will run two images in background:
- postgres:17.0

## Connecting to database 

Postgresql runs on port 5432, default username is *admin* and password *admin*.

