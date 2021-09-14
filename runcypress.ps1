. .\src\functions\helpers

$modulesNotFound = $false;

# How to use:
# Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
# Connect-AzAccount
# Set-AzContext <CorrectAZSubscription> - in this case - S904-Sepes-Development

# Configuration
$appId = Get-AzKeyVaultSecret -vaultName "kv-sepes-dev" -name "sepes-cypress-appId" -AsPlainText
$scope = Get-AzKeyVaultSecret -vaultName "kv-sepes-dev" -name "AzureAdClientIdScope" -AsPlainText
$tenantId = "3aa4a235-b6e2-48d5-9195-7fcf05b459b0"
$clientSecret = Get-AzKeyVaultSecret -vaultName "kv-sepes-dev" -name "sepes-cypress-clientSecret" -AsPlainText
$localDatabase = "sepes-cypress"
$localSqlInstance = ""
$localTestDatabase = ""
$localApiRelativePath = "../../sepes-api-2/sepes-api/src/Sepes.RestApi"

$currentConnectionString = ""
$modulesNotFound = $false;
$accessToken = "abc"

#    $(New-MenuItem -DisplayName "Run Cypress test in console" -Script { 
#         RunCypressInConsole
#     }),
#     $(New-MenuItem -DisplayName "Run Cypress test in browser" -Script { 
#         RunCypressInBrowser
#     }),

function MenuEnvironment() {
    ClearLines -Count 8
    $Opts = @(
        $(New-MenuItem -DisplayName "Run cypress in browser light version" -Script { 
            RunCypressInBrowserLightVersion
        }),
        $(New-MenuItem -DisplayName "Run all tests with cypress in browser light version (against localhost)" -Script { 
            RunCypressInBrowserLightVersionAgainstLocalhost
        }),
        $(New-MenuItem -DisplayName "Run all tests with cypress in browser light version (against dev enviroment)" -Script { 
            RunCypressInBrowserLightVersionLocalAgainstDev
        }),
        $(New-MenuItem -DisplayName "Run only quick tests in cypress in console light version" -Script { 
            RunCypressInConsoleLightVersionOnlyQuickTests
        })
    )
     
    $Chosen = Show-Menu -MenuItems $Opts
    & $Chosen.Script
}

# Prepare database for running cypress tests
function Prepare() {
    Write-Host "Prepare database" -ForegroundColor Blue
    Set-Location $localApiRelativePath

    # Backup current Connection string
    $secrets = dotnet user-secrets list --json | ConvertFrom-Json
    $script:currentConnectionString = $secrets."ConnectionStrings:SqlDatabase"

    Remove-DbaDatabase -SqlInstance $localSqlInstance -Database $localDatabase -Confirm:$false
    New-DbaDatabase -SqlInstance $localSqlInstance -Name $localDatabase
    dotnet user-secrets set "ConnectionStrings:SqlDatabase" "$localTestDatabase"

    Write-Host "`nUpdate database`n" -ForegroundColor Blue

    dotnet ef database update

    # Seed database
    $scriptFile = "../cypress.sql"
    Invoke-DbaQuery –SqlInstance $localSqlInstance –File $scriptFile –Database $localDatabase

    cd -
}

function CleanUp() {
    Write-Host "`nClean environment`n" -ForegroundColor Blue

    # If the previous ConnectionString is the same as used in the testing, we don't bother changing it back
    if ($localTestDatabase -ne $currentConnectionString) {
        Set-Location $localApiRelativePath
        dotnet user-secrets set "ConnectionStrings:SqlDatabase" "$currentConnectionString"
        cd -
    }
}

function GetAccessToken2() {
    Write-Host "`nRetrieve access token`n" -ForegroundColor Blue
    ./GetAccessToken.exe --tenant-id $tenantId --app-id $appId --mock-user-client-secret $clientSecret --authority $scope --output-destination-file ./tmp/accesstoken.txt
    $accessToken = Get-Content -Path ./tmp/accessToken.txt
    Remove-Item -path ./tmp/accessToken.txt

    Write-Host "-------------------------------------------------------------------------`n$accessToken`n-------------------------------------------------------------------------`n"
    Return $accessToken
}

