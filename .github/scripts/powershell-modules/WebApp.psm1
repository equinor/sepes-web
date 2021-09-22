function Get-WebApp {
    <#
    .DESCRIPTION
        Function for getting values from an existing Azure webapp
        API documentation link: https://docs.microsoft.com/en-us/rest/api/appservice/web-apps
    .EXAMPLE
        TODO: Add or remove example
    #>
    [CmdletBinding()]
    param (
        [Parameter(Mandatory=$true)][string]$Token,
        [Parameter(Mandatory=$true)][string]$Name,
        [Parameter(Mandatory=$true)][string]$Subscription,
        [Parameter(Mandatory=$true)][string]$ResourceGroup
    )
    $apiVersion = "2019-08-01"
    try {
        # Check if app exist
        $requestParams = @{
            Method  = 'GET'
            Uri     = "https://management.azure.com/subscriptions/$subscription/resourceGroups/$ResourceGroup/providers/Microsoft.Web/sites/$($Name)?api-version=$apiVersion"
            Headers = @{
                'Authorization' =  $Token
            }
        }
        $reply = Invoke-WebRequest @requestParams -ContentType application/json -SkipHttpErrorCheck | ConvertFrom-Json
        if ($reply.error.code -eq "ResourceGroupNotFound") {
            Write-Error $reply.error.message -ErrorAction Stop
        }
        elseif ($reply.error.code -eq "ResourceNotFound" ) {
            Write-Information $reply.error.message
        }
        elseif ($reply.name -eq $Name) {
            Write-Information "Found application $Name in $ResourceGroup"
        }
        else {
            Write-Error "Uknown error getting webapp" -ErrorAction Stop
        }
        return $reply
    }
    catch {
        Write-Error $_.Exception
        exit
    }
}

function New-CIWebApp {
    <#
    .DESCRIPTION
        Function for creating an Azure web app
        API documentation link: https://docs.microsoft.com/en-us/rest/api/appservice/web-apps
    .EXAMPLE
        TODO: Add or remove example
    #>
    [CmdletBinding()]
    param (
        [Parameter(Mandatory=$true)][string]$Token,
        [Parameter(Mandatory=$true)][string]$Name,
        [Parameter(Mandatory=$true)][string]$Subscription,
        [Parameter(Mandatory=$true)][string]$ResourceGroup,
        [Parameter(Mandatory=$true)][string]$Location,
        [Parameter(Mandatory=$true)][string]$AppServicePlan,
        [Parameter(Mandatory=$true)][string]$RedirectUri,
        [Parameter(Mandatory=$true)][securestring]$AcrPassword,
        [Parameter(Mandatory=$true)][securestring]$AcrUsername,
        [Parameter(Mandatory=$true)][string]$AcrUrl,
        [Parameter(Mandatory=$true)][string]$Image,
        [Parameter(Mandatory=$true)][string]$TenantId,
        [Parameter(Mandatory=$true)][string]$UserIdentity,
        [Parameter()][object]$AppSettings,
        [Parameter()][string]$HttpsOnly = $true,
        [Parameter()][string]$HttpLogging = $true,
        [Parameter()][string]$AlwaysOn = $true
    )
    Import-Module .\.github\scripts\powershell-modules\AzureResources.psm1 -Force
    $apiVersion = "2019-08-01"

    # Check if app service plan exist and get resource ID
    $aspId = (Get-AzureResource -Subscription $Subscription -Token $token -Name $AppServicePlan).id

    # Convert appsettings object to hashtable
    if ($AppSettings) {
        $AppSettings = $AppSettings | ConvertTo-Json | ConvertFrom-Json -AsHashtable
    }

    try {
        # Check if webpp exist
        $check = Get-WebApp -Token $token -Name $Name -Subscription $Subscription -ResourceGroup $ResourceGroup

        if ($check.error.code -eq "ResourceNotFound") {
            Write-Verbose "webapp does not exist. Creating new"
            $NameCheck = CheckAppNameAvailability -Name $Name -Subscription $Subscription -Token $token
            if ($NameCheck.nameAvailable -eq $false) {
                Write-Error "Webapp name already exist, but not in target resource group" -ErrorAction Stop
            }
        }
        elseif ($check.name -eq $Name) {
            # Update existing webapp. Since the webapp exist it will also fetch current app settings and merge
            Write-Verbose "Updating existing webapp"
            $currentAppSettings = Get-AppSettings -Token $Token -Subscription $Subscription -ResourceGroup $ResourceGroup -Name $Name
            if ($currentAppSettings.GetEnumerator() -ne $null) {
                $currentAppSettings = Merge-AppSettings -currentAppSettings $currentAppSettings -AppSettings $AppSettings
            }
        }
        else {
            Write-Error "Unknow status code from webapp"
        }

        if ($AppSettings) {
            $appSettingArray = ConvertAppSettingsTo-Array -AppSettings $AppSettings
        }

        $body = New-Object -TypeName psobject -Property @{
            kind = "web"
            location = $Location
            identity = @{
                type = "UserAssigned"
                userAssignedIdentities = @{
                        "$UserIdentity" = @{}
                }
            }
            properties = @{
                httpsOnly = $HttpsOnly
                serverFarmId = $aspId
                siteConfig = @{
                    alwaysOn = $AlwaysOn
                    httpLoggingEnabled = $HttpLogging
                    linuxFxVersion = "DOCKER|$Image"
                    appSettings = $appSettingArray
                }
            }
        }


        $body.Properties.siteConfig.appSettings += @{
            name = "DOCKER_REGISTRY_SERVER_PASSWORD"
            value = ($AcrPassword | ConvertFrom-SecureString -AsPlainText)
        }
        $body.Properties.siteConfig.appSettings += @{
            name = "DOCKER_REGISTRY_SERVER_USERNAME"
            value = ($AcrUsername | ConvertFrom-SecureString -AsPlainText)
        }
        $body.Properties.siteConfig.appSettings += @{
            name = "DOCKER_REGISTRY_SERVER_URL"
            value = "$AcrUrl"
        }
        $body.Properties.siteConfig.appSettings += @{
            name = "REACT_APP_SEPES_REDIRECT_URI"
            value = "$RedirectUri"
        }
        
        # Convert body to json payload and invoke the webrequest
        $body = $body | ConvertTo-Json -Depth 10
        $requestParams = @{
            Method  = 'PUT'
            Uri     = "https://management.azure.com/subscriptions/$subscription/resourceGroups/$ResourceGroup/providers/Microsoft.Web/sites/$($Name)?api-version=$apiVersion"
            Headers = @{
                'Authorization' =  $Token
            }
        }
        $reply = Invoke-WebRequest @requestParams -Body $body -ContentType application/json
        if ($reply.StatusCode -eq 200) {
            return $reply.Content | ConvertFrom-Json
        }
        else {
            Write-Error "Something went wrong with function app deploy"
        }

    }
    catch {
        Write-Error $_.Exception -ErrorAction Stop
    }
}

