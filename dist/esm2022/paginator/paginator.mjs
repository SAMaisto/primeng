import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, NgModule, Output, ViewEncapsulation, booleanAttribute, numberAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { AngleDoubleLeftIcon } from 'primeng/icons/angledoubleleft';
import { AngleDoubleRightIcon } from 'primeng/icons/angledoubleright';
import { AngleLeftIcon } from 'primeng/icons/angleleft';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/dropdown";
import * as i4 from "primeng/inputnumber";
import * as i5 from "@angular/forms";
import * as i6 from "primeng/ripple";
/**
 * Paginator is a generic component to display content in paged format.
 * @group Components
 */
export class Paginator {
    cd;
    config;
    /**
     * Number of page links to display.
     * @group Props
     */
    pageLinkSize = 5;
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
     * Whether to show it even there is only one page.
     * @group Props
     */
    alwaysShow = true;
    /**
     * Target element to attach the dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    dropdownAppendTo;
    /**
     * Template instance to inject into the left side of the paginator.
     * @param {PaginatorState} context - Paginator state.
     * @group Props
     */
    templateLeft;
    /**
     * Template instance to inject into the right side of the paginator.
     * @param {PaginatorState} context - Paginator state.
     * @group Props
     */
    templateRight;
    /**
     * Target element to attach the dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * Dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    dropdownScrollHeight = '200px';
    /**
     * Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords}
     * @group Props
     */
    currentPageReportTemplate = '{currentPage} of {totalPages}';
    /**
     * Whether to display current page report.
     * @group Props
     */
    showCurrentPageReport;
    /**
     * When enabled, icons are displayed on paginator to go first and last page.
     * @group Props
     */
    showFirstLastIcon = true;
    /**
     * Number of total records.
     * @group Props
     */
    totalRecords = 0;
    /**
     * Data count to display per page.
     * @group Props
     */
    rows = 0;
    /**
     * Array of integer/object values to display inside rows per page dropdown. A object that have 'showAll' key can be added to it to show all data. Exp; [10,20,30,{showAll:'All'}]
     * @group Props
     */
    rowsPerPageOptions;
    /**
     * Whether to display a dropdown to navigate to any page.
     * @group Props
     */
    showJumpToPageDropdown;
    /**
     * Whether to display a input to navigate to any page.
     * @group Props
     */
    showJumpToPageInput;
    /**
     * Template instance to inject into the jump to page dropdown item inside in the paginator.
     * @param {Object} context - item instance.
     * @group Props
     */
    jumpToPageItemTemplate;
    /**
     * Whether to show page links.
     * @group Props
     */
    showPageLinks = true;
    /**
     * Locale to be used in formatting.
     * @group Props
     */
    locale;
    /**
     * Template instance to inject into the rows per page dropdown item inside in the paginator.
     * @param {Object} context - item instance.
     * @group Props
     */
    dropdownItemTemplate;
    /**
     * Zero-relative number of the first row to be displayed.
     * @group Props
     */
    get first() {
        return this._first;
    }
    set first(val) {
        this._first = val;
    }
    /**
     * Callback to invoke when page changes, the event object contains information about the new state.
     * @param {PaginatorState} event - Paginator state.
     * @group Emits
     */
    onPageChange = new EventEmitter();
    templates;
    dropdownIconTemplate;
    firstPageLinkIconTemplate;
    previousPageLinkIconTemplate;
    lastPageLinkIconTemplate;
    nextPageLinkIconTemplate;
    pageLinks;
    pageItems;
    rowsPerPageItems;
    paginatorState;
    _first = 0;
    _page = 0;
    constructor(cd, config) {
        this.cd = cd;
        this.config = config;
    }
    ngOnInit() {
        this.updatePaginatorState();
    }
    getAriaLabel(labelType) {
        return this.config.translation.aria ? this.config.translation.aria[labelType] : undefined;
    }
    getPageAriaLabel(value) {
        return this.config.translation.aria ? this.config.translation.aria.pageLabel.replace(/{page}/g, `Page ${value}`) : undefined;
    }
    getLocalization(digit) {
        const numerals = [...new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210)].reverse();
        const index = new Map(numerals.map((d, i) => [i, d]));
        if (digit > 9) {
            const numbers = String(digit).split('');
            return numbers.map((number) => index.get(Number(number))).join('');
        }
        else {
            return index.get(digit);
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'dropdownicon':
                    this.dropdownIconTemplate = item.template;
                    break;
                case 'firstpagelinkicon':
                    this.firstPageLinkIconTemplate = item.template;
                    break;
                case 'previouspagelinkicon':
                    this.previousPageLinkIconTemplate = item.template;
                    break;
                case 'lastpagelinkicon':
                    this.lastPageLinkIconTemplate = item.template;
                    break;
                case 'nextpagelinkicon':
                    this.nextPageLinkIconTemplate = item.template;
                    break;
            }
        });
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.totalRecords) {
            this.updatePageLinks();
            this.updatePaginatorState();
            this.updateFirst();
            this.updateRowsPerPageOptions();
        }
        if (simpleChange.first) {
            this._first = simpleChange.first.currentValue;
            this.updatePageLinks();
            this.updatePaginatorState();
        }
        if (simpleChange.rows) {
            this.updatePageLinks();
            this.updatePaginatorState();
        }
        if (simpleChange.rowsPerPageOptions) {
            this.updateRowsPerPageOptions();
        }
        if (simpleChange.pageLinkSize) {
            this.updatePageLinks();
        }
    }
    updateRowsPerPageOptions() {
        if (this.rowsPerPageOptions) {
            this.rowsPerPageItems = [];
            for (let opt of this.rowsPerPageOptions) {
                if (typeof opt == 'object' && opt['showAll']) {
                    this.rowsPerPageItems.unshift({ label: opt['showAll'], value: this.totalRecords });
                }
                else {
                    this.rowsPerPageItems.push({ label: String(this.getLocalization(opt)), value: opt });
                }
            }
        }
    }
    isFirstPage() {
        return this.getPage() === 0;
    }
    isLastPage() {
        return this.getPage() === this.getPageCount() - 1;
    }
    getPageCount() {
        return Math.ceil(this.totalRecords / this.rows);
    }
    calculatePageLinkBoundaries() {
        let numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
        //calculate range, keep current in middle if necessary
        let start = Math.max(0, Math.ceil(this.getPage() - visiblePages / 2)), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);
        return [start, end];
    }
    updatePageLinks() {
        this.pageLinks = [];
        let boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
        for (let i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
        if (this.showJumpToPageDropdown) {
            this.pageItems = [];
            for (let i = 0; i < this.getPageCount(); i++) {
                this.pageItems.push({ label: String(i + 1), value: i });
            }
        }
    }
    changePage(p) {
        var pc = this.getPageCount();
        if (p >= 0 && p < pc) {
            this._first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();
            this.onPageChange.emit(state);
            this.updatePaginatorState();
        }
    }
    updateFirst() {
        const page = this.getPage();
        if (page > 0 && this.totalRecords && this.first >= this.totalRecords) {
            Promise.resolve(null).then(() => this.changePage(page - 1));
        }
    }
    getPage() {
        return Math.floor(this.first / this.rows);
    }
    changePageToFirst(event) {
        if (!this.isFirstPage()) {
            this.changePage(0);
        }
        event.preventDefault();
    }
    changePageToPrev(event) {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    }
    changePageToNext(event) {
        this.changePage(this.getPage() + 1);
        event.preventDefault();
    }
    changePageToLast(event) {
        if (!this.isLastPage()) {
            this.changePage(this.getPageCount() - 1);
        }
        event.preventDefault();
    }
    onPageLinkClick(event, page) {
        this.changePage(page);
        event.preventDefault();
    }
    onRppChange(event) {
        this.changePage(this.getPage());
    }
    onPageDropdownChange(event) {
        this.changePage(event.value);
    }
    updatePaginatorState() {
        this.paginatorState = {
            page: this.getPage(),
            pageCount: this.getPageCount(),
            rows: this.rows,
            first: this.first,
            totalRecords: this.totalRecords
        };
    }
    empty() {
        return this.getPageCount() === 0;
    }
    currentPage() {
        return this.getPageCount() > 0 ? this.getPage() + 1 : 0;
    }
    get currentPageReport() {
        return this.currentPageReportTemplate
            .replace('{currentPage}', String(this.currentPage()))
            .replace('{totalPages}', String(this.getPageCount()))
            .replace('{first}', String(this.totalRecords > 0 ? this._first + 1 : 0))
            .replace('{last}', String(Math.min(this._first + this.rows, this.totalRecords)))
            .replace('{rows}', String(this.rows))
            .replace('{totalRecords}', String(this.totalRecords));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Paginator, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: Paginator, selector: "p-paginator", inputs: { pageLinkSize: ["pageLinkSize", "pageLinkSize", numberAttribute], style: "style", styleClass: "styleClass", alwaysShow: ["alwaysShow", "alwaysShow", booleanAttribute], dropdownAppendTo: "dropdownAppendTo", templateLeft: "templateLeft", templateRight: "templateRight", appendTo: "appendTo", dropdownScrollHeight: "dropdownScrollHeight", currentPageReportTemplate: "currentPageReportTemplate", showCurrentPageReport: ["showCurrentPageReport", "showCurrentPageReport", booleanAttribute], showFirstLastIcon: ["showFirstLastIcon", "showFirstLastIcon", booleanAttribute], totalRecords: ["totalRecords", "totalRecords", numberAttribute], rows: ["rows", "rows", numberAttribute], rowsPerPageOptions: "rowsPerPageOptions", showJumpToPageDropdown: ["showJumpToPageDropdown", "showJumpToPageDropdown", booleanAttribute], showJumpToPageInput: ["showJumpToPageInput", "showJumpToPageInput", booleanAttribute], jumpToPageItemTemplate: "jumpToPageItemTemplate", showPageLinks: ["showPageLinks", "showPageLinks", booleanAttribute], locale: "locale", dropdownItemTemplate: "dropdownItemTemplate", first: "first" }, outputs: { onPageChange: "onPageChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], usesOnChanges: true, ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-paginator p-component'" *ngIf="alwaysShow ? true : pageLinks && pageLinks.length > 1" [attr.data-pc-section]="'paginator'" [attr.data-pc-section]="'root'">
            <div class="p-paginator-left-content" *ngIf="templateLeft" [attr.data-pc-section]="'start'">
                <ng-container *ngTemplateOutlet="templateLeft; context: { $implicit: paginatorState }"></ng-container>
            </div>
            <span class="p-paginator-current" *ngIf="showCurrentPageReport">{{ currentPageReport }}</span>
            <button
                *ngIf="showFirstLastIcon"
                type="button"
                [disabled]="isFirstPage() || empty()"
                (click)="changePageToFirst($event)"
                pRipple
                class="p-paginator-first p-paginator-element p-link"
                [ngClass]="{ 'p-disabled': isFirstPage() || empty() }"
                [attr.aria-label]="getAriaLabel('firstPageLabel')"
            >
                <AngleDoubleLeftIcon *ngIf="!firstPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="firstPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="firstPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <button
                type="button"
                [disabled]="isFirstPage() || empty()"
                (click)="changePageToPrev($event)"
                pRipple
                class="p-paginator-prev p-paginator-element p-link"
                [ngClass]="{ 'p-disabled': isFirstPage() || empty() }"
                [attr.aria-label]="getAriaLabel('prevPageLabel')"
            >
                <AngleLeftIcon *ngIf="!previousPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="previousPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="previousPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <span class="p-paginator-pages" *ngIf="showPageLinks">
                <button
                    type="button"
                    *ngFor="let pageLink of pageLinks"
                    class="p-paginator-page p-paginator-element p-link"
                    [ngClass]="{ 'p-highlight': pageLink - 1 == getPage() }"
                    [attr.aria-label]="getPageAriaLabel(pageLink)"
                    [attr.aria-current]="pageLink - 1 == getPage() ? 'page' : undefined"
                    (click)="onPageLinkClick($event, pageLink - 1)"
                    pRipple
                >
                    {{ getLocalization(pageLink) }}
                </button>
            </span>
            <p-dropdown
                [options]="pageItems"
                [ngModel]="getPage()"
                *ngIf="showJumpToPageDropdown"
                [disabled]="empty()"
                [attr.aria-label]="getAriaLabel('jumpToPageDropdownLabel')"
                styleClass="p-paginator-page-options"
                (onChange)="onPageDropdownChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
            >
                <ng-template pTemplate="selectedItem">{{ currentPageReport }}</ng-template>
                <ng-container *ngIf="jumpToPageItemTemplate">
                    <ng-template let-item pTemplate="item">
                        <ng-container *ngTemplateOutlet="jumpToPageItemTemplate; context: { $implicit: item }"> </ng-container>
                    </ng-template>
                </ng-container>
                <ng-template pTemplate="dropdownicon" *ngIf="dropdownIconTemplate">
                    <ng-container *ngTemplateOutlet="dropdownIconTemplate"></ng-container>
                </ng-template>
            </p-dropdown>
            <button
                type="button"
                [disabled]="isLastPage() || empty()"
                (click)="changePageToNext($event)"
                pRipple
                class="p-paginator-next p-paginator-element p-link"
                [ngClass]="{ 'p-disabled': isLastPage() || empty() }"
                [attr.aria-label]="getAriaLabel('nextPageLabel')"
            >
                <AngleRightIcon *ngIf="!nextPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="nextPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="nextPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <button
                *ngIf="showFirstLastIcon"
                type="button"
                [disabled]="isLastPage() || empty()"
                (click)="changePageToLast($event)"
                pRipple
                class="p-paginator-last p-paginator-element p-link"
                [ngClass]="{ 'p-disabled': isLastPage() || empty() }"
                [attr.aria-label]="getAriaLabel('lastPageLabel')"
            >
                <AngleDoubleRightIcon *ngIf="!lastPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="lastPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="lastPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <p-inputNumber *ngIf="showJumpToPageInput" [ngModel]="currentPage()" class="p-paginator-page-input" [disabled]="empty()" (ngModelChange)="changePage($event - 1)"></p-inputNumber>
            <p-dropdown
                [options]="rowsPerPageItems"
                [(ngModel)]="rows"
                *ngIf="rowsPerPageOptions"
                styleClass="p-paginator-rpp-options"
                [disabled]="empty()"
                (onChange)="onRppChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
                [ariaLabel]="getAriaLabel('rowsPerPageLabel')"
            >
                <ng-container *ngIf="dropdownItemTemplate">
                    <ng-template let-item pTemplate="item">
                        <ng-container *ngTemplateOutlet="dropdownItemTemplate; context: { $implicit: item }"> </ng-container>
                    </ng-template>
                </ng-container>
                <ng-template pTemplate="dropdownicon" *ngIf="dropdownIconTemplate">
                    <ng-container *ngTemplateOutlet="dropdownIconTemplate"></ng-container>
                </ng-template>
            </p-dropdown>
            <div class="p-paginator-right-content" *ngIf="templateRight" [attr.data-pc-section]="'end'">
                <ng-container *ngTemplateOutlet="templateRight; context: { $implicit: paginatorState }"></ng-container>
            </div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-paginator{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.p-paginator-left-content{margin-right:auto}.p-paginator-right-content{margin-left:auto}.p-paginator-page,.p-paginator-next,.p-paginator-last,.p-paginator-first,.p-paginator-prev,.p-paginator-current{cursor:pointer;display:inline-flex;align-items:center;justify-content:center;line-height:1;user-select:none;overflow:hidden;position:relative}.p-paginator-element:focus{z-index:1;position:relative}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => i3.Dropdown), selector: "p-dropdown", inputs: ["id", "scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "dataKey", "filterBy", "filterFields", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "focusOnHover", "selectOnFocus", "autoOptionFocus", "autofocusFilter", "disabled", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "filterValue", "options"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear", "onLazyLoad"] }, { kind: "directive", type: i0.forwardRef(() => i1.PrimeTemplate), selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "component", type: i0.forwardRef(() => i4.InputNumber), selector: "p-inputNumber", inputs: ["showButtons", "format", "buttonLayout", "inputId", "styleClass", "style", "placeholder", "size", "maxlength", "tabindex", "title", "ariaLabelledBy", "ariaLabel", "ariaRequired", "name", "required", "autocomplete", "min", "max", "incrementButtonClass", "decrementButtonClass", "incrementButtonIcon", "decrementButtonIcon", "readonly", "step", "allowEmpty", "locale", "localeMatcher", "mode", "currency", "currencyDisplay", "useGrouping", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "inputStyle", "inputStyleClass", "showClear", "autofocus", "disabled"], outputs: ["onInput", "onFocus", "onBlur", "onKeyDown", "onClear"] }, { kind: "directive", type: i0.forwardRef(() => i5.NgControlStatus), selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i0.forwardRef(() => i5.NgModel), selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i0.forwardRef(() => i6.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => AngleDoubleLeftIcon), selector: "AngleDoubleLeftIcon" }, { kind: "component", type: i0.forwardRef(() => AngleDoubleRightIcon), selector: "AngleDoubleRightIcon" }, { kind: "component", type: i0.forwardRef(() => AngleLeftIcon), selector: "AngleLeftIcon" }, { kind: "component", type: i0.forwardRef(() => AngleRightIcon), selector: "AngleRightIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Paginator, decorators: [{
            type: Component,
            args: [{ selector: 'p-paginator', template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-paginator p-component'" *ngIf="alwaysShow ? true : pageLinks && pageLinks.length > 1" [attr.data-pc-section]="'paginator'" [attr.data-pc-section]="'root'">
            <div class="p-paginator-left-content" *ngIf="templateLeft" [attr.data-pc-section]="'start'">
                <ng-container *ngTemplateOutlet="templateLeft; context: { $implicit: paginatorState }"></ng-container>
            </div>
            <span class="p-paginator-current" *ngIf="showCurrentPageReport">{{ currentPageReport }}</span>
            <button
                *ngIf="showFirstLastIcon"
                type="button"
                [disabled]="isFirstPage() || empty()"
                (click)="changePageToFirst($event)"
                pRipple
                class="p-paginator-first p-paginator-element p-link"
                [ngClass]="{ 'p-disabled': isFirstPage() || empty() }"
                [attr.aria-label]="getAriaLabel('firstPageLabel')"
            >
                <AngleDoubleLeftIcon *ngIf="!firstPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="firstPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="firstPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <button
                type="button"
                [disabled]="isFirstPage() || empty()"
                (click)="changePageToPrev($event)"
                pRipple
                class="p-paginator-prev p-paginator-element p-link"
                [ngClass]="{ 'p-disabled': isFirstPage() || empty() }"
                [attr.aria-label]="getAriaLabel('prevPageLabel')"
            >
                <AngleLeftIcon *ngIf="!previousPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="previousPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="previousPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <span class="p-paginator-pages" *ngIf="showPageLinks">
                <button
                    type="button"
                    *ngFor="let pageLink of pageLinks"
                    class="p-paginator-page p-paginator-element p-link"
                    [ngClass]="{ 'p-highlight': pageLink - 1 == getPage() }"
                    [attr.aria-label]="getPageAriaLabel(pageLink)"
                    [attr.aria-current]="pageLink - 1 == getPage() ? 'page' : undefined"
                    (click)="onPageLinkClick($event, pageLink - 1)"
                    pRipple
                >
                    {{ getLocalization(pageLink) }}
                </button>
            </span>
            <p-dropdown
                [options]="pageItems"
                [ngModel]="getPage()"
                *ngIf="showJumpToPageDropdown"
                [disabled]="empty()"
                [attr.aria-label]="getAriaLabel('jumpToPageDropdownLabel')"
                styleClass="p-paginator-page-options"
                (onChange)="onPageDropdownChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
            >
                <ng-template pTemplate="selectedItem">{{ currentPageReport }}</ng-template>
                <ng-container *ngIf="jumpToPageItemTemplate">
                    <ng-template let-item pTemplate="item">
                        <ng-container *ngTemplateOutlet="jumpToPageItemTemplate; context: { $implicit: item }"> </ng-container>
                    </ng-template>
                </ng-container>
                <ng-template pTemplate="dropdownicon" *ngIf="dropdownIconTemplate">
                    <ng-container *ngTemplateOutlet="dropdownIconTemplate"></ng-container>
                </ng-template>
            </p-dropdown>
            <button
                type="button"
                [disabled]="isLastPage() || empty()"
                (click)="changePageToNext($event)"
                pRipple
                class="p-paginator-next p-paginator-element p-link"
                [ngClass]="{ 'p-disabled': isLastPage() || empty() }"
                [attr.aria-label]="getAriaLabel('nextPageLabel')"
            >
                <AngleRightIcon *ngIf="!nextPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="nextPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="nextPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <button
                *ngIf="showFirstLastIcon"
                type="button"
                [disabled]="isLastPage() || empty()"
                (click)="changePageToLast($event)"
                pRipple
                class="p-paginator-last p-paginator-element p-link"
                [ngClass]="{ 'p-disabled': isLastPage() || empty() }"
                [attr.aria-label]="getAriaLabel('lastPageLabel')"
            >
                <AngleDoubleRightIcon *ngIf="!lastPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="lastPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="lastPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <p-inputNumber *ngIf="showJumpToPageInput" [ngModel]="currentPage()" class="p-paginator-page-input" [disabled]="empty()" (ngModelChange)="changePage($event - 1)"></p-inputNumber>
            <p-dropdown
                [options]="rowsPerPageItems"
                [(ngModel)]="rows"
                *ngIf="rowsPerPageOptions"
                styleClass="p-paginator-rpp-options"
                [disabled]="empty()"
                (onChange)="onRppChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
                [ariaLabel]="getAriaLabel('rowsPerPageLabel')"
            >
                <ng-container *ngIf="dropdownItemTemplate">
                    <ng-template let-item pTemplate="item">
                        <ng-container *ngTemplateOutlet="dropdownItemTemplate; context: { $implicit: item }"> </ng-container>
                    </ng-template>
                </ng-container>
                <ng-template pTemplate="dropdownicon" *ngIf="dropdownIconTemplate">
                    <ng-container *ngTemplateOutlet="dropdownIconTemplate"></ng-container>
                </ng-template>
            </p-dropdown>
            <div class="p-paginator-right-content" *ngIf="templateRight" [attr.data-pc-section]="'end'">
                <ng-container *ngTemplateOutlet="templateRight; context: { $implicit: paginatorState }"></ng-container>
            </div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-paginator{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.p-paginator-left-content{margin-right:auto}.p-paginator-right-content{margin-left:auto}.p-paginator-page,.p-paginator-next,.p-paginator-last,.p-paginator-first,.p-paginator-prev,.p-paginator-current{cursor:pointer;display:inline-flex;align-items:center;justify-content:center;line-height:1;user-select:none;overflow:hidden;position:relative}.p-paginator-element:focus{z-index:1;position:relative}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }], propDecorators: { pageLinkSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], alwaysShow: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dropdownAppendTo: [{
                type: Input
            }], templateLeft: [{
                type: Input
            }], templateRight: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], dropdownScrollHeight: [{
                type: Input
            }], currentPageReportTemplate: [{
                type: Input
            }], showCurrentPageReport: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showFirstLastIcon: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], totalRecords: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], rows: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], rowsPerPageOptions: [{
                type: Input
            }], showJumpToPageDropdown: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showJumpToPageInput: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], jumpToPageItemTemplate: [{
                type: Input
            }], showPageLinks: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], locale: [{
                type: Input
            }], dropdownItemTemplate: [{
                type: Input
            }], first: [{
                type: Input
            }], onPageChange: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class PaginatorModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: PaginatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: PaginatorModule, declarations: [Paginator], imports: [CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon], exports: [Paginator, DropdownModule, InputNumberModule, FormsModule, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: PaginatorModule, imports: [CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon, DropdownModule, InputNumberModule, FormsModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: PaginatorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon],
                    exports: [Paginator, DropdownModule, InputNumberModule, FormsModule, SharedModule],
                    declarations: [Paginator]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3BhZ2luYXRvci9wYWdpbmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFFSCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osS0FBSyxFQUNMLFFBQVEsRUFHUixNQUFNLEVBSU4saUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixlQUFlLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQWlCLGFBQWEsRUFBYyxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDckYsT0FBTyxFQUF1QixjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFHOUM7OztHQUdHO0FBdUlILE1BQU0sT0FBTyxTQUFTO0lBdUpFO0lBQStCO0lBdEpuRDs7O09BR0c7SUFDb0MsWUFBWSxHQUFXLENBQUMsQ0FBQztJQUNoRTs7O09BR0c7SUFDTSxLQUFLLENBQThDO0lBQzVEOzs7T0FHRztJQUNNLFVBQVUsQ0FBcUI7SUFDeEM7OztPQUdHO0lBQ3FDLFVBQVUs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RUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQztvQkFDbEYsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO2lCQUM1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBOZ01vZHVsZSxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBib29sZWFuQXR0cmlidXRlLFxuICAgIG51bWJlckF0dHJpYnV0ZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgU2VsZWN0SXRlbSwgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRHJvcGRvd25DaGFuZ2VFdmVudCwgRHJvcGRvd25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL2Ryb3Bkb3duJztcbmltcG9ydCB7IEFuZ2xlRG91YmxlTGVmdEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlZG91YmxlbGVmdCc7XG5pbXBvcnQgeyBBbmdsZURvdWJsZVJpZ2h0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVkb3VibGVyaWdodCc7XG5pbXBvcnQgeyBBbmdsZUxlZnRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hbmdsZWxlZnQnO1xuaW1wb3J0IHsgQW5nbGVSaWdodEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlcmlnaHQnO1xuaW1wb3J0IHsgSW5wdXROdW1iZXJNb2R1bGUgfSBmcm9tICdwcmltZW5nL2lucHV0bnVtYmVyJztcbmltcG9ydCB7IFJpcHBsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7IE51bGxhYmxlIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IFBhZ2luYXRvclN0YXRlIH0gZnJvbSAnLi9wYWdpbmF0b3IuaW50ZXJmYWNlJztcbi8qKlxuICogUGFnaW5hdG9yIGlzIGEgZ2VuZXJpYyBjb21wb25lbnQgdG8gZGlzcGxheSBjb250ZW50IGluIHBhZ2VkIGZvcm1hdC5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wYWdpbmF0b3InLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cIidwLXBhZ2luYXRvciBwLWNvbXBvbmVudCdcIiAqbmdJZj1cImFsd2F5c1Nob3cgPyB0cnVlIDogcGFnZUxpbmtzICYmIHBhZ2VMaW5rcy5sZW5ndGggPiAxXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidwYWdpbmF0b3InXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyb290J1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGFnaW5hdG9yLWxlZnQtY29udGVudFwiICpuZ0lmPVwidGVtcGxhdGVMZWZ0XCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzdGFydCdcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVMZWZ0OyBjb250ZXh0OiB7ICRpbXBsaWNpdDogcGFnaW5hdG9yU3RhdGUgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtcGFnaW5hdG9yLWN1cnJlbnRcIiAqbmdJZj1cInNob3dDdXJyZW50UGFnZVJlcG9ydFwiPnt7IGN1cnJlbnRQYWdlUmVwb3J0IH19PC9zcGFuPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd0ZpcnN0TGFzdEljb25cIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpc0ZpcnN0UGFnZSgpIHx8IGVtcHR5KClcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VQYWdlVG9GaXJzdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJwLXBhZ2luYXRvci1maXJzdCBwLXBhZ2luYXRvci1lbGVtZW50IHAtbGlua1wiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1kaXNhYmxlZCc6IGlzRmlyc3RQYWdlKCkgfHwgZW1wdHkoKSB9XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImdldEFyaWFMYWJlbCgnZmlyc3RQYWdlTGFiZWwnKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEFuZ2xlRG91YmxlTGVmdEljb24gKm5nSWY9XCIhZmlyc3RQYWdlTGlua0ljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLXBhZ2luYXRvci1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXBhZ2luYXRvci1pY29uXCIgKm5nSWY9XCJmaXJzdFBhZ2VMaW5rSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImZpcnN0UGFnZUxpbmtJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpc0ZpcnN0UGFnZSgpIHx8IGVtcHR5KClcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VQYWdlVG9QcmV2KCRldmVudClcIlxuICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICBjbGFzcz1cInAtcGFnaW5hdG9yLXByZXYgcC1wYWdpbmF0b3ItZWxlbWVudCBwLWxpbmtcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZGlzYWJsZWQnOiBpc0ZpcnN0UGFnZSgpIHx8IGVtcHR5KCkgfVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRBcmlhTGFiZWwoJ3ByZXZQYWdlTGFiZWwnKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEFuZ2xlTGVmdEljb24gKm5nSWY9XCIhcHJldmlvdXNQYWdlTGlua0ljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLXBhZ2luYXRvci1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXBhZ2luYXRvci1pY29uXCIgKm5nSWY9XCJwcmV2aW91c1BhZ2VMaW5rSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInByZXZpb3VzUGFnZUxpbmtJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXBhZ2luYXRvci1wYWdlc1wiICpuZ0lmPVwic2hvd1BhZ2VMaW5rc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBwYWdlTGluayBvZiBwYWdlTGlua3NcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtcGFnaW5hdG9yLXBhZ2UgcC1wYWdpbmF0b3ItZWxlbWVudCBwLWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWhpZ2hsaWdodCc6IHBhZ2VMaW5rIC0gMSA9PSBnZXRQYWdlKCkgfVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZ2V0UGFnZUFyaWFMYWJlbChwYWdlTGluaylcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWN1cnJlbnRdPVwicGFnZUxpbmsgLSAxID09IGdldFBhZ2UoKSA/ICdwYWdlJyA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvblBhZ2VMaW5rQ2xpY2soJGV2ZW50LCBwYWdlTGluayAtIDEpXCJcbiAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3sgZ2V0TG9jYWxpemF0aW9uKHBhZ2VMaW5rKSB9fVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHAtZHJvcGRvd25cbiAgICAgICAgICAgICAgICBbb3B0aW9uc109XCJwYWdlSXRlbXNcIlxuICAgICAgICAgICAgICAgIFtuZ01vZGVsXT1cImdldFBhZ2UoKVwiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJzaG93SnVtcFRvUGFnZURyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZW1wdHkoKVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRBcmlhTGFiZWwoJ2p1bXBUb1BhZ2VEcm9wZG93bkxhYmVsJylcIlxuICAgICAgICAgICAgICAgIHN0eWxlQ2xhc3M9XCJwLXBhZ2luYXRvci1wYWdlLW9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIChvbkNoYW5nZSk9XCJvblBhZ2VEcm9wZG93bkNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbYXBwZW5kVG9dPVwiZHJvcGRvd25BcHBlbmRUb1wiXG4gICAgICAgICAgICAgICAgW3Njcm9sbEhlaWdodF09XCJkcm9wZG93blNjcm9sbEhlaWdodFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cInNlbGVjdGVkSXRlbVwiPnt7IGN1cnJlbnRQYWdlUmVwb3J0IH19PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwianVtcFRvUGFnZUl0ZW1UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbGV0LWl0ZW0gcFRlbXBsYXRlPVwiaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImp1bXBUb1BhZ2VJdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtIH1cIj4gPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cImRyb3Bkb3duaWNvblwiICpuZ0lmPVwiZHJvcGRvd25JY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRyb3Bkb3duSWNvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcC1kcm9wZG93bj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNMYXN0UGFnZSgpIHx8IGVtcHR5KClcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VQYWdlVG9OZXh0KCRldmVudClcIlxuICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICBjbGFzcz1cInAtcGFnaW5hdG9yLW5leHQgcC1wYWdpbmF0b3ItZWxlbWVudCBwLWxpbmtcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZGlzYWJsZWQnOiBpc0xhc3RQYWdlKCkgfHwgZW1wdHkoKSB9XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImdldEFyaWFMYWJlbCgnbmV4dFBhZ2VMYWJlbCcpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8QW5nbGVSaWdodEljb24gKm5nSWY9XCIhbmV4dFBhZ2VMaW5rSWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtcGFnaW5hdG9yLWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtcGFnaW5hdG9yLWljb25cIiAqbmdJZj1cIm5leHRQYWdlTGlua0ljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJuZXh0UGFnZUxpbmtJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd0ZpcnN0TGFzdEljb25cIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpc0xhc3RQYWdlKCkgfHwgZW1wdHkoKVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZVBhZ2VUb0xhc3QoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1wYWdpbmF0b3ItbGFzdCBwLXBhZ2luYXRvci1lbGVtZW50IHAtbGlua1wiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1kaXNhYmxlZCc6IGlzTGFzdFBhZ2UoKSB8fCBlbXB0eSgpIH1cIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZ2V0QXJpYUxhYmVsKCdsYXN0UGFnZUxhYmVsJylcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxBbmdsZURvdWJsZVJpZ2h0SWNvbiAqbmdJZj1cIiFsYXN0UGFnZUxpbmtJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1wYWdpbmF0b3ItaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1wYWdpbmF0b3ItaWNvblwiICpuZ0lmPVwibGFzdFBhZ2VMaW5rSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImxhc3RQYWdlTGlua0ljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8cC1pbnB1dE51bWJlciAqbmdJZj1cInNob3dKdW1wVG9QYWdlSW5wdXRcIiBbbmdNb2RlbF09XCJjdXJyZW50UGFnZSgpXCIgY2xhc3M9XCJwLXBhZ2luYXRvci1wYWdlLWlucHV0XCIgW2Rpc2FibGVkXT1cImVtcHR5KClcIiAobmdNb2RlbENoYW5nZSk9XCJjaGFuZ2VQYWdlKCRldmVudCAtIDEpXCI+PC9wLWlucHV0TnVtYmVyPlxuICAgICAgICAgICAgPHAtZHJvcGRvd25cbiAgICAgICAgICAgICAgICBbb3B0aW9uc109XCJyb3dzUGVyUGFnZUl0ZW1zXCJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInJvd3NcIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwicm93c1BlclBhZ2VPcHRpb25zXCJcbiAgICAgICAgICAgICAgICBzdHlsZUNsYXNzPVwicC1wYWdpbmF0b3ItcnBwLW9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJlbXB0eSgpXCJcbiAgICAgICAgICAgICAgICAob25DaGFuZ2UpPVwib25ScHBDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW2FwcGVuZFRvXT1cImRyb3Bkb3duQXBwZW5kVG9cIlxuICAgICAgICAgICAgICAgIFtzY3JvbGxIZWlnaHRdPVwiZHJvcGRvd25TY3JvbGxIZWlnaHRcIlxuICAgICAgICAgICAgICAgIFthcmlhTGFiZWxdPVwiZ2V0QXJpYUxhYmVsKCdyb3dzUGVyUGFnZUxhYmVsJylcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkcm9wZG93bkl0ZW1UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbGV0LWl0ZW0gcFRlbXBsYXRlPVwiaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRyb3Bkb3duSXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSB9XCI+IDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJkcm9wZG93bmljb25cIiAqbmdJZj1cImRyb3Bkb3duSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkcm9wZG93bkljb25UZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3AtZHJvcGRvd24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1wYWdpbmF0b3ItcmlnaHQtY29udGVudFwiICpuZ0lmPVwidGVtcGxhdGVSaWdodFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInZW5kJ1wiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZVJpZ2h0OyBjb250ZXh0OiB7ICRpbXBsaWNpdDogcGFnaW5hdG9yU3RhdGUgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9wYWdpbmF0b3IuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRvciBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzIHtcbiAgICAvKipcbiAgICAgKiBOdW1iZXIgb2YgcGFnZSBsaW5rcyB0byBkaXNwbGF5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHBhZ2VMaW5rU2l6ZTogbnVtYmVyID0gNTtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgaXQgZXZlbiB0aGVyZSBpcyBvbmx5IG9uZSBwYWdlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBhbHdheXNTaG93OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBUYXJnZXQgZWxlbWVudCB0byBhdHRhY2ggdGhlIGRyb3Bkb3duIG92ZXJsYXksIHZhbGlkIHZhbHVlcyBhcmUgXCJib2R5XCIgb3IgYSBsb2NhbCBuZy10ZW1wbGF0ZSB2YXJpYWJsZSBvZiBhbm90aGVyIGVsZW1lbnQgKG5vdGU6IHVzZSBiaW5kaW5nIHdpdGggYnJhY2tldHMgZm9yIHRlbXBsYXRlIHZhcmlhYmxlcywgZS5nLiBbYXBwZW5kVG9dPVwibXlkaXZcIiBmb3IgYSBkaXYgZWxlbWVudCBoYXZpbmcgI215ZGl2IGFzIHZhcmlhYmxlIG5hbWUpLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRyb3Bkb3duQXBwZW5kVG86IEhUTUxFbGVtZW50IHwgRWxlbWVudFJlZiB8IFRlbXBsYXRlUmVmPGFueT4gfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkIHwgYW55O1xuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIGluc3RhbmNlIHRvIGluamVjdCBpbnRvIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHBhZ2luYXRvci5cbiAgICAgKiBAcGFyYW0ge1BhZ2luYXRvclN0YXRlfSBjb250ZXh0IC0gUGFnaW5hdG9yIHN0YXRlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRlbXBsYXRlTGVmdDogVGVtcGxhdGVSZWY8UGFnaW5hdG9yU3RhdGU+IHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIGluc3RhbmNlIHRvIGluamVjdCBpbnRvIHRoZSByaWdodCBzaWRlIG9mIHRoZSBwYWdpbmF0b3IuXG4gICAgICogQHBhcmFtIHtQYWdpbmF0b3JTdGF0ZX0gY29udGV4dCAtIFBhZ2luYXRvciBzdGF0ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0ZW1wbGF0ZVJpZ2h0OiBUZW1wbGF0ZVJlZjxQYWdpbmF0b3JTdGF0ZT4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGFyZ2V0IGVsZW1lbnQgdG8gYXR0YWNoIHRoZSBkcm9wZG93biBvdmVybGF5LCB2YWxpZCB2YWx1ZXMgYXJlIFwiYm9keVwiIG9yIGEgbG9jYWwgbmctdGVtcGxhdGUgdmFyaWFibGUgb2YgYW5vdGhlciBlbGVtZW50IChub3RlOiB1c2UgYmluZGluZyB3aXRoIGJyYWNrZXRzIGZvciB0ZW1wbGF0ZSB2YXJpYWJsZXMsIGUuZy4gW2FwcGVuZFRvXT1cIm15ZGl2XCIgZm9yIGEgZGl2IGVsZW1lbnQgaGF2aW5nICNteWRpdiBhcyB2YXJpYWJsZSBuYW1lKS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogSFRNTEVsZW1lbnQgfCBFbGVtZW50UmVmIHwgVGVtcGxhdGVSZWY8YW55PiB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgfCBhbnk7XG4gICAgLyoqXG4gICAgICogRHJvcGRvd24gaGVpZ2h0IG9mIHRoZSB2aWV3cG9ydCBpbiBwaXhlbHMsIGEgc2Nyb2xsYmFyIGlzIGRlZmluZWQgaWYgaGVpZ2h0IG9mIGxpc3QgZXhjZWVkcyB0aGlzIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRyb3Bkb3duU2Nyb2xsSGVpZ2h0OiBzdHJpbmcgPSAnMjAwcHgnO1xuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIG9mIHRoZSBjdXJyZW50IHBhZ2UgcmVwb3J0IGVsZW1lbnQuIEF2YWlsYWJsZSBwbGFjZWhvbGRlcnMgYXJlIHtjdXJyZW50UGFnZX0se3RvdGFsUGFnZXN9LHtyb3dzfSx7Zmlyc3R9LHtsYXN0fSBhbmQge3RvdGFsUmVjb3Jkc31cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlOiBzdHJpbmcgPSAne2N1cnJlbnRQYWdlfSBvZiB7dG90YWxQYWdlc30nO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZGlzcGxheSBjdXJyZW50IHBhZ2UgcmVwb3J0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93Q3VycmVudFBhZ2VSZXBvcnQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBpY29ucyBhcmUgZGlzcGxheWVkIG9uIHBhZ2luYXRvciB0byBnbyBmaXJzdCBhbmQgbGFzdCBwYWdlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93Rmlyc3RMYXN0SWNvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIHRvdGFsIHJlY29yZHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgdG90YWxSZWNvcmRzOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIERhdGEgY291bnQgdG8gZGlzcGxheSBwZXIgcGFnZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSByb3dzOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIEFycmF5IG9mIGludGVnZXIvb2JqZWN0IHZhbHVlcyB0byBkaXNwbGF5IGluc2lkZSByb3dzIHBlciBwYWdlIGRyb3Bkb3duLiBBIG9iamVjdCB0aGF0IGhhdmUgJ3Nob3dBbGwnIGtleSBjYW4gYmUgYWRkZWQgdG8gaXQgdG8gc2hvdyBhbGwgZGF0YS4gRXhwOyBbMTAsMjAsMzAse3Nob3dBbGw6J0FsbCd9XVxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJvd3NQZXJQYWdlT3B0aW9uczogYW55W10gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IGEgZHJvcGRvd24gdG8gbmF2aWdhdGUgdG8gYW55IHBhZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dKdW1wVG9QYWdlRHJvcGRvd246IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IGEgaW5wdXQgdG8gbmF2aWdhdGUgdG8gYW55IHBhZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dKdW1wVG9QYWdlSW5wdXQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGVtcGxhdGUgaW5zdGFuY2UgdG8gaW5qZWN0IGludG8gdGhlIGp1bXAgdG8gcGFnZSBkcm9wZG93biBpdGVtIGluc2lkZSBpbiB0aGUgcGFnaW5hdG9yLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0IC0gaXRlbSBpbnN0YW5jZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBqdW1wVG9QYWdlSXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogYW55IH0+IHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyBwYWdlIGxpbmtzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93UGFnZUxpbmtzOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBMb2NhbGUgdG8gYmUgdXNlZCBpbiBmb3JtYXR0aW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIGluc3RhbmNlIHRvIGluamVjdCBpbnRvIHRoZSByb3dzIHBlciBwYWdlIGRyb3Bkb3duIGl0ZW0gaW5zaWRlIGluIHRoZSBwYWdpbmF0b3IuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHQgLSBpdGVtIGluc3RhbmNlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRyb3Bkb3duSXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogYW55IH0+IHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFplcm8tcmVsYXRpdmUgbnVtYmVyIG9mIHRoZSBmaXJzdCByb3cgdG8gYmUgZGlzcGxheWVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBmaXJzdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3Q7XG4gICAgfVxuICAgIHNldCBmaXJzdCh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9maXJzdCA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gcGFnZSBjaGFuZ2VzLCB0aGUgZXZlbnQgb2JqZWN0IGNvbnRhaW5zIGluZm9ybWF0aW9uIGFib3V0IHRoZSBuZXcgc3RhdGUuXG4gICAgICogQHBhcmFtIHtQYWdpbmF0b3JTdGF0ZX0gZXZlbnQgLSBQYWdpbmF0b3Igc3RhdGUuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uUGFnZUNoYW5nZTogRXZlbnRFbWl0dGVyPFBhZ2luYXRvclN0YXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8UGFnaW5hdG9yU3RhdGU+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogTnVsbGFibGU8UXVlcnlMaXN0PGFueT4+O1xuXG4gICAgZHJvcGRvd25JY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZmlyc3RQYWdlTGlua0ljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBwcmV2aW91c1BhZ2VMaW5rSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGxhc3RQYWdlTGlua0ljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBuZXh0UGFnZUxpbmtJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgcGFnZUxpbmtzOiBudW1iZXJbXSB8IHVuZGVmaW5lZDtcblxuICAgIHBhZ2VJdGVtczogU2VsZWN0SXRlbVtdIHwgdW5kZWZpbmVkO1xuXG4gICAgcm93c1BlclBhZ2VJdGVtczogU2VsZWN0SXRlbVtdIHwgdW5kZWZpbmVkO1xuXG4gICAgcGFnaW5hdG9yU3RhdGU6IGFueTtcblxuICAgIF9maXJzdDogbnVtYmVyID0gMDtcblxuICAgIF9wYWdlOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgY29uZmlnOiBQcmltZU5HQ29uZmlnKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdG9yU3RhdGUoKTtcbiAgICB9XG5cbiAgICBnZXRBcmlhTGFiZWwobGFiZWxUeXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYVtsYWJlbFR5cGVdIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldFBhZ2VBcmlhTGFiZWwodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEgPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLnBhZ2VMYWJlbC5yZXBsYWNlKC97cGFnZX0vZywgYFBhZ2UgJHt2YWx1ZX1gKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXRMb2NhbGl6YXRpb24oZGlnaXQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBudW1lcmFscyA9IFsuLi5uZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy5sb2NhbGUsIHsgdXNlR3JvdXBpbmc6IGZhbHNlIH0pLmZvcm1hdCg5ODc2NTQzMjEwKV0ucmV2ZXJzZSgpO1xuICAgICAgICBjb25zdCBpbmRleCA9IG5ldyBNYXAobnVtZXJhbHMubWFwKChkLCBpKSA9PiBbaSwgZF0pKTtcbiAgICAgICAgaWYgKGRpZ2l0ID4gOSkge1xuICAgICAgICAgICAgY29uc3QgbnVtYmVycyA9IFN0cmluZyhkaWdpdCkuc3BsaXQoJycpO1xuICAgICAgICAgICAgcmV0dXJuIG51bWJlcnMubWFwKChudW1iZXIpID0+IGluZGV4LmdldChOdW1iZXIobnVtYmVyKSkpLmpvaW4oJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4LmdldChkaWdpdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkcm9wZG93bmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmaXJzdHBhZ2VsaW5raWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RQYWdlTGlua0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncHJldmlvdXNwYWdlbGlua2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzUGFnZUxpbmtJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xhc3RwYWdlbGlua2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RQYWdlTGlua0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbmV4dHBhZ2VsaW5raWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dFBhZ2VMaW5rSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKHNpbXBsZUNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnRvdGFsUmVjb3Jkcykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdlTGlua3MoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdG9yU3RhdGUoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRmlyc3QoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm93c1BlclBhZ2VPcHRpb25zKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmZpcnN0KSB7XG4gICAgICAgICAgICB0aGlzLl9maXJzdCA9IHNpbXBsZUNoYW5nZS5maXJzdC5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VMaW5rcygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0b3JTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5yb3dzKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VMaW5rcygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0b3JTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5yb3dzUGVyUGFnZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm93c1BlclBhZ2VPcHRpb25zKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnBhZ2VMaW5rU2l6ZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdlTGlua3MoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVJvd3NQZXJQYWdlT3B0aW9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMucm93c1BlclBhZ2VPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnJvd3NQZXJQYWdlSXRlbXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IG9wdCBvZiB0aGlzLnJvd3NQZXJQYWdlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0ID09ICdvYmplY3QnICYmIG9wdFsnc2hvd0FsbCddKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93c1BlclBhZ2VJdGVtcy51bnNoaWZ0KHsgbGFiZWw6IG9wdFsnc2hvd0FsbCddLCB2YWx1ZTogdGhpcy50b3RhbFJlY29yZHMgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzUGVyUGFnZUl0ZW1zLnB1c2goeyBsYWJlbDogU3RyaW5nKHRoaXMuZ2V0TG9jYWxpemF0aW9uKG9wdCkpLCB2YWx1ZTogb3B0IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRmlyc3RQYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYWdlKCkgPT09IDA7XG4gICAgfVxuXG4gICAgaXNMYXN0UGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFnZSgpID09PSB0aGlzLmdldFBhZ2VDb3VudCgpIC0gMTtcbiAgICB9XG5cbiAgICBnZXRQYWdlQ291bnQoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy50b3RhbFJlY29yZHMgLyB0aGlzLnJvd3MpO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVBhZ2VMaW5rQm91bmRhcmllcygpIHtcbiAgICAgICAgbGV0IG51bWJlck9mUGFnZXMgPSB0aGlzLmdldFBhZ2VDb3VudCgpLFxuICAgICAgICAgICAgdmlzaWJsZVBhZ2VzID0gTWF0aC5taW4odGhpcy5wYWdlTGlua1NpemUsIG51bWJlck9mUGFnZXMpO1xuXG4gICAgICAgIC8vY2FsY3VsYXRlIHJhbmdlLCBrZWVwIGN1cnJlbnQgaW4gbWlkZGxlIGlmIG5lY2Vzc2FyeVxuICAgICAgICBsZXQgc3RhcnQgPSBNYXRoLm1heCgwLCBNYXRoLmNlaWwodGhpcy5nZXRQYWdlKCkgLSB2aXNpYmxlUGFnZXMgLyAyKSksXG4gICAgICAgICAgICBlbmQgPSBNYXRoLm1pbihudW1iZXJPZlBhZ2VzIC0gMSwgc3RhcnQgKyB2aXNpYmxlUGFnZXMgLSAxKTtcblxuICAgICAgICAvL2NoZWNrIHdoZW4gYXBwcm9hY2hpbmcgdG8gbGFzdCBwYWdlXG4gICAgICAgIHZhciBkZWx0YSA9IHRoaXMucGFnZUxpbmtTaXplIC0gKGVuZCAtIHN0YXJ0ICsgMSk7XG4gICAgICAgIHN0YXJ0ID0gTWF0aC5tYXgoMCwgc3RhcnQgLSBkZWx0YSk7XG5cbiAgICAgICAgcmV0dXJuIFtzdGFydCwgZW5kXTtcbiAgICB9XG5cbiAgICB1cGRhdGVQYWdlTGlua3MoKSB7XG4gICAgICAgIHRoaXMucGFnZUxpbmtzID0gW107XG4gICAgICAgIGxldCBib3VuZGFyaWVzID0gdGhpcy5jYWxjdWxhdGVQYWdlTGlua0JvdW5kYXJpZXMoKSxcbiAgICAgICAgICAgIHN0YXJ0ID0gYm91bmRhcmllc1swXSxcbiAgICAgICAgICAgIGVuZCA9IGJvdW5kYXJpZXNbMV07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VMaW5rcy5wdXNoKGkgKyAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNob3dKdW1wVG9QYWdlRHJvcGRvd24pIHtcbiAgICAgICAgICAgIHRoaXMucGFnZUl0ZW1zID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ2V0UGFnZUNvdW50KCk7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZUl0ZW1zLnB1c2goeyBsYWJlbDogU3RyaW5nKGkgKyAxKSwgdmFsdWU6IGkgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VQYWdlKHA6IG51bWJlcikge1xuICAgICAgICB2YXIgcGMgPSB0aGlzLmdldFBhZ2VDb3VudCgpO1xuXG4gICAgICAgIGlmIChwID49IDAgJiYgcCA8IHBjKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJzdCA9IHRoaXMucm93cyAqIHA7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgcGFnZTogcCxcbiAgICAgICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcbiAgICAgICAgICAgICAgICByb3dzOiB0aGlzLnJvd3MsXG4gICAgICAgICAgICAgICAgcGFnZUNvdW50OiBwY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnZUxpbmtzKCk7XG5cbiAgICAgICAgICAgIHRoaXMub25QYWdlQ2hhbmdlLmVtaXQoc3RhdGUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0b3JTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRmlyc3QoKSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLmdldFBhZ2UoKTtcbiAgICAgICAgaWYgKHBhZ2UgPiAwICYmIHRoaXMudG90YWxSZWNvcmRzICYmIHRoaXMuZmlyc3QgPj0gdGhpcy50b3RhbFJlY29yZHMpIHtcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHRoaXMuY2hhbmdlUGFnZShwYWdlIC0gMSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGFnZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmZpcnN0IC8gdGhpcy5yb3dzKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQYWdlVG9GaXJzdChldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRmlyc3RQYWdlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlUGFnZSgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgY2hhbmdlUGFnZVRvUHJldihldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHRoaXMuZ2V0UGFnZSgpIC0gMSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgY2hhbmdlUGFnZVRvTmV4dChldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHRoaXMuZ2V0UGFnZSgpICsgMSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgY2hhbmdlUGFnZVRvTGFzdChldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTGFzdFBhZ2UoKSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHRoaXMuZ2V0UGFnZUNvdW50KCkgLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25QYWdlTGlua0NsaWNrKGV2ZW50OiBFdmVudCwgcGFnZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZShwYWdlKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblJwcENoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHRoaXMuZ2V0UGFnZSgpKTtcbiAgICB9XG5cbiAgICBvblBhZ2VEcm9wZG93bkNoYW5nZShldmVudDogRHJvcGRvd25DaGFuZ2VFdmVudCkge1xuICAgICAgICB0aGlzLmNoYW5nZVBhZ2UoZXZlbnQudmFsdWUpO1xuICAgIH1cblxuICAgIHVwZGF0ZVBhZ2luYXRvclN0YXRlKCkge1xuICAgICAgICB0aGlzLnBhZ2luYXRvclN0YXRlID0ge1xuICAgICAgICAgICAgcGFnZTogdGhpcy5nZXRQYWdlKCksXG4gICAgICAgICAgICBwYWdlQ291bnQ6IHRoaXMuZ2V0UGFnZUNvdW50KCksXG4gICAgICAgICAgICByb3dzOiB0aGlzLnJvd3MsXG4gICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcbiAgICAgICAgICAgIHRvdGFsUmVjb3JkczogdGhpcy50b3RhbFJlY29yZHNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBlbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFnZUNvdW50KCkgPT09IDA7XG4gICAgfVxuXG4gICAgY3VycmVudFBhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhZ2VDb3VudCgpID4gMCA/IHRoaXMuZ2V0UGFnZSgpICsgMSA6IDA7XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRQYWdlUmVwb3J0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlXG4gICAgICAgICAgICAucmVwbGFjZSgne2N1cnJlbnRQYWdlfScsIFN0cmluZyh0aGlzLmN1cnJlbnRQYWdlKCkpKVxuICAgICAgICAgICAgLnJlcGxhY2UoJ3t0b3RhbFBhZ2VzfScsIFN0cmluZyh0aGlzLmdldFBhZ2VDb3VudCgpKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKCd7Zmlyc3R9JywgU3RyaW5nKHRoaXMudG90YWxSZWNvcmRzID4gMCA/IHRoaXMuX2ZpcnN0ICsgMSA6IDApKVxuICAgICAgICAgICAgLnJlcGxhY2UoJ3tsYXN0fScsIFN0cmluZyhNYXRoLm1pbih0aGlzLl9maXJzdCArIHRoaXMucm93cywgdGhpcy50b3RhbFJlY29yZHMpKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKCd7cm93c30nLCBTdHJpbmcodGhpcy5yb3dzKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKCd7dG90YWxSZWNvcmRzfScsIFN0cmluZyh0aGlzLnRvdGFsUmVjb3JkcykpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBEcm9wZG93bk1vZHVsZSwgSW5wdXROdW1iZXJNb2R1bGUsIEZvcm1zTW9kdWxlLCBTaGFyZWRNb2R1bGUsIFJpcHBsZU1vZHVsZSwgQW5nbGVEb3VibGVMZWZ0SWNvbiwgQW5nbGVEb3VibGVSaWdodEljb24sIEFuZ2xlTGVmdEljb24sIEFuZ2xlUmlnaHRJY29uXSxcbiAgICBleHBvcnRzOiBbUGFnaW5hdG9yLCBEcm9wZG93bk1vZHVsZSwgSW5wdXROdW1iZXJNb2R1bGUsIEZvcm1zTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1BhZ2luYXRvcl1cbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdG9yTW9kdWxlIHt9XG4iXX0=