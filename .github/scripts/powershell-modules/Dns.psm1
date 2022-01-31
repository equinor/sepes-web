function New-DnsRecord {
    <#
    .DESCRIPTION
        Set DNS record
        API documentation link: https://docs.microsoft.com/en-us/rest/api/dns/record-sets/create-or-update
    .EXAMPLE
        TODO: Add or remove example
    #>
    [CmdletBinding()]
    param (
        [Parameter(Mandatory=$true)][string]$Token,
        [Parameter(Mandatory=$true)][string]$RecordName,
        [Parameter(Mandatory=$true)][string]$ZoneName,
        [Parameter(Mandatory=$true)][string]$Subscription,
        [Parameter(Mandatory=$true)][string]$ResourceGroup,
        [Parameter(Mandatory=$true)][string]$Type,
        [Parameter(Mandatory=$true)][string]$Address,
        [Parameter(Mandatory=$true)][int]$TTL
    )
    $apiVersion = "2018-05-01"
    try {
        if ($Type -eq "A") {
            $body = New-Object -TypeName psobject -Property @{
                properties = @{
                    TTL = $TTL
                    ARecords = @(
                        @{
                        "ipv4Address" = $Address
                        }
                    )
                }
            }
        }
        elseif ($Type -eq "CName") {
            $body = New-Object -TypeName psobject -Property @{
                properties = @{
                    TTL = $TTL
                    CNAMERecord = @{
                        "cname" = $Address
                    }
                }
            }
        }
        elseif ($Type -eq "TXT") {
            $body = New-Object -TypeName psobject -Property @{
                properties = @{
                    TTL = $TTL
                    TXTRecords = @(
                        @{
                        "value" = @($Address)
                        }
                    )
                }
            }
        }
        # Convert body to json payload and invoke the webrequest
        $body = $body | ConvertTo-Json -Depth 10
        $requestParams = @{
            Method  = 'PUT'
            Uri     = "https://management.azure.com/subscriptions/$subscription/resourceGroups/$ResourceGroup/providers/Microsoft.Network/dnsZones/$ZoneName/$Type/$($RecordName)?api-version=$apiVersion"
            Headers = @{
                'Authorization' =  $Token
            }
        }
        $reply = Invoke-WebRequest @requestParams -Body $body -ContentType application/json
        if ($reply.StatusCode -eq 200 -or 201) {
            return $reply.Content | ConvertFrom-Json
        }
        else {
            Write-Error "Something went wrong with function app deploy"
        }
    }
    catch {
        Write-Error $_.ErrorDetails -ErrorAction Stop
    }
}