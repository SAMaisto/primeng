import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, ViewEncapsulation, booleanAttribute, numberAttribute } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { TimesIcon } from 'primeng/icons/times';
import { RippleModule } from 'primeng/ripple';
import { ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/ripple";
const showAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{transition}}')]);
const hideAnimation = animation([animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))]);
/**
 * Sidebar is a panel component displayed as an overlay at the edges of the screen.
 * @group Components
 */
export class Sidebar {
    document;
    el;
    renderer;
    cd;
    config;
    /**
     *  Target element to attach the dialog, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * Whether to block scrolling of the document when sidebar is active.
     * @group Props
     */
    blockScroll = false;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Aria label of the close icon.
     * @group Props
     */
    ariaCloseLabel;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = 0;
    /**
     * Whether an overlay mask is displayed behind the sidebar.
     * @group Props
     */
    modal = true;
    /**
     * Whether to dismiss sidebar on click of the mask.
     * @group Props
     */
    dismissible = true;
    /**
     * Whether to display the close icon.
     * @group Props
     */
    showCloseIcon = true;
    /**
     * Specifies if pressing escape key should hide the sidebar.
     * @group Props
     */
    closeOnEscape = true;
    /**
     * Transition options of the animation.
     * @group Props
     */
    transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Specifies the visibility of the dialog.
     * @group Props
     */
    get visible() {
        return this._visible;
    }
    set visible(val) {
        this._visible = val;
    }
    /**
     * Specifies the position of the sidebar, valid values are "left", "right", "bottom" and "top".
     * @group Props
     */
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
        switch (value) {
            case 'left':
                this.transformOptions = 'translate3d(-100%, 0px, 0px)';
                break;
            case 'right':
                this.transformOptions = 'translate3d(100%, 0px, 0px)';
                break;
            case 'bottom':
                this.transformOptions = 'translate3d(0px, 100%, 0px)';
                break;
            case 'top':
                this.transformOptions = 'translate3d(0px, -100%, 0px)';
                break;
        }
    }
    /**
     * Adds a close icon to the header to hide the dialog.
     * @group Props
     */
    get fullScreen() {
        return this._fullScreen;
    }
    set fullScreen(value) {
        this._fullScreen = value;
        if (value)
            this.transformOptions = 'none';
    }
    templates;
    /**
     * Callback to invoke when dialog is shown.
     * @group Emits
     */
    onShow = new EventEmitter();
    /**
     * Callback to invoke when dialog is hidden.
     * @group Emits
     */
    onHide = new EventEmitter();
    /**
     * Callback to invoke when dialog visibility is changed.
     * @param {boolean} value - Visible value.
     * @group Emits
     */
    visibleChange = new EventEmitter();
    initialized;
    _visible;
    _position = 'left';
    _fullScreen = false;
    container;
    transformOptions = 'translate3d(-100%, 0px, 0px)';
    mask;
    maskClickListener;
    documentEscapeListener;
    animationEndListener;
    contentTemplate;
    headerTemplate;
    footerTemplate;
    closeIconTemplate;
    headlessTemplate;
    constructor(document, el, renderer, cd, config) {
        this.document = document;
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.config = config;
    }
    ngAfterViewInit() {
        this.initialized = true;
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;
                case 'headless':
                    this.headlessTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    onKeyDown(event) {
        if (event.code === 'Escape') {
            this.hide(false);
        }
    }
    show() {
        if (this.autoZIndex) {
            ZIndexUtils.set('modal', this.container, this.baseZIndex || this.config.zIndex.modal);
        }
        if (this.modal) {
            this.enableModality();
        }
        this.onShow.emit({});
        this.visibleChange.emit(true);
    }
    hide(emit = true) {
        if (emit) {
            this.onHide.emit({});
        }
        if (this.modal) {
            this.disableModality();
        }
    }
    close(event) {
        this.hide();
        this.visibleChange.emit(false);
        event.preventDefault();
    }
    enableModality() {
        if (!this.mask) {
            this.mask = this.renderer.createElement('div');
            this.renderer.setStyle(this.mask, 'zIndex', String(parseInt(this.container.style.zIndex) - 1));
            DomHandler.addMultipleClasses(this.mask, 'p-component-overlay p-sidebar-mask p-component-overlay p-component-overlay-enter');
            if (this.dismissible) {
                this.maskClickListener = this.renderer.listen(this.mask, 'click', (event) => {
                    if (this.dismissible) {
                        this.close(event);
                    }
                });
            }
            this.renderer.appendChild(this.document.body, this.mask);
            if (this.blockScroll) {
                DomHandler.blockBodyScroll();
            }
        }
    }
    disableModality() {
        if (this.mask) {
            DomHandler.addClass(this.mask, 'p-component-overlay-leave');
            this.animationEndListener = this.renderer.listen(this.mask, 'animationend', this.destroyModal.bind(this));
        }
    }
    destroyModal() {
        this.unbindMaskClickListener();
        if (this.mask) {
            this.renderer.removeChild(this.document.body, this.mask);
        }
        if (this.blockScroll) {
            DomHandler.unblockBodyScroll();
        }
        this.unbindAnimationEndListener();
        this.mask = null;
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.appendContainer();
                this.show();
                if (this.closeOnEscape) {
                    this.bindDocumentEscapeListener();
                }
                break;
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                this.hide(false);
                ZIndexUtils.clear(this.container);
                this.unbindGlobalListeners();
                break;
        }
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                this.renderer.appendChild(this.document.body, this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }
    bindDocumentEscapeListener() {
        const documentTarget = this.el ? this.el.nativeElement.ownerDocument : this.document;
        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt(this.container.style.zIndex) === ZIndexUtils.get(this.container)) {
                    this.close(event);
                }
            }
        });
    }
    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }
    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }
    unbindGlobalListeners() {
        this.unbindMaskClickListener();
        this.unbindDocumentEscapeListener();
    }
    unbindAnimationEndListener() {
        if (this.animationEndListener && this.mask) {
            this.animationEndListener();
            this.animationEndListener = null;
        }
    }
    ngOnDestroy() {
        this.initialized = false;
        if (this.visible && this.modal) {
            this.destroyModal();
        }
        if (this.appendTo && this.container) {
            this.renderer.appendChild(this.el.nativeElement, this.container);
        }
        if (this.container && this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }
        this.container = null;
        this.unbindGlobalListeners();
        this.unbindAnimationEndListener();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Sidebar, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: Sidebar, selector: "p-sidebar", inputs: { appendTo: "appendTo", blockScroll: ["blockScroll", "blockScroll", booleanAttribute], style: "style", styleClass: "styleClass", ariaCloseLabel: "ariaCloseLabel", autoZIndex: ["autoZIndex", "autoZIndex", booleanAttribute], baseZIndex: ["baseZIndex", "baseZIndex", numberAttribute], modal: ["modal", "modal", booleanAttribute], dismissible: ["dismissible", "dismissible", booleanAttribute], showCloseIcon: ["showCloseIcon", "showCloseIcon", booleanAttribute], closeOnEscape: ["closeOnEscape", "closeOnEscape", booleanAttribute], transitionOptions: "transitionOptions", visible: "visible", position: "position", fullScreen: "fullScreen" }, outputs: { onShow: "onShow", onHide: "onHide", visibleChange: "visibleChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div
            #container
            [ngClass]="{
                'p-sidebar': true,
                'p-sidebar-active': visible,
                'p-sidebar-left': position === 'left' && !fullScreen,
                'p-sidebar-right': position === 'right' && !fullScreen,
                'p-sidebar-top': position === 'top' && !fullScreen,
                'p-sidebar-bottom': position === 'bottom' && !fullScreen,
                'p-sidebar-full': fullScreen
            }"
            *ngIf="visible"
            [@panelState]="{ value: 'visible', params: { transform: transformOptions, transition: transitionOptions } }"
            (@panelState.start)="onAnimationStart($event)"
            (@panelState.done)="onAnimationEnd($event)"
            [ngStyle]="style"
            [class]="styleClass"
            role="complementary"
            [attr.data-pc-name]="'sidebar'"
            [attr.data-pc-section]="'root'"
            (keydown)="onKeyDown($event)"
        >
            <ng-container *ngIf="headlessTemplate; else notHeadless">
                <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
            </ng-container>
            <ng-template #notHeadless>
                <div class="p-sidebar-header" [attr.data-pc-section]="'header'">
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <button
                        type="button"
                        class="p-sidebar-close p-sidebar-icon p-link"
                        (click)="close($event)"
                        (keydown.enter)="close($event)"
                        [attr.aria-label]="ariaCloseLabel"
                        *ngIf="showCloseIcon"
                        pRipple
                        [attr.data-pc-section]="'closebutton'"
                        [attr.data-pc-group-section]="'iconcontainer'"
                    >
                        <TimesIcon *ngIf="!closeIconTemplate" [styleClass]="'p-sidebar-close-icon'" [attr.data-pc-section]="'closeicon'" />
                        <span *ngIf="closeIconTemplate" class="p-sidebar-close-icon" [attr.data-pc-section]="'closeicon'">
                            <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                        </span>
                    </button>
                </div>
                <div class="p-sidebar-content" [attr.data-pc-section]="'content'">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
                <ng-container *ngIf="footerTemplate">
                    <div class="p-sidebar-footer" [attr.data-pc-section]="'footer'">
                        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                    </div>
                </ng-container>
            </ng-template>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-sidebar{position:fixed;transition:transform .3s;display:flex;flex-direction:column}.p-sidebar-content{position:relative;overflow-y:auto;flex-grow:1}.p-sidebar-header{display:flex;align-items:center}.p-sidebar-footer{margin-top:auto}.p-sidebar-icon{display:flex;align-items:center;justify-content:center;margin-left:auto}.p-sidebar-left{top:0;left:0;width:20rem;height:100%}.p-sidebar-right{top:0;right:0;width:20rem;height:100%}.p-sidebar-top{top:0;left:0;width:100%;height:10rem}.p-sidebar-bottom{bottom:0;left:0;width:100%;height:10rem}.p-sidebar-full{width:100%;height:100%;top:0;left:0;-webkit-transition:none;transition:none}.p-sidebar-left.p-sidebar-sm,.p-sidebar-right.p-sidebar-sm{width:20rem}.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-md{width:40rem}.p-sidebar-left.p-sidebar-lg,.p-sidebar-right.p-sidebar-lg{width:60rem}.p-sidebar-top.p-sidebar-sm,.p-sidebar-bottom.p-sidebar-sm{height:10rem}.p-sidebar-top.p-sidebar-md,.p-sidebar-bottom.p-sidebar-md{height:20rem}.p-sidebar-top.p-sidebar-lg,.p-sidebar-bottom.p-sidebar-lg{height:30rem}@media screen and (max-width: 64em){.p-sidebar-left.p-sidebar-lg,.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-lg,.p-sidebar-right.p-sidebar-md{width:20rem}}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }], animations: [trigger('panelState', [transition('void => visible', [useAnimation(showAnimation)]), transition('visible => void', [useAnimation(hideAnimation)])])], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Sidebar, decorators: [{
            type: Component,
            args: [{ selector: 'p-sidebar', template: `
        <div
            #container
            [ngClass]="{
                'p-sidebar': true,
                'p-sidebar-active': visible,
                'p-sidebar-left': position === 'left' && !fullScreen,
                'p-sidebar-right': position === 'right' && !fullScreen,
                'p-sidebar-top': position === 'top' && !fullScreen,
                'p-sidebar-bottom': position === 'bottom' && !fullScreen,
                'p-sidebar-full': fullScreen
            }"
            *ngIf="visible"
            [@panelState]="{ value: 'visible', params: { transform: transformOptions, transition: transitionOptions } }"
            (@panelState.start)="onAnimationStart($event)"
            (@panelState.done)="onAnimationEnd($event)"
            [ngStyle]="style"
            [class]="styleClass"
            role="complementary"
            [attr.data-pc-name]="'sidebar'"
            [attr.data-pc-section]="'root'"
            (keydown)="onKeyDown($event)"
        >
            <ng-container *ngIf="headlessTemplate; else notHeadless">
                <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
            </ng-container>
            <ng-template #notHeadless>
                <div class="p-sidebar-header" [attr.data-pc-section]="'header'">
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <button
                        type="button"
                        class="p-sidebar-close p-sidebar-icon p-link"
                        (click)="close($event)"
                        (keydown.enter)="close($event)"
                        [attr.aria-label]="ariaCloseLabel"
                        *ngIf="showCloseIcon"
                        pRipple
                        [attr.data-pc-section]="'closebutton'"
                        [attr.data-pc-group-section]="'iconcontainer'"
                    >
                        <TimesIcon *ngIf="!closeIconTemplate" [styleClass]="'p-sidebar-close-icon'" [attr.data-pc-section]="'closeicon'" />
                        <span *ngIf="closeIconTemplate" class="p-sidebar-close-icon" [attr.data-pc-section]="'closeicon'">
                            <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                        </span>
                    </button>
                </div>
                <div class="p-sidebar-content" [attr.data-pc-section]="'content'">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
                <ng-container *ngIf="footerTemplate">
                    <div class="p-sidebar-footer" [attr.data-pc-section]="'footer'">
                        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                    </div>
                </ng-container>
            </ng-template>
        </div>
    `, animations: [trigger('panelState', [transition('void => visible', [useAnimation(showAnimation)]), transition('visible => void', [useAnimation(hideAnimation)])])], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-sidebar{position:fixed;transition:transform .3s;display:flex;flex-direction:column}.p-sidebar-content{position:relative;overflow-y:auto;flex-grow:1}.p-sidebar-header{display:flex;align-items:center}.p-sidebar-footer{margin-top:auto}.p-sidebar-icon{display:flex;align-items:center;justify-content:center;margin-left:auto}.p-sidebar-left{top:0;left:0;width:20rem;height:100%}.p-sidebar-right{top:0;right:0;width:20rem;height:100%}.p-sidebar-top{top:0;left:0;width:100%;height:10rem}.p-sidebar-bottom{bottom:0;left:0;width:100%;height:10rem}.p-sidebar-full{width:100%;height:100%;top:0;left:0;-webkit-transition:none;transition:none}.p-sidebar-left.p-sidebar-sm,.p-sidebar-right.p-sidebar-sm{width:20rem}.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-md{width:40rem}.p-sidebar-left.p-sidebar-lg,.p-sidebar-right.p-sidebar-lg{width:60rem}.p-sidebar-top.p-sidebar-sm,.p-sidebar-bottom.p-sidebar-sm{height:10rem}.p-sidebar-top.p-sidebar-md,.p-sidebar-bottom.p-sidebar-md{height:20rem}.p-sidebar-top.p-sidebar-lg,.p-sidebar-bottom.p-sidebar-lg{height:30rem}@media screen and (max-width: 64em){.p-sidebar-left.p-sidebar-lg,.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-lg,.p-sidebar-right.p-sidebar-md{width:20rem}}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }], propDecorators: { appendTo: [{
                type: Input
            }], blockScroll: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], ariaCloseLabel: [{
                type: Input
            }], autoZIndex: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], baseZIndex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], modal: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dismissible: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showCloseIcon: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], closeOnEscape: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], transitionOptions: [{
                type: Input
            }], visible: [{
                type: Input
            }], position: [{
                type: Input
            }], fullScreen: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], visibleChange: [{
                type: Output
            }] } });
