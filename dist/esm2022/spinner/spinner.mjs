import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, booleanAttribute, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const SPINNER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Spinner),
    multi: true
};
export class Spinner {
    el;
    cd;
    onChange = new EventEmitter();
    onFocus = new EventEmitter();
    onBlur = new EventEmitter();
    min;
    max;
    maxlength;
    size;
    placeholder;
    inputId;
    disabled;
    readonly;
    tabindex;
    required;
    name;
    ariaLabelledBy;
    inputStyle;
    inputStyleClass;
    formatInput;
    decimalSeparator;
    thousandSeparator;
    precision;
    value;
    _step = 1;
    formattedValue;
    onModelChange = () => { };
    onModelTouched = () => { };
    keyPattern = /[0-9\+\-]/;
    timer;
    focus;
    filled;
    negativeSeparator = '-';
    localeDecimalSeparator;
    localeThousandSeparator;
    thousandRegExp;
    calculatedPrecision;
    inputfieldViewChild;
    get step() {
        return this._step;
    }
    set step(val) {
        this._step = val;
        if (this._step != null) {
            let tokens = this.step.toString().split(/[,]|[.]/);
            this.calculatedPrecision = tokens[1] ? tokens[1].length : undefined;
        }
    }
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
    }
    ngOnInit() {
        if (this.formatInput) {
            this.localeDecimalSeparator = (1.1).toLocaleString().substring(1, 2);
            this.localeThousandSeparator = (1000).toLocaleString().substring(1, 2);
            this.thousandRegExp = new RegExp(`[${this.thousandSeparator || this.localeThousandSeparator}]`, 'gim');
            if (this.decimalSeparator && this.thousandSeparator && this.decimalSeparator === this.thousandSeparator) {
                console.warn('thousandSeparator and decimalSeparator cannot have the same value.');
            }
        }
    }
    repeat(event, interval, dir) {
        let i = interval || 500;
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(event, 40, dir);
        }, i);
        this.spin(event, dir);
    }
    spin(event, dir) {
        let step = this.step * dir;
        let currentValue;
        let precision = this.getPrecision();
        if (this.value)
            currentValue = typeof this.value === 'string' ? this.parseValue(this.value) : this.value;
        else
            currentValue = 0;
        if (precision)
            this.value = parseFloat(this.toFixed(currentValue + step, precision));
        else
            this.value = currentValue + step;
        if (this.maxlength !== undefined && this.value.toString().length > this.maxlength) {
            this.value = currentValue;
        }
        if (this.min !== undefined && this.value < this.min) {
            this.value = this.min;
        }
        if (this.max !== undefined && this.value > this.max) {
            this.value = this.max;
        }
        this.formatValue();
        this.onModelChange(this.value);
        this.onChange.emit(event);
    }
    getPrecision() {
        return this.precision === undefined ? this.calculatedPrecision : this.precision;
    }
    toFixed(value, precision) {
        let power = Math.pow(10, precision || 0);
        return String(Math.round(value * power) / power);
    }
    onUpButtonMousedown(event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, 1);
            this.updateFilledState();
            event.preventDefault();
        }
    }
    onUpButtonMouseup(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onUpButtonMouseleave(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onDownButtonMousedown(event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, -1);
            this.updateFilledState();
            event.preventDefault();
        }
    }
    onDownButtonMouseup(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onDownButtonMouseleave(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onInputKeydown(event) {
        if (event.which == 38) {
            this.spin(event, 1);
            event.preventDefault();
        }
        else if (event.which == 40) {
            this.spin(event, -1);
            event.preventDefault();
        }
    }
    onInputChange(event) {
        this.onChange.emit(event);
    }
    onInput(event) {
        this.value = this.parseValue(event.target.value);
        this.onModelChange(this.value);
        this.updateFilledState();
    }
    onInputBlur(event) {
        this.focus = false;
        this.formatValue();
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit(event);
    }
    parseValue(val) {
        let value;
        let precision = this.getPrecision();
        if (val.trim() === '') {
            value = null;
        }
        else {
            if (this.formatInput) {
                val = val.replace(this.thousandRegExp, '');
            }
            if (precision) {
                val = this.formatInput ? val.replace(this.decimalSeparator || this.localeDecimalSeparator, '.') : val.replace(',', '.');
                value = parseFloat(val);
            }
            else {
                value = parseInt(val, 10);
            }
            if (!isNaN(value)) {
                if (this.max !== null && value > this.max) {
                    value = this.max;
                }
                if (this.min !== null && value < this.min) {
                    value = this.min;
                }
            }
            else {
                value = null;
            }
        }
        return value;
    }
    formatValue() {
        let value = this.value;
        let precision = this.getPrecision();
        if (value != null) {
            if (this.formatInput) {
                value = value.toLocaleString(undefined, { maximumFractionDigits: 20 });
                if (this.decimalSeparator && this.thousandSeparator) {
                    value = value.split(this.localeDecimalSeparator);
                    if (precision && value[1]) {
                        value[1] = (this.decimalSeparator || this.localeDecimalSeparator) + value[1];
                    }
                    if (this.thousandSeparator && value[0].length > 3) {
                        value[0] = value[0].replace(new RegExp(`[${this.localeThousandSeparator}]`, 'gim'), this.thousandSeparator);
                    }
                    value = value.join('');
                }
            }
            this.formattedValue = value.toString();
        }
        else {
            this.formattedValue = null;
        }
        if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
            this.inputfieldViewChild.nativeElement.value = this.formattedValue;
        }
    }
    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    writeValue(value) {
        this.value = value;
        this.formatValue();
        this.updateFilledState();
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
    updateFilledState() {
        this.filled = this.value !== undefined && this.value != null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Spinner, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: Spinner, selector: "p-spinner", inputs: { min: ["min", "min", numberAttribute], max: ["max", "max", numberAttribute], maxlength: ["maxlength", "maxlength", numberAttribute], size: ["size", "size", numberAttribute], placeholder: "placeholder", inputId: "inputId", disabled: ["disabled", "disabled", booleanAttribute], readonly: ["readonly", "readonly", booleanAttribute], tabindex: ["tabindex", "tabindex", numberAttribute], required: ["required", "required", booleanAttribute], name: "name", ariaLabelledBy: "ariaLabelledBy", inputStyle: "inputStyle", inputStyleClass: "inputStyleClass", formatInput: ["formatInput", "formatInput", booleanAttribute], decimalSeparator: "decimalSeparator", thousandSeparator: "thousandSeparator", precision: ["precision", "precision", numberAttribute], step: "step" }, outputs: { onChange: "onChange", onFocus: "onFocus", onBlur: "onBlur" }, host: { properties: { "class.ui-inputwrapper-filled": "filled", "class.ui-inputwrapper-focus": "focus" }, classAttribute: "p-element" }, providers: [SPINNER_VALUE_ACCESSOR], viewQueries: [{ propertyName: "inputfieldViewChild", first: true, predicate: ["inputfield"], descendants: true }], ngImport: i0, template: `
        <span class="ui-spinner ui-widget ui-corner-all">
            <input
                #inputfield
                type="text"
                [attr.id]="inputId"
                [value]="formattedValue || null"
                [attr.name]="name"
                [attr.aria-valumin]="min"
                [attr.aria-valuemax]="max"
                [attr.aria-valuenow]="value"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.size]="size"
                [attr.maxlength]="maxlength"
                [attr.tabindex]="tabindex"
                [attr.placeholder]="placeholder"
                [disabled]="disabled"
                [readonly]="readonly"
                [attr.required]="required"
                (keydown)="onInputKeydown($event)"
                (blur)="onInputBlur($event)"
                (input)="onInput($event)"
                (change)="onInputChange($event)"
                (focus)="onInputFocus($event)"
                [ngStyle]="inputStyle"
                [class]="inputStyleClass"
                [ngClass]="'ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all'"
            />
            <button
                type="button"
                [ngClass]="{ 'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default': true, 'ui-state-disabled': disabled }"
                [disabled]="disabled || readonly"
                tabindex="-1"
                [attr.readonly]="readonly"
                (mouseleave)="onUpButtonMouseleave($event)"
                (mousedown)="onUpButtonMousedown($event)"
                (mouseup)="onUpButtonMouseup($event)"
            >
                <span class="ui-spinner-button-icon pi pi-caret-up ui-clickable"></span>
            </button>
            <button
                type="button"
                [ngClass]="{ 'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default': true, 'ui-state-disabled': disabled }"
                [disabled]="disabled || readonly"
                tabindex="-1"
                [attr.readonly]="readonly"
                (mouseleave)="onDownButtonMouseleave($event)"
                (mousedown)="onDownButtonMousedown($event)"
                (mouseup)="onDownButtonMouseup($event)"
            >
                <span class="ui-spinner-button-icon pi pi-caret-down ui-clickable"></span>
            </button>
        </span>
    `, isInline: true, styles: ["@layer primeng{.ui-spinner{display:inline-block;overflow:visible;padding:0;position:relative;vertical-align:middle}.ui-spinner-input{vertical-align:middle;padding-right:1.5em}.ui-spinner-button{cursor:default;display:block;height:50%;margin:0;overflow:hidden;padding:0;position:absolute;right:0;text-align:center;vertical-align:middle;width:1.5em}.ui-spinner .ui-spinner-button-icon{position:absolute;top:50%;left:50%;margin-top:-.5em;margin-left:-.5em;width:1em}.ui-spinner-up{top:0}.ui-spinner-down{bottom:0}.ui-fluid .ui-spinner{width:100%}.ui-fluid .ui-spinner .ui-spinner-input{padding-right:2em;width:100%}.ui-fluid .ui-spinner .ui-spinner-button{width:1.5em}.ui-fluid .ui-spinner .ui-spinner-button .ui-spinner-button-icon{left:.7em}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Spinner, decorators: [{
            type: Component,
            args: [{ selector: 'p-spinner', template: `
        <span class="ui-spinner ui-widget ui-corner-all">
            <input
                #inputfield
                type="text"
                [attr.id]="inputId"
                [value]="formattedValue || null"
                [attr.name]="name"
                [attr.aria-valumin]="min"
                [attr.aria-valuemax]="max"
                [attr.aria-valuenow]="value"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.size]="size"
                [attr.maxlength]="maxlength"
                [attr.tabindex]="tabindex"
                [attr.placeholder]="placeholder"
                [disabled]="disabled"
                [readonly]="readonly"
                [attr.required]="required"
                (keydown)="onInputKeydown($event)"
                (blur)="onInputBlur($event)"
                (input)="onInput($event)"
                (change)="onInputChange($event)"
                (focus)="onInputFocus($event)"
                [ngStyle]="inputStyle"
                [class]="inputStyleClass"
                [ngClass]="'ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all'"
            />
            <button
                type="button"
                [ngClass]="{ 'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default': true, 'ui-state-disabled': disabled }"
                [disabled]="disabled || readonly"
                tabindex="-1"
                [attr.readonly]="readonly"
                (mouseleave)="onUpButtonMouseleave($event)"
                (mousedown)="onUpButtonMousedown($event)"
                (mouseup)="onUpButtonMouseup($event)"
            >
                <span class="ui-spinner-button-icon pi pi-caret-up ui-clickable"></span>
            </button>
            <button
                type="button"
                [ngClass]="{ 'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default': true, 'ui-state-disabled': disabled }"
                [disabled]="disabled || readonly"
                tabindex="-1"
                [attr.readonly]="readonly"
                (mouseleave)="onDownButtonMouseleave($event)"
                (mousedown)="onDownButtonMousedown($event)"
                (mouseup)="onDownButtonMouseup($event)"
            >
                <span class="ui-spinner-button-icon pi pi-caret-down ui-clickable"></span>
            </button>
        </span>
    `, host: {
                        class: 'p-element',
                        '[class.ui-inputwrapper-filled]': 'filled',
                        '[class.ui-inputwrapper-focus]': 'focus'
                    }, providers: [SPINNER_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["@layer primeng{.ui-spinner{display:inline-block;overflow:visible;padding:0;position:relative;vertical-align:middle}.ui-spinner-input{vertical-align:middle;padding-right:1.5em}.ui-spinner-button{cursor:default;display:block;height:50%;margin:0;overflow:hidden;padding:0;position:absolute;right:0;text-align:center;vertical-align:middle;width:1.5em}.ui-spinner .ui-spinner-button-icon{position:absolute;top:50%;left:50%;margin-top:-.5em;margin-left:-.5em;width:1em}.ui-spinner-up{top:0}.ui-spinner-down{bottom:0}.ui-fluid .ui-spinner{width:100%}.ui-fluid .ui-spinner .ui-spinner-input{padding-right:2em;width:100%}.ui-fluid .ui-spinner .ui-spinner-button{width:1.5em}.ui-fluid .ui-spinner .ui-spinner-button .ui-spinner-button-icon{left:.7em}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { onChange: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], min: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], max: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], maxlength: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], size: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], placeholder: [{
                type: Input
            }], inputId: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], readonly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], required: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], name: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], inputStyle: [{
                type: Input
            }], inputStyleClass: [{
                type: Input
            }], formatInput: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], decimalSeparator: [{
                type: Input
            }], thousandSeparator: [{
                type: Input
            }], precision: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], inputfieldViewChild: [{
                type: ViewChild,
                args: ['inputfield']
            }], step: [{
                type: Input
            }] } });
