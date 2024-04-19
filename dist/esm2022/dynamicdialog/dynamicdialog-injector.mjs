export class DynamicDialogInjector {
    _parentInjector;
    _additionalTokens;
    constructor(_parentInjector, _additionalTokens) {
        this._parentInjector = _parentInjector;
        this._additionalTokens = _additionalTokens;
    }
    get(token, notFoundValue, options) {
        const value = this._additionalTokens.get(token);
        if (value)
            return value;
        return this._parentInjector.get(token, notFoundValue);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pY2RpYWxvZy1pbmplY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9keW5hbWljZGlhbG9nL2R5bmFtaWNkaWFsb2ctaW5qZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxPQUFPLHFCQUFxQjtJQUNWO0lBQW1DO0lBQXZELFlBQW9CLGVBQXlCLEVBQVUsaUJBQW9DO1FBQXZFLG9CQUFlLEdBQWYsZUFBZSxDQUFVO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUFHLENBQUM7SUFFL0YsR0FBRyxDQUFJLEtBQXVCLEVBQUUsYUFBaUIsRUFBRSxPQUFxQztRQUNwRixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhELElBQUksS0FBSztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRXhCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQU0sS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdE9wdGlvbnMsIEluamVjdG9yLCBQcm92aWRlclRva2VuLCBJbmplY3RGbGFncyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgRHluYW1pY0RpYWxvZ0luamVjdG9yIGltcGxlbWVudHMgSW5qZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhcmVudEluamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBfYWRkaXRpb25hbFRva2VuczogV2Vha01hcDxhbnksIGFueT4pIHt9XG5cbiAgICBnZXQ8VD4odG9rZW46IFByb3ZpZGVyVG9rZW48VD4sIG5vdEZvdW5kVmFsdWU/OiBULCBvcHRpb25zPzogSW5qZWN0T3B0aW9ucyB8IEluamVjdEZsYWdzKTogVCB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fYWRkaXRpb25hbFRva2Vucy5nZXQodG9rZW4pO1xuXG4gICAgICAgIGlmICh2YWx1ZSkgcmV0dXJuIHZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnRJbmplY3Rvci5nZXQ8YW55Pih0b2tlbiwgbm90Rm91bmRWYWx1ZSk7XG4gICAgfVxufVxuIl19