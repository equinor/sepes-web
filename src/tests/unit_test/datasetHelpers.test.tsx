import * as helpers from '../../components/common/helpers/datasetHelpers';

test('test validateUserInputSandbox', () => {
    expect(
        helpers.checkForInputErrors({
            name: 'test name',
            classification: 'classification',
            location: 'location',
            id: '1',
            permissions: { deleteDataset: true, editDataset: true }
        })
    ).toBeFalsy();
    expect(
        helpers.checkForInputErrors({
            name: '',
            classification: 'classification',
            location: 'location',
            id: '1',
            permissions: { deleteDataset: true, editDataset: true }
        })
    ).toBeTruthy();
    expect(
        helpers.checkForInputErrors({
            name: 'test name',
            classification: '',
            location: 'location',
            id: '1',
            permissions: { deleteDataset: true, editDataset: true }
        })
    ).toBeTruthy();
    expect(
        helpers.checkForInputErrors({
            name: 'test name',
            classification: 'classification',
            location: '',
            id: '1',
            permissions: { deleteDataset: true, editDataset: true }
        })
    ).toBeTruthy();
});
