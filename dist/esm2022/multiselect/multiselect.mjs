import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ContentChild, ContentChildren, effect, EventEmitter, forwardRef, Input, NgModule, numberAttribute, Output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Footer, Header, PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { OverlayModule } from 'primeng/overlay';
import { RippleModule } from 'primeng/ripple';
import { ScrollerModule } from 'primeng/scroller';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { CheckIcon } from 'primeng/icons/check';
import { SearchIcon } from 'primeng/icons/search';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { TimesIcon } from 'primeng/icons/times';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { AutoFocusModule } from 'primeng/autofocus';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
import * as i3 from "primeng/api";
import * as i4 from "primeng/overlay";
import * as i5 from "primeng/tooltip";
import * as i6 from "primeng/scroller";
import * as i7 from "primeng/autofocus";
export const MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelect),
    multi: true
};
export class MultiSelectItem {
    id;
    option;
    selected;
    label;
    disabled;
    itemSize;
    focused;
    ariaPosInset;
    ariaSetSize;
    template;
    checkIconTemplate;
    onClick = new EventEmitter();
    onMouseEnter = new EventEmitter();
    onOptionClick(event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option,
            selected: this.selected
        });
        event.stopPropagation();
    }
    onOptionMouseEnter(event) {
        this.onMouseEnter.emit({
            originalEvent: event,
            option: this.option,
            selected: this.selected
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MultiSelectItem, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: MultiSelectItem, selector: "p-multiSelectItem", inputs: { id: "id", option: "option", selected: ["selected", "selected", booleanAttribute], label: "label", disabled: ["disabled", "disabled", booleanAttribute], itemSize: ["itemSize", "itemSize", numberAttribute], focused: ["focused", "focused", booleanAttribute], ariaPosInset: "ariaPosInset", ariaSetSize: "ariaSetSize", template: "template", checkIconTemplate: "checkIconTemplate" }, outputs: { onClick: "onClick", onMouseEnter: "onMouseEnter" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <li
            pRipple
            role="option"
            [ngStyle]="{ height: itemSize + 'px' }"
            class="p-multiselect-item"
            [ngClass]="{ 'p-multiselect-item': true, 'p-disabled': disabled, 'p-focus': focused }"
            [id]="id"
            [attr.aria-label]="label"
            [attr.aria-setsize]="ariaSetSize"
            [attr.aria-posinset]="ariaPosInset"
            [attr.aria-selected]="selected"
            [attr.data-p-focused]="focused"
            [attr.data-p-highlight]="selected"
            [attr.data-p-disabled]="disabled"
            [attr.aria-checked]="selected"
            (click)="onOptionClick($event)"
            (mouseenter)="onOptionMouseEnter($event)"
        >
            <div class="p-checkbox p-component">
                <div class="p-checkbox-box" [ngClass]="{ 'p-highlight': selected }">
                    <ng-container *ngIf="selected">
                        <CheckIcon *ngIf="!checkIconTemplate" [styleClass]="'p-checkbox-icon'" [attr.aria-hidden]="true" />
                        <span *ngIf="checkIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="checkIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </div>
            </div>
            <span *ngIf="!template">{{ label ?? 'empty' }}</span>
            <ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
        </li>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => CheckIcon), selector: "CheckIcon" }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MultiSelectItem, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-multiSelectItem',
                    template: `
        <li
            pRipple
            role="option"
            [ngStyle]="{ height: itemSize + 'px' }"
            class="p-multiselect-item"
            [ngClass]="{ 'p-multiselect-item': true, 'p-disabled': disabled, 'p-focus': focused }"
            [id]="id"
            [attr.aria-label]="label"
            [attr.aria-setsize]="ariaSetSize"
            [attr.aria-posinset]="ariaPosInset"
            [attr.aria-selected]="selected"
            [attr.data-p-focused]="focused"
            [attr.data-p-highlight]="selected"
            [attr.data-p-disabled]="disabled"
            [attr.aria-checked]="selected"
            (click)="onOptionClick($event)"
            (mouseenter)="onOptionMouseEnter($event)"
        >
            <div class="p-checkbox p-component">
                <div class="p-checkbox-box" [ngClass]="{ 'p-highlight': selected }">
                    <ng-container *ngIf="selected">
                        <CheckIcon *ngIf="!checkIconTemplate" [styleClass]="'p-checkbox-icon'" [attr.aria-hidden]="true" />
                        <span *ngIf="checkIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="checkIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </div>
            </div>
            <span *ngIf="!template">{{ label ?? 'empty' }}</span>
            <ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
        </li>
    `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], propDecorators: { id: [{
                type: Input
            }], option: [{
                type: Input
            }], selected: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], itemSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], focused: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], ariaPosInset: [{
                type: Input
            }], ariaSetSize: [{
                type: Input
            }], template: [{
                type: Input
            }], checkIconTemplate: [{
                type: Input
            }], onClick: [{
                type: Output
            }], onMouseEnter: [{
                type: Output
            }] } });
/**
 * MultiSelect is used to select multiple items from a collection.
 * @group Components
 */
