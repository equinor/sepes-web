param (
    [string]$clientId = $null,
    [string]$tenantId = $null,
    [string]$clientSecret = $null,
    [string]$scope = $null,
    [boolean]$verbose = $false
)

$body = @{client_id=$clientId;client_secret=$clientSecret;grant_type="client_credentials";scope="${scope}/.default";}
$oAuthReq = Invoke-RestMethod -Method Post -Uri https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token -Body $body
$accessToken = $oAuthReq.access_token


if ($accessToken.Length -gt 20) {
    if ($verbose -eq $true) {
        Write-Host "$(CurrentLineStart)Access token ...$($accessToken.substring(20, 20))... was received" -ForegroundColor Green
    }
} else {
    Write-Host "$(CurrentLineStart)Access token could not be retrieved" -ForegroundColor Red
    exit
}

return $accessToken
