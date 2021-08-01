function pause(){
   read -p "$*"
}

echo Deploying $RELEASE_PATH to Chrome Extension Store: $EXTENSION_ID

yarn webstore upload --extension-id $EXTENSION_ID --source $RELEASE_PATH --client-id $CLIENT_ID --client-secret $CLIENT_SECRET --refresh-token $REFRESH_TOKEN

pause 'Press [Enter] key to continue...'
