function Get-AzureResource {
    <#
    .DESCRIPTION
        Function for getting resource information by name only
    .EXAMPLE
    TODO: add example or delete section
    #>
    [CmdletBinding()]
    param (
        [Parameter()][string]$Name,
        [Parameter()][string]$Subscription,
        [Parameter()][string]$Token
    )
    $apiVersion = "2021-04-01"
    $resourceParam = @{
        Method  = 'GET'
        Uri     = "https://management.azure.com/subscriptions/$Subscription/resources?api-version=$apiVersion"
        Headers = @{
            'Authorization' = $Token
        }
    }
    $request = (Invoke-WebRequest @resourceParam -ContentType appication/json | ConvertFrom-Json).value | Where-Object {$_.name -eq $Name}
    if ($request.name -eq $name){
        Write-Verbose "Resource found: $($request.name) "
        return $request
    }
    else {
        Write-Error "Resource not found"
    }
}