import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, NgModule, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/tooltip";
/**
 * Dock is a navigation component consisting of menuitems.
 * @group Components
 */
export class Dock {
    el;
    cd;
    /**
     * Current id state as a string.
     * @group Props
     */
    id;
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * MenuModel instance to define the action items.
     * @group Props
     */
    model = null;
    /**
     * Position of element.
     * @group Props
     */
    position = 'bottom';
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel;
    /**
     * Defines a string that labels the dropdown button for accessibility.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Callback to execute when button is focused.
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke when the component loses focus.
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    templates;
    listViewChild;
    itemTemplate;
    currentIndex;
    tabindex = 0;
    focused = false;
    focusedOptionIndex = -1;
    get focusedOptionId() {
        return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    }
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.currentIndex = -3;
    }
    ngOnInit() {
        this.id = this.id || UniqueComponentId();
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    getItemId(item, index) {
        return item && item?.id ? item.id : `${index}`;
    }
    getItemProp(processedItem, name) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name]) : undefined;
    }
    disabled(item) {
        return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
    }
    isItemActive(id) {
        return id === this.focusedOptionIndex;
    }
    onListMouseLeave() {
        this.currentIndex = -3;
        this.cd.markForCheck();
    }
    onItemMouseEnter(index) {
        this.currentIndex = index;
        if (index === 1) {
        }
        this.cd.markForCheck();
    }
    onItemClick(e, item) {
        if (item.command) {
            item.command({ originalEvent: e, item });
        }
    }
    onListFocus(event) {
        this.focused = true;
        this.changeFocusedOptionIndex(0);
        this.onFocus.emit(event);
    }
    onListBlur(event) {
        this.focused = false;
        this.focusedOptionIndex = -1;
        this.onBlur.emit(event);
    }
    onListKeyDown(event) {
        switch (event.code) {
            case 'ArrowDown': {
                if (this.position === 'left' || this.position === 'right')
                    this.onArrowDownKey();
                event.preventDefault();
                break;
            }
            case 'ArrowUp': {
                if (this.position === 'left' || this.position === 'right')
                    this.onArrowUpKey();
                event.preventDefault();
                break;
            }
            case 'ArrowRight': {
                if (this.position === 'top' || this.position === 'bottom')
                    this.onArrowDownKey();
                event.preventDefault();
                break;
            }
            case 'ArrowLeft': {
                if (this.position === 'top' || this.position === 'bottom')
                    this.onArrowUpKey();
                event.preventDefault();
                break;
            }
            case 'Home': {
                this.onHomeKey();
                event.preventDefault();
                break;
            }
            case 'End': {
                this.onEndKey();
                event.preventDefault();
                break;
            }
            case 'Enter':
            case 'Space': {
                this.onSpaceKey();
                event.preventDefault();
                break;
            }
            default:
                break;
        }
    }
    onArrowDownKey() {
        const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex);
        this.changeFocusedOptionIndex(optionIndex);
    }
    onArrowUpKey() {
        const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex);
        this.changeFocusedOptionIndex(optionIndex);
    }
    onHomeKey() {
        this.changeFocusedOptionIndex(0);
    }
    onEndKey() {
        this.changeFocusedOptionIndex(DomHandler.find(this.listViewChild.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]').length - 1);
    }
    onSpaceKey() {
        const element = DomHandler.findSingle(this.listViewChild.nativeElement, `li[id="${`${this.focusedOptionIndex}`}"]`);
        const anchorElement = element && DomHandler.findSingle(element, '[data-pc-section="action"]');
        anchorElement ? anchorElement.click() : element && element.click();
    }
    findNextOptionIndex(index) {
        const menuitems = DomHandler.find(this.listViewChild.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
        const matchedOptionIndex = [...menuitems].findIndex((link) => link.id === index);
        return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    }
    changeFocusedOptionIndex(index) {
        const menuitems = DomHandler.find(this.listViewChild.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
        let order = index >= menuitems.length ? menuitems.length - 1 : index < 0 ? 0 : index;
        this.focusedOptionIndex = menuitems[order].getAttribute('id');
    }
    findPrevOptionIndex(index) {
        const menuitems = DomHandler.find(this.listViewChild.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
        const matchedOptionIndex = [...menuitems].findIndex((link) => link.id === index);
        return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    }
    get containerClass() {
        return {
            ['p-dock p-component ' + ` p-dock-${this.position}`]: true
        };
    }
    isClickableRouterLink(item) {
        return item.routerLink && !item.disabled;
    }
    itemClass(item, index) {
        return {
            'p-dock-item': true,
            'p-dock-item-second-prev': this.currentIndex - 2 === index,
            'p-dock-item-prev': this.currentIndex - 1 === index,
            'p-dock-item-current': this.currentIndex === index,
            'p-dock-item-next': this.currentIndex + 1 === index,
            'p-dock-item-second-next': this.currentIndex + 2 === index,
            'p-focus': this.isItemActive(this.getItemId(item, index))
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Dock, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.1", type: Dock, selector: "p-dock", inputs: { id: "id", style: "style", styleClass: "styleClass", model: "model", position: "position", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy" }, outputs: { onFocus: "onFocus", onBlur: "onBlur" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "listViewChild", first: true, predicate: ["list"], descendants: true }], ngImport: i0, template: `
        <div [ngClass]="containerClass" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'dock'">
            <div class="p-dock-list-container">
                <ul
                    #list
                    [attr.id]="id"
                    class="p-dock-list"
                    role="menu"
                    [attr.aria-orientation]="position === 'bottom' || position === 'top' ? 'horizontal' : 'vertical'"
                    [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                    [tabindex]="tabindex"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.data-pc-section]="'menu'"
                    (focus)="onListFocus($event)"
                    (blur)="onListBlur($event)"
                    (keydown)="onListKeyDown($event)"
                    (mouseleave)="onListMouseLeave()"
                >
                    <li
                        *ngFor="let item of model; let i = index"
                        [attr.id]="getItemId(item, i)"
                        [ngClass]="itemClass(item, i)"
                        role="menuitem"
                        [attr.aria-label]="item.label"
                        [attr.aria-disabled]="disabled(item)"
                        (click)="onItemClick($event, item)"
                        (mouseenter)="onItemMouseEnter(i)"
                        [attr.data-pc-section]="'menuitem'"
                        [attr.data-p-focused]="isItemActive(getItemId(item, i))"
                        [attr.data-p-disabled]="disabled(item) || false"
                    >
                        <div class="p-menuitem-content" [attr.data-pc-section]="'content'">
                            <a
                                *ngIf="isClickableRouterLink(item); else elseBlock"
                                pRipple
                                [routerLink]="item.routerLink"
                                [queryParams]="item.queryParams"
                                [ngClass]="{ 'p-disabled': item.disabled }"
                                class="p-dock-link"
                                [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                                [target]="item.target"
                                [attr.tabindex]="item.disabled || readonly ? null : item.tabindex ? item.tabindex : '-1'"
                                pTooltip
                                [tooltipOptions]="item.tooltipOptions"
                                [fragment]="item.fragment"
                                [queryParamsHandling]="item.queryParamsHandling"
                                [preserveFragment]="item.preserveFragment"
                                [skipLocationChange]="item.skipLocationChange"
                                [replaceUrl]="item.replaceUrl"
                                [state]="item.state"
                                [attr.aria-hidden]="true"
                            >
                                <span class="p-dock-action-icon" *ngIf="item.icon && !itemTemplate" [ngClass]="item.icon" [ngStyle]="item.iconStyle"></span>
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                            </a>
                            <ng-template #elseBlock>
                                <a
                                    [tooltipPosition]="item.tooltipPosition"
                                    [attr.href]="item.url || null"
                                    class="p-dock-link"
                                    pRipple
                                    pTooltip
                                    [tooltipOptions]="item.tooltipOptions"
                                    [ngClass]="{ 'p-disabled': item.disabled }"
                                    [target]="item.target"
                                    [attr.tabindex]="item.disabled || (i !== activeIndex && readonly) ? null : item.tabindex ? item.tabindex : '-1'"
                                    [attr.aria-hidden]="true"
                                >
                                    <span class="p-dock-action-icon" *ngIf="item.icon && !itemTemplate" [ngClass]="item.icon" [ngStyle]="item.iconStyle"></span>
                                    <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                                </a>
                            </ng-template>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-dock{position:absolute;z-index:1;display:flex;justify-content:center;align-items:center;pointer-events:none}.p-dock-list-container{display:flex;pointer-events:auto}.p-dock-list{margin:0;padding:0;list-style:none;display:flex;align-items:center;justify-content:center}.p-dock-item{transition:all .2s cubic-bezier(.4,0,.2,1);will-change:transform}.p-dock-link{display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;cursor:default}.p-dock-item-second-prev,.p-dock-item-second-next{transform:scale(1.2)}.p-dock-item-prev,.p-dock-item-next{transform:scale(1.4)}.p-dock-item-current{transform:scale(1.6);z-index:1}.p-dock-top{left:0;top:0;width:100%}.p-dock-top .p-dock-item{transform-origin:center top}.p-dock-bottom{left:0;bottom:0;width:100%}.p-dock-bottom .p-dock-item{transform-origin:center bottom}.p-dock-right{right:0;top:0;height:100%}.p-dock-right .p-dock-item{transform-origin:center right}.p-dock-right .p-dock-list{flex-direction:column}.p-dock-left{left:0;top:0;height:100%}.p-dock-left .p-dock-item{transform-origin:center left}.p-dock-left .p-dock-list{flex-direction:column}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i3.Ripple, selector: "[pRipple]" }, { kind: "directive", type: i4.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Dock, decorators: [{
            type: Component,
            args: [{ selector: 'p-dock', template: `
        <div [ngClass]="containerClass" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'dock'">
            <div class="p-dock-list-container">
                <ul
                    #list
                    [attr.id]="id"
                    class="p-dock-list"
                    role="menu"
                    [attr.aria-orientation]="position === 'bottom' || position === 'top' ? 'horizontal' : 'vertical'"
                    [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                    [tabindex]="tabindex"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.data-pc-section]="'menu'"
                    (focus)="onListFocus($event)"
                    (blur)="onListBlur($event)"
                    (keydown)="onListKeyDown($event)"
                    (mouseleave)="onListMouseLeave()"
                >
                    <li
                        *ngFor="let item of model; let i = index"
                        [attr.id]="getItemId(item, i)"
                        [ngClass]="itemClass(item, i)"
                        role="menuitem"
                        [attr.aria-label]="item.label"
                        [attr.aria-disabled]="disabled(item)"
                        (click)="onItemClick($event, item)"
                        (mouseenter)="onItemMouseEnter(i)"
                        [attr.data-pc-section]="'menuitem'"
                        [attr.data-p-focused]="isItemActive(getItemId(item, i))"
                        [attr.data-p-disabled]="disabled(item) || false"
                    >
                        <div class="p-menuitem-content" [attr.data-pc-section]="'content'">
                            <a
                                *ngIf="isClickableRouterLink(item); else elseBlock"
                                pRipple
                                [routerLink]="item.routerLink"
                                [queryParams]="item.queryParams"
                                [ngClass]="{ 'p-disabled': item.disabled }"
                                class="p-dock-link"
                                [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                                [target]="item.target"
                                [attr.tabindex]="item.disabled || readonly ? null : item.tabindex ? item.tabindex : '-1'"
                                pTooltip
                                [tooltipOptions]="item.tooltipOptions"
                                [fragment]="item.fragment"
                                [queryParamsHandling]="item.queryParamsHandling"
                                [preserveFragment]="item.preserveFragment"
                                [skipLocationChange]="item.skipLocationChange"
                                [replaceUrl]="item.replaceUrl"
                                [state]="item.state"
                                [attr.aria-hidden]="true"
                            >
                                <span class="p-dock-action-icon" *ngIf="item.icon && !itemTemplate" [ngClass]="item.icon" [ngStyle]="item.iconStyle"></span>
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                            </a>
                            <ng-template #elseBlock>
                                <a
                                    [tooltipPosition]="item.tooltipPosition"
                                    [attr.href]="item.url || null"
                                    class="p-dock-link"
                                    pRipple
                                    pTooltip
                                    [tooltipOptions]="item.tooltipOptions"
                                    [ngClass]="{ 'p-disabled': item.disabled }"
                                    [target]="item.target"
                                    [attr.tabindex]="item.disabled || (i !== activeIndex && readonly) ? null : item.tabindex ? item.tabindex : '-1'"
                                    [attr.aria-hidden]="true"
                                >
                                    <span class="p-dock-action-icon" *ngIf="item.icon && !itemTemplate" [ngClass]="item.icon" [ngStyle]="item.iconStyle"></span>
                                    <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                                </a>
                            </ng-template>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-dock{position:absolute;z-index:1;display:flex;justify-content:center;align-items:center;pointer-events:none}.p-dock-list-container{display:flex;pointer-events:auto}.p-dock-list{margin:0;padding:0;list-style:none;display:flex;align-items:center;justify-content:center}.p-dock-item{transition:all .2s cubic-bezier(.4,0,.2,1);will-change:transform}.p-dock-link{display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;cursor:default}.p-dock-item-second-prev,.p-dock-item-second-next{transform:scale(1.2)}.p-dock-item-prev,.p-dock-item-next{transform:scale(1.4)}.p-dock-item-current{transform:scale(1.6);z-index:1}.p-dock-top{left:0;top:0;width:100%}.p-dock-top .p-dock-item{transform-origin:center top}.p-dock-bottom{left:0;bottom:0;width:100%}.p-dock-bottom .p-dock-item{transform-origin:center bottom}.p-dock-right{right:0;top:0;height:100%}.p-dock-right .p-dock-item{transform-origin:center right}.p-dock-right .p-dock-list{flex-direction:column}.p-dock-left{left:0;top:0;height:100%}.p-dock-left .p-dock-item{transform-origin:center left}.p-dock-left .p-dock-list{flex-direction:column}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { id: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], model: [{
                type: Input
            }], position: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], listViewChild: [{
                type: ViewChild,
                args: ['list', { static: false }]
            }] } });
export class DockModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: DockModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: DockModule, declarations: [Dock], imports: [CommonModule, RouterModule, RippleModule, TooltipModule], exports: [Dock, SharedModule, TooltipModule, RouterModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: DockModule, imports: [CommonModule, RouterModule, RippleModule, TooltipModule, SharedModule, TooltipModule, RouterModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: DockModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, RippleModule, TooltipModule],
                    exports: [Dock, SharedModule, TooltipModule, RouterModule],
                    declarations: [Dock]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9kb2NrL2RvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBb0IsdUJBQXVCLEVBQXFCLFNBQVMsRUFBRSxlQUFlLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUEwQixTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbE8sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBWSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7QUFDekM7OztHQUdHO0FBeUZILE1BQU0sT0FBTyxJQUFJO0lBbUVPO0lBQXVCO0lBbEUzQzs7O09BR0c7SUFDTSxFQUFFLENBQXFCO0lBQ2hDOzs7T0FHRztJQUNNLEtBQUssQ0FBOEM7SUFDNUQ7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7O09BR0c7SUFDTSxLQUFLLEdBQWtDLElBQUksQ0FBQztJQUNyRDs7O09BR0c7SUFDTSxRQUFRLEdBQXdDLFFBQVEsQ0FBQztJQUNsRTs7O09BR0c7SUFDTSxTQUFTLENBQXFCO0lBQ3ZDOzs7T0FHRztJQUNNLGNBQWMsQ0FBcUI7SUFDNUM7Ozs7T0FJRztJQUNPLE9BQU8sR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQUM3RTs7OztPQUlHO0lBQ08sTUFBTSxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO0lBRTVDLFNBQVMsQ0FBdUM7SUFFMUMsYUFBYSxDQUF1QjtJQUUxRSxZQUFZLENBQStCO0lBRTNDLFlBQVksQ0FBUztJQUVyQixRQUFRLEdBQVcsQ0FBQyxDQUFDO0lBRXJCLE9BQU8sR0FBWSxLQUFLLENBQUM7SUFFekIsa0JBQWtCLEdBQVcsQ0FBQyxDQUFDLENBQUM7SUFFaEMsSUFBSSxlQUFlO1FBQ2YsT0FBTyxJQUFJLENBQUMsa0JBQWtCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzNFLENBQUM7SUFFRCxZQUFvQixFQUFjLEVBQVMsRUFBcUI7UUFBNUMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQzVELElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksaUJBQWlCLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM3QixRQUFRLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDcEIsS0FBSyxNQUFNO29CQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDbEMsTUFBTTtnQkFFVjtvQkFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ2xDLE1BQU07YUFDYjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSztRQUNqQixPQUFPLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRCxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUk7UUFDM0IsT0FBTyxhQUFhLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNoSCxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQUk7UUFDVCxPQUFPLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNqRixDQUFDO0lBRUQsWUFBWSxDQUFDLEVBQUU7UUFDWCxPQUFPLEVBQUUsS0FBSyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDMUMsQ0FBQztJQUVELGdCQUFnQjtRQUNaLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsS0FBYTtRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUUxQixJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7U0FDaEI7UUFFRCxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxXQUFXLENBQUMsQ0FBUSxFQUFFLElBQWM7UUFDaEMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQUs7UUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELGFBQWEsQ0FBQyxLQUFLO1FBQ2YsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2hCLEtBQUssV0FBVyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU87b0JBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNqRixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtZQUVELEtBQUssU0FBUyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU87b0JBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUMvRSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtZQUVELEtBQUssWUFBWSxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVE7b0JBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNqRixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtZQUVELEtBQUssV0FBVyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVE7b0JBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUMvRSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtZQUVELEtBQUssTUFBTSxDQUFDLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtZQUVELEtBQUssS0FBSyxDQUFDLENBQUM7Z0JBQ1IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNoQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtZQUVELEtBQUssT0FBTyxDQUFDO1lBRWIsS0FBSyxPQUFPLENBQUMsQ0FBQztnQkFDVixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsTUFBTTthQUNUO1lBRUQ7Z0JBQ0ksTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVELGNBQWM7UUFDVixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFdEUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxZQUFZO1FBQ1IsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLHlEQUF5RCxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNKLENBQUM7SUFFRCxVQUFVO1FBQ04sTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BILE1BQU0sYUFBYSxHQUFHLE9BQU8sSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO1FBRTlGLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFLO1FBQ3JCLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUseURBQXlELENBQUMsQ0FBQztRQUMvSCxNQUFNLGtCQUFrQixHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUM7UUFFakYsT0FBTyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELHdCQUF3QixDQUFDLEtBQUs7UUFDMUIsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSx5REFBeUQsQ0FBQyxDQUFDO1FBRS9ILElBQUksS0FBSyxHQUFHLEtBQUssSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFckYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELG1CQUFtQixDQUFDLEtBQUs7UUFDckIsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSx5REFBeUQsQ0FBQyxDQUFDO1FBQy9ILE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQztRQUVqRixPQUFPLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2QsT0FBTztZQUNILENBQUMscUJBQXFCLEdBQUcsV0FBVyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJO1NBQzdELENBQUM7SUFDTixDQUFDO0lBRUQscUJBQXFCLENBQUMsSUFBUztRQUMzQixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQzdDLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQWE7UUFDekIsT0FBTztZQUNILGFBQWEsRUFBRSxJQUFJO1lBQ25CLHlCQUF5QixFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxLQUFLLEtBQUs7WUFDMUQsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEtBQUssS0FBSztZQUNuRCxxQkFBcUIsRUFBRSxJQUFJLENBQUMsWUFBWSxLQUFLLEtBQUs7WUFDbEQsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEtBQUssS0FBSztZQUNuRCx5QkFBeUIsRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsS0FBSyxLQUFLO1lBQzFELFNBQVMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzVELENBQUM7SUFDTixDQUFDO3VHQWhRUSxJQUFJOzJGQUFKLElBQUksa1VBaURJLGFBQWEsb0lBdklwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBOEVUOzsyRkFRUSxJQUFJO2tCQXhGaEIsU0FBUzsrQkFDSSxRQUFRLFlBQ1I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQThFVCxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxRQUUvQjt3QkFDRixLQUFLLEVBQUUsV0FBVztxQkFDckI7K0dBT1EsRUFBRTtzQkFBVixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxRQUFRO3NCQUFoQixLQUFLO2dCQUtHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBS0csY0FBYztzQkFBdEIsS0FBSztnQkFNSSxPQUFPO3NCQUFoQixNQUFNO2dCQU1HLE1BQU07c0JBQWYsTUFBTTtnQkFFeUIsU0FBUztzQkFBeEMsZUFBZTt1QkFBQyxhQUFhO2dCQUVRLGFBQWE7c0JBQWxELFNBQVM7dUJBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7QUFxTnhDLE1BQU0sT0FBTyxVQUFVO3VHQUFWLFVBQVU7d0dBQVYsVUFBVSxpQkF4UVYsSUFBSSxhQW9RSCxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLGFBcFF4RCxJQUFJLEVBcVFHLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWTt3R0FHaEQsVUFBVSxZQUpULFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFDakQsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZOzsyRkFHaEQsVUFBVTtrQkFMdEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUM7b0JBQ2xFLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQztvQkFDMUQsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDO2lCQUN2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBOZ01vZHVsZSwgT3V0cHV0LCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTWVudUl0ZW0sIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFJpcHBsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgT2JqZWN0VXRpbHMsIFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuLyoqXG4gKiBEb2NrIGlzIGEgbmF2aWdhdGlvbiBjb21wb25lbnQgY29uc2lzdGluZyBvZiBtZW51aXRlbXMuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZG9jaycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJjb250YWluZXJDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ2RvY2snXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kb2NrLWxpc3QtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPHVsXG4gICAgICAgICAgICAgICAgICAgICNsaXN0XG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImlkXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWRvY2stbGlzdFwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJtZW51XCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1vcmllbnRhdGlvbl09XCJwb3NpdGlvbiA9PT0gJ2JvdHRvbScgfHwgcG9zaXRpb24gPT09ICd0b3AnID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJ1wiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF09XCJmb2N1c2VkID8gZm9jdXNlZE9wdGlvbklkIDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW3RhYmluZGV4XT1cInRhYmluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21lbnUnXCJcbiAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uTGlzdEZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvbkxpc3RCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkxpc3RLZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJvbkxpc3RNb3VzZUxlYXZlKClcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtb2RlbDsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJnZXRJdGVtSWQoaXRlbSwgaSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiaXRlbUNsYXNzKGl0ZW0sIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIml0ZW0ubGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJkaXNhYmxlZChpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJvbkl0ZW1Nb3VzZUVudGVyKGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbWVudWl0ZW0nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcC1mb2N1c2VkXT1cImlzSXRlbUFjdGl2ZShnZXRJdGVtSWQoaXRlbSwgaSkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcC1kaXNhYmxlZF09XCJkaXNhYmxlZChpdGVtKSB8fCBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW1lbnVpdGVtLWNvbnRlbnRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2NvbnRlbnQnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpc0NsaWNrYWJsZVJvdXRlckxpbmsoaXRlbSk7IGVsc2UgZWxzZUJsb2NrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua109XCJpdGVtLnJvdXRlckxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcXVlcnlQYXJhbXNdPVwiaXRlbS5xdWVyeVBhcmFtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZGlzYWJsZWQnOiBpdGVtLmRpc2FibGVkIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtZG9jay1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cIml0ZW0ucm91dGVyTGlua0FjdGl2ZU9wdGlvbnMgfHwgeyBleGFjdDogZmFsc2UgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiaXRlbS50YXJnZXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJpdGVtLmRpc2FibGVkIHx8IHJlYWRvbmx5ID8gbnVsbCA6IGl0ZW0udGFiaW5kZXggPyBpdGVtLnRhYmluZGV4IDogJy0xJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBUb29sdGlwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwT3B0aW9uc109XCJpdGVtLnRvb2x0aXBPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cIml0ZW0uZnJhZ21lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJpdGVtLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJlc2VydmVGcmFnbWVudF09XCJpdGVtLnByZXNlcnZlRnJhZ21lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cIml0ZW0uc2tpcExvY2F0aW9uQ2hhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JlcGxhY2VVcmxdPVwiaXRlbS5yZXBsYWNlVXJsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0YXRlXT1cIml0ZW0uc3RhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1kb2NrLWFjdGlvbi1pY29uXCIgKm5nSWY9XCJpdGVtLmljb24gJiYgIWl0ZW1UZW1wbGF0ZVwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiIFtuZ1N0eWxlXT1cIml0ZW0uaWNvblN0eWxlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZWxzZUJsb2NrPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJpdGVtLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5ocmVmXT1cIml0ZW0udXJsIHx8IG51bGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWRvY2stbGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwVG9vbHRpcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBPcHRpb25zXT1cIml0ZW0udG9vbHRpcE9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1kaXNhYmxlZCc6IGl0ZW0uZGlzYWJsZWQgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFyZ2V0XT1cIml0ZW0udGFyZ2V0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIml0ZW0uZGlzYWJsZWQgfHwgKGkgIT09IGFjdGl2ZUluZGV4ICYmIHJlYWRvbmx5KSA/IG51bGwgOiBpdGVtLnRhYmluZGV4ID8gaXRlbS50YWJpbmRleCA6ICctMSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1kb2NrLWFjdGlvbi1pY29uXCIgKm5nSWY9XCJpdGVtLmljb24gJiYgIWl0ZW1UZW1wbGF0ZVwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiIFtuZ1N0eWxlXT1cIml0ZW0uaWNvblN0eWxlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0gfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2RvY2suY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIERvY2sgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGlkIHN0YXRlIGFzIGEgc3RyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIENsYXNzIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBNZW51TW9kZWwgaW5zdGFuY2UgdG8gZGVmaW5lIHRoZSBhY3Rpb24gaXRlbXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW10gfCB1bmRlZmluZWQgfCBudWxsID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiBvZiBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBvc2l0aW9uOiAnYm90dG9tJyB8ICd0b3AnIHwgJ2xlZnQnIHwgJ3JpZ2h0JyA9ICdib3R0b20nO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIGlucHV0IGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIGRyb3Bkb3duIGJ1dHRvbiBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGV4ZWN1dGUgd2hlbiBidXR0b24gaXMgZm9jdXNlZC5cbiAgICAgKiBAcGFyYW0ge0ZvY3VzRXZlbnR9IGV2ZW50IC0gRm9jdXMgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiB0aGUgY29tcG9uZW50IGxvc2VzIGZvY3VzLlxuICAgICAqIEBwYXJhbSB7Rm9jdXNFdmVudH0gZXZlbnQgLSBGb2N1cyBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+IHwgdW5kZWZpbmVkO1xuXG4gICAgQFZpZXdDaGlsZCgnbGlzdCcsIHsgc3RhdGljOiBmYWxzZSB9KSBsaXN0Vmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGN1cnJlbnRJbmRleDogbnVtYmVyO1xuXG4gICAgdGFiaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBmb2N1c2VkT3B0aW9uSW5kZXg6IG51bWJlciA9IC0xO1xuXG4gICAgZ2V0IGZvY3VzZWRPcHRpb25JZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4ICE9PSAtMSA/IHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4IDogbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gLTM7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmlkIHx8IFVuaXF1ZUNvbXBvbmVudElkKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcz8uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2l0ZW0nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SXRlbUlkKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBpdGVtICYmIGl0ZW0/LmlkID8gaXRlbS5pZCA6IGAke2luZGV4fWA7XG4gICAgfVxuXG4gICAgZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgbmFtZSkge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkSXRlbSAmJiBwcm9jZXNzZWRJdGVtLml0ZW0gPyBPYmplY3RVdGlscy5nZXRJdGVtVmFsdWUocHJvY2Vzc2VkSXRlbS5pdGVtW25hbWVdKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBkaXNhYmxlZChpdGVtKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgaXRlbS5kaXNhYmxlZCA9PT0gJ2Z1bmN0aW9uJyA/IGl0ZW0uZGlzYWJsZWQoKSA6IGl0ZW0uZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgaXNJdGVtQWN0aXZlKGlkKSB7XG4gICAgICAgIHJldHVybiBpZCA9PT0gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXg7XG4gICAgfVxuXG4gICAgb25MaXN0TW91c2VMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAtMztcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbkl0ZW1Nb3VzZUVudGVyKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSBpbmRleDtcblxuICAgICAgICBpZiAoaW5kZXggPT09IDEpIHtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25JdGVtQ2xpY2soZTogRXZlbnQsIGl0ZW06IE1lbnVJdGVtKSB7XG4gICAgICAgIGlmIChpdGVtLmNvbW1hbmQpIHtcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7IG9yaWdpbmFsRXZlbnQ6IGUsIGl0ZW0gfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxpc3RGb2N1cyhldmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleCgwKTtcbiAgICAgICAgdGhpcy5vbkZvY3VzLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uTGlzdEJsdXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBvbkxpc3RLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzoge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSAnbGVmdCcgfHwgdGhpcy5wb3NpdGlvbiA9PT0gJ3JpZ2h0JykgdGhpcy5vbkFycm93RG93bktleSgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gPT09ICdsZWZ0JyB8fCB0aGlzLnBvc2l0aW9uID09PSAncmlnaHQnKSB0aGlzLm9uQXJyb3dVcEtleSgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gPT09ICd0b3AnIHx8IHRoaXMucG9zaXRpb24gPT09ICdib3R0b20nKSB0aGlzLm9uQXJyb3dEb3duS2V5KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0Jzoge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSAndG9wJyB8fCB0aGlzLnBvc2l0aW9uID09PSAnYm90dG9tJykgdGhpcy5vbkFycm93VXBLZXkoKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlICdIb21lJzoge1xuICAgICAgICAgICAgICAgIHRoaXMub25Ib21lS2V5KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSAnRW5kJzoge1xuICAgICAgICAgICAgICAgIHRoaXMub25FbmRLZXkoKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG5cbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzoge1xuICAgICAgICAgICAgICAgIHRoaXMub25TcGFjZUtleSgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFycm93RG93bktleSgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uSW5kZXggPSB0aGlzLmZpbmROZXh0T3B0aW9uSW5kZXgodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgpO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KG9wdGlvbkluZGV4KTtcbiAgICB9XG5cbiAgICBvbkFycm93VXBLZXkoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbkluZGV4ID0gdGhpcy5maW5kUHJldk9wdGlvbkluZGV4KHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KTtcblxuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChvcHRpb25JbmRleCk7XG4gICAgfVxuXG4gICAgb25Ib21lS2V5KCkge1xuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleCgwKTtcbiAgICB9XG5cbiAgICBvbkVuZEtleSgpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkT3B0aW9uSW5kZXgoRG9tSGFuZGxlci5maW5kKHRoaXMubGlzdFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnbGlbZGF0YS1wYy1zZWN0aW9uPVwibWVudWl0ZW1cIl1bZGF0YS1wLWRpc2FibGVkPVwiZmFsc2VcIl0nKS5sZW5ndGggLSAxKTtcbiAgICB9XG5cbiAgICBvblNwYWNlS2V5KCkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMubGlzdFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCBgbGlbaWQ9XCIke2Ake3RoaXMuZm9jdXNlZE9wdGlvbkluZGV4fWB9XCJdYCk7XG4gICAgICAgIGNvbnN0IGFuY2hvckVsZW1lbnQgPSBlbGVtZW50ICYmIERvbUhhbmRsZXIuZmluZFNpbmdsZShlbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImFjdGlvblwiXScpO1xuXG4gICAgICAgIGFuY2hvckVsZW1lbnQgPyBhbmNob3JFbGVtZW50LmNsaWNrKCkgOiBlbGVtZW50ICYmIGVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG5cbiAgICBmaW5kTmV4dE9wdGlvbkluZGV4KGluZGV4KSB7XG4gICAgICAgIGNvbnN0IG1lbnVpdGVtcyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLmxpc3RWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ2xpW2RhdGEtcGMtc2VjdGlvbj1cIm1lbnVpdGVtXCJdW2RhdGEtcC1kaXNhYmxlZD1cImZhbHNlXCJdJyk7XG4gICAgICAgIGNvbnN0IG1hdGNoZWRPcHRpb25JbmRleCA9IFsuLi5tZW51aXRlbXNdLmZpbmRJbmRleCgobGluaykgPT4gbGluay5pZCA9PT0gaW5kZXgpO1xuXG4gICAgICAgIHJldHVybiBtYXRjaGVkT3B0aW9uSW5kZXggPiAtMSA/IG1hdGNoZWRPcHRpb25JbmRleCArIDEgOiAwO1xuICAgIH1cblxuICAgIGNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChpbmRleCkge1xuICAgICAgICBjb25zdCBtZW51aXRlbXMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5saXN0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICdsaVtkYXRhLXBjLXNlY3Rpb249XCJtZW51aXRlbVwiXVtkYXRhLXAtZGlzYWJsZWQ9XCJmYWxzZVwiXScpO1xuXG4gICAgICAgIGxldCBvcmRlciA9IGluZGV4ID49IG1lbnVpdGVtcy5sZW5ndGggPyBtZW51aXRlbXMubGVuZ3RoIC0gMSA6IGluZGV4IDwgMCA/IDAgOiBpbmRleDtcblxuICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCA9IG1lbnVpdGVtc1tvcmRlcl0uZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgIH1cblxuICAgIGZpbmRQcmV2T3B0aW9uSW5kZXgoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgbWVudWl0ZW1zID0gRG9tSGFuZGxlci5maW5kKHRoaXMubGlzdFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnbGlbZGF0YS1wYy1zZWN0aW9uPVwibWVudWl0ZW1cIl1bZGF0YS1wLWRpc2FibGVkPVwiZmFsc2VcIl0nKTtcbiAgICAgICAgY29uc3QgbWF0Y2hlZE9wdGlvbkluZGV4ID0gWy4uLm1lbnVpdGVtc10uZmluZEluZGV4KChsaW5rKSA9PiBsaW5rLmlkID09PSBpbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWRPcHRpb25JbmRleCA+IC0xID8gbWF0Y2hlZE9wdGlvbkluZGV4IC0gMSA6IDA7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRhaW5lckNsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgWydwLWRvY2sgcC1jb21wb25lbnQgJyArIGAgcC1kb2NrLSR7dGhpcy5wb3NpdGlvbn1gXTogdHJ1ZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlzQ2xpY2thYmxlUm91dGVyTGluayhpdGVtOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ucm91dGVyTGluayAmJiAhaXRlbS5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBpdGVtQ2xhc3MoaXRlbSwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtZG9jay1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICdwLWRvY2staXRlbS1zZWNvbmQtcHJldic6IHRoaXMuY3VycmVudEluZGV4IC0gMiA9PT0gaW5kZXgsXG4gICAgICAgICAgICAncC1kb2NrLWl0ZW0tcHJldic6IHRoaXMuY3VycmVudEluZGV4IC0gMSA9PT0gaW5kZXgsXG4gICAgICAgICAgICAncC1kb2NrLWl0ZW0tY3VycmVudCc6IHRoaXMuY3VycmVudEluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICdwLWRvY2staXRlbS1uZXh0JzogdGhpcy5jdXJyZW50SW5kZXggKyAxID09PSBpbmRleCxcbiAgICAgICAgICAgICdwLWRvY2staXRlbS1zZWNvbmQtbmV4dCc6IHRoaXMuY3VycmVudEluZGV4ICsgMiA9PT0gaW5kZXgsXG4gICAgICAgICAgICAncC1mb2N1cyc6IHRoaXMuaXNJdGVtQWN0aXZlKHRoaXMuZ2V0SXRlbUlkKGl0ZW0sIGluZGV4KSlcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBSaXBwbGVNb2R1bGUsIFRvb2x0aXBNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtEb2NrLCBTaGFyZWRNb2R1bGUsIFRvb2x0aXBNb2R1bGUsIFJvdXRlck1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbRG9ja11cbn0pXG5leHBvcnQgY2xhc3MgRG9ja01vZHVsZSB7fVxuIl19