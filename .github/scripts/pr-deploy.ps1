[CmdletBinding(SupportsShouldProcess,ConfirmImpact = 'Medium')]
param (
    [Parameter(Mandatory=$True)][string]$Environment,
    [Parameter(Mandatory=$True)][string]$Image,
    [Parameter(Mandatory=$True)][string]$AcrUrl,
    [Parameter(Mandatory=$True)][string]$PrNumber,
    #[Parameter(Mandatory=$True)][string]$WebappName,
    [Parameter(Mandatory=$True)][securestring]$AcrPassword,
    [Parameter(Mandatory=$True)][securestring]$AcrUsername,
    [Parameter(Mandatory=$True)][string]$DnsZone,
    [Parameter()][string]$ClientSecret,
    [Parameter()][string]$ClientId
)

Import-Module .\.github\scripts\powershell-modules\WebApp.psm1 -Force
Import-Module .\.github\scripts\powershell-modules\AzureResources.psm1 -Force
Import-Module .\.github\scripts\powershell-modules\Utility.psm1 -Force
Import-Module .\.github\scripts\powershell-modules\Dns.psm1 -Force

https://2019.pr.sepes.equinor.com

######################################################
### Read environment file with parameter values and set variables
######################################################
$VerbosePreference = 'Continue'
$PrNumber = "2019"
$DnsZone = "pr.sepes.equinor.com"
$var = Read-ValueFile -FilePath $Environment
$webappName = "web-frontend-pr-$PrNumber"
$RedirectUri = "https://$($PrNumber).$($DnsZone)/"
$InformationPreference = 'Continue'

Write-Host "Done setting variables"

$token = Get-AzureToken `
    -applicationId $ClientId `
    -secret $ClientSecret `
    -TenantId $var.azure.tenantId

Write-Host "Done setting variables"

$webApp = New-CIWebApp -Token $token `
    -Name $webappName `
    -ResourceGroup $var.azure.resourceGroup.name `
    -TenantId $var.azure.tenantId `
    -Subscription $var.azure.subscription `
    -image $Image `
    -Location $var.azure.location `
    -UserIdentity $var.azure.ciWebApp.userIdentity `
    -RedirectUri "$RedirectUri" `
    -AppServicePlan $var.azure.ciWebApp.appServicePlan `
    -AppSettings $var.azure.ciWebApp.siteConfig.appSettings `
    -HttpLogging $var.azure.ciWebApp.siteConfig.httpLogging `
    -AcrPassword $AcrPassword `
    -AcrUsername $AcrUsername `
    -AcrUrl $AcrUrl `
    -Verbose

New-DnsRecord -Token $token `
    -ResourceGroup $var.azure.dnsZone.resourceGroup `
    -Subscription $var.azure.subscription `
    -RecordName "asuid.$PrNumber" `
    -TTL 60 `
    -Type TXT `
    -ZoneName $var.azure.dnsZone.name `
    -Address $webApp.properties.customDomainVerificationId `
    -Verbose
exit

New-DnsRecord -Token $token `
    -ResourceGroup $var.azure.subscription `
    -Subscription $var.azure.subscription `
    -RecordName "$PrNumber" `
    -TTL 60 `
    -Type CName `
    -ZoneName $var.azure.dnsZone.name `
    -Address $webApp.properties.defaultHostName `
    -Verbose