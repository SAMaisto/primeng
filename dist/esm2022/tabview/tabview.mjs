import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, booleanAttribute, forwardRef, numberAttribute } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TimesIcon } from 'primeng/icons/times';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/tooltip";
import * as i3 from "primeng/ripple";
/**
 * TabPanel is a helper component for TabView component.
 * @group Components
 */
export class TabPanel {
    el;
    viewContainer;
    cd;
    /**
     * Defines if tab can be removed.
     * @group Props
     */
    closable = false;
    /**
     * Inline style of the tab header.
     * @group Props
     */
    get headerStyle() {
        return this._headerStyle;
    }
    set headerStyle(headerStyle) {
        this._headerStyle = headerStyle;
        this.tabView.cd.markForCheck();
    }
    /**
     * Style class of the tab header.
     * @group Props
     */
    get headerStyleClass() {
        return this._headerStyleClass;
    }
    set headerStyleClass(headerStyleClass) {
        this._headerStyleClass = headerStyleClass;
        this.tabView.cd.markForCheck();
    }
    /**
     * Whether a lazy loaded panel should avoid getting loaded again on reselection.
     * @group Props
     */
    cache = true;
    /**
     * Advisory information to display in a tooltip on hover.
     * @group Props
     */
    tooltip;
    /**
     * Position of the tooltip.
     * @group Props
     */
    tooltipPosition = 'top';
    /**
     * Type of CSS position.
     * @group Props
     */
    tooltipPositionStyle = 'absolute';
    /**
     * Style class of the tooltip.
     * @group Props
     */
    tooltipStyleClass;
    /**
     * Defines if tab is active.
     * @defaultValue false
     * @group Props
     */
    get selected() {
        return !!this._selected;
    }
    set selected(val) {
        this._selected = val;
        if (!this.loaded) {
            this.cd.detectChanges();
        }
        if (val)
            this.loaded = true;
    }
    /**
     * When true, tab cannot be activated.
     * @defaultValue false
     * @group Props
     */
    get disabled() {
        return !!this._disabled;
    }
    set disabled(disabled) {
        this._disabled = disabled;
        this.tabView.cd.markForCheck();
    }
    /**
     * Title of the tabPanel.
     * @group Props
     */
    get header() {
        return this._header;
    }
    set header(header) {
        this._header = header;
        // We have to wait for the rendering and then retrieve the actual size element from the DOM.
        // in future `Promise.resolve` can be changed to `queueMicrotask` (if ie11 support will be dropped)
        Promise.resolve().then(() => {
            this.tabView.updateInkBar();
            this.tabView.cd.markForCheck();
        });
    }
    /**
     * Left icon of the tabPanel.
     * @group Props
     * @deprecated since v15.4.2, use `lefticon` template instead.
     */
    get leftIcon() {
        return this._leftIcon;
    }
    set leftIcon(leftIcon) {
        this._leftIcon = leftIcon;
        this.tabView.cd.markForCheck();
    }
    /**
     * Left icon of the tabPanel.
     * @group Props
     * @deprecated since v15.4.2, use `righticon` template instead.
     */
    get rightIcon() {
        return this._rightIcon;
    }
    set rightIcon(rightIcon) {
        this._rightIcon = rightIcon;
        this.tabView.cd.markForCheck();
    }
    templates;
    closed = false;
    view = null;
    _headerStyle;
    _headerStyleClass;
    _selected;
    _disabled;
    _header;
    _leftIcon;
    _rightIcon = undefined;
    loaded = false;
    id;
    contentTemplate;
    headerTemplate;
    leftIconTemplate;
    rightIconTemplate;
    closeIconTemplate;
    tabView;
    constructor(tabView, el, viewContainer, cd) {
        this.el = el;
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.tabView = tabView;
        this.id = UniqueComponentId();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'righticon':
                    this.rightIconTemplate = item.template;
                    break;
                case 'lefticon':
                    this.leftIconTemplate = item.template;
                    break;
                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    ngOnDestroy() {
        this.view = null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TabPanel, deps: [{ token: forwardRef(() => TabView) }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: TabPanel, selector: "p-tabPanel", inputs: { closable: ["closable", "closable", booleanAttribute], headerStyle: "headerStyle", headerStyleClass: "headerStyleClass", cache: ["cache", "cache", booleanAttribute], tooltip: "tooltip", tooltipPosition: "tooltipPosition", tooltipPositionStyle: "tooltipPositionStyle", tooltipStyleClass: "tooltipStyleClass", selected: "selected", disabled: "disabled", header: "header", leftIcon: "leftIcon", rightIcon: "rightIcon" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div
            *ngIf="!closed"
            class="p-tabview-panel"
            role="tabpanel"
            [hidden]="!selected"
            [attr.id]="tabView.getTabContentId(id)"
            [attr.aria-hidden]="!selected"
            [attr.aria-labelledby]="tabView.getTabHeaderActionId(id)"
            [attr.data-pc-name]="'tabpanel'"
        >
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </ng-container>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TabPanel, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-tabPanel',
                    template: `
        <div
            *ngIf="!closed"
            class="p-tabview-panel"
            role="tabpanel"
            [hidden]="!selected"
            [attr.id]="tabView.getTabContentId(id)"
            [attr.aria-hidden]="!selected"
            [attr.aria-labelledby]="tabView.getTabHeaderActionId(id)"
            [attr.data-pc-name]="'tabpanel'"
        >
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </ng-container>
        </div>
    `,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: TabView, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => TabView)]
                }] }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }], propDecorators: { closable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], headerStyle: [{
                type: Input
            }], headerStyleClass: [{
                type: Input
            }], cache: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tooltip: [{
                type: Input
            }], tooltipPosition: [{
                type: Input
            }], tooltipPositionStyle: [{
                type: Input
            }], tooltipStyleClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], disabled: [{
                type: Input
            }], header: [{
                type: Input
            }], leftIcon: [{
                type: Input
            }], rightIcon: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
/**
 * TabView is a container component to group content with tabs.
 * @group Components
 */
