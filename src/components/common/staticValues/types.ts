export const resourceType = {
    storageAccount: 'Storage Account',
    networkSecurityGroup: 'Network Security Group',
    virtualNetwork: 'Virtual Network',
    bastion: 'Bastion',
    virtualMachine: 'Virtual Machine',
    resourceGroup: 'Resource Group'
};

export const resourceStatus = {
    ok: 'Ok',
    queued: 'queued',
    failed: 'failed'
};

export const inputErrorsVmRules = {
    equalRules: 'Two or more rules are equal',
    notAllFieldsFilled: 'Enabled when all fields of rules are filled out',
    notValidIp: 'You entered an invalid IP',
    ok: ''
};