export class SidebarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SidebarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: SidebarModule, declarations: [Sidebar], imports: [CommonModule, RippleModule, SharedModule, TimesIcon], exports: [Sidebar, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SidebarModule, imports: [CommonModule, RippleModule, SharedModule, TimesIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SidebarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule, SharedModule, TimesIcon],
                    exports: [Sidebar, SharedModule],
                    declarations: [Sidebar]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkcsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBR0gsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUVSLE1BQU0sRUFJTixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFpQixhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQUU1QyxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVoSCxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxF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O3VCQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFO2dCQUtFLGFBQWE7c0JBQXBELEtBQUs7dUJBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBSzdCLGlCQUFpQjtzQkFBekIsS0FBSztnQkFLTyxPQUFPO3NCQUFuQixLQUFLO2dCQVVPLFFBQVE7c0JBQXBCLEtBQUs7Z0JBeUJPLFVBQVU7c0JBQXRCLEtBQUs7Z0JBUzBCLFNBQVM7c0JBQXhDLGVBQWU7dUJBQUMsYUFBYTtnQkFLcEIsTUFBTTtzQkFBZixNQUFNO2dCQUtHLE1BQU07c0JBQWYsTUFBTTtnQkFNRyxhQUFhO3NCQUF0QixNQUFNOztBQTZPWCxNQUFNLE9BQU8sYUFBYTt1R0FBYixhQUFhO3dHQUFiLGFBQWEsaUJBMVdiLE9BQU8sYUFzV04sWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsU0FBUyxhQXRXcEQsT0FBTyxFQXVXRyxZQUFZO3dHQUd0QixhQUFhLFlBSlosWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUMxQyxZQUFZOzsyRkFHdEIsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUM7b0JBQzlELE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7b0JBQ2hDLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBhbmltYXRpb24sIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyLCB1c2VBbmltYXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIGJvb2xlYW5BdHRyaWJ1dGUsXG4gICAgbnVtYmVyQXR0cmlidXRlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IFRpbWVzSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdGltZXMnO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgTnVsbGFibGUsIFZvaWRMaXN0ZW5lciB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQgeyBaSW5kZXhVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5jb25zdCBzaG93QW5pbWF0aW9uID0gYW5pbWF0aW9uKFtzdHlsZSh7IHRyYW5zZm9ybTogJ3t7dHJhbnNmb3JtfX0nLCBvcGFjaXR5OiAwIH0pLCBhbmltYXRlKCd7e3RyYW5zaXRpb259fScpXSk7XG5cbmNvbnN0IGhpZGVBbmltYXRpb24gPSBhbmltYXRpb24oW2FuaW1hdGUoJ3t7dHJhbnNpdGlvbn19Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICd7e3RyYW5zZm9ybX19Jywgb3BhY2l0eTogMCB9KSldKTtcbi8qKlxuICogU2lkZWJhciBpcyBhIHBhbmVsIGNvbXBvbmVudCBkaXNwbGF5ZWQgYXMgYW4gb3ZlcmxheSBhdCB0aGUgZWRnZXMgb2YgdGhlIHNjcmVlbi5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1zaWRlYmFyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICAjY29udGFpbmVyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgICAgICAgJ3Atc2lkZWJhcic6IHRydWUsXG4gICAgICAgICAgICAgICAgJ3Atc2lkZWJhci1hY3RpdmUnOiB2aXNpYmxlLFxuICAgICAgICAgICAgICAgICdwLXNpZGViYXItbGVmdCc6IHBvc2l0aW9uID09PSAnbGVmdCcgJiYgIWZ1bGxTY3JlZW4sXG4gICAgICAgICAgICAgICAgJ3Atc2lkZWJhci1yaWdodCc6IHBvc2l0aW9uID09PSAncmlnaHQnICYmICFmdWxsU2NyZWVuLFxuICAgICAgICAgICAgICAgICdwLXNpZGViYXItdG9wJzogcG9zaXRpb24gPT09ICd0b3AnICYmICFmdWxsU2NyZWVuLFxuICAgICAgICAgICAgICAgICdwLXNpZGViYXItYm90dG9tJzogcG9zaXRpb24gPT09ICdib3R0b20nICYmICFmdWxsU2NyZWVuLFxuICAgICAgICAgICAgICAgICdwLXNpZGViYXItZnVsbCc6IGZ1bGxTY3JlZW5cbiAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgKm5nSWY9XCJ2aXNpYmxlXCJcbiAgICAgICAgICAgIFtAcGFuZWxTdGF0ZV09XCJ7IHZhbHVlOiAndmlzaWJsZScsIHBhcmFtczogeyB0cmFuc2Zvcm06IHRyYW5zZm9ybU9wdGlvbnMsIHRyYW5zaXRpb246IHRyYW5zaXRpb25PcHRpb25zIH0gfVwiXG4gICAgICAgICAgICAoQHBhbmVsU3RhdGUuc3RhcnQpPVwib25BbmltYXRpb25TdGFydCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChAcGFuZWxTdGF0ZS5kb25lKT1cIm9uQW5pbWF0aW9uRW5kKCRldmVudClcIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIlxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgcm9sZT1cImNvbXBsZW1lbnRhcnlcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1uYW1lXT1cIidzaWRlYmFyJ1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3Jvb3QnXCJcbiAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhlYWRsZXNzVGVtcGxhdGU7IGVsc2Ugbm90SGVhZGxlc3NcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGxlc3NUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI25vdEhlYWRsZXNzPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNpZGViYXItaGVhZGVyXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidoZWFkZXInXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zaWRlYmFyLWNsb3NlIHAtc2lkZWJhci1pY29uIHAtbGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJjbG9zZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUNsb3NlTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJzaG93Q2xvc2VJY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2xvc2VidXR0b24nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtZ3JvdXAtc2VjdGlvbl09XCInaWNvbmNvbnRhaW5lcidcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGltZXNJY29uICpuZ0lmPVwiIWNsb3NlSWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3Atc2lkZWJhci1jbG9zZS1pY29uJ1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2xvc2VpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNsb3NlSWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLXNpZGViYXItY2xvc2UtaWNvblwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2xvc2VpY29uJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNsb3NlSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtc2lkZWJhci1jb250ZW50XCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjb250ZW50J1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZm9vdGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtc2lkZWJhci1mb290ZXJcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2Zvb3RlcidcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmb290ZXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW3RyaWdnZXIoJ3BhbmVsU3RhdGUnLCBbdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgW3VzZUFuaW1hdGlvbihzaG93QW5pbWF0aW9uKV0pLCB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBbdXNlQW5pbWF0aW9uKGhpZGVBbmltYXRpb24pXSldKV0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9zaWRlYmFyLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTaWRlYmFyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiAgVGFyZ2V0IGVsZW1lbnQgdG8gYXR0YWNoIHRoZSBkaWFsb2csIHZhbGlkIHZhbHVlcyBhcmUgXCJib2R5XCIgb3IgYSBsb2NhbCBuZy10ZW1wbGF0ZSB2YXJpYWJsZSBvZiBhbm90aGVyIGVsZW1lbnQgKG5vdGU6IHVzZSBiaW5kaW5nIHdpdGggYnJhY2tldHMgZm9yIHRlbXBsYXRlIHZhcmlhYmxlcywgZS5nLiBbYXBwZW5kVG9dPVwibXlkaXZcIiBmb3IgYSBkaXYgZWxlbWVudCBoYXZpbmcgI215ZGl2IGFzIHZhcmlhYmxlIG5hbWUpLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBIVE1MRWxlbWVudCB8IEVsZW1lbnRSZWYgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCB8IGFueTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGJsb2NrIHNjcm9sbGluZyBvZiB0aGUgZG9jdW1lbnQgd2hlbiBzaWRlYmFyIGlzIGFjdGl2ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYmxvY2tTY3JvbGw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBBcmlhIGxhYmVsIG9mIHRoZSBjbG9zZSBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFDbG9zZUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBhdXRvbWF0aWNhbGx5IG1hbmFnZSBsYXllcmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogQmFzZSB6SW5kZXggdmFsdWUgdG8gdXNlIGluIGxheWVyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogV2hldGhlciBhbiBvdmVybGF5IG1hc2sgaXMgZGlzcGxheWVkIGJlaGluZCB0aGUgc2lkZWJhci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgbW9kYWw6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZGlzbWlzcyBzaWRlYmFyIG9uIGNsaWNrIG9mIHRoZSBtYXNrLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBkaXNtaXNzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IHRoZSBjbG9zZSBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93Q2xvc2VJY29uOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgaWYgcHJlc3NpbmcgZXNjYXBlIGtleSBzaG91bGQgaGlkZSB0aGUgc2lkZWJhci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgY2xvc2VPbkVzY2FwZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbiBvcHRpb25zIG9mIHRoZSBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcxNTBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKSc7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBkaWFsb2cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlIGFzIGJvb2xlYW47XG4gICAgfVxuICAgIHNldCB2aXNpYmxlKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBzaWRlYmFyLCB2YWxpZCB2YWx1ZXMgYXJlIFwibGVmdFwiLCBcInJpZ2h0XCIsIFwiYm90dG9tXCIgYW5kIFwidG9wXCIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHBvc2l0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgICB9XG4gICAgc2V0IHBvc2l0aW9uKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSB2YWx1ZTtcblxuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSAndHJhbnNsYXRlM2QoLTEwMCUsIDBweCwgMHB4KSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1PcHRpb25zID0gJ3RyYW5zbGF0ZTNkKDEwMCUsIDBweCwgMHB4KSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3B0aW9ucyA9ICd0cmFuc2xhdGUzZCgwcHgsIDEwMCUsIDBweCknO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSAndHJhbnNsYXRlM2QoMHB4LCAtMTAwJSwgMHB4KSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGNsb3NlIGljb24gdG8gdGhlIGhlYWRlciB0byBoaWRlIHRoZSBkaWFsb2cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGZ1bGxTY3JlZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mdWxsU2NyZWVuO1xuICAgIH1cbiAgICBzZXQgZnVsbFNjcmVlbih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9mdWxsU2NyZWVuID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHZhbHVlKSB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBkaWFsb2cgaXMgc2hvd24uXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBkaWFsb2cgaXMgaGlkZGVuLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gZGlhbG9nIHZpc2liaWxpdHkgaXMgY2hhbmdlZC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlIC0gVmlzaWJsZSB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgdmlzaWJsZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBfdmlzaWJsZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIF9wb3NpdGlvbjogc3RyaW5nID0gJ2xlZnQnO1xuXG4gICAgX2Z1bGxTY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnRhaW5lcjogTnVsbGFibGU8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgdHJhbnNmb3JtT3B0aW9uczogYW55ID0gJ3RyYW5zbGF0ZTNkKC0xMDAlLCAwcHgsIDBweCknO1xuXG4gICAgbWFzazogTnVsbGFibGU8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgbWFza0NsaWNrTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGRvY3VtZW50RXNjYXBlTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGFuaW1hdGlvbkVuZExpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBjb250ZW50VGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgaGVhZGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZm9vdGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgY2xvc2VJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgaGVhZGxlc3NUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGNvbmZpZzogUHJpbWVOR0NvbmZpZykge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcz8uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb3RlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2xvc2VpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRsZXNzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkbGVzc1RlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuc2V0KCdtb2RhbCcsIHRoaXMuY29udGFpbmVyLCB0aGlzLmJhc2VaSW5kZXggfHwgdGhpcy5jb25maWcuekluZGV4Lm1vZGFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZU1vZGFsaXR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KHt9KTtcbiAgICAgICAgdGhpcy52aXNpYmxlQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgfVxuXG4gICAgaGlkZShlbWl0OiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICBpZiAoZW1pdCkge1xuICAgICAgICAgICAgdGhpcy5vbkhpZGUuZW1pdCh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlTW9kYWxpdHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgdGhpcy52aXNpYmxlQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGVuYWJsZU1vZGFsaXR5KCkge1xuICAgICAgICBpZiAoIXRoaXMubWFzaykge1xuICAgICAgICAgICAgdGhpcy5tYXNrID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5tYXNrLCAnekluZGV4JywgU3RyaW5nKHBhcnNlSW50KCh0aGlzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUuekluZGV4KSAtIDEpKTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkTXVsdGlwbGVDbGFzc2VzKHRoaXMubWFzaywgJ3AtY29tcG9uZW50LW92ZXJsYXkgcC1zaWRlYmFyLW1hc2sgcC1jb21wb25lbnQtb3ZlcmxheSBwLWNvbXBvbmVudC1vdmVybGF5LWVudGVyJyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRpc21pc3NpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXNrQ2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMubWFzaywgJ2NsaWNrJywgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzbWlzc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5ib2R5LCB0aGlzLm1hc2spO1xuICAgICAgICAgICAgaWYgKHRoaXMuYmxvY2tTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmJsb2NrQm9keVNjcm9sbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZU1vZGFsaXR5KCkge1xuICAgICAgICBpZiAodGhpcy5tYXNrKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMubWFzaywgJ3AtY29tcG9uZW50LW92ZXJsYXktbGVhdmUnKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRW5kTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLm1hc2ssICdhbmltYXRpb25lbmQnLCB0aGlzLmRlc3Ryb3lNb2RhbC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3lNb2RhbCgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpO1xuXG4gICAgICAgIGlmICh0aGlzLm1hc2spIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5kb2N1bWVudC5ib2R5LCB0aGlzLm1hc2spO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYmxvY2tTY3JvbGwpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIudW5ibG9ja0JvZHlTY3JvbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudW5iaW5kQW5pbWF0aW9uRW5kTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5tYXNrID0gbnVsbDtcbiAgICB9XG5cbiAgICBvbkFuaW1hdGlvblN0YXJ0KGV2ZW50OiBhbnkpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGV2ZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRDb250YWluZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlT25Fc2NhcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uRW5kKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZEdsb2JhbExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kQ29udGFpbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JykgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGVsc2UgRG9tSGFuZGxlci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lciwgdGhpcy5hcHBlbmRUbyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpIHtcbiAgICAgICAgY29uc3QgZG9jdW1lbnRUYXJnZXQ6IGFueSA9IHRoaXMuZWwgPyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudCA6IHRoaXMuZG9jdW1lbnQ7XG5cbiAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnRUYXJnZXQsICdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMjcpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoKHRoaXMuY29udGFpbmVyIGFzIEhUTUxEaXZFbGVtZW50KS5zdHlsZS56SW5kZXgpID09PSBaSW5kZXhVdGlscy5nZXQodGhpcy5jb250YWluZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kTWFza0NsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLm1hc2tDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZEdsb2JhbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy51bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICB1bmJpbmRBbmltYXRpb25FbmRMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uRW5kTGlzdGVuZXIgJiYgdGhpcy5tYXNrKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkVuZExpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkVuZExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZSAmJiB0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lNb2RhbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gJiYgdGhpcy5jb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcih0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgICAgIHRoaXMudW5iaW5kR2xvYmFsTGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMudW5iaW5kQW5pbWF0aW9uRW5kTGlzdGVuZXIoKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUmlwcGxlTW9kdWxlLCBTaGFyZWRNb2R1bGUsIFRpbWVzSWNvbl0sXG4gICAgZXhwb3J0czogW1NpZGViYXIsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbU2lkZWJhcl1cbn0pXG5leHBvcnQgY2xhc3MgU2lkZWJhck1vZHVsZSB7fVxuIl19