export class MultiSelect {
    el;
    renderer;
    cd;
    zone;
    filterService;
    config;
    overlayService;
    /**
     * Unique identifier of the component
     * @group Props
     */
    id;
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel;
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Style class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Inline style of the overlay panel.
     * @group Props
     */
    panelStyle;
    /**
     * Style class of the overlay panel element.
     * @group Props
     */
    panelStyleClass;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled;
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    readonly;
    /**
     * Whether to display options as grouped when nested options are provided.
     * @group Props
     */
    group;
    /**
     * When specified, displays an input field to filter the items on keyup.
     * @group Props
     */
    filter = true;
    /**
     * Defines placeholder of the filter input.
     * @group Props
     */
    filterPlaceHolder;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale;
    /**
     * Specifies the visibility of the options panel.
     * @group Props
     */
    overlayVisible;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    dataKey;
    /**
     * Name of the input element.
     * @group Props
     */
    name;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Whether to show labels of selected item labels or use default label.
     * @group Props
     * @defaultValue true
     */
    set displaySelectedLabel(val) {
        this._displaySelectedLabel = val;
    }
    get displaySelectedLabel() {
        return this._displaySelectedLabel;
    }
    /**
     * Decides how many selected item labels to show at most.
     * @group Props
     * @defaultValue 3
     */
    set maxSelectedLabels(val) {
        this._maxSelectedLabels = val;
    }
    get maxSelectedLabels() {
        return this._maxSelectedLabels;
    }
    /**
     * Decides how many selected item labels to show at most.
     * @group Props
     */
    selectionLimit;
    /**
     * Label to display after exceeding max selected labels e.g. ({0} items selected), defaults "ellipsis" keyword to indicate a text-overflow.
     * @group Props
     */
    selectedItemsLabel;
    /**
     * Whether to show the checkbox at header to toggle all items at once.
     * @group Props
     */
    showToggleAll = true;
    /**
     * Text to display when filtering does not return any results.
     * @group Props
     */
    emptyFilterMessage = '';
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyMessage = '';
    /**
     * Clears the filter value when hiding the dropdown.
     * @group Props
     */
    resetFilterOnHide = false;
    /**
     * Icon class of the dropdown icon.
     * @group Props
     */
    dropdownIcon;
    /**
     * Name of the label field of an option.
     * @group Props
     */
    optionLabel;
    /**
     * Name of the value field of an option.
     * @group Props
     */
    optionValue;
    /**
     * Name of the disabled field of an option.
     * @group Props
     */
    optionDisabled;
    /**
     * Name of the label field of an option group.
     * @group Props
     */
    optionGroupLabel = 'label';
    /**
     * Name of the options field of an option group.
     * @group Props
     */
    optionGroupChildren = 'items';
    /**
     * Whether to show the header.
     * @group Props
     */
    showHeader = true;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    filterBy;
    /**
     * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    scrollHeight = '200px';
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    lazy = false;
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    virtualScroll;
    /**
     * Height of an item in the list for VirtualScrolling.
     * @group Props
     */
    virtualScrollItemSize;
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    virtualScrollOptions;
    /**
     * Whether to use overlay API feature. The properties of overlay API can be used like an object in it.
     * @group Props
     */
    overlayOptions;
    /**
     * Defines a string that labels the filter input.
     * @group Props
     */
    ariaFilterLabel;
    /**
     * Defines how the items are filtered.
     * @group Props
     */
    filterMatchMode = 'contains';
    /**
     * Advisory information to display in a tooltip on hover.
     * @group Props
     */
    tooltip = '';
    /**
     * Position of the tooltip.
     * @group Props
     */
    tooltipPosition = 'right';
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
     * Applies focus to the filter element when the overlay is shown.
     * @group Props
     */
    autofocusFilter = true;
    /**
     * Defines how the selected items are displayed.
     * @group Props
     */
    display = 'comma';
    /**
     * Defines the autocomplete is active.
     * @group Props
     */
    autocomplete = 'off';
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = false;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus;
    /**
     * @deprecated since v14.2.0, use overlayOptions property instead.
     * Whether to automatically manage layering.
     * @group Props
     */
    get autoZIndex() {
        return this._autoZIndex;
    }
    set autoZIndex(val) {
        this._autoZIndex = val;
        console.warn('The autoZIndex property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * @deprecated since v14.2.0, use overlayOptions property instead.
     * Base zIndex value to use in layering.
     * @group Props
     */
    get baseZIndex() {
        return this._baseZIndex;
    }
    set baseZIndex(val) {
        this._baseZIndex = val;
        console.warn('The baseZIndex property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Transition options of the show animation.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    get showTransitionOptions() {
        return this._showTransitionOptions;
    }
    set showTransitionOptions(val) {
        this._showTransitionOptions = val;
        console.warn('The showTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Transition options of the hide animation.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    get hideTransitionOptions() {
        return this._hideTransitionOptions;
    }
    set hideTransitionOptions(val) {
        this._hideTransitionOptions = val;
        console.warn('The hideTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Label to display when there are no selections.
     * @group Props
     * @deprecated Use placeholder instead.
     */
    set defaultLabel(val) {
        this._defaultLabel = val;
        console.warn('defaultLabel property is deprecated since 16.6.0, use placeholder instead');
    }
    get defaultLabel() {
        return this._defaultLabel;
    }
    /**
     * Label to display when there are no selections.
     * @group Props
     */
    set placeholder(val) {
        this._placeholder.set(val);
    }
    get placeholder() {
        return this._placeholder.asReadonly();
    }
    /**
     * An array of objects to display as the available options.
     * @group Props
     */
    get options() {
        const options = this._options();
        return options;
    }
    set options(val) {
        if (!ObjectUtils.deepEquals(this._options(), val)) {
            this._options.set(val);
        }
    }
    /**
     * When specified, filter displays with this value.
     * @group Props
     */
    get filterValue() {
        return this._filterValue();
    }
    set filterValue(val) {
        this._filterValue.set(val);
    }
    /**
     * Item size of item to be virtual scrolled.
     * @group Props
     * @deprecated use virtualScrollItemSize property instead.
     */
    get itemSize() {
        return this._itemSize;
    }
    set itemSize(val) {
        this._itemSize = val;
        console.warn('The itemSize property is deprecated, use virtualScrollItemSize property instead.');
    }
    /**
     * Whether all data is selected.
     * @group Props
     */
    get selectAll() {
        return this._selectAll;
    }
    set selectAll(value) {
        this._selectAll = value;
    }
    /**
     * Indicates whether to focus on options when hovering over them, defaults to optionLabel.
     * @group Props
     */
    focusOnHover = false;
    /**
     * Fields used when filtering the options, defaults to optionLabel.
     * @group Props
     */
    filterFields;
    /**
     * Determines if the option will be selected on focus.
     * @group Props
     */
    selectOnFocus = false;
    /**
     * Whether to focus on the first visible or selected element when the overlay panel is shown.
     * @group Props
     */
    autoOptionFocus = true;
    /**
     * Callback to invoke when value changes.
     * @param {MultiSelectChangeEvent} event - Custom change event.
     * @group Emits
     */
    onChange = new EventEmitter();
    /**
     * Callback to invoke when data is filtered.
     * @param {MultiSelectFilterEvent} event - Custom filter event.
     * @group Emits
     */
    onFilter = new EventEmitter();
    /**
     * Callback to invoke when multiselect receives focus.
     * @param {MultiSelectFocusEvent} event - Custom focus event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke when multiselect loses focus.
     * @param {MultiSelectBlurEvent} event - Custom blur event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    /**
     * Callback to invoke when component is clicked.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onClick = new EventEmitter();
    /**
     * Callback to invoke when input field is cleared.
     * @group Emits
     */
    onClear = new EventEmitter();
    /**
     * Callback to invoke when overlay panel becomes visible.
     * @group Emits
     */
    onPanelShow = new EventEmitter();
    /**
     * Callback to invoke when overlay panel becomes hidden.
     * @group Emits
     */
    onPanelHide = new EventEmitter();
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {MultiSelectLazyLoadEvent} event - Lazy load event.
     * @group Emits
     */
    onLazyLoad = new EventEmitter();
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {MultiSelectRemoveEvent} event - Remove event.
     * @group Emits
     */
    onRemove = new EventEmitter();
    /**
     * Callback to invoke when all data is selected.
     * @param {MultiSelectSelectAllChangeEvent} event - Custom select event.
     * @group Emits
     */
    onSelectAllChange = new EventEmitter();
    containerViewChild;
    overlayViewChild;
    filterInputChild;
    focusInputViewChild;
    itemsViewChild;
    scroller;
    lastHiddenFocusableElementOnOverlay;
    firstHiddenFocusableElementOnOverlay;
    headerCheckboxViewChild;
    footerFacet;
    headerFacet;
    templates;
    searchValue;
    searchTimeout;
    _selectAll = null;
    _autoZIndex;
    _baseZIndex;
    _showTransitionOptions;
    _hideTransitionOptions;
    _defaultLabel;
    _placeholder = signal(undefined);
    _itemSize;
    _selectionLimit;
    value;
    _filteredOptions;
    onModelChange = () => { };
    onModelTouched = () => { };
    valuesAsString;
    focus;
    filtered;
    itemTemplate;
    groupTemplate;
    loaderTemplate;
    headerTemplate;
    filterTemplate;
    footerTemplate;
    emptyFilterTemplate;
    emptyTemplate;
    selectedItemsTemplate;
    checkIconTemplate;
    filterIconTemplate;
    removeTokenIconTemplate;
    closeIconTemplate;
    clearIconTemplate;
    dropdownIconTemplate;
    headerCheckboxFocus;
    filterOptions;
    preventModelTouched;
    preventDocumentDefault;
    focused = false;
    itemsWrapper;
    _displaySelectedLabel = true;
    _maxSelectedLabels = 3;
    modelValue = signal(null);
    _filterValue = signal(null);
    _options = signal(null);
    startRangeIndex = signal(-1);
    focusedOptionIndex = signal(-1);
    selectedOptions;
    clickInProgress = false;
    get containerClass() {
        return {
            'p-multiselect p-component p-inputwrapper': true,
            'p-disabled': this.disabled,
            'p-multiselect-clearable': this.showClear && !this.disabled,
            'p-multiselect-chip': this.display === 'chip',
            'p-focus': this.focused
        };
    }
    get inputClass() {
        return {
            'p-multiselect-label p-inputtext': true,
            'p-placeholder': (this.placeholder() || this.defaultLabel) && (this.label() === this.placeholder() || this.label() === this.defaultLabel),
            'p-multiselect-label-empty': !this.selectedItemsTemplate && (this.label() === 'p-emptylabel' || this.label().length === 0)
        };
    }
    get panelClass() {
        return {
            'p-multiselect-panel p-component': true,
            'p-input-filled': this.config.inputStyle === 'filled',
            'p-ripple-disabled': this.config.ripple === false
        };
    }
    get labelClass() {
        return {
            'p-multiselect-label': true,
            'p-placeholder': this.label() === this.placeholder() || this.label() === this.defaultLabel,
            'p-multiselect-label-empty': !this.placeholder() && !this.defaultLabel && (!this.modelValue() || this.modelValue().length === 0)
        };
    }
    get emptyMessageLabel() {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }
    get emptyFilterMessageLabel() {
        return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
    }
    get filled() {
        if (typeof this.modelValue() === 'string')
            return !!this.modelValue();
        return ObjectUtils.isNotEmpty(this.modelValue());
    }
    get isVisibleClearIcon() {
        return this.modelValue() != null && this.modelValue() !== '' && ObjectUtils.isNotEmpty(this.modelValue()) && this.showClear && !this.disabled && this.filled;
    }
    get toggleAllAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria[this.allSelected() ? 'selectAll' : 'unselectAll'] : undefined;
    }
    get closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }
    get listLabel() {
        return this.config.getTranslation(TranslationKeys.ARIA)['listLabel'];
    }
    getAllVisibleAndNonVisibleOptions() {
        return this.group ? this.flatOptions(this.options) : this.options || [];
    }
    visibleOptions = computed(() => {
        const options = this.getAllVisibleAndNonVisibleOptions();
        const isArrayOfObjects = ObjectUtils.isArray(options) && ObjectUtils.isObject(options[0]);
        if (this._filterValue()) {
            let filteredOptions;
            if (isArrayOfObjects) {
                filteredOptions = this.filterService.filter(options, this.searchFields(), this._filterValue(), this.filterMatchMode, this.filterLocale);
            }
            else {
                filteredOptions = options.filter((option) => option.toString().toLocaleLowerCase().includes(this._filterValue().toLocaleLowerCase()));
            }
            if (this.group) {
                const optionGroups = this.options || [];
                const filtered = [];
                optionGroups.forEach((group) => {
                    const groupChildren = this.getOptionGroupChildren(group);
                    const filteredItems = groupChildren.filter((item) => filteredOptions.includes(item));
                    if (filteredItems.length > 0)
                        filtered.push({ ...group, [typeof this.optionGroupChildren === 'string' ? this.optionGroupChildren : 'items']: [...filteredItems] });
                });
                return this.flatOptions(filtered);
            }
            return filteredOptions;
        }
        return options;
    });
    label = computed(() => {
        let label;
        const modelValue = this.modelValue();
        if (modelValue && modelValue.length && this.displaySelectedLabel) {
            if (ObjectUtils.isNotEmpty(this.maxSelectedLabels) && modelValue.length > this.maxSelectedLabels) {
                return this.getSelectedItemsLabel();
            }
            else {
                label = '';
                for (let i = 0; i < modelValue.length; i++) {
                    if (i !== 0) {
                        label += ', ';
                    }
                    label += this.getLabelByValue(modelValue[i]);
                }
            }
        }
        else {
            label = this.placeholder() || this.defaultLabel || '';
        }
        return label;
    });
    chipSelectedItems = computed(() => {
        return ObjectUtils.isNotEmpty(this.maxSelectedLabels) && this.modelValue() && this.modelValue().length > this.maxSelectedLabels ? this.modelValue().slice(0, this.maxSelectedLabels) : this.modelValue();
    });
    constructor(el, renderer, cd, zone, filterService, config, overlayService) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.filterService = filterService;
        this.config = config;
        this.overlayService = overlayService;
        effect(() => {
            const modelValue = this.modelValue();
            const visibleOptions = this.visibleOptions();
            if (visibleOptions && ObjectUtils.isNotEmpty(visibleOptions)) {
                if (this.optionValue && this.optionLabel && modelValue) {
                    this.selectedOptions = visibleOptions.filter((option) => modelValue.includes(option[this.optionLabel]) || modelValue.includes(option[this.optionValue]));
                }
                else {
                    this.selectedOptions = modelValue;
                }
                this.cd.markForCheck();
            }
        });
    }
    ngOnInit() {
        this.id = this.id || UniqueComponentId();
        this.autoUpdateModel();
        if (this.filterBy) {
            this.filterOptions = {
                filter: (value) => this.onFilterInputChange(value),
                reset: () => this.resetFilter()
            };
        }
    }
    maxSelectionLimitReached() {
        return this.selectionLimit && this.modelValue() && this.modelValue().length === this.selectionLimit;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'group':
                    this.groupTemplate = item.template;
                    break;
                case 'selectedItems':
                    this.selectedItemsTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'filter':
                    this.filterTemplate = item.template;
                    break;
                case 'emptyfilter':
                    this.emptyFilterTemplate = item.template;
                    break;
                case 'empty':
                    this.emptyTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'loader':
                    this.loaderTemplate = item.template;
                    break;
                case 'checkicon':
                    this.checkIconTemplate = item.template;
                    break;
                case 'filtericon':
                    this.filterIconTemplate = item.template;
                    break;
                case 'removetokenicon':
                    this.removeTokenIconTemplate = item.template;
                    break;
                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;
                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;
                case 'dropdownicon':
                    this.dropdownIconTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (this.overlayVisible) {
            this.show();
        }
    }
    ngAfterViewChecked() {
        if (this.filtered) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.overlayViewChild?.alignOverlay();
                }, 1);
            });
            this.filtered = false;
        }
    }
    flatOptions(options) {
        return (options || []).reduce((result, option, index) => {
            result.push({ optionGroup: option, group: true, index });
            const optionGroupChildren = this.getOptionGroupChildren(option);
            optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));
            return result;
        }, []);
    }
    autoUpdateModel() {
        if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption()) {
            this.focusedOptionIndex.set(this.findFirstFocusedOptionIndex());
            const value = this.getOptionValue(this.visibleOptions()[this.focusedOptionIndex()]);
            this.onOptionSelect({ originalEvent: null, option: [value] });
        }
    }
    /**
     * Updates the model value.
     * @group Method
     */
    updateModel(value, event) {
        this.value = value;
        this.onModelChange(value);
        this.modelValue.set(value);
    }
    onInputClick(event) {
        event.stopPropagation();
        event.preventDefault();
        this.focusedOptionIndex.set(-1);
    }
    onOptionSelect(event, isFocus = false, index = -1) {
        const { originalEvent, option } = event;
        if (this.disabled || this.isOptionDisabled(option)) {
            return;
        }
        let selected = this.isSelected(option);
        let value = null;
        if (selected) {
            value = this.modelValue().filter((val) => !ObjectUtils.equals(val, this.getOptionValue(option), this.equalityKey()));
        }
        else {
            value = [...(this.modelValue() || []), this.getOptionValue(option)];
        }
        this.updateModel(value, originalEvent);
        index !== -1 && this.focusedOptionIndex.set(index);
        isFocus && DomHandler.focus(this.focusInputViewChild?.nativeElement);
        this.onChange.emit({
            originalEvent: event,
            value: value,
            itemValue: option
        });
    }
    findSelectedOptionIndex() {
        return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
    }
    onOptionSelectRange(event, start = -1, end = -1) {
        start === -1 && (start = this.findNearestSelectedOptionIndex(end, true));
        end === -1 && (end = this.findNearestSelectedOptionIndex(start));
        if (start !== -1 && end !== -1) {
            const rangeStart = Math.min(start, end);
            const rangeEnd = Math.max(start, end);
            const value = this.visibleOptions()
                .slice(rangeStart, rangeEnd + 1)
                .filter((option) => this.isValidOption(option))
                .map((option) => this.getOptionValue(option));
            this.updateModel(value, event);
        }
    }
    searchFields() {
        return (this.filterBy || this.optionLabel || 'label').split(',');
    }
    findNearestSelectedOptionIndex(index, firstCheckUp = false) {
        let matchedOptionIndex = -1;
        if (this.hasSelectedOption()) {
            if (firstCheckUp) {
                matchedOptionIndex = this.findPrevSelectedOptionIndex(index);
                matchedOptionIndex = matchedOptionIndex === -1 ? this.findNextSelectedOptionIndex(index) : matchedOptionIndex;
            }
            else {
                matchedOptionIndex = this.findNextSelectedOptionIndex(index);
                matchedOptionIndex = matchedOptionIndex === -1 ? this.findPrevSelectedOptionIndex(index) : matchedOptionIndex;
            }
        }
        return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    }
    findPrevSelectedOptionIndex(index) {
        const matchedOptionIndex = this.hasSelectedOption() && index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions().slice(0, index), (option) => this.isValidSelectedOption(option)) : -1;
        return matchedOptionIndex > -1 ? matchedOptionIndex : -1;
    }
    findFirstFocusedOptionIndex() {
        const selectedIndex = this.findFirstSelectedOptionIndex();
        return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    }
    findFirstOptionIndex() {
        return this.visibleOptions().findIndex((option) => this.isValidOption(option));
    }
    findFirstSelectedOptionIndex() {
        return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
    }
    findNextSelectedOptionIndex(index) {
        const matchedOptionIndex = this.hasSelectedOption() && index < this.visibleOptions().length - 1
            ? this.visibleOptions()
                .slice(index + 1)
                .findIndex((option) => this.isValidSelectedOption(option))
            : -1;
        return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
    }
    equalityKey() {
        return this.optionValue ? null : this.dataKey;
    }
    hasSelectedOption() {
        return ObjectUtils.isNotEmpty(this.modelValue());
    }
    isValidSelectedOption(option) {
        return this.isValidOption(option) && this.isSelected(option);
    }
    isOptionGroup(option) {
        return (this.group || this.optionGroupLabel) && option.optionGroup && option.group;
    }
    isValidOption(option) {
        return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    }
    isOptionDisabled(option) {
        if (this.maxSelectionLimitReached() && !this.isSelected(option)) {
            return true;
        }
        return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : option && option.disabled !== undefined ? option.disabled : false;
    }
    isSelected(option) {
        const optionValue = this.getOptionValue(option);
        return (this.modelValue() || []).some((value) => ObjectUtils.equals(value, optionValue, this.equalityKey()));
    }
    isOptionMatched(option) {
        return this.isValidOption(option) && this.getOptionLabel(option).toString().toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
    }
    isEmpty() {
        return !this._options() || (this.visibleOptions() && this.visibleOptions().length === 0);
    }
    getOptionIndex(index, scrollerOptions) {
        return this.virtualScrollerDisabled ? index : scrollerOptions && scrollerOptions.getItemOptions(index)['index'];
    }
    getAriaPosInset(index) {
        return ((this.optionGroupLabel
            ? index -
                this.visibleOptions()
                    .slice(0, index)
                    .filter((option) => this.isOptionGroup(option)).length
            : index) + 1);
    }
    get ariaSetSize() {
        return this.visibleOptions().filter((option) => !this.isOptionGroup(option)).length;
    }
    getLabelByValue(value) {
        const options = this.group ? this.flatOptions(this._options()) : this._options() || [];
        const matchedOption = options.find((option) => !this.isOptionGroup(option) && ObjectUtils.equals(this.getOptionValue(option), value, this.equalityKey()));
        return matchedOption ? this.getOptionLabel(matchedOption) : null;
    }
    getSelectedItemsLabel() {
        let pattern = /{(.*?)}/;
        let message = this.selectedItemsLabel ? this.selectedItemsLabel : this.config.getTranslation(TranslationKeys.SELECTION_MESSAGE);
        if (pattern.test(message)) {
            return message.replace(message.match(pattern)[0], this.modelValue().length + '');
        }
        return message;
    }
    getOptionLabel(option) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option && option.label != undefined ? option.label : option;
    }
    getOptionValue(option) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : !this.optionLabel && option && option.value !== undefined ? option.value : option;
    }
    getOptionGroupLabel(optionGroup) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : optionGroup && optionGroup.label != undefined ? optionGroup.label : optionGroup;
    }
    getOptionGroupChildren(optionGroup) {
        return this.optionGroupChildren ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
    }
    onKeyDown(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        const metaKey = event.metaKey || event.ctrlKey;
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
            case 'PageDown':
                this.onPageDownKey(event);
                break;
            case 'PageUp':
                this.onPageUpKey(event);
                break;
            case 'Enter':
            case 'Space':
                this.onEnterKey(event);
                break;
            case 'Escape':
                this.onEscapeKey(event);
                break;
            case 'Tab':
                this.onTabKey(event);
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                this.onShiftKey();
                break;
            default:
                if (event.code === 'KeyA' && metaKey) {
                    const value = this.visibleOptions()
                        .filter((option) => this.isValidOption(option))
                        .map((option) => this.getOptionValue(option));
                    this.updateModel(value, event);
                    event.preventDefault();
                    break;
                }
                if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                    !this.overlayVisible && this.show();
                    this.searchOptions(event, event.key);
                    event.preventDefault();
                }
                break;
        }
    }
    onFilterKeyDown(event) {
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onArrowUpKey(event, true);
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                this.onArrowLeftKey(event, true);
                break;
            case 'Home':
                this.onHomeKey(event, true);
                break;
            case 'End':
                this.onEndKey(event, true);
                break;
            case 'Enter':
            case 'NumpadEnter':
                this.onEnterKey(event);
                break;
            case 'Escape':
                this.onEscapeKey(event);
                break;
            case 'Tab':
                this.onTabKey(event, true);
                break;
            default:
                break;
        }
    }
    onArrowLeftKey(event, pressedInInputText = false) {
        pressedInInputText && this.focusedOptionIndex.set(-1);
    }
    onArrowDownKey(event) {
        const optionIndex = this.focusedOptionIndex() !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex()) : this.findFirstFocusedOptionIndex();
        if (event.shiftKey) {
            this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
        }
        this.changeFocusedOptionIndex(event, optionIndex);
        !this.overlayVisible && this.show();
        event.preventDefault();
        event.stopPropagation();
    }
    onArrowUpKey(event, pressedInInputText = false) {
        if (event.altKey && !pressedInInputText) {
            if (this.focusedOptionIndex() !== -1) {
                this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()]);
            }
            this.overlayVisible && this.hide();
            event.preventDefault();
        }
        else {
            const optionIndex = this.focusedOptionIndex() !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex()) : this.findLastFocusedOptionIndex();
            if (event.shiftKey) {
                this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
            }
            this.changeFocusedOptionIndex(event, optionIndex);
            !this.overlayVisible && this.show();
            event.preventDefault();
        }
        event.stopPropagation();
    }
    onHomeKey(event, pressedInInputText = false) {
        const { currentTarget } = event;
        if (pressedInInputText) {
            const len = currentTarget.value.length;
            currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
            this.focusedOptionIndex.set(-1);
        }
        else {
            let metaKey = event.metaKey || event.ctrlKey;
            let optionIndex = this.findFirstOptionIndex();
            if (event.shiftKey && metaKey) {
                this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
            }
            this.changeFocusedOptionIndex(event, optionIndex);
            !this.overlayVisible && this.show();
        }
        event.preventDefault();
    }
    onEndKey(event, pressedInInputText = false) {
        const { currentTarget } = event;
        if (pressedInInputText) {
            const len = currentTarget.value.length;
            currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
            this.focusedOptionIndex.set(-1);
        }
        else {
            let metaKey = event.metaKey || event.ctrlKey;
            let optionIndex = this.findLastFocusedOptionIndex();
            if (event.shiftKey && metaKey) {
                this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
            }
            this.changeFocusedOptionIndex(event, optionIndex);
            !this.overlayVisible && this.show();
        }
        event.preventDefault();
    }
    onPageDownKey(event) {
        this.scrollInView(this.visibleOptions().length - 1);
        event.preventDefault();
    }
    onPageUpKey(event) {
        this.scrollInView(0);
        event.preventDefault();
    }
    onEnterKey(event) {
        if (!this.overlayVisible) {
            this.onArrowDownKey(event);
        }
        else {
            if (this.focusedOptionIndex() !== -1) {
                if (event.shiftKey) {
                    this.onOptionSelectRange(event, this.focusedOptionIndex());
                }
                else {
                    this.onOptionSelect({ originalEvent: event, option: this.visibleOptions()[this.focusedOptionIndex()] });
                }
            }
        }
        event.preventDefault();
    }
    onEscapeKey(event) {
        this.overlayVisible && this.hide(true);
        event.preventDefault();
    }
    onDeleteKey(event) {
        if (this.showClear) {
            this.clear(event);
            event.preventDefault();
        }
    }
    onTabKey(event, pressedInInputText = false) {
        if (!pressedInInputText) {
            if (this.overlayVisible && this.hasFocusableElements()) {
                DomHandler.focus(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay.nativeElement : this.firstHiddenFocusableElementOnOverlay.nativeElement);
                event.preventDefault();
            }
            else {
                if (this.focusedOptionIndex() !== -1) {
                    this.onOptionSelect({ originalEvent: event, option: this.visibleOptions()[this.focusedOptionIndex()] });
                }
                this.overlayVisible && this.hide(this.filter);
            }
        }
    }
    onShiftKey() {
        this.startRangeIndex.set(this.focusedOptionIndex());
    }
    onContainerClick(event) {
        if (this.disabled || this.readonly || event.target.isSameNode(this.focusInputViewChild?.nativeElement)) {
            return;
        }
        if (event.target.tagName === 'INPUT' || event.target.getAttribute('data-pc-section') === 'clearicon' || event.target.closest('[data-pc-section="clearicon"]')) {
            event.preventDefault();
            return;
        }
        else if (!this.overlayViewChild || !this.overlayViewChild.el.nativeElement.contains(event.target)) {
            if (this.clickInProgress) {
                return;
            }
            this.clickInProgress = true;
            setTimeout(() => {
                this.clickInProgress = false;
            }, 150);
            this.overlayVisible ? this.hide(true) : this.show(true);
        }
        this.focusInputViewChild?.nativeElement.focus({ preventScroll: true });
        this.onClick.emit(event);
        this.cd.detectChanges();
    }
    onFirstHiddenFocus(event) {
        const focusableEl = event.relatedTarget === this.focusInputViewChild?.nativeElement
            ? DomHandler.getFirstFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])')
            : this.focusInputViewChild?.nativeElement;
        DomHandler.focus(focusableEl);
    }
    onInputFocus(event) {
        this.focused = true;
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.focusedOptionIndex.set(focusedOptionIndex);
        this.overlayVisible && this.scrollInView(this.focusedOptionIndex());
        this.onFocus.emit({ originalEvent: event });
    }
    onInputBlur(event) {
        this.focused = false;
        this.onBlur.emit({ originalEvent: event });
        if (!this.preventModelTouched) {
            this.onModelTouched();
        }
        this.preventModelTouched = false;
    }
    onFilterInputChange(event) {
        let value = event.target.value;
        this._filterValue.set(value);
        this.focusedOptionIndex.set(-1);
        this.onFilter.emit({ originalEvent: event, filter: this._filterValue() });
        !this.virtualScrollerDisabled && this.scroller.scrollToIndex(0);
        setTimeout(() => {
            this.overlayViewChild.alignOverlay();
        });
    }
    onLastHiddenFocus(event) {
        const focusableEl = event.relatedTarget === this.focusInputViewChild?.nativeElement
            ? DomHandler.getLastFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])')
            : this.focusInputViewChild?.nativeElement;
        DomHandler.focus(focusableEl);
    }
    onOptionMouseEnter(event, index) {
        if (this.focusOnHover) {
            this.changeFocusedOptionIndex(event, index);
        }
    }
    onHeaderCheckboxKeyDown(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        switch (event.code) {
            case 'Space':
                this.onToggleAll(event);
                break;
            case 'Enter':
                this.onToggleAll(event);
                break;
            default:
                break;
        }
    }
    onFilterBlur(event) {
        this.focusedOptionIndex.set(-1);
    }
    onHeaderCheckboxFocus() {
        this.headerCheckboxFocus = true;
    }
    onHeaderCheckboxBlur() {
        this.headerCheckboxFocus = false;
    }
    onToggleAll(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        if (this.selectAll != null) {
            this.onSelectAllChange.emit({
                originalEvent: event,
                checked: !this.allSelected()
            });
        }
        else {
            // pre-selected disabled options should always be selected.
            const selectedDisabledOptions = this.getAllVisibleAndNonVisibleOptions().filter((option) => this.isSelected(option) && (this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : option && option.disabled !== undefined ? option.disabled : false));
            const visibleOptions = this.allSelected()
                ? this.visibleOptions().filter((option) => !this.isValidOption(option) && this.isSelected(option))
                : this.visibleOptions().filter((option) => this.isSelected(option) || this.isValidOption(option));
            const optionValues = [...selectedDisabledOptions, ...visibleOptions].map((option) => this.getOptionValue(option));
            const value = [...new Set(optionValues)];
            this.updateModel(value, event);
            // because onToggleAll could have been called during filtering, this additional test needs to be performed before calling onSelectAllChange.emit
            if (!value.length || value.length === this.getAllVisibleAndNonVisibleOptions().length) {
                this.onSelectAllChange.emit({
                    originalEvent: event,
                    checked: !!value.length
                });
            }
        }
        this.onChange.emit({ originalEvent: event, value: this.value });
        DomHandler.focus(this.headerCheckboxViewChild?.nativeElement);
        this.headerCheckboxFocus = true;
        event.preventDefault();
        event.stopPropagation();
    }
    changeFocusedOptionIndex(event, index) {
        if (this.focusedOptionIndex() !== index) {
            this.focusedOptionIndex.set(index);
            this.scrollInView();
        }
    }
    get virtualScrollerDisabled() {
        return !this.virtualScroll;
    }
    scrollInView(index = -1) {
        const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
        if (this.itemsViewChild && this.itemsViewChild.nativeElement) {
            const element = DomHandler.findSingle(this.itemsViewChild.nativeElement, `li[id="${id}"]`);
            if (element) {
                element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            }
            else if (!this.virtualScrollerDisabled) {
                setTimeout(() => {
                    this.virtualScroll && this.scroller?.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex());
                }, 0);
            }
        }
    }
    get focusedOptionId() {
        return this.focusedOptionIndex() !== -1 ? `${this.id}_${this.focusedOptionIndex()}` : null;
    }
    writeValue(value) {
        this.value = value;
        this.modelValue.set(this.value);
        this.cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
        this.cd.markForCheck();
    }
    allSelected() {
        return this.selectAll !== null ? this.selectAll : ObjectUtils.isNotEmpty(this.visibleOptions()) && this.visibleOptions().every((option) => this.isOptionGroup(option) || this.isOptionDisabled(option) || this.isSelected(option));
    }
    /**
     * Displays the panel.
     * @group Method
     */
    show(isFocus) {
        this.overlayVisible = true;
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.focusedOptionIndex.set(focusedOptionIndex);
        if (isFocus) {
            DomHandler.focus(this.focusInputViewChild?.nativeElement);
        }
        this.cd.markForCheck();
    }
    /**
     * Hides the panel.
     * @group Method
     */
    hide(isFocus) {
        this.overlayVisible = false;
        this.focusedOptionIndex.set(-1);
        if (this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }
        if (this.overlayOptions?.mode === 'modal') {
            DomHandler.unblockBodyScroll();
        }
        isFocus && DomHandler.focus(this.focusInputViewChild?.nativeElement);
        this.onPanelHide.emit();
        this.cd.markForCheck();
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.itemsWrapper = DomHandler.findSingle(this.overlayViewChild?.overlayViewChild?.nativeElement, this.virtualScroll ? '.p-scroller' : '.p-multiselect-items-wrapper');
                this.virtualScroll && this.scroller?.setContentEl(this.itemsViewChild?.nativeElement);
                if (this._options() && this._options().length) {
                    if (this.virtualScroll) {
                        const selectedIndex = ObjectUtils.isNotEmpty(this.modelValue()) ? this.focusedOptionIndex() : -1;
                        if (selectedIndex !== -1) {
                            this.scroller?.scrollToIndex(selectedIndex);
                        }
                    }
                    else {
                        let selectedListItem = DomHandler.findSingle(this.itemsWrapper, '[data-p-highlight="true"]');
                        if (selectedListItem) {
                            selectedListItem.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                        }
                    }
                }
                if (this.filterInputChild && this.filterInputChild.nativeElement) {
                    this.preventModelTouched = true;
                    if (this.autofocusFilter) {
                        this.filterInputChild.nativeElement.focus();
                    }
                }
                this.onPanelShow.emit();
            case 'void':
                this.itemsWrapper = null;
                this.onModelTouched();
                break;
        }
    }
    resetFilter() {
        if (this.filterInputChild && this.filterInputChild.nativeElement) {
            this.filterInputChild.nativeElement.value = '';
        }
        this._filterValue.set(null);
        this._filteredOptions = null;
    }
    close(event) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    }
    clear(event) {
        this.value = null;
        this.updateModel(null, event);
        this.selectedOptions = null;
        this.onClear.emit();
        event.stopPropagation();
    }
    removeOption(optionValue, event) {
        let value = this.modelValue().filter((val) => !ObjectUtils.equals(val, optionValue, this.equalityKey()));
        this.updateModel(value, event);
        this.onChange.emit({
            originalEvent: event,
            value: value,
            itemValue: optionValue
        });
        event && event.stopPropagation();
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return DomHandler.hasClass(nextItem.children[0], 'p-disabled') || DomHandler.isHidden(nextItem.children[0]) || DomHandler.hasClass(nextItem, 'p-multiselect-item-group') ? this.findNextItem(nextItem) : nextItem.children[0];
        else
            return null;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return DomHandler.hasClass(prevItem.children[0], 'p-disabled') || DomHandler.isHidden(prevItem.children[0]) || DomHandler.hasClass(prevItem, 'p-multiselect-item-group') ? this.findPrevItem(prevItem) : prevItem.children[0];
        else
            return null;
    }
    findNextOptionIndex(index) {
        const matchedOptionIndex = index < this.visibleOptions().length - 1
            ? this.visibleOptions()
                .slice(index + 1)
                .findIndex((option) => this.isValidOption(option))
            : -1;
        return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    }
    findPrevOptionIndex(index) {
        const matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions().slice(0, index), (option) => this.isValidOption(option)) : -1;
        return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    }
    findLastSelectedOptionIndex() {
        return this.hasSelectedOption() ? ObjectUtils.findLastIndex(this.visibleOptions(), (option) => this.isValidSelectedOption(option)) : -1;
    }
    findLastFocusedOptionIndex() {
        const selectedIndex = this.findLastSelectedOptionIndex();
        return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    }
    findLastOptionIndex() {
        return ObjectUtils.findLastIndex(this.visibleOptions(), (option) => this.isValidOption(option));
    }
    searchOptions(event, char) {
        this.searchValue = (this.searchValue || '') + char;
        let optionIndex = -1;
        let matched = false;
        if (this.focusedOptionIndex() !== -1) {
            optionIndex = this.visibleOptions()
                .slice(this.focusedOptionIndex())
                .findIndex((option) => this.isOptionMatched(option));
            optionIndex =
                optionIndex === -1
                    ? this.visibleOptions()
                        .slice(0, this.focusedOptionIndex())
                        .findIndex((option) => this.isOptionMatched(option))
                    : optionIndex + this.focusedOptionIndex();
        }
        else {
            optionIndex = this.visibleOptions().findIndex((option) => this.isOptionMatched(option));
        }
        if (optionIndex !== -1) {
            matched = true;
        }
        if (optionIndex === -1 && this.focusedOptionIndex() === -1) {
            optionIndex = this.findFirstFocusedOptionIndex();
        }
        if (optionIndex !== -1) {
            this.changeFocusedOptionIndex(event, optionIndex);
        }
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(() => {
            this.searchValue = '';
            this.searchTimeout = null;
        }, 500);
        return matched;
    }
    activateFilter() {
        if (this.hasFilter() && this._options) {
            if (this.group) {
                let filteredGroups = [];
                for (let optgroup of this.options) {
                    let filteredSubOptions = this.filterService.filter(this.getOptionGroupChildren(optgroup), this.searchFields(), this.filterValue, this.filterMatchMode, this.filterLocale);
                    if (filteredSubOptions && filteredSubOptions.length) {
                        filteredGroups.push({ ...optgroup, ...{ [this.optionGroupChildren]: filteredSubOptions } });
                    }
                }
                this._filteredOptions = filteredGroups;
            }
            else {
                this._filteredOptions = this.filterService.filter(this.options, this.searchFields(), this.filterValue, this.filterMatchMode, this.filterLocale);
            }
        }
        else {
            this._filteredOptions = null;
        }
    }
    hasFocusableElements() {
        return DomHandler.getFocusableElements(this.overlayViewChild.overlayViewChild.nativeElement, ':not([data-p-hidden-focusable="true"])').length > 0;
    }
    hasFilter() {
        return this._filterValue() && this._filterValue().trim().length > 0;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MultiSelect, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i3.FilterService }, { token: i3.PrimeNGConfig }, { token: i3.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: MultiSelect, selector: "p-multiSelect", inputs: { id: "id", ariaLabel: "ariaLabel", style: "style", styleClass: "styleClass", panelStyle: "panelStyle", panelStyleClass: "panelStyleClass", inputId: "inputId", disabled: ["disabled", "disabled", booleanAttribute], readonly: ["readonly", "readonly", booleanAttribute], group: ["group", "group", booleanAttribute], filter: ["filter", "filter", booleanAttribute], filterPlaceHolder: "filterPlaceHolder", filterLocale: "filterLocale", overlayVisible: ["overlayVisible", "overlayVisible", booleanAttribute], tabindex: ["tabindex", "tabindex", numberAttribute], appendTo: "appendTo", dataKey: "dataKey", name: "name", ariaLabelledBy: "ariaLabelledBy", displaySelectedLabel: "displaySelectedLabel", maxSelectedLabels: "maxSelectedLabels", selectionLimit: ["selectionLimit", "selectionLimit", numberAttribute], selectedItemsLabel: "selectedItemsLabel", showToggleAll: ["showToggleAll", "showToggleAll", booleanAttribute], emptyFilterMessage: "emptyFilterMessage", emptyMessage: "emptyMessage", resetFilterOnHide: ["resetFilterOnHide", "resetFilterOnHide", booleanAttribute], dropdownIcon: "dropdownIcon", optionLabel: "optionLabel", optionValue: "optionValue", optionDisabled: "optionDisabled", optionGroupLabel: "optionGroupLabel", optionGroupChildren: "optionGroupChildren", showHeader: ["showHeader", "showHeader", booleanAttribute], filterBy: "filterBy", scrollHeight: "scrollHeight", lazy: ["lazy", "lazy", booleanAttribute], virtualScroll: ["virtualScroll", "virtualScroll", booleanAttribute], virtualScrollItemSize: ["virtualScrollItemSize", "virtualScrollItemSize", numberAttribute], virtualScrollOptions: "virtualScrollOptions", overlayOptions: "overlayOptions", ariaFilterLabel: "ariaFilterLabel", filterMatchMode: "filterMatchMode", tooltip: "tooltip", tooltipPosition: "tooltipPosition", tooltipPositionStyle: "tooltipPositionStyle", tooltipStyleClass: "tooltipStyleClass", autofocusFilter: ["autofocusFilter", "autofocusFilter", booleanAttribute], display: "display", autocomplete: "autocomplete", showClear: ["showClear", "showClear", booleanAttribute], autofocus: ["autofocus", "autofocus", booleanAttribute], autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", defaultLabel: "defaultLabel", placeholder: "placeholder", options: "options", filterValue: "filterValue", itemSize: "itemSize", selectAll: "selectAll", focusOnHover: ["focusOnHover", "focusOnHover", booleanAttribute], filterFields: "filterFields", selectOnFocus: ["selectOnFocus", "selectOnFocus", booleanAttribute], autoOptionFocus: ["autoOptionFocus", "autoOptionFocus", booleanAttribute] }, outputs: { onChange: "onChange", onFilter: "onFilter", onFocus: "onFocus", onBlur: "onBlur", onClick: "onClick", onClear: "onClear", onPanelShow: "onPanelShow", onPanelHide: "onPanelHide", onLazyLoad: "onLazyLoad", onRemove: "onRemove", onSelectAllChange: "onSelectAllChange" }, host: { properties: { "class.p-inputwrapper-focus": "focused || overlayVisible", "class.p-inputwrapper-filled": "filled" }, classAttribute: "p-element p-inputwrapper" }, providers: [MULTISELECT_VALUE_ACCESSOR], queries: [{ propertyName: "footerFacet", first: true, predicate: Footer, descendants: true }, { propertyName: "headerFacet", first: true, predicate: Header, descendants: true }, { propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "overlayViewChild", first: true, predicate: ["overlay"], descendants: true }, { propertyName: "filterInputChild", first: true, predicate: ["filterInput"], descendants: true }, { propertyName: "focusInputViewChild", first: true, predicate: ["focusInput"], descendants: true }, { propertyName: "itemsViewChild", first: true, predicate: ["items"], descendants: true }, { propertyName: "scroller", first: true, predicate: ["scroller"], descendants: true }, { propertyName: "lastHiddenFocusableElementOnOverlay", first: true, predicate: ["lastHiddenFocusableEl"], descendants: true }, { propertyName: "firstHiddenFocusableElementOnOverlay", first: true, predicate: ["firstHiddenFocusableEl"], descendants: true }, { propertyName: "headerCheckboxViewChild", first: true, predicate: ["headerCheckbox"], descendants: true }], ngImport: i0, template: `
        <div #container [attr.id]="id" [ngClass]="containerClass" [ngStyle]="style" [class]="styleClass" (click)="onContainerClick($event)">
            <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                <input
                    #focusInput
                    [pTooltip]="tooltip"
                    [tooltipPosition]="tooltipPosition"
                    [positionStyle]="tooltipPositionStyle"
                    [tooltipStyleClass]="tooltipStyleClass"
                    [attr.aria-disabled]="disabled"
                    [attr.id]="inputId"
                    role="combobox"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-haspopup]="'listbox'"
                    [attr.aria-expanded]="overlayVisible ?? false"
                    [attr.aria-controls]="overlayVisible ? id + '_list' : null"
                    [attr.tabindex]="!disabled ? tabindex : -1"
                    [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    (keydown)="onKeyDown($event)"
                    pAutoFocus
                    [autofocus]="autofocus"
                />
            </div>
            <div class="p-multiselect-label-container" [pTooltip]="tooltip" [tooltipPosition]="tooltipPosition" [positionStyle]="tooltipPositionStyle" [tooltipStyleClass]="tooltipStyleClass">
                <div [ngClass]="labelClass">
                    <ng-container *ngIf="!selectedItemsTemplate">
                        <ng-container *ngIf="display === 'comma'">{{ label() || 'empty' }}</ng-container>
                        <ng-container *ngIf="display === 'chip'">
                            <div #token *ngFor="let item of chipSelectedItems(); let i = index" class="p-multiselect-token">
                                <span class="p-multiselect-token-label">{{ getLabelByValue(item) }}</span>
                                <ng-container *ngIf="!disabled">
                                    <TimesCircleIcon *ngIf="!removeTokenIconTemplate" [styleClass]="'p-multiselect-token-icon'" (click)="removeOption(item, event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true" />
                                    <span *ngIf="removeTokenIconTemplate" class="p-multiselect-token-icon" (click)="removeOption(item, event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true">
                                        <ng-container *ngTemplateOutlet="removeTokenIconTemplate"></ng-container>
                                    </span>
                                </ng-container>
                            </div>
                            <ng-container *ngIf="!modelValue() || modelValue().length === 0">{{ placeholder() || defaultLabel || 'empty' }}</ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate; context: { $implicit: selectedOptions, removeChip: removeOption.bind(this) }"></ng-container>
                </div>
                <ng-container *ngIf="isVisibleClearIcon">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-multiselect-clear-icon'" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true" />
                    <span *ngIf="clearIconTemplate" class="p-multiselect-clear-icon" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <div class="p-multiselect-trigger">
                <ng-container *ngIf="!dropdownIconTemplate">
                    <span *ngIf="dropdownIcon" class="p-multiselect-trigger-icon" [ngClass]="dropdownIcon" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true"></span>
                    <ChevronDownIcon *ngIf="!dropdownIcon" [styleClass]="'p-multiselect-trigger-icon'" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true" />
                </ng-container>
                <span *ngIf="dropdownIconTemplate" class="p-multiselect-trigger-icon" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true">
                    <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
                </span>
            </div>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [autoZIndex]="autoZIndex"
                [baseZIndex]="baseZIndex"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onHide)="hide()"
            >
                <ng-template pTemplate="content">
                    <div [attr.id]="id + '_list'" [ngClass]="'p-multiselect-panel p-component'" [ngStyle]="panelStyle" [class]="panelStyleClass">
                        <span
                            #firstHiddenFocusableEl
                            role="presentation"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onFirstHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        >
                        </span>
                        <div class="p-multiselect-header" *ngIf="showHeader">
                            <ng-content select="p-header"></ng-content>
                            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                            <ng-container *ngIf="filterTemplate; else builtInFilterElement">
                                <ng-container *ngTemplateOutlet="filterTemplate; context: { options: filterOptions }"></ng-container>
                            </ng-container>
                            <ng-template #builtInFilterElement>
                                <div
                                    class="p-checkbox p-component"
                                    *ngIf="showToggleAll && !selectionLimit"
                                    [ngClass]="{ 'p-checkbox-disabled': disabled || toggleAllDisabled }"
                                    (click)="onToggleAll($event)"
                                    (keydown)="onHeaderCheckboxKeyDown($event)"
                                >
                                    <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                                        <input
                                            #headerCheckbox
                                            type="checkbox"
                                            [readonly]="readonly"
                                            [attr.checked]="allSelected()"
                                            (focus)="onHeaderCheckboxFocus()"
                                            (blur)="onHeaderCheckboxBlur()"
                                            [disabled]="disabled || toggleAllDisabled"
                                            [attr.aria-label]="toggleAllAriaLabel"
                                        />
                                    </div>
                                    <div
                                        class="p-checkbox-box"
                                        role="checkbox"
                                        [attr.aria-label]="toggleAllAriaLabel"
                                        [attr.aria-checked]="allSelected()"
                                        [ngClass]="{ 'p-highlight': allSelected(), 'p-focus': headerCheckboxFocus, 'p-disabled': disabled || toggleAllDisabled }"
                                    >
                                        <ng-container *ngIf="allSelected()">
                                            <CheckIcon [styleClass]="'p-checkbox-icon'" *ngIf="!checkIconTemplate" [attr.aria-hidden]="true" />
                                            <span *ngIf="checkIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                                                <ng-template *ngTemplateOutlet="checkIconTemplate; context: { $implicit: allSelected() }"></ng-template>
                                            </span>
                                        </ng-container>
                                    </div>
                                </div>
                                <div class="p-multiselect-filter-container" *ngIf="filter">
                                    <input
                                        #filterInput
                                        type="text"
                                        role="searchbox"
                                        [attr.autocomplete]="autocomplete"
                                        [attr.placeholder]="filterPlaceHolder"
                                        role="searchbox"
                                        [attr.aria-owns]="id + '_list'"
                                        [attr.aria-activedescendant]="focusedOptionId"
                                        [value]="_filterValue() || ''"
                                        (input)="onFilterInputChange($event)"
                                        (keydown)="onFilterKeyDown($event)"
                                        (click)="onInputClick($event)"
                                        (blur)="onFilterBlur($event)"
                                        class="p-multiselect-filter p-inputtext p-component"
                                        [disabled]="disabled"
                                        [attr.placeholder]="filterPlaceHolder"
                                        [attr.aria-label]="ariaFilterLabel"
                                    />
                                    <SearchIcon [styleClass]="'p-multiselect-filter-icon'" *ngIf="!filterIconTemplate" />
                                    <span *ngIf="filterIconTemplate" class="p-multiselect-filter-icon">
                                        <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                                    </span>
                                </div>

                                <button class="p-multiselect-close p-link p-button-icon-only" type="button" (click)="close($event)" pRipple [attr.aria-label]="closeAriaLabel">
                                    <TimesIcon [styleClass]="'p-multiselect-close-icon'" *ngIf="!closeIconTemplate" />
                                    <span *ngIf="closeIconTemplate" class="p-multiselect-close-icon">
                                        <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                                    </span>
                                </button>
                            </ng-template>
                        </div>
                        <div class="p-multiselect-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : scrollHeight || 'auto'">
                            <p-scroller
                                *ngIf="virtualScroll"
                                #scroller
                                [items]="visibleOptions()"
                                [style]="{ height: scrollHeight }"
                                [itemSize]="virtualScrollItemSize || _itemSize"
                                [autoSize]="true"
                                [tabindex]="-1"
                                [lazy]="lazy"
                                (onLazyLoad)="onLazyLoad.emit($event)"
                                [options]="virtualScrollOptions"
                            >
                                <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                                    <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                                </ng-template>
                                <ng-container *ngIf="loaderTemplate">
                                    <ng-template pTemplate="loader" let-scrollerOptions="options">
                                        <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                                    </ng-template>
                                </ng-container>
                            </p-scroller>
                            <ng-container *ngIf="!virtualScroll">
                                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: visibleOptions(), options: {} }"></ng-container>
                            </ng-container>

                            <ng-template #buildInItems let-items let-scrollerOptions="options">
                                <ul #items class="p-multiselect-items p-component" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="listbox" aria-multiselectable="true" [attr.aria-label]="listLabel">
                                    <ng-template ngFor let-option [ngForOf]="items" let-i="index">
                                        <ng-container *ngIf="isOptionGroup(option)">
                                            <li [attr.id]="id + '_' + getOptionIndex(i, scrollerOptions)" class="p-multiselect-item-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                                <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                                <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: option.optionGroup }"></ng-container>
                                            </li>
                                        </ng-container>
                                        <ng-container *ngIf="!isOptionGroup(option)">
                                            <p-multiSelectItem
                                                [id]="id + '_' + getOptionIndex(i, scrollerOptions)"
                                                [option]="option"
                                                [selected]="isSelected(option)"
                                                [label]="getOptionLabel(option)"
                                                [disabled]="isOptionDisabled(option)"
                                                [template]="itemTemplate"
                                                [checkIconTemplate]="checkIconTemplate"
                                                [itemSize]="scrollerOptions.itemSize"
                                                [focused]="focusedOptionIndex() === getOptionIndex(i, scrollerOptions)"
                                                [ariaPosInset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                                [ariaSetSize]="ariaSetSize"
                                                (onClick)="onOptionSelect($event, false, getOptionIndex(i, scrollerOptions))"
                                                (onMouseEnter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                            ></p-multiSelectItem>
                                        </ng-container>
                                    </ng-template>

                                    <li *ngIf="hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                            {{ emptyFilterMessageLabel }}
                                        </ng-container>
                                        <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                                    </li>
                                    <li *ngIf="!hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <ng-container *ngIf="!emptyTemplate; else empty">
                                            {{ emptyMessageLabel }}
                                        </ng-container>
                                        <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </li>
                                </ul>
                            </ng-template>
                        </div>
                        <div class="p-multiselect-footer" *ngIf="footerFacet || footerTemplate">
                            <ng-content select="p-footer"></ng-content>
                            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                        </div>

                        <span
                            #lastHiddenFocusableEl
                            role="presentation"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onLastHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        ></span>
                    </div>
                </ng-template>
            </p-overlay>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-multiselect{display:inline-flex;cursor:pointer;position:relative;user-select:none}.p-multiselect-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-multiselect-label-container{overflow:hidden;flex:1 1 auto;cursor:pointer;display:flex}.p-multiselect-label{display:block;white-space:nowrap;cursor:pointer;overflow:hidden;text-overflow:ellipsis}.p-multiselect-label-empty{overflow:hidden;visibility:hidden}.p-multiselect-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-multiselect-token-icon{cursor:pointer}.p-multiselect-token-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100px}.p-multiselect-items-wrapper{overflow:auto}.p-multiselect-items{margin:0;padding:0;list-style-type:none}.p-multiselect-item{cursor:pointer;display:flex;align-items:center;font-weight:400;white-space:nowrap;position:relative;overflow:hidden}.p-multiselect-header{display:flex;align-items:center;justify-content:space-between}.p-multiselect-filter-container{position:relative;flex:1 1 auto}.p-multiselect-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-multiselect-filter-container .p-inputtext{width:100%}.p-multiselect-close{display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;position:relative}.p-fluid .p-multiselect{display:flex}.p-multiselect-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-multiselect-clearable{position:relative}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => i4.Overlay), selector: "p-overlay", inputs: ["visible", "mode", "style", "styleClass", "contentStyle", "contentStyleClass", "target", "appendTo", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "listener", "responsive", "options"], outputs: ["visibleChange", "onBeforeShow", "onShow", "onBeforeHide", "onHide", "onAnimationStart", "onAnimationDone"] }, { kind: "directive", type: i0.forwardRef(() => i3.PrimeTemplate), selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i5.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "directive", type: i0.forwardRef(() => i2.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => i6.Scroller), selector: "p-scroller", inputs: ["id", "style", "styleClass", "tabindex", "items", "itemSize", "scrollHeight", "scrollWidth", "orientation", "step", "delay", "resizeDelay", "appendOnly", "inline", "lazy", "disabled", "loaderDisabled", "columns", "showSpacer", "showLoader", "numToleratedItems", "loading", "autoSize", "trackBy", "options"], outputs: ["onLazyLoad", "onScroll", "onScrollIndexChange"] }, { kind: "directive", type: i0.forwardRef(() => i7.AutoFocus), selector: "[pAutoFocus]", inputs: ["autofocus"] }, { kind: "component", type: i0.forwardRef(() => CheckIcon), selector: "CheckIcon" }, { kind: "component", type: i0.forwardRef(() => SearchIcon), selector: "SearchIcon" }, { kind: "component", type: i0.forwardRef(() => TimesCircleIcon), selector: "TimesCircleIcon" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }, { kind: "component", type: i0.forwardRef(() => MultiSelectItem), selector: "p-multiSelectItem", inputs: ["id", "option", "selected", "label", "disabled", "itemSize", "focused", "ariaPosInset", "ariaSetSize", "template", "checkIconTemplate"], outputs: ["onClick", "onMouseEnter"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MultiSelect, decorators: [{
            type: Component,
            args: [{ selector: 'p-multiSelect', template: `
        <div #container [attr.id]="id" [ngClass]="containerClass" [ngStyle]="style" [class]="styleClass" (click)="onContainerClick($event)">
            <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                <input
                    #focusInput
                    [pTooltip]="tooltip"
                    [tooltipPosition]="tooltipPosition"
                    [positionStyle]="tooltipPositionStyle"
                    [tooltipStyleClass]="tooltipStyleClass"
                    [attr.aria-disabled]="disabled"
                    [attr.id]="inputId"
                    role="combobox"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-haspopup]="'listbox'"
                    [attr.aria-expanded]="overlayVisible ?? false"
                    [attr.aria-controls]="overlayVisible ? id + '_list' : null"
                    [attr.tabindex]="!disabled ? tabindex : -1"
                    [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    (keydown)="onKeyDown($event)"
                    pAutoFocus
                    [autofocus]="autofocus"
                />
            </div>
            <div class="p-multiselect-label-container" [pTooltip]="tooltip" [tooltipPosition]="tooltipPosition" [positionStyle]="tooltipPositionStyle" [tooltipStyleClass]="tooltipStyleClass">
                <div [ngClass]="labelClass">
                    <ng-container *ngIf="!selectedItemsTemplate">
                        <ng-container *ngIf="display === 'comma'">{{ label() || 'empty' }}</ng-container>
                        <ng-container *ngIf="display === 'chip'">
                            <div #token *ngFor="let item of chipSelectedItems(); let i = index" class="p-multiselect-token">
                                <span class="p-multiselect-token-label">{{ getLabelByValue(item) }}</span>
                                <ng-container *ngIf="!disabled">
                                    <TimesCircleIcon *ngIf="!removeTokenIconTemplate" [styleClass]="'p-multiselect-token-icon'" (click)="removeOption(item, event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true" />
                                    <span *ngIf="removeTokenIconTemplate" class="p-multiselect-token-icon" (click)="removeOption(item, event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true">
                                        <ng-container *ngTemplateOutlet="removeTokenIconTemplate"></ng-container>
                                    </span>
                                </ng-container>
                            </div>
                            <ng-container *ngIf="!modelValue() || modelValue().length === 0">{{ placeholder() || defaultLabel || 'empty' }}</ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate; context: { $implicit: selectedOptions, removeChip: removeOption.bind(this) }"></ng-container>
                </div>
                <ng-container *ngIf="isVisibleClearIcon">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-multiselect-clear-icon'" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true" />
                    <span *ngIf="clearIconTemplate" class="p-multiselect-clear-icon" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <div class="p-multiselect-trigger">
                <ng-container *ngIf="!dropdownIconTemplate">
                    <span *ngIf="dropdownIcon" class="p-multiselect-trigger-icon" [ngClass]="dropdownIcon" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true"></span>
                    <ChevronDownIcon *ngIf="!dropdownIcon" [styleClass]="'p-multiselect-trigger-icon'" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true" />
                </ng-container>
                <span *ngIf="dropdownIconTemplate" class="p-multiselect-trigger-icon" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true">
                    <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
                </span>
            </div>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [autoZIndex]="autoZIndex"
                [baseZIndex]="baseZIndex"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onHide)="hide()"
            >
                <ng-template pTemplate="content">
                    <div [attr.id]="id + '_list'" [ngClass]="'p-multiselect-panel p-component'" [ngStyle]="panelStyle" [class]="panelStyleClass">
                        <span
                            #firstHiddenFocusableEl
                            role="presentation"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onFirstHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        >
                        </span>
                        <div class="p-multiselect-header" *ngIf="showHeader">
                            <ng-content select="p-header"></ng-content>
                            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                            <ng-container *ngIf="filterTemplate; else builtInFilterElement">
                                <ng-container *ngTemplateOutlet="filterTemplate; context: { options: filterOptions }"></ng-container>
                            </ng-container>
                            <ng-template #builtInFilterElement>
                                <div
                                    class="p-checkbox p-component"
                                    *ngIf="showToggleAll && !selectionLimit"
                                    [ngClass]="{ 'p-checkbox-disabled': disabled || toggleAllDisabled }"
                                    (click)="onToggleAll($event)"
                                    (keydown)="onHeaderCheckboxKeyDown($event)"
                                >
                                    <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                                        <input
                                            #headerCheckbox
                                            type="checkbox"
                                            [readonly]="readonly"
                                            [attr.checked]="allSelected()"
                                            (focus)="onHeaderCheckboxFocus()"
                                            (blur)="onHeaderCheckboxBlur()"
                                            [disabled]="disabled || toggleAllDisabled"
                                            [attr.aria-label]="toggleAllAriaLabel"
                                        />
                                    </div>
                                    <div
                                        class="p-checkbox-box"
                                        role="checkbox"
                                        [attr.aria-label]="toggleAllAriaLabel"
                                        [attr.aria-checked]="allSelected()"
                                        [ngClass]="{ 'p-highlight': allSelected(), 'p-focus': headerCheckboxFocus, 'p-disabled': disabled || toggleAllDisabled }"
                                    >
                                        <ng-container *ngIf="allSelected()">
                                            <CheckIcon [styleClass]="'p-checkbox-icon'" *ngIf="!checkIconTemplate" [attr.aria-hidden]="true" />
                                            <span *ngIf="checkIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                                                <ng-template *ngTemplateOutlet="checkIconTemplate; context: { $implicit: allSelected() }"></ng-template>
                                            </span>
                                        </ng-container>
                                    </div>
                                </div>
                                <div class="p-multiselect-filter-container" *ngIf="filter">
                                    <input
                                        #filterInput
                                        type="text"
                                        role="searchbox"
                                        [attr.autocomplete]="autocomplete"
                                        [attr.placeholder]="filterPlaceHolder"
                                        role="searchbox"
                                        [attr.aria-owns]="id + '_list'"
                                        [attr.aria-activedescendant]="focusedOptionId"
                                        [value]="_filterValue() || ''"
                                        (input)="onFilterInputChange($event)"
                                        (keydown)="onFilterKeyDown($event)"
                                        (click)="onInputClick($event)"
                                        (blur)="onFilterBlur($event)"
                                        class="p-multiselect-filter p-inputtext p-component"
                                        [disabled]="disabled"
                                        [attr.placeholder]="filterPlaceHolder"
                                        [attr.aria-label]="ariaFilterLabel"
                                    />
                                    <SearchIcon [styleClass]="'p-multiselect-filter-icon'" *ngIf="!filterIconTemplate" />
                                    <span *ngIf="filterIconTemplate" class="p-multiselect-filter-icon">
                                        <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                                    </span>
                                </div>

                                <button class="p-multiselect-close p-link p-button-icon-only" type="button" (click)="close($event)" pRipple [attr.aria-label]="closeAriaLabel">
                                    <TimesIcon [styleClass]="'p-multiselect-close-icon'" *ngIf="!closeIconTemplate" />
                                    <span *ngIf="closeIconTemplate" class="p-multiselect-close-icon">
                                        <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                                    </span>
                                </button>
                            </ng-template>
                        </div>
                        <div class="p-multiselect-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : scrollHeight || 'auto'">
                            <p-scroller
                                *ngIf="virtualScroll"
                                #scroller
                                [items]="visibleOptions()"
                                [style]="{ height: scrollHeight }"
                                [itemSize]="virtualScrollItemSize || _itemSize"
                                [autoSize]="true"
                                [tabindex]="-1"
                                [lazy]="lazy"
                                (onLazyLoad)="onLazyLoad.emit($event)"
                                [options]="virtualScrollOptions"
                            >
                                <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                                    <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                                </ng-template>
                                <ng-container *ngIf="loaderTemplate">
                                    <ng-template pTemplate="loader" let-scrollerOptions="options">
                                        <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                                    </ng-template>
                                </ng-container>
                            </p-scroller>
                            <ng-container *ngIf="!virtualScroll">
                                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: visibleOptions(), options: {} }"></ng-container>
                            </ng-container>

                            <ng-template #buildInItems let-items let-scrollerOptions="options">
                                <ul #items class="p-multiselect-items p-component" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="listbox" aria-multiselectable="true" [attr.aria-label]="listLabel">
                                    <ng-template ngFor let-option [ngForOf]="items" let-i="index">
                                        <ng-container *ngIf="isOptionGroup(option)">
                                            <li [attr.id]="id + '_' + getOptionIndex(i, scrollerOptions)" class="p-multiselect-item-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                                <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                                <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: option.optionGroup }"></ng-container>
                                            </li>
                                        </ng-container>
                                        <ng-container *ngIf="!isOptionGroup(option)">
                                            <p-multiSelectItem
                                                [id]="id + '_' + getOptionIndex(i, scrollerOptions)"
                                                [option]="option"
                                                [selected]="isSelected(option)"
                                                [label]="getOptionLabel(option)"
                                                [disabled]="isOptionDisabled(option)"
                                                [template]="itemTemplate"
                                                [checkIconTemplate]="checkIconTemplate"
                                                [itemSize]="scrollerOptions.itemSize"
                                                [focused]="focusedOptionIndex() === getOptionIndex(i, scrollerOptions)"
                                                [ariaPosInset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                                [ariaSetSize]="ariaSetSize"
                                                (onClick)="onOptionSelect($event, false, getOptionIndex(i, scrollerOptions))"
                                                (onMouseEnter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                            ></p-multiSelectItem>
                                        </ng-container>
                                    </ng-template>

                                    <li *ngIf="hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                            {{ emptyFilterMessageLabel }}
                                        </ng-container>
                                        <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                                    </li>
                                    <li *ngIf="!hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <ng-container *ngIf="!emptyTemplate; else empty">
                                            {{ emptyMessageLabel }}
                                        </ng-container>
                                        <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </li>
                                </ul>
                            </ng-template>
                        </div>
                        <div class="p-multiselect-footer" *ngIf="footerFacet || footerTemplate">
                            <ng-content select="p-footer"></ng-content>
                            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                        </div>

                        <span
                            #lastHiddenFocusableEl
                            role="presentation"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onLastHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        ></span>
                    </div>
                </ng-template>
            </p-overlay>
        </div>
    `, host: {
                        class: 'p-element p-inputwrapper',
                        '[class.p-inputwrapper-focus]': 'focused || overlayVisible',
                        '[class.p-inputwrapper-filled]': 'filled'
                    }, providers: [MULTISELECT_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["@layer primeng{.p-multiselect{display:inline-flex;cursor:pointer;position:relative;user-select:none}.p-multiselect-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-multiselect-label-container{overflow:hidden;flex:1 1 auto;cursor:pointer;display:flex}.p-multiselect-label{display:block;white-space:nowrap;cursor:pointer;overflow:hidden;text-overflow:ellipsis}.p-multiselect-label-empty{overflow:hidden;visibility:hidden}.p-multiselect-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-multiselect-token-icon{cursor:pointer}.p-multiselect-token-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100px}.p-multiselect-items-wrapper{overflow:auto}.p-multiselect-items{margin:0;padding:0;list-style-type:none}.p-multiselect-item{cursor:pointer;display:flex;align-items:center;font-weight:400;white-space:nowrap;position:relative;overflow:hidden}.p-multiselect-header{display:flex;align-items:center;justify-content:space-between}.p-multiselect-filter-container{position:relative;flex:1 1 auto}.p-multiselect-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-multiselect-filter-container .p-inputtext{width:100%}.p-multiselect-close{display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;position:relative}.p-fluid .p-multiselect{display:flex}.p-multiselect-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-multiselect-clearable{position:relative}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i3.FilterService }, { type: i3.PrimeNGConfig }, { type: i3.OverlayService }], propDecorators: { id: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], panelStyle: [{
                type: Input
            }], panelStyleClass: [{
                type: Input
            }], inputId: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], readonly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], group: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], filter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], filterPlaceHolder: [{
                type: Input
            }], filterLocale: [{
                type: Input
            }], overlayVisible: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], appendTo: [{
                type: Input
            }], dataKey: [{
                type: Input
            }], name: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], displaySelectedLabel: [{
                type: Input
            }], maxSelectedLabels: [{
                type: Input
            }], selectionLimit: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], selectedItemsLabel: [{
                type: Input
            }], showToggleAll: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], emptyFilterMessage: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], resetFilterOnHide: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dropdownIcon: [{
                type: Input
            }], optionLabel: [{
                type: Input
            }], optionValue: [{
                type: Input
            }], optionDisabled: [{
                type: Input
            }], optionGroupLabel: [{
                type: Input
            }], optionGroupChildren: [{
                type: Input
            }], showHeader: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], filterBy: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], lazy: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], virtualScroll: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], virtualScrollItemSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], virtualScrollOptions: [{
                type: Input
            }], overlayOptions: [{
                type: Input
            }], ariaFilterLabel: [{
                type: Input
            }], filterMatchMode: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], tooltipPosition: [{
                type: Input
            }], tooltipPositionStyle: [{
                type: Input
            }], tooltipStyleClass: [{
                type: Input
            }], autofocusFilter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], display: [{
                type: Input
            }], autocomplete: [{
                type: Input
            }], showClear: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autofocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], defaultLabel: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], options: [{
                type: Input
            }], filterValue: [{
                type: Input
            }], itemSize: [{
                type: Input
            }], selectAll: [{
                type: Input
            }], focusOnHover: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], filterFields: [{
                type: Input
            }], selectOnFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autoOptionFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onChange: [{
                type: Output
            }], onFilter: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onClick: [{
                type: Output
            }], onClear: [{
                type: Output
            }], onPanelShow: [{
                type: Output
            }], onPanelHide: [{
                type: Output
            }], onLazyLoad: [{
                type: Output
            }], onRemove: [{
                type: Output
            }], onSelectAllChange: [{
                type: Output
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], overlayViewChild: [{
                type: ViewChild,
                args: ['overlay']
            }], filterInputChild: [{
                type: ViewChild,
                args: ['filterInput']
            }], focusInputViewChild: [{
                type: ViewChild,
                args: ['focusInput']
            }], itemsViewChild: [{
                type: ViewChild,
                args: ['items']
            }], scroller: [{
                type: ViewChild,
                args: ['scroller']
            }], lastHiddenFocusableElementOnOverlay: [{
                type: ViewChild,
                args: ['lastHiddenFocusableEl']
            }], firstHiddenFocusableElementOnOverlay: [{
                type: ViewChild,
                args: ['firstHiddenFocusableEl']
            }], headerCheckboxViewChild: [{
                type: ViewChild,
                args: ['headerCheckbox']
            }], footerFacet: [{
                type: ContentChild,
                args: [Footer]
            }], headerFacet: [{
                type: ContentChild,
                args: [Header]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class MultiSelectModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MultiSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: MultiSelectModule, declarations: [MultiSelect, MultiSelectItem], imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, AutoFocusModule, CheckIcon, SearchIcon, TimesCircleIcon, TimesIcon, ChevronDownIcon, CheckIcon], exports: [MultiSelect, OverlayModule, SharedModule, ScrollerModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MultiSelectModule, imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, AutoFocusModule, CheckIcon, SearchIcon, TimesCircleIcon, TimesIcon, ChevronDownIcon, CheckIcon, OverlayModule, SharedModule, ScrollerModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MultiSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, AutoFocusModule, CheckIcon, SearchIcon, TimesCircleIcon, TimesIcon, ChevronDownIcon, CheckIcon],
                    exports: [MultiSelect, OverlayModule, SharedModule, ScrollerModule],
                    declarations: [MultiSelect, MultiSelectItem]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvbXVsdGlzZWxlY3QvbXVsdGlzZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFJSCxnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxRQUFRLEVBQ1IsWUFBWSxFQUNaLGVBQWUsRUFDZixNQUFNLEVBRU4sWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsUUFBUSxFQUVSLGVBQWUsRUFFZixNQUFNLEVBSU4sTUFBTSxFQUdOLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBaUIsTUFBTSxFQUFFLE1BQU0sRUFBaUQsYUFBYSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekosT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQVcsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBWSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwy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VSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFNBQVMsYUE3dER2TCxXQUFXLEVBOHRERyxhQUFhLEVBQUUsWUFBWSxFQUFFLGNBQWM7d0dBR3pELGlCQUFpQixZQUpoQixZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQ3pLLGFBQWEsRUFBRSxZQUFZLEVBQUUsY0FBYzs7MkZBR3pELGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLENBQUM7b0JBQ2pNLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQztvQkFDbkUsWUFBWSxFQUFFLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQztpQkFDL0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdDaGVja2VkLFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgYm9vbGVhbkF0dHJpYnV0ZSxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgY29tcHV0ZWQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBlZmZlY3QsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBOZ01vZHVsZSxcbiAgICBOZ1pvbmUsXG4gICAgbnVtYmVyQXR0cmlidXRlLFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMixcbiAgICBTaWduYWwsXG4gICAgc2lnbmFsLFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmlsdGVyU2VydmljZSwgRm9vdGVyLCBIZWFkZXIsIE92ZXJsYXlPcHRpb25zLCBPdmVybGF5U2VydmljZSwgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlLCBUcmFuc2xhdGlvbktleXMgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvb3ZlcmxheSc7XG5pbXBvcnQgeyBSaXBwbGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQgeyBTY3JvbGxlciwgU2Nyb2xsZXJNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Njcm9sbGVyJztcbmltcG9ydCB7IFNjcm9sbGVyT3B0aW9ucyB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xuaW1wb3J0IHsgT2JqZWN0VXRpbHMsIFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBDaGVja0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZWNrJztcbmltcG9ydCB7IFNlYXJjaEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3NlYXJjaCc7XG5pbXBvcnQgeyBUaW1lc0NpcmNsZUljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3RpbWVzY2lyY2xlJztcbmltcG9ydCB7IFRpbWVzSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdGltZXMnO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25JY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGV2cm9uZG93bic7XG5pbXBvcnQgeyBOdWxsYWJsZSB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQgeyBBdXRvRm9jdXNNb2R1bGUgfSBmcm9tICdwcmltZW5nL2F1dG9mb2N1cyc7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdFJlbW92ZUV2ZW50LCBNdWx0aVNlbGVjdEZpbHRlck9wdGlvbnMsIE11bHRpU2VsZWN0RmlsdGVyRXZlbnQsIE11bHRpU2VsZWN0Qmx1ckV2ZW50LCBNdWx0aVNlbGVjdENoYW5nZUV2ZW50LCBNdWx0aVNlbGVjdEZvY3VzRXZlbnQsIE11bHRpU2VsZWN0TGF6eUxvYWRFdmVudCwgTXVsdGlTZWxlY3RTZWxlY3RBbGxDaGFuZ2VFdmVudCB9IGZyb20gJy4vbXVsdGlzZWxlY3QuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IE1VTFRJU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTXVsdGlTZWxlY3QpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbXVsdGlTZWxlY3RJdGVtJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bGlcbiAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwieyBoZWlnaHQ6IGl0ZW1TaXplICsgJ3B4JyB9XCJcbiAgICAgICAgICAgIGNsYXNzPVwicC1tdWx0aXNlbGVjdC1pdGVtXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtbXVsdGlzZWxlY3QtaXRlbSc6IHRydWUsICdwLWRpc2FibGVkJzogZGlzYWJsZWQsICdwLWZvY3VzJzogZm9jdXNlZCB9XCJcbiAgICAgICAgICAgIFtpZF09XCJpZFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImxhYmVsXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtc2V0c2l6ZV09XCJhcmlhU2V0U2l6ZVwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLXBvc2luc2V0XT1cImFyaWFQb3NJbnNldFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtcC1mb2N1c2VkXT1cImZvY3VzZWRcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWhpZ2hsaWdodF09XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXAtZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1jaGVja2VkXT1cInNlbGVjdGVkXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbk9wdGlvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwib25PcHRpb25Nb3VzZUVudGVyKCRldmVudClcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jaGVja2JveCBwLWNvbXBvbmVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWNoZWNrYm94LWJveFwiIFtuZ0NsYXNzXT1cInsgJ3AtaGlnaGxpZ2h0Jzogc2VsZWN0ZWQgfVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2VsZWN0ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0ljb24gKm5nSWY9XCIhY2hlY2tJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1jaGVja2JveC1pY29uJ1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjaGVja0ljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1jaGVja2JveC1pY29uXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNoZWNrSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3sgbGFiZWwgPz8gJ2VtcHR5JyB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IG9wdGlvbiB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbGk+XG4gICAgYCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdEl0ZW0ge1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBvcHRpb246IGFueTtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzZWxlY3RlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBpdGVtU2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGZvY3VzZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBhcmlhUG9zSW5zZXQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGFyaWFTZXRTaXplOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGNoZWNrSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uTW91c2VFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBvbk9wdGlvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLm9uQ2xpY2suZW1pdCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIG9wdGlvbjogdGhpcy5vcHRpb24sXG4gICAgICAgICAgICBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZFxuICAgICAgICB9KTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgb25PcHRpb25Nb3VzZUVudGVyKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLm9uTW91c2VFbnRlci5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgb3B0aW9uOiB0aGlzLm9wdGlvbixcbiAgICAgICAgICAgIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogTXVsdGlTZWxlY3QgaXMgdXNlZCB0byBzZWxlY3QgbXVsdGlwbGUgaXRlbXMgZnJvbSBhIGNvbGxlY3Rpb24uXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbXVsdGlTZWxlY3QnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbYXR0ci5pZF09XCJpZFwiIFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIChjbGljayk9XCJvbkNvbnRhaW5lckNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlXCIgW2F0dHIuZGF0YS1wLWhpZGRlbi1hY2Nlc3NpYmxlXT1cInRydWVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgI2ZvY3VzSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgW3BUb29sdGlwXT1cInRvb2x0aXBcIlxuICAgICAgICAgICAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cInRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIFtwb3NpdGlvblN0eWxlXT1cInRvb2x0aXBQb3NpdGlvblN0eWxlXCJcbiAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBTdHlsZUNsYXNzXT1cInRvb2x0aXBTdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImlucHV0SWRcIlxuICAgICAgICAgICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGFzcG9wdXBdPVwiJ2xpc3Rib3gnXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJvdmVybGF5VmlzaWJsZSA/PyBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwib3ZlcmxheVZpc2libGUgPyBpZCArICdfbGlzdCcgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiIWRpc2FibGVkID8gdGFiaW5kZXggOiAtMVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF09XCJmb2N1c2VkID8gZm9jdXNlZE9wdGlvbklkIDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgcEF1dG9Gb2N1c1xuICAgICAgICAgICAgICAgICAgICBbYXV0b2ZvY3VzXT1cImF1dG9mb2N1c1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbXVsdGlzZWxlY3QtbGFiZWwtY29udGFpbmVyXCIgW3BUb29sdGlwXT1cInRvb2x0aXBcIiBbdG9vbHRpcFBvc2l0aW9uXT1cInRvb2x0aXBQb3NpdGlvblwiIFtwb3NpdGlvblN0eWxlXT1cInRvb2x0aXBQb3NpdGlvblN0eWxlXCIgW3Rvb2x0aXBTdHlsZUNsYXNzXT1cInRvb2x0aXBTdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJsYWJlbENsYXNzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhc2VsZWN0ZWRJdGVtc1RlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGlzcGxheSA9PT0gJ2NvbW1hJ1wiPnt7IGxhYmVsKCkgfHwgJ2VtcHR5JyB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXkgPT09ICdjaGlwJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgI3Rva2VuICpuZ0Zvcj1cImxldCBpdGVtIG9mIGNoaXBTZWxlY3RlZEl0ZW1zKCk7IGxldCBpID0gaW5kZXhcIiBjbGFzcz1cInAtbXVsdGlzZWxlY3QtdG9rZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW11bHRpc2VsZWN0LXRva2VuLWxhYmVsXCI+e3sgZ2V0TGFiZWxCeVZhbHVlKGl0ZW0pIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGltZXNDaXJjbGVJY29uICpuZ0lmPVwiIXJlbW92ZVRva2VuSWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtbXVsdGlzZWxlY3QtdG9rZW4taWNvbidcIiAoY2xpY2spPVwicmVtb3ZlT3B0aW9uKGl0ZW0sIGV2ZW50KVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2xlYXJpY29uJ1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJyZW1vdmVUb2tlbkljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1tdWx0aXNlbGVjdC10b2tlbi1pY29uXCIgKGNsaWNrKT1cInJlbW92ZU9wdGlvbihpdGVtLCBldmVudClcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2NsZWFyaWNvbidcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInJlbW92ZVRva2VuSWNvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbW9kZWxWYWx1ZSgpIHx8IG1vZGVsVmFsdWUoKS5sZW5ndGggPT09IDBcIj57eyBwbGFjZWhvbGRlcigpIHx8IGRlZmF1bHRMYWJlbCB8fCAnZW1wdHknIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzZWxlY3RlZEl0ZW1zVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBzZWxlY3RlZE9wdGlvbnMsIHJlbW92ZUNoaXA6IHJlbW92ZU9wdGlvbi5iaW5kKHRoaXMpIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNWaXNpYmxlQ2xlYXJJY29uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxUaW1lc0ljb24gKm5nSWY9XCIhY2xlYXJJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1tdWx0aXNlbGVjdC1jbGVhci1pY29uJ1wiIChjbGljayk9XCJjbGVhcigkZXZlbnQpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjbGVhcmljb24nXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY2xlYXJJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtbXVsdGlzZWxlY3QtY2xlYXItaWNvblwiIChjbGljayk9XCJjbGVhcigkZXZlbnQpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjbGVhcmljb24nXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2xlYXJJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW11bHRpc2VsZWN0LXRyaWdnZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWRyb3Bkb3duSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiZHJvcGRvd25JY29uXCIgY2xhc3M9XCJwLW11bHRpc2VsZWN0LXRyaWdnZXItaWNvblwiIFtuZ0NsYXNzXT1cImRyb3Bkb3duSWNvblwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIndHJpZ2dlcmljb24nXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiAqbmdJZj1cIiFkcm9wZG93bkljb25cIiBbc3R5bGVDbGFzc109XCIncC1tdWx0aXNlbGVjdC10cmlnZ2VyLWljb24nXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0cmlnZ2VyaWNvbidcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImRyb3Bkb3duSWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLW11bHRpc2VsZWN0LXRyaWdnZXItaWNvblwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIndHJpZ2dlcmljb24nXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkcm9wZG93bkljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cC1vdmVybGF5XG4gICAgICAgICAgICAgICAgI292ZXJsYXlcbiAgICAgICAgICAgICAgICBbKHZpc2libGUpXT1cIm92ZXJsYXlWaXNpYmxlXCJcbiAgICAgICAgICAgICAgICBbb3B0aW9uc109XCJvdmVybGF5T3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgW3RhcmdldF09XCInQHBhcmVudCdcIlxuICAgICAgICAgICAgICAgIFthcHBlbmRUb109XCJhcHBlbmRUb1wiXG4gICAgICAgICAgICAgICAgW2F1dG9aSW5kZXhdPVwiYXV0b1pJbmRleFwiXG4gICAgICAgICAgICAgICAgW2Jhc2VaSW5kZXhdPVwiYmFzZVpJbmRleFwiXG4gICAgICAgICAgICAgICAgW3Nob3dUcmFuc2l0aW9uT3B0aW9uc109XCJzaG93VHJhbnNpdGlvbk9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIFtoaWRlVHJhbnNpdGlvbk9wdGlvbnNdPVwiaGlkZVRyYW5zaXRpb25PcHRpb25zXCJcbiAgICAgICAgICAgICAgICAob25BbmltYXRpb25TdGFydCk9XCJvbk92ZXJsYXlBbmltYXRpb25TdGFydCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAob25IaWRlKT1cImhpZGUoKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBbYXR0ci5pZF09XCJpZCArICdfbGlzdCdcIiBbbmdDbGFzc109XCIncC1tdWx0aXNlbGVjdC1wYW5lbCBwLWNvbXBvbmVudCdcIiBbbmdTdHlsZV09XCJwYW5lbFN0eWxlXCIgW2NsYXNzXT1cInBhbmVsU3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjZmlyc3RIaWRkZW5Gb2N1c2FibGVFbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZSBwLWhpZGRlbi1mb2N1c2FibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbkZpcnN0SGlkZGVuRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWhpZGRlbi1hY2Nlc3NpYmxlXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcC1oaWRkZW4tZm9jdXNhYmxlXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbXVsdGlzZWxlY3QtaGVhZGVyXCIgKm5nSWY9XCJzaG93SGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImZpbHRlclRlbXBsYXRlOyBlbHNlIGJ1aWx0SW5GaWx0ZXJFbGVtZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmaWx0ZXJUZW1wbGF0ZTsgY29udGV4dDogeyBvcHRpb25zOiBmaWx0ZXJPcHRpb25zIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWx0SW5GaWx0ZXJFbGVtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtY2hlY2tib3ggcC1jb21wb25lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJzaG93VG9nZ2xlQWxsICYmICFzZWxlY3Rpb25MaW1pdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWNoZWNrYm94LWRpc2FibGVkJzogZGlzYWJsZWQgfHwgdG9nZ2xlQWxsRGlzYWJsZWQgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25Ub2dnbGVBbGwoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkhlYWRlckNoZWNrYm94S2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIiBbYXR0ci5kYXRhLXAtaGlkZGVuLWFjY2Vzc2libGVdPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjaGVhZGVyQ2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuY2hlY2tlZF09XCJhbGxTZWxlY3RlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uSGVhZGVyQ2hlY2tib3hGb2N1cygpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib25IZWFkZXJDaGVja2JveEJsdXIoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCB0b2dnbGVBbGxEaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwidG9nZ2xlQWxsQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWNoZWNrYm94LWJveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cInRvZ2dsZUFsbEFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jaGVja2VkXT1cImFsbFNlbGVjdGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtaGlnaGxpZ2h0JzogYWxsU2VsZWN0ZWQoKSwgJ3AtZm9jdXMnOiBoZWFkZXJDaGVja2JveEZvY3VzLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkIHx8IHRvZ2dsZUFsbERpc2FibGVkIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJhbGxTZWxlY3RlZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0ljb24gW3N0eWxlQ2xhc3NdPVwiJ3AtY2hlY2tib3gtaWNvbidcIiAqbmdJZj1cIiFjaGVja0ljb25UZW1wbGF0ZVwiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNoZWNrSWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWNoZWNrYm94LWljb25cIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjaGVja0ljb25UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGFsbFNlbGVjdGVkKCkgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbXVsdGlzZWxlY3QtZmlsdGVyLWNvbnRhaW5lclwiICpuZ0lmPVwiZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjZmlsdGVySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInNlYXJjaGJveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwiZmlsdGVyUGxhY2VIb2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJzZWFyY2hib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtb3duc109XCJpZCArICdfbGlzdCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF09XCJmb2N1c2VkT3B0aW9uSWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJfZmlsdGVyVmFsdWUoKSB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGlucHV0KT1cIm9uRmlsdGVySW5wdXRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25GaWx0ZXJLZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbklucHV0Q2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib25GaWx0ZXJCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1tdWx0aXNlbGVjdC1maWx0ZXIgcC1pbnB1dHRleHQgcC1jb21wb25lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwiZmlsdGVyUGxhY2VIb2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUZpbHRlckxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VhcmNoSWNvbiBbc3R5bGVDbGFzc109XCIncC1tdWx0aXNlbGVjdC1maWx0ZXItaWNvbidcIiAqbmdJZj1cIiFmaWx0ZXJJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJmaWx0ZXJJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtbXVsdGlzZWxlY3QtZmlsdGVyLWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmaWx0ZXJJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicC1tdWx0aXNlbGVjdC1jbG9zZSBwLWxpbmsgcC1idXR0b24taWNvbi1vbmx5XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjbG9zZSgkZXZlbnQpXCIgcFJpcHBsZSBbYXR0ci5hcmlhLWxhYmVsXT1cImNsb3NlQXJpYUxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGltZXNJY29uIFtzdHlsZUNsYXNzXT1cIidwLW11bHRpc2VsZWN0LWNsb3NlLWljb24nXCIgKm5nSWY9XCIhY2xvc2VJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjbG9zZUljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1tdWx0aXNlbGVjdC1jbG9zZS1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2xvc2VJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tdWx0aXNlbGVjdC1pdGVtcy13cmFwcGVyXCIgW3N0eWxlLm1heC1oZWlnaHRdPVwidmlydHVhbFNjcm9sbCA/ICdhdXRvJyA6IHNjcm9sbEhlaWdodCB8fCAnYXV0bydcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cC1zY3JvbGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInZpcnR1YWxTY3JvbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjc2Nyb2xsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2l0ZW1zXT1cInZpc2libGVPcHRpb25zKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGVdPVwieyBoZWlnaHQ6IHNjcm9sbEhlaWdodCB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2l0ZW1TaXplXT1cInZpcnR1YWxTY3JvbGxJdGVtU2l6ZSB8fCBfaXRlbVNpemVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXV0b1NpemVdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YWJpbmRleF09XCItMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYXp5XT1cImxhenlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25MYXp5TG9hZCk9XCJvbkxhenlMb2FkLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXT1cInZpcnR1YWxTY3JvbGxPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJjb250ZW50XCIgbGV0LWl0ZW1zIGxldC1zY3JvbGxlck9wdGlvbnM9XCJvcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYnVpbGRJbkl0ZW1zOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbXMsIG9wdGlvbnM6IHNjcm9sbGVyT3B0aW9ucyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsb2FkZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cImxvYWRlclwiIGxldC1zY3JvbGxlck9wdGlvbnM9XCJvcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImxvYWRlclRlbXBsYXRlOyBjb250ZXh0OiB7IG9wdGlvbnM6IHNjcm9sbGVyT3B0aW9ucyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Atc2Nyb2xsZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF2aXJ0dWFsU2Nyb2xsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJidWlsZEluSXRlbXM7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiB2aXNpYmxlT3B0aW9ucygpLCBvcHRpb25zOiB7fSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWxkSW5JdGVtcyBsZXQtaXRlbXMgbGV0LXNjcm9sbGVyT3B0aW9ucz1cIm9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsICNpdGVtcyBjbGFzcz1cInAtbXVsdGlzZWxlY3QtaXRlbXMgcC1jb21wb25lbnRcIiBbbmdDbGFzc109XCJzY3JvbGxlck9wdGlvbnMuY29udGVudFN0eWxlQ2xhc3NcIiBbc3R5bGVdPVwic2Nyb2xsZXJPcHRpb25zLmNvbnRlbnRTdHlsZVwiIHJvbGU9XCJsaXN0Ym94XCIgYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJ0cnVlXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJsaXN0TGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtb3B0aW9uIFtuZ0Zvck9mXT1cIml0ZW1zXCIgbGV0LWk9XCJpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc09wdGlvbkdyb3VwKG9wdGlvbilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIFthdHRyLmlkXT1cImlkICsgJ18nICsgZ2V0T3B0aW9uSW5kZXgoaSwgc2Nyb2xsZXJPcHRpb25zKVwiIGNsYXNzPVwicC1tdWx0aXNlbGVjdC1pdGVtLWdyb3VwXCIgW25nU3R5bGVdPVwieyBoZWlnaHQ6IHNjcm9sbGVyT3B0aW9ucy5pdGVtU2l6ZSArICdweCcgfVwiIHJvbGU9XCJvcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWdyb3VwVGVtcGxhdGVcIj57eyBnZXRPcHRpb25Hcm91cExhYmVsKG9wdGlvbi5vcHRpb25Hcm91cCkgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZ3JvdXBUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IG9wdGlvbi5vcHRpb25Hcm91cCB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc09wdGlvbkdyb3VwKG9wdGlvbilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAtbXVsdGlTZWxlY3RJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwiaWQgKyAnXycgKyBnZXRPcHRpb25JbmRleChpLCBzY3JvbGxlck9wdGlvbnMpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25dPVwib3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzZWxlY3RlZF09XCJpc1NlbGVjdGVkKG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xhYmVsXT1cImdldE9wdGlvbkxhYmVsKG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImlzT3B0aW9uRGlzYWJsZWQob3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjaGVja0ljb25UZW1wbGF0ZV09XCJjaGVja0ljb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXRlbVNpemVdPVwic2Nyb2xsZXJPcHRpb25zLml0ZW1TaXplXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb2N1c2VkXT1cImZvY3VzZWRPcHRpb25JbmRleCgpID09PSBnZXRPcHRpb25JbmRleChpLCBzY3JvbGxlck9wdGlvbnMpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthcmlhUG9zSW5zZXRdPVwiZ2V0QXJpYVBvc0luc2V0KGdldE9wdGlvbkluZGV4KGksIHNjcm9sbGVyT3B0aW9ucykpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthcmlhU2V0U2l6ZV09XCJhcmlhU2V0U2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25DbGljayk9XCJvbk9wdGlvblNlbGVjdCgkZXZlbnQsIGZhbHNlLCBnZXRPcHRpb25JbmRleChpLCBzY3JvbGxlck9wdGlvbnMpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25Nb3VzZUVudGVyKT1cIm9uT3B0aW9uTW91c2VFbnRlcigkZXZlbnQsIGdldE9wdGlvbkluZGV4KGksIHNjcm9sbGVyT3B0aW9ucykpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvcC1tdWx0aVNlbGVjdEl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCJoYXNGaWx0ZXIoKSAmJiBpc0VtcHR5KClcIiBjbGFzcz1cInAtbXVsdGlzZWxlY3QtZW1wdHktbWVzc2FnZVwiIFtuZ1N0eWxlXT1cInsgaGVpZ2h0OiBzY3JvbGxlck9wdGlvbnMuaXRlbVNpemUgKyAncHgnIH1cIiByb2xlPVwib3B0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFlbXB0eUZpbHRlclRlbXBsYXRlICYmICFlbXB0eVRlbXBsYXRlOyBlbHNlIGVtcHR5RmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGVtcHR5RmlsdGVyTWVzc2FnZUxhYmVsIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAjZW1wdHlGaWx0ZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJlbXB0eUZpbHRlclRlbXBsYXRlIHx8IGVtcHR5VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCIhaGFzRmlsdGVyKCkgJiYgaXNFbXB0eSgpXCIgY2xhc3M9XCJwLW11bHRpc2VsZWN0LWVtcHR5LW1lc3NhZ2VcIiBbbmdTdHlsZV09XCJ7IGhlaWdodDogc2Nyb2xsZXJPcHRpb25zLml0ZW1TaXplICsgJ3B4JyB9XCIgcm9sZT1cIm9wdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZW1wdHlUZW1wbGF0ZTsgZWxzZSBlbXB0eVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBlbXB0eU1lc3NhZ2VMYWJlbCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgI2VtcHR5ICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW1wdHlUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tdWx0aXNlbGVjdC1mb290ZXJcIiAqbmdJZj1cImZvb3RlckZhY2V0IHx8IGZvb3RlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZvb3RlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjbGFzdEhpZGRlbkZvY3VzYWJsZUVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlIHAtaGlkZGVuLWZvY3VzYWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uTGFzdEhpZGRlbkZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcC1oaWRkZW4tYWNjZXNzaWJsZV09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXAtaGlkZGVuLWZvY3VzYWJsZV09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3Atb3ZlcmxheT5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50IHAtaW5wdXR3cmFwcGVyJyxcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1mb2N1c10nOiAnZm9jdXNlZCB8fCBvdmVybGF5VmlzaWJsZScsXG4gICAgICAgICdbY2xhc3MucC1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtNVUxUSVNFTEVDVF9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9tdWx0aXNlbGVjdC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIC8qKlxuICAgICAqIFVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBjb21wb25lbnRcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIGlucHV0IGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBvdmVybGF5IHBhbmVsLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGU6IGFueTtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgb3ZlcmxheSBwYW5lbCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXIgb2YgdGhlIGZvY3VzIGlucHV0IHRvIG1hdGNoIGEgbGFiZWwgZGVmaW5lZCBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgZWxlbWVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCBjYW5ub3QgYmUgZWRpdGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByZWFkb25seTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgb3B0aW9ucyBhcyBncm91cGVkIHdoZW4gbmVzdGVkIG9wdGlvbnMgYXJlIHByb3ZpZGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBncm91cDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHNwZWNpZmllZCwgZGlzcGxheXMgYW4gaW5wdXQgZmllbGQgdG8gZmlsdGVyIHRoZSBpdGVtcyBvbiBrZXl1cC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZmlsdGVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHBsYWNlaG9sZGVyIG9mIHRoZSBmaWx0ZXIgaW5wdXQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyUGxhY2VIb2xkZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBMb2NhbGUgdG8gdXNlIGluIGZpbHRlcmluZy4gVGhlIGRlZmF1bHQgbG9jYWxlIGlzIHRoZSBob3N0IGVudmlyb25tZW50J3MgY3VycmVudCBsb2NhbGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyTG9jYWxlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBvcHRpb25zIHBhbmVsLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBvdmVybGF5VmlzaWJsZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0YWJiaW5nIG9yZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHRhYmluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQgPSAwO1xuICAgIC8qKlxuICAgICAqIFRhcmdldCBlbGVtZW50IHRvIGF0dGFjaCB0aGUgb3ZlcmxheSwgdmFsaWQgdmFsdWVzIGFyZSBcImJvZHlcIiBvciBhIGxvY2FsIG5nLXRlbXBsYXRlIHZhcmlhYmxlIG9mIGFub3RoZXIgZWxlbWVudCAobm90ZTogdXNlIGJpbmRpbmcgd2l0aCBicmFja2V0cyBmb3IgdGVtcGxhdGUgdmFyaWFibGVzLCBlLmcuIFthcHBlbmRUb109XCJteWRpdlwiIGZvciBhIGRpdiBlbGVtZW50IGhhdmluZyAjbXlkaXYgYXMgdmFyaWFibGUgbmFtZSkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXBwZW5kVG86IEhUTUxFbGVtZW50IHwgRWxlbWVudFJlZiB8IFRlbXBsYXRlUmVmPGFueT4gfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkIHwgYW55O1xuICAgIC8qKlxuICAgICAqIEEgcHJvcGVydHkgdG8gdW5pcXVlbHkgaWRlbnRpZnkgYSB2YWx1ZSBpbiBvcHRpb25zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRhdGFLZXk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBFc3RhYmxpc2hlcyByZWxhdGlvbnNoaXBzIGJldHdlZW4gdGhlIGNvbXBvbmVudCBhbmQgbGFiZWwocykgd2hlcmUgaXRzIHZhbHVlIHNob3VsZCBiZSBvbmUgb3IgbW9yZSBlbGVtZW50IElEcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyBsYWJlbHMgb2Ygc2VsZWN0ZWQgaXRlbSBsYWJlbHMgb3IgdXNlIGRlZmF1bHQgbGFiZWwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlZmF1bHRWYWx1ZSB0cnVlXG4gICAgICovXG4gICAgQElucHV0KCkgc2V0IGRpc3BsYXlTZWxlY3RlZExhYmVsKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNwbGF5U2VsZWN0ZWRMYWJlbCA9IHZhbDtcbiAgICB9XG4gICAgZ2V0IGRpc3BsYXlTZWxlY3RlZExhYmVsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGxheVNlbGVjdGVkTGFiZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlY2lkZXMgaG93IG1hbnkgc2VsZWN0ZWQgaXRlbSBsYWJlbHMgdG8gc2hvdyBhdCBtb3N0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZWZhdWx0VmFsdWUgM1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNldCBtYXhTZWxlY3RlZExhYmVscyh2YWw6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fbWF4U2VsZWN0ZWRMYWJlbHMgPSB2YWw7XG4gICAgfVxuICAgIGdldCBtYXhTZWxlY3RlZExhYmVscygpOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heFNlbGVjdGVkTGFiZWxzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWNpZGVzIGhvdyBtYW55IHNlbGVjdGVkIGl0ZW0gbGFiZWxzIHRvIHNob3cgYXQgbW9zdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBzZWxlY3Rpb25MaW1pdDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIExhYmVsIHRvIGRpc3BsYXkgYWZ0ZXIgZXhjZWVkaW5nIG1heCBzZWxlY3RlZCBsYWJlbHMgZS5nLiAoezB9IGl0ZW1zIHNlbGVjdGVkKSwgZGVmYXVsdHMgXCJlbGxpcHNpc1wiIGtleXdvcmQgdG8gaW5kaWNhdGUgYSB0ZXh0LW92ZXJmbG93LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkSXRlbXNMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgY2hlY2tib3ggYXQgaGVhZGVyIHRvIHRvZ2dsZSBhbGwgaXRlbXMgYXQgb25jZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2hvd1RvZ2dsZUFsbDogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogVGV4dCB0byBkaXNwbGF5IHdoZW4gZmlsdGVyaW5nIGRvZXMgbm90IHJldHVybiBhbnkgcmVzdWx0cy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBlbXB0eUZpbHRlck1lc3NhZ2U6IHN0cmluZyA9ICcnO1xuICAgIC8qKlxuICAgICAqIFRleHQgdG8gZGlzcGxheSB3aGVuIHRoZXJlIGlzIG5vIGRhdGEuIERlZmF1bHRzIHRvIGdsb2JhbCB2YWx1ZSBpbiBpMThuIHRyYW5zbGF0aW9uIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZW1wdHlNZXNzYWdlOiBzdHJpbmcgPSAnJztcbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGZpbHRlciB2YWx1ZSB3aGVuIGhpZGluZyB0aGUgZHJvcGRvd24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHJlc2V0RmlsdGVyT25IaWRlOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogSWNvbiBjbGFzcyBvZiB0aGUgZHJvcGRvd24gaWNvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkcm9wZG93bkljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBsYWJlbCBmaWVsZCBvZiBhbiBvcHRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgb3B0aW9uTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSB2YWx1ZSBmaWVsZCBvZiBhbiBvcHRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgb3B0aW9uVmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBkaXNhYmxlZCBmaWVsZCBvZiBhbiBvcHRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgb3B0aW9uRGlzYWJsZWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBsYWJlbCBmaWVsZCBvZiBhbiBvcHRpb24gZ3JvdXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgb3B0aW9uR3JvdXBMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkID0gJ2xhYmVsJztcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBvcHRpb25zIGZpZWxkIG9mIGFuIG9wdGlvbiBncm91cC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBvcHRpb25Hcm91cENoaWxkcmVuOiBzdHJpbmcgPSAnaXRlbXMnO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgaGVhZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93SGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGVuIGZpbHRlcmluZyBpcyBlbmFibGVkLCBmaWx0ZXJCeSBkZWNpZGVzIHdoaWNoIGZpZWxkIG9yIGZpZWxkcyAoY29tbWEgc2VwYXJhdGVkKSB0byBzZWFyY2ggYWdhaW5zdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEhlaWdodCBvZiB0aGUgdmlld3BvcnQgaW4gcGl4ZWxzLCBhIHNjcm9sbGJhciBpcyBkZWZpbmVkIGlmIGhlaWdodCBvZiBsaXN0IGV4Y2VlZHMgdGhpcyB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzY3JvbGxIZWlnaHQ6IHN0cmluZyA9ICcyMDBweCc7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiBkYXRhIGlzIGxvYWRlZCBhbmQgaW50ZXJhY3RlZCB3aXRoIGluIGxhenkgbWFubmVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBsYXp5OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZGF0YSBzaG91bGQgYmUgbG9hZGVkIG9uIGRlbWFuZCBkdXJpbmcgc2Nyb2xsLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSB2aXJ0dWFsU2Nyb2xsOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEhlaWdodCBvZiBhbiBpdGVtIGluIHRoZSBsaXN0IGZvciBWaXJ0dWFsU2Nyb2xsaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gdXNlIHRoZSBzY3JvbGxlciBmZWF0dXJlLiBUaGUgcHJvcGVydGllcyBvZiBzY3JvbGxlciBjb21wb25lbnQgY2FuIGJlIHVzZWQgbGlrZSBhbiBvYmplY3QgaW4gaXQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmlydHVhbFNjcm9sbE9wdGlvbnM6IFNjcm9sbGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHVzZSBvdmVybGF5IEFQSSBmZWF0dXJlLiBUaGUgcHJvcGVydGllcyBvZiBvdmVybGF5IEFQSSBjYW4gYmUgdXNlZCBsaWtlIGFuIG9iamVjdCBpbiBpdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBvdmVybGF5T3B0aW9uczogT3ZlcmxheU9wdGlvbnMgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgZmlsdGVyIGlucHV0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFGaWx0ZXJMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgaG93IHRoZSBpdGVtcyBhcmUgZmlsdGVyZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyTWF0Y2hNb2RlOiAnY29udGFpbnMnIHwgJ3N0YXJ0c1dpdGgnIHwgJ2VuZHNXaXRoJyB8ICdlcXVhbHMnIHwgJ25vdEVxdWFscycgfCAnaW4nIHwgJ2x0JyB8ICdsdGUnIHwgJ2d0JyB8ICdndGUnID0gJ2NvbnRhaW5zJztcbiAgICAvKipcbiAgICAgKiBBZHZpc29yeSBpbmZvcm1hdGlvbiB0byBkaXNwbGF5IGluIGEgdG9vbHRpcCBvbiBob3Zlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b29sdGlwOiBzdHJpbmcgPSAnJztcbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiBvZiB0aGUgdG9vbHRpcC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b29sdGlwUG9zaXRpb246ICd0b3AnIHwgJ2xlZnQnIHwgJ3JpZ2h0JyB8ICdib3R0b20nID0gJ3JpZ2h0JztcbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIENTUyBwb3NpdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b29sdGlwUG9zaXRpb25TdHlsZTogc3RyaW5nID0gJ2Fic29sdXRlJztcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgdG9vbHRpcC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b29sdGlwU3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgZm9jdXMgdG8gdGhlIGZpbHRlciBlbGVtZW50IHdoZW4gdGhlIG92ZXJsYXkgaXMgc2hvd24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGF1dG9mb2N1c0ZpbHRlcjogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBob3cgdGhlIHNlbGVjdGVkIGl0ZW1zIGFyZSBkaXNwbGF5ZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGlzcGxheTogc3RyaW5nIHwgJ2NvbW1hJyB8ICdjaGlwJyA9ICdjb21tYSc7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgYXV0b2NvbXBsZXRlIGlzIGFjdGl2ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhdXRvY29tcGxldGU6IHN0cmluZyA9ICdvZmYnO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCwgYSBjbGVhciBpY29uIGlzIGRpc3BsYXllZCB0byBjbGVhciB0aGUgdmFsdWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dDbGVhcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCBzaG91bGQgYXV0b21hdGljYWxseSBnZXQgZm9jdXMgb24gbG9hZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYXV0b2ZvY3VzOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYxNC4yLjAsIHVzZSBvdmVybGF5T3B0aW9ucyBwcm9wZXJ0eSBpbnN0ZWFkLlxuICAgICAqIFdoZXRoZXIgdG8gYXV0b21hdGljYWxseSBtYW5hZ2UgbGF5ZXJpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGF1dG9aSW5kZXgoKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvWkluZGV4O1xuICAgIH1cbiAgICBzZXQgYXV0b1pJbmRleCh2YWw6IGJvb2xlYW4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fYXV0b1pJbmRleCA9IHZhbDtcbiAgICAgICAgY29uc29sZS53YXJuKCdUaGUgYXV0b1pJbmRleCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkIHNpbmNlIHYxNC4yLjAsIHVzZSBvdmVybGF5T3B0aW9ucyBwcm9wZXJ0eSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2MTQuMi4wLCB1c2Ugb3ZlcmxheU9wdGlvbnMgcHJvcGVydHkgaW5zdGVhZC5cbiAgICAgKiBCYXNlIHpJbmRleCB2YWx1ZSB0byB1c2UgaW4gbGF5ZXJpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGJhc2VaSW5kZXgoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Jhc2VaSW5kZXg7XG4gICAgfVxuICAgIHNldCBiYXNlWkluZGV4KHZhbDogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2Jhc2VaSW5kZXggPSB2YWw7XG4gICAgICAgIGNvbnNvbGUud2FybignVGhlIGJhc2VaSW5kZXggcHJvcGVydHkgaXMgZGVwcmVjYXRlZCBzaW5jZSB2MTQuMi4wLCB1c2Ugb3ZlcmxheU9wdGlvbnMgcHJvcGVydHkgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbiBvcHRpb25zIG9mIHRoZSBzaG93IGFuaW1hdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2MTQuMi4wLCB1c2Ugb3ZlcmxheU9wdGlvbnMgcHJvcGVydHkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc2hvd1RyYW5zaXRpb25PcHRpb25zKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93VHJhbnNpdGlvbk9wdGlvbnM7XG4gICAgfVxuICAgIHNldCBzaG93VHJhbnNpdGlvbk9wdGlvbnModmFsOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc2hvd1RyYW5zaXRpb25PcHRpb25zID0gdmFsO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBzaG93VHJhbnNpdGlvbk9wdGlvbnMgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCBzaW5jZSB2MTQuMi4wLCB1c2Ugb3ZlcmxheU9wdGlvbnMgcHJvcGVydHkgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbiBvcHRpb25zIG9mIHRoZSBoaWRlIGFuaW1hdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2MTQuMi4wLCB1c2Ugb3ZlcmxheU9wdGlvbnMgcHJvcGVydHkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgaGlkZVRyYW5zaXRpb25PcHRpb25zKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaWRlVHJhbnNpdGlvbk9wdGlvbnM7XG4gICAgfVxuICAgIHNldCBoaWRlVHJhbnNpdGlvbk9wdGlvbnModmFsOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5faGlkZVRyYW5zaXRpb25PcHRpb25zID0gdmFsO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBoaWRlVHJhbnNpdGlvbk9wdGlvbnMgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCBzaW5jZSB2MTQuMi4wLCB1c2Ugb3ZlcmxheU9wdGlvbnMgcHJvcGVydHkgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGFiZWwgdG8gZGlzcGxheSB3aGVuIHRoZXJlIGFyZSBubyBzZWxlY3Rpb25zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZXByZWNhdGVkIFVzZSBwbGFjZWhvbGRlciBpbnN0ZWFkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNldCBkZWZhdWx0TGFiZWwodmFsOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fZGVmYXVsdExhYmVsID0gdmFsO1xuICAgICAgICBjb25zb2xlLndhcm4oJ2RlZmF1bHRMYWJlbCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkIHNpbmNlIDE2LjYuMCwgdXNlIHBsYWNlaG9sZGVyIGluc3RlYWQnKTtcbiAgICB9XG4gICAgZ2V0IGRlZmF1bHRMYWJlbCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdExhYmVsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMYWJlbCB0byBkaXNwbGF5IHdoZW4gdGhlcmUgYXJlIG5vIHNlbGVjdGlvbnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2V0IHBsYWNlaG9sZGVyKHZhbDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyLnNldCh2YWwpO1xuICAgIH1cbiAgICBnZXQgcGxhY2Vob2xkZXIoKTogU2lnbmFsPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGxhY2Vob2xkZXIuYXNSZWFkb25seSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBvYmplY3RzIHRvIGRpc3BsYXkgYXMgdGhlIGF2YWlsYWJsZSBvcHRpb25zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBvcHRpb25zKCk6IGFueVtdIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuX29wdGlvbnMoKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuICAgIHNldCBvcHRpb25zKHZhbDogYW55W10gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFPYmplY3RVdGlscy5kZWVwRXF1YWxzKHRoaXMuX29wdGlvbnMoKSwgdmFsKSkge1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5zZXQodmFsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGVuIHNwZWNpZmllZCwgZmlsdGVyIGRpc3BsYXlzIHdpdGggdGhpcyB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgZmlsdGVyVmFsdWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJWYWx1ZSgpO1xuICAgIH1cbiAgICBzZXQgZmlsdGVyVmFsdWUodmFsOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX2ZpbHRlclZhbHVlLnNldCh2YWwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJdGVtIHNpemUgb2YgaXRlbSB0byBiZSB2aXJ0dWFsIHNjcm9sbGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZXByZWNhdGVkIHVzZSB2aXJ0dWFsU2Nyb2xsSXRlbVNpemUgcHJvcGVydHkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgaXRlbVNpemUoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1TaXplO1xuICAgIH1cbiAgICBzZXQgaXRlbVNpemUodmFsOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5faXRlbVNpemUgPSB2YWw7XG4gICAgICAgIGNvbnNvbGUud2FybignVGhlIGl0ZW1TaXplIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQsIHVzZSB2aXJ0dWFsU2Nyb2xsSXRlbVNpemUgcHJvcGVydHkgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciBhbGwgZGF0YSBpcyBzZWxlY3RlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc2VsZWN0QWxsKCk6IGJvb2xlYW4gfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdEFsbDtcbiAgICB9XG4gICAgc2V0IHNlbGVjdEFsbCh2YWx1ZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0QWxsID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRvIGZvY3VzIG9uIG9wdGlvbnMgd2hlbiBob3ZlcmluZyBvdmVyIHRoZW0sIGRlZmF1bHRzIHRvIG9wdGlvbkxhYmVsLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBmb2N1c09uSG92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBGaWVsZHMgdXNlZCB3aGVuIGZpbHRlcmluZyB0aGUgb3B0aW9ucywgZGVmYXVsdHMgdG8gb3B0aW9uTGFiZWwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyRmllbGRzOiBhbnlbXSB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBvcHRpb24gd2lsbCBiZSBzZWxlY3RlZCBvbiBmb2N1cy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2VsZWN0T25Gb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZm9jdXMgb24gdGhlIGZpcnN0IHZpc2libGUgb3Igc2VsZWN0ZWQgZWxlbWVudCB3aGVuIHRoZSBvdmVybGF5IHBhbmVsIGlzIHNob3duLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBhdXRvT3B0aW9uRm9jdXM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHZhbHVlIGNoYW5nZXMuXG4gICAgICogQHBhcmFtIHtNdWx0aVNlbGVjdENoYW5nZUV2ZW50fSBldmVudCAtIEN1c3RvbSBjaGFuZ2UgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TXVsdGlTZWxlY3RDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpU2VsZWN0Q2hhbmdlRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gZGF0YSBpcyBmaWx0ZXJlZC5cbiAgICAgKiBAcGFyYW0ge011bHRpU2VsZWN0RmlsdGVyRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIGZpbHRlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25GaWx0ZXI6IEV2ZW50RW1pdHRlcjxNdWx0aVNlbGVjdEZpbHRlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlTZWxlY3RGaWx0ZXJFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBtdWx0aXNlbGVjdCByZWNlaXZlcyBmb2N1cy5cbiAgICAgKiBAcGFyYW0ge011bHRpU2VsZWN0Rm9jdXNFdmVudH0gZXZlbnQgLSBDdXN0b20gZm9jdXMgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxNdWx0aVNlbGVjdEZvY3VzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aVNlbGVjdEZvY3VzRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gbXVsdGlzZWxlY3QgbG9zZXMgZm9jdXMuXG4gICAgICogQHBhcmFtIHtNdWx0aVNlbGVjdEJsdXJFdmVudH0gZXZlbnQgLSBDdXN0b20gYmx1ciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8TXVsdGlTZWxlY3RCbHVyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aVNlbGVjdEJsdXJFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBjb21wb25lbnQgaXMgY2xpY2tlZC5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGlucHV0IGZpZWxkIGlzIGNsZWFyZWQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2xlYXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBvdmVybGF5IHBhbmVsIGJlY29tZXMgdmlzaWJsZS5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25QYW5lbFNob3c6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBvdmVybGF5IHBhbmVsIGJlY29tZXMgaGlkZGVuLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblBhbmVsSGlkZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBpbiBsYXp5IG1vZGUgdG8gbG9hZCBuZXcgZGF0YS5cbiAgICAgKiBAcGFyYW0ge011bHRpU2VsZWN0TGF6eUxvYWRFdmVudH0gZXZlbnQgLSBMYXp5IGxvYWQgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uTGF6eUxvYWQ6IEV2ZW50RW1pdHRlcjxNdWx0aVNlbGVjdExhenlMb2FkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aVNlbGVjdExhenlMb2FkRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIGluIGxhenkgbW9kZSB0byBsb2FkIG5ldyBkYXRhLlxuICAgICAqIEBwYXJhbSB7TXVsdGlTZWxlY3RSZW1vdmVFdmVudH0gZXZlbnQgLSBSZW1vdmUgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uUmVtb3ZlOiBFdmVudEVtaXR0ZXI8TXVsdGlTZWxlY3RSZW1vdmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpU2VsZWN0UmVtb3ZlRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYWxsIGRhdGEgaXMgc2VsZWN0ZWQuXG4gICAgICogQHBhcmFtIHtNdWx0aVNlbGVjdFNlbGVjdEFsbENoYW5nZUV2ZW50fSBldmVudCAtIEN1c3RvbSBzZWxlY3QgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2VsZWN0QWxsQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TXVsdGlTZWxlY3RTZWxlY3RBbGxDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpU2VsZWN0U2VsZWN0QWxsQ2hhbmdlRXZlbnQ+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXJWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnb3ZlcmxheScpIG92ZXJsYXlWaWV3Q2hpbGQ6IE51bGxhYmxlPE92ZXJsYXk+O1xuXG4gICAgQFZpZXdDaGlsZCgnZmlsdGVySW5wdXQnKSBmaWx0ZXJJbnB1dENoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ2ZvY3VzSW5wdXQnKSBmb2N1c0lucHV0Vmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ2l0ZW1zJykgaXRlbXNWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnc2Nyb2xsZXInKSBzY3JvbGxlcjogTnVsbGFibGU8U2Nyb2xsZXI+O1xuXG4gICAgQFZpZXdDaGlsZCgnbGFzdEhpZGRlbkZvY3VzYWJsZUVsJykgbGFzdEhpZGRlbkZvY3VzYWJsZUVsZW1lbnRPbk92ZXJsYXk6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnZmlyc3RIaWRkZW5Gb2N1c2FibGVFbCcpIGZpcnN0SGlkZGVuRm9jdXNhYmxlRWxlbWVudE9uT3ZlcmxheTogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdoZWFkZXJDaGVja2JveCcpIGhlYWRlckNoZWNrYm94Vmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBDb250ZW50Q2hpbGQoRm9vdGVyKSBmb290ZXJGYWNldDogYW55O1xuXG4gICAgQENvbnRlbnRDaGlsZChIZWFkZXIpIGhlYWRlckZhY2V0OiBhbnk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogTnVsbGFibGU8UXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+PjtcblxuICAgIHNlYXJjaFZhbHVlOiBOdWxsYWJsZTxzdHJpbmc+O1xuXG4gICAgc2VhcmNoVGltZW91dDogYW55O1xuXG4gICAgX3NlbGVjdEFsbDogYm9vbGVhbiB8IHVuZGVmaW5lZCB8IG51bGwgPSBudWxsO1xuXG4gICAgX2F1dG9aSW5kZXg6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBfYmFzZVpJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgX3Nob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgX2hpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgX2RlZmF1bHRMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgX3BsYWNlaG9sZGVyID0gc2lnbmFsPHN0cmluZyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcblxuICAgIF9pdGVtU2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgX3NlbGVjdGlvbkxpbWl0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICB2YWx1ZTogYW55W107XG5cbiAgICBwdWJsaWMgX2ZpbHRlcmVkT3B0aW9uczogYW55W10gfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gICAgcHVibGljIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBwdWJsaWMgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBwdWJsaWMgdmFsdWVzQXNTdHJpbmc6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBmb2N1czogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBmaWx0ZXJlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgZ3JvdXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBsb2FkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBmaWx0ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBmb290ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBlbXB0eUZpbHRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgcHVibGljIGVtcHR5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgc2VsZWN0ZWRJdGVtc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgY2hlY2tJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBmaWx0ZXJJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICByZW1vdmVUb2tlbkljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGNsb3NlSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgY2xlYXJJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBkcm9wZG93bkljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBoZWFkZXJDaGVja2JveEZvY3VzOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgZmlsdGVyT3B0aW9uczogTXVsdGlTZWxlY3RGaWx0ZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuXG4gICAgcHJldmVudE1vZGVsVG91Y2hlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHByZXZlbnREb2N1bWVudERlZmF1bHQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBpdGVtc1dyYXBwZXI6IGFueTtcblxuICAgIF9kaXNwbGF5U2VsZWN0ZWRMYWJlbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBfbWF4U2VsZWN0ZWRMYWJlbHM6IG51bWJlciA9IDM7XG5cbiAgICBtb2RlbFZhbHVlID0gc2lnbmFsPGFueT4obnVsbCk7XG5cbiAgICBfZmlsdGVyVmFsdWUgPSBzaWduYWw8YW55PihudWxsKTtcblxuICAgIF9vcHRpb25zID0gc2lnbmFsPGFueVtdPihudWxsKTtcblxuICAgIHN0YXJ0UmFuZ2VJbmRleCA9IHNpZ25hbDxudW1iZXI+KC0xKTtcblxuICAgIGZvY3VzZWRPcHRpb25JbmRleCA9IHNpZ25hbDxudW1iZXI+KC0xKTtcblxuICAgIHNlbGVjdGVkT3B0aW9uczogYW55O1xuXG4gICAgY2xpY2tJblByb2dyZXNzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBnZXQgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1tdWx0aXNlbGVjdCBwLWNvbXBvbmVudCBwLWlucHV0d3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAncC1kaXNhYmxlZCc6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICAgICAncC1tdWx0aXNlbGVjdC1jbGVhcmFibGUnOiB0aGlzLnNob3dDbGVhciAmJiAhdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgICAgICdwLW11bHRpc2VsZWN0LWNoaXAnOiB0aGlzLmRpc3BsYXkgPT09ICdjaGlwJyxcbiAgICAgICAgICAgICdwLWZvY3VzJzogdGhpcy5mb2N1c2VkXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0Q2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1tdWx0aXNlbGVjdC1sYWJlbCBwLWlucHV0dGV4dCc6IHRydWUsXG4gICAgICAgICAgICAncC1wbGFjZWhvbGRlcic6ICh0aGlzLnBsYWNlaG9sZGVyKCkgfHwgdGhpcy5kZWZhdWx0TGFiZWwpICYmICh0aGlzLmxhYmVsKCkgPT09IHRoaXMucGxhY2Vob2xkZXIoKSB8fCB0aGlzLmxhYmVsKCkgPT09IHRoaXMuZGVmYXVsdExhYmVsKSxcbiAgICAgICAgICAgICdwLW11bHRpc2VsZWN0LWxhYmVsLWVtcHR5JzogIXRoaXMuc2VsZWN0ZWRJdGVtc1RlbXBsYXRlICYmICh0aGlzLmxhYmVsKCkgPT09ICdwLWVtcHR5bGFiZWwnIHx8IHRoaXMubGFiZWwoKS5sZW5ndGggPT09IDApXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0IHBhbmVsQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1tdWx0aXNlbGVjdC1wYW5lbCBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1pbnB1dC1maWxsZWQnOiB0aGlzLmNvbmZpZy5pbnB1dFN0eWxlID09PSAnZmlsbGVkJyxcbiAgICAgICAgICAgICdwLXJpcHBsZS1kaXNhYmxlZCc6IHRoaXMuY29uZmlnLnJpcHBsZSA9PT0gZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXQgbGFiZWxDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLW11bHRpc2VsZWN0LWxhYmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICdwLXBsYWNlaG9sZGVyJzogdGhpcy5sYWJlbCgpID09PSB0aGlzLnBsYWNlaG9sZGVyKCkgfHwgdGhpcy5sYWJlbCgpID09PSB0aGlzLmRlZmF1bHRMYWJlbCxcbiAgICAgICAgICAgICdwLW11bHRpc2VsZWN0LWxhYmVsLWVtcHR5JzogIXRoaXMucGxhY2Vob2xkZXIoKSAmJiAhdGhpcy5kZWZhdWx0TGFiZWwgJiYgKCF0aGlzLm1vZGVsVmFsdWUoKSB8fCB0aGlzLm1vZGVsVmFsdWUoKS5sZW5ndGggPT09IDApXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0IGVtcHR5TWVzc2FnZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5TWVzc2FnZSB8fCB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuRU1QVFlfTUVTU0FHRSk7XG4gICAgfVxuXG4gICAgZ2V0IGVtcHR5RmlsdGVyTWVzc2FnZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5RmlsdGVyTWVzc2FnZSB8fCB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuRU1QVFlfRklMVEVSX01FU1NBR0UpO1xuICAgIH1cblxuICAgIGdldCBmaWxsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbFZhbHVlKCkgPT09ICdzdHJpbmcnKSByZXR1cm4gISF0aGlzLm1vZGVsVmFsdWUoKTtcblxuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLm1vZGVsVmFsdWUoKSk7XG4gICAgfVxuXG4gICAgZ2V0IGlzVmlzaWJsZUNsZWFySWNvbigpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxWYWx1ZSgpICE9IG51bGwgJiYgdGhpcy5tb2RlbFZhbHVlKCkgIT09ICcnICYmIE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5tb2RlbFZhbHVlKCkpICYmIHRoaXMuc2hvd0NsZWFyICYmICF0aGlzLmRpc2FibGVkICYmIHRoaXMuZmlsbGVkO1xuICAgIH1cblxuICAgIGdldCB0b2dnbGVBbGxBcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYVt0aGlzLmFsbFNlbGVjdGVkKCkgPyAnc2VsZWN0QWxsJyA6ICd1bnNlbGVjdEFsbCddIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCBjbG9zZUFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEgPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLmNsb3NlIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCBsaXN0TGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5BUklBKVsnbGlzdExhYmVsJ107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRBbGxWaXNpYmxlQW5kTm9uVmlzaWJsZU9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwID8gdGhpcy5mbGF0T3B0aW9ucyh0aGlzLm9wdGlvbnMpIDogdGhpcy5vcHRpb25zIHx8IFtdO1xuICAgIH1cblxuICAgIHZpc2libGVPcHRpb25zID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRBbGxWaXNpYmxlQW5kTm9uVmlzaWJsZU9wdGlvbnMoKTtcbiAgICAgICAgY29uc3QgaXNBcnJheU9mT2JqZWN0cyA9IE9iamVjdFV0aWxzLmlzQXJyYXkob3B0aW9ucykgJiYgT2JqZWN0VXRpbHMuaXNPYmplY3Qob3B0aW9uc1swXSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2ZpbHRlclZhbHVlKCkpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZE9wdGlvbnM7XG5cbiAgICAgICAgICAgIGlmIChpc0FycmF5T2ZPYmplY3RzKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyZWRPcHRpb25zID0gdGhpcy5maWx0ZXJTZXJ2aWNlLmZpbHRlcihvcHRpb25zLCB0aGlzLnNlYXJjaEZpZWxkcygpLCB0aGlzLl9maWx0ZXJWYWx1ZSgpLCB0aGlzLmZpbHRlck1hdGNoTW9kZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZE9wdGlvbnMgPSBvcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiBvcHRpb24udG9TdHJpbmcoKS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluY2x1ZGVzKHRoaXMuX2ZpbHRlclZhbHVlKCkudG9Mb2NhbGVMb3dlckNhc2UoKSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbkdyb3VwcyA9IHRoaXMub3B0aW9ucyB8fCBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IFtdO1xuXG4gICAgICAgICAgICAgICAgb3B0aW9uR3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwQ2hpbGRyZW4gPSB0aGlzLmdldE9wdGlvbkdyb3VwQ2hpbGRyZW4oZ3JvdXApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZEl0ZW1zID0gZ3JvdXBDaGlsZHJlbi5maWx0ZXIoKGl0ZW0pID0+IGZpbHRlcmVkT3B0aW9ucy5pbmNsdWRlcyhpdGVtKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkSXRlbXMubGVuZ3RoID4gMCkgZmlsdGVyZWQucHVzaCh7IC4uLmdyb3VwLCBbdHlwZW9mIHRoaXMub3B0aW9uR3JvdXBDaGlsZHJlbiA9PT0gJ3N0cmluZycgPyB0aGlzLm9wdGlvbkdyb3VwQ2hpbGRyZW4gOiAnaXRlbXMnXTogWy4uLmZpbHRlcmVkSXRlbXNdIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmxhdE9wdGlvbnMoZmlsdGVyZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWRPcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH0pO1xuXG4gICAgbGFiZWwgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIGxldCBsYWJlbDtcbiAgICAgICAgY29uc3QgbW9kZWxWYWx1ZSA9IHRoaXMubW9kZWxWYWx1ZSgpO1xuXG4gICAgICAgIGlmIChtb2RlbFZhbHVlICYmIG1vZGVsVmFsdWUubGVuZ3RoICYmIHRoaXMuZGlzcGxheVNlbGVjdGVkTGFiZWwpIHtcbiAgICAgICAgICAgIGlmIChPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMubWF4U2VsZWN0ZWRMYWJlbHMpICYmIG1vZGVsVmFsdWUubGVuZ3RoID4gdGhpcy5tYXhTZWxlY3RlZExhYmVscykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFNlbGVjdGVkSXRlbXNMYWJlbCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9ICcnO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlbFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCArPSAnLCAnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgKz0gdGhpcy5nZXRMYWJlbEJ5VmFsdWUobW9kZWxWYWx1ZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGFiZWwgPSB0aGlzLnBsYWNlaG9sZGVyKCkgfHwgdGhpcy5kZWZhdWx0TGFiZWwgfHwgJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxhYmVsO1xuICAgIH0pO1xuXG4gICAgY2hpcFNlbGVjdGVkSXRlbXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMubWF4U2VsZWN0ZWRMYWJlbHMpICYmIHRoaXMubW9kZWxWYWx1ZSgpICYmIHRoaXMubW9kZWxWYWx1ZSgpLmxlbmd0aCA+IHRoaXMubWF4U2VsZWN0ZWRMYWJlbHMgPyB0aGlzLm1vZGVsVmFsdWUoKS5zbGljZSgwLCB0aGlzLm1heFNlbGVjdGVkTGFiZWxzKSA6IHRoaXMubW9kZWxWYWx1ZSgpO1xuICAgIH0pO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSwgcHVibGljIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UsIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcsIHB1YmxpYyBvdmVybGF5U2VydmljZTogT3ZlcmxheVNlcnZpY2UpIHtcbiAgICAgICAgZWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsVmFsdWUgPSB0aGlzLm1vZGVsVmFsdWUoKTtcblxuICAgICAgICAgICAgY29uc3QgdmlzaWJsZU9wdGlvbnMgPSB0aGlzLnZpc2libGVPcHRpb25zKCk7XG4gICAgICAgICAgICBpZiAodmlzaWJsZU9wdGlvbnMgJiYgT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh2aXNpYmxlT3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25WYWx1ZSAmJiB0aGlzLm9wdGlvbkxhYmVsICYmIG1vZGVsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSB2aXNpYmxlT3B0aW9ucy5maWx0ZXIoKG9wdGlvbikgPT4gbW9kZWxWYWx1ZS5pbmNsdWRlcyhvcHRpb25bdGhpcy5vcHRpb25MYWJlbF0pIHx8IG1vZGVsVmFsdWUuaW5jbHVkZXMob3B0aW9uW3RoaXMub3B0aW9uVmFsdWVdKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBtb2RlbFZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQgfHwgVW5pcXVlQ29tcG9uZW50SWQoKTtcbiAgICAgICAgdGhpcy5hdXRvVXBkYXRlTW9kZWwoKTtcblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJCeSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGZpbHRlcjogKHZhbHVlKSA9PiB0aGlzLm9uRmlsdGVySW5wdXRDaGFuZ2UodmFsdWUpLFxuICAgICAgICAgICAgICAgIHJlc2V0OiAoKSA9PiB0aGlzLnJlc2V0RmlsdGVyKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYXhTZWxlY3Rpb25MaW1pdFJlYWNoZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbkxpbWl0ICYmIHRoaXMubW9kZWxWYWx1ZSgpICYmIHRoaXMubW9kZWxWYWx1ZSgpLmxlbmd0aCA9PT0gdGhpcy5zZWxlY3Rpb25MaW1pdDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzZWxlY3RlZEl0ZW1zJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbHRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VtcHR5ZmlsdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eUZpbHRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wdHlUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY2hlY2tpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZmlsdGVyaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVySWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmV0b2tlbmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVRva2VuSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjbG9zZWljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjbGVhcmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFySWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdkcm9wZG93bmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpZXdDaGlsZD8uYWxpZ25PdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZsYXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIChvcHRpb25zIHx8IFtdKS5yZWR1Y2UoKHJlc3VsdCwgb3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goeyBvcHRpb25Hcm91cDogb3B0aW9uLCBncm91cDogdHJ1ZSwgaW5kZXggfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkdyb3VwQ2hpbGRyZW4gPSB0aGlzLmdldE9wdGlvbkdyb3VwQ2hpbGRyZW4ob3B0aW9uKTtcblxuICAgICAgICAgICAgb3B0aW9uR3JvdXBDaGlsZHJlbiAmJiBvcHRpb25Hcm91cENoaWxkcmVuLmZvckVhY2goKG8pID0+IHJlc3VsdC5wdXNoKG8pKTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGF1dG9VcGRhdGVNb2RlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0T25Gb2N1cyAmJiB0aGlzLmF1dG9PcHRpb25Gb2N1cyAmJiAhdGhpcy5oYXNTZWxlY3RlZE9wdGlvbigpKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQodGhpcy5maW5kRmlyc3RGb2N1c2VkT3B0aW9uSW5kZXgoKSk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0T3B0aW9uVmFsdWUodGhpcy52aXNpYmxlT3B0aW9ucygpW3RoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCldKTtcbiAgICAgICAgICAgIHRoaXMub25PcHRpb25TZWxlY3QoeyBvcmlnaW5hbEV2ZW50OiBudWxsLCBvcHRpb246IFt2YWx1ZV0gfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBtb2RlbCB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgTWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZU1vZGVsKHZhbHVlLCBldmVudD8pIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodmFsdWUpO1xuICAgICAgICB0aGlzLm1vZGVsVmFsdWUuc2V0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBvbklucHV0Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG4gICAgfVxuXG4gICAgb25PcHRpb25TZWxlY3QoZXZlbnQsIGlzRm9jdXMgPSBmYWxzZSwgaW5kZXggPSAtMSkge1xuICAgICAgICBjb25zdCB7IG9yaWdpbmFsRXZlbnQsIG9wdGlvbiB9ID0gZXZlbnQ7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMuaXNPcHRpb25EaXNhYmxlZChvcHRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLmlzU2VsZWN0ZWQob3B0aW9uKTtcbiAgICAgICAgbGV0IHZhbHVlID0gbnVsbDtcblxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5tb2RlbFZhbHVlKCkuZmlsdGVyKCh2YWwpID0+ICFPYmplY3RVdGlscy5lcXVhbHModmFsLCB0aGlzLmdldE9wdGlvblZhbHVlKG9wdGlvbiksIHRoaXMuZXF1YWxpdHlLZXkoKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUgPSBbLi4uKHRoaXMubW9kZWxWYWx1ZSgpIHx8IFtdKSwgdGhpcy5nZXRPcHRpb25WYWx1ZShvcHRpb24pXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwodmFsdWUsIG9yaWdpbmFsRXZlbnQpO1xuICAgICAgICBpbmRleCAhPT0gLTEgJiYgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KGluZGV4KTtcblxuICAgICAgICBpc0ZvY3VzICYmIERvbUhhbmRsZXIuZm9jdXModGhpcy5mb2N1c0lucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBpdGVtVmFsdWU6IG9wdGlvblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmaW5kU2VsZWN0ZWRPcHRpb25JbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2VsZWN0ZWRPcHRpb24oKSA/IHRoaXMudmlzaWJsZU9wdGlvbnMoKS5maW5kSW5kZXgoKG9wdGlvbikgPT4gdGhpcy5pc1ZhbGlkU2VsZWN0ZWRPcHRpb24ob3B0aW9uKSkgOiAtMTtcbiAgICB9XG5cbiAgICBvbk9wdGlvblNlbGVjdFJhbmdlKGV2ZW50LCBzdGFydCA9IC0xLCBlbmQgPSAtMSkge1xuICAgICAgICBzdGFydCA9PT0gLTEgJiYgKHN0YXJ0ID0gdGhpcy5maW5kTmVhcmVzdFNlbGVjdGVkT3B0aW9uSW5kZXgoZW5kLCB0cnVlKSk7XG4gICAgICAgIGVuZCA9PT0gLTEgJiYgKGVuZCA9IHRoaXMuZmluZE5lYXJlc3RTZWxlY3RlZE9wdGlvbkluZGV4KHN0YXJ0KSk7XG5cbiAgICAgICAgaWYgKHN0YXJ0ICE9PSAtMSAmJiBlbmQgIT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCByYW5nZVN0YXJ0ID0gTWF0aC5taW4oc3RhcnQsIGVuZCk7XG4gICAgICAgICAgICBjb25zdCByYW5nZUVuZCA9IE1hdGgubWF4KHN0YXJ0LCBlbmQpO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnZpc2libGVPcHRpb25zKClcbiAgICAgICAgICAgICAgICAuc2xpY2UocmFuZ2VTdGFydCwgcmFuZ2VFbmQgKyAxKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbikgPT4gdGhpcy5pc1ZhbGlkT3B0aW9uKG9wdGlvbikpXG4gICAgICAgICAgICAgICAgLm1hcCgob3B0aW9uKSA9PiB0aGlzLmdldE9wdGlvblZhbHVlKG9wdGlvbikpO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHZhbHVlLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWFyY2hGaWVsZHMoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5maWx0ZXJCeSB8fCB0aGlzLm9wdGlvbkxhYmVsIHx8ICdsYWJlbCcpLnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgZmluZE5lYXJlc3RTZWxlY3RlZE9wdGlvbkluZGV4KGluZGV4LCBmaXJzdENoZWNrVXAgPSBmYWxzZSkge1xuICAgICAgICBsZXQgbWF0Y2hlZE9wdGlvbkluZGV4ID0gLTE7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzU2VsZWN0ZWRPcHRpb24oKSkge1xuICAgICAgICAgICAgaWYgKGZpcnN0Q2hlY2tVcCkge1xuICAgICAgICAgICAgICAgIG1hdGNoZWRPcHRpb25JbmRleCA9IHRoaXMuZmluZFByZXZTZWxlY3RlZE9wdGlvbkluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgICBtYXRjaGVkT3B0aW9uSW5kZXggPSBtYXRjaGVkT3B0aW9uSW5kZXggPT09IC0xID8gdGhpcy5maW5kTmV4dFNlbGVjdGVkT3B0aW9uSW5kZXgoaW5kZXgpIDogbWF0Y2hlZE9wdGlvbkluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYXRjaGVkT3B0aW9uSW5kZXggPSB0aGlzLmZpbmROZXh0U2VsZWN0ZWRPcHRpb25JbmRleChpbmRleCk7XG4gICAgICAgICAgICAgICAgbWF0Y2hlZE9wdGlvbkluZGV4ID0gbWF0Y2hlZE9wdGlvbkluZGV4ID09PSAtMSA/IHRoaXMuZmluZFByZXZTZWxlY3RlZE9wdGlvbkluZGV4KGluZGV4KSA6IG1hdGNoZWRPcHRpb25JbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXRjaGVkT3B0aW9uSW5kZXggPiAtMSA/IG1hdGNoZWRPcHRpb25JbmRleCA6IGluZGV4O1xuICAgIH1cblxuICAgIGZpbmRQcmV2U2VsZWN0ZWRPcHRpb25JbmRleChpbmRleCkge1xuICAgICAgICBjb25zdCBtYXRjaGVkT3B0aW9uSW5kZXggPSB0aGlzLmhhc1NlbGVjdGVkT3B0aW9uKCkgJiYgaW5kZXggPiAwID8gT2JqZWN0VXRpbHMuZmluZExhc3RJbmRleCh0aGlzLnZpc2libGVPcHRpb25zKCkuc2xpY2UoMCwgaW5kZXgpLCAob3B0aW9uKSA9PiB0aGlzLmlzVmFsaWRTZWxlY3RlZE9wdGlvbihvcHRpb24pKSA6IC0xO1xuXG4gICAgICAgIHJldHVybiBtYXRjaGVkT3B0aW9uSW5kZXggPiAtMSA/IG1hdGNoZWRPcHRpb25JbmRleCA6IC0xO1xuICAgIH1cblxuICAgIGZpbmRGaXJzdEZvY3VzZWRPcHRpb25JbmRleCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHRoaXMuZmluZEZpcnN0U2VsZWN0ZWRPcHRpb25JbmRleCgpO1xuXG4gICAgICAgIHJldHVybiBzZWxlY3RlZEluZGV4IDwgMCA/IHRoaXMuZmluZEZpcnN0T3B0aW9uSW5kZXgoKSA6IHNlbGVjdGVkSW5kZXg7XG4gICAgfVxuXG4gICAgZmluZEZpcnN0T3B0aW9uSW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVPcHRpb25zKCkuZmluZEluZGV4KChvcHRpb24pID0+IHRoaXMuaXNWYWxpZE9wdGlvbihvcHRpb24pKTtcbiAgICB9XG5cbiAgICBmaW5kRmlyc3RTZWxlY3RlZE9wdGlvbkluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNTZWxlY3RlZE9wdGlvbigpID8gdGhpcy52aXNpYmxlT3B0aW9ucygpLmZpbmRJbmRleCgob3B0aW9uKSA9PiB0aGlzLmlzVmFsaWRTZWxlY3RlZE9wdGlvbihvcHRpb24pKSA6IC0xO1xuICAgIH1cblxuICAgIGZpbmROZXh0U2VsZWN0ZWRPcHRpb25JbmRleChpbmRleCkge1xuICAgICAgICBjb25zdCBtYXRjaGVkT3B0aW9uSW5kZXggPVxuICAgICAgICAgICAgdGhpcy5oYXNTZWxlY3RlZE9wdGlvbigpICYmIGluZGV4IDwgdGhpcy52aXNpYmxlT3B0aW9ucygpLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICA/IHRoaXMudmlzaWJsZU9wdGlvbnMoKVxuICAgICAgICAgICAgICAgICAgICAgIC5zbGljZShpbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgLmZpbmRJbmRleCgob3B0aW9uKSA9PiB0aGlzLmlzVmFsaWRTZWxlY3RlZE9wdGlvbihvcHRpb24pKVxuICAgICAgICAgICAgICAgIDogLTE7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWRPcHRpb25JbmRleCA+IC0xID8gbWF0Y2hlZE9wdGlvbkluZGV4ICsgaW5kZXggKyAxIDogLTE7XG4gICAgfVxuXG4gICAgZXF1YWxpdHlLZXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvblZhbHVlID8gbnVsbCA6IHRoaXMuZGF0YUtleTtcbiAgICB9XG5cbiAgICBoYXNTZWxlY3RlZE9wdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5tb2RlbFZhbHVlKCkpO1xuICAgIH1cblxuICAgIGlzVmFsaWRTZWxlY3RlZE9wdGlvbihvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZE9wdGlvbihvcHRpb24pICYmIHRoaXMuaXNTZWxlY3RlZChvcHRpb24pO1xuICAgIH1cblxuICAgIGlzT3B0aW9uR3JvdXAob3B0aW9uKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5ncm91cCB8fCB0aGlzLm9wdGlvbkdyb3VwTGFiZWwpICYmIG9wdGlvbi5vcHRpb25Hcm91cCAmJiBvcHRpb24uZ3JvdXA7XG4gICAgfVxuXG4gICAgaXNWYWxpZE9wdGlvbihvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbiAmJiAhKHRoaXMuaXNPcHRpb25EaXNhYmxlZChvcHRpb24pIHx8IHRoaXMuaXNPcHRpb25Hcm91cChvcHRpb24pKTtcbiAgICB9XG5cbiAgICBpc09wdGlvbkRpc2FibGVkKG9wdGlvbjogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLm1heFNlbGVjdGlvbkxpbWl0UmVhY2hlZCgpICYmICF0aGlzLmlzU2VsZWN0ZWQob3B0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uRGlzYWJsZWQgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbiwgdGhpcy5vcHRpb25EaXNhYmxlZCkgOiBvcHRpb24gJiYgb3B0aW9uLmRpc2FibGVkICE9PSB1bmRlZmluZWQgPyBvcHRpb24uZGlzYWJsZWQgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKG9wdGlvbikge1xuICAgICAgICBjb25zdCBvcHRpb25WYWx1ZSA9IHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKTtcbiAgICAgICAgcmV0dXJuICh0aGlzLm1vZGVsVmFsdWUoKSB8fCBbXSkuc29tZSgodmFsdWUpID0+IE9iamVjdFV0aWxzLmVxdWFscyh2YWx1ZSwgb3B0aW9uVmFsdWUsIHRoaXMuZXF1YWxpdHlLZXkoKSkpO1xuICAgIH1cblxuICAgIGlzT3B0aW9uTWF0Y2hlZChvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZE9wdGlvbihvcHRpb24pICYmIHRoaXMuZ2V0T3B0aW9uTGFiZWwob3B0aW9uKS50b1N0cmluZygpLnRvTG9jYWxlTG93ZXJDYXNlKHRoaXMuZmlsdGVyTG9jYWxlKS5zdGFydHNXaXRoKHRoaXMuc2VhcmNoVmFsdWUudG9Mb2NhbGVMb3dlckNhc2UodGhpcy5maWx0ZXJMb2NhbGUpKTtcbiAgICB9XG5cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuX29wdGlvbnMoKSB8fCAodGhpcy52aXNpYmxlT3B0aW9ucygpICYmIHRoaXMudmlzaWJsZU9wdGlvbnMoKS5sZW5ndGggPT09IDApO1xuICAgIH1cblxuICAgIGdldE9wdGlvbkluZGV4KGluZGV4LCBzY3JvbGxlck9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlydHVhbFNjcm9sbGVyRGlzYWJsZWQgPyBpbmRleCA6IHNjcm9sbGVyT3B0aW9ucyAmJiBzY3JvbGxlck9wdGlvbnMuZ2V0SXRlbU9wdGlvbnMoaW5kZXgpWydpbmRleCddO1xuICAgIH1cblxuICAgIGdldEFyaWFQb3NJbnNldChpbmRleCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKHRoaXMub3B0aW9uR3JvdXBMYWJlbFxuICAgICAgICAgICAgICAgID8gaW5kZXggLVxuICAgICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9ucygpXG4gICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsIGluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbikgPT4gdGhpcy5pc09wdGlvbkdyb3VwKG9wdGlvbikpLmxlbmd0aFxuICAgICAgICAgICAgICAgIDogaW5kZXgpICsgMVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldCBhcmlhU2V0U2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZU9wdGlvbnMoKS5maWx0ZXIoKG9wdGlvbikgPT4gIXRoaXMuaXNPcHRpb25Hcm91cChvcHRpb24pKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0TGFiZWxCeVZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdyb3VwID8gdGhpcy5mbGF0T3B0aW9ucyh0aGlzLl9vcHRpb25zKCkpIDogdGhpcy5fb3B0aW9ucygpIHx8IFtdO1xuICAgICAgICBjb25zdCBtYXRjaGVkT3B0aW9uID0gb3B0aW9ucy5maW5kKChvcHRpb24pID0+ICF0aGlzLmlzT3B0aW9uR3JvdXAob3B0aW9uKSAmJiBPYmplY3RVdGlscy5lcXVhbHModGhpcy5nZXRPcHRpb25WYWx1ZShvcHRpb24pLCB2YWx1ZSwgdGhpcy5lcXVhbGl0eUtleSgpKSk7XG4gICAgICAgIHJldHVybiBtYXRjaGVkT3B0aW9uID8gdGhpcy5nZXRPcHRpb25MYWJlbChtYXRjaGVkT3B0aW9uKSA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRJdGVtc0xhYmVsKCkge1xuICAgICAgICBsZXQgcGF0dGVybiA9IC97KC4qPyl9LztcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB0aGlzLnNlbGVjdGVkSXRlbXNMYWJlbCA/IHRoaXMuc2VsZWN0ZWRJdGVtc0xhYmVsIDogdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLlNFTEVDVElPTl9NRVNTQUdFKTtcblxuICAgICAgICBpZiAocGF0dGVybi50ZXN0KG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBsYWNlKG1lc3NhZ2UubWF0Y2gocGF0dGVybilbMF0sIHRoaXMubW9kZWxWYWx1ZSgpLmxlbmd0aCArICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH1cblxuICAgIGdldE9wdGlvbkxhYmVsKG9wdGlvbjogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbkxhYmVsID8gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShvcHRpb24sIHRoaXMub3B0aW9uTGFiZWwpIDogb3B0aW9uICYmIG9wdGlvbi5sYWJlbCAhPSB1bmRlZmluZWQgPyBvcHRpb24ubGFiZWwgOiBvcHRpb247XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uVmFsdWUob3B0aW9uOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uVmFsdWUgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbiwgdGhpcy5vcHRpb25WYWx1ZSkgOiAhdGhpcy5vcHRpb25MYWJlbCAmJiBvcHRpb24gJiYgb3B0aW9uLnZhbHVlICE9PSB1bmRlZmluZWQgPyBvcHRpb24udmFsdWUgOiBvcHRpb247XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uR3JvdXBMYWJlbChvcHRpb25Hcm91cDogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbkdyb3VwTGFiZWwgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbkdyb3VwLCB0aGlzLm9wdGlvbkdyb3VwTGFiZWwpIDogb3B0aW9uR3JvdXAgJiYgb3B0aW9uR3JvdXAubGFiZWwgIT0gdW5kZWZpbmVkID8gb3B0aW9uR3JvdXAubGFiZWwgOiBvcHRpb25Hcm91cDtcbiAgICB9XG5cbiAgICBnZXRPcHRpb25Hcm91cENoaWxkcmVuKG9wdGlvbkdyb3VwOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uR3JvdXBDaGlsZHJlbiA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEob3B0aW9uR3JvdXAsIHRoaXMub3B0aW9uR3JvdXBDaGlsZHJlbikgOiBvcHRpb25Hcm91cC5pdGVtcztcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXRhS2V5ID0gZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5O1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dEb3duS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93VXBLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSG9tZUtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVuZEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uUGFnZURvd25LZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgIHRoaXMub25QYWdlVXBLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVudGVyS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXNjYXBlS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnU2hpZnRMZWZ0JzpcbiAgICAgICAgICAgIGNhc2UgJ1NoaWZ0UmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25TaGlmdEtleSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSAnS2V5QScgJiYgbWV0YUtleSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmlzaWJsZU9wdGlvbnMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigob3B0aW9uKSA9PiB0aGlzLmlzVmFsaWRPcHRpb24ob3B0aW9uKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKG9wdGlvbikgPT4gdGhpcy5nZXRPcHRpb25WYWx1ZShvcHRpb24pKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHZhbHVlLCBldmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFtZXRhS2V5ICYmIE9iamVjdFV0aWxzLmlzUHJpbnRhYmxlQ2hhcmFjdGVyKGV2ZW50LmtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgIXRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoT3B0aW9ucyhldmVudCwgZXZlbnQua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRmlsdGVyS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93RG93bktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1VwS2V5KGV2ZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0xlZnRLZXkoZXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSG9tZUtleShldmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVuZEtleShldmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGNhc2UgJ051bXBhZEVudGVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRW50ZXJLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25Fc2NhcGVLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJLZXkoZXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BcnJvd0xlZnRLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIHByZXNzZWRJbklucHV0VGV4dDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHByZXNzZWRJbklucHV0VGV4dCAmJiB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQoLTEpO1xuICAgIH1cblxuICAgIG9uQXJyb3dEb3duS2V5KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbkluZGV4ID0gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEgPyB0aGlzLmZpbmROZXh0T3B0aW9uSW5kZXgodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSkgOiB0aGlzLmZpbmRGaXJzdEZvY3VzZWRPcHRpb25JbmRleCgpO1xuXG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgdGhpcy5vbk9wdGlvblNlbGVjdFJhbmdlKGV2ZW50LCB0aGlzLnN0YXJ0UmFuZ2VJbmRleCgpLCBvcHRpb25JbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChldmVudCwgb3B0aW9uSW5kZXgpO1xuICAgICAgICAhdGhpcy5vdmVybGF5VmlzaWJsZSAmJiB0aGlzLnNob3coKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgb25BcnJvd1VwS2V5KGV2ZW50LCBwcmVzc2VkSW5JbnB1dFRleHQgPSBmYWxzZSkge1xuICAgICAgICBpZiAoZXZlbnQuYWx0S2V5ICYmICFwcmVzc2VkSW5JbnB1dFRleHQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25PcHRpb25TZWxlY3QoZXZlbnQsIHRoaXMudmlzaWJsZU9wdGlvbnMoKVt0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uSW5kZXggPSB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpICE9PSAtMSA/IHRoaXMuZmluZFByZXZPcHRpb25JbmRleCh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpKSA6IHRoaXMuZmluZExhc3RGb2N1c2VkT3B0aW9uSW5kZXgoKTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvblNlbGVjdFJhbmdlKGV2ZW50LCBvcHRpb25JbmRleCwgdGhpcy5zdGFydFJhbmdlSW5kZXgoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KGV2ZW50LCBvcHRpb25JbmRleCk7XG5cbiAgICAgICAgICAgICF0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBvbkhvbWVLZXkoZXZlbnQsIHByZXNzZWRJbklucHV0VGV4dCA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHsgY3VycmVudFRhcmdldCB9ID0gZXZlbnQ7XG5cbiAgICAgICAgaWYgKHByZXNzZWRJbklucHV0VGV4dCkge1xuICAgICAgICAgICAgY29uc3QgbGVuID0gY3VycmVudFRhcmdldC52YWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgZXZlbnQuc2hpZnRLZXkgPyBsZW4gOiAwKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbWV0YUtleSA9IGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleTtcbiAgICAgICAgICAgIGxldCBvcHRpb25JbmRleCA9IHRoaXMuZmluZEZpcnN0T3B0aW9uSW5kZXgoKTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIG1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3B0aW9uU2VsZWN0UmFuZ2UoZXZlbnQsIG9wdGlvbkluZGV4LCB0aGlzLnN0YXJ0UmFuZ2VJbmRleCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkT3B0aW9uSW5kZXgoZXZlbnQsIG9wdGlvbkluZGV4KTtcblxuICAgICAgICAgICAgIXRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRW5kS2V5KGV2ZW50LCBwcmVzc2VkSW5JbnB1dFRleHQgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB7IGN1cnJlbnRUYXJnZXQgfSA9IGV2ZW50O1xuXG4gICAgICAgIGlmIChwcmVzc2VkSW5JbnB1dFRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IGN1cnJlbnRUYXJnZXQudmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgY3VycmVudFRhcmdldC5zZXRTZWxlY3Rpb25SYW5nZShldmVudC5zaGlmdEtleSA/IDAgOiBsZW4sIGxlbik7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQoLTEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG1ldGFLZXkgPSBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXk7XG4gICAgICAgICAgICBsZXQgb3B0aW9uSW5kZXggPSB0aGlzLmZpbmRMYXN0Rm9jdXNlZE9wdGlvbkluZGV4KCk7XG5cbiAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSAmJiBtZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvblNlbGVjdFJhbmdlKGV2ZW50LCB0aGlzLnN0YXJ0UmFuZ2VJbmRleCgpLCBvcHRpb25JbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KGV2ZW50LCBvcHRpb25JbmRleCk7XG5cbiAgICAgICAgICAgICF0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblBhZ2VEb3duS2V5KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsSW5WaWV3KHRoaXMudmlzaWJsZU9wdGlvbnMoKS5sZW5ndGggLSAxKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblBhZ2VVcEtleShldmVudCkge1xuICAgICAgICB0aGlzLnNjcm9sbEluVmlldygwKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkVudGVyS2V5KGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5vbkFycm93RG93bktleShldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvblNlbGVjdFJhbmdlKGV2ZW50LCB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uT3B0aW9uU2VsZWN0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG9wdGlvbjogdGhpcy52aXNpYmxlT3B0aW9ucygpW3RoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCldIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25Fc2NhcGVLZXkoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSAmJiB0aGlzLmhpZGUodHJ1ZSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25EZWxldGVLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd0NsZWFyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKGV2ZW50KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRhYktleShldmVudCwgcHJlc3NlZEluSW5wdXRUZXh0ID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFwcmVzc2VkSW5JbnB1dFRleHQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuaGFzRm9jdXNhYmxlRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuZm9jdXMoZXZlbnQuc2hpZnRLZXkgPyB0aGlzLmxhc3RIaWRkZW5Gb2N1c2FibGVFbGVtZW50T25PdmVybGF5Lm5hdGl2ZUVsZW1lbnQgOiB0aGlzLmZpcnN0SGlkZGVuRm9jdXNhYmxlRWxlbWVudE9uT3ZlcmxheS5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uT3B0aW9uU2VsZWN0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG9wdGlvbjogdGhpcy52aXNpYmxlT3B0aW9ucygpW3RoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCldIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5oaWRlKHRoaXMuZmlsdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2hpZnRLZXkoKSB7XG4gICAgICAgIHRoaXMuc3RhcnRSYW5nZUluZGV4LnNldCh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpKTtcbiAgICB9XG5cbiAgICBvbkNvbnRhaW5lckNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5yZWFkb25seSB8fCAoZXZlbnQudGFyZ2V0IGFzIE5vZGUpLmlzU2FtZU5vZGUodGhpcy5mb2N1c0lucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnIHx8IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGMtc2VjdGlvbicpID09PSAnY2xlYXJpY29uJyB8fCBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcGMtc2VjdGlvbj1cImNsZWFyaWNvblwiXScpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm92ZXJsYXlWaWV3Q2hpbGQgfHwgIXRoaXMub3ZlcmxheVZpZXdDaGlsZC5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNsaWNrSW5Qcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jbGlja0luUHJvZ3Jlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMTUwKTtcblxuICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA/IHRoaXMuaGlkZSh0cnVlKSA6IHRoaXMuc2hvdyh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvY3VzSW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICAgICAgICB0aGlzLm9uQ2xpY2suZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIG9uRmlyc3RIaWRkZW5Gb2N1cyhldmVudCkge1xuICAgICAgICBjb25zdCBmb2N1c2FibGVFbCA9XG4gICAgICAgICAgICBldmVudC5yZWxhdGVkVGFyZ2V0ID09PSB0aGlzLmZvY3VzSW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgICAgICA/IERvbUhhbmRsZXIuZ2V0Rmlyc3RGb2N1c2FibGVFbGVtZW50KHRoaXMub3ZlcmxheVZpZXdDaGlsZD8ub3ZlcmxheVZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCwgJzpub3QoW2RhdGEtcC1oaWRkZW4tZm9jdXNhYmxlPVwidHJ1ZVwiXSknKVxuICAgICAgICAgICAgICAgIDogdGhpcy5mb2N1c0lucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIERvbUhhbmRsZXIuZm9jdXMoZm9jdXNhYmxlRWwpO1xuICAgIH1cblxuICAgIG9uSW5wdXRGb2N1cyhldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgZm9jdXNlZE9wdGlvbkluZGV4ID0gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEgPyB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpIDogdGhpcy5vdmVybGF5VmlzaWJsZSAmJiB0aGlzLmF1dG9PcHRpb25Gb2N1cyA/IHRoaXMuZmluZEZpcnN0Rm9jdXNlZE9wdGlvbkluZGV4KCkgOiAtMTtcbiAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KGZvY3VzZWRPcHRpb25JbmRleCk7XG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5zY3JvbGxJblZpZXcodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSk7XG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQgfSk7XG4gICAgfVxuXG4gICAgb25JbnB1dEJsdXIoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uQmx1ci5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQgfSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnByZXZlbnRNb2RlbFRvdWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZXZlbnRNb2RlbFRvdWNoZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkZpbHRlcklucHV0Q2hhbmdlKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgdGhpcy5fZmlsdGVyVmFsdWUuc2V0KHZhbHVlKTtcbiAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KC0xKTtcbiAgICAgICAgdGhpcy5vbkZpbHRlci5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGZpbHRlcjogdGhpcy5fZmlsdGVyVmFsdWUoKSB9KTtcblxuICAgICAgICAhdGhpcy52aXJ0dWFsU2Nyb2xsZXJEaXNhYmxlZCAmJiB0aGlzLnNjcm9sbGVyLnNjcm9sbFRvSW5kZXgoMCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5Vmlld0NoaWxkLmFsaWduT3ZlcmxheSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkxhc3RIaWRkZW5Gb2N1cyhldmVudCkge1xuICAgICAgICBjb25zdCBmb2N1c2FibGVFbCA9XG4gICAgICAgICAgICBldmVudC5yZWxhdGVkVGFyZ2V0ID09PSB0aGlzLmZvY3VzSW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgICAgICA/IERvbUhhbmRsZXIuZ2V0TGFzdEZvY3VzYWJsZUVsZW1lbnQodGhpcy5vdmVybGF5Vmlld0NoaWxkPy5vdmVybGF5Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LCAnOm5vdChbZGF0YS1wLWhpZGRlbi1mb2N1c2FibGU9XCJ0cnVlXCJdKScpXG4gICAgICAgICAgICAgICAgOiB0aGlzLmZvY3VzSW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgRG9tSGFuZGxlci5mb2N1cyhmb2N1c2FibGVFbCk7XG4gICAgfVxuXG4gICAgb25PcHRpb25Nb3VzZUVudGVyKGV2ZW50LCBpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5mb2N1c09uSG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KGV2ZW50LCBpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkhlYWRlckNoZWNrYm94S2V5RG93bihldmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblRvZ2dsZUFsbChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5vblRvZ2dsZUFsbChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25GaWx0ZXJCbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG4gICAgfVxuXG4gICAgb25IZWFkZXJDaGVja2JveEZvY3VzKCkge1xuICAgICAgICB0aGlzLmhlYWRlckNoZWNrYm94Rm9jdXMgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uSGVhZGVyQ2hlY2tib3hCbHVyKCkge1xuICAgICAgICB0aGlzLmhlYWRlckNoZWNrYm94Rm9jdXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvblRvZ2dsZUFsbChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWxlY3RBbGwgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdEFsbENoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBjaGVja2VkOiAhdGhpcy5hbGxTZWxlY3RlZCgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHByZS1zZWxlY3RlZCBkaXNhYmxlZCBvcHRpb25zIHNob3VsZCBhbHdheXMgYmUgc2VsZWN0ZWQuXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZERpc2FibGVkT3B0aW9ucyA9IHRoaXMuZ2V0QWxsVmlzaWJsZUFuZE5vblZpc2libGVPcHRpb25zKCkuZmlsdGVyKFxuICAgICAgICAgICAgICAgIChvcHRpb24pID0+IHRoaXMuaXNTZWxlY3RlZChvcHRpb24pICYmICh0aGlzLm9wdGlvbkRpc2FibGVkID8gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShvcHRpb24sIHRoaXMub3B0aW9uRGlzYWJsZWQpIDogb3B0aW9uICYmIG9wdGlvbi5kaXNhYmxlZCAhPT0gdW5kZWZpbmVkID8gb3B0aW9uLmRpc2FibGVkIDogZmFsc2UpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCB2aXNpYmxlT3B0aW9ucyA9IHRoaXMuYWxsU2VsZWN0ZWQoKVxuICAgICAgICAgICAgICAgID8gdGhpcy52aXNpYmxlT3B0aW9ucygpLmZpbHRlcigob3B0aW9uKSA9PiAhdGhpcy5pc1ZhbGlkT3B0aW9uKG9wdGlvbikgJiYgdGhpcy5pc1NlbGVjdGVkKG9wdGlvbikpXG4gICAgICAgICAgICAgICAgOiB0aGlzLnZpc2libGVPcHRpb25zKCkuZmlsdGVyKChvcHRpb24pID0+IHRoaXMuaXNTZWxlY3RlZChvcHRpb24pIHx8IHRoaXMuaXNWYWxpZE9wdGlvbihvcHRpb24pKTtcblxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uVmFsdWVzID0gWy4uLnNlbGVjdGVkRGlzYWJsZWRPcHRpb25zLCAuLi52aXNpYmxlT3B0aW9uc10ubWFwKChvcHRpb24pID0+IHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKSk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IFsuLi5uZXcgU2V0KG9wdGlvblZhbHVlcyldO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHZhbHVlLCBldmVudCk7XG5cbiAgICAgICAgICAgIC8vIGJlY2F1c2Ugb25Ub2dnbGVBbGwgY291bGQgaGF2ZSBiZWVuIGNhbGxlZCBkdXJpbmcgZmlsdGVyaW5nLCB0aGlzIGFkZGl0aW9uYWwgdGVzdCBuZWVkcyB0byBiZSBwZXJmb3JtZWQgYmVmb3JlIGNhbGxpbmcgb25TZWxlY3RBbGxDaGFuZ2UuZW1pdFxuICAgICAgICAgICAgaWYgKCF2YWx1ZS5sZW5ndGggfHwgdmFsdWUubGVuZ3RoID09PSB0aGlzLmdldEFsbFZpc2libGVBbmROb25WaXNpYmxlT3B0aW9ucygpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3RBbGxDaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiAhIXZhbHVlLmxlbmd0aFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHZhbHVlOiB0aGlzLnZhbHVlIH0pO1xuICAgICAgICBEb21IYW5kbGVyLmZvY3VzKHRoaXMuaGVhZGVyQ2hlY2tib3hWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmhlYWRlckNoZWNrYm94Rm9jdXMgPSB0cnVlO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIGNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChldmVudCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkgIT09IGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQoaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxJblZpZXcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB2aXJ0dWFsU2Nyb2xsZXJEaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnZpcnR1YWxTY3JvbGw7XG4gICAgfVxuXG4gICAgc2Nyb2xsSW5WaWV3KGluZGV4ID0gLTEpIHtcbiAgICAgICAgY29uc3QgaWQgPSBpbmRleCAhPT0gLTEgPyBgJHt0aGlzLmlkfV8ke2luZGV4fWAgOiB0aGlzLmZvY3VzZWRPcHRpb25JZDtcbiAgICAgICAgaWYgKHRoaXMuaXRlbXNWaWV3Q2hpbGQgJiYgdGhpcy5pdGVtc1ZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuaXRlbXNWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgYGxpW2lkPVwiJHtpZH1cIl1gKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyAmJiBlbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JywgaW5saW5lOiAnbmVhcmVzdCcgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnZpcnR1YWxTY3JvbGxlckRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9sbCAmJiB0aGlzLnNjcm9sbGVyPy5zY3JvbGxUb0luZGV4KGluZGV4ICE9PSAtMSA/IGluZGV4IDogdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSk7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZm9jdXNlZE9wdGlvbklkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEgPyBgJHt0aGlzLmlkfV8ke3RoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCl9YCA6IG51bGw7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5tb2RlbFZhbHVlLnNldCh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBhbGxTZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0QWxsICE9PSBudWxsID8gdGhpcy5zZWxlY3RBbGwgOiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMudmlzaWJsZU9wdGlvbnMoKSkgJiYgdGhpcy52aXNpYmxlT3B0aW9ucygpLmV2ZXJ5KChvcHRpb24pID0+IHRoaXMuaXNPcHRpb25Hcm91cChvcHRpb24pIHx8IHRoaXMuaXNPcHRpb25EaXNhYmxlZChvcHRpb24pIHx8IHRoaXMuaXNTZWxlY3RlZChvcHRpb24pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5cyB0aGUgcGFuZWwuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBzaG93KGlzRm9jdXM/KSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSB0cnVlO1xuICAgICAgICBjb25zdCBmb2N1c2VkT3B0aW9uSW5kZXggPSB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpICE9PSAtMSA/IHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkgOiB0aGlzLmF1dG9PcHRpb25Gb2N1cyA/IHRoaXMuZmluZEZpcnN0Rm9jdXNlZE9wdGlvbkluZGV4KCkgOiAtMTtcbiAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KGZvY3VzZWRPcHRpb25JbmRleCk7XG5cbiAgICAgICAgaWYgKGlzRm9jdXMpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuZm9jdXModGhpcy5mb2N1c0lucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIHBhbmVsLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgaGlkZShpc0ZvY3VzPykge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMucmVzZXRGaWx0ZXJPbkhpZGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRGaWx0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vdmVybGF5T3B0aW9ucz8ubW9kZSA9PT0gJ21vZGFsJykge1xuICAgICAgICAgICAgRG9tSGFuZGxlci51bmJsb2NrQm9keVNjcm9sbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXNGb2N1cyAmJiBEb21IYW5kbGVyLmZvY3VzKHRoaXMuZm9jdXNJbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMub25QYW5lbEhpZGUuZW1pdCgpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNXcmFwcGVyID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMub3ZlcmxheVZpZXdDaGlsZD8ub3ZlcmxheVZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCwgdGhpcy52aXJ0dWFsU2Nyb2xsID8gJy5wLXNjcm9sbGVyJyA6ICcucC1tdWx0aXNlbGVjdC1pdGVtcy13cmFwcGVyJyk7XG4gICAgICAgICAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsICYmIHRoaXMuc2Nyb2xsZXI/LnNldENvbnRlbnRFbCh0aGlzLml0ZW1zVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zKCkgJiYgdGhpcy5fb3B0aW9ucygpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLm1vZGVsVmFsdWUoKSkgPyB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpIDogLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbGVyPy5zY3JvbGxUb0luZGV4KHNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkTGlzdEl0ZW0gPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5pdGVtc1dyYXBwZXIsICdbZGF0YS1wLWhpZ2hsaWdodD1cInRydWVcIl0nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkTGlzdEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZExpc3RJdGVtLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JywgaW5saW5lOiAnbmVhcmVzdCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJJbnB1dENoaWxkICYmIHRoaXMuZmlsdGVySW5wdXRDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmVudE1vZGVsVG91Y2hlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b2ZvY3VzRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vblBhbmVsU2hvdy5lbWl0KCk7XG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zV3JhcHBlciA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRGaWx0ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlcklucHV0Q2hpbGQgJiYgdGhpcy5maWx0ZXJJbnB1dENoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXRDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9maWx0ZXJWYWx1ZS5zZXQobnVsbCk7XG4gICAgICAgIHRoaXMuX2ZpbHRlcmVkT3B0aW9ucyA9IG51bGw7XG4gICAgfVxuXG4gICAgY2xvc2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBjbGVhcihldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwobnVsbCwgZXZlbnQpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IG51bGw7XG4gICAgICAgIHRoaXMub25DbGVhci5lbWl0KCk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlT3B0aW9uKG9wdGlvblZhbHVlLCBldmVudCkge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLm1vZGVsVmFsdWUoKS5maWx0ZXIoKHZhbCkgPT4gIU9iamVjdFV0aWxzLmVxdWFscyh2YWwsIG9wdGlvblZhbHVlLCB0aGlzLmVxdWFsaXR5S2V5KCkpKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHZhbHVlLCBldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGl0ZW1WYWx1ZTogb3B0aW9uVmFsdWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgZmluZE5leHRJdGVtKGl0ZW06IGFueSk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGxldCBuZXh0SXRlbSA9IGl0ZW0ubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIGlmIChuZXh0SXRlbSkgcmV0dXJuIERvbUhhbmRsZXIuaGFzQ2xhc3MobmV4dEl0ZW0uY2hpbGRyZW5bMF0sICdwLWRpc2FibGVkJykgfHwgRG9tSGFuZGxlci5pc0hpZGRlbihuZXh0SXRlbS5jaGlsZHJlblswXSkgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhuZXh0SXRlbSwgJ3AtbXVsdGlzZWxlY3QtaXRlbS1ncm91cCcpID8gdGhpcy5maW5kTmV4dEl0ZW0obmV4dEl0ZW0pIDogbmV4dEl0ZW0uY2hpbGRyZW5bMF07XG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZmluZFByZXZJdGVtKGl0ZW06IGFueSk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGxldCBwcmV2SXRlbSA9IGl0ZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAocHJldkl0ZW0pIHJldHVybiBEb21IYW5kbGVyLmhhc0NsYXNzKHByZXZJdGVtLmNoaWxkcmVuWzBdLCAncC1kaXNhYmxlZCcpIHx8IERvbUhhbmRsZXIuaXNIaWRkZW4ocHJldkl0ZW0uY2hpbGRyZW5bMF0pIHx8IERvbUhhbmRsZXIuaGFzQ2xhc3MocHJldkl0ZW0sICdwLW11bHRpc2VsZWN0LWl0ZW0tZ3JvdXAnKSA/IHRoaXMuZmluZFByZXZJdGVtKHByZXZJdGVtKSA6IHByZXZJdGVtLmNoaWxkcmVuWzBdO1xuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZpbmROZXh0T3B0aW9uSW5kZXgoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlZE9wdGlvbkluZGV4ID1cbiAgICAgICAgICAgIGluZGV4IDwgdGhpcy52aXNpYmxlT3B0aW9ucygpLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICA/IHRoaXMudmlzaWJsZU9wdGlvbnMoKVxuICAgICAgICAgICAgICAgICAgICAgIC5zbGljZShpbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgLmZpbmRJbmRleCgob3B0aW9uKSA9PiB0aGlzLmlzVmFsaWRPcHRpb24ob3B0aW9uKSlcbiAgICAgICAgICAgICAgICA6IC0xO1xuICAgICAgICByZXR1cm4gbWF0Y2hlZE9wdGlvbkluZGV4ID4gLTEgPyBtYXRjaGVkT3B0aW9uSW5kZXggKyBpbmRleCArIDEgOiBpbmRleDtcbiAgICB9XG5cbiAgICBmaW5kUHJldk9wdGlvbkluZGV4KGluZGV4KSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZWRPcHRpb25JbmRleCA9IGluZGV4ID4gMCA/IE9iamVjdFV0aWxzLmZpbmRMYXN0SW5kZXgodGhpcy52aXNpYmxlT3B0aW9ucygpLnNsaWNlKDAsIGluZGV4KSwgKG9wdGlvbikgPT4gdGhpcy5pc1ZhbGlkT3B0aW9uKG9wdGlvbikpIDogLTE7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWRPcHRpb25JbmRleCA+IC0xID8gbWF0Y2hlZE9wdGlvbkluZGV4IDogaW5kZXg7XG4gICAgfVxuXG4gICAgZmluZExhc3RTZWxlY3RlZE9wdGlvbkluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNTZWxlY3RlZE9wdGlvbigpID8gT2JqZWN0VXRpbHMuZmluZExhc3RJbmRleCh0aGlzLnZpc2libGVPcHRpb25zKCksIChvcHRpb24pID0+IHRoaXMuaXNWYWxpZFNlbGVjdGVkT3B0aW9uKG9wdGlvbikpIDogLTE7XG4gICAgfVxuXG4gICAgZmluZExhc3RGb2N1c2VkT3B0aW9uSW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSB0aGlzLmZpbmRMYXN0U2VsZWN0ZWRPcHRpb25JbmRleCgpO1xuXG4gICAgICAgIHJldHVybiBzZWxlY3RlZEluZGV4IDwgMCA/IHRoaXMuZmluZExhc3RPcHRpb25JbmRleCgpIDogc2VsZWN0ZWRJbmRleDtcbiAgICB9XG5cbiAgICBmaW5kTGFzdE9wdGlvbkluZGV4KCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuZmluZExhc3RJbmRleCh0aGlzLnZpc2libGVPcHRpb25zKCksIChvcHRpb24pID0+IHRoaXMuaXNWYWxpZE9wdGlvbihvcHRpb24pKTtcbiAgICB9XG5cbiAgICBzZWFyY2hPcHRpb25zKGV2ZW50LCBjaGFyKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAodGhpcy5zZWFyY2hWYWx1ZSB8fCAnJykgKyBjaGFyO1xuXG4gICAgICAgIGxldCBvcHRpb25JbmRleCA9IC0xO1xuICAgICAgICBsZXQgbWF0Y2hlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpICE9PSAtMSkge1xuICAgICAgICAgICAgb3B0aW9uSW5kZXggPSB0aGlzLnZpc2libGVPcHRpb25zKClcbiAgICAgICAgICAgICAgICAuc2xpY2UodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSlcbiAgICAgICAgICAgICAgICAuZmluZEluZGV4KChvcHRpb24pID0+IHRoaXMuaXNPcHRpb25NYXRjaGVkKG9wdGlvbikpO1xuICAgICAgICAgICAgb3B0aW9uSW5kZXggPVxuICAgICAgICAgICAgICAgIG9wdGlvbkluZGV4ID09PSAtMVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMudmlzaWJsZU9wdGlvbnMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMCwgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmRJbmRleCgob3B0aW9uKSA9PiB0aGlzLmlzT3B0aW9uTWF0Y2hlZChvcHRpb24pKVxuICAgICAgICAgICAgICAgICAgICA6IG9wdGlvbkluZGV4ICsgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdGlvbkluZGV4ID0gdGhpcy52aXNpYmxlT3B0aW9ucygpLmZpbmRJbmRleCgob3B0aW9uKSA9PiB0aGlzLmlzT3B0aW9uTWF0Y2hlZChvcHRpb24pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbkluZGV4ID09PSAtMSAmJiB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpID09PSAtMSkge1xuICAgICAgICAgICAgb3B0aW9uSW5kZXggPSB0aGlzLmZpbmRGaXJzdEZvY3VzZWRPcHRpb25JbmRleCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkT3B0aW9uSW5kZXgoZXZlbnQsIG9wdGlvbkluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNlYXJjaFRpbWVvdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gJyc7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9LCA1MDApO1xuXG4gICAgICAgIHJldHVybiBtYXRjaGVkO1xuICAgIH1cblxuICAgIGFjdGl2YXRlRmlsdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNGaWx0ZXIoKSAmJiB0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZEdyb3VwcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG9wdGdyb3VwIG9mIHRoaXMub3B0aW9ucyBhcyBhbnlbXSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRTdWJPcHRpb25zID0gdGhpcy5maWx0ZXJTZXJ2aWNlLmZpbHRlcih0aGlzLmdldE9wdGlvbkdyb3VwQ2hpbGRyZW4ob3B0Z3JvdXApLCB0aGlzLnNlYXJjaEZpZWxkcygpLCB0aGlzLmZpbHRlclZhbHVlLCB0aGlzLmZpbHRlck1hdGNoTW9kZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWRTdWJPcHRpb25zICYmIGZpbHRlcmVkU3ViT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkR3JvdXBzLnB1c2goeyAuLi5vcHRncm91cCwgLi4ueyBbdGhpcy5vcHRpb25Hcm91cENoaWxkcmVuXTogZmlsdGVyZWRTdWJPcHRpb25zIH0gfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXJlZE9wdGlvbnMgPSBmaWx0ZXJlZEdyb3VwcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWRPcHRpb25zID0gdGhpcy5maWx0ZXJTZXJ2aWNlLmZpbHRlcih0aGlzLm9wdGlvbnMgYXMgYW55W10sIHRoaXMuc2VhcmNoRmllbGRzKCksIHRoaXMuZmlsdGVyVmFsdWUsIHRoaXMuZmlsdGVyTWF0Y2hNb2RlLCB0aGlzLmZpbHRlckxvY2FsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maWx0ZXJlZE9wdGlvbnMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzRm9jdXNhYmxlRWxlbWVudHMoKSB7XG4gICAgICAgIHJldHVybiBEb21IYW5kbGVyLmdldEZvY3VzYWJsZUVsZW1lbnRzKHRoaXMub3ZlcmxheVZpZXdDaGlsZC5vdmVybGF5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICc6bm90KFtkYXRhLXAtaGlkZGVuLWZvY3VzYWJsZT1cInRydWVcIl0pJykubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBoYXNGaWx0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJWYWx1ZSgpICYmIHRoaXMuX2ZpbHRlclZhbHVlKCkudHJpbSgpLmxlbmd0aCA+IDA7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUsIFNoYXJlZE1vZHVsZSwgVG9vbHRpcE1vZHVsZSwgUmlwcGxlTW9kdWxlLCBTY3JvbGxlck1vZHVsZSwgQXV0b0ZvY3VzTW9kdWxlLCBDaGVja0ljb24sIFNlYXJjaEljb24sIFRpbWVzQ2lyY2xlSWNvbiwgVGltZXNJY29uLCBDaGV2cm9uRG93bkljb24sIENoZWNrSWNvbl0sXG4gICAgZXhwb3J0czogW011bHRpU2VsZWN0LCBPdmVybGF5TW9kdWxlLCBTaGFyZWRNb2R1bGUsIFNjcm9sbGVyTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNdWx0aVNlbGVjdCwgTXVsdGlTZWxlY3RJdGVtXVxufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdE1vZHVsZSB7fVxuIl19