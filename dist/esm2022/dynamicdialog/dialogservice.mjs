import { Injectable, Inject, createComponent } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { DynamicDialogComponent } from './dynamicdialog';
import { DynamicDialogInjector } from './dynamicdialog-injector';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Dynamic Dialog component methods.
 * @group Service
 */
export class DialogService {
    appRef;
    injector;
    document;
    dialogComponentRefMap = new Map();
    constructor(appRef, injector, document) {
        this.appRef = appRef;
        this.injector = injector;
        this.document = document;
    }
    /**
     * Displays the dialog using the dynamic dialog object options.
     * @param {*} componentType - Dynamic component for content template.
     * @param {DynamicDialogConfig} config - DynamicDialog object.
     * @returns {DynamicDialogRef} DynamicDialog instance.
     * @group Method
     */
    open(componentType, config) {
        if (!this.duplicationPermission(componentType, config)) {
            return null;
        }
        const dialogRef = this.appendDialogComponentToBody(config, componentType);
        this.dialogComponentRefMap.get(dialogRef).instance.childComponentType = componentType;
        return dialogRef;
    }
    /**
     * Returns the dynamic dialog component instance.
     * @param {ref} DynamicDialogRef - DynamicDialog instance.
     * @group Method
     */
    getInstance(ref) {
        return this.dialogComponentRefMap.get(ref).instance;
    }
    appendDialogComponentToBody(config, componentType) {
        const map = new WeakMap();
        map.set(DynamicDialogConfig, config);
        const dialogRef = new DynamicDialogRef();
        map.set(DynamicDialogRef, dialogRef);
        const sub = dialogRef.onClose.subscribe(() => {
            this.dialogComponentRefMap.get(dialogRef).instance.close();
        });
        const destroySub = dialogRef.onDestroy.subscribe(() => {
            this.removeDialogComponentFromBody(dialogRef);
            destroySub.unsubscribe();
            sub.unsubscribe();
        });
        const componentRef = createComponent(DynamicDialogComponent, { environmentInjector: this.appRef.injector, elementInjector: new DynamicDialogInjector(this.injector, map) });
        this.appRef.attachView(componentRef.hostView);
        const domElem = componentRef.hostView.rootNodes[0];
        if (!config.appendTo || config.appendTo === 'body') {
            this.document.body.appendChild(domElem);
        }
        else {
            DomHandler.appendChild(domElem, config.appendTo);
        }
        this.dialogComponentRefMap.set(dialogRef, componentRef);
        return dialogRef;
    }
    removeDialogComponentFromBody(dialogRef) {
        if (!dialogRef || !this.dialogComponentRefMap.has(dialogRef)) {
            return;
        }
        const dialogComponentRef = this.dialogComponentRefMap.get(dialogRef);
        this.appRef.detachView(dialogComponentRef.hostView);
        dialogComponentRef.destroy();
        this.dialogComponentRefMap.delete(dialogRef);
    }
    duplicationPermission(componentType, config) {
        if (config.duplicate) {
            return true;
        }
        let permission = true;
        for (const [key, value] of this.dialogComponentRefMap) {
            if (value.instance.childComponentType === componentType) {
                permission = false;
                break;
            }
        }
        return permission;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: DialogService, deps: [{ token: i0.ApplicationRef }, { token: i0.Injector }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: DialogService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: DialogService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i0.ApplicationRef }, { type: i0.Injector }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9keW5hbWljZGlhbG9nL2RpYWxvZ3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBaUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFM0M7OztHQUdHO0FBRUgsTUFBTSxPQUFPLGFBQWE7SUFHRjtJQUFnQztJQUE4QztJQUZsRyxxQkFBcUIsR0FBcUUsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUVwRyxZQUFvQixNQUFzQixFQUFVLFFBQWtCLEVBQTRCLFFBQWtCO1FBQWhHLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUE0QixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUcsQ0FBQztJQUN4SDs7Ozs7O09BTUc7SUFDSSxJQUFJLENBQUksYUFBc0IsRUFBRSxNQUEyQjtRQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNwRCxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFJLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztR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Q2xCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdEIsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUNuRCxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEtBQUssYUFBYSxFQUFFO2dCQUNyRCxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixNQUFNO2FBQ1Q7U0FDSjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7dUdBdkZRLGFBQWEsd0VBRzBELFFBQVE7MkdBSC9FLGFBQWE7OzJGQUFiLGFBQWE7a0JBRHpCLFVBQVU7OzBCQUlrRSxNQUFNOzJCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBBcHBsaWNhdGlvblJlZiwgSW5qZWN0b3IsIFR5cGUsIEVtYmVkZGVkVmlld1JlZiwgQ29tcG9uZW50UmVmLCBJbmplY3QsIGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IER5bmFtaWNEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2R5bmFtaWNkaWFsb2cnO1xuaW1wb3J0IHsgRHluYW1pY0RpYWxvZ0luamVjdG9yIH0gZnJvbSAnLi9keW5hbWljZGlhbG9nLWluamVjdG9yJztcbmltcG9ydCB7IER5bmFtaWNEaWFsb2dDb25maWcgfSBmcm9tICcuL2R5bmFtaWNkaWFsb2ctY29uZmlnJztcbmltcG9ydCB7IER5bmFtaWNEaWFsb2dSZWYgfSBmcm9tICcuL2R5bmFtaWNkaWFsb2ctcmVmJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG4vKipcbiAqIER5bmFtaWMgRGlhbG9nIGNvbXBvbmVudCBtZXRob2RzLlxuICogQGdyb3VwIFNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERpYWxvZ1NlcnZpY2Uge1xuICAgIGRpYWxvZ0NvbXBvbmVudFJlZk1hcDogTWFwPER5bmFtaWNEaWFsb2dSZWY8YW55PiwgQ29tcG9uZW50UmVmPER5bmFtaWNEaWFsb2dDb21wb25lbnQ+PiA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50KSB7fVxuICAgIC8qKlxuICAgICAqIERpc3BsYXlzIHRoZSBkaWFsb2cgdXNpbmcgdGhlIGR5bmFtaWMgZGlhbG9nIG9iamVjdCBvcHRpb25zLlxuICAgICAqIEBwYXJhbSB7Kn0gY29tcG9uZW50VHlwZSAtIER5bmFtaWMgY29tcG9uZW50IGZvciBjb250ZW50IHRlbXBsYXRlLlxuICAgICAqIEBwYXJhbSB7RHluYW1pY0RpYWxvZ0NvbmZpZ30gY29uZmlnIC0gRHluYW1pY0RpYWxvZyBvYmplY3QuXG4gICAgICogQHJldHVybnMge0R5bmFtaWNEaWFsb2dSZWZ9IER5bmFtaWNEaWFsb2cgaW5zdGFuY2UuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBvcGVuPFQ+KGNvbXBvbmVudFR5cGU6IFR5cGU8VD4sIGNvbmZpZzogRHluYW1pY0RpYWxvZ0NvbmZpZyk6IER5bmFtaWNEaWFsb2dSZWY8VD4ge1xuICAgICAgICBpZiAoIXRoaXMuZHVwbGljYXRpb25QZXJtaXNzaW9uKGNvbXBvbmVudFR5cGUsIGNvbmZpZykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5hcHBlbmREaWFsb2dDb21wb25lbnRUb0JvZHk8VD4oY29uZmlnLCBjb21wb25lbnRUeXBlKTtcblxuICAgICAgICB0aGlzLmRpYWxvZ0NvbXBvbmVudFJlZk1hcC5nZXQoZGlhbG9nUmVmKS5pbnN0YW5jZS5jaGlsZENvbXBvbmVudFR5cGUgPSBjb21wb25lbnRUeXBlO1xuXG4gICAgICAgIHJldHVybiBkaWFsb2dSZWY7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGR5bmFtaWMgZGlhbG9nIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge3JlZn0gRHluYW1pY0RpYWxvZ1JlZiAtIER5bmFtaWNEaWFsb2cgaW5zdGFuY2UuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRJbnN0YW5jZShyZWY6IER5bmFtaWNEaWFsb2dSZWY8YW55Pikge1xuICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dDb21wb25lbnRSZWZNYXAuZ2V0KHJlZikuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBlbmREaWFsb2dDb21wb25lbnRUb0JvZHk8VD4oY29uZmlnOiBEeW5hbWljRGlhbG9nQ29uZmlnLCBjb21wb25lbnRUeXBlOiBUeXBlPFQ+KTogRHluYW1pY0RpYWxvZ1JlZjxUPiB7XG4gICAgICAgIGNvbnN0IG1hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIG1hcC5zZXQoRHluYW1pY0RpYWxvZ0NvbmZpZywgY29uZmlnKTtcblxuICAgICAgICBjb25zdCBkaWFsb2dSZWYgPSBuZXcgRHluYW1pY0RpYWxvZ1JlZjxUPigpO1xuICAgICAgICBtYXAuc2V0KER5bmFtaWNEaWFsb2dSZWYsIGRpYWxvZ1JlZik7XG5cbiAgICAgICAgY29uc3Qgc3ViID0gZGlhbG9nUmVmLm9uQ2xvc2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nQ29tcG9uZW50UmVmTWFwLmdldChkaWFsb2dSZWYpLmluc3RhbmNlLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGRlc3Ryb3lTdWIgPSBkaWFsb2dSZWYub25EZXN0cm95LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZURpYWxvZ0NvbXBvbmVudEZyb21Cb2R5KGRpYWxvZ1JlZik7XG4gICAgICAgICAgICBkZXN0cm95U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gY3JlYXRlQ29tcG9uZW50KER5bmFtaWNEaWFsb2dDb21wb25lbnQsIHsgZW52aXJvbm1lbnRJbmplY3RvcjogdGhpcy5hcHBSZWYuaW5qZWN0b3IsIGVsZW1lbnRJbmplY3RvcjogbmV3IER5bmFtaWNEaWFsb2dJbmplY3Rvcih0aGlzLmluamVjdG9yLCBtYXApIH0pO1xuXG4gICAgICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgICAgICBjb25zdCBkb21FbGVtID0gKGNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBpZiAoIWNvbmZpZy5hcHBlbmRUbyB8fCBjb25maWcuYXBwZW5kVG8gPT09ICdib2R5Jykge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvbUVsZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hcHBlbmRDaGlsZChkb21FbGVtLCBjb25maWcuYXBwZW5kVG8pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaWFsb2dDb21wb25lbnRSZWZNYXAuc2V0KGRpYWxvZ1JlZiwgY29tcG9uZW50UmVmKTtcblxuICAgICAgICByZXR1cm4gZGlhbG9nUmVmO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRGlhbG9nQ29tcG9uZW50RnJvbUJvZHkoZGlhbG9nUmVmOiBEeW5hbWljRGlhbG9nUmVmPGFueT4pIHtcbiAgICAgICAgaWYgKCFkaWFsb2dSZWYgfHwgIXRoaXMuZGlhbG9nQ29tcG9uZW50UmVmTWFwLmhhcyhkaWFsb2dSZWYpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkaWFsb2dDb21wb25lbnRSZWYgPSB0aGlzLmRpYWxvZ0NvbXBvbmVudFJlZk1hcC5nZXQoZGlhbG9nUmVmKTtcbiAgICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyhkaWFsb2dDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgICAgICBkaWFsb2dDb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbXBvbmVudFJlZk1hcC5kZWxldGUoZGlhbG9nUmVmKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGR1cGxpY2F0aW9uUGVybWlzc2lvbihjb21wb25lbnRUeXBlOiBUeXBlPGFueT4sIGNvbmZpZzogRHluYW1pY0RpYWxvZ0NvbmZpZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoY29uZmlnLmR1cGxpY2F0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBlcm1pc3Npb24gPSB0cnVlO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiB0aGlzLmRpYWxvZ0NvbXBvbmVudFJlZk1hcCkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmluc3RhbmNlLmNoaWxkQ29tcG9uZW50VHlwZSA9PT0gY29tcG9uZW50VHlwZSkge1xuICAgICAgICAgICAgICAgIHBlcm1pc3Npb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGVybWlzc2lvbjtcbiAgICB9XG59XG4iXX0=