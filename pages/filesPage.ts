import { Download, expect, Locator, Page } from '@playwright/test';
import path from 'path';

export class FilesPage {

    protected readonly page: Page;
    private readonly dragAnddrop: Locator;
    private readonly draggable: Locator;
    private readonly droppable: Locator;
    private readonly uploadFiles: Locator;
    private readonly uploadSingle: Locator;
    private readonly uploadMultiple: Locator;
    private readonly chooseFile1: Locator;
    private readonly chooseFile2: Locator;
    private readonly singleFileStatus: Locator;
    private readonly multipleFilesStatus: Locator;
    private readonly downloadFileLink: Locator;
    private readonly inputText: Locator;
    private readonly generatePDF: Locator;
    private readonly downloadPdfFile: Locator;

    constructor(page: Page) {

        this.page = page;
        this.dragAnddrop = page.getByRole('heading', { name: 'Drag and Drop' });
        this.draggable = page.locator('#draggable');
        this.droppable = page.locator('#droppable');
        this.uploadFiles = page.getByRole('heading', { name: 'Upload Files' });
        this.uploadSingle = page.getByRole('button', { name: 'Upload Single File' });
        this.uploadMultiple = page.getByRole('button', { name: 'Upload Multiple Files' });
        this.chooseFile1 = page.locator('#singleFileInput');
        this.chooseFile2 = page.locator('#multipleFilesInput');
        // Status paragraphs that show the result for whichever file was uploaded
        this.singleFileStatus = page.locator('#singleFileStatus');
        this.multipleFilesStatus = page.locator('#multipleFilesStatus');
        this.downloadFileLink = page.getByRole('link', { name: 'Download Files' });
        this.inputText = page.locator('#inputText');
        this.generatePDF = page.locator('#generatePdf');
        this.downloadPdfFile = page.locator('#pdfDownloadLink');
    }

    async performDragAndDrop(): Promise<string> {
        await this.dragAnddrop.scrollIntoViewIfNeeded();
        await this.draggable.dragTo(this.droppable);
        return (await this.droppable.innerText()).trim();
    }

    async uploadSingleFile(filePath: string): Promise<string> {
        await this.uploadFiles.scrollIntoViewIfNeeded();
        await this.chooseFile1.setInputFiles(filePath);
        await this.uploadSingle.click();
        return (await this.singleFileStatus.innerText()).trim();
    }

    async uploadMultipleFile(filePath1: string, filePath2: string): Promise<string> {
        await this.chooseFile2.setInputFiles([filePath1, filePath2]);
        await this.uploadMultiple.click();
        return (await this.multipleFilesStatus.innerText()).trim();
    }

    async openDownloadLink(): Promise<void> {
        await this.downloadFileLink.scrollIntoViewIfNeeded();
        await this.downloadFileLink.click();
        await this.page.waitForURL(/download-files/, { waitUntil: 'domcontentloaded' });
    }

    /**
     * Generates a PDF from the given text, downloads it and saves it into saveDir.
     * Returns the Playwright Download so the test can check the file name.
     */
    async downloadFile(text: string, saveDir: string): Promise<Download> {
        await this.inputText.fill(text);
        // The page attaches the button's click handler with jQuery once the page is ready.
        // If the click happens before that, nothing happens and the link stays hidden,
        // so click again until the "Download PDF File" link becomes visible.
        await expect(async () => {
            await this.generatePDF.click();
            await expect(this.downloadPdfFile).toBeVisible({ timeout: 2000 });
        }).toPass({ timeout: 20000 });
        const downloadPromise = this.page.waitForEvent('download');
        await this.downloadPdfFile.click();
        const download = await downloadPromise;
        await download.saveAs(path.join(saveDir, download.suggestedFilename()));
        return download;
    }
}
