include .env
export

up:
	docker compose up -d

down:
	docker compose down

backup:
	powershell -ExecutionPolicy Bypass -File scripts/backup.ps1 -DatabaseUri '$(DATABASE_URI)'

restore:
	powershell -ExecutionPolicy Bypass -File scripts/restore.ps1 -DatabaseUri '$(DATABASE_URI)'