export class TabView {
    platformId;
    el;
    cd;
    renderer;
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
     * Whether tab close is controlled at onClose event or not.
     * @defaultValue false
     * @group Props
     */
    controlClose;
    /**
     * When enabled displays buttons at each side of the tab headers to scroll the tab list.
     * @defaultValue false
     * @group Props
     */
    scrollable;
    /**
     * Index of the active tab to change selected tab programmatically.
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
        if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
            this.findSelectedTab().selected = false;
            this.tabs[this._activeIndex].selected = true;
            this.tabChanged = true;
            this.updateScrollBar(val);
        }
    }
    /**
     * When enabled, the focused tab is activated.
     * @group Props
     */
    selectOnFocus = false;
    /**
     * Used to define a string aria label attribute the forward navigation button.
     * @group Props
     */
    nextButtonAriaLabel;
    /**
     * Used to define a string aria label attribute the backward navigation button.
     * @group Props
     */
    prevButtonAriaLabel;
    /**
     * When activated, navigation buttons will automatically hide or show based on the available space within the container.
     * @group Props
     */
    autoHideButtons = true;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    /**
     * Callback to invoke on tab change.
     * @param {TabViewChangeEvent} event - Custom tab change event
     * @group Emits
     */
    onChange = new EventEmitter();
    /**
     * Callback to invoke on tab close.
     * @param {TabViewCloseEvent} event - Custom tab close event
     * @group Emits
     */
    onClose = new EventEmitter();
    /**
     * Callback to invoke on the active tab change.
     * @param {number} index - New active index
     * @group Emits
     */
    activeIndexChange = new EventEmitter();
    content;
    navbar;
    prevBtn;
    nextBtn;
    inkbar;
    tabPanels;
    templates;
    initialized;
    tabs;
    _activeIndex;
    preventActiveIndexPropagation;
    tabChanged;
    backwardIsDisabled = true;
    forwardIsDisabled = false;
    tabChangesSubscription;
    nextIconTemplate;
    previousIconTemplate;
    resizeObserver;
    container;
    list;
    buttonVisible;
    elementToObserve;
    constructor(platformId, el, cd, renderer) {
        this.platformId = platformId;
        this.el = el;
        this.cd = cd;
        this.renderer = renderer;
    }
    ngAfterContentInit() {
        this.initTabs();
        this.tabChangesSubscription = this.tabPanels.changes.subscribe((_) => {
            this.initTabs();
            this.refreshButtonState();
        });
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'previousicon':
                    this.previousIconTemplate = item.template;
                    break;
                case 'nexticon':
                    this.nextIconTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.autoHideButtons) {
                this.bindResizeObserver();
            }
        }
    }
    bindResizeObserver() {
        this.container = DomHandler.findSingle(this.el.nativeElement, '[data-pc-section="navcontent"]');
        this.list = DomHandler.findSingle(this.el.nativeElement, '[data-pc-section="nav"]');
        this.resizeObserver = new ResizeObserver(() => {
            if (this.list.offsetWidth >= this.container.offsetWidth) {
                this.buttonVisible = true;
            }
            else {
                this.buttonVisible = false;
            }
            this.updateButtonState();
            this.cd.detectChanges();
        });
        this.resizeObserver.observe(this.container);
    }
    unbindResizeObserver() {
        this.resizeObserver.unobserve(this.elementToObserve.nativeElement);
        this.resizeObserver = null;
    }
    ngAfterViewChecked() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.tabChanged) {
                this.updateInkBar();
                this.tabChanged = false;
            }
        }
    }
    ngOnDestroy() {
        if (this.tabChangesSubscription) {
            this.tabChangesSubscription.unsubscribe();
        }
        if (this.resizeObserver) {
            this.unbindResizeObserver();
        }
    }
    getTabHeaderActionId(tabId) {
        return `${tabId}_header_action`;
    }
    getTabContentId(tabId) {
        return `${tabId}_content`;
    }
    initTabs() {
        this.tabs = this.tabPanels.toArray();
        let selectedTab = this.findSelectedTab();
        if (!selectedTab && this.tabs.length) {
            if (this.activeIndex != null && this.tabs.length > this.activeIndex)
                this.tabs[this.activeIndex].selected = true;
            else
                this.tabs[0].selected = true;
            this.tabChanged = true;
        }
        this.cd.markForCheck();
    }
    onTabKeyDown(event, tab) {
        switch (event.code) {
            case 'ArrowLeft':
                this.onTabArrowLeftKey(event);
                break;
            case 'ArrowRight':
                this.onTabArrowRightKey(event);
                break;
            case 'Home':
                this.onTabHomeKey(event);
                break;
            case 'End':
                this.onTabEndKey(event);
                break;
            case 'PageDown':
                this.onTabEndKey(event);
                break;
            case 'PageUp':
                this.onTabHomeKey(event);
                break;
            case 'Enter':
            case 'Space':
                this.open(event, tab);
                break;
            default:
                break;
        }
    }
    onTabArrowLeftKey(event) {
        const prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement);
        const index = DomHandler.getAttribute(prevHeaderAction, 'data-pc-index');
        prevHeaderAction ? this.changeFocusedTab(event, prevHeaderAction, index) : this.onTabEndKey(event);
        event.preventDefault();
    }
    onTabArrowRightKey(event) {
        const nextHeaderAction = this.findNextHeaderAction(event.target.parentElement);
        const index = DomHandler.getAttribute(nextHeaderAction, 'data-pc-index');
        nextHeaderAction ? this.changeFocusedTab(event, nextHeaderAction, index) : this.onTabHomeKey(event);
        event.preventDefault();
    }
    onTabHomeKey(event) {
        const firstHeaderAction = this.findFirstHeaderAction();
        const index = DomHandler.getAttribute(firstHeaderAction, 'data-pc-index');
        this.changeFocusedTab(event, firstHeaderAction, index);
        event.preventDefault();
    }
    onTabEndKey(event) {
        const lastHeaderAction = this.findLastHeaderAction();
        const index = DomHandler.getAttribute(lastHeaderAction, 'data-pc-index');
        this.changeFocusedTab(event, lastHeaderAction, index);
        event.preventDefault();
    }
    changeFocusedTab(event, element, index) {
        if (element) {
            DomHandler.focus(element);
            element.scrollIntoView({ block: 'nearest' });
            if (this.selectOnFocus) {
                const tab = this.tabs[index];
                this.open(event, tab);
            }
        }
    }
    findNextHeaderAction(tabElement, selfCheck = false) {
        const headerElement = selfCheck ? tabElement : tabElement.nextElementSibling;
        return headerElement
            ? DomHandler.getAttribute(headerElement, 'data-p-disabled') || DomHandler.getAttribute(headerElement, 'data-pc-section') === 'inkbar'
                ? this.findNextHeaderAction(headerElement)
                : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')
            : null;
    }
    findPrevHeaderAction(tabElement, selfCheck = false) {
        const headerElement = selfCheck ? tabElement : tabElement.previousElementSibling;
        return headerElement
            ? DomHandler.getAttribute(headerElement, 'data-p-disabled') || DomHandler.getAttribute(headerElement, 'data-pc-section') === 'inkbar'
                ? this.findPrevHeaderAction(headerElement)
                : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')
            : null;
    }
    findFirstHeaderAction() {
        const firstEl = this.navbar.nativeElement.firstElementChild;
        return this.findNextHeaderAction(firstEl, true);
    }
    findLastHeaderAction() {
        const lastEl = this.navbar.nativeElement.lastElementChild;
        const lastHeaderAction = DomHandler.getAttribute(lastEl, 'data-pc-section') === 'inkbar' ? lastEl.previousElementSibling : lastEl;
        return this.findPrevHeaderAction(lastHeaderAction, true);
    }
    open(event, tab) {
        if (tab.disabled) {
            if (event) {
                event.preventDefault();
            }
            return;
        }
        if (!tab.selected) {
            let selectedTab = this.findSelectedTab();
            if (selectedTab) {
                selectedTab.selected = false;
            }
            this.tabChanged = true;
            tab.selected = true;
            let selectedTabIndex = this.findTabIndex(tab);
            this.preventActiveIndexPropagation = true;
            this.activeIndexChange.emit(selectedTabIndex);
            this.onChange.emit({ originalEvent: event, index: selectedTabIndex });
            this.updateScrollBar(selectedTabIndex);
        }
        if (event) {
            event.preventDefault();
        }
    }
    close(event, tab) {
        if (this.controlClose) {
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab),
                close: () => {
                    this.closeTab(tab);
                }
            });
        }
        else {
            this.closeTab(tab);
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab)
            });
        }
    }
    closeTab(tab) {
        if (tab.disabled) {
            return;
        }
        if (tab.selected) {
            this.tabChanged = true;
            tab.selected = false;
            for (let i = 0; i < this.tabs.length; i++) {
                let tabPanel = this.tabs[i];
                if (!tabPanel.closed && !tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }
        tab.closed = true;
    }
    findSelectedTab() {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    }
    findTabIndex(tab) {
        let index = -1;
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    updateInkBar() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.navbar) {
                const tabHeader = DomHandler.findSingle(this.navbar.nativeElement, 'li.p-highlight');
                if (!tabHeader) {
                    return;
                }
                this.inkbar.nativeElement.style.width = DomHandler.getWidth(tabHeader) + 'px';
                this.inkbar.nativeElement.style.left = DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(this.navbar.nativeElement).left + 'px';
            }
        }
    }
    updateScrollBar(index) {
        let tabHeader = this.navbar.nativeElement.children[index];
        if (tabHeader) {
            tabHeader.scrollIntoView({ block: 'nearest' });
        }
    }
    updateButtonState() {
        const content = this.content.nativeElement;
        const { scrollLeft, scrollWidth } = content;
        const width = DomHandler.getWidth(content);
        this.backwardIsDisabled = scrollLeft === 0;
        this.forwardIsDisabled = Math.round(scrollLeft) === scrollWidth - width;
    }
    refreshButtonState() {
        this.container = DomHandler.findSingle(this.el.nativeElement, '[data-pc-section="navcontent"]');
        this.list = DomHandler.findSingle(this.el.nativeElement, '[data-pc-section="nav"]');
        if (this.list.offsetWidth >= this.container.offsetWidth) {
            if (this.list.offsetWidth >= this.container.offsetWidth) {
                this.buttonVisible = true;
            }
            else {
                this.buttonVisible = false;
            }
            this.updateButtonState();
            this.cd.markForCheck();
        }
    }
    onScroll(event) {
        this.scrollable && this.updateButtonState();
        event.preventDefault();
    }
    getVisibleButtonWidths() {
        return [this.prevBtn?.nativeElement, this.nextBtn?.nativeElement].reduce((acc, el) => (el ? acc + DomHandler.getWidth(el) : acc), 0);
    }
    navBackward() {
        const content = this.content.nativeElement;
        const width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft - width;
        content.scrollLeft = pos <= 0 ? 0 : pos;
    }
    navForward() {
        const content = this.content.nativeElement;
        const width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft + width;
        const lastPos = content.scrollWidth - width;
        content.scrollLeft = pos >= lastPos ? lastPos : pos;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TabView, deps: [{ token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: TabView, selector: "p-tabView", inputs: { style: "style", styleClass: "styleClass", controlClose: ["controlClose", "controlClose", booleanAttribute], scrollable: ["scrollable", "scrollable", booleanAttribute], activeIndex: "activeIndex", selectOnFocus: ["selectOnFocus", "selectOnFocus", booleanAttribute], nextButtonAriaLabel: "nextButtonAriaLabel", prevButtonAriaLabel: "prevButtonAriaLabel", autoHideButtons: ["autoHideButtons", "autoHideButtons", booleanAttribute], tabindex: ["tabindex", "tabindex", numberAttribute] }, outputs: { onChange: "onChange", onClose: "onClose", activeIndexChange: "activeIndexChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "tabPanels", predicate: TabPanel }, { propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true }, { propertyName: "navbar", first: true, predicate: ["navbar"], descendants: true }, { propertyName: "prevBtn", first: true, predicate: ["prevBtn"], descendants: true }, { propertyName: "nextBtn", first: true, predicate: ["nextBtn"], descendants: true }, { propertyName: "inkbar", first: true, predicate: ["inkbar"], descendants: true }, { propertyName: "elementToObserve", first: true, predicate: ["elementToObserve"], descendants: true }], ngImport: i0, template: `
        <div [ngClass]="{ 'p-tabview p-component': true, 'p-tabview-scrollable': scrollable }" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'tabview'">
            <div #elementToObserve class="p-tabview-nav-container">
                <button
                    *ngIf="scrollable && !backwardIsDisabled && autoHideButtons"
                    #prevBtn
                    class="p-tabview-nav-prev p-tabview-nav-btn p-link"
                    (click)="navBackward()"
                    [attr.tabindex]="tabindex"
                    [attr.aria-label]="prevButtonAriaLabel"
                    type="button"
                    pRipple
                >
                    <ChevronLeftIcon *ngIf="!previousIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                </button>
                <div #content class="p-tabview-nav-content" (scroll)="onScroll($event)" [attr.data-pc-section]="'navcontent'">
                    <ul #navbar class="p-tabview-nav" role="tablist" [attr.data-pc-section]="'nav'">
                        <ng-template ngFor let-tab [ngForOf]="tabs" let-i="index">
                            <li role="presentation" [ngClass]="{ 'p-highlight': tab.selected, 'p-disabled': tab.disabled }" [attr.data-p-disabled]="tab.disabled" [ngStyle]="tab.headerStyle" [class]="tab.headerStyleClass" *ngIf="!tab.closed">
                                <a
                                    role="tab"
                                    class="p-tabview-nav-link"
                                    [pTooltip]="tab.tooltip"
                                    [tooltipPosition]="tab.tooltipPosition"
                                    [positionStyle]="tab.tooltipPositionStyle"
                                    [tooltipStyleClass]="tab.tooltipStyleClass"
                                    [attr.id]="getTabHeaderActionId(tab.id)"
                                    [attr.aria-controls]="getTabContentId(tab.id)"
                                    [attr.aria-selected]="tab.selected"
                                    [attr.tabindex]="tab.disabled || !tab.selected ? '-1' : tabindex"
                                    [attr.aria-disabled]="tab.disabled"
                                    [attr.data-pc-index]="i"
                                    [attr.data-pc-section]="'headeraction'"
                                    (click)="open($event, tab)"
                                    (keydown)="onTabKeyDown($event, tab)"
                                    pRipple
                                >
                                    <ng-container *ngIf="!tab.headerTemplate">
                                        <span class="p-tabview-left-icon" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon && !tab.leftIconTemplate"></span>
                                        <span *ngIf="tab.leftIconTemplate" class="p-tabview-left-icon">
                                            <ng-template *ngTemplateOutlet="tab.leftIconTemplate"></ng-template>
                                        </span>
                                        <span class="p-tabview-title">{{ tab.header }}</span>
                                        <span class="p-tabview-right-icon" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon && !tab.rightIconTemplate"></span>
                                        <span *ngIf="tab.rightIconTemplate" class="p-tabview-right-icon">
                                            <ng-template *ngTemplateOutlet="tab.rightIconTemplate"></ng-template>
                                        </span>
                                    </ng-container>
                                    <ng-container *ngTemplateOutlet="tab.headerTemplate"></ng-container>
                                    <ng-container *ngIf="tab.closable">
                                        <TimesIcon *ngIf="!tab.closeIconTemplate" [styleClass]="'p-tabview-close'" (click)="close($event, tab)" />
                                        <span class="tab.closeIconTemplate" *ngIf="tab.closeIconTemplate"></span>
                                        <ng-template *ngTemplateOutlet="tab.closeIconTemplate"></ng-template>
                                    </ng-container>
                                </a>
                            </li>
                        </ng-template>
                        <li #inkbar class="p-tabview-ink-bar" role="presentation" aria-hidden="true" [attr.data-pc-section]="'inkbar'"></li>
                    </ul>
                </div>
                <button
                    *ngIf="scrollable && !forwardIsDisabled && buttonVisible"
                    #nextBtn
                    [attr.tabindex]="tabindex"
                    [attr.aria-label]="nextButtonAriaLabel"
                    class="p-tabview-nav-next p-tabview-nav-btn p-link"
                    (click)="navForward()"
                    type="button"
                    pRipple
                >
                    <ChevronRightIcon *ngIf="!nextIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-tabview-panels">
                <ng-content></ng-content>
            </div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-tabview-nav-container{position:relative}.p-tabview-scrollable .p-tabview-nav-container{overflow:hidden}.p-tabview-nav-content{overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;scrollbar-width:none;overscroll-behavior:contain auto}.p-tabview-nav{display:inline-flex;min-width:100%;margin:0;padding:0;list-style-type:none;flex:1 1 auto}.p-tabview-nav-link{cursor:pointer;user-select:none;display:flex;align-items:center;position:relative;text-decoration:none;overflow:hidden}.p-tabview-ink-bar{display:none;z-index:1}.p-tabview-nav-link:focus{z-index:1}.p-tabview-title{line-height:1;white-space:nowrap}.p-tabview-nav-btn{position:absolute;top:0;z-index:2;height:100%;display:flex;align-items:center;justify-content:center}.p-tabview-nav-prev{left:0}.p-tabview-nav-next{right:0}.p-tabview-nav-content::-webkit-scrollbar{display:none}.p-tabview-close{z-index:1}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronLeftIcon), selector: "ChevronLeftIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TabView, decorators: [{
            type: Component,
            args: [{ selector: 'p-tabView', template: `
        <div [ngClass]="{ 'p-tabview p-component': true, 'p-tabview-scrollable': scrollable }" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'tabview'">
            <div #elementToObserve class="p-tabview-nav-container">
                <button
                    *ngIf="scrollable && !backwardIsDisabled && autoHideButtons"
                    #prevBtn
                    class="p-tabview-nav-prev p-tabview-nav-btn p-link"
                    (click)="navBackward()"
                    [attr.tabindex]="tabindex"
                    [attr.aria-label]="prevButtonAriaLabel"
                    type="button"
                    pRipple
                >
                    <ChevronLeftIcon *ngIf="!previousIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                </button>
                <div #content class="p-tabview-nav-content" (scroll)="onScroll($event)" [attr.data-pc-section]="'navcontent'">
                    <ul #navbar class="p-tabview-nav" role="tablist" [attr.data-pc-section]="'nav'">
                        <ng-template ngFor let-tab [ngForOf]="tabs" let-i="index">
                            <li role="presentation" [ngClass]="{ 'p-highlight': tab.selected, 'p-disabled': tab.disabled }" [attr.data-p-disabled]="tab.disabled" [ngStyle]="tab.headerStyle" [class]="tab.headerStyleClass" *ngIf="!tab.closed">
                                <a
                                    role="tab"
                                    class="p-tabview-nav-link"
                                    [pTooltip]="tab.tooltip"
                                    [tooltipPosition]="tab.tooltipPosition"
                                    [positionStyle]="tab.tooltipPositionStyle"
                                    [tooltipStyleClass]="tab.tooltipStyleClass"
                                    [attr.id]="getTabHeaderActionId(tab.id)"
                                    [attr.aria-controls]="getTabContentId(tab.id)"
                                    [attr.aria-selected]="tab.selected"
                                    [attr.tabindex]="tab.disabled || !tab.selected ? '-1' : tabindex"
                                    [attr.aria-disabled]="tab.disabled"
                                    [attr.data-pc-index]="i"
                                    [attr.data-pc-section]="'headeraction'"
                                    (click)="open($event, tab)"
                                    (keydown)="onTabKeyDown($event, tab)"
                                    pRipple
                                >
                                    <ng-container *ngIf="!tab.headerTemplate">
                                        <span class="p-tabview-left-icon" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon && !tab.leftIconTemplate"></span>
                                        <span *ngIf="tab.leftIconTemplate" class="p-tabview-left-icon">
                                            <ng-template *ngTemplateOutlet="tab.leftIconTemplate"></ng-template>
                                        </span>
                                        <span class="p-tabview-title">{{ tab.header }}</span>
                                        <span class="p-tabview-right-icon" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon && !tab.rightIconTemplate"></span>
                                        <span *ngIf="tab.rightIconTemplate" class="p-tabview-right-icon">
                                            <ng-template *ngTemplateOutlet="tab.rightIconTemplate"></ng-template>
                                        </span>
                                    </ng-container>
                                    <ng-container *ngTemplateOutlet="tab.headerTemplate"></ng-container>
                                    <ng-container *ngIf="tab.closable">
                                        <TimesIcon *ngIf="!tab.closeIconTemplate" [styleClass]="'p-tabview-close'" (click)="close($event, tab)" />
                                        <span class="tab.closeIconTemplate" *ngIf="tab.closeIconTemplate"></span>
                                        <ng-template *ngTemplateOutlet="tab.closeIconTemplate"></ng-template>
                                    </ng-container>
                                </a>
                            </li>
                        </ng-template>
                        <li #inkbar class="p-tabview-ink-bar" role="presentation" aria-hidden="true" [attr.data-pc-section]="'inkbar'"></li>
                    </ul>
                </div>
                <button
                    *ngIf="scrollable && !forwardIsDisabled && buttonVisible"
                    #nextBtn
                    [attr.tabindex]="tabindex"
                    [attr.aria-label]="nextButtonAriaLabel"
                    class="p-tabview-nav-next p-tabview-nav-btn p-link"
                    (click)="navForward()"
                    type="button"
                    pRipple
                >
                    <ChevronRightIcon *ngIf="!nextIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-tabview-panels">
                <ng-content></ng-content>
            </div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-tabview-nav-container{position:relative}.p-tabview-scrollable .p-tabview-nav-container{overflow:hidden}.p-tabview-nav-content{overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;scrollbar-width:none;overscroll-behavior:contain auto}.p-tabview-nav{display:inline-flex;min-width:100%;margin:0;padding:0;list-style-type:none;flex:1 1 auto}.p-tabview-nav-link{cursor:pointer;user-select:none;display:flex;align-items:center;position:relative;text-decoration:none;overflow:hidden}.p-tabview-ink-bar{display:none;z-index:1}.p-tabview-nav-link:focus{z-index:1}.p-tabview-title{line-height:1;white-space:nowrap}.p-tabview-nav-btn{position:absolute;top:0;z-index:2;height:100%;display:flex;align-items:center;justify-content:center}.p-tabview-nav-prev{left:0}.p-tabview-nav-next{right:0}.p-tabview-nav-content::-webkit-scrollbar{display:none}.p-tabview-close{z-index:1}}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }], propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], controlClose: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], scrollable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], activeIndex: [{
                type: Input
            }], selectOnFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nextButtonAriaLabel: [{
                type: Input
            }], prevButtonAriaLabel: [{
                type: Input
            }], autoHideButtons: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], onChange: [{
                type: Output
            }], onClose: [{
                type: Output
            }], activeIndexChange: [{
                type: Output
            }], content: [{
                type: ViewChild,
                args: ['content']
            }], navbar: [{
                type: ViewChild,
                args: ['navbar']
            }], prevBtn: [{
                type: ViewChild,
                args: ['prevBtn']
            }], nextBtn: [{
                type: ViewChild,
                args: ['nextBtn']
            }], inkbar: [{
                type: ViewChild,
                args: ['inkbar']
            }], tabPanels: [{
                type: ContentChildren,
                args: [TabPanel]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], elementToObserve: [{
                type: ViewChild,
                args: ['elementToObserve']
            }] } });
export class TabViewModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TabViewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: TabViewModule, declarations: [TabView, TabPanel], imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon], exports: [TabView, TabPanel, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TabViewModule, imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TabViewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon],
                    exports: [TabView, TabPanel, SharedModule],
                    declarations: [TabView, TabPanel]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFHSCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFHZixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBRVIsTUFBTSxFQUNOLFdBQVcsRUFJWCxTQUFTLEVBRVQsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsZUFBZSxFQUVsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUdoRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBR2xEOzs7R0FHRztBQXdCSCxNQUFNLE9BQU8sUUFBUTtJQWdLdUQ7SUFBdUI7SUFBd0M7SUEvSnZJOzs7T0FHRztJQUNxQyxRQUFRLEdBQXdCLEtBQUssQ0FBQztJQUM5RTs7O09BR0c7SUFDSCxJQUFhLFdBQVc7UUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFJLFdB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QUFZLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsYUFuZnRHLE9BQU8sRUFwU1AsUUFBUSxFQXd4QlksWUFBWTt3R0FHaEMsYUFBYSxZQUpaLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUNsRixZQUFZOzsyRkFHaEMsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDaEgsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUM7b0JBQzFDLFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7aUJBQ3BDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRW1iZWRkZWRWaWV3UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBQTEFURk9STV9JRCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIGJvb2xlYW5BdHRyaWJ1dGUsXG4gICAgZm9yd2FyZFJlZixcbiAgICBudW1iZXJBdHRyaWJ1dGUsXG4gICAgc2lnbmFsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmxvY2thYmxlVUksIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBDaGV2cm9uTGVmdEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25sZWZ0JztcbmltcG9ydCB7IENoZXZyb25SaWdodEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25yaWdodCc7XG5pbXBvcnQgeyBUaW1lc0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3RpbWVzJztcbmltcG9ydCB7IFJpcHBsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUYWJWaWV3Q2hhbmdlRXZlbnQsIFRhYlZpZXdDbG9zZUV2ZW50IH0gZnJvbSAnLi90YWJ2aWV3LmludGVyZmFjZSc7XG5pbXBvcnQgeyBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuXG4vKipcbiAqIFRhYlBhbmVsIGlzIGEgaGVscGVyIGNvbXBvbmVudCBmb3IgVGFiVmlldyBjb21wb25lbnQuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdGFiUGFuZWwnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgICpuZ0lmPVwiIWNsb3NlZFwiXG4gICAgICAgICAgICBjbGFzcz1cInAtdGFidmlldy1wYW5lbFwiXG4gICAgICAgICAgICByb2xlPVwidGFicGFuZWxcIlxuICAgICAgICAgICAgW2hpZGRlbl09XCIhc2VsZWN0ZWRcIlxuICAgICAgICAgICAgW2F0dHIuaWRdPVwidGFiVmlldy5nZXRUYWJDb250ZW50SWQoaWQpXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cIiFzZWxlY3RlZFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwidGFiVmlldy5nZXRUYWJIZWFkZXJBY3Rpb25JZChpZClcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1uYW1lXT1cIid0YWJwYW5lbCdcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29udGVudFRlbXBsYXRlICYmIChjYWNoZSA/IGxvYWRlZCA6IHNlbGVjdGVkKVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUYWJQYW5lbCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiB0YWIgY2FuIGJlIHJlbW92ZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGNsb3NhYmxlOiBib29sZWFuIHwgdW5kZWZpbmVkID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSB0YWIgaGVhZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBoZWFkZXJTdHlsZSgpOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlYWRlclN0eWxlO1xuICAgIH1cbiAgICBzZXQgaGVhZGVyU3R5bGUoaGVhZGVyU3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5faGVhZGVyU3R5bGUgPSBoZWFkZXJTdHlsZTtcbiAgICAgICAgdGhpcy50YWJWaWV3LmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgdGFiIGhlYWRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgaGVhZGVyU3R5bGVDbGFzcygpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVhZGVyU3R5bGVDbGFzcztcbiAgICB9XG4gICAgc2V0IGhlYWRlclN0eWxlQ2xhc3MoaGVhZGVyU3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2hlYWRlclN0eWxlQ2xhc3MgPSBoZWFkZXJTdHlsZUNsYXNzO1xuICAgICAgICB0aGlzLnRhYlZpZXcuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgYSBsYXp5IGxvYWRlZCBwYW5lbCBzaG91bGQgYXZvaWQgZ2V0dGluZyBsb2FkZWQgYWdhaW4gb24gcmVzZWxlY3Rpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGNhY2hlOiBib29sZWFuIHwgdW5kZWZpbmVkID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBBZHZpc29yeSBpbmZvcm1hdGlvbiB0byBkaXNwbGF5IGluIGEgdG9vbHRpcCBvbiBob3Zlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b29sdGlwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gb2YgdGhlIHRvb2x0aXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdG9vbHRpcFBvc2l0aW9uOiAndG9wJyB8ICdib3R0b20nIHwgJ2xlZnQnIHwgJ3JpZ2h0JyB8IHVuZGVmaW5lZCA9ICd0b3AnO1xuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgQ1NTIHBvc2l0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvb2x0aXBQb3NpdGlvblN0eWxlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSAnYWJzb2x1dGUnO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSB0b29sdGlwLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvb2x0aXBTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiB0YWIgaXMgYWN0aXZlLlxuICAgICAqIEBkZWZhdWx0VmFsdWUgZmFsc2VcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX3NlbGVjdGVkO1xuICAgIH1cbiAgICBzZXQgc2VsZWN0ZWQodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdmFsO1xuXG4gICAgICAgIGlmICghdGhpcy5sb2FkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbCkgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUsIHRhYiBjYW5ub3QgYmUgYWN0aXZhdGVkLlxuICAgICAqIEBkZWZhdWx0VmFsdWUgZmFsc2VcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2Rpc2FibGVkO1xuICAgIH1cbiAgICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgdGhpcy50YWJWaWV3LmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaXRsZSBvZiB0aGUgdGFiUGFuZWwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGhlYWRlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVhZGVyO1xuICAgIH1cbiAgICBzZXQgaGVhZGVyKGhlYWRlcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2hlYWRlciA9IGhlYWRlcjtcblxuICAgICAgICAvLyBXZSBoYXZlIHRvIHdhaXQgZm9yIHRoZSByZW5kZXJpbmcgYW5kIHRoZW4gcmV0cmlldmUgdGhlIGFjdHVhbCBzaXplIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxuICAgICAgICAvLyBpbiBmdXR1cmUgYFByb21pc2UucmVzb2x2ZWAgY2FuIGJlIGNoYW5nZWQgdG8gYHF1ZXVlTWljcm90YXNrYCAoaWYgaWUxMSBzdXBwb3J0IHdpbGwgYmUgZHJvcHBlZClcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRhYlZpZXcudXBkYXRlSW5rQmFyKCk7XG4gICAgICAgICAgICB0aGlzLnRhYlZpZXcuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMZWZ0IGljb24gb2YgdGhlIHRhYlBhbmVsLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYxNS40LjIsIHVzZSBgbGVmdGljb25gIHRlbXBsYXRlIGluc3RlYWQuXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGxlZnRJY29uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZWZ0SWNvbjtcbiAgICB9XG4gICAgc2V0IGxlZnRJY29uKGxlZnRJY29uOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbGVmdEljb24gPSBsZWZ0SWNvbjtcbiAgICAgICAgdGhpcy50YWJWaWV3LmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMZWZ0IGljb24gb2YgdGhlIHRhYlBhbmVsLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYxNS40LjIsIHVzZSBgcmlnaHRpY29uYCB0ZW1wbGF0ZSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCByaWdodEljb24oKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JpZ2h0SWNvbjtcbiAgICB9XG4gICAgc2V0IHJpZ2h0SWNvbihyaWdodEljb246IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9yaWdodEljb24gPSByaWdodEljb247XG4gICAgICAgIHRoaXMudGFiVmlldy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+IHwgdW5kZWZpbmVkO1xuXG4gICAgY2xvc2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICB2aWV3OiBFbWJlZGRlZFZpZXdSZWY8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gICAgX2hlYWRlclN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgX2hlYWRlclN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIF9zZWxlY3RlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIF9kaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIF9oZWFkZXIhOiBzdHJpbmc7XG5cbiAgICBfbGVmdEljb24hOiBzdHJpbmc7XG5cbiAgICBfcmlnaHRJY29uOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgICBsb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBpZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBsZWZ0SWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgcmlnaHRJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBjbG9zZUljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHRhYlZpZXc6IFRhYlZpZXc7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gVGFiVmlldykpIHRhYlZpZXc6IFRhYlZpZXcsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy50YWJWaWV3ID0gdGFiVmlldyBhcyBUYWJWaWV3O1xuICAgICAgICB0aGlzLmlkID0gVW5pcXVlQ29tcG9uZW50SWQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmlnaHRJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnRpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWZ0SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjbG9zZWljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy52aWV3ID0gbnVsbDtcbiAgICB9XG59XG4vKipcbiAqIFRhYlZpZXcgaXMgYSBjb250YWluZXIgY29tcG9uZW50IHRvIGdyb3VwIGNvbnRlbnQgd2l0aCB0YWJzLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRhYlZpZXcnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyAncC10YWJ2aWV3IHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtdGFidmlldy1zY3JvbGxhYmxlJzogc2Nyb2xsYWJsZSB9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFthdHRyLmRhdGEtcGMtbmFtZV09XCIndGFidmlldydcIj5cbiAgICAgICAgICAgIDxkaXYgI2VsZW1lbnRUb09ic2VydmUgY2xhc3M9XCJwLXRhYnZpZXctbmF2LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJzY3JvbGxhYmxlICYmICFiYWNrd2FyZElzRGlzYWJsZWQgJiYgYXV0b0hpZGVCdXR0b25zXCJcbiAgICAgICAgICAgICAgICAgICAgI3ByZXZCdG5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXRhYnZpZXctbmF2LXByZXYgcC10YWJ2aWV3LW5hdi1idG4gcC1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm5hdkJhY2t3YXJkKClcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwicHJldkJ1dHRvbkFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkxlZnRJY29uICpuZ0lmPVwiIXByZXZpb3VzSWNvblRlbXBsYXRlXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInByZXZpb3VzSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNjb250ZW50IGNsYXNzPVwicC10YWJ2aWV3LW5hdi1jb250ZW50XCIgKHNjcm9sbCk9XCJvblNjcm9sbCgkZXZlbnQpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIiduYXZjb250ZW50J1wiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgI25hdmJhciBjbGFzcz1cInAtdGFidmlldy1uYXZcIiByb2xlPVwidGFibGlzdFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbmF2J1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC10YWIgW25nRm9yT2ZdPVwidGFic1wiIGxldC1pPVwiaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiIFtuZ0NsYXNzXT1cInsgJ3AtaGlnaGxpZ2h0JzogdGFiLnNlbGVjdGVkLCAncC1kaXNhYmxlZCc6IHRhYi5kaXNhYmxlZCB9XCIgW2F0dHIuZGF0YS1wLWRpc2FibGVkXT1cInRhYi5kaXNhYmxlZFwiIFtuZ1N0eWxlXT1cInRhYi5oZWFkZXJTdHlsZVwiIFtjbGFzc109XCJ0YWIuaGVhZGVyU3R5bGVDbGFzc1wiICpuZ0lmPVwiIXRhYi5jbG9zZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJ0YWJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXRhYnZpZXctbmF2LWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BUb29sdGlwXT1cInRhYi50b29sdGlwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwidGFiLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcG9zaXRpb25TdHlsZV09XCJ0YWIudG9vbHRpcFBvc2l0aW9uU3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBTdHlsZUNsYXNzXT1cInRhYi50b29sdGlwU3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJnZXRUYWJIZWFkZXJBY3Rpb25JZCh0YWIuaWQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiZ2V0VGFiQ29udGVudElkKHRhYi5pZClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJ0YWIuc2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwidGFiLmRpc2FibGVkIHx8ICF0YWIuc2VsZWN0ZWQgPyAnLTEnIDogdGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1pbmRleF09XCJpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaGVhZGVyYWN0aW9uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib3BlbigkZXZlbnQsIHRhYilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25UYWJLZXlEb3duKCRldmVudCwgdGFiKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdGFiLmhlYWRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXRhYnZpZXctbGVmdC1pY29uXCIgW25nQ2xhc3NdPVwidGFiLmxlZnRJY29uXCIgKm5nSWY9XCJ0YWIubGVmdEljb24gJiYgIXRhYi5sZWZ0SWNvblRlbXBsYXRlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidGFiLmxlZnRJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtdGFidmlldy1sZWZ0LWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiLmxlZnRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtdGFidmlldy10aXRsZVwiPnt7IHRhYi5oZWFkZXIgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXRhYnZpZXctcmlnaHQtaWNvblwiIFtuZ0NsYXNzXT1cInRhYi5yaWdodEljb25cIiAqbmdJZj1cInRhYi5yaWdodEljb24gJiYgIXRhYi5yaWdodEljb25UZW1wbGF0ZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInRhYi5yaWdodEljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC10YWJ2aWV3LXJpZ2h0LWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiLnJpZ2h0SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWIuaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0YWIuY2xvc2FibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGltZXNJY29uICpuZ0lmPVwiIXRhYi5jbG9zZUljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLXRhYnZpZXctY2xvc2UnXCIgKGNsaWNrKT1cImNsb3NlKCRldmVudCwgdGFiKVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWIuY2xvc2VJY29uVGVtcGxhdGVcIiAqbmdJZj1cInRhYi5jbG9zZUljb25UZW1wbGF0ZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWIuY2xvc2VJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAjaW5rYmFyIGNsYXNzPVwicC10YWJ2aWV3LWluay1iYXJcIiByb2xlPVwicHJlc2VudGF0aW9uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpbmtiYXInXCI+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic2Nyb2xsYWJsZSAmJiAhZm9yd2FyZElzRGlzYWJsZWQgJiYgYnV0dG9uVmlzaWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICNuZXh0QnRuXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuZXh0QnV0dG9uQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXRhYnZpZXctbmF2LW5leHQgcC10YWJ2aWV3LW5hdi1idG4gcC1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm5hdkZvcndhcmQoKVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0SWNvbiAqbmdJZj1cIiFuZXh0SWNvblRlbXBsYXRlXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm5leHRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10YWJ2aWV3LXBhbmVsc1wiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFidmlldy5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVGFiVmlldyBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSwgQmxvY2thYmxlVUkge1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGFiIGNsb3NlIGlzIGNvbnRyb2xsZWQgYXQgb25DbG9zZSBldmVudCBvciBub3QuXG4gICAgICogQGRlZmF1bHRWYWx1ZSBmYWxzZVxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBjb250cm9sQ2xvc2U6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkIGRpc3BsYXlzIGJ1dHRvbnMgYXQgZWFjaCBzaWRlIG9mIHRoZSB0YWIgaGVhZGVycyB0byBzY3JvbGwgdGhlIHRhYiBsaXN0LlxuICAgICAqIEBkZWZhdWx0VmFsdWUgZmFsc2VcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2Nyb2xsYWJsZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgYWN0aXZlIHRhYiB0byBjaGFuZ2Ugc2VsZWN0ZWQgdGFiIHByb2dyYW1tYXRpY2FsbHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGFjdGl2ZUluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICB9XG4gICAgc2V0IGFjdGl2ZUluZGV4KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gdmFsO1xuICAgICAgICBpZiAodGhpcy5wcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5wcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGFicyAmJiB0aGlzLnRhYnMubGVuZ3RoICYmIHRoaXMuX2FjdGl2ZUluZGV4ICE9IG51bGwgJiYgdGhpcy50YWJzLmxlbmd0aCA+IHRoaXMuX2FjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAodGhpcy5maW5kU2VsZWN0ZWRUYWIoKSBhcyBUYWJQYW5lbCkuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGFic1t0aGlzLl9hY3RpdmVJbmRleF0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy50YWJDaGFuZ2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxCYXIodmFsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIHRoZSBmb2N1c2VkIHRhYiBpcyBhY3RpdmF0ZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNlbGVjdE9uRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGRlZmluZSBhIHN0cmluZyBhcmlhIGxhYmVsIGF0dHJpYnV0ZSB0aGUgZm9yd2FyZCBuYXZpZ2F0aW9uIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBuZXh0QnV0dG9uQXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBkZWZpbmUgYSBzdHJpbmcgYXJpYSBsYWJlbCBhdHRyaWJ1dGUgdGhlIGJhY2t3YXJkIG5hdmlnYXRpb24gYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHByZXZCdXR0b25BcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIGFjdGl2YXRlZCwgbmF2aWdhdGlvbiBidXR0b25zIHdpbGwgYXV0b21hdGljYWxseSBoaWRlIG9yIHNob3cgYmFzZWQgb24gdGhlIGF2YWlsYWJsZSBzcGFjZSB3aXRoaW4gdGhlIGNvbnRhaW5lci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYXV0b0hpZGVCdXR0b25zOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0YWJiaW5nIG9yZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHRhYmluZGV4OiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiB0YWIgY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7VGFiVmlld0NoYW5nZUV2ZW50fSBldmVudCAtIEN1c3RvbSB0YWIgY2hhbmdlIGV2ZW50XG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8VGFiVmlld0NoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFiVmlld0NoYW5nZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiB0YWIgY2xvc2UuXG4gICAgICogQHBhcmFtIHtUYWJWaWV3Q2xvc2VFdmVudH0gZXZlbnQgLSBDdXN0b20gdGFiIGNsb3NlIGV2ZW50XG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxUYWJWaWV3Q2xvc2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYlZpZXdDbG9zZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiB0aGUgYWN0aXZlIHRhYiBjaGFuZ2UuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gTmV3IGFjdGl2ZSBpbmRleFxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBhY3RpdmVJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50PzogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG5cbiAgICBAVmlld0NoaWxkKCduYXZiYXInKSBuYXZiYXI/OiBFbGVtZW50UmVmPEhUTUxVTGlzdEVsZW1lbnQ+O1xuXG4gICAgQFZpZXdDaGlsZCgncHJldkJ0bicpIHByZXZCdG4/OiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnbmV4dEJ0bicpIG5leHRCdG4/OiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnaW5rYmFyJykgaW5rYmFyPzogRWxlbWVudFJlZjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oVGFiUGFuZWwpIHRhYlBhbmVsczogUXVlcnlMaXN0PFRhYlBhbmVsPiB8IHVuZGVmaW5lZDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4gfCB1bmRlZmluZWQ7XG5cbiAgICBpbml0aWFsaXplZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHRhYnMhOiBUYWJQYW5lbFtdO1xuXG4gICAgX2FjdGl2ZUluZGV4ITogbnVtYmVyO1xuXG4gICAgcHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24hOiBib29sZWFuO1xuXG4gICAgdGFiQ2hhbmdlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGJhY2t3YXJkSXNEaXNhYmxlZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBmb3J3YXJkSXNEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSB0YWJDaGFuZ2VzU3Vic2NyaXB0aW9uITogU3Vic2NyaXB0aW9uO1xuXG4gICAgbmV4dEljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHByZXZpb3VzSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgcmVzaXplT2JzZXJ2ZXI6IE51bGxhYmxlPFJlc2l6ZU9ic2VydmVyPjtcblxuICAgIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbiAgICBsaXN0OiBIVE1MVUxpc3RFbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gICAgYnV0dG9uVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIEBWaWV3Q2hpbGQoJ2VsZW1lbnRUb09ic2VydmUnKSBlbGVtZW50VG9PYnNlcnZlOiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLmluaXRUYWJzKCk7XG5cbiAgICAgICAgdGhpcy50YWJDaGFuZ2VzU3Vic2NyaXB0aW9uID0gKHRoaXMudGFiUGFuZWxzIGFzIFF1ZXJ5TGlzdDxUYWJQYW5lbD4pLmNoYW5nZXMuc3Vic2NyaWJlKChfKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRUYWJzKCk7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hCdXR0b25TdGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAodGhpcy50ZW1wbGF0ZXMgYXMgUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+KS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAncHJldmlvdXNpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbmV4dGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b0hpZGVCdXR0b25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kUmVzaXplT2JzZXJ2ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRSZXNpemVPYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cIm5hdmNvbnRlbnRcIl0nKTtcbiAgICAgICAgdGhpcy5saXN0ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJuYXZcIl0nKTtcblxuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3Qub2Zmc2V0V2lkdGggPj0gdGhpcy5jb250YWluZXIub2Zmc2V0V2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICB1bmJpbmRSZXNpemVPYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy5lbGVtZW50VG9PYnNlcnZlLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50YWJDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVJbmtCYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYkNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50YWJDaGFuZ2VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRhYkNoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLnVuYmluZFJlc2l6ZU9ic2VydmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUYWJIZWFkZXJBY3Rpb25JZCh0YWJJZCkge1xuICAgICAgICByZXR1cm4gYCR7dGFiSWR9X2hlYWRlcl9hY3Rpb25gO1xuICAgIH1cblxuICAgIGdldFRhYkNvbnRlbnRJZCh0YWJJZCkge1xuICAgICAgICByZXR1cm4gYCR7dGFiSWR9X2NvbnRlbnRgO1xuICAgIH1cblxuICAgIGluaXRUYWJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhYnMgPSAodGhpcy50YWJQYW5lbHMgYXMgUXVlcnlMaXN0PFRhYlBhbmVsPikudG9BcnJheSgpO1xuICAgICAgICBsZXQgc2VsZWN0ZWRUYWI6IFRhYlBhbmVsID0gdGhpcy5maW5kU2VsZWN0ZWRUYWIoKSBhcyBUYWJQYW5lbDtcbiAgICAgICAgaWYgKCFzZWxlY3RlZFRhYiAmJiB0aGlzLnRhYnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVJbmRleCAhPSBudWxsICYmIHRoaXMudGFicy5sZW5ndGggPiB0aGlzLmFjdGl2ZUluZGV4KSB0aGlzLnRhYnNbdGhpcy5hY3RpdmVJbmRleF0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZWxzZSB0aGlzLnRhYnNbMF0uc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLnRhYkNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvblRhYktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIHRhYjogVGFiUGFuZWwpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJBcnJvd0xlZnRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiQXJyb3dSaWdodEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJIb21lS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiRW5kS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJFbmRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJIb21lS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgICAgIHRoaXMub3BlbihldmVudCwgdGFiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGFiQXJyb3dMZWZ0S2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHByZXZIZWFkZXJBY3Rpb24gPSB0aGlzLmZpbmRQcmV2SGVhZGVyQWN0aW9uKCg8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShwcmV2SGVhZGVyQWN0aW9uLCAnZGF0YS1wYy1pbmRleCcpO1xuXG4gICAgICAgIHByZXZIZWFkZXJBY3Rpb24gPyB0aGlzLmNoYW5nZUZvY3VzZWRUYWIoZXZlbnQsIHByZXZIZWFkZXJBY3Rpb24sIGluZGV4KSA6IHRoaXMub25UYWJFbmRLZXkoZXZlbnQpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uVGFiQXJyb3dSaWdodEtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBuZXh0SGVhZGVyQWN0aW9uID0gdGhpcy5maW5kTmV4dEhlYWRlckFjdGlvbigoPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldCkucGFyZW50RWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUobmV4dEhlYWRlckFjdGlvbiwgJ2RhdGEtcGMtaW5kZXgnKTtcblxuICAgICAgICBuZXh0SGVhZGVyQWN0aW9uID8gdGhpcy5jaGFuZ2VGb2N1c2VkVGFiKGV2ZW50LCBuZXh0SGVhZGVyQWN0aW9uLCBpbmRleCkgOiB0aGlzLm9uVGFiSG9tZUtleShldmVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25UYWJIb21lS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGZpcnN0SGVhZGVyQWN0aW9uID0gdGhpcy5maW5kRmlyc3RIZWFkZXJBY3Rpb24oKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShmaXJzdEhlYWRlckFjdGlvbiwgJ2RhdGEtcGMtaW5kZXgnKTtcblxuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRUYWIoZXZlbnQsIGZpcnN0SGVhZGVyQWN0aW9uLCBpbmRleCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25UYWJFbmRLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgbGFzdEhlYWRlckFjdGlvbiA9IHRoaXMuZmluZExhc3RIZWFkZXJBY3Rpb24oKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShsYXN0SGVhZGVyQWN0aW9uLCAnZGF0YS1wYy1pbmRleCcpO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZFRhYihldmVudCwgbGFzdEhlYWRlckFjdGlvbiwgaW5kZXgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGNoYW5nZUZvY3VzZWRUYWIoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGVsZW1lbnQ6IGFueSwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5mb2N1cyhlbGVtZW50KTtcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RPbkZvY3VzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFiID0gdGhpcy50YWJzW2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW4oZXZlbnQsIHRhYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTmV4dEhlYWRlckFjdGlvbih0YWJFbGVtZW50OiBhbnksIHNlbGZDaGVjayA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlckVsZW1lbnQgPSBzZWxmQ2hlY2sgPyB0YWJFbGVtZW50IDogdGFiRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIHJldHVybiBoZWFkZXJFbGVtZW50XG4gICAgICAgICAgICA/IERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGhlYWRlckVsZW1lbnQsICdkYXRhLXAtZGlzYWJsZWQnKSB8fCBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShoZWFkZXJFbGVtZW50LCAnZGF0YS1wYy1zZWN0aW9uJykgPT09ICdpbmtiYXInXG4gICAgICAgICAgICAgICAgPyB0aGlzLmZpbmROZXh0SGVhZGVyQWN0aW9uKGhlYWRlckVsZW1lbnQpXG4gICAgICAgICAgICAgICAgOiBEb21IYW5kbGVyLmZpbmRTaW5nbGUoaGVhZGVyRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJoZWFkZXJhY3Rpb25cIl0nKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIGZpbmRQcmV2SGVhZGVyQWN0aW9uKHRhYkVsZW1lbnQ6IGFueSwgc2VsZkNoZWNrID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IHNlbGZDaGVjayA/IHRhYkVsZW1lbnQgOiB0YWJFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgcmV0dXJuIGhlYWRlckVsZW1lbnRcbiAgICAgICAgICAgID8gRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUoaGVhZGVyRWxlbWVudCwgJ2RhdGEtcC1kaXNhYmxlZCcpIHx8IERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGhlYWRlckVsZW1lbnQsICdkYXRhLXBjLXNlY3Rpb24nKSA9PT0gJ2lua2JhcidcbiAgICAgICAgICAgICAgICA/IHRoaXMuZmluZFByZXZIZWFkZXJBY3Rpb24oaGVhZGVyRWxlbWVudClcbiAgICAgICAgICAgICAgICA6IERvbUhhbmRsZXIuZmluZFNpbmdsZShoZWFkZXJFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImhlYWRlcmFjdGlvblwiXScpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxuXG4gICAgZmluZEZpcnN0SGVhZGVyQWN0aW9uKCkge1xuICAgICAgICBjb25zdCBmaXJzdEVsID0gdGhpcy5uYXZiYXIubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZE5leHRIZWFkZXJBY3Rpb24oZmlyc3RFbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZmluZExhc3RIZWFkZXJBY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGxhc3RFbCA9IHRoaXMubmF2YmFyLm5hdGl2ZUVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgY29uc3QgbGFzdEhlYWRlckFjdGlvbiA9IERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGxhc3RFbCwgJ2RhdGEtcGMtc2VjdGlvbicpID09PSAnaW5rYmFyJyA/IGxhc3RFbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIDogbGFzdEVsO1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kUHJldkhlYWRlckFjdGlvbihsYXN0SGVhZGVyQWN0aW9uLCB0cnVlKTtcbiAgICB9XG5cbiAgICBvcGVuKGV2ZW50OiBFdmVudCwgdGFiOiBUYWJQYW5lbCkge1xuICAgICAgICBpZiAodGFiLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0YWIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFRhYjogVGFiUGFuZWwgPSB0aGlzLmZpbmRTZWxlY3RlZFRhYigpIGFzIFRhYlBhbmVsO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkVGFiKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRUYWIuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50YWJDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRhYi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRUYWJJbmRleCA9IHRoaXMuZmluZFRhYkluZGV4KHRhYik7XG4gICAgICAgICAgICB0aGlzLnByZXZlbnRBY3RpdmVJbmRleFByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChzZWxlY3RlZFRhYkluZGV4KTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbmRleDogc2VsZWN0ZWRUYWJJbmRleCB9KTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxCYXIoc2VsZWN0ZWRUYWJJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZShldmVudDogRXZlbnQsIHRhYjogVGFiUGFuZWwpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbENsb3NlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuZmluZFRhYkluZGV4KHRhYiksXG4gICAgICAgICAgICAgICAgY2xvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVRhYih0YWIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVRhYih0YWIpO1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmZpbmRUYWJJbmRleCh0YWIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlVGFiKHRhYjogVGFiUGFuZWwpIHtcbiAgICAgICAgaWYgKHRhYi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YWIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGFiQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB0YWIuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhYlBhbmVsID0gdGhpcy50YWJzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghdGFiUGFuZWwuY2xvc2VkICYmICF0YWIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFiUGFuZWwuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0YWIuY2xvc2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBmaW5kU2VsZWN0ZWRUYWIoKTogVGFiUGFuZWwgfCBudWxsIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhYnNbaV0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YWJzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZpbmRUYWJJbmRleCh0YWI6IFRhYlBhbmVsKSB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFic1tpXSA9PSB0YWIpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIGdldEJsb2NrYWJsZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIHVwZGF0ZUlua0JhcigpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5hdmJhcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhYkhlYWRlcjogSFRNTEVsZW1lbnQgfCBudWxsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMubmF2YmFyLm5hdGl2ZUVsZW1lbnQsICdsaS5wLWhpZ2hsaWdodCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0YWJIZWFkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICh0aGlzLmlua2JhciBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gRG9tSGFuZGxlci5nZXRXaWR0aCh0YWJIZWFkZXIpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAodGhpcy5pbmtiYXIgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gRG9tSGFuZGxlci5nZXRPZmZzZXQodGFiSGVhZGVyKS5sZWZ0IC0gRG9tSGFuZGxlci5nZXRPZmZzZXQodGhpcy5uYXZiYXIubmF0aXZlRWxlbWVudCkubGVmdCArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVTY3JvbGxCYXIoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBsZXQgdGFiSGVhZGVyID0gKHRoaXMubmF2YmFyIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgIGlmICh0YWJIZWFkZXIpIHtcbiAgICAgICAgICAgIHRhYkhlYWRlci5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVCdXR0b25TdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9ICh0aGlzLmNvbnRlbnQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3QgeyBzY3JvbGxMZWZ0LCBzY3JvbGxXaWR0aCB9ID0gY29udGVudDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBEb21IYW5kbGVyLmdldFdpZHRoKGNvbnRlbnQpO1xuXG4gICAgICAgIHRoaXMuYmFja3dhcmRJc0Rpc2FibGVkID0gc2Nyb2xsTGVmdCA9PT0gMDtcbiAgICAgICAgdGhpcy5mb3J3YXJkSXNEaXNhYmxlZCA9IE1hdGgucm91bmQoc2Nyb2xsTGVmdCkgPT09IHNjcm9sbFdpZHRoIC0gd2lkdGg7XG4gICAgfVxuXG4gICAgcmVmcmVzaEJ1dHRvblN0YXRlKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwibmF2Y29udGVudFwiXScpO1xuICAgICAgICB0aGlzLmxpc3QgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cIm5hdlwiXScpO1xuICAgICAgICBpZiAodGhpcy5saXN0Lm9mZnNldFdpZHRoID49IHRoaXMuY29udGFpbmVyLm9mZnNldFdpZHRoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5saXN0Lm9mZnNldFdpZHRoID49IHRoaXMuY29udGFpbmVyLm9mZnNldFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25WaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25WaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlKCk7XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TY3JvbGwoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsYWJsZSAmJiB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlKCk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBnZXRWaXNpYmxlQnV0dG9uV2lkdGhzKCkge1xuICAgICAgICByZXR1cm4gW3RoaXMucHJldkJ0bj8ubmF0aXZlRWxlbWVudCwgdGhpcy5uZXh0QnRuPy5uYXRpdmVFbGVtZW50XS5yZWR1Y2UoKGFjYywgZWwpID0+IChlbCA/IGFjYyArIERvbUhhbmRsZXIuZ2V0V2lkdGgoZWwpIDogYWNjKSwgMCk7XG4gICAgfVxuXG4gICAgbmF2QmFja3dhcmQoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSAodGhpcy5jb250ZW50IGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gRG9tSGFuZGxlci5nZXRXaWR0aChjb250ZW50KSAtIHRoaXMuZ2V0VmlzaWJsZUJ1dHRvbldpZHRocygpO1xuICAgICAgICBjb25zdCBwb3MgPSBjb250ZW50LnNjcm9sbExlZnQgLSB3aWR0aDtcbiAgICAgICAgY29udGVudC5zY3JvbGxMZWZ0ID0gcG9zIDw9IDAgPyAwIDogcG9zO1xuICAgIH1cblxuICAgIG5hdkZvcndhcmQoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSAodGhpcy5jb250ZW50IGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gRG9tSGFuZGxlci5nZXRXaWR0aChjb250ZW50KSAtIHRoaXMuZ2V0VmlzaWJsZUJ1dHRvbldpZHRocygpO1xuICAgICAgICBjb25zdCBwb3MgPSBjb250ZW50LnNjcm9sbExlZnQgKyB3aWR0aDtcbiAgICAgICAgY29uc3QgbGFzdFBvcyA9IGNvbnRlbnQuc2Nyb2xsV2lkdGggLSB3aWR0aDtcblxuICAgICAgICBjb250ZW50LnNjcm9sbExlZnQgPSBwb3MgPj0gbGFzdFBvcyA/IGxhc3RQb3MgOiBwb3M7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFNoYXJlZE1vZHVsZSwgVG9vbHRpcE1vZHVsZSwgUmlwcGxlTW9kdWxlLCBUaW1lc0ljb24sIENoZXZyb25MZWZ0SWNvbiwgQ2hldnJvblJpZ2h0SWNvbl0sXG4gICAgZXhwb3J0czogW1RhYlZpZXcsIFRhYlBhbmVsLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1RhYlZpZXcsIFRhYlBhbmVsXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJWaWV3TW9kdWxlIHt9XG4iXX0=