$clientId = $args[0];
$tenantId = $args[1];
$clientSecret = $args[2];
$scope = $args[3];


$body = @{client_id=$clientId;client_secret=$clientSecret;grant_type="client_credentials";scope="${scope}/.default";}
$oAuthReq = Invoke-RestMethod -Method Post -Uri https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token -Body $body
$accessToken = $oAuthReq.access_token

return $accessToken