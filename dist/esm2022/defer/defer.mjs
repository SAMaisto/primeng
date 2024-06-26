import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ContentChild, Directive, EventEmitter, Inject, NgModule, Output, PLATFORM_ID, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Defer postpones the loading the content that is initially not in the viewport until it becomes visible on scroll.
 * @group Components
 */
export class DeferredLoader {
    document;
    platformId;
    el;
    renderer;
    viewContainer;
    cd;
    /**
     * Callback to invoke when deferred content is loaded.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onLoad = new EventEmitter();
    template;
    documentScrollListener;
    view;
    window;
    constructor(document, platformId, el, renderer, viewContainer, cd) {
        this.document = document;
        this.platformId = platformId;
        this.el = el;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.window = this.document.defaultView;
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.shouldLoad()) {
                this.load();
            }
            if (!this.isLoaded()) {
                this.documentScrollListener = this.renderer.listen(this.window, 'scroll', () => {
                    if (this.shouldLoad()) {
                        this.load();
                        this.documentScrollListener && this.documentScrollListener();
                        this.documentScrollListener = null;
                    }
                });
            }
        }
    }
    shouldLoad() {
        if (this.isLoaded()) {
            return false;
        }
        else {
            let rect = this.el.nativeElement.getBoundingClientRect();
            let docElement = this.document.documentElement;
            let winHeight = docElement.clientHeight;
            return winHeight >= rect.top;
        }
    }
    load() {
        this.view = this.viewContainer.createEmbeddedView(this.template);
        this.onLoad.emit();
        this.cd.detectChanges();
    }
    isLoaded() {
        return this.view != null && isPlatformBrowser(this.platformId);
    }
    ngOnDestroy() {
        this.view = null;
        if (this.documentScrollListener) {
            this.documentScrollListener();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: DeferredLoader, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.1", type: DeferredLoader, selector: "[pDefer]", outputs: { onLoad: "onLoad" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: DeferredLoader, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pDefer]',
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
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }], propDecorators: { onLoad: [{
                type: Output
            }], template: [{
                type: ContentChild,
                args: [TemplateRef]
            }] } });
export class DeferModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: DeferModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: DeferModule, declarations: [DeferredLoader], imports: [CommonModule], exports: [DeferredLoader] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: DeferModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: DeferModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [DeferredLoader],
                    declarations: [DeferredLoader]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvZGVmZXIvZGVmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBQW9DLFlBQVksRUFBRSxTQUFTLEVBQStCLFlBQVksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFhLE1BQU0sRUFBRSxXQUFXLEVBQWEsV0FBVyxFQUFvQixNQUFNLGVBQWUsQ0FBQzs7QUFFak87OztHQUdHO0FBT0gsTUFBTSxPQUFPLGNBQWM7SUFnQmU7SUFBaUQ7SUFBd0I7SUFBdUI7SUFBNEI7SUFBeUM7SUFmM007Ozs7T0FJRztJQUNPLE1BQU0sR0FBd0IsSUFBSSxZQUFZLEVBQVMsQ0FBQztJQUV2QyxRQUFRLENBQStCO0lBRWxFLHNCQUFzQixDQUFxQjtJQUUzQyxJQUFJLENBQWlDO0lBRXJDLE1BQU0sQ0FBUztJQUVmLFlBQXNDLFFBQWtCLEVBQStCLFVBQWUsRUFBUyxFQUFjLEVBQVMsUUFBbUIsRUFBUyxhQUErQixFQUFVLEVBQXFCO1FBQTFMLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBK0IsZUFBVSxHQUFWLFVBQVUsQ0FBSztRQUFTLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDNU4sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQXFCLENBQUM7SUFDdEQsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNwQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2Y7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNsQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO29CQUMzRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTt3QkFDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNaLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQzt3QkFDN0QsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztxQkFDdEM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtTQUNKO0lBQ0wsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNqQixPQUFPLEtBQUssQ0FBQztTQUNoQjthQUFNO1lBQ0gsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN6RCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztZQUMvQyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1lBRXhDLE9BQU8sU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDaEM7SUFDTCxDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBNEIsQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDN0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDakM7SUFDTCxDQUFDO3VHQWxFUSxjQUFjLGtCQWdCSCxRQUFRLGFBQXNDLFdBQVc7MkZBaEJwRSxjQUFjLDRKQVFULFdBQVc7OzJGQVJoQixjQUFjO2tCQU4xQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxVQUFVO29CQUNwQixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLFdBQVc7cUJBQ3JCO2lCQUNKOzswQkFpQmdCLE1BQU07MkJBQUMsUUFBUTs7MEJBQStCLE1BQU07MkJBQUMsV0FBVzt5SkFWbkUsTUFBTTtzQkFBZixNQUFNO2dCQUVvQixRQUFRO3NCQUFsQyxZQUFZO3VCQUFDLFdBQVc7O0FBa0U3QixNQUFNLE9BQU8sV0FBVzt1R0FBWCxXQUFXO3dHQUFYLFdBQVcsaUJBMUVYLGNBQWMsYUFzRWIsWUFBWSxhQXRFYixjQUFjO3dHQTBFZCxXQUFXLFlBSlYsWUFBWTs7MkZBSWIsV0FBVztrQkFMdkIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztvQkFDekIsWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDO2lCQUNqQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSwgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb250ZW50Q2hpbGQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRW1iZWRkZWRWaWV3UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgTmdNb2R1bGUsIE9uRGVzdHJveSwgT3V0cHV0LCBQTEFURk9STV9JRCwgUmVuZGVyZXIyLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuLyoqXG4gKiBEZWZlciBwb3N0cG9uZXMgdGhlIGxvYWRpbmcgdGhlIGNvbnRlbnQgdGhhdCBpcyBpbml0aWFsbHkgbm90IGluIHRoZSB2aWV3cG9ydCB1bnRpbCBpdCBiZWNvbWVzIHZpc2libGUgb24gc2Nyb2xsLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcERlZmVyXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIERlZmVycmVkTG9hZGVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBkZWZlcnJlZCBjb250ZW50IGlzIGxvYWRlZC5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uTG9hZDogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG5cbiAgICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGRvY3VtZW50U2Nyb2xsTGlzdGVuZXI6IE51bGxhYmxlPEZ1bmN0aW9uPjtcblxuICAgIHZpZXc6IE51bGxhYmxlPEVtYmVkZGVkVmlld1JlZjxhbnk+PjtcblxuICAgIHdpbmRvdzogV2luZG93O1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy53aW5kb3cgPSB0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3IGFzIFdpbmRvdztcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zaG91bGRMb2FkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzTG9hZGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50U2Nyb2xsTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLndpbmRvdywgJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvdWxkTG9hZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRTY3JvbGxMaXN0ZW5lciAmJiB0aGlzLmRvY3VtZW50U2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRTY3JvbGxMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZExvYWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmlzTG9hZGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCByZWN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgbGV0IGRvY0VsZW1lbnQgPSB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIGxldCB3aW5IZWlnaHQgPSBkb2NFbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgICAgICAgICAgcmV0dXJuIHdpbkhlaWdodCA+PSByZWN0LnRvcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmlldyA9IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZSBhcyBUZW1wbGF0ZVJlZjxhbnk+KTtcbiAgICAgICAgdGhpcy5vbkxvYWQuZW1pdCgpO1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBpc0xvYWRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldyAhPSBudWxsICYmIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudmlldyA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRTY3JvbGxMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0RlZmVycmVkTG9hZGVyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtEZWZlcnJlZExvYWRlcl1cbn0pXG5leHBvcnQgY2xhc3MgRGVmZXJNb2R1bGUge31cbiJdfQ==