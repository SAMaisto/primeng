import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Input, NgModule, ViewEncapsulation, forwardRef, inject, ViewChild } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MeterGroupLabel {
    value = null;
    labelPosition = 'end';
    labelOrientation = 'horizontal';
    min;
    max;
    iconTemplate;
    templates;
    get labelClass() {
        return {
            'p-metergroup-labels p-component': true,
            'p-metergroup-labels-vertical': this.labelOrientation === 'vertical',
            'p-metergroup-labels-horizontal': this.labelOrientation === 'horizontal'
        };
    }
    parentInstance = inject(forwardRef(() => MeterGroup));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MeterGroupLabel, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.1", type: MeterGroupLabel, selector: "p-meterGroupLabel", inputs: { value: "value", labelPosition: "labelPosition", labelOrientation: "labelOrientation", min: "min", max: "max", iconTemplate: "iconTemplate" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <ol [ngClass]="labelClass">
            <li *ngFor="let labelItem of value; let index = index; trackBy: parentInstance.trackByFn" class="p-metergroup-label">
                <ng-container *ngIf="!iconTemplate">
                    <i *ngIf="labelItem.icon" [class]="labelItem.icon" [ngClass]="{ 'p-metergroup-label-icon': true }" [ngStyle]="{ color: labelItem.color }"></i>
                    <span *ngIf="!labelItem.icon" class="p-metergroup-label-marker" [ngStyle]="{ backgroundColor: labelItem.color }"></span>
                </ng-container>
                <ng-container *ngTemplateOutlet="iconTemplate; context: { $implicit: labelItem, icon: labelItem.icon }"></ng-container>
                <span class="p-metergroup-label-text">{{ labelItem.label }} ({{ parentInstance?.percentValue(labelItem.value) }})</span>
            </li>
        </ol>
    `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MeterGroupLabel, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-meterGroupLabel',
                    template: `
        <ol [ngClass]="labelClass">
            <li *ngFor="let labelItem of value; let index = index; trackBy: parentInstance.trackByFn" class="p-metergroup-label">
                <ng-container *ngIf="!iconTemplate">
                    <i *ngIf="labelItem.icon" [class]="labelItem.icon" [ngClass]="{ 'p-metergroup-label-icon': true }" [ngStyle]="{ color: labelItem.color }"></i>
                    <span *ngIf="!labelItem.icon" class="p-metergroup-label-marker" [ngStyle]="{ backgroundColor: labelItem.color }"></span>
                </ng-container>
                <ng-container *ngTemplateOutlet="iconTemplate; context: { $implicit: labelItem, icon: labelItem.icon }"></ng-container>
                <span class="p-metergroup-label-text">{{ labelItem.label }} ({{ parentInstance?.percentValue(labelItem.value) }})</span>
            </li>
        </ol>
    `
                }]
        }], propDecorators: { value: [{
                type: Input
            }], labelPosition: [{
                type: Input
            }], labelOrientation: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], iconTemplate: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
/**
 * MeterGroup displays scalar measurements within a known range.
 * @group Components
 */
export class MeterGroup {
    /**
     * Current value of the metergroup.
     * @group Props
     */
    value;
    /**
     * Mininum boundary value.
     * @group Props
     */
    min = 0;
    /**
     * Maximum boundary value.
     * @group Props
     */
    max = 100;
    /**
     * Specifies the layout of the component, valid values are 'horizontal' and 'vertical'.
     * @group Props
     */
    orientation = 'horizontal';
    /**
     * Specifies the label position of the component, valid values are 'start' and 'end'.
     * @group Props
     */
    labelPosition = 'end';
    /**
     * Specifies the label orientation of the component, valid values are 'horizontal' and 'vertical'.
     * @group Props
     */
    labelOrientation = 'horizontal';
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
    templates;
    get vertical() {
        return this.orientation === 'vertical';
    }
    get containerClass() {
        return {
            'p-metergroup p-component': true,
            'p-metergroup-horizontal': this.orientation === 'horizontal',
            'p-metergroup-vertical': this.orientation === 'vertical'
        };
    }
    labelTemplate;
    meterTemplate;
    endTemplate;
    startTemplate;
    iconTemplate;
    container;
    ngAfterViewInit() {
        const _container = this.container.nativeElement;
        const height = DomHandler.getOuterHeight(_container);
        this.vertical && (_container.style.height = height + 'px');
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'label':
                    this.labelTemplate = item.template;
                    break;
                case 'meter':
                    this.meterTemplate = item.template;
                    break;
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
                case 'start':
                    this.startTemplate = item.template;
                    break;
                case 'end':
                    this.endTemplate = item.template;
                    break;
                default:
                    break;
            }
        });
    }
    percent(meter = 0) {
        const percentOfItem = ((meter - this.min) / (this.max - this.min)) * 100;
        return Math.round(Math.max(0, Math.min(100, percentOfItem)));
    }
    percentValue(meter) {
        return this.percent(meter) + '%';
    }
    meterStyle(val) {
        return {
            backgroundColor: val.color,
            width: this.orientation === 'horizontal' && this.percentValue(val.value),
            height: this.orientation === 'vertical' && this.percentValue(val.value)
        };
    }
    totalPercent() {
        return this.percent(this.value.reduce((total, val) => total + val.value, 0));
    }
    percentages() {
        let sum = 0;
        const sumsArray = [];
        this.value.forEach((item) => {
            sum += item.value;
            sumsArray.push(sum);
        });
        return sumsArray;
    }
    trackByFn(index) {
        return index;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MeterGroup, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.1", type: MeterGroup, selector: "p-meterGroup", inputs: { value: "value", min: "min", max: "max", orientation: "orientation", labelPosition: "labelPosition", labelOrientation: "labelOrientation", style: "style", styleClass: "styleClass" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ElementRef }], ngImport: i0, template: `
        <div #container [ngClass]="containerClass" role="meter" [attr.aria-valuemin]="min" [attr.aria-valuemax]="max" [attr.aria-valuenow]="totalPercent()" [ngStyle]="style" [class]="styleClass">
            @if(labelPosition ==='start') {
            <p-meterGroupLabel *ngIf="!labelTemplate" [value]="value" [labelPosition]="labelPosition" [labelOrientation]="labelOrientation" [min]="min" [max]="max" [iconTemplate]="iconTemplate" />
            <ng-container *ngTemplateOutlet="labelTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            }
            <ng-container *ngTemplateOutlet="startTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            <div class="p-metergroup-meters">
                <ng-container *ngFor="let meterItem of value; let index = index; trackBy: trackByFn">
                    <ng-container *ngTemplateOutlet="meterTemplate; context: { $implicit: meterItem, index: index, orientation: this.orientation, class: 'p-metergroup-meter', size: percentValue(meterItem.value), totalPercent: totalPercent() }">
                    </ng-container>
                    <ng-container *ngIf="!meterTemplate">
                        <span class="p-metergroup-meter" [ngStyle]="meterStyle(meterItem)"></span>
                    </ng-container>
                </ng-container>
            </div>
            <ng-container *ngTemplateOutlet="endTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            @if(labelPosition === 'end') {
            <p-meterGroupLabel *ngIf="!labelTemplate" [value]="value" [labelPosition]="labelPosition" [labelOrientation]="labelOrientation" [min]="min" [max]="max" [iconTemplate]="iconTemplate" />
            <ng-container *ngTemplateOutlet="labelTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            }
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: MeterGroupLabel, selector: "p-meterGroupLabel", inputs: ["value", "labelPosition", "labelOrientation", "min", "max", "iconTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MeterGroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-meterGroup',
                    template: `
        <div #container [ngClass]="containerClass" role="meter" [attr.aria-valuemin]="min" [attr.aria-valuemax]="max" [attr.aria-valuenow]="totalPercent()" [ngStyle]="style" [class]="styleClass">
            @if(labelPosition ==='start') {
            <p-meterGroupLabel *ngIf="!labelTemplate" [value]="value" [labelPosition]="labelPosition" [labelOrientation]="labelOrientation" [min]="min" [max]="max" [iconTemplate]="iconTemplate" />
            <ng-container *ngTemplateOutlet="labelTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            }
            <ng-container *ngTemplateOutlet="startTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            <div class="p-metergroup-meters">
                <ng-container *ngFor="let meterItem of value; let index = index; trackBy: trackByFn">
                    <ng-container *ngTemplateOutlet="meterTemplate; context: { $implicit: meterItem, index: index, orientation: this.orientation, class: 'p-metergroup-meter', size: percentValue(meterItem.value), totalPercent: totalPercent() }">
                    </ng-container>
                    <ng-container *ngIf="!meterTemplate">
                        <span class="p-metergroup-meter" [ngStyle]="meterStyle(meterItem)"></span>
                    </ng-container>
                </ng-container>
            </div>
            <ng-container *ngTemplateOutlet="endTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            @if(labelPosition === 'end') {
            <p-meterGroupLabel *ngIf="!labelTemplate" [value]="value" [labelPosition]="labelPosition" [labelOrientation]="labelOrientation" [min]="min" [max]="max" [iconTemplate]="iconTemplate" />
            <ng-container *ngTemplateOutlet="labelTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            }
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], propDecorators: { value: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], orientation: [{
                type: Input
            }], labelPosition: [{
                type: Input
            }], labelOrientation: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ElementRef }]
            }] } });
export class MeterGroupModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MeterGroupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: MeterGroupModule, declarations: [MeterGroup, MeterGroupLabel], imports: [CommonModule, SharedModule], exports: [MeterGroup, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MeterGroupModule, imports: [CommonModule, SharedModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MeterGroupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule],
                    exports: [MeterGroup, SharedModule],
                    declarations: [MeterGroup, MeterGroupLabel]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0ZXJncm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9tZXRlcmdyb3VwL21ldGVyZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBb0IsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBMEIsaUJBQWlCLEVBQVUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDck4sT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBa0J6QyxNQUFNLE9BQU8sZUFBZTtJQUNmLEtBQUssR0FBVSxJQUFJLENBQUM7SUFFcEIsYUFBYSxHQUFvQixLQUFLLENBQUM7SUFFdkMsZ0JBQWdCLEdBQThCLFlBQVksQ0FBQztJQUUzRCxHQUFHLENBQVM7SUFFWixHQUFHLENBQVM7SUFFWixZQUFZLENBQStCO0lBRXBCLFNBQVMsQ0FBdUM7SUFFaEYsSUFBSSxVQUFVO1FBQ1YsT0FBTztZQUNILGlDQUFpQyxFQUFFLElBQUk7WUFDdkMsOEJBQThCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixLQUFLLFVBQVU7WUFDcEUsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixLQUFLLFlBQVk7U0FDM0UsQ0FBQztJQUNOLENBQUM7SUFFRCxjQUFjLEdBQWUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3VHQXZCekQsZUFBZTsyRkFBZixlQUFlLDJPQWFQLGFBQWEsNkJBMUJwQjs7Ozs7Ozs7Ozs7S0FXVDs7MkZBRVEsZUFBZTtrQkFmM0IsU0FBUzttQkFBQztv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QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIElucHV0LCBOZ01vZHVsZSwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24sIGVmZmVjdCwgZm9yd2FyZFJlZiwgaW5qZWN0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBNZXRlckl0ZW0gfSBmcm9tICcuL21ldGVyZ3JvdXAuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLW1ldGVyR3JvdXBMYWJlbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG9sIFtuZ0NsYXNzXT1cImxhYmVsQ2xhc3NcIj5cbiAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbGFiZWxJdGVtIG9mIHZhbHVlOyBsZXQgaW5kZXggPSBpbmRleDsgdHJhY2tCeTogcGFyZW50SW5zdGFuY2UudHJhY2tCeUZuXCIgY2xhc3M9XCJwLW1ldGVyZ3JvdXAtbGFiZWxcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aSAqbmdJZj1cImxhYmVsSXRlbS5pY29uXCIgW2NsYXNzXT1cImxhYmVsSXRlbS5pY29uXCIgW25nQ2xhc3NdPVwieyAncC1tZXRlcmdyb3VwLWxhYmVsLWljb24nOiB0cnVlIH1cIiBbbmdTdHlsZV09XCJ7IGNvbG9yOiBsYWJlbEl0ZW0uY29sb3IgfVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhbGFiZWxJdGVtLmljb25cIiBjbGFzcz1cInAtbWV0ZXJncm91cC1sYWJlbC1tYXJrZXJcIiBbbmdTdHlsZV09XCJ7IGJhY2tncm91bmRDb2xvcjogbGFiZWxJdGVtLmNvbG9yIH1cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImljb25UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGxhYmVsSXRlbSwgaWNvbjogbGFiZWxJdGVtLmljb24gfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZXRlcmdyb3VwLWxhYmVsLXRleHRcIj57eyBsYWJlbEl0ZW0ubGFiZWwgfX0gKHt7IHBhcmVudEluc3RhbmNlPy5wZXJjZW50VmFsdWUobGFiZWxJdGVtLnZhbHVlKSB9fSk8L3NwYW4+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICA8L29sPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgTWV0ZXJHcm91cExhYmVsIHtcbiAgICBASW5wdXQoKSB2YWx1ZTogYW55W10gPSBudWxsO1xuXG4gICAgQElucHV0KCkgbGFiZWxQb3NpdGlvbjogJ3N0YXJ0JyB8ICdlbmQnID0gJ2VuZCc7XG5cbiAgICBASW5wdXQoKSBsYWJlbE9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuXG4gICAgQElucHV0KCkgbWluOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBtYXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4gfCB1bmRlZmluZWQ7XG5cbiAgICBnZXQgbGFiZWxDbGFzcygpOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1tZXRlcmdyb3VwLWxhYmVscyBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1tZXRlcmdyb3VwLWxhYmVscy12ZXJ0aWNhbCc6IHRoaXMubGFiZWxPcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyxcbiAgICAgICAgICAgICdwLW1ldGVyZ3JvdXAtbGFiZWxzLWhvcml6b250YWwnOiB0aGlzLmxhYmVsT3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHBhcmVudEluc3RhbmNlOiBNZXRlckdyb3VwID0gaW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWV0ZXJHcm91cCkpO1xufVxuLyoqXG4gKiBNZXRlckdyb3VwIGRpc3BsYXlzIHNjYWxhciBtZWFzdXJlbWVudHMgd2l0aGluIGEga25vd24gcmFuZ2UuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbWV0ZXJHcm91cCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzXCIgcm9sZT1cIm1ldGVyXCIgW2F0dHIuYXJpYS12YWx1ZW1pbl09XCJtaW5cIiBbYXR0ci5hcmlhLXZhbHVlbWF4XT1cIm1heFwiIFthdHRyLmFyaWEtdmFsdWVub3ddPVwidG90YWxQZXJjZW50KClcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICBAaWYobGFiZWxQb3NpdGlvbiA9PT0nc3RhcnQnKSB7XG4gICAgICAgICAgICA8cC1tZXRlckdyb3VwTGFiZWwgKm5nSWY9XCIhbGFiZWxUZW1wbGF0ZVwiIFt2YWx1ZV09XCJ2YWx1ZVwiIFtsYWJlbFBvc2l0aW9uXT1cImxhYmVsUG9zaXRpb25cIiBbbGFiZWxPcmllbnRhdGlvbl09XCJsYWJlbE9yaWVudGF0aW9uXCIgW21pbl09XCJtaW5cIiBbbWF4XT1cIm1heFwiIFtpY29uVGVtcGxhdGVdPVwiaWNvblRlbXBsYXRlXCIgLz5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJsYWJlbFRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogdmFsdWUsIHRvdGFsUGVyY2VudDogdG90YWxQZXJjZW50KCksIHBlcmNlbnRhZ2VzOiBwZXJjZW50YWdlcygpIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzdGFydFRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogdmFsdWUsIHRvdGFsUGVyY2VudDogdG90YWxQZXJjZW50KCksIHBlcmNlbnRhZ2VzOiBwZXJjZW50YWdlcygpIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW1ldGVyZ3JvdXAtbWV0ZXJzXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbWV0ZXJJdGVtIG9mIHZhbHVlOyBsZXQgaW5kZXggPSBpbmRleDsgdHJhY2tCeTogdHJhY2tCeUZuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtZXRlclRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogbWV0ZXJJdGVtLCBpbmRleDogaW5kZXgsIG9yaWVudGF0aW9uOiB0aGlzLm9yaWVudGF0aW9uLCBjbGFzczogJ3AtbWV0ZXJncm91cC1tZXRlcicsIHNpemU6IHBlcmNlbnRWYWx1ZShtZXRlckl0ZW0udmFsdWUpLCB0b3RhbFBlcmNlbnQ6IHRvdGFsUGVyY2VudCgpIH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbWV0ZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1ldGVyZ3JvdXAtbWV0ZXJcIiBbbmdTdHlsZV09XCJtZXRlclN0eWxlKG1ldGVySXRlbSlcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW5kVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiB2YWx1ZSwgdG90YWxQZXJjZW50OiB0b3RhbFBlcmNlbnQoKSwgcGVyY2VudGFnZXM6IHBlcmNlbnRhZ2VzKCkgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgQGlmKGxhYmVsUG9zaXRpb24gPT09ICdlbmQnKSB7XG4gICAgICAgICAgICA8cC1tZXRlckdyb3VwTGFiZWwgKm5nSWY9XCIhbGFiZWxUZW1wbGF0ZVwiIFt2YWx1ZV09XCJ2YWx1ZVwiIFtsYWJlbFBvc2l0aW9uXT1cImxhYmVsUG9zaXRpb25cIiBbbGFiZWxPcmllbnRhdGlvbl09XCJsYWJlbE9yaWVudGF0aW9uXCIgW21pbl09XCJtaW5cIiBbbWF4XT1cIm1heFwiIFtpY29uVGVtcGxhdGVdPVwiaWNvblRlbXBsYXRlXCIgLz5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJsYWJlbFRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogdmFsdWUsIHRvdGFsUGVyY2VudDogdG90YWxQZXJjZW50KCksIHBlcmNlbnRhZ2VzOiBwZXJjZW50YWdlcygpIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1ldGVyR3JvdXAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICAvKipcbiAgICAgKiBDdXJyZW50IHZhbHVlIG9mIHRoZSBtZXRlcmdyb3VwLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHZhbHVlOiBNZXRlckl0ZW1bXSB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBNaW5pbnVtIGJvdW5kYXJ5IHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1pbjogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBNYXhpbXVtIGJvdW5kYXJ5IHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1heDogbnVtYmVyID0gMTAwO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB0aGUgbGF5b3V0IG9mIHRoZSBjb21wb25lbnQsIHZhbGlkIHZhbHVlcyBhcmUgJ2hvcml6b250YWwnIGFuZCAndmVydGljYWwnLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB0aGUgbGFiZWwgcG9zaXRpb24gb2YgdGhlIGNvbXBvbmVudCwgdmFsaWQgdmFsdWVzIGFyZSAnc3RhcnQnIGFuZCAnZW5kJy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsYWJlbFBvc2l0aW9uOiAnc3RhcnQnIHwgJ2VuZCcgPSAnZW5kJztcbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGxhYmVsIG9yaWVudGF0aW9uIG9mIHRoZSBjb21wb25lbnQsIHZhbGlkIHZhbHVlcyBhcmUgJ2hvcml6b250YWwnIGFuZCAndmVydGljYWwnLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxhYmVsT3JpZW50YXRpb246IHN0cmluZyA9ICdob3Jpem9udGFsJztcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIGdldCB2ZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCc7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRhaW5lckNsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtbWV0ZXJncm91cCBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1tZXRlcmdyb3VwLWhvcml6b250YWwnOiB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICAncC1tZXRlcmdyb3VwLXZlcnRpY2FsJzogdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGxhYmVsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBtZXRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgZW5kVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBzdGFydFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgaWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyByZWFkOiBFbGVtZW50UmVmIH0pIGNvbnRhaW5lcjogRWxlbWVudFJlZjtcblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgY29uc3QgX2NvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQoX2NvbnRhaW5lcik7XG4gICAgICAgIHRoaXMudmVydGljYWwgJiYgKF9jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4Jyk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcz8uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xhYmVsJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJlbFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWV0ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGVyY2VudChtZXRlciA9IDApIHtcbiAgICAgICAgY29uc3QgcGVyY2VudE9mSXRlbSA9ICgobWV0ZXIgLSB0aGlzLm1pbikgLyAodGhpcy5tYXggLSB0aGlzLm1pbikpICogMTAwO1xuXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgcGVyY2VudE9mSXRlbSkpKTtcbiAgICB9XG5cbiAgICBwZXJjZW50VmFsdWUobWV0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGVyY2VudChtZXRlcikgKyAnJSc7XG4gICAgfVxuXG4gICAgbWV0ZXJTdHlsZSh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdmFsLmNvbG9yLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyAmJiB0aGlzLnBlcmNlbnRWYWx1ZSh2YWwudmFsdWUpLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnICYmIHRoaXMucGVyY2VudFZhbHVlKHZhbC52YWx1ZSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB0b3RhbFBlcmNlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBlcmNlbnQodGhpcy52YWx1ZS5yZWR1Y2UoKHRvdGFsLCB2YWwpID0+IHRvdGFsICsgdmFsLnZhbHVlLCAwKSk7XG4gICAgfVxuXG4gICAgcGVyY2VudGFnZXMoKSB7XG4gICAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgICBjb25zdCBzdW1zQXJyYXkgPSBbXTtcblxuICAgICAgICB0aGlzLnZhbHVlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN1bSArPSBpdGVtLnZhbHVlO1xuICAgICAgICAgICAgc3Vtc0FycmF5LnB1c2goc3VtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHN1bXNBcnJheTtcbiAgICB9XG5cbiAgICB0cmFja0J5Rm4oaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU2hhcmVkTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbTWV0ZXJHcm91cCwgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNZXRlckdyb3VwLCBNZXRlckdyb3VwTGFiZWxdXG59KVxuZXhwb3J0IGNsYXNzIE1ldGVyR3JvdXBNb2R1bGUge31cbiJdfQ==