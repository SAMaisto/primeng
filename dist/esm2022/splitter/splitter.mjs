import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, numberAttribute } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Splitter is utilized to separate and resize panels.
 * @group Components
 */
export class Splitter {
    document;
    platformId;
    renderer;
    cd;
    el;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Style class of the panel.
     * @group Props
     */
    panelStyleClass;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Inline style of the panel.
     * @group Props
     */
    panelStyle;
    /**
     * Defines where a stateful splitter keeps its state, valid values are 'session' for sessionStorage and 'local' for localStorage.
     * @group Props
     */
    stateStorage = 'session';
    /**
     * Storage identifier of a stateful Splitter.
     * @group Props
     */
    stateKey = null;
    /**
     * Orientation of the panels. Valid values are 'horizontal' and 'vertical'.
     * @group Props
     */
    layout = 'horizontal';
    /**
     * Size of the divider in pixels.
     * @group Props
     */
    gutterSize = 4;
    /**
     * Step factor to increment/decrement the size of the panels while pressing the arrow keys.
     * @group Props
     */
    step = 5;
    /**
     * Minimum size of the elements relative to 100%.
     * @group Props
     */
    minSizes = [];
    /**
     * Size of the elements relative to 100%.
     * @group Props
     */
    get panelSizes() {
        return this._panelSizes;
    }
    set panelSizes(val) {
        this._panelSizes = val;
        if (this.el && this.el.nativeElement && this.panels.length > 0) {
            let children = [...this.el.nativeElement.children[0].children].filter((child) => DomHandler.hasClass(child, 'p-splitter-panel'));
            let _panelSizes = [];
            this.panels.map((panel, i) => {
                let panelInitialSize = this.panelSizes.length - 1 >= i ? this.panelSizes[i] : null;
                let panelSize = panelInitialSize || 100 / this.panels.length;
                _panelSizes[i] = panelSize;
                children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            });
        }
    }
    /**
     * Callback to invoke when resize ends.
     * @param {SplitterResizeEndEvent} event - Custom panel resize end event
     * @group Emits
     */
    onResizeEnd = new EventEmitter();
    /**
     * Callback to invoke when resize starts.
     * @param {SplitterResizeStartEvent} event - Custom panel resize start event
     * @group Emits
     */
    onResizeStart = new EventEmitter();
    templates;
    containerViewChild;
    nested = false;
    panels = [];
    dragging = false;
    mouseMoveListener;
    mouseUpListener;
    touchMoveListener;
    touchEndListener;
    size;
    gutterElement;
    startPos;
    prevPanelElement;
    nextPanelElement;
    nextPanelSize;
    prevPanelSize;
    _panelSizes = [];
    prevPanelIndex;
    timer;
    prevSize;
    window;
    constructor(document, platformId, renderer, cd, el) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.cd = cd;
        this.el = el;
        this.window = this.document.defaultView;
    }
    ngOnInit() {
        this.nested = this.isNested();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'panel':
                    this.panels.push(item.template);
                    break;
                default:
                    this.panels.push(item.template);
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.panels && this.panels.length) {
                let initialized = false;
                if (this.isStateful()) {
                    initialized = this.restoreState();
                }
                if (!initialized) {
                    let children = [...this.el.nativeElement.children[0].children].filter((child) => DomHandler.hasClass(child, 'p-splitter-panel'));
                    let _panelSizes = [];
                    this.panels.map((panel, i) => {
                        let panelInitialSize = this.panelSizes.length - 1 >= i ? this.panelSizes[i] : null;
                        let panelSize = panelInitialSize || 100 / this.panels.length;
                        _panelSizes[i] = panelSize;
                        children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
                    });
                    this._panelSizes = _panelSizes;
                    this.prevSize = parseFloat(_panelSizes[0]).toFixed(4);
                }
            }
        }
    }
    resizeStart(event, index, isKeyDown) {
        this.gutterElement = event.currentTarget || event.target.parentElement;
        this.size = this.horizontal() ? DomHandler.getWidth(this.containerViewChild.nativeElement) : DomHandler.getHeight(this.containerViewChild.nativeElement);
        if (!isKeyDown) {
            this.dragging = true;
            this.startPos = this.horizontal() ? (event instanceof MouseEvent ? event.pageX : event.changedTouches[0].pageX) : event instanceof MouseEvent ? event.pageY : event.changedTouches[0].pageY;
        }
        this.prevPanelElement = this.gutterElement.previousElementSibling;
        this.nextPanelElement = this.gutterElement.nextElementSibling;
        if (isKeyDown) {
            this.prevPanelSize = this.horizontal() ? DomHandler.getOuterWidth(this.prevPanelElement, true) : DomHandler.getOuterHeight(this.prevPanelElement, true);
            this.nextPanelSize = this.horizontal() ? DomHandler.getOuterWidth(this.nextPanelElement, true) : DomHandler.getOuterHeight(this.nextPanelElement, true);
        }
        else {
            this.prevPanelSize = (100 * (this.horizontal() ? DomHandler.getOuterWidth(this.prevPanelElement, true) : DomHandler.getOuterHeight(this.prevPanelElement, true))) / this.size;
            this.nextPanelSize = (100 * (this.horizontal() ? DomHandler.getOuterWidth(this.nextPanelElement, true) : DomHandler.getOuterHeight(this.nextPanelElement, true))) / this.size;
        }
        this.prevPanelIndex = index;
        DomHandler.addClass(this.gutterElement, 'p-splitter-gutter-resizing');
        this.gutterElement.setAttribute('data-p-gutter-resizing', 'true');
        DomHandler.addClass(this.containerViewChild.nativeElement, 'p-splitter-resizing');
        this.containerViewChild.nativeElement.setAttribute('data-p-resizing', 'true');
        this.onResizeStart.emit({ originalEvent: event, sizes: this._panelSizes });
    }
    onResize(event, step, isKeyDown) {
        let newPos, newPrevPanelSize, newNextPanelSize;
        if (isKeyDown) {
            if (this.horizontal()) {
                newPrevPanelSize = (100 * (this.prevPanelSize + step)) / this.size;
                newNextPanelSize = (100 * (this.nextPanelSize - step)) / this.size;
            }
            else {
                newPrevPanelSize = (100 * (this.prevPanelSize - step)) / this.size;
                newNextPanelSize = (100 * (this.nextPanelSize + step)) / this.size;
            }
        }
        else {
            if (this.horizontal())
                newPos = (event.pageX * 100) / this.size - (this.startPos * 100) / this.size;
            else
                newPos = (event.pageY * 100) / this.size - (this.startPos * 100) / this.size;
            newPrevPanelSize = this.prevPanelSize + newPos;
            newNextPanelSize = this.nextPanelSize - newPos;
        }
        this.prevSize = parseFloat(newPrevPanelSize).toFixed(4);
        if (this.validateResize(newPrevPanelSize, newNextPanelSize)) {
            this.prevPanelElement.style.flexBasis = 'calc(' + newPrevPanelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            this.nextPanelElement.style.flexBasis = 'calc(' + newNextPanelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            this._panelSizes[this.prevPanelIndex] = newPrevPanelSize;
            this._panelSizes[this.prevPanelIndex + 1] = newNextPanelSize;
        }
    }
    resizeEnd(event) {
        if (this.isStateful()) {
            this.saveState();
        }
        this.onResizeEnd.emit({ originalEvent: event, sizes: this._panelSizes });
        DomHandler.removeClass(this.gutterElement, 'p-splitter-gutter-resizing');
        DomHandler.removeClass(this.containerViewChild.nativeElement, 'p-splitter-resizing');
        this.clear();
    }
    onGutterMouseDown(event, index) {
        this.resizeStart(event, index);
        this.bindMouseListeners();
    }
    onGutterTouchStart(event, index) {
        if (event.cancelable) {
            this.resizeStart(event, index);
            this.bindTouchListeners();
            event.preventDefault();
        }
    }
    onGutterTouchMove(event) {
        this.onResize(event);
        event.preventDefault();
    }
    onGutterTouchEnd(event) {
        this.resizeEnd(event);
        this.unbindTouchListeners();
        if (event.cancelable)
            event.preventDefault();
    }
    repeat(event, index, step) {
        this.resizeStart(event, index, true);
        this.onResize(event, step, true);
    }
    setTimer(event, index, step) {
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(event, index, step);
        }, 40);
    }
    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    onGutterKeyUp(event) {
        this.clearTimer();
        this.resizeEnd(event);
    }
    onGutterKeyDown(event, index) {
        switch (event.code) {
            case 'ArrowLeft': {
                if (this.layout === 'horizontal') {
                    this.setTimer(event, index, this.step * -1);
                }
                event.preventDefault();
                break;
            }
            case 'ArrowRight': {
                if (this.layout === 'horizontal') {
                    this.setTimer(event, index, this.step);
                }
                event.preventDefault();
                break;
            }
            case 'ArrowDown': {
                if (this.layout === 'vertical') {
                    this.setTimer(event, index, this.step * -1);
                }
                event.preventDefault();
                break;
            }
            case 'ArrowUp': {
                if (this.layout === 'vertical') {
                    this.setTimer(event, index, this.step);
                }
                event.preventDefault();
                break;
            }
            default:
                //no op
                break;
        }
    }
    validateResize(newPrevPanelSize, newNextPanelSize) {
        if (this.minSizes.length >= 1 && this.minSizes[0] && this.minSizes[0] > newPrevPanelSize) {
            return false;
        }
        if (this.minSizes.length > 1 && this.minSizes[1] && this.minSizes[1] > newNextPanelSize) {
            return false;
        }
        return true;
    }
    bindMouseListeners() {
        if (!this.mouseMoveListener) {
            this.mouseMoveListener = this.renderer.listen(this.document, 'mousemove', (event) => {
                this.onResize(event);
            });
        }
        if (!this.mouseUpListener) {
            this.mouseUpListener = this.renderer.listen(this.document, 'mouseup', (event) => {
                this.resizeEnd(event);
                this.unbindMouseListeners();
            });
        }
    }
    bindTouchListeners() {
        if (!this.touchMoveListener) {
            this.touchMoveListener = this.renderer.listen(this.document, 'touchmove', (event) => {
                this.onResize(event.changedTouches[0]);
            });
        }
        if (!this.touchEndListener) {
            this.touchEndListener = this.renderer.listen(this.document, 'touchend', (event) => {
                this.resizeEnd(event);
                this.unbindTouchListeners();
            });
        }
    }
    unbindMouseListeners() {
        if (this.mouseMoveListener) {
            this.mouseMoveListener();
            this.mouseMoveListener = null;
        }
        if (this.mouseUpListener) {
            this.mouseUpListener();
            this.mouseUpListener = null;
        }
    }
    unbindTouchListeners() {
        if (this.touchMoveListener) {
            this.touchMoveListener();
            this.touchMoveListener = null;
        }
        if (this.touchEndListener) {
            this.touchEndListener();
            this.touchEndListener = null;
        }
    }
    clear() {
        this.dragging = false;
        this.size = null;
        this.startPos = null;
        this.prevPanelElement = null;
        this.nextPanelElement = null;
        this.prevPanelSize = null;
        this.nextPanelSize = null;
        this.gutterElement = null;
        this.prevPanelIndex = null;
    }
    isNested() {
        if (this.el.nativeElement) {
            let parent = this.el.nativeElement.parentElement;
            while (parent && !DomHandler.hasClass(parent, 'p-splitter')) {
                parent = parent.parentElement;
            }
            return parent !== null;
        }
        else {
            return false;
        }
    }
    isStateful() {
        return this.stateKey != null;
    }
    getStorage() {
        if (isPlatformBrowser(this.platformId)) {
            switch (this.stateStorage) {
                case 'local':
                    return this.window.localStorage;
                case 'session':
                    return this.window.sessionStorage;
                default:
                    throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
            }
        }
        else {
            throw new Error('Storage is not a available by default on the server.');
        }
    }
    saveState() {
        this.getStorage().setItem(this.stateKey, JSON.stringify(this._panelSizes));
    }
    restoreState() {
        const storage = this.getStorage();
        const stateString = storage.getItem(this.stateKey);
        if (stateString) {
            this._panelSizes = JSON.parse(stateString);
            let children = [...this.containerViewChild.nativeElement.children].filter((child) => DomHandler.hasClass(child, 'p-splitter-panel'));
            children.forEach((child, i) => {
                child.style.flexBasis = 'calc(' + this._panelSizes[i] + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            });
            return true;
        }
        return false;
    }
    containerClass() {
        return {
            'p-splitter p-component': true,
            'p-splitter-horizontal': this.layout === 'horizontal',
            'p-splitter-vertical': this.layout === 'vertical'
        };
    }
    panelContainerClass() {
        return {
            'p-splitter-panel': true,
            'p-splitter-panel-nested': true
        };
    }
    gutterStyle() {
        if (this.horizontal())
            return { width: this.gutterSize + 'px' };
        else
            return { height: this.gutterSize + 'px' };
    }
    horizontal() {
        return this.layout === 'horizontal';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Splitter, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: Splitter, selector: "p-splitter", inputs: { styleClass: "styleClass", panelStyleClass: "panelStyleClass", style: "style", panelStyle: "panelStyle", stateStorage: "stateStorage", stateKey: "stateKey", layout: "layout", gutterSize: ["gutterSize", "gutterSize", numberAttribute], step: ["step", "step", numberAttribute], minSizes: ["minSizes", "minSizes", numberAttribute], panelSizes: "panelSizes" }, outputs: { onResizeEnd: "onResizeEnd", onResizeStart: "onResizeStart" }, host: { properties: { "class.p-splitter-panel-nested": "nested" }, classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" [attr.data-pc-name]="'splitter'" [attr.data-p-gutter-resizing]="false" [attr.data-pc-section]="'root'">
            <ng-template ngFor let-panel [ngForOf]="panels" let-i="index">
                <div [ngClass]="panelContainerClass()" [class]="panelStyleClass" [ngStyle]="panelStyle" tabindex="-1" [attr.data-pc-name]="'splitter'" [attr.data-pc-section]="'root'">
                    <ng-container *ngTemplateOutlet="panel"></ng-container>
                </div>
                <div
                    *ngIf="i !== panels.length - 1"
                    class="p-splitter-gutter"
                    role="separator"
                    tabindex="-1"
                    (mousedown)="onGutterMouseDown($event, i)"
                    (touchstart)="onGutterTouchStart($event, i)"
                    (touchmove)="onGutterTouchMove($event)"
                    (touchend)="onGutterTouchEnd($event, i)"
                    [attr.data-p-gutter-resizing]="false"
                    [attr.data-pc-section]="'gutter'"
                >
                    <div
                        class="p-splitter-gutter-handle"
                        tabindex="0"
                        [ngStyle]="gutterStyle()"
                        [attr.aria-orientation]="layout"
                        [attr.aria-valuenow]="prevSize"
                        [attr.data-pc-section]="'gutterhandle'"
                        (keyup)="onGutterKeyUp($event)"
                        (keydown)="onGutterKeyDown($event, i)"
                    ></div>
                </div>
            </ng-template>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-splitter{display:flex;flex-wrap:nowrap}.p-splitter-vertical{flex-direction:column}.p-splitter-panel{flex-grow:1}.p-splitter-panel-nested{display:flex;min-width:0}.p-splitter-panel p-splitter{flex-grow:1}.p-splitter-panel .p-splitter{flex-grow:1;border:0 none}.p-splitter-gutter{flex-grow:0;flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:col-resize}.p-splitter-horizontal.p-splitter-resizing{cursor:col-resize;user-select:none}.p-splitter-horizontal>.p-splitter-gutter>.p-splitter-gutter-handle{height:24px;width:100%}.p-splitter-horizontal>.p-splitter-gutter{cursor:col-resize}.p-splitter-vertical.p-splitter-resizing{cursor:row-resize;user-select:none}.p-splitter-vertical>.p-splitter-gutter{cursor:row-resize}.p-splitter-vertical>.p-splitter-gutter>.p-splitter-gutter-handle{width:24px;height:100%}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Splitter, decorators: [{
            type: Component,
            args: [{ selector: 'p-splitter', template: `
        <div #container [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" [attr.data-pc-name]="'splitter'" [attr.data-p-gutter-resizing]="false" [attr.data-pc-section]="'root'">
            <ng-template ngFor let-panel [ngForOf]="panels" let-i="index">
                <div [ngClass]="panelContainerClass()" [class]="panelStyleClass" [ngStyle]="panelStyle" tabindex="-1" [attr.data-pc-name]="'splitter'" [attr.data-pc-section]="'root'">
                    <ng-container *ngTemplateOutlet="panel"></ng-container>
                </div>
                <div
                    *ngIf="i !== panels.length - 1"
                    class="p-splitter-gutter"
                    role="separator"
                    tabindex="-1"
                    (mousedown)="onGutterMouseDown($event, i)"
                    (touchstart)="onGutterTouchStart($event, i)"
                    (touchmove)="onGutterTouchMove($event)"
                    (touchend)="onGutterTouchEnd($event, i)"
                    [attr.data-p-gutter-resizing]="false"
                    [attr.data-pc-section]="'gutter'"
                >
                    <div
                        class="p-splitter-gutter-handle"
                        tabindex="0"
                        [ngStyle]="gutterStyle()"
                        [attr.aria-orientation]="layout"
                        [attr.aria-valuenow]="prevSize"
                        [attr.data-pc-section]="'gutterhandle'"
                        (keyup)="onGutterKeyUp($event)"
                        (keydown)="onGutterKeyDown($event, i)"
                    ></div>
                </div>
            </ng-template>
        </div>
    `, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'p-element',
                        '[class.p-splitter-panel-nested]': 'nested'
                    }, styles: ["@layer primeng{.p-splitter{display:flex;flex-wrap:nowrap}.p-splitter-vertical{flex-direction:column}.p-splitter-panel{flex-grow:1}.p-splitter-panel-nested{display:flex;min-width:0}.p-splitter-panel p-splitter{flex-grow:1}.p-splitter-panel .p-splitter{flex-grow:1;border:0 none}.p-splitter-gutter{flex-grow:0;flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:col-resize}.p-splitter-horizontal.p-splitter-resizing{cursor:col-resize;user-select:none}.p-splitter-horizontal>.p-splitter-gutter>.p-splitter-gutter-handle{height:24px;width:100%}.p-splitter-horizontal>.p-splitter-gutter{cursor:col-resize}.p-splitter-vertical.p-splitter-resizing{cursor:row-resize;user-select:none}.p-splitter-vertical>.p-splitter-gutter{cursor:row-resize}.p-splitter-vertical>.p-splitter-gutter>.p-splitter-gutter-handle{width:24px;height:100%}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], propDecorators: { styleClass: [{
                type: Input
            }], panelStyleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], panelStyle: [{
                type: Input
            }], stateStorage: [{
                type: Input
            }], stateKey: [{
                type: Input
            }], layout: [{
                type: Input
            }], gutterSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], step: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], minSizes: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], panelSizes: [{
                type: Input
            }], onResizeEnd: [{
                type: Output
            }], onResizeStart: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container', { static: false }]
            }] } });
