import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChildren, Directive, EventEmitter, HostListener, Inject, Injectable, Input, NgModule, numberAttribute, Optional, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterMatchMode, FilterOperator, PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { DropdownModule } from 'primeng/dropdown';
import { ArrowDownIcon } from 'primeng/icons/arrowdown';
import { ArrowUpIcon } from 'primeng/icons/arrowup';
import { CheckIcon } from 'primeng/icons/check';
import { FilterIcon } from 'primeng/icons/filter';
import { FilterSlashIcon } from 'primeng/icons/filterslash';
import { PlusIcon } from 'primeng/icons/plus';
import { SortAltIcon } from 'primeng/icons/sortalt';
import { SortAmountDownIcon } from 'primeng/icons/sortamountdown';
import { SortAmountUpAltIcon } from 'primeng/icons/sortamountupalt';
import { SpinnerIcon } from 'primeng/icons/spinner';
import { TrashIcon } from 'primeng/icons/trash';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ScrollerModule } from 'primeng/scroller';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { ObjectUtils, UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/paginator";
import * as i4 from "primeng/scroller";
import * as i5 from "primeng/dropdown";
import * as i6 from "@angular/forms";
import * as i7 from "primeng/button";
import * as i8 from "primeng/inputnumber";
import * as i9 from "primeng/inputtext";
import * as i10 from "primeng/calendar";
import * as i11 from "primeng/tristatecheckbox";
export class TableService {
    sortSource = new Subject();
    selectionSource = new Subject();
    contextMenuSource = new Subject();
    valueSource = new Subject();
    totalRecordsSource = new Subject();
    columnsSource = new Subject();
    sortSource$ = this.sortSource.asObservable();
    selectionSource$ = this.selectionSource.asObservable();
    contextMenuSource$ = this.contextMenuSource.asObservable();
    valueSource$ = this.valueSource.asObservable();
    totalRecordsSource$ = this.totalRecordsSource.asObservable();
    columnsSource$ = this.columnsSource.asObservable();
    onSort(sortMeta) {
        this.sortSource.next(sortMeta);
    }
    onSelectionChange() {
        this.selectionSource.next(null);
    }
    onContextMenu(data) {
        this.contextMenuSource.next(data);
    }
    onValueChange(value) {
        this.valueSource.next(value);
    }
    onTotalRecordsChange(value) {
        this.totalRecordsSource.next(value);
    }
    onColumnsChange(columns) {
        this.columnsSource.next(columns);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TableService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TableService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TableService, decorators: [{
            type: Injectable
        }] });
/**
 * Table displays data in tabular format.
 * @group Components
 */
export class Table {
    document;
    platformId;
    renderer;
    el;
    zone;
    tableService;
    cd;
    filterService;
    overlayService;
    config;
    /**
     * An array of objects to represent dynamic columns that are frozen.
     * @group Props
     */
    frozenColumns;
    /**
     * An array of objects to display as frozen.
     * @group Props
     */
    frozenValue;
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
     * Inline style of the table.
     * @group Props
     */
    tableStyle;
    /**
     * Style class of the table.
     * @group Props
     */
    tableStyleClass;
    /**
     * When specified as true, enables the pagination.
     * @group Props
     */
    paginator;
    /**
     * Number of page links to display in paginator.
     * @group Props
     */
    pageLinks = 5;
    /**
     * Array of integer/object values to display inside rows per page dropdown of paginator
     * @group Props
     */
    rowsPerPageOptions;
    /**
     * Whether to show it even there is only one page.
     * @group Props
     */
    alwaysShowPaginator = true;
    /**
     * Position of the paginator, options are "top", "bottom" or "both".
     * @group Props
     */
    paginatorPosition = 'bottom';
    /**
     * Custom style class for paginator
     * @group Props
     */
    paginatorStyleClass;
    /**
     * Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    paginatorDropdownAppendTo;
    /**
     * Paginator dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    paginatorDropdownScrollHeight = '200px';
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
     * When enabled, icons are displayed on paginator to go first and last page.
     * @group Props
     */
    showFirstLastIcon = true;
    /**
     * Whether to show page links.
     * @group Props
     */
    showPageLinks = true;
    /**
     * Sort order to use when an unsorted column gets sorted by user interaction.
     * @group Props
     */
    defaultSortOrder = 1;
    /**
     * Defines whether sorting works on single column or on multiple columns.
     * @group Props
     */
    sortMode = 'single';
    /**
     * When true, resets paginator to first page after sorting. Available only when sortMode is set to single.
     * @group Props
     */
    resetPageOnSort = true;
    /**
     * Specifies the selection mode, valid values are "single" and "multiple".
     * @group Props
     */
    selectionMode;
    /**
     * When enabled with paginator and checkbox selection mode, the select all checkbox in the header will select all rows on the current page.
     * @group Props
     */
    selectionPageOnly;
    /**
     * Selected row with a context menu.
     * @group Props
     */
    contextMenuSelection;
    /**
     * Callback to invoke on context menu selection change.
     * @param {*} object - row data.
     * @group Emits
     */
    contextMenuSelectionChange = new EventEmitter();
    /**
     *  Defines the behavior of context menu selection, in "separate" mode context menu updates contextMenuSelection property whereas in joint mode selection property is used instead so that when row selection is enabled, both row selection and context menu selection use the same property.
     * @group Props
     */
    contextMenuSelectionMode = 'separate';
    /**
     * A property to uniquely identify a record in data.
     * @group Props
     */
    dataKey;
    /**
     * Defines whether metaKey should be considered for the selection. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    metaKeySelection = false;
    /**
     * Defines if the row is selectable.
     * @group Props
     */
    rowSelectable;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
     * @group Props
     */
    rowTrackBy = (index, item) => item;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    lazy = false;
    /**
     * Whether to call lazy loading on initialization.
     * @group Props
     */
    lazyLoadOnInit = true;
    /**
     * Algorithm to define if a row is selected, valid values are "equals" that compares by reference and "deepEquals" that compares all fields.
     * @group Props
     */
    compareSelectionBy = 'deepEquals';
    /**
     * Character to use as the csv separator.
     * @group Props
     */
    csvSeparator = ',';
    /**
     * Name of the exported file.
     * @group Props
     */
    exportFilename = 'download';
    /**
     * An array of FilterMetadata objects to provide external filters.
     * @group Props
     */
    filters = {};
    /**
     * An array of fields as string to use in global filtering.
     * @group Props
     */
    globalFilterFields;
    /**
     * Delay in milliseconds before filtering the data.
     * @group Props
     */
    filterDelay = 300;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale;
    /**
     * Map instance to keep the expanded rows where key of the map is the data key of the row.
     * @group Props
     */
    expandedRowKeys = {};
    /**
     * Map instance to keep the rows being edited where key of the map is the data key of the row.
     * @group Props
     */
    editingRowKeys = {};
    /**
     * Whether multiple rows can be expanded at any time. Valid values are "multiple" and "single".
     * @group Props
     */
    rowExpandMode = 'multiple';
    /**
     * Enables scrollable tables.
     * @group Props
     */
    scrollable;
    /**
     * Orientation of the scrolling, options are "vertical", "horizontal" and "both".
     * @group Props
     * @deprecated Property is obselete since v14.2.0.
     */
    scrollDirection = 'vertical';
    /**
     * Type of the row grouping, valid values are "subheader" and "rowspan".
     * @group Props
     */
    rowGroupMode;
    /**
     * Height of the scroll viewport in fixed pixels or the "flex" keyword for a dynamic size.
     * @group Props
     */
    scrollHeight;
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    virtualScroll;
    /**
     * Height of a row to use in calculations of virtual scrolling.
     * @group Props
     */
    virtualScrollItemSize;
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    virtualScrollOptions;
    /**
     * Threshold in milliseconds to delay lazy loading during scrolling.
     * @group Props
     */
    virtualScrollDelay = 250;
    /**
     * Width of the frozen columns container.
     * @group Props
     */
    frozenWidth;
    /**
     * Defines if the table is responsive.
     * @group Props
     * @deprecated table is always responsive with scrollable behavior.
     */
    get responsive() {
        return this._responsive;
    }
    set responsive(val) {
        this._responsive = val;
        console.warn('responsive property is deprecated as table is always responsive with scrollable behavior.');
    }
    _responsive;
    /**
     * Local ng-template varilable of a ContextMenu.
     * @group Props
     */
    contextMenu;
    /**
     * When enabled, columns can be resized using drag and drop.
     * @group Props
     */
    resizableColumns;
    /**
     * Defines whether the overall table width should change on column resize, valid values are "fit" and "expand".
     * @group Props
     */
    columnResizeMode = 'fit';
    /**
     * When enabled, columns can be reordered using drag and drop.
     * @group Props
     */
    reorderableColumns;
    /**
     * Displays a loader to indicate data load is in progress.
     * @group Props
     */
    loading;
    /**
     * The icon to show while indicating data load is in progress.
     * @group Props
     */
    loadingIcon;
    /**
     * Whether to show the loading mask when loading property is true.
     * @group Props
     */
    showLoader = true;
    /**
     * Adds hover effect to rows without the need for selectionMode. Note that tr elements that can be hovered need to have "p-selectable-row" class for rowHover to work.
     * @group Props
     */
    rowHover;
    /**
     * Whether to use the default sorting or a custom one using sortFunction.
     * @group Props
     */
    customSort;
    /**
     * Whether to use the initial sort badge or not.
     * @group Props
     */
    showInitialSortBadge = true;
    /**
     * Whether the cell widths scale according to their content or not.  Deprecated:  Table layout is always "auto".
     * @group Props
     */
    autoLayout;
    /**
     * Export function.
     * @group Props
     */
    exportFunction;
    /**
     * Custom export header of the column to be exported as CSV.
     * @group Props
     */
    exportHeader;
    /**
     * Unique identifier of a stateful table to use in state storage.
     * @group Props
     */
    stateKey;
    /**
     * Defines where a stateful table keeps its state, valid values are "session" for sessionStorage and "local" for localStorage.
     * @group Props
     */
    stateStorage = 'session';
    /**
     * Defines the editing mode, valid values are "cell" and "row".
     * @group Props
     */
    editMode = 'cell';
    /**
     * Field name to use in row grouping.
     * @group Props
     */
    groupRowsBy;
    /**
     * Order to sort when default row grouping is enabled.
     * @group Props
     */
    groupRowsByOrder = 1;
    /**
     * Defines the responsive mode, valid options are "stack" and "scroll".
     * @group Props
     */
    responsiveLayout = 'scroll';
    /**
     * The breakpoint to define the maximum width boundary when using stack responsive layout.
     * @group Props
     */
    breakpoint = '640px';
    /**
     * Locale to be used in paginator formatting.
     * @group Props
     */
    paginatorLocale;
    /**
     * An array of objects to display.
     * @group Props
     */
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
    }
    /**
     * An array of objects to represent dynamic columns.
     * @group Props
     */
    get columns() {
        return this._columns;
    }
    set columns(cols) {
        this._columns = cols;
    }
    /**
     * Index of the first row to be displayed.
     * @group Props
     */
    get first() {
        return this._first;
    }
    set first(val) {
        this._first = val;
    }
    /**
     * Number of rows to display per page.
     * @group Props
     */
    get rows() {
        return this._rows;
    }
    set rows(val) {
        this._rows = val;
    }
    /**
     * Number of total records, defaults to length of value when not defined.
     * @group Props
     */
    get totalRecords() {
        return this._totalRecords;
    }
    set totalRecords(val) {
        this._totalRecords = val;
        this.tableService.onTotalRecordsChange(this._totalRecords);
    }
    /**
     * Name of the field to sort data by default.
     * @group Props
     */
    get sortField() {
        return this._sortField;
    }
    set sortField(val) {
        this._sortField = val;
    }
    /**
     * Order to sort when default sorting is enabled.
     * @group Props
     */
    get sortOrder() {
        return this._sortOrder;
    }
    set sortOrder(val) {
        this._sortOrder = val;
    }
    /**
     * An array of SortMeta objects to sort the data by default in multiple sort mode.
     * @group Props
     */
    get multiSortMeta() {
        return this._multiSortMeta;
    }
    set multiSortMeta(val) {
        this._multiSortMeta = val;
    }
    /**
     * Selected row in single mode or an array of values in multiple mode.
     * @group Props
     */
    get selection() {
        return this._selection;
    }
    set selection(val) {
        this._selection = val;
    }
    /**
     * Whether all data is selected.
     * @group Props
     */
    get selectAll() {
        return this._selection;
    }
    set selectAll(val) {
        this._selection = val;
    }
    /**
     * Emits when the all of the items selected or unselected.
     * @param {TableSelectAllChangeEvent} event - custom  all selection change event.
     * @group Emits
     */
    selectAllChange = new EventEmitter();
    /**
     * Callback to invoke on selection changed.
     * @param {any | null} value - selected data.
     * @group Emits
     */
    selectionChange = new EventEmitter();
    /**
     * Callback to invoke when a row is selected.
     * @param {TableRowSelectEvent} event - custom select event.
     * @group Emits
     */
    onRowSelect = new EventEmitter();
    /**
     * Callback to invoke when a row is unselected.
     * @param {TableRowUnSelectEvent} event - custom unselect event.
     * @group Emits
     */
    onRowUnselect = new EventEmitter();
    /**
     * Callback to invoke when pagination occurs.
     * @param {TablePageEvent} event - custom pagination event.
     * @group Emits
     */
    onPage = new EventEmitter();
    /**
     * Callback to invoke when a column gets sorted.
     * @param {Object} object - sort meta.
     * @group Emits
     */
    onSort = new EventEmitter();
    /**
     * Callback to invoke when data is filtered.
     * @param {TableFilterEvent} event - custom filtering event.
     * @group Emits
     */
    onFilter = new EventEmitter();
    /**
     * Callback to invoke when paging, sorting or filtering happens in lazy mode.
     * @param {TableLazyLoadEvent} event - custom lazy loading event.
     * @group Emits
     */
    onLazyLoad = new EventEmitter();
    /**
     * Callback to invoke when a row is expanded.
     * @param {TableRowExpandEvent} event - custom row expand event.
     * @group Emits
     */
    onRowExpand = new EventEmitter();
    /**
     * Callback to invoke when a row is collapsed.
     * @param {TableRowCollapseEvent} event - custom row collapse event.
     * @group Emits
     */
    onRowCollapse = new EventEmitter();
    /**
     * Callback to invoke when a row is selected with right click.
     * @param {TableContextMenuSelectEvent} event - custom context menu select event.
     * @group Emits
     */
    onContextMenuSelect = new EventEmitter();
    /**
     * Callback to invoke when a column is resized.
     * @param {TableColResizeEvent} event - custom column resize event.
     * @group Emits
     */
    onColResize = new EventEmitter();
    /**
     * Callback to invoke when a column is reordered.
     * @param {TableColumnReorderEvent} event - custom column reorder event.
     * @group Emits
     */
    onColReorder = new EventEmitter();
    /**
     * Callback to invoke when a row is reordered.
     * @param {TableRowReorderEvent} event - custom row reorder event.
     * @group Emits
     */
    onRowReorder = new EventEmitter();
    /**
     * Callback to invoke when a cell switches to edit mode.
     * @param {TableEditInitEvent} event - custom edit init event.
     * @group Emits
     */
    onEditInit = new EventEmitter();
    /**
     * Callback to invoke when cell edit is completed.
     * @param {TableEditCompleteEvent} event - custom edit complete event.
     * @group Emits
     */
    onEditComplete = new EventEmitter();
    /**
     * Callback to invoke when cell edit is cancelled with escape key.
     * @param {TableEditCancelEvent} event - custom edit cancel event.
     * @group Emits
     */
    onEditCancel = new EventEmitter();
    /**
     * Callback to invoke when state of header checkbox changes.
     * @param {TableHeaderCheckboxToggleEvent} event - custom header checkbox event.
     * @group Emits
     */
    onHeaderCheckboxToggle = new EventEmitter();
    /**
     * A function to implement custom sorting, refer to sorting section for details.
     * @param {any} any - sort meta.
     * @group Emits
     */
    sortFunction = new EventEmitter();
    /**
     * Callback to invoke on pagination.
     * @param {number} number - first element.
     * @group Emits
     */
    firstChange = new EventEmitter();
    /**
     * Callback to invoke on rows change.
     * @param {number} number - Row count.
     * @group Emits
     */
    rowsChange = new EventEmitter();
    /**
     * Callback to invoke table state is saved.
     * @param {TableState} object - table state.
     * @group Emits
     */
    onStateSave = new EventEmitter();
    /**
     * Callback to invoke table state is restored.
     * @param {TableState} object - table state.
     * @group Emits
     */
    onStateRestore = new EventEmitter();
    containerViewChild;
    resizeHelperViewChild;
    reorderIndicatorUpViewChild;
    reorderIndicatorDownViewChild;
    wrapperViewChild;
    tableViewChild;
    tableHeaderViewChild;
    tableFooterViewChild;
    scroller;
    templates;
    /**
     * Indicates the height of rows to be scrolled.
     * @group Props
     * @deprecated use virtualScrollItemSize property instead.
     */
    get virtualRowHeight() {
        return this._virtualRowHeight;
    }
    set virtualRowHeight(val) {
        this._virtualRowHeight = val;
        console.warn('The virtualRowHeight property is deprecated.');
    }
    _virtualRowHeight = 28;
    _value = [];
    _columns;
    _totalRecords = 0;
    _first = 0;
    _rows;
    filteredValue;
    headerTemplate;
    headerGroupedTemplate;
    bodyTemplate;
    loadingBodyTemplate;
    captionTemplate;
    footerTemplate;
    footerGroupedTemplate;
    summaryTemplate;
    colGroupTemplate;
    expandedRowTemplate;
    groupHeaderTemplate;
    groupFooterTemplate;
    frozenExpandedRowTemplate;
    frozenHeaderTemplate;
    frozenBodyTemplate;
    frozenFooterTemplate;
    frozenColGroupTemplate;
    emptyMessageTemplate;
    paginatorLeftTemplate;
    paginatorRightTemplate;
    paginatorDropdownItemTemplate;
    loadingIconTemplate;
    reorderIndicatorUpIconTemplate;
    reorderIndicatorDownIconTemplate;
    sortIconTemplate;
    checkboxIconTemplate;
    headerCheckboxIconTemplate;
    paginatorDropdownIconTemplate;
    paginatorFirstPageLinkIconTemplate;
    paginatorLastPageLinkIconTemplate;
    paginatorPreviousPageLinkIconTemplate;
    paginatorNextPageLinkIconTemplate;
    selectionKeys = {};
    lastResizerHelperX;
    reorderIconWidth;
    reorderIconHeight;
    draggedColumn;
    draggedRowIndex;
    droppedRowIndex;
    rowDragging;
    dropPosition;
    editingCell;
    editingCellData;
    editingCellField;
    editingCellRowIndex;
    selfClick;
    documentEditListener;
    _multiSortMeta;
    _sortField;
    _sortOrder = 1;
    preventSelectionSetterPropagation;
    _selection;
    _selectAll = null;
    anchorRowIndex;
    rangeRowIndex;
    filterTimeout;
    initialized;
    rowTouched;
    restoringSort;
    restoringFilter;
    stateRestored;
    columnOrderStateRestored;
    columnWidthsState;
    tableWidthState;
    overlaySubscription;
    resizeColumnElement;
    columnResizing = false;
    rowGroupHeaderStyleObject = {};
    id = UniqueComponentId();
    styleElement;
    responsiveStyleElement;
    window;
    constructor(document, platformId, renderer, el, zone, tableService, cd, filterService, overlayService, config) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.el = el;
        this.zone = zone;
        this.tableService = tableService;
        this.cd = cd;
        this.filterService = filterService;
        this.overlayService = overlayService;
        this.config = config;
        this.window = this.document.defaultView;
    }
    ngOnInit() {
        if (this.lazy && this.lazyLoadOnInit) {
            if (!this.virtualScroll) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            if (this.restoringFilter) {
                this.restoringFilter = false;
            }
        }
        if (this.responsiveLayout === 'stack') {
            this.createResponsiveStyle();
        }
        this.initialized = true;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'caption':
                    this.captionTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'headergrouped':
                    this.headerGroupedTemplate = item.template;
                    break;
                case 'body':
                    this.bodyTemplate = item.template;
                    break;
                case 'loadingbody':
                    this.loadingBodyTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'footergrouped':
                    this.footerGroupedTemplate = item.template;
                    break;
                case 'summary':
                    this.summaryTemplate = item.template;
                    break;
                case 'colgroup':
                    this.colGroupTemplate = item.template;
                    break;
                case 'rowexpansion':
                    this.expandedRowTemplate = item.template;
                    break;
                case 'groupheader':
                    this.groupHeaderTemplate = item.template;
                    break;
                case 'groupfooter':
                    this.groupFooterTemplate = item.template;
                    break;
                case 'frozenheader':
                    this.frozenHeaderTemplate = item.template;
                    break;
                case 'frozenbody':
                    this.frozenBodyTemplate = item.template;
                    break;
                case 'frozenfooter':
                    this.frozenFooterTemplate = item.template;
                    break;
                case 'frozencolgroup':
                    this.frozenColGroupTemplate = item.template;
                    break;
                case 'frozenrowexpansion':
                    this.frozenExpandedRowTemplate = item.template;
                    break;
                case 'emptymessage':
                    this.emptyMessageTemplate = item.template;
                    break;
                case 'paginatorleft':
                    this.paginatorLeftTemplate = item.template;
                    break;
                case 'paginatorright':
                    this.paginatorRightTemplate = item.template;
                    break;
                case 'paginatordropdownicon':
                    this.paginatorDropdownIconTemplate = item.template;
                    break;
                case 'paginatordropdownitem':
                    this.paginatorDropdownItemTemplate = item.template;
                    break;
                case 'paginatorfirstpagelinkicon':
                    this.paginatorFirstPageLinkIconTemplate = item.template;
                    break;
                case 'paginatorlastpagelinkicon':
                    this.paginatorLastPageLinkIconTemplate = item.template;
                    break;
                case 'paginatorpreviouspagelinkicon':
                    this.paginatorPreviousPageLinkIconTemplate = item.template;
                    break;
                case 'paginatornextpagelinkicon':
                    this.paginatorNextPageLinkIconTemplate = item.template;
                    break;
                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;
                case 'reorderindicatorupicon':
                    this.reorderIndicatorUpIconTemplate = item.template;
                    break;
                case 'reorderindicatordownicon':
                    this.reorderIndicatorDownIconTemplate = item.template;
                    break;
                case 'sorticon':
                    this.sortIconTemplate = item.template;
                    break;
                case 'checkboxicon':
                    this.checkboxIconTemplate = item.template;
                    break;
                case 'headercheckboxicon':
                    this.headerCheckboxIconTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.isStateful() && this.resizableColumns) {
                this.restoreColumnWidths();
            }
        }
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.value) {
            if (this.isStateful() && !this.stateRestored && isPlatformBrowser(this.platformId)) {
                this.restoreState();
            }
            this._value = simpleChange.value.currentValue;
            if (!this.lazy) {
                this.totalRecords = this._value ? this._value.length : 0;
                if (this.sortMode == 'single' && (this.sortField || this.groupRowsBy))
                    this.sortSingle();
                else if (this.sortMode == 'multiple' && (this.multiSortMeta || this.groupRowsBy))
                    this.sortMultiple();
                else if (this.hasFilter())
                    //sort already filters
                    this._filter();
            }
            this.tableService.onValueChange(simpleChange.value.currentValue);
        }
        if (simpleChange.columns) {
            if (!this.isStateful()) {
                this._columns = simpleChange.columns.currentValue;
                this.tableService.onColumnsChange(simpleChange.columns.currentValue);
            }
            if (this._columns && this.isStateful() && this.reorderableColumns && !this.columnOrderStateRestored) {
                this.restoreColumnOrder();
                this.tableService.onColumnsChange(this._columns);
            }
        }
        if (simpleChange.sortField) {
            this._sortField = simpleChange.sortField.currentValue;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.groupRowsBy) {
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.sortOrder) {
            this._sortOrder = simpleChange.sortOrder.currentValue;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.groupRowsByOrder) {
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.multiSortMeta) {
            this._multiSortMeta = simpleChange.multiSortMeta.currentValue;
            if (this.sortMode === 'multiple' && (this.initialized || (!this.lazy && !this.virtualScroll))) {
                this.sortMultiple();
            }
        }
        if (simpleChange.selection) {
            this._selection = simpleChange.selection.currentValue;
            if (!this.preventSelectionSetterPropagation) {
                this.updateSelectionKeys();
                this.tableService.onSelectionChange();
            }
            this.preventSelectionSetterPropagation = false;
        }
        if (simpleChange.selectAll) {
            this._selectAll = simpleChange.selectAll.currentValue;
            if (!this.preventSelectionSetterPropagation) {
                this.updateSelectionKeys();
                this.tableService.onSelectionChange();
                if (this.isStateful()) {
                    this.saveState();
                }
            }
            this.preventSelectionSetterPropagation = false;
        }
    }
    get processedData() {
        return this.filteredValue || this.value || [];
    }
    _initialColWidths;
    dataToRender(data) {
        const _data = data || this.processedData;
        if (_data && this.paginator) {
            const first = this.lazy ? 0 : this.first;
            return _data.slice(first, first + this.rows);
        }
        return _data;
    }
    updateSelectionKeys() {
        if (this.dataKey && this._selection) {
            this.selectionKeys = {};
            if (Array.isArray(this._selection)) {
                for (let data of this._selection) {
                    this.selectionKeys[String(ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
                }
            }
            else {
                this.selectionKeys[String(ObjectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
            }
        }
    }
    onPageChange(event) {
        this.first = event.first;
        this.rows = event.rows;
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.firstChange.emit(this.first);
        this.rowsChange.emit(this.rows);
        this.tableService.onValueChange(this.value);
        if (this.isStateful()) {
            this.saveState();
        }
        this.anchorRowIndex = null;
        if (this.scrollable) {
            this.resetScrollTop();
        }
    }
    sort(event) {
        let originalEvent = event.originalEvent;
        if (this.sortMode === 'single') {
            this._sortOrder = this.sortField === event.field ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = event.field;
            if (this.resetPageOnSort) {
                this._first = 0;
                this.firstChange.emit(this._first);
                if (this.scrollable) {
                    this.resetScrollTop();
                }
            }
            this.sortSingle();
        }
        if (this.sortMode === 'multiple') {
            let metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
            let sortMeta = this.getSortMeta(event.field);
            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }];
                    if (this.resetPageOnSort) {
                        this._first = 0;
                        this.firstChange.emit(this._first);
                        if (this.scrollable) {
                            this.resetScrollTop();
                        }
                    }
                }
                else {
                    sortMeta.order = sortMeta.order * -1;
                }
            }
            else {
                if (!metaKey || !this.multiSortMeta) {
                    this._multiSortMeta = [];
                    if (this.resetPageOnSort) {
                        this._first = 0;
                        this.firstChange.emit(this._first);
                    }
                }
                this._multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
            }
            this.sortMultiple();
        }
        if (this.isStateful()) {
            this.saveState();
        }
        this.anchorRowIndex = null;
    }
    sortSingle() {
        let field = this.sortField || this.groupRowsBy;
        let order = this.sortField ? this.sortOrder : this.groupRowsByOrder;
        if (this.groupRowsBy && this.sortField && this.groupRowsBy !== this.sortField) {
            this._multiSortMeta = [this.getGroupRowsMeta(), { field: this.sortField, order: this.sortOrder }];
            this.sortMultiple();
            return;
        }
        if (field && order) {
            if (this.restoringSort) {
                this.restoringSort = false;
            }
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        field: field,
                        order: order
                    });
                }
                else {
                    this.value.sort((data1, data2) => {
                        let value1 = ObjectUtils.resolveFieldData(data1, field);
                        let value2 = ObjectUtils.resolveFieldData(data2, field);
                        let result = null;
                        if (value1 == null && value2 != null)
                            result = -1;
                        else if (value1 != null && value2 == null)
                            result = 1;
                        else if (value1 == null && value2 == null)
                            result = 0;
                        else if (typeof value1 === 'string' && typeof value2 === 'string')
                            result = value1.localeCompare(value2);
                        else
                            result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
                        return order * result;
                    });
                    this._value = [...this.value];
                }
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            let sortMeta = {
                field: field,
                order: order
            };
            this.onSort.emit(sortMeta);
            this.tableService.onSort(sortMeta);
        }
    }
    sortMultiple() {
        if (this.groupRowsBy) {
            if (!this._multiSortMeta)
                this._multiSortMeta = [this.getGroupRowsMeta()];
            else if (this.multiSortMeta[0].field !== this.groupRowsBy)
                this._multiSortMeta = [this.getGroupRowsMeta(), ...this._multiSortMeta];
        }
        if (this.multiSortMeta) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        multiSortMeta: this.multiSortMeta
                    });
                }
                else {
                    this.value.sort((data1, data2) => {
                        return this.multisortField(data1, data2, this.multiSortMeta, 0);
                    });
                    this._value = [...this.value];
                }
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            this.onSort.emit({
                multisortmeta: this.multiSortMeta
            });
            this.tableService.onSort(this.multiSortMeta);
        }
    }
    multisortField(data1, data2, multiSortMeta, index) {
        const value1 = ObjectUtils.resolveFieldData(data1, multiSortMeta[index].field);
        const value2 = ObjectUtils.resolveFieldData(data2, multiSortMeta[index].field);
        if (ObjectUtils.compare(value1, value2, this.filterLocale) === 0) {
            return multiSortMeta.length - 1 > index ? this.multisortField(data1, data2, multiSortMeta, index + 1) : 0;
        }
        return this.compareValuesOnSort(value1, value2, multiSortMeta[index].order);
    }
    compareValuesOnSort(value1, value2, order) {
        return ObjectUtils.sort(value1, value2, order, this.filterLocale, this.sortOrder);
    }
    getSortMeta(field) {
        if (this.multiSortMeta && this.multiSortMeta.length) {
            for (let i = 0; i < this.multiSortMeta.length; i++) {
                if (this.multiSortMeta[i].field === field) {
                    return this.multiSortMeta[i];
                }
            }
        }
        return null;
    }
    isSorted(field) {
        if (this.sortMode === 'single') {
            return this.sortField && this.sortField === field;
        }
        else if (this.sortMode === 'multiple') {
            let sorted = false;
            if (this.multiSortMeta) {
                for (let i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    }
    handleRowClick(event) {
        let target = event.originalEvent.target;
        let targetNode = target.nodeName;
        let parentNode = target.parentElement && target.parentElement.nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || parentNode == 'INPUT' || parentNode == 'BUTTON' || parentNode == 'A' || DomHandler.hasClass(event.originalEvent.target, 'p-clickable')) {
            return;
        }
        if (this.selectionMode) {
            let rowData = event.rowData;
            let rowIndex = event.rowIndex;
            this.preventSelectionSetterPropagation = true;
            if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
                DomHandler.clearSelection();
                if (this.rangeRowIndex != null) {
                    this.clearSelectionRange(event.originalEvent);
                }
                this.rangeRowIndex = rowIndex;
                this.selectRange(event.originalEvent, rowIndex);
            }
            else {
                let selected = this.isSelected(rowData);
                if (!selected && !this.isRowSelectable(rowData, rowIndex)) {
                    return;
                }
                let metaSelection = this.rowTouched ? false : this.metaKeySelection;
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                this.anchorRowIndex = rowIndex;
                this.rangeRowIndex = rowIndex;
                if (metaSelection) {
                    let metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(null);
                        }
                        else {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val, i) => i != selectionIndex);
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            this._selection = rowData;
                            this.selectionChange.emit(rowData);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        else if (this.isMultipleSelectionMode()) {
                            if (metaKey) {
                                this._selection = this.selection || [];
                            }
                            else {
                                this._selection = [];
                                this.selectionKeys = {};
                            }
                            this._selection = [...this.selection, rowData];
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: rowIndex });
                    }
                }
                else {
                    if (this.selectionMode === 'single') {
                        if (selected) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: rowIndex });
                        }
                        else {
                            this._selection = rowData;
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                    else if (this.selectionMode === 'multiple') {
                        if (selected) {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val, i) => i != selectionIndex);
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: rowIndex });
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        else {
                            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                }
            }
            this.tableService.onSelectionChange();
            if (this.isStateful()) {
                this.saveState();
            }
        }
        this.rowTouched = false;
    }
    handleRowTouchEnd(event) {
        this.rowTouched = true;
    }
    handleRowRightClick(event) {
        if (this.contextMenu) {
            const rowData = event.rowData;
            const rowIndex = event.rowIndex;
            if (this.contextMenuSelectionMode === 'separate') {
                this.contextMenuSelection = rowData;
                this.contextMenuSelectionChange.emit(rowData);
                this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, data: rowData, index: event.rowIndex });
                this.contextMenu.show(event.originalEvent);
                this.tableService.onContextMenu(rowData);
            }
            else if (this.contextMenuSelectionMode === 'joint') {
                this.preventSelectionSetterPropagation = true;
                let selected = this.isSelected(rowData);
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                if (!selected) {
                    if (!this.isRowSelectable(rowData, rowIndex)) {
                        return;
                    }
                    if (this.isSingleSelectionMode()) {
                        this.selection = rowData;
                        this.selectionChange.emit(rowData);
                        if (dataKeyValue) {
                            this.selectionKeys = {};
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                    else if (this.isMultipleSelectionMode()) {
                        this._selection = this.selection ? [...this.selection, rowData] : [rowData];
                        this.selectionChange.emit(this.selection);
                        if (dataKeyValue) {
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                }
                this.tableService.onSelectionChange();
                this.contextMenu.show(event.originalEvent);
                this.onContextMenuSelect.emit({ originalEvent: event, data: rowData, index: event.rowIndex });
            }
        }
    }
    selectRange(event, rowIndex) {
        let rangeStart, rangeEnd;
        if (this.anchorRowIndex > rowIndex) {
            rangeStart = rowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else if (this.anchorRowIndex < rowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = rowIndex;
        }
        else {
            rangeStart = rowIndex;
            rangeEnd = rowIndex;
        }
        if (this.lazy && this.paginator) {
            rangeStart -= this.first;
            rangeEnd -= this.first;
        }
        let rangeRowsData = [];
        for (let i = rangeStart; i <= rangeEnd; i++) {
            let rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
            if (!this.isSelected(rangeRowData)) {
                if (!this.isRowSelectable(rangeRowData, rowIndex)) {
                    continue;
                }
                rangeRowsData.push(rangeRowData);
                this._selection = [...this.selection, rangeRowData];
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
            }
        }
        this.selectionChange.emit(this.selection);
        this.onRowSelect.emit({ originalEvent: event, data: rangeRowsData, type: 'row' });
    }
    clearSelectionRange(event) {
        let rangeStart, rangeEnd;
        let rangeRowIndex = this.rangeRowIndex;
        let anchorRowIndex = this.anchorRowIndex;
        if (rangeRowIndex > anchorRowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        else if (rangeRowIndex < anchorRowIndex) {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        for (let i = rangeStart; i <= rangeEnd; i++) {
            let rangeRowData = this.value[i];
            let selectionIndex = this.findIndexInSelection(rangeRowData);
            this._selection = this.selection.filter((val, i) => i != selectionIndex);
            let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
            this.onRowUnselect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
        }
    }
    isSelected(rowData) {
        if (rowData && this.selection) {
            if (this.dataKey) {
                return this.selectionKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
            }
            else {
                if (Array.isArray(this.selection))
                    return this.findIndexInSelection(rowData) > -1;
                else
                    return this.equals(rowData, this.selection);
            }
        }
        return false;
    }
    findIndexInSelection(rowData) {
        let index = -1;
        if (this.selection && this.selection.length) {
            for (let i = 0; i < this.selection.length; i++) {
                if (this.equals(rowData, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    isRowSelectable(data, index) {
        if (this.rowSelectable && !this.rowSelectable({ data, index })) {
            return false;
        }
        return true;
    }
    toggleRowWithRadio(event, rowData) {
        this.preventSelectionSetterPropagation = true;
        if (this.selection != rowData) {
            if (!this.isRowSelectable(rowData, event.rowIndex)) {
                return;
            }
            this._selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
            if (this.dataKey) {
                this.selectionKeys = {};
                this.selectionKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
            }
        }
        else {
            this._selection = null;
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
        }
        this.tableService.onSelectionChange();
        if (this.isStateful()) {
            this.saveState();
        }
    }
    toggleRowWithCheckbox(event, rowData) {
        this.selection = this.selection || [];
        let selected = this.isSelected(rowData);
        let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
        this.preventSelectionSetterPropagation = true;
        if (selected) {
            let selectionIndex = this.findIndexInSelection(rowData);
            this._selection = this.selection.filter((val, i) => i != selectionIndex);
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        }
        else {
            if (!this.isRowSelectable(rowData, event.rowIndex)) {
                return;
            }
            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }
        this.tableService.onSelectionChange();
        if (this.isStateful()) {
            this.saveState();
        }
    }
    toggleRowsWithCheckbox(event, check) {
        if (this._selectAll !== null) {
            this.selectAllChange.emit({ originalEvent: event, checked: check });
        }
        else {
            const data = this.selectionPageOnly ? this.dataToRender(this.processedData) : this.processedData;
            let selection = this.selectionPageOnly && this._selection ? this._selection.filter((s) => !data.some((d) => this.equals(s, d))) : [];
            if (check) {
                selection = this.frozenValue ? [...selection, ...this.frozenValue, ...data] : [...selection, ...data];
                selection = this.rowSelectable ? selection.filter((data, index) => this.rowSelectable({ data, index })) : selection;
            }
            this._selection = selection;
            this.preventSelectionSetterPropagation = true;
            this.updateSelectionKeys();
            this.selectionChange.emit(this._selection);
            this.tableService.onSelectionChange();
            this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: check });
            if (this.isStateful()) {
                this.saveState();
            }
        }
    }
    equals(data1, data2) {
        return this.compareSelectionBy === 'equals' ? data1 === data2 : ObjectUtils.equals(data1, data2, this.dataKey);
    }
    /* Legacy Filtering for custom elements */
    filter(value, field, matchMode) {
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        if (!this.isFilterBlank(value)) {
            this.filters[field] = { value: value, matchMode: matchMode };
        }
        else if (this.filters[field]) {
            delete this.filters[field];
        }
        this.filterTimeout = setTimeout(() => {
            this._filter();
            this.filterTimeout = null;
        }, this.filterDelay);
        this.anchorRowIndex = null;
    }
    filterGlobal(value, matchMode) {
        this.filter(value, 'global', matchMode);
    }
    isFilterBlank(filter) {
        if (filter !== null && filter !== undefined) {
            if ((typeof filter === 'string' && filter.trim().length == 0) || (Array.isArray(filter) && filter.length == 0))
                return true;
            else
                return false;
        }
        return true;
    }
    _filter() {
        if (!this.restoringFilter) {
            this.first = 0;
            this.firstChange.emit(this.first);
        }
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if (!this.value) {
                return;
            }
            if (!this.hasFilter()) {
                this.filteredValue = null;
                if (this.paginator) {
                    this.totalRecords = this.value ? this.value.length : 0;
                }
            }
            else {
                let globalFilterFieldsArray;
                if (this.filters['global']) {
                    if (!this.columns && !this.globalFilterFields)
                        throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                    else
                        globalFilterFieldsArray = this.globalFilterFields || this.columns;
                }
                this.filteredValue = [];
                for (let i = 0; i < this.value.length; i++) {
                    let localMatch = true;
                    let globalMatch = false;
                    let localFiltered = false;
                    for (let prop in this.filters) {
                        if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
                            localFiltered = true;
                            let filterField = prop;
                            let filterMeta = this.filters[filterField];
                            if (Array.isArray(filterMeta)) {
                                for (let meta of filterMeta) {
                                    localMatch = this.executeLocalFilter(filterField, this.value[i], meta);
                                    if ((meta.operator === FilterOperator.OR && localMatch) || (meta.operator === FilterOperator.AND && !localMatch)) {
                                        break;
                                    }
                                }
                            }
                            else {
                                localMatch = this.executeLocalFilter(filterField, this.value[i], filterMeta);
                            }
                            if (!localMatch) {
                                break;
                            }
                        }
                    }
                    if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                        for (let j = 0; j < globalFilterFieldsArray.length; j++) {
                            let globalFilterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
                            globalMatch = this.filterService.filters[this.filters['global'].matchMode](ObjectUtils.resolveFieldData(this.value[i], globalFilterField), this.filters['global'].value, this.filterLocale);
                            if (globalMatch) {
                                break;
                            }
                        }
                    }
                    let matches;
                    if (this.filters['global']) {
                        matches = localFiltered ? localFiltered && localMatch && globalMatch : globalMatch;
                    }
                    else {
                        matches = localFiltered && localMatch;
                    }
                    if (matches) {
                        this.filteredValue.push(this.value[i]);
                    }
                }
                if (this.filteredValue.length === this.value.length) {
                    this.filteredValue = null;
                }
                if (this.paginator) {
                    this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
                }
            }
        }
        this.onFilter.emit({
            filters: this.filters,
            filteredValue: this.filteredValue || this.value
        });
        this.tableService.onValueChange(this.value);
        if (this.isStateful() && !this.restoringFilter) {
            this.saveState();
        }
        if (this.restoringFilter) {
            this.restoringFilter = false;
        }
        this.cd.markForCheck();
        if (this.scrollable) {
            this.resetScrollTop();
        }
    }
    executeLocalFilter(field, rowData, filterMeta) {
        let filterValue = filterMeta.value;
        let filterMatchMode = filterMeta.matchMode || FilterMatchMode.STARTS_WITH;
        let dataFieldValue = ObjectUtils.resolveFieldData(rowData, field);
        let filterConstraint = this.filterService.filters[filterMatchMode];
        return filterConstraint(dataFieldValue, filterValue, this.filterLocale);
    }
    hasFilter() {
        let empty = true;
        for (let prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }
        return !empty;
    }
    createLazyLoadMetadata() {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
            multiSortMeta: this.multiSortMeta,
            forceUpdate: () => this.cd.detectChanges()
        };
    }
    clear() {
        this._sortField = null;
        this._sortOrder = this.defaultSortOrder;
        this._multiSortMeta = null;
        this.tableService.onSort(null);
        this.clearFilterValues();
        this.filteredValue = null;
        this.first = 0;
        this.firstChange.emit(this.first);
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.totalRecords = this._value ? this._value.length : 0;
        }
    }
    clearFilterValues() {
        for (const [, filterMetadata] of Object.entries(this.filters)) {
            if (Array.isArray(filterMetadata)) {
                for (let filter of filterMetadata) {
                    filter.value = null;
                }
            }
            else if (filterMetadata) {
                filterMetadata.value = null;
            }
        }
    }
    reset() {
        this.clear();
    }
    getExportHeader(column) {
        return column[this.exportHeader] || column.header || column.field;
    }
    /**
     * Data export method.
     * @param {ExportCSVOptions} object - Export options.
     * @group Method
     */
    exportCSV(options) {
        let data;
        let csv = '';
        let columns = this.columns;
        if (options && options.selectionOnly) {
            data = this.selection || [];
        }
        else if (options && options.allValues) {
            data = this.value || [];
        }
        else {
            data = this.filteredValue || this.value;
            if (this.frozenValue) {
                data = data ? [...this.frozenValue, ...data] : this.frozenValue;
            }
        }
        const exportableColumns = columns.filter((column) => column.exportable !== false && column.field);
        //headers
        csv += exportableColumns.map((column) => '"' + this.getExportHeader(column) + '"').join(this.csvSeparator);
        //body
        const body = data
            .map((record) => exportableColumns
            .map((column) => {
            let cellData = ObjectUtils.resolveFieldData(record, column.field);
            if (cellData != null) {
                if (this.exportFunction) {
                    cellData = this.exportFunction({
                        data: cellData,
                        field: column.field
                    });
                }
                else
                    cellData = String(cellData).replace(/"/g, '""');
            }
            else
                cellData = '';
            return '"' + cellData + '"';
        })
            .join(this.csvSeparator))
            .join('\n');
        if (body.length) {
            csv += '\n' + body;
        }
        let blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csv], {
            type: 'text/csv;charset=utf-8;'
        });
        let link = this.renderer.createElement('a');
        link.style.display = 'none';
        this.renderer.appendChild(this.document.body, link);
        if (link.download !== undefined) {
            link.setAttribute('href', URL.createObjectURL(blob));
            link.setAttribute('download', this.exportFilename + '.csv');
            link.click();
        }
        else {
            csv = 'data:text/csv;charset=utf-8,' + csv;
            this.window.open(encodeURI(csv));
        }
        this.renderer.removeChild(this.document.body, link);
    }
    onLazyItemLoad(event) {
        this.onLazyLoad.emit({
            ...this.createLazyLoadMetadata(),
            ...event,
            rows: event.last - event.first
        });
    }
    /**
     * Resets scroll to top.
     * @group Method
     */
    resetScrollTop() {
        if (this.virtualScroll)
            this.scrollToVirtualIndex(0);
        else
            this.scrollTo({ top: 0 });
    }
    /**
     * Scrolls to given index when using virtual scroll.
     * @param {number} index - index of the element.
     * @group Method
     */
    scrollToVirtualIndex(index) {
        this.scroller && this.scroller.scrollToIndex(index);
    }
    /**
     * Scrolls to given index.
     * @param {ScrollToOptions} options - scroll options.
     * @group Method
     */
    scrollTo(options) {
        if (this.virtualScroll) {
            this.scroller?.scrollTo(options);
        }
        else if (this.wrapperViewChild && this.wrapperViewChild.nativeElement) {
            if (this.wrapperViewChild.nativeElement.scrollTo) {
                this.wrapperViewChild.nativeElement.scrollTo(options);
            }
            else {
                this.wrapperViewChild.nativeElement.scrollLeft = options.left;
                this.wrapperViewChild.nativeElement.scrollTop = options.top;
            }
        }
    }
    updateEditingCell(cell, data, field, index) {
        this.editingCell = cell;
        this.editingCellData = data;
        this.editingCellField = field;
        this.editingCellRowIndex = index;
        this.bindDocumentEditListener();
    }
    isEditingCellValid() {
        return this.editingCell && DomHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length === 0;
    }
    bindDocumentEditListener() {
        if (!this.documentEditListener) {
            this.documentEditListener = this.renderer.listen(this.document, 'click', (event) => {
                if (this.editingCell && !this.selfClick && this.isEditingCellValid()) {
                    DomHandler.removeClass(this.editingCell, 'p-cell-editing');
                    this.editingCell = null;
                    this.onEditComplete.emit({ field: this.editingCellField, data: this.editingCellData, originalEvent: event, index: this.editingCellRowIndex });
                    this.editingCellField = null;
                    this.editingCellData = null;
                    this.editingCellRowIndex = null;
                    this.unbindDocumentEditListener();
                    this.cd.markForCheck();
                    if (this.overlaySubscription) {
                        this.overlaySubscription.unsubscribe();
                    }
                }
                this.selfClick = false;
            });
        }
    }
    unbindDocumentEditListener() {
        if (this.documentEditListener) {
            this.documentEditListener();
            this.documentEditListener = null;
        }
    }
    initRowEdit(rowData) {
        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        this.editingRowKeys[dataKeyValue] = true;
    }
    saveRowEdit(rowData, rowElement) {
        if (DomHandler.find(rowElement, '.ng-invalid.ng-dirty').length === 0) {
            let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
            delete this.editingRowKeys[dataKeyValue];
        }
    }
    cancelRowEdit(rowData) {
        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        delete this.editingRowKeys[dataKeyValue];
    }
    toggleRow(rowData, event) {
        if (!this.dataKey && !this.groupRowsBy) {
            throw new Error('dataKey or groupRowsBy must be defined to use row expansion');
        }
        let dataKeyValue = this.groupRowsBy ? String(ObjectUtils.resolveFieldData(rowData, this.groupRowsBy)) : String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        if (this.expandedRowKeys[dataKeyValue] != null) {
            delete this.expandedRowKeys[dataKeyValue];
            this.onRowCollapse.emit({
                originalEvent: event,
                data: rowData
            });
        }
        else {
            if (this.rowExpandMode === 'single') {
                this.expandedRowKeys = {};
            }
            this.expandedRowKeys[dataKeyValue] = true;
            this.onRowExpand.emit({
                originalEvent: event,
                data: rowData
            });
        }
        if (event) {
            event.preventDefault();
        }
        if (this.isStateful()) {
            this.saveState();
        }
    }
    isRowExpanded(rowData) {
        return this.groupRowsBy ? this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.groupRowsBy))] === true : this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
    }
    isRowEditing(rowData) {
        return this.editingRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
    }
    isSingleSelectionMode() {
        return this.selectionMode === 'single';
    }
    isMultipleSelectionMode() {
        return this.selectionMode === 'multiple';
    }
    onColumnResizeBegin(event) {
        let containerLeft = DomHandler.getOffset(this.containerViewChild?.nativeElement).left;
        this.resizeColumnElement = event.target.parentElement;
        this.columnResizing = true;
        this.lastResizerHelperX = event.pageX - containerLeft + this.containerViewChild?.nativeElement.scrollLeft;
        this.onColumnResize(event);
        event.preventDefault();
    }
    onColumnResize(event) {
        let containerLeft = DomHandler.getOffset(this.containerViewChild?.nativeElement).left;
        DomHandler.addClass(this.containerViewChild?.nativeElement, 'p-unselectable-text');
        this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild?.nativeElement.offsetHeight + 'px';
        this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
        this.resizeHelperViewChild.nativeElement.style.left = event.pageX - containerLeft + this.containerViewChild?.nativeElement.scrollLeft + 'px';
        this.resizeHelperViewChild.nativeElement.style.display = 'block';
    }
    onColumnResizeEnd() {
        let delta = this.resizeHelperViewChild?.nativeElement.offsetLeft - this.lastResizerHelperX;
        let columnWidth = this.resizeColumnElement.offsetWidth;
        let newColumnWidth = columnWidth + delta;
        let minWidth = this.resizeColumnElement.style.minWidth.replace(/[^\d.]/g, '') || 15;
        if (newColumnWidth >= minWidth) {
            if (this.columnResizeMode === 'fit') {
                let nextColumn = this.resizeColumnElement.nextElementSibling;
                let nextColumnWidth = nextColumn.offsetWidth - delta;
                if (newColumnWidth > 15 && nextColumnWidth > 15) {
                    this.resizeTableCells(newColumnWidth, nextColumnWidth);
                }
            }
            else if (this.columnResizeMode === 'expand') {
                this._initialColWidths = this._totalTableWidth();
                let tableWidth = this.tableViewChild?.nativeElement.offsetWidth + delta;
                this.setResizeTableWidth(tableWidth + 'px');
                this.resizeTableCells(newColumnWidth, null);
            }
            this.onColResize.emit({
                element: this.resizeColumnElement,
                delta: delta
            });
            if (this.isStateful()) {
                this.saveState();
            }
        }
        this.resizeHelperViewChild.nativeElement.style.display = 'none';
        DomHandler.removeClass(this.containerViewChild?.nativeElement, 'p-unselectable-text');
    }
    _totalTableWidth() {
        let widths = [];
        const tableHead = DomHandler.findSingle(this.containerViewChild.nativeElement, '.p-datatable-thead');
        let headers = DomHandler.find(tableHead, 'tr > th');
        headers.forEach((header) => widths.push(DomHandler.getOuterWidth(header)));
        return widths;
    }
    onColumnDragStart(event, columnElement) {
        this.reorderIconWidth = DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild?.nativeElement);
        this.reorderIconHeight = DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild?.nativeElement);
        this.draggedColumn = columnElement;
        event.dataTransfer.setData('text', 'b'); // For firefox
    }
    onColumnDragEnter(event, dropHeader) {
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            let containerOffset = DomHandler.getOffset(this.containerViewChild?.nativeElement);
            let dropHeaderOffset = DomHandler.getOffset(dropHeader);
            if (this.draggedColumn != dropHeader) {
                let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
                let dropIndex = DomHandler.indexWithinGroup(dropHeader, 'preorderablecolumn');
                let targetLeft = dropHeaderOffset.left - containerOffset.left;
                let targetTop = containerOffset.top - dropHeaderOffset.top;
                let columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
                this.reorderIndicatorUpViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + 'px';
                this.reorderIndicatorDownViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
                if (event.pageX > columnCenter) {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2) + 'px';
                    this.dropPosition = 1;
                }
                else {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = targetLeft - Math.ceil(this.reorderIconWidth / 2) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = targetLeft - Math.ceil(this.reorderIconWidth / 2) + 'px';
                    this.dropPosition = -1;
                }
                this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
                this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
            }
            else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    }
    onColumnDragLeave(event) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
        }
    }
    onColumnDrop(event, dropColumn) {
        event.preventDefault();
        if (this.draggedColumn) {
            let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
            let dropIndex = DomHandler.indexWithinGroup(dropColumn, 'preorderablecolumn');
            let allowDrop = dragIndex != dropIndex;
            if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }
            if (allowDrop && dropIndex < dragIndex && this.dropPosition === 1) {
                dropIndex = dropIndex + 1;
            }
            if (allowDrop && dropIndex > dragIndex && this.dropPosition === -1) {
                dropIndex = dropIndex - 1;
            }
            if (allowDrop) {
                ObjectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
                if (this.isStateful()) {
                    this.zone.runOutsideAngular(() => {
                        setTimeout(() => {
                            this.saveState();
                        });
                    });
                }
            }
            if (this.resizableColumns && this.resizeColumnElement) {
                let width = this.columnResizeMode === 'expand' ? this._initialColWidths : this._totalTableWidth();
                ObjectUtils.reorderArray(width, dragIndex + 1, dropIndex + 1);
                this.updateStyleElement(width, dragIndex, null, null);
            }
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    }
    resizeTableCells(newColumnWidth, nextColumnWidth) {
        let colIndex = DomHandler.index(this.resizeColumnElement);
        let width = this.columnResizeMode === 'expand' ? this._initialColWidths : this._totalTableWidth();
        this.updateStyleElement(width, colIndex, newColumnWidth, nextColumnWidth);
    }
    updateStyleElement(width, colIndex, newColumnWidth, nextColumnWidth) {
        this.destroyStyleElement();
        this.createStyleElement();
        let innerHTML = '';
        width.forEach((width, index) => {
            let colWidth = index === colIndex ? newColumnWidth : nextColumnWidth && index === colIndex + 1 ? nextColumnWidth : width;
            let style = `width: ${colWidth}px !important; max-width: ${colWidth}px !important;`;
            innerHTML += `
                #${this.id}-table > .p-datatable-thead > tr > th:nth-child(${index + 1}),
                #${this.id}-table > .p-datatable-tbody > tr > td:nth-child(${index + 1}),
                #${this.id}-table > .p-datatable-tfoot > tr > td:nth-child(${index + 1}) {
                    ${style}
                }
            `;
        });
        this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
    }
    onRowDragStart(event, index) {
        this.rowDragging = true;
        this.draggedRowIndex = index;
        event.dataTransfer.setData('text', 'b'); // For firefox
    }
    onRowDragOver(event, index, rowElement) {
        if (this.rowDragging && this.draggedRowIndex !== index) {
            let rowY = DomHandler.getOffset(rowElement).top;
            let pageY = event.pageY;
            let rowMidY = rowY + DomHandler.getOuterHeight(rowElement) / 2;
            let prevRowElement = rowElement.previousElementSibling;
            if (pageY < rowMidY) {
                DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
                this.droppedRowIndex = index;
                if (prevRowElement)
                    DomHandler.addClass(prevRowElement, 'p-datatable-dragpoint-bottom');
                else
                    DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
            }
            else {
                if (prevRowElement)
                    DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
                else
                    DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
                this.droppedRowIndex = index + 1;
                DomHandler.addClass(rowElement, 'p-datatable-dragpoint-bottom');
            }
        }
    }
    onRowDragLeave(event, rowElement) {
        let prevRowElement = rowElement.previousElementSibling;
        if (prevRowElement) {
            DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
        }
        DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
        DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-top');
    }
    onRowDragEnd(event) {
        this.rowDragging = false;
        this.draggedRowIndex = null;
        this.droppedRowIndex = null;
    }
    onRowDrop(event, rowElement) {
        if (this.droppedRowIndex != null) {
            let dropIndex = this.draggedRowIndex > this.droppedRowIndex ? this.droppedRowIndex : this.droppedRowIndex === 0 ? 0 : this.droppedRowIndex - 1;
            ObjectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);
            if (this.virtualScroll) {
                // TODO: Check
                this._value = [...this._value];
            }
            this.onRowReorder.emit({
                dragIndex: this.draggedRowIndex,
                dropIndex: dropIndex
            });
        }
        //cleanup
        this.onRowDragLeave(event, rowElement);
        this.onRowDragEnd(event);
    }
    isEmpty() {
        let data = this.filteredValue || this.value;
        return data == null || data.length == 0;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    getStorage() {
        if (isPlatformBrowser(this.platformId)) {
            switch (this.stateStorage) {
                case 'local':
                    return window.localStorage;
                case 'session':
                    return window.sessionStorage;
                default:
                    throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
            }
        }
        else {
            throw new Error('Browser storage is not available in the server side.');
        }
    }
    isStateful() {
        return this.stateKey != null;
    }
    saveState() {
        const storage = this.getStorage();
        let state = {};
        if (this.paginator) {
            state.first = this.first;
            state.rows = this.rows;
        }
        if (this.sortField) {
            state.sortField = this.sortField;
            state.sortOrder = this.sortOrder;
        }
        if (this.multiSortMeta) {
            state.multiSortMeta = this.multiSortMeta;
        }
        if (this.hasFilter()) {
            state.filters = this.filters;
        }
        if (this.resizableColumns) {
            this.saveColumnWidths(state);
        }
        if (this.reorderableColumns) {
            this.saveColumnOrder(state);
        }
        if (this.selection) {
            state.selection = this.selection;
        }
        if (Object.keys(this.expandedRowKeys).length) {
            state.expandedRowKeys = this.expandedRowKeys;
        }
        storage.setItem(this.stateKey, JSON.stringify(state));
        this.onStateSave.emit(state);
    }
    clearState() {
        const storage = this.getStorage();
        if (this.stateKey) {
            storage.removeItem(this.stateKey);
        }
    }
    restoreState() {
        const storage = this.getStorage();
        const stateString = storage.getItem(this.stateKey);
        const dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
        const reviver = function (key, value) {
            if (typeof value === 'string' && dateFormat.test(value)) {
                return new Date(value);
            }
            return value;
        };
        if (stateString) {
            let state = JSON.parse(stateString, reviver);
            if (this.paginator) {
                if (this.first !== undefined) {
                    this.first = state.first;
                    this.firstChange.emit(this.first);
                }
                if (this.rows !== undefined) {
                    this.rows = state.rows;
                    this.rowsChange.emit(this.rows);
                }
            }
            if (state.sortField) {
                this.restoringSort = true;
                this._sortField = state.sortField;
                this._sortOrder = state.sortOrder;
            }
            if (state.multiSortMeta) {
                this.restoringSort = true;
                this._multiSortMeta = state.multiSortMeta;
            }
            if (state.filters) {
                this.restoringFilter = true;
                this.filters = state.filters;
            }
            if (this.resizableColumns) {
                this.columnWidthsState = state.columnWidths;
                this.tableWidthState = state.tableWidth;
            }
            // if (this.reorderableColumns) {
            //     this.restoreColumnOrder();
            // }
            if (state.expandedRowKeys) {
                this.expandedRowKeys = state.expandedRowKeys;
            }
            if (state.selection) {
                Promise.resolve(null).then(() => this.selectionChange.emit(state.selection));
            }
            this.stateRestored = true;
            this.onStateRestore.emit(state);
        }
    }
    saveColumnWidths(state) {
        let widths = [];
        let headers = DomHandler.find(this.containerViewChild?.nativeElement, '.p-datatable-thead > tr > th');
        headers.forEach((header) => widths.push(DomHandler.getOuterWidth(header)));
        state.columnWidths = widths.join(',');
        if (this.columnResizeMode === 'expand') {
            state.tableWidth = DomHandler.getOuterWidth(this.tableViewChild?.nativeElement);
        }
    }
    setResizeTableWidth(width) {
        this.tableViewChild.nativeElement.style.width = width;
        this.tableViewChild.nativeElement.style.minWidth = width;
    }
    restoreColumnWidths() {
        if (this.columnWidthsState) {
            let widths = this.columnWidthsState.split(',');
            if (this.columnResizeMode === 'expand' && this.tableWidthState) {
                this.setResizeTableWidth(this.tableWidthState + 'px');
            }
            if (ObjectUtils.isNotEmpty(widths)) {
                this.createStyleElement();
                let innerHTML = '';
                widths.forEach((width, index) => {
                    let style = `width: ${width}px !important; max-width: ${width}px !important`;
                    innerHTML += `
                        #${this.id}-table > .p-datatable-thead > tr > th:nth-child(${index + 1}),
                        #${this.id}-table > .p-datatable-tbody > tr > td:nth-child(${index + 1}),
                        #${this.id}-table > .p-datatable-tfoot > tr > td:nth-child(${index + 1}) {
                            ${style}
                        }
                    `;
                });
                this.styleElement.innerHTML = innerHTML;
            }
        }
    }
    saveColumnOrder(state) {
        if (this.columns) {
            let columnOrder = [];
            this.columns.map((column) => {
                columnOrder.push(column.field || column.key);
            });
            state.columnOrder = columnOrder;
        }
    }
    restoreColumnOrder() {
        const storage = this.getStorage();
        const stateString = storage.getItem(this.stateKey);
        if (stateString) {
            let state = JSON.parse(stateString);
            let columnOrder = state.columnOrder;
            if (columnOrder) {
                let reorderedColumns = [];
                columnOrder.map((key) => {
                    let col = this.findColumnByKey(key);
                    if (col) {
                        reorderedColumns.push(col);
                    }
                });
                this.columnOrderStateRestored = true;
                this.columns = reorderedColumns;
            }
        }
    }
    findColumnByKey(key) {
        if (this.columns) {
            for (let col of this.columns) {
                if (col.key === key || col.field === key)
                    return col;
                else
                    continue;
            }
        }
        else {
            return null;
        }
    }
    createStyleElement() {
        this.styleElement = this.renderer.createElement('style');
        this.styleElement.type = 'text/css';
        this.renderer.appendChild(this.document.head, this.styleElement);
    }
    getGroupRowsMeta() {
        return { field: this.groupRowsBy, order: this.groupRowsByOrder };
    }
    createResponsiveStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.responsiveStyleElement) {
                this.responsiveStyleElement = this.renderer.createElement('style');
                this.responsiveStyleElement.type = 'text/css';
                this.renderer.appendChild(this.document.head, this.responsiveStyleElement);
                let innerHTML = `
    @media screen and (max-width: ${this.breakpoint}) {
        #${this.id}-table > .p-datatable-thead > tr > th,
        #${this.id}-table > .p-datatable-tfoot > tr > td {
            display: none !important;
        }

        #${this.id}-table > .p-datatable-tbody > tr > td {
            display: flex;
            width: 100% !important;
            align-items: center;
            justify-content: space-between;
        }

        #${this.id}-table > .p-datatable-tbody > tr > td:not(:last-child) {
            border: 0 none;
        }

        #${this.id}.p-datatable-gridlines > .p-datatable-wrapper > .p-datatable-table > .p-datatable-tbody > tr > td:last-child {
            border-top: 0;
            border-right: 0;
            border-left: 0;
        }

        #${this.id}-table > .p-datatable-tbody > tr > td > .p-column-title {
            display: block;
        }
    }
    `;
                this.renderer.setProperty(this.responsiveStyleElement, 'innerHTML', innerHTML);
            }
        }
    }
    destroyResponsiveStyle() {
        if (this.responsiveStyleElement) {
            this.renderer.removeChild(this.document.head, this.responsiveStyleElement);
            this.responsiveStyleElement = null;
        }
    }
    destroyStyleElement() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
        }
    }
    ngOnDestroy() {
        this.unbindDocumentEditListener();
        this.editingCell = null;
        this.initialized = null;
        this.destroyStyleElement();
        this.destroyResponsiveStyle();
    }
    getPaginatorStyleClasses(className) {
        return [this.paginatorStyleClass, className]
            .filter((c) => !!c)
            .join(' ')
            .trim();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Table, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: TableService }, { token: i0.ChangeDetectorRef }, { token: i1.FilterService }, { token: i1.OverlayService }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: Table, selector: "p-table", inputs: { frozenColumns: "frozenColumns", frozenValue: "frozenValue", style: "style", styleClass: "styleClass", tableStyle: "tableStyle", tableStyleClass: "tableStyleClass", paginator: ["paginator", "paginator", booleanAttribute], pageLinks: ["pageLinks", "pageLinks", numberAttribute], rowsPerPageOptions: "rowsPerPageOptions", alwaysShowPaginator: ["alwaysShowPaginator", "alwaysShowPaginator", booleanAttribute], paginatorPosition: "paginatorPosition", paginatorStyleClass: "paginatorStyleClass", paginatorDropdownAppendTo: "paginatorDropdownAppendTo", paginatorDropdownScrollHeight: "paginatorDropdownScrollHeight", currentPageReportTemplate: "currentPageReportTemplate", showCurrentPageReport: ["showCurrentPageReport", "showCurrentPageReport", booleanAttribute], showJumpToPageDropdown: ["showJumpToPageDropdown", "showJumpToPageDropdown", booleanAttribute], showJumpToPageInput: ["showJumpToPageInput", "showJumpToPageInput", booleanAttribute], showFirstLastIcon: ["showFirstLastIcon", "showFirstLastIcon", booleanAttribute], showPageLinks: ["showPageLinks", "showPageLinks", booleanAttribute], defaultSortOrder: ["defaultSortOrder", "defaultSortOrder", numberAttribute], sortMode: "sortMode", resetPageOnSort: ["resetPageOnSort", "resetPageOnSort", booleanAttribute], selectionMode: "selectionMode", selectionPageOnly: ["selectionPageOnly", "selectionPageOnly", booleanAttribute], contextMenuSelection: "contextMenuSelection", contextMenuSelectionMode: "contextMenuSelectionMode", dataKey: "dataKey", metaKeySelection: ["metaKeySelection", "metaKeySelection", booleanAttribute], rowSelectable: "rowSelectable", rowTrackBy: "rowTrackBy", lazy: ["lazy", "lazy", booleanAttribute], lazyLoadOnInit: ["lazyLoadOnInit", "lazyLoadOnInit", booleanAttribute], compareSelectionBy: "compareSelectionBy", csvSeparator: "csvSeparator", exportFilename: "exportFilename", filters: "filters", globalFilterFields: "globalFilterFields", filterDelay: ["filterDelay", "filterDelay", numberAttribute], filterLocale: "filterLocale", expandedRowKeys: "expandedRowKeys", editingRowKeys: "editingRowKeys", rowExpandMode: "rowExpandMode", scrollable: ["scrollable", "scrollable", booleanAttribute], scrollDirection: "scrollDirection", rowGroupMode: "rowGroupMode", scrollHeight: "scrollHeight", virtualScroll: ["virtualScroll", "virtualScroll", booleanAttribute], virtualScrollItemSize: ["virtualScrollItemSize", "virtualScrollItemSize", numberAttribute], virtualScrollOptions: "virtualScrollOptions", virtualScrollDelay: ["virtualScrollDelay", "virtualScrollDelay", numberAttribute], frozenWidth: "frozenWidth", responsive: "responsive", contextMenu: "contextMenu", resizableColumns: ["resizableColumns", "resizableColumns", booleanAttribute], columnResizeMode: "columnResizeMode", reorderableColumns: ["reorderableColumns", "reorderableColumns", booleanAttribute], loading: ["loading", "loading", booleanAttribute], loadingIcon: "loadingIcon", showLoader: ["showLoader", "showLoader", booleanAttribute], rowHover: ["rowHover", "rowHover", booleanAttribute], customSort: ["customSort", "customSort", booleanAttribute], showInitialSortBadge: ["showInitialSortBadge", "showInitialSortBadge", booleanAttribute], autoLayout: ["autoLayout", "autoLayout", booleanAttribute], exportFunction: "exportFunction", exportHeader: "exportHeader", stateKey: "stateKey", stateStorage: "stateStorage", editMode: "editMode", groupRowsBy: "groupRowsBy", groupRowsByOrder: ["groupRowsByOrder", "groupRowsByOrder", numberAttribute], responsiveLayout: "responsiveLayout", breakpoint: "breakpoint", paginatorLocale: "paginatorLocale", value: "value", columns: "columns", first: "first", rows: "rows", totalRecords: "totalRecords", sortField: "sortField", sortOrder: "sortOrder", multiSortMeta: "multiSortMeta", selection: "selection", selectAll: "selectAll", virtualRowHeight: "virtualRowHeight" }, outputs: { contextMenuSelectionChange: "contextMenuSelectionChange", selectAllChange: "selectAllChange", selectionChange: "selectionChange", onRowSelect: "onRowSelect", onRowUnselect: "onRowUnselect", onPage: "onPage", onSort: "onSort", onFilter: "onFilter", onLazyLoad: "onLazyLoad", onRowExpand: "onRowExpand", onRowCollapse: "onRowCollapse", onContextMenuSelect: "onContextMenuSelect", onColResize: "onColResize", onColReorder: "onColReorder", onRowReorder: "onRowReorder", onEditInit: "onEditInit", onEditComplete: "onEditComplete", onEditCancel: "onEditCancel", onHeaderCheckboxToggle: "onHeaderCheckboxToggle", sortFunction: "sortFunction", firstChange: "firstChange", rowsChange: "rowsChange", onStateSave: "onStateSave", onStateRestore: "onStateRestore" }, host: { classAttribute: "p-element" }, providers: [TableService], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "resizeHelperViewChild", first: true, predicate: ["resizeHelper"], descendants: true }, { propertyName: "reorderIndicatorUpViewChild", first: true, predicate: ["reorderIndicatorUp"], descendants: true }, { propertyName: "reorderIndicatorDownViewChild", first: true, predicate: ["reorderIndicatorDown"], descendants: true }, { propertyName: "wrapperViewChild", first: true, predicate: ["wrapper"], descendants: true }, { propertyName: "tableViewChild", first: true, predicate: ["table"], descendants: true }, { propertyName: "tableHeaderViewChild", first: true, predicate: ["thead"], descendants: true }, { propertyName: "tableFooterViewChild", first: true, predicate: ["tfoot"], descendants: true }, { propertyName: "scroller", first: true, predicate: ["scroller"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <div
            #container
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{ 'p-datatable p-component': true, 'p-datatable-hoverable-rows': rowHover || selectionMode, 'p-datatable-scrollable': scrollable, 'p-datatable-flex-scrollable': scrollable && scrollHeight === 'flex' }"
            [attr.id]="id"
        >
            <div class="p-datatable-loading-overlay p-component-overlay" *ngIf="loading && showLoader">
                <i *ngIf="loadingIcon" [class]="'p-datatable-loading-icon ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-datatable-loading-icon'" />
                    <span *ngIf="loadingIconTemplate" class="p-datatable-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <div *ngIf="captionTemplate" class="p-datatable-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition == 'both')"
                [templateLeft]="paginatorLeftTemplate"
                [templateRight]="paginatorRightTemplate"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showJumpToPageInput]="showJumpToPageInput"
                [showPageLinks]="showPageLinks"
                [styleClass]="getPaginatorStyleClasses('p-paginator-top')"
                [locale]="paginatorLocale"
            >
                <ng-template pTemplate="dropdownicon" *ngIf="paginatorDropdownIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorDropdownIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="firstpagelinkicon" *ngIf="paginatorFirstPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="previouspagelinkicon" *ngIf="paginatorPreviousPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="lastpagelinkicon" *ngIf="paginatorLastPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="nextpagelinkicon" *ngIf="paginatorNextPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate"></ng-container>
                </ng-template>
            </p-paginator>

            <div #wrapper class="p-datatable-wrapper" [ngStyle]="{ maxHeight: virtualScroll ? '' : scrollHeight }">
                <p-scroller
                    #scroller
                    *ngIf="virtualScroll"
                    [items]="processedData"
                    [columns]="columns"
                    [style]="{ height: scrollHeight !== 'flex' ? scrollHeight : undefined }"
                    [scrollHeight]="scrollHeight !== 'flex' ? undefined : '100%'"
                    [itemSize]="virtualScrollItemSize || _virtualRowHeight"
                    [step]="rows"
                    [delay]="lazy ? virtualScrollDelay : 0"
                    [inline]="true"
                    [lazy]="lazy"
                    (onLazyLoad)="onLazyItemLoad($event)"
                    [loaderDisabled]="true"
                    [showSpacer]="false"
                    [showLoader]="loadingBodyTemplate"
                    [options]="virtualScrollOptions"
                    [autoSize]="true"
                >
                    <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                        <ng-container *ngTemplateOutlet="buildInTable; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                    </ng-template>
                </p-scroller>
                <ng-container *ngIf="!virtualScroll">
                    <ng-container *ngTemplateOutlet="buildInTable; context: { $implicit: processedData, options: { columns } }"></ng-container>
                </ng-container>

                <ng-template #buildInTable let-items let-scrollerOptions="options">
                    <table
                        #table
                        role="table"
                        [ngClass]="{ 'p-datatable-table': true, 'p-datatable-scrollable-table': scrollable, 'p-datatable-resizable-table': resizableColumns, 'p-datatable-resizable-table-fit': resizableColumns && columnResizeMode === 'fit' }"
                        [class]="tableStyleClass"
                        [style]="tableStyle"
                        [attr.id]="id + '-table'"
                    >
                        <ng-container *ngTemplateOutlet="colGroupTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        <thead role="rowgroup" #thead class="p-datatable-thead">
                            <ng-container *ngTemplateOutlet="headerGroupedTemplate || headerTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        </thead>
                        <tbody
                            role="rowgroup"
                            class="p-datatable-tbody p-datatable-frozen-tbody"
                            *ngIf="frozenValue || frozenBodyTemplate"
                            [value]="frozenValue"
                            [frozenRows]="true"
                            [pTableBody]="scrollerOptions.columns"
                            [pTableBodyTemplate]="frozenBodyTemplate"
                            [frozen]="true"
                        ></tbody>
                        <tbody
                            role="rowgroup"
                            class="p-datatable-tbody"
                            [ngClass]="scrollerOptions.contentStyleClass"
                            [style]="scrollerOptions.contentStyle"
                            [value]="dataToRender(scrollerOptions.rows)"
                            [pTableBody]="scrollerOptions.columns"
                            [pTableBodyTemplate]="bodyTemplate"
                            [scrollerOptions]="scrollerOptions"
                        ></tbody>
                        <tbody
                            role="rowgroup"
                            *ngIf="scrollerOptions.spacerStyle"
                            [style]="'height: calc(' + scrollerOptions.spacerStyle.height + ' - ' + scrollerOptions.rows.length * scrollerOptions.itemSize + 'px);'"
                            class="p-datatable-scroller-spacer"
                        ></tbody>
                        <tfoot role="rowgroup" *ngIf="footerGroupedTemplate || footerTemplate" #tfoot class="p-datatable-tfoot">
                            <ng-container *ngTemplateOutlet="footerGroupedTemplate || footerTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        </tfoot>
                    </table>
                </ng-template>
            </div>

            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition == 'both')"
                [templateLeft]="paginatorLeftTemplate"
                [templateRight]="paginatorRightTemplate"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showJumpToPageInput]="showJumpToPageInput"
                [showPageLinks]="showPageLinks"
                [styleClass]="getPaginatorStyleClasses('p-paginator-bottom')"
                [locale]="paginatorLocale"
            >
                <ng-template pTemplate="dropdownicon" *ngIf="paginatorDropdownIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorDropdownIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="firstpagelinkicon" *ngIf="paginatorFirstPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="previouspagelinkicon" *ngIf="paginatorPreviousPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="lastpagelinkicon" *ngIf="paginatorLastPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="nextpagelinkicon" *ngIf="paginatorNextPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate"></ng-container>
                </ng-template>
            </p-paginator>

            <div *ngIf="summaryTemplate" class="p-datatable-footer">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>

            <div #resizeHelper class="p-column-resizer-helper" style="display:none" *ngIf="resizableColumns"></div>
            <span #reorderIndicatorUp class="p-datatable-reorder-indicator-up" style="display: none;" *ngIf="reorderableColumns">
                <ArrowDownIcon *ngIf="!reorderIndicatorUpIconTemplate" />
                <ng-template *ngTemplateOutlet="reorderIndicatorUpIconTemplate"></ng-template>
            </span>
            <span #reorderIndicatorDown class="p-datatable-reorder-indicator-down" style="display: none;" *ngIf="reorderableColumns">
                <ArrowUpIcon *ngIf="!reorderIndicatorDownIconTemplate" />
                <ng-template *ngTemplateOutlet="reorderIndicatorDownIconTemplate"></ng-template>
            </span>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-datatable{position:relative}.p-datatable>.p-datatable-wrapper{overflow:auto}.p-datatable-table{border-spacing:0px;width:100%}.p-datatable .p-sortable-column{cursor:pointer;user-select:none}.p-datatable .p-sortable-column .p-column-title,.p-datatable .p-sortable-column .p-sortable-column-icon,.p-datatable .p-sortable-column .p-sortable-column-badge{vertical-align:middle}.p-datatable .p-sortable-column .p-icon-wrapper{display:inline}.p-datatable .p-sortable-column .p-sortable-column-badge{display:inline-flex;align-items:center;justify-content:center}.p-datatable-hoverable-rows .p-selectable-row{cursor:pointer}.p-datatable-scrollable>.p-datatable-wrapper{position:relative}.p-datatable-scrollable-table>.p-datatable-thead{position:sticky;top:0;z-index:2}.p-datatable-scrollable-table>.p-datatable-frozen-tbody{position:sticky;z-index:1}.p-datatable-scrollable-table>.p-datatable-tfoot{position:sticky;bottom:0;z-index:1}.p-datatable-scrollable .p-frozen-column{position:sticky;background:inherit;z-index:1}.p-datatable-scrollable th.p-frozen-column{z-index:1}.p-datatable-flex-scrollable{display:flex;flex-direction:column;height:100%}.p-datatable-flex-scrollable>.p-datatable-wrapper{display:flex;flex-direction:column;flex:1;height:100%}.p-datatable-scrollable-table>.p-datatable-tbody>.p-rowgroup-header{position:sticky;z-index:2}.p-datatable-resizable-table>.p-datatable-thead>tr>th,.p-datatable-resizable-table>.p-datatable-tfoot>tr>td,.p-datatable-resizable-table>.p-datatable-tbody>tr>td{overflow:hidden;white-space:nowrap}.p-datatable-resizable-table>.p-datatable-thead>tr>th.p-resizable-column:not(.p-frozen-column){background-clip:padding-box;position:relative}.p-datatable-resizable-table-fit>.p-datatable-thead>tr>th.p-resizable-column:last-child .p-column-resizer{display:none}.p-datatable .p-column-resizer{display:block;position:absolute!important;top:0;right:0;margin:0;width:.5rem;height:100%;padding:0;cursor:col-resize;border:1px solid transparent}.p-datatable .p-column-resizer-helper{width:1px;position:absolute;z-index:10;display:none}.p-datatable .p-row-editor-init,.p-datatable .p-row-editor-save,.p-datatable .p-row-editor-cancel,.p-datatable .p-row-toggler{display:inline-flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-datatable-reorder-indicator-up,.p-datatable-reorder-indicator-down{position:absolute}.p-datatable-reorderablerow-handle,[pReorderableColumn]{cursor:move}.p-datatable .p-datatable-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;z-index:3}.p-column-filter-row{display:flex;align-items:center;width:100%}.p-column-filter-menu{display:inline-flex}.p-column-filter-row p-columnfilterformelement{flex:1 1 auto;width:1%}.p-column-filter-menu-button,.p-column-filter-clear-button{display:inline-flex;justify-content:center;align-items:center;cursor:pointer;text-decoration:none;overflow:hidden;position:relative}.p-column-filter-overlay{position:absolute;top:0;left:0}.p-column-filter-row-items{margin:0;padding:0;list-style:none}.p-column-filter-row-item{cursor:pointer}.p-column-filter-add-button,.p-column-filter-remove-button{justify-content:center}.p-column-filter-add-button .p-button-label,.p-column-filter-remove-button .p-button-label{flex-grow:0}.p-column-filter-buttonbar{display:flex;align-items:center;justify-content:space-between}.p-column-filter-buttonbar .p-button{width:auto}.p-datatable-tbody>tr>td>.p-column-title{display:none}.p-datatable-scroller-spacer{display:flex}.p-datatable .p-scroller .p-scroller-loading{transform:none!important;min-height:0;position:sticky;top:0;left:0}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => i3.Paginator), selector: "p-paginator", inputs: ["pageLinkSize", "style", "styleClass", "alwaysShow", "dropdownAppendTo", "templateLeft", "templateRight", "appendTo", "dropdownScrollHeight", "currentPageReportTemplate", "showCurrentPageReport", "showFirstLastIcon", "totalRecords", "rows", "rowsPerPageOptions", "showJumpToPageDropdown", "showJumpToPageInput", "jumpToPageItemTemplate", "showPageLinks", "locale", "dropdownItemTemplate", "first"], outputs: ["onPageChange"] }, { kind: "directive", type: i0.forwardRef(() => i1.PrimeTemplate), selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "component", type: i0.forwardRef(() => i4.Scroller), selector: "p-scroller", inputs: ["id", "style", "styleClass", "tabindex", "items", "itemSize", "scrollHeight", "scrollWidth", "orientation", "step", "delay", "resizeDelay", "appendOnly", "inline", "lazy", "disabled", "loaderDisabled", "columns", "showSpacer", "showLoader", "numToleratedItems", "loading", "autoSize", "trackBy", "options"], outputs: ["onLazyLoad", "onScroll", "onScrollIndexChange"] }, { kind: "component", type: i0.forwardRef(() => ArrowDownIcon), selector: "ArrowDownIcon" }, { kind: "component", type: i0.forwardRef(() => ArrowUpIcon), selector: "ArrowUpIcon" }, { kind: "component", type: i0.forwardRef(() => SpinnerIcon), selector: "SpinnerIcon" }, { kind: "component", type: i0.forwardRef(() => TableBody), selector: "[pTableBody]", inputs: ["pTableBody", "pTableBodyTemplate", "value", "frozen", "frozenRows", "scrollerOptions"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Table, decorators: [{
            type: Component,
            args: [{ selector: 'p-table', template: `
        <div
            #container
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{ 'p-datatable p-component': true, 'p-datatable-hoverable-rows': rowHover || selectionMode, 'p-datatable-scrollable': scrollable, 'p-datatable-flex-scrollable': scrollable && scrollHeight === 'flex' }"
            [attr.id]="id"
        >
            <div class="p-datatable-loading-overlay p-component-overlay" *ngIf="loading && showLoader">
                <i *ngIf="loadingIcon" [class]="'p-datatable-loading-icon ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-datatable-loading-icon'" />
                    <span *ngIf="loadingIconTemplate" class="p-datatable-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <div *ngIf="captionTemplate" class="p-datatable-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition == 'both')"
                [templateLeft]="paginatorLeftTemplate"
                [templateRight]="paginatorRightTemplate"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showJumpToPageInput]="showJumpToPageInput"
                [showPageLinks]="showPageLinks"
                [styleClass]="getPaginatorStyleClasses('p-paginator-top')"
                [locale]="paginatorLocale"
            >
                <ng-template pTemplate="dropdownicon" *ngIf="paginatorDropdownIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorDropdownIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="firstpagelinkicon" *ngIf="paginatorFirstPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="previouspagelinkicon" *ngIf="paginatorPreviousPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="lastpagelinkicon" *ngIf="paginatorLastPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="nextpagelinkicon" *ngIf="paginatorNextPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate"></ng-container>
                </ng-template>
            </p-paginator>

            <div #wrapper class="p-datatable-wrapper" [ngStyle]="{ maxHeight: virtualScroll ? '' : scrollHeight }">
                <p-scroller
                    #scroller
                    *ngIf="virtualScroll"
                    [items]="processedData"
                    [columns]="columns"
                    [style]="{ height: scrollHeight !== 'flex' ? scrollHeight : undefined }"
                    [scrollHeight]="scrollHeight !== 'flex' ? undefined : '100%'"
                    [itemSize]="virtualScrollItemSize || _virtualRowHeight"
                    [step]="rows"
                    [delay]="lazy ? virtualScrollDelay : 0"
                    [inline]="true"
                    [lazy]="lazy"
                    (onLazyLoad)="onLazyItemLoad($event)"
                    [loaderDisabled]="true"
                    [showSpacer]="false"
                    [showLoader]="loadingBodyTemplate"
                    [options]="virtualScrollOptions"
                    [autoSize]="true"
                >
                    <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                        <ng-container *ngTemplateOutlet="buildInTable; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                    </ng-template>
                </p-scroller>
                <ng-container *ngIf="!virtualScroll">
                    <ng-container *ngTemplateOutlet="buildInTable; context: { $implicit: processedData, options: { columns } }"></ng-container>
                </ng-container>

                <ng-template #buildInTable let-items let-scrollerOptions="options">
                    <table
                        #table
                        role="table"
                        [ngClass]="{ 'p-datatable-table': true, 'p-datatable-scrollable-table': scrollable, 'p-datatable-resizable-table': resizableColumns, 'p-datatable-resizable-table-fit': resizableColumns && columnResizeMode === 'fit' }"
                        [class]="tableStyleClass"
                        [style]="tableStyle"
                        [attr.id]="id + '-table'"
                    >
                        <ng-container *ngTemplateOutlet="colGroupTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        <thead role="rowgroup" #thead class="p-datatable-thead">
                            <ng-container *ngTemplateOutlet="headerGroupedTemplate || headerTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        </thead>
                        <tbody
                            role="rowgroup"
                            class="p-datatable-tbody p-datatable-frozen-tbody"
                            *ngIf="frozenValue || frozenBodyTemplate"
                            [value]="frozenValue"
                            [frozenRows]="true"
                            [pTableBody]="scrollerOptions.columns"
                            [pTableBodyTemplate]="frozenBodyTemplate"
                            [frozen]="true"
                        ></tbody>
                        <tbody
                            role="rowgroup"
                            class="p-datatable-tbody"
                            [ngClass]="scrollerOptions.contentStyleClass"
                            [style]="scrollerOptions.contentStyle"
                            [value]="dataToRender(scrollerOptions.rows)"
                            [pTableBody]="scrollerOptions.columns"
                            [pTableBodyTemplate]="bodyTemplate"
                            [scrollerOptions]="scrollerOptions"
                        ></tbody>
                        <tbody
                            role="rowgroup"
                            *ngIf="scrollerOptions.spacerStyle"
                            [style]="'height: calc(' + scrollerOptions.spacerStyle.height + ' - ' + scrollerOptions.rows.length * scrollerOptions.itemSize + 'px);'"
                            class="p-datatable-scroller-spacer"
                        ></tbody>
                        <tfoot role="rowgroup" *ngIf="footerGroupedTemplate || footerTemplate" #tfoot class="p-datatable-tfoot">
                            <ng-container *ngTemplateOutlet="footerGroupedTemplate || footerTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        </tfoot>
                    </table>
                </ng-template>
            </div>

            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition == 'both')"
                [templateLeft]="paginatorLeftTemplate"
                [templateRight]="paginatorRightTemplate"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showJumpToPageInput]="showJumpToPageInput"
                [showPageLinks]="showPageLinks"
                [styleClass]="getPaginatorStyleClasses('p-paginator-bottom')"
                [locale]="paginatorLocale"
            >
                <ng-template pTemplate="dropdownicon" *ngIf="paginatorDropdownIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorDropdownIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="firstpagelinkicon" *ngIf="paginatorFirstPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="previouspagelinkicon" *ngIf="paginatorPreviousPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="lastpagelinkicon" *ngIf="paginatorLastPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="nextpagelinkicon" *ngIf="paginatorNextPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate"></ng-container>
                </ng-template>
            </p-paginator>

            <div *ngIf="summaryTemplate" class="p-datatable-footer">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>

            <div #resizeHelper class="p-column-resizer-helper" style="display:none" *ngIf="resizableColumns"></div>
            <span #reorderIndicatorUp class="p-datatable-reorder-indicator-up" style="display: none;" *ngIf="reorderableColumns">
                <ArrowDownIcon *ngIf="!reorderIndicatorUpIconTemplate" />
                <ng-template *ngTemplateOutlet="reorderIndicatorUpIconTemplate"></ng-template>
            </span>
            <span #reorderIndicatorDown class="p-datatable-reorder-indicator-down" style="display: none;" *ngIf="reorderableColumns">
                <ArrowUpIcon *ngIf="!reorderIndicatorDownIconTemplate" />
                <ng-template *ngTemplateOutlet="reorderIndicatorDownIconTemplate"></ng-template>
            </span>
        </div>
    `, providers: [TableService], changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-datatable{position:relative}.p-datatable>.p-datatable-wrapper{overflow:auto}.p-datatable-table{border-spacing:0px;width:100%}.p-datatable .p-sortable-column{cursor:pointer;user-select:none}.p-datatable .p-sortable-column .p-column-title,.p-datatable .p-sortable-column .p-sortable-column-icon,.p-datatable .p-sortable-column .p-sortable-column-badge{vertical-align:middle}.p-datatable .p-sortable-column .p-icon-wrapper{display:inline}.p-datatable .p-sortable-column .p-sortable-column-badge{display:inline-flex;align-items:center;justify-content:center}.p-datatable-hoverable-rows .p-selectable-row{cursor:pointer}.p-datatable-scrollable>.p-datatable-wrapper{position:relative}.p-datatable-scrollable-table>.p-datatable-thead{position:sticky;top:0;z-index:2}.p-datatable-scrollable-table>.p-datatable-frozen-tbody{position:sticky;z-index:1}.p-datatable-scrollable-table>.p-datatable-tfoot{position:sticky;bottom:0;z-index:1}.p-datatable-scrollable .p-frozen-column{position:sticky;background:inherit;z-index:1}.p-datatable-scrollable th.p-frozen-column{z-index:1}.p-datatable-flex-scrollable{display:flex;flex-direction:column;height:100%}.p-datatable-flex-scrollable>.p-datatable-wrapper{display:flex;flex-direction:column;flex:1;height:100%}.p-datatable-scrollable-table>.p-datatable-tbody>.p-rowgroup-header{position:sticky;z-index:2}.p-datatable-resizable-table>.p-datatable-thead>tr>th,.p-datatable-resizable-table>.p-datatable-tfoot>tr>td,.p-datatable-resizable-table>.p-datatable-tbody>tr>td{overflow:hidden;white-space:nowrap}.p-datatable-resizable-table>.p-datatable-thead>tr>th.p-resizable-column:not(.p-frozen-column){background-clip:padding-box;position:relative}.p-datatable-resizable-table-fit>.p-datatable-thead>tr>th.p-resizable-column:last-child .p-column-resizer{display:none}.p-datatable .p-column-resizer{display:block;position:absolute!important;top:0;right:0;margin:0;width:.5rem;height:100%;padding:0;cursor:col-resize;border:1px solid transparent}.p-datatable .p-column-resizer-helper{width:1px;position:absolute;z-index:10;display:none}.p-datatable .p-row-editor-init,.p-datatable .p-row-editor-save,.p-datatable .p-row-editor-cancel,.p-datatable .p-row-toggler{display:inline-flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-datatable-reorder-indicator-up,.p-datatable-reorder-indicator-down{position:absolute}.p-datatable-reorderablerow-handle,[pReorderableColumn]{cursor:move}.p-datatable .p-datatable-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;z-index:3}.p-column-filter-row{display:flex;align-items:center;width:100%}.p-column-filter-menu{display:inline-flex}.p-column-filter-row p-columnfilterformelement{flex:1 1 auto;width:1%}.p-column-filter-menu-button,.p-column-filter-clear-button{display:inline-flex;justify-content:center;align-items:center;cursor:pointer;text-decoration:none;overflow:hidden;position:relative}.p-column-filter-overlay{position:absolute;top:0;left:0}.p-column-filter-row-items{margin:0;padding:0;list-style:none}.p-column-filter-row-item{cursor:pointer}.p-column-filter-add-button,.p-column-filter-remove-button{justify-content:center}.p-column-filter-add-button .p-button-label,.p-column-filter-remove-button .p-button-label{flex-grow:0}.p-column-filter-buttonbar{display:flex;align-items:center;justify-content:space-between}.p-column-filter-buttonbar .p-button{width:auto}.p-datatable-tbody>tr>td>.p-column-title{display:none}.p-datatable-scroller-spacer{display:flex}.p-datatable .p-scroller .p-scroller-loading{transform:none!important;min-height:0;position:sticky;top:0;left:0}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: TableService }, { type: i0.ChangeDetectorRef }, { type: i1.FilterService }, { type: i1.OverlayService }, { type: i1.PrimeNGConfig }], propDecorators: { frozenColumns: [{
                type: Input
            }], frozenValue: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], tableStyle: [{
                type: Input
            }], tableStyleClass: [{
                type: Input
            }], paginator: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], pageLinks: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], rowsPerPageOptions: [{
                type: Input
            }], alwaysShowPaginator: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], paginatorPosition: [{
                type: Input
            }], paginatorStyleClass: [{
                type: Input
            }], paginatorDropdownAppendTo: [{
                type: Input
            }], paginatorDropdownScrollHeight: [{
                type: Input
            }], currentPageReportTemplate: [{
                type: Input
            }], showCurrentPageReport: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showJumpToPageDropdown: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showJumpToPageInput: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showFirstLastIcon: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showPageLinks: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], defaultSortOrder: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], sortMode: [{
                type: Input
            }], resetPageOnSort: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], selectionMode: [{
                type: Input
            }], selectionPageOnly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], contextMenuSelection: [{
                type: Input
            }], contextMenuSelectionChange: [{
                type: Output
            }], contextMenuSelectionMode: [{
                type: Input
            }], dataKey: [{
                type: Input
            }], metaKeySelection: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], rowSelectable: [{
                type: Input
            }], rowTrackBy: [{
                type: Input
            }], lazy: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], lazyLoadOnInit: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], compareSelectionBy: [{
                type: Input
            }], csvSeparator: [{
                type: Input
            }], exportFilename: [{
                type: Input
            }], filters: [{
                type: Input
            }], globalFilterFields: [{
                type: Input
            }], filterDelay: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], filterLocale: [{
                type: Input
            }], expandedRowKeys: [{
                type: Input
            }], editingRowKeys: [{
                type: Input
            }], rowExpandMode: [{
                type: Input
            }], scrollable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], scrollDirection: [{
                type: Input
            }], rowGroupMode: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], virtualScroll: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], virtualScrollItemSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], virtualScrollOptions: [{
                type: Input
            }], virtualScrollDelay: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], frozenWidth: [{
                type: Input
            }], responsive: [{
                type: Input
            }], contextMenu: [{
                type: Input
            }], resizableColumns: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], columnResizeMode: [{
                type: Input
            }], reorderableColumns: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], loading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], loadingIcon: [{
                type: Input
            }], showLoader: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], rowHover: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], customSort: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showInitialSortBadge: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autoLayout: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], exportFunction: [{
                type: Input
            }], exportHeader: [{
                type: Input
            }], stateKey: [{
                type: Input
            }], stateStorage: [{
                type: Input
            }], editMode: [{
                type: Input
            }], groupRowsBy: [{
                type: Input
            }], groupRowsByOrder: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], responsiveLayout: [{
                type: Input
            }], breakpoint: [{
                type: Input
            }], paginatorLocale: [{
                type: Input
            }], value: [{
                type: Input
            }], columns: [{
                type: Input
            }], first: [{
                type: Input
            }], rows: [{
                type: Input
            }], totalRecords: [{
                type: Input
            }], sortField: [{
                type: Input
            }], sortOrder: [{
                type: Input
            }], multiSortMeta: [{
                type: Input
            }], selection: [{
                type: Input
            }], selectAll: [{
                type: Input
            }], selectAllChange: [{
                type: Output
            }], selectionChange: [{
                type: Output
            }], onRowSelect: [{
                type: Output
            }], onRowUnselect: [{
                type: Output
            }], onPage: [{
                type: Output
            }], onSort: [{
                type: Output
            }], onFilter: [{
                type: Output
            }], onLazyLoad: [{
                type: Output
            }], onRowExpand: [{
                type: Output
            }], onRowCollapse: [{
                type: Output
            }], onContextMenuSelect: [{
                type: Output
            }], onColResize: [{
                type: Output
            }], onColReorder: [{
                type: Output
            }], onRowReorder: [{
                type: Output
            }], onEditInit: [{
                type: Output
            }], onEditComplete: [{
                type: Output
            }], onEditCancel: [{
                type: Output
            }], onHeaderCheckboxToggle: [{
                type: Output
            }], sortFunction: [{
                type: Output
            }], firstChange: [{
                type: Output
            }], rowsChange: [{
                type: Output
            }], onStateSave: [{
                type: Output
            }], onStateRestore: [{
                type: Output
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], resizeHelperViewChild: [{
                type: ViewChild,
                args: ['resizeHelper']
            }], reorderIndicatorUpViewChild: [{
                type: ViewChild,
                args: ['reorderIndicatorUp']
            }], reorderIndicatorDownViewChild: [{
                type: ViewChild,
                args: ['reorderIndicatorDown']
            }], wrapperViewChild: [{
                type: ViewChild,
                args: ['wrapper']
            }], tableViewChild: [{
                type: ViewChild,
                args: ['table']
            }], tableHeaderViewChild: [{
                type: ViewChild,
                args: ['thead']
            }], tableFooterViewChild: [{
                type: ViewChild,
                args: ['tfoot']
            }], scroller: [{
                type: ViewChild,
                args: ['scroller']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], virtualRowHeight: [{
                type: Input
            }] } });
export class TableBody {
    dt;
    tableService;
    cd;
    el;
    columns;
    template;
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        if (this.frozenRows) {
            this.updateFrozenRowStickyPosition();
        }
        if (this.dt.scrollable && this.dt.rowGroupMode === 'subheader') {
            this.updateFrozenRowGroupHeaderStickyPosition();
        }
    }
    frozen;
    frozenRows;
    scrollerOptions;
    subscription;
    _value;
    ngAfterViewInit() {
        if (this.frozenRows) {
            this.updateFrozenRowStickyPosition();
        }
        if (this.dt.scrollable && this.dt.rowGroupMode === 'subheader') {
            this.updateFrozenRowGroupHeaderStickyPosition();
        }
    }
    constructor(dt, tableService, cd, el) {
        this.dt = dt;
        this.tableService = tableService;
        this.cd = cd;
        this.el = el;
        this.subscription = this.dt.tableService.valueSource$.subscribe(() => {
            if (this.dt.virtualScroll) {
                this.cd.detectChanges();
            }
        });
    }
    shouldRenderRowGroupHeader(value, rowData, i) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let prevRowData = value[i - (1 + this.dt._first)];
        if (prevRowData) {
            let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.dt.groupRowsBy);
            return currentRowFieldData !== previousRowFieldData;
        }
        else {
            return true;
        }
    }
    shouldRenderRowGroupFooter(value, rowData, i) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let nextRowData = value[i + (1 + this.dt._first)];
        if (nextRowData) {
            let nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.dt.groupRowsBy);
            return currentRowFieldData !== nextRowFieldData;
        }
        else {
            return true;
        }
    }
    shouldRenderRowspan(value, rowData, i) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let prevRowData = value[i - 1];
        if (prevRowData) {
            let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.dt.groupRowsBy);
            return currentRowFieldData !== previousRowFieldData;
        }
        else {
            return true;
        }
    }
    calculateRowGroupSize(value, rowData, index) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let nextRowFieldData = currentRowFieldData;
        let groupRowSpan = 0;
        while (currentRowFieldData === nextRowFieldData) {
            groupRowSpan++;
            let nextRowData = value[++index];
            if (nextRowData) {
                nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.dt.groupRowsBy);
            }
            else {
                break;
            }
        }
        return groupRowSpan === 1 ? null : groupRowSpan;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    updateFrozenRowStickyPosition() {
        this.el.nativeElement.style.top = DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling) + 'px';
    }
    updateFrozenRowGroupHeaderStickyPosition() {
        if (this.el.nativeElement.previousElementSibling) {
            let tableHeaderHeight = DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling);
            this.dt.rowGroupHeaderStyleObject.top = tableHeaderHeight + 'px';
        }
    }
    getScrollerOption(option, options) {
        if (this.dt.virtualScroll) {
            options = options || this.scrollerOptions;
            return options ? options[option] : null;
        }
        return null;
    }
    getRowIndex(rowIndex) {
        const index = this.dt.paginator ? this.dt.first + rowIndex : rowIndex;
        const getItemOptions = this.getScrollerOption('getItemOptions');
        return getItemOptions ? getItemOptions(index).index : index;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TableBody, deps: [{ token: Table }, { token: TableService }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: TableBody, selector: "[pTableBody]", inputs: { columns: ["pTableBody", "columns"], template: ["pTableBodyTemplate", "template"], value: "value", frozen: ["frozen", "frozen", booleanAttribute], frozenRows: ["frozenRows", "frozenRows", booleanAttribute], scrollerOptions: "scrollerOptions" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <ng-container *ngIf="!dt.expandedRowTemplate">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="dt.groupHeaderTemplate && !dt.virtualScroll && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, rowIndex)" role="row">
                    <ng-container
                        *ngTemplateOutlet="dt.groupHeaderTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode !== 'rowspan'">
                    <ng-container
                        *ngTemplateOutlet="rowData ? template : dt.loadingBodyTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode === 'rowspan'">
                    <ng-container
                        *ngTemplateOutlet="
                            rowData ? template : dt.loadingBodyTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns,
                                editing: dt.editMode === 'row' && dt.isRowEditing(rowData),
                                frozen: frozen,
                                rowgroup: shouldRenderRowspan(value, rowData, rowIndex),
                                rowspan: calculateRowGroupSize(value, rowData, rowIndex)
                            }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupFooterTemplate && !dt.virtualScroll && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, rowIndex)" role="row">
                    <ng-container
                        *ngTemplateOutlet="dt.groupFooterTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.expandedRowTemplate && !(frozen && dt.frozenExpandedRowTemplate)">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="!dt.groupHeaderTemplate">
                    <ng-container
                        *ngTemplateOutlet="template; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupHeaderTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, getRowIndex(rowIndex))" role="row">
                    <ng-container
                        *ngTemplateOutlet="
                            dt.groupHeaderTemplate;
                            context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.expandedRowTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, frozen: frozen }"></ng-container>
                    <ng-container *ngIf="dt.groupFooterTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, getRowIndex(rowIndex))" role="row">
                        <ng-container
                            *ngTemplateOutlet="
                                dt.groupFooterTemplate;
                                context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }
                            "
                        ></ng-container>
                    </ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.frozenExpandedRowTemplate && frozen">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container
                    *ngTemplateOutlet="template; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                ></ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.frozenExpandedRowTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, frozen: frozen }"></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.loading">
            <ng-container *ngTemplateOutlet="dt.loadingBodyTemplate; context: { $implicit: columns, frozen: frozen }"></ng-container>
        </ng-container>
        <ng-container *ngIf="dt.isEmpty() && !dt.loading">
            <ng-container *ngTemplateOutlet="dt.emptyMessageTemplate; context: { $implicit: columns, frozen: frozen }"></ng-container>
        </ng-container>
    `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TableBody, decorators: [{
            type: Component,
            args: [{
                    selector: '[pTableBody]',
                    template: `
        <ng-container *ngIf="!dt.expandedRowTemplate">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="dt.groupHeaderTemplate && !dt.virtualScroll && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, rowIndex)" role="row">
                    <ng-container
                        *ngTemplateOutlet="dt.groupHeaderTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode !== 'rowspan'">
                    <ng-container
                        *ngTemplateOutlet="rowData ? template : dt.loadingBodyTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode === 'rowspan'">
                    <ng-container
                        *ngTemplateOutlet="
                            rowData ? template : dt.loadingBodyTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns,
                                editing: dt.editMode === 'row' && dt.isRowEditing(rowData),
                                frozen: frozen,
                                rowgroup: shouldRenderRowspan(value, rowData, rowIndex),
                                rowspan: calculateRowGroupSize(value, rowData, rowIndex)
                            }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupFooterTemplate && !dt.virtualScroll && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, rowIndex)" role="row">
                    <ng-container
                        *ngTemplateOutlet="dt.groupFooterTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.expandedRowTemplate && !(frozen && dt.frozenExpandedRowTemplate)">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="!dt.groupHeaderTemplate">
                    <ng-container
                        *ngTemplateOutlet="template; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupHeaderTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, getRowIndex(rowIndex))" role="row">
                    <ng-container
                        *ngTemplateOutlet="
                            dt.groupHeaderTemplate;
                            context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.expandedRowTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, frozen: frozen }"></ng-container>
                    <ng-container *ngIf="dt.groupFooterTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, getRowIndex(rowIndex))" role="row">
                        <ng-container
                            *ngTemplateOutlet="
                                dt.groupFooterTemplate;
                                context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }
                            "
                        ></ng-container>
                    </ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.frozenExpandedRowTemplate && frozen">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container
                    *ngTemplateOutlet="template; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                ></ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.frozenExpandedRowTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, frozen: frozen }"></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.loading">
            <ng-container *ngTemplateOutlet="dt.loadingBodyTemplate; context: { $implicit: columns, frozen: frozen }"></ng-container>
        </ng-container>
        <ng-container *ngIf="dt.isEmpty() && !dt.loading">
            <ng-container *ngTemplateOutlet="dt.emptyMessageTemplate; context: { $implicit: columns, frozen: frozen }"></ng-container>
        </ng-container>
    `,
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: TableService }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], propDecorators: { columns: [{
                type: Input,
                args: ['pTableBody']
            }], template: [{
                type: Input,
                args: ['pTableBodyTemplate']
            }], value: [{
                type: Input
            }], frozen: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], frozenRows: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], scrollerOptions: [{
                type: Input
            }] } });
export class RowGroupHeader {
    dt;
    constructor(dt) {
        this.dt = dt;
    }
    get getFrozenRowGroupHeaderStickyPosition() {
        return this.dt.rowGroupHeaderStyleObject ? this.dt.rowGroupHeaderStyleObject.top : '';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: RowGroupHeader, deps: [{ token: Table }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.1", type: RowGroupHeader, selector: "[pRowGroupHeader]", host: { properties: { "style.top": "getFrozenRowGroupHeaderStickyPosition" }, classAttribute: "p-rowgroup-header p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: RowGroupHeader, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pRowGroupHeader]',
                    host: {
                        class: 'p-rowgroup-header p-element',
                        '[style.top]': 'getFrozenRowGroupHeaderStickyPosition'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }] });
export class FrozenColumn {
    el;
    zone;
    get frozen() {
        return this._frozen;
    }
    set frozen(val) {
        this._frozen = val;
        Promise.resolve(null).then(() => this.updateStickyPosition());
    }
    alignFrozen = 'left';
    constructor(el, zone) {
        this.el = el;
        this.zone = zone;
    }
    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                this.updateStickyPosition();
            }, 1000);
        });
    }
    _frozen = true;
    updateStickyPosition() {
        if (this._frozen) {
            if (this.alignFrozen === 'right') {
                let right = 0;
                let next = this.el.nativeElement.nextElementSibling;
                if (next) {
                    right = DomHandler.getOuterWidth(next) + (parseFloat(next.style.right) || 0);
                }
                this.el.nativeElement.style.right = right + 'px';
            }
            else {
                let left = 0;
                let prev = this.el.nativeElement.previousElementSibling;
                if (prev) {
                    left = DomHandler.getOuterWidth(prev) + (parseFloat(prev.style.left) || 0);
                }
                this.el.nativeElement.style.left = left + 'px';
            }
            const filterRow = this.el.nativeElement?.parentElement?.nextElementSibling;
            if (filterRow) {
                let index = DomHandler.index(this.el.nativeElement);
                if (filterRow.children && filterRow.children[index]) {
                    filterRow.children[index].style.left = this.el.nativeElement.style.left;
                    filterRow.children[index].style.right = this.el.nativeElement.style.right;
                }
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FrozenColumn, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.1", type: FrozenColumn, selector: "[pFrozenColumn]", inputs: { frozen: "frozen", alignFrozen: "alignFrozen" }, host: { properties: { "class.p-frozen-column": "frozen" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FrozenColumn, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pFrozenColumn]',
                    host: {
                        class: 'p-element',
                        '[class.p-frozen-column]': 'frozen'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.NgZone }], propDecorators: { frozen: [{
                type: Input
            }], alignFrozen: [{
                type: Input
            }] } });
export class SortableColumn {
    dt;
    field;
    pSortableColumnDisabled;
    sorted;
    sortOrder;
    subscription;
    constructor(dt) {
        this.dt = dt;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.sortSource$.subscribe((sortMeta) => {
                this.updateSortState();
            });
        }
    }
    ngOnInit() {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    }
    updateSortState() {
        this.sorted = this.dt.isSorted(this.field);
        this.sortOrder = this.sorted ? (this.dt.sortOrder === 1 ? 'ascending' : 'descending') : 'none';
    }
    onClick(event) {
        if (this.isEnabled() && !this.isFilterElement(event.target)) {
            this.updateSortState();
            this.dt.sort({
                originalEvent: event,
                field: this.field
            });
            DomHandler.clearSelection();
        }
    }
    onEnterKey(event) {
        this.onClick(event);
        event.preventDefault();
    }
    isEnabled() {
        return this.pSortableColumnDisabled !== true;
    }
    isFilterElement(element) {
        return this.isFilterElementIconOrButton(element) || this.isFilterElementIconOrButton(element?.parentElement?.parentElement);
    }
    isFilterElementIconOrButton(element) {
        return DomHandler.hasClass(element, 'pi-filter-icon') || DomHandler.hasClass(element, 'p-column-filter-menu-button');
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SortableColumn, deps: [{ token: Table }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: SortableColumn, selector: "[pSortableColumn]", inputs: { field: ["pSortableColumn", "field"], pSortableColumnDisabled: ["pSortableColumnDisabled", "pSortableColumnDisabled", booleanAttribute] }, host: { listeners: { "click": "onClick($event)", "keydown.space": "onEnterKey($event)", "keydown.enter": "onEnterKey($event)" }, properties: { "class.p-sortable-column": "isEnabled()", "class.p-highlight": "sorted", "attr.tabindex": "isEnabled() ? \"0\" : null", "attr.role": "\"columnheader\"", "attr.aria-sort": "sortOrder" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SortableColumn, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pSortableColumn]',
                    host: {
                        class: 'p-element',
                        '[class.p-sortable-column]': 'isEnabled()',
                        '[class.p-highlight]': 'sorted',
                        '[attr.tabindex]': 'isEnabled() ? "0" : null',
                        '[attr.role]': '"columnheader"',
                        '[attr.aria-sort]': 'sortOrder'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }], propDecorators: { field: [{
                type: Input,
                args: ['pSortableColumn']
            }], pSortableColumnDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], onEnterKey: [{
                type: HostListener,
                args: ['keydown.space', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.enter', ['$event']]
            }] } });
export class SortIcon {
    dt;
    cd;
    field;
    subscription;
    sortOrder;
    constructor(dt, cd) {
        this.dt = dt;
        this.cd = cd;
        this.subscription = this.dt.tableService.sortSource$.subscribe((sortMeta) => {
            this.updateSortState();
        });
    }
    ngOnInit() {
        this.updateSortState();
    }
    onClick(event) {
        event.preventDefault();
    }
    updateSortState() {
        if (this.dt.sortMode === 'single') {
            this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
        }
        else if (this.dt.sortMode === 'multiple') {
            let sortMeta = this.dt.getSortMeta(this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }
        this.cd.markForCheck();
    }
    getMultiSortMetaIndex() {
        let multiSortMeta = this.dt._multiSortMeta;
        let index = -1;
        if (multiSortMeta && this.dt.sortMode === 'multiple' && this.dt.showInitialSortBadge && multiSortMeta.length > 1) {
            for (let i = 0; i < multiSortMeta.length; i++) {
                let meta = multiSortMeta[i];
                if (meta.field === this.field || meta.field === this.field) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    getBadgeValue() {
        let index = this.getMultiSortMetaIndex();
        return this.dt.groupRowsBy && index > -1 ? index : index + 1;
    }
    isMultiSorted() {
        return this.dt.sortMode === 'multiple' && this.getMultiSortMetaIndex() > -1;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SortIcon, deps: [{ token: Table }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.1", type: SortIcon, selector: "p-sortIcon", inputs: { field: "field" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <ng-container *ngIf="!dt.sortIconTemplate">
            <SortAltIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === 0" />
            <SortAmountUpAltIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === 1" />
            <SortAmountDownIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === -1" />
        </ng-container>
        <span *ngIf="dt.sortIconTemplate" class="p-sortable-column-icon">
            <ng-template *ngTemplateOutlet="dt.sortIconTemplate; context: { $implicit: sortOrder }"></ng-template>
        </span>
        <span *ngIf="isMultiSorted()" class="p-sortable-column-badge">{{ getBadgeValue() }}</span>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i0.forwardRef(() => SortAltIcon), selector: "SortAltIcon" }, { kind: "component", type: i0.forwardRef(() => SortAmountUpAltIcon), selector: "SortAmountUpAltIcon" }, { kind: "component", type: i0.forwardRef(() => SortAmountDownIcon), selector: "SortAmountDownIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SortIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-sortIcon',
                    template: `
        <ng-container *ngIf="!dt.sortIconTemplate">
            <SortAltIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === 0" />
            <SortAmountUpAltIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === 1" />
            <SortAmountDownIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === -1" />
        </ng-container>
        <span *ngIf="dt.sortIconTemplate" class="p-sortable-column-icon">
            <ng-template *ngTemplateOutlet="dt.sortIconTemplate; context: { $implicit: sortOrder }"></ng-template>
        </span>
        <span *ngIf="isMultiSorted()" class="p-sortable-column-badge">{{ getBadgeValue() }}</span>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: i0.ChangeDetectorRef }], propDecorators: { field: [{
                type: Input
            }] } });
export class SelectableRow {
    dt;
    tableService;
    el;
    data;
    index;
    pSelectableRowDisabled;
    selected;
    subscription;
    constructor(dt, tableService, el) {
        this.dt = dt;
        this.tableService = tableService;
        this.el = el;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
                this.selected = this.dt.isSelected(this.data);
            });
        }
    }
    setRowTabIndex() {
        if (this.dt.selectionMode === 'single' || this.dt.selectionMode === 'multiple') {
            return !this.dt.selection ? 0 : this.dt.anchorRowIndex === this.index ? 0 : -1;
        }
    }
    ngOnInit() {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    }
    onTouchEnd(event) {
        if (this.isEnabled()) {
            this.dt.handleRowTouchEnd(event);
        }
    }
    onKeyDown(event) {
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;
            case 'Home':
                this.onHomeKey(event);
                break;
            case 'End':
                this.onEndKey(event);
                break;
            case 'Space':
                this.onSpaceKey(event);
                break;
            case 'Enter':
                this.onEnterKey(event);
                break;
            default:
                if (event.code === 'KeyA' && (event.metaKey || event.ctrlKey) && this.dt.selectionMode === 'multiple') {
                    const data = this.dt.dataToRender(this.dt.processedData);
                    this.dt.selection = [...data];
                    this.dt.selectRange(event, data.length - 1);
                    event.preventDefault();
                }
                break;
        }
    }
    onArrowDownKey(event) {
        if (!this.isEnabled()) {
            return;
        }
        const row = event.currentTarget;
        const nextRow = this.findNextSelectableRow(row);
        if (nextRow) {
            nextRow.focus();
        }
        event.preventDefault();
    }
    onArrowUpKey(event) {
        if (!this.isEnabled()) {
            return;
        }
        const row = event.currentTarget;
        const prevRow = this.findPrevSelectableRow(row);
        if (prevRow) {
            prevRow.focus();
        }
        event.preventDefault();
    }
    onEnterKey(event) {
        if (!this.isEnabled()) {
            return;
        }
        this.dt.handleRowClick({
            originalEvent: event,
            rowData: this.data,
            rowIndex: this.index
        });
    }
    onEndKey(event) {
        const lastRow = this.findLastSelectableRow();
        lastRow && this.focusRowChange(this.el.nativeElement, lastRow);
        if (event.ctrlKey && event.shiftKey) {
            const data = this.dt.dataToRender(this.dt.rows);
            const lastSelectableRowIndex = DomHandler.getAttribute(lastRow, 'index');
            this.dt.anchorRowIndex = lastSelectableRowIndex;
            this.dt.selection = data.slice(this.index, data.length);
            this.dt.selectRange(event, this.index);
        }
        event.preventDefault();
    }
    onHomeKey(event) {
        const firstRow = this.findFirstSelectableRow();
        firstRow && this.focusRowChange(this.el.nativeElement, firstRow);
        if (event.ctrlKey && event.shiftKey) {
            const data = this.dt.dataToRender(this.dt.rows);
            const firstSelectableRowIndex = DomHandler.getAttribute(firstRow, 'index');
            this.dt.anchorRowIndex = this.dt.anchorRowIndex || firstSelectableRowIndex;
            this.dt.selection = data.slice(0, this.index + 1);
            this.dt.selectRange(event, this.index);
        }
        event.preventDefault();
    }
    onSpaceKey(event) {
        const isInput = event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement;
        if (isInput) {
            return;
        }
        else {
            this.onEnterKey(event);
            if (event.shiftKey && this.dt.selection !== null) {
                const data = this.dt.dataToRender(this.dt.rows);
                let index;
                if (ObjectUtils.isNotEmpty(this.dt.selection) && this.dt.selection.length > 0) {
                    let firstSelectedRowIndex, lastSelectedRowIndex;
                    firstSelectedRowIndex = ObjectUtils.findIndexInList(this.dt.selection[0], data);
                    lastSelectedRowIndex = ObjectUtils.findIndexInList(this.dt.selection[this.dt.selection.length - 1], data);
                    index = this.index <= firstSelectedRowIndex ? lastSelectedRowIndex : firstSelectedRowIndex;
                }
                else {
                    index = ObjectUtils.findIndexInList(this.dt.selection, data);
                }
                this.dt.anchorRowIndex = index;
                this.dt.selection = index !== this.index ? data.slice(Math.min(index, this.index), Math.max(index, this.index) + 1) : [this.data];
                this.dt.selectRange(event, this.index);
            }
            event.preventDefault();
        }
    }
    focusRowChange(firstFocusableRow, currentFocusedRow) {
        firstFocusableRow.tabIndex = '-1';
        currentFocusedRow.tabIndex = '0';
        DomHandler.focus(currentFocusedRow);
    }
    findLastSelectableRow() {
        const rows = DomHandler.find(this.dt.el.nativeElement, '.p-selectable-row');
        return rows ? rows[rows.length - 1] : null;
    }
    findFirstSelectableRow() {
        const firstRow = DomHandler.findSingle(this.dt.el.nativeElement, '.p-selectable-row');
        return firstRow;
    }
    findNextSelectableRow(row) {
        let nextRow = row.nextElementSibling;
        if (nextRow) {
            if (DomHandler.hasClass(nextRow, 'p-selectable-row'))
                return nextRow;
            else
                return this.findNextSelectableRow(nextRow);
        }
        else {
            return null;
        }
    }
    findPrevSelectableRow(row) {
        let prevRow = row.previousElementSibling;
        if (prevRow) {
            if (DomHandler.hasClass(prevRow, 'p-selectable-row'))
                return prevRow;
            else
                return this.findPrevSelectableRow(prevRow);
        }
        else {
            return null;
        }
    }
    isEnabled() {
        return this.pSelectableRowDisabled !== true;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SelectableRow, deps: [{ token: Table }, { token: TableService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: SelectableRow, selector: "[pSelectableRow]", inputs: { data: ["pSelectableRow", "data"], index: ["pSelectableRowIndex", "index"], pSelectableRowDisabled: ["pSelectableRowDisabled", "pSelectableRowDisabled", booleanAttribute] }, host: { listeners: { "click": "onClick($event)", "touchend": "onTouchEnd($event)", "keydown": "onKeyDown($event)" }, properties: { "class.p-selectable-row": "isEnabled()", "class.p-highlight": "selected", "attr.tabindex": "setRowTabIndex()", "attr.data-p-highlight": "selected", "attr.data-p-selectable-row": "true" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SelectableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pSelectableRow]',
                    host: {
                        class: 'p-element',
                        '[class.p-selectable-row]': 'isEnabled()',
                        '[class.p-highlight]': 'selected',
                        '[attr.tabindex]': 'setRowTabIndex()',
                        '[attr.data-p-highlight]': 'selected',
                        '[attr.data-p-selectable-row]': 'true'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: TableService }, { type: i0.ElementRef }], propDecorators: { data: [{
                type: Input,
                args: ['pSelectableRow']
            }], index: [{
                type: Input,
                args: ['pSelectableRowIndex']
            }], pSelectableRowDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], onTouchEnd: [{
                type: HostListener,
                args: ['touchend', ['$event']]
            }], onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
export class SelectableRowDblClick {
    dt;
    tableService;
    data;
    index;
    pSelectableRowDisabled;
    selected;
    subscription;
    constructor(dt, tableService) {
        this.dt = dt;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
                this.selected = this.dt.isSelected(this.data);
            });
        }
    }
    ngOnInit() {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    }
    isEnabled() {
        return this.pSelectableRowDisabled !== true;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SelectableRowDblClick, deps: [{ token: Table }, { token: TableService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: SelectableRowDblClick, selector: "[pSelectableRowDblClick]", inputs: { data: ["pSelectableRowDblClick", "data"], index: ["pSelectableRowIndex", "index"], pSelectableRowDisabled: ["pSelectableRowDisabled", "pSelectableRowDisabled", booleanAttribute] }, host: { listeners: { "dblclick": "onClick($event)" }, properties: { "class.p-selectable-row": "isEnabled()", "class.p-highlight": "selected" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SelectableRowDblClick, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pSelectableRowDblClick]',
                    host: {
                        class: 'p-element',
                        '[class.p-selectable-row]': 'isEnabled()',
                        '[class.p-highlight]': 'selected'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: TableService }], propDecorators: { data: [{
                type: Input,
                args: ['pSelectableRowDblClick']
            }], index: [{
                type: Input,
                args: ['pSelectableRowIndex']
            }], pSelectableRowDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onClick: [{
                type: HostListener,
                args: ['dblclick', ['$event']]
            }] } });
export class ContextMenuRow {
    dt;
    tableService;
    el;
    data;
    index;
    pContextMenuRowDisabled;
    selected;
    subscription;
    constructor(dt, tableService, el) {
        this.dt = dt;
        this.tableService = tableService;
        this.el = el;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.contextMenuSource$.subscribe((data) => {
                this.selected = this.dt.equals(this.data, data);
            });
        }
    }
    onContextMenu(event) {
        if (this.isEnabled()) {
            this.dt.handleRowRightClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
            this.el.nativeElement.focus();
            event.preventDefault();
        }
    }
    isEnabled() {
        return this.pContextMenuRowDisabled !== true;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ContextMenuRow, deps: [{ token: Table }, { token: TableService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: ContextMenuRow, selector: "[pContextMenuRow]", inputs: { data: ["pContextMenuRow", "data"], index: ["pContextMenuRowIndex", "index"], pContextMenuRowDisabled: ["pContextMenuRowDisabled", "pContextMenuRowDisabled", booleanAttribute] }, host: { listeners: { "contextmenu": "onContextMenu($event)" }, properties: { "class.p-highlight-contextmenu": "selected", "attr.tabindex": "isEnabled() ? 0 : undefined" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ContextMenuRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pContextMenuRow]',
                    host: {
                        class: 'p-element',
                        '[class.p-highlight-contextmenu]': 'selected',
                        '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: TableService }, { type: i0.ElementRef }], propDecorators: { data: [{
                type: Input,
                args: ['pContextMenuRow']
            }], index: [{
                type: Input,
                args: ['pContextMenuRowIndex']
            }], pContextMenuRowDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onContextMenu: [{
                type: HostListener,
                args: ['contextmenu', ['$event']]
            }] } });
export class RowToggler {
    dt;
    data;
    pRowTogglerDisabled;
    constructor(dt) {
        this.dt = dt;
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.dt.toggleRow(this.data, event);
            event.preventDefault();
        }
    }
    isEnabled() {
        return this.pRowTogglerDisabled !== true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: RowToggler, deps: [{ token: Table }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: RowToggler, selector: "[pRowToggler]", inputs: { data: ["pRowToggler", "data"], pRowTogglerDisabled: ["pRowTogglerDisabled", "pRowTogglerDisabled", booleanAttribute] }, host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: RowToggler, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pRowToggler]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }], propDecorators: { data: [{
                type: Input,
                args: ['pRowToggler']
            }], pRowTogglerDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
export class ResizableColumn {
    document;
    platformId;
    renderer;
    dt;
    el;
    zone;
    pResizableColumnDisabled;
    resizer;
    resizerMouseDownListener;
    documentMouseMoveListener;
    documentMouseUpListener;
    constructor(document, platformId, renderer, dt, el, zone) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.isEnabled()) {
                DomHandler.addClass(this.el.nativeElement, 'p-resizable-column');
                this.resizer = this.renderer.createElement('span');
                this.renderer.addClass(this.resizer, 'p-column-resizer');
                this.renderer.appendChild(this.el.nativeElement, this.resizer);
                this.zone.runOutsideAngular(() => {
                    this.resizerMouseDownListener = this.renderer.listen(this.resizer, 'mousedown', this.onMouseDown.bind(this));
                });
            }
        }
    }
    bindDocumentEvents() {
        this.zone.runOutsideAngular(() => {
            this.documentMouseMoveListener = this.renderer.listen(this.document, 'mousemove', this.onDocumentMouseMove.bind(this));
            this.documentMouseUpListener = this.renderer.listen(this.document, 'mouseup', this.onDocumentMouseUp.bind(this));
        });
    }
    unbindDocumentEvents() {
        if (this.documentMouseMoveListener) {
            this.documentMouseMoveListener();
            this.documentMouseMoveListener = null;
        }
        if (this.documentMouseUpListener) {
            this.documentMouseUpListener();
            this.documentMouseUpListener = null;
        }
    }
    onMouseDown(event) {
        if (event.which === 1) {
            this.dt.onColumnResizeBegin(event);
            this.bindDocumentEvents();
        }
    }
    onDocumentMouseMove(event) {
        this.dt.onColumnResize(event);
    }
    onDocumentMouseUp(event) {
        this.dt.onColumnResizeEnd();
        this.unbindDocumentEvents();
    }
    isEnabled() {
        return this.pResizableColumnDisabled !== true;
    }
    ngOnDestroy() {
        if (this.resizerMouseDownListener) {
            this.resizerMouseDownListener();
            this.resizerMouseDownListener = null;
        }
        this.unbindDocumentEvents();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ResizableColumn, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: Table }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: ResizableColumn, selector: "[pResizableColumn]", inputs: { pResizableColumnDisabled: ["pResizableColumnDisabled", "pResizableColumnDisabled", booleanAttribute] }, host: { classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ResizableColumn, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pResizableColumn]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: Table }, { type: i0.ElementRef }, { type: i0.NgZone }], propDecorators: { pResizableColumnDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });
export class ReorderableColumn {
    platformId;
    renderer;
    dt;
    el;
    zone;
    pReorderableColumnDisabled;
    dragStartListener;
    dragOverListener;
    dragEnterListener;
    dragLeaveListener;
    mouseDownListener;
    constructor(platformId, renderer, dt, el, zone) {
        this.platformId = platformId;
        this.renderer = renderer;
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.bindEvents();
        }
    }
    bindEvents() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                this.mouseDownListener = this.renderer.listen(this.el.nativeElement, 'mousedown', this.onMouseDown.bind(this));
                this.dragStartListener = this.renderer.listen(this.el.nativeElement, 'dragstart', this.onDragStart.bind(this));
                this.dragOverListener = this.renderer.listen(this.el.nativeElement, 'dragover', this.onDragOver.bind(this));
                this.dragEnterListener = this.renderer.listen(this.el.nativeElement, 'dragenter', this.onDragEnter.bind(this));
                this.dragLeaveListener = this.renderer.listen(this.el.nativeElement, 'dragleave', this.onDragLeave.bind(this));
            });
        }
    }
    unbindEvents() {
        if (this.mouseDownListener) {
            this.mouseDownListener();
            this.mouseDownListener = null;
        }
        if (this.dragStartListener) {
            this.dragStartListener();
            this.dragStartListener = null;
        }
        if (this.dragOverListener) {
            this.dragOverListener();
            this.dragOverListener = null;
        }
        if (this.dragEnterListener) {
            this.dragEnterListener();
            this.dragEnterListener = null;
        }
        if (this.dragLeaveListener) {
            this.dragLeaveListener();
            this.dragLeaveListener = null;
        }
    }
    onMouseDown(event) {
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || DomHandler.hasClass(event.target, 'p-column-resizer'))
            this.el.nativeElement.draggable = false;
        else
            this.el.nativeElement.draggable = true;
    }
    onDragStart(event) {
        this.dt.onColumnDragStart(event, this.el.nativeElement);
    }
    onDragOver(event) {
        event.preventDefault();
    }
    onDragEnter(event) {
        this.dt.onColumnDragEnter(event, this.el.nativeElement);
    }
    onDragLeave(event) {
        this.dt.onColumnDragLeave(event);
    }
    onDrop(event) {
        if (this.isEnabled()) {
            this.dt.onColumnDrop(event, this.el.nativeElement);
        }
    }
    isEnabled() {
        return this.pReorderableColumnDisabled !== true;
    }
    ngOnDestroy() {
        this.unbindEvents();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ReorderableColumn, deps: [{ token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: Table }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: ReorderableColumn, selector: "[pReorderableColumn]", inputs: { pReorderableColumnDisabled: ["pReorderableColumnDisabled", "pReorderableColumnDisabled", booleanAttribute] }, host: { listeners: { "drop": "onDrop($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ReorderableColumn, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pReorderableColumn]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: Table }, { type: i0.ElementRef }, { type: i0.NgZone }], propDecorators: { pReorderableColumnDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }] } });
export class EditableColumn {
    dt;
    el;
    zone;
    data;
    field;
    rowIndex;
    pEditableColumnDisabled;
    pFocusCellSelector;
    overlayEventListener;
    constructor(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ngOnChanges(changes) {
        if (this.el.nativeElement && !changes.data?.firstChange) {
            this.dt.updateEditingCell(this.el.nativeElement, this.data, this.field, this.rowIndex);
        }
    }
    ngAfterViewInit() {
        if (this.isEnabled()) {
            DomHandler.addClass(this.el.nativeElement, 'p-editable-column');
        }
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.dt.selfClick = true;
            if (this.dt.editingCell) {
                if (this.dt.editingCell !== this.el.nativeElement) {
                    if (!this.dt.isEditingCellValid()) {
                        return;
                    }
                    this.closeEditingCell(true, event);
                    this.openCell();
                }
            }
            else {
                this.openCell();
            }
        }
    }
    openCell() {
        this.dt.updateEditingCell(this.el.nativeElement, this.data, this.field, this.rowIndex);
        DomHandler.addClass(this.el.nativeElement, 'p-cell-editing');
        this.dt.onEditInit.emit({ field: this.field, data: this.data, index: this.rowIndex });
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                let focusCellSelector = this.pFocusCellSelector || 'input, textarea, select';
                let focusableElement = DomHandler.findSingle(this.el.nativeElement, focusCellSelector);
                if (focusableElement) {
                    focusableElement.focus();
                }
            }, 50);
        });
        this.overlayEventListener = (e) => {
            if (this.el && this.el.nativeElement.contains(e.target)) {
                this.dt.selfClick = true;
            }
        };
        this.dt.overlaySubscription = this.dt.overlayService.clickObservable.subscribe(this.overlayEventListener);
    }
    closeEditingCell(completed, event) {
        const eventData = { field: this.dt.editingCellField, data: this.dt.editingCellData, originalEvent: event, index: this.dt.editingCellRowIndex };
        if (completed) {
            this.dt.onEditComplete.emit(eventData);
        }
        else {
            this.dt.onEditCancel.emit(eventData);
            this.dt.value.forEach((element) => {
                if (element[this.dt.editingCellField] === this.data) {
                    element[this.dt.editingCellField] = this.dt.editingCellData;
                }
            });
        }
        DomHandler.removeClass(this.dt.editingCell, 'p-cell-editing');
        this.dt.editingCell = null;
        this.dt.editingCellData = null;
        this.dt.editingCellField = null;
        this.dt.unbindDocumentEditListener();
        if (this.dt.overlaySubscription) {
            this.dt.overlaySubscription.unsubscribe();
        }
    }
    onEnterKeyDown(event) {
        if (this.isEnabled() && !event.shiftKey) {
            if (this.dt.isEditingCellValid()) {
                this.closeEditingCell(true, event);
            }
            event.preventDefault();
        }
    }
    onTabKeyDown(event) {
        if (this.isEnabled()) {
            if (this.dt.isEditingCellValid()) {
                this.closeEditingCell(true, event);
            }
            event.preventDefault();
        }
    }
    onEscapeKeyDown(event) {
        if (this.isEnabled()) {
            if (this.dt.isEditingCellValid()) {
                this.closeEditingCell(false, event);
            }
            event.preventDefault();
        }
    }
    onShiftKeyDown(event) {
        if (this.isEnabled()) {
            if (event.shiftKey)
                this.moveToPreviousCell(event);
            else {
                this.moveToNextCell(event);
            }
        }
    }
    onArrowDown(event) {
        if (this.isEnabled()) {
            let currentCell = this.findCell(event.target);
            if (currentCell) {
                let cellIndex = DomHandler.index(currentCell);
                let targetCell = this.findNextEditableColumnByIndex(currentCell, cellIndex);
                if (targetCell) {
                    if (this.dt.isEditingCellValid()) {
                        this.closeEditingCell(true, event);
                    }
                    DomHandler.invokeElementMethod(event.target, 'blur');
                    DomHandler.invokeElementMethod(targetCell, 'click');
                }
                event.preventDefault();
            }
        }
    }
    onArrowUp(event) {
        if (this.isEnabled()) {
            let currentCell = this.findCell(event.target);
            if (currentCell) {
                let cellIndex = DomHandler.index(currentCell);
                let targetCell = this.findPrevEditableColumnByIndex(currentCell, cellIndex);
                if (targetCell) {
                    if (this.dt.isEditingCellValid()) {
                        this.closeEditingCell(true, event);
                    }
                    DomHandler.invokeElementMethod(event.target, 'blur');
                    DomHandler.invokeElementMethod(targetCell, 'click');
                }
                event.preventDefault();
            }
        }
    }
    onArrowLeft(event) {
        if (this.isEnabled()) {
            this.moveToPreviousCell(event);
        }
    }
    onArrowRight(event) {
        if (this.isEnabled()) {
            this.moveToNextCell(event);
        }
    }
    findCell(element) {
        if (element) {
            let cell = element;
            while (cell && !DomHandler.hasClass(cell, 'p-cell-editing')) {
                cell = cell.parentElement;
            }
            return cell;
        }
        else {
            return null;
        }
    }
    moveToPreviousCell(event) {
        let currentCell = this.findCell(event.target);
        if (currentCell) {
            let targetCell = this.findPreviousEditableColumn(currentCell);
            if (targetCell) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(true, event);
                }
                DomHandler.invokeElementMethod(event.target, 'blur');
                DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
        }
    }
    moveToNextCell(event) {
        let currentCell = this.findCell(event.target);
        if (currentCell) {
            let targetCell = this.findNextEditableColumn(currentCell);
            if (targetCell) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(true, event);
                }
                DomHandler.invokeElementMethod(event.target, 'blur');
                DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
            else {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(true, event);
                }
            }
        }
    }
    findPreviousEditableColumn(cell) {
        let prevCell = cell.previousElementSibling;
        if (!prevCell) {
            let previousRow = cell.parentElement?.previousElementSibling;
            if (previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }
        if (prevCell) {
            if (DomHandler.hasClass(prevCell, 'p-editable-column'))
                return prevCell;
            else
                return this.findPreviousEditableColumn(prevCell);
        }
        else {
            return null;
        }
    }
    findNextEditableColumn(cell) {
        let nextCell = cell.nextElementSibling;
        if (!nextCell) {
            let nextRow = cell.parentElement?.nextElementSibling;
            if (nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }
        if (nextCell) {
            if (DomHandler.hasClass(nextCell, 'p-editable-column'))
                return nextCell;
            else
                return this.findNextEditableColumn(nextCell);
        }
        else {
            return null;
        }
    }
    findNextEditableColumnByIndex(cell, index) {
        let nextRow = cell.parentElement?.nextElementSibling;
        if (nextRow) {
            let nextCell = nextRow.children[index];
            if (nextCell && DomHandler.hasClass(nextCell, 'p-editable-column')) {
                return nextCell;
            }
            return null;
        }
        else {
            return null;
        }
    }
    findPrevEditableColumnByIndex(cell, index) {
        let prevRow = cell.parentElement?.previousElementSibling;
        if (prevRow) {
            let prevCell = prevRow.children[index];
            if (prevCell && DomHandler.hasClass(prevCell, 'p-editable-column')) {
                return prevCell;
            }
            return null;
        }
        else {
            return null;
        }
    }
    isEnabled() {
        return this.pEditableColumnDisabled !== true;
    }
    ngOnDestroy() {
        if (this.dt.overlaySubscription) {
            this.dt.overlaySubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: EditableColumn, deps: [{ token: Table }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: EditableColumn, selector: "[pEditableColumn]", inputs: { data: ["pEditableColumn", "data"], field: ["pEditableColumnField", "field"], rowIndex: ["pEditableColumnRowIndex", "rowIndex"], pEditableColumnDisabled: ["pEditableColumnDisabled", "pEditableColumnDisabled", booleanAttribute], pFocusCellSelector: "pFocusCellSelector" }, host: { listeners: { "click": "onClick($event)", "keydown.enter": "onEnterKeyDown($event)", "keydown.tab": "onShiftKeyDown($event)", "keydown.escape": "onEscapeKeyDown($event)", "keydown.shift.tab": "onShiftKeyDown($event)", "keydown.meta.tab": "onShiftKeyDown($event)", "keydown.arrowdown": "onArrowDown($event)", "keydown.arrowup": "onArrowUp($event)", "keydown.arrowleft": "onArrowLeft($event)", "keydown.arrowright": "onArrowRight($event)" }, classAttribute: "p-element" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: EditableColumn, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pEditableColumn]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: i0.ElementRef }, { type: i0.NgZone }], propDecorators: { data: [{
                type: Input,
                args: ['pEditableColumn']
            }], field: [{
                type: Input,
                args: ['pEditableColumnField']
            }], rowIndex: [{
                type: Input,
                args: ['pEditableColumnRowIndex']
            }], pEditableColumnDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], pFocusCellSelector: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], onEnterKeyDown: [{
                type: HostListener,
                args: ['keydown.enter', ['$event']]
            }], onTabKeyDown: [{
                type: HostListener,
                args: ['keydown.tab', ['$event']]
            }], onEscapeKeyDown: [{
                type: HostListener,
                args: ['keydown.escape', ['$event']]
            }], onShiftKeyDown: [{
                type: HostListener,
                args: ['keydown.tab', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.shift.tab', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.meta.tab', ['$event']]
            }], onArrowDown: [{
                type: HostListener,
                args: ['keydown.arrowdown', ['$event']]
            }], onArrowUp: [{
                type: HostListener,
                args: ['keydown.arrowup', ['$event']]
            }], onArrowLeft: [{
                type: HostListener,
                args: ['keydown.arrowleft', ['$event']]
            }], onArrowRight: [{
                type: HostListener,
                args: ['keydown.arrowright', ['$event']]
            }] } });
export class EditableRow {
    el;
    data;
    pEditableRowDisabled;
    constructor(el) {
        this.el = el;
    }
    isEnabled() {
        return this.pEditableRowDisabled !== true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: EditableRow, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: EditableRow, selector: "[pEditableRow]", inputs: { data: ["pEditableRow", "data"], pEditableRowDisabled: ["pEditableRowDisabled", "pEditableRowDisabled", booleanAttribute] }, host: { classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: EditableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pEditableRow]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { data: [{
                type: Input,
                args: ['pEditableRow']
            }], pEditableRowDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });
export class InitEditableRow {
    dt;
    editableRow;
    constructor(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    onClick(event) {
        this.dt.initRowEdit(this.editableRow.data);
        event.preventDefault();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: InitEditableRow, deps: [{ token: Table }, { token: EditableRow }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.1", type: InitEditableRow, selector: "[pInitEditableRow]", host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: InitEditableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pInitEditableRow]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: EditableRow }], propDecorators: { onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
export class SaveEditableRow {
    dt;
    editableRow;
    constructor(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    onClick(event) {
        this.dt.saveRowEdit(this.editableRow.data, this.editableRow.el.nativeElement);
        event.preventDefault();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SaveEditableRow, deps: [{ token: Table }, { token: EditableRow }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.1", type: SaveEditableRow, selector: "[pSaveEditableRow]", host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SaveEditableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pSaveEditableRow]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: EditableRow }], propDecorators: { onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
export class CancelEditableRow {
    dt;
    editableRow;
    constructor(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    onClick(event) {
        this.dt.cancelRowEdit(this.editableRow.data);
        event.preventDefault();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: CancelEditableRow, deps: [{ token: Table }, { token: EditableRow }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.1", type: CancelEditableRow, selector: "[pCancelEditableRow]", host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: CancelEditableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pCancelEditableRow]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: EditableRow }], propDecorators: { onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
export class CellEditor {
    dt;
    editableColumn;
    editableRow;
    templates;
    inputTemplate;
    outputTemplate;
    constructor(dt, editableColumn, editableRow) {
        this.dt = dt;
        this.editableColumn = editableColumn;
        this.editableRow = editableRow;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'input':
                    this.inputTemplate = item.template;
                    break;
                case 'output':
                    this.outputTemplate = item.template;
                    break;
            }
        });
    }
    get editing() {
        return (this.dt.editingCell && this.editableColumn && this.dt.editingCell === this.editableColumn.el.nativeElement) || (this.editableRow && this.dt.editMode === 'row' && this.dt.isRowEditing(this.editableRow.data));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: CellEditor, deps: [{ token: Table }, { token: EditableColumn, optional: true }, { token: EditableRow, optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.1", type: CellEditor, selector: "p-cellEditor", host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <ng-container *ngIf="editing">
            <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!editing">
            <ng-container *ngTemplateOutlet="outputTemplate"></ng-container>
        </ng-container>
    `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: CellEditor, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-cellEditor',
                    template: `
        <ng-container *ngIf="editing">
            <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!editing">
            <ng-container *ngTemplateOutlet="outputTemplate"></ng-container>
        </ng-container>
    `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: EditableColumn, decorators: [{
                    type: Optional
                }] }, { type: EditableRow, decorators: [{
                    type: Optional
                }] }], propDecorators: { templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class TableRadioButton {
    dt;
    cd;
    disabled;
    value;
    index;
    inputId;
    name;
    ariaLabel;
    inputViewChild;
    checked;
    focused;
    subscription;
    constructor(dt, cd) {
        this.dt = dt;
        this.cd = cd;
        this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.dt.isSelected(this.value);
            this.ariaLabel = this.ariaLabel || this.dt.config.translation.aria ? (this.checked ? this.dt.config.translation.aria.selectRow : this.dt.config.translation.aria.unselectRow) : undefined;
            this.cd.markForCheck();
        });
    }
    ngOnInit() {
        this.checked = this.dt.isSelected(this.value);
    }
    onClick(event) {
        if (!this.disabled) {
            this.dt.toggleRowWithRadio({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
            this.inputViewChild?.nativeElement?.focus();
        }
        DomHandler.clearSelection();
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TableRadioButton, deps: [{ token: Table }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: TableRadioButton, selector: "p-tableRadioButton", inputs: { disabled: ["disabled", "disabled", booleanAttribute], value: "value", index: ["index", "index", numberAttribute], inputId: "inputId", name: "name", ariaLabel: "ariaLabel" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "inputViewChild", first: true, predicate: ["rb"], descendants: true }], ngImport: i0, template: `
        <div class="p-radiobutton p-component" [ngClass]="{ 'p-radiobutton-focused': focused, 'p-radiobutton-checked': checked, 'p-radiobutton-disabled': disabled }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #rb type="radio" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="disabled" [attr.aria-label]="ariaLabel" [tabindex]="disabled ? null : '0'" />
            </div>
            <div #box [ngClass]="{ 'p-radiobutton-box p-component': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': disabled }">
                <div class="p-radiobutton-icon"></div>
            </div>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TableRadioButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-tableRadioButton',
                    template: `
        <div class="p-radiobutton p-component" [ngClass]="{ 'p-radiobutton-focused': focused, 'p-radiobutton-checked': checked, 'p-radiobutton-disabled': disabled }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #rb type="radio" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="disabled" [attr.aria-label]="ariaLabel" [tabindex]="disabled ? null : '0'" />
            </div>
            <div #box [ngClass]="{ 'p-radiobutton-box p-component': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': disabled }">
                <div class="p-radiobutton-icon"></div>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: i0.ChangeDetectorRef }], propDecorators: { disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], value: [{
                type: Input
            }], index: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], inputId: [{
                type: Input
            }], name: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], inputViewChild: [{
                type: ViewChild,
                args: ['rb']
            }] } });
export class TableCheckbox {
    dt;
    tableService;
    cd;
    disabled;
    value;
    index;
    inputId;
    name;
    required;
    ariaLabel;
    checked;
    focused;
    subscription;
    constructor(dt, tableService, cd) {
        this.dt = dt;
        this.tableService = tableService;
        this.cd = cd;
        this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.dt.isSelected(this.value);
            this.ariaLabel = this.ariaLabel || this.dt.config.translation.aria ? (this.checked ? this.dt.config.translation.aria.selectRow : this.dt.config.translation.aria.unselectRow) : undefined;
            this.cd.markForCheck();
        });
    }
    ngOnInit() {
        this.checked = this.dt.isSelected(this.value);
    }
    onClick(event) {
        if (!this.disabled) {
            this.dt.toggleRowWithCheckbox({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
        }
        DomHandler.clearSelection();
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TableCheckbox, deps: [{ token: Table }, { token: TableService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: TableCheckbox, selector: "p-tableCheckbox", inputs: { disabled: ["disabled", "disabled", booleanAttribute], value: "value", index: ["index", "index", numberAttribute], inputId: "inputId", name: "name", required: ["required", "required", booleanAttribute], ariaLabel: "ariaLabel" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-focused': focused, 'p-checkbox-disabled': disabled }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input
                    type="checkbox"
                    [attr.id]="inputId"
                    [attr.name]="name"
                    [checked]="checked"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    [disabled]="disabled"
                    [attr.required]="required"
                    [attr.aria-label]="ariaLabel"
                    [tabindex]="disabled ? null : '0'"
                />
            </div>
            <div #box [ngClass]="{ 'p-checkbox-box p-component': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': disabled }">
                <ng-container *ngIf="!dt.checkboxIconTemplate">
                    <CheckIcon [styleClass]="'p-checkbox-icon'" *ngIf="checked" />
                </ng-container>
                <span *ngIf="dt.checkboxIconTemplate">
                    <ng-template *ngTemplateOutlet="dt.checkboxIconTemplate; context: { $implicit: checked }"></ng-template>
                </span>
            </div>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i0.forwardRef(() => CheckIcon), selector: "CheckIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TableCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-tableCheckbox',
                    template: `
        <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-focused': focused, 'p-checkbox-disabled': disabled }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input
                    type="checkbox"
                    [attr.id]="inputId"
                    [attr.name]="name"
                    [checked]="checked"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    [disabled]="disabled"
                    [attr.required]="required"
                    [attr.aria-label]="ariaLabel"
                    [tabindex]="disabled ? null : '0'"
                />
            </div>
            <div #box [ngClass]="{ 'p-checkbox-box p-component': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': disabled }">
                <ng-container *ngIf="!dt.checkboxIconTemplate">
                    <CheckIcon [styleClass]="'p-checkbox-icon'" *ngIf="checked" />
                </ng-container>
                <span *ngIf="dt.checkboxIconTemplate">
                    <ng-template *ngTemplateOutlet="dt.checkboxIconTemplate; context: { $implicit: checked }"></ng-template>
                </span>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: TableService }, { type: i0.ChangeDetectorRef }], propDecorators: { disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], value: [{
                type: Input
            }], index: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], inputId: [{
                type: Input
            }], name: [{
                type: Input
            }], required: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], ariaLabel: [{
                type: Input
            }] } });
export class TableHeaderCheckbox {
    dt;
    tableService;
    cd;
    disabled;
    inputId;
    name;
    ariaLabel;
    checked;
    focused;
    selectionChangeSubscription;
    valueChangeSubscription;
    constructor(dt, tableService, cd) {
        this.dt = dt;
        this.tableService = tableService;
        this.cd = cd;
        this.valueChangeSubscription = this.dt.tableService.valueSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
            this.ariaLabel = this.ariaLabel || this.dt.config.translation.aria ? (this.checked ? this.dt.config.translation.aria.selectAll : this.dt.config.translation.aria.unselectAll) : undefined;
        });
        this.selectionChangeSubscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
        });
    }
    ngOnInit() {
        this.checked = this.updateCheckedState();
    }
    onClick(event) {
        if (!this.disabled) {
            if (this.dt.value && this.dt.value.length > 0) {
                this.dt.toggleRowsWithCheckbox(event, !this.checked);
            }
        }
        DomHandler.clearSelection();
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
    }
    isDisabled() {
        return this.disabled || !this.dt.value || !this.dt.value.length;
    }
    ngOnDestroy() {
        if (this.selectionChangeSubscription) {
            this.selectionChangeSubscription.unsubscribe();
        }
        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
    }
    updateCheckedState() {
        this.cd.markForCheck();
        if (this.dt._selectAll !== null) {
            return this.dt._selectAll;
        }
        else {
            const data = this.dt.selectionPageOnly ? this.dt.dataToRender(this.dt.processedData) : this.dt.processedData;
            const val = this.dt.frozenValue ? [...this.dt.frozenValue, ...data] : data;
            const selectableVal = this.dt.rowSelectable ? val.filter((data, index) => this.dt.rowSelectable({ data, index })) : val;
            return ObjectUtils.isNotEmpty(selectableVal) && ObjectUtils.isNotEmpty(this.dt.selection) && selectableVal.every((v) => this.dt.selection.some((s) => this.dt.equals(v, s)));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TableHeaderCheckbox, deps: [{ token: Table }, { token: TableService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: TableHeaderCheckbox, selector: "p-tableHeaderCheckbox", inputs: { disabled: ["disabled", "disabled", booleanAttribute], inputId: "inputId", name: "name", ariaLabel: "ariaLabel" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-focused': focused, 'p-checkbox-disabled': isDisabled() }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [tabindex]="disabled ? null : '0'" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="isDisabled()" [attr.aria-label]="ariaLabel" />
            </div>
            <div #box [ngClass]="{ 'p-checkbox-box': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': isDisabled() }">
                <ng-container *ngIf="!dt.headerCheckboxIconTemplate">
                    <CheckIcon *ngIf="checked" [styleClass]="'p-checkbox-icon'" />
                </ng-container>
                <span class="p-checkbox-icon" *ngIf="dt.headerCheckboxIconTemplate">
                    <ng-template *ngTemplateOutlet="dt.headerCheckboxIconTemplate; context: { $implicit: checked }"></ng-template>
                </span>
            </div>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i0.forwardRef(() => CheckIcon), selector: "CheckIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TableHeaderCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-tableHeaderCheckbox',
                    template: `
        <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-focused': focused, 'p-checkbox-disabled': isDisabled() }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [tabindex]="disabled ? null : '0'" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="isDisabled()" [attr.aria-label]="ariaLabel" />
            </div>
            <div #box [ngClass]="{ 'p-checkbox-box': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': isDisabled() }">
                <ng-container *ngIf="!dt.headerCheckboxIconTemplate">
                    <CheckIcon *ngIf="checked" [styleClass]="'p-checkbox-icon'" />
                </ng-container>
                <span class="p-checkbox-icon" *ngIf="dt.headerCheckboxIconTemplate">
                    <ng-template *ngTemplateOutlet="dt.headerCheckboxIconTemplate; context: { $implicit: checked }"></ng-template>
                </span>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: TableService }, { type: i0.ChangeDetectorRef }], propDecorators: { disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], inputId: [{
                type: Input
            }], name: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }] } });
export class ReorderableRowHandle {
    el;
    constructor(el) {
        this.el = el;
    }
    ngAfterViewInit() {
        DomHandler.addClass(this.el.nativeElement, 'p-datatable-reorderablerow-handle');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ReorderableRowHandle, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.1", type: ReorderableRowHandle, selector: "[pReorderableRowHandle]", host: { classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ReorderableRowHandle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pReorderableRowHandle]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }] });
export class ReorderableRow {
    renderer;
    dt;
    el;
    zone;
    index;
    pReorderableRowDisabled;
    mouseDownListener;
    dragStartListener;
    dragEndListener;
    dragOverListener;
    dragLeaveListener;
    dropListener;
    constructor(renderer, dt, el, zone) {
        this.renderer = renderer;
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.el.nativeElement.droppable = true;
            this.bindEvents();
        }
    }
    bindEvents() {
        this.zone.runOutsideAngular(() => {
            this.mouseDownListener = this.renderer.listen(this.el.nativeElement, 'mousedown', this.onMouseDown.bind(this));
            this.dragStartListener = this.renderer.listen(this.el.nativeElement, 'dragstart', this.onDragStart.bind(this));
            this.dragEndListener = this.renderer.listen(this.el.nativeElement, 'dragend', this.onDragEnd.bind(this));
            this.dragOverListener = this.renderer.listen(this.el.nativeElement, 'dragover', this.onDragOver.bind(this));
            this.dragLeaveListener = this.renderer.listen(this.el.nativeElement, 'dragleave', this.onDragLeave.bind(this));
        });
    }
    unbindEvents() {
        if (this.mouseDownListener) {
            this.mouseDownListener();
            this.mouseDownListener = null;
        }
        if (this.dragStartListener) {
            this.dragStartListener();
            this.dragStartListener = null;
        }
        if (this.dragEndListener) {
            this.dragEndListener();
            this.dragEndListener = null;
        }
        if (this.dragOverListener) {
            this.dragOverListener();
            this.dragOverListener = null;
        }
        if (this.dragLeaveListener) {
            this.dragLeaveListener();
            this.dragLeaveListener = null;
        }
    }
    onMouseDown(event) {
        const targetElement = event.target;
        const isHandleClicked = this.isHandleElement(targetElement);
        this.el.nativeElement.draggable = isHandleClicked;
    }
    isHandleElement(element) {
        if (element?.classList.contains('p-datatable-reorderablerow-handle')) {
            return true;
        }
        if (element?.parentElement && !['TD', 'TR'].includes(element?.parentElement?.tagName)) {
            return this.isHandleElement(element?.parentElement);
        }
        return false;
    }
    onDragStart(event) {
        this.dt.onRowDragStart(event, this.index);
    }
    onDragEnd(event) {
        this.dt.onRowDragEnd(event);
        this.el.nativeElement.draggable = false;
    }
    onDragOver(event) {
        this.dt.onRowDragOver(event, this.index, this.el.nativeElement);
        event.preventDefault();
    }
    onDragLeave(event) {
        this.dt.onRowDragLeave(event, this.el.nativeElement);
    }
    isEnabled() {
        return this.pReorderableRowDisabled !== true;
    }
    onDrop(event) {
        if (this.isEnabled() && this.dt.rowDragging) {
            this.dt.onRowDrop(event, this.el.nativeElement);
        }
        event.preventDefault();
    }
    ngOnDestroy() {
        this.unbindEvents();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ReorderableRow, deps: [{ token: i0.Renderer2 }, { token: Table }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: ReorderableRow, selector: "[pReorderableRow]", inputs: { index: ["pReorderableRow", "index"], pReorderableRowDisabled: ["pReorderableRowDisabled", "pReorderableRowDisabled", booleanAttribute] }, host: { listeners: { "drop": "onDrop($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ReorderableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pReorderableRow]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.Renderer2 }, { type: Table }, { type: i0.ElementRef }, { type: i0.NgZone }], propDecorators: { index: [{
                type: Input,
                args: ['pReorderableRow']
            }], pReorderableRowDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }] } });
/**
 * Column Filter element of Table.
 * @group Components
 */
export class ColumnFilter {
    document;
    el;
    dt;
    renderer;
    config;
    overlayService;
    cd;
    /**
     * Property represented by the column.
     * @group Props
     */
    field;
    /**
     * Type of the input.
     * @group Props
     */
    type = 'text';
    /**
     * Filter display.
     * @group Props
     */
    display = 'row';
    /**
     * Decides whether to display filter menu popup.
     * @group Props
     */
    showMenu = true;
    /**
     * Filter match mode.
     * @group Props
     */
    matchMode;
    /**
     * Filter operator.
     * @defaultValue 'AND'
     * @group Props
     */
    operator = FilterOperator.AND;
    /**
     * Decides whether to display filter operator.
     * @group Props
     */
    showOperator = true;
    /**
     * Decides whether to display clear filter button.
     * @group Props
     */
    showClearButton = true;
    /**
     * Decides whether to display apply filter button.
     * @group Props
     */
    showApplyButton = true;
    /**
     * Decides whether to display filter match modes.
     * @group Props
     */
    showMatchModes = true;
    /**
     * Decides whether to display add filter button.
     * @group Props
     */
    showAddButton = true;
    /**
     * Decides whether to close popup on clear button click.
     * @group Props
     */
    hideOnClear = false;
    /**
     * Filter placeholder.
     * @group Props
     */
    placeholder;
    /**
     * Filter match mode options.
     * @group Props
     */
    matchModeOptions;
    /**
     * Defines maximum amount of constraints.
     * @group Props
     */
    maxConstraints = 2;
    /**
     * Defines minimum fraction of digits.
     * @group Props
     */
    minFractionDigits;
    /**
     * Defines maximum fraction of digits.
     * @group Props
     */
    maxFractionDigits;
    /**
     * Defines prefix of the filter.
     * @group Props
     */
    prefix;
    /**
     * Defines suffix of the filter.
     * @group Props
     */
    suffix;
    /**
     * Defines filter locale.
     * @group Props
     */
    locale;
    /**
     * Defines filter locale matcher.
     * @group Props
     */
    localeMatcher;
    /**
     * Enables currency input.
     * @group Props
     */
    currency;
    /**
     * Defines the display of the currency input.
     * @group Props
     */
    currencyDisplay;
    /**
     * Defines if filter grouping will be enabled.
     * @group Props
     */
    useGrouping = true;
    /**
     * Defines the visibility of buttons.
     * @group Props
     */
    showButtons = true;
    /**
     * Defines the aria-label of the form element.
     * @group Props
     */
    ariaLabel;
    icon;
    clearButtonViewChild;
    templates;
    overlaySubscription;
    headerTemplate;
    filterTemplate;
    footerTemplate;
    filterIconTemplate;
    removeRuleIconTemplate;
    addRuleIconTemplate;
    clearFilterIconTemplate;
    operatorOptions;
    overlayVisible;
    overlay;
    scrollHandler;
    documentClickListener;
    documentResizeListener;
    matchModes;
    translationSubscription;
    resetSubscription;
    selfClick;
    overlayEventListener;
    window;
    overlayId;
    get fieldConstraints() {
        let filter = this.dt.filters[this.field];
        if (!Array.isArray(filter))
            filter = [filter];
        return this.dt.filters ? filter : null;
    }
    get showRemoveIcon() {
        return this.fieldConstraints ? this.fieldConstraints.length > 1 : false;
    }
    get showMenuButton() {
        return this.showMenu && (this.display === 'row' ? this.type !== 'boolean' : true);
    }
    get isShowOperator() {
        return this.showOperator && this.type !== 'boolean';
    }
    get isShowAddConstraint() {
        return this.showAddButton && this.type !== 'boolean' && this.fieldConstraints && this.fieldConstraints.length < this.maxConstraints;
    }
    get showMenuButtonLabel() {
        return this.config.getTranslation(TranslationKeys.SHOW_FILTER_MENU);
    }
    get applyButtonLabel() {
        return this.config.getTranslation(TranslationKeys.APPLY);
    }
    get clearButtonLabel() {
        return this.config.getTranslation(TranslationKeys.CLEAR);
    }
    get addRuleButtonLabel() {
        return this.config.getTranslation(TranslationKeys.ADD_RULE);
    }
    get removeRuleButtonLabel() {
        return this.config.getTranslation(TranslationKeys.REMOVE_RULE);
    }
    get noFilterLabel() {
        return this.config.getTranslation(TranslationKeys.NO_FILTER);
    }
    get filterMenuButtonAriaLabel() {
        return this.config.translation ? (this.overlayVisible ? this.config.translation.aria.hideFilterMenu : this.config.translation.aria.showFilterMenu) : undefined;
    }
    get removeRuleButtonAriaLabel() {
        return this.config.translation ? this.config.translation.removeRule : undefined;
    }
    get filterOperatorAriaLabel() {
        return this.config.translation ? this.config.translation.aria.filterOperator : undefined;
    }
    get filterConstraintAriaLabel() {
        return this.config.translation ? this.config.translation.aria.filterConstraint : undefined;
    }
    constructor(document, el, dt, renderer, config, overlayService, cd) {
        this.document = document;
        this.el = el;
        this.dt = dt;
        this.renderer = renderer;
        this.config = config;
        this.overlayService = overlayService;
        this.cd = cd;
        this.window = this.document.defaultView;
    }
    ngOnInit() {
        this.overlayId = UniqueComponentId();
        if (!this.dt.filters[this.field]) {
            this.initFieldFilterConstraint();
        }
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.generateMatchModeOptions();
            this.generateOperatorOptions();
        });
        this.generateMatchModeOptions();
        this.generateOperatorOptions();
    }
    generateMatchModeOptions() {
        this.matchModes =
            this.matchModeOptions ||
                this.config.filterMatchModeOptions[this.type]?.map((key) => {
                    return { label: this.config.getTranslation(key), value: key };
                });
    }
    generateOperatorOptions() {
        this.operatorOptions = [
            { label: this.config.getTranslation(TranslationKeys.MATCH_ALL), value: FilterOperator.AND },
            { label: this.config.getTranslation(TranslationKeys.MATCH_ANY), value: FilterOperator.OR }
        ];
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'filter':
                    this.filterTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'filtericon':
                    this.filterIconTemplate = item.template;
                    break;
                case 'clearfiltericon':
                    this.clearFilterIconTemplate = item.template;
                    break;
                case 'removeruleicon':
                    this.removeRuleIconTemplate = item.template;
                    break;
                case 'addruleicon':
                    this.addRuleIconTemplate = item.template;
                    break;
                default:
                    this.filterTemplate = item.template;
                    break;
            }
        });
    }
    initFieldFilterConstraint() {
        let defaultMatchMode = this.getDefaultMatchMode();
        this.dt.filters[this.field] = this.display == 'row' ? { value: null, matchMode: defaultMatchMode } : [{ value: null, matchMode: defaultMatchMode, operator: this.operator }];
    }
    onMenuMatchModeChange(value, filterMeta) {
        filterMeta.matchMode = value;
        if (!this.showApplyButton) {
            this.dt._filter();
        }
    }
    onRowMatchModeChange(matchMode) {
        this.dt.filters[this.field].matchMode = matchMode;
        this.dt._filter();
        this.hide();
    }
    onRowMatchModeKeyDown(event) {
        let item = event.target;
        switch (event.key) {
            case 'ArrowDown':
                var nextItem = this.findNextItem(item);
                if (nextItem) {
                    item.removeAttribute('tabindex');
                    nextItem.tabIndex = '0';
                    nextItem.focus();
                }
                event.preventDefault();
                break;
            case 'ArrowUp':
                var prevItem = this.findPrevItem(item);
                if (prevItem) {
                    item.removeAttribute('tabindex');
                    prevItem.tabIndex = '0';
                    prevItem.focus();
                }
                event.preventDefault();
                break;
        }
    }
    onRowClearItemClick() {
        this.clearFilter();
        this.hide();
    }
    isRowMatchModeSelected(matchMode) {
        return this.dt.filters[this.field].matchMode === matchMode;
    }
    addConstraint() {
        this.dt.filters[this.field].push({ value: null, matchMode: this.getDefaultMatchMode(), operator: this.getDefaultOperator() });
        DomHandler.focus(this.clearButtonViewChild.nativeElement);
    }
    removeConstraint(filterMeta) {
        this.dt.filters[this.field] = this.dt.filters[this.field].filter((meta) => meta !== filterMeta);
        if (!this.showApplyButton) {
            this.dt._filter();
        }
        DomHandler.focus(this.clearButtonViewChild.nativeElement);
    }
    onOperatorChange(value) {
        let filter = this.dt.filters[this.field];
        if (!Array.isArray(filter))
            filter = [filter];
        filter.forEach((filterMeta) => {
            filterMeta.operator = value;
            this.operator = value;
        });
        if (!this.showApplyButton) {
            this.dt._filter();
        }
    }
    toggleMenu() {
        this.overlayVisible = !this.overlayVisible;
    }
    onToggleButtonKeyDown(event) {
        switch (event.key) {
            case 'Escape':
            case 'Tab':
                this.overlayVisible = false;
                break;
            case 'ArrowDown':
                if (this.overlayVisible) {
                    let focusable = DomHandler.getFocusableElements(this.overlay);
                    if (focusable) {
                        focusable[0].focus();
                    }
                    event.preventDefault();
                }
                else if (event.altKey) {
                    this.overlayVisible = true;
                    event.preventDefault();
                }
                break;
            case 'Enter':
                this.toggleMenu();
                event.preventDefault();
                break;
        }
    }
    onEscape() {
        this.overlayVisible = false;
        this.icon?.nativeElement.focus();
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return DomHandler.hasClass(nextItem, 'p-column-filter-separator') ? this.findNextItem(nextItem) : nextItem;
        else
            return item.parentElement?.firstElementChild;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return DomHandler.hasClass(prevItem, 'p-column-filter-separator') ? this.findPrevItem(prevItem) : prevItem;
        else
            return item.parentElement?.lastElementChild;
    }
    onContentClick() {
        this.selfClick = true;
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.renderer.appendChild(this.document.body, this.overlay);
                ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
                DomHandler.absolutePosition(this.overlay, this.icon?.nativeElement);
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                this.bindScrollListener();
                this.overlayEventListener = (e) => {
                    if (this.overlay && this.overlay.contains(e.target)) {
                        this.selfClick = true;
                    }
                };
                this.overlaySubscription = this.overlayService.clickObservable.subscribe(this.overlayEventListener);
                break;
            case 'void':
                this.onOverlayHide();
                if (this.overlaySubscription) {
                    this.overlaySubscription.unsubscribe();
                }
                break;
        }
    }
    onOverlayAnimationEnd(event) {
        switch (event.toState) {
            case 'visible':
                this.focusOnFirstElement();
                break;
            case 'void':
                ZIndexUtils.clear(event.element);
                break;
        }
    }
    focusOnFirstElement() {
        if (this.overlay) {
            DomHandler.focus(DomHandler.getFirstFocusableElement(this.overlay, ''));
        }
    }
    getDefaultMatchMode() {
        if (this.matchMode) {
            return this.matchMode;
        }
        else {
            if (this.type === 'text')
                return FilterMatchMode.STARTS_WITH;
            else if (this.type === 'numeric')
                return FilterMatchMode.EQUALS;
            else if (this.type === 'date')
                return FilterMatchMode.DATE_IS;
            else
                return FilterMatchMode.CONTAINS;
        }
    }
    getDefaultOperator() {
        return this.dt.filters ? this.dt.filters[this.field][0].operator : this.operator;
    }
    hasRowFilter() {
        return this.dt.filters[this.field] && !this.dt.isFilterBlank(this.dt.filters[this.field].value);
    }
    hasFilter() {
        let fieldFilter = this.dt.filters[this.field];
        if (fieldFilter) {
            if (Array.isArray(fieldFilter))
                return !this.dt.isFilterBlank(fieldFilter[0].value);
            else
                return !this.dt.isFilterBlank(fieldFilter.value);
        }
        return false;
    }
    isOutsideClicked(event) {
        return !(DomHandler.hasClass(this.overlay?.nextElementSibling, 'p-overlay') ||
            this.overlay?.isSameNode(event.target) ||
            this.overlay?.contains(event.target) ||
            this.icon?.nativeElement.isSameNode(event.target) ||
            this.icon?.nativeElement.contains(event.target) ||
            DomHandler.hasClass(event.target, 'p-column-filter-add-button') ||
            DomHandler.hasClass(event.target.parentElement, 'p-column-filter-add-button') ||
            DomHandler.hasClass(event.target, 'p-column-filter-remove-button') ||
            DomHandler.hasClass(event.target.parentElement, 'p-column-filter-remove-button'));
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.documentClickListener = this.renderer.listen(documentTarget, 'mousedown', (event) => {
                const dialogElements = document.querySelectorAll('[role="dialog"]');
                const targetIsColumnFilterMenuButton = event.target.closest('.p-column-filter-menu-button');
                if (this.overlayVisible && this.isOutsideClicked(event) && (targetIsColumnFilterMenuButton || dialogElements?.length <= 1)) {
                    this.hide();
                }
                this.selfClick = false;
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
            this.selfClick = false;
        }
    }
    bindDocumentResizeListener() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = this.renderer.listen(this.window, 'resize', (event) => {
                if (this.overlayVisible && !DomHandler.isTouchDevice()) {
                    this.hide();
                }
            });
        }
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.icon?.nativeElement, () => {
                if (this.overlayVisible) {
                    this.hide();
                }
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    hide() {
        this.overlayVisible = false;
        this.cd.markForCheck();
    }
    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.overlay = null;
    }
    clearFilter() {
        this.initFieldFilterConstraint();
        this.dt._filter();
        if (this.hideOnClear)
            this.hide();
    }
    applyFilter() {
        this.dt._filter();
        this.hide();
    }
    ngOnDestroy() {
        if (this.overlay) {
            this.renderer.appendChild(this.el.nativeElement, this.overlay);
            ZIndexUtils.clear(this.overlay);
            this.onOverlayHide();
        }
        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
        if (this.resetSubscription) {
            this.resetSubscription.unsubscribe();
        }
        if (this.overlaySubscription) {
            this.overlaySubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ColumnFilter, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: Table }, { token: i0.Renderer2 }, { token: i1.PrimeNGConfig }, { token: i1.OverlayService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: ColumnFilter, selector: "p-columnFilter", inputs: { field: "field", type: "type", display: "display", showMenu: ["showMenu", "showMenu", booleanAttribute], matchMode: "matchMode", operator: "operator", showOperator: ["showOperator", "showOperator", booleanAttribute], showClearButton: ["showClearButton", "showClearButton", booleanAttribute], showApplyButton: ["showApplyButton", "showApplyButton", booleanAttribute], showMatchModes: ["showMatchModes", "showMatchModes", booleanAttribute], showAddButton: ["showAddButton", "showAddButton", booleanAttribute], hideOnClear: ["hideOnClear", "hideOnClear", booleanAttribute], placeholder: "placeholder", matchModeOptions: "matchModeOptions", maxConstraints: ["maxConstraints", "maxConstraints", numberAttribute], minFractionDigits: ["minFractionDigits", "minFractionDigits", (value) => numberAttribute(value, null)], maxFractionDigits: ["maxFractionDigits", "maxFractionDigits", (value) => numberAttribute(value, null)], prefix: "prefix", suffix: "suffix", locale: "locale", localeMatcher: "localeMatcher", currency: "currency", currencyDisplay: "currencyDisplay", useGrouping: ["useGrouping", "useGrouping", booleanAttribute], showButtons: ["showButtons", "showButtons", booleanAttribute], ariaLabel: "ariaLabel" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "icon", first: true, predicate: ["icon"], descendants: true }, { propertyName: "clearButtonViewChild", first: true, predicate: ["clearBtn"], descendants: true }], ngImport: i0, template: `
        <div class="p-column-filter" [ngClass]="{ 'p-column-filter-row': display === 'row', 'p-column-filter-menu': display === 'menu' }">
            <p-columnFilterFormElement
                *ngIf="display === 'row'"
                class="p-fluid"
                [type]="type"
                [field]="field"
                [ariaLabel]="ariaLabel"
                [filterConstraint]="dt.filters[field]"
                [filterTemplate]="filterTemplate"
                [placeholder]="placeholder"
                [minFractionDigits]="minFractionDigits"
                [maxFractionDigits]="maxFractionDigits"
                [prefix]="prefix"
                [suffix]="suffix"
                [locale]="locale"
                [localeMatcher]="localeMatcher"
                [currency]="currency"
                [currencyDisplay]="currencyDisplay"
                [useGrouping]="useGrouping"
                [showButtons]="showButtons"
            ></p-columnFilterFormElement>
            <button
                #icon
                *ngIf="showMenuButton"
                type="button"
                class="p-column-filter-menu-button p-link"
                aria-haspopup="true"
                [attr.aria-label]="filterMenuButtonAriaLabel"
                [attr.aria-controls]="overlayVisible ? overlayId : null"
                [attr.aria-expanded]="overlayVisible ?? false"
                [ngClass]="{ 'p-column-filter-menu-button-open': overlayVisible, 'p-column-filter-menu-button-active': hasFilter() }"
                (click)="toggleMenu()"
                (keydown)="onToggleButtonKeyDown($event)"
            >
                <FilterIcon [styleClass]="'pi-filter-icon'" *ngIf="!filterIconTemplate" />
                <span class="pi-filter-icon" *ngIf="filterIconTemplate">
                    <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                </span>
            </button>
            <button #icon *ngIf="showClearButton && display === 'row'" [ngClass]="{ 'p-hidden-space': !hasRowFilter() }" type="button" class="p-column-filter-clear-button p-link" (click)="clearFilter()" [attr.aria-label]="clearButtonLabel">
                <FilterSlashIcon *ngIf="!clearFilterIconTemplate" />
                <ng-template *ngTemplateOutlet="clearFilterIconTemplate"></ng-template>
            </button>
            <div
                *ngIf="showMenu && overlayVisible"
                [ngClass]="{ 'p-column-filter-overlay p-component p-fluid': true, 'p-column-filter-overlay-menu': display === 'menu' }"
                [id]="overlayId"
                [attr.aria-modal]="true"
                role="dialog"
                (click)="onContentClick()"
                [@overlayAnimation]="'visible'"
                (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
                (keydown.escape)="onEscape()"
            >
                <ng-container *ngTemplateOutlet="headerTemplate; context: { $implicit: field }"></ng-container>
                <ul *ngIf="display === 'row'; else menu" class="p-column-filter-row-items">
                    <li
                        class="p-column-filter-row-item"
                        *ngFor="let matchMode of matchModes; let i = index"
                        (click)="onRowMatchModeChange(matchMode.value)"
                        (keydown)="onRowMatchModeKeyDown($event)"
                        (keydown.enter)="this.onRowMatchModeChange(matchMode.value)"
                        [ngClass]="{ 'p-highlight': isRowMatchModeSelected(matchMode.value) }"
                        [attr.tabindex]="i === 0 ? '0' : null"
                    >
                        {{ matchMode.label }}
                    </li>
                    <li class="p-column-filter-separator"></li>
                    <li class="p-column-filter-row-item" (click)="onRowClearItemClick()" (keydown)="onRowMatchModeKeyDown($event)" (keydown.enter)="onRowClearItemClick()">{{ noFilterLabel }}</li>
                </ul>
                <ng-template #menu>
                    <div class="p-column-filter-operator" *ngIf="isShowOperator">
                        <p-dropdown [options]="operatorOptions" [ngModel]="operator" (ngModelChange)="onOperatorChange($event)" styleClass="p-column-filter-operator-dropdown"></p-dropdown>
                    </div>
                    <div class="p-column-filter-constraints">
                        <div *ngFor="let fieldConstraint of fieldConstraints; let i = index" class="p-column-filter-constraint">
                            <p-dropdown
                                *ngIf="showMatchModes && matchModes"
                                [options]="matchModes"
                                [ngModel]="fieldConstraint.matchMode"
                                (ngModelChange)="onMenuMatchModeChange($event, fieldConstraint)"
                                styleClass="p-column-filter-matchmode-dropdown"
                            ></p-dropdown>
                            <p-columnFilterFormElement
                                [type]="type"
                                [field]="field"
                                [filterConstraint]="fieldConstraint"
                                [filterTemplate]="filterTemplate"
                                [placeholder]="placeholder"
                                [minFractionDigits]="minFractionDigits"
                                [maxFractionDigits]="maxFractionDigits"
                                [prefix]="prefix"
                                [suffix]="suffix"
                                [locale]="locale"
                                [localeMatcher]="localeMatcher"
                                [currency]="currency"
                                [currencyDisplay]="currencyDisplay"
                                [useGrouping]="useGrouping"
                            ></p-columnFilterFormElement>
                            <div>
                                <button
                                    *ngIf="showRemoveIcon"
                                    type="button"
                                    pButton
                                    class="p-column-filter-remove-button p-button-text p-button-danger p-button-sm"
                                    (click)="removeConstraint(fieldConstraint)"
                                    pRipple
                                    [attr.aria-label]="removeRuleButtonLabel"
                                    [label]="removeRuleButtonLabel"
                                >
                                    <TrashIcon *ngIf="!removeRuleIconTemplate" [styleClass]="'p-button-icon-left'" />
                                    <ng-template *ngTemplateOutlet="removeRuleIconTemplate"></ng-template>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="p-column-filter-add-rule" *ngIf="isShowAddConstraint">
                        <button type="button" pButton [label]="addRuleButtonLabel" [attr.aria-label]="addRuleButtonLabel" class="p-column-filter-add-button p-button-text p-button-sm" (click)="addConstraint()" pRipple>
                            <PlusIcon *ngIf="!addRuleIconTemplate" [styleClass]="'p-button-icon-left'" />
                            <ng-template *ngTemplateOutlet="addRuleIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-column-filter-buttonbar">
                        <button #clearBtn *ngIf="showClearButton" type="button" pButton class="p-button-outlined p-button-sm" (click)="clearFilter()" [attr.aria-label]="clearButtonLabel" [label]="clearButtonLabel" pRipple></button>
                        <button *ngIf="showApplyButton" type="button" pButton (click)="applyFilter()" class="p-button-sm" [label]="applyButtonLabel" pRipple [attr.aria-label]="applyButtonLabel"></button>
                    </div>
                </ng-template>
                <ng-container *ngTemplateOutlet="footerTemplate; context: { $implicit: field }"></ng-container>
            </div>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i0.forwardRef(() => i5.Dropdown), selector: "p-dropdown", inputs: ["id", "scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "dataKey", "filterBy", "filterFields", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "focusOnHover", "selectOnFocus", "autoOptionFocus", "autofocusFilter", "disabled", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "filterValue", "options"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear", "onLazyLoad"] }, { kind: "directive", type: i0.forwardRef(() => i6.NgControlStatus), selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i0.forwardRef(() => i6.NgModel), selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i0.forwardRef(() => i7.ButtonDirective), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading", "severity", "raised", "rounded", "text", "outlined", "size", "plain"] }, { kind: "component", type: i0.forwardRef(() => FilterIcon), selector: "FilterIcon" }, { kind: "component", type: i0.forwardRef(() => FilterSlashIcon), selector: "FilterSlashIcon" }, { kind: "component", type: i0.forwardRef(() => PlusIcon), selector: "PlusIcon" }, { kind: "component", type: i0.forwardRef(() => TrashIcon), selector: "TrashIcon" }, { kind: "component", type: i0.forwardRef(() => ColumnFilterFormElement), selector: "p-columnFilterFormElement", inputs: ["field", "type", "filterConstraint", "filterTemplate", "placeholder", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "locale", "localeMatcher", "currency", "currencyDisplay", "useGrouping", "ariaLabel"] }], animations: [trigger('overlayAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('.12s cubic-bezier(0, 0, 0.2, 1)')]), transition(':leave', [animate('.1s linear', style({ opacity: 0 }))])])], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ColumnFilter, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-columnFilter',
                    template: `
        <div class="p-column-filter" [ngClass]="{ 'p-column-filter-row': display === 'row', 'p-column-filter-menu': display === 'menu' }">
            <p-columnFilterFormElement
                *ngIf="display === 'row'"
                class="p-fluid"
                [type]="type"
                [field]="field"
                [ariaLabel]="ariaLabel"
                [filterConstraint]="dt.filters[field]"
                [filterTemplate]="filterTemplate"
                [placeholder]="placeholder"
                [minFractionDigits]="minFractionDigits"
                [maxFractionDigits]="maxFractionDigits"
                [prefix]="prefix"
                [suffix]="suffix"
                [locale]="locale"
                [localeMatcher]="localeMatcher"
                [currency]="currency"
                [currencyDisplay]="currencyDisplay"
                [useGrouping]="useGrouping"
                [showButtons]="showButtons"
            ></p-columnFilterFormElement>
            <button
                #icon
                *ngIf="showMenuButton"
                type="button"
                class="p-column-filter-menu-button p-link"
                aria-haspopup="true"
                [attr.aria-label]="filterMenuButtonAriaLabel"
                [attr.aria-controls]="overlayVisible ? overlayId : null"
                [attr.aria-expanded]="overlayVisible ?? false"
                [ngClass]="{ 'p-column-filter-menu-button-open': overlayVisible, 'p-column-filter-menu-button-active': hasFilter() }"
                (click)="toggleMenu()"
                (keydown)="onToggleButtonKeyDown($event)"
            >
                <FilterIcon [styleClass]="'pi-filter-icon'" *ngIf="!filterIconTemplate" />
                <span class="pi-filter-icon" *ngIf="filterIconTemplate">
                    <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                </span>
            </button>
            <button #icon *ngIf="showClearButton && display === 'row'" [ngClass]="{ 'p-hidden-space': !hasRowFilter() }" type="button" class="p-column-filter-clear-button p-link" (click)="clearFilter()" [attr.aria-label]="clearButtonLabel">
                <FilterSlashIcon *ngIf="!clearFilterIconTemplate" />
                <ng-template *ngTemplateOutlet="clearFilterIconTemplate"></ng-template>
            </button>
            <div
                *ngIf="showMenu && overlayVisible"
                [ngClass]="{ 'p-column-filter-overlay p-component p-fluid': true, 'p-column-filter-overlay-menu': display === 'menu' }"
                [id]="overlayId"
                [attr.aria-modal]="true"
                role="dialog"
                (click)="onContentClick()"
                [@overlayAnimation]="'visible'"
                (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
                (keydown.escape)="onEscape()"
            >
                <ng-container *ngTemplateOutlet="headerTemplate; context: { $implicit: field }"></ng-container>
                <ul *ngIf="display === 'row'; else menu" class="p-column-filter-row-items">
                    <li
                        class="p-column-filter-row-item"
                        *ngFor="let matchMode of matchModes; let i = index"
                        (click)="onRowMatchModeChange(matchMode.value)"
                        (keydown)="onRowMatchModeKeyDown($event)"
                        (keydown.enter)="this.onRowMatchModeChange(matchMode.value)"
                        [ngClass]="{ 'p-highlight': isRowMatchModeSelected(matchMode.value) }"
                        [attr.tabindex]="i === 0 ? '0' : null"
                    >
                        {{ matchMode.label }}
                    </li>
                    <li class="p-column-filter-separator"></li>
                    <li class="p-column-filter-row-item" (click)="onRowClearItemClick()" (keydown)="onRowMatchModeKeyDown($event)" (keydown.enter)="onRowClearItemClick()">{{ noFilterLabel }}</li>
                </ul>
                <ng-template #menu>
                    <div class="p-column-filter-operator" *ngIf="isShowOperator">
                        <p-dropdown [options]="operatorOptions" [ngModel]="operator" (ngModelChange)="onOperatorChange($event)" styleClass="p-column-filter-operator-dropdown"></p-dropdown>
                    </div>
                    <div class="p-column-filter-constraints">
                        <div *ngFor="let fieldConstraint of fieldConstraints; let i = index" class="p-column-filter-constraint">
                            <p-dropdown
                                *ngIf="showMatchModes && matchModes"
                                [options]="matchModes"
                                [ngModel]="fieldConstraint.matchMode"
                                (ngModelChange)="onMenuMatchModeChange($event, fieldConstraint)"
                                styleClass="p-column-filter-matchmode-dropdown"
                            ></p-dropdown>
                            <p-columnFilterFormElement
                                [type]="type"
                                [field]="field"
                                [filterConstraint]="fieldConstraint"
                                [filterTemplate]="filterTemplate"
                                [placeholder]="placeholder"
                                [minFractionDigits]="minFractionDigits"
                                [maxFractionDigits]="maxFractionDigits"
                                [prefix]="prefix"
                                [suffix]="suffix"
                                [locale]="locale"
                                [localeMatcher]="localeMatcher"
                                [currency]="currency"
                                [currencyDisplay]="currencyDisplay"
                                [useGrouping]="useGrouping"
                            ></p-columnFilterFormElement>
                            <div>
                                <button
                                    *ngIf="showRemoveIcon"
                                    type="button"
                                    pButton
                                    class="p-column-filter-remove-button p-button-text p-button-danger p-button-sm"
                                    (click)="removeConstraint(fieldConstraint)"
                                    pRipple
                                    [attr.aria-label]="removeRuleButtonLabel"
                                    [label]="removeRuleButtonLabel"
                                >
                                    <TrashIcon *ngIf="!removeRuleIconTemplate" [styleClass]="'p-button-icon-left'" />
                                    <ng-template *ngTemplateOutlet="removeRuleIconTemplate"></ng-template>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="p-column-filter-add-rule" *ngIf="isShowAddConstraint">
                        <button type="button" pButton [label]="addRuleButtonLabel" [attr.aria-label]="addRuleButtonLabel" class="p-column-filter-add-button p-button-text p-button-sm" (click)="addConstraint()" pRipple>
                            <PlusIcon *ngIf="!addRuleIconTemplate" [styleClass]="'p-button-icon-left'" />
                            <ng-template *ngTemplateOutlet="addRuleIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-column-filter-buttonbar">
                        <button #clearBtn *ngIf="showClearButton" type="button" pButton class="p-button-outlined p-button-sm" (click)="clearFilter()" [attr.aria-label]="clearButtonLabel" [label]="clearButtonLabel" pRipple></button>
                        <button *ngIf="showApplyButton" type="button" pButton (click)="applyFilter()" class="p-button-sm" [label]="applyButtonLabel" pRipple [attr.aria-label]="applyButtonLabel"></button>
                    </div>
                </ng-template>
                <ng-container *ngTemplateOutlet="footerTemplate; context: { $implicit: field }"></ng-container>
            </div>
        </div>
    `,
                    animations: [trigger('overlayAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('.12s cubic-bezier(0, 0, 0.2, 1)')]), transition(':leave', [animate('.1s linear', style({ opacity: 0 }))])])],
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: Table }, { type: i0.Renderer2 }, { type: i1.PrimeNGConfig }, { type: i1.OverlayService }, { type: i0.ChangeDetectorRef }], propDecorators: { field: [{
                type: Input
            }], type: [{
                type: Input
            }], display: [{
                type: Input
            }], showMenu: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], matchMode: [{
                type: Input
            }], operator: [{
                type: Input
            }], showOperator: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showClearButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showApplyButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showMatchModes: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showAddButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], hideOnClear: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], placeholder: [{
                type: Input
            }], matchModeOptions: [{
                type: Input
            }], maxConstraints: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], minFractionDigits: [{
                type: Input,
                args: [{ transform: (value) => numberAttribute(value, null) }]
            }], maxFractionDigits: [{
                type: Input,
                args: [{ transform: (value) => numberAttribute(value, null) }]
            }], prefix: [{
                type: Input
            }], suffix: [{
                type: Input
            }], locale: [{
                type: Input
            }], localeMatcher: [{
                type: Input
            }], currency: [{
                type: Input
            }], currencyDisplay: [{
                type: Input
            }], useGrouping: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showButtons: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], ariaLabel: [{
                type: Input
            }], icon: [{
                type: ViewChild,
                args: ['icon']
            }], clearButtonViewChild: [{
                type: ViewChild,
                args: ['clearBtn']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ColumnFilterFormElement {
    dt;
    colFilter;
    field;
    type;
    filterConstraint;
    filterTemplate;
    placeholder;
    minFractionDigits;
    maxFractionDigits;
    prefix;
    suffix;
    locale;
    localeMatcher;
    currency;
    currencyDisplay;
    useGrouping = true;
    ariaLabel;
    get showButtons() {
        return this.colFilter.showButtons;
    }
    filterCallback;
    constructor(dt, colFilter) {
        this.dt = dt;
        this.colFilter = colFilter;
    }
    ngOnInit() {
        this.filterCallback = (value) => {
            this.filterConstraint.value = value;
            this.dt._filter();
        };
    }
    onModelChange(value) {
        this.filterConstraint.value = value;
        if (this.type === 'date' || this.type === 'boolean' || value === '') {
            this.dt._filter();
        }
    }
    onTextInputEnterKeyDown(event) {
        this.dt._filter();
        event.preventDefault();
    }
    onNumericInputKeyDown(event) {
        if (event.key === 'Enter') {
            this.dt._filter();
            event.preventDefault();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ColumnFilterFormElement, deps: [{ token: Table }, { token: ColumnFilter }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: ColumnFilterFormElement, selector: "p-columnFilterFormElement", inputs: { field: "field", type: "type", filterConstraint: "filterConstraint", filterTemplate: "filterTemplate", placeholder: "placeholder", minFractionDigits: ["minFractionDigits", "minFractionDigits", (value) => numberAttribute(value, null)], maxFractionDigits: ["maxFractionDigits", "maxFractionDigits", (value) => numberAttribute(value, null)], prefix: "prefix", suffix: "suffix", locale: "locale", localeMatcher: "localeMatcher", currency: "currency", currencyDisplay: "currencyDisplay", useGrouping: ["useGrouping", "useGrouping", booleanAttribute], ariaLabel: "ariaLabel" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <ng-container *ngIf="filterTemplate; else builtInElement">
            <ng-container
                *ngTemplateOutlet="
                    filterTemplate;
                    context: {
                        $implicit: filterConstraint.value,
                        filterCallback: filterCallback,
                        type: type,
                        field: field,
                        filterConstraint: filterConstraint,
                        placeholder: placeholder,
                        minFractionDigits: minFractionDigits,
                        maxFractionDigits: maxFractionDigits,
                        prefix: prefix,
                        suffix: suffix,
                        locale: locale,
                        localeMatcher: localeMatcher,
                        currency: currency,
                        currencyDisplay: currencyDisplay,
                        useGrouping: useGrouping,
                        showButtons: showButtons
                    }
                "
            ></ng-container>
        </ng-container>
        <ng-template #builtInElement>
            <ng-container [ngSwitch]="type">
                <input
                    *ngSwitchCase="'text'"
                    type="text"
                    [ariaLabel]="ariaLabel"
                    pInputText
                    [value]="filterConstraint?.value"
                    (input)="onModelChange($event.target.value)"
                    (keydown.enter)="onTextInputEnterKeyDown($event)"
                    [attr.placeholder]="placeholder"
                />
                <p-inputNumber
                    *ngSwitchCase="'numeric'"
                    [ngModel]="filterConstraint?.value"
                    (ngModelChange)="onModelChange($event)"
                    (onKeyDown)="onNumericInputKeyDown($event)"
                    [showButtons]="showButtons"
                    [minFractionDigits]="minFractionDigits"
                    [maxFractionDigits]="maxFractionDigits"
                    [ariaLabel]="ariaLabel"
                    [prefix]="prefix"
                    [suffix]="suffix"
                    [placeholder]="placeholder"
                    [mode]="currency ? 'currency' : 'decimal'"
                    [locale]="locale"
                    [localeMatcher]="localeMatcher"
                    [currency]="currency"
                    [currencyDisplay]="currencyDisplay"
                    [useGrouping]="useGrouping"
                ></p-inputNumber>
                <p-triStateCheckbox [ariaLabel]="ariaLabel" *ngSwitchCase="'boolean'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-triStateCheckbox>
                <p-calendar [ariaLabel]="ariaLabel" *ngSwitchCase="'date'" [placeholder]="placeholder" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)" appendTo="body"></p-calendar>
            </ng-container>
        </ng-template>
    `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i8.InputNumber, selector: "p-inputNumber", inputs: ["showButtons", "format", "buttonLayout", "inputId", "styleClass", "style", "placeholder", "size", "maxlength", "tabindex", "title", "ariaLabelledBy", "ariaLabel", "ariaRequired", "name", "required", "autocomplete", "min", "max", "incrementButtonClass", "decrementButtonClass", "incrementButtonIcon", "decrementButtonIcon", "readonly", "step", "allowEmpty", "locale", "localeMatcher", "mode", "currency", "currencyDisplay", "useGrouping", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "inputStyle", "inputStyleClass", "showClear", "autofocus", "disabled"], outputs: ["onInput", "onFocus", "onBlur", "onKeyDown", "onClear"] }, { kind: "directive", type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i9.InputText, selector: "[pInputText]" }, { kind: "component", type: i10.Calendar, selector: "p-calendar", inputs: ["iconDisplay", "style", "styleClass", "inputStyle", "inputId", "name", "inputStyleClass", "placeholder", "ariaLabelledBy", "ariaLabel", "iconAriaLabel", "disabled", "dateFormat", "multipleSeparator", "rangeSeparator", "inline", "showOtherMonths", "selectOtherMonths", "showIcon", "icon", "appendTo", "readonlyInput", "shortYearCutoff", "monthNavigator", "yearNavigator", "hourFormat", "timeOnly", "stepHour", "stepMinute", "stepSecond", "showSeconds", "required", "showOnFocus", "showWeek", "startWeekFromFirstDayOfYear", "showClear", "dataType", "selectionMode", "maxDateCount", "showButtonBar", "todayButtonStyleClass", "clearButtonStyleClass", "autofocus", "autoZIndex", "baseZIndex", "panelStyleClass", "panelStyle", "keepInvalid", "hideOnDateTimeSelect", "touchUI", "timeSeparator", "focusTrap", "showTransitionOptions", "hideTransitionOptions", "tabindex", "minDate", "maxDate", "disabledDates", "disabledDays", "yearRange", "showTime", "responsiveOptions", "numberOfMonths", "firstDayOfWeek", "locale", "view", "defaultDate"], outputs: ["onFocus", "onBlur", "onClose", "onSelect", "onClear", "onInput", "onTodayClick", "onClearClick", "onMonthChange", "onYearChange", "onClickOutside", "onShow"] }, { kind: "component", type: i11.TriStateCheckbox, selector: "p-triStateCheckbox", inputs: ["disabled", "name", "ariaLabel", "ariaLabelledBy", "tabindex", "inputId", "style", "styleClass", "label", "readonly", "checkboxTrueIcon", "checkboxFalseIcon", "autofocus"], outputs: ["onChange"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ColumnFilterFormElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-columnFilterFormElement',
                    template: `
        <ng-container *ngIf="filterTemplate; else builtInElement">
            <ng-container
                *ngTemplateOutlet="
                    filterTemplate;
                    context: {
                        $implicit: filterConstraint.value,
                        filterCallback: filterCallback,
                        type: type,
                        field: field,
                        filterConstraint: filterConstraint,
                        placeholder: placeholder,
                        minFractionDigits: minFractionDigits,
                        maxFractionDigits: maxFractionDigits,
                        prefix: prefix,
                        suffix: suffix,
                        locale: locale,
                        localeMatcher: localeMatcher,
                        currency: currency,
                        currencyDisplay: currencyDisplay,
                        useGrouping: useGrouping,
                        showButtons: showButtons
                    }
                "
            ></ng-container>
        </ng-container>
        <ng-template #builtInElement>
            <ng-container [ngSwitch]="type">
                <input
                    *ngSwitchCase="'text'"
                    type="text"
                    [ariaLabel]="ariaLabel"
                    pInputText
                    [value]="filterConstraint?.value"
                    (input)="onModelChange($event.target.value)"
                    (keydown.enter)="onTextInputEnterKeyDown($event)"
                    [attr.placeholder]="placeholder"
                />
                <p-inputNumber
                    *ngSwitchCase="'numeric'"
                    [ngModel]="filterConstraint?.value"
                    (ngModelChange)="onModelChange($event)"
                    (onKeyDown)="onNumericInputKeyDown($event)"
                    [showButtons]="showButtons"
                    [minFractionDigits]="minFractionDigits"
                    [maxFractionDigits]="maxFractionDigits"
                    [ariaLabel]="ariaLabel"
                    [prefix]="prefix"
                    [suffix]="suffix"
                    [placeholder]="placeholder"
                    [mode]="currency ? 'currency' : 'decimal'"
                    [locale]="locale"
                    [localeMatcher]="localeMatcher"
                    [currency]="currency"
                    [currencyDisplay]="currencyDisplay"
                    [useGrouping]="useGrouping"
                ></p-inputNumber>
                <p-triStateCheckbox [ariaLabel]="ariaLabel" *ngSwitchCase="'boolean'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-triStateCheckbox>
                <p-calendar [ariaLabel]="ariaLabel" *ngSwitchCase="'date'" [placeholder]="placeholder" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)" appendTo="body"></p-calendar>
            </ng-container>
        </ng-template>
    `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: ColumnFilter }], propDecorators: { field: [{
                type: Input
            }], type: [{
                type: Input
            }], filterConstraint: [{
                type: Input
            }], filterTemplate: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], minFractionDigits: [{
                type: Input,
                args: [{ transform: (value) => numberAttribute(value, null) }]
            }], maxFractionDigits: [{
                type: Input,
                args: [{ transform: (value) => numberAttribute(value, null) }]
            }], prefix: [{
                type: Input
            }], suffix: [{
                type: Input
            }], locale: [{
                type: Input
            }], localeMatcher: [{
                type: Input
            }], currency: [{
                type: Input
            }], currencyDisplay: [{
                type: Input
            }], useGrouping: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], ariaLabel: [{
                type: Input
            }] } });
export class TableModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: TableModule, declarations: [Table, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, TableBody, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ColumnFilter, ColumnFilterFormElement], imports: [CommonModule,
            PaginatorModule,
            InputTextModule,
            DropdownModule,
            FormsModule,
            ButtonModule,
            SelectButtonModule,
            CalendarModule,
            InputNumberModule,
            TriStateCheckboxModule,
            ScrollerModule,
            ArrowDownIcon,
            ArrowUpIcon,
            SpinnerIcon,
            SortAltIcon,
            SortAmountUpAltIcon,
            SortAmountDownIcon,
            CheckIcon,
            FilterIcon,
            FilterSlashIcon,
            PlusIcon,
            TrashIcon], exports: [Table, SharedModule, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ColumnFilter, ColumnFilterFormElement, ScrollerModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TableModule, imports: [CommonModule,
            PaginatorModule,
            InputTextModule,
            DropdownModule,
            FormsModule,
            ButtonModule,
            SelectButtonModule,
            CalendarModule,
            InputNumberModule,
            TriStateCheckboxModule,
            ScrollerModule,
            ArrowDownIcon,
            ArrowUpIcon,
            SpinnerIcon,
            SortAltIcon,
            SortAmountUpAltIcon,
            SortAmountDownIcon,
            CheckIcon,
            FilterIcon,
            FilterSlashIcon,
            PlusIcon,
            TrashIcon, SharedModule,
            ScrollerModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        PaginatorModule,
                        InputTextModule,
                        DropdownModule,
                        FormsModule,
                        ButtonModule,
                        SelectButtonModule,
                        CalendarModule,
                        InputNumberModule,
                        TriStateCheckboxModule,
                        ScrollerModule,
                        ArrowDownIcon,
                        ArrowUpIcon,
                        SpinnerIcon,
                        SortAltIcon,
                        SortAmountUpAltIcon,
                        SortAmountDownIcon,
                        CheckIcon,
                        FilterIcon,
                        FilterSlashIcon,
                        PlusIcon,
                        TrashIcon
                    ],
                    exports: [
                        Table,
                        SharedModule,
                        SortableColumn,
                        FrozenColumn,
                        RowGroupHeader,
                        SelectableRow,
                        RowToggler,
                        ContextMenuRow,
                        ResizableColumn,
                        ReorderableColumn,
                        EditableColumn,
                        CellEditor,
                        SortIcon,
                        TableRadioButton,
                        TableCheckbox,
                        TableHeaderCheckbox,
                        ReorderableRowHandle,
                        ReorderableRow,
                        SelectableRowDblClick,
                        EditableRow,
                        InitEditableRow,
                        SaveEditableRow,
                        CancelEditableRow,
                        ColumnFilter,
                        ColumnFilterFormElement,
                        ScrollerModule
                    ],
                    declarations: [
                        Table,
                        SortableColumn,
                        FrozenColumn,
                        RowGroupHeader,
                        SelectableRow,
                        RowToggler,
                        ContextMenuRow,
                        ResizableColumn,
                        ReorderableColumn,
                        EditableColumn,
                        CellEditor,
                        TableBody,
                        SortIcon,
                        TableRadioButton,
                        TableCheckbox,
                        TableHeaderCheckbox,
                        ReorderableRowHandle,
                        ReorderableRow,
                        SelectableRowDblClick,
                        EditableRow,
                        InitEditableRow,
                        SaveEditableRow,
                        CancelEditableRow,
                        ColumnFilter,
                        ColumnFilterFormElement
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvdGFibGUvdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBa0IsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVFLE9BQU8sRUFHSCxnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUVULFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLFVBQVUsRUFDVixLQUFLLEVBQ0wsUUFBUSxFQUVSLGVBQWUsRUFJZixRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFLWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQWUsZUFBZSxFQUFrQixjQUFjLEVBQThELGFBQWEsRUFBK0IsWUFBWSxFQUF3QixlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeFAsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFB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O3dCQUNqQixZQUFZO3dCQUNaLHVCQUF1Qjt3QkFDdkIsY0FBYztxQkFDakI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLEtBQUs7d0JBQ0wsY0FBYzt3QkFDZCxZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixVQUFVO3dCQUNWLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixpQkFBaUI7d0JBQ2pCLGNBQWM7d0JBQ2QsVUFBVTt3QkFDVixTQUFTO3dCQUNULFFBQVE7d0JBQ1IsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLG1CQUFtQjt3QkFDbkIsb0JBQW9CO3dCQUNwQixjQUFjO3dCQUNkLHFCQUFxQjt3QkFDckIsV0FBVzt3QkFDWCxlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQixZQUFZO3dCQUNaLHVCQUF1QjtxQkFDMUI7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBBbmltYXRpb25FdmVudCwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIGJvb2xlYW5BdHRyaWJ1dGUsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3RhYmxlLFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE5nWm9uZSxcbiAgICBudW1iZXJBdHRyaWJ1dGUsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFBMQVRGT1JNX0lELFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJsb2NrYWJsZVVJLCBGaWx0ZXJNYXRjaE1vZGUsIEZpbHRlck1ldGFkYXRhLCBGaWx0ZXJPcGVyYXRvciwgRmlsdGVyU2VydmljZSwgTGF6eUxvYWRNZXRhLCBPdmVybGF5U2VydmljZSwgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgU2Nyb2xsZXJPcHRpb25zLCBTZWxlY3RJdGVtLCBTaGFyZWRNb2R1bGUsIFNvcnRNZXRhLCBUYWJsZVN0YXRlLCBUcmFuc2xhdGlvbktleXMgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XG5pbXBvcnQgeyBDYWxlbmRhck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY2FsZW5kYXInO1xuaW1wb3J0IHsgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXIsIERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBEcm9wZG93bk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvZHJvcGRvd24nO1xuaW1wb3J0IHsgQXJyb3dEb3duSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYXJyb3dkb3duJztcbmltcG9ydCB7IEFycm93VXBJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hcnJvd3VwJztcbmltcG9ydCB7IENoZWNrSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hlY2snO1xuaW1wb3J0IHsgRmlsdGVySWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvZmlsdGVyJztcbmltcG9ydCB7IEZpbHRlclNsYXNoSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvZmlsdGVyc2xhc2gnO1xuaW1wb3J0IHsgUGx1c0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3BsdXMnO1xuaW1wb3J0IHsgU29ydEFsdEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3NvcnRhbHQnO1xuaW1wb3J0IHsgU29ydEFtb3VudERvd25JY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9zb3J0YW1vdW50ZG93bic7XG5pbXBvcnQgeyBTb3J0QW1vdW50VXBBbHRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9zb3J0YW1vdW50dXBhbHQnO1xuaW1wb3J0IHsgU3Bpbm5lckljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3NwaW5uZXInO1xuaW1wb3J0IHsgVHJhc2hJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy90cmFzaCc7XG5pbXBvcnQgeyBJbnB1dE51bWJlck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvaW5wdXRudW1iZXInO1xuaW1wb3J0IHsgSW5wdXRUZXh0TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9pbnB1dHRleHQnO1xuaW1wb3J0IHsgUGFnaW5hdG9yTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wYWdpbmF0b3InO1xuaW1wb3J0IHsgU2Nyb2xsZXIsIFNjcm9sbGVyTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9zY3JvbGxlcic7XG5pbXBvcnQgeyBTZWxlY3RCdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL3NlbGVjdGJ1dHRvbic7XG5pbXBvcnQgeyBUcmlTdGF0ZUNoZWNrYm94TW9kdWxlIH0gZnJvbSAncHJpbWVuZy90cmlzdGF0ZWNoZWNrYm94JztcbmltcG9ydCB7IE51bGxhYmxlLCBWb2lkTGlzdGVuZXIgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgT2JqZWN0VXRpbHMsIFVuaXF1ZUNvbXBvbmVudElkLCBaSW5kZXhVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICAgIEV4cG9ydENTVk9wdGlvbnMsXG4gICAgVGFibGVDb2xSZXNpemVFdmVudCxcbiAgICBUYWJsZUNvbHVtblJlb3JkZXJFdmVudCxcbiAgICBUYWJsZUNvbnRleHRNZW51U2VsZWN0RXZlbnQsXG4gICAgVGFibGVFZGl0Q2FuY2VsRXZlbnQsXG4gICAgVGFibGVFZGl0Q29tcGxldGVFdmVudCxcbiAgICBUYWJsZUVkaXRJbml0RXZlbnQsXG4gICAgVGFibGVGaWx0ZXJFdmVudCxcbiAgICBUYWJsZUhlYWRlckNoZWNrYm94VG9nZ2xlRXZlbnQsXG4gICAgVGFibGVMYXp5TG9hZEV2ZW50LFxuICAgIFRhYmxlUGFnZUV2ZW50LFxuICAgIFRhYmxlUm93Q29sbGFwc2VFdmVudCxcbiAgICBUYWJsZVJvd0V4cGFuZEV2ZW50LFxuICAgIFRhYmxlUm93UmVvcmRlckV2ZW50LFxuICAgIFRhYmxlUm93U2VsZWN0RXZlbnQsXG4gICAgVGFibGVSb3dVblNlbGVjdEV2ZW50LFxuICAgIFRhYmxlU2VsZWN0QWxsQ2hhbmdlRXZlbnRcbn0gZnJvbSAnLi90YWJsZS5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGFibGVTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHNvcnRTb3VyY2UgPSBuZXcgU3ViamVjdDxTb3J0TWV0YSB8IFNvcnRNZXRhW10gfCBudWxsPigpO1xuICAgIHByaXZhdGUgc2VsZWN0aW9uU291cmNlID0gbmV3IFN1YmplY3QoKTtcbiAgICBwcml2YXRlIGNvbnRleHRNZW51U291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgIHByaXZhdGUgdmFsdWVTb3VyY2UgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgcHJpdmF0ZSB0b3RhbFJlY29yZHNTb3VyY2UgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgcHJpdmF0ZSBjb2x1bW5zU291cmNlID0gbmV3IFN1YmplY3QoKTtcblxuICAgIHNvcnRTb3VyY2UkID0gdGhpcy5zb3J0U291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHNlbGVjdGlvblNvdXJjZSQgPSB0aGlzLnNlbGVjdGlvblNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICBjb250ZXh0TWVudVNvdXJjZSQgPSB0aGlzLmNvbnRleHRNZW51U291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHZhbHVlU291cmNlJCA9IHRoaXMudmFsdWVTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgdG90YWxSZWNvcmRzU291cmNlJCA9IHRoaXMudG90YWxSZWNvcmRzU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIGNvbHVtbnNTb3VyY2UkID0gdGhpcy5jb2x1bW5zU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgb25Tb3J0KHNvcnRNZXRhOiBTb3J0TWV0YSB8IFNvcnRNZXRhW10gfCBudWxsKSB7XG4gICAgICAgIHRoaXMuc29ydFNvdXJjZS5uZXh0KHNvcnRNZXRhKTtcbiAgICB9XG5cbiAgICBvblNlbGVjdGlvbkNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Tb3VyY2UubmV4dChudWxsKTtcbiAgICB9XG5cbiAgICBvbkNvbnRleHRNZW51KGRhdGE6IGFueSkge1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51U291cmNlLm5leHQoZGF0YSk7XG4gICAgfVxuXG4gICAgb25WYWx1ZUNoYW5nZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMudmFsdWVTb3VyY2UubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgb25Ub3RhbFJlY29yZHNDaGFuZ2UodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLnRvdGFsUmVjb3Jkc1NvdXJjZS5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBvbkNvbHVtbnNDaGFuZ2UoY29sdW1uczogYW55W10pIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zU291cmNlLm5leHQoY29sdW1ucyk7XG4gICAgfVxufVxuLyoqXG4gKiBUYWJsZSBkaXNwbGF5cyBkYXRhIGluIHRhYnVsYXIgZm9ybWF0LlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRhYmxlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICAjY29udGFpbmVyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJzdHlsZVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWRhdGF0YWJsZSBwLWNvbXBvbmVudCc6IHRydWUsICdwLWRhdGF0YWJsZS1ob3ZlcmFibGUtcm93cyc6IHJvd0hvdmVyIHx8IHNlbGVjdGlvbk1vZGUsICdwLWRhdGF0YWJsZS1zY3JvbGxhYmxlJzogc2Nyb2xsYWJsZSwgJ3AtZGF0YXRhYmxlLWZsZXgtc2Nyb2xsYWJsZSc6IHNjcm9sbGFibGUgJiYgc2Nyb2xsSGVpZ2h0ID09PSAnZmxleCcgfVwiXG4gICAgICAgICAgICBbYXR0ci5pZF09XCJpZFwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWRhdGF0YWJsZS1sb2FkaW5nLW92ZXJsYXkgcC1jb21wb25lbnQtb3ZlcmxheVwiICpuZ0lmPVwibG9hZGluZyAmJiBzaG93TG9hZGVyXCI+XG4gICAgICAgICAgICAgICAgPGkgKm5nSWY9XCJsb2FkaW5nSWNvblwiIFtjbGFzc109XCIncC1kYXRhdGFibGUtbG9hZGluZy1pY29uICcgKyBsb2FkaW5nSWNvblwiPjwvaT5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWxvYWRpbmdJY29uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTcGlubmVySWNvbiAqbmdJZj1cIiFsb2FkaW5nSWNvblRlbXBsYXRlXCIgW3NwaW5dPVwidHJ1ZVwiIFtzdHlsZUNsYXNzXT1cIidwLWRhdGF0YWJsZS1sb2FkaW5nLWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJsb2FkaW5nSWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWRhdGF0YWJsZS1sb2FkaW5nLWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImxvYWRpbmdJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJjYXB0aW9uVGVtcGxhdGVcIiBjbGFzcz1cInAtZGF0YXRhYmxlLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjYXB0aW9uVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHAtcGFnaW5hdG9yXG4gICAgICAgICAgICAgICAgW3Jvd3NdPVwicm93c1wiXG4gICAgICAgICAgICAgICAgW2ZpcnN0XT1cImZpcnN0XCJcbiAgICAgICAgICAgICAgICBbdG90YWxSZWNvcmRzXT1cInRvdGFsUmVjb3Jkc1wiXG4gICAgICAgICAgICAgICAgW3BhZ2VMaW5rU2l6ZV09XCJwYWdlTGlua3NcIlxuICAgICAgICAgICAgICAgIFthbHdheXNTaG93XT1cImFsd2F5c1Nob3dQYWdpbmF0b3JcIlxuICAgICAgICAgICAgICAgIChvblBhZ2VDaGFuZ2UpPVwib25QYWdlQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFtyb3dzUGVyUGFnZU9wdGlvbnNdPVwicm93c1BlclBhZ2VPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cInBhZ2luYXRvciAmJiAocGFnaW5hdG9yUG9zaXRpb24gPT09ICd0b3AnIHx8IHBhZ2luYXRvclBvc2l0aW9uID09ICdib3RoJylcIlxuICAgICAgICAgICAgICAgIFt0ZW1wbGF0ZUxlZnRdPVwicGFnaW5hdG9yTGVmdFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbdGVtcGxhdGVSaWdodF09XCJwYWdpbmF0b3JSaWdodFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbZHJvcGRvd25BcHBlbmRUb109XCJwYWdpbmF0b3JEcm9wZG93bkFwcGVuZFRvXCJcbiAgICAgICAgICAgICAgICBbZHJvcGRvd25TY3JvbGxIZWlnaHRdPVwicGFnaW5hdG9yRHJvcGRvd25TY3JvbGxIZWlnaHRcIlxuICAgICAgICAgICAgICAgIFtjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlXT1cImN1cnJlbnRQYWdlUmVwb3J0VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtzaG93Rmlyc3RMYXN0SWNvbl09XCJzaG93Rmlyc3RMYXN0SWNvblwiXG4gICAgICAgICAgICAgICAgW2Ryb3Bkb3duSXRlbVRlbXBsYXRlXT1cInBhZ2luYXRvckRyb3Bkb3duSXRlbVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbc2hvd0N1cnJlbnRQYWdlUmVwb3J0XT1cInNob3dDdXJyZW50UGFnZVJlcG9ydFwiXG4gICAgICAgICAgICAgICAgW3Nob3dKdW1wVG9QYWdlRHJvcGRvd25dPVwic2hvd0p1bXBUb1BhZ2VEcm9wZG93blwiXG4gICAgICAgICAgICAgICAgW3Nob3dKdW1wVG9QYWdlSW5wdXRdPVwic2hvd0p1bXBUb1BhZ2VJbnB1dFwiXG4gICAgICAgICAgICAgICAgW3Nob3dQYWdlTGlua3NdPVwic2hvd1BhZ2VMaW5rc1wiXG4gICAgICAgICAgICAgICAgW3N0eWxlQ2xhc3NdPVwiZ2V0UGFnaW5hdG9yU3R5bGVDbGFzc2VzKCdwLXBhZ2luYXRvci10b3AnKVwiXG4gICAgICAgICAgICAgICAgW2xvY2FsZV09XCJwYWdpbmF0b3JMb2NhbGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJkcm9wZG93bmljb25cIiAqbmdJZj1cInBhZ2luYXRvckRyb3Bkb3duSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwYWdpbmF0b3JEcm9wZG93bkljb25UZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwiZmlyc3RwYWdlbGlua2ljb25cIiAqbmdJZj1cInBhZ2luYXRvckZpcnN0UGFnZUxpbmtJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInBhZ2luYXRvckZpcnN0UGFnZUxpbmtJY29uVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cInByZXZpb3VzcGFnZWxpbmtpY29uXCIgKm5nSWY9XCJwYWdpbmF0b3JQcmV2aW91c1BhZ2VMaW5rSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwYWdpbmF0b3JQcmV2aW91c1BhZ2VMaW5rSWNvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJsYXN0cGFnZWxpbmtpY29uXCIgKm5nSWY9XCJwYWdpbmF0b3JMYXN0UGFnZUxpbmtJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInBhZ2luYXRvckxhc3RQYWdlTGlua0ljb25UZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwibmV4dHBhZ2VsaW5raWNvblwiICpuZ0lmPVwicGFnaW5hdG9yTmV4dFBhZ2VMaW5rSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwYWdpbmF0b3JOZXh0UGFnZUxpbmtJY29uVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9wLXBhZ2luYXRvcj5cblxuICAgICAgICAgICAgPGRpdiAjd3JhcHBlciBjbGFzcz1cInAtZGF0YXRhYmxlLXdyYXBwZXJcIiBbbmdTdHlsZV09XCJ7IG1heEhlaWdodDogdmlydHVhbFNjcm9sbCA/ICcnIDogc2Nyb2xsSGVpZ2h0IH1cIj5cbiAgICAgICAgICAgICAgICA8cC1zY3JvbGxlclxuICAgICAgICAgICAgICAgICAgICAjc2Nyb2xsZXJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJ2aXJ0dWFsU2Nyb2xsXCJcbiAgICAgICAgICAgICAgICAgICAgW2l0ZW1zXT1cInByb2Nlc3NlZERhdGFcIlxuICAgICAgICAgICAgICAgICAgICBbY29sdW1uc109XCJjb2x1bW5zXCJcbiAgICAgICAgICAgICAgICAgICAgW3N0eWxlXT1cInsgaGVpZ2h0OiBzY3JvbGxIZWlnaHQgIT09ICdmbGV4JyA/IHNjcm9sbEhlaWdodCA6IHVuZGVmaW5lZCB9XCJcbiAgICAgICAgICAgICAgICAgICAgW3Njcm9sbEhlaWdodF09XCJzY3JvbGxIZWlnaHQgIT09ICdmbGV4JyA/IHVuZGVmaW5lZCA6ICcxMDAlJ1wiXG4gICAgICAgICAgICAgICAgICAgIFtpdGVtU2l6ZV09XCJ2aXJ0dWFsU2Nyb2xsSXRlbVNpemUgfHwgX3ZpcnR1YWxSb3dIZWlnaHRcIlxuICAgICAgICAgICAgICAgICAgICBbc3RlcF09XCJyb3dzXCJcbiAgICAgICAgICAgICAgICAgICAgW2RlbGF5XT1cImxhenkgPyB2aXJ0dWFsU2Nyb2xsRGVsYXkgOiAwXCJcbiAgICAgICAgICAgICAgICAgICAgW2lubGluZV09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgW2xhenldPVwibGF6eVwiXG4gICAgICAgICAgICAgICAgICAgIChvbkxhenlMb2FkKT1cIm9uTGF6eUl0ZW1Mb2FkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbbG9hZGVyRGlzYWJsZWRdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtzaG93U3BhY2VyXT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgW3Nob3dMb2FkZXJdPVwibG9hZGluZ0JvZHlUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXT1cInZpcnR1YWxTY3JvbGxPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgW2F1dG9TaXplXT1cInRydWVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cImNvbnRlbnRcIiBsZXQtaXRlbXMgbGV0LXNjcm9sbGVyT3B0aW9ucz1cIm9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJidWlsZEluVGFibGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtcywgb3B0aW9uczogc2Nyb2xsZXJPcHRpb25zIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3Atc2Nyb2xsZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF2aXJ0dWFsU2Nyb2xsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJidWlsZEluVGFibGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBwcm9jZXNzZWREYXRhLCBvcHRpb25zOiB7IGNvbHVtbnMgfSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWxkSW5UYWJsZSBsZXQtaXRlbXMgbGV0LXNjcm9sbGVyT3B0aW9ucz1cIm9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAjdGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJ0YWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWRhdGF0YWJsZS10YWJsZSc6IHRydWUsICdwLWRhdGF0YWJsZS1zY3JvbGxhYmxlLXRhYmxlJzogc2Nyb2xsYWJsZSwgJ3AtZGF0YXRhYmxlLXJlc2l6YWJsZS10YWJsZSc6IHJlc2l6YWJsZUNvbHVtbnMsICdwLWRhdGF0YWJsZS1yZXNpemFibGUtdGFibGUtZml0JzogcmVzaXphYmxlQ29sdW1ucyAmJiBjb2x1bW5SZXNpemVNb2RlID09PSAnZml0JyB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJ0YWJsZVN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlXT1cInRhYmxlU3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiaWQgKyAnLXRhYmxlJ1wiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2xHcm91cFRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogc2Nyb2xsZXJPcHRpb25zLmNvbHVtbnMgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkIHJvbGU9XCJyb3dncm91cFwiICN0aGVhZCBjbGFzcz1cInAtZGF0YXRhYmxlLXRoZWFkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlckdyb3VwZWRUZW1wbGF0ZSB8fCBoZWFkZXJUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHNjcm9sbGVyT3B0aW9ucy5jb2x1bW5zIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwicm93Z3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1kYXRhdGFibGUtdGJvZHkgcC1kYXRhdGFibGUtZnJvemVuLXRib2R5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImZyb3plblZhbHVlIHx8IGZyb3plbkJvZHlUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImZyb3plblZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZnJvemVuUm93c109XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcFRhYmxlQm9keV09XCJzY3JvbGxlck9wdGlvbnMuY29sdW1uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BUYWJsZUJvZHlUZW1wbGF0ZV09XCJmcm96ZW5Cb2R5VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmcm96ZW5dPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJyb3dncm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWRhdGF0YWJsZS10Ym9keVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwic2Nyb2xsZXJPcHRpb25zLmNvbnRlbnRTdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGVdPVwic2Nyb2xsZXJPcHRpb25zLmNvbnRlbnRTdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImRhdGFUb1JlbmRlcihzY3JvbGxlck9wdGlvbnMucm93cylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwVGFibGVCb2R5XT1cInNjcm9sbGVyT3B0aW9ucy5jb2x1bW5zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcFRhYmxlQm9keVRlbXBsYXRlXT1cImJvZHlUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Njcm9sbGVyT3B0aW9uc109XCJzY3JvbGxlck9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPjwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwicm93Z3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic2Nyb2xsZXJPcHRpb25zLnNwYWNlclN0eWxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGVdPVwiJ2hlaWdodDogY2FsYygnICsgc2Nyb2xsZXJPcHRpb25zLnNwYWNlclN0eWxlLmhlaWdodCArICcgLSAnICsgc2Nyb2xsZXJPcHRpb25zLnJvd3MubGVuZ3RoICogc2Nyb2xsZXJPcHRpb25zLml0ZW1TaXplICsgJ3B4KTsnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtZGF0YXRhYmxlLXNjcm9sbGVyLXNwYWNlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Zm9vdCByb2xlPVwicm93Z3JvdXBcIiAqbmdJZj1cImZvb3Rlckdyb3VwZWRUZW1wbGF0ZSB8fCBmb290ZXJUZW1wbGF0ZVwiICN0Zm9vdCBjbGFzcz1cInAtZGF0YXRhYmxlLXRmb290XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZvb3Rlckdyb3VwZWRUZW1wbGF0ZSB8fCBmb290ZXJUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHNjcm9sbGVyT3B0aW9ucy5jb2x1bW5zIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGZvb3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8cC1wYWdpbmF0b3JcbiAgICAgICAgICAgICAgICBbcm93c109XCJyb3dzXCJcbiAgICAgICAgICAgICAgICBbZmlyc3RdPVwiZmlyc3RcIlxuICAgICAgICAgICAgICAgIFt0b3RhbFJlY29yZHNdPVwidG90YWxSZWNvcmRzXCJcbiAgICAgICAgICAgICAgICBbcGFnZUxpbmtTaXplXT1cInBhZ2VMaW5rc1wiXG4gICAgICAgICAgICAgICAgW2Fsd2F5c1Nob3ddPVwiYWx3YXlzU2hvd1BhZ2luYXRvclwiXG4gICAgICAgICAgICAgICAgKG9uUGFnZUNoYW5nZSk9XCJvblBhZ2VDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW3Jvd3NQZXJQYWdlT3B0aW9uc109XCJyb3dzUGVyUGFnZU9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwicGFnaW5hdG9yICYmIChwYWdpbmF0b3JQb3NpdGlvbiA9PT0gJ2JvdHRvbScgfHwgcGFnaW5hdG9yUG9zaXRpb24gPT0gJ2JvdGgnKVwiXG4gICAgICAgICAgICAgICAgW3RlbXBsYXRlTGVmdF09XCJwYWdpbmF0b3JMZWZ0VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFt0ZW1wbGF0ZVJpZ2h0XT1cInBhZ2luYXRvclJpZ2h0VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtkcm9wZG93bkFwcGVuZFRvXT1cInBhZ2luYXRvckRyb3Bkb3duQXBwZW5kVG9cIlxuICAgICAgICAgICAgICAgIFtkcm9wZG93blNjcm9sbEhlaWdodF09XCJwYWdpbmF0b3JEcm9wZG93blNjcm9sbEhlaWdodFwiXG4gICAgICAgICAgICAgICAgW2N1cnJlbnRQYWdlUmVwb3J0VGVtcGxhdGVdPVwiY3VycmVudFBhZ2VSZXBvcnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW3Nob3dGaXJzdExhc3RJY29uXT1cInNob3dGaXJzdExhc3RJY29uXCJcbiAgICAgICAgICAgICAgICBbZHJvcGRvd25JdGVtVGVtcGxhdGVdPVwicGFnaW5hdG9yRHJvcGRvd25JdGVtVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtzaG93Q3VycmVudFBhZ2VSZXBvcnRdPVwic2hvd0N1cnJlbnRQYWdlUmVwb3J0XCJcbiAgICAgICAgICAgICAgICBbc2hvd0p1bXBUb1BhZ2VEcm9wZG93bl09XCJzaG93SnVtcFRvUGFnZURyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICBbc2hvd0p1bXBUb1BhZ2VJbnB1dF09XCJzaG93SnVtcFRvUGFnZUlucHV0XCJcbiAgICAgICAgICAgICAgICBbc2hvd1BhZ2VMaW5rc109XCJzaG93UGFnZUxpbmtzXCJcbiAgICAgICAgICAgICAgICBbc3R5bGVDbGFzc109XCJnZXRQYWdpbmF0b3JTdHlsZUNsYXNzZXMoJ3AtcGFnaW5hdG9yLWJvdHRvbScpXCJcbiAgICAgICAgICAgICAgICBbbG9jYWxlXT1cInBhZ2luYXRvckxvY2FsZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cImRyb3Bkb3duaWNvblwiICpuZ0lmPVwicGFnaW5hdG9yRHJvcGRvd25JY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInBhZ2luYXRvckRyb3Bkb3duSWNvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJmaXJzdHBhZ2VsaW5raWNvblwiICpuZ0lmPVwicGFnaW5hdG9yRmlyc3RQYWdlTGlua0ljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwicGFnaW5hdG9yRmlyc3RQYWdlTGlua0ljb25UZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwicHJldmlvdXNwYWdlbGlua2ljb25cIiAqbmdJZj1cInBhZ2luYXRvclByZXZpb3VzUGFnZUxpbmtJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInBhZ2luYXRvclByZXZpb3VzUGFnZUxpbmtJY29uVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cImxhc3RwYWdlbGlua2ljb25cIiAqbmdJZj1cInBhZ2luYXRvckxhc3RQYWdlTGlua0ljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwicGFnaW5hdG9yTGFzdFBhZ2VMaW5rSWNvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJuZXh0cGFnZWxpbmtpY29uXCIgKm5nSWY9XCJwYWdpbmF0b3JOZXh0UGFnZUxpbmtJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInBhZ2luYXRvck5leHRQYWdlTGlua0ljb25UZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3AtcGFnaW5hdG9yPlxuXG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwic3VtbWFyeVRlbXBsYXRlXCIgY2xhc3M9XCJwLWRhdGF0YWJsZS1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic3VtbWFyeVRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiAjcmVzaXplSGVscGVyIGNsYXNzPVwicC1jb2x1bW4tcmVzaXplci1oZWxwZXJcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiICpuZ0lmPVwicmVzaXphYmxlQ29sdW1uc1wiPjwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gI3Jlb3JkZXJJbmRpY2F0b3JVcCBjbGFzcz1cInAtZGF0YXRhYmxlLXJlb3JkZXItaW5kaWNhdG9yLXVwXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiICpuZ0lmPVwicmVvcmRlcmFibGVDb2x1bW5zXCI+XG4gICAgICAgICAgICAgICAgPEFycm93RG93bkljb24gKm5nSWY9XCIhcmVvcmRlckluZGljYXRvclVwSWNvblRlbXBsYXRlXCIgLz5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJyZW9yZGVySW5kaWNhdG9yVXBJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gI3Jlb3JkZXJJbmRpY2F0b3JEb3duIGNsYXNzPVwicC1kYXRhdGFibGUtcmVvcmRlci1pbmRpY2F0b3ItZG93blwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiAqbmdJZj1cInJlb3JkZXJhYmxlQ29sdW1uc1wiPlxuICAgICAgICAgICAgICAgIDxBcnJvd1VwSWNvbiAqbmdJZj1cIiFyZW9yZGVySW5kaWNhdG9yRG93bkljb25UZW1wbGF0ZVwiIC8+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwicmVvcmRlckluZGljYXRvckRvd25JY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW1RhYmxlU2VydmljZV0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFibGUuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBCbG9ja2FibGVVSSwgT25DaGFuZ2VzIHtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBvYmplY3RzIHRvIHJlcHJlc2VudCBkeW5hbWljIGNvbHVtbnMgdGhhdCBhcmUgZnJvemVuLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZyb3plbkNvbHVtbnM6IGFueVtdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIG9iamVjdHMgdG8gZGlzcGxheSBhcyBmcm96ZW4uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZnJvemVuVmFsdWU6IGFueVtdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgdGFibGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdGFibGVTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgdGFibGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdGFibGVTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBzcGVjaWZpZWQgYXMgdHJ1ZSwgZW5hYmxlcyB0aGUgcGFnaW5hdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcGFnaW5hdG9yOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE51bWJlciBvZiBwYWdlIGxpbmtzIHRvIGRpc3BsYXkgaW4gcGFnaW5hdG9yLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHBhZ2VMaW5rczogbnVtYmVyID0gNTtcbiAgICAvKipcbiAgICAgKiBBcnJheSBvZiBpbnRlZ2VyL29iamVjdCB2YWx1ZXMgdG8gZGlzcGxheSBpbnNpZGUgcm93cyBwZXIgcGFnZSBkcm9wZG93biBvZiBwYWdpbmF0b3JcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByb3dzUGVyUGFnZU9wdGlvbnM6IGFueVtdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyBpdCBldmVuIHRoZXJlIGlzIG9ubHkgb25lIHBhZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGFsd2F5c1Nob3dQYWdpbmF0b3I6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIG9mIHRoZSBwYWdpbmF0b3IsIG9wdGlvbnMgYXJlIFwidG9wXCIsIFwiYm90dG9tXCIgb3IgXCJib3RoXCIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcGFnaW5hdG9yUG9zaXRpb246ICd0b3AnIHwgJ2JvdHRvbScgfCAnYm90aCcgPSAnYm90dG9tJztcbiAgICAvKipcbiAgICAgKiBDdXN0b20gc3R5bGUgY2xhc3MgZm9yIHBhZ2luYXRvclxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBhZ2luYXRvclN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUYXJnZXQgZWxlbWVudCB0byBhdHRhY2ggdGhlIHBhZ2luYXRvciBkcm9wZG93biBvdmVybGF5LCB2YWxpZCB2YWx1ZXMgYXJlIFwiYm9keVwiIG9yIGEgbG9jYWwgbmctdGVtcGxhdGUgdmFyaWFibGUgb2YgYW5vdGhlciBlbGVtZW50IChub3RlOiB1c2UgYmluZGluZyB3aXRoIGJyYWNrZXRzIGZvciB0ZW1wbGF0ZSB2YXJpYWJsZXMsIGUuZy4gW2FwcGVuZFRvXT1cIm15ZGl2XCIgZm9yIGEgZGl2IGVsZW1lbnQgaGF2aW5nICNteWRpdiBhcyB2YXJpYWJsZSBuYW1lKS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwYWdpbmF0b3JEcm9wZG93bkFwcGVuZFRvOiBIVE1MRWxlbWVudCB8IEVsZW1lbnRSZWYgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCB8IGFueTtcbiAgICAvKipcbiAgICAgKiBQYWdpbmF0b3IgZHJvcGRvd24gaGVpZ2h0IG9mIHRoZSB2aWV3cG9ydCBpbiBwaXhlbHMsIGEgc2Nyb2xsYmFyIGlzIGRlZmluZWQgaWYgaGVpZ2h0IG9mIGxpc3QgZXhjZWVkcyB0aGlzIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBhZ2luYXRvckRyb3Bkb3duU2Nyb2xsSGVpZ2h0OiBzdHJpbmcgPSAnMjAwcHgnO1xuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIG9mIHRoZSBjdXJyZW50IHBhZ2UgcmVwb3J0IGVsZW1lbnQuIEF2YWlsYWJsZSBwbGFjZWhvbGRlcnMgYXJlIHtjdXJyZW50UGFnZX0se3RvdGFsUGFnZXN9LHtyb3dzfSx7Zmlyc3R9LHtsYXN0fSBhbmQge3RvdGFsUmVjb3Jkc31cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlOiBzdHJpbmcgPSAne2N1cnJlbnRQYWdlfSBvZiB7dG90YWxQYWdlc30nO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZGlzcGxheSBjdXJyZW50IHBhZ2UgcmVwb3J0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93Q3VycmVudFBhZ2VSZXBvcnQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IGEgZHJvcGRvd24gdG8gbmF2aWdhdGUgdG8gYW55IHBhZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dKdW1wVG9QYWdlRHJvcGRvd246IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IGEgaW5wdXQgdG8gbmF2aWdhdGUgdG8gYW55IHBhZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dKdW1wVG9QYWdlSW5wdXQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBpY29ucyBhcmUgZGlzcGxheWVkIG9uIHBhZ2luYXRvciB0byBnbyBmaXJzdCBhbmQgbGFzdCBwYWdlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93Rmlyc3RMYXN0SWNvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IHBhZ2UgbGlua3MuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dQYWdlTGlua3M6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFNvcnQgb3JkZXIgdG8gdXNlIHdoZW4gYW4gdW5zb3J0ZWQgY29sdW1uIGdldHMgc29ydGVkIGJ5IHVzZXIgaW50ZXJhY3Rpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgZGVmYXVsdFNvcnRPcmRlcjogbnVtYmVyID0gMTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgc29ydGluZyB3b3JrcyBvbiBzaW5nbGUgY29sdW1uIG9yIG9uIG11bHRpcGxlIGNvbHVtbnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc29ydE1vZGU6ICdzaW5nbGUnIHwgJ211bHRpcGxlJyA9ICdzaW5nbGUnO1xuICAgIC8qKlxuICAgICAqIFdoZW4gdHJ1ZSwgcmVzZXRzIHBhZ2luYXRvciB0byBmaXJzdCBwYWdlIGFmdGVyIHNvcnRpbmcuIEF2YWlsYWJsZSBvbmx5IHdoZW4gc29ydE1vZGUgaXMgc2V0IHRvIHNpbmdsZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcmVzZXRQYWdlT25Tb3J0OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHNlbGVjdGlvbiBtb2RlLCB2YWxpZCB2YWx1ZXMgYXJlIFwic2luZ2xlXCIgYW5kIFwibXVsdGlwbGVcIi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZWxlY3Rpb25Nb2RlOiAnc2luZ2xlJyB8ICdtdWx0aXBsZScgfCB1bmRlZmluZWQgfCBudWxsO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCB3aXRoIHBhZ2luYXRvciBhbmQgY2hlY2tib3ggc2VsZWN0aW9uIG1vZGUsIHRoZSBzZWxlY3QgYWxsIGNoZWNrYm94IGluIHRoZSBoZWFkZXIgd2lsbCBzZWxlY3QgYWxsIHJvd3Mgb24gdGhlIGN1cnJlbnQgcGFnZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2VsZWN0aW9uUGFnZU9ubHk6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU2VsZWN0ZWQgcm93IHdpdGggYSBjb250ZXh0IG1lbnUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY29udGV4dE1lbnVTZWxlY3Rpb246IGFueTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gY29udGV4dCBtZW51IHNlbGVjdGlvbiBjaGFuZ2UuXG4gICAgICogQHBhcmFtIHsqfSBvYmplY3QgLSByb3cgZGF0YS5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgY29udGV4dE1lbnVTZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIC8qKlxuICAgICAqICBEZWZpbmVzIHRoZSBiZWhhdmlvciBvZiBjb250ZXh0IG1lbnUgc2VsZWN0aW9uLCBpbiBcInNlcGFyYXRlXCIgbW9kZSBjb250ZXh0IG1lbnUgdXBkYXRlcyBjb250ZXh0TWVudVNlbGVjdGlvbiBwcm9wZXJ0eSB3aGVyZWFzIGluIGpvaW50IG1vZGUgc2VsZWN0aW9uIHByb3BlcnR5IGlzIHVzZWQgaW5zdGVhZCBzbyB0aGF0IHdoZW4gcm93IHNlbGVjdGlvbiBpcyBlbmFibGVkLCBib3RoIHJvdyBzZWxlY3Rpb24gYW5kIGNvbnRleHQgbWVudSBzZWxlY3Rpb24gdXNlIHRoZSBzYW1lIHByb3BlcnR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbnRleHRNZW51U2VsZWN0aW9uTW9kZTogc3RyaW5nID0gJ3NlcGFyYXRlJztcbiAgICAvKipcbiAgICAgKiBBIHByb3BlcnR5IHRvIHVuaXF1ZWx5IGlkZW50aWZ5IGEgcmVjb3JkIGluIGRhdGEuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGF0YUtleTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgd2hldGhlciBtZXRhS2V5IHNob3VsZCBiZSBjb25zaWRlcmVkIGZvciB0aGUgc2VsZWN0aW9uLiBPbiB0b3VjaCBlbmFibGVkIGRldmljZXMsIG1ldGFLZXlTZWxlY3Rpb24gaXMgdHVybmVkIG9mZiBhdXRvbWF0aWNhbGx5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBtZXRhS2V5U2VsZWN0aW9uOiBib29sZWFuIHwgdW5kZWZpbmVkID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiB0aGUgcm93IGlzIHNlbGVjdGFibGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcm93U2VsZWN0YWJsZTogKHJvdzogeyBkYXRhOiBhbnk7IGluZGV4OiBudW1iZXIgfSkgPT4gYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBvcHRpbWl6ZSB0aGUgZG9tIG9wZXJhdGlvbnMgYnkgZGVsZWdhdGluZyB0byBuZ0ZvclRyYWNrQnksIGRlZmF1bHQgYWxnb3JpdGhtIGNoZWNrcyBmb3Igb2JqZWN0IGlkZW50aXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJvd1RyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGlmIGRhdGEgaXMgbG9hZGVkIGFuZCBpbnRlcmFjdGVkIHdpdGggaW4gbGF6eSBtYW5uZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGxhenk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGNhbGwgbGF6eSBsb2FkaW5nIG9uIGluaXRpYWxpemF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBsYXp5TG9hZE9uSW5pdDogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogQWxnb3JpdGhtIHRvIGRlZmluZSBpZiBhIHJvdyBpcyBzZWxlY3RlZCwgdmFsaWQgdmFsdWVzIGFyZSBcImVxdWFsc1wiIHRoYXQgY29tcGFyZXMgYnkgcmVmZXJlbmNlIGFuZCBcImRlZXBFcXVhbHNcIiB0aGF0IGNvbXBhcmVzIGFsbCBmaWVsZHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY29tcGFyZVNlbGVjdGlvbkJ5OiAnZXF1YWxzJyB8ICdkZWVwRXF1YWxzJyA9ICdkZWVwRXF1YWxzJztcbiAgICAvKipcbiAgICAgKiBDaGFyYWN0ZXIgdG8gdXNlIGFzIHRoZSBjc3Ygc2VwYXJhdG9yLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNzdlNlcGFyYXRvcjogc3RyaW5nID0gJywnO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGV4cG9ydGVkIGZpbGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZXhwb3J0RmlsZW5hbWU6IHN0cmluZyA9ICdkb3dubG9hZCc7XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgRmlsdGVyTWV0YWRhdGEgb2JqZWN0cyB0byBwcm92aWRlIGV4dGVybmFsIGZpbHRlcnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyczogeyBbczogc3RyaW5nXTogRmlsdGVyTWV0YWRhdGEgfCBGaWx0ZXJNZXRhZGF0YVtdIH0gPSB7fTtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBmaWVsZHMgYXMgc3RyaW5nIHRvIHVzZSBpbiBnbG9iYWwgZmlsdGVyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdsb2JhbEZpbHRlckZpZWxkczogc3RyaW5nW10gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVsYXkgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSBmaWx0ZXJpbmcgdGhlIGRhdGEuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgZmlsdGVyRGVsYXk6IG51bWJlciA9IDMwMDtcbiAgICAvKipcbiAgICAgKiBMb2NhbGUgdG8gdXNlIGluIGZpbHRlcmluZy4gVGhlIGRlZmF1bHQgbG9jYWxlIGlzIHRoZSBob3N0IGVudmlyb25tZW50J3MgY3VycmVudCBsb2NhbGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyTG9jYWxlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTWFwIGluc3RhbmNlIHRvIGtlZXAgdGhlIGV4cGFuZGVkIHJvd3Mgd2hlcmUga2V5IG9mIHRoZSBtYXAgaXMgdGhlIGRhdGEga2V5IG9mIHRoZSByb3cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZXhwYW5kZWRSb3dLZXlzOiB7IFtzOiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcbiAgICAvKipcbiAgICAgKiBNYXAgaW5zdGFuY2UgdG8ga2VlcCB0aGUgcm93cyBiZWluZyBlZGl0ZWQgd2hlcmUga2V5IG9mIHRoZSBtYXAgaXMgdGhlIGRhdGEga2V5IG9mIHRoZSByb3cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZWRpdGluZ1Jvd0tleXM6IHsgW3M6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgbXVsdGlwbGUgcm93cyBjYW4gYmUgZXhwYW5kZWQgYXQgYW55IHRpbWUuIFZhbGlkIHZhbHVlcyBhcmUgXCJtdWx0aXBsZVwiIGFuZCBcInNpbmdsZVwiLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJvd0V4cGFuZE1vZGU6ICdtdWx0aXBsZScgfCAnc2luZ2xlJyA9ICdtdWx0aXBsZSc7XG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBzY3JvbGxhYmxlIHRhYmxlcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2Nyb2xsYWJsZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBPcmllbnRhdGlvbiBvZiB0aGUgc2Nyb2xsaW5nLCBvcHRpb25zIGFyZSBcInZlcnRpY2FsXCIsIFwiaG9yaXpvbnRhbFwiIGFuZCBcImJvdGhcIi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVwcmVjYXRlZCBQcm9wZXJ0eSBpcyBvYnNlbGV0ZSBzaW5jZSB2MTQuMi4wLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNjcm9sbERpcmVjdGlvbjogJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJyB8ICdib3RoJyA9ICd2ZXJ0aWNhbCc7XG4gICAgLyoqXG4gICAgICogVHlwZSBvZiB0aGUgcm93IGdyb3VwaW5nLCB2YWxpZCB2YWx1ZXMgYXJlIFwic3ViaGVhZGVyXCIgYW5kIFwicm93c3BhblwiLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJvd0dyb3VwTW9kZTogJ3N1YmhlYWRlcicgfCAncm93c3BhbicgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSGVpZ2h0IG9mIHRoZSBzY3JvbGwgdmlld3BvcnQgaW4gZml4ZWQgcGl4ZWxzIG9yIHRoZSBcImZsZXhcIiBrZXl3b3JkIGZvciBhIGR5bmFtaWMgc2l6ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzY3JvbGxIZWlnaHQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBkYXRhIHNob3VsZCBiZSBsb2FkZWQgb24gZGVtYW5kIGR1cmluZyBzY3JvbGwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHZpcnR1YWxTY3JvbGw6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSGVpZ2h0IG9mIGEgcm93IHRvIHVzZSBpbiBjYWxjdWxhdGlvbnMgb2YgdmlydHVhbCBzY3JvbGxpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgdmlydHVhbFNjcm9sbEl0ZW1TaXplOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byB1c2UgdGhlIHNjcm9sbGVyIGZlYXR1cmUuIFRoZSBwcm9wZXJ0aWVzIG9mIHNjcm9sbGVyIGNvbXBvbmVudCBjYW4gYmUgdXNlZCBsaWtlIGFuIG9iamVjdCBpbiBpdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB2aXJ0dWFsU2Nyb2xsT3B0aW9uczogU2Nyb2xsZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRocmVzaG9sZCBpbiBtaWxsaXNlY29uZHMgdG8gZGVsYXkgbGF6eSBsb2FkaW5nIGR1cmluZyBzY3JvbGxpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgdmlydHVhbFNjcm9sbERlbGF5OiBudW1iZXIgPSAyNTA7XG4gICAgLyoqXG4gICAgICogV2lkdGggb2YgdGhlIGZyb3plbiBjb2x1bW5zIGNvbnRhaW5lci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmcm96ZW5XaWR0aDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgaWYgdGhlIHRhYmxlIGlzIHJlc3BvbnNpdmUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgdGFibGUgaXMgYWx3YXlzIHJlc3BvbnNpdmUgd2l0aCBzY3JvbGxhYmxlIGJlaGF2aW9yLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCByZXNwb25zaXZlKCk6IGJvb2xlYW4gfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3BvbnNpdmU7XG4gICAgfVxuICAgIHNldCByZXNwb25zaXZlKHZhbDogYm9vbGVhbiB8IHVuZGVmaW5lZCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcmVzcG9uc2l2ZSA9IHZhbDtcbiAgICAgICAgY29uc29sZS53YXJuKCdyZXNwb25zaXZlIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQgYXMgdGFibGUgaXMgYWx3YXlzIHJlc3BvbnNpdmUgd2l0aCBzY3JvbGxhYmxlIGJlaGF2aW9yLicpO1xuICAgIH1cbiAgICBfcmVzcG9uc2l2ZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB8IG51bGw7XG4gICAgLyoqXG4gICAgICogTG9jYWwgbmctdGVtcGxhdGUgdmFyaWxhYmxlIG9mIGEgQ29udGV4dE1lbnUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY29udGV4dE1lbnU6IGFueTtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGNvbHVtbnMgY2FuIGJlIHJlc2l6ZWQgdXNpbmcgZHJhZyBhbmQgZHJvcC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcmVzaXphYmxlQ29sdW1uczogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgdGhlIG92ZXJhbGwgdGFibGUgd2lkdGggc2hvdWxkIGNoYW5nZSBvbiBjb2x1bW4gcmVzaXplLCB2YWxpZCB2YWx1ZXMgYXJlIFwiZml0XCIgYW5kIFwiZXhwYW5kXCIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY29sdW1uUmVzaXplTW9kZTogc3RyaW5nID0gJ2ZpdCc7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBjb2x1bW5zIGNhbiBiZSByZW9yZGVyZWQgdXNpbmcgZHJhZyBhbmQgZHJvcC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcmVvcmRlcmFibGVDb2x1bW5zOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERpc3BsYXlzIGEgbG9hZGVyIHRvIGluZGljYXRlIGRhdGEgbG9hZCBpcyBpbiBwcm9ncmVzcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgbG9hZGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUaGUgaWNvbiB0byBzaG93IHdoaWxlIGluZGljYXRpbmcgZGF0YSBsb2FkIGlzIGluIHByb2dyZXNzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxvYWRpbmdJY29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSBsb2FkaW5nIG1hc2sgd2hlbiBsb2FkaW5nIHByb3BlcnR5IGlzIHRydWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dMb2FkZXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIEFkZHMgaG92ZXIgZWZmZWN0IHRvIHJvd3Mgd2l0aG91dCB0aGUgbmVlZCBmb3Igc2VsZWN0aW9uTW9kZS4gTm90ZSB0aGF0IHRyIGVsZW1lbnRzIHRoYXQgY2FuIGJlIGhvdmVyZWQgbmVlZCB0byBoYXZlIFwicC1zZWxlY3RhYmxlLXJvd1wiIGNsYXNzIGZvciByb3dIb3ZlciB0byB3b3JrLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByb3dIb3ZlcjogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHVzZSB0aGUgZGVmYXVsdCBzb3J0aW5nIG9yIGEgY3VzdG9tIG9uZSB1c2luZyBzb3J0RnVuY3Rpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGN1c3RvbVNvcnQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byB1c2UgdGhlIGluaXRpYWwgc29ydCBiYWRnZSBvciBub3QuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dJbml0aWFsU29ydEJhZGdlOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBjZWxsIHdpZHRocyBzY2FsZSBhY2NvcmRpbmcgdG8gdGhlaXIgY29udGVudCBvciBub3QuICBEZXByZWNhdGVkOiAgVGFibGUgbGF5b3V0IGlzIGFsd2F5cyBcImF1dG9cIi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYXV0b0xheW91dDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBFeHBvcnQgZnVuY3Rpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZXhwb3J0RnVuY3Rpb246IEZ1bmN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEN1c3RvbSBleHBvcnQgaGVhZGVyIG9mIHRoZSBjb2x1bW4gdG8gYmUgZXhwb3J0ZWQgYXMgQ1NWLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGV4cG9ydEhlYWRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFVuaXF1ZSBpZGVudGlmaWVyIG9mIGEgc3RhdGVmdWwgdGFibGUgdG8gdXNlIGluIHN0YXRlIHN0b3JhZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3RhdGVLZXk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXJlIGEgc3RhdGVmdWwgdGFibGUga2VlcHMgaXRzIHN0YXRlLCB2YWxpZCB2YWx1ZXMgYXJlIFwic2Vzc2lvblwiIGZvciBzZXNzaW9uU3RvcmFnZSBhbmQgXCJsb2NhbFwiIGZvciBsb2NhbFN0b3JhZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3RhdGVTdG9yYWdlOiAnc2Vzc2lvbicgfCAnbG9jYWwnID0gJ3Nlc3Npb24nO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIGVkaXRpbmcgbW9kZSwgdmFsaWQgdmFsdWVzIGFyZSBcImNlbGxcIiBhbmQgXCJyb3dcIi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBlZGl0TW9kZTogJ2NlbGwnIHwgJ3JvdycgPSAnY2VsbCc7XG4gICAgLyoqXG4gICAgICogRmllbGQgbmFtZSB0byB1c2UgaW4gcm93IGdyb3VwaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdyb3VwUm93c0J5OiBhbnk7XG4gICAgLyoqXG4gICAgICogT3JkZXIgdG8gc29ydCB3aGVuIGRlZmF1bHQgcm93IGdyb3VwaW5nIGlzIGVuYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgZ3JvdXBSb3dzQnlPcmRlcjogbnVtYmVyID0gMTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSByZXNwb25zaXZlIG1vZGUsIHZhbGlkIG9wdGlvbnMgYXJlIFwic3RhY2tcIiBhbmQgXCJzY3JvbGxcIi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByZXNwb25zaXZlTGF5b3V0OiBzdHJpbmcgPSAnc2Nyb2xsJztcbiAgICAvKipcbiAgICAgKiBUaGUgYnJlYWtwb2ludCB0byBkZWZpbmUgdGhlIG1heGltdW0gd2lkdGggYm91bmRhcnkgd2hlbiB1c2luZyBzdGFjayByZXNwb25zaXZlIGxheW91dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBicmVha3BvaW50OiBzdHJpbmcgPSAnNjQwcHgnO1xuICAgIC8qKlxuICAgICAqIExvY2FsZSB0byBiZSB1c2VkIGluIHBhZ2luYXRvciBmb3JtYXR0aW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBhZ2luYXRvckxvY2FsZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIG9iamVjdHMgdG8gZGlzcGxheS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgdmFsdWUoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWw6IGFueVtdKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBvYmplY3RzIHRvIHJlcHJlc2VudCBkeW5hbWljIGNvbHVtbnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGNvbHVtbnMoKTogYW55W10gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcbiAgICB9XG4gICAgc2V0IGNvbHVtbnMoY29sczogYW55W10gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fY29sdW1ucyA9IGNvbHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIHRoZSBmaXJzdCByb3cgdG8gYmUgZGlzcGxheWVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBmaXJzdCgpOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcnN0O1xuICAgIH1cbiAgICBzZXQgZmlyc3QodmFsOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBOdW1iZXIgb2Ygcm93cyB0byBkaXNwbGF5IHBlciBwYWdlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCByb3dzKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICAgIH1cbiAgICBzZXQgcm93cyh2YWw6IG51bWJlciB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9yb3dzID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBOdW1iZXIgb2YgdG90YWwgcmVjb3JkcywgZGVmYXVsdHMgdG8gbGVuZ3RoIG9mIHZhbHVlIHdoZW4gbm90IGRlZmluZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHRvdGFsUmVjb3JkcygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG90YWxSZWNvcmRzO1xuICAgIH1cbiAgICBzZXQgdG90YWxSZWNvcmRzKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3RvdGFsUmVjb3JkcyA9IHZhbDtcbiAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Ub3RhbFJlY29yZHNDaGFuZ2UodGhpcy5fdG90YWxSZWNvcmRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgZmllbGQgdG8gc29ydCBkYXRhIGJ5IGRlZmF1bHQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHNvcnRGaWVsZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvcnRGaWVsZDtcbiAgICB9XG4gICAgc2V0IHNvcnRGaWVsZCh2YWw6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc29ydEZpZWxkID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcmRlciB0byBzb3J0IHdoZW4gZGVmYXVsdCBzb3J0aW5nIGlzIGVuYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHNvcnRPcmRlcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc29ydE9yZGVyO1xuICAgIH1cbiAgICBzZXQgc29ydE9yZGVyKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NvcnRPcmRlciA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgU29ydE1ldGEgb2JqZWN0cyB0byBzb3J0IHRoZSBkYXRhIGJ5IGRlZmF1bHQgaW4gbXVsdGlwbGUgc29ydCBtb2RlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBtdWx0aVNvcnRNZXRhKCk6IFNvcnRNZXRhW10gfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX211bHRpU29ydE1ldGE7XG4gICAgfVxuICAgIHNldCBtdWx0aVNvcnRNZXRhKHZhbDogU29ydE1ldGFbXSB8IHVuZGVmaW5lZCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbXVsdGlTb3J0TWV0YSA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VsZWN0ZWQgcm93IGluIHNpbmdsZSBtb2RlIG9yIGFuIGFycmF5IG9mIHZhbHVlcyBpbiBtdWx0aXBsZSBtb2RlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzZWxlY3Rpb24oKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbjtcbiAgICB9XG4gICAgc2V0IHNlbGVjdGlvbih2YWw6IGFueSkge1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgYWxsIGRhdGEgaXMgc2VsZWN0ZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHNlbGVjdEFsbCgpOiBib29sZWFuIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb247XG4gICAgfVxuICAgIHNldCBzZWxlY3RBbGwodmFsOiBib29sZWFuIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVtaXRzIHdoZW4gdGhlIGFsbCBvZiB0aGUgaXRlbXMgc2VsZWN0ZWQgb3IgdW5zZWxlY3RlZC5cbiAgICAgKiBAcGFyYW0ge1RhYmxlU2VsZWN0QWxsQ2hhbmdlRXZlbnR9IGV2ZW50IC0gY3VzdG9tICBhbGwgc2VsZWN0aW9uIGNoYW5nZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgc2VsZWN0QWxsQ2hhbmdlOiBFdmVudEVtaXR0ZXI8VGFibGVTZWxlY3RBbGxDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYmxlU2VsZWN0QWxsQ2hhbmdlRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIHNlbGVjdGlvbiBjaGFuZ2VkLlxuICAgICAqIEBwYXJhbSB7YW55IHwgbnVsbH0gdmFsdWUgLSBzZWxlY3RlZCBkYXRhLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnkgfCBudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55IHwgbnVsbD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIHJvdyBpcyBzZWxlY3RlZC5cbiAgICAgKiBAcGFyYW0ge1RhYmxlUm93U2VsZWN0RXZlbnR9IGV2ZW50IC0gY3VzdG9tIHNlbGVjdCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Sb3dTZWxlY3Q6IEV2ZW50RW1pdHRlcjxUYWJsZVJvd1NlbGVjdEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFibGVSb3dTZWxlY3RFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIHJvdyBpcyB1bnNlbGVjdGVkLlxuICAgICAqIEBwYXJhbSB7VGFibGVSb3dVblNlbGVjdEV2ZW50fSBldmVudCAtIGN1c3RvbSB1bnNlbGVjdCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Sb3dVbnNlbGVjdDogRXZlbnRFbWl0dGVyPFRhYmxlUm93VW5TZWxlY3RFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYmxlUm93VW5TZWxlY3RFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBwYWdpbmF0aW9uIG9jY3Vycy5cbiAgICAgKiBAcGFyYW0ge1RhYmxlUGFnZUV2ZW50fSBldmVudCAtIGN1c3RvbSBwYWdpbmF0aW9uIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblBhZ2U6IEV2ZW50RW1pdHRlcjxUYWJsZVBhZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYmxlUGFnZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgY29sdW1uIGdldHMgc29ydGVkLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgLSBzb3J0IG1ldGEuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU29ydDogRXZlbnRFbWl0dGVyPHsgbXVsdGlzb3J0bWV0YTogU29ydE1ldGFbXSB9IHwgYW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8eyBtdWx0aXNvcnRtZXRhOiBTb3J0TWV0YVtdIH0gfCBhbnk+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gZGF0YSBpcyBmaWx0ZXJlZC5cbiAgICAgKiBAcGFyYW0ge1RhYmxlRmlsdGVyRXZlbnR9IGV2ZW50IC0gY3VzdG9tIGZpbHRlcmluZyBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25GaWx0ZXI6IEV2ZW50RW1pdHRlcjxUYWJsZUZpbHRlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFibGVGaWx0ZXJFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBwYWdpbmcsIHNvcnRpbmcgb3IgZmlsdGVyaW5nIGhhcHBlbnMgaW4gbGF6eSBtb2RlLlxuICAgICAqIEBwYXJhbSB7VGFibGVMYXp5TG9hZEV2ZW50fSBldmVudCAtIGN1c3RvbSBsYXp5IGxvYWRpbmcgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uTGF6eUxvYWQ6IEV2ZW50RW1pdHRlcjxUYWJsZUxhenlMb2FkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZUxhenlMb2FkRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSByb3cgaXMgZXhwYW5kZWQuXG4gICAgICogQHBhcmFtIHtUYWJsZVJvd0V4cGFuZEV2ZW50fSBldmVudCAtIGN1c3RvbSByb3cgZXhwYW5kIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblJvd0V4cGFuZDogRXZlbnRFbWl0dGVyPFRhYmxlUm93RXhwYW5kRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZVJvd0V4cGFuZEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgcm93IGlzIGNvbGxhcHNlZC5cbiAgICAgKiBAcGFyYW0ge1RhYmxlUm93Q29sbGFwc2VFdmVudH0gZXZlbnQgLSBjdXN0b20gcm93IGNvbGxhcHNlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblJvd0NvbGxhcHNlOiBFdmVudEVtaXR0ZXI8VGFibGVSb3dDb2xsYXBzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFibGVSb3dDb2xsYXBzZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgcm93IGlzIHNlbGVjdGVkIHdpdGggcmlnaHQgY2xpY2suXG4gICAgICogQHBhcmFtIHtUYWJsZUNvbnRleHRNZW51U2VsZWN0RXZlbnR9IGV2ZW50IC0gY3VzdG9tIGNvbnRleHQgbWVudSBzZWxlY3QgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ29udGV4dE1lbnVTZWxlY3Q6IEV2ZW50RW1pdHRlcjxUYWJsZUNvbnRleHRNZW51U2VsZWN0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZUNvbnRleHRNZW51U2VsZWN0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBjb2x1bW4gaXMgcmVzaXplZC5cbiAgICAgKiBAcGFyYW0ge1RhYmxlQ29sUmVzaXplRXZlbnR9IGV2ZW50IC0gY3VzdG9tIGNvbHVtbiByZXNpemUgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ29sUmVzaXplOiBFdmVudEVtaXR0ZXI8VGFibGVDb2xSZXNpemVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYmxlQ29sUmVzaXplRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBjb2x1bW4gaXMgcmVvcmRlcmVkLlxuICAgICAqIEBwYXJhbSB7VGFibGVDb2x1bW5SZW9yZGVyRXZlbnR9IGV2ZW50IC0gY3VzdG9tIGNvbHVtbiByZW9yZGVyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNvbFJlb3JkZXI6IEV2ZW50RW1pdHRlcjxUYWJsZUNvbHVtblJlb3JkZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYmxlQ29sdW1uUmVvcmRlckV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgcm93IGlzIHJlb3JkZXJlZC5cbiAgICAgKiBAcGFyYW0ge1RhYmxlUm93UmVvcmRlckV2ZW50fSBldmVudCAtIGN1c3RvbSByb3cgcmVvcmRlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Sb3dSZW9yZGVyOiBFdmVudEVtaXR0ZXI8VGFibGVSb3dSZW9yZGVyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZVJvd1Jlb3JkZXJFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIGNlbGwgc3dpdGNoZXMgdG8gZWRpdCBtb2RlLlxuICAgICAqIEBwYXJhbSB7VGFibGVFZGl0SW5pdEV2ZW50fSBldmVudCAtIGN1c3RvbSBlZGl0IGluaXQgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRWRpdEluaXQ6IEV2ZW50RW1pdHRlcjxUYWJsZUVkaXRJbml0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZUVkaXRJbml0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gY2VsbCBlZGl0IGlzIGNvbXBsZXRlZC5cbiAgICAgKiBAcGFyYW0ge1RhYmxlRWRpdENvbXBsZXRlRXZlbnR9IGV2ZW50IC0gY3VzdG9tIGVkaXQgY29tcGxldGUgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRWRpdENvbXBsZXRlOiBFdmVudEVtaXR0ZXI8VGFibGVFZGl0Q29tcGxldGVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYmxlRWRpdENvbXBsZXRlRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gY2VsbCBlZGl0IGlzIGNhbmNlbGxlZCB3aXRoIGVzY2FwZSBrZXkuXG4gICAgICogQHBhcmFtIHtUYWJsZUVkaXRDYW5jZWxFdmVudH0gZXZlbnQgLSBjdXN0b20gZWRpdCBjYW5jZWwgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRWRpdENhbmNlbDogRXZlbnRFbWl0dGVyPFRhYmxlRWRpdENhbmNlbEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFibGVFZGl0Q2FuY2VsRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gc3RhdGUgb2YgaGVhZGVyIGNoZWNrYm94IGNoYW5nZXMuXG4gICAgICogQHBhcmFtIHtUYWJsZUhlYWRlckNoZWNrYm94VG9nZ2xlRXZlbnR9IGV2ZW50IC0gY3VzdG9tIGhlYWRlciBjaGVja2JveCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25IZWFkZXJDaGVja2JveFRvZ2dsZTogRXZlbnRFbWl0dGVyPFRhYmxlSGVhZGVyQ2hlY2tib3hUb2dnbGVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYmxlSGVhZGVyQ2hlY2tib3hUb2dnbGVFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBBIGZ1bmN0aW9uIHRvIGltcGxlbWVudCBjdXN0b20gc29ydGluZywgcmVmZXIgdG8gc29ydGluZyBzZWN0aW9uIGZvciBkZXRhaWxzLlxuICAgICAqIEBwYXJhbSB7YW55fSBhbnkgLSBzb3J0IG1ldGEuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIHNvcnRGdW5jdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gcGFnaW5hdGlvbi5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIC0gZmlyc3QgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgZmlyc3RDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIHJvd3MgY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXIgLSBSb3cgY291bnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIHJvd3NDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHRhYmxlIHN0YXRlIGlzIHNhdmVkLlxuICAgICAqIEBwYXJhbSB7VGFibGVTdGF0ZX0gb2JqZWN0IC0gdGFibGUgc3RhdGUuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU3RhdGVTYXZlOiBFdmVudEVtaXR0ZXI8VGFibGVTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYmxlU3RhdGU+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHRhYmxlIHN0YXRlIGlzIHJlc3RvcmVkLlxuICAgICAqIEBwYXJhbSB7VGFibGVTdGF0ZX0gb2JqZWN0IC0gdGFibGUgc3RhdGUuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU3RhdGVSZXN0b3JlOiBFdmVudEVtaXR0ZXI8VGFibGVTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYmxlU3RhdGU+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXJWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgncmVzaXplSGVscGVyJykgcmVzaXplSGVscGVyVmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3Jlb3JkZXJJbmRpY2F0b3JVcCcpIHJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdyZW9yZGVySW5kaWNhdG9yRG93bicpIHJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3dyYXBwZXInKSB3cmFwcGVyVmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3RhYmxlJykgdGFibGVWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgndGhlYWQnKSB0YWJsZUhlYWRlclZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCd0Zm9vdCcpIHRhYmxlRm9vdGVyVmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3Njcm9sbGVyJykgc2Nyb2xsZXI6IE51bGxhYmxlPFNjcm9sbGVyPjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBOdWxsYWJsZTxRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4+O1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGUgaGVpZ2h0IG9mIHJvd3MgdG8gYmUgc2Nyb2xsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgdXNlIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZSBwcm9wZXJ0eSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCB2aXJ0dWFsUm93SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXJ0dWFsUm93SGVpZ2h0O1xuICAgIH1cbiAgICBzZXQgdmlydHVhbFJvd0hlaWdodCh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl92aXJ0dWFsUm93SGVpZ2h0ID0gdmFsO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSB2aXJ0dWFsUm93SGVpZ2h0IHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQuJyk7XG4gICAgfVxuICAgIF92aXJ0dWFsUm93SGVpZ2h0OiBudW1iZXIgPSAyODtcblxuICAgIF92YWx1ZTogYW55W10gPSBbXTtcblxuICAgIF9jb2x1bW5zOiBhbnlbXSB8IHVuZGVmaW5lZDtcblxuICAgIF90b3RhbFJlY29yZHM6IG51bWJlciA9IDA7XG5cbiAgICBfZmlyc3Q6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQgPSAwO1xuXG4gICAgX3Jvd3M6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGZpbHRlcmVkVmFsdWU6IGFueVtdIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIGhlYWRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGhlYWRlckdyb3VwZWRUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBib2R5VGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgbG9hZGluZ0JvZHlUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBjYXB0aW9uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZm9vdGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZm9vdGVyR3JvdXBlZFRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHN1bW1hcnlUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBjb2xHcm91cFRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGV4cGFuZGVkUm93VGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZ3JvdXBIZWFkZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBncm91cEZvb3RlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZyb3plbkV4cGFuZGVkUm93VGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZnJvemVuSGVhZGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZnJvemVuQm9keVRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZyb3plbkZvb3RlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZyb3plbkNvbEdyb3VwVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZW1wdHlNZXNzYWdlVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgcGFnaW5hdG9yTGVmdFRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHBhZ2luYXRvclJpZ2h0VGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgcGFnaW5hdG9yRHJvcGRvd25JdGVtVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgbG9hZGluZ0ljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICByZW9yZGVySW5kaWNhdG9yVXBJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgcmVvcmRlckluZGljYXRvckRvd25JY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgc29ydEljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBjaGVja2JveEljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBoZWFkZXJDaGVja2JveEljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBwYWdpbmF0b3JEcm9wZG93bkljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBwYWdpbmF0b3JGaXJzdFBhZ2VMaW5rSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHBhZ2luYXRvckxhc3RQYWdlTGlua0ljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBwYWdpbmF0b3JQcmV2aW91c1BhZ2VMaW5rSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHBhZ2luYXRvck5leHRQYWdlTGlua0ljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBzZWxlY3Rpb25LZXlzOiBhbnkgPSB7fTtcblxuICAgIGxhc3RSZXNpemVySGVscGVyWDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgcmVvcmRlckljb25XaWR0aDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgcmVvcmRlckljb25IZWlnaHQ6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGRyYWdnZWRDb2x1bW46IGFueTtcblxuICAgIGRyYWdnZWRSb3dJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIGRyb3BwZWRSb3dJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIHJvd0RyYWdnaW5nOiBib29sZWFuIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIGRyb3BQb3NpdGlvbjogbnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIGVkaXRpbmdDZWxsOiBFbGVtZW50IHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIGVkaXRpbmdDZWxsRGF0YTogYW55O1xuXG4gICAgZWRpdGluZ0NlbGxGaWVsZDogYW55O1xuXG4gICAgZWRpdGluZ0NlbGxSb3dJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIHNlbGZDbGljazogYm9vbGVhbiB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBkb2N1bWVudEVkaXRMaXN0ZW5lcjogYW55O1xuXG4gICAgX211bHRpU29ydE1ldGE6IFNvcnRNZXRhW10gfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gICAgX3NvcnRGaWVsZDogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIF9zb3J0T3JkZXI6IG51bWJlciA9IDE7XG5cbiAgICBwcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb246IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBfc2VsZWN0aW9uOiBhbnk7XG5cbiAgICBfc2VsZWN0QWxsOiBib29sZWFuIHwgbnVsbCA9IG51bGw7XG5cbiAgICBhbmNob3JSb3dJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIHJhbmdlUm93SW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGZpbHRlclRpbWVvdXQ6IGFueTtcblxuICAgIGluaXRpYWxpemVkOiBib29sZWFuIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIHJvd1RvdWNoZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICByZXN0b3JpbmdTb3J0OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgcmVzdG9yaW5nRmlsdGVyOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgc3RhdGVSZXN0b3JlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbHVtbk9yZGVyU3RhdGVSZXN0b3JlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbHVtbldpZHRoc1N0YXRlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICB0YWJsZVdpZHRoU3RhdGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIG92ZXJsYXlTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIHJlc2l6ZUNvbHVtbkVsZW1lbnQ6IGFueTtcblxuICAgIGNvbHVtblJlc2l6aW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICByb3dHcm91cEhlYWRlclN0eWxlT2JqZWN0OiBhbnkgPSB7fTtcblxuICAgIGlkOiBzdHJpbmcgPSBVbmlxdWVDb21wb25lbnRJZCgpO1xuXG4gICAgc3R5bGVFbGVtZW50OiBhbnk7XG5cbiAgICByZXNwb25zaXZlU3R5bGVFbGVtZW50OiBhbnk7XG5cbiAgICBwcml2YXRlIHdpbmRvdzogV2luZG93O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSxcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyB6b25lOiBOZ1pvbmUsXG4gICAgICAgIHB1YmxpYyB0YWJsZVNlcnZpY2U6IFRhYmxlU2VydmljZSxcbiAgICAgICAgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHVibGljIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBvdmVybGF5U2VydmljZTogT3ZlcmxheVNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWdcbiAgICApIHtcbiAgICAgICAgdGhpcy53aW5kb3cgPSB0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3IGFzIFdpbmRvdztcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMubGF6eSAmJiB0aGlzLmxhenlMb2FkT25Jbml0KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmlydHVhbFNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucmVzdG9yaW5nRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JpbmdGaWx0ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlc3BvbnNpdmVMYXlvdXQgPT09ICdzdGFjaycpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUmVzcG9uc2l2ZVN0eWxlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjYXB0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXB0aW9uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcmdyb3VwZWQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlckdyb3VwZWRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnYm9keSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9keVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdsb2FkaW5nYm9keSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0JvZHlUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9vdGVyZ3JvdXBlZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyR3JvdXBlZFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzdW1tYXJ5JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdW1tYXJ5VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbGdyb3VwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xHcm91cFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdyb3dleHBhbnNpb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZGVkUm93VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2dyb3VwaGVhZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cEhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdncm91cGZvb3Rlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBGb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJvemVuaGVhZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5IZWFkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJvemVuYm9keSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuQm9keVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmcm96ZW5mb290ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyb3plbkZvb3RlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmcm96ZW5jb2xncm91cCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuQ29sR3JvdXBUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJvemVucm93ZXhwYW5zaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5FeHBhbmRlZFJvd1RlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eW1lc3NhZ2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5TWVzc2FnZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwYWdpbmF0b3JsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3JMZWZ0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3BhZ2luYXRvcnJpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3JSaWdodFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwYWdpbmF0b3Jkcm9wZG93bmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRvckRyb3Bkb3duSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwYWdpbmF0b3Jkcm9wZG93bml0ZW0nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRvckRyb3Bkb3duSXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwYWdpbmF0b3JmaXJzdHBhZ2VsaW5raWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdG9yRmlyc3RQYWdlTGlua0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncGFnaW5hdG9ybGFzdHBhZ2VsaW5raWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdG9yTGFzdFBhZ2VMaW5rSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwYWdpbmF0b3JwcmV2aW91c3BhZ2VsaW5raWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdG9yUHJldmlvdXNQYWdlTGlua0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncGFnaW5hdG9ybmV4dHBhZ2VsaW5raWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdG9yTmV4dFBhZ2VMaW5rSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdsb2FkaW5naWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncmVvcmRlcmluZGljYXRvcnVwaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvclVwSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdyZW9yZGVyaW5kaWNhdG9yZG93bmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JEb3duSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzb3J0aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY2hlY2tib3hpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2JveEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaGVhZGVyY2hlY2tib3hpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJDaGVja2JveEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkgJiYgdGhpcy5yZXNpemFibGVDb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlQ29sdW1uV2lkdGhzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhzaW1wbGVDaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS52YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpICYmICF0aGlzLnN0YXRlUmVzdG9yZWQgJiYgaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yZVN0YXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gc2ltcGxlQ2hhbmdlLnZhbHVlLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmxhenkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUmVjb3JkcyA9IHRoaXMuX3ZhbHVlID8gdGhpcy5fdmFsdWUubGVuZ3RoIDogMDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09ICdzaW5nbGUnICYmICh0aGlzLnNvcnRGaWVsZCB8fCB0aGlzLmdyb3VwUm93c0J5KSkgdGhpcy5zb3J0U2luZ2xlKCk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zb3J0TW9kZSA9PSAnbXVsdGlwbGUnICYmICh0aGlzLm11bHRpU29ydE1ldGEgfHwgdGhpcy5ncm91cFJvd3NCeSkpIHRoaXMuc29ydE11bHRpcGxlKCk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5oYXNGaWx0ZXIoKSlcbiAgICAgICAgICAgICAgICAgICAgLy9zb3J0IGFscmVhZHkgZmlsdGVyc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25WYWx1ZUNoYW5nZShzaW1wbGVDaGFuZ2UudmFsdWUuY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UuY29sdW1ucykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzU3RhdGVmdWwoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbHVtbnMgPSBzaW1wbGVDaGFuZ2UuY29sdW1ucy5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Db2x1bW5zQ2hhbmdlKHNpbXBsZUNoYW5nZS5jb2x1bW5zLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9jb2x1bW5zICYmIHRoaXMuaXNTdGF0ZWZ1bCgpICYmIHRoaXMucmVvcmRlcmFibGVDb2x1bW5zICYmICF0aGlzLmNvbHVtbk9yZGVyU3RhdGVSZXN0b3JlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yZUNvbHVtbk9yZGVyKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vbkNvbHVtbnNDaGFuZ2UodGhpcy5fY29sdW1ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnNvcnRGaWVsZCkge1xuICAgICAgICAgICAgdGhpcy5fc29ydEZpZWxkID0gc2ltcGxlQ2hhbmdlLnNvcnRGaWVsZC5jdXJyZW50VmFsdWU7XG5cbiAgICAgICAgICAgIC8vYXZvaWQgdHJpZ2dlcmluZyBsYXp5IGxvYWQgcHJpb3IgdG8gbGF6eSBpbml0aWFsaXphdGlvbiBhdCBvbkluaXRcbiAgICAgICAgICAgIGlmICghdGhpcy5sYXp5IHx8IHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0U2luZ2xlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5ncm91cFJvd3NCeSkge1xuICAgICAgICAgICAgLy9hdm9pZCB0cmlnZ2VyaW5nIGxhenkgbG9hZCBwcmlvciB0byBsYXp5IGluaXRpYWxpemF0aW9uIGF0IG9uSW5pdFxuICAgICAgICAgICAgaWYgKCF0aGlzLmxhenkgfHwgdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRTaW5nbGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnNvcnRPcmRlcikge1xuICAgICAgICAgICAgdGhpcy5fc29ydE9yZGVyID0gc2ltcGxlQ2hhbmdlLnNvcnRPcmRlci5jdXJyZW50VmFsdWU7XG5cbiAgICAgICAgICAgIC8vYXZvaWQgdHJpZ2dlcmluZyBsYXp5IGxvYWQgcHJpb3IgdG8gbGF6eSBpbml0aWFsaXphdGlvbiBhdCBvbkluaXRcbiAgICAgICAgICAgIGlmICghdGhpcy5sYXp5IHx8IHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0U2luZ2xlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5ncm91cFJvd3NCeU9yZGVyKSB7XG4gICAgICAgICAgICAvL2F2b2lkIHRyaWdnZXJpbmcgbGF6eSBsb2FkIHByaW9yIHRvIGxhenkgaW5pdGlhbGl6YXRpb24gYXQgb25Jbml0XG4gICAgICAgICAgICBpZiAoIXRoaXMubGF6eSB8fCB0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc29ydE1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydFNpbmdsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UubXVsdGlTb3J0TWV0YSkge1xuICAgICAgICAgICAgdGhpcy5fbXVsdGlTb3J0TWV0YSA9IHNpbXBsZUNoYW5nZS5tdWx0aVNvcnRNZXRhLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09PSAnbXVsdGlwbGUnICYmICh0aGlzLmluaXRpYWxpemVkIHx8ICghdGhpcy5sYXp5ICYmICF0aGlzLnZpcnR1YWxTY3JvbGwpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydE11bHRpcGxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gc2ltcGxlQ2hhbmdlLnNlbGVjdGlvbi5jdXJyZW50VmFsdWU7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbktleXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2Uuc2VsZWN0QWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RBbGwgPSBzaW1wbGVDaGFuZ2Uuc2VsZWN0QWxsLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnByZXZlbnRTZWxlY3Rpb25TZXR0ZXJQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uS2V5cygpO1xuICAgICAgICAgICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb25TZXR0ZXJQcm9wYWdhdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHByb2Nlc3NlZERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcmVkVmFsdWUgfHwgdGhpcy52YWx1ZSB8fCBbXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0aWFsQ29sV2lkdGhzOiBudW1iZXJbXTtcblxuICAgIGRhdGFUb1JlbmRlcihkYXRhOiBhbnkpIHtcbiAgICAgICAgY29uc3QgX2RhdGEgPSBkYXRhIHx8IHRoaXMucHJvY2Vzc2VkRGF0YTtcblxuICAgICAgICBpZiAoX2RhdGEgJiYgdGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5sYXp5ID8gMCA6IHRoaXMuZmlyc3Q7XG4gICAgICAgICAgICByZXR1cm4gX2RhdGEuc2xpY2UoZmlyc3QsIDxudW1iZXI+Zmlyc3QgKyA8bnVtYmVyPnRoaXMucm93cyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gX2RhdGE7XG4gICAgfVxuXG4gICAgdXBkYXRlU2VsZWN0aW9uS2V5cygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YUtleSAmJiB0aGlzLl9zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5cyA9IHt9O1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGRhdGEgb2YgdGhpcy5fc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShkYXRhLCB0aGlzLmRhdGFLZXkpKV0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzW1N0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHRoaXMuX3NlbGVjdGlvbiwgdGhpcy5kYXRhS2V5KSldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUGFnZUNoYW5nZShldmVudDogVGFibGVQYWdlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5maXJzdCA9IGV2ZW50LmZpcnN0O1xuICAgICAgICB0aGlzLnJvd3MgPSBldmVudC5yb3dzO1xuXG4gICAgICAgIHRoaXMub25QYWdlLmVtaXQoe1xuICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXG4gICAgICAgICAgICByb3dzOiA8bnVtYmVyPnRoaXMucm93c1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5sYXp5KSB7XG4gICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZpcnN0Q2hhbmdlLmVtaXQodGhpcy5maXJzdCk7XG4gICAgICAgIHRoaXMucm93c0NoYW5nZS5lbWl0KHRoaXMucm93cyk7XG4gICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uVmFsdWVDaGFuZ2UodGhpcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hbmNob3JSb3dJbmRleCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldFNjcm9sbFRvcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc29ydChldmVudDogYW55KSB7XG4gICAgICAgIGxldCBvcmlnaW5hbEV2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudDtcblxuICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHRoaXMuX3NvcnRPcmRlciA9IHRoaXMuc29ydEZpZWxkID09PSBldmVudC5maWVsZCA/IHRoaXMuc29ydE9yZGVyICogLTEgOiB0aGlzLmRlZmF1bHRTb3J0T3JkZXI7XG4gICAgICAgICAgICB0aGlzLl9zb3J0RmllbGQgPSBldmVudC5maWVsZDtcblxuICAgICAgICAgICAgaWYgKHRoaXMucmVzZXRQYWdlT25Tb3J0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyc3QgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGFuZ2UuZW1pdCh0aGlzLl9maXJzdCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRTY3JvbGxUb3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc29ydFNpbmdsZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICAgICAgICBsZXQgbWV0YUtleSA9ICg8S2V5Ym9hcmRFdmVudD5vcmlnaW5hbEV2ZW50KS5tZXRhS2V5IHx8ICg8S2V5Ym9hcmRFdmVudD5vcmlnaW5hbEV2ZW50KS5jdHJsS2V5O1xuICAgICAgICAgICAgbGV0IHNvcnRNZXRhID0gdGhpcy5nZXRTb3J0TWV0YSg8c3RyaW5nPmV2ZW50LmZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHNvcnRNZXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFtZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX211bHRpU29ydE1ldGEgPSBbeyBmaWVsZDogPHN0cmluZz5ldmVudC5maWVsZCwgb3JkZXI6IHNvcnRNZXRhLm9yZGVyICogLTEgfV07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVzZXRQYWdlT25Tb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXJzdCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hhbmdlLmVtaXQodGhpcy5fZmlyc3QpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc29ydE1ldGEub3JkZXIgPSBzb3J0TWV0YS5vcmRlciAqIC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFtZXRhS2V5IHx8ICF0aGlzLm11bHRpU29ydE1ldGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbXVsdGlTb3J0TWV0YSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlc2V0UGFnZU9uU29ydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlyc3QgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuX2ZpcnN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAoPFNvcnRNZXRhW10+dGhpcy5fbXVsdGlTb3J0TWV0YSkucHVzaCh7IGZpZWxkOiA8c3RyaW5nPmV2ZW50LmZpZWxkLCBvcmRlcjogdGhpcy5kZWZhdWx0U29ydE9yZGVyIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNvcnRNdWx0aXBsZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hbmNob3JSb3dJbmRleCA9IG51bGw7XG4gICAgfVxuXG4gICAgc29ydFNpbmdsZSgpIHtcbiAgICAgICAgbGV0IGZpZWxkID0gdGhpcy5zb3J0RmllbGQgfHwgdGhpcy5ncm91cFJvd3NCeTtcbiAgICAgICAgbGV0IG9yZGVyID0gdGhpcy5zb3J0RmllbGQgPyB0aGlzLnNvcnRPcmRlciA6IHRoaXMuZ3JvdXBSb3dzQnlPcmRlcjtcbiAgICAgICAgaWYgKHRoaXMuZ3JvdXBSb3dzQnkgJiYgdGhpcy5zb3J0RmllbGQgJiYgdGhpcy5ncm91cFJvd3NCeSAhPT0gdGhpcy5zb3J0RmllbGQpIHtcbiAgICAgICAgICAgIHRoaXMuX211bHRpU29ydE1ldGEgPSBbdGhpcy5nZXRHcm91cFJvd3NNZXRhKCksIHsgZmllbGQ6IHRoaXMuc29ydEZpZWxkLCBvcmRlcjogdGhpcy5zb3J0T3JkZXIgfV07XG4gICAgICAgICAgICB0aGlzLnNvcnRNdWx0aXBsZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpZWxkICYmIG9yZGVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXN0b3JpbmdTb3J0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JpbmdTb3J0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxhenkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXN0b21Tb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEZ1bmN0aW9uLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IHRoaXMuc29ydE1vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogZmllbGQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogb3JkZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZS5zb3J0KChkYXRhMSwgZGF0YTIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZTEgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKGRhdGExLCBmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUyID0gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShkYXRhMiwgZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZTEgPT0gbnVsbCAmJiB2YWx1ZTIgIT0gbnVsbCkgcmVzdWx0ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZTEgIT0gbnVsbCAmJiB2YWx1ZTIgPT0gbnVsbCkgcmVzdWx0ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiA9PSBudWxsKSByZXN1bHQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlMSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlMiA9PT0gJ3N0cmluZycpIHJlc3VsdCA9IHZhbHVlMS5sb2NhbGVDb21wYXJlKHZhbHVlMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJlc3VsdCA9IHZhbHVlMSA8IHZhbHVlMiA/IC0xIDogdmFsdWUxID4gdmFsdWUyID8gMSA6IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmRlciAqIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBbLi4udGhpcy52YWx1ZV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzRmlsdGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc29ydE1ldGE6IFNvcnRNZXRhID0ge1xuICAgICAgICAgICAgICAgIGZpZWxkOiBmaWVsZCxcbiAgICAgICAgICAgICAgICBvcmRlcjogb3JkZXJcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMub25Tb3J0LmVtaXQoc29ydE1ldGEpO1xuICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Tb3J0KHNvcnRNZXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNvcnRNdWx0aXBsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ3JvdXBSb3dzQnkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fbXVsdGlTb3J0TWV0YSkgdGhpcy5fbXVsdGlTb3J0TWV0YSA9IFt0aGlzLmdldEdyb3VwUm93c01ldGEoKV07XG4gICAgICAgICAgICBlbHNlIGlmICgoPFNvcnRNZXRhW10+dGhpcy5tdWx0aVNvcnRNZXRhKVswXS5maWVsZCAhPT0gdGhpcy5ncm91cFJvd3NCeSkgdGhpcy5fbXVsdGlTb3J0TWV0YSA9IFt0aGlzLmdldEdyb3VwUm93c01ldGEoKSwgLi4udGhpcy5fbXVsdGlTb3J0TWV0YV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tdWx0aVNvcnRNZXRhKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sYXp5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxhenlMb2FkLmVtaXQodGhpcy5jcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tU29ydCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRGdW5jdGlvbi5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiB0aGlzLnNvcnRNb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlTb3J0TWV0YTogdGhpcy5tdWx0aVNvcnRNZXRhXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUuc29ydCgoZGF0YTEsIGRhdGEyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXNvcnRGaWVsZChkYXRhMSwgZGF0YTIsIDxTb3J0TWV0YVtdPnRoaXMubXVsdGlTb3J0TWV0YSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gWy4uLnRoaXMudmFsdWVdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc0ZpbHRlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbHRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vblNvcnQuZW1pdCh7XG4gICAgICAgICAgICAgICAgbXVsdGlzb3J0bWV0YTogPFNvcnRNZXRhW10+dGhpcy5tdWx0aVNvcnRNZXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uU29ydCh0aGlzLm11bHRpU29ydE1ldGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbXVsdGlzb3J0RmllbGQoZGF0YTE6IGFueSwgZGF0YTI6IGFueSwgbXVsdGlTb3J0TWV0YTogU29ydE1ldGFbXSwgaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgICAgIGNvbnN0IHZhbHVlMSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoZGF0YTEsIG11bHRpU29ydE1ldGFbaW5kZXhdLmZpZWxkKTtcbiAgICAgICAgY29uc3QgdmFsdWUyID0gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShkYXRhMiwgbXVsdGlTb3J0TWV0YVtpbmRleF0uZmllbGQpO1xuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuY29tcGFyZSh2YWx1ZTEsIHZhbHVlMiwgdGhpcy5maWx0ZXJMb2NhbGUpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbXVsdGlTb3J0TWV0YS5sZW5ndGggLSAxID4gaW5kZXggPyB0aGlzLm11bHRpc29ydEZpZWxkKGRhdGExLCBkYXRhMiwgbXVsdGlTb3J0TWV0YSwgaW5kZXggKyAxKSA6IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZVZhbHVlc09uU29ydCh2YWx1ZTEsIHZhbHVlMiwgbXVsdGlTb3J0TWV0YVtpbmRleF0ub3JkZXIpO1xuICAgIH1cblxuICAgIGNvbXBhcmVWYWx1ZXNPblNvcnQodmFsdWUxOiBhbnksIHZhbHVlMjogYW55LCBvcmRlcjogYW55KSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5zb3J0KHZhbHVlMSwgdmFsdWUyLCBvcmRlciwgdGhpcy5maWx0ZXJMb2NhbGUsIHRoaXMuc29ydE9yZGVyKTtcbiAgICB9XG5cbiAgICBnZXRTb3J0TWV0YShmaWVsZDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLm11bHRpU29ydE1ldGEgJiYgdGhpcy5tdWx0aVNvcnRNZXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm11bHRpU29ydE1ldGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tdWx0aVNvcnRNZXRhW2ldLmZpZWxkID09PSBmaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tdWx0aVNvcnRNZXRhW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlzU29ydGVkKGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuc29ydE1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zb3J0RmllbGQgJiYgdGhpcy5zb3J0RmllbGQgPT09IGZpZWxkO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc29ydE1vZGUgPT09ICdtdWx0aXBsZScpIHtcbiAgICAgICAgICAgIGxldCBzb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0aGlzLm11bHRpU29ydE1ldGEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubXVsdGlTb3J0TWV0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tdWx0aVNvcnRNZXRhW2ldLmZpZWxkID09IGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc29ydGVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlUm93Q2xpY2soZXZlbnQ6IGFueSkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gPEhUTUxFbGVtZW50PmV2ZW50Lm9yaWdpbmFsRXZlbnQudGFyZ2V0O1xuICAgICAgICBsZXQgdGFyZ2V0Tm9kZSA9IHRhcmdldC5ub2RlTmFtZTtcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSB0YXJnZXQucGFyZW50RWxlbWVudCAmJiB0YXJnZXQucGFyZW50RWxlbWVudC5ub2RlTmFtZTtcbiAgICAgICAgaWYgKHRhcmdldE5vZGUgPT0gJ0lOUFVUJyB8fCB0YXJnZXROb2RlID09ICdCVVRUT04nIHx8IHRhcmdldE5vZGUgPT0gJ0EnIHx8IHBhcmVudE5vZGUgPT0gJ0lOUFVUJyB8fCBwYXJlbnROb2RlID09ICdCVVRUT04nIHx8IHBhcmVudE5vZGUgPT0gJ0EnIHx8IERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQub3JpZ2luYWxFdmVudC50YXJnZXQsICdwLWNsaWNrYWJsZScpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlKSB7XG4gICAgICAgICAgICBsZXQgcm93RGF0YSA9IGV2ZW50LnJvd0RhdGE7XG4gICAgICAgICAgICBsZXQgcm93SW5kZXggPSBldmVudC5yb3dJbmRleDtcblxuICAgICAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbk1vZGUoKSAmJiBldmVudC5vcmlnaW5hbEV2ZW50LnNoaWZ0S2V5ICYmIHRoaXMuYW5jaG9yUm93SW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yYW5nZVJvd0luZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvblJhbmdlKGV2ZW50Lm9yaWdpbmFsRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VSb3dJbmRleCA9IHJvd0luZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0UmFuZ2UoZXZlbnQub3JpZ2luYWxFdmVudCwgcm93SW5kZXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLmlzU2VsZWN0ZWQocm93RGF0YSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGVkICYmICF0aGlzLmlzUm93U2VsZWN0YWJsZShyb3dEYXRhLCByb3dJbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBtZXRhU2VsZWN0aW9uID0gdGhpcy5yb3dUb3VjaGVkID8gZmFsc2UgOiB0aGlzLm1ldGFLZXlTZWxlY3Rpb247XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZSA9IHRoaXMuZGF0YUtleSA/IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpIDogbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmFuY2hvclJvd0luZGV4ID0gcm93SW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5nZVJvd0luZGV4ID0gcm93SW5kZXg7XG5cbiAgICAgICAgICAgICAgICBpZiAobWV0YVNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWV0YUtleSA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQubWV0YUtleSB8fCBldmVudC5vcmlnaW5hbEV2ZW50LmN0cmxLZXk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICYmIG1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0aW9uSW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKHJvd0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsOiBhbnksIGk6IG51bWJlcikgPT4gaSAhPSBzZWxlY3Rpb25JbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUm93VW5zZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdyb3cnIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSByb3dEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQocm93RGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24gfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5cyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IFsuLi50aGlzLnNlbGVjdGlvbiwgcm93RGF0YV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAncm93JywgaW5kZXg6IHJvd0luZGV4IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJvd1Vuc2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAncm93JywgaW5kZXg6IHJvd0luZGV4IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSByb3dEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdyb3cnLCBpbmRleDogcm93SW5kZXggfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aXBsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3Rpb25JbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24ocm93RGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWw6IGFueSwgaTogbnVtYmVyKSA9PiBpICE9IHNlbGVjdGlvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUm93VW5zZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdyb3cnLCBpbmRleDogcm93SW5kZXggfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbiA/IFsuLi50aGlzLnNlbGVjdGlvbiwgcm93RGF0YV0gOiBbcm93RGF0YV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJvd1NlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ3JvdycsIGluZGV4OiByb3dJbmRleCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvd1RvdWNoZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBoYW5kbGVSb3dUb3VjaEVuZChldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5yb3dUb3VjaGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBoYW5kbGVSb3dSaWdodENsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dE1lbnUpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd0RhdGEgPSBldmVudC5yb3dEYXRhO1xuICAgICAgICAgICAgY29uc3Qgcm93SW5kZXggPSBldmVudC5yb3dJbmRleDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dE1lbnVTZWxlY3Rpb25Nb2RlID09PSAnc2VwYXJhdGUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudVNlbGVjdGlvbiA9IHJvd0RhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudVNlbGVjdGlvbkNoYW5nZS5lbWl0KHJvd0RhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMub25Db250ZXh0TWVudVNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgZGF0YTogcm93RGF0YSwgaW5kZXg6IGV2ZW50LnJvd0luZGV4IH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuc2hvdyhldmVudC5vcmlnaW5hbEV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vbkNvbnRleHRNZW51KHJvd0RhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnRleHRNZW51U2VsZWN0aW9uTW9kZSA9PT0gJ2pvaW50Jykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvblNldHRlclByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLmlzU2VsZWN0ZWQocm93RGF0YSk7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZSA9IHRoaXMuZGF0YUtleSA/IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpIDogbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmICghc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzUm93U2VsZWN0YWJsZShyb3dEYXRhLCByb3dJbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHJvd0RhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHJvd0RhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24gPyBbLi4udGhpcy5zZWxlY3Rpb24sIHJvd0RhdGFdIDogW3Jvd0RhdGFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuc2hvdyhldmVudC5vcmlnaW5hbEV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29udGV4dE1lbnVTZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBkYXRhOiByb3dEYXRhLCBpbmRleDogZXZlbnQucm93SW5kZXggfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RSYW5nZShldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQsIHJvd0luZGV4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHJhbmdlU3RhcnQsIHJhbmdlRW5kO1xuXG4gICAgICAgIGlmICg8bnVtYmVyPnRoaXMuYW5jaG9yUm93SW5kZXggPiByb3dJbmRleCkge1xuICAgICAgICAgICAgcmFuZ2VTdGFydCA9IHJvd0luZGV4O1xuICAgICAgICAgICAgcmFuZ2VFbmQgPSB0aGlzLmFuY2hvclJvd0luZGV4O1xuICAgICAgICB9IGVsc2UgaWYgKDxudW1iZXI+dGhpcy5hbmNob3JSb3dJbmRleCA8IHJvd0luZGV4KSB7XG4gICAgICAgICAgICByYW5nZVN0YXJ0ID0gdGhpcy5hbmNob3JSb3dJbmRleDtcbiAgICAgICAgICAgIHJhbmdlRW5kID0gcm93SW5kZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByYW5nZVN0YXJ0ID0gcm93SW5kZXg7XG4gICAgICAgICAgICByYW5nZUVuZCA9IHJvd0luZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGF6eSAmJiB0aGlzLnBhZ2luYXRvcikge1xuICAgICAgICAgICAgKHJhbmdlU3RhcnQgYXMgbnVtYmVyKSAtPSA8bnVtYmVyPnRoaXMuZmlyc3Q7XG4gICAgICAgICAgICAocmFuZ2VFbmQgYXMgbnVtYmVyKSAtPSA8bnVtYmVyPnRoaXMuZmlyc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmFuZ2VSb3dzRGF0YSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gPG51bWJlcj5yYW5nZVN0YXJ0OyBpIDw9IDxudW1iZXI+cmFuZ2VFbmQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHJhbmdlUm93RGF0YSA9IHRoaXMuZmlsdGVyZWRWYWx1ZSA/IHRoaXMuZmlsdGVyZWRWYWx1ZVtpXSA6IHRoaXMudmFsdWVbaV07XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZChyYW5nZVJvd0RhdGEpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzUm93U2VsZWN0YWJsZShyYW5nZVJvd0RhdGEsIHJvd0luZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByYW5nZVJvd3NEYXRhLnB1c2gocmFuZ2VSb3dEYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBbLi4udGhpcy5zZWxlY3Rpb24sIHJhbmdlUm93RGF0YV07XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZSA9IHRoaXMuZGF0YUtleSA/IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJhbmdlUm93RGF0YSwgdGhpcy5kYXRhS2V5KSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgdGhpcy5vblJvd1NlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGRhdGE6IHJhbmdlUm93c0RhdGEsIHR5cGU6ICdyb3cnIH0pO1xuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uUmFuZ2UoZXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGxldCByYW5nZVN0YXJ0LCByYW5nZUVuZDtcbiAgICAgICAgbGV0IHJhbmdlUm93SW5kZXggPSA8bnVtYmVyPnRoaXMucmFuZ2VSb3dJbmRleDtcbiAgICAgICAgbGV0IGFuY2hvclJvd0luZGV4ID0gPG51bWJlcj50aGlzLmFuY2hvclJvd0luZGV4O1xuXG4gICAgICAgIGlmIChyYW5nZVJvd0luZGV4ID4gYW5jaG9yUm93SW5kZXgpIHtcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSB0aGlzLmFuY2hvclJvd0luZGV4O1xuICAgICAgICAgICAgcmFuZ2VFbmQgPSB0aGlzLnJhbmdlUm93SW5kZXg7XG4gICAgICAgIH0gZWxzZSBpZiAocmFuZ2VSb3dJbmRleCA8IGFuY2hvclJvd0luZGV4KSB7XG4gICAgICAgICAgICByYW5nZVN0YXJ0ID0gdGhpcy5yYW5nZVJvd0luZGV4O1xuICAgICAgICAgICAgcmFuZ2VFbmQgPSB0aGlzLmFuY2hvclJvd0luZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmFuZ2VTdGFydCA9IHRoaXMucmFuZ2VSb3dJbmRleDtcbiAgICAgICAgICAgIHJhbmdlRW5kID0gdGhpcy5yYW5nZVJvd0luZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDxudW1iZXI+cmFuZ2VTdGFydDsgaSA8PSA8bnVtYmVyPnJhbmdlRW5kOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByYW5nZVJvd0RhdGEgPSB0aGlzLnZhbHVlW2ldO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbkluZGV4ID0gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihyYW5nZVJvd0RhdGEpO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWw6IGFueSwgaTogbnVtYmVyKSA9PiBpICE9IHNlbGVjdGlvbkluZGV4KTtcbiAgICAgICAgICAgIGxldCBkYXRhS2V5VmFsdWUgPSB0aGlzLmRhdGFLZXkgPyBTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyYW5nZVJvd0RhdGEsIHRoaXMuZGF0YUtleSkpIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uUm93VW5zZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBkYXRhOiByYW5nZVJvd0RhdGEsIHR5cGU6ICdyb3cnIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChyb3dEYXRhOiBhbnkpIHtcbiAgICAgICAgaWYgKHJvd0RhdGEgJiYgdGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFLZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25LZXlzW09iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KV0gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zZWxlY3Rpb24pKSByZXR1cm4gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihyb3dEYXRhKSA+IC0xO1xuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuZXF1YWxzKHJvd0RhdGEsIHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmaW5kSW5kZXhJblNlbGVjdGlvbihyb3dEYXRhOiBhbnkpIHtcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSAtMTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uICYmIHRoaXMuc2VsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVxdWFscyhyb3dEYXRhLCB0aGlzLnNlbGVjdGlvbltpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgaXNSb3dTZWxlY3RhYmxlKGRhdGE6IGFueSwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5yb3dTZWxlY3RhYmxlICYmICF0aGlzLnJvd1NlbGVjdGFibGUoeyBkYXRhLCBpbmRleCB9KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdG9nZ2xlUm93V2l0aFJhZGlvKGV2ZW50OiBhbnksIHJvd0RhdGE6IGFueSkge1xuICAgICAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb25TZXR0ZXJQcm9wYWdhdGlvbiA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uICE9IHJvd0RhdGEpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1Jvd1NlbGVjdGFibGUocm93RGF0YSwgZXZlbnQucm93SW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSByb3dEYXRhO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBpbmRleDogZXZlbnQucm93SW5kZXgsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdyYWRpb2J1dHRvbicgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFLZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMub25Sb3dVbnNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgaW5kZXg6IGV2ZW50LnJvd0luZGV4LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAncmFkaW9idXR0b24nIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25TZWxlY3Rpb25DaGFuZ2UoKTtcblxuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVSb3dXaXRoQ2hlY2tib3goZXZlbnQ6IGFueSwgcm93RGF0YTogYW55KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24gfHwgW107XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChyb3dEYXRhKTtcbiAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZSA9IHRoaXMuZGF0YUtleSA/IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpIDogbnVsbDtcbiAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSB0cnVlO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbkluZGV4ID0gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihyb3dEYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsOiBhbnksIGk6IG51bWJlcikgPT4gaSAhPSBzZWxlY3Rpb25JbmRleCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMub25Sb3dVbnNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgaW5kZXg6IGV2ZW50LnJvd0luZGV4LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAnY2hlY2tib3gnIH0pO1xuICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1Jvd1NlbGVjdGFibGUocm93RGF0YSwgZXZlbnQucm93SW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbiA/IFsuLi50aGlzLnNlbGVjdGlvbiwgcm93RGF0YV0gOiBbcm93RGF0YV07XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGluZGV4OiBldmVudC5yb3dJbmRleCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ2NoZWNrYm94JyB9KTtcbiAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xuICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVJvd3NXaXRoQ2hlY2tib3goZXZlbnQ6IEV2ZW50LCBjaGVjazogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0QWxsICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEFsbENoYW5nZS5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGNoZWNrZWQ6IGNoZWNrIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuc2VsZWN0aW9uUGFnZU9ubHkgPyB0aGlzLmRhdGFUb1JlbmRlcih0aGlzLnByb2Nlc3NlZERhdGEpIDogdGhpcy5wcm9jZXNzZWREYXRhO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uUGFnZU9ubHkgJiYgdGhpcy5fc2VsZWN0aW9uID8gdGhpcy5fc2VsZWN0aW9uLmZpbHRlcigoczogYW55KSA9PiAhZGF0YS5zb21lKChkOiBhbnkpID0+IHRoaXMuZXF1YWxzKHMsIGQpKSkgOiBbXTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5mcm96ZW5WYWx1ZSA/IFsuLi5zZWxlY3Rpb24sIC4uLnRoaXMuZnJvemVuVmFsdWUsIC4uLmRhdGFdIDogWy4uLnNlbGVjdGlvbiwgLi4uZGF0YV07XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5yb3dTZWxlY3RhYmxlID8gc2VsZWN0aW9uLmZpbHRlcigoZGF0YTogYW55LCBpbmRleDogbnVtYmVyKSA9PiB0aGlzLnJvd1NlbGVjdGFibGUoeyBkYXRhLCBpbmRleCB9KSkgOiBzZWxlY3Rpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHNlbGVjdGlvbjtcbiAgICAgICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvblNldHRlclByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uS2V5cygpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLl9zZWxlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25TZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICAgICAgICAgIHRoaXMub25IZWFkZXJDaGVja2JveFRvZ2dsZS5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGNoZWNrZWQ6IGNoZWNrIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXF1YWxzKGRhdGExOiBhbnksIGRhdGEyOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZVNlbGVjdGlvbkJ5ID09PSAnZXF1YWxzJyA/IGRhdGExID09PSBkYXRhMiA6IE9iamVjdFV0aWxzLmVxdWFscyhkYXRhMSwgZGF0YTIsIHRoaXMuZGF0YUtleSk7XG4gICAgfVxuXG4gICAgLyogTGVnYWN5IEZpbHRlcmluZyBmb3IgY3VzdG9tIGVsZW1lbnRzICovXG4gICAgZmlsdGVyKHZhbHVlOiBhbnksIGZpZWxkOiBzdHJpbmcsIG1hdGNoTW9kZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlclRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZpbHRlclRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pc0ZpbHRlckJsYW5rKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzW2ZpZWxkXSA9IHsgdmFsdWU6IHZhbHVlLCBtYXRjaE1vZGU6IG1hdGNoTW9kZSB9O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZmlsdGVyc1tmaWVsZF0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmZpbHRlcnNbZmllbGRdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maWx0ZXJUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9maWx0ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyVGltZW91dCA9IG51bGw7XG4gICAgICAgIH0sIHRoaXMuZmlsdGVyRGVsYXkpO1xuXG4gICAgICAgIHRoaXMuYW5jaG9yUm93SW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIGZpbHRlckdsb2JhbCh2YWx1ZTogYW55LCBtYXRjaE1vZGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmZpbHRlcih2YWx1ZSwgJ2dsb2JhbCcsIG1hdGNoTW9kZSk7XG4gICAgfVxuXG4gICAgaXNGaWx0ZXJCbGFuayhmaWx0ZXI6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZmlsdGVyICE9PSBudWxsICYmIGZpbHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnICYmIGZpbHRlci50cmltKCkubGVuZ3RoID09IDApIHx8IChBcnJheS5pc0FycmF5KGZpbHRlcikgJiYgZmlsdGVyLmxlbmd0aCA9PSAwKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBfZmlsdGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVzdG9yaW5nRmlsdGVyKSB7XG4gICAgICAgICAgICB0aGlzLmZpcnN0ID0gMDtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RDaGFuZ2UuZW1pdCh0aGlzLmZpcnN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxhenkpIHtcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0ZpbHRlcigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZFZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbFJlY29yZHMgPSB0aGlzLnZhbHVlID8gdGhpcy52YWx1ZS5sZW5ndGggOiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGdsb2JhbEZpbHRlckZpZWxkc0FycmF5O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcnNbJ2dsb2JhbCddKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb2x1bW5zICYmICF0aGlzLmdsb2JhbEZpbHRlckZpZWxkcykgdGhyb3cgbmV3IEVycm9yKCdHbG9iYWwgZmlsdGVyaW5nIHJlcXVpcmVzIGR5bmFtaWMgY29sdW1ucyBvciBnbG9iYWxGaWx0ZXJGaWVsZHMgdG8gYmUgZGVmaW5lZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBnbG9iYWxGaWx0ZXJGaWVsZHNBcnJheSA9IHRoaXMuZ2xvYmFsRmlsdGVyRmllbGRzIHx8IHRoaXMuY29sdW1ucztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkVmFsdWUgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxNYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBnbG9iYWxNYXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxGaWx0ZXJlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gdGhpcy5maWx0ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJzLmhhc093blByb3BlcnR5KHByb3ApICYmIHByb3AgIT09ICdnbG9iYWwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxGaWx0ZXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlckZpZWxkID0gcHJvcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyTWV0YSA9IHRoaXMuZmlsdGVyc1tmaWx0ZXJGaWVsZF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXJNZXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBtZXRhIG9mIGZpbHRlck1ldGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsTWF0Y2ggPSB0aGlzLmV4ZWN1dGVMb2NhbEZpbHRlcihmaWx0ZXJGaWVsZCwgdGhpcy52YWx1ZVtpXSwgbWV0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobWV0YS5vcGVyYXRvciA9PT0gRmlsdGVyT3BlcmF0b3IuT1IgJiYgbG9jYWxNYXRjaCkgfHwgKG1ldGEub3BlcmF0b3IgPT09IEZpbHRlck9wZXJhdG9yLkFORCAmJiAhbG9jYWxNYXRjaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsTWF0Y2ggPSB0aGlzLmV4ZWN1dGVMb2NhbEZpbHRlcihmaWx0ZXJGaWVsZCwgdGhpcy52YWx1ZVtpXSwgPGFueT5maWx0ZXJNZXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxvY2FsTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyc1snZ2xvYmFsJ10gJiYgIWdsb2JhbE1hdGNoICYmIGdsb2JhbEZpbHRlckZpZWxkc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdsb2JhbEZpbHRlckZpZWxkc0FycmF5Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdsb2JhbEZpbHRlckZpZWxkID0gZ2xvYmFsRmlsdGVyRmllbGRzQXJyYXlbal0uZmllbGQgfHwgZ2xvYmFsRmlsdGVyRmllbGRzQXJyYXlbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTWF0Y2ggPSAoPGFueT50aGlzLmZpbHRlclNlcnZpY2UpLmZpbHRlcnNbKDxhbnk+dGhpcy5maWx0ZXJzWydnbG9iYWwnXSkubWF0Y2hNb2RlXShPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHRoaXMudmFsdWVbaV0sIGdsb2JhbEZpbHRlckZpZWxkKSwgKDxGaWx0ZXJNZXRhZGF0YT50aGlzLmZpbHRlcnNbJ2dsb2JhbCddKS52YWx1ZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdsb2JhbE1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXRjaGVzOiBib29sZWFuO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJzWydnbG9iYWwnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyA9IGxvY2FsRmlsdGVyZWQgPyBsb2NhbEZpbHRlcmVkICYmIGxvY2FsTWF0Y2ggJiYgZ2xvYmFsTWF0Y2ggOiBnbG9iYWxNYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBsb2NhbEZpbHRlcmVkICYmIGxvY2FsTWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZFZhbHVlLnB1c2godGhpcy52YWx1ZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJlZFZhbHVlLmxlbmd0aCA9PT0gdGhpcy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZFZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbFJlY29yZHMgPSB0aGlzLmZpbHRlcmVkVmFsdWUgPyB0aGlzLmZpbHRlcmVkVmFsdWUubGVuZ3RoIDogdGhpcy52YWx1ZSA/IHRoaXMudmFsdWUubGVuZ3RoIDogMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uRmlsdGVyLmVtaXQoe1xuICAgICAgICAgICAgZmlsdGVyczogPHsgW3M6IHN0cmluZ106IEZpbHRlck1ldGFkYXRhIHwgdW5kZWZpbmVkIH0+dGhpcy5maWx0ZXJzLFxuICAgICAgICAgICAgZmlsdGVyZWRWYWx1ZTogdGhpcy5maWx0ZXJlZFZhbHVlIHx8IHRoaXMudmFsdWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25WYWx1ZUNoYW5nZSh0aGlzLnZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkgJiYgIXRoaXMucmVzdG9yaW5nRmlsdGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVzdG9yaW5nRmlsdGVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlc3RvcmluZ0ZpbHRlciA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0U2Nyb2xsVG9wKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleGVjdXRlTG9jYWxGaWx0ZXIoZmllbGQ6IHN0cmluZywgcm93RGF0YTogYW55LCBmaWx0ZXJNZXRhOiBGaWx0ZXJNZXRhZGF0YSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSBmaWx0ZXJNZXRhLnZhbHVlO1xuICAgICAgICBsZXQgZmlsdGVyTWF0Y2hNb2RlID0gZmlsdGVyTWV0YS5tYXRjaE1vZGUgfHwgRmlsdGVyTWF0Y2hNb2RlLlNUQVJUU19XSVRIO1xuICAgICAgICBsZXQgZGF0YUZpZWxkVmFsdWUgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIGZpZWxkKTtcbiAgICAgICAgbGV0IGZpbHRlckNvbnN0cmFpbnQgPSAoPGFueT50aGlzLmZpbHRlclNlcnZpY2UpLmZpbHRlcnNbZmlsdGVyTWF0Y2hNb2RlXTtcblxuICAgICAgICByZXR1cm4gZmlsdGVyQ29uc3RyYWludChkYXRhRmllbGRWYWx1ZSwgZmlsdGVyVmFsdWUsIHRoaXMuZmlsdGVyTG9jYWxlKTtcbiAgICB9XG5cbiAgICBoYXNGaWx0ZXIoKSB7XG4gICAgICAgIGxldCBlbXB0eSA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gdGhpcy5maWx0ZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgZW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhZW1wdHk7XG4gICAgfVxuXG4gICAgY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpOiBhbnkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXG4gICAgICAgICAgICByb3dzOiB0aGlzLnJvd3MsXG4gICAgICAgICAgICBzb3J0RmllbGQ6IHRoaXMuc29ydEZpZWxkLFxuICAgICAgICAgICAgc29ydE9yZGVyOiB0aGlzLnNvcnRPcmRlcixcbiAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMuZmlsdGVycyxcbiAgICAgICAgICAgIGdsb2JhbEZpbHRlcjogdGhpcy5maWx0ZXJzICYmIHRoaXMuZmlsdGVyc1snZ2xvYmFsJ10gPyAoPEZpbHRlck1ldGFkYXRhPnRoaXMuZmlsdGVyc1snZ2xvYmFsJ10pLnZhbHVlIDogbnVsbCxcbiAgICAgICAgICAgIG11bHRpU29ydE1ldGE6IHRoaXMubXVsdGlTb3J0TWV0YSxcbiAgICAgICAgICAgIGZvcmNlVXBkYXRlOiAoKSA9PiB0aGlzLmNkLmRldGVjdENoYW5nZXMoKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fc29ydEZpZWxkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc29ydE9yZGVyID0gdGhpcy5kZWZhdWx0U29ydE9yZGVyO1xuICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Tb3J0KG51bGwpO1xuXG4gICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJWYWx1ZXMoKTtcblxuICAgICAgICB0aGlzLmZpbHRlcmVkVmFsdWUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZmlyc3QgPSAwO1xuICAgICAgICB0aGlzLmZpcnN0Q2hhbmdlLmVtaXQodGhpcy5maXJzdCk7XG5cbiAgICAgICAgaWYgKHRoaXMubGF6eSkge1xuICAgICAgICAgICAgdGhpcy5vbkxhenlMb2FkLmVtaXQodGhpcy5jcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50b3RhbFJlY29yZHMgPSB0aGlzLl92YWx1ZSA/IHRoaXMuX3ZhbHVlLmxlbmd0aCA6IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckZpbHRlclZhbHVlcygpIHtcbiAgICAgICAgZm9yIChjb25zdCBbLCBmaWx0ZXJNZXRhZGF0YV0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5maWx0ZXJzKSkge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyTWV0YWRhdGEpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZmlsdGVyIG9mIGZpbHRlck1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXJNZXRhZGF0YSkge1xuICAgICAgICAgICAgICAgIGZpbHRlck1ldGFkYXRhLnZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgZ2V0RXhwb3J0SGVhZGVyKGNvbHVtbjogYW55KSB7XG4gICAgICAgIHJldHVybiBjb2x1bW5bPHN0cmluZz50aGlzLmV4cG9ydEhlYWRlcl0gfHwgY29sdW1uLmhlYWRlciB8fCBjb2x1bW4uZmllbGQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERhdGEgZXhwb3J0IG1ldGhvZC5cbiAgICAgKiBAcGFyYW0ge0V4cG9ydENTVk9wdGlvbnN9IG9iamVjdCAtIEV4cG9ydCBvcHRpb25zLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgZXhwb3J0Q1NWKG9wdGlvbnM/OiBFeHBvcnRDU1ZPcHRpb25zKSB7XG4gICAgICAgIGxldCBkYXRhO1xuICAgICAgICBsZXQgY3N2ID0gJyc7XG4gICAgICAgIGxldCBjb2x1bW5zID0gdGhpcy5jb2x1bW5zO1xuXG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuc2VsZWN0aW9uT25seSkge1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMuc2VsZWN0aW9uIHx8IFtdO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5hbGxWYWx1ZXMpIHtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnZhbHVlIHx8IFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMuZmlsdGVyZWRWYWx1ZSB8fCB0aGlzLnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5mcm96ZW5WYWx1ZSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhID8gWy4uLnRoaXMuZnJvemVuVmFsdWUsIC4uLmRhdGFdIDogdGhpcy5mcm96ZW5WYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGV4cG9ydGFibGVDb2x1bW5zOiBhbnlbXSA9ICg8YW55W10+Y29sdW1ucykuZmlsdGVyKChjb2x1bW4pID0+IGNvbHVtbi5leHBvcnRhYmxlICE9PSBmYWxzZSAmJiBjb2x1bW4uZmllbGQpO1xuXG4gICAgICAgIC8vaGVhZGVyc1xuICAgICAgICBjc3YgKz0gZXhwb3J0YWJsZUNvbHVtbnMubWFwKChjb2x1bW4pID0+ICdcIicgKyB0aGlzLmdldEV4cG9ydEhlYWRlcihjb2x1bW4pICsgJ1wiJykuam9pbih0aGlzLmNzdlNlcGFyYXRvcik7XG5cbiAgICAgICAgLy9ib2R5XG4gICAgICAgIGNvbnN0IGJvZHkgPSBkYXRhXG4gICAgICAgICAgICAubWFwKChyZWNvcmQ6IGFueSkgPT5cbiAgICAgICAgICAgICAgICBleHBvcnRhYmxlQ29sdW1uc1xuICAgICAgICAgICAgICAgICAgICAubWFwKChjb2x1bW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGF0YSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocmVjb3JkLCBjb2x1bW4uZmllbGQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbERhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4cG9ydEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxEYXRhID0gdGhpcy5leHBvcnRGdW5jdGlvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBjZWxsRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBjb2x1bW4uZmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGNlbGxEYXRhID0gU3RyaW5nKGNlbGxEYXRhKS5yZXBsYWNlKC9cIi9nLCAnXCJcIicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGNlbGxEYXRhID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnXCInICsgY2VsbERhdGEgKyAnXCInO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuam9pbih0aGlzLmNzdlNlcGFyYXRvcilcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5qb2luKCdcXG4nKTtcblxuICAgICAgICBpZiAoYm9keS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNzdiArPSAnXFxuJyArIGJvZHk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFtuZXcgVWludDhBcnJheShbMHhlZiwgMHhiYiwgMHhiZl0pLCBjc3ZdLCB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dC9jc3Y7Y2hhcnNldD11dGYtODsnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBsaW5rID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGxpbmsuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIGxpbmspO1xuICAgICAgICBpZiAobGluay5kb3dubG9hZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYikpO1xuICAgICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgdGhpcy5leHBvcnRGaWxlbmFtZSArICcuY3N2Jyk7XG4gICAgICAgICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjc3YgPSAnZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LCcgKyBjc3Y7XG4gICAgICAgICAgICB0aGlzLndpbmRvdy5vcGVuKGVuY29kZVVSSShjc3YpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgbGluayk7XG4gICAgfVxuXG4gICAgb25MYXp5SXRlbUxvYWQoZXZlbnQ6IExhenlMb2FkTWV0YSkge1xuICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh7XG4gICAgICAgICAgICAuLi50aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSxcbiAgICAgICAgICAgIC4uLmV2ZW50LFxuICAgICAgICAgICAgcm93czogPG51bWJlcj5ldmVudC5sYXN0IC0gPG51bWJlcj5ldmVudC5maXJzdFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzZXRzIHNjcm9sbCB0byB0b3AuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyByZXNldFNjcm9sbFRvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCkgdGhpcy5zY3JvbGxUb1ZpcnR1YWxJbmRleCgwKTtcbiAgICAgICAgZWxzZSB0aGlzLnNjcm9sbFRvKHsgdG9wOiAwIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTY3JvbGxzIHRvIGdpdmVuIGluZGV4IHdoZW4gdXNpbmcgdmlydHVhbCBzY3JvbGwuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gaW5kZXggb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBzY3JvbGxUb1ZpcnR1YWxJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsZXIgJiYgdGhpcy5zY3JvbGxlci5zY3JvbGxUb0luZGV4KGluZGV4KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2Nyb2xscyB0byBnaXZlbiBpbmRleC5cbiAgICAgKiBAcGFyYW0ge1Njcm9sbFRvT3B0aW9uc30gb3B0aW9ucyAtIHNjcm9sbCBvcHRpb25zLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgc2Nyb2xsVG8ob3B0aW9uczogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsZXI/LnNjcm9sbFRvKG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMud3JhcHBlclZpZXdDaGlsZCAmJiB0aGlzLndyYXBwZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMud3JhcHBlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG8ob3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSBvcHRpb25zLmxlZnQ7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gb3B0aW9ucy50b3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVFZGl0aW5nQ2VsbChjZWxsOiBhbnksIGRhdGE6IGFueSwgZmllbGQ6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLmVkaXRpbmdDZWxsID0gY2VsbDtcbiAgICAgICAgdGhpcy5lZGl0aW5nQ2VsbERhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmVkaXRpbmdDZWxsRmllbGQgPSBmaWVsZDtcbiAgICAgICAgdGhpcy5lZGl0aW5nQ2VsbFJvd0luZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuYmluZERvY3VtZW50RWRpdExpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgaXNFZGl0aW5nQ2VsbFZhbGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0aW5nQ2VsbCAmJiBEb21IYW5kbGVyLmZpbmQodGhpcy5lZGl0aW5nQ2VsbCwgJy5uZy1pbnZhbGlkLm5nLWRpcnR5JykubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIGJpbmREb2N1bWVudEVkaXRMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50RWRpdExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RWRpdExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5kb2N1bWVudCwgJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdGluZ0NlbGwgJiYgIXRoaXMuc2VsZkNsaWNrICYmIHRoaXMuaXNFZGl0aW5nQ2VsbFZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmVkaXRpbmdDZWxsLCAncC1jZWxsLWVkaXRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0aW5nQ2VsbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25FZGl0Q29tcGxldGUuZW1pdCh7IGZpZWxkOiB0aGlzLmVkaXRpbmdDZWxsRmllbGQsIGRhdGE6IHRoaXMuZWRpdGluZ0NlbGxEYXRhLCBvcmlnaW5hbEV2ZW50OiBldmVudCwgaW5kZXg6IDxudW1iZXI+dGhpcy5lZGl0aW5nQ2VsbFJvd0luZGV4IH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdDZWxsRmllbGQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdDZWxsRGF0YSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdGluZ0NlbGxSb3dJbmRleCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRFZGl0TGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5U3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZkNsaWNrID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50RWRpdExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudEVkaXRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVkaXRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVkaXRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0Um93RWRpdChyb3dEYXRhOiBhbnkpIHtcbiAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZSA9IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpO1xuICAgICAgICB0aGlzLmVkaXRpbmdSb3dLZXlzW2RhdGFLZXlWYWx1ZV0gPSB0cnVlO1xuICAgIH1cblxuICAgIHNhdmVSb3dFZGl0KHJvd0RhdGE6IGFueSwgcm93RWxlbWVudDogSFRNTFRhYmxlUm93RWxlbWVudCkge1xuICAgICAgICBpZiAoRG9tSGFuZGxlci5maW5kKHJvd0VsZW1lbnQsICcubmctaW52YWxpZC5uZy1kaXJ0eScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZSA9IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZWRpdGluZ1Jvd0tleXNbZGF0YUtleVZhbHVlXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbmNlbFJvd0VkaXQocm93RGF0YTogYW55KSB7XG4gICAgICAgIGxldCBkYXRhS2V5VmFsdWUgPSBTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuZWRpdGluZ1Jvd0tleXNbZGF0YUtleVZhbHVlXTtcbiAgICB9XG5cbiAgICB0b2dnbGVSb3cocm93RGF0YTogYW55LCBldmVudD86IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kYXRhS2V5ICYmICF0aGlzLmdyb3VwUm93c0J5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGFLZXkgb3IgZ3JvdXBSb3dzQnkgbXVzdCBiZSBkZWZpbmVkIHRvIHVzZSByb3cgZXhwYW5zaW9uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gdGhpcy5ncm91cFJvd3NCeSA/IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZ3JvdXBSb3dzQnkpKSA6IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpO1xuXG4gICAgICAgIGlmICh0aGlzLmV4cGFuZGVkUm93S2V5c1tkYXRhS2V5VmFsdWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmV4cGFuZGVkUm93S2V5c1tkYXRhS2V5VmFsdWVdO1xuICAgICAgICAgICAgdGhpcy5vblJvd0NvbGxhcHNlLmVtaXQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IDxFdmVudD5ldmVudCxcbiAgICAgICAgICAgICAgICBkYXRhOiByb3dEYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvd0V4cGFuZE1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRlZFJvd0tleXMgPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5leHBhbmRlZFJvd0tleXNbZGF0YUtleVZhbHVlXSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uUm93RXhwYW5kLmVtaXQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IDxFdmVudD5ldmVudCxcbiAgICAgICAgICAgICAgICBkYXRhOiByb3dEYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xuICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzUm93RXhwYW5kZWQocm93RGF0YTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwUm93c0J5ID8gdGhpcy5leHBhbmRlZFJvd0tleXNbU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5ncm91cFJvd3NCeSkpXSA9PT0gdHJ1ZSA6IHRoaXMuZXhwYW5kZWRSb3dLZXlzW1N0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpXSA9PT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpc1Jvd0VkaXRpbmcocm93RGF0YTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRpbmdSb3dLZXlzW1N0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpXSA9PT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdzaW5nbGUnO1xuICAgIH1cblxuICAgIGlzTXVsdGlwbGVTZWxlY3Rpb25Nb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGlwbGUnO1xuICAgIH1cblxuICAgIG9uQ29sdW1uUmVzaXplQmVnaW4oZXZlbnQ6IGFueSkge1xuICAgICAgICBsZXQgY29udGFpbmVyTGVmdCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRoaXMuY29udGFpbmVyVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KS5sZWZ0O1xuICAgICAgICB0aGlzLnJlc2l6ZUNvbHVtbkVsZW1lbnQgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgICAgdGhpcy5jb2x1bW5SZXNpemluZyA9IHRydWU7XG4gICAgICAgIHRoaXMubGFzdFJlc2l6ZXJIZWxwZXJYID0gZXZlbnQucGFnZVggLSBjb250YWluZXJMZWZ0ICsgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICAgICAgdGhpcy5vbkNvbHVtblJlc2l6ZShldmVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25Db2x1bW5SZXNpemUoZXZlbnQ6IGFueSkge1xuICAgICAgICBsZXQgY29udGFpbmVyTGVmdCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRoaXMuY29udGFpbmVyVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KS5sZWZ0O1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LCAncC11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgICAgICAoPEVsZW1lbnRSZWY+dGhpcy5yZXNpemVIZWxwZXJWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5jb250YWluZXJWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgKDxFbGVtZW50UmVmPnRoaXMucmVzaXplSGVscGVyVmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IDAgKyAncHgnO1xuICAgICAgICAoPEVsZW1lbnRSZWY+dGhpcy5yZXNpemVIZWxwZXJWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IGV2ZW50LnBhZ2VYIC0gY29udGFpbmVyTGVmdCArIHRoaXMuY29udGFpbmVyVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgKyAncHgnO1xuXG4gICAgICAgICg8RWxlbWVudFJlZj50aGlzLnJlc2l6ZUhlbHBlclZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICBvbkNvbHVtblJlc2l6ZUVuZCgpIHtcbiAgICAgICAgbGV0IGRlbHRhID0gdGhpcy5yZXNpemVIZWxwZXJWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdCAtIDxudW1iZXI+dGhpcy5sYXN0UmVzaXplckhlbHBlclg7XG4gICAgICAgIGxldCBjb2x1bW5XaWR0aCA9IHRoaXMucmVzaXplQ29sdW1uRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IG5ld0NvbHVtbldpZHRoID0gY29sdW1uV2lkdGggKyBkZWx0YTtcbiAgICAgICAgbGV0IG1pbldpZHRoID0gdGhpcy5yZXNpemVDb2x1bW5FbGVtZW50LnN0eWxlLm1pbldpZHRoLnJlcGxhY2UoL1teXFxkLl0vZywgJycpIHx8IDE1O1xuXG4gICAgICAgIGlmIChuZXdDb2x1bW5XaWR0aCA+PSBtaW5XaWR0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29sdW1uUmVzaXplTW9kZSA9PT0gJ2ZpdCcpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENvbHVtbiA9IHRoaXMucmVzaXplQ29sdW1uRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRDb2x1bW5XaWR0aCA9IG5leHRDb2x1bW4ub2Zmc2V0V2lkdGggLSBkZWx0YTtcblxuICAgICAgICAgICAgICAgIGlmIChuZXdDb2x1bW5XaWR0aCA+IDE1ICYmIG5leHRDb2x1bW5XaWR0aCA+IDE1KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzaXplVGFibGVDZWxscyhuZXdDb2x1bW5XaWR0aCwgbmV4dENvbHVtbldpZHRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29sdW1uUmVzaXplTW9kZSA9PT0gJ2V4cGFuZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0aWFsQ29sV2lkdGhzID0gdGhpcy5fdG90YWxUYWJsZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgbGV0IHRhYmxlV2lkdGggPSB0aGlzLnRhYmxlVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoICsgZGVsdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldFJlc2l6ZVRhYmxlV2lkdGgodGFibGVXaWR0aCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplVGFibGVDZWxscyhuZXdDb2x1bW5XaWR0aCwgbnVsbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Db2xSZXNpemUuZW1pdCh7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogdGhpcy5yZXNpemVDb2x1bW5FbGVtZW50LFxuICAgICAgICAgICAgICAgIGRlbHRhOiBkZWx0YVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAoPEVsZW1lbnRSZWY+dGhpcy5yZXNpemVIZWxwZXJWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCwgJ3AtdW5zZWxlY3RhYmxlLXRleHQnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90b3RhbFRhYmxlV2lkdGgoKTogbnVtYmVyW10ge1xuICAgICAgICBsZXQgd2lkdGhzID0gW107XG4gICAgICAgIGNvbnN0IHRhYmxlSGVhZCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtZGF0YXRhYmxlLXRoZWFkJyk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gRG9tSGFuZGxlci5maW5kKHRhYmxlSGVhZCwgJ3RyID4gdGgnKTtcbiAgICAgICAgaGVhZGVycy5mb3JFYWNoKChoZWFkZXIpID0+IHdpZHRocy5wdXNoKERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aChoZWFkZXIpKSk7XG5cbiAgICAgICAgcmV0dXJuIHdpZHRocztcbiAgICB9XG5cbiAgICBvbkNvbHVtbkRyYWdTdGFydChldmVudDogYW55LCBjb2x1bW5FbGVtZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5yZW9yZGVySWNvbldpZHRoID0gRG9tSGFuZGxlci5nZXRIaWRkZW5FbGVtZW50T3V0ZXJXaWR0aCh0aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMucmVvcmRlckljb25IZWlnaHQgPSBEb21IYW5kbGVyLmdldEhpZGRlbkVsZW1lbnRPdXRlckhlaWdodCh0aGlzLnJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5kcmFnZ2VkQ29sdW1uID0gY29sdW1uRWxlbWVudDtcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCAnYicpOyAvLyBGb3IgZmlyZWZveFxuICAgIH1cblxuICAgIG9uQ29sdW1uRHJhZ0VudGVyKGV2ZW50OiBhbnksIGRyb3BIZWFkZXI6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5yZW9yZGVyYWJsZUNvbHVtbnMgJiYgdGhpcy5kcmFnZ2VkQ29sdW1uICYmIGRyb3BIZWFkZXIpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgY29udGFpbmVyT2Zmc2V0ID0gRG9tSGFuZGxlci5nZXRPZmZzZXQodGhpcy5jb250YWluZXJWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgbGV0IGRyb3BIZWFkZXJPZmZzZXQgPSBEb21IYW5kbGVyLmdldE9mZnNldChkcm9wSGVhZGVyKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ2dlZENvbHVtbiAhPSBkcm9wSGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRyYWdJbmRleCA9IERvbUhhbmRsZXIuaW5kZXhXaXRoaW5Hcm91cCh0aGlzLmRyYWdnZWRDb2x1bW4sICdwcmVvcmRlcmFibGVjb2x1bW4nKTtcbiAgICAgICAgICAgICAgICBsZXQgZHJvcEluZGV4ID0gRG9tSGFuZGxlci5pbmRleFdpdGhpbkdyb3VwKGRyb3BIZWFkZXIsICdwcmVvcmRlcmFibGVjb2x1bW4nKTtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0TGVmdCA9IGRyb3BIZWFkZXJPZmZzZXQubGVmdCAtIGNvbnRhaW5lck9mZnNldC5sZWZ0O1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRUb3AgPSBjb250YWluZXJPZmZzZXQudG9wIC0gZHJvcEhlYWRlck9mZnNldC50b3A7XG4gICAgICAgICAgICAgICAgbGV0IGNvbHVtbkNlbnRlciA9IGRyb3BIZWFkZXJPZmZzZXQubGVmdCArIGRyb3BIZWFkZXIub2Zmc2V0V2lkdGggLyAyO1xuXG4gICAgICAgICAgICAgICAgKDxFbGVtZW50UmVmPnRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IGRyb3BIZWFkZXJPZmZzZXQudG9wIC0gY29udGFpbmVyT2Zmc2V0LnRvcCAtICg8bnVtYmVyPnRoaXMucmVvcmRlckljb25IZWlnaHQgLSAxKSArICdweCc7XG4gICAgICAgICAgICAgICAgKDxFbGVtZW50UmVmPnRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gZHJvcEhlYWRlck9mZnNldC50b3AgLSBjb250YWluZXJPZmZzZXQudG9wICsgZHJvcEhlYWRlci5vZmZzZXRIZWlnaHQgKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnBhZ2VYID4gY29sdW1uQ2VudGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICg8RWxlbWVudFJlZj50aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gdGFyZ2V0TGVmdCArIGRyb3BIZWFkZXIub2Zmc2V0V2lkdGggLSBNYXRoLmNlaWwoPG51bWJlcj50aGlzLnJlb3JkZXJJY29uV2lkdGggLyAyKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICg8RWxlbWVudFJlZj50aGlzLnJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSB0YXJnZXRMZWZ0ICsgZHJvcEhlYWRlci5vZmZzZXRXaWR0aCAtIE1hdGguY2VpbCg8bnVtYmVyPnRoaXMucmVvcmRlckljb25XaWR0aCAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wUG9zaXRpb24gPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICg8RWxlbWVudFJlZj50aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gdGFyZ2V0TGVmdCAtIE1hdGguY2VpbCg8bnVtYmVyPnRoaXMucmVvcmRlckljb25XaWR0aCAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgKDxFbGVtZW50UmVmPnRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IHRhcmdldExlZnQgLSBNYXRoLmNlaWwoPG51bWJlcj50aGlzLnJlb3JkZXJJY29uV2lkdGggLyAyKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcFBvc2l0aW9uID0gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICg8RWxlbWVudFJlZj50aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICAoPEVsZW1lbnRSZWY+dGhpcy5yZW9yZGVySW5kaWNhdG9yRG93blZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNvbHVtbkRyYWdMZWF2ZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVvcmRlcmFibGVDb2x1bW5zICYmIHRoaXMuZHJhZ2dlZENvbHVtbikge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ29sdW1uRHJvcChldmVudDogRXZlbnQsIGRyb3BDb2x1bW46IGFueSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5kcmFnZ2VkQ29sdW1uKSB7XG4gICAgICAgICAgICBsZXQgZHJhZ0luZGV4ID0gRG9tSGFuZGxlci5pbmRleFdpdGhpbkdyb3VwKHRoaXMuZHJhZ2dlZENvbHVtbiwgJ3ByZW9yZGVyYWJsZWNvbHVtbicpO1xuICAgICAgICAgICAgbGV0IGRyb3BJbmRleCA9IERvbUhhbmRsZXIuaW5kZXhXaXRoaW5Hcm91cChkcm9wQ29sdW1uLCAncHJlb3JkZXJhYmxlY29sdW1uJyk7XG4gICAgICAgICAgICBsZXQgYWxsb3dEcm9wID0gZHJhZ0luZGV4ICE9IGRyb3BJbmRleDtcbiAgICAgICAgICAgIGlmIChhbGxvd0Ryb3AgJiYgKChkcm9wSW5kZXggLSBkcmFnSW5kZXggPT0gMSAmJiB0aGlzLmRyb3BQb3NpdGlvbiA9PT0gLTEpIHx8IChkcmFnSW5kZXggLSBkcm9wSW5kZXggPT0gMSAmJiB0aGlzLmRyb3BQb3NpdGlvbiA9PT0gMSkpKSB7XG4gICAgICAgICAgICAgICAgYWxsb3dEcm9wID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbGxvd0Ryb3AgJiYgZHJvcEluZGV4IDwgZHJhZ0luZGV4ICYmIHRoaXMuZHJvcFBvc2l0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZHJvcEluZGV4ID0gZHJvcEluZGV4ICsgMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFsbG93RHJvcCAmJiBkcm9wSW5kZXggPiBkcmFnSW5kZXggJiYgdGhpcy5kcm9wUG9zaXRpb24gPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZHJvcEluZGV4ID0gZHJvcEluZGV4IC0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFsbG93RHJvcCkge1xuICAgICAgICAgICAgICAgIE9iamVjdFV0aWxzLnJlb3JkZXJBcnJheSg8YW55W10+dGhpcy5jb2x1bW5zLCBkcmFnSW5kZXgsIGRyb3BJbmRleCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29sUmVvcmRlci5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ0luZGV4OiBkcmFnSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGRyb3BJbmRleDogZHJvcEluZGV4LFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNvbHVtbnNcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnJlc2l6YWJsZUNvbHVtbnMgJiYgdGhpcy5yZXNpemVDb2x1bW5FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5jb2x1bW5SZXNpemVNb2RlID09PSAnZXhwYW5kJyA/IHRoaXMuX2luaXRpYWxDb2xXaWR0aHMgOiB0aGlzLl90b3RhbFRhYmxlV2lkdGgoKTtcbiAgICAgICAgICAgICAgICBPYmplY3RVdGlscy5yZW9yZGVyQXJyYXkod2lkdGgsIGRyYWdJbmRleCArIDEsIGRyb3BJbmRleCArIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU3R5bGVFbGVtZW50KHdpZHRoLCBkcmFnSW5kZXgsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAoPEVsZW1lbnRSZWY+dGhpcy5yZW9yZGVySW5kaWNhdG9yVXBWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICg8RWxlbWVudFJlZj50aGlzLnJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLmRyYWdnZWRDb2x1bW4uZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRyYWdnZWRDb2x1bW4gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5kcm9wUG9zaXRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzaXplVGFibGVDZWxscyhuZXdDb2x1bW5XaWR0aDogbnVtYmVyLCBuZXh0Q29sdW1uV2lkdGg6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgbGV0IGNvbEluZGV4ID0gRG9tSGFuZGxlci5pbmRleCh0aGlzLnJlc2l6ZUNvbHVtbkVsZW1lbnQpO1xuICAgICAgICBsZXQgd2lkdGggPSB0aGlzLmNvbHVtblJlc2l6ZU1vZGUgPT09ICdleHBhbmQnID8gdGhpcy5faW5pdGlhbENvbFdpZHRocyA6IHRoaXMuX3RvdGFsVGFibGVXaWR0aCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVN0eWxlRWxlbWVudCh3aWR0aCwgY29sSW5kZXgsIG5ld0NvbHVtbldpZHRoLCBuZXh0Q29sdW1uV2lkdGgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVN0eWxlRWxlbWVudCh3aWR0aDogbnVtYmVyW10sIGNvbEluZGV4OiBudW1iZXIsIG5ld0NvbHVtbldpZHRoOiBudW1iZXIsIG5leHRDb2x1bW5XaWR0aDogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3lTdHlsZUVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVTdHlsZUVsZW1lbnQoKTtcblxuICAgICAgICBsZXQgaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHdpZHRoLmZvckVhY2goKHdpZHRoLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbFdpZHRoID0gaW5kZXggPT09IGNvbEluZGV4ID8gbmV3Q29sdW1uV2lkdGggOiBuZXh0Q29sdW1uV2lkdGggJiYgaW5kZXggPT09IGNvbEluZGV4ICsgMSA/IG5leHRDb2x1bW5XaWR0aCA6IHdpZHRoO1xuICAgICAgICAgICAgbGV0IHN0eWxlID0gYHdpZHRoOiAke2NvbFdpZHRofXB4ICFpbXBvcnRhbnQ7IG1heC13aWR0aDogJHtjb2xXaWR0aH1weCAhaW1wb3J0YW50O2A7XG4gICAgICAgICAgICBpbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgICAgICMke3RoaXMuaWR9LXRhYmxlID4gLnAtZGF0YXRhYmxlLXRoZWFkID4gdHIgPiB0aDpudGgtY2hpbGQoJHtpbmRleCArIDF9KSxcbiAgICAgICAgICAgICAgICAjJHt0aGlzLmlkfS10YWJsZSA+IC5wLWRhdGF0YWJsZS10Ym9keSA+IHRyID4gdGQ6bnRoLWNoaWxkKCR7aW5kZXggKyAxfSksXG4gICAgICAgICAgICAgICAgIyR7dGhpcy5pZH0tdGFibGUgPiAucC1kYXRhdGFibGUtdGZvb3QgPiB0ciA+IHRkOm50aC1jaGlsZCgke2luZGV4ICsgMX0pIHtcbiAgICAgICAgICAgICAgICAgICAgJHtzdHlsZX1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnN0eWxlRWxlbWVudCwgJ2lubmVySFRNTCcsIGlubmVySFRNTCk7XG4gICAgfVxuXG4gICAgb25Sb3dEcmFnU3RhcnQoZXZlbnQ6IGFueSwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnJvd0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kcmFnZ2VkUm93SW5kZXggPSBpbmRleDtcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCAnYicpOyAvLyBGb3IgZmlyZWZveFxuICAgIH1cblxuICAgIG9uUm93RHJhZ092ZXIoZXZlbnQ6IE1vdXNlRXZlbnQsIGluZGV4OiBudW1iZXIsIHJvd0VsZW1lbnQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5yb3dEcmFnZ2luZyAmJiB0aGlzLmRyYWdnZWRSb3dJbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgICAgICAgIGxldCByb3dZID0gRG9tSGFuZGxlci5nZXRPZmZzZXQocm93RWxlbWVudCkudG9wO1xuICAgICAgICAgICAgbGV0IHBhZ2VZID0gZXZlbnQucGFnZVk7XG4gICAgICAgICAgICBsZXQgcm93TWlkWSA9IHJvd1kgKyBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHJvd0VsZW1lbnQpIC8gMjtcbiAgICAgICAgICAgIGxldCBwcmV2Um93RWxlbWVudCA9IHJvd0VsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcblxuICAgICAgICAgICAgaWYgKHBhZ2VZIDwgcm93TWlkWSkge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3Mocm93RWxlbWVudCwgJ3AtZGF0YXRhYmxlLWRyYWdwb2ludC1ib3R0b20nKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcHBlZFJvd0luZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZSb3dFbGVtZW50KSBEb21IYW5kbGVyLmFkZENsYXNzKHByZXZSb3dFbGVtZW50LCAncC1kYXRhdGFibGUtZHJhZ3BvaW50LWJvdHRvbScpO1xuICAgICAgICAgICAgICAgIGVsc2UgRG9tSGFuZGxlci5hZGRDbGFzcyhyb3dFbGVtZW50LCAncC1kYXRhdGFibGUtZHJhZ3BvaW50LXRvcCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldlJvd0VsZW1lbnQpIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MocHJldlJvd0VsZW1lbnQsICdwLWRhdGF0YWJsZS1kcmFncG9pbnQtYm90dG9tJyk7XG4gICAgICAgICAgICAgICAgZWxzZSBEb21IYW5kbGVyLmFkZENsYXNzKHJvd0VsZW1lbnQsICdwLWRhdGF0YWJsZS1kcmFncG9pbnQtdG9wJyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BwZWRSb3dJbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHJvd0VsZW1lbnQsICdwLWRhdGF0YWJsZS1kcmFncG9pbnQtYm90dG9tJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblJvd0RyYWdMZWF2ZShldmVudDogRXZlbnQsIHJvd0VsZW1lbnQ6IGFueSkge1xuICAgICAgICBsZXQgcHJldlJvd0VsZW1lbnQgPSByb3dFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGlmIChwcmV2Um93RWxlbWVudCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhwcmV2Um93RWxlbWVudCwgJ3AtZGF0YXRhYmxlLWRyYWdwb2ludC1ib3R0b20nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3Mocm93RWxlbWVudCwgJ3AtZGF0YXRhYmxlLWRyYWdwb2ludC1ib3R0b20nKTtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhyb3dFbGVtZW50LCAncC1kYXRhdGFibGUtZHJhZ3BvaW50LXRvcCcpO1xuICAgIH1cblxuICAgIG9uUm93RHJhZ0VuZChldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5yb3dEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRyYWdnZWRSb3dJbmRleCA9IG51bGw7XG4gICAgICAgIHRoaXMuZHJvcHBlZFJvd0luZGV4ID0gbnVsbDtcbiAgICB9XG5cbiAgICBvblJvd0Ryb3AoZXZlbnQ6IEV2ZW50LCByb3dFbGVtZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJvcHBlZFJvd0luZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBkcm9wSW5kZXggPSA8bnVtYmVyPnRoaXMuZHJhZ2dlZFJvd0luZGV4ID4gdGhpcy5kcm9wcGVkUm93SW5kZXggPyB0aGlzLmRyb3BwZWRSb3dJbmRleCA6IHRoaXMuZHJvcHBlZFJvd0luZGV4ID09PSAwID8gMCA6IHRoaXMuZHJvcHBlZFJvd0luZGV4IC0gMTtcbiAgICAgICAgICAgIE9iamVjdFV0aWxzLnJlb3JkZXJBcnJheSh0aGlzLnZhbHVlLCA8bnVtYmVyPnRoaXMuZHJhZ2dlZFJvd0luZGV4LCBkcm9wSW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogQ2hlY2tcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IFsuLi50aGlzLl92YWx1ZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Sb3dSZW9yZGVyLmVtaXQoe1xuICAgICAgICAgICAgICAgIGRyYWdJbmRleDogPG51bWJlcj50aGlzLmRyYWdnZWRSb3dJbmRleCxcbiAgICAgICAgICAgICAgICBkcm9wSW5kZXg6IGRyb3BJbmRleFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9jbGVhbnVwXG4gICAgICAgIHRoaXMub25Sb3dEcmFnTGVhdmUoZXZlbnQsIHJvd0VsZW1lbnQpO1xuICAgICAgICB0aGlzLm9uUm93RHJhZ0VuZChldmVudCk7XG4gICAgfVxuXG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmZpbHRlcmVkVmFsdWUgfHwgdGhpcy52YWx1ZTtcbiAgICAgICAgcmV0dXJuIGRhdGEgPT0gbnVsbCB8fCBkYXRhLmxlbmd0aCA9PSAwO1xuICAgIH1cblxuICAgIGdldEJsb2NrYWJsZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIGdldFN0b3JhZ2UoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGVTdG9yYWdlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbG9jYWwnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3Nlc3Npb24nOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnNlc3Npb25TdG9yYWdlO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuc3RhdGVTdG9yYWdlICsgJyBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdGhlIHN0YXRlIHN0b3JhZ2UsIHN1cHBvcnRlZCB2YWx1ZXMgYXJlIFwibG9jYWxcIiBhbmQgXCJzZXNzaW9uXCIuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jyb3dzZXIgc3RvcmFnZSBpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBzZXJ2ZXIgc2lkZS4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzU3RhdGVmdWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlS2V5ICE9IG51bGw7XG4gICAgfVxuXG4gICAgc2F2ZVN0YXRlKCkge1xuICAgICAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlKCk7XG4gICAgICAgIGxldCBzdGF0ZTogVGFibGVTdGF0ZSA9IHt9O1xuXG4gICAgICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xuICAgICAgICAgICAgc3RhdGUuZmlyc3QgPSA8bnVtYmVyPnRoaXMuZmlyc3Q7XG4gICAgICAgICAgICBzdGF0ZS5yb3dzID0gdGhpcy5yb3dzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc29ydEZpZWxkKSB7XG4gICAgICAgICAgICBzdGF0ZS5zb3J0RmllbGQgPSB0aGlzLnNvcnRGaWVsZDtcbiAgICAgICAgICAgIHN0YXRlLnNvcnRPcmRlciA9IHRoaXMuc29ydE9yZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlTb3J0TWV0YSkge1xuICAgICAgICAgICAgc3RhdGUubXVsdGlTb3J0TWV0YSA9IHRoaXMubXVsdGlTb3J0TWV0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc0ZpbHRlcigpKSB7XG4gICAgICAgICAgICBzdGF0ZS5maWx0ZXJzID0gdGhpcy5maWx0ZXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVzaXphYmxlQ29sdW1ucykge1xuICAgICAgICAgICAgdGhpcy5zYXZlQ29sdW1uV2lkdGhzKHN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlb3JkZXJhYmxlQ29sdW1ucykge1xuICAgICAgICAgICAgdGhpcy5zYXZlQ29sdW1uT3JkZXIoc3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBzdGF0ZS5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmV4cGFuZGVkUm93S2V5cykubGVuZ3RoKSB7XG4gICAgICAgICAgICBzdGF0ZS5leHBhbmRlZFJvd0tleXMgPSB0aGlzLmV4cGFuZGVkUm93S2V5cztcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbSg8c3RyaW5nPnRoaXMuc3RhdGVLZXksIEpTT04uc3RyaW5naWZ5KHN0YXRlKSk7XG4gICAgICAgIHRoaXMub25TdGF0ZVNhdmUuZW1pdChzdGF0ZSk7XG4gICAgfVxuXG4gICAgY2xlYXJTdGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlS2V5KSB7XG4gICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5zdGF0ZUtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN0b3JlU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKTtcbiAgICAgICAgY29uc3Qgc3RhdGVTdHJpbmcgPSBzdG9yYWdlLmdldEl0ZW0oPHN0cmluZz50aGlzLnN0YXRlS2V5KTtcbiAgICAgICAgY29uc3QgZGF0ZUZvcm1hdCA9IC9cXGR7NH0tXFxkezJ9LVxcZHsyfVRcXGR7Mn06XFxkezJ9OlxcZHsyfS5cXGR7M31aLztcbiAgICAgICAgY29uc3QgcmV2aXZlciA9IGZ1bmN0aW9uIChrZXk6IGFueSwgdmFsdWU6IGFueSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgZGF0ZUZvcm1hdC50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoc3RhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgIGxldCBzdGF0ZTogVGFibGVTdGF0ZSA9IEpTT04ucGFyc2Uoc3RhdGVTdHJpbmcsIHJldml2ZXIpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maXJzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3QgPSBzdGF0ZS5maXJzdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuZmlyc3QpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvd3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3MgPSBzdGF0ZS5yb3dzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3NDaGFuZ2UuZW1pdCh0aGlzLnJvd3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0YXRlLnNvcnRGaWVsZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yaW5nU29ydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fc29ydEZpZWxkID0gc3RhdGUuc29ydEZpZWxkO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NvcnRPcmRlciA9IDxudW1iZXI+c3RhdGUuc29ydE9yZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhdGUubXVsdGlTb3J0TWV0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yaW5nU29ydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fbXVsdGlTb3J0TWV0YSA9IHN0YXRlLm11bHRpU29ydE1ldGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGF0ZS5maWx0ZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JpbmdGaWx0ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVycyA9IHN0YXRlLmZpbHRlcnM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnJlc2l6YWJsZUNvbHVtbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbldpZHRoc1N0YXRlID0gc3RhdGUuY29sdW1uV2lkdGhzO1xuICAgICAgICAgICAgICAgIHRoaXMudGFibGVXaWR0aFN0YXRlID0gc3RhdGUudGFibGVXaWR0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgKHRoaXMucmVvcmRlcmFibGVDb2x1bW5zKSB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5yZXN0b3JlQ29sdW1uT3JkZXIoKTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgaWYgKHN0YXRlLmV4cGFuZGVkUm93S2V5cykge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kZWRSb3dLZXlzID0gc3RhdGUuZXhwYW5kZWRSb3dLZXlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhdGUuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChzdGF0ZS5zZWxlY3Rpb24pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zdGF0ZVJlc3RvcmVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5vblN0YXRlUmVzdG9yZS5lbWl0KHN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmVDb2x1bW5XaWR0aHMoc3RhdGU6IGFueSkge1xuICAgICAgICBsZXQgd2lkdGhzOiBhbnlbXSA9IFtdO1xuICAgICAgICBsZXQgaGVhZGVycyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCwgJy5wLWRhdGF0YWJsZS10aGVhZCA+IHRyID4gdGgnKTtcbiAgICAgICAgaGVhZGVycy5mb3JFYWNoKChoZWFkZXIpID0+IHdpZHRocy5wdXNoKERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aChoZWFkZXIpKSk7XG4gICAgICAgIHN0YXRlLmNvbHVtbldpZHRocyA9IHdpZHRocy5qb2luKCcsJyk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29sdW1uUmVzaXplTW9kZSA9PT0gJ2V4cGFuZCcpIHtcbiAgICAgICAgICAgIHN0YXRlLnRhYmxlV2lkdGggPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy50YWJsZVZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRSZXNpemVUYWJsZVdpZHRoKHdpZHRoOiBzdHJpbmcpIHtcbiAgICAgICAgKDxFbGVtZW50UmVmPnRoaXMudGFibGVWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSB3aWR0aDtcbiAgICAgICAgKDxFbGVtZW50UmVmPnRoaXMudGFibGVWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWluV2lkdGggPSB3aWR0aDtcbiAgICB9XG5cbiAgICByZXN0b3JlQ29sdW1uV2lkdGhzKCkge1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5XaWR0aHNTdGF0ZSkge1xuICAgICAgICAgICAgbGV0IHdpZHRocyA9IHRoaXMuY29sdW1uV2lkdGhzU3RhdGUuc3BsaXQoJywnKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29sdW1uUmVzaXplTW9kZSA9PT0gJ2V4cGFuZCcgJiYgdGhpcy50YWJsZVdpZHRoU3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFJlc2l6ZVRhYmxlV2lkdGgodGhpcy50YWJsZVdpZHRoU3RhdGUgKyAncHgnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkod2lkdGhzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU3R5bGVFbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgd2lkdGhzLmZvckVhY2goKHdpZHRoLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSBgd2lkdGg6ICR7d2lkdGh9cHggIWltcG9ydGFudDsgbWF4LXdpZHRoOiAke3dpZHRofXB4ICFpbXBvcnRhbnRgO1xuXG4gICAgICAgICAgICAgICAgICAgIGlubmVySFRNTCArPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICAjJHt0aGlzLmlkfS10YWJsZSA+IC5wLWRhdGF0YWJsZS10aGVhZCA+IHRyID4gdGg6bnRoLWNoaWxkKCR7aW5kZXggKyAxfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAjJHt0aGlzLmlkfS10YWJsZSA+IC5wLWRhdGF0YWJsZS10Ym9keSA+IHRyID4gdGQ6bnRoLWNoaWxkKCR7aW5kZXggKyAxfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAjJHt0aGlzLmlkfS10YWJsZSA+IC5wLWRhdGF0YWJsZS10Zm9vdCA+IHRyID4gdGQ6bnRoLWNoaWxkKCR7aW5kZXggKyAxfSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7c3R5bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlRWxlbWVudC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzYXZlQ29sdW1uT3JkZXIoc3RhdGU6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5zKSB7XG4gICAgICAgICAgICBsZXQgY29sdW1uT3JkZXI6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMubWFwKChjb2x1bW4pID0+IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5PcmRlci5wdXNoKGNvbHVtbi5maWVsZCB8fCBjb2x1bW4ua2V5KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzdGF0ZS5jb2x1bW5PcmRlciA9IGNvbHVtbk9yZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZUNvbHVtbk9yZGVyKCkge1xuICAgICAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlKCk7XG4gICAgICAgIGNvbnN0IHN0YXRlU3RyaW5nID0gc3RvcmFnZS5nZXRJdGVtKDxzdHJpbmc+dGhpcy5zdGF0ZUtleSk7XG4gICAgICAgIGlmIChzdGF0ZVN0cmluZykge1xuICAgICAgICAgICAgbGV0IHN0YXRlOiBUYWJsZVN0YXRlID0gSlNPTi5wYXJzZShzdGF0ZVN0cmluZyk7XG4gICAgICAgICAgICBsZXQgY29sdW1uT3JkZXIgPSBzdGF0ZS5jb2x1bW5PcmRlcjtcblxuICAgICAgICAgICAgaWYgKGNvbHVtbk9yZGVyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlb3JkZXJlZENvbHVtbnM6IGFueVtdID0gW107XG5cbiAgICAgICAgICAgICAgICBjb2x1bW5PcmRlci5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sID0gdGhpcy5maW5kQ29sdW1uQnlLZXkoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVvcmRlcmVkQ29sdW1ucy5wdXNoKGNvbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbk9yZGVyU3RhdGVSZXN0b3JlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5zID0gcmVvcmRlcmVkQ29sdW1ucztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRDb2x1bW5CeUtleShrZXk6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5zKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgb2YgdGhpcy5jb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbC5rZXkgPT09IGtleSB8fCBjb2wuZmllbGQgPT09IGtleSkgcmV0dXJuIGNvbDtcbiAgICAgICAgICAgICAgICBlbHNlIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVTdHlsZUVsZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuc3R5bGVFbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICB0aGlzLnN0eWxlRWxlbWVudC50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmhlYWQsIHRoaXMuc3R5bGVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBnZXRHcm91cFJvd3NNZXRhKCkge1xuICAgICAgICByZXR1cm4geyBmaWVsZDogdGhpcy5ncm91cFJvd3NCeSwgb3JkZXI6IHRoaXMuZ3JvdXBSb3dzQnlPcmRlciB9O1xuICAgIH1cblxuICAgIGNyZWF0ZVJlc3BvbnNpdmVTdHlsZSgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2l2ZVN0eWxlRWxlbWVudC50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuaGVhZCwgdGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGxldCBpbm5lckhUTUwgPSBgXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHt0aGlzLmJyZWFrcG9pbnR9KSB7XG4gICAgICAgICMke3RoaXMuaWR9LXRhYmxlID4gLnAtZGF0YXRhYmxlLXRoZWFkID4gdHIgPiB0aCxcbiAgICAgICAgIyR7dGhpcy5pZH0tdGFibGUgPiAucC1kYXRhdGFibGUtdGZvb3QgPiB0ciA+IHRkIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgfVxuXG4gICAgICAgICMke3RoaXMuaWR9LXRhYmxlID4gLnAtZGF0YXRhYmxlLXRib2R5ID4gdHIgPiB0ZCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIH1cblxuICAgICAgICAjJHt0aGlzLmlkfS10YWJsZSA+IC5wLWRhdGF0YWJsZS10Ym9keSA+IHRyID4gdGQ6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICAgICAgICBib3JkZXI6IDAgbm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgICMke3RoaXMuaWR9LnAtZGF0YXRhYmxlLWdyaWRsaW5lcyA+IC5wLWRhdGF0YWJsZS13cmFwcGVyID4gLnAtZGF0YXRhYmxlLXRhYmxlID4gLnAtZGF0YXRhYmxlLXRib2R5ID4gdHIgPiB0ZDpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDA7XG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDA7XG4gICAgICAgICAgICBib3JkZXItbGVmdDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgICMke3RoaXMuaWR9LXRhYmxlID4gLnAtZGF0YXRhYmxlLXRib2R5ID4gdHIgPiB0ZCA+IC5wLWNvbHVtbi10aXRsZSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBgO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50LCAnaW5uZXJIVE1MJywgaW5uZXJIVE1MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3lSZXNwb25zaXZlU3R5bGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc3BvbnNpdmVTdHlsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5kb2N1bWVudC5oZWFkLCB0aGlzLnJlc3BvbnNpdmVTdHlsZUVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3lTdHlsZUVsZW1lbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0eWxlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmRvY3VtZW50LmhlYWQsIHRoaXMuc3R5bGVFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RWRpdExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuZWRpdGluZ0NlbGwgPSBudWxsO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gbnVsbDtcblxuICAgICAgICB0aGlzLmRlc3Ryb3lTdHlsZUVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95UmVzcG9uc2l2ZVN0eWxlKCk7XG4gICAgfVxuXG4gICAgZ2V0UGFnaW5hdG9yU3R5bGVDbGFzc2VzKGNsYXNzTmFtZT86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gW3RoaXMucGFnaW5hdG9yU3R5bGVDbGFzcywgY2xhc3NOYW1lXVxuICAgICAgICAgICAgLmZpbHRlcigoYykgPT4gISFjKVxuICAgICAgICAgICAgLmpvaW4oJyAnKVxuICAgICAgICAgICAgLnRyaW0oKTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW3BUYWJsZUJvZHldJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWR0LmV4cGFuZGVkUm93VGVtcGxhdGVcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtcm93RGF0YSBsZXQtcm93SW5kZXg9XCJpbmRleFwiIFtuZ0Zvck9mXT1cInZhbHVlXCIgW25nRm9yVHJhY2tCeV09XCJkdC5yb3dUcmFja0J5XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImR0Lmdyb3VwSGVhZGVyVGVtcGxhdGUgJiYgIWR0LnZpcnR1YWxTY3JvbGwgJiYgZHQucm93R3JvdXBNb2RlID09PSAnc3ViaGVhZGVyJyAmJiBzaG91bGRSZW5kZXJSb3dHcm91cEhlYWRlcih2YWx1ZSwgcm93RGF0YSwgcm93SW5kZXgpXCIgcm9sZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cImR0Lmdyb3VwSGVhZGVyVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZ2V0Um93SW5kZXgocm93SW5kZXgpLCBjb2x1bW5zOiBjb2x1bW5zLCBlZGl0aW5nOiBkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpLCBmcm96ZW46IGZyb3plbiB9XCJcbiAgICAgICAgICAgICAgICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkdC5yb3dHcm91cE1vZGUgIT09ICdyb3dzcGFuJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cInJvd0RhdGEgPyB0ZW1wbGF0ZSA6IGR0LmxvYWRpbmdCb2R5VGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZ2V0Um93SW5kZXgocm93SW5kZXgpLCBjb2x1bW5zOiBjb2x1bW5zLCBlZGl0aW5nOiBkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpLCBmcm96ZW46IGZyb3plbiB9XCJcbiAgICAgICAgICAgICAgICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkdC5yb3dHcm91cE1vZGUgPT09ICdyb3dzcGFuJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0RhdGEgPyB0ZW1wbGF0ZSA6IGR0LmxvYWRpbmdCb2R5VGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW1wbGljaXQ6IHJvd0RhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0luZGV4OiBnZXRSb3dJbmRleChyb3dJbmRleCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGNvbHVtbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRpbmc6IGR0LmVkaXRNb2RlID09PSAncm93JyAmJiBkdC5pc1Jvd0VkaXRpbmcocm93RGF0YSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb3plbjogZnJvemVuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dncm91cDogc2hvdWxkUmVuZGVyUm93c3Bhbih2YWx1ZSwgcm93RGF0YSwgcm93SW5kZXgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzcGFuOiBjYWxjdWxhdGVSb3dHcm91cFNpemUodmFsdWUsIHJvd0RhdGEsIHJvd0luZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZHQuZ3JvdXBGb290ZXJUZW1wbGF0ZSAmJiAhZHQudmlydHVhbFNjcm9sbCAmJiBkdC5yb3dHcm91cE1vZGUgPT09ICdzdWJoZWFkZXInICYmIHNob3VsZFJlbmRlclJvd0dyb3VwRm9vdGVyKHZhbHVlLCByb3dEYXRhLCByb3dJbmRleClcIiByb2xlPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHQuZ3JvdXBGb290ZXJUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHJvd0RhdGEsIHJvd0luZGV4OiBnZXRSb3dJbmRleChyb3dJbmRleCksIGNvbHVtbnM6IGNvbHVtbnMsIGVkaXRpbmc6IGR0LmVkaXRNb2RlID09PSAncm93JyAmJiBkdC5pc1Jvd0VkaXRpbmcocm93RGF0YSksIGZyb3plbjogZnJvemVuIH1cIlxuICAgICAgICAgICAgICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImR0LmV4cGFuZGVkUm93VGVtcGxhdGUgJiYgIShmcm96ZW4gJiYgZHQuZnJvemVuRXhwYW5kZWRSb3dUZW1wbGF0ZSlcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtcm93RGF0YSBsZXQtcm93SW5kZXg9XCJpbmRleFwiIFtuZ0Zvck9mXT1cInZhbHVlXCIgW25nRm9yVHJhY2tCeV09XCJkdC5yb3dUcmFja0J5XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFkdC5ncm91cEhlYWRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZ2V0Um93SW5kZXgocm93SW5kZXgpLCBjb2x1bW5zOiBjb2x1bW5zLCBleHBhbmRlZDogZHQuaXNSb3dFeHBhbmRlZChyb3dEYXRhKSwgZWRpdGluZzogZHQuZWRpdE1vZGUgPT09ICdyb3cnICYmIGR0LmlzUm93RWRpdGluZyhyb3dEYXRhKSwgZnJvemVuOiBmcm96ZW4gfVwiXG4gICAgICAgICAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZHQuZ3JvdXBIZWFkZXJUZW1wbGF0ZSAmJiBkdC5yb3dHcm91cE1vZGUgPT09ICdzdWJoZWFkZXInICYmIHNob3VsZFJlbmRlclJvd0dyb3VwSGVhZGVyKHZhbHVlLCByb3dEYXRhLCBnZXRSb3dJbmRleChyb3dJbmRleCkpXCIgcm9sZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0Lmdyb3VwSGVhZGVyVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyAkaW1wbGljaXQ6IHJvd0RhdGEsIHJvd0luZGV4OiBnZXRSb3dJbmRleChyb3dJbmRleCksIGNvbHVtbnM6IGNvbHVtbnMsIGV4cGFuZGVkOiBkdC5pc1Jvd0V4cGFuZGVkKHJvd0RhdGEpLCBlZGl0aW5nOiBkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpLCBmcm96ZW46IGZyb3plbiB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImR0LmlzUm93RXhwYW5kZWQocm93RGF0YSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImR0LmV4cGFuZGVkUm93VGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZ2V0Um93SW5kZXgocm93SW5kZXgpLCBjb2x1bW5zOiBjb2x1bW5zLCBmcm96ZW46IGZyb3plbiB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkdC5ncm91cEZvb3RlclRlbXBsYXRlICYmIGR0LnJvd0dyb3VwTW9kZSA9PT0gJ3N1YmhlYWRlcicgJiYgc2hvdWxkUmVuZGVyUm93R3JvdXBGb290ZXIodmFsdWUsIHJvd0RhdGEsIGdldFJvd0luZGV4KHJvd0luZGV4KSlcIiByb2xlPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHQuZ3JvdXBGb290ZXJUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyAkaW1wbGljaXQ6IHJvd0RhdGEsIHJvd0luZGV4OiBnZXRSb3dJbmRleChyb3dJbmRleCksIGNvbHVtbnM6IGNvbHVtbnMsIGV4cGFuZGVkOiBkdC5pc1Jvd0V4cGFuZGVkKHJvd0RhdGEpLCBlZGl0aW5nOiBkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpLCBmcm96ZW46IGZyb3plbiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImR0LmZyb3plbkV4cGFuZGVkUm93VGVtcGxhdGUgJiYgZnJvemVuXCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXJvd0RhdGEgbGV0LXJvd0luZGV4PVwiaW5kZXhcIiBbbmdGb3JPZl09XCJ2YWx1ZVwiIFtuZ0ZvclRyYWNrQnldPVwiZHQucm93VHJhY2tCeVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHJvd0RhdGEsIHJvd0luZGV4OiBnZXRSb3dJbmRleChyb3dJbmRleCksIGNvbHVtbnM6IGNvbHVtbnMsIGV4cGFuZGVkOiBkdC5pc1Jvd0V4cGFuZGVkKHJvd0RhdGEpLCBlZGl0aW5nOiBkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpLCBmcm96ZW46IGZyb3plbiB9XCJcbiAgICAgICAgICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImR0LmlzUm93RXhwYW5kZWQocm93RGF0YSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImR0LmZyb3plbkV4cGFuZGVkUm93VGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZ2V0Um93SW5kZXgocm93SW5kZXgpLCBjb2x1bW5zOiBjb2x1bW5zLCBmcm96ZW46IGZyb3plbiB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImR0LmxvYWRpbmdcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkdC5sb2FkaW5nQm9keVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogY29sdW1ucywgZnJvemVuOiBmcm96ZW4gfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImR0LmlzRW1wdHkoKSAmJiAhZHQubG9hZGluZ1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImR0LmVtcHR5TWVzc2FnZVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogY29sdW1ucywgZnJvemVuOiBmcm96ZW4gfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZUJvZHkgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgncFRhYmxlQm9keScpIGNvbHVtbnM6IGFueVtdIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCdwVGFibGVCb2R5VGVtcGxhdGUnKSB0ZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBASW5wdXQoKSBnZXQgdmFsdWUoKTogYW55W10gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWw6IGFueVtdIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsO1xuICAgICAgICBpZiAodGhpcy5mcm96ZW5Sb3dzKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZyb3plblJvd1N0aWNreVBvc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kdC5zY3JvbGxhYmxlICYmIHRoaXMuZHQucm93R3JvdXBNb2RlID09PSAnc3ViaGVhZGVyJykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGcm96ZW5Sb3dHcm91cEhlYWRlclN0aWNreVBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZnJvemVuOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGZyb3plblJvd3M6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBzY3JvbGxlck9wdGlvbnM6IGFueTtcblxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgX3ZhbHVlOiBhbnlbXSB8IHVuZGVmaW5lZDtcblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZnJvemVuUm93cykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGcm96ZW5Sb3dTdGlja3lQb3NpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHQuc2Nyb2xsYWJsZSAmJiB0aGlzLmR0LnJvd0dyb3VwTW9kZSA9PT0gJ3N1YmhlYWRlcicpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRnJvemVuUm93R3JvdXBIZWFkZXJTdGlja3lQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS52YWx1ZVNvdXJjZSQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmR0LnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvdWxkUmVuZGVyUm93R3JvdXBIZWFkZXIodmFsdWU6IGFueSwgcm93RGF0YTogYW55LCBpOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRSb3dGaWVsZERhdGEgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZHQuZ3JvdXBSb3dzQnkpO1xuICAgICAgICBsZXQgcHJldlJvd0RhdGEgPSB2YWx1ZVtpIC0gKDEgKyB0aGlzLmR0Ll9maXJzdCldO1xuICAgICAgICBpZiAocHJldlJvd0RhdGEpIHtcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1Jvd0ZpZWxkRGF0YSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocHJldlJvd0RhdGEsIHRoaXMuZHQuZ3JvdXBSb3dzQnkpO1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRSb3dGaWVsZERhdGEgIT09IHByZXZpb3VzUm93RmllbGREYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRSZW5kZXJSb3dHcm91cEZvb3Rlcih2YWx1ZTogYW55LCByb3dEYXRhOiBhbnksIGk6IG51bWJlcikge1xuICAgICAgICBsZXQgY3VycmVudFJvd0ZpZWxkRGF0YSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kdC5ncm91cFJvd3NCeSk7XG4gICAgICAgIGxldCBuZXh0Um93RGF0YSA9IHZhbHVlW2kgKyAoMSArIHRoaXMuZHQuX2ZpcnN0KV07XG4gICAgICAgIGlmIChuZXh0Um93RGF0YSkge1xuICAgICAgICAgICAgbGV0IG5leHRSb3dGaWVsZERhdGEgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG5leHRSb3dEYXRhLCB0aGlzLmR0Lmdyb3VwUm93c0J5KTtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50Um93RmllbGREYXRhICE9PSBuZXh0Um93RmllbGREYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRSZW5kZXJSb3dzcGFuKHZhbHVlOiBhbnksIHJvd0RhdGE6IGFueSwgaTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBjdXJyZW50Um93RmllbGREYXRhID0gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmR0Lmdyb3VwUm93c0J5KTtcbiAgICAgICAgbGV0IHByZXZSb3dEYXRhID0gdmFsdWVbaSAtIDFdO1xuICAgICAgICBpZiAocHJldlJvd0RhdGEpIHtcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1Jvd0ZpZWxkRGF0YSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocHJldlJvd0RhdGEsIHRoaXMuZHQuZ3JvdXBSb3dzQnkpO1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRSb3dGaWVsZERhdGEgIT09IHByZXZpb3VzUm93RmllbGREYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjdWxhdGVSb3dHcm91cFNpemUodmFsdWU6IGFueSwgcm93RGF0YTogYW55LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBjdXJyZW50Um93RmllbGREYXRhID0gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmR0Lmdyb3VwUm93c0J5KTtcbiAgICAgICAgbGV0IG5leHRSb3dGaWVsZERhdGEgPSBjdXJyZW50Um93RmllbGREYXRhO1xuICAgICAgICBsZXQgZ3JvdXBSb3dTcGFuID0gMDtcblxuICAgICAgICB3aGlsZSAoY3VycmVudFJvd0ZpZWxkRGF0YSA9PT0gbmV4dFJvd0ZpZWxkRGF0YSkge1xuICAgICAgICAgICAgZ3JvdXBSb3dTcGFuKys7XG4gICAgICAgICAgICBsZXQgbmV4dFJvd0RhdGEgPSB2YWx1ZVsrK2luZGV4XTtcbiAgICAgICAgICAgIGlmIChuZXh0Um93RGF0YSkge1xuICAgICAgICAgICAgICAgIG5leHRSb3dGaWVsZERhdGEgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG5leHRSb3dEYXRhLCB0aGlzLmR0Lmdyb3VwUm93c0J5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ3JvdXBSb3dTcGFuID09PSAxID8gbnVsbCA6IGdyb3VwUm93U3BhbjtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRnJvemVuUm93U3RpY2t5UG9zaXRpb24oKSB7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuZWwubmF0aXZlRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSArICdweCc7XG4gICAgfVxuXG4gICAgdXBkYXRlRnJvemVuUm93R3JvdXBIZWFkZXJTdGlja3lQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZWwubmF0aXZlRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgICAgICBsZXQgdGFibGVIZWFkZXJIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuZWwubmF0aXZlRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKTtcbiAgICAgICAgICAgIHRoaXMuZHQucm93R3JvdXBIZWFkZXJTdHlsZU9iamVjdC50b3AgPSB0YWJsZUhlYWRlckhlaWdodCArICdweCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTY3JvbGxlck9wdGlvbihvcHRpb246IGFueSwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBpZiAodGhpcy5kdC52aXJ0dWFsU2Nyb2xsKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB0aGlzLnNjcm9sbGVyT3B0aW9ucztcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zID8gb3B0aW9uc1tvcHRpb25dIDogbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGdldFJvd0luZGV4KHJvd0luZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmR0LnBhZ2luYXRvciA/IDxudW1iZXI+dGhpcy5kdC5maXJzdCArIHJvd0luZGV4IDogcm93SW5kZXg7XG4gICAgICAgIGNvbnN0IGdldEl0ZW1PcHRpb25zID0gdGhpcy5nZXRTY3JvbGxlck9wdGlvbignZ2V0SXRlbU9wdGlvbnMnKTtcbiAgICAgICAgcmV0dXJuIGdldEl0ZW1PcHRpb25zID8gZ2V0SXRlbU9wdGlvbnMoaW5kZXgpLmluZGV4IDogaW5kZXg7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twUm93R3JvdXBIZWFkZXJdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1yb3dncm91cC1oZWFkZXIgcC1lbGVtZW50JyxcbiAgICAgICAgJ1tzdHlsZS50b3BdJzogJ2dldEZyb3plblJvd0dyb3VwSGVhZGVyU3RpY2t5UG9zaXRpb24nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBSb3dHcm91cEhlYWRlciB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSkge31cblxuICAgIGdldCBnZXRGcm96ZW5Sb3dHcm91cEhlYWRlclN0aWNreVBvc2l0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kdC5yb3dHcm91cEhlYWRlclN0eWxlT2JqZWN0ID8gdGhpcy5kdC5yb3dHcm91cEhlYWRlclN0eWxlT2JqZWN0LnRvcCA6ICcnO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcEZyb3plbkNvbHVtbl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnLFxuICAgICAgICAnW2NsYXNzLnAtZnJvemVuLWNvbHVtbl0nOiAnZnJvemVuJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRnJvemVuQ29sdW1uIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQElucHV0KCkgZ2V0IGZyb3plbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zyb3plbjtcbiAgICB9XG5cbiAgICBzZXQgZnJvemVuKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9mcm96ZW4gPSB2YWw7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHRoaXMudXBkYXRlU3RpY2t5UG9zaXRpb24oKSk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgYWxpZ25Gcm96ZW46IHN0cmluZyA9ICdsZWZ0JztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgem9uZTogTmdab25lKSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGlja3lQb3NpdGlvbigpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9mcm96ZW46IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgdXBkYXRlU3RpY2t5UG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9mcm96ZW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFsaWduRnJvemVuID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJpZ2h0ID0gMDtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgobmV4dCkgKyAocGFyc2VGbG9hdChuZXh0LnN0eWxlLnJpZ2h0KSB8fCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLnJpZ2h0ID0gcmlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbGVmdCA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IHByZXYgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHByZXYpICsgKHBhcnNlRmxvYXQocHJldi5zdHlsZS5sZWZ0KSB8fCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZmlsdGVyUm93ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgICAgIGlmIChmaWx0ZXJSb3cpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBEb21IYW5kbGVyLmluZGV4KHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlclJvdy5jaGlsZHJlbiAmJiBmaWx0ZXJSb3cuY2hpbGRyZW5baW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclJvdy5jaGlsZHJlbltpbmRleF0uc3R5bGUubGVmdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJSb3cuY2hpbGRyZW5baW5kZXhdLnN0eWxlLnJpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLnJpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BTb3J0YWJsZUNvbHVtbl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnLFxuICAgICAgICAnW2NsYXNzLnAtc29ydGFibGUtY29sdW1uXSc6ICdpc0VuYWJsZWQoKScsXG4gICAgICAgICdbY2xhc3MucC1oaWdobGlnaHRdJzogJ3NvcnRlZCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAnaXNFbmFibGVkKCkgPyBcIjBcIiA6IG51bGwnLFxuICAgICAgICAnW2F0dHIucm9sZV0nOiAnXCJjb2x1bW5oZWFkZXJcIicsXG4gICAgICAgICdbYXR0ci5hcmlhLXNvcnRdJzogJ3NvcnRPcmRlcidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNvcnRhYmxlQ29sdW1uIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgncFNvcnRhYmxlQ29sdW1uJykgZmllbGQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBwU29ydGFibGVDb2x1bW5EaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHNvcnRlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHNvcnRPcmRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnNvcnRTb3VyY2UkLnN1YnNjcmliZSgoc29ydE1ldGEpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNvcnRTdGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU29ydFN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVTb3J0U3RhdGUoKSB7XG4gICAgICAgIHRoaXMuc29ydGVkID0gdGhpcy5kdC5pc1NvcnRlZCg8c3RyaW5nPnRoaXMuZmllbGQpIGFzIGJvb2xlYW47XG4gICAgICAgIHRoaXMuc29ydE9yZGVyID0gdGhpcy5zb3J0ZWQgPyAodGhpcy5kdC5zb3J0T3JkZXIgPT09IDEgPyAnYXNjZW5kaW5nJyA6ICdkZXNjZW5kaW5nJykgOiAnbm9uZSc7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkgJiYgIXRoaXMuaXNGaWx0ZXJFbGVtZW50KDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNvcnRTdGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5kdC5zb3J0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5maWVsZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIERvbUhhbmRsZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uc3BhY2UnLCBbJyRldmVudCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uZW50ZXInLCBbJyRldmVudCddKVxuICAgIG9uRW50ZXJLZXkoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkNsaWNrKGV2ZW50KTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucFNvcnRhYmxlQ29sdW1uRGlzYWJsZWQgIT09IHRydWU7XG4gICAgfVxuXG4gICAgaXNGaWx0ZXJFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRmlsdGVyRWxlbWVudEljb25PckJ1dHRvbihlbGVtZW50KSB8fCB0aGlzLmlzRmlsdGVyRWxlbWVudEljb25PckJ1dHRvbihlbGVtZW50Py5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50KTtcbiAgICB9XG4gICAgcHJpdmF0ZSBpc0ZpbHRlckVsZW1lbnRJY29uT3JCdXR0b24oZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuaGFzQ2xhc3MoZWxlbWVudCwgJ3BpLWZpbHRlci1pY29uJykgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhlbGVtZW50LCAncC1jb2x1bW4tZmlsdGVyLW1lbnUtYnV0dG9uJyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXNvcnRJY29uJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWR0LnNvcnRJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgIDxTb3J0QWx0SWNvbiBbc3R5bGVDbGFzc109XCIncC1zb3J0YWJsZS1jb2x1bW4taWNvbidcIiAqbmdJZj1cInNvcnRPcmRlciA9PT0gMFwiIC8+XG4gICAgICAgICAgICA8U29ydEFtb3VudFVwQWx0SWNvbiBbc3R5bGVDbGFzc109XCIncC1zb3J0YWJsZS1jb2x1bW4taWNvbidcIiAqbmdJZj1cInNvcnRPcmRlciA9PT0gMVwiIC8+XG4gICAgICAgICAgICA8U29ydEFtb3VudERvd25JY29uIFtzdHlsZUNsYXNzXT1cIidwLXNvcnRhYmxlLWNvbHVtbi1pY29uJ1wiICpuZ0lmPVwic29ydE9yZGVyID09PSAtMVwiIC8+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImR0LnNvcnRJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtc29ydGFibGUtY29sdW1uLWljb25cIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImR0LnNvcnRJY29uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBzb3J0T3JkZXIgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJpc011bHRpU29ydGVkKClcIiBjbGFzcz1cInAtc29ydGFibGUtY29sdW1uLWJhZGdlXCI+e3sgZ2V0QmFkZ2VWYWx1ZSgpIH19PC9zcGFuPlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU29ydEljb24gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgZmllbGQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gICAgc29ydE9yZGVyOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2Uuc29ydFNvdXJjZSQuc3Vic2NyaWJlKChzb3J0TWV0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTb3J0U3RhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU29ydFN0YXRlKCk7XG4gICAgfVxuXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTb3J0U3RhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmR0LnNvcnRNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgdGhpcy5zb3J0T3JkZXIgPSB0aGlzLmR0LmlzU29ydGVkKDxzdHJpbmc+dGhpcy5maWVsZCkgPyB0aGlzLmR0LnNvcnRPcmRlciA6IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kdC5zb3J0TW9kZSA9PT0gJ211bHRpcGxlJykge1xuICAgICAgICAgICAgbGV0IHNvcnRNZXRhID0gdGhpcy5kdC5nZXRTb3J0TWV0YSg8c3RyaW5nPnRoaXMuZmllbGQpO1xuICAgICAgICAgICAgdGhpcy5zb3J0T3JkZXIgPSBzb3J0TWV0YSA/IHNvcnRNZXRhLm9yZGVyIDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0TXVsdGlTb3J0TWV0YUluZGV4KCkge1xuICAgICAgICBsZXQgbXVsdGlTb3J0TWV0YSA9IHRoaXMuZHQuX211bHRpU29ydE1ldGE7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuXG4gICAgICAgIGlmIChtdWx0aVNvcnRNZXRhICYmIHRoaXMuZHQuc29ydE1vZGUgPT09ICdtdWx0aXBsZScgJiYgdGhpcy5kdC5zaG93SW5pdGlhbFNvcnRCYWRnZSAmJiBtdWx0aVNvcnRNZXRhLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXVsdGlTb3J0TWV0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBtZXRhID0gbXVsdGlTb3J0TWV0YVtpXTtcbiAgICAgICAgICAgICAgICBpZiAobWV0YS5maWVsZCA9PT0gdGhpcy5maWVsZCB8fCBtZXRhLmZpZWxkID09PSB0aGlzLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIGdldEJhZGdlVmFsdWUoKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0TXVsdGlTb3J0TWV0YUluZGV4KCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZHQuZ3JvdXBSb3dzQnkgJiYgaW5kZXggPiAtMSA/IGluZGV4IDogaW5kZXggKyAxO1xuICAgIH1cblxuICAgIGlzTXVsdGlTb3J0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmR0LnNvcnRNb2RlID09PSAnbXVsdGlwbGUnICYmIHRoaXMuZ2V0TXVsdGlTb3J0TWV0YUluZGV4KCkgPiAtMTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twU2VsZWN0YWJsZVJvd10nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnLFxuICAgICAgICAnW2NsYXNzLnAtc2VsZWN0YWJsZS1yb3ddJzogJ2lzRW5hYmxlZCgpJyxcbiAgICAgICAgJ1tjbGFzcy5wLWhpZ2hsaWdodF0nOiAnc2VsZWN0ZWQnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3NldFJvd1RhYkluZGV4KCknLFxuICAgICAgICAnW2F0dHIuZGF0YS1wLWhpZ2hsaWdodF0nOiAnc2VsZWN0ZWQnLFxuICAgICAgICAnW2F0dHIuZGF0YS1wLXNlbGVjdGFibGUtcm93XSc6ICd0cnVlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0YWJsZVJvdyBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoJ3BTZWxlY3RhYmxlUm93JykgZGF0YTogYW55O1xuXG4gICAgQElucHV0KCdwU2VsZWN0YWJsZVJvd0luZGV4JykgaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBwU2VsZWN0YWJsZVJvd0Rpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyB0YWJsZVNlcnZpY2U6IFRhYmxlU2VydmljZSwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS5zZWxlY3Rpb25Tb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZHQuaXNTZWxlY3RlZCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRSb3dUYWJJbmRleCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZHQuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZScgfHwgdGhpcy5kdC5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuZHQuc2VsZWN0aW9uID8gMCA6IHRoaXMuZHQuYW5jaG9yUm93SW5kZXggPT09IHRoaXMuaW5kZXggPyAwIDogLTE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmR0LmlzU2VsZWN0ZWQodGhpcy5kYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5kdC5oYW5kbGVSb3dDbGljayh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgcm93RGF0YTogdGhpcy5kYXRhLFxuICAgICAgICAgICAgICAgIHJvd0luZGV4OiB0aGlzLmluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ3RvdWNoZW5kJywgWyckZXZlbnQnXSlcbiAgICBvblRvdWNoRW5kKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5kdC5oYW5kbGVSb3dUb3VjaEVuZChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0Rvd25LZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dVcEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25Ib21lS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRW5kS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgICAgIHRoaXMub25TcGFjZUtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRW50ZXJLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSAnS2V5QScgJiYgKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleSkgJiYgdGhpcy5kdC5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmR0LmRhdGFUb1JlbmRlcih0aGlzLmR0LnByb2Nlc3NlZERhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmR0LnNlbGVjdGlvbiA9IFsuLi5kYXRhXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kdC5zZWxlY3RSYW5nZShldmVudCwgZGF0YS5sZW5ndGggLSAxKTtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dEb3duS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgcm93ID0gPEhUTUxUYWJsZVJvd0VsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgY29uc3QgbmV4dFJvdyA9IHRoaXMuZmluZE5leHRTZWxlY3RhYmxlUm93KHJvdyk7XG5cbiAgICAgICAgaWYgKG5leHRSb3cpIHtcbiAgICAgICAgICAgIG5leHRSb3cuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25BcnJvd1VwS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgcm93ID0gPEhUTUxUYWJsZVJvd0VsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgY29uc3QgcHJldlJvdyA9IHRoaXMuZmluZFByZXZTZWxlY3RhYmxlUm93KHJvdyk7XG5cbiAgICAgICAgaWYgKHByZXZSb3cpIHtcbiAgICAgICAgICAgIHByZXZSb3cuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25FbnRlcktleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHQuaGFuZGxlUm93Q2xpY2soe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICByb3dEYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICByb3dJbmRleDogdGhpcy5pbmRleFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkVuZEtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBsYXN0Um93ID0gdGhpcy5maW5kTGFzdFNlbGVjdGFibGVSb3coKTtcbiAgICAgICAgbGFzdFJvdyAmJiB0aGlzLmZvY3VzUm93Q2hhbmdlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgbGFzdFJvdyk7XG5cbiAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgJiYgZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmR0LmRhdGFUb1JlbmRlcih0aGlzLmR0LnJvd3MpO1xuICAgICAgICAgICAgY29uc3QgbGFzdFNlbGVjdGFibGVSb3dJbmRleCA9IERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGxhc3RSb3csICdpbmRleCcpO1xuXG4gICAgICAgICAgICB0aGlzLmR0LmFuY2hvclJvd0luZGV4ID0gbGFzdFNlbGVjdGFibGVSb3dJbmRleDtcbiAgICAgICAgICAgIHRoaXMuZHQuc2VsZWN0aW9uID0gZGF0YS5zbGljZSh0aGlzLmluZGV4LCBkYXRhLmxlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLmR0LnNlbGVjdFJhbmdlKGV2ZW50LCB0aGlzLmluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uSG9tZUtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBmaXJzdFJvdyA9IHRoaXMuZmluZEZpcnN0U2VsZWN0YWJsZVJvdygpO1xuXG4gICAgICAgIGZpcnN0Um93ICYmIHRoaXMuZm9jdXNSb3dDaGFuZ2UodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBmaXJzdFJvdyk7XG5cbiAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgJiYgZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmR0LmRhdGFUb1JlbmRlcih0aGlzLmR0LnJvd3MpO1xuICAgICAgICAgICAgY29uc3QgZmlyc3RTZWxlY3RhYmxlUm93SW5kZXggPSBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShmaXJzdFJvdywgJ2luZGV4Jyk7XG5cbiAgICAgICAgICAgIHRoaXMuZHQuYW5jaG9yUm93SW5kZXggPSB0aGlzLmR0LmFuY2hvclJvd0luZGV4IHx8IGZpcnN0U2VsZWN0YWJsZVJvd0luZGV4O1xuICAgICAgICAgICAgdGhpcy5kdC5zZWxlY3Rpb24gPSBkYXRhLnNsaWNlKDAsIHRoaXMuaW5kZXggKyAxKTtcbiAgICAgICAgICAgIHRoaXMuZHQuc2VsZWN0UmFuZ2UoZXZlbnQsIHRoaXMuaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25TcGFjZUtleShldmVudCkge1xuICAgICAgICBjb25zdCBpc0lucHV0ID0gZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fCBldmVudC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fCBldmVudC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgICAgICBpZiAoaXNJbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbkVudGVyS2V5KGV2ZW50KTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIHRoaXMuZHQuc2VsZWN0aW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZHQuZGF0YVRvUmVuZGVyKHRoaXMuZHQucm93cyk7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4O1xuXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5kdC5zZWxlY3Rpb24pICYmIHRoaXMuZHQuc2VsZWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpcnN0U2VsZWN0ZWRSb3dJbmRleCwgbGFzdFNlbGVjdGVkUm93SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0U2VsZWN0ZWRSb3dJbmRleCA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdCh0aGlzLmR0LnNlbGVjdGlvblswXSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RTZWxlY3RlZFJvd0luZGV4ID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHRoaXMuZHQuc2VsZWN0aW9uW3RoaXMuZHQuc2VsZWN0aW9uLmxlbmd0aCAtIDFdLCBkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMuaW5kZXggPD0gZmlyc3RTZWxlY3RlZFJvd0luZGV4ID8gbGFzdFNlbGVjdGVkUm93SW5kZXggOiBmaXJzdFNlbGVjdGVkUm93SW5kZXg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QodGhpcy5kdC5zZWxlY3Rpb24sIGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZHQuYW5jaG9yUm93SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLmR0LnNlbGVjdGlvbiA9IGluZGV4ICE9PSB0aGlzLmluZGV4ID8gZGF0YS5zbGljZShNYXRoLm1pbihpbmRleCwgdGhpcy5pbmRleCksIE1hdGgubWF4KGluZGV4LCB0aGlzLmluZGV4KSArIDEpIDogW3RoaXMuZGF0YV07XG4gICAgICAgICAgICAgICAgdGhpcy5kdC5zZWxlY3RSYW5nZShldmVudCwgdGhpcy5pbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1c1Jvd0NoYW5nZShmaXJzdEZvY3VzYWJsZVJvdywgY3VycmVudEZvY3VzZWRSb3cpIHtcbiAgICAgICAgZmlyc3RGb2N1c2FibGVSb3cudGFiSW5kZXggPSAnLTEnO1xuICAgICAgICBjdXJyZW50Rm9jdXNlZFJvdy50YWJJbmRleCA9ICcwJztcbiAgICAgICAgRG9tSGFuZGxlci5mb2N1cyhjdXJyZW50Rm9jdXNlZFJvdyk7XG4gICAgfVxuXG4gICAgZmluZExhc3RTZWxlY3RhYmxlUm93KCkge1xuICAgICAgICBjb25zdCByb3dzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuZHQuZWwubmF0aXZlRWxlbWVudCwgJy5wLXNlbGVjdGFibGUtcm93Jyk7XG5cbiAgICAgICAgcmV0dXJuIHJvd3MgPyByb3dzW3Jvd3MubGVuZ3RoIC0gMV0gOiBudWxsO1xuICAgIH1cblxuICAgIGZpbmRGaXJzdFNlbGVjdGFibGVSb3coKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0Um93ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZHQuZWwubmF0aXZlRWxlbWVudCwgJy5wLXNlbGVjdGFibGUtcm93Jyk7XG5cbiAgICAgICAgcmV0dXJuIGZpcnN0Um93O1xuICAgIH1cblxuICAgIGZpbmROZXh0U2VsZWN0YWJsZVJvdyhyb3c6IEhUTUxUYWJsZVJvd0VsZW1lbnQpOiBIVE1MVGFibGVSb3dFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGxldCBuZXh0Um93ID0gPEhUTUxUYWJsZVJvd0VsZW1lbnQ+cm93Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgaWYgKG5leHRSb3cpIHtcbiAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKG5leHRSb3csICdwLXNlbGVjdGFibGUtcm93JykpIHJldHVybiBuZXh0Um93O1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5maW5kTmV4dFNlbGVjdGFibGVSb3cobmV4dFJvdyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRQcmV2U2VsZWN0YWJsZVJvdyhyb3c6IEhUTUxUYWJsZVJvd0VsZW1lbnQpOiBIVE1MVGFibGVSb3dFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGxldCBwcmV2Um93ID0gPEhUTUxUYWJsZVJvd0VsZW1lbnQ+cm93LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGlmIChwcmV2Um93KSB7XG4gICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhwcmV2Um93LCAncC1zZWxlY3RhYmxlLXJvdycpKSByZXR1cm4gcHJldlJvdztcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuZmluZFByZXZTZWxlY3RhYmxlUm93KHByZXZSb3cpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBTZWxlY3RhYmxlUm93RGlzYWJsZWQgIT09IHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcFNlbGVjdGFibGVSb3dEYmxDbGlja10nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnLFxuICAgICAgICAnW2NsYXNzLnAtc2VsZWN0YWJsZS1yb3ddJzogJ2lzRW5hYmxlZCgpJyxcbiAgICAgICAgJ1tjbGFzcy5wLWhpZ2hsaWdodF0nOiAnc2VsZWN0ZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RhYmxlUm93RGJsQ2xpY2sgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCdwU2VsZWN0YWJsZVJvd0RibENsaWNrJykgZGF0YTogYW55O1xuXG4gICAgQElucHV0KCdwU2VsZWN0YWJsZVJvd0luZGV4JykgaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBwU2VsZWN0YWJsZVJvd0Rpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyB0YWJsZVNlcnZpY2U6IFRhYmxlU2VydmljZSkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS5zZWxlY3Rpb25Tb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZHQuaXNTZWxlY3RlZCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmR0LmlzU2VsZWN0ZWQodGhpcy5kYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RibGNsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5kdC5oYW5kbGVSb3dDbGljayh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgcm93RGF0YTogdGhpcy5kYXRhLFxuICAgICAgICAgICAgICAgIHJvd0luZGV4OiB0aGlzLmluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucFNlbGVjdGFibGVSb3dEaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twQ29udGV4dE1lbnVSb3ddJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50JyxcbiAgICAgICAgJ1tjbGFzcy5wLWhpZ2hsaWdodC1jb250ZXh0bWVudV0nOiAnc2VsZWN0ZWQnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2lzRW5hYmxlZCgpID8gMCA6IHVuZGVmaW5lZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51Um93IHtcbiAgICBASW5wdXQoJ3BDb250ZXh0TWVudVJvdycpIGRhdGE6IGFueTtcblxuICAgIEBJbnB1dCgncENvbnRleHRNZW51Um93SW5kZXgnKSBpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHBDb250ZXh0TWVudVJvd0Rpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyB0YWJsZVNlcnZpY2U6IFRhYmxlU2VydmljZSwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS5jb250ZXh0TWVudVNvdXJjZSQuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZHQuZXF1YWxzKHRoaXMuZGF0YSwgZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgWyckZXZlbnQnXSlcbiAgICBvbkNvbnRleHRNZW51KGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5kdC5oYW5kbGVSb3dSaWdodENsaWNrKHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICByb3dEYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICAgICAgcm93SW5kZXg6IHRoaXMuaW5kZXhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBDb250ZXh0TWVudVJvd0Rpc2FibGVkICE9PSB0cnVlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BSb3dUb2dnbGVyXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFJvd1RvZ2dsZXIge1xuICAgIEBJbnB1dCgncFJvd1RvZ2dsZXInKSBkYXRhOiBhbnk7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcFJvd1RvZ2dsZXJEaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUpIHt9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHQudG9nZ2xlUm93KHRoaXMuZGF0YSwgZXZlbnQpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucFJvd1RvZ2dsZXJEaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BSZXNpemFibGVDb2x1bW5dJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUmVzaXphYmxlQ29sdW1uIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcFJlc2l6YWJsZUNvbHVtbkRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgcmVzaXplcjogSFRNTFNwYW5FbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gICAgcmVzaXplck1vdXNlRG93bkxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBkb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBkb2N1bWVudE1vdXNlVXBMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdwLXJlc2l6YWJsZS1jb2x1bW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMucmVzaXplciwgJ3AtY29sdW1uLXJlc2l6ZXInKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy5yZXNpemVyKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzaXplck1vdXNlRG93bkxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5yZXNpemVyLCAnbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2VVcExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5kb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwLmJpbmQodGhpcykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudEV2ZW50cygpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmR0Lm9uQ29sdW1uUmVzaXplQmVnaW4oZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRFdmVudHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRG9jdW1lbnRNb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5vbkNvbHVtblJlc2l6ZShldmVudCk7XG4gICAgfVxuXG4gICAgb25Eb2N1bWVudE1vdXNlVXAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5vbkNvbHVtblJlc2l6ZUVuZCgpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RXZlbnRzKCk7XG4gICAgfVxuXG4gICAgaXNFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wUmVzaXphYmxlQ29sdW1uRGlzYWJsZWQgIT09IHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZXJNb3VzZURvd25MaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5yZXNpemVyTW91c2VEb3duTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplck1vdXNlRG93bkxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRFdmVudHMoKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BSZW9yZGVyYWJsZUNvbHVtbl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBSZW9yZGVyYWJsZUNvbHVtbiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHBSZW9yZGVyYWJsZUNvbHVtbkRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgZHJhZ1N0YXJ0TGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGRyYWdPdmVyTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGRyYWdFbnRlckxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBkcmFnTGVhdmVMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgbW91c2VEb3duTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZURvd25MaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdTdGFydExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZHJhZ3N0YXJ0JywgdGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RyYWdvdmVyJywgdGhpcy5vbkRyYWdPdmVyLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnRW50ZXJMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RyYWdlbnRlcicsIHRoaXMub25EcmFnRW50ZXIuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdMZWF2ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZHJhZ2xlYXZlJywgdGhpcy5vbkRyYWdMZWF2ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRXZlbnRzKCkge1xuICAgICAgICBpZiAodGhpcy5tb3VzZURvd25MaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5tb3VzZURvd25MaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5tb3VzZURvd25MaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnU3RhcnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnT3Zlckxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdPdmVyTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnRW50ZXJMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kcmFnRW50ZXJMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kcmFnRW50ZXJMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnTGVhdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudDogYW55KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQubm9kZU5hbWUgPT09ICdJTlBVVCcgfHwgZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnVEVYVEFSRUEnIHx8IERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1jb2x1bW4tcmVzaXplcicpKSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICAgIGVsc2UgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRyYWdnYWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgb25EcmFnU3RhcnQoZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLmR0Lm9uQ29sdW1uRHJhZ1N0YXJ0KGV2ZW50LCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIG9uRHJhZ092ZXIoZXZlbnQ6IGFueSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRHJhZ0VudGVyKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5kdC5vbkNvbHVtbkRyYWdFbnRlcihldmVudCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBvbkRyYWdMZWF2ZShldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMuZHQub25Db2x1bW5EcmFnTGVhdmUoZXZlbnQpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICAgIG9uRHJvcChldmVudDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmR0Lm9uQ29sdW1uRHJvcChldmVudCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucFJlb3JkZXJhYmxlQ29sdW1uRGlzYWJsZWQgIT09IHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twRWRpdGFibGVDb2x1bW5dJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRWRpdGFibGVDb2x1bW4gaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCdwRWRpdGFibGVDb2x1bW4nKSBkYXRhOiBhbnk7XG5cbiAgICBASW5wdXQoJ3BFZGl0YWJsZUNvbHVtbkZpZWxkJykgZmllbGQ6IGFueTtcblxuICAgIEBJbnB1dCgncEVkaXRhYmxlQ29sdW1uUm93SW5kZXgnKSByb3dJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHBFZGl0YWJsZUNvbHVtbkRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgcEZvY3VzQ2VsbFNlbGVjdG9yOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBvdmVybGF5RXZlbnRMaXN0ZW5lcjogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7fVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZWwubmF0aXZlRWxlbWVudCAmJiAhY2hhbmdlcy5kYXRhPy5maXJzdENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5kdC51cGRhdGVFZGl0aW5nQ2VsbCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZGF0YSwgdGhpcy5maWVsZCwgPG51bWJlcj50aGlzLnJvd0luZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAncC1lZGl0YWJsZS1jb2x1bW4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmR0LnNlbGZDbGljayA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmR0LmVkaXRpbmdDZWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHQuZWRpdGluZ0NlbGwgIT09IHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHQuaXNFZGl0aW5nQ2VsbFZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VFZGl0aW5nQ2VsbCh0cnVlLCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkNlbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbkNlbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW5DZWxsKCkge1xuICAgICAgICB0aGlzLmR0LnVwZGF0ZUVkaXRpbmdDZWxsKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy5kYXRhLCB0aGlzLmZpZWxkLCA8bnVtYmVyPnRoaXMucm93SW5kZXgpO1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3AtY2VsbC1lZGl0aW5nJyk7XG4gICAgICAgIHRoaXMuZHQub25FZGl0SW5pdC5lbWl0KHsgZmllbGQ6IHRoaXMuZmllbGQsIGRhdGE6IHRoaXMuZGF0YSwgaW5kZXg6IDxudW1iZXI+dGhpcy5yb3dJbmRleCB9KTtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGxTZWxlY3RvciA9IHRoaXMucEZvY3VzQ2VsbFNlbGVjdG9yIHx8ICdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCc7XG4gICAgICAgICAgICAgICAgbGV0IGZvY3VzYWJsZUVsZW1lbnQgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBmb2N1c0NlbGxTZWxlY3Rvcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlFdmVudExpc3RlbmVyID0gKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWwgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHQuc2VsZkNsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmR0Lm92ZXJsYXlTdWJzY3JpcHRpb24gPSB0aGlzLmR0Lm92ZXJsYXlTZXJ2aWNlLmNsaWNrT2JzZXJ2YWJsZS5zdWJzY3JpYmUodGhpcy5vdmVybGF5RXZlbnRMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgY2xvc2VFZGl0aW5nQ2VsbChjb21wbGV0ZWQ6IGFueSwgZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGV2ZW50RGF0YSA9IHsgZmllbGQ6IDxzdHJpbmc+dGhpcy5kdC5lZGl0aW5nQ2VsbEZpZWxkLCBkYXRhOiA8YW55PnRoaXMuZHQuZWRpdGluZ0NlbGxEYXRhLCBvcmlnaW5hbEV2ZW50OiA8RXZlbnQ+ZXZlbnQsIGluZGV4OiA8bnVtYmVyPnRoaXMuZHQuZWRpdGluZ0NlbGxSb3dJbmRleCB9O1xuXG4gICAgICAgIGlmIChjb21wbGV0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZHQub25FZGl0Q29tcGxldGUuZW1pdChldmVudERhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kdC5vbkVkaXRDYW5jZWwuZW1pdChldmVudERhdGEpO1xuXG4gICAgICAgICAgICB0aGlzLmR0LnZhbHVlLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudFt0aGlzLmR0LmVkaXRpbmdDZWxsRmllbGRdID09PSB0aGlzLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFt0aGlzLmR0LmVkaXRpbmdDZWxsRmllbGRdID0gdGhpcy5kdC5lZGl0aW5nQ2VsbERhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuZHQuZWRpdGluZ0NlbGwsICdwLWNlbGwtZWRpdGluZycpO1xuICAgICAgICB0aGlzLmR0LmVkaXRpbmdDZWxsID0gbnVsbDtcbiAgICAgICAgdGhpcy5kdC5lZGl0aW5nQ2VsbERhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLmR0LmVkaXRpbmdDZWxsRmllbGQgPSBudWxsO1xuICAgICAgICB0aGlzLmR0LnVuYmluZERvY3VtZW50RWRpdExpc3RlbmVyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZHQub3ZlcmxheVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5kdC5vdmVybGF5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVudGVyJywgWyckZXZlbnQnXSlcbiAgICBvbkVudGVyS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmR0LmlzRWRpdGluZ0NlbGxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVkaXRpbmdDZWxsKHRydWUsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24udGFiJywgWyckZXZlbnQnXSlcbiAgICBvblRhYktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmR0LmlzRWRpdGluZ0NlbGxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVkaXRpbmdDZWxsKHRydWUsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uZXNjYXBlJywgWyckZXZlbnQnXSlcbiAgICBvbkVzY2FwZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmR0LmlzRWRpdGluZ0NlbGxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVkaXRpbmdDZWxsKGZhbHNlLCBldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLnRhYicsIFsnJGV2ZW50J10pXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5zaGlmdC50YWInLCBbJyRldmVudCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24ubWV0YS50YWInLCBbJyRldmVudCddKVxuICAgIG9uU2hpZnRLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHRoaXMubW92ZVRvUHJldmlvdXNDZWxsKGV2ZW50KTtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvTmV4dENlbGwoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uYXJyb3dkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbkFycm93RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRDZWxsID0gdGhpcy5maW5kQ2VsbChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRDZWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxJbmRleCA9IERvbUhhbmRsZXIuaW5kZXgoY3VycmVudENlbGwpO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRDZWxsID0gdGhpcy5maW5kTmV4dEVkaXRhYmxlQ29sdW1uQnlJbmRleChjdXJyZW50Q2VsbCwgY2VsbEluZGV4KTtcblxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmR0LmlzRWRpdGluZ0NlbGxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRWRpdGluZ0NlbGwodHJ1ZSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKGV2ZW50LnRhcmdldCwgJ2JsdXInKTtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKHRhcmdldENlbGwsICdjbGljaycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmFycm93dXAnLCBbJyRldmVudCddKVxuICAgIG9uQXJyb3dVcChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRDZWxsID0gdGhpcy5maW5kQ2VsbChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRDZWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxJbmRleCA9IERvbUhhbmRsZXIuaW5kZXgoY3VycmVudENlbGwpO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRDZWxsID0gdGhpcy5maW5kUHJldkVkaXRhYmxlQ29sdW1uQnlJbmRleChjdXJyZW50Q2VsbCwgY2VsbEluZGV4KTtcblxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmR0LmlzRWRpdGluZ0NlbGxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRWRpdGluZ0NlbGwodHJ1ZSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKGV2ZW50LnRhcmdldCwgJ2JsdXInKTtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKHRhcmdldENlbGwsICdjbGljaycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmFycm93bGVmdCcsIFsnJGV2ZW50J10pXG4gICAgb25BcnJvd0xlZnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZVRvUHJldmlvdXNDZWxsKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uYXJyb3dyaWdodCcsIFsnJGV2ZW50J10pXG4gICAgb25BcnJvd1JpZ2h0KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVUb05leHRDZWxsKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRDZWxsKGVsZW1lbnQ6IGFueSkge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IGNlbGwgPSBlbGVtZW50O1xuICAgICAgICAgICAgd2hpbGUgKGNlbGwgJiYgIURvbUhhbmRsZXIuaGFzQ2xhc3MoY2VsbCwgJ3AtY2VsbC1lZGl0aW5nJykpIHtcbiAgICAgICAgICAgICAgICBjZWxsID0gY2VsbC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY2VsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZVRvUHJldmlvdXNDZWxsKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGxldCBjdXJyZW50Q2VsbCA9IHRoaXMuZmluZENlbGwoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsKSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IHRoaXMuZmluZFByZXZpb3VzRWRpdGFibGVDb2x1bW4oY3VycmVudENlbGwpO1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0Q2VsbCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmR0LmlzRWRpdGluZ0NlbGxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VFZGl0aW5nQ2VsbCh0cnVlLCBldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKGV2ZW50LnRhcmdldCwgJ2JsdXInKTtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmludm9rZUVsZW1lbnRNZXRob2QodGFyZ2V0Q2VsbCwgJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVUb05leHRDZWxsKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGxldCBjdXJyZW50Q2VsbCA9IHRoaXMuZmluZENlbGwoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsKSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IHRoaXMuZmluZE5leHRFZGl0YWJsZUNvbHVtbihjdXJyZW50Q2VsbCk7XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXRDZWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHQuaXNFZGl0aW5nQ2VsbFZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVkaXRpbmdDZWxsKHRydWUsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmludm9rZUVsZW1lbnRNZXRob2QoZXZlbnQudGFyZ2V0LCAnYmx1cicpO1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0YXJnZXRDZWxsLCAnY2xpY2snKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kdC5pc0VkaXRpbmdDZWxsVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRWRpdGluZ0NlbGwodHJ1ZSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRQcmV2aW91c0VkaXRhYmxlQ29sdW1uKGNlbGw6IGFueSk6IEhUTUxUYWJsZUNlbGxFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGxldCBwcmV2Q2VsbCA9IGNlbGwucHJldmlvdXNFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAoIXByZXZDZWxsKSB7XG4gICAgICAgICAgICBsZXQgcHJldmlvdXNSb3cgPSBjZWxsLnBhcmVudEVsZW1lbnQ/LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICBpZiAocHJldmlvdXNSb3cpIHtcbiAgICAgICAgICAgICAgICBwcmV2Q2VsbCA9IHByZXZpb3VzUm93Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldkNlbGwpIHtcbiAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKHByZXZDZWxsLCAncC1lZGl0YWJsZS1jb2x1bW4nKSkgcmV0dXJuIHByZXZDZWxsO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5maW5kUHJldmlvdXNFZGl0YWJsZUNvbHVtbihwcmV2Q2VsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmROZXh0RWRpdGFibGVDb2x1bW4oY2VsbDogYW55KTogSFRNTFRhYmxlQ2VsbEVsZW1lbnQgfCBudWxsIHtcbiAgICAgICAgbGV0IG5leHRDZWxsID0gY2VsbC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKCFuZXh0Q2VsbCkge1xuICAgICAgICAgICAgbGV0IG5leHRSb3cgPSBjZWxsLnBhcmVudEVsZW1lbnQ/Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGlmIChuZXh0Um93KSB7XG4gICAgICAgICAgICAgICAgbmV4dENlbGwgPSBuZXh0Um93LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHRDZWxsKSB7XG4gICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhuZXh0Q2VsbCwgJ3AtZWRpdGFibGUtY29sdW1uJykpIHJldHVybiBuZXh0Q2VsbDtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuZmluZE5leHRFZGl0YWJsZUNvbHVtbihuZXh0Q2VsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmROZXh0RWRpdGFibGVDb2x1bW5CeUluZGV4KGNlbGw6IEVsZW1lbnQsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IG5leHRSb3cgPSBjZWxsLnBhcmVudEVsZW1lbnQ/Lm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAobmV4dFJvdykge1xuICAgICAgICAgICAgbGV0IG5leHRDZWxsID0gbmV4dFJvdy5jaGlsZHJlbltpbmRleF07XG5cbiAgICAgICAgICAgIGlmIChuZXh0Q2VsbCAmJiBEb21IYW5kbGVyLmhhc0NsYXNzKG5leHRDZWxsLCAncC1lZGl0YWJsZS1jb2x1bW4nKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0Q2VsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRQcmV2RWRpdGFibGVDb2x1bW5CeUluZGV4KGNlbGw6IEVsZW1lbnQsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHByZXZSb3cgPSBjZWxsLnBhcmVudEVsZW1lbnQ/LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKHByZXZSb3cpIHtcbiAgICAgICAgICAgIGxldCBwcmV2Q2VsbCA9IHByZXZSb3cuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgICAgICBpZiAocHJldkNlbGwgJiYgRG9tSGFuZGxlci5oYXNDbGFzcyhwcmV2Q2VsbCwgJ3AtZWRpdGFibGUtY29sdW1uJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldkNlbGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBFZGl0YWJsZUNvbHVtbkRpc2FibGVkICE9PSB0cnVlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5kdC5vdmVybGF5U3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmR0Lm92ZXJsYXlTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcEVkaXRhYmxlUm93XScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEVkaXRhYmxlUm93IHtcbiAgICBASW5wdXQoJ3BFZGl0YWJsZVJvdycpIGRhdGE6IGFueTtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBwRWRpdGFibGVSb3dEaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cblxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucEVkaXRhYmxlUm93RGlzYWJsZWQgIT09IHRydWU7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twSW5pdEVkaXRhYmxlUm93XScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEluaXRFZGl0YWJsZVJvdyB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIGVkaXRhYmxlUm93OiBFZGl0YWJsZVJvdykge31cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmR0LmluaXRSb3dFZGl0KHRoaXMuZWRpdGFibGVSb3cuZGF0YSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twU2F2ZUVkaXRhYmxlUm93XScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNhdmVFZGl0YWJsZVJvdyB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIGVkaXRhYmxlUm93OiBFZGl0YWJsZVJvdykge31cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmR0LnNhdmVSb3dFZGl0KHRoaXMuZWRpdGFibGVSb3cuZGF0YSwgdGhpcy5lZGl0YWJsZVJvdy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BDYW5jZWxFZGl0YWJsZVJvd10nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBDYW5jZWxFZGl0YWJsZVJvdyB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIGVkaXRhYmxlUm93OiBFZGl0YWJsZVJvdykge31cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmR0LmNhbmNlbFJvd0VkaXQodGhpcy5lZGl0YWJsZVJvdy5kYXRhKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1jZWxsRWRpdG9yJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZWRpdGluZ1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImlucHV0VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZWRpdGluZ1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm91dHB1dFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIGAsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2VsbEVkaXRvciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBOdWxsYWJsZTxRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4+O1xuXG4gICAgaW5wdXRUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBvdXRwdXRUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBAT3B0aW9uYWwoKSBwdWJsaWMgZWRpdGFibGVDb2x1bW46IEVkaXRhYmxlQ29sdW1uLCBAT3B0aW9uYWwoKSBwdWJsaWMgZWRpdGFibGVSb3c6IEVkaXRhYmxlUm93KSB7fVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICAodGhpcy50ZW1wbGF0ZXMgYXMgUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+KS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW5wdXQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ291dHB1dCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0cHV0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IGVkaXRpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy5kdC5lZGl0aW5nQ2VsbCAmJiB0aGlzLmVkaXRhYmxlQ29sdW1uICYmIHRoaXMuZHQuZWRpdGluZ0NlbGwgPT09IHRoaXMuZWRpdGFibGVDb2x1bW4uZWwubmF0aXZlRWxlbWVudCkgfHwgKHRoaXMuZWRpdGFibGVSb3cgJiYgdGhpcy5kdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgdGhpcy5kdC5pc1Jvd0VkaXRpbmcodGhpcy5lZGl0YWJsZVJvdy5kYXRhKSk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdGFibGVSYWRpb0J1dHRvbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInAtcmFkaW9idXR0b24gcC1jb21wb25lbnRcIiBbbmdDbGFzc109XCJ7ICdwLXJhZGlvYnV0dG9uLWZvY3VzZWQnOiBmb2N1c2VkLCAncC1yYWRpb2J1dHRvbi1jaGVja2VkJzogY2hlY2tlZCwgJ3AtcmFkaW9idXR0b24tZGlzYWJsZWQnOiBkaXNhYmxlZCB9XCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgI3JiIHR5cGU9XCJyYWRpb1wiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbY2hlY2tlZF09XCJjaGVja2VkXCIgKGZvY3VzKT1cIm9uRm9jdXMoKVwiIChibHVyKT1cIm9uQmx1cigpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIiBbdGFiaW5kZXhdPVwiZGlzYWJsZWQgPyBudWxsIDogJzAnXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAjYm94IFtuZ0NsYXNzXT1cInsgJ3AtcmFkaW9idXR0b24tYm94IHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtaGlnaGxpZ2h0JzogY2hlY2tlZCwgJ3AtZm9jdXMnOiBmb2N1c2VkLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkIH1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1yYWRpb2J1dHRvbi1pY29uXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZVJhZGlvQnV0dG9uIHtcbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55O1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQFZpZXdDaGlsZCgncmInKSBpbnB1dFZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBjaGVja2VkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnNlbGVjdGlvblNvdXJjZSQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZHQuaXNTZWxlY3RlZCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuYXJpYUxhYmVsID0gdGhpcy5hcmlhTGFiZWwgfHwgdGhpcy5kdC5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/ICh0aGlzLmNoZWNrZWQgPyB0aGlzLmR0LmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLnNlbGVjdFJvdyA6IHRoaXMuZHQuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEudW5zZWxlY3RSb3cpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZHQuaXNTZWxlY3RlZCh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZHQudG9nZ2xlUm93V2l0aFJhZGlvKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIHJvd0luZGV4OiB0aGlzLmluZGV4XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50Py5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIERvbUhhbmRsZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRhYmxlQ2hlY2tib3gnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLWNoZWNrYm94IHAtY29tcG9uZW50XCIgW25nQ2xhc3NdPVwieyAncC1jaGVja2JveC1mb2N1c2VkJzogZm9jdXNlZCwgJ3AtY2hlY2tib3gtZGlzYWJsZWQnOiBkaXNhYmxlZCB9XCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiaW5wdXRJZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cImNoZWNrZWRcIlxuICAgICAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25Gb2N1cygpXCJcbiAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib25CbHVyKClcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgW3RhYmluZGV4XT1cImRpc2FibGVkID8gbnVsbCA6ICcwJ1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAjYm94IFtuZ0NsYXNzXT1cInsgJ3AtY2hlY2tib3gtYm94IHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtaGlnaGxpZ2h0JzogY2hlY2tlZCwgJ3AtZm9jdXMnOiBmb2N1c2VkLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkIH1cIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWR0LmNoZWNrYm94SWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDaGVja0ljb24gW3N0eWxlQ2xhc3NdPVwiJ3AtY2hlY2tib3gtaWNvbidcIiAqbmdJZj1cImNoZWNrZWRcIiAvPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiZHQuY2hlY2tib3hJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHQuY2hlY2tib3hJY29uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBjaGVja2VkIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlQ2hlY2tib3gge1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBkaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHJlcXVpcmVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBjaGVja2VkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2Uuc2VsZWN0aW9uU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5hcmlhTGFiZWwgPSB0aGlzLmFyaWFMYWJlbCB8fCB0aGlzLmR0LmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gKHRoaXMuY2hlY2tlZCA/IHRoaXMuZHQuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEuc2VsZWN0Um93IDogdGhpcy5kdC5jb25maWcudHJhbnNsYXRpb24uYXJpYS51bnNlbGVjdFJvdykgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5kdC50b2dnbGVSb3dXaXRoQ2hlY2tib3goXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgcm93SW5kZXg6IHRoaXMuaW5kZXhcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgRG9tSGFuZGxlci5jbGVhclNlbGVjdGlvbigpO1xuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdGFibGVIZWFkZXJDaGVja2JveCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInAtY2hlY2tib3ggcC1jb21wb25lbnRcIiBbbmdDbGFzc109XCJ7ICdwLWNoZWNrYm94LWZvY3VzZWQnOiBmb2N1c2VkLCAncC1jaGVja2JveC1kaXNhYmxlZCc6IGlzRGlzYWJsZWQoKSB9XCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgI2NiIHR5cGU9XCJjaGVja2JveFwiIFt0YWJpbmRleF09XCJkaXNhYmxlZCA/IG51bGwgOiAnMCdcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2NoZWNrZWRdPVwiY2hlY2tlZFwiIChmb2N1cyk9XCJvbkZvY3VzKClcIiAoYmx1cik9XCJvbkJsdXIoKVwiIFtkaXNhYmxlZF09XCJpc0Rpc2FibGVkKClcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgI2JveCBbbmdDbGFzc109XCJ7ICdwLWNoZWNrYm94LWJveCc6IHRydWUsICdwLWhpZ2hsaWdodCc6IGNoZWNrZWQsICdwLWZvY3VzJzogZm9jdXNlZCwgJ3AtZGlzYWJsZWQnOiBpc0Rpc2FibGVkKCkgfVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZHQuaGVhZGVyQ2hlY2tib3hJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPENoZWNrSWNvbiAqbmdJZj1cImNoZWNrZWRcIiBbc3R5bGVDbGFzc109XCIncC1jaGVja2JveC1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWNoZWNrYm94LWljb25cIiAqbmdJZj1cImR0LmhlYWRlckNoZWNrYm94SWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImR0LmhlYWRlckNoZWNrYm94SWNvblRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogY2hlY2tlZCB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZUhlYWRlckNoZWNrYm94IHtcbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIGNoZWNrZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgc2VsZWN0aW9uQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICB2YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS52YWx1ZVNvdXJjZSQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMudXBkYXRlQ2hlY2tlZFN0YXRlKCk7XG4gICAgICAgICAgICB0aGlzLmFyaWFMYWJlbCA9IHRoaXMuYXJpYUxhYmVsIHx8IHRoaXMuZHQuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEgPyAodGhpcy5jaGVja2VkID8gdGhpcy5kdC5jb25maWcudHJhbnNsYXRpb24uYXJpYS5zZWxlY3RBbGwgOiB0aGlzLmR0LmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLnVuc2VsZWN0QWxsKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS5zZWxlY3Rpb25Tb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLnVwZGF0ZUNoZWNrZWRTdGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy51cGRhdGVDaGVja2VkU3RhdGUoKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmR0LnZhbHVlICYmIHRoaXMuZHQudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHQudG9nZ2xlUm93c1dpdGhDaGVja2JveChldmVudCwgIXRoaXMuY2hlY2tlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBEb21IYW5kbGVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlzRGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8ICF0aGlzLmR0LnZhbHVlIHx8ICF0aGlzLmR0LnZhbHVlLmxlbmd0aDtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWVDaGFuZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUNoZWNrZWRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICBpZiAodGhpcy5kdC5fc2VsZWN0QWxsICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kdC5fc2VsZWN0QWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZHQuc2VsZWN0aW9uUGFnZU9ubHkgPyB0aGlzLmR0LmRhdGFUb1JlbmRlcih0aGlzLmR0LnByb2Nlc3NlZERhdGEpIDogdGhpcy5kdC5wcm9jZXNzZWREYXRhO1xuICAgICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5kdC5mcm96ZW5WYWx1ZSA/IFsuLi50aGlzLmR0LmZyb3plblZhbHVlLCAuLi5kYXRhXSA6IGRhdGE7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RhYmxlVmFsID0gdGhpcy5kdC5yb3dTZWxlY3RhYmxlID8gdmFsLmZpbHRlcigoZGF0YTogYW55LCBpbmRleDogbnVtYmVyKSA9PiB0aGlzLmR0LnJvd1NlbGVjdGFibGUoeyBkYXRhLCBpbmRleCB9KSkgOiB2YWw7XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHNlbGVjdGFibGVWYWwpICYmIE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5kdC5zZWxlY3Rpb24pICYmIHNlbGVjdGFibGVWYWwuZXZlcnkoKHY6IGFueSkgPT4gdGhpcy5kdC5zZWxlY3Rpb24uc29tZSgoczogYW55KSA9PiB0aGlzLmR0LmVxdWFscyh2LCBzKSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twUmVvcmRlcmFibGVSb3dIYW5kbGVdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUmVvcmRlcmFibGVSb3dIYW5kbGUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAncC1kYXRhdGFibGUtcmVvcmRlcmFibGVyb3ctaGFuZGxlJyk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twUmVvcmRlcmFibGVSb3ddJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUmVvcmRlcmFibGVSb3cgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgICBASW5wdXQoJ3BSZW9yZGVyYWJsZVJvdycpIGluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcFJlb3JkZXJhYmxlUm93RGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBtb3VzZURvd25MaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgZHJhZ1N0YXJ0TGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGRyYWdFbmRMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgZHJhZ092ZXJMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgZHJhZ0xlYXZlTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGRyb3BMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUpIHt9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZHJvcHBhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubW91c2VEb3duTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdTdGFydExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZHJhZ3N0YXJ0JywgdGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnRW5kTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkcmFnZW5kJywgdGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RyYWdvdmVyJywgdGhpcy5vbkRyYWdPdmVyLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdMZWF2ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZHJhZ2xlYXZlJywgdGhpcy5vbkRyYWdMZWF2ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kRXZlbnRzKCkge1xuICAgICAgICBpZiAodGhpcy5tb3VzZURvd25MaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5tb3VzZURvd25MaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5tb3VzZURvd25MaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnU3RhcnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnRW5kTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0VuZExpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdFbmRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnT3Zlckxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdPdmVyTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnTGVhdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgY29uc3QgaXNIYW5kbGVDbGlja2VkID0gdGhpcy5pc0hhbmRsZUVsZW1lbnQodGFyZ2V0RWxlbWVudCk7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5kcmFnZ2FibGUgPSBpc0hhbmRsZUNsaWNrZWQ7XG4gICAgfVxuXG4gICAgaXNIYW5kbGVFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChlbGVtZW50Py5jbGFzc0xpc3QuY29udGFpbnMoJ3AtZGF0YXRhYmxlLXJlb3JkZXJhYmxlcm93LWhhbmRsZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50Py5wYXJlbnRFbGVtZW50ICYmICFbJ1REJywgJ1RSJ10uaW5jbHVkZXMoZWxlbWVudD8ucGFyZW50RWxlbWVudD8udGFnTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzSGFuZGxlRWxlbWVudChlbGVtZW50Py5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkRyYWdTdGFydChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICAgIHRoaXMuZHQub25Sb3dEcmFnU3RhcnQoZXZlbnQsIDxudW1iZXI+dGhpcy5pbmRleCk7XG4gICAgfVxuXG4gICAgb25EcmFnRW5kKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5vblJvd0RyYWdFbmQoZXZlbnQpO1xuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25EcmFnT3ZlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICAgIHRoaXMuZHQub25Sb3dEcmFnT3ZlcihldmVudCwgPG51bWJlcj50aGlzLmluZGV4LCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRHJhZ0xlYXZlKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5vblJvd0RyYWdMZWF2ZShldmVudCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBSZW9yZGVyYWJsZVJvd0Rpc2FibGVkICE9PSB0cnVlO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICAgIG9uRHJvcChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpICYmIHRoaXMuZHQucm93RHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZHQub25Sb3dEcm9wKGV2ZW50LCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcbiAgICB9XG59XG4vKipcbiAqIENvbHVtbiBGaWx0ZXIgZWxlbWVudCBvZiBUYWJsZS5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1jb2x1bW5GaWx0ZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLWNvbHVtbi1maWx0ZXJcIiBbbmdDbGFzc109XCJ7ICdwLWNvbHVtbi1maWx0ZXItcm93JzogZGlzcGxheSA9PT0gJ3JvdycsICdwLWNvbHVtbi1maWx0ZXItbWVudSc6IGRpc3BsYXkgPT09ICdtZW51JyB9XCI+XG4gICAgICAgICAgICA8cC1jb2x1bW5GaWx0ZXJGb3JtRWxlbWVudFxuICAgICAgICAgICAgICAgICpuZ0lmPVwiZGlzcGxheSA9PT0gJ3JvdydcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1mbHVpZFwiXG4gICAgICAgICAgICAgICAgW3R5cGVdPVwidHlwZVwiXG4gICAgICAgICAgICAgICAgW2ZpZWxkXT1cImZpZWxkXCJcbiAgICAgICAgICAgICAgICBbYXJpYUxhYmVsXT1cImFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgW2ZpbHRlckNvbnN0cmFpbnRdPVwiZHQuZmlsdGVyc1tmaWVsZF1cIlxuICAgICAgICAgICAgICAgIFtmaWx0ZXJUZW1wbGF0ZV09XCJmaWx0ZXJUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgICBbbWluRnJhY3Rpb25EaWdpdHNdPVwibWluRnJhY3Rpb25EaWdpdHNcIlxuICAgICAgICAgICAgICAgIFttYXhGcmFjdGlvbkRpZ2l0c109XCJtYXhGcmFjdGlvbkRpZ2l0c1wiXG4gICAgICAgICAgICAgICAgW3ByZWZpeF09XCJwcmVmaXhcIlxuICAgICAgICAgICAgICAgIFtzdWZmaXhdPVwic3VmZml4XCJcbiAgICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICAgICAgW2xvY2FsZU1hdGNoZXJdPVwibG9jYWxlTWF0Y2hlclwiXG4gICAgICAgICAgICAgICAgW2N1cnJlbmN5XT1cImN1cnJlbmN5XCJcbiAgICAgICAgICAgICAgICBbY3VycmVuY3lEaXNwbGF5XT1cImN1cnJlbmN5RGlzcGxheVwiXG4gICAgICAgICAgICAgICAgW3VzZUdyb3VwaW5nXT1cInVzZUdyb3VwaW5nXCJcbiAgICAgICAgICAgICAgICBbc2hvd0J1dHRvbnNdPVwic2hvd0J1dHRvbnNcIlxuICAgICAgICAgICAgPjwvcC1jb2x1bW5GaWx0ZXJGb3JtRWxlbWVudD5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAjaWNvblxuICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd01lbnVCdXR0b25cIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLW1lbnUtYnV0dG9uIHAtbGlua1wiXG4gICAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZmlsdGVyTWVudUJ1dHRvbkFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJvdmVybGF5VmlzaWJsZSA/IG92ZXJsYXlJZCA6IG51bGxcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwib3ZlcmxheVZpc2libGUgPz8gZmFsc2VcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtY29sdW1uLWZpbHRlci1tZW51LWJ1dHRvbi1vcGVuJzogb3ZlcmxheVZpc2libGUsICdwLWNvbHVtbi1maWx0ZXItbWVudS1idXR0b24tYWN0aXZlJzogaGFzRmlsdGVyKCkgfVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZU1lbnUoKVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25Ub2dnbGVCdXR0b25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxGaWx0ZXJJY29uIFtzdHlsZUNsYXNzXT1cIidwaS1maWx0ZXItaWNvbidcIiAqbmdJZj1cIiFmaWx0ZXJJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGktZmlsdGVyLWljb25cIiAqbmdJZj1cImZpbHRlckljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmaWx0ZXJJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiAjaWNvbiAqbmdJZj1cInNob3dDbGVhckJ1dHRvbiAmJiBkaXNwbGF5ID09PSAncm93J1wiIFtuZ0NsYXNzXT1cInsgJ3AtaGlkZGVuLXNwYWNlJzogIWhhc1Jvd0ZpbHRlcigpIH1cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItY2xlYXItYnV0dG9uIHAtbGlua1wiIChjbGljayk9XCJjbGVhckZpbHRlcigpXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJjbGVhckJ1dHRvbkxhYmVsXCI+XG4gICAgICAgICAgICAgICAgPEZpbHRlclNsYXNoSWNvbiAqbmdJZj1cIiFjbGVhckZpbHRlckljb25UZW1wbGF0ZVwiIC8+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2xlYXJGaWx0ZXJJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgKm5nSWY9XCJzaG93TWVudSAmJiBvdmVybGF5VmlzaWJsZVwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1jb2x1bW4tZmlsdGVyLW92ZXJsYXkgcC1jb21wb25lbnQgcC1mbHVpZCc6IHRydWUsICdwLWNvbHVtbi1maWx0ZXItb3ZlcmxheS1tZW51JzogZGlzcGxheSA9PT0gJ21lbnUnIH1cIlxuICAgICAgICAgICAgICAgIFtpZF09XCJvdmVybGF5SWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbW9kYWxdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgcm9sZT1cImRpYWxvZ1wiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ29udGVudENsaWNrKClcIlxuICAgICAgICAgICAgICAgIFtAb3ZlcmxheUFuaW1hdGlvbl09XCIndmlzaWJsZSdcIlxuICAgICAgICAgICAgICAgIChAb3ZlcmxheUFuaW1hdGlvbi5zdGFydCk9XCJvbk92ZXJsYXlBbmltYXRpb25TdGFydCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoQG92ZXJsYXlBbmltYXRpb24uZG9uZSk9XCJvbk92ZXJsYXlBbmltYXRpb25FbmQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24uZXNjYXBlKT1cIm9uRXNjYXBlKClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXJUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGZpZWxkIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8dWwgKm5nSWY9XCJkaXNwbGF5ID09PSAncm93JzsgZWxzZSBtZW51XCIgY2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItcm93LWl0ZW1zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItcm93LWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG1hdGNoTW9kZSBvZiBtYXRjaE1vZGVzOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvblJvd01hdGNoTW9kZUNoYW5nZShtYXRjaE1vZGUudmFsdWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uUm93TWF0Y2hNb2RlS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cInRoaXMub25Sb3dNYXRjaE1vZGVDaGFuZ2UobWF0Y2hNb2RlLnZhbHVlKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWhpZ2hsaWdodCc6IGlzUm93TWF0Y2hNb2RlU2VsZWN0ZWQobWF0Y2hNb2RlLnZhbHVlKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImkgPT09IDAgPyAnMCcgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgbWF0Y2hNb2RlLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInAtY29sdW1uLWZpbHRlci1zZXBhcmF0b3JcIj48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItcm93LWl0ZW1cIiAoY2xpY2spPVwib25Sb3dDbGVhckl0ZW1DbGljaygpXCIgKGtleWRvd24pPVwib25Sb3dNYXRjaE1vZGVLZXlEb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJvblJvd0NsZWFySXRlbUNsaWNrKClcIj57eyBub0ZpbHRlckxhYmVsIH19PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbWVudT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtY29sdW1uLWZpbHRlci1vcGVyYXRvclwiICpuZ0lmPVwiaXNTaG93T3BlcmF0b3JcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwLWRyb3Bkb3duIFtvcHRpb25zXT1cIm9wZXJhdG9yT3B0aW9uc1wiIFtuZ01vZGVsXT1cIm9wZXJhdG9yXCIgKG5nTW9kZWxDaGFuZ2UpPVwib25PcGVyYXRvckNoYW5nZSgkZXZlbnQpXCIgc3R5bGVDbGFzcz1cInAtY29sdW1uLWZpbHRlci1vcGVyYXRvci1kcm9wZG93blwiPjwvcC1kcm9wZG93bj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItY29uc3RyYWludHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGZpZWxkQ29uc3RyYWludCBvZiBmaWVsZENvbnN0cmFpbnRzOyBsZXQgaSA9IGluZGV4XCIgY2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItY29uc3RyYWludFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLWRyb3Bkb3duXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd01hdGNoTW9kZXMgJiYgbWF0Y2hNb2Rlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXT1cIm1hdGNoTW9kZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdNb2RlbF09XCJmaWVsZENvbnN0cmFpbnQubWF0Y2hNb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25NZW51TWF0Y2hNb2RlQ2hhbmdlKCRldmVudCwgZmllbGRDb25zdHJhaW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlQ2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItbWF0Y2htb2RlLWRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9wLWRyb3Bkb3duPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLWNvbHVtbkZpbHRlckZvcm1FbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0eXBlXT1cInR5cGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZmllbGRdPVwiZmllbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZmlsdGVyQ29uc3RyYWludF09XCJmaWVsZENvbnN0cmFpbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZmlsdGVyVGVtcGxhdGVdPVwiZmlsdGVyVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWluRnJhY3Rpb25EaWdpdHNdPVwibWluRnJhY3Rpb25EaWdpdHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF4RnJhY3Rpb25EaWdpdHNdPVwibWF4RnJhY3Rpb25EaWdpdHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJlZml4XT1cInByZWZpeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdWZmaXhdPVwic3VmZml4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbG9jYWxlTWF0Y2hlcl09XCJsb2NhbGVNYXRjaGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2N1cnJlbmN5XT1cImN1cnJlbmN5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2N1cnJlbmN5RGlzcGxheV09XCJjdXJyZW5jeURpc3BsYXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdXNlR3JvdXBpbmddPVwidXNlR3JvdXBpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L3AtY29sdW1uRmlsdGVyRm9ybUVsZW1lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJzaG93UmVtb3ZlSWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLXJlbW92ZS1idXR0b24gcC1idXR0b24tdGV4dCBwLWJ1dHRvbi1kYW5nZXIgcC1idXR0b24tc21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInJlbW92ZUNvbnN0cmFpbnQoZmllbGRDb25zdHJhaW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cInJlbW92ZVJ1bGVCdXR0b25MYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGFiZWxdPVwicmVtb3ZlUnVsZUJ1dHRvbkxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRyYXNoSWNvbiAqbmdJZj1cIiFyZW1vdmVSdWxlSWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtYnV0dG9uLWljb24tbGVmdCdcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwicmVtb3ZlUnVsZUljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLWFkZC1ydWxlXCIgKm5nSWY9XCJpc1Nob3dBZGRDb25zdHJhaW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIFtsYWJlbF09XCJhZGRSdWxlQnV0dG9uTGFiZWxcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFkZFJ1bGVCdXR0b25MYWJlbFwiIGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLWFkZC1idXR0b24gcC1idXR0b24tdGV4dCBwLWJ1dHRvbi1zbVwiIChjbGljayk9XCJhZGRDb25zdHJhaW50KClcIiBwUmlwcGxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQbHVzSWNvbiAqbmdJZj1cIiFhZGRSdWxlSWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtYnV0dG9uLWljb24tbGVmdCdcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImFkZFJ1bGVJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLWJ1dHRvbmJhclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAjY2xlYXJCdG4gKm5nSWY9XCJzaG93Q2xlYXJCdXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBjbGFzcz1cInAtYnV0dG9uLW91dGxpbmVkIHAtYnV0dG9uLXNtXCIgKGNsaWNrKT1cImNsZWFyRmlsdGVyKClcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImNsZWFyQnV0dG9uTGFiZWxcIiBbbGFiZWxdPVwiY2xlYXJCdXR0b25MYWJlbFwiIHBSaXBwbGU+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic2hvd0FwcGx5QnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gKGNsaWNrKT1cImFwcGx5RmlsdGVyKClcIiBjbGFzcz1cInAtYnV0dG9uLXNtXCIgW2xhYmVsXT1cImFwcGx5QnV0dG9uTGFiZWxcIiBwUmlwcGxlIFthdHRyLmFyaWEtbGFiZWxdPVwiYXBwbHlCdXR0b25MYWJlbFwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmb290ZXJUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGZpZWxkIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFt0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW3RyYW5zaXRpb24oJzplbnRlcicsIFtzdHlsZSh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlWSgwLjgpJyB9KSwgYW5pbWF0ZSgnLjEycyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKScpXSksIHRyYW5zaXRpb24oJzpsZWF2ZScsIFthbmltYXRlKCcuMXMgbGluZWFyJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKV0pXSldLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIENvbHVtbkZpbHRlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIC8qKlxuICAgICAqIFByb3BlcnR5IHJlcHJlc2VudGVkIGJ5IHRoZSBjb2x1bW4uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmllbGQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIHRoZSBpbnB1dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSAndGV4dCc7XG4gICAgLyoqXG4gICAgICogRmlsdGVyIGRpc3BsYXkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGlzcGxheTogc3RyaW5nID0gJ3Jvdyc7XG4gICAgLyoqXG4gICAgICogRGVjaWRlcyB3aGV0aGVyIHRvIGRpc3BsYXkgZmlsdGVyIG1lbnUgcG9wdXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dNZW51OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBGaWx0ZXIgbWF0Y2ggbW9kZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtYXRjaE1vZGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBGaWx0ZXIgb3BlcmF0b3IuXG4gICAgICogQGRlZmF1bHRWYWx1ZSAnQU5EJ1xuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG9wZXJhdG9yOiBzdHJpbmcgPSBGaWx0ZXJPcGVyYXRvci5BTkQ7XG4gICAgLyoqXG4gICAgICogRGVjaWRlcyB3aGV0aGVyIHRvIGRpc3BsYXkgZmlsdGVyIG9wZXJhdG9yLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93T3BlcmF0b3I6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIERlY2lkZXMgd2hldGhlciB0byBkaXNwbGF5IGNsZWFyIGZpbHRlciBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dDbGVhckJ1dHRvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogRGVjaWRlcyB3aGV0aGVyIHRvIGRpc3BsYXkgYXBwbHkgZmlsdGVyIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2hvd0FwcGx5QnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBEZWNpZGVzIHdoZXRoZXIgdG8gZGlzcGxheSBmaWx0ZXIgbWF0Y2ggbW9kZXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dNYXRjaE1vZGVzOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBEZWNpZGVzIHdoZXRoZXIgdG8gZGlzcGxheSBhZGQgZmlsdGVyIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2hvd0FkZEJ1dHRvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogRGVjaWRlcyB3aGV0aGVyIHRvIGNsb3NlIHBvcHVwIG9uIGNsZWFyIGJ1dHRvbiBjbGljay5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgaGlkZU9uQ2xlYXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBGaWx0ZXIgcGxhY2Vob2xkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBGaWx0ZXIgbWF0Y2ggbW9kZSBvcHRpb25zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1hdGNoTW9kZU9wdGlvbnM6IFNlbGVjdEl0ZW1bXSB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIG1heGltdW0gYW1vdW50IG9mIGNvbnN0cmFpbnRzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIG1heENvbnN0cmFpbnRzOiBudW1iZXIgPSAyO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgbWluaW11bSBmcmFjdGlvbiBvZiBkaWdpdHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiAodmFsdWU6IHVua25vd24pID0+IG51bWJlckF0dHJpYnV0ZSh2YWx1ZSwgbnVsbCkgfSkgbWluRnJhY3Rpb25EaWdpdHM6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIG1heGltdW0gZnJhY3Rpb24gb2YgZGlnaXRzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogKHZhbHVlOiB1bmtub3duKSA9PiBudW1iZXJBdHRyaWJ1dGUodmFsdWUsIG51bGwpIH0pIG1heEZyYWN0aW9uRGlnaXRzOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBwcmVmaXggb2YgdGhlIGZpbHRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwcmVmaXg6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHN1ZmZpeCBvZiB0aGUgZmlsdGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN1ZmZpeDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgZmlsdGVyIGxvY2FsZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGZpbHRlciBsb2NhbGUgbWF0Y2hlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsb2NhbGVNYXRjaGVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBjdXJyZW5jeSBpbnB1dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjdXJyZW5jeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIGRpc3BsYXkgb2YgdGhlIGN1cnJlbmN5IGlucHV0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGN1cnJlbmN5RGlzcGxheTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgaWYgZmlsdGVyIGdyb3VwaW5nIHdpbGwgYmUgZW5hYmxlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgdXNlR3JvdXBpbmc6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIHZpc2liaWxpdHkgb2YgYnV0dG9ucy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2hvd0J1dHRvbnM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIGFyaWEtbGFiZWwgb2YgdGhlIGZvcm0gZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ2ljb24nKSBpY29uOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ2NsZWFyQnRuJykgY2xlYXJCdXR0b25WaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IE51bGxhYmxlPFF1ZXJ5TGlzdDxhbnk+PjtcblxuICAgIG92ZXJsYXlTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIGhlYWRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZpbHRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZvb3RlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZpbHRlckljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICByZW1vdmVSdWxlSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGFkZFJ1bGVJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgY2xlYXJGaWx0ZXJJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgb3BlcmF0b3JPcHRpb25zOiBhbnlbXSB8IHVuZGVmaW5lZDtcblxuICAgIG92ZXJsYXlWaXNpYmxlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgb3ZlcmxheTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gICAgc2Nyb2xsSGFuZGxlcjogQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXIgfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBkb2N1bWVudFJlc2l6ZUxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBtYXRjaE1vZGVzOiBTZWxlY3RJdGVtW10gfCB1bmRlZmluZWQ7XG5cbiAgICB0cmFuc2xhdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gICAgcmVzZXRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIHNlbGZDbGljazogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIG92ZXJsYXlFdmVudExpc3RlbmVyOiBhbnk7XG5cbiAgICBwcml2YXRlIHdpbmRvdzogV2luZG93O1xuXG4gICAgb3ZlcmxheUlkOiBhbnk7XG5cbiAgICBnZXQgZmllbGRDb25zdHJhaW50cygpOiBGaWx0ZXJNZXRhZGF0YVtdIHwgdW5kZWZpbmVkIHwgbnVsbCB7XG4gICAgICAgIGxldCBmaWx0ZXIgPSB0aGlzLmR0LmZpbHRlcnNbPHN0cmluZz50aGlzLmZpZWxkXTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGZpbHRlcikpIGZpbHRlciA9IFtmaWx0ZXJdO1xuICAgICAgICByZXR1cm4gdGhpcy5kdC5maWx0ZXJzID8gPEZpbHRlck1ldGFkYXRhW10+ZmlsdGVyIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgc2hvd1JlbW92ZUljb24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpZWxkQ29uc3RyYWludHMgPyB0aGlzLmZpZWxkQ29uc3RyYWludHMubGVuZ3RoID4gMSA6IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBzaG93TWVudUJ1dHRvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd01lbnUgJiYgKHRoaXMuZGlzcGxheSA9PT0gJ3JvdycgPyB0aGlzLnR5cGUgIT09ICdib29sZWFuJyA6IHRydWUpO1xuICAgIH1cblxuICAgIGdldCBpc1Nob3dPcGVyYXRvcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd09wZXJhdG9yICYmIHRoaXMudHlwZSAhPT0gJ2Jvb2xlYW4nO1xuICAgIH1cblxuICAgIGdldCBpc1Nob3dBZGRDb25zdHJhaW50KCk6IGJvb2xlYW4gfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd0FkZEJ1dHRvbiAmJiB0aGlzLnR5cGUgIT09ICdib29sZWFuJyAmJiB0aGlzLmZpZWxkQ29uc3RyYWludHMgJiYgdGhpcy5maWVsZENvbnN0cmFpbnRzLmxlbmd0aCA8IHRoaXMubWF4Q29uc3RyYWludHM7XG4gICAgfVxuXG4gICAgZ2V0IHNob3dNZW51QnV0dG9uTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuU0hPV19GSUxURVJfTUVOVSk7XG4gICAgfVxuXG4gICAgZ2V0IGFwcGx5QnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5BUFBMWSk7XG4gICAgfVxuXG4gICAgZ2V0IGNsZWFyQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5DTEVBUik7XG4gICAgfVxuXG4gICAgZ2V0IGFkZFJ1bGVCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkFERF9SVUxFKTtcbiAgICB9XG5cbiAgICBnZXQgcmVtb3ZlUnVsZUJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuUkVNT1ZFX1JVTEUpO1xuICAgIH1cblxuICAgIGdldCBub0ZpbHRlckxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuTk9fRklMVEVSKTtcbiAgICB9XG5cbiAgICBnZXQgZmlsdGVyTWVudUJ1dHRvbkFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uID8gKHRoaXMub3ZlcmxheVZpc2libGUgPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLmhpZGVGaWx0ZXJNZW51IDogdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5zaG93RmlsdGVyTWVudSkgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IHJlbW92ZVJ1bGVCdXR0b25BcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbiA/IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLnJlbW92ZVJ1bGUgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGZpbHRlck9wZXJhdG9yQXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHJhbnNsYXRpb24gPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLmZpbHRlck9wZXJhdG9yIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCBmaWx0ZXJDb25zdHJhaW50QXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHJhbnNsYXRpb24gPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLmZpbHRlckNvbnN0cmFpbnQgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIGR0OiBUYWJsZSwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcsIHB1YmxpYyBvdmVybGF5U2VydmljZTogT3ZlcmxheVNlcnZpY2UsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMud2luZG93ID0gdGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyBhcyBXaW5kb3c7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheUlkID0gVW5pcXVlQ29tcG9uZW50SWQoKTtcbiAgICAgICAgaWYgKCF0aGlzLmR0LmZpbHRlcnNbPHN0cmluZz50aGlzLmZpZWxkXSkge1xuICAgICAgICAgICAgdGhpcy5pbml0RmllbGRGaWx0ZXJDb25zdHJhaW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5jb25maWcudHJhbnNsYXRpb25PYnNlcnZlci5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU1hdGNoTW9kZU9wdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVPcGVyYXRvck9wdGlvbnMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5nZW5lcmF0ZU1hdGNoTW9kZU9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZU9wZXJhdG9yT3B0aW9ucygpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlTWF0Y2hNb2RlT3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5tYXRjaE1vZGVzID1cbiAgICAgICAgICAgIHRoaXMubWF0Y2hNb2RlT3B0aW9ucyB8fFxuICAgICAgICAgICAgKHRoaXMuY29uZmlnIGFzIGFueSkuZmlsdGVyTWF0Y2hNb2RlT3B0aW9uc1t0aGlzLnR5cGVdPy5tYXAoKGtleTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbGFiZWw6IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKGtleSksIHZhbHVlOiBrZXkgfTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdlbmVyYXRlT3BlcmF0b3JPcHRpb25zKCkge1xuICAgICAgICB0aGlzLm9wZXJhdG9yT3B0aW9ucyA9IFtcbiAgICAgICAgICAgIHsgbGFiZWw6IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5NQVRDSF9BTEwpLCB2YWx1ZTogRmlsdGVyT3BlcmF0b3IuQU5EIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuTUFUQ0hfQU5ZKSwgdmFsdWU6IEZpbHRlck9wZXJhdG9yLk9SIH1cbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmaWx0ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb3RlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmaWx0ZXJpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFyZmlsdGVyaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZXJ1bGVpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVSdWxlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdhZGRydWxlaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUnVsZUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0RmllbGRGaWx0ZXJDb25zdHJhaW50KCkge1xuICAgICAgICBsZXQgZGVmYXVsdE1hdGNoTW9kZSA9IHRoaXMuZ2V0RGVmYXVsdE1hdGNoTW9kZSgpO1xuICAgICAgICB0aGlzLmR0LmZpbHRlcnNbPHN0cmluZz50aGlzLmZpZWxkXSA9IHRoaXMuZGlzcGxheSA9PSAncm93JyA/IHsgdmFsdWU6IG51bGwsIG1hdGNoTW9kZTogZGVmYXVsdE1hdGNoTW9kZSB9IDogW3sgdmFsdWU6IG51bGwsIG1hdGNoTW9kZTogZGVmYXVsdE1hdGNoTW9kZSwgb3BlcmF0b3I6IHRoaXMub3BlcmF0b3IgfV07XG4gICAgfVxuXG4gICAgb25NZW51TWF0Y2hNb2RlQ2hhbmdlKHZhbHVlOiBhbnksIGZpbHRlck1ldGE6IEZpbHRlck1ldGFkYXRhKSB7XG4gICAgICAgIGZpbHRlck1ldGEubWF0Y2hNb2RlID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNob3dBcHBseUJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5kdC5fZmlsdGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblJvd01hdGNoTW9kZUNoYW5nZShtYXRjaE1vZGU6IHN0cmluZykge1xuICAgICAgICAoPEZpbHRlck1ldGFkYXRhPnRoaXMuZHQuZmlsdGVyc1s8c3RyaW5nPnRoaXMuZmllbGRdKS5tYXRjaE1vZGUgPSBtYXRjaE1vZGU7XG4gICAgICAgIHRoaXMuZHQuX2ZpbHRlcigpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBvblJvd01hdGNoTW9kZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSA8SFRNTExJRWxlbWVudD5ldmVudC50YXJnZXQ7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgdmFyIG5leHRJdGVtID0gdGhpcy5maW5kTmV4dEl0ZW0oaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0SXRlbS50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgbmV4dEl0ZW0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB2YXIgcHJldkl0ZW0gPSB0aGlzLmZpbmRQcmV2SXRlbShpdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAocHJldkl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgICAgICAgICAgICAgICAgIHByZXZJdGVtLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICBwcmV2SXRlbS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblJvd0NsZWFySXRlbUNsaWNrKCkge1xuICAgICAgICB0aGlzLmNsZWFyRmlsdGVyKCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIGlzUm93TWF0Y2hNb2RlU2VsZWN0ZWQobWF0Y2hNb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuICg8RmlsdGVyTWV0YWRhdGE+dGhpcy5kdC5maWx0ZXJzWzxzdHJpbmc+dGhpcy5maWVsZF0pLm1hdGNoTW9kZSA9PT0gbWF0Y2hNb2RlO1xuICAgIH1cblxuICAgIGFkZENvbnN0cmFpbnQoKSB7XG4gICAgICAgICg8RmlsdGVyTWV0YWRhdGFbXT50aGlzLmR0LmZpbHRlcnNbPHN0cmluZz50aGlzLmZpZWxkXSkucHVzaCh7IHZhbHVlOiBudWxsLCBtYXRjaE1vZGU6IHRoaXMuZ2V0RGVmYXVsdE1hdGNoTW9kZSgpLCBvcGVyYXRvcjogdGhpcy5nZXREZWZhdWx0T3BlcmF0b3IoKSB9KTtcbiAgICAgICAgRG9tSGFuZGxlci5mb2N1cyh0aGlzLmNsZWFyQnV0dG9uVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJlbW92ZUNvbnN0cmFpbnQoZmlsdGVyTWV0YTogRmlsdGVyTWV0YWRhdGEpIHtcbiAgICAgICAgdGhpcy5kdC5maWx0ZXJzWzxzdHJpbmc+dGhpcy5maWVsZF0gPSAoPEZpbHRlck1ldGFkYXRhW10+dGhpcy5kdC5maWx0ZXJzWzxzdHJpbmc+dGhpcy5maWVsZF0pLmZpbHRlcigobWV0YSkgPT4gbWV0YSAhPT0gZmlsdGVyTWV0YSk7XG4gICAgICAgIGlmICghdGhpcy5zaG93QXBwbHlCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuZHQuX2ZpbHRlcigpO1xuICAgICAgICB9XG4gICAgICAgIERvbUhhbmRsZXIuZm9jdXModGhpcy5jbGVhckJ1dHRvblZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBvbk9wZXJhdG9yQ2hhbmdlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgbGV0IGZpbHRlciA9IHRoaXMuZHQuZmlsdGVyc1s8c3RyaW5nPnRoaXMuZmllbGRdO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZmlsdGVyKSkgZmlsdGVyID0gW2ZpbHRlcl07XG4gICAgICAgICg8RmlsdGVyTWV0YWRhdGFbXT5maWx0ZXIpLmZvckVhY2goKGZpbHRlck1ldGEpID0+IHtcbiAgICAgICAgICAgIGZpbHRlck1ldGEub3BlcmF0b3IgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMub3BlcmF0b3IgPSB2YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNob3dBcHBseUJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5kdC5fZmlsdGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVNZW51KCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gIXRoaXMub3ZlcmxheVZpc2libGU7XG4gICAgfVxuXG4gICAgb25Ub2dnbGVCdXR0b25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzYWJsZSA9IERvbUhhbmRsZXIuZ2V0Rm9jdXNhYmxlRWxlbWVudHMoPEhUTUxFbGVtZW50PnRoaXMub3ZlcmxheSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZVswXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5hbHRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlTWVudSgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkVzY2FwZSgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmljb24/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmaW5kTmV4dEl0ZW0oaXRlbTogSFRNTExJRWxlbWVudCk6IGFueSB7XG4gICAgICAgIGxldCBuZXh0SXRlbSA9IDxIVE1MTElFbGVtZW50Pml0ZW0ubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIGlmIChuZXh0SXRlbSkgcmV0dXJuIERvbUhhbmRsZXIuaGFzQ2xhc3MobmV4dEl0ZW0sICdwLWNvbHVtbi1maWx0ZXItc2VwYXJhdG9yJykgPyB0aGlzLmZpbmROZXh0SXRlbShuZXh0SXRlbSkgOiBuZXh0SXRlbTtcbiAgICAgICAgZWxzZSByZXR1cm4gaXRlbS5wYXJlbnRFbGVtZW50Py5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG5cbiAgICBmaW5kUHJldkl0ZW0oaXRlbTogSFRNTExJRWxlbWVudCk6IGFueSB7XG4gICAgICAgIGxldCBwcmV2SXRlbSA9IDxIVE1MTElFbGVtZW50Pml0ZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAocHJldkl0ZW0pIHJldHVybiBEb21IYW5kbGVyLmhhc0NsYXNzKHByZXZJdGVtLCAncC1jb2x1bW4tZmlsdGVyLXNlcGFyYXRvcicpID8gdGhpcy5maW5kUHJldkl0ZW0ocHJldkl0ZW0pIDogcHJldkl0ZW07XG4gICAgICAgIGVsc2UgcmV0dXJuIGl0ZW0ucGFyZW50RWxlbWVudD8ubGFzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG5cbiAgICBvbkNvbnRlbnRDbGljaygpIHtcbiAgICAgICAgdGhpcy5zZWxmQ2xpY2sgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheSA9IGV2ZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIHRoaXMub3ZlcmxheSk7XG4gICAgICAgICAgICAgICAgWkluZGV4VXRpbHMuc2V0KCdvdmVybGF5JywgdGhpcy5vdmVybGF5LCB0aGlzLmNvbmZpZy56SW5kZXgub3ZlcmxheSk7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMub3ZlcmxheSwgdGhpcy5pY29uPy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheUV2ZW50TGlzdGVuZXIgPSAoZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5LmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxmQ2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVN1YnNjcmlwdGlvbiA9IHRoaXMub3ZlcmxheVNlcnZpY2UuY2xpY2tPYnNlcnZhYmxlLnN1YnNjcmliZSh0aGlzLm92ZXJsYXlFdmVudExpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5U3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uT3ZlcmxheUFuaW1hdGlvbkVuZChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzT25GaXJzdEVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKGV2ZW50LmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXNPbkZpcnN0RWxlbWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5mb2N1cyhEb21IYW5kbGVyLmdldEZpcnN0Rm9jdXNhYmxlRWxlbWVudCh0aGlzLm92ZXJsYXksICcnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXREZWZhdWx0TWF0Y2hNb2RlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLm1hdGNoTW9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hNb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3RleHQnKSByZXR1cm4gRmlsdGVyTWF0Y2hNb2RlLlNUQVJUU19XSVRIO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09PSAnbnVtZXJpYycpIHJldHVybiBGaWx0ZXJNYXRjaE1vZGUuRVFVQUxTO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09PSAnZGF0ZScpIHJldHVybiBGaWx0ZXJNYXRjaE1vZGUuREFURV9JUztcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIEZpbHRlck1hdGNoTW9kZS5DT05UQUlOUztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldERlZmF1bHRPcGVyYXRvcigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5kdC5maWx0ZXJzID8gKDxGaWx0ZXJNZXRhZGF0YVtdPnRoaXMuZHQuZmlsdGVyc1s8c3RyaW5nPig8c3RyaW5nPnRoaXMuZmllbGQpXSlbMF0ub3BlcmF0b3IgOiB0aGlzLm9wZXJhdG9yO1xuICAgIH1cblxuICAgIGhhc1Jvd0ZpbHRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHQuZmlsdGVyc1s8c3RyaW5nPnRoaXMuZmllbGRdICYmICF0aGlzLmR0LmlzRmlsdGVyQmxhbmsoKDxGaWx0ZXJNZXRhZGF0YT50aGlzLmR0LmZpbHRlcnNbPHN0cmluZz50aGlzLmZpZWxkXSkudmFsdWUpO1xuICAgIH1cblxuICAgIGhhc0ZpbHRlcigpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGZpZWxkRmlsdGVyID0gdGhpcy5kdC5maWx0ZXJzWzxzdHJpbmc+dGhpcy5maWVsZF07XG4gICAgICAgIGlmIChmaWVsZEZpbHRlcikge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmllbGRGaWx0ZXIpKSByZXR1cm4gIXRoaXMuZHQuaXNGaWx0ZXJCbGFuaygoPEZpbHRlck1ldGFkYXRhW10+ZmllbGRGaWx0ZXIpWzBdLnZhbHVlKTtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuICF0aGlzLmR0LmlzRmlsdGVyQmxhbmsoZmllbGRGaWx0ZXIudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzT3V0c2lkZUNsaWNrZWQoZXZlbnQ6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIShcbiAgICAgICAgICAgIERvbUhhbmRsZXIuaGFzQ2xhc3ModGhpcy5vdmVybGF5Py5uZXh0RWxlbWVudFNpYmxpbmcsICdwLW92ZXJsYXknKSB8fFxuICAgICAgICAgICAgdGhpcy5vdmVybGF5Py5pc1NhbWVOb2RlKGV2ZW50LnRhcmdldCkgfHxcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheT8uY29udGFpbnMoZXZlbnQudGFyZ2V0KSB8fFxuICAgICAgICAgICAgdGhpcy5pY29uPy5uYXRpdmVFbGVtZW50LmlzU2FtZU5vZGUoZXZlbnQudGFyZ2V0KSB8fFxuICAgICAgICAgICAgdGhpcy5pY29uPy5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgfHxcbiAgICAgICAgICAgIERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1jb2x1bW4tZmlsdGVyLWFkZC1idXR0b24nKSB8fFxuICAgICAgICAgICAgRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQucGFyZW50RWxlbWVudCwgJ3AtY29sdW1uLWZpbHRlci1hZGQtYnV0dG9uJykgfHxcbiAgICAgICAgICAgIERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1jb2x1bW4tZmlsdGVyLXJlbW92ZS1idXR0b24nKSB8fFxuICAgICAgICAgICAgRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQucGFyZW50RWxlbWVudCwgJ3AtY29sdW1uLWZpbHRlci1yZW1vdmUtYnV0dG9uJylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICBjb25zdCBkb2N1bWVudFRhcmdldDogYW55ID0gdGhpcy5lbCA/IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50IDogJ2RvY3VtZW50JztcblxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudFRhcmdldCwgJ21vdXNlZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpYWxvZ0VsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJkaWFsb2dcIl0nKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRJc0NvbHVtbkZpbHRlck1lbnVCdXR0b24gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnAtY29sdW1uLWZpbHRlci1tZW51LWJ1dHRvbicpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuaXNPdXRzaWRlQ2xpY2tlZChldmVudCkgJiYgKHRhcmdldElzQ29sdW1uRmlsdGVyTWVudUJ1dHRvbiB8fCBkaWFsb2dFbGVtZW50cz8ubGVuZ3RoIDw9IDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZkNsaWNrID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5zZWxmQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy53aW5kb3csICdyZXNpemUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSAmJiAhRG9tSGFuZGxlci5pc1RvdWNoRGV2aWNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kU2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBuZXcgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXIodGhpcy5pY29uPy5uYXRpdmVFbGVtZW50LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgdW5iaW5kU2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uT3ZlcmxheUhpZGUoKSB7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMub3ZlcmxheSA9IG51bGw7XG4gICAgfVxuXG4gICAgY2xlYXJGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMuaW5pdEZpZWxkRmlsdGVyQ29uc3RyYWludCgpO1xuICAgICAgICB0aGlzLmR0Ll9maWx0ZXIoKTtcbiAgICAgICAgaWYgKHRoaXMuaGlkZU9uQ2xlYXIpIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyKCkge1xuICAgICAgICB0aGlzLmR0Ll9maWx0ZXIoKTtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLm92ZXJsYXkpO1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5vdmVybGF5KTtcbiAgICAgICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlc2V0U3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vdmVybGF5U3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWNvbHVtbkZpbHRlckZvcm1FbGVtZW50JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZmlsdGVyVGVtcGxhdGU7IGVsc2UgYnVpbHRJbkVsZW1lbnRcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGltcGxpY2l0OiBmaWx0ZXJDb25zdHJhaW50LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyQ2FsbGJhY2s6IGZpbHRlckNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBmaWVsZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckNvbnN0cmFpbnQ6IGZpbHRlckNvbnN0cmFpbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5GcmFjdGlvbkRpZ2l0czogbWluRnJhY3Rpb25EaWdpdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhGcmFjdGlvbkRpZ2l0czogbWF4RnJhY3Rpb25EaWdpdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IHByZWZpeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1ZmZpeDogc3VmZml4LFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxlOiBsb2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbGVNYXRjaGVyOiBsb2NhbGVNYXRjaGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IGN1cnJlbmN5LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3lEaXNwbGF5OiBjdXJyZW5jeURpc3BsYXksXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdXNlR3JvdXBpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93QnV0dG9uczogc2hvd0J1dHRvbnNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWx0SW5FbGVtZW50PlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwidHlwZVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ3RleHQnXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICBbYXJpYUxhYmVsXT1cImFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIHBJbnB1dFRleHRcbiAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImZpbHRlckNvbnN0cmFpbnQ/LnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgKGlucHV0KT1cIm9uTW9kZWxDaGFuZ2UoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJvblRleHRJbnB1dEVudGVyS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHAtaW5wdXROdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidudW1lcmljJ1wiXG4gICAgICAgICAgICAgICAgICAgIFtuZ01vZGVsXT1cImZpbHRlckNvbnN0cmFpbnQ/LnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25Nb2RlbENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKG9uS2V5RG93bik9XCJvbk51bWVyaWNJbnB1dEtleURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtzaG93QnV0dG9uc109XCJzaG93QnV0dG9uc1wiXG4gICAgICAgICAgICAgICAgICAgIFttaW5GcmFjdGlvbkRpZ2l0c109XCJtaW5GcmFjdGlvbkRpZ2l0c1wiXG4gICAgICAgICAgICAgICAgICAgIFttYXhGcmFjdGlvbkRpZ2l0c109XCJtYXhGcmFjdGlvbkRpZ2l0c1wiXG4gICAgICAgICAgICAgICAgICAgIFthcmlhTGFiZWxdPVwiYXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgW3ByZWZpeF09XCJwcmVmaXhcIlxuICAgICAgICAgICAgICAgICAgICBbc3VmZml4XT1cInN1ZmZpeFwiXG4gICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgICAgIFttb2RlXT1cImN1cnJlbmN5ID8gJ2N1cnJlbmN5JyA6ICdkZWNpbWFsJ1wiXG4gICAgICAgICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgICAgICAgICAgICAgW2xvY2FsZU1hdGNoZXJdPVwibG9jYWxlTWF0Y2hlclwiXG4gICAgICAgICAgICAgICAgICAgIFtjdXJyZW5jeV09XCJjdXJyZW5jeVwiXG4gICAgICAgICAgICAgICAgICAgIFtjdXJyZW5jeURpc3BsYXldPVwiY3VycmVuY3lEaXNwbGF5XCJcbiAgICAgICAgICAgICAgICAgICAgW3VzZUdyb3VwaW5nXT1cInVzZUdyb3VwaW5nXCJcbiAgICAgICAgICAgICAgICA+PC9wLWlucHV0TnVtYmVyPlxuICAgICAgICAgICAgICAgIDxwLXRyaVN0YXRlQ2hlY2tib3ggW2FyaWFMYWJlbF09XCJhcmlhTGFiZWxcIiAqbmdTd2l0Y2hDYXNlPVwiJ2Jvb2xlYW4nXCIgW25nTW9kZWxdPVwiZmlsdGVyQ29uc3RyYWludD8udmFsdWVcIiAobmdNb2RlbENoYW5nZSk9XCJvbk1vZGVsQ2hhbmdlKCRldmVudClcIj48L3AtdHJpU3RhdGVDaGVja2JveD5cbiAgICAgICAgICAgICAgICA8cC1jYWxlbmRhciBbYXJpYUxhYmVsXT1cImFyaWFMYWJlbFwiICpuZ1N3aXRjaENhc2U9XCInZGF0ZSdcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiBbbmdNb2RlbF09XCJmaWx0ZXJDb25zdHJhaW50Py52YWx1ZVwiIChuZ01vZGVsQ2hhbmdlKT1cIm9uTW9kZWxDaGFuZ2UoJGV2ZW50KVwiIGFwcGVuZFRvPVwiYm9keVwiPjwvcC1jYWxlbmRhcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uRmlsdGVyRm9ybUVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGZpZWxkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJDb25zdHJhaW50OiBGaWx0ZXJNZXRhZGF0YSB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGZpbHRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06ICh2YWx1ZTogdW5rbm93bikgPT4gbnVtYmVyQXR0cmlidXRlKHZhbHVlLCBudWxsKSB9KSBtaW5GcmFjdGlvbkRpZ2l0czogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiAodmFsdWU6IHVua25vd24pID0+IG51bWJlckF0dHJpYnV0ZSh2YWx1ZSwgbnVsbCkgfSkgbWF4RnJhY3Rpb25EaWdpdHM6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHByZWZpeDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgc3VmZml4OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGxvY2FsZU1hdGNoZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGN1cnJlbmN5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBjdXJyZW5jeURpc3BsYXk6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSB1c2VHcm91cGluZzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIGdldCBzaG93QnV0dG9ucygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sRmlsdGVyLnNob3dCdXR0b25zO1xuICAgIH1cblxuICAgIGZpbHRlckNhbGxiYWNrOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwcml2YXRlIGNvbEZpbHRlcjogQ29sdW1uRmlsdGVyKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyQ2FsbGJhY2sgPSAodmFsdWU6IGFueSkgPT4ge1xuICAgICAgICAgICAgKDxhbnk+dGhpcy5maWx0ZXJDb25zdHJhaW50KS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5kdC5fZmlsdGVyKCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25Nb2RlbENoYW5nZSh2YWx1ZTogYW55KSB7XG4gICAgICAgICg8YW55PnRoaXMuZmlsdGVyQ29uc3RyYWludCkudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnZGF0ZScgfHwgdGhpcy50eXBlID09PSAnYm9vbGVhbicgfHwgdmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLmR0Ll9maWx0ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGV4dElucHV0RW50ZXJLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZHQuX2ZpbHRlcigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uTnVtZXJpY0lucHV0S2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLmR0Ll9maWx0ZXIoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFBhZ2luYXRvck1vZHVsZSxcbiAgICAgICAgSW5wdXRUZXh0TW9kdWxlLFxuICAgICAgICBEcm9wZG93bk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgU2VsZWN0QnV0dG9uTW9kdWxlLFxuICAgICAgICBDYWxlbmRhck1vZHVsZSxcbiAgICAgICAgSW5wdXROdW1iZXJNb2R1bGUsXG4gICAgICAgIFRyaVN0YXRlQ2hlY2tib3hNb2R1bGUsXG4gICAgICAgIFNjcm9sbGVyTW9kdWxlLFxuICAgICAgICBBcnJvd0Rvd25JY29uLFxuICAgICAgICBBcnJvd1VwSWNvbixcbiAgICAgICAgU3Bpbm5lckljb24sXG4gICAgICAgIFNvcnRBbHRJY29uLFxuICAgICAgICBTb3J0QW1vdW50VXBBbHRJY29uLFxuICAgICAgICBTb3J0QW1vdW50RG93bkljb24sXG4gICAgICAgIENoZWNrSWNvbixcbiAgICAgICAgRmlsdGVySWNvbixcbiAgICAgICAgRmlsdGVyU2xhc2hJY29uLFxuICAgICAgICBQbHVzSWNvbixcbiAgICAgICAgVHJhc2hJY29uXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFRhYmxlLFxuICAgICAgICBTaGFyZWRNb2R1bGUsXG4gICAgICAgIFNvcnRhYmxlQ29sdW1uLFxuICAgICAgICBGcm96ZW5Db2x1bW4sXG4gICAgICAgIFJvd0dyb3VwSGVhZGVyLFxuICAgICAgICBTZWxlY3RhYmxlUm93LFxuICAgICAgICBSb3dUb2dnbGVyLFxuICAgICAgICBDb250ZXh0TWVudVJvdyxcbiAgICAgICAgUmVzaXphYmxlQ29sdW1uLFxuICAgICAgICBSZW9yZGVyYWJsZUNvbHVtbixcbiAgICAgICAgRWRpdGFibGVDb2x1bW4sXG4gICAgICAgIENlbGxFZGl0b3IsXG4gICAgICAgIFNvcnRJY29uLFxuICAgICAgICBUYWJsZVJhZGlvQnV0dG9uLFxuICAgICAgICBUYWJsZUNoZWNrYm94LFxuICAgICAgICBUYWJsZUhlYWRlckNoZWNrYm94LFxuICAgICAgICBSZW9yZGVyYWJsZVJvd0hhbmRsZSxcbiAgICAgICAgUmVvcmRlcmFibGVSb3csXG4gICAgICAgIFNlbGVjdGFibGVSb3dEYmxDbGljayxcbiAgICAgICAgRWRpdGFibGVSb3csXG4gICAgICAgIEluaXRFZGl0YWJsZVJvdyxcbiAgICAgICAgU2F2ZUVkaXRhYmxlUm93LFxuICAgICAgICBDYW5jZWxFZGl0YWJsZVJvdyxcbiAgICAgICAgQ29sdW1uRmlsdGVyLFxuICAgICAgICBDb2x1bW5GaWx0ZXJGb3JtRWxlbWVudCxcbiAgICAgICAgU2Nyb2xsZXJNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBUYWJsZSxcbiAgICAgICAgU29ydGFibGVDb2x1bW4sXG4gICAgICAgIEZyb3plbkNvbHVtbixcbiAgICAgICAgUm93R3JvdXBIZWFkZXIsXG4gICAgICAgIFNlbGVjdGFibGVSb3csXG4gICAgICAgIFJvd1RvZ2dsZXIsXG4gICAgICAgIENvbnRleHRNZW51Um93LFxuICAgICAgICBSZXNpemFibGVDb2x1bW4sXG4gICAgICAgIFJlb3JkZXJhYmxlQ29sdW1uLFxuICAgICAgICBFZGl0YWJsZUNvbHVtbixcbiAgICAgICAgQ2VsbEVkaXRvcixcbiAgICAgICAgVGFibGVCb2R5LFxuICAgICAgICBTb3J0SWNvbixcbiAgICAgICAgVGFibGVSYWRpb0J1dHRvbixcbiAgICAgICAgVGFibGVDaGVja2JveCxcbiAgICAgICAgVGFibGVIZWFkZXJDaGVja2JveCxcbiAgICAgICAgUmVvcmRlcmFibGVSb3dIYW5kbGUsXG4gICAgICAgIFJlb3JkZXJhYmxlUm93LFxuICAgICAgICBTZWxlY3RhYmxlUm93RGJsQ2xpY2ssXG4gICAgICAgIEVkaXRhYmxlUm93LFxuICAgICAgICBJbml0RWRpdGFibGVSb3csXG4gICAgICAgIFNhdmVFZGl0YWJsZVJvdyxcbiAgICAgICAgQ2FuY2VsRWRpdGFibGVSb3csXG4gICAgICAgIENvbHVtbkZpbHRlcixcbiAgICAgICAgQ29sdW1uRmlsdGVyRm9ybUVsZW1lbnRcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlTW9kdWxlIHt9XG4iXX0=