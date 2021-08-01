Write-Host Deploying $env:RELEASE_PATH to Chrome Extension Store: $env:EXTENSION_ID

webstore upload --extension-id $env:EXTENSION_ID --source $env:RELEASE_PATH --client-id $env:CLIENT_ID --client-secret $env:CLIENT_SECRET --refresh-token $env:REFRESH_TOKEN --verbose