export class SplitterModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SplitterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: SplitterModule, declarations: [Splitter], imports: [CommonModule], exports: [Splitter, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SplitterModule, imports: [CommonModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SplitterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Splitter, SharedModule],
                    declarations: [Splitter]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc3BsaXR0ZXIvc3BsaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsdUJBQXVCLEVBQXFCLFNBQVMsRUFBRSxlQUFlLEVBQWMsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQXdCLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcFAsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBR3pDOzs7R0FHRztBQTJDSCxNQUFNLE9BQU8sUUFBUTtJQWdJcUI7SUFBaUQ7SUFBeUI7SUFBNEI7SUFBK0I7SUEvSDNLOzs7T0FHRztJQUNNLFVBQVUsQ0FBcUI7SUFDeEM7OztPQUdHO0lBQ00sZUFBZSxDQUFxQjtJQUM3Qzs7O09BR0c7SUFDTSxLQUFLLENBQThDO0lBQzVEOzs7T0FHRztJQUNNLFVBQVUsQ0FBOEM7SUFDakU7OztPQUdHO0lBQ00sWUFBWSxHQUF1QixTQUFTLENBQUM7SUFDdEQ7OztPQUdHO0lBQ00sUUFBUSxHQUE4QixJQUFJLENBQUM7SUFDcEQ7OztPQUdHO0lBQ00sTUFBTSxHQUF1QixZQUFZLENBQUM7SUFDbkQ7OztPQUdHO0lBQ29DLFVBQVUsR0FBVyxDQUFDLENBQUM7SUFDOUQ7OztPQUdHO0lBQ29DLElBQUksR0FBVyxDQUFDLENBQUM7SUFDeEQ7OztPQUdHO0lBQ29DLFFBQVEsR0FBYSxFQUFFLENBQUM7SUFDL0Q7OztPQUdHO0lBQ0gsSUFBYSxVQUFVO1FBQ25C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T0FBTyxjQUFjO3VHQUFkLGNBQWM7d0dBQWQsY0FBYyxpQkFwZmQsUUFBUSxhQWdmUCxZQUFZLGFBaGZiLFFBQVEsRUFpZkcsWUFBWTt3R0FHdkIsY0FBYyxZQUpiLFlBQVksRUFDRixZQUFZOzsyRkFHdkIsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7b0JBQ2pDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztpQkFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE5nTW9kdWxlLCBPdXRwdXQsIFBMQVRGT1JNX0lELCBRdWVyeUxpc3QsIFJlbmRlcmVyMiwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiwgbnVtYmVyQXR0cmlidXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgTnVsbGFibGUsIFZvaWRMaXN0ZW5lciB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQgeyBTcGxpdHRlclJlc2l6ZUVuZEV2ZW50LCBTcGxpdHRlclJlc2l6ZVN0YXJ0RXZlbnQgfSBmcm9tICcuL3NwbGl0dGVyLmludGVyZmFjZSc7XG4vKipcbiAqIFNwbGl0dGVyIGlzIHV0aWxpemVkIHRvIHNlcGFyYXRlIGFuZCByZXNpemUgcGFuZWxzLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXNwbGl0dGVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ3NwbGl0dGVyJ1wiIFthdHRyLmRhdGEtcC1ndXR0ZXItcmVzaXppbmddPVwiZmFsc2VcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3Jvb3QnXCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXBhbmVsIFtuZ0Zvck9mXT1cInBhbmVsc1wiIGxldC1pPVwiaW5kZXhcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInBhbmVsQ29udGFpbmVyQ2xhc3MoKVwiIFtjbGFzc109XCJwYW5lbFN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJwYW5lbFN0eWxlXCIgdGFiaW5kZXg9XCItMVwiIFthdHRyLmRhdGEtcGMtbmFtZV09XCInc3BsaXR0ZXInXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyb290J1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwicGFuZWxcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiaSAhPT0gcGFuZWxzLmxlbmd0aCAtIDFcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtc3BsaXR0ZXItZ3V0dGVyXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cInNlcGFyYXRvclwiXG4gICAgICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uR3V0dGVyTW91c2VEb3duKCRldmVudCwgaSlcIlxuICAgICAgICAgICAgICAgICAgICAodG91Y2hzdGFydCk9XCJvbkd1dHRlclRvdWNoU3RhcnQoJGV2ZW50LCBpKVwiXG4gICAgICAgICAgICAgICAgICAgICh0b3VjaG1vdmUpPVwib25HdXR0ZXJUb3VjaE1vdmUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICh0b3VjaGVuZCk9XCJvbkd1dHRlclRvdWNoRW5kKCRldmVudCwgaSlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXAtZ3V0dGVyLXJlc2l6aW5nXT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidndXR0ZXInXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zcGxpdHRlci1ndXR0ZXItaGFuZGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJndXR0ZXJTdHlsZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtb3JpZW50YXRpb25dPVwibGF5b3V0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwicHJldlNpemVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidndXR0ZXJoYW5kbGUnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cCk9XCJvbkd1dHRlcktleVVwKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25HdXR0ZXJLZXlEb3duKCRldmVudCwgaSlcIlxuICAgICAgICAgICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgc3R5bGVVcmxzOiBbJy4vc3BsaXR0ZXIuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCcsXG4gICAgICAgICdbY2xhc3MucC1zcGxpdHRlci1wYW5lbC1uZXN0ZWRdJzogJ25lc3RlZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgcGFuZWwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcGFuZWxTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBwYW5lbC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwYW5lbFN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgd2hlcmUgYSBzdGF0ZWZ1bCBzcGxpdHRlciBrZWVwcyBpdHMgc3RhdGUsIHZhbGlkIHZhbHVlcyBhcmUgJ3Nlc3Npb24nIGZvciBzZXNzaW9uU3RvcmFnZSBhbmQgJ2xvY2FsJyBmb3IgbG9jYWxTdG9yYWdlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0YXRlU3RvcmFnZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gJ3Nlc3Npb24nO1xuICAgIC8qKlxuICAgICAqIFN0b3JhZ2UgaWRlbnRpZmllciBvZiBhIHN0YXRlZnVsIFNwbGl0dGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0YXRlS2V5OiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBPcmllbnRhdGlvbiBvZiB0aGUgcGFuZWxzLiBWYWxpZCB2YWx1ZXMgYXJlICdob3Jpem9udGFsJyBhbmQgJ3ZlcnRpY2FsJy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsYXlvdXQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9ICdob3Jpem9udGFsJztcbiAgICAvKipcbiAgICAgKiBTaXplIG9mIHRoZSBkaXZpZGVyIGluIHBpeGVscy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBndXR0ZXJTaXplOiBudW1iZXIgPSA0O1xuICAgIC8qKlxuICAgICAqIFN0ZXAgZmFjdG9yIHRvIGluY3JlbWVudC9kZWNyZW1lbnQgdGhlIHNpemUgb2YgdGhlIHBhbmVscyB3aGlsZSBwcmVzc2luZyB0aGUgYXJyb3cga2V5cy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBzdGVwOiBudW1iZXIgPSA1O1xuICAgIC8qKlxuICAgICAqIE1pbmltdW0gc2l6ZSBvZiB0aGUgZWxlbWVudHMgcmVsYXRpdmUgdG8gMTAwJS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBtaW5TaXplczogbnVtYmVyW10gPSBbXTtcbiAgICAvKipcbiAgICAgKiBTaXplIG9mIHRoZSBlbGVtZW50cyByZWxhdGl2ZSB0byAxMDAlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBwYW5lbFNpemVzKCk6IG51bWJlcltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhbmVsU2l6ZXM7XG4gICAgfVxuICAgIHNldCBwYW5lbFNpemVzKHZhbDogbnVtYmVyW10pIHtcbiAgICAgICAgdGhpcy5fcGFuZWxTaXplcyA9IHZhbDtcblxuICAgICAgICBpZiAodGhpcy5lbCAmJiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5wYW5lbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gWy4uLnRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlbl0uZmlsdGVyKChjaGlsZCkgPT4gRG9tSGFuZGxlci5oYXNDbGFzcyhjaGlsZCwgJ3Atc3BsaXR0ZXItcGFuZWwnKSk7XG4gICAgICAgICAgICBsZXQgX3BhbmVsU2l6ZXMgPSBbXTtcblxuICAgICAgICAgICAgdGhpcy5wYW5lbHMubWFwKChwYW5lbCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwYW5lbEluaXRpYWxTaXplID0gdGhpcy5wYW5lbFNpemVzLmxlbmd0aCAtIDEgPj0gaSA/IHRoaXMucGFuZWxTaXplc1tpXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IHBhbmVsU2l6ZSA9IHBhbmVsSW5pdGlhbFNpemUgfHwgMTAwIC8gdGhpcy5wYW5lbHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIF9wYW5lbFNpemVzW2ldID0gcGFuZWxTaXplO1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldLnN0eWxlLmZsZXhCYXNpcyA9ICdjYWxjKCcgKyBwYW5lbFNpemUgKyAnJSAtICcgKyAodGhpcy5wYW5lbHMubGVuZ3RoIC0gMSkgKiB0aGlzLmd1dHRlclNpemUgKyAncHgpJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHJlc2l6ZSBlbmRzLlxuICAgICAqIEBwYXJhbSB7U3BsaXR0ZXJSZXNpemVFbmRFdmVudH0gZXZlbnQgLSBDdXN0b20gcGFuZWwgcmVzaXplIGVuZCBldmVudFxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblJlc2l6ZUVuZDogRXZlbnRFbWl0dGVyPFNwbGl0dGVyUmVzaXplRW5kRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTcGxpdHRlclJlc2l6ZUVuZEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHJlc2l6ZSBzdGFydHMuXG4gICAgICogQHBhcmFtIHtTcGxpdHRlclJlc2l6ZVN0YXJ0RXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHBhbmVsIHJlc2l6ZSBzdGFydCBldmVudFxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblJlc2l6ZVN0YXJ0OiBFdmVudEVtaXR0ZXI8U3BsaXR0ZXJSZXNpemVTdGFydEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U3BsaXR0ZXJSZXNpemVTdGFydEV2ZW50PigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXMhOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT47XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgY29udGFpbmVyVmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIG5lc3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcGFuZWxzOiBhbnlbXSA9IFtdO1xuXG4gICAgZHJhZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG1vdXNlTW92ZUxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBtb3VzZVVwTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIHRvdWNoTW92ZUxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICB0b3VjaEVuZExpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBzaXplOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgZ3V0dGVyRWxlbWVudDogTnVsbGFibGU8RWxlbWVudFJlZiB8IEhUTUxFbGVtZW50PjtcblxuICAgIHN0YXJ0UG9zOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgcHJldlBhbmVsRWxlbWVudDogTnVsbGFibGU8RWxlbWVudFJlZiB8IEhUTUxFbGVtZW50PjtcblxuICAgIG5leHRQYW5lbEVsZW1lbnQ6IE51bGxhYmxlPEVsZW1lbnRSZWYgfCBIVE1MRWxlbWVudD47XG5cbiAgICBuZXh0UGFuZWxTaXplOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgcHJldlBhbmVsU2l6ZTogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIF9wYW5lbFNpemVzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgcHJldlBhbmVsSW5kZXg6IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICB0aW1lcjogYW55O1xuXG4gICAgcHJldlNpemU6IGFueTtcblxuICAgIHByaXZhdGUgd2luZG93OiBXaW5kb3c7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCwgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLndpbmRvdyA9IHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcgYXMgV2luZG93O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm5lc3RlZCA9IHRoaXMuaXNOZXN0ZWQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdwYW5lbCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFuZWxzLnB1c2goaXRlbS50ZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFuZWxzLnB1c2goaXRlbS50ZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYW5lbHMgJiYgdGhpcy5wYW5lbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkID0gdGhpcy5yZXN0b3JlU3RhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIWluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZHJlbiA9IFsuLi50aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5dLmZpbHRlcigoY2hpbGQpID0+IERvbUhhbmRsZXIuaGFzQ2xhc3MoY2hpbGQsICdwLXNwbGl0dGVyLXBhbmVsJykpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgX3BhbmVsU2l6ZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVscy5tYXAoKHBhbmVsLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFuZWxJbml0aWFsU2l6ZSA9IHRoaXMucGFuZWxTaXplcy5sZW5ndGggLSAxID49IGkgPyB0aGlzLnBhbmVsU2l6ZXNbaV0gOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhbmVsU2l6ZSA9IHBhbmVsSW5pdGlhbFNpemUgfHwgMTAwIC8gdGhpcy5wYW5lbHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3BhbmVsU2l6ZXNbaV0gPSBwYW5lbFNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbltpXS5zdHlsZS5mbGV4QmFzaXMgPSAnY2FsYygnICsgcGFuZWxTaXplICsgJyUgLSAnICsgKHRoaXMucGFuZWxzLmxlbmd0aCAtIDEpICogKHRoaXMuZ3V0dGVyU2l6ZSBhcyBudW1iZXIpICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhbmVsU2l6ZXMgPSBfcGFuZWxTaXplcztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZTaXplID0gcGFyc2VGbG9hdChfcGFuZWxTaXplc1swXSkudG9GaXhlZCg0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNpemVTdGFydChldmVudDogVG91Y2hFdmVudCB8IE1vdXNlRXZlbnQsIGluZGV4OiBudW1iZXIsIGlzS2V5RG93bj86IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5ndXR0ZXJFbGVtZW50ID0gKGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpIHx8IChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuaG9yaXpvbnRhbCgpID8gRG9tSGFuZGxlci5nZXRXaWR0aCgodGhpcy5jb250YWluZXJWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudCkgOiBEb21IYW5kbGVyLmdldEhlaWdodCgodGhpcy5jb250YWluZXJWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgaWYgKCFpc0tleURvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGFydFBvcyA9IHRoaXMuaG9yaXpvbnRhbCgpID8gKGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCA/IGV2ZW50LnBhZ2VYIDogZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVgpIDogZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ID8gZXZlbnQucGFnZVkgOiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJldlBhbmVsRWxlbWVudCA9IHRoaXMuZ3V0dGVyRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICB0aGlzLm5leHRQYW5lbEVsZW1lbnQgPSB0aGlzLmd1dHRlckVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAgIGlmIChpc0tleURvd24pIHtcbiAgICAgICAgICAgIHRoaXMucHJldlBhbmVsU2l6ZSA9IHRoaXMuaG9yaXpvbnRhbCgpID8gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMucHJldlBhbmVsRWxlbWVudCwgdHJ1ZSkgOiBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMucHJldlBhbmVsRWxlbWVudCwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLm5leHRQYW5lbFNpemUgPSB0aGlzLmhvcml6b250YWwoKSA/IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLm5leHRQYW5lbEVsZW1lbnQsIHRydWUpIDogRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLm5leHRQYW5lbEVsZW1lbnQsIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcmV2UGFuZWxTaXplID0gKDEwMCAqICh0aGlzLmhvcml6b250YWwoKSA/IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLnByZXZQYW5lbEVsZW1lbnQsIHRydWUpIDogRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLnByZXZQYW5lbEVsZW1lbnQsIHRydWUpKSkgLyB0aGlzLnNpemU7XG4gICAgICAgICAgICB0aGlzLm5leHRQYW5lbFNpemUgPSAoMTAwICogKHRoaXMuaG9yaXpvbnRhbCgpID8gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMubmV4dFBhbmVsRWxlbWVudCwgdHJ1ZSkgOiBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMubmV4dFBhbmVsRWxlbWVudCwgdHJ1ZSkpKSAvIHRoaXMuc2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJldlBhbmVsSW5kZXggPSBpbmRleDtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmd1dHRlckVsZW1lbnQsICdwLXNwbGl0dGVyLWd1dHRlci1yZXNpemluZycpO1xuICAgICAgICB0aGlzLmd1dHRlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXAtZ3V0dGVyLXJlc2l6aW5nJywgJ3RydWUnKTtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcygodGhpcy5jb250YWluZXJWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudCwgJ3Atc3BsaXR0ZXItcmVzaXppbmcnKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcC1yZXNpemluZycsICd0cnVlJyk7XG4gICAgICAgIHRoaXMub25SZXNpemVTdGFydC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHNpemVzOiB0aGlzLl9wYW5lbFNpemVzIGFzIG51bWJlcltdIH0pO1xuICAgIH1cblxuICAgIG9uUmVzaXplKGV2ZW50OiBNb3VzZUV2ZW50LCBzdGVwPzogbnVtYmVyLCBpc0tleURvd24/OiBib29sZWFuKSB7XG4gICAgICAgIGxldCBuZXdQb3MsIG5ld1ByZXZQYW5lbFNpemUsIG5ld05leHRQYW5lbFNpemU7XG5cbiAgICAgICAgaWYgKGlzS2V5RG93bikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgbmV3UHJldlBhbmVsU2l6ZSA9ICgxMDAgKiAodGhpcy5wcmV2UGFuZWxTaXplICsgc3RlcCkpIC8gdGhpcy5zaXplO1xuICAgICAgICAgICAgICAgIG5ld05leHRQYW5lbFNpemUgPSAoMTAwICogKHRoaXMubmV4dFBhbmVsU2l6ZSAtIHN0ZXApKSAvIHRoaXMuc2l6ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3UHJldlBhbmVsU2l6ZSA9ICgxMDAgKiAodGhpcy5wcmV2UGFuZWxTaXplIC0gc3RlcCkpIC8gdGhpcy5zaXplO1xuICAgICAgICAgICAgICAgIG5ld05leHRQYW5lbFNpemUgPSAoMTAwICogKHRoaXMubmV4dFBhbmVsU2l6ZSArIHN0ZXApKSAvIHRoaXMuc2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b250YWwoKSkgbmV3UG9zID0gKGV2ZW50LnBhZ2VYICogMTAwKSAvIHRoaXMuc2l6ZSAtICh0aGlzLnN0YXJ0UG9zICogMTAwKSAvIHRoaXMuc2l6ZTtcbiAgICAgICAgICAgIGVsc2UgbmV3UG9zID0gKGV2ZW50LnBhZ2VZICogMTAwKSAvIHRoaXMuc2l6ZSAtICh0aGlzLnN0YXJ0UG9zICogMTAwKSAvIHRoaXMuc2l6ZTtcblxuICAgICAgICAgICAgbmV3UHJldlBhbmVsU2l6ZSA9ICh0aGlzLnByZXZQYW5lbFNpemUgYXMgbnVtYmVyKSArIG5ld1BvcztcbiAgICAgICAgICAgIG5ld05leHRQYW5lbFNpemUgPSAodGhpcy5uZXh0UGFuZWxTaXplIGFzIG51bWJlcikgLSBuZXdQb3M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZXZTaXplID0gcGFyc2VGbG9hdChuZXdQcmV2UGFuZWxTaXplKS50b0ZpeGVkKDQpO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlUmVzaXplKG5ld1ByZXZQYW5lbFNpemUsIG5ld05leHRQYW5lbFNpemUpKSB7XG4gICAgICAgICAgICAodGhpcy5wcmV2UGFuZWxFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5mbGV4QmFzaXMgPSAnY2FsYygnICsgbmV3UHJldlBhbmVsU2l6ZSArICclIC0gJyArICh0aGlzLnBhbmVscy5sZW5ndGggLSAxKSAqIHRoaXMuZ3V0dGVyU2l6ZSArICdweCknO1xuICAgICAgICAgICAgKHRoaXMubmV4dFBhbmVsRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZmxleEJhc2lzID0gJ2NhbGMoJyArIG5ld05leHRQYW5lbFNpemUgKyAnJSAtICcgKyAodGhpcy5wYW5lbHMubGVuZ3RoIC0gMSkgKiB0aGlzLmd1dHRlclNpemUgKyAncHgpJztcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsU2l6ZXNbdGhpcy5wcmV2UGFuZWxJbmRleCBhcyBudW1iZXJdID0gbmV3UHJldlBhbmVsU2l6ZTtcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsU2l6ZXNbKHRoaXMucHJldlBhbmVsSW5kZXggYXMgbnVtYmVyKSArIDFdID0gbmV3TmV4dFBhbmVsU2l6ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2l6ZUVuZChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblJlc2l6ZUVuZC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHNpemVzOiB0aGlzLl9wYW5lbFNpemVzIH0pO1xuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuZ3V0dGVyRWxlbWVudCwgJ3Atc3BsaXR0ZXItZ3V0dGVyLXJlc2l6aW5nJyk7XG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoKHRoaXMuY29udGFpbmVyVmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQsICdwLXNwbGl0dGVyLXJlc2l6aW5nJyk7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBvbkd1dHRlck1vdXNlRG93bihldmVudDogTW91c2VFdmVudCwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnJlc2l6ZVN0YXJ0KGV2ZW50LCBpbmRleCk7XG4gICAgICAgIHRoaXMuYmluZE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgb25HdXR0ZXJUb3VjaFN0YXJ0KGV2ZW50OiBUb3VjaEV2ZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChldmVudC5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZVN0YXJ0KGV2ZW50LCBpbmRleCk7XG4gICAgICAgICAgICB0aGlzLmJpbmRUb3VjaExpc3RlbmVycygpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25HdXR0ZXJUb3VjaE1vdmUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vblJlc2l6ZShldmVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25HdXR0ZXJUb3VjaEVuZChldmVudDogVG91Y2hFdmVudCkge1xuICAgICAgICB0aGlzLnJlc2l6ZUVuZChldmVudCk7XG4gICAgICAgIHRoaXMudW5iaW5kVG91Y2hMaXN0ZW5lcnMoKTtcblxuICAgICAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSkgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICByZXBlYXQoZXZlbnQsIGluZGV4LCBzdGVwKSB7XG4gICAgICAgIHRoaXMucmVzaXplU3RhcnQoZXZlbnQsIGluZGV4LCB0cnVlKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZShldmVudCwgc3RlcCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc2V0VGltZXIoZXZlbnQsIGluZGV4LCBzdGVwKSB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgaW5kZXgsIHN0ZXApO1xuICAgICAgICB9LCA0MCk7XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lcigpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uR3V0dGVyS2V5VXAoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIHRoaXMucmVzaXplRW5kKGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbkd1dHRlcktleURvd24oZXZlbnQsIGluZGV4KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0Jzoge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxheW91dCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGltZXIoZXZlbnQsIGluZGV4LCB0aGlzLnN0ZXAgKiAtMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRpbWVyKGV2ZW50LCBpbmRleCwgdGhpcy5zdGVwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0ID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGltZXIoZXZlbnQsIGluZGV4LCB0aGlzLnN0ZXAgKiAtMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUaW1lcihldmVudCwgaW5kZXgsIHRoaXMuc3RlcCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvL25vIG9wXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZVJlc2l6ZShuZXdQcmV2UGFuZWxTaXplOiBudW1iZXIsIG5ld05leHRQYW5lbFNpemU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5taW5TaXplcy5sZW5ndGggPj0gMSAmJiB0aGlzLm1pblNpemVzWzBdICYmIHRoaXMubWluU2l6ZXNbMF0gPiBuZXdQcmV2UGFuZWxTaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5taW5TaXplcy5sZW5ndGggPiAxICYmIHRoaXMubWluU2l6ZXNbMV0gJiYgdGhpcy5taW5TaXplc1sxXSA+IG5ld05leHRQYW5lbFNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGJpbmRNb3VzZUxpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vdXNlTW92ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5kb2N1bWVudCwgJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25SZXNpemUoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMubW91c2VVcExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlVXBMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZG9jdW1lbnQsICdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVFbmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kTW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZFRvdWNoTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAoIXRoaXMudG91Y2hNb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hNb3ZlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmRvY3VtZW50LCAndG91Y2htb3ZlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblJlc2l6ZShldmVudC5jaGFuZ2VkVG91Y2hlc1swXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy50b3VjaEVuZExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoRW5kTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmRvY3VtZW50LCAndG91Y2hlbmQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUVuZChldmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmRUb3VjaExpc3RlbmVycygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRNb3VzZUxpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMubW91c2VNb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubW91c2VVcExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlVXBMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5tb3VzZVVwTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kVG91Y2hMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLnRvdWNoTW92ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoTW92ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLnRvdWNoTW92ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRvdWNoRW5kTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hFbmRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy50b3VjaEVuZExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2l6ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhcnRQb3MgPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZQYW5lbEVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLm5leHRQYW5lbEVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZQYW5lbFNpemUgPSBudWxsO1xuICAgICAgICB0aGlzLm5leHRQYW5lbFNpemUgPSBudWxsO1xuICAgICAgICB0aGlzLmd1dHRlckVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZQYW5lbEluZGV4ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpc05lc3RlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgd2hpbGUgKHBhcmVudCAmJiAhRG9tSGFuZGxlci5oYXNDbGFzcyhwYXJlbnQsICdwLXNwbGl0dGVyJykpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhcmVudCAhPT0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzU3RhdGVmdWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlS2V5ICE9IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0U3RvcmFnZSgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZVN0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdsb2NhbCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpbmRvdy5sb2NhbFN0b3JhZ2U7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzZXNzaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2luZG93LnNlc3Npb25TdG9yYWdlO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuc3RhdGVTdG9yYWdlICsgJyBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdGhlIHN0YXRlIHN0b3JhZ2UsIHN1cHBvcnRlZCB2YWx1ZXMgYXJlIFwibG9jYWxcIiBhbmQgXCJzZXNzaW9uXCIuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0b3JhZ2UgaXMgbm90IGEgYXZhaWxhYmxlIGJ5IGRlZmF1bHQgb24gdGhlIHNlcnZlci4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmVTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5nZXRTdG9yYWdlKCkuc2V0SXRlbSh0aGlzLnN0YXRlS2V5IGFzIHN0cmluZywgSlNPTi5zdHJpbmdpZnkodGhpcy5fcGFuZWxTaXplcykpO1xuICAgIH1cblxuICAgIHJlc3RvcmVTdGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZSgpO1xuICAgICAgICBjb25zdCBzdGF0ZVN0cmluZyA9IHN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnN0YXRlS2V5IGFzIHN0cmluZyk7XG5cbiAgICAgICAgaWYgKHN0YXRlU3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9wYW5lbFNpemVzID0gSlNPTi5wYXJzZShzdGF0ZVN0cmluZyk7XG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSBbLi4uKHRoaXMuY29udGFpbmVyVmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5dLmZpbHRlcigoY2hpbGQpID0+IERvbUhhbmRsZXIuaGFzQ2xhc3MoY2hpbGQsICdwLXNwbGl0dGVyLXBhbmVsJykpO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjaGlsZC5zdHlsZS5mbGV4QmFzaXMgPSAnY2FsYygnICsgdGhpcy5fcGFuZWxTaXplc1tpXSArICclIC0gJyArICh0aGlzLnBhbmVscy5sZW5ndGggLSAxKSAqIHRoaXMuZ3V0dGVyU2l6ZSArICdweCknO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnRhaW5lckNsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Atc3BsaXR0ZXIgcC1jb21wb25lbnQnOiB0cnVlLFxuICAgICAgICAgICAgJ3Atc3BsaXR0ZXItaG9yaXpvbnRhbCc6IHRoaXMubGF5b3V0ID09PSAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICAncC1zcGxpdHRlci12ZXJ0aWNhbCc6IHRoaXMubGF5b3V0ID09PSAndmVydGljYWwnXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcGFuZWxDb250YWluZXJDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLXNwbGl0dGVyLXBhbmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICdwLXNwbGl0dGVyLXBhbmVsLW5lc3RlZCc6IHRydWVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBndXR0ZXJTdHlsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbCgpKSByZXR1cm4geyB3aWR0aDogdGhpcy5ndXR0ZXJTaXplICsgJ3B4JyB9O1xuICAgICAgICBlbHNlIHJldHVybiB7IGhlaWdodDogdGhpcy5ndXR0ZXJTaXplICsgJ3B4JyB9O1xuICAgIH1cblxuICAgIGhvcml6b250YWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxheW91dCA9PT0gJ2hvcml6b250YWwnO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbU3BsaXR0ZXIsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbU3BsaXR0ZXJdXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0dGVyTW9kdWxlIHt9XG4iXX0=