import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, NgModule, Output, ViewEncapsulation, booleanAttribute, forwardRef } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/inputtext";
import * as i3 from "primeng/autofocus";
export const INPUT_OTP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputOtp),
    multi: true
};
/**
 * Input Otp is used to enter one time passwords.
 * @group Components
 */
export class InputOtp {
    cd;
    /**
     * When present, it specifies that the component should have invalid state style.
     * @group Props
     */
    invalid = false;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled = false;
    /**
     * When present, it specifies that an input field is read-only.
     * @group Props
     */
    readonly = false;
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    variant = null;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = null;
    /**
     * Number of characters to initiate.
     * @group Props
     */
    length = 4;
    /**
     * Mask pattern.
     * @group Props
     */
    mask = false;
    /**
     * When present, it specifies that an input field is integer-only.
     * @group Props
     */
    integerOnly = false;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus;
    /**
     * Callback to invoke on value change.
     * @group Emits
     */
    onChange = new EventEmitter();
    /**
     * Callback to invoke when the component receives focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke when the component loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    templates;
    inputTemplate;
    tokens = [];
    onModelChange = () => { };
    onModelTouched = () => { };
    value;
    get inputMode() {
        return this.integerOnly ? 'numeric' : 'text';
    }
    get inputType() {
        return this.mask ? 'password' : 'text';
    }
    constructor(cd) {
        this.cd = cd;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'input':
                    this.inputTemplate = item.template;
                    break;
                default:
                    this.inputTemplate = item.template;
                    break;
            }
        });
    }
    getToken(index) {
        return this.tokens[index];
    }
    getTemplateEvents(index) {
        return {
            input: (event) => this.onInput(event, index),
            keydown: (event) => this.onKeyDown(event),
            focus: (event) => this.onFocus.emit(event),
            blur: (event) => this.onBlur.emit(event),
            paste: (event) => this.onPaste(event)
        };
    }
    onInput(event, index) {
        this.tokens[index] = event.target.value;
        this.updateModel(event);
        if (event.inputType === 'deleteContentBackward') {
            this.moveToPrev(event);
        }
        else if (event.inputType === 'insertText' || event.inputType === 'deleteContentForward') {
            this.moveToNext(event);
        }
    }
    updateModel(event) {
        const newValue = this.tokens.join('');
        this.onModelChange(newValue);
        this.onChange.emit({
            originalEvent: event,
            value: newValue
        });
    }
    writeValue(value) {
        if (value) {
            if (Array.isArray(value) && value.length > 0) {
                this.value = value.slice(0, this.length);
            }
            else {
                this.value = value.toString().split('').slice(0, this.length);
            }
        }
        else {
            this.value = value;
        }
        this.updateTokens();
        this.cd.markForCheck();
    }
    updateTokens() {
        if (this.value !== null && this.value !== undefined) {
            if (Array.isArray(this.value)) {
                this.tokens = [...this.value];
            }
            else {
                this.tokens = this.value.toString().split('');
            }
        }
        else {
            this.tokens = [];
        }
    }
    getModelValue(i) {
        return this.tokens[i - 1] || '';
    }
    getAutofocus(i) {
        if (i === 1) {
            return this.autofocus;
        }
        return false;
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    moveToPrev(event) {
        let prevInput = this.findPrevInput(event.target);
        if (prevInput) {
            prevInput.focus();
            prevInput.select();
        }
    }
    moveToNext(event) {
        let nextInput = this.findNextInput(event.target);
        if (nextInput) {
            nextInput.focus();
            nextInput.select();
        }
    }
    findNextInput(element) {
        let nextElement = element.nextElementSibling;
        if (!nextElement)
            return;
        return nextElement.nodeName === 'INPUT' ? nextElement : this.findNextInput(nextElement);
    }
    findPrevInput(element) {
        let prevElement = element.previousElementSibling;
        if (!prevElement)
            return;
        return prevElement.nodeName === 'INPUT' ? prevElement : this.findPrevInput(prevElement);
    }
    onInputFocus(event) {
        event.target.select();
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.onBlur.emit(event);
    }
    onKeyDown(event) {
        switch (event.code) {
            case 'ArrowLeft':
                this.moveToPrev(event);
                event.preventDefault();
                break;
            case 'ArrowUp':
            case 'ArrowDown':
                event.preventDefault();
                break;
            case 'Backspace':
                if (event.target.value.length === 0) {
                    this.moveToPrev(event);
                    event.preventDefault();
                }
                break;
            case 'ArrowRight':
                this.moveToNext(event);
                event.preventDefault();
                break;
            default:
                if ((this.integerOnly && !((event.code.startsWith('Digit') || event.code.startsWith('Numpad')) && Number(event.key) >= 0 && Number(event.key) <= 9)) || (this.tokens.join('').length >= this.length && event.code !== 'Delete')) {
                    event.preventDefault();
                }
                break;
        }
    }
    onPaste(event) {
        let paste = event.clipboardData.getData('text');
        if (paste.length) {
            let pastedCode = paste.substring(0, this.length + 1);
            if (!this.integerOnly || !isNaN(pastedCode)) {
                this.tokens = pastedCode.split('');
                this.updateModel(event);
            }
        }
        event.preventDefault();
    }
    getRange(n) {
        return Array.from({ length: n }, (_, index) => index + 1);
    }
    trackByFn(index) {
        return index;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: InputOtp, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: InputOtp, selector: "p-inputOtp", inputs: { invalid: "invalid", disabled: "disabled", readonly: "readonly", variant: "variant", tabindex: "tabindex", length: "length", mask: "mask", integerOnly: "integerOnly", autofocus: ["autofocus", "autofocus", booleanAttribute] }, outputs: { onChange: "onChange", onFocus: "onFocus", onBlur: "onBlur" }, host: { classAttribute: "p-inputotp p-component" }, providers: [INPUT_OTP_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <ng-container *ngFor="let i of getRange(length); trackBy: trackByFn">
            <ng-container *ngIf="!inputTemplate">
                <input
                    type="text"
                    pInputText
                    [value]="getModelValue(i)"
                    [maxLength]="1"
                    [type]="inputType"
                    class="p-inputotp-input"
                    [inputmode]="inputMode"
                    [variant]="variant"
                    [readonly]="readonly"
                    [disabled]="disabled"
                    [invalid]="invalid"
                    [tabindex]="tabindex"
                    [unstyled]="unstyled"
                    (input)="onInput($event, i - 1)"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    (paste)="onPaste($event)"
                    (keydown)="onKeyDown($event)"
                    pAutoFocus
                    [autofocus]="getAutofocus(i)"
                />
            </ng-container>
            <ng-container *ngIf="inputTemplate">
                <ng-container *ngTemplateOutlet="inputTemplate; context: { $implicit: getToken(i - 1), events: getTemplateEvents(i - 1), index: i }"> </ng-container>
            </ng-container>
        </ng-container>
    `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.InputText, selector: "[pInputText]" }, { kind: "directive", type: i3.AutoFocus, selector: "[pAutoFocus]", inputs: ["autofocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: InputOtp, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-inputOtp',
                    template: `
        <ng-container *ngFor="let i of getRange(length); trackBy: trackByFn">
            <ng-container *ngIf="!inputTemplate">
                <input
                    type="text"
                    pInputText
                    [value]="getModelValue(i)"
                    [maxLength]="1"
                    [type]="inputType"
                    class="p-inputotp-input"
                    [inputmode]="inputMode"
                    [variant]="variant"
                    [readonly]="readonly"
                    [disabled]="disabled"
                    [invalid]="invalid"
                    [tabindex]="tabindex"
                    [unstyled]="unstyled"
                    (input)="onInput($event, i - 1)"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    (paste)="onPaste($event)"
                    (keydown)="onKeyDown($event)"
                    pAutoFocus
                    [autofocus]="getAutofocus(i)"
                />
            </ng-container>
            <ng-container *ngIf="inputTemplate">
                <ng-container *ngTemplateOutlet="inputTemplate; context: { $implicit: getToken(i - 1), events: getTemplateEvents(i - 1), index: i }"> </ng-container>
            </ng-container>
        </ng-container>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-inputotp p-component'
                    },
                    providers: [INPUT_OTP_VALUE_ACCESSOR]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { invalid: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], variant: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], length: [{
                type: Input
            }], mask: [{
                type: Input
            }], integerOnly: [{
                type: Input
            }], autofocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onChange: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class InputOtpModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: InputOtpModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: InputOtpModule, declarations: [InputOtp], imports: [CommonModule, SharedModule, InputTextModule, AutoFocusModule], exports: [InputOtp, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: InputOtpModule, imports: [CommonModule, SharedModule, InputTextModule, AutoFocusModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: InputOtpModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, InputTextModule, AutoFocusModule],
                    exports: [InputOtp, SharedModule],
                    declarations: [InputOtp]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRvdHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvaW5wdXRvdHAvaW5wdXRvdHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBb0IsdUJBQXVCLEVBQXFCLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUEwQixpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDek8sT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUFHcEQsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQVE7SUFDekMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztJQUN2QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFDRjs7O0dBR0c7QUF5Q0gsTUFBTSxPQUFPLFFBQVE7SUFxRkU7SUFwRm5COzs7T0FHRztJQUNNLE9BQU8sR0FBWSxLQUFLLENBQUM7SUFDbEM7OztPQUdHO0lBRU0sUUFBUSxHQUFZLEtBQUssQ0FBQztJQUNuQzs7O09BR0c7SUFDTSxRQUFRLEdBQVksS0FBSyxDQUFDO0lBQ25DOzs7T0FHRztJQUNNLE9BQU8sR0FBa0IsSUFBSSxDQUFDO0lBQ3ZDOzs7T0FHRztJQUNNLFFBQVEsR0FBa0IsSUFBSSxDQUFDO0lBQ3hDOzs7T0FHRztJQUNNLE1BQU0sR0FB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QUtHLElBQUk7c0JBQVosS0FBSztnQkFLRyxXQUFXO3NCQUFuQixLQUFLO2dCQUtrQyxTQUFTO3NCQUFoRCxLQUFLO3VCQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFO2dCQUs1QixRQUFRO3NCQUFqQixNQUFNO2dCQU1HLE9BQU87c0JBQWhCLE1BQU07Z0JBTUcsTUFBTTtzQkFBZixNQUFNO2dCQUV5QixTQUFTO3NCQUF4QyxlQUFlO3VCQUFDLGFBQWE7O0FBZ09sQyxNQUFNLE9BQU8sY0FBYzt1R0FBZCxjQUFjO3dHQUFkLGNBQWMsaUJBalNkLFFBQVEsYUE2UlAsWUFBWSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsZUFBZSxhQTdSN0QsUUFBUSxFQThSRyxZQUFZO3dHQUd2QixjQUFjLFlBSmIsWUFBWSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUNsRCxZQUFZOzsyRkFHdkIsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLENBQUM7b0JBQ3ZFLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7b0JBQ2pDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztpQkFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgTmdNb2R1bGUsIE91dHB1dCwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24sIGJvb2xlYW5BdHRyaWJ1dGUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IElucHV0VGV4dE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvaW5wdXR0ZXh0JztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgQXV0b0ZvY3VzTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hdXRvZm9jdXMnO1xuaW1wb3J0IHsgSW5wdXRPdHBDaGFuZ2VFdmVudCB9IGZyb20gJy4vaW5wdXRvdHAuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IElOUFVUX09UUF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElucHV0T3RwKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcbi8qKlxuICogSW5wdXQgT3RwIGlzIHVzZWQgdG8gZW50ZXIgb25lIHRpbWUgcGFzc3dvcmRzLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWlucHV0T3RwJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpIG9mIGdldFJhbmdlKGxlbmd0aCk7IHRyYWNrQnk6IHRyYWNrQnlGblwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpbnB1dFRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgcElucHV0VGV4dFxuICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiZ2V0TW9kZWxWYWx1ZShpKVwiXG4gICAgICAgICAgICAgICAgICAgIFttYXhMZW5ndGhdPVwiMVwiXG4gICAgICAgICAgICAgICAgICAgIFt0eXBlXT1cImlucHV0VHlwZVwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1pbnB1dG90cC1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIFtpbnB1dG1vZGVdPVwiaW5wdXRNb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgW3ZhcmlhbnRdPVwidmFyaWFudFwiXG4gICAgICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIFtpbnZhbGlkXT1cImludmFsaWRcIlxuICAgICAgICAgICAgICAgICAgICBbdGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICBbdW5zdHlsZWRdPVwidW5zdHlsZWRcIlxuICAgICAgICAgICAgICAgICAgICAoaW5wdXQpPVwib25JbnB1dCgkZXZlbnQsIGkgLSAxKVwiXG4gICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAocGFzdGUpPVwib25QYXN0ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBwQXV0b0ZvY3VzXG4gICAgICAgICAgICAgICAgICAgIFthdXRvZm9jdXNdPVwiZ2V0QXV0b2ZvY3VzKGkpXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaW5wdXRUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpbnB1dFRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogZ2V0VG9rZW4oaSAtIDEpLCBldmVudHM6IGdldFRlbXBsYXRlRXZlbnRzKGkgLSAxKSwgaW5kZXg6IGkgfVwiPiA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtaW5wdXRvdHAgcC1jb21wb25lbnQnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtJTlBVVF9PVFBfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIElucHV0T3RwIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgY29tcG9uZW50IHNob3VsZCBoYXZlIGludmFsaWQgc3RhdGUgc3R5bGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW52YWxpZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgYW4gaW5wdXQgZmllbGQgaXMgcmVhZC1vbmx5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHRoZSBpbnB1dCB2YXJpYW50IG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmFyaWFudDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGFiYmluZyBvcmRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIGNoYXJhY3RlcnMgdG8gaW5pdGlhdGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbGVuZ3RoOiBudW1iZXIgPSA0O1xuICAgIC8qKlxuICAgICAqIE1hc2sgcGF0dGVybi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtYXNrOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCBhbiBpbnB1dCBmaWVsZCBpcyBpbnRlZ2VyLW9ubHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW50ZWdlck9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IHRoZSBjb21wb25lbnQgc2hvdWxkIGF1dG9tYXRpY2FsbHkgZ2V0IGZvY3VzIG9uIGxvYWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGF1dG9mb2N1czogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gdmFsdWUgY2hhbmdlLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPElucHV0T3RwQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJbnB1dE90cENoYW5nZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSBjb21wb25lbnQgcmVjZWl2ZXMgZm9jdXMuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSBjb21wb25lbnQgbG9zZXMgZm9jdXMuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogTnVsbGFibGU8UXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+PjtcblxuICAgIGlucHV0VGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgdG9rZW5zOiBhbnkgPSBbXTtcblxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIHZhbHVlOiBhbnk7XG5cbiAgICBnZXQgaW5wdXRNb2RlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVnZXJPbmx5ID8gJ251bWVyaWMnIDogJ3RleHQnO1xuICAgIH1cblxuICAgIGdldCBpbnB1dFR5cGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFzayA/ICdwYXNzd29yZCcgOiAndGV4dCc7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgKHRoaXMudGVtcGxhdGVzIGFzIFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPikuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2lucHV0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFRva2VuKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRva2Vuc1tpbmRleF07XG4gICAgfVxuXG4gICAgZ2V0VGVtcGxhdGVFdmVudHMoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlucHV0OiAoZXZlbnQpID0+IHRoaXMub25JbnB1dChldmVudCwgaW5kZXgpLFxuICAgICAgICAgICAga2V5ZG93bjogKGV2ZW50KSA9PiB0aGlzLm9uS2V5RG93bihldmVudCksXG4gICAgICAgICAgICBmb2N1czogKGV2ZW50KSA9PiB0aGlzLm9uRm9jdXMuZW1pdChldmVudCksXG4gICAgICAgICAgICBibHVyOiAoZXZlbnQpID0+IHRoaXMub25CbHVyLmVtaXQoZXZlbnQpLFxuICAgICAgICAgICAgcGFzdGU6IChldmVudCkgPT4gdGhpcy5vblBhc3RlKGV2ZW50KVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uSW5wdXQoZXZlbnQsIGluZGV4KSB7XG4gICAgICAgIHRoaXMudG9rZW5zW2luZGV4XSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbChldmVudCk7XG5cbiAgICAgICAgaWYgKGV2ZW50LmlucHV0VHlwZSA9PT0gJ2RlbGV0ZUNvbnRlbnRCYWNrd2FyZCcpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZVRvUHJldihldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuaW5wdXRUeXBlID09PSAnaW5zZXJ0VGV4dCcgfHwgZXZlbnQuaW5wdXRUeXBlID09PSAnZGVsZXRlQ29udGVudEZvcndhcmQnKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVUb05leHQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlTW9kZWwoZXZlbnQ6IGFueSkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMudG9rZW5zLmpvaW4oJycpO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UobmV3VmFsdWUpO1xuXG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIHZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZS5zbGljZSgwLCB0aGlzLmxlbmd0aCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnNwbGl0KCcnKS5zbGljZSgwLCB0aGlzLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVUb2tlbnMoKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUb2tlbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlICE9PSBudWxsICYmIHRoaXMudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRva2VucyA9IFsuLi50aGlzLnZhbHVlXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbnMgPSB0aGlzLnZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50b2tlbnMgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE1vZGVsVmFsdWUoaTogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRva2Vuc1tpIC0gMV0gfHwgJyc7XG4gICAgfVxuXG4gICAgZ2V0QXV0b2ZvY3VzKGk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0b2ZvY3VzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIG1vdmVUb1ByZXYoZXZlbnQpIHtcbiAgICAgICAgbGV0IHByZXZJbnB1dCA9IHRoaXMuZmluZFByZXZJbnB1dChldmVudC50YXJnZXQpO1xuXG4gICAgICAgIGlmIChwcmV2SW5wdXQpIHtcbiAgICAgICAgICAgIHByZXZJbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgcHJldklucHV0LnNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZVRvTmV4dChldmVudCkge1xuICAgICAgICBsZXQgbmV4dElucHV0ID0gdGhpcy5maW5kTmV4dElucHV0KGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgaWYgKG5leHRJbnB1dCkge1xuICAgICAgICAgICAgbmV4dElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICBuZXh0SW5wdXQuc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTmV4dElucHV0KGVsZW1lbnQpIHtcbiAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKCFuZXh0RWxlbWVudCkgcmV0dXJuO1xuXG4gICAgICAgIHJldHVybiBuZXh0RWxlbWVudC5ub2RlTmFtZSA9PT0gJ0lOUFVUJyA/IG5leHRFbGVtZW50IDogdGhpcy5maW5kTmV4dElucHV0KG5leHRFbGVtZW50KTtcbiAgICB9XG5cbiAgICBmaW5kUHJldklucHV0KGVsZW1lbnQpIHtcbiAgICAgICAgbGV0IHByZXZFbGVtZW50ID0gZWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIGlmICghcHJldkVsZW1lbnQpIHJldHVybjtcblxuICAgICAgICByZXR1cm4gcHJldkVsZW1lbnQubm9kZU5hbWUgPT09ICdJTlBVVCcgPyBwcmV2RWxlbWVudCA6IHRoaXMuZmluZFByZXZJbnB1dChwcmV2RWxlbWVudCk7XG4gICAgfVxuXG4gICAgb25JbnB1dEZvY3VzKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC5zZWxlY3QoKTtcbiAgICAgICAgdGhpcy5vbkZvY3VzLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uSW5wdXRCbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9QcmV2KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0JhY2tzcGFjZSc6XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9QcmV2KGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9OZXh0KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLmludGVnZXJPbmx5ICYmICEoKGV2ZW50LmNvZGUuc3RhcnRzV2l0aCgnRGlnaXQnKSB8fCBldmVudC5jb2RlLnN0YXJ0c1dpdGgoJ051bXBhZCcpKSAmJiBOdW1iZXIoZXZlbnQua2V5KSA+PSAwICYmIE51bWJlcihldmVudC5rZXkpIDw9IDkpKSB8fCAodGhpcy50b2tlbnMuam9pbignJykubGVuZ3RoID49IHRoaXMubGVuZ3RoICYmIGV2ZW50LmNvZGUgIT09ICdEZWxldGUnKSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QYXN0ZShldmVudCkge1xuICAgICAgICBsZXQgcGFzdGUgPSBldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKTtcblxuICAgICAgICBpZiAocGFzdGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgcGFzdGVkQ29kZSA9IHBhc3RlLnN1YnN0cmluZygwLCB0aGlzLmxlbmd0aCArIDEpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaW50ZWdlck9ubHkgfHwgIWlzTmFOKHBhc3RlZENvZGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbnMgPSBwYXN0ZWRDb2RlLnNwbGl0KCcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZ2V0UmFuZ2UobjogbnVtYmVyKTogbnVtYmVyW10ge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogbiB9LCAoXywgaW5kZXgpID0+IGluZGV4ICsgMSk7XG4gICAgfVxuXG4gICAgdHJhY2tCeUZuKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTaGFyZWRNb2R1bGUsIElucHV0VGV4dE1vZHVsZSwgQXV0b0ZvY3VzTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbSW5wdXRPdHAsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbSW5wdXRPdHBdXG59KVxuZXhwb3J0IGNsYXNzIElucHV0T3RwTW9kdWxlIHt9XG4iXX0=