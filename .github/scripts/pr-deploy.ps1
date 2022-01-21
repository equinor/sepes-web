[CmdletBinding(SupportsShouldProcess,ConfirmImpact = 'Medium')]
param (
    [Parameter(Mandatory=$True)][string]$Environment,
    [Parameter(Mandatory=$True)][string]$Image,
    [Parameter(Mandatory=$True)][string]$AcrUrl,
    [Parameter(Mandatory=$True)][string]$PrNumber,
    #[Parameter(Mandatory=$True)][string]$WebappName,
    [Parameter(Mandatory=$True)][securestring]$AcrPassword,
    [Parameter(Mandatory=$True)][securestring]$AcrUsername,
    [Parameter()][string]$Url,
    [Parameter()][string]$ClientSecret,
    [Parameter()][string]$ClientId
)

Import-Module .\.github\scripts\powershell-modules\WebApp.psm1 -Force
Import-Module .\.github\scripts\powershell-modules\AzureResources.psm1 -Force
Import-Module .\.github\scripts\powershell-modules\Utility.psm1 -Force
Import-Module .\.github\scripts\powershell-modules\Dns.psm1 -Force



######################################################
### Read environment file with parameter values and set variables
######################################################

$var = Read-ValueFile -FilePath $Environment
$var
$webappName = "web-frontend-pr-$PrNumber"
$RedirectUri = "https://$($Url)/"
$InformationPreference = 'Continue'

$token = Get-AzureToken `
    -applicationId $ClientId `
    -secret $ClientSecret `
    -TenantId $var.azure.tenantId


$webApp = New-CIWebApp -Token $token `
    -Name $webappName `
    -ResourceGroup $var.azure.resourceGroup.name `
    -TenantId $var.azure.tenantId `
    -Subscription $var.azure.subscription `
    -image $Image `
    -Location $var.azure.location `
    -UserIdentity $var.azure.ciWebApp.userIdentity `
    -RedirectUri $RedirectUri `
    -AppServicePlan $var.azure.ciWebApp.appServicePlan `
    -AppSettings $var.azure.ciWebApp.siteConfig.appSettings `
    -HttpLogging $var.azure.ciWebApp.siteConfig.httpLogging `
    -AcrPassword "$AcrPassword" `
    -AcrUsername "$AcrUsername" `
    -AcrUrl $AcrUrl `
    -Verbose
exit

New-DnsRecord -Token $token `
    -ResourceGroup $var.azure.dnsZone.resourceGroup `
    -Subscription $var.azure.subscription `
    -RecordName "asuid.$PrNumber.pr" `
    -TTL 60 `
    -Type TXT `
    -ZoneName $var.azure.dnsZone.name `
    -Address $webApp.properties.customDomainVerificationId `
    -Verbose

New-DnsRecord -Token $token `
    -ResourceGroup $var.azure.subscription `
    -Subscription $var.azure.subscription `
    -RecordName "$PrNumber.pr" `
    -TTL 60 `
    -Type CName `
    -ZoneName $var.azure.dnsZone.name `
    -Address $webApp.properties.defaultHostName `
    -Verbose