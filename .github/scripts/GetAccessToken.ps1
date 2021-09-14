param (
    [string]$clientId = $null,
    [string]$tenantId = $null,
    [string]$clientSecret = $null,
    [string]$scope = $null
)

$body = @{client_id=$clientId;client_secret=$clientSecret;grant_type="client_credentials";scope="${scope}/.default";}
$oAuthReq = Invoke-RestMethod -Method Post -Uri https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token -Body $body
$accessToken = $oAuthReq.access_token
$verbose = $true;

if ($accessToken.Length -gt 20) {
    if ($verbose -eq $true) {
        Write-Host "Access token was received" -ForegroundColor Green
    }
} else {
    Write-Host "Access token could not be retrieved" -ForegroundColor Red
    exit
}

return $accessToken
