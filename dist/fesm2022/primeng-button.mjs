import * as i1 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { booleanAttribute, Directive, Inject, Input, EventEmitter, numberAttribute, Component, ChangeDetectionStrategy, ViewEncapsulation, Output, ContentChildren, NgModule } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { SpinnerIcon } from 'primeng/icons/spinner';
import * as i2 from 'primeng/ripple';
import { RippleModule } from 'primeng/ripple';
import { ObjectUtils } from 'primeng/utils';
import * as i3 from 'primeng/autofocus';
import { AutoFocusModule } from 'primeng/autofocus';

const INTERNAL_BUTTON_CLASSES = {
    button: 'p-button',
    component: 'p-component',
    iconOnly: 'p-button-icon-only',
    disabled: 'p-disabled',
    loading: 'p-button-loading',
    labelOnly: 'p-button-loading-label-only'
};
/**
 * Button directive is an extension to button component.
 * @group Components
 */
class ButtonDirective {
    el;
    document;
    /**
     * Position of the icon.
     * @group Props
     */
    iconPos = 'left';
    /**
     * Uses to pass attributes to the loading icon's DOM element.
     * @group Props
     */
    loadingIcon;
    /**
     * Text of the button.
     * @group Props
     */
    get label() {
        return this._label;
    }
    set label(val) {
        this._label = val;
        if (this.initialized) {
            this.updateLabel();
            this.updateIcon();
            this.setStyleClass();
        }
    }
    /**
     * Name of the icon.
     * @group Props
     */
    get icon() {
        return this._icon;
    }
    set icon(val) {
        this._icon = val;
        if (this.initialized) {
            this.updateIcon();
            this.setStyleClass();
        }
    }
    /**
     * Whether the button is in loading state.
     * @group Props
     */
    get loading() {
        return this._loading;
    }
    set loading(val) {
        this._loading = val;
        if (this.initialized) {
            this.updateIcon();
            this.setStyleClass();
        }
    }
    /**
     * Defines the style of the button.
     * @group Props
     */
    severity;
    /**
     * Add a shadow to indicate elevation.
     * @group Props
     */
    raised = false;
    /**
     * Add a circular border radius to the button.
     * @group Props
     */
    rounded = false;
    /**
     * Add a textual class to the button without a background initially.
     * @group Props
     */
    text = false;
    /**
     * Add a border class without a background initially.
     * @group Props
     */
    outlined = false;
    /**
     * Defines the size of the button.
     * @group Props
     */
    size = null;
    /**
     * Add a plain textual class to the button without a background initially.
     * @group Props
     */
    plain = false;
    _label;
    _icon;
    _loading = false;
    initialized;
    get htmlElement() {
        return this.el.nativeElement;
    }
    _internalClasses = Object.values(INTERNAL_BUTTON_CLASSES);
    spinnerIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon-spin">
        <g clip-path="url(#clip0_417_21408)">
            <path
                d="M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_417_21408">
                <rect width="14" height="14" fill="white" />
            </clipPath>
        </defs>
    </svg>`;
    constructor(el, document) {
        this.el = el;
        this.document = document;
    }
    ngAfterViewInit() {
        DomHandler.addMultipleClasses(this.htmlElement, this.getStyleClass().join(' '));
        this.createIcon();
        this.createLabel();
        this.initialized = true;
    }
    getStyleClass() {
        const styleClass = [INTERNAL_BUTTON_CLASSES.button, INTERNAL_BUTTON_CLASSES.component];
        if (this.icon && !this.label && ObjectUtils.isEmpty(this.htmlElement.textContent)) {
            styleClass.push(INTERNAL_BUTTON_CLASSES.iconOnly);
        }
        if (this.loading) {
            styleClass.push(INTERNAL_BUTTON_CLASSES.disabled, INTERNAL_BUTTON_CLASSES.loading);
            if (!this.icon && this.label) {
                styleClass.push(INTERNAL_BUTTON_CLASSES.labelOnly);
            }
            if (this.icon && !this.label && !ObjectUtils.isEmpty(this.htmlElement.textContent)) {
                styleClass.push(INTERNAL_BUTTON_CLASSES.iconOnly);
            }
        }
        if (this.text) {
            styleClass.push('p-button-text');
        }
        if (this.severity) {
            styleClass.push(`p-button-${this.severity}`);
        }
        if (this.plain) {
            styleClass.push('p-button-plain');
        }
        if (this.raised) {
            styleClass.push('p-button-raised');
        }
        if (this.size) {
            styleClass.push(`p-button-${this.size}`);
        }
        if (this.outlined) {
            styleClass.push('p-button-outlined');
        }
        if (this.rounded) {
            styleClass.push('p-button-rounded');
        }
        if (this.size === 'small') {
            styleClass.push('p-button-sm');
        }
        if (this.size === 'large') {
            styleClass.push('p-button-lg');
        }
        return styleClass;
    }
    setStyleClass() {
        const styleClass = this.getStyleClass();
        this.htmlElement.classList.remove(...this._internalClasses);
        this.htmlElement.classList.add(...styleClass);
    }
    createLabel() {
        const created = DomHandler.findSingle(this.htmlElement, '.p-button-label');
        if (!created && this.label) {
            let labelElement = this.document.createElement('span');
            if (this.icon && !this.label) {
                labelElement.setAttribute('aria-hidden', 'true');
            }
            labelElement.className = 'p-button-label';
            labelElement.appendChild(this.document.createTextNode(this.label));
            this.htmlElement.appendChild(labelElement);
        }
    }
    createIcon() {
        const created = DomHandler.findSingle(this.htmlElement, '.p-button-icon');
        if (!created && (this.icon || this.loading)) {
            let iconElement = this.document.createElement('span');
            iconElement.className = 'p-button-icon';
            iconElement.setAttribute('aria-hidden', 'true');
            let iconPosClass = this.label ? 'p-button-icon-' + this.iconPos : null;
            if (iconPosClass) {
                DomHandler.addClass(iconElement, iconPosClass);
            }
            let iconClass = this.getIconClass();
            if (iconClass) {
                DomHandler.addMultipleClasses(iconElement, iconClass);
            }
            if (!this.loadingIcon && this.loading) {
                iconElement.innerHTML = this.spinnerIcon;
            }
            this.htmlElement.insertBefore(iconElement, this.htmlElement.firstChild);
        }
    }
    updateLabel() {
        let labelElement = DomHandler.findSingle(this.htmlElement, '.p-button-label');
        if (!this.label) {
            labelElement && this.htmlElement.removeChild(labelElement);
            return;
        }
        labelElement ? (labelElement.textContent = this.label) : this.createLabel();
    }
    updateIcon() {
        let iconElement = DomHandler.findSingle(this.htmlElement, '.p-button-icon');
        let labelElement = DomHandler.findSingle(this.htmlElement, '.p-button-label');
        if (this.loading && !this.loadingIcon && iconElement) {
            iconElement.innerHTML = this.spinnerIcon;
        }
        else if (iconElement?.innerHTML) {
            iconElement.innerHTML = '';
        }
        if (iconElement) {
            if (this.iconPos) {
                iconElement.className = 'p-button-icon ' + (labelElement ? 'p-button-icon-' + this.iconPos : '') + ' ' + this.getIconClass();
            }
            else {
                iconElement.className = 'p-button-icon ' + this.getIconClass();
            }
        }
        else {
            this.createIcon();
        }
    }
    getIconClass() {
        return this.loading ? 'p-button-loading-icon ' + (this.loadingIcon ? this.loadingIcon : 'p-icon') : this.icon || 'p-hidden';
    }
    ngOnDestroy() {
        this.initialized = false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ButtonDirective, deps: [{ token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: ButtonDirective, selector: "[pButton]", inputs: { iconPos: "iconPos", loadingIcon: "loadingIcon", label: "label", icon: "icon", loading: "loading", severity: "severity", raised: ["raised", "raised", booleanAttribute], rounded: ["rounded", "rounded", booleanAttribute], text: ["text", "text", booleanAttribute], outlined: ["outlined", "outlined", booleanAttribute], size: "size", plain: ["plain", "plain", booleanAttribute] }, host: { classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pButton]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }], propDecorators: { iconPos: [{
                type: Input
            }], loadingIcon: [{
                type: Input
            }], label: [{
                type: Input
            }], icon: [{
                type: Input
            }], loading: [{
                type: Input
            }], severity: [{
                type: Input
            }], raised: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], rounded: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], text: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], outlined: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], size: [{
                type: Input
            }], plain: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });
/**
 * Button is an extension to standard button element with icons and theming.
 * @group Components
 */
class Button {
    el;
    /**
     * Type of the button.
     * @group Props
     */
    type = 'button';
    /**
     * Position of the icon.
     * @group Props
     */
    iconPos = 'left';
    /**
     * Name of the icon.
     * @group Props
     */
    icon;
    /**
     * Value of the badge.
     * @group Props
     */
    badge;
    /**
     * Uses to pass attributes to the label's DOM element.
     * @group Props
     */
    label;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled;
    /**
     * Whether the button is in loading state.
     * @group Props
     */
    loading = false;
    /**
     * Icon to display in loading state.
     * @group Props
     */
    loadingIcon;
    /**
     * Add a shadow to indicate elevation.
     * @group Props
     */
    raised = false;
    /**
     * Add a circular border radius to the button.
     * @group Props
     */
    rounded = false;
    /**
     * Add a textual class to the button without a background initially.
     * @group Props
     */
    text = false;
    /**
     * Add a plain textual class to the button without a background initially.
     * @group Props
     */
    plain = false;
    /**
     * Defines the style of the button.
     * @group Props
     */
    severity;
    /**
     * Add a border class without a background initially.
     * @group Props
     */
    outlined = false;
    /**
     * Add a link style to the button.
     * @group Props
     */
    link = false;
    /**
     * Add a tabindex to the button.
     * @group Props
     */
    tabindex;
    /**
     * Defines the size of the button.
     * @group Props
     */
    size;
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
     * Style class of the badge.
     * @group Props
     */
    badgeClass;
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    ariaLabel;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus;
    /**
     * Callback to execute when button is clicked.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (click).
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onClick = new EventEmitter();
    /**
     * Callback to execute when button is focused.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (focus).
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to execute when button loses focus.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (blur).
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    contentTemplate;
    loadingIconTemplate;
    iconTemplate;
    templates;
    constructor(el) {
        this.el = el;
    }
    spinnerIconClass() {
        return Object.entries(this.iconClass())
            .filter(([, value]) => !!value)
            .reduce((acc, [key]) => acc + ` ${key}`, 'p-button-loading-icon');
    }
    iconClass() {
        return {
            'p-button-icon': true,
            'p-button-icon-left': this.iconPos === 'left' && this.label,
            'p-button-icon-right': this.iconPos === 'right' && this.label,
            'p-button-icon-top': this.iconPos === 'top' && this.label,
            'p-button-icon-bottom': this.iconPos === 'bottom' && this.label
        };
    }
    get buttonClass() {
        return {
            'p-button p-component': true,
            'p-button-icon-only': (this.icon || this.iconTemplate || this.loadingIcon || this.loadingIconTemplate) && !this.label,
            'p-button-vertical': (this.iconPos === 'top' || this.iconPos === 'bottom') && this.label,
            'p-disabled': this.disabled || this.loading,
            'p-button-loading': this.loading,
            'p-button-loading-label-only': this.loading && !this.icon && this.label && !this.loadingIcon && this.iconPos === 'left',
            'p-button-link': this.link,
            [`p-button-${this.severity}`]: this.severity,
            'p-button-raised': this.raised,
            'p-button-rounded': this.rounded,
            'p-button-text': this.text,
            'p-button-outlined': this.outlined,
            'p-button-sm': this.size === 'small',
            'p-button-lg': this.size === 'large',
            'p-button-plain': this.plain,
            [`${this.styleClass}`]: this.styleClass
        };
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    badgeStyleClass() {
        return {
            'p-badge p-component': true,
            'p-badge-no-gutter': this.badge && String(this.badge).length === 1
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Button, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: Button, selector: "p-button", inputs: { type: "type", iconPos: "iconPos", icon: "icon", badge: "badge", label: "label", disabled: ["disabled", "disabled", booleanAttribute], loading: ["loading", "loading", booleanAttribute], loadingIcon: "loadingIcon", raised: ["raised", "raised", booleanAttribute], rounded: ["rounded", "rounded", booleanAttribute], text: ["text", "text", booleanAttribute], plain: ["plain", "plain", booleanAttribute], severity: "severity", outlined: ["outlined", "outlined", booleanAttribute], link: ["link", "link", booleanAttribute], tabindex: ["tabindex", "tabindex", numberAttribute], size: "size", style: "style", styleClass: "styleClass", badgeClass: "badgeClass", ariaLabel: "ariaLabel", autofocus: ["autofocus", "autofocus", booleanAttribute] }, outputs: { onClick: "onClick", onFocus: "onFocus", onBlur: "onBlur" }, host: { properties: { "class.p-disabled": "disabled" }, classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <button
            [attr.type]="type"
            [attr.aria-label]="ariaLabel"
            [ngStyle]="style"
            [disabled]="disabled || loading"
            [ngClass]="buttonClass"
            (click)="onClick.emit($event)"
            (focus)="onFocus.emit($event)"
            (blur)="onBlur.emit($event)"
            pRipple
            [attr.data-pc-name]="'button'"
            [attr.data-pc-section]="'root'"
            [attr.tabindex]="tabindex"
            pAutoFocus
            [autofocus]="autofocus"
        >
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            <ng-container *ngIf="loading">
                <ng-container *ngIf="!loadingIconTemplate">
                    <span *ngIf="loadingIcon" [class]="'p-button-loading-icon pi-spin ' + loadingIcon" [ngClass]="iconClass()" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'"></span>
                    <SpinnerIcon *ngIf="!loadingIcon" [styleClass]="spinnerIconClass()" [spin]="true" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'" />
                </ng-container>
                <span *ngIf="loadingIconTemplate" class="p-button-loading-icon" [ngClass]="iconClass()" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'">
                    <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                </span>
            </ng-container>
            <ng-container *ngIf="!loading">
                <span *ngIf="icon && !iconTemplate" [class]="icon" [ngClass]="iconClass()" [attr.data-pc-section]="'icon'"></span>
                <span *ngIf="!icon && iconTemplate" [ngClass]="iconClass()" [attr.data-pc-section]="'icon'">
                    <ng-template [ngIf]="!icon" *ngTemplateOutlet="iconTemplate"></ng-template>
                </span>
            </ng-container>
            <span class="p-button-label" [attr.aria-hidden]="icon && !label" *ngIf="!contentTemplate && label" [attr.data-pc-section]="'label'">{{ label }}</span>
            <span [ngClass]="badgeStyleClass()" [class]="badgeClass" *ngIf="!contentTemplate && badge" [attr.data-pc-section]="'badge'">{{ badge }}</span>
        </button>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.Ripple), selector: "[pRipple]" }, { kind: "directive", type: i0.forwardRef(() => i3.AutoFocus), selector: "[pAutoFocus]", inputs: ["autofocus"] }, { kind: "component", type: i0.forwardRef(() => SpinnerIcon), selector: "SpinnerIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Button, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-button',
                    template: `
        <button
            [attr.type]="type"
            [attr.aria-label]="ariaLabel"
            [ngStyle]="style"
            [disabled]="disabled || loading"
            [ngClass]="buttonClass"
            (click)="onClick.emit($event)"
            (focus)="onFocus.emit($event)"
            (blur)="onBlur.emit($event)"
            pRipple
            [attr.data-pc-name]="'button'"
            [attr.data-pc-section]="'root'"
            [attr.tabindex]="tabindex"
            pAutoFocus
            [autofocus]="autofocus"
        >
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            <ng-container *ngIf="loading">
                <ng-container *ngIf="!loadingIconTemplate">
                    <span *ngIf="loadingIcon" [class]="'p-button-loading-icon pi-spin ' + loadingIcon" [ngClass]="iconClass()" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'"></span>
                    <SpinnerIcon *ngIf="!loadingIcon" [styleClass]="spinnerIconClass()" [spin]="true" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'" />
                </ng-container>
                <span *ngIf="loadingIconTemplate" class="p-button-loading-icon" [ngClass]="iconClass()" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'">
                    <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                </span>
            </ng-container>
            <ng-container *ngIf="!loading">
                <span *ngIf="icon && !iconTemplate" [class]="icon" [ngClass]="iconClass()" [attr.data-pc-section]="'icon'"></span>
                <span *ngIf="!icon && iconTemplate" [ngClass]="iconClass()" [attr.data-pc-section]="'icon'">
                    <ng-template [ngIf]="!icon" *ngTemplateOutlet="iconTemplate"></ng-template>
                </span>
            </ng-container>
            <span class="p-button-label" [attr.aria-hidden]="icon && !label" *ngIf="!contentTemplate && label" [attr.data-pc-section]="'label'">{{ label }}</span>
            <span [ngClass]="badgeStyleClass()" [class]="badgeClass" *ngIf="!contentTemplate && badge" [attr.data-pc-section]="'badge'">{{ badge }}</span>
        </button>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element',
                        '[class.p-disabled]': 'disabled' || 'loading'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { type: [{
                type: Input
            }], iconPos: [{
                type: Input
            }], icon: [{
                type: Input
            }], badge: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], loading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], loadingIcon: [{
                type: Input
            }], raised: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], rounded: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], text: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], plain: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], severity: [{
                type: Input
            }], outlined: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], link: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], size: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], badgeClass: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], autofocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onClick: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class ButtonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: ButtonModule, declarations: [ButtonDirective, Button], imports: [CommonModule, RippleModule, SharedModule, AutoFocusModule, SpinnerIcon], exports: [ButtonDirective, Button, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ButtonModule, imports: [CommonModule, RippleModule, SharedModule, AutoFocusModule, SpinnerIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule, SharedModule, AutoFocusModule, SpinnerIcon],
                    exports: [ButtonDirective, Button, SharedModule],
                    declarations: [ButtonDirective, Button]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { Button, ButtonDirective, ButtonModule };
//# sourceMappingURL=primeng-button.mjs.map
