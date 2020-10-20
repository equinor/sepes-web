using Microsoft.Identity.Client;
using System;
using System.IO;
using System.Threading.Tasks;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Azure.KeyVault;

namespace GetAccessToken
{
    class Program
    {
        IConfidentialClientApplication app;

        /// <summary>
        /// Retrieves an access token without using intervention using client secret.
        /// Note: This requries that an app registration has been set up.
        /// </summary>
        /// <param name="tenantId">Required</param>
        /// <param name="appId">Required</param>
        /// <param name="mockUserClientSecret">Required. Client secret of app registration to call our application</param>
        /// <param name="keyVaultUserClientSecret">Optional. Client secret of an app registration that can write to key vault</param>
        /// <param name="keyVaultUserClientId">Optional. Client id of the app that can write to key vault</param>
        /// <param name="authority">Required</param>
        /// <param name="outputDestinationFile">Optional. If not set then accesstoken will be output to screen.</param>
        /// <param name="keyVaultName">Optional. Name of key vault to store access token</param>
        /// <param name="keyVaultSecretName">Optional. Name of secret in key vault to store access token</param>
        /// <returns></returns>
        static async Task Main(string tenantId, string appId, string mockUserClientSecret, 
            string keyVaultUserClientSecret, string keyVaultUserClientId, string authority, string outputDestinationFile,
            string keyVaultName, string keyVaultSecretName)
        {
            Program p = new Program();

            if (string.IsNullOrEmpty(tenantId) || string.IsNullOrEmpty(appId) || string.IsNullOrEmpty(mockUserClientSecret) || string.IsNullOrEmpty(authority))
            {
                Console.WriteLine("One of the required arguments was not specified, use the -h, -? or --help switches to get the full documentation");
                return;
            }

            var accessToken = await p.GetToken(tenantId, appId, mockUserClientSecret, authority);
            if (string.IsNullOrEmpty(outputDestinationFile) && string.IsNullOrEmpty(keyVaultSecretName))
            { 
                Console.WriteLine(accessToken);
            }

            if (!string.IsNullOrEmpty(outputDestinationFile))
            { 
                File.WriteAllText(outputDestinationFile, accessToken);
            }

            if (!string.IsNullOrEmpty(keyVaultSecretName) && !string.IsNullOrEmpty(keyVaultSecretName))
            {
                Console.WriteLine($"Writing access token to key vault, secret name = {keyVaultSecretName}");
                await p.WriteAccessTokenToKeyVault(keyVaultName, keyVaultSecretName, accessToken, 
                    tenantId, keyVaultUserClientId, keyVaultUserClientSecret);
            }
        }

        private async Task<bool> WriteAccessTokenToKeyVault(string keyVaultName, string keyVaultSecretName, string accessToken,
            string tenantId, string clientId, string clientSecret)
        {
            var kvUri = "https://" + keyVaultName + ".vault.azure.net";

            //This seems to be the preferred newer way of doing credentials, but it's not working and there is
            //a bug report on it with Microsoft
            //https://docs.microsoft.com/en-us/azure/key-vault/quick-create-net
            //https://github.com/Azure/AppConfiguration/issues/201
            //var client = new SecretClient(new Uri(kvUri), new DefaultAzureCredential());

            var client = new SecretClient(new Uri(kvUri), new ClientSecretCredential(tenantId, clientId, clientSecret));
            await client.SetSecretAsync(keyVaultSecretName, accessToken);

            return true;
        }

        private async Task<string> GetToken(string tenantId, string appId, string clientSecret, string authority)
        {
            //MockUser
            app = ConfidentialClientApplicationBuilder.Create(appId)
                .WithClientSecret(clientSecret)
                .WithAuthority(new Uri($"https://login.microsoftonline.com/{tenantId}"))
                .Build();

            // With client credentials flows, the scope is always of the shape "resource/.default" because the
            // application permissions need to be set statically (in the portal or by PowerShell), and then granted by
            // a tenant administrator.
            string[] scopes = new string[] { authority };

            AuthenticationResult result = null;
            try
            {
                result = await app.AcquireTokenForClient(scopes)
                                 .ExecuteAsync();

                return result.AccessToken;
            }
            catch (MsalUiRequiredException ex)
            {
                Console.WriteLine("The application doesn't have sufficient permissions.");
                Console.WriteLine("- Did you declare enough app permissions during app creation?");
                Console.WriteLine("- Did the tenant admin grant permissions to the application?");
                Console.Write(ex.Message);
            }
            catch (MsalServiceException ex) when (ex.Message.Contains("AADSTS70011"))
            {
                Console.WriteLine("Invalid scope. The scope has to be in the form https://resourceurl/.default");
                Console.WriteLine("Mitigation: Change the scope to be as expected.");
                Console.WriteLine(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Unexpected error when acquiring access token");
                Console.WriteLine(ex.Message);
            }
            return null;
        }
    }
}