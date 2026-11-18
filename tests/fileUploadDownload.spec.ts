import { test, expect } from '@playwright/test';
import { FilesPage } from '../pages/filesPage';
import { ProjectUtils } from '../utils/projectUtils';
import filesTestData from '../test-data/filesTestData.json';
import urls from '../test-data/urls.json';
import path from 'path';

// File paths in the test data are relative to the project root, so they work on any machine and on CI
const projectRoot = path.resolve(__dirname, '..');
const file1 = path.join(projectRoot, filesTestData.filePath1);
const file2 = path.join(projectRoot, filesTestData.filePath2);

test.describe('Files upload download', () => {

    let filePage: FilesPage;
    let projectUtils: ProjectUtils;

    test.beforeEach(async ({ page }) => {
        filePage = new FilesPage(page);
        projectUtils = new ProjectUtils(page);
        await projectUtils.open(urls.PlaywrightPractice.url);
    });

    test('Test_001_Drag and Drop @smoke', async () => {
        const droppedMsg = await filePage.performDragAndDrop();
        expect(droppedMsg).toBe('Dropped!');
    });

    test('Test_002_Upload single and multiple files @smoke', async () => {
        const singleMsg = await filePage.uploadSingleFile(file1);
        expect.soft(singleMsg).toBe(filesTestData.expectedSingleText);

        const multipleMsg = await filePage.uploadMultipleFile(file1, file2);
        for (const text of filesTestData.expectedMultipleText) {
            expect.soft(multipleMsg).toContain(text);
        }
    });

    test('Test_003_File Download @smoke', async ({}, testInfo) => {
        await filePage.openDownloadLink();
        // Save into this test's own output folder (inside test-results), not the project root
        const download = await filePage.downloadFile(filesTestData.downloadText, testInfo.outputPath('downloads'));
        expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
    });

});
