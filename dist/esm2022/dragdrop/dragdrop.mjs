import { CommonModule } from '@angular/common';
import { Directive, EventEmitter, HostListener, Input, NgModule, Output, booleanAttribute } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
/**
 * pDraggable directive apply draggable behavior to any element.
 * @group Components
 */
export class Draggable {
    el;
    zone;
    renderer;
    scope;
    /**
     * Defines the cursor style.
     * @group Props
     */
    dragEffect;
    /**
     * Selector to define the drag handle, by default anywhere on the target element is a drag handle to start dragging.
     * @group Props
     */
    dragHandle;
    /**
     * Callback to invoke when drag begins.
     * @param {DragEvent} event - Drag event.
     * @group Emits
     */
    onDragStart = new EventEmitter();
    /**
     * Callback to invoke when drag ends.
     * @param {DragEvent} event - Drag event.
     * @group Emits
     */
    onDragEnd = new EventEmitter();
    /**
     * Callback to invoke on dragging.
     * @param {DragEvent} event - Drag event.
     * @group Emits
     */
    onDrag = new EventEmitter();
    handle;
    dragListener;
    mouseDownListener;
    mouseUpListener;
    _pDraggableDisabled = false;
    constructor(el, zone, renderer) {
        this.el = el;
        this.zone = zone;
        this.renderer = renderer;
    }
    get pDraggableDisabled() {
        return this._pDraggableDisabled;
    }
    set pDraggableDisabled(_pDraggableDisabled) {
        this._pDraggableDisabled = _pDraggableDisabled;
        if (this._pDraggableDisabled) {
            this.unbindMouseListeners();
        }
        else {
            this.el.nativeElement.draggable = true;
            this.bindMouseListeners();
        }
    }
    ngAfterViewInit() {
        if (!this.pDraggableDisabled) {
            this.el.nativeElement.draggable = true;
            this.bindMouseListeners();
        }
    }
    bindDragListener() {
        if (!this.dragListener) {
            this.zone.runOutsideAngular(() => {
                this.dragListener = this.renderer.listen(this.el.nativeElement, 'drag', this.drag.bind(this));
            });
        }
    }
    unbindDragListener() {
        if (this.dragListener) {
            this.zone.runOutsideAngular(() => {
                this.dragListener && this.dragListener();
                this.dragListener = null;
            });
        }
    }
    bindMouseListeners() {
        if (!this.mouseDownListener && !this.mouseUpListener) {
            this.zone.runOutsideAngular(() => {
                this.mouseDownListener = this.renderer.listen(this.el.nativeElement, 'mousedown', this.mousedown.bind(this));
                this.mouseUpListener = this.renderer.listen(this.el.nativeElement, 'mouseup', this.mouseup.bind(this));
            });
        }
    }
    unbindMouseListeners() {
        if (this.mouseDownListener && this.mouseUpListener) {
            this.zone.runOutsideAngular(() => {
                this.mouseDownListener && this.mouseDownListener();
                this.mouseUpListener && this.mouseUpListener();
                this.mouseDownListener = null;
                this.mouseUpListener = null;
            });
        }
    }
    drag(event) {
        this.onDrag.emit(event);
    }
    dragStart(event) {
        if (this.allowDrag() && !this.pDraggableDisabled) {
            if (this.dragEffect) {
                event.dataTransfer.effectAllowed = this.dragEffect;
            }
            event.dataTransfer.setData('text', this.scope);
            this.onDragStart.emit(event);
            this.bindDragListener();
        }
        else {
            event.preventDefault();
        }
    }
    dragEnd(event) {
        this.onDragEnd.emit(event);
        this.unbindDragListener();
    }
    mousedown(event) {
        this.handle = event.target;
    }
    mouseup(event) {
        this.handle = null;
    }
    allowDrag() {
        if (this.dragHandle && this.handle)
            return DomHandler.matches(this.handle, this.dragHandle);
        else
            return true;
    }
    ngOnDestroy() {
        this.unbindDragListener();
        this.unbindMouseListeners();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Draggable, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.1", type: Draggable, selector: "[pDraggable]", inputs: { scope: ["pDraggable", "scope"], dragEffect: "dragEffect", dragHandle: "dragHandle", pDraggableDisabled: "pDraggableDisabled" }, outputs: { onDragStart: "onDragStart", onDragEnd: "onDragEnd", onDrag: "onDrag" }, host: { listeners: { "dragstart": "dragStart($event)", "dragend": "dragEnd($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Draggable, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pDraggable]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.Renderer2 }], propDecorators: { scope: [{
                type: Input,
                args: ['pDraggable']
            }], dragEffect: [{
                type: Input
            }], dragHandle: [{
                type: Input
            }], onDragStart: [{
                type: Output
            }], onDragEnd: [{
                type: Output
            }], onDrag: [{
                type: Output
            }], pDraggableDisabled: [{
                type: Input
            }], dragStart: [{
                type: HostListener,
                args: ['dragstart', ['$event']]
            }], dragEnd: [{
                type: HostListener,
                args: ['dragend', ['$event']]
            }] } });
