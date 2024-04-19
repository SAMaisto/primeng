import { Injectable } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
export class FilterService {
    filter(value, fields, filterValue, filterMatchMode, filterLocale) {
        let filteredItems = [];
        if (value) {
            for (let item of value) {
                for (let field of fields) {
                    let fieldValue = ObjectUtils.resolveFieldData(item, field);
                    if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
                        filteredItems.push(item);
                        break;
                    }
                }
            }
        }
        return filteredItems;
    }
    filters = {
        startsWith: (value, filter, filterLocale) => {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }
            if (value === undefined || value === null) {
                return false;
            }
            let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
            let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
            return stringValue.slice(0, filterValue.length) === filterValue;
        },
        contains: (value, filter, filterLocale) => {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }
            if (value === undefined || value === null) {
                return false;
            }
            let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
            let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
            return stringValue.indexOf(filterValue) !== -1;
        },
        notContains: (value, filter, filterLocale) => {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }
            if (value === undefined || value === null) {
                return false;
            }
            let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
            let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
            return stringValue.indexOf(filterValue) === -1;
        },
        endsWith: (value, filter, filterLocale) => {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }
            if (value === undefined || value === null) {
                return false;
            }
            let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
            let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
            return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
        },
        equals: (value, filter, filterLocale) => {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }
            if (value === undefined || value === null) {
                return false;
            }
            if (value.getTime && filter.getTime)
                return value.getTime() === filter.getTime();
            else
                return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) == ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        },
        notEquals: (value, filter, filterLocale) => {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return false;
            }
            if (value === undefined || value === null) {
                return true;
            }
            if (value.getTime && filter.getTime)
                return value.getTime() !== filter.getTime();
            else
                return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) != ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        },
        in: (value, filter) => {
            if (filter === undefined || filter === null || filter.length === 0) {
                return true;
            }
            for (let i = 0; i < filter.length; i++) {
                if (ObjectUtils.equals(value, filter[i])) {
                    return true;
                }
            }
            return false;
        },
        between: (value, filter) => {
            if (filter == null || filter[0] == null || filter[1] == null) {
                return true;
            }
            if (value === undefined || value === null) {
                return false;
            }
            if (value.getTime)
                return filter[0].getTime() <= value.getTime() && value.getTime() <= filter[1].getTime();
            else
                return filter[0] <= value && value <= filter[1];
        },
        lt: (value, filter, filterLocale) => {
            if (filter === undefined || filter === null) {
                return true;
            }
            if (value === undefined || value === null) {
                return false;
            }
            if (value.getTime && filter.getTime)
                return value.getTime() < filter.getTime();
            else
                return value < filter;
        },
        lte: (value, filter, filterLocale) => {
            if (filter === undefined || filter === null) {
                return true;
            }
            if (value === undefined || value === null) {
                return false;
            }
            if (value.getTime && filter.getTime)
                return value.getTime() <= filter.getTime();
            else
                return value <= filter;
        },
        gt: (value, filter, filterLocale) => {
            if (filter === undefined || filter === null) {
                return true;
            }
            if (value === undefined || value === null) {
                return false;
            }
            if (value.getTime && filter.getTime)
                return value.getTime() > filter.getTime();
            else
                return value > filter;
        },
        gte: (value, filter, filterLocale) => {
            if (filter === undefined || filter === null) {
                return true;
            }
            if (value === undefined || value === null) {
                return false;
            }
            if (value.getTime && filter.getTime)
                return value.getTime() >= filter.getTime();
            else
                return value >= filter;
        },
        is: (value, filter, filterLocale) => {
            return this.filters.equals(value, filter, filterLocale);
        },
        isNot: (value, filter, filterLocale) => {
            return this.filters.notEquals(value, filter, filterLocale);
        },
        before: (value, filter, filterLocale) => {
            return this.filters.lt(value, filter, filterLocale);
        },
        after: (value, filter, filterLocale) => {
            return this.filters.gt(value, filter, filterLocale);
        },
        dateIs: (value, filter) => {
            if (filter === undefined || filter === null) {
                return true;
            }
            if (value === undefined || value === null) {
                return false;
            }
            return value.toDateString() === filter.toDateString();
        },
        dateIsNot: (value, filter) => {
            if (filter === undefined || filter === null) {
                return true;
            }
            if (value === undefined || value === null) {
                return false;
            }
            return value.toDateString() !== filter.toDateString();
        },
        dateBefore: (value, filter) => {
            if (filter === undefined || filter === null) {
                return true;
            }
            if (value === undefined || value === null) {
                return false;
            }
            return value.getTime() < filter.getTime();
        },
        dateAfter: (value, filter) => {
            if (filter === undefined || filter === null) {
                return true;
            }
            if (value === undefined || value === null) {
                return false;
            }
            return value.getTime() > filter.getTime();
        }
    };
    register(rule, fn) {
        this.filters[rule] = fn;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FilterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FilterService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FilterService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9hcGkvZmlsdGVyc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRzVDLE1BQU0sT0FBTyxhQUFhO0lBQ3RCLE1BQU0sQ0FBQyxLQUFZLEVBQUUsTUFBYSxFQUFFLFdBQWdCLEVBQUUsZUFBdUIsRUFBRSxZQUFxQjtRQUNoRyxJQUFJLGFBQWEsR0FBVSxFQUFFLENBQUM7UUFFOUIsSUFBSSxLQUFLLEVBQUU7WUFDUCxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRTtnQkFDcEIsS0FBSyxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUU7b0JBQ3RCLElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBRTNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxFQUFFO3dCQUN0RSxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN6QixNQUFNO3FCQUNUO2lCQUNKO2FBQ0o7U0FDSjtRQUVELE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxPQUFPLEdBQWlDO1FBQzNDLFVBQVUsRUFBRSxDQUFDLEtBQVUsRUFBRSxNQUFXLEVBQUUsWUFBa0IsRUFBVyxFQUFFO1lBQ2pFLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2pFLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFFRCxJQUFJLEtBQUssS0FBSyxTQUFT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QUM1QixDQUFDO3VHQTdQUSxhQUFhOzJHQUFiLGFBQWEsY0FEQSxNQUFNOzsyRkFDbkIsYUFBYTtrQkFEekIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEZpbHRlclNlcnZpY2Uge1xuICAgIGZpbHRlcih2YWx1ZTogYW55W10sIGZpZWxkczogYW55W10sIGZpbHRlclZhbHVlOiBhbnksIGZpbHRlck1hdGNoTW9kZTogc3RyaW5nLCBmaWx0ZXJMb2NhbGU/OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZpbHRlcmVkSXRlbXM6IGFueVtdID0gW107XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZFZhbHVlID0gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShpdGVtLCBmaWVsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyc1tmaWx0ZXJNYXRjaE1vZGVdKGZpZWxkVmFsdWUsIGZpbHRlclZhbHVlLCBmaWx0ZXJMb2NhbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEl0ZW1zO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaWx0ZXJzOiB7IFtydWxlOiBzdHJpbmddOiBGdW5jdGlvbiB9ID0ge1xuICAgICAgICBzdGFydHNXaXRoOiAodmFsdWU6IGFueSwgZmlsdGVyOiBhbnksIGZpbHRlckxvY2FsZT86IGFueSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCB8fCBmaWx0ZXIudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGZpbHRlclZhbHVlID0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyhmaWx0ZXIudG9TdHJpbmcoKSkudG9Mb2NhbGVMb3dlckNhc2UoZmlsdGVyTG9jYWxlKTtcbiAgICAgICAgICAgIGxldCBzdHJpbmdWYWx1ZSA9IE9iamVjdFV0aWxzLnJlbW92ZUFjY2VudHModmFsdWUudG9TdHJpbmcoKSkudG9Mb2NhbGVMb3dlckNhc2UoZmlsdGVyTG9jYWxlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ1ZhbHVlLnNsaWNlKDAsIGZpbHRlclZhbHVlLmxlbmd0aCkgPT09IGZpbHRlclZhbHVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbnRhaW5zOiAodmFsdWU6IGFueSwgZmlsdGVyOiBhbnksIGZpbHRlckxvY2FsZT86IGFueSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCB8fCAodHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZycgJiYgZmlsdGVyLnRyaW0oKSA9PT0gJycpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKGZpbHRlci50b1N0cmluZygpKS50b0xvY2FsZUxvd2VyQ2FzZShmaWx0ZXJMb2NhbGUpO1xuICAgICAgICAgICAgbGV0IHN0cmluZ1ZhbHVlID0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyh2YWx1ZS50b1N0cmluZygpKS50b0xvY2FsZUxvd2VyQ2FzZShmaWx0ZXJMb2NhbGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nVmFsdWUuaW5kZXhPZihmaWx0ZXJWYWx1ZSkgIT09IC0xO1xuICAgICAgICB9LFxuXG4gICAgICAgIG5vdENvbnRhaW5zOiAodmFsdWU6IGFueSwgZmlsdGVyOiBhbnksIGZpbHRlckxvY2FsZT86IGFueSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCB8fCAodHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZycgJiYgZmlsdGVyLnRyaW0oKSA9PT0gJycpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKGZpbHRlci50b1N0cmluZygpKS50b0xvY2FsZUxvd2VyQ2FzZShmaWx0ZXJMb2NhbGUpO1xuICAgICAgICAgICAgbGV0IHN0cmluZ1ZhbHVlID0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyh2YWx1ZS50b1N0cmluZygpKS50b0xvY2FsZUxvd2VyQ2FzZShmaWx0ZXJMb2NhbGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nVmFsdWUuaW5kZXhPZihmaWx0ZXJWYWx1ZSkgPT09IC0xO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVuZHNXaXRoOiAodmFsdWU6IGFueSwgZmlsdGVyOiBhbnksIGZpbHRlckxvY2FsZT86IGFueSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCB8fCBmaWx0ZXIudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGZpbHRlclZhbHVlID0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyhmaWx0ZXIudG9TdHJpbmcoKSkudG9Mb2NhbGVMb3dlckNhc2UoZmlsdGVyTG9jYWxlKTtcbiAgICAgICAgICAgIGxldCBzdHJpbmdWYWx1ZSA9IE9iamVjdFV0aWxzLnJlbW92ZUFjY2VudHModmFsdWUudG9TdHJpbmcoKSkudG9Mb2NhbGVMb3dlckNhc2UoZmlsdGVyTG9jYWxlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ1ZhbHVlLmluZGV4T2YoZmlsdGVyVmFsdWUsIHN0cmluZ1ZhbHVlLmxlbmd0aCAtIGZpbHRlclZhbHVlLmxlbmd0aCkgIT09IC0xO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVxdWFsczogKHZhbHVlOiBhbnksIGZpbHRlcjogYW55LCBmaWx0ZXJMb2NhbGU/OiBhbnkpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIgPT09IHVuZGVmaW5lZCB8fCBmaWx0ZXIgPT09IG51bGwgfHwgKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnICYmIGZpbHRlci50cmltKCkgPT09ICcnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZhbHVlLmdldFRpbWUgJiYgZmlsdGVyLmdldFRpbWUpIHJldHVybiB2YWx1ZS5nZXRUaW1lKCkgPT09IGZpbHRlci5nZXRUaW1lKCk7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKHZhbHVlLnRvU3RyaW5nKCkpLnRvTG9jYWxlTG93ZXJDYXNlKGZpbHRlckxvY2FsZSkgPT0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyhmaWx0ZXIudG9TdHJpbmcoKSkudG9Mb2NhbGVMb3dlckNhc2UoZmlsdGVyTG9jYWxlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBub3RFcXVhbHM6ICh2YWx1ZTogYW55LCBmaWx0ZXI6IGFueSwgZmlsdGVyTG9jYWxlPzogYW55KTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyID09PSB1bmRlZmluZWQgfHwgZmlsdGVyID09PSBudWxsIHx8ICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJyAmJiBmaWx0ZXIudHJpbSgpID09PSAnJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZS5nZXRUaW1lICYmIGZpbHRlci5nZXRUaW1lKSByZXR1cm4gdmFsdWUuZ2V0VGltZSgpICE9PSBmaWx0ZXIuZ2V0VGltZSgpO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyh2YWx1ZS50b1N0cmluZygpKS50b0xvY2FsZUxvd2VyQ2FzZShmaWx0ZXJMb2NhbGUpICE9IE9iamVjdFV0aWxzLnJlbW92ZUFjY2VudHMoZmlsdGVyLnRvU3RyaW5nKCkpLnRvTG9jYWxlTG93ZXJDYXNlKGZpbHRlckxvY2FsZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW46ICh2YWx1ZTogYW55LCBmaWx0ZXI6IGFueVtdKTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyID09PSB1bmRlZmluZWQgfHwgZmlsdGVyID09PSBudWxsIHx8IGZpbHRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWx0ZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0VXRpbHMuZXF1YWxzKHZhbHVlLCBmaWx0ZXJbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGJldHdlZW46ICh2YWx1ZTogYW55LCBmaWx0ZXI6IGFueVtdKTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyID09IG51bGwgfHwgZmlsdGVyWzBdID09IG51bGwgfHwgZmlsdGVyWzFdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZS5nZXRUaW1lKSByZXR1cm4gZmlsdGVyWzBdLmdldFRpbWUoKSA8PSB2YWx1ZS5nZXRUaW1lKCkgJiYgdmFsdWUuZ2V0VGltZSgpIDw9IGZpbHRlclsxXS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBmaWx0ZXJbMF0gPD0gdmFsdWUgJiYgdmFsdWUgPD0gZmlsdGVyWzFdO1xuICAgICAgICB9LFxuXG4gICAgICAgIGx0OiAodmFsdWU6IGFueSwgZmlsdGVyOiBhbnksIGZpbHRlckxvY2FsZT86IGFueSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZhbHVlLmdldFRpbWUgJiYgZmlsdGVyLmdldFRpbWUpIHJldHVybiB2YWx1ZS5nZXRUaW1lKCkgPCBmaWx0ZXIuZ2V0VGltZSgpO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gdmFsdWUgPCBmaWx0ZXI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbHRlOiAodmFsdWU6IGFueSwgZmlsdGVyOiBhbnksIGZpbHRlckxvY2FsZT86IGFueSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZhbHVlLmdldFRpbWUgJiYgZmlsdGVyLmdldFRpbWUpIHJldHVybiB2YWx1ZS5nZXRUaW1lKCkgPD0gZmlsdGVyLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIHZhbHVlIDw9IGZpbHRlcjtcbiAgICAgICAgfSxcblxuICAgICAgICBndDogKHZhbHVlOiBhbnksIGZpbHRlcjogYW55LCBmaWx0ZXJMb2NhbGU/OiBhbnkpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIgPT09IHVuZGVmaW5lZCB8fCBmaWx0ZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZS5nZXRUaW1lICYmIGZpbHRlci5nZXRUaW1lKSByZXR1cm4gdmFsdWUuZ2V0VGltZSgpID4gZmlsdGVyLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIHZhbHVlID4gZmlsdGVyO1xuICAgICAgICB9LFxuXG4gICAgICAgIGd0ZTogKHZhbHVlOiBhbnksIGZpbHRlcjogYW55LCBmaWx0ZXJMb2NhbGU/OiBhbnkpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIgPT09IHVuZGVmaW5lZCB8fCBmaWx0ZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZS5nZXRUaW1lICYmIGZpbHRlci5nZXRUaW1lKSByZXR1cm4gdmFsdWUuZ2V0VGltZSgpID49IGZpbHRlci5nZXRUaW1lKCk7XG4gICAgICAgICAgICBlbHNlIHJldHVybiB2YWx1ZSA+PSBmaWx0ZXI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXM6ICh2YWx1ZTogYW55LCBmaWx0ZXI6IGFueSwgZmlsdGVyTG9jYWxlPzogYW55KTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJzLmVxdWFscyh2YWx1ZSwgZmlsdGVyLCBmaWx0ZXJMb2NhbGUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzTm90OiAodmFsdWU6IGFueSwgZmlsdGVyOiBhbnksIGZpbHRlckxvY2FsZT86IGFueSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVycy5ub3RFcXVhbHModmFsdWUsIGZpbHRlciwgZmlsdGVyTG9jYWxlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBiZWZvcmU6ICh2YWx1ZTogYW55LCBmaWx0ZXI6IGFueSwgZmlsdGVyTG9jYWxlPzogYW55KTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJzLmx0KHZhbHVlLCBmaWx0ZXIsIGZpbHRlckxvY2FsZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWZ0ZXI6ICh2YWx1ZTogYW55LCBmaWx0ZXI6IGFueSwgZmlsdGVyTG9jYWxlPzogYW55KTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJzLmd0KHZhbHVlLCBmaWx0ZXIsIGZpbHRlckxvY2FsZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGF0ZUlzOiAodmFsdWU6IGFueSwgZmlsdGVyOiBhbnkpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIgPT09IHVuZGVmaW5lZCB8fCBmaWx0ZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b0RhdGVTdHJpbmcoKSA9PT0gZmlsdGVyLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRhdGVJc05vdDogKHZhbHVlOiBhbnksIGZpbHRlcjogYW55KTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyID09PSB1bmRlZmluZWQgfHwgZmlsdGVyID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUudG9EYXRlU3RyaW5nKCkgIT09IGZpbHRlci50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkYXRlQmVmb3JlOiAodmFsdWU6IGFueSwgZmlsdGVyOiBhbnkpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIgPT09IHVuZGVmaW5lZCB8fCBmaWx0ZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5nZXRUaW1lKCkgPCBmaWx0ZXIuZ2V0VGltZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRhdGVBZnRlcjogKHZhbHVlOiBhbnksIGZpbHRlcjogYW55KTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyID09PSB1bmRlZmluZWQgfHwgZmlsdGVyID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZ2V0VGltZSgpID4gZmlsdGVyLmdldFRpbWUoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZWdpc3RlcihydWxlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLmZpbHRlcnNbcnVsZV0gPSBmbjtcbiAgICB9XG59XG4iXX0=