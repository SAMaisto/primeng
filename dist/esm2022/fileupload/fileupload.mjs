import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClientModule, HttpEventType } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, booleanAttribute, numberAttribute } from '@angular/core';
import { PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { PlusIcon } from 'primeng/icons/plus';
import { TimesIcon } from 'primeng/icons/times';
import { UploadIcon } from 'primeng/icons/upload';
import { MessagesModule } from 'primeng/messages';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/common/http";
import * as i3 from "primeng/api";
import * as i4 from "@angular/common";
import * as i5 from "primeng/button";
import * as i6 from "primeng/progressbar";
import * as i7 from "primeng/messages";
import * as i8 from "primeng/ripple";
/**
 * FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations.
 * @group Components
 */
export class FileUpload {
    document;
    platformId;
    renderer;
    el;
    sanitizer;
    zone;
    http;
    cd;
    config;
    /**
     * Name of the request parameter to identify the files at backend.
     * @group Props
     */
    name;
    /**
     * Remote url to upload the files.
     * @group Props
     */
    url;
    /**
     * HTTP method to send the files to the url such as "post" and "put".
     * @group Props
     */
    method = 'post';
    /**
     * Used to select multiple files at once from file dialog.
     * @group Props
     */
    multiple;
    /**
     * Comma-separated list of pattern to restrict the allowed file types. Can be any combination of either the MIME types (such as "image/*") or the file extensions (such as ".jpg").
     * @group Props
     */
    accept;
    /**
     * Disables the upload functionality.
     * @group Props
     */
    disabled;
    /**
     * When enabled, upload begins automatically after selection is completed.
     * @group Props
     */
    auto;
    /**
     * Cross-site Access-Control requests should be made using credentials such as cookies, authorization headers or TLS client certificates.
     * @group Props
     */
    withCredentials;
    /**
     * Maximum file size allowed in bytes.
     * @group Props
     */
    maxFileSize;
    /**
     * Summary message of the invalid file size.
     * @group Props
     */
    invalidFileSizeMessageSummary = '{0}: Invalid file size, ';
    /**
     * Detail message of the invalid file size.
     * @group Props
     */
    invalidFileSizeMessageDetail = 'maximum upload size is {0}.';
    /**
     * Summary message of the invalid file type.
     * @group Props
     */
    invalidFileTypeMessageSummary = '{0}: Invalid file type, ';
    /**
     * Detail message of the invalid file type.
     * @group Props
     */
    invalidFileTypeMessageDetail = 'allowed file types: {0}.';
    /**
     * Detail message of the invalid file type.
     * @group Props
     */
    invalidFileLimitMessageDetail = 'limit is {0} at most.';
    /**
     * Summary message of the invalid file type.
     * @group Props
     */
    invalidFileLimitMessageSummary = 'Maximum number of files exceeded, ';
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Width of the image thumbnail in pixels.
     * @group Props
     */
    previewWidth = 50;
    /**
     * Label of the choose button. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    chooseLabel;
    /**
     * Label of the upload button. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    uploadLabel;
    /**
     * Label of the cancel button. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    cancelLabel;
    /**
     * Icon of the choose button.
     * @group Props
     */
    chooseIcon;
    /**
     * Icon of the upload button.
     * @group Props
     */
    uploadIcon;
    /**
     * Icon of the cancel button.
     * @group Props
     */
    cancelIcon;
    /**
     * Whether to show the upload button.
     * @group Props
     */
    showUploadButton = true;
    /**
     * Whether to show the cancel button.
     * @group Props
     */
    showCancelButton = true;
    /**
     * Defines the UI of the component.
     * @group Props
     */
    mode = 'advanced';
    /**
     * HttpHeaders class represents the header configuration options for an HTTP request.
     * @group Props
     */
    headers;
    /**
     * Whether to use the default upload or a manual implementation defined in uploadHandler callback. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    customUpload;
    /**
     * Maximum number of files that can be uploaded.
     * @group Props
     */
    fileLimit;
    /**
     * Style class of the upload button.
     * @group Props
     */
    uploadStyleClass;
    /**
     * Style class of the cancel button.
     * @group Props
     */
    cancelStyleClass;
    /**
     * Style class of the remove button.
     * @group Props
     */
    removeStyleClass;
    /**
     * Style class of the choose button.
     * @group Props
     */
    chooseStyleClass;
    /**
     * Callback to invoke before file upload is initialized.
     * @param {FileBeforeUploadEvent} event - Custom upload event.
     * @group Emits
     */
    onBeforeUpload = new EventEmitter();
    /**
     * An event indicating that the request was sent to the server. Useful when a request may be retried multiple times, to distinguish between retries on the final event stream.
     * @param {FileSendEvent} event - Custom send event.
     * @group Emits
     */
    onSend = new EventEmitter();
    /**
     * Callback to invoke when file upload is complete.
     * @param {FileUploadEvent} event - Custom upload event.
     * @group Emits
     */
    onUpload = new EventEmitter();
    /**
     * Callback to invoke if file upload fails.
     * @param {FileUploadErrorEvent} event - Custom error event.
     * @group Emits
     */
    onError = new EventEmitter();
    /**
     * Callback to invoke when files in queue are removed without uploading using clear all button.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onClear = new EventEmitter();
    /**
     * Callback to invoke when a file is removed without uploading using clear button of a file.
     * @param {FileRemoveEvent} event - Remove event.
     * @group Emits
     */
    onRemove = new EventEmitter();
    /**
     * Callback to invoke when files are selected.
     * @param {FileSelectEvent} event - Select event.
     * @group Emits
     */
    onSelect = new EventEmitter();
    /**
     * Callback to invoke when files are being uploaded.
     * @param {FileProgressEvent} event - Progress event.
     * @group Emits
     */
    onProgress = new EventEmitter();
    /**
     * Callback to invoke in custom upload mode to upload the files manually.
     * @param {FileUploadHandlerEvent} event - Upload handler event.
     * @group Emits
     */
    uploadHandler = new EventEmitter();
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onImageError = new EventEmitter();
    templates;
    advancedFileInput;
    basicFileInput;
    content;
    set files(files) {
        this._files = [];
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (this.validate(file)) {
                if (this.isImage(file)) {
                    file.objectURL = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i]));
                }
                this._files.push(files[i]);
            }
        }
    }
    get files() {
        return this._files;
    }
    get basicButtonLabel() {
        if (this.auto || !this.hasFiles()) {
            return this.chooseLabel;
        }
        return this.uploadLabel ?? this.files[0].name;
    }
    _files = [];
    progress = 0;
    dragHighlight;
    msgs;
    fileTemplate;
    contentTemplate;
    toolbarTemplate;
    chooseIconTemplate;
    uploadIconTemplate;
    cancelIconTemplate;
    uploadedFileCount = 0;
    focus;
    uploading;
    duplicateIEEvent; // flag to recognize duplicate onchange event for file input
    translationSubscription;
    dragOverListener;
    constructor(document, platformId, renderer, el, sanitizer, zone, http, cd, config) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.el = el;
        this.sanitizer = sanitizer;
        this.zone = zone;
        this.http = http;
        this.cd = cd;
        this.config = config;
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'file':
                    this.fileTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'toolbar':
                    this.toolbarTemplate = item.template;
                    break;
                case 'chooseicon':
                    this.chooseIconTemplate = item.template;
                    break;
                case 'uploadicon':
                    this.uploadIconTemplate = item.template;
                    break;
                case 'cancelicon':
                    this.cancelIconTemplate = item.template;
                    break;
                default:
                    this.fileTemplate = item.template;
                    break;
            }
        });
    }
    ngOnInit() {
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.cd.markForCheck();
        });
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.mode === 'advanced') {
                this.zone.runOutsideAngular(() => {
                    if (this.content) {
                        this.dragOverListener = this.renderer.listen(this.content.nativeElement, 'dragover', this.onDragOver.bind(this));
                    }
                });
            }
        }
    }
    getTranslation(option) {
        return this.config.getTranslation(option);
    }
    choose() {
        this.advancedFileInput?.nativeElement.click();
    }
    onFileSelect(event) {
        if (event.type !== 'drop' && this.isIE11() && this.duplicateIEEvent) {
            this.duplicateIEEvent = false;
            return;
        }
        this.msgs = [];
        if (!this.multiple) {
            this.files = [];
        }
        let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (!this.isFileSelected(file)) {
                if (this.validate(file)) {
                    if (this.isImage(file)) {
                        file.objectURL = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i]));
                    }
                    this.files.push(files[i]);
                }
            }
        }
        this.onSelect.emit({ originalEvent: event, files: files, currentFiles: this.files });
        // this will check the fileLimit with the uploaded files
        this.checkFileLimit(files);
        if (this.hasFiles() && this.auto && (!(this.mode === 'advanced') || !this.isFileLimitExceeded())) {
            this.upload();
        }
        if (event.type !== 'drop' && this.isIE11()) {
            this.clearIEInput();
        }
        else {
            this.clearInputElement();
        }
    }
    isFileSelected(file) {
        for (let sFile of this.files) {
            if (sFile.name + sFile.type + sFile.size === file.name + file.type + file.size) {
                return true;
            }
        }
        return false;
    }
    isIE11() {
        if (isPlatformBrowser(this.platformId)) {
            return !!this.document.defaultView['MSInputMethodContext'] && !!this.document['documentMode'];
        }
    }
    validate(file) {
        this.msgs = this.msgs || [];
        if (this.accept && !this.isFileTypeValid(file)) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileTypeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileTypeMessageDetail.replace('{0}', this.accept)
            });
            return false;
        }
        if (this.maxFileSize && file.size > this.maxFileSize) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileSizeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize))
            });
            return false;
        }
        return true;
    }
    isFileTypeValid(file) {
        let acceptableTypes = this.accept?.split(',').map((type) => type.trim());
        for (let type of acceptableTypes) {
            let acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type) : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();
            if (acceptable) {
                return true;
            }
        }
        return false;
    }
    getTypeClass(fileType) {
        return fileType.substring(0, fileType.indexOf('/'));
    }
    isWildcard(fileType) {
        return fileType.indexOf('*') !== -1;
    }
    getFileExtension(file) {
        return '.' + file.name.split('.').pop();
    }
    isImage(file) {
        return /^image\//.test(file.type);
    }
    onImageLoad(img) {
        window.URL.revokeObjectURL(img.src);
    }
    /**
     * Uploads the selected files.
     * @group Method
     */
    upload() {
        if (this.customUpload) {
            if (this.fileLimit) {
                this.uploadedFileCount += this.files.length;
            }
            this.uploadHandler.emit({
                files: this.files
            });
            this.cd.markForCheck();
        }
        else {
            this.uploading = true;
            this.msgs = [];
            let formData = new FormData();
            this.onBeforeUpload.emit({
                formData: formData
            });
            for (let i = 0; i < this.files.length; i++) {
                formData.append(this.name, this.files[i], this.files[i].name);
            }
            this.http
                .request(this.method, this.url, {
                body: formData,
                headers: this.headers,
                reportProgress: true,
                observe: 'events',
                withCredentials: this.withCredentials
            })
                .subscribe((event) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        this.onSend.emit({
                            originalEvent: event,
                            formData: formData
                        });
                        break;
                    case HttpEventType.Response:
                        this.uploading = false;
                        this.progress = 0;
                        if (event['status'] >= 200 && event['status'] < 300) {
                            if (this.fileLimit) {
                                this.uploadedFileCount += this.files.length;
                            }
                            this.onUpload.emit({ originalEvent: event, files: this.files });
                        }
                        else {
                            this.onError.emit({ files: this.files });
                        }
                        this.clear();
                        break;
                    case HttpEventType.UploadProgress: {
                        if (event['loaded']) {
                            this.progress = Math.round((event['loaded'] * 100) / event['total']);
                        }
                        this.onProgress.emit({ originalEvent: event, progress: this.progress });
                        break;
                    }
                }
                this.cd.markForCheck();
            }, (error) => {
                this.uploading = false;
                this.onError.emit({ files: this.files, error: error });
            });
        }
    }
    /**
     * Clears the files list.
     * @group Method
     */
    clear() {
        this.files = [];
        this.uploadedFileCount = 0;
        this.onClear.emit();
        this.clearInputElement();
        this.cd.markForCheck();
    }
    remove(event, index) {
        this.clearInputElement();
        this.onRemove.emit({ originalEvent: event, file: this.files[index] });
        this.files.splice(index, 1);
        this.checkFileLimit(this.files);
    }
    isFileLimitExceeded() {
        const isAutoMode = this.auto;
        const totalFileCount = isAutoMode ? this.files.length : this.files.length + this.uploadedFileCount;
        if (this.fileLimit && this.fileLimit <= totalFileCount && this.focus) {
            this.focus = false;
        }
        return this.fileLimit && this.fileLimit < totalFileCount;
    }
    isChooseDisabled() {
        if (this.auto) {
            return this.fileLimit && this.fileLimit <= this.files.length;
        }
        else {
            return this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount;
        }
    }
    checkFileLimit(files) {
        this.msgs ??= [];
        const hasExistingValidationMessages = this.msgs.length > 0 && this.fileLimit < files.length;
        if (this.isFileLimitExceeded() || hasExistingValidationMessages) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileLimitMessageSummary.replace('{0}', this.fileLimit.toString()),
                detail: this.invalidFileLimitMessageDetail.replace('{0}', this.fileLimit.toString())
            });
        }
    }
    clearInputElement() {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.advancedFileInput.nativeElement.value = '';
        }
        if (this.basicFileInput && this.basicFileInput.nativeElement) {
            this.basicFileInput.nativeElement.value = '';
        }
    }
    clearIEInput() {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.duplicateIEEvent = true; //IE11 fix to prevent onFileChange trigger again
            this.advancedFileInput.nativeElement.value = '';
        }
    }
    hasFiles() {
        return this.files && this.files.length > 0;
    }
    onDragEnter(e) {
        if (!this.disabled) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
    onDragOver(e) {
        if (!this.disabled) {
            DomHandler.addClass(this.content?.nativeElement, 'p-fileupload-highlight');
            this.dragHighlight = true;
            e.stopPropagation();
            e.preventDefault();
        }
    }
    onDragLeave(event) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content?.nativeElement, 'p-fileupload-highlight');
        }
    }
    onDrop(event) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content?.nativeElement, 'p-fileupload-highlight');
            event.stopPropagation();
            event.preventDefault();
            let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
            let allowDrop = this.multiple || (files && files.length === 1);
            if (allowDrop) {
                this.onFileSelect(event);
            }
        }
    }
    onFocus() {
        this.focus = true;
    }
    onBlur() {
        this.focus = false;
    }
    formatSize(bytes) {
        const k = 1024;
        const dm = 3;
        const sizes = this.getTranslation(TranslationKeys.FILE_SIZE_TYPES);
        if (bytes === 0) {
            return `0 ${sizes[0]}`;
        }
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = (bytes / Math.pow(k, i)).toFixed(dm);
        return `${formattedSize} ${sizes[i]}`;
    }
    onBasicUploaderClick() {
        if (this.hasFiles())
            this.upload();
        else
            this.basicFileInput?.nativeElement.click();
    }
    onBasicKeydown(event) {
        switch (event.code) {
            case 'Space':
            case 'Enter':
                this.onBasicUploaderClick();
                event.preventDefault();
                break;
        }
    }
    imageError(event) {
        this.onImageError.emit(event);
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    get chooseButtonLabel() {
        return this.chooseLabel || this.config.getTranslation(TranslationKeys.CHOOSE);
    }
    get uploadButtonLabel() {
        return this.uploadLabel || this.config.getTranslation(TranslationKeys.UPLOAD);
    }
    get cancelButtonLabel() {
        return this.cancelLabel || this.config.getTranslation(TranslationKeys.CANCEL);
    }
    get browseFilesLabel() {
        return this.config.getTranslation(TranslationKeys.ARIA)[TranslationKeys.BROWSE_FILES];
    }
    ngOnDestroy() {
        if (this.content && this.content.nativeElement) {
            if (this.dragOverListener) {
                this.dragOverListener();
                this.dragOverListener = null;
            }
        }
        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FileUpload, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1.DomSanitizer }, { token: i0.NgZone }, { token: i2.HttpClient }, { token: i0.ChangeDetectorRef }, { token: i3.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: FileUpload, selector: "p-fileUpload", inputs: { name: "name", url: "url", method: "method", multiple: ["multiple", "multiple", booleanAttribute], accept: "accept", disabled: ["disabled", "disabled", booleanAttribute], auto: ["auto", "auto", booleanAttribute], withCredentials: ["withCredentials", "withCredentials", booleanAttribute], maxFileSize: ["maxFileSize", "maxFileSize", numberAttribute], invalidFileSizeMessageSummary: "invalidFileSizeMessageSummary", invalidFileSizeMessageDetail: "invalidFileSizeMessageDetail", invalidFileTypeMessageSummary: "invalidFileTypeMessageSummary", invalidFileTypeMessageDetail: "invalidFileTypeMessageDetail", invalidFileLimitMessageDetail: "invalidFileLimitMessageDetail", invalidFileLimitMessageSummary: "invalidFileLimitMessageSummary", style: "style", styleClass: "styleClass", previewWidth: ["previewWidth", "previewWidth", numberAttribute], chooseLabel: "chooseLabel", uploadLabel: "uploadLabel", cancelLabel: "cancelLabel", chooseIcon: "chooseIcon", uploadIcon: "uploadIcon", cancelIcon: "cancelIcon", showUploadButton: ["showUploadButton", "showUploadButton", booleanAttribute], showCancelButton: ["showCancelButton", "showCancelButton", booleanAttribute], mode: "mode", headers: "headers", customUpload: ["customUpload", "customUpload", booleanAttribute], fileLimit: ["fileLimit", "fileLimit", numberAttribute], uploadStyleClass: "uploadStyleClass", cancelStyleClass: "cancelStyleClass", removeStyleClass: "removeStyleClass", chooseStyleClass: "chooseStyleClass", files: "files" }, outputs: { onBeforeUpload: "onBeforeUpload", onSend: "onSend", onUpload: "onUpload", onError: "onError", onClear: "onClear", onRemove: "onRemove", onSelect: "onSelect", onProgress: "onProgress", uploadHandler: "uploadHandler", onImageError: "onImageError" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "advancedFileInput", first: true, predicate: ["advancedfileinput"], descendants: true }, { propertyName: "basicFileInput", first: true, predicate: ["basicfileinput"], descendants: true }, { propertyName: "content", first: true, predicate: ["content"], descendants: true }], ngImport: i0, template: `
        <div [ngClass]="'p-fileupload p-fileupload-advanced p-component'" [ngStyle]="style" [class]="styleClass" *ngIf="mode === 'advanced'" [attr.data-pc-name]="'fileupload'" [attr.data-pc-section]="'root'">
            <div class="p-fileupload-buttonbar" [attr.data-pc-section]="'buttonbar'">
                <span
                    class="p-button p-component p-fileupload-choose"
                    [ngClass]="{ 'p-focus': focus, 'p-disabled': disabled || isChooseDisabled() }"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    pRipple
                    (click)="choose()"
                    (keydown.enter)="choose()"
                    tabindex="0"
                    [class]="chooseStyleClass"
                    [attr.data-pc-section]="'choosebutton'"
                >
                    <input
                        [attr.aria-label]="browseFilesLabel"
                        #advancedfileinput
                        type="file"
                        (change)="onFileSelect($event)"
                        [multiple]="multiple"
                        [accept]="accept"
                        [disabled]="disabled || isChooseDisabled()"
                        [attr.title]="''"
                        [attr.data-pc-section]="'input'"
                    />
                    <span *ngIf="chooseIcon" [ngClass]="'p-button-icon p-button-icon-left'" [class]="chooseIcon" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'"></span>
                    <ng-container *ngIf="!chooseIcon">
                        <PlusIcon *ngIf="!chooseIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'" />
                        <span *ngIf="chooseIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'">
                            <ng-template *ngTemplateOutlet="chooseIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                    <span class="p-button-label" [attr.data-pc-section]="'choosebuttonlabel'">{{ chooseButtonLabel }}</span>
                </span>

                <p-button *ngIf="!auto && showUploadButton" type="button" [label]="uploadButtonLabel" (onClick)="upload()" [disabled]="!hasFiles() || isFileLimitExceeded()" [styleClass]="uploadStyleClass">
                    <span *ngIf="uploadIcon" [ngClass]="uploadIcon" [attr.aria-hidden]="true" class="p-button-icon p-button-icon-left"></span>
                    <ng-container *ngIf="!uploadIcon">
                        <UploadIcon *ngIf="!uploadIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" />
                        <span *ngIf="uploadIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="uploadIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </p-button>
                <p-button *ngIf="!auto && showCancelButton" type="button" [label]="cancelButtonLabel" (onClick)="clear()" [disabled]="!hasFiles() || uploading" [styleClass]="cancelStyleClass">
                    <span *ngIf="cancelIcon" [ngClass]="cancelIcon" class="p-button-icon p-button-icon-left"></span>
                    <ng-container *ngIf="!cancelIcon">
                        <TimesIcon *ngIf="!cancelIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" [attr.aria-hidden]="true" />
                        <span *ngIf="cancelIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="cancelIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </p-button>

                <ng-container *ngTemplateOutlet="toolbarTemplate"></ng-container>
            </div>
            <div #content class="p-fileupload-content" (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)" [attr.data-pc-section]="'content'">
                <p-progressBar [value]="progress" [showValue]="false" *ngIf="hasFiles()"></p-progressBar>

                <p-messages [value]="msgs" [enableService]="false"></p-messages>

                <div class="p-fileupload-files" *ngIf="hasFiles()">
                    <div *ngIf="!fileTemplate">
                        <div class="p-fileupload-row" *ngFor="let file of files; let i = index">
                            <div><img [src]="file.objectURL" *ngIf="isImage(file)" [width]="previewWidth" (error)="imageError($event)" /></div>
                            <div class="p-fileupload-filename">{{ file.name }}</div>
                            <div>{{ formatSize(file.size) }}</div>
                            <div>
                                <button type="button" pButton (click)="remove($event, i)" [disabled]="uploading" class="p-button-icon-only" [class]="removeStyleClass">
                                    <TimesIcon *ngIf="!cancelIconTemplate" />
                                    <ng-template *ngTemplateOutlet="cancelIconTemplate"></ng-template>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div *ngIf="fileTemplate">
                        <ng-template ngFor [ngForOf]="files" [ngForTemplate]="fileTemplate"></ng-template>
                    </div>
                </div>
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: files }"></ng-container>
            </div>
        </div>
        <div class="p-fileupload p-fileupload-basic p-component" *ngIf="mode === 'basic'" [attr.data-pc-name]="'fileupload'">
            <p-messages [value]="msgs" [enableService]="false"></p-messages>
            <span
                [ngClass]="{ 'p-button p-component p-fileupload-choose': true, 'p-button-icon-only': !basicButtonLabel, 'p-fileupload-choose-selected': hasFiles(), 'p-focus': focus, 'p-disabled': disabled }"
                [ngStyle]="style"
                [class]="styleClass"
                (click)="onBasicUploaderClick()"
                (keydown)="onBasicKeydown($event)"
                tabindex="0"
                pRipple
                [attr.data-pc-section]="'choosebutton'"
            >
                <ng-container *ngIf="hasFiles() && !auto; else chooseSection">
                    <span *ngIf="uploadIcon" class="p-button-icon p-button-icon-left" [ngClass]="uploadIcon"></span>
                    <ng-container *ngIf="!uploadIcon">
                        <UploadIcon *ngIf="!uploadIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" />
                        <span *ngIf="uploadIconTemplate" class="p-button-icon p-button-icon-left">
                            <ng-template *ngTemplateOutlet="uploadIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </ng-container>
                <ng-template #chooseSection>
                    <span *ngIf="chooseIcon" class="p-button-icon p-button-icon-left pi" [ngClass]="chooseIcon"></span>
                    <ng-container *ngIf="!chooseIcon">
                        <PlusIcon [styleClass]="'p-button-icon p-button-icon-left pi'" *ngIf="!chooseIconTemplate" [attr.aria-hidden]="true" [attr.data-pc-section]="'uploadicon'" />
                        <span *ngIf="chooseIconTemplate" class="p-button-icon p-button-icon-left pi" [attr.aria-hidden]="true" [attr.data-pc-section]="'uploadicon'">
                            <ng-template *ngTemplateOutlet="chooseIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </ng-template>
                <span *ngIf="basicButtonLabel" class="p-button-label" [attr.data-pc-section]="'label'">{{ basicButtonLabel }}</span>
                <input
                    [attr.aria-label]="browseFilesLabel"
                    #basicfileinput
                    type="file"
                    [accept]="accept"
                    [multiple]="multiple"
                    [disabled]="disabled"
                    (change)="onFileSelect($event)"
                    *ngIf="!hasFiles()"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    [attr.data-pc-section]="'input'"
                />
            </span>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-fileupload-content{position:relative}.p-fileupload-row{display:flex;align-items:center}.p-fileupload-row>div{flex:1 1 auto;width:25%}.p-fileupload-row>div:last-child{text-align:right}.p-fileupload-content .p-progressbar{width:100%;position:absolute;top:0;left:0}.p-button.p-fileupload-choose{position:relative;overflow:hidden}.p-button.p-fileupload-choose input[type=file],.p-fileupload-choose.p-fileupload-choose-selected input[type=file]{display:none}.p-fluid .p-fileupload .p-button{width:auto}.p-fileupload-filename{word-break:break-all}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i4.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i4.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i4.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i4.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i4.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i5.ButtonDirective), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading", "severity", "raised", "rounded", "text", "outlined", "size", "plain"] }, { kind: "component", type: i0.forwardRef(() => i5.Button), selector: "p-button", inputs: ["type", "iconPos", "icon", "badge", "label", "disabled", "loading", "loadingIcon", "raised", "rounded", "text", "plain", "severity", "outlined", "link", "tabindex", "size", "style", "styleClass", "badgeClass", "ariaLabel", "autofocus"], outputs: ["onClick", "onFocus", "onBlur"] }, { kind: "component", type: i0.forwardRef(() => i6.ProgressBar), selector: "p-progressBar", inputs: ["value", "showValue", "styleClass", "style", "unit", "mode", "color"] }, { kind: "component", type: i0.forwardRef(() => i7.Messages), selector: "p-messages", inputs: ["value", "closable", "style", "styleClass", "enableService", "key", "escape", "severity", "showTransitionOptions", "hideTransitionOptions"], outputs: ["valueChange", "onClose"] }, { kind: "directive", type: i0.forwardRef(() => i8.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => PlusIcon), selector: "PlusIcon" }, { kind: "component", type: i0.forwardRef(() => UploadIcon), selector: "UploadIcon" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FileUpload, decorators: [{
            type: Component,
            args: [{ selector: 'p-fileUpload', template: `
        <div [ngClass]="'p-fileupload p-fileupload-advanced p-component'" [ngStyle]="style" [class]="styleClass" *ngIf="mode === 'advanced'" [attr.data-pc-name]="'fileupload'" [attr.data-pc-section]="'root'">
            <div class="p-fileupload-buttonbar" [attr.data-pc-section]="'buttonbar'">
                <span
                    class="p-button p-component p-fileupload-choose"
                    [ngClass]="{ 'p-focus': focus, 'p-disabled': disabled || isChooseDisabled() }"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    pRipple
                    (click)="choose()"
                    (keydown.enter)="choose()"
                    tabindex="0"
                    [class]="chooseStyleClass"
                    [attr.data-pc-section]="'choosebutton'"
                >
                    <input
                        [attr.aria-label]="browseFilesLabel"
                        #advancedfileinput
                        type="file"
                        (change)="onFileSelect($event)"
                        [multiple]="multiple"
                        [accept]="accept"
                        [disabled]="disabled || isChooseDisabled()"
                        [attr.title]="''"
                        [attr.data-pc-section]="'input'"
                    />
                    <span *ngIf="chooseIcon" [ngClass]="'p-button-icon p-button-icon-left'" [class]="chooseIcon" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'"></span>
                    <ng-container *ngIf="!chooseIcon">
                        <PlusIcon *ngIf="!chooseIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'" />
                        <span *ngIf="chooseIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'">
                            <ng-template *ngTemplateOutlet="chooseIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                    <span class="p-button-label" [attr.data-pc-section]="'choosebuttonlabel'">{{ chooseButtonLabel }}</span>
                </span>

                <p-button *ngIf="!auto && showUploadButton" type="button" [label]="uploadButtonLabel" (onClick)="upload()" [disabled]="!hasFiles() || isFileLimitExceeded()" [styleClass]="uploadStyleClass">
                    <span *ngIf="uploadIcon" [ngClass]="uploadIcon" [attr.aria-hidden]="true" class="p-button-icon p-button-icon-left"></span>
                    <ng-container *ngIf="!uploadIcon">
                        <UploadIcon *ngIf="!uploadIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" />
                        <span *ngIf="uploadIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="uploadIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </p-button>
                <p-button *ngIf="!auto && showCancelButton" type="button" [label]="cancelButtonLabel" (onClick)="clear()" [disabled]="!hasFiles() || uploading" [styleClass]="cancelStyleClass">
                    <span *ngIf="cancelIcon" [ngClass]="cancelIcon" class="p-button-icon p-button-icon-left"></span>
                    <ng-container *ngIf="!cancelIcon">
                        <TimesIcon *ngIf="!cancelIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" [attr.aria-hidden]="true" />
                        <span *ngIf="cancelIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="cancelIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </p-button>

                <ng-container *ngTemplateOutlet="toolbarTemplate"></ng-container>
            </div>
            <div #content class="p-fileupload-content" (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)" [attr.data-pc-section]="'content'">
                <p-progressBar [value]="progress" [showValue]="false" *ngIf="hasFiles()"></p-progressBar>

                <p-messages [value]="msgs" [enableService]="false"></p-messages>

                <div class="p-fileupload-files" *ngIf="hasFiles()">
                    <div *ngIf="!fileTemplate">
                        <div class="p-fileupload-row" *ngFor="let file of files; let i = index">
                            <div><img [src]="file.objectURL" *ngIf="isImage(file)" [width]="previewWidth" (error)="imageError($event)" /></div>
                            <div class="p-fileupload-filename">{{ file.name }}</div>
                            <div>{{ formatSize(file.size) }}</div>
                            <div>
                                <button type="button" pButton (click)="remove($event, i)" [disabled]="uploading" class="p-button-icon-only" [class]="removeStyleClass">
                                    <TimesIcon *ngIf="!cancelIconTemplate" />
                                    <ng-template *ngTemplateOutlet="cancelIconTemplate"></ng-template>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div *ngIf="fileTemplate">
                        <ng-template ngFor [ngForOf]="files" [ngForTemplate]="fileTemplate"></ng-template>
                    </div>
                </div>
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: files }"></ng-container>
            </div>
        </div>
        <div class="p-fileupload p-fileupload-basic p-component" *ngIf="mode === 'basic'" [attr.data-pc-name]="'fileupload'">
            <p-messages [value]="msgs" [enableService]="false"></p-messages>
            <span
                [ngClass]="{ 'p-button p-component p-fileupload-choose': true, 'p-button-icon-only': !basicButtonLabel, 'p-fileupload-choose-selected': hasFiles(), 'p-focus': focus, 'p-disabled': disabled }"
                [ngStyle]="style"
                [class]="styleClass"
                (click)="onBasicUploaderClick()"
                (keydown)="onBasicKeydown($event)"
                tabindex="0"
                pRipple
                [attr.data-pc-section]="'choosebutton'"
            >
                <ng-container *ngIf="hasFiles() && !auto; else chooseSection">
                    <span *ngIf="uploadIcon" class="p-button-icon p-button-icon-left" [ngClass]="uploadIcon"></span>
                    <ng-container *ngIf="!uploadIcon">
                        <UploadIcon *ngIf="!uploadIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" />
                        <span *ngIf="uploadIconTemplate" class="p-button-icon p-button-icon-left">
                            <ng-template *ngTemplateOutlet="uploadIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </ng-container>
                <ng-template #chooseSection>
                    <span *ngIf="chooseIcon" class="p-button-icon p-button-icon-left pi" [ngClass]="chooseIcon"></span>
                    <ng-container *ngIf="!chooseIcon">
                        <PlusIcon [styleClass]="'p-button-icon p-button-icon-left pi'" *ngIf="!chooseIconTemplate" [attr.aria-hidden]="true" [attr.data-pc-section]="'uploadicon'" />
                        <span *ngIf="chooseIconTemplate" class="p-button-icon p-button-icon-left pi" [attr.aria-hidden]="true" [attr.data-pc-section]="'uploadicon'">
                            <ng-template *ngTemplateOutlet="chooseIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </ng-template>
                <span *ngIf="basicButtonLabel" class="p-button-label" [attr.data-pc-section]="'label'">{{ basicButtonLabel }}</span>
                <input
                    [attr.aria-label]="browseFilesLabel"
                    #basicfileinput
                    type="file"
                    [accept]="accept"
                    [multiple]="multiple"
                    [disabled]="disabled"
                    (change)="onFileSelect($event)"
                    *ngIf="!hasFiles()"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    [attr.data-pc-section]="'input'"
                />
            </span>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-fileupload-content{position:relative}.p-fileupload-row{display:flex;align-items:center}.p-fileupload-row>div{flex:1 1 auto;width:25%}.p-fileupload-row>div:last-child{text-align:right}.p-fileupload-content .p-progressbar{width:100%;position:absolute;top:0;left:0}.p-button.p-fileupload-choose{position:relative;overflow:hidden}.p-button.p-fileupload-choose input[type=file],.p-fileupload-choose.p-fileupload-choose-selected input[type=file]{display:none}.p-fluid .p-fileupload .p-button{width:auto}.p-fileupload-filename{word-break:break-all}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1.DomSanitizer }, { type: i0.NgZone }, { type: i2.HttpClient }, { type: i0.ChangeDetectorRef }, { type: i3.PrimeNGConfig }], propDecorators: { name: [{
                type: Input
            }], url: [{
                type: Input
            }], method: [{
                type: Input
            }], multiple: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], accept: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], auto: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], withCredentials: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], maxFileSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], invalidFileSizeMessageSummary: [{
                type: Input
            }], invalidFileSizeMessageDetail: [{
                type: Input
            }], invalidFileTypeMessageSummary: [{
                type: Input
            }], invalidFileTypeMessageDetail: [{
                type: Input
            }], invalidFileLimitMessageDetail: [{
                type: Input
            }], invalidFileLimitMessageSummary: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], previewWidth: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], chooseLabel: [{
                type: Input
            }], uploadLabel: [{
                type: Input
            }], cancelLabel: [{
                type: Input
            }], chooseIcon: [{
                type: Input
            }], uploadIcon: [{
                type: Input
            }], cancelIcon: [{
                type: Input
            }], showUploadButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showCancelButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], mode: [{
                type: Input
            }], headers: [{
                type: Input
            }], customUpload: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], fileLimit: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], uploadStyleClass: [{
                type: Input
            }], cancelStyleClass: [{
                type: Input
            }], removeStyleClass: [{
                type: Input
            }], chooseStyleClass: [{
                type: Input
            }], onBeforeUpload: [{
                type: Output
            }], onSend: [{
                type: Output
            }], onUpload: [{
                type: Output
            }], onError: [{
                type: Output
            }], onClear: [{
                type: Output
            }], onRemove: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onProgress: [{
                type: Output
            }], uploadHandler: [{
                type: Output
            }], onImageError: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], advancedFileInput: [{
                type: ViewChild,
                args: ['advancedfileinput']
            }], basicFileInput: [{
                type: ViewChild,
                args: ['basicfileinput']
            }], content: [{
                type: ViewChild,
                args: ['content']
            }], files: [{
                type: Input
            }] } });
