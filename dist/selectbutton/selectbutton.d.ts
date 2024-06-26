import { ChangeDetectorRef, ElementRef, EventEmitter, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { PrimeTemplate } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { SelectButtonChangeEvent, SelectButtonOptionClickEvent } from './selectbutton.interface';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
import * as i3 from "primeng/api";
import * as i4 from "primeng/autofocus";
export declare const SELECTBUTTON_VALUE_ACCESSOR: any;
/**
 * SelectButton is used to choose single or multiple items from a list using buttons.
 * @group Components
 */
export declare class SelectButton implements ControlValueAccessor {
    cd: ChangeDetectorRef;
    /**
     * An array of selectitems to display as the available options.
     * @group Props
     */
    options: any[] | undefined;
    /**
     * Name of the label field of an option.
     * @group Props
     */
    optionLabel: string | undefined;
    /**
     * Name of the value field of an option.
     * @group Props
     */
    optionValue: string | undefined;
    /**
     * Name of the disabled field of an option.
     * @group Props
     */
    optionDisabled: string | undefined;
    /**
     * Whether selection can be cleared.
     * @group Props
     */
    unselectable: boolean;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex: number;
    /**
     * When specified, allows selecting multiple values.
     * @group Props
     */
    multiple: boolean | undefined;
    /**
     * Whether selection can not be cleared.
     * @group Props
     */
    allowEmpty: boolean;
    /**
     * Inline style of the component.
     * @group Props
     */
    style: any;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy: string | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled: boolean | undefined;
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    dataKey: string | undefined;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus: boolean | undefined;
    /**
     * Callback to invoke on input click.
     * @param {SelectButtonOptionClickEvent} event - Custom click event.
     * @group Emits
     */
    onOptionClick: EventEmitter<SelectButtonOptionClickEvent>;
    /**
     * Callback to invoke on selection change.
     * @param {SelectButtonChangeEvent} event - Custom change event.
     * @group Emits
     */
    onChange: EventEmitter<SelectButtonChangeEvent>;
    container: Nullable<ElementRef>;
    itemTemplate: PrimeTemplate;
    get selectButtonTemplate(): TemplateRef<any>;
    get equalityKey(): string;
    value: any;
    onModelChange: Function;
    onModelTouched: Function;
    focusedIndex: number;
    constructor(cd: ChangeDetectorRef);
    getOptionLabel(option: any): any;
    getOptionValue(option: any): any;
    isOptionDisabled(option: any): any;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onOptionSelect(event: any, option: any, index: any): void;
    onKeyDown(event: any, option: any, index: any): void;
    changeTabIndexes(event: any, direction: any): void;
    onFocus(event: Event, index: number): void;
    onBlur(): void;
    removeOption(option: any): void;
    isSelected(option: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectButton, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectButton, "p-selectButton", never, { "options": { "alias": "options"; "required": false; }; "optionLabel": { "alias": "optionLabel"; "required": false; }; "optionValue": { "alias": "optionValue"; "required": false; }; "optionDisabled": { "alias": "optionDisabled"; "required": false; }; "unselectable": { "alias": "unselectable"; "required": false; }; "tabindex": { "alias": "tabindex"; "required": false; }; "multiple": { "alias": "multiple"; "required": false; }; "allowEmpty": { "alias": "allowEmpty"; "required": false; }; "style": { "alias": "style"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; "ariaLabelledBy": { "alias": "ariaLabelledBy"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "dataKey": { "alias": "dataKey"; "required": false; }; "autofocus": { "alias": "autofocus"; "required": false; }; }, { "onOptionClick": "onOptionClick"; "onChange": "onChange"; }, ["itemTemplate"], never, false, never>;
    static ngAcceptInputType_unselectable: unknown;
    static ngAcceptInputType_tabindex: unknown;
    static ngAcceptInputType_multiple: unknown;
    static ngAcceptInputType_allowEmpty: unknown;
    static ngAcceptInputType_disabled: unknown;
    static ngAcceptInputType_autofocus: unknown;
}
export declare class SelectButtonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectButtonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SelectButtonModule, [typeof SelectButton], [typeof i1.CommonModule, typeof i2.RippleModule, typeof i3.SharedModule, typeof i4.AutoFocusModule], [typeof SelectButton, typeof i3.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SelectButtonModule>;
}
