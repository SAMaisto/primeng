import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Directive, Input, NgModule, Inject, PLATFORM_ID, booleanAttribute, numberAttribute } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
/**
 * AnimateOnScroll is used to apply animations to elements when entering or leaving the viewport during scrolling.
 * @group Components
 */
export class AnimateOnScroll {
    document;
    platformId;
    host;
    el;
    renderer;
    /**
     * Selector to define the CSS class for enter animation.
     * @group Props
     */
    enterClass;
    /**
     * Selector to define the CSS class for leave animation.
     * @group Props
     */
    leaveClass;
    /**
     * Specifies the root option of the IntersectionObserver API.
     * @group Props
     */
    root;
    /**
     * Specifies the rootMargin option of the IntersectionObserver API.
     * @group Props
     */
    rootMargin;
    /**
     * Specifies the threshold option of the IntersectionObserver API
     * @group Props
     */
    threshold;
    /**
     * Whether the scroll event listener should be removed after initial run.
     * @group Props
     */
    once = true;
    observer;
    resetObserver;
    isObserverActive = false;
    animationState;
    animationEndListener;
    constructor(document, platformId, host, el, renderer) {
        this.document = document;
        this.platformId = platformId;
        this.host = host;
        this.el = el;
        this.renderer = renderer;
    }
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.renderer.setStyle(this.host.nativeElement, 'opacity', this.enterClass ? '0' : '');
        }
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.bindIntersectionObserver();
        }
    }
    get options() {
        return {
            root: this.root,
            rootMargin: this.rootMargin,
            threshold: this.threshold
        };
    }
    bindIntersectionObserver() {
        this.observer = new IntersectionObserver(([entry]) => {
            if (this.isObserverActive) {
                if (entry.boundingClientRect.top > 0) {
                    entry.isIntersecting ? this.enter() : this.leave();
                }
            }
            else if (entry.isIntersecting) {
                this.enter();
            }
            this.isObserverActive = true;
        }, this.options);
        setTimeout(() => this.observer.observe(this.host.nativeElement), 0);
        // Reset
        this.resetObserver = new IntersectionObserver(([entry]) => {
            if (entry.boundingClientRect.top > 0 && !entry.isIntersecting) {
                this.host.nativeElement.style.opacity = this.enterClass ? '0' : '';
                DomHandler.removeMultipleClasses(this.host.nativeElement, [this.enterClass, this.leaveClass]);
                this.resetObserver.unobserve(this.host.nativeElement);
            }
            this.animationState = undefined;
        }, { ...this.options, threshold: 0 });
    }
    enter() {
        if (this.animationState !== 'enter' && this.enterClass) {
            this.host.nativeElement.style.opacity = '';
            DomHandler.removeMultipleClasses(this.host.nativeElement, this.leaveClass);
            DomHandler.addMultipleClasses(this.host.nativeElement, this.enterClass);
            this.once && this.unbindIntersectionObserver();
            this.bindAnimationEvents();
            this.animationState = 'enter';
        }
    }
    leave() {
        if (this.animationState !== 'leave' && this.leaveClass) {
            this.host.nativeElement.style.opacity = this.enterClass ? '0' : '';
            DomHandler.removeMultipleClasses(this.host.nativeElement, this.enterClass);
            DomHandler.addMultipleClasses(this.host.nativeElement, this.leaveClass);
            this.bindAnimationEvents();
            this.animationState = 'leave';
        }
    }
    bindAnimationEvents() {
        if (!this.animationEndListener) {
            this.animationEndListener = this.renderer.listen(this.host.nativeElement, 'animationend', () => {
                DomHandler.removeMultipleClasses(this.host.nativeElement, [this.enterClass, this.leaveClass]);
                !this.once && this.resetObserver.observe(this.host.nativeElement);
                this.unbindAnimationEvents();
            });
        }
    }
    unbindAnimationEvents() {
        if (this.animationEndListener) {
            this.animationEndListener();
            this.animationEndListener = null;
        }
    }
    unbindIntersectionObserver() {
        this.observer?.unobserve(this.host.nativeElement);
        this.resetObserver?.unobserve(this.host.nativeElement);
        this.isObserverActive = false;
    }
    ngOnDestroy() {
        this.unbindAnimationEvents();
        this.unbindIntersectionObserver();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: AnimateOnScroll, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: AnimateOnScroll, selector: "[pAnimateOnScroll]", inputs: { enterClass: "enterClass", leaveClass: "leaveClass", root: "root", rootMargin: "rootMargin", threshold: ["threshold", "threshold", numberAttribute], once: ["once", "once", booleanAttribute] }, host: { properties: { "class.p-animateonscroll": "true" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: AnimateOnScroll, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pAnimateOnScroll]',
                    host: {
                        '[class.p-animateonscroll]': 'true'
                    }
                }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { enterClass: [{
                type: Input
            }], leaveClass: [{
                type: Input
            }], root: [{
                type: Input
            }], rootMargin: [{
                type: Input
            }], threshold: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], once: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });
