import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostListener, Inject, Input, NgModule, Output, ViewEncapsulation, booleanAttribute, forwardRef, numberAttribute } from '@angular/core';
import { Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * AccordionTab is a helper component for Accordion.
 * @group Components
 */
export class AccordionTab {
    el;
    changeDetector;
    /**
     * Current id state as a string.
     * @group Props
     */
    id;
    /**
     * Used to define the header of the tab.
     * @group Props
     */
    header;
    /**
     * Inline style of the tab header.
     * @group Props
     */
    headerStyle;
    /**
     * Inline style of the tab.
     * @group Props
     */
    tabStyle;
    /**
     * Inline style of the tab content.
     * @group Props
     */
    contentStyle;
    /**
     * Style class of the tab.
     * @group Props
     */
    tabStyleClass;
    /**
     * Style class of the tab header.
     * @group Props
     */
    headerStyleClass;
    /**
     * Style class of the tab content.
     * @group Props
     */
    contentStyleClass;
    /**
     * Whether the tab is disabled.
     * @group Props
     */
    disabled;
    /**
     * Whether a lazy loaded panel should avoid getting loaded again on reselection.
     * @group Props
     */
    cache = true;
    /**
     * Transition options of the animation.
     * @group Props
     */
    transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * Position of the icon.
     * @group Props
     */
    iconPos = 'start';
    /**
     * The value that returns the selection.
     * @group Props
     */
    get selected() {
        return this._selected;
    }
    set selected(val) {
        this._selected = val;
        if (!this.loaded) {
            if (this._selected && this.cache) {
                this.loaded = true;
            }
            this.changeDetector.detectChanges();
        }
    }
    /**
     * The aria-level that each accordion header will have. The default value is 2 as per W3C specifications
     * @group Props
     */
    headerAriaLevel = 2;
    /**
     * Event triggered by changing the choice.
     * @param {boolean} value - Boolean value indicates that the option is changed.
     * @group Emits
     */
    selectedChange = new EventEmitter();
    headerFacet;
    templates;
    _selected = false;
    get iconClass() {
        if (this.iconPos === 'end') {
            return 'p-accordion-toggle-icon-end';
        }
        else {
            return 'p-accordion-toggle-icon';
        }
    }
    contentTemplate;
    headerTemplate;
    iconTemplate;
    loaded = false;
    accordion;
    constructor(accordion, el, changeDetector) {
        this.el = el;
        this.changeDetector = changeDetector;
        this.accordion = accordion;
        this.id = UniqueComponentId();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    toggle(event) {
        if (this.disabled) {
            return false;
        }
        let index = this.findTabIndex();
        if (this.selected) {
            this.selected = false;
            this.accordion.onClose.emit({ originalEvent: event, index: index });
        }
        else {
            if (!this.accordion.multiple) {
                for (var i = 0; i < this.accordion.tabs.length; i++) {
                    if (this.accordion.tabs[i].selected) {
                        this.accordion.tabs[i].selected = false;
                        this.accordion.tabs[i].selectedChange.emit(false);
                        this.accordion.tabs[i].changeDetector.markForCheck();
                    }
                }
            }
            this.selected = true;
            this.loaded = true;
            this.accordion.onOpen.emit({ originalEvent: event, index: index });
        }
        this.selectedChange.emit(this.selected);
        this.accordion.updateActiveIndex();
        this.changeDetector.markForCheck();
        event?.preventDefault();
    }
    findTabIndex() {
        let index = -1;
        for (var i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    }
    get hasHeaderFacet() {
        return this.headerFacet && this.headerFacet.length > 0;
    }
    onKeydown(event) {
        switch (event.code) {
            case 'Enter':
            case 'Space':
                this.toggle(event);
                event.preventDefault();
                break;
            default:
                break;
        }
    }
    getTabHeaderActionId(tabId) {
        return `${tabId}_header_action`;
    }
    getTabContentId(tabId) {
        return `${tabId}_content`;
    }
    ngOnDestroy() {
        this.accordion.tabs.splice(this.findTabIndex(), 1);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: AccordionTab, deps: [{ token: forwardRef(() => Accordion) }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: AccordionTab, selector: "p-accordionTab", inputs: { id: "id", header: "header", headerStyle: "headerStyle", tabStyle: "tabStyle", contentStyle: "contentStyle", tabStyleClass: "tabStyleClass", headerStyleClass: "headerStyleClass", contentStyleClass: "contentStyleClass", disabled: ["disabled", "disabled", booleanAttribute], cache: ["cache", "cache", booleanAttribute], transitionOptions: "transitionOptions", iconPos: "iconPos", selected: "selected", headerAriaLevel: ["headerAriaLevel", "headerAriaLevel", numberAttribute] }, outputs: { selectedChange: "selectedChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "headerFacet", predicate: Header }, { propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div class="p-accordion-tab" [class.p-accordion-tab-active]="selected" [ngClass]="tabStyleClass" [ngStyle]="tabStyle" [attr.data-pc-name]="'accordiontab'">
            <div class="p-accordion-header" role="heading" [attr.aria-level]="headerAriaLevel" [class.p-highlight]="selected" [class.p-disabled]="disabled" [attr.data-p-disabled]="disabled" [attr.data-pc-section]="'header'">
                <a
                    [ngClass]="headerStyleClass"
                    [style]="headerStyle"
                    role="button"
                    class="p-accordion-header-link"
                    (click)="toggle($event)"
                    (keydown)="onKeydown($event)"
                    [attr.tabindex]="disabled ? null : 0"
                    [attr.id]="getTabHeaderActionId(id)"
                    [attr.aria-controls]="getTabContentId(id)"
                    [attr.aria-expanded]="selected"
                    [attr.aria-disabled]="disabled"
                    [attr.data-pc-section]="'headeraction'"
                >
                    <ng-container *ngIf="!iconTemplate">
                        <ng-container *ngIf="selected">
                            <span *ngIf="accordion.collapseIcon" [class]="accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                            <ChevronDownIcon *ngIf="!accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                        </ng-container>
                        <ng-container *ngIf="!selected">
                            <span *ngIf="accordion.expandIcon" [class]="accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                            <ChevronRightIcon *ngIf="!accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                        </ng-container>
                    </ng-container>
                    <ng-template *ngTemplateOutlet="iconTemplate; context: { $implicit: selected }"></ng-template>
                    <span class="p-accordion-header-text" *ngIf="!hasHeaderFacet">
                        {{ header }}
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <ng-content select="p-header" *ngIf="hasHeaderFacet"></ng-content>
                </a>
            </div>
            <div
                [attr.id]="getTabContentId(id)"
                class="p-toggleable-content"
                [@tabContent]="selected ? { value: 'visible', params: { transitionParams: transitionOptions } } : { value: 'hidden', params: { transitionParams: transitionOptions } }"
                role="region"
                [attr.aria-hidden]="!selected"
                [attr.aria-labelledby]="getTabHeaderActionId(id)"
                [attr.data-pc-section]="'toggleablecontent'"
            >
                <div class="p-accordion-content" [ngClass]="contentStyleClass" [ngStyle]="contentStyle">
                    <ng-content></ng-content>
                    <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                    </ng-container>
                </div>
            </div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-accordion-header-link{cursor:pointer;display:flex;align-items:center;user-select:none;position:relative;text-decoration:none}.p-accordion-header-link:focus{z-index:1}.p-accordion-header-text{line-height:1}.p-accordion .p-toggleable-content{overflow:hidden}.p-accordion .p-accordion-tab-active>.p-toggleable-content:not(.ng-animating){overflow:inherit}.p-accordion-toggle-icon-end{order:1;margin-left:auto}.p-accordion-toggle-icon{order:0}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }], animations: [
            trigger('tabContent', [
                state('hidden', style({
                    height: '0',
                    visibility: 'hidden'
                })),
                state('visible', style({
                    height: '*',
                    visibility: 'visible'
                })),
                transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                transition('void => *', animate(0))
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: AccordionTab, decorators: [{
            type: Component,
            args: [{ selector: 'p-accordionTab', template: `
        <div class="p-accordion-tab" [class.p-accordion-tab-active]="selected" [ngClass]="tabStyleClass" [ngStyle]="tabStyle" [attr.data-pc-name]="'accordiontab'">
            <div class="p-accordion-header" role="heading" [attr.aria-level]="headerAriaLevel" [class.p-highlight]="selected" [class.p-disabled]="disabled" [attr.data-p-disabled]="disabled" [attr.data-pc-section]="'header'">
                <a
                    [ngClass]="headerStyleClass"
                    [style]="headerStyle"
                    role="button"
                    class="p-accordion-header-link"
                    (click)="toggle($event)"
                    (keydown)="onKeydown($event)"
                    [attr.tabindex]="disabled ? null : 0"
                    [attr.id]="getTabHeaderActionId(id)"
                    [attr.aria-controls]="getTabContentId(id)"
                    [attr.aria-expanded]="selected"
                    [attr.aria-disabled]="disabled"
                    [attr.data-pc-section]="'headeraction'"
                >
                    <ng-container *ngIf="!iconTemplate">
                        <ng-container *ngIf="selected">
                            <span *ngIf="accordion.collapseIcon" [class]="accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                            <ChevronDownIcon *ngIf="!accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                        </ng-container>
                        <ng-container *ngIf="!selected">
                            <span *ngIf="accordion.expandIcon" [class]="accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                            <ChevronRightIcon *ngIf="!accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                        </ng-container>
                    </ng-container>
                    <ng-template *ngTemplateOutlet="iconTemplate; context: { $implicit: selected }"></ng-template>
                    <span class="p-accordion-header-text" *ngIf="!hasHeaderFacet">
                        {{ header }}
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <ng-content select="p-header" *ngIf="hasHeaderFacet"></ng-content>
                </a>
            </div>
            <div
                [attr.id]="getTabContentId(id)"
                class="p-toggleable-content"
                [@tabContent]="selected ? { value: 'visible', params: { transitionParams: transitionOptions } } : { value: 'hidden', params: { transitionParams: transitionOptions } }"
                role="region"
                [attr.aria-hidden]="!selected"
                [attr.aria-labelledby]="getTabHeaderActionId(id)"
                [attr.data-pc-section]="'toggleablecontent'"
            >
                <div class="p-accordion-content" [ngClass]="contentStyleClass" [ngStyle]="contentStyle">
                    <ng-content></ng-content>
                    <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                    </ng-container>
                </div>
            </div>
        </div>
    `, animations: [
                        trigger('tabContent', [
                            state('hidden', style({
                                height: '0',
                                visibility: 'hidden'
                            })),
                            state('visible', style({
                                height: '*',
                                visibility: 'visible'
                            })),
                            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                            transition('void => *', animate(0))
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-accordion-header-link{cursor:pointer;display:flex;align-items:center;user-select:none;position:relative;text-decoration:none}.p-accordion-header-link:focus{z-index:1}.p-accordion-header-text{line-height:1}.p-accordion .p-toggleable-content{overflow:hidden}.p-accordion .p-accordion-tab-active>.p-toggleable-content:not(.ng-animating){overflow:inherit}.p-accordion-toggle-icon-end{order:1;margin-left:auto}.p-accordion-toggle-icon{order:0}}\n"] }]
        }], ctorParameters: () => [{ type: Accordion, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => Accordion)]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { id: [{
                type: Input
            }], header: [{
                type: Input
            }], headerStyle: [{
                type: Input
            }], tabStyle: [{
                type: Input
            }], contentStyle: [{
                type: Input
            }], tabStyleClass: [{
                type: Input
            }], headerStyleClass: [{
                type: Input
            }], contentStyleClass: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], cache: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], transitionOptions: [{
                type: Input
            }], iconPos: [{
                type: Input
            }], selected: [{
                type: Input
            }], headerAriaLevel: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], selectedChange: [{
                type: Output
            }], headerFacet: [{
                type: ContentChildren,
                args: [Header]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
/**
 * Accordion groups a collection of contents in tabs.
 * @group Components
 */
export class Accordion {
    el;
    changeDetector;
    /**
     * When enabled, multiple tabs can be activated at the same time.
     * @group Props
     */
    multiple = false;
    /**
     * Inline style of the tab header and content.
     * @group Props
     */
    style;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Icon of a collapsed tab.
     * @group Props
     */
    expandIcon;
    /**
     * Icon of an expanded tab.
     * @group Props
     */
    collapseIcon;
    /**
     * Index of the active tab or an array of indexes in multiple mode.
     * @group Props
     */
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(val) {
        this._activeIndex = val;
        if (this.preventActiveIndexPropagation) {
            this.preventActiveIndexPropagation = false;
            return;
        }
        this.updateSelectionState();
    }
    /**
     * When enabled, the focused tab is activated.
     * @group Props
     */
    selectOnFocus = false;
    /**
     * The aria-level that each accordion header will have. The default value is 2 as per W3C specifications
     * @group Props
     */
    get headerAriaLevel() {
        return this._headerAriaLevel;
    }
    set headerAriaLevel(val) {
        if (typeof val === 'number' && val > 0) {
            this._headerAriaLevel = val;
        }
        else if (this._headerAriaLevel !== 2) {
            this._headerAriaLevel = 2;
        }
    }
    /**
     * Callback to invoke when an active tab is collapsed by clicking on the header.
     * @param {AccordionTabCloseEvent} event - Custom tab close event.
     * @group Emits
     */
    onClose = new EventEmitter();
    /**
     * Callback to invoke when a tab gets expanded.
     * @param {AccordionTabOpenEvent} event - Custom tab open event.
     * @group Emits
     */
    onOpen = new EventEmitter();
    /**
     * Returns the active index.
     * @param {number | number[]} value - New index.
     * @group Emits
     */
    activeIndexChange = new EventEmitter();
    tabList;
    tabListSubscription = null;
    _activeIndex;
    _headerAriaLevel = 2;
    preventActiveIndexPropagation = false;
    tabs = [];
    constructor(el, changeDetector) {
        this.el = el;
        this.changeDetector = changeDetector;
    }
    onKeydown(event) {
        switch (event.code) {
            case 'ArrowDown':
                this.onTabArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onTabArrowUpKey(event);
                break;
            case 'Home':
                if (!event.shiftKey) {
                    this.onTabHomeKey(event);
                }
                break;
            case 'End':
                if (!event.shiftKey) {
                    this.onTabEndKey(event);
                }
                break;
        }
    }
    isInput(event) {
        const { tagName } = event.target;
        return tagName?.toLowerCase() === 'input';
    }
    isTextArea(event) {
        const { tagName } = event.target;
        return tagName?.toLowerCase() === 'textarea';
    }
    onTabArrowDownKey(event) {
        if (!this.isInput(event) && !this.isTextArea(event)) {
            const nextHeaderAction = this.findNextHeaderAction(event.target.parentElement.parentElement.parentElement);
            nextHeaderAction ? this.changeFocusedTab(nextHeaderAction) : this.onTabHomeKey(event);
            event.preventDefault();
        }
    }
    onTabArrowUpKey(event) {
        if (!this.isInput(event) && !this.isTextArea(event)) {
            const prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement.parentElement.parentElement);
            prevHeaderAction ? this.changeFocusedTab(prevHeaderAction) : this.onTabEndKey(event);
            event.preventDefault();
        }
    }
    onTabHomeKey(event) {
        const firstHeaderAction = this.findFirstHeaderAction();
        this.changeFocusedTab(firstHeaderAction);
        event.preventDefault();
    }
    changeFocusedTab(element) {
        if (element) {
            DomHandler.focus(element);
            if (this.selectOnFocus) {
                this.tabs.forEach((tab, i) => {
                    let selected = this.multiple ? this._activeIndex.includes(i) : i === this._activeIndex;
                    if (this.multiple) {
                        if (!this._activeIndex) {
                            this._activeIndex = [];
                        }
                        if (tab.id == element.id) {
                            tab.selected = !tab.selected;
                            if (!this._activeIndex.includes(i)) {
                                this._activeIndex.push(i);
                            }
                            else {
                                this._activeIndex = this._activeIndex.filter((ind) => ind !== i);
                            }
                        }
                    }
                    else {
                        if (tab.id == element.id) {
                            tab.selected = !tab.selected;
                            this._activeIndex = i;
                        }
                        else {
                            tab.selected = false;
                        }
                    }
                    tab.selectedChange.emit(selected);
                    this.activeIndexChange.emit(this._activeIndex);
                    tab.changeDetector.markForCheck();
                });
            }
        }
    }
    findNextHeaderAction(tabElement, selfCheck = false) {
        const nextTabElement = selfCheck ? tabElement : tabElement.nextElementSibling;
        const headerElement = DomHandler.findSingle(nextTabElement, '[data-pc-section="header"]');
        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeaderAction(headerElement.parentElement.parentElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')) : null;
    }
    findPrevHeaderAction(tabElement, selfCheck = false) {
        const prevTabElement = selfCheck ? tabElement : tabElement.previousElementSibling;
        const headerElement = DomHandler.findSingle(prevTabElement, '[data-pc-section="header"]');
        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeaderAction(headerElement.parentElement.parentElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')) : null;
    }
    findFirstHeaderAction() {
        const firstEl = this.el.nativeElement.firstElementChild.childNodes[0];
        return this.findNextHeaderAction(firstEl, true);
    }
    findLastHeaderAction() {
        const childNodes = this.el.nativeElement.firstElementChild.childNodes;
        const lastEl = childNodes[childNodes.length - 1];
        return this.findPrevHeaderAction(lastEl, true);
    }
    onTabEndKey(event) {
        const lastHeaderAction = this.findLastHeaderAction();
        this.changeFocusedTab(lastHeaderAction);
        event.preventDefault();
    }
    ngAfterContentInit() {
        this.initTabs();
        this.tabListSubscription = this.tabList.changes.subscribe((_) => {
            this.initTabs();
        });
    }
    initTabs() {
        this.tabs = this.tabList.toArray();
        this.tabs.forEach((tab) => {
            tab.headerAriaLevel = this._headerAriaLevel;
        });
        this.updateSelectionState();
        this.changeDetector.markForCheck();
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    updateSelectionState() {
        if (this.tabs && this.tabs.length && this._activeIndex != null) {
            for (let i = 0; i < this.tabs.length; i++) {
                let selected = this.multiple ? this._activeIndex.includes(i) : i === this._activeIndex;
                let changed = selected !== this.tabs[i].selected;
                if (changed) {
                    this.tabs[i].selected = selected;
                    this.tabs[i].selectedChange.emit(selected);
                    this.tabs[i].changeDetector.markForCheck();
                }
            }
        }
    }
    isTabActive(index) {
        return this.multiple ? this._activeIndex && this._activeIndex.includes(index) : this._activeIndex === index;
    }
    getTabProp(tab, name) {
        return tab.props ? tab.props[name] : undefined;
    }
    updateActiveIndex() {
        let index = this.multiple ? [] : null;
        this.tabs.forEach((tab, i) => {
            if (tab.selected) {
                if (this.multiple) {
                    index.push(i);
                }
                else {
                    index = i;
                    return;
                }
            }
        });
        this.preventActiveIndexPropagation = true;
        this.activeIndexChange.emit(index);
    }
    ngOnDestroy() {
        if (this.tabListSubscription) {
            this.tabListSubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Accordion, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: Accordion, selector: "p-accordion", inputs: { multiple: ["multiple", "multiple", booleanAttribute], style: "style", styleClass: "styleClass", expandIcon: "expandIcon", collapseIcon: "collapseIcon", activeIndex: "activeIndex", selectOnFocus: ["selectOnFocus", "selectOnFocus", booleanAttribute], headerAriaLevel: "headerAriaLevel" }, outputs: { onClose: "onClose", onOpen: "onOpen", activeIndexChange: "activeIndexChange" }, host: { listeners: { "keydown": "onKeydown($event)" }, classAttribute: "p-element" }, queries: [{ propertyName: "tabList", predicate: AccordionTab, descendants: true }], ngImport: i0, template: `
        <div [ngClass]="'p-accordion p-component'" [ngStyle]="style" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Accordion, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-accordion',
                    template: `
        <div [ngClass]="'p-accordion p-component'" [ngStyle]="style" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { multiple: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], expandIcon: [{
                type: Input
            }], collapseIcon: [{
                type: Input
            }], activeIndex: [{
                type: Input
            }], selectOnFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], headerAriaLevel: [{
                type: Input
            }], onClose: [{
                type: Output
            }], onOpen: [{
                type: Output
            }], activeIndexChange: [{
                type: Output
            }], tabList: [{
                type: ContentChildren,
                args: [AccordionTab, { descendants: true }]
            }], onKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
export class AccordionModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: AccordionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: AccordionModule, declarations: [Accordion, AccordionTab], imports: [CommonModule, ChevronRightIcon, ChevronDownIcon], exports: [Accordion, AccordionTab, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: AccordionModule, imports: [CommonModule, ChevronRightIcon, ChevronDownIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: AccordionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ChevronRightIcon, ChevronDownIcon],
                    exports: [Accordion, AccordionTab, SharedModule],
                    declarations: [Accordion, AccordionTab]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2FjY29yZGlvbi9hY2NvcmRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVILHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBRVIsTUFBTSxFQUdOLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLGVBQWUsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFlLE1BQU0sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBRWxEOzs7R0FHRztBQW1GSCxNQUFNLE9BQU8sWUFBWTtJQW1IeUQ7SUFBdUI7SUFsSHJHOzs7T0FHRztJQUNNLEVBQUUsQ0FBcUI7SUFDaEM7OztPQUdHO0lBQ00sTUFBTSxDQUFxQjtJQUNwQzs7O09BR0c7SUFDTSxXQUFXLENBQThDO0lBQ2xFOzs7T0FHRztJQUNNLFFBQVEsQ0FBOEM7SUFDL0Q7OztPQUdHO0lBQ00sWUFBWSxDQUE4QztJQUNuRTs7O09BR0c7SUFDTSxhQUFhLENBQXFCO0lBQzNDOzs7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QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLENBQUM7b0JBQzFELE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDO29CQUNoRCxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO2lCQUMxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgYm9vbGVhbkF0dHJpYnV0ZSxcbiAgICBmb3J3YXJkUmVmLFxuICAgIG51bWJlckF0dHJpYnV0ZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJsb2NrYWJsZVVJLCBIZWFkZXIsIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBDaGV2cm9uRG93bkljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25kb3duJztcbmltcG9ydCB7IENoZXZyb25SaWdodEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25yaWdodCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjY29yZGlvblRhYkNsb3NlRXZlbnQsIEFjY29yZGlvblRhYk9wZW5FdmVudCB9IGZyb20gJy4vYWNjb3JkaW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG4vKipcbiAqIEFjY29yZGlvblRhYiBpcyBhIGhlbHBlciBjb21wb25lbnQgZm9yIEFjY29yZGlvbi5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1hY2NvcmRpb25UYWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLWFjY29yZGlvbi10YWJcIiBbY2xhc3MucC1hY2NvcmRpb24tdGFiLWFjdGl2ZV09XCJzZWxlY3RlZFwiIFtuZ0NsYXNzXT1cInRhYlN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJ0YWJTdHlsZVwiIFthdHRyLmRhdGEtcGMtbmFtZV09XCInYWNjb3JkaW9udGFiJ1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtYWNjb3JkaW9uLWhlYWRlclwiIHJvbGU9XCJoZWFkaW5nXCIgW2F0dHIuYXJpYS1sZXZlbF09XCJoZWFkZXJBcmlhTGV2ZWxcIiBbY2xhc3MucC1oaWdobGlnaHRdPVwic2VsZWN0ZWRcIiBbY2xhc3MucC1kaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLmRhdGEtcC1kaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaGVhZGVyJ1wiPlxuICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImhlYWRlclN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICBbc3R5bGVdPVwiaGVhZGVyU3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWFjY29yZGlvbi1oZWFkZXItbGlua1wiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQgPyBudWxsIDogMFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImdldFRhYkhlYWRlckFjdGlvbklkKGlkKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiZ2V0VGFiQ29udGVudElkKGlkKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwic2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidoZWFkZXJhY3Rpb24nXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2VsZWN0ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImFjY29yZGlvbi5jb2xsYXBzZUljb25cIiBbY2xhc3NdPVwiYWNjb3JkaW9uLmNvbGxhcHNlSWNvblwiIFtuZ0NsYXNzXT1cImljb25DbGFzc1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiAqbmdJZj1cIiFhY2NvcmRpb24uY29sbGFwc2VJY29uXCIgW25nQ2xhc3NdPVwiaWNvbkNsYXNzXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhc2VsZWN0ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImFjY29yZGlvbi5leHBhbmRJY29uXCIgW2NsYXNzXT1cImFjY29yZGlvbi5leHBhbmRJY29uXCIgW25nQ2xhc3NdPVwiaWNvbkNsYXNzXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0SWNvbiAqbmdJZj1cIiFhY2NvcmRpb24uZXhwYW5kSWNvblwiIFtuZ0NsYXNzXT1cImljb25DbGFzc1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpY29uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBzZWxlY3RlZCB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWFjY29yZGlvbi1oZWFkZXItdGV4dFwiICpuZ0lmPVwiIWhhc0hlYWRlckZhY2V0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBoZWFkZXIgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1oZWFkZXJcIiAqbmdJZj1cImhhc0hlYWRlckZhY2V0XCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImdldFRhYkNvbnRlbnRJZChpZClcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC10b2dnbGVhYmxlLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgIFtAdGFiQ29udGVudF09XCJzZWxlY3RlZCA/IHsgdmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7IHRyYW5zaXRpb25QYXJhbXM6IHRyYW5zaXRpb25PcHRpb25zIH0gfSA6IHsgdmFsdWU6ICdoaWRkZW4nLCBwYXJhbXM6IHsgdHJhbnNpdGlvblBhcmFtczogdHJhbnNpdGlvbk9wdGlvbnMgfSB9XCJcbiAgICAgICAgICAgICAgICByb2xlPVwicmVnaW9uXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCIhc2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJnZXRUYWJIZWFkZXJBY3Rpb25JZChpZClcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIndG9nZ2xlYWJsZWNvbnRlbnQnXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1hY2NvcmRpb24tY29udGVudFwiIFtuZ0NsYXNzXT1cImNvbnRlbnRTdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwiY29udGVudFN0eWxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnRlbnRUZW1wbGF0ZSAmJiAoY2FjaGUgPyBsb2FkZWQgOiBzZWxlY3RlZClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ3RhYkNvbnRlbnQnLCBbXG4gICAgICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICAgICAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzAnLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgc3RhdGUoXG4gICAgICAgICAgICAgICAgJ3Zpc2libGUnLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnKicsXG4gICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA8PT4gaGlkZGVuJywgW2FuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JyldKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIGFuaW1hdGUoMCkpXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2FjY29yZGlvbi5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQWNjb3JkaW9uVGFiIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGlkIHN0YXRlIGFzIGEgc3RyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBkZWZpbmUgdGhlIGhlYWRlciBvZiB0aGUgdGFiLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgdGFiIGhlYWRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBoZWFkZXJTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIHRhYi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YWJTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIHRhYiBjb250ZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbnRlbnRTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgdGFiLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRhYlN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgdGFiIGhlYWRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBoZWFkZXJTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIHRhYiBjb250ZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbnRlbnRTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgdGFiIGlzIGRpc2FibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBkaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGEgbGF6eSBsb2FkZWQgcGFuZWwgc2hvdWxkIGF2b2lkIGdldHRpbmcgbG9hZGVkIGFnYWluIG9uIHJlc2VsZWN0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBjYWNoZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbiBvcHRpb25zIG9mIHRoZSBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICc0MDBtcyBjdWJpYy1iZXppZXIoMC44NiwgMCwgMC4wNywgMSknO1xuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIG9mIHRoZSBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGljb25Qb3M6ICdlbmQnIHwgJ3N0YXJ0JyA9ICdzdGFydCc7XG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIHRoYXQgcmV0dXJucyB0aGUgc2VsZWN0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cbiAgICBzZXQgc2VsZWN0ZWQodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdmFsO1xuXG4gICAgICAgIGlmICghdGhpcy5sb2FkZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZCAmJiB0aGlzLmNhY2hlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgYXJpYS1sZXZlbCB0aGF0IGVhY2ggYWNjb3JkaW9uIGhlYWRlciB3aWxsIGhhdmUuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDIgYXMgcGVyIFczQyBzcGVjaWZpY2F0aW9uc1xuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIGhlYWRlckFyaWFMZXZlbDogbnVtYmVyID0gMjtcbiAgICAvKipcbiAgICAgKiBFdmVudCB0cmlnZ2VyZWQgYnkgY2hhbmdpbmcgdGhlIGNob2ljZS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlIC0gQm9vbGVhbiB2YWx1ZSBpbmRpY2F0ZXMgdGhhdCB0aGUgb3B0aW9uIGlzIGNoYW5nZWQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKEhlYWRlcikgaGVhZGVyRmFjZXQhOiBRdWVyeUxpc3Q8SGVhZGVyPjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzITogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+O1xuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGdldCBpY29uQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLmljb25Qb3MgPT09ICdlbmQnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3AtYWNjb3JkaW9uLXRvZ2dsZS1pY29uLWVuZCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ3AtYWNjb3JkaW9uLXRvZ2dsZS1pY29uJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgaWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBhY2NvcmRpb246IEFjY29yZGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBBY2NvcmRpb24pKSBhY2NvcmRpb246IEFjY29yZGlvbiwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuYWNjb3JkaW9uID0gYWNjb3JkaW9uIGFzIEFjY29yZGlvbjtcbiAgICAgICAgdGhpcy5pZCA9IFVuaXF1ZUNvbXBvbmVudElkKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRvZ2dsZShldmVudD86IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRUYWJJbmRleCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmFjY29yZGlvbi5vbkNsb3NlLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgaW5kZXg6IGluZGV4IH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFjY29yZGlvbi5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hY2NvcmRpb24udGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hY2NvcmRpb24udGFic1tpXS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2NvcmRpb24udGFic1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2NvcmRpb24udGFic1tpXS5zZWxlY3RlZENoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjb3JkaW9uLnRhYnNbaV0uY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5hY2NvcmRpb24ub25PcGVuLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgaW5kZXg6IGluZGV4IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLmFjY29yZGlvbi51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIGV2ZW50Py5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGZpbmRUYWJJbmRleCgpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hY2NvcmRpb24udGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWNjb3JkaW9uLnRhYnNbaV0gPT0gdGhpcykge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgZ2V0IGhhc0hlYWRlckZhY2V0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMuaGVhZGVyRmFjZXQgYXMgUXVlcnlMaXN0PEhlYWRlcj4pICYmICh0aGlzLmhlYWRlckZhY2V0IGFzIFF1ZXJ5TGlzdDxIZWFkZXI+KS5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZShldmVudCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUYWJIZWFkZXJBY3Rpb25JZCh0YWJJZCkge1xuICAgICAgICByZXR1cm4gYCR7dGFiSWR9X2hlYWRlcl9hY3Rpb25gO1xuICAgIH1cblxuICAgIGdldFRhYkNvbnRlbnRJZCh0YWJJZCkge1xuICAgICAgICByZXR1cm4gYCR7dGFiSWR9X2NvbnRlbnRgO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmFjY29yZGlvbi50YWJzLnNwbGljZSh0aGlzLmZpbmRUYWJJbmRleCgpLCAxKTtcbiAgICB9XG59XG5cbi8qKlxuICogQWNjb3JkaW9uIGdyb3VwcyBhIGNvbGxlY3Rpb24gb2YgY29udGVudHMgaW4gdGFicy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1hY2NvcmRpb24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiJ3AtYWNjb3JkaW9uIHAtY29tcG9uZW50J1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQWNjb3JkaW9uIGltcGxlbWVudHMgQmxvY2thYmxlVUksIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBtdWx0aXBsZSB0YWJzIGNhbiBiZSBhY3RpdmF0ZWQgYXQgdGhlIHNhbWUgdGltZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIHRhYiBoZWFkZXIgYW5kIGNvbnRlbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQ2xhc3Mgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEljb24gb2YgYSBjb2xsYXBzZWQgdGFiLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGV4cGFuZEljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJY29uIG9mIGFuIGV4cGFuZGVkIHRhYi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb2xsYXBzZUljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgYWN0aXZlIHRhYiBvciBhbiBhcnJheSBvZiBpbmRleGVzIGluIG11bHRpcGxlIG1vZGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGFjdGl2ZUluZGV4KCk6IG51bWJlciB8IG51bWJlcltdIHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICB9XG4gICAgc2V0IGFjdGl2ZUluZGV4KHZhbDogbnVtYmVyIHwgbnVtYmVyW10gfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gdmFsO1xuICAgICAgICBpZiAodGhpcy5wcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5wcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25TdGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIHRoZSBmb2N1c2VkIHRhYiBpcyBhY3RpdmF0ZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNlbGVjdE9uRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBUaGUgYXJpYS1sZXZlbCB0aGF0IGVhY2ggYWNjb3JkaW9uIGhlYWRlciB3aWxsIGhhdmUuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDIgYXMgcGVyIFczQyBzcGVjaWZpY2F0aW9uc1xuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBoZWFkZXJBcmlhTGV2ZWwoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlYWRlckFyaWFMZXZlbDtcbiAgICB9XG4gICAgc2V0IGhlYWRlckFyaWFMZXZlbCh2YWw6IG51bWJlcikge1xuICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicgJiYgdmFsID4gMCkge1xuICAgICAgICAgICAgdGhpcy5faGVhZGVyQXJpYUxldmVsID0gdmFsO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2hlYWRlckFyaWFMZXZlbCAhPT0gMikge1xuICAgICAgICAgICAgdGhpcy5faGVhZGVyQXJpYUxldmVsID0gMjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhbiBhY3RpdmUgdGFiIGlzIGNvbGxhcHNlZCBieSBjbGlja2luZyBvbiB0aGUgaGVhZGVyLlxuICAgICAqIEBwYXJhbSB7QWNjb3JkaW9uVGFiQ2xvc2VFdmVudH0gZXZlbnQgLSBDdXN0b20gdGFiIGNsb3NlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8QWNjb3JkaW9uVGFiQ2xvc2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSB0YWIgZ2V0cyBleHBhbmRlZC5cbiAgICAgKiBAcGFyYW0ge0FjY29yZGlvblRhYk9wZW5FdmVudH0gZXZlbnQgLSBDdXN0b20gdGFiIG9wZW4gZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uT3BlbjogRXZlbnRFbWl0dGVyPEFjY29yZGlvblRhYk9wZW5FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgYWN0aXZlIGluZGV4LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyIHwgbnVtYmVyW119IHZhbHVlIC0gTmV3IGluZGV4LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBhY3RpdmVJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlciB8IG51bWJlcltdPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyIHwgbnVtYmVyW10+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKEFjY29yZGlvblRhYiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSB0YWJMaXN0OiBRdWVyeUxpc3Q8QWNjb3JkaW9uVGFiPiB8IHVuZGVmaW5lZDtcblxuICAgIHRhYkxpc3RTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfYWN0aXZlSW5kZXg6IGFueTtcbiAgICBwcml2YXRlIF9oZWFkZXJBcmlhTGV2ZWw6IG51bWJlciA9IDI7XG5cbiAgICBwcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIHRhYnM6IEFjY29yZGlvblRhYltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbktleWRvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJBcnJvd0Rvd25LZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiQXJyb3dVcEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgIGlmICghZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblRhYkhvbWVLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICBpZiAoIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25UYWJFbmRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzSW5wdXQoZXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgeyB0YWdOYW1lIH0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHJldHVybiB0YWdOYW1lPy50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnO1xuICAgIH1cblxuICAgIGlzVGV4dEFyZWEoZXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgeyB0YWdOYW1lIH0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHJldHVybiB0YWdOYW1lPy50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnO1xuICAgIH1cblxuICAgIG9uVGFiQXJyb3dEb3duS2V5KGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0lucHV0KGV2ZW50KSAmJiAhdGhpcy5pc1RleHRBcmVhKGV2ZW50KSkge1xuICAgICAgICAgICAgY29uc3QgbmV4dEhlYWRlckFjdGlvbiA9IHRoaXMuZmluZE5leHRIZWFkZXJBY3Rpb24oZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgICAgIG5leHRIZWFkZXJBY3Rpb24gPyB0aGlzLmNoYW5nZUZvY3VzZWRUYWIobmV4dEhlYWRlckFjdGlvbikgOiB0aGlzLm9uVGFiSG9tZUtleShldmVudCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRhYkFycm93VXBLZXkoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSW5wdXQoZXZlbnQpICYmICF0aGlzLmlzVGV4dEFyZWEoZXZlbnQpKSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2SGVhZGVyQWN0aW9uID0gdGhpcy5maW5kUHJldkhlYWRlckFjdGlvbihldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuICAgICAgICAgICAgcHJldkhlYWRlckFjdGlvbiA/IHRoaXMuY2hhbmdlRm9jdXNlZFRhYihwcmV2SGVhZGVyQWN0aW9uKSA6IHRoaXMub25UYWJFbmRLZXkoZXZlbnQpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25UYWJIb21lS2V5KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGZpcnN0SGVhZGVyQWN0aW9uID0gdGhpcy5maW5kRmlyc3RIZWFkZXJBY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkVGFiKGZpcnN0SGVhZGVyQWN0aW9uKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VGb2N1c2VkVGFiKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuZm9jdXMoZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdE9uRm9jdXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFiLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMubXVsdGlwbGUgPyB0aGlzLl9hY3RpdmVJbmRleC5pbmNsdWRlcyhpKSA6IGkgPT09IHRoaXMuX2FjdGl2ZUluZGV4O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlSW5kZXggPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWIuaWQgPT0gZWxlbWVudC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYi5zZWxlY3RlZCA9ICF0YWIuc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmVJbmRleC5pbmNsdWRlcyhpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVJbmRleC5wdXNoKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gdGhpcy5fYWN0aXZlSW5kZXguZmlsdGVyKChpbmQpID0+IGluZCAhPT0gaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhYi5pZCA9PSBlbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiLnNlbGVjdGVkID0gIXRhYi5zZWxlY3RlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGFiLnNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUluZGV4Q2hhbmdlLmVtaXQodGhpcy5fYWN0aXZlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0YWIuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTmV4dEhlYWRlckFjdGlvbih0YWJFbGVtZW50LCBzZWxmQ2hlY2sgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBuZXh0VGFiRWxlbWVudCA9IHNlbGZDaGVjayA/IHRhYkVsZW1lbnQgOiB0YWJFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShuZXh0VGFiRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJoZWFkZXJcIl0nKTtcblxuICAgICAgICByZXR1cm4gaGVhZGVyRWxlbWVudCA/IChEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShoZWFkZXJFbGVtZW50LCAnZGF0YS1wLWRpc2FibGVkJykgPyB0aGlzLmZpbmROZXh0SGVhZGVyQWN0aW9uKGhlYWRlckVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KSA6IERvbUhhbmRsZXIuZmluZFNpbmdsZShoZWFkZXJFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImhlYWRlcmFjdGlvblwiXScpKSA6IG51bGw7XG4gICAgfVxuXG4gICAgZmluZFByZXZIZWFkZXJBY3Rpb24odGFiRWxlbWVudCwgc2VsZkNoZWNrID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgcHJldlRhYkVsZW1lbnQgPSBzZWxmQ2hlY2sgPyB0YWJFbGVtZW50IDogdGFiRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHByZXZUYWJFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImhlYWRlclwiXScpO1xuXG4gICAgICAgIHJldHVybiBoZWFkZXJFbGVtZW50ID8gKERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGhlYWRlckVsZW1lbnQsICdkYXRhLXAtZGlzYWJsZWQnKSA/IHRoaXMuZmluZFByZXZIZWFkZXJBY3Rpb24oaGVhZGVyRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpIDogRG9tSGFuZGxlci5maW5kU2luZ2xlKGhlYWRlckVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwiaGVhZGVyYWN0aW9uXCJdJykpIDogbnVsbDtcbiAgICB9XG5cbiAgICBmaW5kRmlyc3RIZWFkZXJBY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0RWwgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZE5leHRIZWFkZXJBY3Rpb24oZmlyc3RFbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZmluZExhc3RIZWFkZXJBY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkTm9kZXMgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGROb2RlcztcbiAgICAgICAgY29uc3QgbGFzdEVsID0gY2hpbGROb2Rlc1tjaGlsZE5vZGVzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRQcmV2SGVhZGVyQWN0aW9uKGxhc3RFbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgb25UYWJFbmRLZXkoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbGFzdEhlYWRlckFjdGlvbiA9IHRoaXMuZmluZExhc3RIZWFkZXJBY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkVGFiKGxhc3RIZWFkZXJBY3Rpb24pO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0VGFicygpO1xuXG4gICAgICAgIHRoaXMudGFiTGlzdFN1YnNjcmlwdGlvbiA9ICh0aGlzLnRhYkxpc3QgYXMgUXVlcnlMaXN0PEFjY29yZGlvblRhYj4pLmNoYW5nZXMuc3Vic2NyaWJlKChfKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRUYWJzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRUYWJzKCkge1xuICAgICAgICB0aGlzLnRhYnMgPSAodGhpcy50YWJMaXN0IGFzIFF1ZXJ5TGlzdDxBY2NvcmRpb25UYWI+KS50b0FycmF5KCk7XG5cbiAgICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYikgPT4ge1xuICAgICAgICAgICAgdGFiLmhlYWRlckFyaWFMZXZlbCA9IHRoaXMuX2hlYWRlckFyaWFMZXZlbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25TdGF0ZSgpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGdldEJsb2NrYWJsZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGlvblN0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy50YWJzICYmIHRoaXMudGFicy5sZW5ndGggJiYgdGhpcy5fYWN0aXZlSW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLm11bHRpcGxlID8gdGhpcy5fYWN0aXZlSW5kZXguaW5jbHVkZXMoaSkgOiBpID09PSB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICAgICAgICAgICAgICBsZXQgY2hhbmdlZCA9IHNlbGVjdGVkICE9PSB0aGlzLnRhYnNbaV0uc2VsZWN0ZWQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYnNbaV0uc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJzW2ldLnNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYnNbaV0uY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNUYWJBY3RpdmUoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLl9hY3RpdmVJbmRleCAmJiAoPG51bWJlcltdPnRoaXMuX2FjdGl2ZUluZGV4KS5pbmNsdWRlcyhpbmRleCkgOiB0aGlzLl9hY3RpdmVJbmRleCA9PT0gaW5kZXg7XG4gICAgfVxuXG4gICAgZ2V0VGFiUHJvcCh0YWIsIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRhYi5wcm9wcyA/IHRhYi5wcm9wc1tuYW1lXSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB1cGRhdGVBY3RpdmVJbmRleCgpIHtcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgfCBudW1iZXJbXSB8IG51bGwgPSB0aGlzLm11bHRpcGxlID8gW10gOiBudWxsO1xuICAgICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFiLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAodGFiLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgKGluZGV4IGFzIG51bWJlcltdKS5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLmFjdGl2ZUluZGV4Q2hhbmdlLmVtaXQoaW5kZXggYXMgbnVtYmVyW10gfCBudW1iZXIpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy50YWJMaXN0U3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRhYkxpc3RTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDaGV2cm9uUmlnaHRJY29uLCBDaGV2cm9uRG93bkljb25dLFxuICAgIGV4cG9ydHM6IFtBY2NvcmRpb24sIEFjY29yZGlvblRhYiwgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtBY2NvcmRpb24sIEFjY29yZGlvblRhYl1cbn0pXG5leHBvcnQgY2xhc3MgQWNjb3JkaW9uTW9kdWxlIHt9XG4iXX0=