function ConvertAppSettingsTo-Array {
    [CmdletBinding()]
    param (
        [Parameter()][object]$AppSettings
    )
    $appSettingArray = @()
    # Creating payload for new functionapp
    foreach ($Setting in $AppSettings.GetEnumerator()){
        $appSettingArray += New-Object -TypeName psobject -Property @{
            "name" = $Setting.Key
            "value" = $Setting.Value
        }
    }
    return $appSettingArray
}

function Merge-AppSettings {
    [CmdletBinding()]
    param (
        [Parameter()][object]$AppSettings,
        [Parameter()][object]$currentAppSettings
    )
    foreach ($setting in $AppSettings.GetEnumerator()){
        $currentAppSettings[$setting.Key] = $setting.Value
    }
    return $currentAppSettings
}

function Get-AppSettings {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory=$true)][string]$Token,
        [Parameter(Mandatory=$true)][string]$Name,
        [Parameter(Mandatory=$true)][string]$Subscription,
        [Parameter(Mandatory=$true)][string]$ResourceGroup
    )
    $apiVersion = "2019-08-01"
    Write-Verbose "Fetching application settings"
    try {
        $requestParams = @{
            Method  = 'POST'
            Uri     = "https://management.azure.com/subscriptions/$subscription/resourceGroups/$ResourceGroup/providers/Microsoft.Web/sites/$($Name)/config/appsettings/list?api-version=$apiVersion"
            Headers = @{
                'Authorization' =  $Token
            }
        }
        $currentAppSettings = ((Invoke-WebRequest @requestParams -ContentType application/json).Content| ConvertFrom-Json -AsHashtable).properties
        return $currentAppSettings
    }
    catch {
        Write-Error "Problems fetching application settings from $Name" -ErrorAction Stop
    }
}

function CheckAppNameAvailability {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory=$true)][string]$Token,
        [Parameter(Mandatory=$true)][string]$Name,
        [Parameter(Mandatory=$true)][string]$Subscription
    )
    $apiVersion = "2019-08-01"
    Write-Verbose "checking if name is available"
    try {
        $requestParams = @{
            Method  = 'POST'
            Uri     = "https://management.azure.com/subscriptions/$subscription/providers/Microsoft.Web/checknameavailability?api-version=$apiVersion"
            Headers = @{
                'Authorization' =  $Token
            }
        }
        $body = New-Object -TypeName psobject -Property @{
            name = $Name
            type = "Microsoft.Web/sites"
        } | ConvertTo-Json
        $check = Invoke-WebRequest @requestParams -Body $body -ContentType application/json | ConvertFrom-Json
        return $check
    }
    catch {
        Write-Error $_ -ErrorAction Stop
    }
}