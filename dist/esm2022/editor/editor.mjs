import { CommonModule, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewEncapsulation, afterNextRender, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const EDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Editor),
    multi: true
};
/**
 * Editor groups a collection of contents in tabs.
 * @group Components
 */
export class Editor {
    el;
    platformId;
    /**
     * Inline style of the container.
     * @group Props
     */
    style;
    /**
     * Style class of the container.
     * @group Props
     */
    styleClass;
    /**
     * Placeholder text to show when editor is empty.
     * @group Props
     */
    placeholder;
    /**
     * Whitelist of formats to display, see here for available options.
     * @group Props
     */
    formats;
    /**
     * Modules configuration of Editor, see here for available options.
     * @group Props
     */
    modules;
    /**
     * DOM Element or a CSS selector for a DOM Element, within which the editor’s p elements (i.e. tooltips, etc.) should be confined. Currently, it only considers left and right boundaries.
     * @group Props
     */
    bounds;
    /**
     * DOM Element or a CSS selector for a DOM Element, specifying which container has the scrollbars (i.e. overflow-y: auto), if is has been changed from the default ql-editor with custom CSS. Necessary to fix scroll jumping bugs when Quill is set to auto grow its height, and another ancestor container is responsible from the scrolling..
     * @group Props
     */
    scrollingContainer;
    /**
     * Shortcut for debug. Note debug is a static method and will affect other instances of Quill editors on the page. Only warning and error messages are enabled by default.
     * @group Props
     */
    debug;
    /**
     * Whether to instantiate the editor to read-only mode.
     * @group Props
     */
    get readonly() {
        return this._readonly;
    }
    set readonly(val) {
        this._readonly = val;
        if (this.quill) {
            if (this._readonly)
                this.quill.disable();
            else
                this.quill.enable();
        }
    }
    /**
     * Callback to invoke when the quill modules are loaded.
     * @param {EditorInitEvent} event - custom event.
     * @group Emits
     */
    onInit = new EventEmitter();
    /**
     * Callback to invoke when text of editor changes.
     * @param {EditorTextChangeEvent} event - custom event.
     * @group Emits
     */
    onTextChange = new EventEmitter();
    /**
     * Callback to invoke when selection of the text changes.
     * @param {EditorSelectionChangeEvent} event - custom event.
     * @group Emits
     */
    onSelectionChange = new EventEmitter();
    templates;
    toolbar;
    value;
    delayedCommand = null;
    _readonly = false;
    onModelChange = () => { };
    onModelTouched = () => { };
    quill;
    dynamicQuill;
    headerTemplate;
    get isAttachedQuillEditorToDOM() {
        return this.quillElements?.editorElement?.isConnected;
    }
    quillElements;
    constructor(el, platformId) {
        this.el = el;
        this.platformId = platformId;
        /**
         * Read or write the DOM once, when initializing non-Angular (Quill) library.
         */
        afterNextRender(() => {
            this.initQuillElements();
            if (this.isAttachedQuillEditorToDOM) {
                this.initQuillEditor();
            }
        });
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
            }
        });
    }
    writeValue(value) {
        this.value = value;
        if (this.quill) {
            if (value) {
                const command = () => {
                    this.quill.setContents(this.quill.clipboard.convert(this.value));
                };
                if (this.isAttachedQuillEditorToDOM) {
                    command();
                }
                else {
                    this.delayedCommand = command;
                }
            }
            else {
                const command = () => {
                    this.quill.setText('');
                };
                if (this.isAttachedQuillEditorToDOM) {
                    command();
                }
                else {
                    this.delayedCommand = command;
                }
            }
        }
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    getQuill() {
        return this.quill;
    }
    initQuillEditor() {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        /**
         * Importing Quill at top level, throws `document is undefined` error during when
         * building for SSR, so this dynamically loads quill when it's in browser module.
         */
        if (!this.dynamicQuill) {
            import('quill')
                .then((quillModule) => {
                this.dynamicQuill = quillModule.default;
                this.createQuillEditor();
            })
                .catch((e) => console.error(e.message));
        }
        else {
            this.createQuillEditor();
        }
    }
    createQuillEditor() {
        this.initQuillElements();
        const { toolbarElement, editorElement } = this.quillElements;
        let defaultModule = { toolbar: toolbarElement };
        let modules = this.modules ? { ...defaultModule, ...this.modules } : defaultModule;
        this.quill = new this.dynamicQuill(editorElement, {
            modules: modules,
            placeholder: this.placeholder,
            readOnly: this.readonly,
            theme: 'snow',
            formats: this.formats,
            bounds: this.bounds,
            debug: this.debug,
            scrollingContainer: this.scrollingContainer
        });
        if (this.value) {
            this.quill.setContents(this.quill.clipboard.convert(this.value));
        }
        this.quill.on('text-change', (delta, oldContents, source) => {
            if (source === 'user') {
                let html = DomHandler.findSingle(editorElement, '.ql-editor').innerHTML;
                let text = this.quill.getText().trim();
                if (html === '<p><br></p>') {
                    html = null;
                }
                this.onTextChange.emit({
                    htmlValue: html,
                    textValue: text,
                    delta: delta,
                    source: source
                });
                this.onModelChange(html);
                this.onModelTouched();
            }
        });
        this.quill.on('selection-change', (range, oldRange, source) => {
            this.onSelectionChange.emit({
                range: range,
                oldRange: oldRange,
                source: source
            });
        });
        this.onInit.emit({
            editor: this.quill
        });
    }
    initQuillElements() {
        if (!this.quillElements) {
            this.quillElements = {
                editorElement: DomHandler.findSingle(this.el.nativeElement, 'div.p-editor-content'),
                toolbarElement: DomHandler.findSingle(this.el.nativeElement, 'div.p-editor-toolbar')
            };
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Editor, deps: [{ token: i0.ElementRef }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.1", type: Editor, selector: "p-editor", inputs: { style: "style", styleClass: "styleClass", placeholder: "placeholder", formats: "formats", modules: "modules", bounds: "bounds", scrollingContainer: "scrollingContainer", debug: "debug", readonly: "readonly" }, outputs: { onInit: "onInit", onTextChange: "onTextChange", onSelectionChange: "onSelectionChange" }, host: { classAttribute: "p-element" }, providers: [EDITOR_VALUE_ACCESSOR], queries: [{ propertyName: "toolbar", first: true, predicate: Header, descendants: true }, { propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div [ngClass]="'p-editor-container'" [class]="styleClass">
            <div class="p-editor-toolbar" *ngIf="toolbar || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div class="p-editor-toolbar" *ngIf="!toolbar && !headerTemplate">
                <span class="ql-formats">
                    <select class="ql-header">
                        <option value="1">Heading</option>
                        <option value="2">Subheading</option>
                        <option selected>Normal</option>
                    </select>
                    <select class="ql-font">
                        <option selected>Sans Serif</option>
                        <option value="serif">Serif</option>
                        <option value="monospace">Monospace</option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-bold" aria-label="Bold" type="button"></button>
                    <button class="ql-italic" aria-label="Italic" type="button"></button>
                    <button class="ql-underline" aria-label="Underline" type="button"></button>
                </span>
                <span class="ql-formats">
                    <select class="ql-color"></select>
                    <select class="ql-background"></select>
                </span>
                <span class="ql-formats">
                    <button class="ql-list" value="ordered" aria-label="Ordered List" type="button"></button>
                    <button class="ql-list" value="bullet" aria-label="Unordered List" type="button"></button>
                    <select class="ql-align">
                        <option selected></option>
                        <option value="center">center</option>
                        <option value="right">right</option>
                        <option value="justify">justify</option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-link" aria-label="Insert Link" type="button"></button>
                    <button class="ql-image" aria-label="Insert Image" type="button"></button>
                    <button class="ql-code-block" aria-label="Insert Code Block" type="button"></button>
                </span>
                <span class="ql-formats">
                    <button class="ql-clean" aria-label="Remove Styles" type="button"></button>
                </span>
            </div>
            <div class="p-editor-content" [ngStyle]="style"></div>
        </div>
    `, isInline: true, styles: [".p-editor-container .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item{width:auto;height:auto}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Editor, decorators: [{
            type: Component,
            args: [{ selector: 'p-editor', template: `
        <div [ngClass]="'p-editor-container'" [class]="styleClass">
            <div class="p-editor-toolbar" *ngIf="toolbar || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div class="p-editor-toolbar" *ngIf="!toolbar && !headerTemplate">
                <span class="ql-formats">
                    <select class="ql-header">
                        <option value="1">Heading</option>
                        <option value="2">Subheading</option>
                        <option selected>Normal</option>
                    </select>
                    <select class="ql-font">
                        <option selected>Sans Serif</option>
                        <option value="serif">Serif</option>
                        <option value="monospace">Monospace</option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-bold" aria-label="Bold" type="button"></button>
                    <button class="ql-italic" aria-label="Italic" type="button"></button>
                    <button class="ql-underline" aria-label="Underline" type="button"></button>
                </span>
                <span class="ql-formats">
                    <select class="ql-color"></select>
                    <select class="ql-background"></select>
                </span>
                <span class="ql-formats">
                    <button class="ql-list" value="ordered" aria-label="Ordered List" type="button"></button>
                    <button class="ql-list" value="bullet" aria-label="Unordered List" type="button"></button>
                    <select class="ql-align">
                        <option selected></option>
                        <option value="center">center</option>
                        <option value="right">right</option>
                        <option value="justify">justify</option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-link" aria-label="Insert Link" type="button"></button>
                    <button class="ql-image" aria-label="Insert Image" type="button"></button>
                    <button class="ql-code-block" aria-label="Insert Code Block" type="button"></button>
                </span>
                <span class="ql-formats">
                    <button class="ql-clean" aria-label="Remove Styles" type="button"></button>
                </span>
            </div>
            <div class="p-editor-content" [ngStyle]="style"></div>
        </div>
    `, providers: [EDITOR_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-editor-container .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item{width:auto;height:auto}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }], propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], formats: [{
                type: Input
            }], modules: [{
                type: Input
            }], bounds: [{
                type: Input
            }], scrollingContainer: [{
                type: Input
            }], debug: [{
                type: Input
            }], readonly: [{
                type: Input
            }], onInit: [{
                type: Output
            }], onTextChange: [{
                type: Output
            }], onSelectionChange: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], toolbar: [{
                type: ContentChild,
                args: [Header]
            }] } });
export class EditorModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: EditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: EditorModule, declarations: [Editor], imports: [CommonModule], exports: [Editor, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: EditorModule, imports: [CommonModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: EditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Editor, SharedModule],
                    declarations: [Editor]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2VkaXRvci9lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBRWYsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixXQUFXLEVBR1gsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixVQUFVLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7QUFJekMsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQVE7SUFDdEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNyQyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFDRjs7O0dBR0c7QUE2REgsTUFBTSxPQUFPLE1BQU07SUFxR0k7SUFBNkM7SUFwR2hFOzs7T0FHRztJQUNNLEtBQUssQ0FBOEM7SUFDNUQ7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7O09BR0c7SUFDTSxXQUFXLENBQXFCO0lBQ3pDOzs7T0FHRztJQUNNLE9BQU8sQ0FBdUI7SUFDdkM7OztPQUdHO0lBQ00sT0FBTyxDQUFxQjtJQUNyQzs7O09BR0c7SUFDTSxNQUFNLENBQW1DO0lBQ2xEOzs7T0FHRztJQUNNLGtCQUFrQixDQUFtQztJQUM5RDs7O09B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fSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBOZ01vZHVsZSxcbiAgICBPdXRwdXQsXG4gICAgUExBVEZPUk1fSUQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIGFmdGVyTmV4dFJlbmRlcixcbiAgICBmb3J3YXJkUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSGVhZGVyLCBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgRWRpdG9ySW5pdEV2ZW50LCBFZGl0b3JTZWxlY3Rpb25DaGFuZ2VFdmVudCwgRWRpdG9yVGV4dENoYW5nZUV2ZW50IH0gZnJvbSAnLi9lZGl0b3IuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IEVESVRPUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEVkaXRvciksXG4gICAgbXVsdGk6IHRydWVcbn07XG4vKipcbiAqIEVkaXRvciBncm91cHMgYSBjb2xsZWN0aW9uIG9mIGNvbnRlbnRzIGluIHRhYnMuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZWRpdG9yJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIidwLWVkaXRvci1jb250YWluZXInXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWVkaXRvci10b29sYmFyXCIgKm5nSWY9XCJ0b29sYmFyIHx8IGhlYWRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWVkaXRvci10b29sYmFyXCIgKm5nSWY9XCIhdG9vbGJhciAmJiAhaGVhZGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFsLWZvcm1hdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjFcIj5IZWFkaW5nPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMlwiPlN1YmhlYWRpbmc8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gc2VsZWN0ZWQ+Tm9ybWFsPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwicWwtZm9udFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBzZWxlY3RlZD5TYW5zIFNlcmlmPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic2VyaWZcIj5TZXJpZjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm1vbm9zcGFjZVwiPk1vbm9zcGFjZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxbC1mb3JtYXRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1ib2xkXCIgYXJpYS1sYWJlbD1cIkJvbGRcIiB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1pdGFsaWNcIiBhcmlhLWxhYmVsPVwiSXRhbGljXCIgdHlwZT1cImJ1dHRvblwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicWwtdW5kZXJsaW5lXCIgYXJpYS1sYWJlbD1cIlVuZGVybGluZVwiIHR5cGU9XCJidXR0b25cIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxbC1mb3JtYXRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJxbC1jb2xvclwiPjwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwicWwtYmFja2dyb3VuZFwiPjwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFsLWZvcm1hdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLWxpc3RcIiB2YWx1ZT1cIm9yZGVyZWRcIiBhcmlhLWxhYmVsPVwiT3JkZXJlZCBMaXN0XCIgdHlwZT1cImJ1dHRvblwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicWwtbGlzdFwiIHZhbHVlPVwiYnVsbGV0XCIgYXJpYS1sYWJlbD1cIlVub3JkZXJlZCBMaXN0XCIgdHlwZT1cImJ1dHRvblwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwicWwtYWxpZ25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gc2VsZWN0ZWQ+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY2VudGVyXCI+Y2VudGVyPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmlnaHRcIj5yaWdodDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImp1c3RpZnlcIj5qdXN0aWZ5PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFsLWZvcm1hdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLWxpbmtcIiBhcmlhLWxhYmVsPVwiSW5zZXJ0IExpbmtcIiB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1pbWFnZVwiIGFyaWEtbGFiZWw9XCJJbnNlcnQgSW1hZ2VcIiB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1jb2RlLWJsb2NrXCIgYXJpYS1sYWJlbD1cIkluc2VydCBDb2RlIEJsb2NrXCIgdHlwZT1cImJ1dHRvblwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFsLWZvcm1hdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLWNsZWFuXCIgYXJpYS1sYWJlbD1cIlJlbW92ZSBTdHlsZXNcIiB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1lZGl0b3ItY29udGVudFwiIFtuZ1N0eWxlXT1cInN0eWxlXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbRURJVE9SX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBzdHlsZVVybHM6IFsnLi9lZGl0b3IuY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRWRpdG9yIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29udGFpbmVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb250YWluZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIHRleHQgdG8gc2hvdyB3aGVuIGVkaXRvciBpcyBlbXB0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoaXRlbGlzdCBvZiBmb3JtYXRzIHRvIGRpc3BsYXksIHNlZSBoZXJlIGZvciBhdmFpbGFibGUgb3B0aW9ucy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmb3JtYXRzOiBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBNb2R1bGVzIGNvbmZpZ3VyYXRpb24gb2YgRWRpdG9yLCBzZWUgaGVyZSBmb3IgYXZhaWxhYmxlIG9wdGlvbnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbW9kdWxlczogb2JqZWN0IHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERPTSBFbGVtZW50IG9yIGEgQ1NTIHNlbGVjdG9yIGZvciBhIERPTSBFbGVtZW50LCB3aXRoaW4gd2hpY2ggdGhlIGVkaXRvcuKAmXMgcCBlbGVtZW50cyAoaS5lLiB0b29sdGlwcywgZXRjLikgc2hvdWxkIGJlIGNvbmZpbmVkLiBDdXJyZW50bHksIGl0IG9ubHkgY29uc2lkZXJzIGxlZnQgYW5kIHJpZ2h0IGJvdW5kYXJpZXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYm91bmRzOiBIVE1MRWxlbWVudCB8IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBET00gRWxlbWVudCBvciBhIENTUyBzZWxlY3RvciBmb3IgYSBET00gRWxlbWVudCwgc3BlY2lmeWluZyB3aGljaCBjb250YWluZXIgaGFzIHRoZSBzY3JvbGxiYXJzIChpLmUuIG92ZXJmbG93LXk6IGF1dG8pLCBpZiBpcyBoYXMgYmVlbiBjaGFuZ2VkIGZyb20gdGhlIGRlZmF1bHQgcWwtZWRpdG9yIHdpdGggY3VzdG9tIENTUy4gTmVjZXNzYXJ5IHRvIGZpeCBzY3JvbGwganVtcGluZyBidWdzIHdoZW4gUXVpbGwgaXMgc2V0IHRvIGF1dG8gZ3JvdyBpdHMgaGVpZ2h0LCBhbmQgYW5vdGhlciBhbmNlc3RvciBjb250YWluZXIgaXMgcmVzcG9uc2libGUgZnJvbSB0aGUgc2Nyb2xsaW5nLi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzY3JvbGxpbmdDb250YWluZXI6IEhUTUxFbGVtZW50IHwgc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IGZvciBkZWJ1Zy4gTm90ZSBkZWJ1ZyBpcyBhIHN0YXRpYyBtZXRob2QgYW5kIHdpbGwgYWZmZWN0IG90aGVyIGluc3RhbmNlcyBvZiBRdWlsbCBlZGl0b3JzIG9uIHRoZSBwYWdlLiBPbmx5IHdhcm5pbmcgYW5kIGVycm9yIG1lc3NhZ2VzIGFyZSBlbmFibGVkIGJ5IGRlZmF1bHQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGVidWc6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGluc3RhbnRpYXRlIHRoZSBlZGl0b3IgdG8gcmVhZC1vbmx5IG1vZGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVhZG9ubHk7XG4gICAgfVxuICAgIHNldCByZWFkb25seSh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVhZG9ubHkgPSB2YWw7XG5cbiAgICAgICAgaWYgKHRoaXMucXVpbGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZWFkb25seSkgdGhpcy5xdWlsbC5kaXNhYmxlKCk7XG4gICAgICAgICAgICBlbHNlIHRoaXMucXVpbGwuZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gdGhlIHF1aWxsIG1vZHVsZXMgYXJlIGxvYWRlZC5cbiAgICAgKiBAcGFyYW0ge0VkaXRvckluaXRFdmVudH0gZXZlbnQgLSBjdXN0b20gZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uSW5pdDogRXZlbnRFbWl0dGVyPEVkaXRvckluaXRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEVkaXRvckluaXRFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiB0ZXh0IG9mIGVkaXRvciBjaGFuZ2VzLlxuICAgICAqIEBwYXJhbSB7RWRpdG9yVGV4dENoYW5nZUV2ZW50fSBldmVudCAtIGN1c3RvbSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25UZXh0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8RWRpdG9yVGV4dENoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RWRpdG9yVGV4dENoYW5nZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHNlbGVjdGlvbiBvZiB0aGUgdGV4dCBjaGFuZ2VzLlxuICAgICAqIEBwYXJhbSB7RWRpdG9yU2VsZWN0aW9uQ2hhbmdlRXZlbnR9IGV2ZW50IC0gY3VzdG9tIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEVkaXRvclNlbGVjdGlvbkNoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RWRpdG9yU2VsZWN0aW9uQ2hhbmdlRXZlbnQ+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlcyE6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPjtcblxuICAgIEBDb250ZW50Q2hpbGQoSGVhZGVyKSB0b29sYmFyOiBhbnk7XG5cbiAgICB2YWx1ZTogTnVsbGFibGU8c3RyaW5nPjtcblxuICAgIGRlbGF5ZWRDb21tYW5kOiBGdW5jdGlvbiB8IG51bGwgPSBudWxsO1xuXG4gICAgX3JlYWRvbmx5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBxdWlsbDogYW55O1xuXG4gICAgZHluYW1pY1F1aWxsOiBhbnk7XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBwcml2YXRlIGdldCBpc0F0dGFjaGVkUXVpbGxFZGl0b3JUb0RPTSgpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVpbGxFbGVtZW50cz8uZWRpdG9yRWxlbWVudD8uaXNDb25uZWN0ZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBxdWlsbEVsZW1lbnRzITogeyBlZGl0b3JFbGVtZW50OiBIVE1MRWxlbWVudDsgdG9vbGJhckVsZW1lbnQ6IEhUTUxFbGVtZW50IH07XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogb2JqZWN0KSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWFkIG9yIHdyaXRlIHRoZSBET00gb25jZSwgd2hlbiBpbml0aWFsaXppbmcgbm9uLUFuZ3VsYXIgKFF1aWxsKSBsaWJyYXJ5LlxuICAgICAgICAgKi9cbiAgICAgICAgYWZ0ZXJOZXh0UmVuZGVyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFF1aWxsRWxlbWVudHMoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNBdHRhY2hlZFF1aWxsRWRpdG9yVG9ET00pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRRdWlsbEVkaXRvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMucXVpbGwpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVpbGwuc2V0Q29udGVudHModGhpcy5xdWlsbC5jbGlwYm9hcmQuY29udmVydCh0aGlzLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQXR0YWNoZWRRdWlsbEVkaXRvclRvRE9NKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGF5ZWRDb21tYW5kID0gY29tbWFuZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVpbGwuc2V0VGV4dCgnJyk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQXR0YWNoZWRRdWlsbEVkaXRvclRvRE9NKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGF5ZWRDb21tYW5kID0gY29tbWFuZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIGdldFF1aWxsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWlsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRRdWlsbEVkaXRvcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEltcG9ydGluZyBRdWlsbCBhdCB0b3AgbGV2ZWwsIHRocm93cyBgZG9jdW1lbnQgaXMgdW5kZWZpbmVkYCBlcnJvciBkdXJpbmcgd2hlblxuICAgICAgICAgKiBidWlsZGluZyBmb3IgU1NSLCBzbyB0aGlzIGR5bmFtaWNhbGx5IGxvYWRzIHF1aWxsIHdoZW4gaXQncyBpbiBicm93c2VyIG1vZHVsZS5cbiAgICAgICAgICovXG4gICAgICAgIGlmICghdGhpcy5keW5hbWljUXVpbGwpIHtcbiAgICAgICAgICAgIGltcG9ydCgncXVpbGwnKVxuICAgICAgICAgICAgICAgIC50aGVuKChxdWlsbE1vZHVsZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHluYW1pY1F1aWxsID0gcXVpbGxNb2R1bGUuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVRdWlsbEVkaXRvcigpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiBjb25zb2xlLmVycm9yKGUubWVzc2FnZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVRdWlsbEVkaXRvcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVRdWlsbEVkaXRvcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0UXVpbGxFbGVtZW50cygpO1xuXG4gICAgICAgIGNvbnN0IHsgdG9vbGJhckVsZW1lbnQsIGVkaXRvckVsZW1lbnQgfSA9IHRoaXMucXVpbGxFbGVtZW50cztcbiAgICAgICAgbGV0IGRlZmF1bHRNb2R1bGUgPSB7IHRvb2xiYXI6IHRvb2xiYXJFbGVtZW50IH07XG4gICAgICAgIGxldCBtb2R1bGVzID0gdGhpcy5tb2R1bGVzID8geyAuLi5kZWZhdWx0TW9kdWxlLCAuLi50aGlzLm1vZHVsZXMgfSA6IGRlZmF1bHRNb2R1bGU7XG4gICAgICAgIHRoaXMucXVpbGwgPSBuZXcgdGhpcy5keW5hbWljUXVpbGwoZWRpdG9yRWxlbWVudCwge1xuICAgICAgICAgICAgbW9kdWxlczogbW9kdWxlcyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucmVhZG9ubHksXG4gICAgICAgICAgICB0aGVtZTogJ3Nub3cnLFxuICAgICAgICAgICAgZm9ybWF0czogdGhpcy5mb3JtYXRzLFxuICAgICAgICAgICAgYm91bmRzOiB0aGlzLmJvdW5kcyxcbiAgICAgICAgICAgIGRlYnVnOiB0aGlzLmRlYnVnLFxuICAgICAgICAgICAgc2Nyb2xsaW5nQ29udGFpbmVyOiB0aGlzLnNjcm9sbGluZ0NvbnRhaW5lclxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5xdWlsbC5zZXRDb250ZW50cyh0aGlzLnF1aWxsLmNsaXBib2FyZC5jb252ZXJ0KHRoaXMudmFsdWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucXVpbGwub24oJ3RleHQtY2hhbmdlJywgKGRlbHRhOiBhbnksIG9sZENvbnRlbnRzOiBhbnksIHNvdXJjZTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoc291cmNlID09PSAndXNlcicpIHtcbiAgICAgICAgICAgICAgICBsZXQgaHRtbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShlZGl0b3JFbGVtZW50LCAnLnFsLWVkaXRvcicpLmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dCA9IHRoaXMucXVpbGwuZ2V0VGV4dCgpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICBpZiAoaHRtbCA9PT0gJzxwPjxicj48L3A+Jykge1xuICAgICAgICAgICAgICAgICAgICBodG1sID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uVGV4dENoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbFZhbHVlOiBodG1sLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWU6IHRleHQsXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBzb3VyY2VcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZShodG1sKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucXVpbGwub24oJ3NlbGVjdGlvbi1jaGFuZ2UnLCAocmFuZ2U6IHN0cmluZywgb2xkUmFuZ2U6IHN0cmluZywgc291cmNlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IHJhbmdlLFxuICAgICAgICAgICAgICAgIG9sZFJhbmdlOiBvbGRSYW5nZSxcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub25Jbml0LmVtaXQoe1xuICAgICAgICAgICAgZWRpdG9yOiB0aGlzLnF1aWxsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFF1aWxsRWxlbWVudHMoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5xdWlsbEVsZW1lbnRzKSB7XG4gICAgICAgICAgICB0aGlzLnF1aWxsRWxlbWVudHMgPSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yRWxlbWVudDogRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Rpdi5wLWVkaXRvci1jb250ZW50JyksXG4gICAgICAgICAgICAgICAgdG9vbGJhckVsZW1lbnQ6IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkaXYucC1lZGl0b3ItdG9vbGJhcicpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtFZGl0b3IsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbRWRpdG9yXVxufSlcbmV4cG9ydCBjbGFzcyBFZGl0b3JNb2R1bGUge31cbiJdfQ==