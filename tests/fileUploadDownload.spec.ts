import { test, expect } from '@playwright/test'; 
import { FilesPage } from '../pages/filesPage';
import { ProjectUtils } from '../utils/projectUtils';
import filesTestData from '../test-data/filesTestData.json'
import urls from '../test-data/urls.json'
import path from 'path';


test.describe('Files upload download', async () => {

    let filePage: FilesPage;
    let projectUtils: ProjectUtils;
    
    test.beforeEach( async ({page}) => {
        let Data =urls.PlaywrightPractice;
        filePage = new FilesPage(page);
        projectUtils = new ProjectUtils(page);
        await projectUtils.open(Data.url);
            
    });

    test('Test_001_Drag and Drop @smoke', async () => {
        const droppedMsg= await filePage.performDragAndDrop();
        expect(droppedMsg).toBe('Dropped!');
    });

    test('Test_002 Upload single and multiple files @smoke', async () => {
        let Data =filesTestData;
        const singleFileSelectedMsg = await filePage.uploadSingleFile(Data.filePath1);
        expect.soft(singleFileSelectedMsg).toContain(Data.expectedText);
        const multipleFileSelectedMsg = await filePage.uploadMultipleFile(Data.filePath1, Data.filePath2);      
        expect(multipleFileSelectedMsg).toContain('Multiple files selected:');

    });

    test('Test_003_File Download @smoke', async () => {
        await filePage.openDownloadLink();
        const fileName = await filePage.downloadFile();
        expect(fileName).toMatch(/\.pdf/i);

    });

});
    