/**
 * pDroppable directive apply droppable behavior to any element.
 * @group Components
 */
export class Droppable {
    el;
    zone;
    renderer;
    scope;
    /**
     * Whether the element is droppable, useful for conditional cases.
     * @group Props
     */
    pDroppableDisabled = false;
    /**
     * Defines the cursor style, valid values are none, copy, move, link, copyMove, copyLink, linkMove and all.
     * @group Props
     */
    dropEffect;
    /**
     * Callback to invoke when a draggable enters drop area.
     * @group Emits
     */
    onDragEnter = new EventEmitter();
    /**
     * Callback to invoke when a draggable leave drop area.
     * @group Emits
     */
    onDragLeave = new EventEmitter();
    /**
     * Callback to invoke when a draggable is dropped onto drop area.
     * @group Emits
     */
    onDrop = new EventEmitter();
    constructor(el, zone, renderer) {
        this.el = el;
        this.zone = zone;
        this.renderer = renderer;
    }
    dragOverListener;
    ngAfterViewInit() {
        if (!this.pDroppableDisabled) {
            this.bindDragOverListener();
        }
    }
    bindDragOverListener() {
        if (!this.dragOverListener) {
            this.zone.runOutsideAngular(() => {
                this.dragOverListener = this.renderer.listen(this.el.nativeElement, 'dragover', this.dragOver.bind(this));
            });
        }
    }
    unbindDragOverListener() {
        if (this.dragOverListener) {
            this.zone.runOutsideAngular(() => {
                this.dragOverListener && this.dragOverListener();
                this.dragOverListener = null;
            });
        }
    }
    dragOver(event) {
        event.preventDefault();
    }
    drop(event) {
        if (this.allowDrop(event)) {
            DomHandler.removeClass(this.el.nativeElement, 'p-draggable-enter');
            event.preventDefault();
            this.onDrop.emit(event);
        }
    }
    dragEnter(event) {
        event.preventDefault();
        if (this.dropEffect) {
            event.dataTransfer.dropEffect = this.dropEffect;
        }
        DomHandler.addClass(this.el.nativeElement, 'p-draggable-enter');
        this.onDragEnter.emit(event);
    }
    dragLeave(event) {
        event.preventDefault();
        if (!this.el.nativeElement.contains(event.relatedTarget)) {
            DomHandler.removeClass(this.el.nativeElement, 'p-draggable-enter');
            this.onDragLeave.emit(event);
        }
    }
    allowDrop(event) {
        let dragScope = event.dataTransfer.getData('text');
        if (typeof this.scope == 'string' && dragScope == this.scope) {
            return true;
        }
        else if (Array.isArray(this.scope)) {
            for (let j = 0; j < this.scope.length; j++) {
                if (dragScope == this.scope[j]) {
                    return true;
                }
            }
        }
        return false;
    }
    ngOnDestroy() {
        this.unbindDragOverListener();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Droppable, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: Droppable, selector: "[pDroppable]", inputs: { scope: ["pDroppable", "scope"], pDroppableDisabled: ["pDroppableDisabled", "pDroppableDisabled", booleanAttribute], dropEffect: "dropEffect" }, outputs: { onDragEnter: "onDragEnter", onDragLeave: "onDragLeave", onDrop: "onDrop" }, host: { listeners: { "drop": "drop($event)", "dragenter": "dragEnter($event)", "dragleave": "dragLeave($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Droppable, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pDroppable]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.Renderer2 }], propDecorators: { scope: [{
                type: Input,
                args: ['pDroppable']
            }], pDroppableDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dropEffect: [{
                type: Input
            }], onDragEnter: [{
                type: Output
            }], onDragLeave: [{
                type: Output
            }], onDrop: [{
                type: Output
            }], drop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }], dragEnter: [{
                type: HostListener,
                args: ['dragenter', ['$event']]
            }], dragLeave: [{
                type: HostListener,
                args: ['dragleave', ['$event']]
            }] } });
