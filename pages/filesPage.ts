import { expect, Locator, Page } from '@playwright/test';
import filesTestData from '../test-data/filesTestData.json'

export class FilesPage {

    protected readonly page: Page;
    private readonly dragAnddrop: Locator;
    private readonly draggable: Locator;
    private readonly droppable: Locator;
    private readonly droppedMessage: Locator;
    private readonly uploadFiles: Locator;
    private readonly uploadSingle: Locator;
    private readonly uploadMultiple: Locator;
    private readonly chooseFile1: Locator;
    private readonly chooseFile2: Locator;
    private readonly singleFileSelectedMsg: Locator;
    private readonly multipleFileSelectedMsg: Locator;
    private readonly downloadFileLink: Locator;
    private readonly inputText: Locator;
    private readonly generatePDF: Locator;
    private readonly downloadPdfFile: Locator;

    constructor(page:Page){

        this.page = page;
        this.dragAnddrop = page.getByRole('heading', {name: 'Drag and Drop'});
        this.draggable = page.getByText('Drag me to my target');
        this.droppable = page.locator('#droppable');
        this.droppedMessage = page.getByText('Dropped!');
        this.uploadFiles = page.getByRole('heading', {name: 'Upload Files'});
        this.uploadSingle = page.getByRole('button', {name: 'Upload Single File'});
        this.uploadMultiple = page.getByRole('button', {name: 'Upload Multiple Files'});
        this.chooseFile1 = page.locator('#singleFileInput');
        this.chooseFile2 = page.locator('#multipleFilesInput');
        this.singleFileSelectedMsg = page.getByText('Single file selected: Doc1.pdf, Size: 206172 bytes, Type: application/pdf');
        this.multipleFileSelectedMsg = page.getByText('Multiple files selected:');
        this.downloadFileLink = page.getByRole('link', {name: 'Download Files'});
        this.inputText = page.locator('#inputText');
        this.generatePDF = page.getByRole('button', {name: 'Generate and Download PDF File'});
        this.downloadPdfFile = page.getByRole('link', { name:'Download PDF File'});
    }

    async performDragAndDrop(): Promise<string> {
        await this.dragAnddrop.scrollIntoViewIfNeeded();
        await this.draggable.dragTo(this.droppable);
        const message = await this.droppedMessage.innerText();
        return message;
    }

    async uploadSingleFile(filePath: string): Promise<string> {
        await this.uploadFiles.scrollIntoViewIfNeeded();
        const choosePromise = this.page.waitForEvent('filechooser');
        await this.chooseFile1.click();
        const chooser = await choosePromise;
        await chooser.setFiles(filePath);
        await this.uploadSingle.click();
        const message= await this.singleFileSelectedMsg.innerText();
        return message;

    }

    async uploadMultipleFile(filePath1: string, filePath2: string): Promise<string> {
        await this.chooseFile2.setInputFiles([filePath1, filePath2]);
        await this.uploadMultiple.click();
        const message = await this.multipleFileSelectedMsg.innerText();
        return message;
    }

    async openDownloadLink(): Promise<void> {
        await this.downloadFileLink.scrollIntoViewIfNeeded();
        await this.downloadFileLink.click();
    }

    async downloadFile() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.inputText.pressSequentially('Test document');
    await this.generatePDF.click();
    await this.downloadPdfFile.click();
    const download = await downloadPromise;
    await download.saveAs('downloadPath' + download.suggestedFilename());
    return download;

    }
}

