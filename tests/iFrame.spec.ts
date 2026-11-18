import { test, expect } from '@playwright/test'; 
import { IframePage } from '../pages/iframePage';
import { ProjectUtils } from '../utils/projectUtils';
import urls from '../test-data/urls.json'

import iframeTestData from '../test-data/iframeTestData.json'

test.describe('iframes', () => {

    let frame: IframePage;
    let projectUtils: ProjectUtils;
    const Data = iframeTestData;

    test.beforeEach( async ({page}) => {
        let iframeTest =urls.iframeTest;
        frame = new IframePage(page);
        projectUtils = new ProjectUtils(page);
        await projectUtils.open(iframeTest.url);
                
    });

    test('Test_001_Fill input inside iframe @smoke', async () => {
        const actualmessage = await frame.fillIframeForm(Data.name, Data.message, Data.priority);
        expect(actualmessage).toBe(Data.expectedMessage);   
    });

    test('Test_002_Nested iframe @smoke', async () => {
        const actualmessage = await frame.fillInnerFrameForm(Data.name, Data.message, Data.priority);
        expect(actualmessage).toBe(Data.expectedMessage);        
    });

});