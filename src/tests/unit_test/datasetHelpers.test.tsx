import * as helpers from '../../components/common/helpers/datasetHelpers';
import expect from 'expect';
import { dataset, datasetWithoutPermissions } from '../mocks/dataset/dataset-mocs';

test('test validateUserInputSandbox', () => {
    expect(
        helpers.checkForInputErrors({
            name: 'test name',
            classification: 'classification',
            location: 'location',
            id: '1',
            permissions: { deleteDataset: true, editDataset: true },
            studyName: 'testStudy'
        })
    ).toBeFalsy();
    expect(
        helpers.checkForInputErrors({
            name: '',
            classification: 'classification',
            location: 'location',
            id: '1',
            permissions: { deleteDataset: true, editDataset: true },
            studyName: 'testStudy'
        })
    ).toBeTruthy();
    expect(
        helpers.checkForInputErrors({
            name: 'test name',
            classification: '',
            location: 'location',
            id: '1',
            permissions: { deleteDataset: true, editDataset: true },
            studyName: 'testStudy'
        })
    ).toBeTruthy();
    expect(
        helpers.checkForInputErrors({
            name: 'test name',
            classification: 'classification',
            location: '',
            id: '1',
            permissions: { deleteDataset: true, editDataset: true },
            studyName: 'testStudy'
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

test('test removeFirstOccurenceCharacter ', () => {
    const test = '/testing';
    const expectedResult = 'testing';
    expect(helpers.removeFirstOccurenceCharacter(test, '/')).toEqual(expectedResult);
});

test('test findWithAttr ', () => {
    const array = [{ path: 'file1.png' }];
    expect(helpers.findWithAttr(array, 'path', 'file1.png')).toEqual(0);
});

test('test checkIfDeleteIsEnabled ', () => {
    const progressArray = [{ name: 'file1.png', percent: 1 }];
    const file = { name: 'file1.png' };
    expect(helpers.checkIfDeleteIsEnabled(file, dataset, progressArray)).toBeTruthy();
});

test('test checkIfDeleteIsEnabled, no permission ', () => {
    const progressArray = [{ name: 'file1.png', percent: 1 }];
    const file = { name: 'file1.png' };
    expect(helpers.checkIfDeleteIsEnabled(file, datasetWithoutPermissions, progressArray)).toBeTruthy();
});

test('test checkIfDatasetNameAlreadyExists, check output ', () => {
    const datasets = [{ name: 'dataset1' }];
    expect(helpers.checkIfDatasetNameAlreadyExists(datasets, 'dataset1')).toBeTruthy();
    expect(helpers.checkIfDatasetNameAlreadyExists(datasets, 'dataset2')).toBeFalsy();
});
