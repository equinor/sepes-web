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

test('test checkIfFileAlreadyIsUploaded same files', () => {
    const droppedFiles = [{ name: 'file1' }];
    const existingFiles = [{ name: 'file1' }];
    const expectedResult = [];
    expect(helpers.checkIfFileAlreadyIsUploaded(droppedFiles, existingFiles, () => {})).toEqual(expectedResult);
});

test('test checkIfFileAlreadyIsUploaded one old file and one new', () => {
    const droppedFiles = [{ name: 'file2' }, { name: 'file1' }];
    const existingFiles = [{ name: 'file1' }];
    const expectedResult = [{ name: 'file2' }];
    expect(helpers.checkIfFileAlreadyIsUploaded(droppedFiles, existingFiles, () => {})).toEqual(expectedResult);
});