function GetAccessToken([string]$clientId, [string]$tenantId, [string]$clientSecret, [string]$scope) {
    Write-Host "Get access token" -ForegroundColor Blue
    Write-Host $clientId
    Write-Host $tenantId
    Write-Host $clientSecret
    Write-Host $scope
    
    $body = @{client_id=$clientId;client_secret=$clientSecret;grant_type="client_credentials";scope="${scope}/.default";}
    $oAuthReq = Invoke-RestMethod -Method Post -Uri https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token -Body $body
    
    $accessToken = $oAuthReq.access_token

    if ($accessToken.Length -gt 20) {
        # Write-Host "$accessToken"
        Write-Host "$(CurrentLineStart)Access token ...$($accessToken.substring(20, 20))... was received" -ForegroundColor Green
    } else {
        Write-Host "$(CurrentLineStart)Access token could not be retrieved" -ForegroundColor Red
        exit
    }

    return $accessToken

    # $job = Start-Job -ScriptBlock {
    #     az account get-access-token --query 'accessToken' -o tsv
    # }

    # Return GetJobResult($job);
}

function RunCypressInConsole() {
    Write-Host "`n"

    Prepare
    $accessToken = GetAccessToken

    $task1 = { Set-Location $localApiRelativePath; dotnet run }
    $task1 = $(npx cypress open --env scaAccessToken=$accessToken)
    $task3 = { npm start }

    Write-Host "`nStart React app`n" -ForegroundColor Blue
    $job3 = Start-Job -ScriptBlock $task3

    Write-Host "Start API Server`n" -ForegroundColor Blue
    $job1 = Start-Job -ScriptBlock $task1

    Write-Host "Run Cypress in console" -ForegroundColor Blue
    Invoke-Command -ScriptBlock $task2

    Stop-Job -Job $job1, $job3
    Remove-Job -Job $job1, $job3

    CleanUp
}

function RunCypressInBrowser() {
    Write-Host "`n"

    Prepare

    $env = $(Environment.GetEnvironmentVariables(".env"))
    $scope = $env.REACT_APP_SEPES_CLIENTID
    $clientId = $env.REACT_APP_SEPES_TESTING_CLIENT_ID
    $accessToken = GetAccessToken -clientId $clientId -tenantId $tenantId -clientSecret $clientSecret -scope $scope

    $task1 = { npx cypress open --env scaAccessToken=$Using:accessToken }
    $task2 = { npm start }

    Write-Host "   Please start API with 'dotnet run' in another terminal window, then press Enter...`n" -ForegroundColor Yellow
    $null = [Console]::ReadKey('NoEcho')

    Write-Host "Run Cypress in browser`n" -ForegroundColor Blue
    $job1 = Start-Job -ScriptBlock $task1

    Write-Host "`nStart React app`n" -ForegroundColor Blue
    $job2 = Start-Job -ScriptBlock $task2

    $null = Wait-Job -Job $job1

    Stop-Job -Job $job1, $job2
    Remove-Job -Job $job1, $job2

    CleanUp
}

function GetEnvironmentVariables([String]$Path) {
    $values = Get-Content $Path | Out-String | ConvertFrom-StringData
    Return $values
}

function CurrentLineStart() {
    $esc = [char]27
    $CurrentLine  = $Host.UI.RawUI.CursorPosition.Y + 1
    Return "$esc[${CurrentLine};0H"
}

function RunCypressInBrowserLightVersionAgainstLocalhost() {
    Write-Host "`n"

    $env = $(GetEnvironmentVariables(".env"))
    $scope = $env.REACT_APP_SEPES_CLIENTID
    $clientId = $env.REACT_APP_SEPES_TESTING_CLIENT_ID

    $accessToken = GetAccessToken -clientId $clientId -tenantId $tenantId -clientSecret $clientSecret -scope $scope

    Write-Host "Run Cypress in browser `n" -ForegroundColor Blue
    $task1 = { npx cypress open --config-file "cypress.json" --env cyAccessToken=$Using:accessToken }
    $job1 = Start-Job -ScriptBlock $task1
}