export class AnimateOnScrollModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: AnimateOnScrollModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: AnimateOnScrollModule, declarations: [AnimateOnScroll], imports: [CommonModule], exports: [AnimateOnScroll] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: AnimateOnScrollModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: AnimateOnScrollModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [AnimateOnScroll],
                    declarations: [AnimateOnScroll]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0ZW9uc2Nyb2xsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2FuaW1hdGVvbnNjcm9sbC9hbmltYXRlb25zY3JvbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBQWlCLFNBQVMsRUFBYyxLQUFLLEVBQUUsUUFBUSxFQUFxQixNQUFNLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQVF6Qzs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sZUFBZTtJQTBDYztJQUFpRDtJQUF5QjtJQUF5QjtJQUF1QjtJQXpDaEs7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7O09BR0c7SUFDTSxVQUFVLENBQXFCO0lBQ3hDOzs7T0FHRztJQUNNLElBQUksQ0FBaUM7SUFDOUM7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7O09BR0c7SUFDb0MsU0FBUyxDQUFxQjtJQUNyRTs7O09BR0c7SUFDcUMsSUFBSSxHQUFZLElBQUksQ0FBQztJQUU3RCxRQUFRLENBQW1DO0lBRTNDLGFBQWEsQ0FBTTtJQUVuQixnQkFBZ0IsR0FBWSxLQUFLLENBQUM7SUFFbEMsY0FBYyxDQUFNO0lBRXBCLG9CQUFvQixDQUEyQjtJQUUvQyxZQUFzQyxRQUFrQixFQUErQixVQUFlLEVBQVUsSUFBZ0IsRUFBUyxFQUFjLEVBQVMsUUFBbUI7UUFBN0ksYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUErQixlQUFVLEdBQVYsVUFBVSxDQUFLO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFX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VTtzQkFBbEIsS0FBSztnQkFLRyxJQUFJO3NCQUFaLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLaUMsU0FBUztzQkFBL0MsS0FBSzt1QkFBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUU7Z0JBS0csSUFBSTtzQkFBM0MsS0FBSzt1QkFBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRTs7QUE0SDFDLE1BQU0sT0FBTyxxQkFBcUI7dUdBQXJCLHFCQUFxQjt3R0FBckIscUJBQXFCLGlCQTFKckIsZUFBZSxhQXNKZCxZQUFZLGFBdEpiLGVBQWU7d0dBMEpmLHFCQUFxQixZQUpwQixZQUFZOzsyRkFJYixxQkFBcUI7a0JBTGpDLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzFCLFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQztpQkFDbEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBOZ01vZHVsZSwgUmVuZGVyZXIyLCBPbkluaXQsIEluamVjdCwgUExBVEZPUk1fSUQsIGJvb2xlYW5BdHRyaWJ1dGUsIG51bWJlckF0dHJpYnV0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcblxuaW50ZXJmYWNlIEFuaW1hdGVPblNjcm9sbE9wdGlvbnMge1xuICAgIHJvb3Q/OiBIVE1MRWxlbWVudDtcbiAgICByb290TWFyZ2luPzogc3RyaW5nO1xuICAgIHRocmVzaG9sZD86IG51bWJlcjtcbn1cblxuLyoqXG4gKiBBbmltYXRlT25TY3JvbGwgaXMgdXNlZCB0byBhcHBseSBhbmltYXRpb25zIHRvIGVsZW1lbnRzIHdoZW4gZW50ZXJpbmcgb3IgbGVhdmluZyB0aGUgdmlld3BvcnQgZHVyaW5nIHNjcm9sbGluZy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BBbmltYXRlT25TY3JvbGxdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MucC1hbmltYXRlb25zY3JvbGxdJzogJ3RydWUnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBBbmltYXRlT25TY3JvbGwgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICAgIC8qKlxuICAgICAqIFNlbGVjdG9yIHRvIGRlZmluZSB0aGUgQ1NTIGNsYXNzIGZvciBlbnRlciBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZW50ZXJDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNlbGVjdG9yIHRvIGRlZmluZSB0aGUgQ1NTIGNsYXNzIGZvciBsZWF2ZSBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbGVhdmVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB0aGUgcm9vdCBvcHRpb24gb2YgdGhlIEludGVyc2VjdGlvbk9ic2VydmVyIEFQSS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByb290OiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB8IG51bGw7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHRoZSByb290TWFyZ2luIG9wdGlvbiBvZiB0aGUgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgQVBJLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJvb3RNYXJnaW46IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHRocmVzaG9sZCBvcHRpb24gb2YgdGhlIEludGVyc2VjdGlvbk9ic2VydmVyIEFQSVxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHRocmVzaG9sZDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHNjcm9sbCBldmVudCBsaXN0ZW5lciBzaG91bGQgYmUgcmVtb3ZlZCBhZnRlciBpbml0aWFsIHJ1bi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgb25jZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgfCB1bmRlZmluZWQ7XG5cbiAgICByZXNldE9ic2VydmVyOiBhbnk7XG5cbiAgICBpc09ic2VydmVyQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBhbmltYXRpb25TdGF0ZTogYW55O1xuXG4gICAgYW5pbWF0aW9uRW5kTGlzdGVuZXI6IFZvaWRGdW5jdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSwgcHJpdmF0ZSBob3N0OiBFbGVtZW50UmVmLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsIHRoaXMuZW50ZXJDbGFzcyA/ICcwJyA6ICcnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZEludGVyc2VjdGlvbk9ic2VydmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgb3B0aW9ucygpOiBBbmltYXRlT25TY3JvbGxPcHRpb25zIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJvb3Q6IHRoaXMucm9vdCxcbiAgICAgICAgICAgIHJvb3RNYXJnaW46IHRoaXMucm9vdE1hcmdpbixcbiAgICAgICAgICAgIHRocmVzaG9sZDogdGhpcy50aHJlc2hvbGRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBiaW5kSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKSB7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKFtlbnRyeV0pID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzT2JzZXJ2ZXJBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuYm91bmRpbmdDbGllbnRSZWN0LnRvcCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuaXNJbnRlcnNlY3RpbmcgPyB0aGlzLmVudGVyKCkgOiB0aGlzLmxlYXZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuZW50ZXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pc09ic2VydmVyQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSwgdGhpcy5vcHRpb25zKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCksIDApO1xuXG4gICAgICAgIC8vIFJlc2V0XG5cbiAgICAgICAgdGhpcy5yZXNldE9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgICAgICAgICAgKFtlbnRyeV0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuYm91bmRpbmdDbGllbnRSZWN0LnRvcCA+IDAgJiYgIWVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSB0aGlzLmVudGVyQ2xhc3MgPyAnMCcgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVNdWx0aXBsZUNsYXNzZXModGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsIFt0aGlzLmVudGVyQ2xhc3MsIHRoaXMubGVhdmVDbGFzc10pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRPYnNlcnZlci51bm9ic2VydmUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAuLi50aGlzLm9wdGlvbnMsIHRocmVzaG9sZDogMCB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZW50ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvblN0YXRlICE9PSAnZW50ZXInICYmIHRoaXMuZW50ZXJDbGFzcykge1xuICAgICAgICAgICAgdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9ICcnO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVNdWx0aXBsZUNsYXNzZXModGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsIHRoaXMubGVhdmVDbGFzcyk7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZE11bHRpcGxlQ2xhc3Nlcyh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgdGhpcy5lbnRlckNsYXNzKTtcblxuICAgICAgICAgICAgdGhpcy5vbmNlICYmIHRoaXMudW5iaW5kSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5iaW5kQW5pbWF0aW9uRXZlbnRzKCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gJ2VudGVyJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxlYXZlKCkge1xuICAgICAgICBpZiAodGhpcy5hbmltYXRpb25TdGF0ZSAhPT0gJ2xlYXZlJyAmJiB0aGlzLmxlYXZlQ2xhc3MpIHtcbiAgICAgICAgICAgIHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSB0aGlzLmVudGVyQ2xhc3MgPyAnMCcgOiAnJztcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlTXVsdGlwbGVDbGFzc2VzKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCB0aGlzLmVudGVyQ2xhc3MpO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRNdWx0aXBsZUNsYXNzZXModGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsIHRoaXMubGVhdmVDbGFzcyk7XG5cbiAgICAgICAgICAgIHRoaXMuYmluZEFuaW1hdGlvbkV2ZW50cygpO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9ICdsZWF2ZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kQW5pbWF0aW9uRXZlbnRzKCkge1xuICAgICAgICBpZiAoIXRoaXMuYW5pbWF0aW9uRW5kTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRW5kTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgJ2FuaW1hdGlvbmVuZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZU11bHRpcGxlQ2xhc3Nlcyh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgW3RoaXMuZW50ZXJDbGFzcywgdGhpcy5sZWF2ZUNsYXNzXSk7XG4gICAgICAgICAgICAgICAgIXRoaXMub25jZSAmJiB0aGlzLnJlc2V0T2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmRBbmltYXRpb25FdmVudHMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kQW5pbWF0aW9uRXZlbnRzKCkge1xuICAgICAgICBpZiAodGhpcy5hbmltYXRpb25FbmRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25FbmRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25FbmRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRJbnRlcnNlY3Rpb25PYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5vYnNlcnZlcj8udW5vYnNlcnZlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5yZXNldE9ic2VydmVyPy51bm9ic2VydmUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmlzT2JzZXJ2ZXJBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRBbmltYXRpb25FdmVudHMoKTtcbiAgICAgICAgdGhpcy51bmJpbmRJbnRlcnNlY3Rpb25PYnNlcnZlcigpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQW5pbWF0ZU9uU2Nyb2xsXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtBbmltYXRlT25TY3JvbGxdXG59KVxuZXhwb3J0IGNsYXNzIEFuaW1hdGVPblNjcm9sbE1vZHVsZSB7fVxuIl19