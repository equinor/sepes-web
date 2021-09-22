function Get-AzureContext {
    <#
    .DESCRIPTION
        Function for getting auth token and set context for the deployment
    .EXAMPLE
        TODO add or delete block
    .INPUTS
        TODO add or delete block
    .OUTPUTS
        Will return a valid bearer token from a service principal or user
    #>
    param(
    [Parameter()][string]$ClientId,
    [Parameter()][string]$ClientSecret,
    [Parameter()][string]$Subscription,
    [Parameter()][string]$TenantId,
    [Parameter(Mandatory)][string][ValidateNotNullOrEmpty()][ValidateSet('User','ServicePrincipal')]$AuthType
    )

    try {
        if ($AuthType -eq 'ServicePrincipal') {
            Write-Verbose "Using service principal for authentication"
            if (!$ClientId -or !$ClientSecret) {
                write-error "No user token or service principal token found. Make sure to set environment variable for clientid and clientsecret"
            }
            else {
                $spToken = Get-AzureToken -tenantId $TenantId -applicationId $ClientId -secret $ClientSecret
                if ($spToken) {
                    Write-Verbose "Using service principal for deploy"
                    return $spToken
                }
            }
        }
        elseif($AuthType -eq 'User') {
            Write-Verbose "Using user account for authentication"
            $userToken = Get-UserAuthHeader
            if (!$userToken) {
                Write-Verbose "Using local user for deployment"
                #TODO remove AzContext when no longer used
                return = $userToken
            }
        }
    }
    catch {
        Write-Error "Something went wrong getting token" -ErrorAction Stop
    }
}

function Read-ValueFile {
    [CmdletBinding()]
    param (
        [Parameter()][string]$FilePath
    )
    try {
        Write-Verbose "Checking if file: $FilePath exists"
        if ((Test-Path $FilePath) -ne $True ) {
            Throw "Path: $FilePath is invalid"
        }

        $var = Get-Content $FilePath | convertfrom-json
        if (!$var) {
            Write-Error "Problems reading value file. Make sure it's a valid json format"
        }
        elseif ($var) {
            Write-Information "Successfully read values from file $FilePath"
            return $var
        }
    }
    catch {
        write-error $_.Exception -ErrorAction Stop
    }
}

function Get-AzureToken {
    Param(  
        [Parameter(Mandatory)][String]$tenantId,  
        [Parameter(Mandatory)][String]$applicationId,  
        [Parameter(Mandatory)][String]$secret,
        [Parameter()][string]$apiEndpointUri = "https://management.azure.com/.default"
    )
    $encodedSecret = [System.Web.HttpUtility]::UrlEncode($secret)  
    $RequestAccessTokenUri = "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token"  
    $body = "grant_type=client_credentials&client_id=$applicationId&client_secret=$encodedSecret&scope=$apiEndpointUri"  
    $contentType = 'application/x-www-form-urlencoded' 
    Write-Information "Fetching token for service principal" 
    try {  
        $Token = Invoke-RestMethod -Method Post -Uri $RequestAccessTokenUri -Body $body -ContentType $contentType  
        if (!$token) {
            throw "Something went wrong getting token"
        }
    }
    catch { 
        write-error $_.Exception.Message -ErrorAction Stop
    }
    return "Bearer $($Token.access_token)" 
}
function Get-UserAuthHeader {
    [CmdletBinding()]
    param ()
    Write-Verbose "Attempting to get local user token..."
    $moduleCheck = Get-Module -Name Az.Accounts
    if (!$moduleCheck) {
        Write-Verbose "Azure cmdlet not found"
    }
    else {
        try {
            $azContext = Get-AzContext
            if (!$azContext) {
                Write-Verbose "no az-context found, run Login-AzAccount to use user token"
            }
            else {
                $azProfile = [Microsoft.Azure.Commands.Common.Authentication.Abstractions.AzureRmProfileProvider]::Instance.Profile
                $profileClient = New-Object -TypeName Microsoft.Azure.Commands.ResourceManager.Common.RMProfileClient -ArgumentList ($azProfile)
                $token = $profileClient.AcquireAccessToken($azContext.Subscription.TenantId)
                $authHeader = "Bearer $($token.AccessToken)"
                return $authHeader
            }
        }
        catch {
            Write-Error $_.Exception -ErrorAction Stop
        }
    }
}

function CheckResponse {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory=$true)][string]$Uri,
        [Parameter(Mandatory=$true)][string]$Token
    )
    $startDate = Get-Date
    $requestParams = @{
        Method  = 'GET'
        Uri     = "$Uri"
        Headers = @{
            'Authorization' =  $Token
        }
    }
    Write-Host "Checking resource status..."
    do {
        $check = Invoke-WebRequest @requestParams -ContentType application/json
        start-sleep 10
        Write-Verbose "code is now $($check.StatusCode)"
    } while ($check.StatusCode -eq "202" -and $startDate.AddMinutes(2) -gt (Get-Date))

    if ($check.StatusCode -eq "201"){
        Write-Verbose "Resource created successfully"
        return $check
    }

    if ($check.StatusCode -eq "200"){
        Write-Verbose "Resource updated successfully"
        return $check
    }
    else {
        Write-Verbose "Something went wrong creating resource"
        return $check
        exit
    }
}