export class FileUploadModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FileUploadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: FileUploadModule, declarations: [FileUpload], imports: [CommonModule, HttpClientModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule, RippleModule, PlusIcon, UploadIcon, TimesIcon], exports: [FileUpload, SharedModule, ButtonModule, ProgressBarModule, MessagesModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FileUploadModule, imports: [CommonModule, HttpClientModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule, RippleModule, PlusIcon, UploadIcon, TimesIcon, SharedModule, ButtonModule, ProgressBarModule, MessagesModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FileUploadModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, HttpClientModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule, RippleModule, PlusIcon, UploadIcon, TimesIcon],
                    exports: [FileUpload, SharedModule, ButtonModule, ProgressBarModule, MessagesModule],
                    declarations: [FileUpload]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXVwbG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9maWxldXBsb2FkL2ZpbGV1cGxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBQWMsZ0JBQWdCLEVBQWEsYUFBYSxFQUFlLE1BQU0sc0JBQXNCLENBQUM7QUFDM0csT0FBTyxFQUdILHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFJUixNQUFNLEVBQ04sV0FBVyxFQUlYLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUF1QyxhQUFhLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNoSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7O0FBSTlDOzs7R0FHRztBQTRJSCxNQUFNLE9BQU8sVUFBVTtJQTZTVztJQUNHO0lBQ3JCO0lB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RSxVQUFVLEVBQUUsU0FBUyxFQUNoSSxZQUFZLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGNBQWM7OzJGQUcxRSxnQkFBZ0I7a0JBTDVCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQztvQkFDdkosT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFDO29CQUNwRixZQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUM7aUJBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cENsaWVudE1vZHVsZSwgSHR0cEV2ZW50LCBIdHRwRXZlbnRUeXBlLCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBQTEFURk9STV9JRCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBib29sZWFuQXR0cmlidXRlLFxuICAgIG51bWJlckF0dHJpYnV0ZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgQmxvY2thYmxlVUksIE1lc3NhZ2UsIFByaW1lTkdDb25maWcsIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSwgVHJhbnNsYXRpb25LZXlzIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IFBsdXNJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9wbHVzJztcbmltcG9ydCB7IFRpbWVzSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdGltZXMnO1xuaW1wb3J0IHsgVXBsb2FkSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdXBsb2FkJztcbmltcG9ydCB7IE1lc3NhZ2VzTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9tZXNzYWdlcyc7XG5pbXBvcnQgeyBQcm9ncmVzc0Jhck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJvZ3Jlc3NiYXInO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgVm9pZExpc3RlbmVyIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmlsZUJlZm9yZVVwbG9hZEV2ZW50LCBGaWxlUHJvZ3Jlc3NFdmVudCwgRmlsZVJlbW92ZUV2ZW50LCBGaWxlU2VsZWN0RXZlbnQsIEZpbGVTZW5kRXZlbnQsIEZpbGVVcGxvYWRFcnJvckV2ZW50LCBGaWxlVXBsb2FkRXZlbnQsIEZpbGVVcGxvYWRIYW5kbGVyRXZlbnQgfSBmcm9tICcuL2ZpbGV1cGxvYWQuaW50ZXJmYWNlJztcbi8qKlxuICogRmlsZVVwbG9hZCBpcyBhbiBhZHZhbmNlZCB1cGxvYWRlciB3aXRoIGRyYWdkcm9wIHN1cHBvcnQsIG11bHRpIGZpbGUgdXBsb2FkcywgYXV0byB1cGxvYWRpbmcsIHByb2dyZXNzIHRyYWNraW5nIGFuZCB2YWxpZGF0aW9ucy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1maWxlVXBsb2FkJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIidwLWZpbGV1cGxvYWQgcC1maWxldXBsb2FkLWFkdmFuY2VkIHAtY29tcG9uZW50J1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAqbmdJZj1cIm1vZGUgPT09ICdhZHZhbmNlZCdcIiBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ2ZpbGV1cGxvYWQnXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyb290J1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZmlsZXVwbG9hZC1idXR0b25iYXJcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2J1dHRvbmJhcidcIj5cbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtYnV0dG9uIHAtY29tcG9uZW50IHAtZmlsZXVwbG9hZC1jaG9vc2VcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWZvY3VzJzogZm9jdXMsICdwLWRpc2FibGVkJzogZGlzYWJsZWQgfHwgaXNDaG9vc2VEaXNhYmxlZCgpIH1cIlxuICAgICAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25Gb2N1cygpXCJcbiAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib25CbHVyKClcIlxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaG9vc2UoKVwiXG4gICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cImNob29zZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cImNob29zZVN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2Nob29zZWJ1dHRvbidcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImJyb3dzZUZpbGVzTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgI2FkdmFuY2VkZmlsZWlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cIm9uRmlsZVNlbGVjdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYWNjZXB0XT1cImFjY2VwdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgaXNDaG9vc2VEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cIicnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaW5wdXQnXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjaG9vc2VJY29uXCIgW25nQ2xhc3NdPVwiJ3AtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0J1wiIFtjbGFzc109XCJjaG9vc2VJY29uXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJ0cnVlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjaG9vc2VpY29uJ1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjaG9vc2VJY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UGx1c0ljb24gKm5nSWY9XCIhY2hvb3NlSWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0J1wiIFthdHRyLmFyaWEtbGFiZWxdPVwidHJ1ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2hvb3NlaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjaG9vc2VJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0XCIgW2F0dHIuYXJpYS1sYWJlbF09XCJ0cnVlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjaG9vc2VpY29uJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNob29zZUljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtYnV0dG9uLWxhYmVsXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjaG9vc2VidXR0b25sYWJlbCdcIj57eyBjaG9vc2VCdXR0b25MYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICA8cC1idXR0b24gKm5nSWY9XCIhYXV0byAmJiBzaG93VXBsb2FkQnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIFtsYWJlbF09XCJ1cGxvYWRCdXR0b25MYWJlbFwiIChvbkNsaWNrKT1cInVwbG9hZCgpXCIgW2Rpc2FibGVkXT1cIiFoYXNGaWxlcygpIHx8IGlzRmlsZUxpbWl0RXhjZWVkZWQoKVwiIFtzdHlsZUNsYXNzXT1cInVwbG9hZFN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ1cGxvYWRJY29uXCIgW25nQ2xhc3NdPVwidXBsb2FkSWNvblwiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiBjbGFzcz1cInAtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXVwbG9hZEljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxVcGxvYWRJY29uICpuZ0lmPVwiIXVwbG9hZEljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLWJ1dHRvbi1pY29uIHAtYnV0dG9uLWljb24tbGVmdCdcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ1cGxvYWRJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0XCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInVwbG9hZEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvcC1idXR0b24+XG4gICAgICAgICAgICAgICAgPHAtYnV0dG9uICpuZ0lmPVwiIWF1dG8gJiYgc2hvd0NhbmNlbEJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBbbGFiZWxdPVwiY2FuY2VsQnV0dG9uTGFiZWxcIiAob25DbGljayk9XCJjbGVhcigpXCIgW2Rpc2FibGVkXT1cIiFoYXNGaWxlcygpIHx8IHVwbG9hZGluZ1wiIFtzdHlsZUNsYXNzXT1cImNhbmNlbFN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjYW5jZWxJY29uXCIgW25nQ2xhc3NdPVwiY2FuY2VsSWNvblwiIGNsYXNzPVwicC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLWxlZnRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY2FuY2VsSWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVzSWNvbiAqbmdJZj1cIiFjYW5jZWxJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLWxlZnQnXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNhbmNlbEljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLWxlZnRcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2FuY2VsSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9wLWJ1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0b29sYmFyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAjY29udGVudCBjbGFzcz1cInAtZmlsZXVwbG9hZC1jb250ZW50XCIgKGRyYWdlbnRlcik9XCJvbkRyYWdFbnRlcigkZXZlbnQpXCIgKGRyYWdsZWF2ZSk9XCJvbkRyYWdMZWF2ZSgkZXZlbnQpXCIgKGRyb3ApPVwib25Ecm9wKCRldmVudClcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2NvbnRlbnQnXCI+XG4gICAgICAgICAgICAgICAgPHAtcHJvZ3Jlc3NCYXIgW3ZhbHVlXT1cInByb2dyZXNzXCIgW3Nob3dWYWx1ZV09XCJmYWxzZVwiICpuZ0lmPVwiaGFzRmlsZXMoKVwiPjwvcC1wcm9ncmVzc0Jhcj5cblxuICAgICAgICAgICAgICAgIDxwLW1lc3NhZ2VzIFt2YWx1ZV09XCJtc2dzXCIgW2VuYWJsZVNlcnZpY2VdPVwiZmFsc2VcIj48L3AtbWVzc2FnZXM+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1maWxldXBsb2FkLWZpbGVzXCIgKm5nSWY9XCJoYXNGaWxlcygpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhZmlsZVRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1maWxldXBsb2FkLXJvd1wiICpuZ0Zvcj1cImxldCBmaWxlIG9mIGZpbGVzOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIFtzcmNdPVwiZmlsZS5vYmplY3RVUkxcIiAqbmdJZj1cImlzSW1hZ2UoZmlsZSlcIiBbd2lkdGhdPVwicHJldmlld1dpZHRoXCIgKGVycm9yKT1cImltYWdlRXJyb3IoJGV2ZW50KVwiIC8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZmlsZXVwbG9hZC1maWxlbmFtZVwiPnt7IGZpbGUubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e3sgZm9ybWF0U2l6ZShmaWxlLnNpemUpIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlKCRldmVudCwgaSlcIiBbZGlzYWJsZWRdPVwidXBsb2FkaW5nXCIgY2xhc3M9XCJwLWJ1dHRvbi1pY29uLW9ubHlcIiBbY2xhc3NdPVwicmVtb3ZlU3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVzSWNvbiAqbmdJZj1cIiFjYW5jZWxJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2FuY2VsSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJmaWxlVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJmaWxlc1wiIFtuZ0ZvclRlbXBsYXRlXT1cImZpbGVUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBmaWxlcyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLWZpbGV1cGxvYWQgcC1maWxldXBsb2FkLWJhc2ljIHAtY29tcG9uZW50XCIgKm5nSWY9XCJtb2RlID09PSAnYmFzaWMnXCIgW2F0dHIuZGF0YS1wYy1uYW1lXT1cIidmaWxldXBsb2FkJ1wiPlxuICAgICAgICAgICAgPHAtbWVzc2FnZXMgW3ZhbHVlXT1cIm1zZ3NcIiBbZW5hYmxlU2VydmljZV09XCJmYWxzZVwiPjwvcC1tZXNzYWdlcz5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1idXR0b24gcC1jb21wb25lbnQgcC1maWxldXBsb2FkLWNob29zZSc6IHRydWUsICdwLWJ1dHRvbi1pY29uLW9ubHknOiAhYmFzaWNCdXR0b25MYWJlbCwgJ3AtZmlsZXVwbG9hZC1jaG9vc2Utc2VsZWN0ZWQnOiBoYXNGaWxlcygpLCAncC1mb2N1cyc6IGZvY3VzLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkIH1cIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCJcbiAgICAgICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQmFzaWNVcGxvYWRlckNsaWNrKClcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uQmFzaWNLZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2hvb3NlYnV0dG9uJ1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhhc0ZpbGVzKCkgJiYgIWF1dG87IGVsc2UgY2hvb3NlU2VjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInVwbG9hZEljb25cIiBjbGFzcz1cInAtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0XCIgW25nQ2xhc3NdPVwidXBsb2FkSWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF1cGxvYWRJY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VXBsb2FkSWNvbiAqbmdJZj1cIiF1cGxvYWRJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLWxlZnQnXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidXBsb2FkSWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWJ1dHRvbi1pY29uIHAtYnV0dG9uLWljb24tbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInVwbG9hZEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjY2hvb3NlU2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjaG9vc2VJY29uXCIgY2xhc3M9XCJwLWJ1dHRvbi1pY29uIHAtYnV0dG9uLWljb24tbGVmdCBwaVwiIFtuZ0NsYXNzXT1cImNob29zZUljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY2hvb3NlSWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFBsdXNJY29uIFtzdHlsZUNsYXNzXT1cIidwLWJ1dHRvbi1pY29uIHAtYnV0dG9uLWljb24tbGVmdCBwaSdcIiAqbmdJZj1cIiFjaG9vc2VJY29uVGVtcGxhdGVcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid1cGxvYWRpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNob29zZUljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLWxlZnQgcGlcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid1cGxvYWRpY29uJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNob29zZUljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJiYXNpY0J1dHRvbkxhYmVsXCIgY2xhc3M9XCJwLWJ1dHRvbi1sYWJlbFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbGFiZWwnXCI+e3sgYmFzaWNCdXR0b25MYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJicm93c2VGaWxlc0xhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgI2Jhc2ljZmlsZWlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgICAgICAgW2FjY2VwdF09XCJhY2NlcHRcIlxuICAgICAgICAgICAgICAgICAgICBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cIm9uRmlsZVNlbGVjdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhaGFzRmlsZXMoKVwiXG4gICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzKClcIlxuICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvbkJsdXIoKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaW5wdXQnXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vZmlsZXVwbG9hZC5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQsIE9uSW5pdCwgT25EZXN0cm95LCBCbG9ja2FibGVVSSB7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgcmVxdWVzdCBwYXJhbWV0ZXIgdG8gaWRlbnRpZnkgdGhlIGZpbGVzIGF0IGJhY2tlbmQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFJlbW90ZSB1cmwgdG8gdXBsb2FkIHRoZSBmaWxlcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB1cmw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBIVFRQIG1ldGhvZCB0byBzZW5kIHRoZSBmaWxlcyB0byB0aGUgdXJsIHN1Y2ggYXMgXCJwb3N0XCIgYW5kIFwicHV0XCIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbWV0aG9kOiAncG9zdCcgfCAncHV0JyB8IHVuZGVmaW5lZCA9ICdwb3N0JztcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHNlbGVjdCBtdWx0aXBsZSBmaWxlcyBhdCBvbmNlIGZyb20gZmlsZSBkaWFsb2cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIG11bHRpcGxlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIENvbW1hLXNlcGFyYXRlZCBsaXN0IG9mIHBhdHRlcm4gdG8gcmVzdHJpY3QgdGhlIGFsbG93ZWQgZmlsZSB0eXBlcy4gQ2FuIGJlIGFueSBjb21iaW5hdGlvbiBvZiBlaXRoZXIgdGhlIE1JTUUgdHlwZXMgKHN1Y2ggYXMgXCJpbWFnZS8qXCIpIG9yIHRoZSBmaWxlIGV4dGVuc2lvbnMgKHN1Y2ggYXMgXCIuanBnXCIpLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFjY2VwdDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHRoZSB1cGxvYWQgZnVuY3Rpb25hbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCB1cGxvYWQgYmVnaW5zIGF1dG9tYXRpY2FsbHkgYWZ0ZXIgc2VsZWN0aW9uIGlzIGNvbXBsZXRlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYXV0bzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBDcm9zcy1zaXRlIEFjY2Vzcy1Db250cm9sIHJlcXVlc3RzIHNob3VsZCBiZSBtYWRlIHVzaW5nIGNyZWRlbnRpYWxzIHN1Y2ggYXMgY29va2llcywgYXV0aG9yaXphdGlvbiBoZWFkZXJzIG9yIFRMUyBjbGllbnQgY2VydGlmaWNhdGVzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTWF4aW11bSBmaWxlIHNpemUgYWxsb3dlZCBpbiBieXRlcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBtYXhGaWxlU2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN1bW1hcnkgbWVzc2FnZSBvZiB0aGUgaW52YWxpZCBmaWxlIHNpemUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW52YWxpZEZpbGVTaXplTWVzc2FnZVN1bW1hcnk6IHN0cmluZyA9ICd7MH06IEludmFsaWQgZmlsZSBzaXplLCAnO1xuICAgIC8qKlxuICAgICAqIERldGFpbCBtZXNzYWdlIG9mIHRoZSBpbnZhbGlkIGZpbGUgc2l6ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbnZhbGlkRmlsZVNpemVNZXNzYWdlRGV0YWlsOiBzdHJpbmcgPSAnbWF4aW11bSB1cGxvYWQgc2l6ZSBpcyB7MH0uJztcbiAgICAvKipcbiAgICAgKiBTdW1tYXJ5IG1lc3NhZ2Ugb2YgdGhlIGludmFsaWQgZmlsZSB0eXBlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGludmFsaWRGaWxlVHlwZU1lc3NhZ2VTdW1tYXJ5OiBzdHJpbmcgPSAnezB9OiBJbnZhbGlkIGZpbGUgdHlwZSwgJztcbiAgICAvKipcbiAgICAgKiBEZXRhaWwgbWVzc2FnZSBvZiB0aGUgaW52YWxpZCBmaWxlIHR5cGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW52YWxpZEZpbGVUeXBlTWVzc2FnZURldGFpbDogc3RyaW5nID0gJ2FsbG93ZWQgZmlsZSB0eXBlczogezB9Lic7XG4gICAgLyoqXG4gICAgICogRGV0YWlsIG1lc3NhZ2Ugb2YgdGhlIGludmFsaWQgZmlsZSB0eXBlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGludmFsaWRGaWxlTGltaXRNZXNzYWdlRGV0YWlsOiBzdHJpbmcgPSAnbGltaXQgaXMgezB9IGF0IG1vc3QuJztcbiAgICAvKipcbiAgICAgKiBTdW1tYXJ5IG1lc3NhZ2Ugb2YgdGhlIGludmFsaWQgZmlsZSB0eXBlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGludmFsaWRGaWxlTGltaXRNZXNzYWdlU3VtbWFyeTogc3RyaW5nID0gJ01heGltdW0gbnVtYmVyIG9mIGZpbGVzIGV4Y2VlZGVkLCAnO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBDbGFzcyBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2lkdGggb2YgdGhlIGltYWdlIHRodW1ibmFpbCBpbiBwaXhlbHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgcHJldmlld1dpZHRoOiBudW1iZXIgPSA1MDtcbiAgICAvKipcbiAgICAgKiBMYWJlbCBvZiB0aGUgY2hvb3NlIGJ1dHRvbi4gRGVmYXVsdHMgdG8gUHJpbWVORyBMb2NhbGUgY29uZmlndXJhdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjaG9vc2VMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIExhYmVsIG9mIHRoZSB1cGxvYWQgYnV0dG9uLiBEZWZhdWx0cyB0byBQcmltZU5HIExvY2FsZSBjb25maWd1cmF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHVwbG9hZExhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTGFiZWwgb2YgdGhlIGNhbmNlbCBidXR0b24uIERlZmF1bHRzIHRvIFByaW1lTkcgTG9jYWxlIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY2FuY2VsTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJY29uIG9mIHRoZSBjaG9vc2UgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNob29zZUljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJY29uIG9mIHRoZSB1cGxvYWQgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHVwbG9hZEljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJY29uIG9mIHRoZSBjYW5jZWwgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNhbmNlbEljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgdGhlIHVwbG9hZCBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dVcGxvYWRCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgY2FuY2VsIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2hvd0NhbmNlbEJ1dHRvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgVUkgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtb2RlOiAnYWR2YW5jZWQnIHwgJ2Jhc2ljJyB8IHVuZGVmaW5lZCA9ICdhZHZhbmNlZCc7XG4gICAgLyoqXG4gICAgICogSHR0cEhlYWRlcnMgY2xhc3MgcmVwcmVzZW50cyB0aGUgaGVhZGVyIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgYW4gSFRUUCByZXF1ZXN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGhlYWRlcnM6IEh0dHBIZWFkZXJzIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gdXNlIHRoZSBkZWZhdWx0IHVwbG9hZCBvciBhIG1hbnVhbCBpbXBsZW1lbnRhdGlvbiBkZWZpbmVkIGluIHVwbG9hZEhhbmRsZXIgY2FsbGJhY2suIERlZmF1bHRzIHRvIFByaW1lTkcgTG9jYWxlIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGN1c3RvbVVwbG9hZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBNYXhpbXVtIG51bWJlciBvZiBmaWxlcyB0aGF0IGNhbiBiZSB1cGxvYWRlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBmaWxlTGltaXQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgdXBsb2FkIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB1cGxvYWRTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGNhbmNlbCBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY2FuY2VsU3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSByZW1vdmUgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJlbW92ZVN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY2hvb3NlIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjaG9vc2VTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIGJlZm9yZSBmaWxlIHVwbG9hZCBpcyBpbml0aWFsaXplZC5cbiAgICAgKiBAcGFyYW0ge0ZpbGVCZWZvcmVVcGxvYWRFdmVudH0gZXZlbnQgLSBDdXN0b20gdXBsb2FkIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkJlZm9yZVVwbG9hZDogRXZlbnRFbWl0dGVyPEZpbGVCZWZvcmVVcGxvYWRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVCZWZvcmVVcGxvYWRFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBBbiBldmVudCBpbmRpY2F0aW5nIHRoYXQgdGhlIHJlcXVlc3Qgd2FzIHNlbnQgdG8gdGhlIHNlcnZlci4gVXNlZnVsIHdoZW4gYSByZXF1ZXN0IG1heSBiZSByZXRyaWVkIG11bHRpcGxlIHRpbWVzLCB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuIHJldHJpZXMgb24gdGhlIGZpbmFsIGV2ZW50IHN0cmVhbS5cbiAgICAgKiBAcGFyYW0ge0ZpbGVTZW5kRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHNlbmQgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2VuZDogRXZlbnRFbWl0dGVyPEZpbGVTZW5kRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlU2VuZEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGZpbGUgdXBsb2FkIGlzIGNvbXBsZXRlLlxuICAgICAqIEBwYXJhbSB7RmlsZVVwbG9hZEV2ZW50fSBldmVudCAtIEN1c3RvbSB1cGxvYWQgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uVXBsb2FkOiBFdmVudEVtaXR0ZXI8RmlsZVVwbG9hZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVVwbG9hZEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBpZiBmaWxlIHVwbG9hZCBmYWlscy5cbiAgICAgKiBAcGFyYW0ge0ZpbGVVcGxvYWRFcnJvckV2ZW50fSBldmVudCAtIEN1c3RvbSBlcnJvciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25FcnJvcjogRXZlbnRFbWl0dGVyPEZpbGVVcGxvYWRFcnJvckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVVwbG9hZEVycm9yRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gZmlsZXMgaW4gcXVldWUgYXJlIHJlbW92ZWQgd2l0aG91dCB1cGxvYWRpbmcgdXNpbmcgY2xlYXIgYWxsIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2xlYXI6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgZmlsZSBpcyByZW1vdmVkIHdpdGhvdXQgdXBsb2FkaW5nIHVzaW5nIGNsZWFyIGJ1dHRvbiBvZiBhIGZpbGUuXG4gICAgICogQHBhcmFtIHtGaWxlUmVtb3ZlRXZlbnR9IGV2ZW50IC0gUmVtb3ZlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblJlbW92ZTogRXZlbnRFbWl0dGVyPEZpbGVSZW1vdmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVSZW1vdmVFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBmaWxlcyBhcmUgc2VsZWN0ZWQuXG4gICAgICogQHBhcmFtIHtGaWxlU2VsZWN0RXZlbnR9IGV2ZW50IC0gU2VsZWN0IGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPEZpbGVTZWxlY3RFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVTZWxlY3RFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBmaWxlcyBhcmUgYmVpbmcgdXBsb2FkZWQuXG4gICAgICogQHBhcmFtIHtGaWxlUHJvZ3Jlc3NFdmVudH0gZXZlbnQgLSBQcm9ncmVzcyBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Qcm9ncmVzczogRXZlbnRFbWl0dGVyPEZpbGVQcm9ncmVzc0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVByb2dyZXNzRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIGluIGN1c3RvbSB1cGxvYWQgbW9kZSB0byB1cGxvYWQgdGhlIGZpbGVzIG1hbnVhbGx5LlxuICAgICAqIEBwYXJhbSB7RmlsZVVwbG9hZEhhbmRsZXJFdmVudH0gZXZlbnQgLSBVcGxvYWQgaGFuZGxlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgdXBsb2FkSGFuZGxlcjogRXZlbnRFbWl0dGVyPEZpbGVVcGxvYWRIYW5kbGVyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlVXBsb2FkSGFuZGxlckV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgdHJpZ2dlcmVkIGlmIGFuIGVycm9yIG9jY3VycyB3aGlsZSBsb2FkaW5nIGFuIGltYWdlIGZpbGUuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkltYWdlRXJyb3I6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ2FkdmFuY2VkZmlsZWlucHV0JykgYWR2YW5jZWRGaWxlSW5wdXQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQgfCBhbnk7XG5cbiAgICBAVmlld0NoaWxkKCdiYXNpY2ZpbGVpbnB1dCcpIGJhc2ljRmlsZUlucHV0OiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBzZXQgZmlsZXMoZmlsZXMpIHtcbiAgICAgICAgdGhpcy5fZmlsZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZmlsZSA9IGZpbGVzW2ldO1xuXG4gICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0ZShmaWxlKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW1hZ2UoZmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+ZmlsZSkub2JqZWN0VVJMID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybCh3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlc1tpXSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbGVzLnB1c2goZmlsZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGZpbGVzKCk6IEZpbGVbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWxlcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGJhc2ljQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0byB8fCAhdGhpcy5oYXNGaWxlcygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaG9vc2VMYWJlbCBhcyBzdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy51cGxvYWRMYWJlbCA/PyB0aGlzLmZpbGVzWzBdLm5hbWU7XG4gICAgfVxuXG4gICAgcHVibGljIF9maWxlczogRmlsZVtdID0gW107XG5cbiAgICBwdWJsaWMgcHJvZ3Jlc3M6IG51bWJlciA9IDA7XG5cbiAgICBwdWJsaWMgZHJhZ0hpZ2hsaWdodDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBtc2dzOiBNZXNzYWdlW10gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgZmlsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgcHVibGljIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyB0b29sYmFyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBjaG9vc2VJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICB1cGxvYWRJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBjYW5jZWxJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgdXBsb2FkZWRGaWxlQ291bnQ6IG51bWJlciA9IDA7XG5cbiAgICBmb2N1czogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHVwbG9hZGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGR1cGxpY2F0ZUlFRXZlbnQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7IC8vIGZsYWcgdG8gcmVjb2duaXplIGR1cGxpY2F0ZSBvbmNoYW5nZSBldmVudCBmb3IgZmlsZSBpbnB1dFxuXG4gICAgdHJhbnNsYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIGRyYWdPdmVyTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgICAgICBwdWJsaWMgem9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWdcbiAgICApIHt9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzPy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3Rvb2xiYXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvb2xiYXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY2hvb3NlaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvb3NlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd1cGxvYWRpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NhbmNlbGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24gPSB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbk9ic2VydmVyLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnYWR2YW5jZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQsICdkcmFnb3ZlcicsIHRoaXMub25EcmFnT3Zlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VHJhbnNsYXRpb24ob3B0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKG9wdGlvbik7XG4gICAgfVxuXG4gICAgY2hvb3NlKCkge1xuICAgICAgICB0aGlzLmFkdmFuY2VkRmlsZUlucHV0Py5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgfVxuXG4gICAgb25GaWxlU2VsZWN0KGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgIT09ICdkcm9wJyAmJiB0aGlzLmlzSUUxMSgpICYmIHRoaXMuZHVwbGljYXRlSUVFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5kdXBsaWNhdGVJRUV2ZW50ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcbiAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLmZpbGVzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZmlsZXMgPSBldmVudC5kYXRhVHJhbnNmZXIgPyBldmVudC5kYXRhVHJhbnNmZXIuZmlsZXMgOiBldmVudC50YXJnZXQuZmlsZXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBmaWxlID0gZmlsZXNbaV07XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0ZpbGVTZWxlY3RlZChmaWxlKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRlKGZpbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW1hZ2UoZmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUub2JqZWN0VVJMID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybCh3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlc1tpXSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlcy5wdXNoKGZpbGVzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgZmlsZXM6IGZpbGVzLCBjdXJyZW50RmlsZXM6IHRoaXMuZmlsZXMgfSk7XG5cbiAgICAgICAgLy8gdGhpcyB3aWxsIGNoZWNrIHRoZSBmaWxlTGltaXQgd2l0aCB0aGUgdXBsb2FkZWQgZmlsZXNcbiAgICAgICAgdGhpcy5jaGVja0ZpbGVMaW1pdChmaWxlcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzRmlsZXMoKSAmJiB0aGlzLmF1dG8gJiYgKCEodGhpcy5tb2RlID09PSAnYWR2YW5jZWQnKSB8fCAhdGhpcy5pc0ZpbGVMaW1pdEV4Y2VlZGVkKCkpKSB7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgIT09ICdkcm9wJyAmJiB0aGlzLmlzSUUxMSgpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFySUVJbnB1dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbGVhcklucHV0RWxlbWVudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNGaWxlU2VsZWN0ZWQoZmlsZTogRmlsZSk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGxldCBzRmlsZSBvZiB0aGlzLmZpbGVzKSB7XG4gICAgICAgICAgICBpZiAoc0ZpbGUubmFtZSArIHNGaWxlLnR5cGUgKyBzRmlsZS5zaXplID09PSBmaWxlLm5hbWUgKyBmaWxlLnR5cGUgKyBmaWxlLnNpemUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0lFMTEoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gISEodGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyBhcyBhbnkpWydNU0lucHV0TWV0aG9kQ29udGV4dCddICYmICEhKHRoaXMuZG9jdW1lbnQgYXMgYW55KVsnZG9jdW1lbnRNb2RlJ107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZShmaWxlOiBGaWxlKTogYm9vbGVhbiB7XG4gICAgICAgIHRoaXMubXNncyA9IHRoaXMubXNncyB8fCBbXTtcbiAgICAgICAgaWYgKHRoaXMuYWNjZXB0ICYmICF0aGlzLmlzRmlsZVR5cGVWYWxpZChmaWxlKSkge1xuICAgICAgICAgICAgdGhpcy5tc2dzLnB1c2goe1xuICAgICAgICAgICAgICAgIHNldmVyaXR5OiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIHN1bW1hcnk6IHRoaXMuaW52YWxpZEZpbGVUeXBlTWVzc2FnZVN1bW1hcnkucmVwbGFjZSgnezB9JywgZmlsZS5uYW1lKSxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHRoaXMuaW52YWxpZEZpbGVUeXBlTWVzc2FnZURldGFpbC5yZXBsYWNlKCd7MH0nLCB0aGlzLmFjY2VwdClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWF4RmlsZVNpemUgJiYgZmlsZS5zaXplID4gdGhpcy5tYXhGaWxlU2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5tc2dzLnB1c2goe1xuICAgICAgICAgICAgICAgIHNldmVyaXR5OiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIHN1bW1hcnk6IHRoaXMuaW52YWxpZEZpbGVTaXplTWVzc2FnZVN1bW1hcnkucmVwbGFjZSgnezB9JywgZmlsZS5uYW1lKSxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHRoaXMuaW52YWxpZEZpbGVTaXplTWVzc2FnZURldGFpbC5yZXBsYWNlKCd7MH0nLCB0aGlzLmZvcm1hdFNpemUodGhpcy5tYXhGaWxlU2l6ZSkpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNGaWxlVHlwZVZhbGlkKGZpbGU6IEZpbGUpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGFjY2VwdGFibGVUeXBlcyA9IHRoaXMuYWNjZXB0Py5zcGxpdCgnLCcpLm1hcCgodHlwZSkgPT4gdHlwZS50cmltKCkpO1xuICAgICAgICBmb3IgKGxldCB0eXBlIG9mIGFjY2VwdGFibGVUeXBlcyEpIHtcbiAgICAgICAgICAgIGxldCBhY2NlcHRhYmxlID0gdGhpcy5pc1dpbGRjYXJkKHR5cGUpID8gdGhpcy5nZXRUeXBlQ2xhc3MoZmlsZS50eXBlKSA9PT0gdGhpcy5nZXRUeXBlQ2xhc3ModHlwZSkgOiBmaWxlLnR5cGUgPT0gdHlwZSB8fCB0aGlzLmdldEZpbGVFeHRlbnNpb24oZmlsZSkudG9Mb3dlckNhc2UoKSA9PT0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZiAoYWNjZXB0YWJsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldFR5cGVDbGFzcyhmaWxlVHlwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGZpbGVUeXBlLnN1YnN0cmluZygwLCBmaWxlVHlwZS5pbmRleE9mKCcvJykpO1xuICAgIH1cblxuICAgIGlzV2lsZGNhcmQoZmlsZVR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmlsZVR5cGUuaW5kZXhPZignKicpICE9PSAtMTtcbiAgICB9XG5cbiAgICBnZXRGaWxlRXh0ZW5zaW9uKGZpbGU6IEZpbGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJy4nICsgZmlsZS5uYW1lLnNwbGl0KCcuJykucG9wKCk7XG4gICAgfVxuXG4gICAgaXNJbWFnZShmaWxlOiBGaWxlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAvXmltYWdlXFwvLy50ZXN0KGZpbGUudHlwZSk7XG4gICAgfVxuXG4gICAgb25JbWFnZUxvYWQoaW1nOiBhbnkpIHtcbiAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoaW1nLnNyYyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwbG9hZHMgdGhlIHNlbGVjdGVkIGZpbGVzLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICB1cGxvYWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbVVwbG9hZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmlsZUxpbWl0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWRlZEZpbGVDb3VudCArPSB0aGlzLmZpbGVzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy51cGxvYWRIYW5kbGVyLmVtaXQoe1xuICAgICAgICAgICAgICAgIGZpbGVzOiB0aGlzLmZpbGVzXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICAgICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVVcGxvYWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgZm9ybURhdGE6IGZvcm1EYXRhXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKHRoaXMubmFtZSEsIHRoaXMuZmlsZXNbaV0sIHRoaXMuZmlsZXNbaV0ubmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaHR0cFxuICAgICAgICAgICAgICAgIC5yZXF1ZXN0KDxzdHJpbmc+dGhpcy5tZXRob2QsIHRoaXMudXJsIGFzIHN0cmluZywge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiBmb3JtRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICByZXBvcnRQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZTogJ2V2ZW50cycsXG4gICAgICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy53aXRoQ3JlZGVudGlhbHNcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChldmVudDogSHR0cEV2ZW50PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgSHR0cEV2ZW50VHlwZS5TZW50OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2VuZC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURhdGE6IGZvcm1EYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEh0dHBFdmVudFR5cGUuUmVzcG9uc2U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudFsnc3RhdHVzJ10gPj0gMjAwICYmIGV2ZW50WydzdGF0dXMnXSA8IDMwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsZUxpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRlZEZpbGVDb3VudCArPSB0aGlzLmZpbGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblVwbG9hZC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGZpbGVzOiB0aGlzLmZpbGVzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoeyBmaWxlczogdGhpcy5maWxlcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBIdHRwRXZlbnRUeXBlLlVwbG9hZFByb2dyZXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudFsnbG9hZGVkJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBNYXRoLnJvdW5kKChldmVudFsnbG9hZGVkJ10gKiAxMDApIC8gZXZlbnRbJ3RvdGFsJ10hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Qcm9ncmVzcy5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHByb2dyZXNzOiB0aGlzLnByb2dyZXNzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcjogRXJyb3JFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25FcnJvci5lbWl0KHsgZmlsZXM6IHRoaXMuZmlsZXMsIGVycm9yOiBlcnJvciB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBmaWxlcyBsaXN0LlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5maWxlcyA9IFtdO1xuICAgICAgICB0aGlzLnVwbG9hZGVkRmlsZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5vbkNsZWFyLmVtaXQoKTtcbiAgICAgICAgdGhpcy5jbGVhcklucHV0RWxlbWVudCgpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHJlbW92ZShldmVudDogRXZlbnQsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jbGVhcklucHV0RWxlbWVudCgpO1xuICAgICAgICB0aGlzLm9uUmVtb3ZlLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgZmlsZTogdGhpcy5maWxlc1tpbmRleF0gfSk7XG4gICAgICAgIHRoaXMuZmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5jaGVja0ZpbGVMaW1pdCh0aGlzLmZpbGVzKTtcbiAgICB9XG5cbiAgICBpc0ZpbGVMaW1pdEV4Y2VlZGVkKCkge1xuICAgICAgICBjb25zdCBpc0F1dG9Nb2RlID0gdGhpcy5hdXRvO1xuICAgICAgICBjb25zdCB0b3RhbEZpbGVDb3VudCA9IGlzQXV0b01vZGUgPyB0aGlzLmZpbGVzLmxlbmd0aCA6IHRoaXMuZmlsZXMubGVuZ3RoICsgdGhpcy51cGxvYWRlZEZpbGVDb3VudDtcblxuICAgICAgICBpZiAodGhpcy5maWxlTGltaXQgJiYgdGhpcy5maWxlTGltaXQgPD0gdG90YWxGaWxlQ291bnQgJiYgdGhpcy5mb2N1cykge1xuICAgICAgICAgICAgdGhpcy5mb2N1cyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZUxpbWl0ICYmIHRoaXMuZmlsZUxpbWl0IDwgdG90YWxGaWxlQ291bnQ7XG4gICAgfVxuXG4gICAgaXNDaG9vc2VEaXNhYmxlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0bykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsZUxpbWl0ICYmIHRoaXMuZmlsZUxpbWl0IDw9IHRoaXMuZmlsZXMubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsZUxpbWl0ICYmIHRoaXMuZmlsZUxpbWl0IDw9IHRoaXMuZmlsZXMubGVuZ3RoICsgdGhpcy51cGxvYWRlZEZpbGVDb3VudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrRmlsZUxpbWl0KGZpbGVzOiBGaWxlW10pIHtcbiAgICAgICAgdGhpcy5tc2dzID8/PSBbXTtcbiAgICAgICAgY29uc3QgaGFzRXhpc3RpbmdWYWxpZGF0aW9uTWVzc2FnZXMgPSB0aGlzLm1zZ3MubGVuZ3RoID4gMCAmJiB0aGlzLmZpbGVMaW1pdCA8IGZpbGVzLmxlbmd0aDtcbiAgICAgICAgaWYgKHRoaXMuaXNGaWxlTGltaXRFeGNlZWRlZCgpIHx8IGhhc0V4aXN0aW5nVmFsaWRhdGlvbk1lc3NhZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLm1zZ3MucHVzaCh7XG4gICAgICAgICAgICAgICAgc2V2ZXJpdHk6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgc3VtbWFyeTogdGhpcy5pbnZhbGlkRmlsZUxpbWl0TWVzc2FnZVN1bW1hcnkucmVwbGFjZSgnezB9JywgKHRoaXMuZmlsZUxpbWl0IGFzIG51bWJlcikudG9TdHJpbmcoKSksXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB0aGlzLmludmFsaWRGaWxlTGltaXRNZXNzYWdlRGV0YWlsLnJlcGxhY2UoJ3swfScsICh0aGlzLmZpbGVMaW1pdCBhcyBudW1iZXIpLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFySW5wdXRFbGVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5hZHZhbmNlZEZpbGVJbnB1dCAmJiB0aGlzLmFkdmFuY2VkRmlsZUlucHV0Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuYWR2YW5jZWRGaWxlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYmFzaWNGaWxlSW5wdXQgJiYgdGhpcy5iYXNpY0ZpbGVJbnB1dC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmJhc2ljRmlsZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFySUVJbnB1dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYWR2YW5jZWRGaWxlSW5wdXQgJiYgdGhpcy5hZHZhbmNlZEZpbGVJbnB1dC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmR1cGxpY2F0ZUlFRXZlbnQgPSB0cnVlOyAvL0lFMTEgZml4IHRvIHByZXZlbnQgb25GaWxlQ2hhbmdlIHRyaWdnZXIgYWdhaW5cbiAgICAgICAgICAgIHRoaXMuYWR2YW5jZWRGaWxlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzRmlsZXMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVzICYmIHRoaXMuZmlsZXMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBvbkRyYWdFbnRlcihlOiBEcmFnRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EcmFnT3ZlcihlOiBEcmFnRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuY29udGVudD8ubmF0aXZlRWxlbWVudCwgJ3AtZmlsZXVwbG9hZC1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0hpZ2hsaWdodCA9IHRydWU7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EcmFnTGVhdmUoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250ZW50Py5uYXRpdmVFbGVtZW50LCAncC1maWxldXBsb2FkLWhpZ2hsaWdodCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ecm9wKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGVudD8ubmF0aXZlRWxlbWVudCwgJ3AtZmlsZXVwbG9hZC1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbGV0IGZpbGVzID0gZXZlbnQuZGF0YVRyYW5zZmVyID8gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzIDogZXZlbnQudGFyZ2V0LmZpbGVzO1xuICAgICAgICAgICAgbGV0IGFsbG93RHJvcCA9IHRoaXMubXVsdGlwbGUgfHwgKGZpbGVzICYmIGZpbGVzLmxlbmd0aCA9PT0gMSk7XG5cbiAgICAgICAgICAgIGlmIChhbGxvd0Ryb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRmlsZVNlbGVjdChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3JtYXRTaXplKGJ5dGVzOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgayA9IDEwMjQ7XG4gICAgICAgIGNvbnN0IGRtID0gMztcbiAgICAgICAgY29uc3Qgc2l6ZXMgPSB0aGlzLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5GSUxFX1NJWkVfVFlQRVMpO1xuXG4gICAgICAgIGlmIChieXRlcyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGAwICR7c2l6ZXNbMF19YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKE1hdGgubG9nKGJ5dGVzKSAvIE1hdGgubG9nKGspKTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkU2l6ZSA9IChieXRlcyAvIE1hdGgucG93KGssIGkpKS50b0ZpeGVkKGRtKTtcblxuICAgICAgICByZXR1cm4gYCR7Zm9ybWF0dGVkU2l6ZX0gJHtzaXplc1tpXX1gO1xuICAgIH1cblxuICAgIG9uQmFzaWNVcGxvYWRlckNsaWNrKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNGaWxlcygpKSB0aGlzLnVwbG9hZCgpO1xuICAgICAgICBlbHNlIHRoaXMuYmFzaWNGaWxlSW5wdXQ/Lm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG5cbiAgICBvbkJhc2ljS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQmFzaWNVcGxvYWRlckNsaWNrKCk7XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW1hZ2VFcnJvcihldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkltYWdlRXJyb3IuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgZ2V0QmxvY2thYmxlRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgZ2V0IGNob29zZUJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNob29zZUxhYmVsIHx8IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5DSE9PU0UpO1xuICAgIH1cblxuICAgIGdldCB1cGxvYWRCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy51cGxvYWRMYWJlbCB8fCB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuVVBMT0FEKTtcbiAgICB9XG5cbiAgICBnZXQgY2FuY2VsQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuY2VsTGFiZWwgfHwgdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkNBTkNFTCk7XG4gICAgfVxuXG4gICAgZ2V0IGJyb3dzZUZpbGVzTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5BUklBKVtUcmFuc2xhdGlvbktleXMuQlJPV1NFX0ZJTEVTXTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCAmJiB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ092ZXJMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50cmFuc2xhdGlvblN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEh0dHBDbGllbnRNb2R1bGUsIFNoYXJlZE1vZHVsZSwgQnV0dG9uTW9kdWxlLCBQcm9ncmVzc0Jhck1vZHVsZSwgTWVzc2FnZXNNb2R1bGUsIFJpcHBsZU1vZHVsZSwgUGx1c0ljb24sIFVwbG9hZEljb24sIFRpbWVzSWNvbl0sXG4gICAgZXhwb3J0czogW0ZpbGVVcGxvYWQsIFNoYXJlZE1vZHVsZSwgQnV0dG9uTW9kdWxlLCBQcm9ncmVzc0Jhck1vZHVsZSwgTWVzc2FnZXNNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0ZpbGVVcGxvYWRdXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWRNb2R1bGUge31cbiJdfQ==