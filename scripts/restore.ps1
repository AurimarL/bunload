# restore.ps1
param(
    [string]$DatabaseUri
)

$backups = Get-ChildItem 'scripts/backups/' -Filter '*.bak' | Sort-Object LastWriteTime -Descending

if ($backups.Count -eq 0) {
    Write-Host 'No backups found!'
    exit
}

Write-Host "Available backups:"
for ($i=0; $i -lt $backups.Count; $i++) {
    Write-Host "[$i] $($backups[$i].Name)"
}

$choice = Read-Host 'Enter the number of the backup to restore'

if ($choice -ge 0 -and $choice -lt $backups.Count) {
    $selectedBackup = $backups[$choice].FullName
    Write-Host "Restoring backup: $selectedBackup"
    pg_restore -d $DatabaseUri -v $selectedBackup
    Write-Host "Restore completed!"
} else {
    Write-Host 'Invalid selection!'
}
