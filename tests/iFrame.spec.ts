import { test, expect } from '@playwright/test'; 
import { iFrame } from '../pages/iframePage';
import { ProjectUtils } from '../utils/projectUtils';
import urls from '../test-data/urls.json'

import iframeTestData from '../test-data/iframeTestData.json'

test.describe('iframes', async () => {

    let frame: iFrame;
    let projectUtils: ProjectUtils;
    let Data = iframeTestData;

    test.beforeEach( async ({page}) => {
        let iframeTest =urls.iframeTest;
        frame = new iFrame(page);
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