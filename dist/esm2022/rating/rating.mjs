import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, forwardRef, Input, NgModule, numberAttribute, Output, signal, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BanIcon } from 'primeng/icons/ban';
import { StarIcon } from 'primeng/icons/star';
import { StarFillIcon } from 'primeng/icons/starfill';
import { DomHandler } from 'primeng/dom';
import { UniqueComponentId } from 'primeng/utils';
import { AutoFocusModule } from 'primeng/autofocus';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/autofocus";
export const RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Rating),
    multi: true
};
/**
 * Rating is an extension to standard radio button element with theming.
 * @group Components
 */
export class Rating {
    cd;
    config;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled;
    /**
     * When present, changing the value is not possible.
     * @group Props
     */
    readonly;
    /**
     * Number of stars.
     * @group Props
     */
    stars = 5;
    /**
     * When specified a cancel icon is displayed to allow removing the value.
     * @group Props
     */
    cancel = true;
    /**
     * Style class of the on icon.
     * @group Props
     */
    iconOnClass;
    /**
     * Inline style of the on icon.
     * @group Props
     */
    iconOnStyle;
    /**
     * Style class of the off icon.
     * @group Props
     */
    iconOffClass;
    /**
     * Inline style of the off icon.
     * @group Props
     */
    iconOffStyle;
    /**
     * Style class of the cancel icon.
     * @group Props
     */
    iconCancelClass;
    /**
     * Inline style of the cancel icon.
     * @group Props
     */
    iconCancelStyle;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus;
    /**
     * Emitted on value change.
     * @param {RatingRateEvent} value - Custom rate event.
     * @group Emits
     */
    onRate = new EventEmitter();
    /**
     * Emitted when the rating is cancelled.
     * @param {Event} value - Browser event.
     * @group Emits
     */
    onCancel = new EventEmitter();
    /**
     * Emitted when the rating receives focus.
     * @param {Event} value - Browser event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Emitted when the rating loses focus.
     * @param {Event} value - Browser event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    templates;
    onIconTemplate;
    offIconTemplate;
    cancelIconTemplate;
    value;
    onModelChange = () => { };
    onModelTouched = () => { };
    starsArray;
    isFocusVisibleItem = true;
    focusedOptionIndex = signal(-1);
    name;
    constructor(cd, config) {
        this.cd = cd;
        this.config = config;
    }
    ngOnInit() {
        this.name = this.name || UniqueComponentId();
        this.starsArray = [];
        for (let i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'onicon':
                    this.onIconTemplate = item.template;
                    break;
                case 'officon':
                    this.offIconTemplate = item.template;
                    break;
                case 'cancelicon':
                    this.cancelIconTemplate = item.template;
                    break;
            }
        });
    }
    onOptionClick(event, value) {
        if (!this.readonly && !this.disabled) {
            this.onOptionSelect(event, value);
            this.isFocusVisibleItem = false;
            const firstFocusableEl = DomHandler.getFirstFocusableElement(event.currentTarget, '');
            firstFocusableEl && DomHandler.focus(firstFocusableEl);
        }
    }
    onOptionSelect(event, value) {
        this.focusedOptionIndex.set(value);
        this.updateModel(event, value || null);
    }
    onChange(event, value) {
        this.onOptionSelect(event, value);
        this.isFocusVisibleItem = true;
    }
    onInputBlur(event) {
        this.focusedOptionIndex.set(-1);
        this.onBlur.emit(event);
    }
    onInputFocus(event, value) {
        this.focusedOptionIndex.set(value);
        this.onFocus.emit(event);
    }
    updateModel(event, value) {
        this.value = value;
        this.onModelChange(this.value);
        this.onModelTouched();
        if (!value) {
            this.onCancel.emit();
        }
        else {
            this.onRate.emit({
                originalEvent: event,
                value
            });
        }
    }
    cancelAriaLabel() {
        return this.config.translation.clear;
    }
    starAriaLabel(value) {
        return value === 1 ? this.config.translation.aria.star : this.config.translation.aria.stars.replace(/{star}/g, value);
    }
    getIconTemplate(i) {
        return !this.value || i >= this.value ? this.offIconTemplate : this.onIconTemplate;
    }
    writeValue(value) {
        this.value = value;
        this.cd.detectChanges();
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
    get isCustomIcon() {
        return this.templates && this.templates.length > 0;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Rating, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: Rating, selector: "p-rating", inputs: { disabled: ["disabled", "disabled", booleanAttribute], readonly: ["readonly", "readonly", booleanAttribute], stars: ["stars", "stars", numberAttribute], cancel: ["cancel", "cancel", booleanAttribute], iconOnClass: "iconOnClass", iconOnStyle: "iconOnStyle", iconOffClass: "iconOffClass", iconOffStyle: "iconOffStyle", iconCancelClass: "iconCancelClass", iconCancelStyle: "iconCancelStyle", autofocus: ["autofocus", "autofocus", booleanAttribute] }, outputs: { onRate: "onRate", onCancel: "onCancel", onFocus: "onFocus", onBlur: "onBlur" }, host: { classAttribute: "p-element" }, providers: [RATING_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div class="p-rating" [ngClass]="{ 'p-readonly': readonly, 'p-disabled': disabled }" [attr.data-pc-name]="'rating'" [attr.data-pc-section]="'root'">
            <ng-container *ngIf="!isCustomIcon; else customTemplate">
                <div *ngIf="cancel" [attr.data-pc-section]="'cancelItem'" (click)="onOptionClick($event, 0)" [ngClass]="{ 'p-focus': focusedOptionIndex() === 0 && isFocusVisibleItem }" class="p-rating-item p-rating-cancel-item">
                    <span class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                        <input
                            type="radio"
                            value="0"
                            [name]="name"
                            [checked]="value === 0"
                            [disabled]="disabled"
                            [readonly]="readonly"
                            [attr.aria-label]="cancelAriaLabel()"
                            (focus)="onInputFocus($event, 0)"
                            (blur)="onInputBlur($event)"
                            (change)="onChange($event, 0)"
                            pAutoFocus
                            [autofocus]="autofocus"
                        />
                    </span>
                    <span *ngIf="iconCancelClass" class="p-rating-icon p-rating-cancel" [ngClass]="iconCancelClass" [ngStyle]="iconCancelStyle"></span>
                    <BanIcon *ngIf="!iconCancelClass" [styleClass]="'p-rating-icon p-rating-cancel'" [ngStyle]="iconCancelStyle" [attr.data-pc-section]="'cancelIcon'" />
                </div>
                <ng-template ngFor [ngForOf]="starsArray" let-star let-i="index">
                    <div class="p-rating-item" [ngClass]="{ 'p-rating-item-active': star + 1 <= value, 'p-focus': star + 1 === focusedOptionIndex() && isFocusVisibleItem }" (click)="onOptionClick($event, star + 1)">
                        <span class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                            <input
                                type="radio"
                                value="0"
                                [name]="name"
                                [checked]="value === 0"
                                [disabled]="disabled"
                                [readonly]="readonly"
                                [attr.aria-label]="starAriaLabel(star + 1)"
                                (focus)="onInputFocus($event, star + 1)"
                                (blur)="onInputBlur($event)"
                                (change)="onChange($event, star + 1)"
                                pAutoFocus
                                [autofocus]="autofocus"
                            />
                        </span>
                        <ng-container *ngIf="!value || i >= value">
                            <span class="p-rating-icon" *ngIf="iconOffClass" [ngStyle]="iconOffStyle" [ngClass]="iconOffClass" [attr.data-pc-section]="'offIcon'"></span>
                            <StarIcon *ngIf="!iconOffClass" [ngStyle]="iconOffStyle" [styleClass]="'p-rating-icon'" [attr.data-pc-section]="'offIcon'" />
                        </ng-container>
                        <ng-container *ngIf="value && i < value">
                            <span class="p-rating-icon p-rating-icon-active" *ngIf="iconOnClass" [ngStyle]="iconOnStyle" [ngClass]="iconOnClass" [attr.data-pc-section]="'onIcon'"></span>
                            <StarFillIcon *ngIf="!iconOnClass" [ngStyle]="iconOnStyle" [styleClass]="'p-rating-icon p-rating-icon-active'" [attr.data-pc-section]="'onIcon'" />
                        </ng-container>
                    </div>
                </ng-template>
            </ng-container>
            <ng-template #customTemplate>
                <span *ngIf="cancel" (click)="onOptionClick($event, 0)" class="p-rating-icon p-rating-cancel" [ngStyle]="iconCancelStyle" [attr.data-pc-section]="'cancelIcon'">
                    <ng-container *ngTemplateOutlet="cancelIconTemplate"></ng-container>
                </span>
                <span *ngFor="let star of starsArray; let i = index" class="p-rating-icon" (click)="onOptionClick($event, star + 1)" [attr.data-pc-section]="'onIcon'">
                    <ng-container *ngTemplateOutlet="getIconTemplate(i)"></ng-container>
                </span>
            </ng-template>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-rating{display:inline-flex;position:relative;align-items:center}.p-rating-icon{cursor:pointer}.p-rating.p-rating-readonly .p-rating-icon{cursor:default}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.AutoFocus), selector: "[pAutoFocus]", inputs: ["autofocus"] }, { kind: "component", type: i0.forwardRef(() => StarFillIcon), selector: "StarFillIcon" }, { kind: "component", type: i0.forwardRef(() => StarIcon), selector: "StarIcon" }, { kind: "component", type: i0.forwardRef(() => BanIcon), selector: "BanIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Rating, decorators: [{
            type: Component,
            args: [{ selector: 'p-rating', template: `
        <div class="p-rating" [ngClass]="{ 'p-readonly': readonly, 'p-disabled': disabled }" [attr.data-pc-name]="'rating'" [attr.data-pc-section]="'root'">
            <ng-container *ngIf="!isCustomIcon; else customTemplate">
                <div *ngIf="cancel" [attr.data-pc-section]="'cancelItem'" (click)="onOptionClick($event, 0)" [ngClass]="{ 'p-focus': focusedOptionIndex() === 0 && isFocusVisibleItem }" class="p-rating-item p-rating-cancel-item">
                    <span class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                        <input
                            type="radio"
                            value="0"
                            [name]="name"
                            [checked]="value === 0"
                            [disabled]="disabled"
                            [readonly]="readonly"
                            [attr.aria-label]="cancelAriaLabel()"
                            (focus)="onInputFocus($event, 0)"
                            (blur)="onInputBlur($event)"
                            (change)="onChange($event, 0)"
                            pAutoFocus
                            [autofocus]="autofocus"
                        />
                    </span>
                    <span *ngIf="iconCancelClass" class="p-rating-icon p-rating-cancel" [ngClass]="iconCancelClass" [ngStyle]="iconCancelStyle"></span>
                    <BanIcon *ngIf="!iconCancelClass" [styleClass]="'p-rating-icon p-rating-cancel'" [ngStyle]="iconCancelStyle" [attr.data-pc-section]="'cancelIcon'" />
                </div>
                <ng-template ngFor [ngForOf]="starsArray" let-star let-i="index">
                    <div class="p-rating-item" [ngClass]="{ 'p-rating-item-active': star + 1 <= value, 'p-focus': star + 1 === focusedOptionIndex() && isFocusVisibleItem }" (click)="onOptionClick($event, star + 1)">
                        <span class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                            <input
                                type="radio"
                                value="0"
                                [name]="name"
                                [checked]="value === 0"
                                [disabled]="disabled"
                                [readonly]="readonly"
                                [attr.aria-label]="starAriaLabel(star + 1)"
                                (focus)="onInputFocus($event, star + 1)"
                                (blur)="onInputBlur($event)"
                                (change)="onChange($event, star + 1)"
                                pAutoFocus
                                [autofocus]="autofocus"
                            />
                        </span>
                        <ng-container *ngIf="!value || i >= value">
                            <span class="p-rating-icon" *ngIf="iconOffClass" [ngStyle]="iconOffStyle" [ngClass]="iconOffClass" [attr.data-pc-section]="'offIcon'"></span>
                            <StarIcon *ngIf="!iconOffClass" [ngStyle]="iconOffStyle" [styleClass]="'p-rating-icon'" [attr.data-pc-section]="'offIcon'" />
                        </ng-container>
                        <ng-container *ngIf="value && i < value">
                            <span class="p-rating-icon p-rating-icon-active" *ngIf="iconOnClass" [ngStyle]="iconOnStyle" [ngClass]="iconOnClass" [attr.data-pc-section]="'onIcon'"></span>
                            <StarFillIcon *ngIf="!iconOnClass" [ngStyle]="iconOnStyle" [styleClass]="'p-rating-icon p-rating-icon-active'" [attr.data-pc-section]="'onIcon'" />
                        </ng-container>
                    </div>
                </ng-template>
            </ng-container>
            <ng-template #customTemplate>
                <span *ngIf="cancel" (click)="onOptionClick($event, 0)" class="p-rating-icon p-rating-cancel" [ngStyle]="iconCancelStyle" [attr.data-pc-section]="'cancelIcon'">
                    <ng-container *ngTemplateOutlet="cancelIconTemplate"></ng-container>
                </span>
                <span *ngFor="let star of starsArray; let i = index" class="p-rating-icon" (click)="onOptionClick($event, star + 1)" [attr.data-pc-section]="'onIcon'">
                    <ng-container *ngTemplateOutlet="getIconTemplate(i)"></ng-container>
                </span>
            </ng-template>
        </div>
    `, providers: [RATING_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-rating{display:inline-flex;position:relative;align-items:center}.p-rating-icon{cursor:pointer}.p-rating.p-rating-readonly .p-rating-icon{cursor:default}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }], propDecorators: { disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], readonly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], stars: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], cancel: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], iconOnClass: [{
                type: Input
            }], iconOnStyle: [{
                type: Input
            }], iconOffClass: [{
                type: Input
            }], iconOffStyle: [{
                type: Input
            }], iconCancelClass: [{
                type: Input
            }], iconCancelStyle: [{
                type: Input
            }], autofocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onRate: [{
                type: Output
            }], onCancel: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class RatingModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: RatingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: RatingModule, declarations: [Rating], imports: [CommonModule, AutoFocusModule, StarFillIcon, StarIcon, BanIcon], exports: [Rating, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: RatingModule, imports: [CommonModule, AutoFocusModule, StarFillIcon, StarIcon, BanIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: RatingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AutoFocusModule, StarFillIcon, StarIcon, BanIcon],
                    exports: [Rating, SharedModule],
                    declarations: [Rating]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3JhdGluZy9yYXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSx1QkFBdUIsRUFBcUIsU0FBUyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFVLE1BQU0sRUFBYSxNQUFNLEVBQWUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeFAsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBaUIsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUd0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7O0FBRXBELE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFRO0lBQ3RDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDckMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBQ0Y7OztHQUdHO0FBeUVILE1BQU0sT0FBTyxNQUFNO0lBdUdLO0lBQStCO0lBdEduRDs7O09BR0c7SUFDcUMsUUFBUSxDQUFz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LE1BQU07c0JBQWYsTUFBTTtnQkFNRyxRQUFRO3NCQUFqQixNQUFNO2dCQU1HLE9BQU87c0JBQWhCLE1BQU07Z0JBTUcsTUFBTTtzQkFBZixNQUFNO2dCQUV5QixTQUFTO3NCQUF4QyxlQUFlO3VCQUFDLGFBQWE7O0FBdUlsQyxNQUFNLE9BQU8sWUFBWTt1R0FBWixZQUFZO3dHQUFaLFlBQVksaUJBeE5aLE1BQU0sYUFvTkwsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE9BQU8sYUFwTi9ELE1BQU0sRUFxTkcsWUFBWTt3R0FHckIsWUFBWSxZQUpYLFlBQVksRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQ3RELFlBQVk7OzJGQUdyQixZQUFZO2tCQUx4QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUM7b0JBQ3pFLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUM7b0JBQy9CLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQztpQkFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgYm9vbGVhbkF0dHJpYnV0ZSwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgTmdNb2R1bGUsIG51bWJlckF0dHJpYnV0ZSwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgc2lnbmFsLCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFByaW1lTkdDb25maWcsIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEJhbkljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2Jhbic7XG5pbXBvcnQgeyBTdGFySWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvc3Rhcic7XG5pbXBvcnQgeyBTdGFyRmlsbEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3N0YXJmaWxsJztcbmltcG9ydCB7IE51bGxhYmxlIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IFJhdGluZ1JhdGVFdmVudCB9IGZyb20gJy4vcmF0aW5nLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgVW5pcXVlQ29tcG9uZW50SWQgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7IEF1dG9Gb2N1c01vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXV0b2ZvY3VzJztcblxuZXhwb3J0IGNvbnN0IFJBVElOR19WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJhdGluZyksXG4gICAgbXVsdGk6IHRydWVcbn07XG4vKipcbiAqIFJhdGluZyBpcyBhbiBleHRlbnNpb24gdG8gc3RhbmRhcmQgcmFkaW8gYnV0dG9uIGVsZW1lbnQgd2l0aCB0aGVtaW5nLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXJhdGluZycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInAtcmF0aW5nXCIgW25nQ2xhc3NdPVwieyAncC1yZWFkb25seSc6IHJlYWRvbmx5LCAncC1kaXNhYmxlZCc6IGRpc2FibGVkIH1cIiBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ3JhdGluZydcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3Jvb3QnXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzQ3VzdG9tSWNvbjsgZWxzZSBjdXN0b21UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJjYW5jZWxcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2NhbmNlbEl0ZW0nXCIgKGNsaWNrKT1cIm9uT3B0aW9uQ2xpY2soJGV2ZW50LCAwKVwiIFtuZ0NsYXNzXT1cInsgJ3AtZm9jdXMnOiBmb2N1c2VkT3B0aW9uSW5kZXgoKSA9PT0gMCAmJiBpc0ZvY3VzVmlzaWJsZUl0ZW0gfVwiIGNsYXNzPVwicC1yYXRpbmctaXRlbSBwLXJhdGluZy1jYW5jZWwtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIiBbYXR0ci5kYXRhLXAtaGlkZGVuLWFjY2Vzc2libGVdPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cInZhbHVlID09PSAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjYW5jZWxBcmlhTGFiZWwoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQsIDApXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudCwgMClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBBdXRvRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXV0b2ZvY3VzXT1cImF1dG9mb2N1c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaWNvbkNhbmNlbENsYXNzXCIgY2xhc3M9XCJwLXJhdGluZy1pY29uIHAtcmF0aW5nLWNhbmNlbFwiIFtuZ0NsYXNzXT1cImljb25DYW5jZWxDbGFzc1wiIFtuZ1N0eWxlXT1cImljb25DYW5jZWxTdHlsZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPEJhbkljb24gKm5nSWY9XCIhaWNvbkNhbmNlbENsYXNzXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtcmF0aW5nLWljb24gcC1yYXRpbmctY2FuY2VsJ1wiIFtuZ1N0eWxlXT1cImljb25DYW5jZWxTdHlsZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2FuY2VsSWNvbidcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJzdGFyc0FycmF5XCIgbGV0LXN0YXIgbGV0LWk9XCJpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1yYXRpbmctaXRlbVwiIFtuZ0NsYXNzXT1cInsgJ3AtcmF0aW5nLWl0ZW0tYWN0aXZlJzogc3RhciArIDEgPD0gdmFsdWUsICdwLWZvY3VzJzogc3RhciArIDEgPT09IGZvY3VzZWRPcHRpb25JbmRleCgpICYmIGlzRm9jdXNWaXNpYmxlSXRlbSB9XCIgKGNsaWNrKT1cIm9uT3B0aW9uQ2xpY2soJGV2ZW50LCBzdGFyICsgMSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZVwiIFthdHRyLmRhdGEtcC1oaWRkZW4tYWNjZXNzaWJsZV09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2hlY2tlZF09XCJ2YWx1ZSA9PT0gMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwic3RhckFyaWFMYWJlbChzdGFyICsgMSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudCwgc3RhciArIDEpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50LCBzdGFyICsgMSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwQXV0b0ZvY3VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdXRvZm9jdXNdPVwiYXV0b2ZvY3VzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF2YWx1ZSB8fCBpID49IHZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXJhdGluZy1pY29uXCIgKm5nSWY9XCJpY29uT2ZmQ2xhc3NcIiBbbmdTdHlsZV09XCJpY29uT2ZmU3R5bGVcIiBbbmdDbGFzc109XCJpY29uT2ZmQ2xhc3NcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ29mZkljb24nXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdGFySWNvbiAqbmdJZj1cIiFpY29uT2ZmQ2xhc3NcIiBbbmdTdHlsZV09XCJpY29uT2ZmU3R5bGVcIiBbc3R5bGVDbGFzc109XCIncC1yYXRpbmctaWNvbidcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ29mZkljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInZhbHVlICYmIGkgPCB2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1yYXRpbmctaWNvbiBwLXJhdGluZy1pY29uLWFjdGl2ZVwiICpuZ0lmPVwiaWNvbk9uQ2xhc3NcIiBbbmdTdHlsZV09XCJpY29uT25TdHlsZVwiIFtuZ0NsYXNzXT1cImljb25PbkNsYXNzXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidvbkljb24nXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdGFyRmlsbEljb24gKm5nSWY9XCIhaWNvbk9uQ2xhc3NcIiBbbmdTdHlsZV09XCJpY29uT25TdHlsZVwiIFtzdHlsZUNsYXNzXT1cIidwLXJhdGluZy1pY29uIHAtcmF0aW5nLWljb24tYWN0aXZlJ1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInb25JY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNjdXN0b21UZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNhbmNlbFwiIChjbGljayk9XCJvbk9wdGlvbkNsaWNrKCRldmVudCwgMClcIiBjbGFzcz1cInAtcmF0aW5nLWljb24gcC1yYXRpbmctY2FuY2VsXCIgW25nU3R5bGVdPVwiaWNvbkNhbmNlbFN0eWxlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjYW5jZWxJY29uJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2FuY2VsSWNvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0Zvcj1cImxldCBzdGFyIG9mIHN0YXJzQXJyYXk7IGxldCBpID0gaW5kZXhcIiBjbGFzcz1cInAtcmF0aW5nLWljb25cIiAoY2xpY2spPVwib25PcHRpb25DbGljaygkZXZlbnQsIHN0YXIgKyAxKVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInb25JY29uJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZ2V0SWNvblRlbXBsYXRlKGkpXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtSQVRJTkdfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vcmF0aW5nLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBSYXRpbmcgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IHRoZSBlbGVtZW50IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBjaGFuZ2luZyB0aGUgdmFsdWUgaXMgbm90IHBvc3NpYmxlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByZWFkb25seTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBOdW1iZXIgb2Ygc3RhcnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgc3RhcnM6IG51bWJlciA9IDU7XG4gICAgLyoqXG4gICAgICogV2hlbiBzcGVjaWZpZWQgYSBjYW5jZWwgaWNvbiBpcyBkaXNwbGF5ZWQgdG8gYWxsb3cgcmVtb3ZpbmcgdGhlIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBjYW5jZWw6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBvbiBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGljb25PbkNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBvbiBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGljb25PblN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBvZmYgaWNvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpY29uT2ZmQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIG9mZiBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGljb25PZmZTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY2FuY2VsIGljb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWNvbkNhbmNlbENsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjYW5jZWwgaWNvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpY29uQ2FuY2VsU3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgY29tcG9uZW50IHNob3VsZCBhdXRvbWF0aWNhbGx5IGdldCBmb2N1cyBvbiBsb2FkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBhdXRvZm9jdXM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRW1pdHRlZCBvbiB2YWx1ZSBjaGFuZ2UuXG4gICAgICogQHBhcmFtIHtSYXRpbmdSYXRlRXZlbnR9IHZhbHVlIC0gQ3VzdG9tIHJhdGUgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uUmF0ZTogRXZlbnRFbWl0dGVyPFJhdGluZ1JhdGVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFJhdGluZ1JhdGVFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBFbWl0dGVkIHdoZW4gdGhlIHJhdGluZyBpcyBjYW5jZWxsZWQuXG4gICAgICogQHBhcmFtIHtFdmVudH0gdmFsdWUgLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNhbmNlbDogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogRW1pdHRlZCB3aGVuIHRoZSByYXRpbmcgcmVjZWl2ZXMgZm9jdXMuXG4gICAgICogQHBhcmFtIHtFdmVudH0gdmFsdWUgLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogRW1pdHRlZCB3aGVuIHRoZSByYXRpbmcgbG9zZXMgZm9jdXMuXG4gICAgICogQHBhcmFtIHtFdmVudH0gdmFsdWUgLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzITogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+O1xuXG4gICAgb25JY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgb2ZmSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGNhbmNlbEljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICB2YWx1ZTogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIHB1YmxpYyBzdGFyc0FycmF5OiBOdWxsYWJsZTxudW1iZXJbXT47XG5cbiAgICBpc0ZvY3VzVmlzaWJsZUl0ZW06IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgZm9jdXNlZE9wdGlvbkluZGV4ID0gc2lnbmFsPG51bWJlcj4oLTEpO1xuXG4gICAgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgY29uZmlnOiBQcmltZU5HQ29uZmlnKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMubmFtZSB8fCBVbmlxdWVDb21wb25lbnRJZCgpO1xuICAgICAgICB0aGlzLnN0YXJzQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YXJzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnNBcnJheVtpXSA9IGk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdvbmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdvZmZpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vZmZJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NhbmNlbGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbk9wdGlvbkNsaWNrKGV2ZW50LCB2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25PcHRpb25TZWxlY3QoZXZlbnQsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuaXNGb2N1c1Zpc2libGVJdGVtID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBmaXJzdEZvY3VzYWJsZUVsID0gRG9tSGFuZGxlci5nZXRGaXJzdEZvY3VzYWJsZUVsZW1lbnQoZXZlbnQuY3VycmVudFRhcmdldCwgJycpO1xuXG4gICAgICAgICAgICBmaXJzdEZvY3VzYWJsZUVsICYmIERvbUhhbmRsZXIuZm9jdXMoZmlyc3RGb2N1c2FibGVFbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk9wdGlvblNlbGVjdChldmVudCwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KHZhbHVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbChldmVudCwgdmFsdWUgfHwgbnVsbCk7XG4gICAgfVxuXG4gICAgb25DaGFuZ2UoZXZlbnQsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMub25PcHRpb25TZWxlY3QoZXZlbnQsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5pc0ZvY3VzVmlzaWJsZUl0ZW0gPSB0cnVlO1xuICAgIH1cblxuICAgIG9uSW5wdXRCbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uSW5wdXRGb2N1cyhldmVudCwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KHZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkZvY3VzLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZGVsKGV2ZW50LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuXG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMub25DYW5jZWwuZW1pdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vblJhdGUuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuY2VsQXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHJhbnNsYXRpb24uY2xlYXI7XG4gICAgfVxuXG4gICAgc3RhckFyaWFMYWJlbCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IDEgPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLnN0YXIgOiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLnN0YXJzLnJlcGxhY2UoL3tzdGFyfS9nLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0SWNvblRlbXBsYXRlKGk6IG51bWJlcik6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+IHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnZhbHVlIHx8IGkgPj0gdGhpcy52YWx1ZSA/IHRoaXMub2ZmSWNvblRlbXBsYXRlIDogdGhpcy5vbkljb25UZW1wbGF0ZTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0IGlzQ3VzdG9tSWNvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVzICYmIHRoaXMudGVtcGxhdGVzLmxlbmd0aCA+IDA7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEF1dG9Gb2N1c01vZHVsZSwgU3RhckZpbGxJY29uLCBTdGFySWNvbiwgQmFuSWNvbl0sXG4gICAgZXhwb3J0czogW1JhdGluZywgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtSYXRpbmddXG59KVxuZXhwb3J0IGNsYXNzIFJhdGluZ01vZHVsZSB7fVxuIl19