function RunCypressInBrowserLightVersionLocalAgainstDev() {
    Write-Host "`n"
    $env = $(GetEnvironmentVariables(".env"))
    $scope = $env.REACT_APP_SEPES_CLIENTID
    $clientId = $env.REACT_APP_SEPES_TESTING_CLIENT_ID

    $accessToken = GetAccessToken -clientId $clientId -tenantId $tenantId -clientSecret $clientSecret -scope $scope
    Write-Host "Run Cypress in browser `n" -ForegroundColor Blue
    $task1 = { npx cypress open --config-file "cypress.dev.json" --env cyAccessToken=$Using:accessToken }
    $job1 = Start-Job -ScriptBlock $task1
}

function RunCypressInConsoleLightVersion() {
    Write-Host "`n"
    $env = $(GetEnvironmentVariables(".env"))
    $scope = $env.REACT_APP_SEPES_CLIENTID
    $clientId = $env.REACT_APP_SEPES_TESTING_CLIENT_ID

    $accessToken = GetAccessToken -clientId $clientId -tenantId $tenantId -clientSecret $clientSecret -scope $scope
    Write-Host "Run Cypress in browser `n" -ForegroundColor Blue
    $task1 = { npx cypress run --config-file "cypress.json" --env cyAccessToken=$Using:accessToken }
    $job1 = Start-Job -ScriptBlock $task1
}

function RunCypressInConsoleLightVersionOnlyQuickTests() {
    Write-Host "`n"
    $env = $(GetEnvironmentVariables(".env"))
    $scope = $env.REACT_APP_SEPES_CLIENTID
    $clientId = $env.REACT_APP_SEPES_TESTING_CLIENT_ID

    $accessToken = GetAccessToken -clientId $clientId -tenantId $tenantId -clientSecret $clientSecret -scope $scope
    Write-Host "Run Cypress in browser `n" -ForegroundColor Blue
    $task1 = { npx cypress run --config-file "cypress.json" --spec "cypress/integration/quickRunningTests/**/*" --env cyAccessToken=$Using:accessToken }
    $job1 = Start-Job -ScriptBlock $task1

    $null = Wait-Job -Job $job1
}

# MAIN
clear

if (-Not (Get-Module -ListAvailable -Name dbatools)) {
    $modulesNotFound = $true;
    Write-Host -ForegroundColor Red "   Module 'dbatools' does not exist. Install it by running powershell as admin:`n"
    Write-Host -ForegroundColor White "  Install-Module dbatools`n"
} 

if (-Not (Get-Module -ListAvailable -Name PSMenu)) {
    $modulesNotFound = $true;
    Write-Host -ForegroundColor Red "   Module 'PSMenu' does not exist. Install it by running powershell as admin:`n"
    Write-Host -ForegroundColor White "  Install-Module PSMenu`n"
} 

if (-Not (Get-Module -ListAvailable -Name PSReadLine)) {
    $modulesNotFound = $true;
    Write-Host -ForegroundColor Red "   Module 'PSReadLine' does not exist. Install it by running powershell as admin:`n"
    Write-Host -ForegroundColor White "  Install-Module PSReadLine`n"
} 

if ($modulesNotFound) {
    exit
}

$isApiRunning =  $(netstat -ano | findstr :44368)
If ($isApiRunning -ne $null) {

    Write-Host -ForegroundColor Red "`n   You need to shut down any active Api Server running on port :44368 before continuing"
    exit
}

# $start = Get-Date
.\src\functions\text -Text 'Sepes Testing' -Online -FontColor Yellow -Fontname standard
DrawLine -y 6 -x 0 -length 70

MenuEnvironment
# $end = Get-Date

# Write-Host -ForegroundColor Red ($end - $start).TotalSeconds