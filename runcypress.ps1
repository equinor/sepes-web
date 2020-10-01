##This script requires the Powershell Azure Module installed, see https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-3.6.1
##Usually it's enough to run the following command from a PowerShell opened as Administrator: Install-Module -Name Az -AllowClobber

## Remember to run Connect-AzAccount to login first
#Connect-AzureAD

# Write-Host "Getting secrets from KeyVault"
$mockUserAppClientSecret = (Get-AzKeyVaultSecret -vaultName "eq-sc-archive-common-kv" -name "mockUserAppClientSecret").SecretValueText
$mockUserAppId = (Get-AzKeyVaultSecret -vaultName "eq-sc-archive-common-kv" -name "mockuserAppId").SecretValueText
$mockUserAppScopes = (Get-AzKeyVaultSecret -vaultName "eq-sc-archive-common-kv" -name "mockUserAppScopes").SecretValueText
$tenantId = "3aa4a235-b6e2-48d5-9195-7fcf05b459b0"

# #Improve reliability of this bin/debug stuff, investigate dotnet run
Write-Host "Retrieving access token"
dotnet GetAccessToken/bin/debug/netcoreapp3.1/GetAccessToken.dll --tenant-id $tenantId --app-id $mockUserAppId --mock-user-client-secret $mockUserAppClientSecret --authority $mockUserAppScopes --output-destination-file accesstoken.txt
$accessToken = Get-Content -Path accessToken.txt
Remove-Item -path accessToken.txt
#Write-Host $accessToken

# ### Re-add it later when we include a step for deleting all secrets in KeyVault
# ### Can use PowerShell command Remove-AzureADApplicationPasswordCredential for this
# Write-Host "Generate new client secret"
# #Sourced from: https://social.msdn.microsoft.com/Forums/en-US/6024e3b4-6814-479f-b527-622d60c8621c/create-client-secret-for-registered-app-in-aad-using-powershell?forum=WindowsAzureAD
# $startDate = Get-Date
# $endDate = $startDate.AddYears(3)
# $mockUserAppClientSecret = New-AzureADApplicationPasswordCredential -ObjectId <object-id of mockuser app registration> -CustomKeyIdentifier "Secret01Jsoi" -StartDate $startDate -EndDate $endDate
# #Write-Host "Writing value:"
# #Write-Host $mockUserAppClientSecret.Value

# # Seems we need to give Azure some time sync stuff
# Write-Host "Waiting for Azure to update stuff"
# Start-Sleep -s 7

# #Improve reliability of this bin/debug stuff, investigate dotnet run
# Write-Host "Retrieving access token"
# dotnet GetAccessToken/bin/debug/netcoreapp3.1/GetAccessToken.dll --tenant-id $tenantId --app-id $mockUserAppId --client-secret $mockUserAppClientSecret.Value --authority $mockUserAppScopes --output-destination-file accesstoken.txt
# $accessToken = Get-Content -Path accessToken.txt
# Remove-Item -path accessToken.txt
# #Write-Host $accessToken

# Write-Host "Delete client secret"
# #Temporarily only delete those which expire before 2030 as a workaround not to mess up the workflow for people using the old script
# #Change to delete all keys later
# #Sourced from https://goodworkaround.com/2020/03/13/script-for-getting-azure-ad-app-registration-secrets-and-certificates-that-expire-soon/
# Get-AzureADApplicationPasswordCredential -ObjectId <object-id of mockuser app registration> | Where-Object {
#     $_.EndDate -lt (Get-Date 2030-01-01)
# } | ForEach-Object {
#     Remove-AzureADApplicationPasswordCredential -ObjectId <object-id of mockuser app registration> -KeyId $_.KeyId
# }

Write-Host "Starting Cypress"
npx cypress open --env scaAccessToken=$accessToken
Pop-Location