export class DragDropModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: DragDropModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: DragDropModule, declarations: [Draggable, Droppable], imports: [CommonModule], exports: [Draggable, Droppable] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: DragDropModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: DragDropModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Draggable, Droppable],
                    declarations: [Draggable, Droppable]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2Ryb3AuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvZHJhZ2Ryb3AvZHJhZ2Ryb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBaUIsU0FBUyxFQUFjLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBcUIsTUFBTSxFQUFhLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFLLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBRXpDOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxTQUFTO0lBeUNDO0lBQXVCO0lBQXNCO0lBeEMzQyxLQUFLLENBQXFCO0lBQy9DOzs7T0FHRztJQUNNLFVBQVUsQ0FBaUg7SUFDcEk7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7OztPQUlHO0lBQ08sV0FBVyxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3BFOzs7O09BSUc7SUFDTyxTQUFTLEdBQTRCLElBQUksWUFBWSxFQUFFLENBQUM7SUFDbEU7Ozs7T0FJRztJQUNPLE1BQU0sR0FBNEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUUvRCxNQUFNLENBQU07SUFFWixZQUFZLENBQWU7SUFFM0IsaUJBQWlCLENBQWU7SUFFaEMsZUFBZSxDQUFlO0lBRTlCLG1CQUFtQixHQUFZLEtBQUssQ0FBQztJQUVyQyxZQUFtQixFQUFjLEVBQVMsSUFBWSxFQUFVLFFBQW1CO1FBQWhFLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUFHLENBQUM7SUFFdkYsSUFBYSxrQkFBa0I7UUFDM0IsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDcEMsQ0FBQztJQUNELElBQUksa0JBQWtCLENB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LENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDbEMsQ0FBQzt1R0ExR1EsU0FBUzsyRkFBVCxTQUFTLHVJQU1FLGdCQUFnQjs7MkZBTjNCLFNBQVM7a0JBTnJCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsV0FBVztxQkFDckI7aUJBQ0o7NEhBRXdCLEtBQUs7c0JBQXpCLEtBQUs7dUJBQUMsWUFBWTtnQkFLcUIsa0JBQWtCO3NCQUF6RCxLQUFLO3VCQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFO2dCQUs3QixVQUFVO3NCQUFsQixLQUFLO2dCQUtJLFdBQVc7c0JBQXBCLE1BQU07Z0JBS0csV0FBVztzQkFBcEIsTUFBTTtnQkFLRyxNQUFNO3NCQUFmLE1BQU07Z0JBa0NQLElBQUk7c0JBREgsWUFBWTt1QkFBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBVWhDLFNBQVM7c0JBRFIsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBYXJDLFNBQVM7c0JBRFIsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0FBa0N6QyxNQUFNLE9BQU8sY0FBYzt1R0FBZCxjQUFjO3dHQUFkLGNBQWMsaUJBN1FkLFNBQVMsRUEySlQsU0FBUyxhQThHUixZQUFZLGFBelFiLFNBQVMsRUEySlQsU0FBUzt3R0FrSFQsY0FBYyxZQUpiLFlBQVk7OzJGQUliLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO29CQUMvQixZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO2lCQUN2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgTmdNb2R1bGUsIE5nWm9uZSwgT25EZXN0cm95LCBPdXRwdXQsIFJlbmRlcmVyMiwgYm9vbGVhbkF0dHJpYnV0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IFZvaWRMaXN0ZW5lciB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG4vKipcbiAqIHBEcmFnZ2FibGUgZGlyZWN0aXZlIGFwcGx5IGRyYWdnYWJsZSBiZWhhdmlvciB0byBhbnkgZWxlbWVudC5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BEcmFnZ2FibGVdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoJ3BEcmFnZ2FibGUnKSBzY29wZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIGN1cnNvciBzdHlsZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkcmFnRWZmZWN0OiAnbm9uZScgfCAnY29weScgfCAnY29weUxpbmsnIHwgJ2NvcHlNb3ZlJyB8ICdsaW5rJyB8ICdsaW5rTW92ZScgfCAnbW92ZScgfCAnYWxsJyB8ICd1bmluaXRpYWxpemVkJyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTZWxlY3RvciB0byBkZWZpbmUgdGhlIGRyYWcgaGFuZGxlLCBieSBkZWZhdWx0IGFueXdoZXJlIG9uIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBhIGRyYWcgaGFuZGxlIHRvIHN0YXJ0IGRyYWdnaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRyYWdIYW5kbGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBkcmFnIGJlZ2lucy5cbiAgICAgKiBAcGFyYW0ge0RyYWdFdmVudH0gZXZlbnQgLSBEcmFnIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkRyYWdTdGFydDogRXZlbnRFbWl0dGVyPERyYWdFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gZHJhZyBlbmRzLlxuICAgICAqIEBwYXJhbSB7RHJhZ0V2ZW50fSBldmVudCAtIERyYWcgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRHJhZ0VuZDogRXZlbnRFbWl0dGVyPERyYWdFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIGRyYWdnaW5nLlxuICAgICAqIEBwYXJhbSB7RHJhZ0V2ZW50fSBldmVudCAtIERyYWcgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRHJhZzogRXZlbnRFbWl0dGVyPERyYWdFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBoYW5kbGU6IGFueTtcblxuICAgIGRyYWdMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgbW91c2VEb3duTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIG1vdXNlVXBMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgX3BEcmFnZ2FibGVEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgICBASW5wdXQoKSBnZXQgcERyYWdnYWJsZURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcERyYWdnYWJsZURpc2FibGVkO1xuICAgIH1cbiAgICBzZXQgcERyYWdnYWJsZURpc2FibGVkKF9wRHJhZ2dhYmxlRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcERyYWdnYWJsZURpc2FibGVkID0gX3BEcmFnZ2FibGVEaXNhYmxlZDtcblxuICAgICAgICBpZiAodGhpcy5fcERyYWdnYWJsZURpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnVuYmluZE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYmluZE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5wRHJhZ2dhYmxlRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5iaW5kTW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREcmFnTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kcmFnTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkcmFnJywgdGhpcy5kcmFnLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREcmFnTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lciAmJiB0aGlzLmRyYWdMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZE1vdXNlTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAoIXRoaXMubW91c2VEb3duTGlzdGVuZXIgJiYgIXRoaXMubW91c2VVcExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubW91c2VEb3duTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWRvd24nLCB0aGlzLm1vdXNlZG93bi5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNlVXBMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ21vdXNldXAnLCB0aGlzLm1vdXNldXAuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZE1vdXNlTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5tb3VzZURvd25MaXN0ZW5lciAmJiB0aGlzLm1vdXNlVXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNlRG93bkxpc3RlbmVyICYmIHRoaXMubW91c2VEb3duTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNlVXBMaXN0ZW5lciAmJiB0aGlzLm1vdXNlVXBMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMubW91c2VEb3duTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMubW91c2VVcExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhZyhldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICAgIHRoaXMub25EcmFnLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdzdGFydCcsIFsnJGV2ZW50J10pXG4gICAgZHJhZ1N0YXJ0KGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuYWxsb3dEcmFnKCkgJiYgIXRoaXMucERyYWdnYWJsZURpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnRWZmZWN0KSB7XG4gICAgICAgICAgICAgICAgKGV2ZW50LmRhdGFUcmFuc2ZlciBhcyBEYXRhVHJhbnNmZXIpLmVmZmVjdEFsbG93ZWQgPSB0aGlzLmRyYWdFZmZlY3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAoZXZlbnQuZGF0YVRyYW5zZmVyIGFzIERhdGFUcmFuc2Zlcikuc2V0RGF0YSgndGV4dCcsIHRoaXMuc2NvcGUhKTtcblxuICAgICAgICAgICAgdGhpcy5vbkRyYWdTdGFydC5lbWl0KGV2ZW50KTtcblxuICAgICAgICAgICAgdGhpcy5iaW5kRHJhZ0xpc3RlbmVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZHJhZ2VuZCcsIFsnJGV2ZW50J10pXG4gICAgZHJhZ0VuZChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICAgIHRoaXMub25EcmFnRW5kLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLnVuYmluZERyYWdMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIG1vdXNlZG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLmhhbmRsZSA9IGV2ZW50LnRhcmdldDtcbiAgICB9XG5cbiAgICBtb3VzZXVwKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuaGFuZGxlID0gbnVsbDtcbiAgICB9XG5cbiAgICBhbGxvd0RyYWcoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdIYW5kbGUgJiYgdGhpcy5oYW5kbGUpIHJldHVybiBEb21IYW5kbGVyLm1hdGNoZXModGhpcy5oYW5kbGUsIHRoaXMuZHJhZ0hhbmRsZSk7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5iaW5kRHJhZ0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kTW91c2VMaXN0ZW5lcnMoKTtcbiAgICB9XG59XG4vKipcbiAqIHBEcm9wcGFibGUgZGlyZWN0aXZlIGFwcGx5IGRyb3BwYWJsZSBiZWhhdmlvciB0byBhbnkgZWxlbWVudC5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BEcm9wcGFibGVdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRHJvcHBhYmxlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoJ3BEcm9wcGFibGUnKSBzY29wZTogc3RyaW5nIHwgc3RyaW5nW10gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZWxlbWVudCBpcyBkcm9wcGFibGUsIHVzZWZ1bCBmb3IgY29uZGl0aW9uYWwgY2FzZXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHBEcm9wcGFibGVEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIGN1cnNvciBzdHlsZSwgdmFsaWQgdmFsdWVzIGFyZSBub25lLCBjb3B5LCBtb3ZlLCBsaW5rLCBjb3B5TW92ZSwgY29weUxpbmssIGxpbmtNb3ZlIGFuZCBhbGwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZHJvcEVmZmVjdDogJ25vbmUnIHwgJ2NvcHknIHwgJ2xpbmsnIHwgJ21vdmUnIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgZHJhZ2dhYmxlIGVudGVycyBkcm9wIGFyZWEuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRHJhZ0VudGVyOiBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIGRyYWdnYWJsZSBsZWF2ZSBkcm9wIGFyZWEuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRHJhZ0xlYXZlOiBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIGRyYWdnYWJsZSBpcyBkcm9wcGVkIG9udG8gZHJvcCBhcmVhLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkRyb3A6IEV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgICBkcmFnT3Zlckxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5wRHJvcHBhYmxlRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZERyYWdPdmVyTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREcmFnT3Zlckxpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZHJhZ092ZXJMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdPdmVyTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERyYWdPdmVyTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdPdmVyTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyICYmIHRoaXMuZHJhZ092ZXJMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYWdPdmVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgICBkcm9wKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuYWxsb3dEcm9wKGV2ZW50KSkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdwLWRyYWdnYWJsZS1lbnRlcicpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMub25Ecm9wLmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZHJhZ2VudGVyJywgWyckZXZlbnQnXSlcbiAgICBkcmFnRW50ZXIoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmRyb3BFZmZlY3QpIHtcbiAgICAgICAgICAgIChldmVudC5kYXRhVHJhbnNmZXIgYXMgRGF0YVRyYW5zZmVyKS5kcm9wRWZmZWN0ID0gdGhpcy5kcm9wRWZmZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdwLWRyYWdnYWJsZS1lbnRlcicpO1xuICAgICAgICB0aGlzLm9uRHJhZ0VudGVyLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXG4gICAgZHJhZ0xlYXZlKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoIXRoaXMuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC5yZWxhdGVkVGFyZ2V0KSkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdwLWRyYWdnYWJsZS1lbnRlcicpO1xuICAgICAgICAgICAgdGhpcy5vbkRyYWdMZWF2ZS5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsbG93RHJvcChldmVudDogRHJhZ0V2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBkcmFnU2NvcGUgPSAoZXZlbnQuZGF0YVRyYW5zZmVyIGFzIERhdGFUcmFuc2ZlcikuZ2V0RGF0YSgndGV4dCcpO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2NvcGUgPT0gJ3N0cmluZycgJiYgZHJhZ1Njb3BlID09IHRoaXMuc2NvcGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zY29wZSkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5zY29wZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChkcmFnU2NvcGUgPT0gdGhpcy5zY29wZVtqXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmluZERyYWdPdmVyTGlzdGVuZXIoKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0RyYWdnYWJsZSwgRHJvcHBhYmxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtEcmFnZ2FibGUsIERyb3BwYWJsZV1cbn0pXG5leHBvcnQgY2xhc3MgRHJhZ0Ryb3BNb2R1bGUge31cbiJdfQ==