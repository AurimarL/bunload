# backup.ps1
param(
    [string]$DatabaseUri
)

$timestamp = Get-Date -Format 'yyyy-MM-dd_HH-mm'
$backupFile = "scripts/backups/backup_$timestamp.bak"

Write-Host "Creating backup: $backupFile"
pg_dump -Fc -v -d $DatabaseUri -f $backupFile
Write-Host "Backup completed!"