export class SpinnerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SpinnerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: SpinnerModule, declarations: [Spinner], imports: [CommonModule, InputTextModule], exports: [Spinner] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SpinnerModule, imports: [CommonModule, InputTextModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SpinnerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, InputTextModule],
                    exports: [Spinner],
                    declarations: [Spinner]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQXNCLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQXFCLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5TixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRXpFLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFRO0lBQ3ZDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDdEMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBb0VGLE1BQU0sT0FBTyxPQUFPO0lBcUZHO0lBQXVCO0lBcEZoQyxRQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFakQsT0FBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRWhELE1BQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVsQixHQUFHLENBQVM7SUFFWixHQUFHLENBQVM7SUFFWixTQUFTLENBQVM7SUFFbEIsSUFBSSxDQUFTO0lBRTNDLFdBQVcsQ0FBUztJQUVwQixPQUFPLENBQVM7SUFFZSxRQUFRLENBQVU7SUFFbEIsUUFBUSxDQUFVO0lBRW5CLFFBQVEsQ0FBUztJQUVoQixRQUFRLENBQVU7SUFFakQsSUFBSSxDQUFTO0lBRWIsY0FBYyxDQUFTO0lBRXZCLFVBQVUsQ0FB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QUx6QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUM7b0JBQ3hDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztvQkFDbEIsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO2lCQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdG9yUmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24sIGJvb2xlYW5BdHRyaWJ1dGUsIG51bWJlckF0dHJpYnV0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IElucHV0VGV4dE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvaW5wdXR0ZXh0JztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IFNQSU5ORVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTcGlubmVyKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXNwaW5uZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidWktc3Bpbm5lciB1aS13aWRnZXQgdWktY29ybmVyLWFsbFwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgI2lucHV0ZmllbGRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiaW5wdXRJZFwiXG4gICAgICAgICAgICAgICAgW3ZhbHVlXT1cImZvcm1hdHRlZFZhbHVlIHx8IG51bGxcIlxuICAgICAgICAgICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1bWluXT1cIm1pblwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW1heF09XCJtYXhcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuc2l6ZV09XCJzaXplXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5tYXhsZW5ndGhdPVwibWF4bGVuZ3RoXCJcbiAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25JbnB1dEtleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJvbklucHV0Q2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwiaW5wdXRTdHlsZVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzXT1cImlucHV0U3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiJ3VpLXNwaW5uZXItaW5wdXQgdWktaW5wdXR0ZXh0IHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAndWktc3Bpbm5lci1idXR0b24gdWktc3Bpbm5lci11cCB1aS1jb3JuZXItdHIgdWktYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0JzogdHJ1ZSwgJ3VpLXN0YXRlLWRpc2FibGVkJzogZGlzYWJsZWQgfVwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IHJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5yZWFkb25seV09XCJyZWFkb25seVwiXG4gICAgICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwib25VcEJ1dHRvbk1vdXNlbGVhdmUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvblVwQnV0dG9uTW91c2Vkb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChtb3VzZXVwKT1cIm9uVXBCdXR0b25Nb3VzZXVwKCRldmVudClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktc3Bpbm5lci1idXR0b24taWNvbiBwaSBwaS1jYXJldC11cCB1aS1jbGlja2FibGVcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICd1aS1zcGlubmVyLWJ1dHRvbiB1aS1zcGlubmVyLWRvd24gdWktY29ybmVyLWJyIHVpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCc6IHRydWUsICd1aS1zdGF0ZS1kaXNhYmxlZCc6IGRpc2FibGVkIH1cIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCByZWFkb25seVwiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgICAgICAgW2F0dHIucmVhZG9ubHldPVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgIChtb3VzZWxlYXZlKT1cIm9uRG93bkJ1dHRvbk1vdXNlbGVhdmUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvbkRvd25CdXR0b25Nb3VzZWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG1vdXNldXApPVwib25Eb3duQnV0dG9uTW91c2V1cCgkZXZlbnQpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXNwaW5uZXItYnV0dG9uLWljb24gcGkgcGktY2FyZXQtZG93biB1aS1jbGlja2FibGVcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9zcGFuPlxuICAgIGAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCcsXG4gICAgICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZpbGxlZF0nOiAnZmlsbGVkJyxcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZm9jdXNdJzogJ2ZvY3VzJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbU1BJTk5FUl9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9zcGlubmVyLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNwaW5uZXIgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBtaW46IG51bWJlcjtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIG1heDogbnVtYmVyO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgbWF4bGVuZ3RoOiBudW1iZXI7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBzaXplOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgdGFiaW5kZXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBmb3JtYXRJbnB1dDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGRlY2ltYWxTZXBhcmF0b3I6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRob3VzYW5kU2VwYXJhdG9yOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBwcmVjaXNpb246IG51bWJlcjtcblxuICAgIHZhbHVlOiBhbnk7XG5cbiAgICBfc3RlcDogbnVtYmVyID0gMTtcblxuICAgIGZvcm1hdHRlZFZhbHVlOiBzdHJpbmc7XG5cbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBrZXlQYXR0ZXJuOiBSZWdFeHAgPSAvWzAtOVxcK1xcLV0vO1xuXG4gICAgcHVibGljIHRpbWVyOiBhbnk7XG5cbiAgICBwdWJsaWMgZm9jdXM6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgZmlsbGVkOiBib29sZWFuO1xuXG4gICAgcHVibGljIG5lZ2F0aXZlU2VwYXJhdG9yID0gJy0nO1xuXG4gICAgbG9jYWxlRGVjaW1hbFNlcGFyYXRvcjogc3RyaW5nO1xuXG4gICAgbG9jYWxlVGhvdXNhbmRTZXBhcmF0b3I6IHN0cmluZztcblxuICAgIHRob3VzYW5kUmVnRXhwOiBSZWdFeHA7XG5cbiAgICBjYWxjdWxhdGVkUHJlY2lzaW9uOiBudW1iZXI7XG5cbiAgICBAVmlld0NoaWxkKCdpbnB1dGZpZWxkJykgaW5wdXRmaWVsZFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICAgIH1cbiAgICBzZXQgc3RlcCh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zdGVwID0gdmFsO1xuXG4gICAgICAgIGlmICh0aGlzLl9zdGVwICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCB0b2tlbnMgPSB0aGlzLnN0ZXAudG9TdHJpbmcoKS5zcGxpdCgvWyxdfFsuXS8pO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkUHJlY2lzaW9uID0gdG9rZW5zWzFdID8gdG9rZW5zWzFdLmxlbmd0aCA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5mb3JtYXRJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5sb2NhbGVEZWNpbWFsU2VwYXJhdG9yID0gKDEuMSkudG9Mb2NhbGVTdHJpbmcoKS5zdWJzdHJpbmcoMSwgMik7XG4gICAgICAgICAgICB0aGlzLmxvY2FsZVRob3VzYW5kU2VwYXJhdG9yID0gKDEwMDApLnRvTG9jYWxlU3RyaW5nKCkuc3Vic3RyaW5nKDEsIDIpO1xuICAgICAgICAgICAgdGhpcy50aG91c2FuZFJlZ0V4cCA9IG5ldyBSZWdFeHAoYFske3RoaXMudGhvdXNhbmRTZXBhcmF0b3IgfHwgdGhpcy5sb2NhbGVUaG91c2FuZFNlcGFyYXRvcn1dYCwgJ2dpbScpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kZWNpbWFsU2VwYXJhdG9yICYmIHRoaXMudGhvdXNhbmRTZXBhcmF0b3IgJiYgdGhpcy5kZWNpbWFsU2VwYXJhdG9yID09PSB0aGlzLnRob3VzYW5kU2VwYXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCd0aG91c2FuZFNlcGFyYXRvciBhbmQgZGVjaW1hbFNlcGFyYXRvciBjYW5ub3QgaGF2ZSB0aGUgc2FtZSB2YWx1ZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlcGVhdChldmVudDogRXZlbnQsIGludGVydmFsOiBudW1iZXIsIGRpcjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBpID0gaW50ZXJ2YWwgfHwgNTAwO1xuXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgNDAsIGRpcik7XG4gICAgICAgIH0sIGkpO1xuXG4gICAgICAgIHRoaXMuc3BpbihldmVudCwgZGlyKTtcbiAgICB9XG5cbiAgICBzcGluKGV2ZW50OiBFdmVudCwgZGlyOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHN0ZXAgPSB0aGlzLnN0ZXAgKiBkaXI7XG4gICAgICAgIGxldCBjdXJyZW50VmFsdWU6IG51bWJlcjtcbiAgICAgICAgbGV0IHByZWNpc2lvbiA9IHRoaXMuZ2V0UHJlY2lzaW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIGN1cnJlbnRWYWx1ZSA9IHR5cGVvZiB0aGlzLnZhbHVlID09PSAnc3RyaW5nJyA/IHRoaXMucGFyc2VWYWx1ZSh0aGlzLnZhbHVlKSA6IHRoaXMudmFsdWU7XG4gICAgICAgIGVsc2UgY3VycmVudFZhbHVlID0gMDtcblxuICAgICAgICBpZiAocHJlY2lzaW9uKSB0aGlzLnZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLnRvRml4ZWQoY3VycmVudFZhbHVlICsgc3RlcCwgcHJlY2lzaW9uKSk7XG4gICAgICAgIGVsc2UgdGhpcy52YWx1ZSA9IGN1cnJlbnRWYWx1ZSArIHN0ZXA7XG5cbiAgICAgICAgaWYgKHRoaXMubWF4bGVuZ3RoICE9PSB1bmRlZmluZWQgJiYgdGhpcy52YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+IHRoaXMubWF4bGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY3VycmVudFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWluICE9PSB1bmRlZmluZWQgJiYgdGhpcy52YWx1ZSA8IHRoaXMubWluKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5taW47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tYXggIT09IHVuZGVmaW5lZCAmJiB0aGlzLnZhbHVlID4gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1heDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9ybWF0VmFsdWUoKTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGdldFByZWNpc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJlY2lzaW9uID09PSB1bmRlZmluZWQgPyB0aGlzLmNhbGN1bGF0ZWRQcmVjaXNpb24gOiB0aGlzLnByZWNpc2lvbjtcbiAgICB9XG5cbiAgICB0b0ZpeGVkKHZhbHVlOiBudW1iZXIsIHByZWNpc2lvbjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwb3dlciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24gfHwgMCk7XG4gICAgICAgIHJldHVybiBTdHJpbmcoTWF0aC5yb3VuZCh2YWx1ZSAqIHBvd2VyKSAvIHBvd2VyKTtcbiAgICB9XG5cbiAgICBvblVwQnV0dG9uTW91c2Vkb3duKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgbnVsbCwgMSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25VcEJ1dHRvbk1vdXNldXAoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblVwQnV0dG9uTW91c2VsZWF2ZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRG93bkJ1dHRvbk1vdXNlZG93bihldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIG51bGwsIC0xKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRvd25CdXR0b25Nb3VzZXVwKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Eb3duQnV0dG9uTW91c2VsZWF2ZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXRLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC53aGljaCA9PSAzOCkge1xuICAgICAgICAgICAgdGhpcy5zcGluKGV2ZW50LCAxKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT0gNDApIHtcbiAgICAgICAgICAgIHRoaXMuc3BpbihldmVudCwgLTEpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXRDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25JbnB1dChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKCg8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQpLnZhbHVlKTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgfVxuXG4gICAgb25JbnB1dEJsdXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvcm1hdFZhbHVlKCk7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25JbnB1dEZvY3VzKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSB0cnVlO1xuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgcGFyc2VWYWx1ZSh2YWw6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGxldCB2YWx1ZTogbnVtYmVyO1xuICAgICAgICBsZXQgcHJlY2lzaW9uID0gdGhpcy5nZXRQcmVjaXNpb24oKTtcblxuICAgICAgICBpZiAodmFsLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm1hdElucHV0KSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsLnJlcGxhY2UodGhpcy50aG91c2FuZFJlZ0V4cCwgJycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJlY2lzaW9uKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5mb3JtYXRJbnB1dCA/IHZhbC5yZXBsYWNlKHRoaXMuZGVjaW1hbFNlcGFyYXRvciB8fCB0aGlzLmxvY2FsZURlY2ltYWxTZXBhcmF0b3IsICcuJykgOiB2YWwucmVwbGFjZSgnLCcsICcuJyk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHZhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQodmFsLCAxMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4ICE9PSBudWxsICYmIHZhbHVlID4gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLm1heDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5taW4gIT09IG51bGwgJiYgdmFsdWUgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMubWluO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGZvcm1hdFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBsZXQgcHJlY2lzaW9uID0gdGhpcy5nZXRQcmVjaXNpb24oKTtcblxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybWF0SW5wdXQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG9jYWxlU3RyaW5nKHVuZGVmaW5lZCwgeyBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIwIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVjaW1hbFNlcGFyYXRvciAmJiB0aGlzLnRob3VzYW5kU2VwYXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQodGhpcy5sb2NhbGVEZWNpbWFsU2VwYXJhdG9yKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocHJlY2lzaW9uICYmIHZhbHVlWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVsxXSA9ICh0aGlzLmRlY2ltYWxTZXBhcmF0b3IgfHwgdGhpcy5sb2NhbGVEZWNpbWFsU2VwYXJhdG9yKSArIHZhbHVlWzFdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGhvdXNhbmRTZXBhcmF0b3IgJiYgdmFsdWVbMF0ubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVbMF0gPSB2YWx1ZVswXS5yZXBsYWNlKG5ldyBSZWdFeHAoYFske3RoaXMubG9jYWxlVGhvdXNhbmRTZXBhcmF0b3J9XWAsICdnaW0nKSwgdGhpcy50aG91c2FuZFNlcGFyYXRvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4oJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdHRlZFZhbHVlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQgJiYgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5mb3JtYXR0ZWRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyVGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5mb3JtYXRWYWx1ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHVwZGF0ZUZpbGxlZFN0YXRlKCkge1xuICAgICAgICB0aGlzLmZpbGxlZCA9IHRoaXMudmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnZhbHVlICE9IG51bGw7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIElucHV0VGV4dE1vZHVsZV0sXG4gICAgZXhwb3J0czogW1NwaW5uZXJdLFxuICAgIGRlY2xhcmF0aW9uczogW1NwaW5uZXJdXG59KVxuZXhwb3J0IGNsYXNzIFNwaW5uZXJNb2R1bGUge31cbiJdfQ==