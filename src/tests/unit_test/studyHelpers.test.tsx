import * as helpers from '../../components/common/helpers/studyHelpers';

test('test validateUserInputStudy', () => {
    expect(
        helpers.validateUserInputStudy({
            name: 'testName',
            vendor: 'testVendor',
            wbsCode: '',
            restricted: false,
            description: '',
            logoUrl: '',
            id: '',
            resultsAndLearnings: '',
            datasets: [],
            participants: [],
            sandboxes: [],
            permissions: {
                addRemoveDataset: false,
                addRemoveParticipant: false,
                addRemoveSandbox: false,
                closeStudy: false,
                deleteStudy: false,
                readResulsAndLearnings: false,
                updateMetadata: false,
                updateResulsAndLearnings: false
            }
        })
    ).toBeTruthy();

    expect(
        helpers.validateUserInputStudy({
            name: '',
            vendor: 'testVendor',
            wbsCode: '',
            restricted: false,
            description: '',
            logoUrl: '',
            id: '',
            resultsAndLearnings: '',
            datasets: [],
            participants: [],
            sandboxes: [],
            permissions: {
                addRemoveDataset: false,
                addRemoveParticipant: false,
                addRemoveSandbox: false,
                closeStudy: false,
                deleteStudy: false,
                readResulsAndLearnings: false,
                updateMetadata: false,
                updateResulsAndLearnings: false
            }
        })
    ).toBeFalsy();

    expect(
        helpers.validateUserInputStudy({
            name: '',
            vendor: '',
            wbsCode: '',
            restricted: false,
            description: '',
            logoUrl: '',
            id: '',
            resultsAndLearnings: '',
            datasets: [],
            participants: [],
            sandboxes: [],
            permissions: {
                addRemoveDataset: false,
                addRemoveParticipant: false,
                addRemoveSandbox: false,
                closeStudy: false,
                deleteStudy: false,
                readResulsAndLearnings: false,
                updateMetadata: false,
                updateResulsAndLearnings: false
            }
        })
    ).toBeFalsy();
});

test('test filterRoleList', () => {
    const rolesAll = [
        { key: 'Sponsor Rep', displayValue: 'Sponsor Rep' },
        { key: 'Vendor Admin', displayValue: 'Vendor Admin' },
        { key: 'Vendor Contributor', displayValue: 'Vendor Contributor' },
        { key: 'Study Viewer', displayValue: 'Study Viewer' }
    ];

    const rolesAllExceptSponsor = [
        { key: 'Vendor Admin', displayValue: 'Vendor Admin' },
        { key: 'Vendor Contributor', displayValue: 'Vendor Contributor' },
        { key: 'Study Viewer', displayValue: 'Study Viewer' }
    ];

    const participantWithoutRole = {
        fullName: 'string',
        emailAddress: 'string',
        role: '',
        id: 'string',
        source: 'string',
        databaseId: 1,
        objectId: 'string',
        userId: 1
    };

    const participantWithSponsorRep = {
        fullName: 'string',
        emailAddress: 'string',
        role: 'Sponsor Rep',
        id: 'string',
        source: 'string',
        databaseId: 1,
        objectId: 'string',
        userId: 1
    };

    const participantWithStudyViewer = {
        fullName: 'string',
        emailAddress: 'string',
        role: 'Sponsor Rep',
        id: 'string',
        source: 'string',
        databaseId: 1,
        objectId: 'string',
        userId: 1
    };

    const participantWithVendorAdmin = {
        fullName: 'string',
        emailAddress: 'string',
        role: 'Sponsor Rep',
        id: 'string',
        source: 'string',
        databaseId: 1,
        objectId: 'string',
        userId: 1
    };

    const participantWithVendorContributor = {
        fullName: 'string',
        emailAddress: 'string',
        role: 'Sponsor Rep',
        id: 'string',
        source: 'string',
        databaseId: 1,
        objectId: 'string',
        userId: 1
    };

    const study = {
        name: 'StudyName',
        vendor: 'Bouvet',
        wbsCode: 'abc123',
        restricted: false,
        description: 'Study about fishes',
        logoUrl: 'asdwasdasd',
        id: '1',
        resultsAndLearnings: 'We learned a lot',
        datasets: [],
        participants: [participantWithoutRole],
        sandboxes: [],
        permissions: {
            addRemoveDataset: false,
            addRemoveParticipant: false,
            addRemoveSandbox: false,
            closeStudy: false,
            deleteStudy: false,
            readResulsAndLearnings: false,
            updateMetadata: false,
            updateResulsAndLearnings: false
        }
    };

    const studyWithSponsorRep = {
        name: 'StudyName',
        vendor: 'Bouvet',
        wbsCode: 'abc123',
        restricted: false,
        description: 'Study about fishes',
        logoUrl: 'asdwasdasd',
        id: '1',
        resultsAndLearnings: 'We learned a lot',
        datasets: [],
        participants: [participantWithSponsorRep],
        sandboxes: [],
        permissions: {
            addRemoveDataset: false,
            addRemoveParticipant: false,
            addRemoveSandbox: false,
            closeStudy: false,
            deleteStudy: false,
            readResulsAndLearnings: false,
            updateMetadata: false,
            updateResulsAndLearnings: false
        }
    };

    const studyWithAllRoles = {
        name: 'StudyName',
        vendor: 'Bouvet',
        wbsCode: 'abc123',
        restricted: false,
        description: 'Study about fishes',
        logoUrl: 'asdwasdasd',
        id: '1',
        resultsAndLearnings: 'We learned a lot',
        datasets: [],
        participants: [
            participantWithSponsorRep,
            participantWithStudyViewer,
            participantWithVendorAdmin,
            participantWithVendorContributor
        ],
        sandboxes: [],
        permissions: {
            addRemoveDataset: false,
            addRemoveParticipant: false,
            addRemoveSandbox: false,
            closeStudy: false,
            deleteStudy: false,
            readResulsAndLearnings: false,
            updateMetadata: false,
            updateResulsAndLearnings: false
        }
    };

    expect(helpers.filterRoleList(rolesAll, participantWithoutRole, study)).toEqual(rolesAll);
    expect(helpers.filterRoleList(rolesAll, participantWithSponsorRep, studyWithSponsorRep)).toEqual(
        rolesAllExceptSponsor
    );
    expect(helpers.filterRoleList(rolesAll, participantWithSponsorRep, studyWithAllRoles)).toEqual([]);
});
