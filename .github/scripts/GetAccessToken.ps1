# param (
#     [string]$clientId = $null,
#     [string]$tenantId = $null,
#     [string]$clientSecret = $null,
#     [string]$scope = $null
# )

function CurrentLineStart() {
    $esc = [char]27
    $CurrentLine  = $Host.UI.RawUI.CursorPosition.Y + 1
    Return "$esc[${CurrentLine};0H"
}

$clientId = $args[0];
$tenantId = $args[1];
$clientSecret = $args[2];
$scope = $args[3];


$body = @{client_id=$clientId;client_secret=$clientSecret;grant_type="client_credentials";scope="${scope}/.default";}
$oAuthReq = Invoke-RestMethod -Method Post -Uri https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token -Body $body
$accessToken = $oAuthReq.access_token
# $verbose = $true;

return $accessToken

# if ($accessToken.Length -gt 20) {
#     if ($verbose -eq $true) {
#         Write-Host "$(CurrentLineStart)Access token ...$($accessToken.substring(20, 20))... was received" -ForegroundColor Green
#     }
# } else {
#     Write-Host "Access token could not be retrieved" -ForegroundColor Red
#     exit
# }

# return $accessToken


