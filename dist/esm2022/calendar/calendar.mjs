import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, forwardRef, Inject, Input, NgModule, numberAttribute, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { RippleModule } from 'primeng/ripple';
import { ObjectUtils, UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { ChevronUpIcon } from 'primeng/icons/chevronup';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { TimesIcon } from 'primeng/icons/times';
import { CalendarIcon } from 'primeng/icons/calendar';
import { AutoFocusModule } from 'primeng/autofocus';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/button";
import * as i4 from "primeng/ripple";
import * as i5 from "primeng/autofocus";
export const CALENDAR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Calendar),
    multi: true
};
/**
 * Calendar also known as DatePicker, is a form component to work with dates.
 * @group Components
 */
export class Calendar {
    document;
    el;
    renderer;
    cd;
    zone;
    config;
    overlayService;
    iconDisplay = 'button';
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Inline style of the input field.
     * @group Props
     */
    inputStyle;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId;
    /**
     * Name of the input element.
     * @group Props
     */
    name;
    /**
     * Style class of the input field.
     * @group Props
     */
    inputStyleClass;
    /**
     * Placeholder text for the input.
     * @group Props
     */
    placeholder;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel;
    /**
     * Defines a string that labels the icon button for accessibility.
     * @group Props
     */
    iconAriaLabel;
    /**
     * When specified, disables the component.
     * @group Props
     */
    disabled;
    /**
     * Format of the date which can also be defined at locale settings.
     * @group Props
     */
    dateFormat;
    /**
     * Separator for multiple selection mode.
     * @group Props
     */
    multipleSeparator = ',';
    /**
     * Separator for joining start and end dates on range selection mode.
     * @group Props
     */
    rangeSeparator = '-';
    /**
     * When enabled, displays the calendar as inline. Default is false for popup mode.
     * @group Props
     */
    inline = false;
    /**
     * Whether to display dates in other months (non-selectable) at the start or end of the current month. To make these days selectable use the selectOtherMonths option.
     * @group Props
     */
    showOtherMonths = true;
    /**
     * Whether days in other months shown before or after the current month are selectable. This only applies if the showOtherMonths option is set to true.
     * @group Props
     */
    selectOtherMonths;
    /**
     * When enabled, displays a button with icon next to input.
     * @group Props
     */
    showIcon;
    /**
     * Icon of the calendar button.
     * @group Props
     */
    icon;
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having#mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * When specified, prevents entering the date manually with keyboard.
     * @group Props
     */
    readonlyInput;
    /**
     * The cutoff year for determining the century for a date.
     * @group Props
     */
    shortYearCutoff = '+10';
    /**
     * Whether the month should be rendered as a dropdown instead of text.
     * @group Props
     * @deprecated Navigator is always on.
     */
    monthNavigator;
    /**
     * Whether the year should be rendered as a dropdown instead of text.
     * @group Props
     * @deprecated  Navigator is always on.
     */
    yearNavigator;
    /**
     * Specifies 12 or 24 hour format.
     * @group Props
     */
    hourFormat = '24';
    /**
     * Whether to display timepicker only.
     * @group Props
     */
    timeOnly;
    /**
     * Hours to change per step.
     * @group Props
     */
    stepHour = 1;
    /**
     * Minutes to change per step.
     * @group Props
     */
    stepMinute = 1;
    /**
     * Seconds to change per step.
     * @group Props
     */
    stepSecond = 1;
    /**
     * Whether to show the seconds in time picker.
     * @group Props
     */
    showSeconds = false;
    /**
     * When present, it specifies that an input field must be filled out before submitting the form.
     * @group Props
     */
    required;
    /**
     * When disabled, datepicker will not be visible with input focus.
     * @group Props
     */
    showOnFocus = true;
    /**
     * When enabled, calendar will show week numbers.
     * @group Props
     */
    showWeek = false;
    /**
     * When enabled, calendar will start week numbers from first day of the year.
     * @group Props
     */
    startWeekFromFirstDayOfYear = false;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = false;
    /**
     * Type of the value to write back to ngModel, default is date and alternative is string.
     * @group Props
     */
    dataType = 'date';
    /**
     * Defines the quantity of the selection, valid values are "single", "multiple" and "range".
     * @group Props
     */
    selectionMode = 'single';
    /**
     * Maximum number of selectable dates in multiple mode.
     * @group Props
     */
    maxDateCount;
    /**
     * Whether to display today and clear buttons at the footer
     * @group Props
     */
    showButtonBar;
    /**
     * Style class of the today button.
     * @group Props
     */
    todayButtonStyleClass = 'p-button-text';
    /**
     * Style class of the clear button.
     * @group Props
     */
    clearButtonStyleClass = 'p-button-text';
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = 0;
    /**
     * Style class of the datetimepicker container element.
     * @group Props
     */
    panelStyleClass;
    /**
     * Inline style of the datetimepicker container element.
     * @group Props
     */
    panelStyle;
    /**
     * Keep invalid value when input blur.
     * @group Props
     */
    keepInvalid = false;
    /**
     * Whether to hide the overlay on date selection.
     * @group Props
     */
    hideOnDateTimeSelect = true;
    /**
     * When enabled, calendar overlay is displayed as optimized for touch devices.
     * @group Props
     */
    touchUI;
    /**
     * Separator of time selector.
     * @group Props
     */
    timeSeparator = ':';
    /**
     * When enabled, can only focus on elements inside the calendar.
     * @group Props
     */
    focusTrap = true;
    /**
     * Transition options of the show animation.
     * @group Props
     */
    showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    hideTransitionOptions = '.1s linear';
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex;
    /**
     * The minimum selectable date.
     * @group Props
     */
    get minDate() {
        return this._minDate;
    }
    set minDate(date) {
        this._minDate = date;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    /**
     * The maximum selectable date.
     * @group Props
     */
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(date) {
        this._maxDate = date;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    /**
     * Array with dates that should be disabled (not selectable).
     * @group Props
     */
    get disabledDates() {
        return this._disabledDates;
    }
    set disabledDates(disabledDates) {
        this._disabledDates = disabledDates;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    /**
     * Array with weekday numbers that should be disabled (not selectable).
     * @group Props
     */
    get disabledDays() {
        return this._disabledDays;
    }
    set disabledDays(disabledDays) {
        this._disabledDays = disabledDays;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    /**
     * The range of years displayed in the year drop-down in (nnnn:nnnn) format such as (2000:2020).
     * @group Props
     * @deprecated Years are based on decades by default.
     */
    get yearRange() {
        return this._yearRange;
    }
    set yearRange(yearRange) {
        this._yearRange = yearRange;
        if (yearRange) {
            const years = yearRange.split(':');
            const yearStart = parseInt(years[0]);
            const yearEnd = parseInt(years[1]);
            this.populateYearOptions(yearStart, yearEnd);
        }
    }
    /**
     * Whether to display timepicker.
     * @group Props
     */
    get showTime() {
        return this._showTime;
    }
    set showTime(showTime) {
        this._showTime = showTime;
        if (this.currentHour === undefined) {
            this.initTime(this.value || new Date());
        }
        this.updateInputfield();
    }
    /**
     * An array of options for responsive design.
     * @group Props
     */
    get responsiveOptions() {
        return this._responsiveOptions;
    }
    set responsiveOptions(responsiveOptions) {
        this._responsiveOptions = responsiveOptions;
        this.destroyResponsiveStyleElement();
        this.createResponsiveStyle();
    }
    /**
     * Number of months to display.
     * @group Props
     */
    get numberOfMonths() {
        return this._numberOfMonths;
    }
    set numberOfMonths(numberOfMonths) {
        this._numberOfMonths = numberOfMonths;
        this.destroyResponsiveStyleElement();
        this.createResponsiveStyle();
    }
    /**
     * Defines the first of the week for various date calculations.
     * @group Props
     */
    get firstDayOfWeek() {
        return this._firstDayOfWeek;
    }
    set firstDayOfWeek(firstDayOfWeek) {
        this._firstDayOfWeek = firstDayOfWeek;
        this.createWeekDays();
    }
    /**
     * Option to set calendar locale.
     * @group Props
     * @deprecated Locale property has no effect, use new i18n API instead.
     */
    set locale(newLocale) {
        console.warn('Locale property has no effect, use new i18n API instead.');
    }
    /**
     * Type of view to display, valid values are "date" for datepicker and "month" for month picker.
     * @group Props
     */
    get view() {
        return this._view;
    }
    set view(view) {
        this._view = view;
        this.currentView = this._view;
    }
    /**
     * Set the date to highlight on first opening if the field is blank.
     * @group Props
     */
    get defaultDate() {
        return this._defaultDate;
    }
    set defaultDate(defaultDate) {
        this._defaultDate = defaultDate;
        if (this.initialized) {
            const date = defaultDate || new Date();
            this.currentMonth = date.getMonth();
            this.currentYear = date.getFullYear();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    /**
     * Callback to invoke on focus of input field.
     * @param {Event} event - browser event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke on blur of input field.
     * @param {Event} event - browser event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    /**
     * Callback to invoke when date panel closed.
     * @param {Event} event - Mouse event
     * @group Emits
     */
    onClose = new EventEmitter();
    /**
     * Callback to invoke on date select.
     * @param {Date} date - date value.
     * @group Emits
     */
    onSelect = new EventEmitter();
    /**
     * Callback to invoke when input field cleared.
     * @group Emits
     */
    onClear = new EventEmitter();
    /**
     * Callback to invoke when input field is being typed.
     * @param {Event} event - browser event
     * @group Emits
     */
    onInput = new EventEmitter();
    /**
     * Callback to invoke when today button is clicked.
     * @param {Date} date - today as a date instance.
     * @group Emits
     */
    onTodayClick = new EventEmitter();
    /**
     * Callback to invoke when clear button is clicked.
     * @param {Event} event - browser event.
     * @group Emits
     */
    onClearClick = new EventEmitter();
    /**
     * Callback to invoke when a month is changed using the navigators.
     * @param {CalendarMonthChangeEvent} event - custom month change event.
     * @group Emits
     */
    onMonthChange = new EventEmitter();
    /**
     * Callback to invoke when a year is changed using the navigators.
     * @param {CalendarYearChangeEvent} event - custom year change event.
     * @group Emits
     */
    onYearChange = new EventEmitter();
    /**
     * Callback to invoke when clicked outside of the date panel.
     * @group Emits
     */
    onClickOutside = new EventEmitter();
    /**
     * Callback to invoke when datepicker panel is shown.
     * @group Emits
     */
    onShow = new EventEmitter();
    templates;
    containerViewChild;
    inputfieldViewChild;
    set content(content) {
        this.contentViewChild = content;
        if (this.contentViewChild) {
            if (this.isMonthNavigate) {
                Promise.resolve(null).then(() => this.updateFocus());
                this.isMonthNavigate = false;
            }
            else {
                if (!this.focus && !this.inline) {
                    this.initFocusableCell();
                }
            }
        }
    }
    contentViewChild;
    value;
    dates;
    months;
    weekDays;
    currentMonth;
    currentYear;
    currentHour;
    currentMinute;
    currentSecond;
    pm;
    mask;
    maskClickListener;
    overlay;
    responsiveStyleElement;
    overlayVisible;
    onModelChange = () => { };
    onModelTouched = () => { };
    calendarElement;
    timePickerTimer;
    documentClickListener;
    animationEndListener;
    ticksTo1970;
    yearOptions;
    focus;
    isKeydown;
    filled;
    inputFieldValue = null;
    _minDate;
    _maxDate;
    _showTime;
    _yearRange;
    preventDocumentListener;
    dateTemplate;
    headerTemplate;
    footerTemplate;
    disabledDateTemplate;
    decadeTemplate;
    previousIconTemplate;
    nextIconTemplate;
    triggerIconTemplate;
    clearIconTemplate;
    decrementIconTemplate;
    incrementIconTemplate;
    inputIconTemplate;
    _disabledDates;
    _disabledDays;
    selectElement;
    todayElement;
    focusElement;
    scrollHandler;
    documentResizeListener;
    navigationState = null;
    isMonthNavigate;
    initialized;
    translationSubscription;
    _locale;
    _responsiveOptions;
    currentView;
    attributeSelector;
    panelId;
    _numberOfMonths = 1;
    _firstDayOfWeek;
    _view = 'date';
    preventFocus;
    _defaultDate;
    window;
    get locale() {
        return this._locale;
    }
    get iconButtonAriaLabel() {
        return this.iconAriaLabel ? this.iconAriaLabel : this.getTranslation('chooseDate');
    }
    get prevIconAriaLabel() {
        return this.currentView === 'year' ? this.getTranslation('prevDecade') : this.currentView === 'month' ? this.getTranslation('prevYear') : this.getTranslation('prevMonth');
    }
    get nextIconAriaLabel() {
        return this.currentView === 'year' ? this.getTranslation('nextDecade') : this.currentView === 'month' ? this.getTranslation('nextYear') : this.getTranslation('nextMonth');
    }
    constructor(document, el, renderer, cd, zone, config, overlayService) {
        this.document = document;
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.config = config;
        this.overlayService = overlayService;
        this.window = this.document.defaultView;
    }
    ngOnInit() {
        this.attributeSelector = UniqueComponentId();
        this.panelId = this.attributeSelector + '_panel';
        const date = this.defaultDate || new Date();
        this.createResponsiveStyle();
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
        this.yearOptions = [];
        this.currentView = this.view;
        if (this.view === 'date') {
            this.createWeekDays();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
            this.ticksTo1970 = ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000;
        }
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.createWeekDays();
            this.cd.markForCheck();
        });
        this.initialized = true;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'date':
                    this.dateTemplate = item.template;
                    break;
                case 'decade':
                    this.decadeTemplate = item.template;
                    break;
                case 'disabledDate':
                    this.disabledDateTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'inputicon':
                    this.inputIconTemplate = item.template;
                    break;
                case 'previousicon':
                    this.previousIconTemplate = item.template;
                    break;
                case 'nexticon':
                    this.nextIconTemplate = item.template;
                    break;
                case 'triggericon':
                    this.triggerIconTemplate = item.template;
                    break;
                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;
                case 'decrementicon':
                    this.decrementIconTemplate = item.template;
                    break;
                case 'incrementicon':
                    this.incrementIconTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                default:
                    this.dateTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (this.inline) {
            this.contentViewChild && this.contentViewChild.nativeElement.setAttribute(this.attributeSelector, '');
            if (!this.disabled && !this.inline) {
                this.initFocusableCell();
                if (this.numberOfMonths === 1) {
                    if (this.contentViewChild && this.contentViewChild.nativeElement) {
                        this.contentViewChild.nativeElement.style.width = DomHandler.getOuterWidth(this.containerViewChild?.nativeElement) + 'px';
                    }
                }
            }
        }
    }
    getTranslation(option) {
        return this.config.getTranslation(option);
    }
    populateYearOptions(start, end) {
        this.yearOptions = [];
        for (let i = start; i <= end; i++) {
            this.yearOptions.push(i);
        }
    }
    createWeekDays() {
        this.weekDays = [];
        let dayIndex = this.getFirstDateOfWeek();
        let dayLabels = this.getTranslation(TranslationKeys.DAY_NAMES_MIN);
        for (let i = 0; i < 7; i++) {
            this.weekDays.push(dayLabels[dayIndex]);
            dayIndex = dayIndex == 6 ? 0 : ++dayIndex;
        }
    }
    monthPickerValues() {
        let monthPickerValues = [];
        for (let i = 0; i <= 11; i++) {
            monthPickerValues.push(this.config.getTranslation('monthNamesShort')[i]);
        }
        return monthPickerValues;
    }
    yearPickerValues() {
        let yearPickerValues = [];
        let base = this.currentYear - (this.currentYear % 10);
        for (let i = 0; i < 10; i++) {
            yearPickerValues.push(base + i);
        }
        return yearPickerValues;
    }
    createMonths(month, year) {
        this.months = this.months = [];
        for (let i = 0; i < this.numberOfMonths; i++) {
            let m = month + i;
            let y = year;
            if (m > 11) {
                m = (m % 11) - 1;
                y = year + 1;
            }
            this.months.push(this.createMonth(m, y));
        }
    }
    getWeekNumber(date) {
        let checkDate = new Date(date.getTime());
        if (this.startWeekFromFirstDayOfYear) {
            let firstDayOfWeek = +this.getFirstDateOfWeek();
            checkDate.setDate(checkDate.getDate() + 6 + firstDayOfWeek - checkDate.getDay());
        }
        else {
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        }
        let time = checkDate.getTime();
        checkDate.setMonth(0);
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    }
    createMonth(month, year) {
        let dates = [];
        let firstDay = this.getFirstDayOfMonthIndex(month, year);
        let daysLength = this.getDaysCountInMonth(month, year);
        let prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
        let dayNo = 1;
        let today = new Date();
        let weekNumbers = [];
        let monthRows = Math.ceil((daysLength + firstDay) / 7);
        for (let i = 0; i < monthRows; i++) {
            let week = [];
            if (i == 0) {
                for (let j = prevMonthDaysLength - firstDay + 1; j <= prevMonthDaysLength; j++) {
                    let prev = this.getPreviousMonthAndYear(month, year);
                    week.push({ day: j, month: prev.month, year: prev.year, otherMonth: true, today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year, true) });
                }
                let remainingDaysLength = 7 - week.length;
                for (let j = 0; j < remainingDaysLength; j++) {
                    week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year), selectable: this.isSelectable(dayNo, month, year, false) });
                    dayNo++;
                }
            }
            else {
                for (let j = 0; j < 7; j++) {
                    if (dayNo > daysLength) {
                        let next = this.getNextMonthAndYear(month, year);
                        week.push({
                            day: dayNo - daysLength,
                            month: next.month,
                            year: next.year,
                            otherMonth: true,
                            today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                            selectable: this.isSelectable(dayNo - daysLength, next.month, next.year, true)
                        });
                    }
                    else {
                        week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year), selectable: this.isSelectable(dayNo, month, year, false) });
                    }
                    dayNo++;
                }
            }
            if (this.showWeek) {
                weekNumbers.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
            }
            dates.push(week);
        }
        return {
            month: month,
            year: year,
            dates: dates,
            weekNumbers: weekNumbers
        };
    }
    initTime(date) {
        this.pm = date.getHours() > 11;
        if (this.showTime) {
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
            this.setCurrentHourPM(date.getHours());
        }
        else if (this.timeOnly) {
            this.currentMinute = 0;
            this.currentHour = 0;
            this.currentSecond = 0;
        }
    }
    navBackward(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        this.isMonthNavigate = true;
        if (this.currentView === 'month') {
            this.decrementYear();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        }
        else if (this.currentView === 'year') {
            this.decrementDecade();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        }
        else {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.decrementYear();
            }
            else {
                this.currentMonth--;
            }
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    navForward(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        this.isMonthNavigate = true;
        if (this.currentView === 'month') {
            this.incrementYear();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        }
        else if (this.currentView === 'year') {
            this.incrementDecade();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        }
        else {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.incrementYear();
            }
            else {
                this.currentMonth++;
            }
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    decrementYear() {
        this.currentYear--;
        let _yearOptions = this.yearOptions;
        if (this.yearNavigator && this.currentYear < _yearOptions[0]) {
            let difference = _yearOptions[_yearOptions.length - 1] - _yearOptions[0];
            this.populateYearOptions(_yearOptions[0] - difference, _yearOptions[_yearOptions.length - 1] - difference);
        }
    }
    decrementDecade() {
        this.currentYear = this.currentYear - 10;
    }
    incrementDecade() {
        this.currentYear = this.currentYear + 10;
    }
    incrementYear() {
        this.currentYear++;
        let _yearOptions = this.yearOptions;
        if (this.yearNavigator && this.currentYear > _yearOptions[_yearOptions.length - 1]) {
            let difference = _yearOptions[_yearOptions.length - 1] - _yearOptions[0];
            this.populateYearOptions(_yearOptions[0] + difference, _yearOptions[_yearOptions.length - 1] + difference);
        }
    }
    switchToMonthView(event) {
        this.setCurrentView('month');
        event.preventDefault();
    }
    switchToYearView(event) {
        this.setCurrentView('year');
        event.preventDefault();
    }
    onDateSelect(event, dateMeta) {
        if (this.disabled || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }
        if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
            this.value = this.value.filter((date, i) => {
                return !this.isDateEquals(date, dateMeta);
            });
            if (this.value.length === 0) {
                this.value = null;
            }
            this.updateModel(this.value);
        }
        else {
            if (this.shouldSelectDate(dateMeta)) {
                this.selectDate(dateMeta);
            }
        }
        if ((this.isSingleSelection() && this.hideOnDateTimeSelect) || (this.isRangeSelection() && this.value[1])) {
            setTimeout(() => {
                event.preventDefault();
                this.hideOverlay();
                if (this.mask) {
                    this.disableModality();
                }
                this.cd.markForCheck();
            }, 150);
        }
        this.updateInputfield();
        event.preventDefault();
    }
    shouldSelectDate(dateMeta) {
        if (this.isMultipleSelection())
            return this.maxDateCount != null ? this.maxDateCount > (this.value ? this.value.length : 0) : true;
        else
            return true;
    }
    onMonthSelect(event, index) {
        if (this.view === 'month') {
            this.onDateSelect(event, { year: this.currentYear, month: index, day: 1, selectable: true });
        }
        else {
            this.currentMonth = index;
            this.createMonths(this.currentMonth, this.currentYear);
            this.setCurrentView('date');
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        }
    }
    onYearSelect(event, year) {
        if (this.view === 'year') {
            this.onDateSelect(event, { year: year, month: 0, day: 1, selectable: true });
        }
        else {
            this.currentYear = year;
            this.setCurrentView('month');
            this.onYearChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        }
    }
    updateInputfield() {
        let formattedValue = '';
        if (this.value) {
            if (this.isSingleSelection()) {
                formattedValue = this.formatDateTime(this.value);
            }
            else if (this.isMultipleSelection()) {
                for (let i = 0; i < this.value.length; i++) {
                    let dateAsString = this.formatDateTime(this.value[i]);
                    formattedValue += dateAsString;
                    if (i !== this.value.length - 1) {
                        formattedValue += this.multipleSeparator + ' ';
                    }
                }
            }
            else if (this.isRangeSelection()) {
                if (this.value && this.value.length) {
                    let startDate = this.value[0];
                    let endDate = this.value[1];
                    formattedValue = this.formatDateTime(startDate);
                    if (endDate) {
                        formattedValue += ' ' + this.rangeSeparator + ' ' + this.formatDateTime(endDate);
                    }
                }
            }
        }
        this.inputFieldValue = formattedValue;
        this.updateFilledState();
        if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
            this.inputfieldViewChild.nativeElement.value = this.inputFieldValue;
        }
    }
    formatDateTime(date) {
        let formattedValue = this.keepInvalid ? date : null;
        if (this.isValidDate(date)) {
            if (this.timeOnly) {
                formattedValue = this.formatTime(date);
            }
            else {
                formattedValue = this.formatDate(date, this.getDateFormat());
                if (this.showTime) {
                    formattedValue += ' ' + this.formatTime(date);
                }
            }
        }
        else if (this.dataType === 'string') {
            formattedValue = date;
        }
        return formattedValue;
    }
    setCurrentHourPM(hours) {
        if (this.hourFormat == '12') {
            this.pm = hours > 11;
            if (hours >= 12) {
                this.currentHour = hours == 12 ? 12 : hours - 12;
            }
            else {
                this.currentHour = hours == 0 ? 12 : hours;
            }
        }
        else {
            this.currentHour = hours;
        }
    }
    setCurrentView(currentView) {
        this.currentView = currentView;
        this.cd.detectChanges();
        this.alignOverlay();
    }
    selectDate(dateMeta) {
        let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        if (this.showTime) {
            if (this.hourFormat == '12') {
                if (this.currentHour === 12)
                    date.setHours(this.pm ? 12 : 0);
                else
                    date.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
            }
            else {
                date.setHours(this.currentHour);
            }
            date.setMinutes(this.currentMinute);
            date.setSeconds(this.currentSecond);
        }
        if (this.minDate && this.minDate > date) {
            date = this.minDate;
            this.setCurrentHourPM(date.getHours());
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
        }
        if (this.maxDate && this.maxDate < date) {
            date = this.maxDate;
            this.setCurrentHourPM(date.getHours());
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
        }
        if (this.isSingleSelection()) {
            this.updateModel(date);
        }
        else if (this.isMultipleSelection()) {
            this.updateModel(this.value ? [...this.value, date] : [date]);
        }
        else if (this.isRangeSelection()) {
            if (this.value && this.value.length) {
                let startDate = this.value[0];
                let endDate = this.value[1];
                if (!endDate && date.getTime() >= startDate.getTime()) {
                    endDate = date;
                }
                else {
                    startDate = date;
                    endDate = null;
                }
                this.updateModel([startDate, endDate]);
            }
            else {
                this.updateModel([date, null]);
            }
        }
        this.onSelect.emit(date);
    }
    updateModel(value) {
        this.value = value;
        if (this.dataType == 'date') {
            this.onModelChange(this.value);
        }
        else if (this.dataType == 'string') {
            if (this.isSingleSelection()) {
                this.onModelChange(this.formatDateTime(this.value));
            }
            else {
                let stringArrValue = null;
                if (Array.isArray(this.value)) {
                    stringArrValue = this.value.map((date) => this.formatDateTime(date));
                }
                this.onModelChange(stringArrValue);
            }
        }
    }
    getFirstDayOfMonthIndex(month, year) {
        let day = new Date();
        day.setDate(1);
        day.setMonth(month);
        day.setFullYear(year);
        let dayIndex = day.getDay() + this.getSundayIndex();
        return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    }
    getDaysCountInMonth(month, year) {
        return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
    }
    getDaysCountInPrevMonth(month, year) {
        let prev = this.getPreviousMonthAndYear(month, year);
        return this.getDaysCountInMonth(prev.month, prev.year);
    }
    getPreviousMonthAndYear(month, year) {
        let m, y;
        if (month === 0) {
            m = 11;
            y = year - 1;
        }
        else {
            m = month - 1;
            y = year;
        }
        return { month: m, year: y };
    }
    getNextMonthAndYear(month, year) {
        let m, y;
        if (month === 11) {
            m = 0;
            y = year + 1;
        }
        else {
            m = month + 1;
            y = year;
        }
        return { month: m, year: y };
    }
    getSundayIndex() {
        let firstDayOfWeek = this.getFirstDateOfWeek();
        return firstDayOfWeek > 0 ? 7 - firstDayOfWeek : 0;
    }
    isSelected(dateMeta) {
        if (this.value) {
            if (this.isSingleSelection()) {
                return this.isDateEquals(this.value, dateMeta);
            }
            else if (this.isMultipleSelection()) {
                let selected = false;
                for (let date of this.value) {
                    selected = this.isDateEquals(date, dateMeta);
                    if (selected) {
                        break;
                    }
                }
                return selected;
            }
            else if (this.isRangeSelection()) {
                if (this.value[1])
                    return this.isDateEquals(this.value[0], dateMeta) || this.isDateEquals(this.value[1], dateMeta) || this.isDateBetween(this.value[0], this.value[1], dateMeta);
                else
                    return this.isDateEquals(this.value[0], dateMeta);
            }
        }
        else {
            return false;
        }
    }
    isComparable() {
        return this.value != null && typeof this.value !== 'string';
    }
    isMonthSelected(month) {
        if (this.isComparable() && !this.isMultipleSelection()) {
            const [start, end] = this.isRangeSelection() ? this.value : [this.value, this.value];
            const selected = new Date(this.currentYear, month, 1);
            return selected >= start && selected <= (end ?? start);
        }
        return false;
    }
    isMonthDisabled(month, year) {
        const yearToCheck = year ?? this.currentYear;
        for (let day = 1; day < this.getDaysCountInMonth(month, yearToCheck) + 1; day++) {
            if (this.isSelectable(day, month, yearToCheck, false)) {
                return false;
            }
        }
        return true;
    }
    isYearDisabled(year) {
        return Array(12)
            .fill(0)
            .every((v, month) => this.isMonthDisabled(month, year));
    }
    isYearSelected(year) {
        if (this.isComparable()) {
            let value = this.isRangeSelection() ? this.value[0] : this.value;
            return !this.isMultipleSelection() ? value.getFullYear() === year : false;
        }
        return false;
    }
    isDateEquals(value, dateMeta) {
        if (value && ObjectUtils.isDate(value))
            return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
        else
            return false;
    }
    isDateBetween(start, end, dateMeta) {
        let between = false;
        if (ObjectUtils.isDate(start) && ObjectUtils.isDate(end)) {
            let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
            return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
        }
        return between;
    }
    isSingleSelection() {
        return this.selectionMode === 'single';
    }
    isRangeSelection() {
        return this.selectionMode === 'range';
    }
    isMultipleSelection() {
        return this.selectionMode === 'multiple';
    }
    isToday(today, day, month, year) {
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    }
    isSelectable(day, month, year, otherMonth) {
        let validMin = true;
        let validMax = true;
        let validDate = true;
        let validDay = true;
        if (otherMonth && !this.selectOtherMonths) {
            return false;
        }
        if (this.minDate) {
            if (this.minDate.getFullYear() > year) {
                validMin = false;
            }
            else if (this.minDate.getFullYear() === year && this.currentView != 'year') {
                if (this.minDate.getMonth() > month) {
                    validMin = false;
                }
                else if (this.minDate.getMonth() === month) {
                    if (this.minDate.getDate() > day) {
                        validMin = false;
                    }
                }
            }
        }
        if (this.maxDate) {
            if (this.maxDate.getFullYear() < year) {
                validMax = false;
            }
            else if (this.maxDate.getFullYear() === year) {
                if (this.maxDate.getMonth() < month) {
                    validMax = false;
                }
                else if (this.maxDate.getMonth() === month) {
                    if (this.maxDate.getDate() < day) {
                        validMax = false;
                    }
                }
            }
        }
        if (this.disabledDates) {
            validDate = !this.isDateDisabled(day, month, year);
        }
        if (this.disabledDays) {
            validDay = !this.isDayDisabled(day, month, year);
        }
        return validMin && validMax && validDate && validDay;
    }
    isDateDisabled(day, month, year) {
        if (this.disabledDates) {
            for (let disabledDate of this.disabledDates) {
                if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
                    return true;
                }
            }
        }
        return false;
    }
    isDayDisabled(day, month, year) {
        if (this.disabledDays) {
            let weekday = new Date(year, month, day);
            let weekdayNumber = weekday.getDay();
            return this.disabledDays.indexOf(weekdayNumber) !== -1;
        }
        return false;
    }
    onInputFocus(event) {
        this.focus = true;
        if (this.showOnFocus) {
            this.showOverlay();
        }
        this.onFocus.emit(event);
    }
    onInputClick() {
        if (this.showOnFocus && !this.overlayVisible) {
            this.showOverlay();
        }
    }
    onInputBlur(event) {
        this.focus = false;
        this.onBlur.emit(event);
        if (!this.keepInvalid) {
            this.updateInputfield();
        }
        this.onModelTouched();
    }
    onButtonClick(event, inputfield = this.inputfieldViewChild?.nativeElement) {
        if (!this.overlayVisible) {
            inputfield.focus();
            this.showOverlay();
        }
        else {
            this.hideOverlay();
        }
    }
    clear() {
        this.inputFieldValue = null;
        this.value = null;
        this.onModelChange(this.value);
        this.onClear.emit();
    }
    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }
    getMonthName(index) {
        return this.config.getTranslation('monthNames')[index];
    }
    getYear(month) {
        return this.currentView === 'month' ? this.currentYear : month.year;
    }
    switchViewButtonDisabled() {
        return this.numberOfMonths > 1 || this.disabled;
    }
    onPrevButtonClick(event) {
        this.navigationState = { backward: true, button: true };
        this.navBackward(event);
    }
    onNextButtonClick(event) {
        this.navigationState = { backward: false, button: true };
        this.navForward(event);
    }
    onContainerButtonKeydown(event) {
        switch (event.which) {
            //tab
            case 9:
                if (!this.inline) {
                    this.trapFocus(event);
                }
                if (this.inline) {
                    const headerElements = DomHandler.findSingle(this.containerViewChild?.nativeElement, '.p-datepicker-header');
                    const element = event.target;
                    if (element == headerElements.children[headerElements.children.length - 1]) {
                        this.initFocusableCell();
                    }
                }
                break;
            //escape
            case 27:
                this.inputfieldViewChild?.nativeElement.focus();
                this.overlayVisible = false;
                event.preventDefault();
                break;
            default:
                //Noop
                break;
        }
    }
    onInputKeydown(event) {
        this.isKeydown = true;
        if (event.keyCode === 40 && this.contentViewChild) {
            this.trapFocus(event);
        }
        else if (event.keyCode === 27) {
            if (this.overlayVisible) {
                this.inputfieldViewChild?.nativeElement.focus();
                this.overlayVisible = false;
                event.preventDefault();
            }
        }
        else if (event.keyCode === 13) {
            if (this.overlayVisible) {
                this.overlayVisible = false;
                event.preventDefault();
            }
        }
        else if (event.keyCode === 9 && this.contentViewChild) {
            DomHandler.getFocusableElements(this.contentViewChild.nativeElement).forEach((el) => (el.tabIndex = '-1'));
            if (this.overlayVisible) {
                this.overlayVisible = false;
            }
        }
    }
    onDateCellKeydown(event, date, groupIndex) {
        const cellContent = event.currentTarget;
        const cell = cellContent.parentElement;
        switch (event.which) {
            //down arrow
            case 40: {
                cellContent.tabIndex = '-1';
                let cellIndex = DomHandler.index(cell);
                let nextRow = cell.parentElement.nextElementSibling;
                if (nextRow) {
                    let focusCell = nextRow.children[cellIndex].children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
                        this.navigationState = { backward: false };
                        this.navForward(event);
                    }
                    else {
                        nextRow.children[cellIndex].children[0].tabIndex = '0';
                        nextRow.children[cellIndex].children[0].focus();
                    }
                }
                else {
                    this.navigationState = { backward: false };
                    this.navForward(event);
                }
                event.preventDefault();
                break;
            }
            //up arrow
            case 38: {
                cellContent.tabIndex = '-1';
                let cellIndex = DomHandler.index(cell);
                let prevRow = cell.parentElement.previousElementSibling;
                if (prevRow) {
                    let focusCell = prevRow.children[cellIndex].children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
                        this.navigationState = { backward: true };
                        this.navBackward(event);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigationState = { backward: true };
                    this.navBackward(event);
                }
                event.preventDefault();
                break;
            }
            //left arrow
            case 37: {
                cellContent.tabIndex = '-1';
                let prevCell = cell.previousElementSibling;
                if (prevCell) {
                    let focusCell = prevCell.children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled') || DomHandler.hasClass(focusCell.parentElement, 'p-datepicker-weeknumber')) {
                        this.navigateToMonth(true, groupIndex);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigateToMonth(true, groupIndex);
                }
                event.preventDefault();
                break;
            }
            //right arrow
            case 39: {
                cellContent.tabIndex = '-1';
                let nextCell = cell.nextElementSibling;
                if (nextCell) {
                    let focusCell = nextCell.children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
                        this.navigateToMonth(false, groupIndex);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigateToMonth(false, groupIndex);
                }
                event.preventDefault();
                break;
            }
            //enter
            //space
            case 13:
            case 32: {
                this.onDateSelect(event, date);
                event.preventDefault();
                break;
            }
            //escape
            case 27: {
                this.inputfieldViewChild?.nativeElement.focus();
                this.overlayVisible = false;
                event.preventDefault();
                break;
            }
            //tab
            case 9: {
                if (!this.inline) {
                    this.trapFocus(event);
                }
                break;
            }
            default:
                //no op
                break;
        }
    }
    onMonthCellKeydown(event, index) {
        const cell = event.currentTarget;
        switch (event.which) {
            //arrows
            case 38:
            case 40: {
                cell.tabIndex = '-1';
                var cells = cell.parentElement.children;
                var cellIndex = DomHandler.index(cell);
                let nextCell = cells[event.which === 40 ? cellIndex + 3 : cellIndex - 3];
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                event.preventDefault();
                break;
            }
            //left arrow
            case 37: {
                cell.tabIndex = '-1';
                let prevCell = cell.previousElementSibling;
                if (prevCell) {
                    prevCell.tabIndex = '0';
                    prevCell.focus();
                }
                else {
                    this.navigationState = { backward: true };
                    this.navBackward(event);
                }
                event.preventDefault();
                break;
            }
            //right arrow
            case 39: {
                cell.tabIndex = '-1';
                let nextCell = cell.nextElementSibling;
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                else {
                    this.navigationState = { backward: false };
                    this.navForward(event);
                }
                event.preventDefault();
                break;
            }
            //enter
            //space
            case 13:
            case 32: {
                this.onMonthSelect(event, index);
                event.preventDefault();
                break;
            }
            //escape
            case 27: {
                this.inputfieldViewChild?.nativeElement.focus();
                this.overlayVisible = false;
                event.preventDefault();
                break;
            }
            //tab
            case 9: {
                if (!this.inline) {
                    this.trapFocus(event);
                }
                break;
            }
            default:
                //no op
                break;
        }
    }
    onYearCellKeydown(event, index) {
        const cell = event.currentTarget;
        switch (event.which) {
            //arrows
            case 38:
            case 40: {
                cell.tabIndex = '-1';
                var cells = cell.parentElement.children;
                var cellIndex = DomHandler.index(cell);
                let nextCell = cells[event.which === 40 ? cellIndex + 2 : cellIndex - 2];
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                event.preventDefault();
                break;
            }
            //left arrow
            case 37: {
                cell.tabIndex = '-1';
                let prevCell = cell.previousElementSibling;
                if (prevCell) {
                    prevCell.tabIndex = '0';
                    prevCell.focus();
                }
                else {
                    this.navigationState = { backward: true };
                    this.navBackward(event);
                }
                event.preventDefault();
                break;
            }
            //right arrow
            case 39: {
                cell.tabIndex = '-1';
                let nextCell = cell.nextElementSibling;
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                else {
                    this.navigationState = { backward: false };
                    this.navForward(event);
                }
                event.preventDefault();
                break;
            }
            //enter
            //space
            case 13:
            case 32: {
                this.onYearSelect(event, index);
                event.preventDefault();
                break;
            }
            //escape
            case 27: {
                this.inputfieldViewChild?.nativeElement.focus();
                this.overlayVisible = false;
                event.preventDefault();
                break;
            }
            //tab
            case 9: {
                this.trapFocus(event);
                break;
            }
            default:
                //no op
                break;
        }
    }
    navigateToMonth(prev, groupIndex) {
        if (prev) {
            if (this.numberOfMonths === 1 || groupIndex === 0) {
                this.navigationState = { backward: true };
                this.navBackward(event);
            }
            else {
                let prevMonthContainer = this.contentViewChild.nativeElement.children[groupIndex - 1];
                let cells = DomHandler.find(prevMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                let focusCell = cells[cells.length - 1];
                focusCell.tabIndex = '0';
                focusCell.focus();
            }
        }
        else {
            if (this.numberOfMonths === 1 || groupIndex === this.numberOfMonths - 1) {
                this.navigationState = { backward: false };
                this.navForward(event);
            }
            else {
                let nextMonthContainer = this.contentViewChild.nativeElement.children[groupIndex + 1];
                let focusCell = DomHandler.findSingle(nextMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                focusCell.tabIndex = '0';
                focusCell.focus();
            }
        }
    }
    updateFocus() {
        let cell;
        if (this.navigationState) {
            if (this.navigationState.button) {
                this.initFocusableCell();
                if (this.navigationState.backward)
                    DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-prev').focus();
                else
                    DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-next').focus();
            }
            else {
                if (this.navigationState.backward) {
                    let cells;
                    if (this.currentView === 'month') {
                        cells = DomHandler.find(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
                    }
                    else if (this.currentView === 'year') {
                        cells = DomHandler.find(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
                    }
                    else {
                        cells = DomHandler.find(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    }
                    if (cells && cells.length > 0) {
                        cell = cells[cells.length - 1];
                    }
                }
                else {
                    if (this.currentView === 'month') {
                        cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
                    }
                    else if (this.currentView === 'year') {
                        cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
                    }
                    else {
                        cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    }
                }
                if (cell) {
                    cell.tabIndex = '0';
                    cell.focus();
                }
            }
            this.navigationState = null;
        }
        else {
            this.initFocusableCell();
        }
    }
    initFocusableCell() {
        const contentEl = this.contentViewChild?.nativeElement;
        let cell;
        if (this.currentView === 'month') {
            let cells = DomHandler.find(contentEl, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
            let selectedCell = DomHandler.findSingle(contentEl, '.p-monthpicker .p-monthpicker-month.p-highlight');
            cells.forEach((cell) => (cell.tabIndex = -1));
            cell = selectedCell || cells[0];
            if (cells.length === 0) {
                let disabledCells = DomHandler.find(contentEl, '.p-monthpicker .p-monthpicker-month.p-disabled[tabindex = "0"]');
                disabledCells.forEach((cell) => (cell.tabIndex = -1));
            }
        }
        else if (this.currentView === 'year') {
            let cells = DomHandler.find(contentEl, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
            let selectedCell = DomHandler.findSingle(contentEl, '.p-yearpicker .p-yearpicker-year.p-highlight');
            cells.forEach((cell) => (cell.tabIndex = -1));
            cell = selectedCell || cells[0];
            if (cells.length === 0) {
                let disabledCells = DomHandler.find(contentEl, '.p-yearpicker .p-yearpicker-year.p-disabled[tabindex = "0"]');
                disabledCells.forEach((cell) => (cell.tabIndex = -1));
            }
        }
        else {
            cell = DomHandler.findSingle(contentEl, 'span.p-highlight');
            if (!cell) {
                let todayCell = DomHandler.findSingle(contentEl, 'td.p-datepicker-today span:not(.p-disabled):not(.p-ink)');
                if (todayCell)
                    cell = todayCell;
                else
                    cell = DomHandler.findSingle(contentEl, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
            }
        }
        if (cell) {
            cell.tabIndex = '0';
            if (!this.preventFocus && (!this.navigationState || !this.navigationState.button)) {
                setTimeout(() => {
                    if (!this.disabled) {
                        cell.focus();
                    }
                }, 1);
            }
            this.preventFocus = false;
        }
    }
    trapFocus(event) {
        let focusableElements = DomHandler.getFocusableElements(this.contentViewChild.nativeElement);
        if (focusableElements && focusableElements.length > 0) {
            if (!focusableElements[0].ownerDocument.activeElement) {
                focusableElements[0].focus();
            }
            else {
                let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);
                if (event.shiftKey) {
                    if (focusedIndex == -1 || focusedIndex === 0) {
                        if (this.focusTrap) {
                            focusableElements[focusableElements.length - 1].focus();
                        }
                        else {
                            if (focusedIndex === -1)
                                return this.hideOverlay();
                            else if (focusedIndex === 0)
                                return;
                        }
                    }
                    else {
                        focusableElements[focusedIndex - 1].focus();
                    }
                }
                else {
                    if (focusedIndex == -1) {
                        if (this.timeOnly) {
                            focusableElements[0].focus();
                        }
                        else {
                            let spanIndex = 0;
                            for (let i = 0; i < focusableElements.length; i++) {
                                if (focusableElements[i].tagName === 'SPAN')
                                    spanIndex = i;
                            }
                            focusableElements[spanIndex].focus();
                        }
                    }
                    else if (focusedIndex === focusableElements.length - 1) {
                        if (!this.focusTrap && focusedIndex != -1)
                            return this.hideOverlay();
                        focusableElements[0].focus();
                    }
                    else {
                        focusableElements[focusedIndex + 1].focus();
                    }
                }
            }
        }
        event.preventDefault();
    }
    onMonthDropdownChange(m) {
        this.currentMonth = parseInt(m);
        this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        this.createMonths(this.currentMonth, this.currentYear);
    }
    onYearDropdownChange(y) {
        this.currentYear = parseInt(y);
        this.onYearChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        this.createMonths(this.currentMonth, this.currentYear);
    }
    convertTo24Hour = function (hours, pm) {
        //@ts-ignore
        if (this.hourFormat == '12') {
            if (hours === 12) {
                return pm ? 12 : 0;
            }
            else {
                return pm ? hours + 12 : hours;
            }
        }
        return hours;
    };
    constrainTime(hour, minute, second, pm) {
        let returnTimeTriple = [hour, minute, second];
        let value = this.value;
        const convertedHour = this.convertTo24Hour(hour, pm);
        const isRange = this.isRangeSelection(), isMultiple = this.isMultipleSelection(), isMultiValue = isRange || isMultiple;
        if (isMultiValue) {
            if (!this.value) {
                this.value = [new Date(), new Date()];
            }
            if (isRange) {
                value = this.value[1] || this.value[0];
            }
            if (isMultiple) {
                value = this.value[this.value.length - 1];
            }
        }
        const valueDateString = value ? value.toDateString() : null;
        let isMinDate = this.minDate && valueDateString && this.minDate.toDateString() === valueDateString;
        let isMaxDate = this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString;
        switch (true // intentional fall through
        ) {
            case isMinDate && this.minDate.getHours() > convertedHour:
                returnTimeTriple[0] = this.minDate.getHours();
            case isMinDate && this.minDate.getHours() === convertedHour && this.minDate.getMinutes() > minute:
                returnTimeTriple[1] = this.minDate.getMinutes();
            case isMinDate && this.minDate.getHours() === convertedHour && this.minDate.getMinutes() === minute && this.minDate.getSeconds() > second:
                returnTimeTriple[2] = this.minDate.getSeconds();
                break;
            case isMaxDate && this.maxDate.getHours() < convertedHour:
                returnTimeTriple[0] = this.maxDate.getHours();
            case isMaxDate && this.maxDate.getHours() === convertedHour && this.maxDate.getMinutes() < minute:
                returnTimeTriple[1] = this.maxDate.getMinutes();
            case isMaxDate && this.maxDate.getHours() === convertedHour && this.maxDate.getMinutes() === minute && this.maxDate.getSeconds() < second:
                returnTimeTriple[2] = this.maxDate.getSeconds();
                break;
        }
        return returnTimeTriple;
    }
    incrementHour(event) {
        const prevHour = this.currentHour ?? 0;
        let newHour = (this.currentHour ?? 0) + this.stepHour;
        let newPM = this.pm;
        if (this.hourFormat == '24')
            newHour = newHour >= 24 ? newHour - 24 : newHour;
        else if (this.hourFormat == '12') {
            // Before the AM/PM break, now after
            if (prevHour < 12 && newHour > 11) {
                newPM = !this.pm;
            }
            newHour = newHour >= 13 ? newHour - 12 : newHour;
        }
        [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(newHour, this.currentMinute, this.currentSecond, newPM);
        this.pm = newPM;
        event.preventDefault();
    }
    onTimePickerElementMouseDown(event, type, direction) {
        if (!this.disabled) {
            this.repeat(event, null, type, direction);
            event.preventDefault();
        }
    }
    onTimePickerElementMouseUp(event) {
        if (!this.disabled) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    }
    onTimePickerElementMouseLeave() {
        if (!this.disabled && this.timePickerTimer) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    }
    repeat(event, interval, type, direction) {
        let i = interval || 500;
        this.clearTimePickerTimer();
        this.timePickerTimer = setTimeout(() => {
            this.repeat(event, 100, type, direction);
            this.cd.markForCheck();
        }, i);
        switch (type) {
            case 0:
                if (direction === 1)
                    this.incrementHour(event);
                else
                    this.decrementHour(event);
                break;
            case 1:
                if (direction === 1)
                    this.incrementMinute(event);
                else
                    this.decrementMinute(event);
                break;
            case 2:
                if (direction === 1)
                    this.incrementSecond(event);
                else
                    this.decrementSecond(event);
                break;
        }
        this.updateInputfield();
    }
    clearTimePickerTimer() {
        if (this.timePickerTimer) {
            clearTimeout(this.timePickerTimer);
            this.timePickerTimer = null;
        }
    }
    decrementHour(event) {
        let newHour = (this.currentHour ?? 0) - this.stepHour;
        let newPM = this.pm;
        if (this.hourFormat == '24')
            newHour = newHour < 0 ? 24 + newHour : newHour;
        else if (this.hourFormat == '12') {
            // If we were at noon/midnight, then switch
            if (this.currentHour === 12) {
                newPM = !this.pm;
            }
            newHour = newHour <= 0 ? 12 + newHour : newHour;
        }
        [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(newHour, this.currentMinute, this.currentSecond, newPM);
        this.pm = newPM;
        event.preventDefault();
    }
    incrementMinute(event) {
        let newMinute = (this.currentMinute ?? 0) + this.stepMinute;
        newMinute = newMinute > 59 ? newMinute - 60 : newMinute;
        [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(this.currentHour, newMinute, this.currentSecond, this.pm);
        event.preventDefault();
    }
    decrementMinute(event) {
        let newMinute = (this.currentMinute ?? 0) - this.stepMinute;
        newMinute = newMinute < 0 ? 60 + newMinute : newMinute;
        [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(this.currentHour, newMinute, this.currentSecond, this.pm);
        event.preventDefault();
    }
    incrementSecond(event) {
        let newSecond = this.currentSecond + this.stepSecond;
        newSecond = newSecond > 59 ? newSecond - 60 : newSecond;
        [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(this.currentHour, this.currentMinute, newSecond, this.pm);
        event.preventDefault();
    }
    decrementSecond(event) {
        let newSecond = this.currentSecond - this.stepSecond;
        newSecond = newSecond < 0 ? 60 + newSecond : newSecond;
        [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(this.currentHour, this.currentMinute, newSecond, this.pm);
        event.preventDefault();
    }
    updateTime() {
        let value = this.value;
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        value = value ? new Date(value.getTime()) : new Date();
        if (this.hourFormat == '12') {
            if (this.currentHour === 12)
                value.setHours(this.pm ? 12 : 0);
            else
                value.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
        }
        else {
            value.setHours(this.currentHour);
        }
        value.setMinutes(this.currentMinute);
        value.setSeconds(this.currentSecond);
        if (this.isRangeSelection()) {
            if (this.value[1])
                value = [this.value[0], value];
            else
                value = [value, null];
        }
        if (this.isMultipleSelection()) {
            value = [...this.value.slice(0, -1), value];
        }
        this.updateModel(value);
        this.onSelect.emit(value);
        this.updateInputfield();
    }
    toggleAMPM(event) {
        const newPM = !this.pm;
        [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(this.currentHour, this.currentMinute, this.currentSecond, newPM);
        this.pm = newPM;
        this.updateTime();
        event.preventDefault();
    }
    onUserInput(event) {
        // IE 11 Workaround for input placeholder : https://github.com/primefaces/primeng/issues/2026
        if (!this.isKeydown) {
            return;
        }
        this.isKeydown = false;
        let val = event.target.value;
        try {
            let value = this.parseValueFromString(val);
            if (this.isValidSelection(value)) {
                this.updateModel(value);
                this.updateUI();
            }
            else if (this.keepInvalid) {
                this.updateModel(value);
            }
        }
        catch (err) {
            //invalid date
            let value = this.keepInvalid ? val : null;
            this.updateModel(value);
        }
        this.filled = (val != null && val.length);
        this.onInput.emit(event);
    }
    isValidSelection(value) {
        if (this.isSingleSelection()) {
            return this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false);
        }
        let isValid = value.every((v) => this.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false));
        if (isValid && this.isRangeSelection()) {
            isValid = value.length === 1 || (value.length > 1 && value[1] >= value[0]);
        }
        return isValid;
    }
    parseValueFromString(text) {
        if (!text || text.trim().length === 0) {
            return null;
        }
        let value;
        if (this.isSingleSelection()) {
            value = this.parseDateTime(text);
        }
        else if (this.isMultipleSelection()) {
            let tokens = text.split(this.multipleSeparator);
            value = [];
            for (let token of tokens) {
                value.push(this.parseDateTime(token.trim()));
            }
        }
        else if (this.isRangeSelection()) {
            let tokens = text.split(' ' + this.rangeSeparator + ' ');
            value = [];
            for (let i = 0; i < tokens.length; i++) {
                value[i] = this.parseDateTime(tokens[i].trim());
            }
        }
        return value;
    }
    parseDateTime(text) {
        let date;
        let parts = text.split(' ');
        if (this.timeOnly) {
            date = new Date();
            this.populateTime(date, parts[0], parts[1]);
        }
        else {
            const dateFormat = this.getDateFormat();
            if (this.showTime) {
                let ampm = this.hourFormat == '12' ? parts.pop() : null;
                let timeString = parts.pop();
                date = this.parseDate(parts.join(' '), dateFormat);
                this.populateTime(date, timeString, ampm);
            }
            else {
                date = this.parseDate(text, dateFormat);
            }
        }
        return date;
    }
    populateTime(value, timeString, ampm) {
        if (this.hourFormat == '12' && !ampm) {
            throw 'Invalid Time';
        }
        this.pm = ampm === 'PM' || ampm === 'pm';
        let time = this.parseTime(timeString);
        value.setHours(time.hour);
        value.setMinutes(time.minute);
        value.setSeconds(time.second);
    }
    isValidDate(date) {
        return ObjectUtils.isDate(date) && ObjectUtils.isNotEmpty(date);
    }
    updateUI() {
        let propValue = this.value;
        if (Array.isArray(propValue)) {
            propValue = propValue.length === 2 ? propValue[1] : propValue[0];
        }
        let val = this.defaultDate && this.isValidDate(this.defaultDate) && !this.value ? this.defaultDate : propValue && this.isValidDate(propValue) ? propValue : new Date();
        this.currentMonth = val.getMonth();
        this.currentYear = val.getFullYear();
        this.createMonths(this.currentMonth, this.currentYear);
        if (this.showTime || this.timeOnly) {
            this.setCurrentHourPM(val.getHours());
            this.currentMinute = val.getMinutes();
            this.currentSecond = val.getSeconds();
        }
    }
    showOverlay() {
        if (!this.overlayVisible) {
            this.updateUI();
            if (!this.touchUI) {
                this.preventFocus = true;
            }
            this.overlayVisible = true;
        }
    }
    hideOverlay() {
        this.inputfieldViewChild?.nativeElement.focus();
        this.overlayVisible = false;
        this.clearTimePickerTimer();
        if (this.touchUI) {
            this.disableModality();
        }
        this.cd.markForCheck();
    }
    toggle() {
        if (!this.inline) {
            if (!this.overlayVisible) {
                this.showOverlay();
                this.inputfieldViewChild?.nativeElement.focus();
            }
            else {
                this.hideOverlay();
            }
        }
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
            case 'visibleTouchUI':
                if (!this.inline) {
                    this.overlay = event.element;
                    this.overlay?.setAttribute(this.attributeSelector, '');
                    this.appendOverlay();
                    this.updateFocus();
                    if (this.autoZIndex) {
                        if (this.touchUI)
                            ZIndexUtils.set('modal', this.overlay, this.baseZIndex || this.config.zIndex.modal);
                        else
                            ZIndexUtils.set('overlay', this.overlay, this.baseZIndex || this.config.zIndex.overlay);
                    }
                    this.alignOverlay();
                    this.onShow.emit(event);
                }
                break;
            case 'void':
                this.onOverlayHide();
                this.onClose.emit(event);
                break;
        }
    }
    onOverlayAnimationDone(event) {
        switch (event.toState) {
            case 'visible':
            case 'visibleTouchUI':
                if (!this.inline) {
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                    this.bindScrollListener();
                }
                break;
            case 'void':
                if (this.autoZIndex) {
                    ZIndexUtils.clear(event.element);
                }
                break;
        }
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                this.document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
        }
    }
    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
    alignOverlay() {
        if (this.touchUI) {
            this.enableModality(this.overlay);
        }
        else if (this.overlay) {
            if (this.appendTo) {
                if (this.view === 'date') {
                    this.overlay.style.width = DomHandler.getOuterWidth(this.overlay) + 'px';
                    this.overlay.style.minWidth = DomHandler.getOuterWidth(this.inputfieldViewChild?.nativeElement) + 'px';
                }
                else {
                    this.overlay.style.width = DomHandler.getOuterWidth(this.inputfieldViewChild?.nativeElement) + 'px';
                }
                DomHandler.absolutePosition(this.overlay, this.inputfieldViewChild?.nativeElement);
            }
            else {
                DomHandler.relativePosition(this.overlay, this.inputfieldViewChild?.nativeElement);
            }
        }
    }
    enableModality(element) {
        if (!this.mask && this.touchUI) {
            this.mask = this.renderer.createElement('div');
            this.renderer.setStyle(this.mask, 'zIndex', String(parseInt(element.style.zIndex) - 1));
            let maskStyleClass = 'p-component-overlay p-datepicker-mask p-datepicker-mask-scrollblocker p-component-overlay p-component-overlay-enter';
            DomHandler.addMultipleClasses(this.mask, maskStyleClass);
            this.maskClickListener = this.renderer.listen(this.mask, 'click', (event) => {
                this.disableModality();
                this.overlayVisible = false;
            });
            this.renderer.appendChild(this.document.body, this.mask);
            DomHandler.blockBodyScroll();
        }
    }
    disableModality() {
        if (this.mask) {
            DomHandler.addClass(this.mask, 'p-component-overlay-leave');
            if (!this.animationEndListener) {
                this.animationEndListener = this.renderer.listen(this.mask, 'animationend', this.destroyMask.bind(this));
            }
        }
    }
    destroyMask() {
        if (!this.mask) {
            return;
        }
        this.renderer.removeChild(this.document.body, this.mask);
        let bodyChildren = this.document.body.children;
        let hasBlockerMasks;
        for (let i = 0; i < bodyChildren.length; i++) {
            let bodyChild = bodyChildren[i];
            if (DomHandler.hasClass(bodyChild, 'p-datepicker-mask-scrollblocker')) {
                hasBlockerMasks = true;
                break;
            }
        }
        if (!hasBlockerMasks) {
            DomHandler.unblockBodyScroll();
        }
        this.unbindAnimationEndListener();
        this.unbindMaskClickListener();
        this.mask = null;
    }
    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }
    unbindAnimationEndListener() {
        if (this.animationEndListener && this.mask) {
            this.animationEndListener();
            this.animationEndListener = null;
        }
    }
    writeValue(value) {
        this.value = value;
        if (this.value && typeof this.value === 'string') {
            try {
                this.value = this.parseValueFromString(this.value);
            }
            catch {
                if (this.keepInvalid) {
                    this.value = value;
                }
            }
        }
        this.updateInputfield();
        this.updateUI();
        this.cd.markForCheck();
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
    getDateFormat() {
        return this.dateFormat || this.getTranslation('dateFormat');
    }
    getFirstDateOfWeek() {
        return this._firstDayOfWeek || this.getTranslation(TranslationKeys.FIRST_DAY_OF_WEEK);
    }
    // Ported from jquery-ui datepicker formatDate
    formatDate(date, format) {
        if (!date) {
            return '';
        }
        let iFormat;
        const lookAhead = (match) => {
            const matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
            if (matches) {
                iFormat++;
            }
            return matches;
        }, formatNumber = (match, value, len) => {
            let num = '' + value;
            if (lookAhead(match)) {
                while (num.length < len) {
                    num = '0' + num;
                }
            }
            return num;
        }, formatName = (match, value, shortNames, longNames) => {
            return lookAhead(match) ? longNames[value] : shortNames[value];
        };
        let output = '';
        let literal = false;
        if (date) {
            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                        literal = false;
                    }
                    else {
                        output += format.charAt(iFormat);
                    }
                }
                else {
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            output += formatNumber('d', date.getDate(), 2);
                            break;
                        case 'D':
                            output += formatName('D', date.getDay(), this.getTranslation(TranslationKeys.DAY_NAMES_SHORT), this.getTranslation(TranslationKeys.DAY_NAMES));
                            break;
                        case 'o':
                            output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case 'm':
                            output += formatNumber('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += formatName('M', date.getMonth(), this.getTranslation(TranslationKeys.MONTH_NAMES_SHORT), this.getTranslation(TranslationKeys.MONTH_NAMES));
                            break;
                        case 'y':
                            output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + (date.getFullYear() % 100);
                            break;
                        case '@':
                            output += date.getTime();
                            break;
                        case '!':
                            output += date.getTime() * 10000 + this.ticksTo1970;
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                output += "'";
                            }
                            else {
                                literal = true;
                            }
                            break;
                        default:
                            output += format.charAt(iFormat);
                    }
                }
            }
        }
        return output;
    }
    formatTime(date) {
        if (!date) {
            return '';
        }
        let output = '';
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        if (this.hourFormat == '12' && hours > 11 && hours != 12) {
            hours -= 12;
        }
        if (this.hourFormat == '12') {
            output += hours === 0 ? 12 : hours < 10 ? '0' + hours : hours;
        }
        else {
            output += hours < 10 ? '0' + hours : hours;
        }
        output += ':';
        output += minutes < 10 ? '0' + minutes : minutes;
        if (this.showSeconds) {
            output += ':';
            output += seconds < 10 ? '0' + seconds : seconds;
        }
        if (this.hourFormat == '12') {
            output += date.getHours() > 11 ? ' PM' : ' AM';
        }
        return output;
    }
    parseTime(value) {
        let tokens = value.split(':');
        let validTokenLength = this.showSeconds ? 3 : 2;
        if (tokens.length !== validTokenLength) {
            throw 'Invalid time';
        }
        let h = parseInt(tokens[0]);
        let m = parseInt(tokens[1]);
        let s = this.showSeconds ? parseInt(tokens[2]) : null;
        if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12) || (this.showSeconds && (isNaN(s) || s > 59))) {
            throw 'Invalid time';
        }
        else {
            if (this.hourFormat == '12') {
                if (h !== 12 && this.pm) {
                    h += 12;
                }
                else if (!this.pm && h === 12) {
                    h -= 12;
                }
            }
            return { hour: h, minute: m, second: s };
        }
    }
    // Ported from jquery-ui datepicker parseDate
    parseDate(value, format) {
        if (format == null || value == null) {
            throw 'Invalid arguments';
        }
        value = typeof value === 'object' ? value.toString() : value + '';
        if (value === '') {
            return null;
        }
        let iFormat, dim, extra, iValue = 0, shortYearCutoff = typeof this.shortYearCutoff !== 'string' ? this.shortYearCutoff : (new Date().getFullYear() % 100) + parseInt(this.shortYearCutoff, 10), year = -1, month = -1, day = -1, doy = -1, literal = false, date, lookAhead = (match) => {
            let matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
            if (matches) {
                iFormat++;
            }
            return matches;
        }, getNumber = (match) => {
            let isDoubled = lookAhead(match), size = match === '@' ? 14 : match === '!' ? 20 : match === 'y' && isDoubled ? 4 : match === 'o' ? 3 : 2, minSize = match === 'y' ? size : 1, digits = new RegExp('^\\d{' + minSize + ',' + size + '}'), num = value.substring(iValue).match(digits);
            if (!num) {
                throw 'Missing number at position ' + iValue;
            }
            iValue += num[0].length;
            return parseInt(num[0], 10);
        }, getName = (match, shortNames, longNames) => {
            let index = -1;
            let arr = lookAhead(match) ? longNames : shortNames;
            let names = [];
            for (let i = 0; i < arr.length; i++) {
                names.push([i, arr[i]]);
            }
            names.sort((a, b) => {
                return -(a[1].length - b[1].length);
            });
            for (let i = 0; i < names.length; i++) {
                let name = names[i][1];
                if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
                    index = names[i][0];
                    iValue += name.length;
                    break;
                }
            }
            if (index !== -1) {
                return index + 1;
            }
            else {
                throw 'Unknown name at position ' + iValue;
            }
        }, checkLiteral = () => {
            if (value.charAt(iValue) !== format.charAt(iFormat)) {
                throw 'Unexpected literal at position ' + iValue;
            }
            iValue++;
        };
        if (this.view === 'month') {
            day = 1;
        }
        for (iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                    literal = false;
                }
                else {
                    checkLiteral();
                }
            }
            else {
                switch (format.charAt(iFormat)) {
                    case 'd':
                        day = getNumber('d');
                        break;
                    case 'D':
                        getName('D', this.getTranslation(TranslationKeys.DAY_NAMES_SHORT), this.getTranslation(TranslationKeys.DAY_NAMES));
                        break;
                    case 'o':
                        doy = getNumber('o');
                        break;
                    case 'm':
                        month = getNumber('m');
                        break;
                    case 'M':
                        month = getName('M', this.getTranslation(TranslationKeys.MONTH_NAMES_SHORT), this.getTranslation(TranslationKeys.MONTH_NAMES));
                        break;
                    case 'y':
                        year = getNumber('y');
                        break;
                    case '@':
                        date = new Date(getNumber('@'));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case '!':
                        date = new Date((getNumber('!') - this.ticksTo1970) / 10000);
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if (lookAhead("'")) {
                            checkLiteral();
                        }
                        else {
                            literal = true;
                        }
                        break;
                    default:
                        checkLiteral();
                }
            }
        }
        if (iValue < value.length) {
            extra = value.substr(iValue);
            if (!/^\s+/.test(extra)) {
                throw 'Extra/unparsed characters found in date: ' + extra;
            }
        }
        if (year === -1) {
            year = new Date().getFullYear();
        }
        else if (year < 100) {
            year += new Date().getFullYear() - (new Date().getFullYear() % 100) + (year <= shortYearCutoff ? 0 : -100);
        }
        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                dim = this.getDaysCountInMonth(year, month - 1);
                if (day <= dim) {
                    break;
                }
                month++;
                day -= dim;
            } while (true);
        }
        if (this.view === 'year') {
            month = month === -1 ? 1 : month;
            day = day === -1 ? 1 : day;
        }
        date = this.daylightSavingAdjust(new Date(year, month - 1, day));
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            throw 'Invalid date'; // E.g. 31/02/00
        }
        return date;
    }
    daylightSavingAdjust(date) {
        if (!date) {
            return null;
        }
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date;
    }
    updateFilledState() {
        this.filled = (this.inputFieldValue && this.inputFieldValue != '');
    }
    onTodayButtonClick(event) {
        const date = new Date();
        const dateMeta = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear, today: true, selectable: true };
        this.createMonths(date.getMonth(), date.getFullYear());
        this.onDateSelect(event, dateMeta);
        this.onTodayClick.emit(date);
    }
    onClearButtonClick(event) {
        this.updateModel(null);
        this.updateInputfield();
        this.hideOverlay();
        this.onClearClick.emit(event);
    }
    createResponsiveStyle() {
        if (this.numberOfMonths > 1 && this.responsiveOptions) {
            if (!this.responsiveStyleElement) {
                this.responsiveStyleElement = this.renderer.createElement('style');
                this.responsiveStyleElement.type = 'text/css';
                this.renderer.appendChild(this.document.body, this.responsiveStyleElement);
            }
            let innerHTML = '';
            if (this.responsiveOptions) {
                let responsiveOptions = [...this.responsiveOptions].filter((o) => !!(o.breakpoint && o.numMonths)).sort((o1, o2) => -1 * o1.breakpoint.localeCompare(o2.breakpoint, undefined, { numeric: true }));
                for (let i = 0; i < responsiveOptions.length; i++) {
                    let { breakpoint, numMonths } = responsiveOptions[i];
                    let styles = `
                        .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${numMonths}) .p-datepicker-next {
                            display: inline-flex !important;
                        }
                    `;
                    for (let j = numMonths; j < this.numberOfMonths; j++) {
                        styles += `
                            .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${j + 1}) {
                                display: none !important;
                            }
                        `;
                    }
                    innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            ${styles}
                        }
                    `;
                }
            }
            this.responsiveStyleElement.innerHTML = innerHTML;
        }
    }
    destroyResponsiveStyleElement() {
        if (this.responsiveStyleElement) {
            this.responsiveStyleElement.remove();
            this.responsiveStyleElement = null;
        }
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.zone.runOutsideAngular(() => {
                const documentTarget = this.el ? this.el.nativeElement.ownerDocument : this.document;
                this.documentClickListener = this.renderer.listen(documentTarget, 'mousedown', (event) => {
                    if (this.isOutsideClicked(event) && this.overlayVisible) {
                        this.zone.run(() => {
                            this.hideOverlay();
                            this.onClickOutside.emit(event);
                            this.cd.markForCheck();
                        });
                    }
                });
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    bindDocumentResizeListener() {
        if (!this.documentResizeListener && !this.touchUI) {
            this.documentResizeListener = this.renderer.listen(this.window, 'resize', this.onWindowResize.bind(this));
        }
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.containerViewChild?.nativeElement, () => {
                if (this.overlayVisible) {
                    this.hideOverlay();
                }
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    isOutsideClicked(event) {
        return !(this.el.nativeElement.isSameNode(event.target) || this.isNavIconClicked(event) || this.el.nativeElement.contains(event.target) || (this.overlay && this.overlay.contains(event.target)));
    }
    isNavIconClicked(event) {
        return (DomHandler.hasClass(event.target, 'p-datepicker-prev') || DomHandler.hasClass(event.target, 'p-datepicker-prev-icon') || DomHandler.hasClass(event.target, 'p-datepicker-next') || DomHandler.hasClass(event.target, 'p-datepicker-next-icon'));
    }
    onWindowResize() {
        if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.hideOverlay();
        }
    }
    onOverlayHide() {
        this.currentView = this.view;
        if (this.mask) {
            this.destroyMask();
        }
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.overlay = null;
    }
    ngOnDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
        if (this.overlay && this.autoZIndex) {
            ZIndexUtils.clear(this.overlay);
        }
        this.destroyResponsiveStyleElement();
        this.clearTimePickerTimer();
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Calendar, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i1.PrimeNGConfig }, { token: i1.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: Calendar, selector: "p-calendar", inputs: { iconDisplay: "iconDisplay", style: "style", styleClass: "styleClass", inputStyle: "inputStyle", inputId: "inputId", name: "name", inputStyleClass: "inputStyleClass", placeholder: "placeholder", ariaLabelledBy: "ariaLabelledBy", ariaLabel: "ariaLabel", iconAriaLabel: "iconAriaLabel", disabled: ["disabled", "disabled", booleanAttribute], dateFormat: "dateFormat", multipleSeparator: "multipleSeparator", rangeSeparator: "rangeSeparator", inline: ["inline", "inline", booleanAttribute], showOtherMonths: ["showOtherMonths", "showOtherMonths", booleanAttribute], selectOtherMonths: ["selectOtherMonths", "selectOtherMonths", booleanAttribute], showIcon: ["showIcon", "showIcon", booleanAttribute], icon: "icon", appendTo: "appendTo", readonlyInput: ["readonlyInput", "readonlyInput", booleanAttribute], shortYearCutoff: "shortYearCutoff", monthNavigator: ["monthNavigator", "monthNavigator", booleanAttribute], yearNavigator: ["yearNavigator", "yearNavigator", booleanAttribute], hourFormat: "hourFormat", timeOnly: ["timeOnly", "timeOnly", booleanAttribute], stepHour: ["stepHour", "stepHour", numberAttribute], stepMinute: ["stepMinute", "stepMinute", numberAttribute], stepSecond: ["stepSecond", "stepSecond", numberAttribute], showSeconds: ["showSeconds", "showSeconds", booleanAttribute], required: ["required", "required", booleanAttribute], showOnFocus: ["showOnFocus", "showOnFocus", booleanAttribute], showWeek: ["showWeek", "showWeek", booleanAttribute], startWeekFromFirstDayOfYear: "startWeekFromFirstDayOfYear", showClear: ["showClear", "showClear", booleanAttribute], dataType: "dataType", selectionMode: "selectionMode", maxDateCount: ["maxDateCount", "maxDateCount", numberAttribute], showButtonBar: ["showButtonBar", "showButtonBar", booleanAttribute], todayButtonStyleClass: "todayButtonStyleClass", clearButtonStyleClass: "clearButtonStyleClass", autofocus: ["autofocus", "autofocus", booleanAttribute], autoZIndex: ["autoZIndex", "autoZIndex", booleanAttribute], baseZIndex: ["baseZIndex", "baseZIndex", numberAttribute], panelStyleClass: "panelStyleClass", panelStyle: "panelStyle", keepInvalid: ["keepInvalid", "keepInvalid", booleanAttribute], hideOnDateTimeSelect: ["hideOnDateTimeSelect", "hideOnDateTimeSelect", booleanAttribute], touchUI: ["touchUI", "touchUI", booleanAttribute], timeSeparator: "timeSeparator", focusTrap: ["focusTrap", "focusTrap", booleanAttribute], showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", tabindex: ["tabindex", "tabindex", numberAttribute], minDate: "minDate", maxDate: "maxDate", disabledDates: "disabledDates", disabledDays: "disabledDays", yearRange: "yearRange", showTime: "showTime", responsiveOptions: "responsiveOptions", numberOfMonths: "numberOfMonths", firstDayOfWeek: "firstDayOfWeek", locale: "locale", view: "view", defaultDate: "defaultDate" }, outputs: { onFocus: "onFocus", onBlur: "onBlur", onClose: "onClose", onSelect: "onSelect", onClear: "onClear", onInput: "onInput", onTodayClick: "onTodayClick", onClearClick: "onClearClick", onMonthChange: "onMonthChange", onYearChange: "onYearChange", onClickOutside: "onClickOutside", onShow: "onShow" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "focus", "class.p-calendar-clearable": "showClear && !disabled" }, classAttribute: "p-element p-inputwrapper" }, providers: [CALENDAR_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "inputfieldViewChild", first: true, predicate: ["inputfield"], descendants: true }, { propertyName: "content", first: true, predicate: ["contentWrapper"], descendants: true }], ngImport: i0, template: `
        <span
            #container
            [ngClass]="{
                'p-calendar': true,
                'p-input-icon-right': showIcon && iconDisplay === 'input',
                'p-calendar-w-btn': showIcon && iconDisplay === 'button',
                'p-calendar-timeonly': timeOnly,
                'p-calendar-disabled': disabled,
                'p-focus': focus || overlayVisible
            }"
            [ngStyle]="style"
            [class]="styleClass"
        >
            <ng-template [ngIf]="!inline">
                <input
                    #inputfield
                    type="text"
                    role="combobox"
                    [attr.id]="inputId"
                    [attr.name]="name"
                    [attr.required]="required"
                    [attr.aria-required]="required"
                    aria-autocomplete="none"
                    aria-haspopup="dialog"
                    [attr.aria-expanded]="overlayVisible ?? false"
                    [attr.aria-controls]="overlayVisible ? panelId : null"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel"
                    [value]="inputFieldValue"
                    (focus)="onInputFocus($event)"
                    (keydown)="onInputKeydown($event)"
                    (click)="onInputClick()"
                    (blur)="onInputBlur($event)"
                    [readonly]="readonlyInput"
                    (input)="onUserInput($event)"
                    [ngStyle]="inputStyle"
                    [class]="inputStyleClass"
                    [placeholder]="placeholder || ''"
                    [disabled]="disabled"
                    [attr.tabindex]="tabindex"
                    [attr.inputmode]="touchUI ? 'off' : null"
                    [ngClass]="'p-inputtext p-component'"
                    autocomplete="off"
                    pAutoFocus
                    [autofocus]="autofocus"
                />
                <ng-container *ngIf="showClear && !disabled && value != null">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-calendar-clear-icon'" (click)="clear()" />
                    <span *ngIf="clearIconTemplate" class="p-calendar-clear-icon" (click)="clear()">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </ng-container>
                <button
                    type="button"
                    [attr.aria-label]="iconButtonAriaLabel"
                    aria-haspopup="dialog"
                    [attr.aria-expanded]="overlayVisible ?? false"
                    [attr.aria-controls]="overlayVisible ? panelId : null"
                    pButton
                    pRipple
                    *ngIf="showIcon && iconDisplay === 'button'"
                    (click)="onButtonClick($event, inputfield)"
                    class="p-datepicker-trigger p-button-icon-only"
                    [disabled]="disabled"
                    tabindex="0"
                >
                    <span *ngIf="icon" [ngClass]="icon"></span>
                    <ng-container *ngIf="!icon">
                        <CalendarIcon *ngIf="!triggerIconTemplate" />
                        <ng-template *ngTemplateOutlet="triggerIconTemplate"></ng-template>
                    </ng-container>
                </button>
                <ng-container *ngIf="iconDisplay === 'input' && showIcon">
                    <CalendarIcon
                        (click)="onButtonClick($event)"
                        *ngIf="!inputIconTemplate"
                        [ngClass]="{
                            'p-datepicker-icon': showOnFocus
                        }"
                    />
                    <ng-container *ngTemplateOutlet="inputIconTemplate; context: { clickCallBack: onButtonClick.bind(this) }"></ng-container>
                </ng-container>
            </ng-template>
            <div
                #contentWrapper
                [attr.id]="panelId"
                [class]="panelStyleClass"
                [ngStyle]="panelStyle"
                [ngClass]="{
                    'p-datepicker p-component': true,
                    'p-datepicker-inline': inline,
                    'p-disabled': disabled,
                    'p-datepicker-timeonly': timeOnly,
                    'p-datepicker-multiple-month': this.numberOfMonths > 1,
                    'p-datepicker-monthpicker': view === 'month',
                    'p-datepicker-touch-ui': touchUI
                }"
                [@overlayAnimation]="
                    touchUI
                        ? { value: 'visibleTouchUI', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }
                        : { value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }
                "
                [attr.aria-label]="getTranslation('chooseDate')"
                [attr.role]="inline ? null : 'dialog'"
                [attr.aria-modal]="inline ? null : 'true'"
                [@.disabled]="inline === true"
                (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                (@overlayAnimation.done)="onOverlayAnimationDone($event)"
                (click)="onOverlayClick($event)"
                *ngIf="inline || overlayVisible"
            >
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <ng-container *ngIf="!timeOnly">
                    <div class="p-datepicker-group-container">
                        <div class="p-datepicker-group" *ngFor="let month of months; let i = index">
                            <div class="p-datepicker-header">
                                <button (keydown)="onContainerButtonKeydown($event)" class="p-datepicker-prev p-link" (click)="onPrevButtonClick($event)" *ngIf="i === 0" type="button" [attr.aria-label]="prevIconAriaLabel" pRipple>
                                    <ChevronLeftIcon [styleClass]="'p-datepicker-prev-icon'" *ngIf="!previousIconTemplate" />
                                    <span *ngIf="previousIconTemplate" class="p-datepicker-prev-icon">
                                        <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                                    </span>
                                </button>
                                <div class="p-datepicker-title">
                                    <button
                                        type="button"
                                        (click)="switchToMonthView($event)"
                                        (keydown)="onContainerButtonKeydown($event)"
                                        *ngIf="currentView === 'date'"
                                        class="p-datepicker-month p-link"
                                        [disabled]="switchViewButtonDisabled()"
                                        [attr.aria-label]="this.getTranslation('chooseMonth')"
                                    >
                                        {{ getMonthName(month.month) }}
                                    </button>
                                    <button
                                        type="button"
                                        (click)="switchToYearView($event)"
                                        (keydown)="onContainerButtonKeydown($event)"
                                        *ngIf="currentView !== 'year'"
                                        class="p-datepicker-year p-link"
                                        [disabled]="switchViewButtonDisabled()"
                                        [attr.aria-label]="getTranslation('chooseYear')"
                                    >
                                        {{ getYear(month) }}
                                    </button>
                                    <span class="p-datepicker-decade" *ngIf="currentView === 'year'">
                                        <ng-container *ngIf="!decadeTemplate">{{ yearPickerValues()[0] }} - {{ yearPickerValues()[yearPickerValues().length - 1] }}</ng-container>
                                        <ng-container *ngTemplateOutlet="decadeTemplate; context: { $implicit: yearPickerValues }"></ng-container>
                                    </span>
                                </div>
                                <button
                                    (keydown)="onContainerButtonKeydown($event)"
                                    class="p-datepicker-next p-link"
                                    (click)="onNextButtonClick($event)"
                                    [style.display]="numberOfMonths === 1 ? 'inline-flex' : i === numberOfMonths - 1 ? 'inline-flex' : 'none'"
                                    type="button"
                                    [attr.aria-label]="nextIconAriaLabel"
                                    pRipple
                                >
                                    <ChevronRightIcon [styleClass]="'p-datepicker-next-icon'" *ngIf="!nextIconTemplate" />
                                    <span *ngIf="nextIconTemplate" class="p-datepicker-next-icon">
                                        <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                                    </span>
                                </button>
                            </div>
                            <div class="p-datepicker-calendar-container" *ngIf="currentView === 'date'">
                                <table class="p-datepicker-calendar" role="grid">
                                    <thead>
                                        <tr>
                                            <th *ngIf="showWeek" class="p-datepicker-weekheader p-disabled">
                                                <span>{{ getTranslation('weekHeader') }}</span>
                                            </th>
                                            <th scope="col" *ngFor="let weekDay of weekDays; let begin = first; let end = last">
                                                <span>{{ weekDay }}</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr *ngFor="let week of month.dates; let j = index">
                                            <td *ngIf="showWeek" class="p-datepicker-weeknumber">
                                                <span class="p-disabled">
                                                    {{ month.weekNumbers[j] }}
                                                </span>
                                            </td>
                                            <td *ngFor="let date of week" [attr.aria-label]="date.day" [ngClass]="{ 'p-datepicker-other-month': date.otherMonth, 'p-datepicker-today': date.today }">
                                                <ng-container *ngIf="date.otherMonth ? showOtherMonths : true">
                                                    <span
                                                        [ngClass]="{ 'p-highlight': isSelected(date) && date.selectable, 'p-disabled': !date.selectable }"
                                                        (click)="onDateSelect($event, date)"
                                                        draggable="false"
                                                        (keydown)="onDateCellKeydown($event, date, i)"
                                                        pRipple
                                                    >
                                                        <ng-container *ngIf="!dateTemplate && (date.selectable || !disabledDateTemplate)">{{ date.day }}</ng-container>
                                                        <ng-container *ngIf="date.selectable || !disabledDateTemplate">
                                                            <ng-container *ngTemplateOutlet="dateTemplate; context: { $implicit: date }"></ng-container>
                                                        </ng-container>
                                                        <ng-container *ngIf="!date.selectable">
                                                            <ng-container *ngTemplateOutlet="disabledDateTemplate; context: { $implicit: date }"></ng-container>
                                                        </ng-container>
                                                    </span>
                                                    <div *ngIf="isSelected(date)" class="p-hidden-accessible" aria-live="polite">
                                                        {{ date.day }}
                                                    </div>
                                                </ng-container>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="p-monthpicker" *ngIf="currentView === 'month'">
                        <span
                            *ngFor="let m of monthPickerValues(); let i = index"
                            (click)="onMonthSelect($event, i)"
                            (keydown)="onMonthCellKeydown($event, i)"
                            class="p-monthpicker-month"
                            [ngClass]="{ 'p-highlight': isMonthSelected(i), 'p-disabled': isMonthDisabled(i) }"
                            pRipple
                        >
                            {{ m }}
                            <div *ngIf="isMonthSelected(i)" class="p-hidden-accessible" aria-live="polite">
                                {{ m }}
                            </div>
                        </span>
                    </div>
                    <div class="p-yearpicker" *ngIf="currentView === 'year'">
                        <span
                            *ngFor="let y of yearPickerValues()"
                            (click)="onYearSelect($event, y)"
                            (keydown)="onYearCellKeydown($event, y)"
                            class="p-yearpicker-year"
                            [ngClass]="{ 'p-highlight': isYearSelected(y), 'p-disabled': isYearDisabled(y) }"
                            pRipple
                        >
                            {{ y }}
                            <div *ngIf="isYearSelected(y)" class="p-hidden-accessible" aria-live="polite">
                                {{ y }}
                            </div>
                        </span>
                    </div>
                </ng-container>
                <div class="p-timepicker" *ngIf="(showTime || timeOnly) && currentView === 'date'">
                    <div class="p-hour-picker">
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementHour($event)"
                            (keydown.space)="incrementHour($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 0, 1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('nextHour')"
                            pRipple
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span><ng-container *ngIf="currentHour < 10">0</ng-container>{{ currentHour }}</span>
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementHour($event)"
                            (keydown.space)="decrementHour($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 0, -1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('prevHour')"
                            pRipple
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-separator">
                        <span>{{ timeSeparator }}</span>
                    </div>
                    <div class="p-minute-picker">
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementMinute($event)"
                            (keydown.space)="incrementMinute($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 1, 1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('nextMinute')"
                            pRipple
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span><ng-container *ngIf="currentMinute < 10">0</ng-container>{{ currentMinute }}</span>
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementMinute($event)"
                            (keydown.space)="decrementMinute($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 1, -1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('prevMinute')"
                            pRipple
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-separator" *ngIf="showSeconds">
                        <span>{{ timeSeparator }}</span>
                    </div>
                    <div class="p-second-picker" *ngIf="showSeconds">
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementSecond($event)"
                            (keydown.space)="incrementSecond($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 2, 1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('nextSecond')"
                            pRipple
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span><ng-container *ngIf="currentSecond < 10">0</ng-container>{{ currentSecond }}</span>
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementSecond($event)"
                            (keydown.space)="decrementSecond($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 2, -1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('prevSecond')"
                            pRipple
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-ampm-picker" *ngIf="hourFormat == '12'">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" [attr.aria-label]="getTranslation('am')" pRipple>
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span>{{ pm ? 'PM' : 'AM' }}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" [attr.aria-label]="getTranslation('pm')" pRipple>
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                </div>
                <div class="p-datepicker-buttonbar" *ngIf="showButtonBar">
                    <button type="button" [label]="getTranslation('today')" (keydown)="onContainerButtonKeydown($event)" (click)="onTodayButtonClick($event)" pButton pRipple [ngClass]="[todayButtonStyleClass]"></button>
                    <button type="button" [label]="getTranslation('clear')" (keydown)="onContainerButtonKeydown($event)" (click)="onClearButtonClick($event)" pButton pRipple [ngClass]="[clearButtonStyleClass]"></button>
                </div>
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </span>
    `, isInline: true, styles: ["@layer primeng{.p-calendar{position:relative;display:inline-flex;max-width:100%}.p-calendar .p-inputtext{flex:1 1 auto;width:1%;text-overflow:ellipsis}.p-calendar-w-btn .p-inputtext{border-top-right-radius:0;border-bottom-right-radius:0}.p-calendar-w-btn .p-datepicker-trigger{border-top-left-radius:0;border-bottom-left-radius:0}.p-fluid .p-calendar{display:flex}.p-fluid .p-calendar .p-inputtext{width:1%}.p-calendar .p-datepicker{min-width:100%}.p-datepicker{width:auto;position:absolute;top:0;left:0}.p-datepicker-inline{display:inline-block;position:static;overflow-x:auto}.p-datepicker-header{display:flex;align-items:center;justify-content:space-between}.p-datepicker-header .p-datepicker-title{margin:0 auto}.p-datepicker-prev,.p-datepicker-next{cursor:pointer;display:inline-flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-datepicker-multiple-month .p-datepicker-group-container .p-datepicker-group{flex:1 1 auto}.p-datepicker-multiple-month .p-datepicker-group-container{display:flex}.p-datepicker table{width:100%;border-collapse:collapse}.p-datepicker td>span{display:flex;justify-content:center;align-items:center;cursor:pointer;margin:0 auto;overflow:hidden;position:relative}.p-monthpicker-month{width:33.3%;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative}.p-datepicker-buttonbar{display:flex;justify-content:space-between;align-items:center}.p-timepicker{display:flex;justify-content:center;align-items:center}.p-timepicker button{display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative}.p-timepicker>div{display:flex;align-items:center;flex-direction:column}.p-datepicker-touch-ui,.p-calendar .p-datepicker-touch-ui{position:fixed;top:50%;left:50%;min-width:80vw;transform:translate(-50%,-50%)}.p-yearpicker-year{width:50%;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative}.p-calendar-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-datepicker-icon{pointer-events:none}.p-calendar-clearable{position:relative}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.ButtonDirective), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading", "severity", "raised", "rounded", "text", "outlined", "size", "plain"] }, { kind: "directive", type: i0.forwardRef(() => i4.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => ChevronLeftIcon), selector: "ChevronLeftIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronUpIcon), selector: "ChevronUpIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }, { kind: "component", type: i0.forwardRef(() => CalendarIcon), selector: "CalendarIcon" }, { kind: "directive", type: i0.forwardRef(() => i5.AutoFocus), selector: "[pAutoFocus]", inputs: ["autofocus"] }], animations: [
            trigger('overlayAnimation', [
                state('visibleTouchUI', style({
                    transform: 'translate(-50%,-50%)',
                    opacity: 1
                })),
                transition('void => visible', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('{{showTransitionParams}}', style({ opacity: 1, transform: '*' }))]),
                transition('visible => void', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))]),
                transition('void => visibleTouchUI', [style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }), animate('{{showTransitionParams}}')]),
                transition('visibleTouchUI => void', [
                    animate('{{hideTransitionParams}}', style({
                        opacity: 0,
                        transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
                    }))
                ])
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Calendar, decorators: [{
            type: Component,
            args: [{ selector: 'p-calendar', template: `
        <span
            #container
            [ngClass]="{
                'p-calendar': true,
                'p-input-icon-right': showIcon && iconDisplay === 'input',
                'p-calendar-w-btn': showIcon && iconDisplay === 'button',
                'p-calendar-timeonly': timeOnly,
                'p-calendar-disabled': disabled,
                'p-focus': focus || overlayVisible
            }"
            [ngStyle]="style"
            [class]="styleClass"
        >
            <ng-template [ngIf]="!inline">
                <input
                    #inputfield
                    type="text"
                    role="combobox"
                    [attr.id]="inputId"
                    [attr.name]="name"
                    [attr.required]="required"
                    [attr.aria-required]="required"
                    aria-autocomplete="none"
                    aria-haspopup="dialog"
                    [attr.aria-expanded]="overlayVisible ?? false"
                    [attr.aria-controls]="overlayVisible ? panelId : null"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel"
                    [value]="inputFieldValue"
                    (focus)="onInputFocus($event)"
                    (keydown)="onInputKeydown($event)"
                    (click)="onInputClick()"
                    (blur)="onInputBlur($event)"
                    [readonly]="readonlyInput"
                    (input)="onUserInput($event)"
                    [ngStyle]="inputStyle"
                    [class]="inputStyleClass"
                    [placeholder]="placeholder || ''"
                    [disabled]="disabled"
                    [attr.tabindex]="tabindex"
                    [attr.inputmode]="touchUI ? 'off' : null"
                    [ngClass]="'p-inputtext p-component'"
                    autocomplete="off"
                    pAutoFocus
                    [autofocus]="autofocus"
                />
                <ng-container *ngIf="showClear && !disabled && value != null">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-calendar-clear-icon'" (click)="clear()" />
                    <span *ngIf="clearIconTemplate" class="p-calendar-clear-icon" (click)="clear()">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </ng-container>
                <button
                    type="button"
                    [attr.aria-label]="iconButtonAriaLabel"
                    aria-haspopup="dialog"
                    [attr.aria-expanded]="overlayVisible ?? false"
                    [attr.aria-controls]="overlayVisible ? panelId : null"
                    pButton
                    pRipple
                    *ngIf="showIcon && iconDisplay === 'button'"
                    (click)="onButtonClick($event, inputfield)"
                    class="p-datepicker-trigger p-button-icon-only"
                    [disabled]="disabled"
                    tabindex="0"
                >
                    <span *ngIf="icon" [ngClass]="icon"></span>
                    <ng-container *ngIf="!icon">
                        <CalendarIcon *ngIf="!triggerIconTemplate" />
                        <ng-template *ngTemplateOutlet="triggerIconTemplate"></ng-template>
                    </ng-container>
                </button>
                <ng-container *ngIf="iconDisplay === 'input' && showIcon">
                    <CalendarIcon
                        (click)="onButtonClick($event)"
                        *ngIf="!inputIconTemplate"
                        [ngClass]="{
                            'p-datepicker-icon': showOnFocus
                        }"
                    />
                    <ng-container *ngTemplateOutlet="inputIconTemplate; context: { clickCallBack: onButtonClick.bind(this) }"></ng-container>
                </ng-container>
            </ng-template>
            <div
                #contentWrapper
                [attr.id]="panelId"
                [class]="panelStyleClass"
                [ngStyle]="panelStyle"
                [ngClass]="{
                    'p-datepicker p-component': true,
                    'p-datepicker-inline': inline,
                    'p-disabled': disabled,
                    'p-datepicker-timeonly': timeOnly,
                    'p-datepicker-multiple-month': this.numberOfMonths > 1,
                    'p-datepicker-monthpicker': view === 'month',
                    'p-datepicker-touch-ui': touchUI
                }"
                [@overlayAnimation]="
                    touchUI
                        ? { value: 'visibleTouchUI', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }
                        : { value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }
                "
                [attr.aria-label]="getTranslation('chooseDate')"
                [attr.role]="inline ? null : 'dialog'"
                [attr.aria-modal]="inline ? null : 'true'"
                [@.disabled]="inline === true"
                (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                (@overlayAnimation.done)="onOverlayAnimationDone($event)"
                (click)="onOverlayClick($event)"
                *ngIf="inline || overlayVisible"
            >
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <ng-container *ngIf="!timeOnly">
                    <div class="p-datepicker-group-container">
                        <div class="p-datepicker-group" *ngFor="let month of months; let i = index">
                            <div class="p-datepicker-header">
                                <button (keydown)="onContainerButtonKeydown($event)" class="p-datepicker-prev p-link" (click)="onPrevButtonClick($event)" *ngIf="i === 0" type="button" [attr.aria-label]="prevIconAriaLabel" pRipple>
                                    <ChevronLeftIcon [styleClass]="'p-datepicker-prev-icon'" *ngIf="!previousIconTemplate" />
                                    <span *ngIf="previousIconTemplate" class="p-datepicker-prev-icon">
                                        <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                                    </span>
                                </button>
                                <div class="p-datepicker-title">
                                    <button
                                        type="button"
                                        (click)="switchToMonthView($event)"
                                        (keydown)="onContainerButtonKeydown($event)"
                                        *ngIf="currentView === 'date'"
                                        class="p-datepicker-month p-link"
                                        [disabled]="switchViewButtonDisabled()"
                                        [attr.aria-label]="this.getTranslation('chooseMonth')"
                                    >
                                        {{ getMonthName(month.month) }}
                                    </button>
                                    <button
                                        type="button"
                                        (click)="switchToYearView($event)"
                                        (keydown)="onContainerButtonKeydown($event)"
                                        *ngIf="currentView !== 'year'"
                                        class="p-datepicker-year p-link"
                                        [disabled]="switchViewButtonDisabled()"
                                        [attr.aria-label]="getTranslation('chooseYear')"
                                    >
                                        {{ getYear(month) }}
                                    </button>
                                    <span class="p-datepicker-decade" *ngIf="currentView === 'year'">
                                        <ng-container *ngIf="!decadeTemplate">{{ yearPickerValues()[0] }} - {{ yearPickerValues()[yearPickerValues().length - 1] }}</ng-container>
                                        <ng-container *ngTemplateOutlet="decadeTemplate; context: { $implicit: yearPickerValues }"></ng-container>
                                    </span>
                                </div>
                                <button
                                    (keydown)="onContainerButtonKeydown($event)"
                                    class="p-datepicker-next p-link"
                                    (click)="onNextButtonClick($event)"
                                    [style.display]="numberOfMonths === 1 ? 'inline-flex' : i === numberOfMonths - 1 ? 'inline-flex' : 'none'"
                                    type="button"
                                    [attr.aria-label]="nextIconAriaLabel"
                                    pRipple
                                >
                                    <ChevronRightIcon [styleClass]="'p-datepicker-next-icon'" *ngIf="!nextIconTemplate" />
                                    <span *ngIf="nextIconTemplate" class="p-datepicker-next-icon">
                                        <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                                    </span>
                                </button>
                            </div>
                            <div class="p-datepicker-calendar-container" *ngIf="currentView === 'date'">
                                <table class="p-datepicker-calendar" role="grid">
                                    <thead>
                                        <tr>
                                            <th *ngIf="showWeek" class="p-datepicker-weekheader p-disabled">
                                                <span>{{ getTranslation('weekHeader') }}</span>
                                            </th>
                                            <th scope="col" *ngFor="let weekDay of weekDays; let begin = first; let end = last">
                                                <span>{{ weekDay }}</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr *ngFor="let week of month.dates; let j = index">
                                            <td *ngIf="showWeek" class="p-datepicker-weeknumber">
                                                <span class="p-disabled">
                                                    {{ month.weekNumbers[j] }}
                                                </span>
                                            </td>
                                            <td *ngFor="let date of week" [attr.aria-label]="date.day" [ngClass]="{ 'p-datepicker-other-month': date.otherMonth, 'p-datepicker-today': date.today }">
                                                <ng-container *ngIf="date.otherMonth ? showOtherMonths : true">
                                                    <span
                                                        [ngClass]="{ 'p-highlight': isSelected(date) && date.selectable, 'p-disabled': !date.selectable }"
                                                        (click)="onDateSelect($event, date)"
                                                        draggable="false"
                                                        (keydown)="onDateCellKeydown($event, date, i)"
                                                        pRipple
                                                    >
                                                        <ng-container *ngIf="!dateTemplate && (date.selectable || !disabledDateTemplate)">{{ date.day }}</ng-container>
                                                        <ng-container *ngIf="date.selectable || !disabledDateTemplate">
                                                            <ng-container *ngTemplateOutlet="dateTemplate; context: { $implicit: date }"></ng-container>
                                                        </ng-container>
                                                        <ng-container *ngIf="!date.selectable">
                                                            <ng-container *ngTemplateOutlet="disabledDateTemplate; context: { $implicit: date }"></ng-container>
                                                        </ng-container>
                                                    </span>
                                                    <div *ngIf="isSelected(date)" class="p-hidden-accessible" aria-live="polite">
                                                        {{ date.day }}
                                                    </div>
                                                </ng-container>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="p-monthpicker" *ngIf="currentView === 'month'">
                        <span
                            *ngFor="let m of monthPickerValues(); let i = index"
                            (click)="onMonthSelect($event, i)"
                            (keydown)="onMonthCellKeydown($event, i)"
                            class="p-monthpicker-month"
                            [ngClass]="{ 'p-highlight': isMonthSelected(i), 'p-disabled': isMonthDisabled(i) }"
                            pRipple
                        >
                            {{ m }}
                            <div *ngIf="isMonthSelected(i)" class="p-hidden-accessible" aria-live="polite">
                                {{ m }}
                            </div>
                        </span>
                    </div>
                    <div class="p-yearpicker" *ngIf="currentView === 'year'">
                        <span
                            *ngFor="let y of yearPickerValues()"
                            (click)="onYearSelect($event, y)"
                            (keydown)="onYearCellKeydown($event, y)"
                            class="p-yearpicker-year"
                            [ngClass]="{ 'p-highlight': isYearSelected(y), 'p-disabled': isYearDisabled(y) }"
                            pRipple
                        >
                            {{ y }}
                            <div *ngIf="isYearSelected(y)" class="p-hidden-accessible" aria-live="polite">
                                {{ y }}
                            </div>
                        </span>
                    </div>
                </ng-container>
                <div class="p-timepicker" *ngIf="(showTime || timeOnly) && currentView === 'date'">
                    <div class="p-hour-picker">
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementHour($event)"
                            (keydown.space)="incrementHour($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 0, 1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('nextHour')"
                            pRipple
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span><ng-container *ngIf="currentHour < 10">0</ng-container>{{ currentHour }}</span>
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementHour($event)"
                            (keydown.space)="decrementHour($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 0, -1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('prevHour')"
                            pRipple
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-separator">
                        <span>{{ timeSeparator }}</span>
                    </div>
                    <div class="p-minute-picker">
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementMinute($event)"
                            (keydown.space)="incrementMinute($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 1, 1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('nextMinute')"
                            pRipple
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span><ng-container *ngIf="currentMinute < 10">0</ng-container>{{ currentMinute }}</span>
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementMinute($event)"
                            (keydown.space)="decrementMinute($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 1, -1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('prevMinute')"
                            pRipple
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-separator" *ngIf="showSeconds">
                        <span>{{ timeSeparator }}</span>
                    </div>
                    <div class="p-second-picker" *ngIf="showSeconds">
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementSecond($event)"
                            (keydown.space)="incrementSecond($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 2, 1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('nextSecond')"
                            pRipple
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span><ng-container *ngIf="currentSecond < 10">0</ng-container>{{ currentSecond }}</span>
                        <button
                            class="p-link"
                            type="button"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementSecond($event)"
                            (keydown.space)="decrementSecond($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 2, -1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('prevSecond')"
                            pRipple
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-ampm-picker" *ngIf="hourFormat == '12'">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" [attr.aria-label]="getTranslation('am')" pRipple>
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </button>
                        <span>{{ pm ? 'PM' : 'AM' }}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" [attr.aria-label]="getTranslation('pm')" pRipple>
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </button>
                    </div>
                </div>
                <div class="p-datepicker-buttonbar" *ngIf="showButtonBar">
                    <button type="button" [label]="getTranslation('today')" (keydown)="onContainerButtonKeydown($event)" (click)="onTodayButtonClick($event)" pButton pRipple [ngClass]="[todayButtonStyleClass]"></button>
                    <button type="button" [label]="getTranslation('clear')" (keydown)="onContainerButtonKeydown($event)" (click)="onClearButtonClick($event)" pButton pRipple [ngClass]="[clearButtonStyleClass]"></button>
                </div>
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </span>
    `, animations: [
                        trigger('overlayAnimation', [
                            state('visibleTouchUI', style({
                                transform: 'translate(-50%,-50%)',
                                opacity: 1
                            })),
                            transition('void => visible', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('{{showTransitionParams}}', style({ opacity: 1, transform: '*' }))]),
                            transition('visible => void', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))]),
                            transition('void => visibleTouchUI', [style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }), animate('{{showTransitionParams}}')]),
                            transition('visibleTouchUI => void', [
                                animate('{{hideTransitionParams}}', style({
                                    opacity: 0,
                                    transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
                                }))
                            ])
                        ])
                    ], host: {
                        class: 'p-element p-inputwrapper',
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focus',
                        '[class.p-calendar-clearable]': 'showClear && !disabled'
                    }, providers: [CALENDAR_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["@layer primeng{.p-calendar{position:relative;display:inline-flex;max-width:100%}.p-calendar .p-inputtext{flex:1 1 auto;width:1%;text-overflow:ellipsis}.p-calendar-w-btn .p-inputtext{border-top-right-radius:0;border-bottom-right-radius:0}.p-calendar-w-btn .p-datepicker-trigger{border-top-left-radius:0;border-bottom-left-radius:0}.p-fluid .p-calendar{display:flex}.p-fluid .p-calendar .p-inputtext{width:1%}.p-calendar .p-datepicker{min-width:100%}.p-datepicker{width:auto;position:absolute;top:0;left:0}.p-datepicker-inline{display:inline-block;position:static;overflow-x:auto}.p-datepicker-header{display:flex;align-items:center;justify-content:space-between}.p-datepicker-header .p-datepicker-title{margin:0 auto}.p-datepicker-prev,.p-datepicker-next{cursor:pointer;display:inline-flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-datepicker-multiple-month .p-datepicker-group-container .p-datepicker-group{flex:1 1 auto}.p-datepicker-multiple-month .p-datepicker-group-container{display:flex}.p-datepicker table{width:100%;border-collapse:collapse}.p-datepicker td>span{display:flex;justify-content:center;align-items:center;cursor:pointer;margin:0 auto;overflow:hidden;position:relative}.p-monthpicker-month{width:33.3%;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative}.p-datepicker-buttonbar{display:flex;justify-content:space-between;align-items:center}.p-timepicker{display:flex;justify-content:center;align-items:center}.p-timepicker button{display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative}.p-timepicker>div{display:flex;align-items:center;flex-direction:column}.p-datepicker-touch-ui,.p-calendar .p-datepicker-touch-ui{position:fixed;top:50%;left:50%;min-width:80vw;transform:translate(-50%,-50%)}.p-yearpicker-year{width:50%;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative}.p-calendar-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-datepicker-icon{pointer-events:none}.p-calendar-clearable{position:relative}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i1.PrimeNGConfig }, { type: i1.OverlayService }], propDecorators: { iconDisplay: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], inputStyle: [{
                type: Input
            }], inputId: [{
                type: Input
            }], name: [{
                type: Input
            }], inputStyleClass: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], iconAriaLabel: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dateFormat: [{
                type: Input
            }], multipleSeparator: [{
                type: Input
            }], rangeSeparator: [{
                type: Input
            }], inline: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showOtherMonths: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], selectOtherMonths: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showIcon: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], icon: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], readonlyInput: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], shortYearCutoff: [{
                type: Input
            }], monthNavigator: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], yearNavigator: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], hourFormat: [{
                type: Input
            }], timeOnly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], stepHour: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], stepMinute: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], stepSecond: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], showSeconds: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], required: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showOnFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showWeek: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], startWeekFromFirstDayOfYear: [{
                type: Input
            }], showClear: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dataType: [{
                type: Input
            }], selectionMode: [{
                type: Input
            }], maxDateCount: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], showButtonBar: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], todayButtonStyleClass: [{
                type: Input
            }], clearButtonStyleClass: [{
                type: Input
            }], autofocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autoZIndex: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], baseZIndex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], panelStyleClass: [{
                type: Input
            }], panelStyle: [{
                type: Input
            }], keepInvalid: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], hideOnDateTimeSelect: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], touchUI: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], timeSeparator: [{
                type: Input
            }], focusTrap: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], disabledDates: [{
                type: Input
            }], disabledDays: [{
                type: Input
            }], yearRange: [{
                type: Input
            }], showTime: [{
                type: Input
            }], responsiveOptions: [{
                type: Input
            }], numberOfMonths: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], locale: [{
                type: Input
            }], view: [{
                type: Input
            }], defaultDate: [{
                type: Input
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onClose: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onClear: [{
                type: Output
            }], onInput: [{
                type: Output
            }], onTodayClick: [{
                type: Output
            }], onClearClick: [{
                type: Output
            }], onMonthChange: [{
                type: Output
            }], onYearChange: [{
                type: Output
            }], onClickOutside: [{
                type: Output
            }], onShow: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container', { static: false }]
            }], inputfieldViewChild: [{
                type: ViewChild,
                args: ['inputfield', { static: false }]
            }], content: [{
                type: ViewChild,
                args: ['contentWrapper', { static: false }]
            }] } });
export class CalendarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: CalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: CalendarModule, declarations: [Calendar], imports: [CommonModule, ButtonModule, SharedModule, RippleModule, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, TimesIcon, CalendarIcon, AutoFocusModule], exports: [Calendar, ButtonModule, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: CalendarModule, imports: [CommonModule, ButtonModule, SharedModule, RippleModule, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, TimesIcon, CalendarIcon, AutoFocusModule, ButtonModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: CalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ButtonModule, SharedModule, RippleModule, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, TimesIcon, CalendarIcon, AutoFocusModule],
                    exports: [Calendar, ButtonModule, SharedModule],
                    declarations: [Calendar]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvY2FsZW5kYXIvY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBa0IsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakcsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQ0gsZ0JBQWdCLEVBQ2hCLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBRVIsZUFBZSxFQUdmLE1BQU0sRUFJTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQWlDLGFBQWEsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxl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R0FBZCxjQUFjO3dHQUFkLGNBQWMsaUJBamdHZCxRQUFRLGFBNi9GUCxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLGFBNy9GcEssUUFBUSxFQTgvRkcsWUFBWSxFQUFFLFlBQVk7d0dBR3JDLGNBQWMsWUFKYixZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQ3pKLFlBQVksRUFBRSxZQUFZOzsyRkFHckMsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLENBQUM7b0JBQzlLLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDO29CQUMvQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgQW5pbWF0aW9uRXZlbnQsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIGJvb2xlYW5BdHRyaWJ1dGUsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBOZ01vZHVsZSxcbiAgICBOZ1pvbmUsXG4gICAgbnVtYmVyQXR0cmlidXRlLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT3ZlcmxheVNlcnZpY2UsIFByaW1lTkdDb25maWcsIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSwgVHJhbnNsYXRpb25LZXlzIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHsgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXIsIERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBSaXBwbGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQgeyBPYmplY3RVdGlscywgVW5pcXVlQ29tcG9uZW50SWQsIFpJbmRleFV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENoZXZyb25MZWZ0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbmxlZnQnO1xuaW1wb3J0IHsgQ2hldnJvblJpZ2h0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbnJpZ2h0JztcbmltcG9ydCB7IENoZXZyb25VcEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb251cCc7XG5pbXBvcnQgeyBDaGV2cm9uRG93bkljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25kb3duJztcbmltcG9ydCB7IFRpbWVzSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdGltZXMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jYWxlbmRhcic7XG5pbXBvcnQgeyBOdWxsYWJsZSwgVm9pZExpc3RlbmVyIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IE5hdmlnYXRpb25TdGF0ZSwgQ2FsZW5kYXJSZXNwb25zaXZlT3B0aW9ucywgQ2FsZW5kYXJUeXBlVmlldywgTG9jYWxlU2V0dGluZ3MsIE1vbnRoLCBDYWxlbmRhck1vbnRoQ2hhbmdlRXZlbnQsIENhbGVuZGFyWWVhckNoYW5nZUV2ZW50IH0gZnJvbSAnLi9jYWxlbmRhci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXV0b0ZvY3VzTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hdXRvZm9jdXMnO1xuXG5leHBvcnQgY29uc3QgQ0FMRU5EQVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDYWxlbmRhciksXG4gICAgbXVsdGk6IHRydWVcbn07XG4vKipcbiAqIENhbGVuZGFyIGFsc28ga25vd24gYXMgRGF0ZVBpY2tlciwgaXMgYSBmb3JtIGNvbXBvbmVudCB0byB3b3JrIHdpdGggZGF0ZXMuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY2FsZW5kYXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgICAjY29udGFpbmVyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgICAgICAgJ3AtY2FsZW5kYXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICdwLWlucHV0LWljb24tcmlnaHQnOiBzaG93SWNvbiAmJiBpY29uRGlzcGxheSA9PT0gJ2lucHV0JyxcbiAgICAgICAgICAgICAgICAncC1jYWxlbmRhci13LWJ0bic6IHNob3dJY29uICYmIGljb25EaXNwbGF5ID09PSAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAncC1jYWxlbmRhci10aW1lb25seSc6IHRpbWVPbmx5LFxuICAgICAgICAgICAgICAgICdwLWNhbGVuZGFyLWRpc2FibGVkJzogZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgJ3AtZm9jdXMnOiBmb2N1cyB8fCBvdmVybGF5VmlzaWJsZVxuICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJzdHlsZVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaW5saW5lXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICNpbnB1dGZpZWxkXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiaW5wdXRJZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1yZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtYXV0b2NvbXBsZXRlPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtaGFzcG9wdXA9XCJkaWFsb2dcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIm92ZXJsYXlWaXNpYmxlID8/IGZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJvdmVybGF5VmlzaWJsZSA/IHBhbmVsSWQgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiaW5wdXRGaWVsZFZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25JbnB1dEtleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbklucHV0Q2xpY2soKVwiXG4gICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlJbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIChpbnB1dCk9XCJvblVzZXJJbnB1dCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwiaW5wdXRTdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJpbnB1dFN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXIgfHwgJydcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmlucHV0bW9kZV09XCJ0b3VjaFVJID8gJ29mZicgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiJ3AtaW5wdXR0ZXh0IHAtY29tcG9uZW50J1wiXG4gICAgICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgICAgICAgIHBBdXRvRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgW2F1dG9mb2N1c109XCJhdXRvZm9jdXNcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3dDbGVhciAmJiAhZGlzYWJsZWQgJiYgdmFsdWUgIT0gbnVsbFwiPlxuICAgICAgICAgICAgICAgICAgICA8VGltZXNJY29uICpuZ0lmPVwiIWNsZWFySWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtY2FsZW5kYXItY2xlYXItaWNvbidcIiAoY2xpY2spPVwiY2xlYXIoKVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY2xlYXJJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtY2FsZW5kYXItY2xlYXItaWNvblwiIChjbGljayk9XCJjbGVhcigpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjbGVhckljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImljb25CdXR0b25BcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWhhc3BvcHVwPVwiZGlhbG9nXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJvdmVybGF5VmlzaWJsZSA/PyBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwib3ZlcmxheVZpc2libGUgPyBwYW5lbElkIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInNob3dJY29uICYmIGljb25EaXNwbGF5ID09PSAnYnV0dG9uJ1wiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkJ1dHRvbkNsaWNrKCRldmVudCwgaW5wdXRmaWVsZClcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtZGF0ZXBpY2tlci10cmlnZ2VyIHAtYnV0dG9uLWljb24tb25seVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImljb25cIiBbbmdDbGFzc109XCJpY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDYWxlbmRhckljb24gKm5nSWY9XCIhdHJpZ2dlckljb25UZW1wbGF0ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0cmlnZ2VySWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImljb25EaXNwbGF5ID09PSAnaW5wdXQnICYmIHNob3dJY29uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDYWxlbmRhckljb25cbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkJ1dHRvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhaW5wdXRJY29uVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwLWRhdGVwaWNrZXItaWNvbic6IHNob3dPbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImlucHV0SWNvblRlbXBsYXRlOyBjb250ZXh0OiB7IGNsaWNrQ2FsbEJhY2s6IG9uQnV0dG9uQ2xpY2suYmluZCh0aGlzKSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICNjb250ZW50V3JhcHBlclxuICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cInBhbmVsSWRcIlxuICAgICAgICAgICAgICAgIFtjbGFzc109XCJwYW5lbFN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInBhbmVsU3R5bGVcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgICAgICAgJ3AtZGF0ZXBpY2tlciBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICdwLWRhdGVwaWNrZXItaW5saW5lJzogaW5saW5lLFxuICAgICAgICAgICAgICAgICAgICAncC1kaXNhYmxlZCc6IGRpc2FibGVkLFxuICAgICAgICAgICAgICAgICAgICAncC1kYXRlcGlja2VyLXRpbWVvbmx5JzogdGltZU9ubHksXG4gICAgICAgICAgICAgICAgICAgICdwLWRhdGVwaWNrZXItbXVsdGlwbGUtbW9udGgnOiB0aGlzLm51bWJlck9mTW9udGhzID4gMSxcbiAgICAgICAgICAgICAgICAgICAgJ3AtZGF0ZXBpY2tlci1tb250aHBpY2tlcic6IHZpZXcgPT09ICdtb250aCcsXG4gICAgICAgICAgICAgICAgICAgICdwLWRhdGVwaWNrZXItdG91Y2gtdWknOiB0b3VjaFVJXG4gICAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgICAgW0BvdmVybGF5QW5pbWF0aW9uXT1cIlxuICAgICAgICAgICAgICAgICAgICB0b3VjaFVJXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHsgdmFsdWU6ICd2aXNpYmxlVG91Y2hVSScsIHBhcmFtczogeyBzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zIH0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB7IHZhbHVlOiAndmlzaWJsZScsIHBhcmFtczogeyBzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zIH0gfVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRUcmFuc2xhdGlvbignY2hvb3NlRGF0ZScpXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5yb2xlXT1cImlubGluZSA/IG51bGwgOiAnZGlhbG9nJ1wiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1tb2RhbF09XCJpbmxpbmUgPyBudWxsIDogJ3RydWUnXCJcbiAgICAgICAgICAgICAgICBbQC5kaXNhYmxlZF09XCJpbmxpbmUgPT09IHRydWVcIlxuICAgICAgICAgICAgICAgIChAb3ZlcmxheUFuaW1hdGlvbi5zdGFydCk9XCJvbk92ZXJsYXlBbmltYXRpb25TdGFydCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoQG92ZXJsYXlBbmltYXRpb24uZG9uZSk9XCJvbk92ZXJsYXlBbmltYXRpb25Eb25lKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJvbk92ZXJsYXlDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cImlubGluZSB8fCBvdmVybGF5VmlzaWJsZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF0aW1lT25seVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kYXRlcGlja2VyLWdyb3VwLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGF0ZXBpY2tlci1ncm91cFwiICpuZ0Zvcj1cImxldCBtb250aCBvZiBtb250aHM7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kYXRlcGlja2VyLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCIgY2xhc3M9XCJwLWRhdGVwaWNrZXItcHJldiBwLWxpbmtcIiAoY2xpY2spPVwib25QcmV2QnV0dG9uQ2xpY2soJGV2ZW50KVwiICpuZ0lmPVwiaSA9PT0gMFwiIHR5cGU9XCJidXR0b25cIiBbYXR0ci5hcmlhLWxhYmVsXT1cInByZXZJY29uQXJpYUxhYmVsXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uTGVmdEljb24gW3N0eWxlQ2xhc3NdPVwiJ3AtZGF0ZXBpY2tlci1wcmV2LWljb24nXCIgKm5nSWY9XCIhcHJldmlvdXNJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJwcmV2aW91c0ljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1kYXRlcGlja2VyLXByZXYtaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInByZXZpb3VzSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWRhdGVwaWNrZXItdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic3dpdGNoVG9Nb250aFZpZXcoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY3VycmVudFZpZXcgPT09ICdkYXRlJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWRhdGVwaWNrZXItbW9udGggcC1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwic3dpdGNoVmlld0J1dHRvbkRpc2FibGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwidGhpcy5nZXRUcmFuc2xhdGlvbignY2hvb3NlTW9udGgnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgZ2V0TW9udGhOYW1lKG1vbnRoLm1vbnRoKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInN3aXRjaFRvWWVhclZpZXcoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY3VycmVudFZpZXcgIT09ICd5ZWFyJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWRhdGVwaWNrZXIteWVhciBwLWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJzd2l0Y2hWaWV3QnV0dG9uRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRUcmFuc2xhdGlvbignY2hvb3NlWWVhcicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBnZXRZZWFyKG1vbnRoKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtZGF0ZXBpY2tlci1kZWNhZGVcIiAqbmdJZj1cImN1cnJlbnRWaWV3ID09PSAneWVhcidcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWRlY2FkZVRlbXBsYXRlXCI+e3sgeWVhclBpY2tlclZhbHVlcygpWzBdIH19IC0ge3sgeWVhclBpY2tlclZhbHVlcygpW3llYXJQaWNrZXJWYWx1ZXMoKS5sZW5ndGggLSAxXSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkZWNhZGVUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHllYXJQaWNrZXJWYWx1ZXMgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWRhdGVwaWNrZXItbmV4dCBwLWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uTmV4dEJ1dHRvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwibnVtYmVyT2ZNb250aHMgPT09IDEgPyAnaW5saW5lLWZsZXgnIDogaSA9PT0gbnVtYmVyT2ZNb250aHMgLSAxID8gJ2lubGluZS1mbGV4JyA6ICdub25lJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibmV4dEljb25BcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0SWNvbiBbc3R5bGVDbGFzc109XCIncC1kYXRlcGlja2VyLW5leHQtaWNvbidcIiAqbmdJZj1cIiFuZXh0SWNvblRlbXBsYXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibmV4dEljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1kYXRlcGlja2VyLW5leHQtaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm5leHRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kYXRlcGlja2VyLWNhbGVuZGFyLWNvbnRhaW5lclwiICpuZ0lmPVwiY3VycmVudFZpZXcgPT09ICdkYXRlJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJwLWRhdGVwaWNrZXItY2FsZW5kYXJcIiByb2xlPVwiZ3JpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoICpuZ0lmPVwic2hvd1dlZWtcIiBjbGFzcz1cInAtZGF0ZXBpY2tlci13ZWVraGVhZGVyIHAtZGlzYWJsZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGdldFRyYW5zbGF0aW9uKCd3ZWVrSGVhZGVyJykgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiICpuZ0Zvcj1cImxldCB3ZWVrRGF5IG9mIHdlZWtEYXlzOyBsZXQgYmVnaW4gPSBmaXJzdDsgbGV0IGVuZCA9IGxhc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IHdlZWtEYXkgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCB3ZWVrIG9mIG1vbnRoLmRhdGVzOyBsZXQgaiA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdJZj1cInNob3dXZWVrXCIgY2xhc3M9XCJwLWRhdGVwaWNrZXItd2Vla251bWJlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgbW9udGgud2Vla051bWJlcnNbal0gfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBkYXRlIG9mIHdlZWtcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImRhdGUuZGF5XCIgW25nQ2xhc3NdPVwieyAncC1kYXRlcGlja2VyLW90aGVyLW1vbnRoJzogZGF0ZS5vdGhlck1vbnRoLCAncC1kYXRlcGlja2VyLXRvZGF5JzogZGF0ZS50b2RheSB9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0ZS5vdGhlck1vbnRoID8gc2hvd090aGVyTW9udGhzIDogdHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtaGlnaGxpZ2h0JzogaXNTZWxlY3RlZChkYXRlKSAmJiBkYXRlLnNlbGVjdGFibGUsICdwLWRpc2FibGVkJzogIWRhdGUuc2VsZWN0YWJsZSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uRGF0ZVNlbGVjdCgkZXZlbnQsIGRhdGUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkRhdGVDZWxsS2V5ZG93bigkZXZlbnQsIGRhdGUsIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFkYXRlVGVtcGxhdGUgJiYgKGRhdGUuc2VsZWN0YWJsZSB8fCAhZGlzYWJsZWREYXRlVGVtcGxhdGUpXCI+e3sgZGF0ZS5kYXkgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGUuc2VsZWN0YWJsZSB8fCAhZGlzYWJsZWREYXRlVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkYXRlVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBkYXRlIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZGF0ZS5zZWxlY3RhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGlzYWJsZWREYXRlVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBkYXRlIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc1NlbGVjdGVkKGRhdGUpXCIgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlXCIgYXJpYS1saXZlPVwicG9saXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGRhdGUuZGF5IH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbW9udGhwaWNrZXJcIiAqbmdJZj1cImN1cnJlbnRWaWV3ID09PSAnbW9udGgnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBtIG9mIG1vbnRoUGlja2VyVmFsdWVzKCk7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbk1vbnRoU2VsZWN0KCRldmVudCwgaSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uTW9udGhDZWxsS2V5ZG93bigkZXZlbnQsIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtbW9udGhwaWNrZXItbW9udGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtaGlnaGxpZ2h0JzogaXNNb250aFNlbGVjdGVkKGkpLCAncC1kaXNhYmxlZCc6IGlzTW9udGhEaXNhYmxlZChpKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgbSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc01vbnRoU2VsZWN0ZWQoaSlcIiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgbSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAteWVhcnBpY2tlclwiICpuZ0lmPVwiY3VycmVudFZpZXcgPT09ICd5ZWFyJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgeSBvZiB5ZWFyUGlja2VyVmFsdWVzKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvblllYXJTZWxlY3QoJGV2ZW50LCB5KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25ZZWFyQ2VsbEtleWRvd24oJGV2ZW50LCB5KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXllYXJwaWNrZXIteWVhclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1oaWdobGlnaHQnOiBpc1llYXJTZWxlY3RlZCh5KSwgJ3AtZGlzYWJsZWQnOiBpc1llYXJEaXNhYmxlZCh5KSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgeSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc1llYXJTZWxlY3RlZCh5KVwiIGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZVwiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyB5IH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRpbWVwaWNrZXJcIiAqbmdJZj1cIihzaG93VGltZSB8fCB0aW1lT25seSkgJiYgY3VycmVudFZpZXcgPT09ICdkYXRlJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1ob3VyLXBpY2tlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwiaW5jcmVtZW50SG91cigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5zcGFjZSk9XCJpbmNyZW1lbnRIb3VyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bigkZXZlbnQsIDAsIDEpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleXVwLnNwYWNlKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWxlYXZlKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZUxlYXZlKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZ2V0VHJhbnNsYXRpb24oJ25leHRIb3VyJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblVwSWNvbiAqbmdJZj1cIiFpbmNyZW1lbnRJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImluY3JlbWVudEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxuZy1jb250YWluZXIgKm5nSWY9XCJjdXJyZW50SG91ciA8IDEwXCI+MDwvbmctY29udGFpbmVyPnt7IGN1cnJlbnRIb3VyIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwiZGVjcmVtZW50SG91cigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5zcGFjZSk9XCJkZWNyZW1lbnRIb3VyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bigkZXZlbnQsIDAsIC0xKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNldXApPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleXVwLmVudGVyKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cC5zcGFjZSk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VMZWF2ZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImdldFRyYW5zbGF0aW9uKCdwcmV2SG91cicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiAqbmdJZj1cIiFkZWNyZW1lbnRJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImRlY3JlbWVudEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNlcGFyYXRvclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgdGltZVNlcGFyYXRvciB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW1pbnV0ZS1waWNrZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtbGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cImluY3JlbWVudE1pbnV0ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5zcGFjZSk9XCJpbmNyZW1lbnRNaW51dGUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VEb3duKCRldmVudCwgMSwgMSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZXVwKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cC5lbnRlcik9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5dXAuc3BhY2UpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlTGVhdmUoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRUcmFuc2xhdGlvbignbmV4dE1pbnV0ZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25VcEljb24gKm5nSWY9XCIhaW5jcmVtZW50SWNvblRlbXBsYXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpbmNyZW1lbnRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj48bmctY29udGFpbmVyICpuZ0lmPVwiY3VycmVudE1pbnV0ZSA8IDEwXCI+MDwvbmctY29udGFpbmVyPnt7IGN1cnJlbnRNaW51dGUgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJkZWNyZW1lbnRNaW51dGUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24uc3BhY2UpPVwiZGVjcmVtZW50TWludXRlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bigkZXZlbnQsIDEsIC0xKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNldXApPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleXVwLmVudGVyKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cC5zcGFjZSk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VMZWF2ZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImdldFRyYW5zbGF0aW9uKCdwcmV2TWludXRlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkRvd25JY29uICpuZ0lmPVwiIWRlY3JlbWVudEljb25UZW1wbGF0ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGVjcmVtZW50SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtc2VwYXJhdG9yXCIgKm5nSWY9XCJzaG93U2Vjb25kc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgdGltZVNlcGFyYXRvciB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNlY29uZC1waWNrZXJcIiAqbmdJZj1cInNob3dTZWNvbmRzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJpbmNyZW1lbnRTZWNvbmQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24uc3BhY2UpPVwiaW5jcmVtZW50U2Vjb25kKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bigkZXZlbnQsIDIsIDEpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleXVwLnNwYWNlKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWxlYXZlKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZUxlYXZlKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZ2V0VHJhbnNsYXRpb24oJ25leHRTZWNvbmQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uVXBJY29uICpuZ0lmPVwiIWluY3JlbWVudEljb25UZW1wbGF0ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiaW5jcmVtZW50SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PG5nLWNvbnRhaW5lciAqbmdJZj1cImN1cnJlbnRTZWNvbmQgPCAxMFwiPjA8L25nLWNvbnRhaW5lcj57eyBjdXJyZW50U2Vjb25kIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwiZGVjcmVtZW50U2Vjb25kKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLnNwYWNlKT1cImRlY3JlbWVudFNlY29uZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAyLCAtMSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZXVwKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cC5lbnRlcik9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5dXAuc3BhY2UpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlTGVhdmUoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRUcmFuc2xhdGlvbigncHJldlNlY29uZCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiAqbmdJZj1cIiFkZWNyZW1lbnRJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImRlY3JlbWVudEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWFtcG0tcGlja2VyXCIgKm5nSWY9XCJob3VyRm9ybWF0ID09ICcxMidcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoY2xpY2spPVwidG9nZ2xlQU1QTSgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwidG9nZ2xlQU1QTSgkZXZlbnQpXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRUcmFuc2xhdGlvbignYW0nKVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25VcEljb24gKm5nSWY9XCIhaW5jcmVtZW50SWNvblRlbXBsYXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpbmNyZW1lbnRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBwbSA/ICdQTScgOiAnQU0nIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInAtbGlua1wiIHR5cGU9XCJidXR0b25cIiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIChjbGljayk9XCJ0b2dnbGVBTVBNKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJ0b2dnbGVBTVBNKCRldmVudClcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImdldFRyYW5zbGF0aW9uKCdwbScpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkRvd25JY29uICpuZ0lmPVwiIWRlY3JlbWVudEljb25UZW1wbGF0ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGVjcmVtZW50SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kYXRlcGlja2VyLWJ1dHRvbmJhclwiICpuZ0lmPVwic2hvd0J1dHRvbkJhclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbbGFiZWxdPVwiZ2V0VHJhbnNsYXRpb24oJ3RvZGF5JylcIiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIChjbGljayk9XCJvblRvZGF5QnV0dG9uQ2xpY2soJGV2ZW50KVwiIHBCdXR0b24gcFJpcHBsZSBbbmdDbGFzc109XCJbdG9kYXlCdXR0b25TdHlsZUNsYXNzXVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbbGFiZWxdPVwiZ2V0VHJhbnNsYXRpb24oJ2NsZWFyJylcIiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIChjbGljayk9XCJvbkNsZWFyQnV0dG9uQ2xpY2soJGV2ZW50KVwiIHBCdXR0b24gcFJpcHBsZSBbbmdDbGFzc109XCJbY2xlYXJCdXR0b25TdHlsZUNsYXNzXVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmb290ZXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc3Bhbj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignb3ZlcmxheUFuaW1hdGlvbicsIFtcbiAgICAgICAgICAgIHN0YXRlKFxuICAgICAgICAgICAgICAgICd2aXNpYmxlVG91Y2hVSScsXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTUwJSwtNTAlKScsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIFtzdHlsZSh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlWSgwLjgpJyB9KSwgYW5pbWF0ZSgne3tzaG93VHJhbnNpdGlvblBhcmFtc319Jywgc3R5bGUoeyBvcGFjaXR5OiAxLCB0cmFuc2Zvcm06ICcqJyB9KSldKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gdm9pZCcsIFthbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGVUb3VjaFVJJywgW3N0eWxlKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTUwJSwgLTQwJSwgMCkgc2NhbGUoMC45KScgfSksIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlVG91Y2hVSSA9PiB2b2lkJywgW1xuICAgICAgICAgICAgICAgIGFuaW1hdGUoXG4gICAgICAgICAgICAgICAgICAgICd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTUwJSwgLTQwJSwgMCkgc2NhbGUoMC45KSdcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCBwLWlucHV0d3JhcHBlcicsXG4gICAgICAgICdbY2xhc3MucC1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1cycsXG4gICAgICAgICdbY2xhc3MucC1jYWxlbmRhci1jbGVhcmFibGVdJzogJ3Nob3dDbGVhciAmJiAhZGlzYWJsZWQnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtDQUxFTkRBUl9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgQElucHV0KCkgaWNvbkRpc3BsYXk6ICdpbnB1dCcgfCAnYnV0dG9uJyA9ICdidXR0b24nO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW5wdXRTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVyIG9mIHRoZSBmb2N1cyBpbnB1dCB0byBtYXRjaCBhIGxhYmVsIGRlZmluZWQgZm9yIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGlucHV0IGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBpbnB1dCBmaWVsZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBQbGFjZWhvbGRlciB0ZXh0IGZvciB0aGUgaW5wdXQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBFc3RhYmxpc2hlcyByZWxhdGlvbnNoaXBzIGJldHdlZW4gdGhlIGNvbXBvbmVudCBhbmQgbGFiZWwocykgd2hlcmUgaXRzIHZhbHVlIHNob3VsZCBiZSBvbmUgb3IgbW9yZSBlbGVtZW50IElEcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIGlucHV0IGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgaWNvbiBidXR0b24gZm9yIGFjY2Vzc2liaWxpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWNvbkFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gc3BlY2lmaWVkLCBkaXNhYmxlcyB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBkaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBGb3JtYXQgb2YgdGhlIGRhdGUgd2hpY2ggY2FuIGFsc28gYmUgZGVmaW5lZCBhdCBsb2NhbGUgc2V0dGluZ3MuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGF0ZUZvcm1hdDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNlcGFyYXRvciBmb3IgbXVsdGlwbGUgc2VsZWN0aW9uIG1vZGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbXVsdGlwbGVTZXBhcmF0b3I6IHN0cmluZyA9ICcsJztcbiAgICAvKipcbiAgICAgKiBTZXBhcmF0b3IgZm9yIGpvaW5pbmcgc3RhcnQgYW5kIGVuZCBkYXRlcyBvbiByYW5nZSBzZWxlY3Rpb24gbW9kZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByYW5nZVNlcGFyYXRvcjogc3RyaW5nID0gJy0nO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCwgZGlzcGxheXMgdGhlIGNhbGVuZGFyIGFzIGlubGluZS4gRGVmYXVsdCBpcyBmYWxzZSBmb3IgcG9wdXAgbW9kZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgaW5saW5lOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IGRhdGVzIGluIG90aGVyIG1vbnRocyAobm9uLXNlbGVjdGFibGUpIGF0IHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGN1cnJlbnQgbW9udGguIFRvIG1ha2UgdGhlc2UgZGF5cyBzZWxlY3RhYmxlIHVzZSB0aGUgc2VsZWN0T3RoZXJNb250aHMgb3B0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93T3RoZXJNb250aHM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZGF5cyBpbiBvdGhlciBtb250aHMgc2hvd24gYmVmb3JlIG9yIGFmdGVyIHRoZSBjdXJyZW50IG1vbnRoIGFyZSBzZWxlY3RhYmxlLiBUaGlzIG9ubHkgYXBwbGllcyBpZiB0aGUgc2hvd090aGVyTW9udGhzIG9wdGlvbiBpcyBzZXQgdG8gdHJ1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2VsZWN0T3RoZXJNb250aHM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBkaXNwbGF5cyBhIGJ1dHRvbiB3aXRoIGljb24gbmV4dCB0byBpbnB1dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2hvd0ljb246IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSWNvbiBvZiB0aGUgY2FsZW5kYXIgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUYXJnZXQgZWxlbWVudCB0byBhdHRhY2ggdGhlIG92ZXJsYXksIHZhbGlkIHZhbHVlcyBhcmUgXCJib2R5XCIgb3IgYSBsb2NhbCBuZy10ZW1wbGF0ZSB2YXJpYWJsZSBvZiBhbm90aGVyIGVsZW1lbnQgKG5vdGU6IHVzZSBiaW5kaW5nIHdpdGggYnJhY2tldHMgZm9yIHRlbXBsYXRlIHZhcmlhYmxlcywgZS5nLiBbYXBwZW5kVG9dPVwibXlkaXZcIiBmb3IgYSBkaXYgZWxlbWVudCBoYXZpbmcjbXlkaXYgYXMgdmFyaWFibGUgbmFtZSkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXBwZW5kVG86IEhUTUxFbGVtZW50IHwgRWxlbWVudFJlZiB8IFRlbXBsYXRlUmVmPGFueT4gfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkIHwgYW55O1xuICAgIC8qKlxuICAgICAqIFdoZW4gc3BlY2lmaWVkLCBwcmV2ZW50cyBlbnRlcmluZyB0aGUgZGF0ZSBtYW51YWxseSB3aXRoIGtleWJvYXJkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByZWFkb25seUlucHV0OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRoZSBjdXRvZmYgeWVhciBmb3IgZGV0ZXJtaW5pbmcgdGhlIGNlbnR1cnkgZm9yIGEgZGF0ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG9ydFllYXJDdXRvZmY6IGFueSA9ICcrMTAnO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIG1vbnRoIHNob3VsZCBiZSByZW5kZXJlZCBhcyBhIGRyb3Bkb3duIGluc3RlYWQgb2YgdGV4dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVwcmVjYXRlZCBOYXZpZ2F0b3IgaXMgYWx3YXlzIG9uLlxuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBtb250aE5hdmlnYXRvcjogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSB5ZWFyIHNob3VsZCBiZSByZW5kZXJlZCBhcyBhIGRyb3Bkb3duIGluc3RlYWQgb2YgdGV4dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVwcmVjYXRlZCAgTmF2aWdhdG9yIGlzIGFsd2F5cyBvbi5cbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgeWVhck5hdmlnYXRvcjogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgMTIgb3IgMjQgaG91ciBmb3JtYXQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaG91ckZvcm1hdDogc3RyaW5nID0gJzI0JztcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgdGltZXBpY2tlciBvbmx5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSB0aW1lT25seTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBIb3VycyB0byBjaGFuZ2UgcGVyIHN0ZXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgc3RlcEhvdXI6IG51bWJlciA9IDE7XG4gICAgLyoqXG4gICAgICogTWludXRlcyB0byBjaGFuZ2UgcGVyIHN0ZXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgc3RlcE1pbnV0ZTogbnVtYmVyID0gMTtcbiAgICAvKipcbiAgICAgKiBTZWNvbmRzIHRvIGNoYW5nZSBwZXIgc3RlcC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBzdGVwU2Vjb25kOiBudW1iZXIgPSAxO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgc2Vjb25kcyBpbiB0aW1lIHBpY2tlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2hvd1NlY29uZHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IGFuIGlucHV0IGZpZWxkIG11c3QgYmUgZmlsbGVkIG91dCBiZWZvcmUgc3VibWl0dGluZyB0aGUgZm9ybS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcmVxdWlyZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBkaXNhYmxlZCwgZGF0ZXBpY2tlciB3aWxsIG5vdCBiZSB2aXNpYmxlIHdpdGggaW5wdXQgZm9jdXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dPbkZvY3VzOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGNhbGVuZGFyIHdpbGwgc2hvdyB3ZWVrIG51bWJlcnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dXZWVrOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBjYWxlbmRhciB3aWxsIHN0YXJ0IHdlZWsgbnVtYmVycyBmcm9tIGZpcnN0IGRheSBvZiB0aGUgeWVhci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdGFydFdlZWtGcm9tRmlyc3REYXlPZlllYXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGEgY2xlYXIgaWNvbiBpcyBkaXNwbGF5ZWQgdG8gY2xlYXIgdGhlIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93Q2xlYXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIHRoZSB2YWx1ZSB0byB3cml0ZSBiYWNrIHRvIG5nTW9kZWwsIGRlZmF1bHQgaXMgZGF0ZSBhbmQgYWx0ZXJuYXRpdmUgaXMgc3RyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRhdGFUeXBlOiBzdHJpbmcgPSAnZGF0ZSc7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgcXVhbnRpdHkgb2YgdGhlIHNlbGVjdGlvbiwgdmFsaWQgdmFsdWVzIGFyZSBcInNpbmdsZVwiLCBcIm11bHRpcGxlXCIgYW5kIFwicmFuZ2VcIi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZWxlY3Rpb25Nb2RlOiAnc2luZ2xlJyB8ICdtdWx0aXBsZScgfCAncmFuZ2UnIHwgdW5kZWZpbmVkID0gJ3NpbmdsZSc7XG4gICAgLyoqXG4gICAgICogTWF4aW11bSBudW1iZXIgb2Ygc2VsZWN0YWJsZSBkYXRlcyBpbiBtdWx0aXBsZSBtb2RlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIG1heERhdGVDb3VudDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZGlzcGxheSB0b2RheSBhbmQgY2xlYXIgYnV0dG9ucyBhdCB0aGUgZm9vdGVyXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dCdXR0b25CYXI6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIHRvZGF5IGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b2RheUJ1dHRvblN0eWxlQ2xhc3M6IHN0cmluZyA9ICdwLWJ1dHRvbi10ZXh0JztcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY2xlYXIgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNsZWFyQnV0dG9uU3R5bGVDbGFzczogc3RyaW5nID0gJ3AtYnV0dG9uLXRleHQnO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCBzaG91bGQgYXV0b21hdGljYWxseSBnZXQgZm9jdXMgb24gbG9hZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYXV0b2ZvY3VzOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gYXV0b21hdGljYWxseSBtYW5hZ2UgbGF5ZXJpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIEJhc2UgekluZGV4IHZhbHVlIHRvIHVzZSBpbiBsYXllcmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBkYXRldGltZXBpY2tlciBjb250YWluZXIgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwYW5lbFN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGRhdGV0aW1lcGlja2VyIGNvbnRhaW5lciBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGU6IGFueTtcbiAgICAvKipcbiAgICAgKiBLZWVwIGludmFsaWQgdmFsdWUgd2hlbiBpbnB1dCBibHVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBrZWVwSW52YWxpZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gaGlkZSB0aGUgb3ZlcmxheSBvbiBkYXRlIHNlbGVjdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgaGlkZU9uRGF0ZVRpbWVTZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCwgY2FsZW5kYXIgb3ZlcmxheSBpcyBkaXNwbGF5ZWQgYXMgb3B0aW1pemVkIGZvciB0b3VjaCBkZXZpY2VzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSB0b3VjaFVJOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNlcGFyYXRvciBvZiB0aW1lIHNlbGVjdG9yLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRpbWVTZXBhcmF0b3I6IHN0cmluZyA9ICc6JztcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGNhbiBvbmx5IGZvY3VzIG9uIGVsZW1lbnRzIGluc2lkZSB0aGUgY2FsZW5kYXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGZvY3VzVHJhcDogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbiBvcHRpb25zIG9mIHRoZSBzaG93IGFuaW1hdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcuMTJzIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJztcbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9uIG9wdGlvbnMgb2YgdGhlIGhpZGUgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xcyBsaW5lYXInO1xuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIHRoZSBlbGVtZW50IGluIHRhYmJpbmcgb3JkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgdGFiaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IG1pbkRhdGUoKTogRGF0ZSB8IHVuZGVmaW5lZCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgICB9XG4gICAgc2V0IG1pbkRhdGUoZGF0ZTogRGF0ZSB8IHVuZGVmaW5lZCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWluRGF0ZSA9IGRhdGU7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE1vbnRoICE9IHVuZGVmaW5lZCAmJiB0aGlzLmN1cnJlbnRNb250aCAhPSBudWxsICYmIHRoaXMuY3VycmVudFllYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IG1heERhdGUoKTogRGF0ZSB8IHVuZGVmaW5lZCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgICB9XG4gICAgc2V0IG1heERhdGUoZGF0ZTogRGF0ZSB8IHVuZGVmaW5lZCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWF4RGF0ZSA9IGRhdGU7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE1vbnRoICE9IHVuZGVmaW5lZCAmJiB0aGlzLmN1cnJlbnRNb250aCAhPSBudWxsICYmIHRoaXMuY3VycmVudFllYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcnJheSB3aXRoIGRhdGVzIHRoYXQgc2hvdWxkIGJlIGRpc2FibGVkIChub3Qgc2VsZWN0YWJsZSkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGRpc2FibGVkRGF0ZXMoKTogRGF0ZVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkRGF0ZXM7XG4gICAgfVxuICAgIHNldCBkaXNhYmxlZERhdGVzKGRpc2FibGVkRGF0ZXM6IERhdGVbXSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZERhdGVzID0gZGlzYWJsZWREYXRlcztcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE1vbnRoICE9IHVuZGVmaW5lZCAmJiB0aGlzLmN1cnJlbnRNb250aCAhPSBudWxsICYmIHRoaXMuY3VycmVudFllYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcnJheSB3aXRoIHdlZWtkYXkgbnVtYmVycyB0aGF0IHNob3VsZCBiZSBkaXNhYmxlZCAobm90IHNlbGVjdGFibGUpLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBkaXNhYmxlZERheXMoKTogbnVtYmVyW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWREYXlzO1xuICAgIH1cbiAgICBzZXQgZGlzYWJsZWREYXlzKGRpc2FibGVkRGF5czogbnVtYmVyW10pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWREYXlzID0gZGlzYWJsZWREYXlzO1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCAhPSB1bmRlZmluZWQgJiYgdGhpcy5jdXJyZW50TW9udGggIT0gbnVsbCAmJiB0aGlzLmN1cnJlbnRZZWFyKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHJhbmdlIG9mIHllYXJzIGRpc3BsYXllZCBpbiB0aGUgeWVhciBkcm9wLWRvd24gaW4gKG5ubm46bm5ubikgZm9ybWF0IHN1Y2ggYXMgKDIwMDA6MjAyMCkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgWWVhcnMgYXJlIGJhc2VkIG9uIGRlY2FkZXMgYnkgZGVmYXVsdC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgeWVhclJhbmdlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl95ZWFyUmFuZ2U7XG4gICAgfVxuICAgIHNldCB5ZWFyUmFuZ2UoeWVhclJhbmdlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5feWVhclJhbmdlID0geWVhclJhbmdlO1xuXG4gICAgICAgIGlmICh5ZWFyUmFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHllYXJzID0geWVhclJhbmdlLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICBjb25zdCB5ZWFyU3RhcnQgPSBwYXJzZUludCh5ZWFyc1swXSk7XG4gICAgICAgICAgICBjb25zdCB5ZWFyRW5kID0gcGFyc2VJbnQoeWVhcnNbMV0pO1xuXG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlWWVhck9wdGlvbnMoeWVhclN0YXJ0LCB5ZWFyRW5kKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgdGltZXBpY2tlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc2hvd1RpbWUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93VGltZTtcbiAgICB9XG4gICAgc2V0IHNob3dUaW1lKHNob3dUaW1lOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Nob3dUaW1lID0gc2hvd1RpbWU7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEhvdXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5pbml0VGltZSh0aGlzLnZhbHVlIHx8IG5ldyBEYXRlKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBvcHRpb25zIGZvciByZXNwb25zaXZlIGRlc2lnbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgcmVzcG9uc2l2ZU9wdGlvbnMoKTogQ2FsZW5kYXJSZXNwb25zaXZlT3B0aW9uc1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3BvbnNpdmVPcHRpb25zO1xuICAgIH1cbiAgICBzZXQgcmVzcG9uc2l2ZU9wdGlvbnMocmVzcG9uc2l2ZU9wdGlvbnM6IENhbGVuZGFyUmVzcG9uc2l2ZU9wdGlvbnNbXSkge1xuICAgICAgICB0aGlzLl9yZXNwb25zaXZlT3B0aW9ucyA9IHJlc3BvbnNpdmVPcHRpb25zO1xuXG4gICAgICAgIHRoaXMuZGVzdHJveVJlc3BvbnNpdmVTdHlsZUVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVSZXNwb25zaXZlU3R5bGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIG1vbnRocyB0byBkaXNwbGF5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBudW1iZXJPZk1vbnRocygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZNb250aHM7XG4gICAgfVxuICAgIHNldCBudW1iZXJPZk1vbnRocyhudW1iZXJPZk1vbnRoczogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX251bWJlck9mTW9udGhzID0gbnVtYmVyT2ZNb250aHM7XG5cbiAgICAgICAgdGhpcy5kZXN0cm95UmVzcG9uc2l2ZVN0eWxlRWxlbWVudCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZVJlc3BvbnNpdmVTdHlsZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBmaXJzdCBvZiB0aGUgd2VlayBmb3IgdmFyaW91cyBkYXRlIGNhbGN1bGF0aW9ucy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgZmlyc3REYXlPZldlZWsoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcnN0RGF5T2ZXZWVrO1xuICAgIH1cbiAgICBzZXQgZmlyc3REYXlPZldlZWsoZmlyc3REYXlPZldlZWs6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9maXJzdERheU9mV2VlayA9IGZpcnN0RGF5T2ZXZWVrO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlV2Vla0RheXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3B0aW9uIHRvIHNldCBjYWxlbmRhciBsb2NhbGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgTG9jYWxlIHByb3BlcnR5IGhhcyBubyBlZmZlY3QsIHVzZSBuZXcgaTE4biBBUEkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZXQgbG9jYWxlKG5ld0xvY2FsZTogTG9jYWxlU2V0dGluZ3MpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdMb2NhbGUgcHJvcGVydHkgaGFzIG5vIGVmZmVjdCwgdXNlIG5ldyBpMThuIEFQSSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIHZpZXcgdG8gZGlzcGxheSwgdmFsaWQgdmFsdWVzIGFyZSBcImRhdGVcIiBmb3IgZGF0ZXBpY2tlciBhbmQgXCJtb250aFwiIGZvciBtb250aCBwaWNrZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHZpZXcoKTogQ2FsZW5kYXJUeXBlVmlldyB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aWV3O1xuICAgIH1cbiAgICBzZXQgdmlldyh2aWV3OiBDYWxlbmRhclR5cGVWaWV3KSB7XG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gdGhpcy5fdmlldztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBkYXRlIHRvIGhpZ2hsaWdodCBvbiBmaXJzdCBvcGVuaW5nIGlmIHRoZSBmaWVsZCBpcyBibGFuay5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgZGVmYXVsdERhdGUoKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0RGF0ZTtcbiAgICB9XG4gICAgc2V0IGRlZmF1bHREYXRlKGRlZmF1bHREYXRlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuX2RlZmF1bHREYXRlID0gZGVmYXVsdERhdGU7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBkZWZhdWx0RGF0ZSB8fCBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgdGhpcy5pbml0VGltZShkYXRlKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gZm9jdXMgb2YgaW5wdXQgZmllbGQuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBicm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gYmx1ciBvZiBpbnB1dCBmaWVsZC5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIGJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gZGF0ZSBwYW5lbCBjbG9zZWQuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSBldmVudFxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8QW5pbWF0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxBbmltYXRpb25FdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gZGF0ZSBzZWxlY3QuXG4gICAgICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gZGF0ZSB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBpbnB1dCBmaWVsZCBjbGVhcmVkLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNsZWFyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGlucHV0IGZpZWxkIGlzIGJlaW5nIHR5cGVkLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gYnJvd3NlciBldmVudFxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbklucHV0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRvZGF5IGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIHRvZGF5IGFzIGEgZGF0ZSBpbnN0YW5jZS5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Ub2RheUNsaWNrOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gY2xlYXIgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBicm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNsZWFyQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBtb250aCBpcyBjaGFuZ2VkIHVzaW5nIHRoZSBuYXZpZ2F0b3JzLlxuICAgICAqIEBwYXJhbSB7Q2FsZW5kYXJNb250aENoYW5nZUV2ZW50fSBldmVudCAtIGN1c3RvbSBtb250aCBjaGFuZ2UgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uTW9udGhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxDYWxlbmRhck1vbnRoQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhck1vbnRoQ2hhbmdlRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSB5ZWFyIGlzIGNoYW5nZWQgdXNpbmcgdGhlIG5hdmlnYXRvcnMuXG4gICAgICogQHBhcmFtIHtDYWxlbmRhclllYXJDaGFuZ2VFdmVudH0gZXZlbnQgLSBjdXN0b20geWVhciBjaGFuZ2UgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uWWVhckNoYW5nZTogRXZlbnRFbWl0dGVyPENhbGVuZGFyWWVhckNoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJZZWFyQ2hhbmdlRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gY2xpY2tlZCBvdXRzaWRlIG9mIHRoZSBkYXRlIHBhbmVsLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNsaWNrT3V0c2lkZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBkYXRlcGlja2VyIHBhbmVsIGlzIHNob3duLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNob3c6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlcyE6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPjtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgc3RhdGljOiBmYWxzZSB9KSBjb250YWluZXJWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnaW5wdXRmaWVsZCcsIHsgc3RhdGljOiBmYWxzZSB9KSBpbnB1dGZpZWxkVmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRlbnRXcmFwcGVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIHNldCBjb250ZW50KGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkID0gY29udGVudDtcblxuICAgICAgICBpZiAodGhpcy5jb250ZW50Vmlld0NoaWxkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc01vbnRoTmF2aWdhdGUpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB0aGlzLnVwZGF0ZUZvY3VzKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNNb250aE5hdmlnYXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5mb2N1cyAmJiAhdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0Rm9jdXNhYmxlQ2VsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnRlbnRWaWV3Q2hpbGQhOiBFbGVtZW50UmVmO1xuXG4gICAgdmFsdWU6IGFueTtcblxuICAgIGRhdGVzOiBOdWxsYWJsZTxEYXRlW10+O1xuXG4gICAgbW9udGhzITogTW9udGhbXTtcblxuICAgIHdlZWtEYXlzOiBOdWxsYWJsZTxzdHJpbmdbXT47XG5cbiAgICBjdXJyZW50TW9udGghOiBudW1iZXI7XG5cbiAgICBjdXJyZW50WWVhciE6IG51bWJlcjtcblxuICAgIGN1cnJlbnRIb3VyOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgY3VycmVudE1pbnV0ZTogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIGN1cnJlbnRTZWNvbmQ6IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBwbTogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBtYXNrOiBOdWxsYWJsZTxIVE1MRGl2RWxlbWVudD47XG5cbiAgICBtYXNrQ2xpY2tMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgb3ZlcmxheTogTnVsbGFibGU8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgcmVzcG9uc2l2ZVN0eWxlRWxlbWVudDogSFRNTFN0eWxlRWxlbWVudCB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBvdmVybGF5VmlzaWJsZTogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBjYWxlbmRhckVsZW1lbnQ6IE51bGxhYmxlPEhUTUxFbGVtZW50IHwgRWxlbWVudFJlZj47XG5cbiAgICB0aW1lUGlja2VyVGltZXI6IGFueTtcblxuICAgIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgYW5pbWF0aW9uRW5kTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIHRpY2tzVG8xOTcwOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgeWVhck9wdGlvbnM6IE51bGxhYmxlPG51bWJlcltdPjtcblxuICAgIGZvY3VzOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIGlzS2V5ZG93bjogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBmaWxsZWQ6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgaW5wdXRGaWVsZFZhbHVlOiBOdWxsYWJsZTxzdHJpbmc+ID0gbnVsbDtcblxuICAgIF9taW5EYXRlPzogRGF0ZSB8IG51bGw7XG5cbiAgICBfbWF4RGF0ZT86IERhdGUgfCBudWxsO1xuXG4gICAgX3Nob3dUaW1lITogYm9vbGVhbjtcblxuICAgIF95ZWFyUmFuZ2UhOiBzdHJpbmc7XG5cbiAgICBwcmV2ZW50RG9jdW1lbnRMaXN0ZW5lcjogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBkYXRlVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgaGVhZGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZm9vdGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZGlzYWJsZWREYXRlVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZGVjYWRlVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgcHJldmlvdXNJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgbmV4dEljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICB0cmlnZ2VySWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGNsZWFySWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGRlY3JlbWVudEljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBpbmNyZW1lbnRJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgaW5wdXRJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgX2Rpc2FibGVkRGF0ZXMhOiBBcnJheTxEYXRlPjtcblxuICAgIF9kaXNhYmxlZERheXMhOiBBcnJheTxudW1iZXI+O1xuXG4gICAgc2VsZWN0RWxlbWVudDogTnVsbGFibGU7XG5cbiAgICB0b2RheUVsZW1lbnQ6IE51bGxhYmxlO1xuXG4gICAgZm9jdXNFbGVtZW50OiBOdWxsYWJsZTtcblxuICAgIHNjcm9sbEhhbmRsZXI6IE51bGxhYmxlPENvbm5lY3RlZE92ZXJsYXlTY3JvbGxIYW5kbGVyPjtcblxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIG5hdmlnYXRpb25TdGF0ZTogTnVsbGFibGU8TmF2aWdhdGlvblN0YXRlPiA9IG51bGw7XG5cbiAgICBpc01vbnRoTmF2aWdhdGU6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgaW5pdGlhbGl6ZWQ6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgdHJhbnNsYXRpb25TdWJzY3JpcHRpb246IE51bGxhYmxlPFN1YnNjcmlwdGlvbj47XG5cbiAgICBfbG9jYWxlITogTG9jYWxlU2V0dGluZ3M7XG5cbiAgICBfcmVzcG9uc2l2ZU9wdGlvbnMhOiBDYWxlbmRhclJlc3BvbnNpdmVPcHRpb25zW107XG5cbiAgICBjdXJyZW50VmlldzogTnVsbGFibGU8c3RyaW5nPjtcblxuICAgIGF0dHJpYnV0ZVNlbGVjdG9yOiBOdWxsYWJsZTxzdHJpbmc+O1xuXG4gICAgcGFuZWxJZDogTnVsbGFibGU8c3RyaW5nPjtcblxuICAgIF9udW1iZXJPZk1vbnRoczogbnVtYmVyID0gMTtcblxuICAgIF9maXJzdERheU9mV2VlayE6IG51bWJlcjtcblxuICAgIF92aWV3OiBDYWxlbmRhclR5cGVWaWV3ID0gJ2RhdGUnO1xuXG4gICAgcHJldmVudEZvY3VzOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIF9kZWZhdWx0RGF0ZSE6IERhdGU7XG5cbiAgICBwcml2YXRlIHdpbmRvdzogV2luZG93O1xuXG4gICAgZ2V0IGxvY2FsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbiAgICB9XG5cbiAgICBnZXQgaWNvbkJ1dHRvbkFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWNvbkFyaWFMYWJlbCA/IHRoaXMuaWNvbkFyaWFMYWJlbCA6IHRoaXMuZ2V0VHJhbnNsYXRpb24oJ2Nob29zZURhdGUnKTtcbiAgICB9XG5cbiAgICBnZXQgcHJldkljb25BcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRWaWV3ID09PSAneWVhcicgPyB0aGlzLmdldFRyYW5zbGF0aW9uKCdwcmV2RGVjYWRlJykgOiB0aGlzLmN1cnJlbnRWaWV3ID09PSAnbW9udGgnID8gdGhpcy5nZXRUcmFuc2xhdGlvbigncHJldlllYXInKSA6IHRoaXMuZ2V0VHJhbnNsYXRpb24oJ3ByZXZNb250aCcpO1xuICAgIH1cblxuICAgIGdldCBuZXh0SWNvbkFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFZpZXcgPT09ICd5ZWFyJyA/IHRoaXMuZ2V0VHJhbnNsYXRpb24oJ25leHREZWNhZGUnKSA6IHRoaXMuY3VycmVudFZpZXcgPT09ICdtb250aCcgPyB0aGlzLmdldFRyYW5zbGF0aW9uKCduZXh0WWVhcicpIDogdGhpcy5nZXRUcmFuc2xhdGlvbignbmV4dE1vbnRoJyk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgem9uZTogTmdab25lLCBwcml2YXRlIGNvbmZpZzogUHJpbWVOR0NvbmZpZywgcHVibGljIG92ZXJsYXlTZXJ2aWNlOiBPdmVybGF5U2VydmljZSkge1xuICAgICAgICB0aGlzLndpbmRvdyA9IHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcgYXMgV2luZG93O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZVNlbGVjdG9yID0gVW5pcXVlQ29tcG9uZW50SWQoKTtcbiAgICAgICAgdGhpcy5wYW5lbElkID0gdGhpcy5hdHRyaWJ1dGVTZWxlY3RvciArICdfcGFuZWwnO1xuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5kZWZhdWx0RGF0ZSB8fCBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLmNyZWF0ZVJlc3BvbnNpdmVTdHlsZSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50WWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgdGhpcy55ZWFyT3B0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gdGhpcy52aWV3O1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXcgPT09ICdkYXRlJykge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVXZWVrRGF5cygpO1xuICAgICAgICAgICAgdGhpcy5pbml0VGltZShkYXRlKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgICAgIHRoaXMudGlja3NUbzE5NzAgPSAoKDE5NzAgLSAxKSAqIDM2NSArIE1hdGguZmxvb3IoMTk3MCAvIDQpIC0gTWF0aC5mbG9vcigxOTcwIC8gMTAwKSArIE1hdGguZmxvb3IoMTk3MCAvIDQwMCkpICogMjQgKiA2MCAqIDYwICogMTAwMDAwMDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5jb25maWcudHJhbnNsYXRpb25PYnNlcnZlci5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVXZWVrRGF5cygpO1xuICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY2FkZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdkaXNhYmxlZERhdGUnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkRGF0ZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpbnB1dGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwcmV2aW91c2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICduZXh0aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAndHJpZ2dlcmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFyaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2RlY3JlbWVudGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY3JlbWVudEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaW5jcmVtZW50aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb3RlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlubGluZSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkICYmIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSh0aGlzLmF0dHJpYnV0ZVNlbGVjdG9yLCAnJyk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRGb2N1c2FibGVDZWxsKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubnVtYmVyT2ZNb250aHMgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudFZpZXdDaGlsZCAmJiB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5jb250YWluZXJWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFRyYW5zbGF0aW9uKG9wdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihvcHRpb24pO1xuICAgIH1cblxuICAgIHBvcHVsYXRlWWVhck9wdGlvbnMoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy55ZWFyT3B0aW9ucyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy55ZWFyT3B0aW9ucy5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlV2Vla0RheXMoKSB7XG4gICAgICAgIHRoaXMud2Vla0RheXMgPSBbXTtcbiAgICAgICAgbGV0IGRheUluZGV4ID0gdGhpcy5nZXRGaXJzdERhdGVPZldlZWsoKTtcbiAgICAgICAgbGV0IGRheUxhYmVscyA9IHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FU19NSU4pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgdGhpcy53ZWVrRGF5cy5wdXNoKGRheUxhYmVsc1tkYXlJbmRleF0pO1xuICAgICAgICAgICAgZGF5SW5kZXggPSBkYXlJbmRleCA9PSA2ID8gMCA6ICsrZGF5SW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb250aFBpY2tlclZhbHVlcygpIHtcbiAgICAgICAgbGV0IG1vbnRoUGlja2VyVmFsdWVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDExOyBpKyspIHtcbiAgICAgICAgICAgIG1vbnRoUGlja2VyVmFsdWVzLnB1c2godGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24oJ21vbnRoTmFtZXNTaG9ydCcpW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb250aFBpY2tlclZhbHVlcztcbiAgICB9XG5cbiAgICB5ZWFyUGlja2VyVmFsdWVzKCkge1xuICAgICAgICBsZXQgeWVhclBpY2tlclZhbHVlcyA9IFtdO1xuICAgICAgICBsZXQgYmFzZSA9IDxudW1iZXI+dGhpcy5jdXJyZW50WWVhciAtICg8bnVtYmVyPnRoaXMuY3VycmVudFllYXIgJSAxMCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgeWVhclBpY2tlclZhbHVlcy5wdXNoKGJhc2UgKyBpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB5ZWFyUGlja2VyVmFsdWVzO1xuICAgIH1cblxuICAgIGNyZWF0ZU1vbnRocyhtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tb250aHMgPSB0aGlzLm1vbnRocyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtYmVyT2ZNb250aHM7IGkrKykge1xuICAgICAgICAgICAgbGV0IG0gPSBtb250aCArIGk7XG4gICAgICAgICAgICBsZXQgeSA9IHllYXI7XG4gICAgICAgICAgICBpZiAobSA+IDExKSB7XG4gICAgICAgICAgICAgICAgbSA9IChtICUgMTEpIC0gMTtcbiAgICAgICAgICAgICAgICB5ID0geWVhciArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubW9udGhzLnB1c2godGhpcy5jcmVhdGVNb250aChtLCB5KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRXZWVrTnVtYmVyKGRhdGU6IERhdGUpIHtcbiAgICAgICAgbGV0IGNoZWNrRGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRXZWVrRnJvbUZpcnN0RGF5T2ZZZWFyKSB7XG4gICAgICAgICAgICBsZXQgZmlyc3REYXlPZldlZWs6IG51bWJlciA9ICt0aGlzLmdldEZpcnN0RGF0ZU9mV2VlaygpO1xuICAgICAgICAgICAgY2hlY2tEYXRlLnNldERhdGUoY2hlY2tEYXRlLmdldERhdGUoKSArIDYgKyBmaXJzdERheU9mV2VlayAtIGNoZWNrRGF0ZS5nZXREYXkoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVja0RhdGUuc2V0RGF0ZShjaGVja0RhdGUuZ2V0RGF0ZSgpICsgNCAtIChjaGVja0RhdGUuZ2V0RGF5KCkgfHwgNykpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0aW1lID0gY2hlY2tEYXRlLmdldFRpbWUoKTtcbiAgICAgICAgY2hlY2tEYXRlLnNldE1vbnRoKDApO1xuICAgICAgICBjaGVja0RhdGUuc2V0RGF0ZSgxKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yb3VuZCgodGltZSAtIGNoZWNrRGF0ZS5nZXRUaW1lKCkpIC8gODY0MDAwMDApIC8gNykgKyAxO1xuICAgIH1cblxuICAgIGNyZWF0ZU1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IE1vbnRoIHtcbiAgICAgICAgbGV0IGRhdGVzID0gW107XG4gICAgICAgIGxldCBmaXJzdERheSA9IHRoaXMuZ2V0Rmlyc3REYXlPZk1vbnRoSW5kZXgobW9udGgsIHllYXIpO1xuICAgICAgICBsZXQgZGF5c0xlbmd0aCA9IHRoaXMuZ2V0RGF5c0NvdW50SW5Nb250aChtb250aCwgeWVhcik7XG4gICAgICAgIGxldCBwcmV2TW9udGhEYXlzTGVuZ3RoID0gdGhpcy5nZXREYXlzQ291bnRJblByZXZNb250aChtb250aCwgeWVhcik7XG4gICAgICAgIGxldCBkYXlObyA9IDE7XG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCB3ZWVrTnVtYmVycyA9IFtdO1xuICAgICAgICBsZXQgbW9udGhSb3dzID0gTWF0aC5jZWlsKChkYXlzTGVuZ3RoICsgZmlyc3REYXkpIC8gNyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb250aFJvd3M7IGkrKykge1xuICAgICAgICAgICAgbGV0IHdlZWsgPSBbXTtcblxuICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBwcmV2TW9udGhEYXlzTGVuZ3RoIC0gZmlyc3REYXkgKyAxOyBqIDw9IHByZXZNb250aERheXNMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJldiA9IHRoaXMuZ2V0UHJldmlvdXNNb250aEFuZFllYXIobW9udGgsIHllYXIpO1xuICAgICAgICAgICAgICAgICAgICB3ZWVrLnB1c2goeyBkYXk6IGosIG1vbnRoOiBwcmV2Lm1vbnRoLCB5ZWFyOiBwcmV2LnllYXIsIG90aGVyTW9udGg6IHRydWUsIHRvZGF5OiB0aGlzLmlzVG9kYXkodG9kYXksIGosIHByZXYubW9udGgsIHByZXYueWVhciksIHNlbGVjdGFibGU6IHRoaXMuaXNTZWxlY3RhYmxlKGosIHByZXYubW9udGgsIHByZXYueWVhciwgdHJ1ZSkgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHJlbWFpbmluZ0RheXNMZW5ndGggPSA3IC0gd2Vlay5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZW1haW5pbmdEYXlzTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgd2Vlay5wdXNoKHsgZGF5OiBkYXlObywgbW9udGg6IG1vbnRoLCB5ZWFyOiB5ZWFyLCB0b2RheTogdGhpcy5pc1RvZGF5KHRvZGF5LCBkYXlObywgbW9udGgsIHllYXIpLCBzZWxlY3RhYmxlOiB0aGlzLmlzU2VsZWN0YWJsZShkYXlObywgbW9udGgsIHllYXIsIGZhbHNlKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgZGF5Tm8rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNzsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXlObyA+IGRheXNMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXh0ID0gdGhpcy5nZXROZXh0TW9udGhBbmRZZWFyKG1vbnRoLCB5ZWFyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWsucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiBkYXlObyAtIGRheXNMZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9udGg6IG5leHQubW9udGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogbmV4dC55ZWFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyTW9udGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kYXk6IHRoaXMuaXNUb2RheSh0b2RheSwgZGF5Tm8gLSBkYXlzTGVuZ3RoLCBuZXh0Lm1vbnRoLCBuZXh0LnllYXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGU6IHRoaXMuaXNTZWxlY3RhYmxlKGRheU5vIC0gZGF5c0xlbmd0aCwgbmV4dC5tb250aCwgbmV4dC55ZWFyLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrLnB1c2goeyBkYXk6IGRheU5vLCBtb250aDogbW9udGgsIHllYXI6IHllYXIsIHRvZGF5OiB0aGlzLmlzVG9kYXkodG9kYXksIGRheU5vLCBtb250aCwgeWVhciksIHNlbGVjdGFibGU6IHRoaXMuaXNTZWxlY3RhYmxlKGRheU5vLCBtb250aCwgeWVhciwgZmFsc2UpIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZGF5Tm8rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNob3dXZWVrKSB7XG4gICAgICAgICAgICAgICAgd2Vla051bWJlcnMucHVzaCh0aGlzLmdldFdlZWtOdW1iZXIobmV3IERhdGUod2Vla1swXS55ZWFyLCB3ZWVrWzBdLm1vbnRoLCB3ZWVrWzBdLmRheSkpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0ZXMucHVzaCh3ZWVrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtb250aDogbW9udGgsXG4gICAgICAgICAgICB5ZWFyOiB5ZWFyLFxuICAgICAgICAgICAgZGF0ZXM6IDxhbnk+ZGF0ZXMsXG4gICAgICAgICAgICB3ZWVrTnVtYmVyczogd2Vla051bWJlcnNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpbml0VGltZShkYXRlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMucG0gPSBkYXRlLmdldEhvdXJzKCkgPiAxMTtcblxuICAgICAgICBpZiAodGhpcy5zaG93VGltZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSBkYXRlLmdldFNlY29uZHMoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudEhvdXJQTShkYXRlLmdldEhvdXJzKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGltZU9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuYXZCYWNrd2FyZChldmVudDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc01vbnRoTmF2aWdhdGUgPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRWaWV3ID09PSAnbW9udGgnKSB7XG4gICAgICAgICAgICB0aGlzLmRlY3JlbWVudFllYXIoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFZpZXcgPT09ICd5ZWFyJykge1xuICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnREZWNhZGUoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudE1vbnRoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSAxMTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlY3JlbWVudFllYXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGgtLTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbk1vbnRoQ2hhbmdlLmVtaXQoeyBtb250aDogdGhpcy5jdXJyZW50TW9udGggKyAxLCB5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyIH0pO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmF2Rm9yd2FyZChldmVudDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc01vbnRoTmF2aWdhdGUgPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRWaWV3ID09PSAnbW9udGgnKSB7XG4gICAgICAgICAgICB0aGlzLmluY3JlbWVudFllYXIoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFZpZXcgPT09ICd5ZWFyJykge1xuICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnREZWNhZGUoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudE1vbnRoID09PSAxMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmluY3JlbWVudFllYXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGgrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbk1vbnRoQ2hhbmdlLmVtaXQoeyBtb250aDogdGhpcy5jdXJyZW50TW9udGggKyAxLCB5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyIH0pO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjcmVtZW50WWVhcigpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50WWVhci0tO1xuICAgICAgICBsZXQgX3llYXJPcHRpb25zID0gPG51bWJlcltdPnRoaXMueWVhck9wdGlvbnM7XG5cbiAgICAgICAgaWYgKHRoaXMueWVhck5hdmlnYXRvciAmJiB0aGlzLmN1cnJlbnRZZWFyIDwgX3llYXJPcHRpb25zWzBdKSB7XG4gICAgICAgICAgICBsZXQgZGlmZmVyZW5jZSA9IF95ZWFyT3B0aW9uc1tfeWVhck9wdGlvbnMubGVuZ3RoIC0gMV0gLSBfeWVhck9wdGlvbnNbMF07XG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlWWVhck9wdGlvbnMoX3llYXJPcHRpb25zWzBdIC0gZGlmZmVyZW5jZSwgX3llYXJPcHRpb25zW195ZWFyT3B0aW9ucy5sZW5ndGggLSAxXSAtIGRpZmZlcmVuY2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjcmVtZW50RGVjYWRlKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gdGhpcy5jdXJyZW50WWVhciAtIDEwO1xuICAgIH1cblxuICAgIGluY3JlbWVudERlY2FkZSgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50WWVhciA9IHRoaXMuY3VycmVudFllYXIgKyAxMDtcbiAgICB9XG5cbiAgICBpbmNyZW1lbnRZZWFyKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRZZWFyKys7XG4gICAgICAgIGxldCBfeWVhck9wdGlvbnMgPSA8bnVtYmVyW10+dGhpcy55ZWFyT3B0aW9ucztcblxuICAgICAgICBpZiAodGhpcy55ZWFyTmF2aWdhdG9yICYmIHRoaXMuY3VycmVudFllYXIgPiBfeWVhck9wdGlvbnNbX3llYXJPcHRpb25zLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICBsZXQgZGlmZmVyZW5jZSA9IF95ZWFyT3B0aW9uc1tfeWVhck9wdGlvbnMubGVuZ3RoIC0gMV0gLSBfeWVhck9wdGlvbnNbMF07XG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlWWVhck9wdGlvbnMoX3llYXJPcHRpb25zWzBdICsgZGlmZmVyZW5jZSwgX3llYXJPcHRpb25zW195ZWFyT3B0aW9ucy5sZW5ndGggLSAxXSArIGRpZmZlcmVuY2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3dpdGNoVG9Nb250aFZpZXcoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0Q3VycmVudFZpZXcoJ21vbnRoJyk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgc3dpdGNoVG9ZZWFyVmlldyhldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRDdXJyZW50VmlldygneWVhcicpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRGF0ZVNlbGVjdChldmVudDogRXZlbnQsIGRhdGVNZXRhOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgIWRhdGVNZXRhLnNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkgJiYgdGhpcy5pc1NlbGVjdGVkKGRhdGVNZXRhKSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUuZmlsdGVyKChkYXRlOiBEYXRlLCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNEYXRlRXF1YWxzKGRhdGUsIGRhdGVNZXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHRoaXMudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvdWxkU2VsZWN0RGF0ZShkYXRlTWV0YSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUoZGF0ZU1ldGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkgJiYgdGhpcy5oaWRlT25EYXRlVGltZVNlbGVjdCkgfHwgKHRoaXMuaXNSYW5nZVNlbGVjdGlvbigpICYmIHRoaXMudmFsdWVbMV0pKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hc2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlTW9kYWxpdHkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSwgMTUwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHNob3VsZFNlbGVjdERhdGUoZGF0ZU1ldGE6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkpIHJldHVybiB0aGlzLm1heERhdGVDb3VudCAhPSBudWxsID8gdGhpcy5tYXhEYXRlQ291bnQgPiAodGhpcy52YWx1ZSA/IHRoaXMudmFsdWUubGVuZ3RoIDogMCkgOiB0cnVlO1xuICAgICAgICBlbHNlIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIG9uTW9udGhTZWxlY3QoZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnZpZXcgPT09ICdtb250aCcpIHtcbiAgICAgICAgICAgIHRoaXMub25EYXRlU2VsZWN0KGV2ZW50LCB7IHllYXI6IHRoaXMuY3VycmVudFllYXIsIG1vbnRoOiBpbmRleCwgZGF5OiAxLCBzZWxlY3RhYmxlOiB0cnVlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSBpbmRleDtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFZpZXcoJ2RhdGUnKTtcbiAgICAgICAgICAgIHRoaXMub25Nb250aENoYW5nZS5lbWl0KHsgbW9udGg6IHRoaXMuY3VycmVudE1vbnRoICsgMSwgeWVhcjogdGhpcy5jdXJyZW50WWVhciB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uWWVhclNlbGVjdChldmVudDogRXZlbnQsIHllYXI6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy52aWV3ID09PSAneWVhcicpIHtcbiAgICAgICAgICAgIHRoaXMub25EYXRlU2VsZWN0KGV2ZW50LCB7IHllYXI6IHllYXIsIG1vbnRoOiAwLCBkYXk6IDEsIHNlbGVjdGFibGU6IHRydWUgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0geWVhcjtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFZpZXcoJ21vbnRoJyk7XG4gICAgICAgICAgICB0aGlzLm9uWWVhckNoYW5nZS5lbWl0KHsgbW9udGg6IHRoaXMuY3VycmVudE1vbnRoICsgMSwgeWVhcjogdGhpcy5jdXJyZW50WWVhciB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUlucHV0ZmllbGQoKSB7XG4gICAgICAgIGxldCBmb3JtYXR0ZWRWYWx1ZSA9ICcnO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmZvcm1hdERhdGVUaW1lKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZUFzU3RyaW5nID0gdGhpcy5mb3JtYXREYXRlVGltZSh0aGlzLnZhbHVlW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgKz0gZGF0ZUFzU3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gdGhpcy52YWx1ZS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSArPSB0aGlzLm11bHRpcGxlU2VwYXJhdG9yICsgJyAnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydERhdGUgPSB0aGlzLnZhbHVlWzBdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kRGF0ZSA9IHRoaXMudmFsdWVbMV07XG5cbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmZvcm1hdERhdGVUaW1lKHN0YXJ0RGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmREYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSArPSAnICcgKyB0aGlzLnJhbmdlU2VwYXJhdG9yICsgJyAnICsgdGhpcy5mb3JtYXREYXRlVGltZShlbmREYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5wdXRGaWVsZFZhbHVlID0gZm9ybWF0dGVkVmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZCAmJiB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmlucHV0RmllbGRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcm1hdERhdGVUaW1lKGRhdGU6IGFueSkge1xuICAgICAgICBsZXQgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmtlZXBJbnZhbGlkID8gZGF0ZSA6IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZERhdGUoZGF0ZSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVPbmx5KSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmZvcm1hdFRpbWUoZGF0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXREYXRlKGRhdGUsIHRoaXMuZ2V0RGF0ZUZvcm1hdCgpKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG93VGltZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSArPSAnICcgKyB0aGlzLmZvcm1hdFRpbWUoZGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YVR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IGRhdGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkVmFsdWU7XG4gICAgfVxuXG4gICAgc2V0Q3VycmVudEhvdXJQTShob3VyczogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgdGhpcy5wbSA9IGhvdXJzID4gMTE7XG4gICAgICAgICAgICBpZiAoaG91cnMgPj0gMTIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gaG91cnMgPT0gMTIgPyAxMiA6IGhvdXJzIC0gMTI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBob3VycyA9PSAwID8gMTIgOiBob3VycztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBob3VycztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEN1cnJlbnRWaWV3KGN1cnJlbnRWaWV3OiBDYWxlbmRhclR5cGVWaWV3KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSBjdXJyZW50VmlldztcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIHRoaXMuYWxpZ25PdmVybGF5KCk7XG4gICAgfVxuXG4gICAgc2VsZWN0RGF0ZShkYXRlTWV0YTogYW55KSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoZGF0ZU1ldGEueWVhciwgZGF0ZU1ldGEubW9udGgsIGRhdGVNZXRhLmRheSk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRIb3VyID09PSAxMikgZGF0ZS5zZXRIb3Vycyh0aGlzLnBtID8gMTIgOiAwKTtcbiAgICAgICAgICAgICAgICBlbHNlIGRhdGUuc2V0SG91cnModGhpcy5wbSA/IDxudW1iZXI+dGhpcy5jdXJyZW50SG91ciArIDEyIDogPG51bWJlcj50aGlzLmN1cnJlbnRIb3VyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRIb3Vycyg8bnVtYmVyPnRoaXMuY3VycmVudEhvdXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRlLnNldE1pbnV0ZXMoPG51bWJlcj50aGlzLmN1cnJlbnRNaW51dGUpO1xuICAgICAgICAgICAgZGF0ZS5zZXRTZWNvbmRzKDxudW1iZXI+dGhpcy5jdXJyZW50U2Vjb25kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgdGhpcy5taW5EYXRlID4gZGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXMubWluRGF0ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudEhvdXJQTShkYXRlLmdldEhvdXJzKCkpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSBkYXRlLmdldFNlY29uZHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdGhpcy5tYXhEYXRlIDwgZGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXMubWF4RGF0ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudEhvdXJQTShkYXRlLmdldEhvdXJzKCkpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSBkYXRlLmdldFNlY29uZHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZGF0ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwodGhpcy52YWx1ZSA/IFsuLi50aGlzLnZhbHVlLCBkYXRlXSA6IFtkYXRlXSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0RGF0ZSA9IHRoaXMudmFsdWVbMF07XG4gICAgICAgICAgICAgICAgbGV0IGVuZERhdGUgPSB0aGlzLnZhbHVlWzFdO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFlbmREYXRlICYmIGRhdGUuZ2V0VGltZSgpID49IHN0YXJ0RGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZSA9IGRhdGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlID0gZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChbc3RhcnREYXRlLCBlbmREYXRlXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoW2RhdGUsIG51bGxdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25TZWxlY3QuZW1pdChkYXRlKTtcbiAgICB9XG5cbiAgICB1cGRhdGVNb2RlbCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5kYXRhVHlwZSA9PSAnZGF0ZScpIHtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGFUeXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuZm9ybWF0RGF0ZVRpbWUodGhpcy52YWx1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgc3RyaW5nQXJyVmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZ0FyclZhbHVlID0gdGhpcy52YWx1ZS5tYXAoKGRhdGU6IERhdGUpID0+IHRoaXMuZm9ybWF0RGF0ZVRpbWUoZGF0ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2Uoc3RyaW5nQXJyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Rmlyc3REYXlPZk1vbnRoSW5kZXgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBkYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBkYXkuc2V0RGF0ZSgxKTtcbiAgICAgICAgZGF5LnNldE1vbnRoKG1vbnRoKTtcbiAgICAgICAgZGF5LnNldEZ1bGxZZWFyKHllYXIpO1xuXG4gICAgICAgIGxldCBkYXlJbmRleCA9IGRheS5nZXREYXkoKSArIHRoaXMuZ2V0U3VuZGF5SW5kZXgoKTtcbiAgICAgICAgcmV0dXJuIGRheUluZGV4ID49IDcgPyBkYXlJbmRleCAtIDcgOiBkYXlJbmRleDtcbiAgICB9XG5cbiAgICBnZXREYXlzQ291bnRJbk1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gMzIgLSB0aGlzLmRheWxpZ2h0U2F2aW5nQWRqdXN0KG5ldyBEYXRlKHllYXIsIG1vbnRoLCAzMikpLmdldERhdGUoKTtcbiAgICB9XG5cbiAgICBnZXREYXlzQ291bnRJblByZXZNb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHByZXYgPSB0aGlzLmdldFByZXZpb3VzTW9udGhBbmRZZWFyKG1vbnRoLCB5ZWFyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF5c0NvdW50SW5Nb250aChwcmV2Lm1vbnRoLCBwcmV2LnllYXIpO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzTW9udGhBbmRZZWFyKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgICAgICBsZXQgbSwgeTtcblxuICAgICAgICBpZiAobW9udGggPT09IDApIHtcbiAgICAgICAgICAgIG0gPSAxMTtcbiAgICAgICAgICAgIHkgPSB5ZWFyIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG0gPSBtb250aCAtIDE7XG4gICAgICAgICAgICB5ID0geWVhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IG1vbnRoOiBtLCB5ZWFyOiB5IH07XG4gICAgfVxuXG4gICAgZ2V0TmV4dE1vbnRoQW5kWWVhcihtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IG0sIHk7XG5cbiAgICAgICAgaWYgKG1vbnRoID09PSAxMSkge1xuICAgICAgICAgICAgbSA9IDA7XG4gICAgICAgICAgICB5ID0geWVhciArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtID0gbW9udGggKyAxO1xuICAgICAgICAgICAgeSA9IHllYXI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBtb250aDogbSwgeWVhcjogeSB9O1xuICAgIH1cblxuICAgIGdldFN1bmRheUluZGV4KCkge1xuICAgICAgICBsZXQgZmlyc3REYXlPZldlZWsgPSB0aGlzLmdldEZpcnN0RGF0ZU9mV2VlaygpO1xuXG4gICAgICAgIHJldHVybiBmaXJzdERheU9mV2VlayA+IDAgPyA3IC0gZmlyc3REYXlPZldlZWsgOiAwO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQoZGF0ZU1ldGE6IGFueSk6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRGF0ZUVxdWFscyh0aGlzLnZhbHVlLCBkYXRlTWV0YSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZGF0ZSBvZiB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy5pc0RhdGVFcXVhbHMoZGF0ZSwgZGF0ZU1ldGEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlWzFdKSByZXR1cm4gdGhpcy5pc0RhdGVFcXVhbHModGhpcy52YWx1ZVswXSwgZGF0ZU1ldGEpIHx8IHRoaXMuaXNEYXRlRXF1YWxzKHRoaXMudmFsdWVbMV0sIGRhdGVNZXRhKSB8fCB0aGlzLmlzRGF0ZUJldHdlZW4odGhpcy52YWx1ZVswXSwgdGhpcy52YWx1ZVsxXSwgZGF0ZU1ldGEpO1xuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuaXNEYXRlRXF1YWxzKHRoaXMudmFsdWVbMF0sIGRhdGVNZXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQ29tcGFyYWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdGhpcy52YWx1ZSAhPT0gJ3N0cmluZyc7XG4gICAgfVxuXG4gICAgaXNNb250aFNlbGVjdGVkKG1vbnRoOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDb21wYXJhYmxlKCkgJiYgIXRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSB0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSA/IHRoaXMudmFsdWUgOiBbdGhpcy52YWx1ZSwgdGhpcy52YWx1ZV07XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IG5ldyBEYXRlKHRoaXMuY3VycmVudFllYXIsIG1vbnRoLCAxKTtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZCA+PSBzdGFydCAmJiBzZWxlY3RlZCA8PSAoZW5kID8/IHN0YXJ0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNNb250aERpc2FibGVkKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgeWVhclRvQ2hlY2sgPSB5ZWFyID8/IHRoaXMuY3VycmVudFllYXI7XG5cbiAgICAgICAgZm9yIChsZXQgZGF5ID0gMTsgZGF5IDwgdGhpcy5nZXREYXlzQ291bnRJbk1vbnRoKG1vbnRoLCB5ZWFyVG9DaGVjaykgKyAxOyBkYXkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RhYmxlKGRheSwgbW9udGgsIHllYXJUb0NoZWNrLCBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaXNZZWFyRGlzYWJsZWQoeWVhcjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBBcnJheSgxMilcbiAgICAgICAgICAgIC5maWxsKDApXG4gICAgICAgICAgICAuZXZlcnkoKHYsIG1vbnRoKSA9PiB0aGlzLmlzTW9udGhEaXNhYmxlZChtb250aCwgeWVhcikpO1xuICAgIH1cblxuICAgIGlzWWVhclNlbGVjdGVkKHllYXI6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5pc0NvbXBhcmFibGUoKSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkgPyB0aGlzLnZhbHVlWzBdIDogdGhpcy52YWx1ZTtcblxuICAgICAgICAgICAgcmV0dXJuICF0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSA/IHZhbHVlLmdldEZ1bGxZZWFyKCkgPT09IHllYXIgOiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0RhdGVFcXVhbHModmFsdWU6IGFueSwgZGF0ZU1ldGE6IGFueSkge1xuICAgICAgICBpZiAodmFsdWUgJiYgT2JqZWN0VXRpbHMuaXNEYXRlKHZhbHVlKSkgcmV0dXJuIHZhbHVlLmdldERhdGUoKSA9PT0gZGF0ZU1ldGEuZGF5ICYmIHZhbHVlLmdldE1vbnRoKCkgPT09IGRhdGVNZXRhLm1vbnRoICYmIHZhbHVlLmdldEZ1bGxZZWFyKCkgPT09IGRhdGVNZXRhLnllYXI7XG4gICAgICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzRGF0ZUJldHdlZW4oc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSwgZGF0ZU1ldGE6IGFueSkge1xuICAgICAgICBsZXQgYmV0d2VlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNEYXRlKHN0YXJ0KSAmJiBPYmplY3RVdGlscy5pc0RhdGUoZW5kKSkge1xuICAgICAgICAgICAgbGV0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZShkYXRlTWV0YS55ZWFyLCBkYXRlTWV0YS5tb250aCwgZGF0ZU1ldGEuZGF5KTtcbiAgICAgICAgICAgIHJldHVybiBzdGFydC5nZXRUaW1lKCkgPD0gZGF0ZS5nZXRUaW1lKCkgJiYgZW5kLmdldFRpbWUoKSA+PSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiZXR3ZWVuO1xuICAgIH1cblxuICAgIGlzU2luZ2xlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJztcbiAgICB9XG5cbiAgICBpc1JhbmdlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAncmFuZ2UnO1xuICAgIH1cblxuICAgIGlzTXVsdGlwbGVTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aXBsZSc7XG4gICAgfVxuXG4gICAgaXNUb2RheSh0b2RheTogRGF0ZSwgZGF5OiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdG9kYXkuZ2V0RGF0ZSgpID09PSBkYXkgJiYgdG9kYXkuZ2V0TW9udGgoKSA9PT0gbW9udGggJiYgdG9kYXkuZ2V0RnVsbFllYXIoKSA9PT0geWVhcjtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGFibGUoZGF5OiBhbnksIG1vbnRoOiBhbnksIHllYXI6IGFueSwgb3RoZXJNb250aDogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCB2YWxpZE1pbiA9IHRydWU7XG4gICAgICAgIGxldCB2YWxpZE1heCA9IHRydWU7XG4gICAgICAgIGxldCB2YWxpZERhdGUgPSB0cnVlO1xuICAgICAgICBsZXQgdmFsaWREYXkgPSB0cnVlO1xuXG4gICAgICAgIGlmIChvdGhlck1vbnRoICYmICF0aGlzLnNlbGVjdE90aGVyTW9udGhzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5taW5EYXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldEZ1bGxZZWFyKCkgPiB5ZWFyKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRNaW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5taW5EYXRlLmdldEZ1bGxZZWFyKCkgPT09IHllYXIgJiYgdGhpcy5jdXJyZW50VmlldyAhPSAneWVhcicpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldE1vbnRoKCkgPiBtb250aCkge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZE1pbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5taW5EYXRlLmdldE1vbnRoKCkgPT09IG1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0RGF0ZSgpID4gZGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZE1pbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZS5nZXRGdWxsWWVhcigpIDwgeWVhcikge1xuICAgICAgICAgICAgICAgIHZhbGlkTWF4ID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWF4RGF0ZS5nZXRGdWxsWWVhcigpID09PSB5ZWFyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZS5nZXRNb250aCgpIDwgbW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRNYXggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWF4RGF0ZS5nZXRNb250aCgpID09PSBtb250aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlLmdldERhdGUoKSA8IGRheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRNYXggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkRGF0ZXMpIHtcbiAgICAgICAgICAgIHZhbGlkRGF0ZSA9ICF0aGlzLmlzRGF0ZURpc2FibGVkKGRheSwgbW9udGgsIHllYXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWREYXlzKSB7XG4gICAgICAgICAgICB2YWxpZERheSA9ICF0aGlzLmlzRGF5RGlzYWJsZWQoZGF5LCBtb250aCwgeWVhcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsaWRNaW4gJiYgdmFsaWRNYXggJiYgdmFsaWREYXRlICYmIHZhbGlkRGF5O1xuICAgIH1cblxuICAgIGlzRGF0ZURpc2FibGVkKGRheTogbnVtYmVyLCBtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWREYXRlcykge1xuICAgICAgICAgICAgZm9yIChsZXQgZGlzYWJsZWREYXRlIG9mIHRoaXMuZGlzYWJsZWREYXRlcykge1xuICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZERhdGUuZ2V0RnVsbFllYXIoKSA9PT0geWVhciAmJiBkaXNhYmxlZERhdGUuZ2V0TW9udGgoKSA9PT0gbW9udGggJiYgZGlzYWJsZWREYXRlLmdldERhdGUoKSA9PT0gZGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0RheURpc2FibGVkKGRheTogbnVtYmVyLCBtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWREYXlzKSB7XG4gICAgICAgICAgICBsZXQgd2Vla2RheSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgICAgICAgICAgbGV0IHdlZWtkYXlOdW1iZXIgPSB3ZWVrZGF5LmdldERheSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWREYXlzLmluZGV4T2Yod2Vla2RheU51bWJlcikgIT09IC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBvbklucHV0Rm9jdXMoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5zaG93T25Gb2N1cykge1xuICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbklucHV0Q2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dPbkZvY3VzICYmICF0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbklucHV0Qmx1cihldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uQmx1ci5lbWl0KGV2ZW50KTtcbiAgICAgICAgaWYgKCF0aGlzLmtlZXBJbnZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0ZmllbGQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgfVxuXG4gICAgb25CdXR0b25DbGljayhldmVudDogRXZlbnQsIGlucHV0ZmllbGQ6IGFueSA9IHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIGlucHV0ZmllbGQuZm9jdXMoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmlucHV0RmllbGRWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMub25DbGVhci5lbWl0KCk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5Q2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVNlcnZpY2UuYWRkKHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0TW9udGhOYW1lKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKCdtb250aE5hbWVzJylbaW5kZXhdO1xuICAgIH1cblxuICAgIGdldFllYXIobW9udGg6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50VmlldyA9PT0gJ21vbnRoJyA/IHRoaXMuY3VycmVudFllYXIgOiBtb250aC55ZWFyO1xuICAgIH1cblxuICAgIHN3aXRjaFZpZXdCdXR0b25EaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtYmVyT2ZNb250aHMgPiAxIHx8IHRoaXMuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgb25QcmV2QnV0dG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0geyBiYWNrd2FyZDogdHJ1ZSwgYnV0dG9uOiB0cnVlIH07XG4gICAgICAgIHRoaXMubmF2QmFja3dhcmQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uTmV4dEJ1dHRvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHsgYmFja3dhcmQ6IGZhbHNlLCBidXR0b246IHRydWUgfTtcbiAgICAgICAgdGhpcy5uYXZGb3J3YXJkKGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICAgICAgLy90YWJcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhcEZvY3VzKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlckVsZW1lbnRzID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LCAnLnAtZGF0ZXBpY2tlci1oZWFkZXInKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gaGVhZGVyRWxlbWVudHMuY2hpbGRyZW5baGVhZGVyRWxlbWVudHMuY2hpbGRyZW4ubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdEZvY3VzYWJsZUNlbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9lc2NhcGVcbiAgICAgICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy9Ob29wXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbklucHV0S2V5ZG93bihldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMuaXNLZXlkb3duID0gdHJ1ZTtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDQwICYmIHRoaXMuY29udGVudFZpZXdDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy50cmFwRm9jdXMoZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDkgJiYgdGhpcy5jb250ZW50Vmlld0NoaWxkKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmdldEZvY3VzYWJsZUVsZW1lbnRzKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KS5mb3JFYWNoKChlbCkgPT4gKGVsLnRhYkluZGV4ID0gJy0xJykpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRhdGVDZWxsS2V5ZG93bihldmVudDogYW55LCBkYXRlOiBEYXRlLCBncm91cEluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgY2VsbENvbnRlbnQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBjb25zdCBjZWxsID0gY2VsbENvbnRlbnQucGFyZW50RWxlbWVudDtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAvL2Rvd24gYXJyb3dcbiAgICAgICAgICAgIGNhc2UgNDA6IHtcbiAgICAgICAgICAgICAgICBjZWxsQ29udGVudC50YWJJbmRleCA9ICctMSc7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxJbmRleCA9IERvbUhhbmRsZXIuaW5kZXgoY2VsbCk7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRSb3cgPSBjZWxsLnBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGwgPSBuZXh0Um93LmNoaWxkcmVuW2NlbGxJbmRleF0uY2hpbGRyZW5bMF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKGZvY3VzQ2VsbCwgJ3AtZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSB7IGJhY2t3YXJkOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZGb3J3YXJkKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRSb3cuY2hpbGRyZW5bY2VsbEluZGV4XS5jaGlsZHJlblswXS50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRSb3cuY2hpbGRyZW5bY2VsbEluZGV4XS5jaGlsZHJlblswXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSB7IGJhY2t3YXJkOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdkZvcndhcmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3VwIGFycm93XG4gICAgICAgICAgICBjYXNlIDM4OiB7XG4gICAgICAgICAgICAgICAgY2VsbENvbnRlbnQudGFiSW5kZXggPSAnLTEnO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsSW5kZXggPSBEb21IYW5kbGVyLmluZGV4KGNlbGwpO1xuICAgICAgICAgICAgICAgIGxldCBwcmV2Um93ID0gY2VsbC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzQ2VsbCA9IHByZXZSb3cuY2hpbGRyZW5bY2VsbEluZGV4XS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZm9jdXNDZWxsLCAncC1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHsgYmFja3dhcmQ6IHRydWUgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2QmFja3dhcmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHsgYmFja3dhcmQ6IHRydWUgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZCYWNrd2FyZChldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vbGVmdCBhcnJvd1xuICAgICAgICAgICAgY2FzZSAzNzoge1xuICAgICAgICAgICAgICAgIGNlbGxDb250ZW50LnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICBsZXQgcHJldkNlbGwgPSBjZWxsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGwgPSBwcmV2Q2VsbC5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZm9jdXNDZWxsLCAncC1kaXNhYmxlZCcpIHx8IERvbUhhbmRsZXIuaGFzQ2xhc3MoZm9jdXNDZWxsLnBhcmVudEVsZW1lbnQsICdwLWRhdGVwaWNrZXItd2Vla251bWJlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9Nb250aCh0cnVlLCBncm91cEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvTW9udGgodHJ1ZSwgZ3JvdXBJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgMzk6IHtcbiAgICAgICAgICAgICAgICBjZWxsQ29udGVudC50YWJJbmRleCA9ICctMSc7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRDZWxsID0gY2VsbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGwgPSBuZXh0Q2VsbC5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZm9jdXNDZWxsLCAncC1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9Nb250aChmYWxzZSwgZ3JvdXBJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0NlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0NlbGwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb01vbnRoKGZhbHNlLCBncm91cEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9lbnRlclxuICAgICAgICAgICAgLy9zcGFjZVxuICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgIGNhc2UgMzI6IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdChldmVudCwgZGF0ZSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9lc2NhcGVcbiAgICAgICAgICAgIGNhc2UgMjc6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy90YWJcbiAgICAgICAgICAgIGNhc2UgOToge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFwRm9jdXMoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvL25vIG9wXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vbnRoQ2VsbEtleWRvd24oZXZlbnQ6IGFueSwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBjZWxsID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICAgICAgLy9hcnJvd3NcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICBjYXNlIDQwOiB7XG4gICAgICAgICAgICAgICAgY2VsbC50YWJJbmRleCA9ICctMSc7XG4gICAgICAgICAgICAgICAgdmFyIGNlbGxzID0gY2VsbC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuO1xuICAgICAgICAgICAgICAgIHZhciBjZWxsSW5kZXggPSBEb21IYW5kbGVyLmluZGV4KGNlbGwpO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0Q2VsbCA9IGNlbGxzW2V2ZW50LndoaWNoID09PSA0MCA/IGNlbGxJbmRleCArIDMgOiBjZWxsSW5kZXggLSAzXTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dENlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dENlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vbGVmdCBhcnJvd1xuICAgICAgICAgICAgY2FzZSAzNzoge1xuICAgICAgICAgICAgICAgIGNlbGwudGFiSW5kZXggPSAnLTEnO1xuICAgICAgICAgICAgICAgIGxldCBwcmV2Q2VsbCA9IGNlbGwucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAocHJldkNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldkNlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgIHByZXZDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSB7IGJhY2t3YXJkOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2QmFja3dhcmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgMzk6IHtcbiAgICAgICAgICAgICAgICBjZWxsLnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENlbGwgPSBjZWxsLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAobmV4dENlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dENlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSB7IGJhY2t3YXJkOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdkZvcndhcmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vZW50ZXJcbiAgICAgICAgICAgIC8vc3BhY2VcbiAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICBjYXNlIDMyOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vbnRoU2VsZWN0KGV2ZW50LCBpbmRleCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9lc2NhcGVcbiAgICAgICAgICAgIGNhc2UgMjc6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy90YWJcbiAgICAgICAgICAgIGNhc2UgOToge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFwRm9jdXMoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvL25vIG9wXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblllYXJDZWxsS2V5ZG93bihldmVudDogYW55LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIC8vYXJyb3dzXG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgY2FzZSA0MDoge1xuICAgICAgICAgICAgICAgIGNlbGwudGFiSW5kZXggPSAnLTEnO1xuICAgICAgICAgICAgICAgIHZhciBjZWxscyA9IGNlbGwucGFyZW50RWxlbWVudC5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICB2YXIgY2VsbEluZGV4ID0gRG9tSGFuZGxlci5pbmRleChjZWxsKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENlbGwgPSBjZWxsc1tldmVudC53aGljaCA9PT0gNDAgPyBjZWxsSW5kZXggKyAyIDogY2VsbEluZGV4IC0gMl07XG4gICAgICAgICAgICAgICAgaWYgKG5leHRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICBuZXh0Q2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2xlZnQgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgMzc6IHtcbiAgICAgICAgICAgICAgICBjZWxsLnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICBsZXQgcHJldkNlbGwgPSBjZWxsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICBwcmV2Q2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0geyBiYWNrd2FyZDogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdkJhY2t3YXJkKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3JpZ2h0IGFycm93XG4gICAgICAgICAgICBjYXNlIDM5OiB7XG4gICAgICAgICAgICAgICAgY2VsbC50YWJJbmRleCA9ICctMSc7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRDZWxsID0gY2VsbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICBuZXh0Q2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0geyBiYWNrd2FyZDogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZGb3J3YXJkKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICAvL3NwYWNlXG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgY2FzZSAzMjoge1xuICAgICAgICAgICAgICAgIHRoaXMub25ZZWFyU2VsZWN0KGV2ZW50LCBpbmRleCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9lc2NhcGVcbiAgICAgICAgICAgIGNhc2UgMjc6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy90YWJcbiAgICAgICAgICAgIGNhc2UgOToge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhcEZvY3VzKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvL25vIG9wXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuYXZpZ2F0ZVRvTW9udGgocHJldjogYW55LCBncm91cEluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm51bWJlck9mTW9udGhzID09PSAxIHx8IGdyb3VwSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHsgYmFja3dhcmQ6IHRydWUgfTtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdkJhY2t3YXJkKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZNb250aENvbnRhaW5lciA9IHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuW2dyb3VwSW5kZXggLSAxXTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbHMgPSBEb21IYW5kbGVyLmZpbmQocHJldk1vbnRoQ29udGFpbmVyLCAnLnAtZGF0ZXBpY2tlci1jYWxlbmRhciB0ZCBzcGFuOm5vdCgucC1kaXNhYmxlZCk6bm90KC5wLWluayknKTtcbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNDZWxsID0gY2VsbHNbY2VsbHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgZm9jdXNDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMubnVtYmVyT2ZNb250aHMgPT09IDEgfHwgZ3JvdXBJbmRleCA9PT0gdGhpcy5udW1iZXJPZk1vbnRocyAtIDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHsgYmFja3dhcmQ6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgdGhpcy5uYXZGb3J3YXJkKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRNb250aENvbnRhaW5lciA9IHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuW2dyb3VwSW5kZXggKyAxXTtcbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNDZWxsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKG5leHRNb250aENvbnRhaW5lciwgJy5wLWRhdGVwaWNrZXItY2FsZW5kYXIgdGQgc3Bhbjpub3QoLnAtZGlzYWJsZWQpOm5vdCgucC1pbmspJyk7XG4gICAgICAgICAgICAgICAgZm9jdXNDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRm9jdXMoKSB7XG4gICAgICAgIGxldCBjZWxsO1xuXG4gICAgICAgIGlmICh0aGlzLm5hdmlnYXRpb25TdGF0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvblN0YXRlLmJ1dHRvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdEZvY3VzYWJsZUNlbGwoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hdmlnYXRpb25TdGF0ZS5iYWNrd2FyZCkgRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtZGF0ZXBpY2tlci1wcmV2JykuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICBlbHNlIERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy5wLWRhdGVwaWNrZXItbmV4dCcpLmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hdmlnYXRpb25TdGF0ZS5iYWNrd2FyZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbHM7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFZpZXcgPT09ICdtb250aCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtbW9udGhwaWNrZXIgLnAtbW9udGhwaWNrZXItbW9udGg6bm90KC5wLWRpc2FibGVkKScpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFZpZXcgPT09ICd5ZWFyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbHMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC15ZWFycGlja2VyIC5wLXllYXJwaWNrZXIteWVhcjpub3QoLnAtZGlzYWJsZWQpJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxscyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy5wLWRhdGVwaWNrZXItY2FsZW5kYXIgdGQgc3Bhbjpub3QoLnAtZGlzYWJsZWQpOm5vdCgucC1pbmspJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbHMgJiYgY2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbCA9IGNlbGxzW2NlbGxzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFZpZXcgPT09ICdtb250aCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC1tb250aHBpY2tlciAucC1tb250aHBpY2tlci1tb250aDpub3QoLnAtZGlzYWJsZWQpJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VmlldyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAteWVhcnBpY2tlciAucC15ZWFycGlja2VyLXllYXI6bm90KC5wLWRpc2FibGVkKScpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy5wLWRhdGVwaWNrZXItY2FsZW5kYXIgdGQgc3Bhbjpub3QoLnAtZGlzYWJsZWQpOm5vdCgucC1pbmspJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluaXRGb2N1c2FibGVDZWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0Rm9jdXNhYmxlQ2VsbCgpIHtcbiAgICAgICAgY29uc3QgY29udGVudEVsID0gdGhpcy5jb250ZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgY2VsbCE6IGFueTtcblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50VmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgbGV0IGNlbGxzID0gRG9tSGFuZGxlci5maW5kKGNvbnRlbnRFbCwgJy5wLW1vbnRocGlja2VyIC5wLW1vbnRocGlja2VyLW1vbnRoOm5vdCgucC1kaXNhYmxlZCknKTtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZENlbGwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoY29udGVudEVsLCAnLnAtbW9udGhwaWNrZXIgLnAtbW9udGhwaWNrZXItbW9udGgucC1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IChjZWxsLnRhYkluZGV4ID0gLTEpKTtcbiAgICAgICAgICAgIGNlbGwgPSBzZWxlY3RlZENlbGwgfHwgY2VsbHNbMF07XG5cbiAgICAgICAgICAgIGlmIChjZWxscy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZWRDZWxscyA9IERvbUhhbmRsZXIuZmluZChjb250ZW50RWwsICcucC1tb250aHBpY2tlciAucC1tb250aHBpY2tlci1tb250aC5wLWRpc2FibGVkW3RhYmluZGV4ID0gXCIwXCJdJyk7XG4gICAgICAgICAgICAgICAgZGlzYWJsZWRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiAoY2VsbC50YWJJbmRleCA9IC0xKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VmlldyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICBsZXQgY2VsbHMgPSBEb21IYW5kbGVyLmZpbmQoY29udGVudEVsLCAnLnAteWVhcnBpY2tlciAucC15ZWFycGlja2VyLXllYXI6bm90KC5wLWRpc2FibGVkKScpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQ2VsbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShjb250ZW50RWwsICcucC15ZWFycGlja2VyIC5wLXllYXJwaWNrZXIteWVhci5wLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4gKGNlbGwudGFiSW5kZXggPSAtMSkpO1xuICAgICAgICAgICAgY2VsbCA9IHNlbGVjdGVkQ2VsbCB8fCBjZWxsc1swXTtcblxuICAgICAgICAgICAgaWYgKGNlbGxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlZENlbGxzID0gRG9tSGFuZGxlci5maW5kKGNvbnRlbnRFbCwgJy5wLXllYXJwaWNrZXIgLnAteWVhcnBpY2tlci15ZWFyLnAtZGlzYWJsZWRbdGFiaW5kZXggPSBcIjBcIl0nKTtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZENlbGxzLmZvckVhY2goKGNlbGwpID0+IChjZWxsLnRhYkluZGV4ID0gLTEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNlbGwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoY29udGVudEVsLCAnc3Bhbi5wLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgaWYgKCFjZWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRvZGF5Q2VsbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShjb250ZW50RWwsICd0ZC5wLWRhdGVwaWNrZXItdG9kYXkgc3Bhbjpub3QoLnAtZGlzYWJsZWQpOm5vdCgucC1pbmspJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRvZGF5Q2VsbCkgY2VsbCA9IHRvZGF5Q2VsbDtcbiAgICAgICAgICAgICAgICBlbHNlIGNlbGwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoY29udGVudEVsLCAnLnAtZGF0ZXBpY2tlci1jYWxlbmRhciB0ZCBzcGFuOm5vdCgucC1kaXNhYmxlZCk6bm90KC5wLWluayknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgICAgICBjZWxsLnRhYkluZGV4ID0gJzAnO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMucHJldmVudEZvY3VzICYmICghdGhpcy5uYXZpZ2F0aW9uU3RhdGUgfHwgIXRoaXMubmF2aWdhdGlvblN0YXRlLmJ1dHRvbikpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wcmV2ZW50Rm9jdXMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYXBGb2N1cyhldmVudDogYW55KSB7XG4gICAgICAgIGxldCBmb2N1c2FibGVFbGVtZW50cyA9IERvbUhhbmRsZXIuZ2V0Rm9jdXNhYmxlRWxlbWVudHModGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChmb2N1c2FibGVFbGVtZW50cyAmJiBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoIWZvY3VzYWJsZUVsZW1lbnRzWzBdLm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBmb2N1c2VkSW5kZXggPSBmb2N1c2FibGVFbGVtZW50cy5pbmRleE9mKGZvY3VzYWJsZUVsZW1lbnRzWzBdLm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzZWRJbmRleCA9PSAtMSB8fCBmb2N1c2VkSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzVHJhcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkSW5kZXggPT09IC0xKSByZXR1cm4gdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZvY3VzZWRJbmRleCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNlZEluZGV4IC0gMV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkSW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVPbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW5JbmRleCA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2FibGVFbGVtZW50c1tpXS50YWdOYW1lID09PSAnU1BBTicpIHNwYW5JbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbc3BhbkluZGV4XS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvY3VzZWRJbmRleCA9PT0gZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZvY3VzVHJhcCAmJiBmb2N1c2VkSW5kZXggIT0gLTEpIHJldHVybiB0aGlzLmhpZGVPdmVybGF5KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2VkSW5kZXggKyAxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbk1vbnRoRHJvcGRvd25DaGFuZ2UobTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gcGFyc2VJbnQobSk7XG4gICAgICAgIHRoaXMub25Nb250aENoYW5nZS5lbWl0KHsgbW9udGg6IHRoaXMuY3VycmVudE1vbnRoICsgMSwgeWVhcjogdGhpcy5jdXJyZW50WWVhciB9KTtcbiAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgIH1cblxuICAgIG9uWWVhckRyb3Bkb3duQ2hhbmdlKHk6IHN0cmluZykge1xuICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gcGFyc2VJbnQoeSk7XG4gICAgICAgIHRoaXMub25ZZWFyQ2hhbmdlLmVtaXQoeyBtb250aDogdGhpcy5jdXJyZW50TW9udGggKyAxLCB5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyIH0pO1xuICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgfVxuXG4gICAgY29udmVydFRvMjRIb3VyID0gZnVuY3Rpb24gKGhvdXJzOiBudW1iZXIsIHBtOiBib29sZWFuKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgIGlmIChob3VycyA9PT0gMTIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG0gPyAxMiA6IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbSA/IGhvdXJzICsgMTIgOiBob3VycztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaG91cnM7XG4gICAgfTtcblxuICAgIGNvbnN0cmFpblRpbWUoaG91cjogbnVtYmVyLCBtaW51dGU6IG51bWJlciwgc2Vjb25kOiBudW1iZXIsIHBtOiBib29sZWFuKSB7XG4gICAgICAgIGxldCByZXR1cm5UaW1lVHJpcGxlOiBudW1iZXJbXSA9IFtob3VyLCBtaW51dGUsIHNlY29uZF07XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlZEhvdXIgPSB0aGlzLmNvbnZlcnRUbzI0SG91cihob3VyLCBwbSk7XG4gICAgICAgIGNvbnN0IGlzUmFuZ2UgPSB0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSxcbiAgICAgICAgICAgIGlzTXVsdGlwbGUgPSB0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSxcbiAgICAgICAgICAgIGlzTXVsdGlWYWx1ZSA9IGlzUmFuZ2UgfHwgaXNNdWx0aXBsZTtcblxuICAgICAgICBpZiAoaXNNdWx0aVZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gW25ldyBEYXRlKCksIG5ldyBEYXRlKCldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVbMV0gfHwgdGhpcy52YWx1ZVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc011bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlW3RoaXMudmFsdWUubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWVEYXRlU3RyaW5nID0gdmFsdWUgPyB2YWx1ZS50b0RhdGVTdHJpbmcoKSA6IG51bGw7XG4gICAgICAgIGxldCBpc01pbkRhdGUgPSB0aGlzLm1pbkRhdGUgJiYgdmFsdWVEYXRlU3RyaW5nICYmIHRoaXMubWluRGF0ZS50b0RhdGVTdHJpbmcoKSA9PT0gdmFsdWVEYXRlU3RyaW5nO1xuICAgICAgICBsZXQgaXNNYXhEYXRlID0gdGhpcy5tYXhEYXRlICYmIHZhbHVlRGF0ZVN0cmluZyAmJiB0aGlzLm1heERhdGUudG9EYXRlU3RyaW5nKCkgPT09IHZhbHVlRGF0ZVN0cmluZztcbiAgICAgICAgc3dpdGNoIChcbiAgICAgICAgICAgIHRydWUgLy8gaW50ZW50aW9uYWwgZmFsbCB0aHJvdWdoXG4gICAgICAgICkge1xuICAgICAgICAgICAgY2FzZSBpc01pbkRhdGUgJiYgdGhpcy5taW5EYXRlLmdldEhvdXJzKCkgPiBjb252ZXJ0ZWRIb3VyOlxuICAgICAgICAgICAgICAgIHJldHVyblRpbWVUcmlwbGVbMF0gPSB0aGlzLm1pbkRhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgICAgIGNhc2UgaXNNaW5EYXRlICYmIHRoaXMubWluRGF0ZS5nZXRIb3VycygpID09PSBjb252ZXJ0ZWRIb3VyICYmIHRoaXMubWluRGF0ZS5nZXRNaW51dGVzKCkgPiBtaW51dGU6XG4gICAgICAgICAgICAgICAgcmV0dXJuVGltZVRyaXBsZVsxXSA9IHRoaXMubWluRGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICBjYXNlIGlzTWluRGF0ZSAmJiB0aGlzLm1pbkRhdGUuZ2V0SG91cnMoKSA9PT0gY29udmVydGVkSG91ciAmJiB0aGlzLm1pbkRhdGUuZ2V0TWludXRlcygpID09PSBtaW51dGUgJiYgdGhpcy5taW5EYXRlLmdldFNlY29uZHMoKSA+IHNlY29uZDpcbiAgICAgICAgICAgICAgICByZXR1cm5UaW1lVHJpcGxlWzJdID0gdGhpcy5taW5EYXRlLmdldFNlY29uZHMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgaXNNYXhEYXRlICYmIHRoaXMubWF4RGF0ZS5nZXRIb3VycygpIDwgY29udmVydGVkSG91cjpcbiAgICAgICAgICAgICAgICByZXR1cm5UaW1lVHJpcGxlWzBdID0gdGhpcy5tYXhEYXRlLmdldEhvdXJzKCk7XG4gICAgICAgICAgICBjYXNlIGlzTWF4RGF0ZSAmJiB0aGlzLm1heERhdGUuZ2V0SG91cnMoKSA9PT0gY29udmVydGVkSG91ciAmJiB0aGlzLm1heERhdGUuZ2V0TWludXRlcygpIDwgbWludXRlOlxuICAgICAgICAgICAgICAgIHJldHVyblRpbWVUcmlwbGVbMV0gPSB0aGlzLm1heERhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICAgICAgY2FzZSBpc01heERhdGUgJiYgdGhpcy5tYXhEYXRlLmdldEhvdXJzKCkgPT09IGNvbnZlcnRlZEhvdXIgJiYgdGhpcy5tYXhEYXRlLmdldE1pbnV0ZXMoKSA9PT0gbWludXRlICYmIHRoaXMubWF4RGF0ZS5nZXRTZWNvbmRzKCkgPCBzZWNvbmQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuVGltZVRyaXBsZVsyXSA9IHRoaXMubWF4RGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVyblRpbWVUcmlwbGU7XG4gICAgfVxuXG4gICAgaW5jcmVtZW50SG91cihldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IHByZXZIb3VyID0gdGhpcy5jdXJyZW50SG91ciA/PyAwO1xuICAgICAgICBsZXQgbmV3SG91ciA9ICh0aGlzLmN1cnJlbnRIb3VyID8/IDApICsgdGhpcy5zdGVwSG91cjtcbiAgICAgICAgbGV0IG5ld1BNID0gdGhpcy5wbTtcbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMjQnKSBuZXdIb3VyID0gbmV3SG91ciA+PSAyNCA/IG5ld0hvdXIgLSAyNCA6IG5ld0hvdXI7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICAvLyBCZWZvcmUgdGhlIEFNL1BNIGJyZWFrLCBub3cgYWZ0ZXJcbiAgICAgICAgICAgIGlmIChwcmV2SG91ciA8IDEyICYmIG5ld0hvdXIgPiAxMSkge1xuICAgICAgICAgICAgICAgIG5ld1BNID0gIXRoaXMucG07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdIb3VyID0gbmV3SG91ciA+PSAxMyA/IG5ld0hvdXIgLSAxMiA6IG5ld0hvdXI7XG4gICAgICAgIH1cbiAgICAgICAgW3RoaXMuY3VycmVudEhvdXIsIHRoaXMuY3VycmVudE1pbnV0ZSwgdGhpcy5jdXJyZW50U2Vjb25kXSA9IHRoaXMuY29uc3RyYWluVGltZShuZXdIb3VyLCB0aGlzLmN1cnJlbnRNaW51dGUhLCB0aGlzLmN1cnJlbnRTZWNvbmQhLCBuZXdQTSEpO1xuICAgICAgICB0aGlzLnBtID0gbmV3UE07XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bihldmVudDogRXZlbnQsIHR5cGU6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgbnVsbCwgdHlwZSwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcChldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZVBpY2tlclRpbWVyKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGltZVBpY2tlckVsZW1lbnRNb3VzZUxlYXZlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy50aW1lUGlja2VyVGltZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lUGlja2VyVGltZXIoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVwZWF0KGV2ZW50OiBFdmVudCB8IG51bGwsIGludGVydmFsOiBudW1iZXIgfCBudWxsLCB0eXBlOiBudW1iZXIgfCBudWxsLCBkaXJlY3Rpb246IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgbGV0IGkgPSBpbnRlcnZhbCB8fCA1MDA7XG5cbiAgICAgICAgdGhpcy5jbGVhclRpbWVQaWNrZXJUaW1lcigpO1xuICAgICAgICB0aGlzLnRpbWVQaWNrZXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIDEwMCwgdHlwZSwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0sIGkpO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IDEpIHRoaXMuaW5jcmVtZW50SG91cihldmVudCk7XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmRlY3JlbWVudEhvdXIoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSkgdGhpcy5pbmNyZW1lbnRNaW51dGUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5kZWNyZW1lbnRNaW51dGUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSkgdGhpcy5pbmNyZW1lbnRTZWNvbmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5kZWNyZW1lbnRTZWNvbmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lUGlja2VyVGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXJUaW1lcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZVBpY2tlclRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMudGltZVBpY2tlclRpbWVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlY3JlbWVudEhvdXIoZXZlbnQ6IGFueSkge1xuICAgICAgICBsZXQgbmV3SG91ciA9ICh0aGlzLmN1cnJlbnRIb3VyID8/IDApIC0gdGhpcy5zdGVwSG91cjtcbiAgICAgICAgbGV0IG5ld1BNID0gdGhpcy5wbTtcbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMjQnKSBuZXdIb3VyID0gbmV3SG91ciA8IDAgPyAyNCArIG5ld0hvdXIgOiBuZXdIb3VyO1xuICAgICAgICBlbHNlIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgLy8gSWYgd2Ugd2VyZSBhdCBub29uL21pZG5pZ2h0LCB0aGVuIHN3aXRjaFxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudEhvdXIgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgbmV3UE0gPSAhdGhpcy5wbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld0hvdXIgPSBuZXdIb3VyIDw9IDAgPyAxMiArIG5ld0hvdXIgOiBuZXdIb3VyO1xuICAgICAgICB9XG4gICAgICAgIFt0aGlzLmN1cnJlbnRIb3VyLCB0aGlzLmN1cnJlbnRNaW51dGUsIHRoaXMuY3VycmVudFNlY29uZF0gPSB0aGlzLmNvbnN0cmFpblRpbWUobmV3SG91ciwgdGhpcy5jdXJyZW50TWludXRlISwgdGhpcy5jdXJyZW50U2Vjb25kISwgbmV3UE0hKTtcbiAgICAgICAgdGhpcy5wbSA9IG5ld1BNO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGluY3JlbWVudE1pbnV0ZShldmVudDogYW55KSB7XG4gICAgICAgIGxldCBuZXdNaW51dGUgPSAodGhpcy5jdXJyZW50TWludXRlID8/IDApICsgdGhpcy5zdGVwTWludXRlO1xuICAgICAgICBuZXdNaW51dGUgPSBuZXdNaW51dGUgPiA1OSA/IG5ld01pbnV0ZSAtIDYwIDogbmV3TWludXRlO1xuICAgICAgICBbdGhpcy5jdXJyZW50SG91ciwgdGhpcy5jdXJyZW50TWludXRlLCB0aGlzLmN1cnJlbnRTZWNvbmRdID0gdGhpcy5jb25zdHJhaW5UaW1lKHRoaXMuY3VycmVudEhvdXIsIG5ld01pbnV0ZSwgdGhpcy5jdXJyZW50U2Vjb25kISwgdGhpcy5wbSEpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGRlY3JlbWVudE1pbnV0ZShldmVudDogYW55KSB7XG4gICAgICAgIGxldCBuZXdNaW51dGUgPSAodGhpcy5jdXJyZW50TWludXRlID8/IDApIC0gdGhpcy5zdGVwTWludXRlO1xuICAgICAgICBuZXdNaW51dGUgPSBuZXdNaW51dGUgPCAwID8gNjAgKyBuZXdNaW51dGUgOiBuZXdNaW51dGU7XG4gICAgICAgIFt0aGlzLmN1cnJlbnRIb3VyLCB0aGlzLmN1cnJlbnRNaW51dGUsIHRoaXMuY3VycmVudFNlY29uZF0gPSB0aGlzLmNvbnN0cmFpblRpbWUodGhpcy5jdXJyZW50SG91ciwgbmV3TWludXRlLCB0aGlzLmN1cnJlbnRTZWNvbmQsIHRoaXMucG0pO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGluY3JlbWVudFNlY29uZChldmVudDogYW55KSB7XG4gICAgICAgIGxldCBuZXdTZWNvbmQgPSA8YW55PnRoaXMuY3VycmVudFNlY29uZCArIHRoaXMuc3RlcFNlY29uZDtcbiAgICAgICAgbmV3U2Vjb25kID0gbmV3U2Vjb25kID4gNTkgPyBuZXdTZWNvbmQgLSA2MCA6IG5ld1NlY29uZDtcbiAgICAgICAgW3RoaXMuY3VycmVudEhvdXIsIHRoaXMuY3VycmVudE1pbnV0ZSwgdGhpcy5jdXJyZW50U2Vjb25kXSA9IHRoaXMuY29uc3RyYWluVGltZSh0aGlzLmN1cnJlbnRIb3VyLCB0aGlzLmN1cnJlbnRNaW51dGUsIG5ld1NlY29uZCwgdGhpcy5wbSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZGVjcmVtZW50U2Vjb25kKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgbGV0IG5ld1NlY29uZCA9IDxhbnk+dGhpcy5jdXJyZW50U2Vjb25kIC0gdGhpcy5zdGVwU2Vjb25kO1xuICAgICAgICBuZXdTZWNvbmQgPSBuZXdTZWNvbmQgPCAwID8gNjAgKyBuZXdTZWNvbmQgOiBuZXdTZWNvbmQ7XG4gICAgICAgIFt0aGlzLmN1cnJlbnRIb3VyLCB0aGlzLmN1cnJlbnRNaW51dGUsIHRoaXMuY3VycmVudFNlY29uZF0gPSB0aGlzLmNvbnN0cmFpblRpbWUodGhpcy5jdXJyZW50SG91ciwgdGhpcy5jdXJyZW50TWludXRlLCBuZXdTZWNvbmQsIHRoaXMucG0pO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVRpbWUoKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlWzFdIHx8IHRoaXMudmFsdWVbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVbdGhpcy52YWx1ZS5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IHZhbHVlID8gbmV3IERhdGUodmFsdWUuZ2V0VGltZSgpKSA6IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SG91ciA9PT0gMTIpIHZhbHVlLnNldEhvdXJzKHRoaXMucG0gPyAxMiA6IDApO1xuICAgICAgICAgICAgZWxzZSB2YWx1ZS5zZXRIb3Vycyh0aGlzLnBtID8gPG51bWJlcj50aGlzLmN1cnJlbnRIb3VyICsgMTIgOiB0aGlzLmN1cnJlbnRIb3VyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlLnNldEhvdXJzKHRoaXMuY3VycmVudEhvdXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsdWUuc2V0TWludXRlcyh0aGlzLmN1cnJlbnRNaW51dGUpO1xuICAgICAgICB2YWx1ZS5zZXRTZWNvbmRzKHRoaXMuY3VycmVudFNlY29uZCk7XG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVbMV0pIHZhbHVlID0gW3RoaXMudmFsdWVbMF0sIHZhbHVlXTtcbiAgICAgICAgICAgIGVsc2UgdmFsdWUgPSBbdmFsdWUsIG51bGxdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IFsuLi50aGlzLnZhbHVlLnNsaWNlKDAsIC0xKSwgdmFsdWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbCh2YWx1ZSk7XG4gICAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh2YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUFNUE0oZXZlbnQ6IGFueSkge1xuICAgICAgICBjb25zdCBuZXdQTSA9ICF0aGlzLnBtO1xuICAgICAgICBbdGhpcy5jdXJyZW50SG91ciwgdGhpcy5jdXJyZW50TWludXRlLCB0aGlzLmN1cnJlbnRTZWNvbmRdID0gdGhpcy5jb25zdHJhaW5UaW1lKHRoaXMuY3VycmVudEhvdXIsIHRoaXMuY3VycmVudE1pbnV0ZSwgdGhpcy5jdXJyZW50U2Vjb25kLCBuZXdQTSk7XG4gICAgICAgIHRoaXMucG0gPSBuZXdQTTtcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25Vc2VySW5wdXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQgfCBhbnkpIHtcbiAgICAgICAgLy8gSUUgMTEgV29ya2Fyb3VuZCBmb3IgaW5wdXQgcGxhY2Vob2xkZXIgOiBodHRwczovL2dpdGh1Yi5jb20vcHJpbWVmYWNlcy9wcmltZW5nL2lzc3Vlcy8yMDI2XG4gICAgICAgIGlmICghdGhpcy5pc0tleWRvd24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzS2V5ZG93biA9IGZhbHNlO1xuXG4gICAgICAgIGxldCB2YWwgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS52YWx1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZUZyb21TdHJpbmcodmFsKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRTZWxlY3Rpb24odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmtlZXBJbnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy9pbnZhbGlkIGRhdGVcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMua2VlcEludmFsaWQgPyB2YWwgOiBudWxsO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZpbGxlZCA9ICh2YWwgIT0gbnVsbCAmJiB2YWwubGVuZ3RoKSBhcyBhbnk7XG4gICAgICAgIHRoaXMub25JbnB1dC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBpc1ZhbGlkU2VsZWN0aW9uKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNTZWxlY3RhYmxlKHZhbHVlLmdldERhdGUoKSwgdmFsdWUuZ2V0TW9udGgoKSwgdmFsdWUuZ2V0RnVsbFllYXIoKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpc1ZhbGlkID0gdmFsdWUuZXZlcnkoKHY6IGFueSkgPT4gdGhpcy5pc1NlbGVjdGFibGUodi5nZXREYXRlKCksIHYuZ2V0TW9udGgoKSwgdi5nZXRGdWxsWWVhcigpLCBmYWxzZSkpO1xuICAgICAgICBpZiAoaXNWYWxpZCAmJiB0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgaXNWYWxpZCA9IHZhbHVlLmxlbmd0aCA9PT0gMSB8fCAodmFsdWUubGVuZ3RoID4gMSAmJiB2YWx1ZVsxXSA+PSB2YWx1ZVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XG4gICAgfVxuXG4gICAgcGFyc2VWYWx1ZUZyb21TdHJpbmcodGV4dDogc3RyaW5nKTogRGF0ZSB8IERhdGVbXSB8IG51bGwge1xuICAgICAgICBpZiAoIXRleHQgfHwgdGV4dC50cmltKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YWx1ZTogYW55O1xuXG4gICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5wYXJzZURhdGVUaW1lKHRleHQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICBsZXQgdG9rZW5zID0gdGV4dC5zcGxpdCh0aGlzLm11bHRpcGxlU2VwYXJhdG9yKTtcbiAgICAgICAgICAgIHZhbHVlID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB0b2tlbiBvZiB0b2tlbnMpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKHRoaXMucGFyc2VEYXRlVGltZSh0b2tlbi50cmltKCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgbGV0IHRva2VucyA9IHRleHQuc3BsaXQoJyAnICsgdGhpcy5yYW5nZVNlcGFyYXRvciArICcgJyk7XG4gICAgICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YWx1ZVtpXSA9IHRoaXMucGFyc2VEYXRlVGltZSh0b2tlbnNbaV0udHJpbSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBwYXJzZURhdGVUaW1lKHRleHQ6IGFueSk6IERhdGUge1xuICAgICAgICBsZXQgZGF0ZTogRGF0ZTtcbiAgICAgICAgbGV0IHBhcnRzOiBzdHJpbmdbXSA9IHRleHQuc3BsaXQoJyAnKTtcblxuICAgICAgICBpZiAodGhpcy50aW1lT25seSkge1xuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlVGltZShkYXRlLCBwYXJ0c1swXSwgcGFydHNbMV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGF0ZUZvcm1hdCA9IHRoaXMuZ2V0RGF0ZUZvcm1hdCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgYW1wbSA9IHRoaXMuaG91ckZvcm1hdCA9PSAnMTInID8gcGFydHMucG9wKCkgOiBudWxsO1xuICAgICAgICAgICAgICAgIGxldCB0aW1lU3RyaW5nID0gcGFydHMucG9wKCk7XG5cbiAgICAgICAgICAgICAgICBkYXRlID0gdGhpcy5wYXJzZURhdGUocGFydHMuam9pbignICcpLCBkYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXRlVGltZShkYXRlLCB0aW1lU3RyaW5nLCBhbXBtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IHRoaXMucGFyc2VEYXRlKHRleHQsIGRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVUaW1lKHZhbHVlOiBhbnksIHRpbWVTdHJpbmc6IGFueSwgYW1wbTogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJyAmJiAhYW1wbSkge1xuICAgICAgICAgICAgdGhyb3cgJ0ludmFsaWQgVGltZSc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBtID0gYW1wbSA9PT0gJ1BNJyB8fCBhbXBtID09PSAncG0nO1xuICAgICAgICBsZXQgdGltZSA9IHRoaXMucGFyc2VUaW1lKHRpbWVTdHJpbmcpO1xuICAgICAgICB2YWx1ZS5zZXRIb3Vycyh0aW1lLmhvdXIpO1xuICAgICAgICB2YWx1ZS5zZXRNaW51dGVzKHRpbWUubWludXRlKTtcbiAgICAgICAgdmFsdWUuc2V0U2Vjb25kcyh0aW1lLnNlY29uZCk7XG4gICAgfVxuXG4gICAgaXNWYWxpZERhdGUoZGF0ZTogYW55KSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5pc0RhdGUoZGF0ZSkgJiYgT2JqZWN0VXRpbHMuaXNOb3RFbXB0eShkYXRlKTtcbiAgICB9XG5cbiAgICB1cGRhdGVVSSgpIHtcbiAgICAgICAgbGV0IHByb3BWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICAgIHByb3BWYWx1ZSA9IHByb3BWYWx1ZS5sZW5ndGggPT09IDIgPyBwcm9wVmFsdWVbMV0gOiBwcm9wVmFsdWVbMF07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsID0gdGhpcy5kZWZhdWx0RGF0ZSAmJiB0aGlzLmlzVmFsaWREYXRlKHRoaXMuZGVmYXVsdERhdGUpICYmICF0aGlzLnZhbHVlID8gdGhpcy5kZWZhdWx0RGF0ZSA6IHByb3BWYWx1ZSAmJiB0aGlzLmlzVmFsaWREYXRlKHByb3BWYWx1ZSkgPyBwcm9wVmFsdWUgOiBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gdmFsLmdldE1vbnRoKCk7XG4gICAgICAgIHRoaXMuY3VycmVudFllYXIgPSB2YWwuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuXG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lIHx8IHRoaXMudGltZU9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudEhvdXJQTSh2YWwuZ2V0SG91cnMoKSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNaW51dGUgPSB2YWwuZ2V0TWludXRlcygpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Vjb25kID0gdmFsLmdldFNlY29uZHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dPdmVybGF5KCkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnRvdWNoVUkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnRGb2N1cyA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZU92ZXJsYXkoKSB7XG4gICAgICAgIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lUGlja2VyVGltZXIoKTtcblxuICAgICAgICBpZiAodGhpcy50b3VjaFVJKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVNb2RhbGl0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlVG91Y2hVSSc6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlubGluZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkgPSBldmVudC5lbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXk/LnNldEF0dHJpYnV0ZSh0aGlzLmF0dHJpYnV0ZVNlbGVjdG9yIGFzIHN0cmluZywgJycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZE92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50b3VjaFVJKSBaSW5kZXhVdGlscy5zZXQoJ21vZGFsJywgdGhpcy5vdmVybGF5LCB0aGlzLmJhc2VaSW5kZXggfHwgdGhpcy5jb25maWcuekluZGV4Lm1vZGFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgWkluZGV4VXRpbHMuc2V0KCdvdmVybGF5JywgdGhpcy5vdmVybGF5LCB0aGlzLmJhc2VaSW5kZXggfHwgdGhpcy5jb25maWcuekluZGV4Lm92ZXJsYXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnbk92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNob3cuZW1pdChldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk92ZXJsYXlBbmltYXRpb25Eb25lKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgY2FzZSAndmlzaWJsZVRvdWNoVUknOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIoZXZlbnQuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kT3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCg8SFRNTEVsZW1lbnQ+dGhpcy5vdmVybGF5KTtcbiAgICAgICAgICAgIGVsc2UgRG9tSGFuZGxlci5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXksIHRoaXMuYXBwZW5kVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZU92ZXJsYXlBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlnbk92ZXJsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLnRvdWNoVUkpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlTW9kYWxpdHkodGhpcy5vdmVybGF5KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS53aWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLm92ZXJsYXkpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLm1pbldpZHRoID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCkgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS53aWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5vdmVybGF5LCB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbGF0aXZlUG9zaXRpb24odGhpcy5vdmVybGF5LCB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5hYmxlTW9kYWxpdHkoZWxlbWVudDogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5tYXNrICYmIHRoaXMudG91Y2hVSSkge1xuICAgICAgICAgICAgdGhpcy5tYXNrID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5tYXNrLCAnekluZGV4JywgU3RyaW5nKHBhcnNlSW50KGVsZW1lbnQuc3R5bGUuekluZGV4KSAtIDEpKTtcbiAgICAgICAgICAgIGxldCBtYXNrU3R5bGVDbGFzcyA9ICdwLWNvbXBvbmVudC1vdmVybGF5IHAtZGF0ZXBpY2tlci1tYXNrIHAtZGF0ZXBpY2tlci1tYXNrLXNjcm9sbGJsb2NrZXIgcC1jb21wb25lbnQtb3ZlcmxheSBwLWNvbXBvbmVudC1vdmVybGF5LWVudGVyJztcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkTXVsdGlwbGVDbGFzc2VzKHRoaXMubWFzaywgbWFza1N0eWxlQ2xhc3MpO1xuXG4gICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5tYXNrLCAnY2xpY2snLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZU1vZGFsaXR5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5tYXNrKTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYmxvY2tCb2R5U2Nyb2xsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlTW9kYWxpdHkoKSB7XG4gICAgICAgIGlmICh0aGlzLm1hc2spIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5tYXNrLCAncC1jb21wb25lbnQtb3ZlcmxheS1sZWF2ZScpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFuaW1hdGlvbkVuZExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25FbmRMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMubWFzaywgJ2FuaW1hdGlvbmVuZCcsIHRoaXMuZGVzdHJveU1hc2suYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95TWFzaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hc2spIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5tYXNrKTtcbiAgICAgICAgbGV0IGJvZHlDaGlsZHJlbiA9IHRoaXMuZG9jdW1lbnQuYm9keS5jaGlsZHJlbjtcbiAgICAgICAgbGV0IGhhc0Jsb2NrZXJNYXNrcyE6IGJvb2xlYW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9keUNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYm9keUNoaWxkID0gYm9keUNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoYm9keUNoaWxkLCAncC1kYXRlcGlja2VyLW1hc2stc2Nyb2xsYmxvY2tlcicpKSB7XG4gICAgICAgICAgICAgICAgaGFzQmxvY2tlck1hc2tzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaGFzQmxvY2tlck1hc2tzKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnVuYmxvY2tCb2R5U2Nyb2xsKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVuYmluZEFuaW1hdGlvbkVuZExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kTWFza0NsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5tYXNrID0gbnVsbDtcbiAgICB9XG5cbiAgICB1bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMubWFza0NsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kQW5pbWF0aW9uRW5kTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbkVuZExpc3RlbmVyICYmIHRoaXMubWFzaykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25FbmRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25FbmRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSAmJiB0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZUZyb21TdHJpbmcodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5rZWVwSW52YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVUkoKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0RGF0ZUZvcm1hdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdCB8fCB0aGlzLmdldFRyYW5zbGF0aW9uKCdkYXRlRm9ybWF0Jyk7XG4gICAgfVxuXG4gICAgZ2V0Rmlyc3REYXRlT2ZXZWVrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3REYXlPZldlZWsgfHwgdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuRklSU1RfREFZX09GX1dFRUspO1xuICAgIH1cblxuICAgIC8vIFBvcnRlZCBmcm9tIGpxdWVyeS11aSBkYXRlcGlja2VyIGZvcm1hdERhdGVcbiAgICBmb3JtYXREYXRlKGRhdGU6IGFueSwgZm9ybWF0OiBhbnkpIHtcbiAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaUZvcm1hdCE6IGFueTtcbiAgICAgICAgY29uc3QgbG9va0FoZWFkID0gKG1hdGNoOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gaUZvcm1hdCArIDEgPCBmb3JtYXQubGVuZ3RoICYmIGZvcm1hdC5jaGFyQXQoaUZvcm1hdCArIDEpID09PSBtYXRjaDtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICBpRm9ybWF0Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvcm1hdE51bWJlciA9IChtYXRjaDogc3RyaW5nLCB2YWx1ZTogYW55LCBsZW46IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBudW0gPSAnJyArIHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChsb29rQWhlYWQobWF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChudW0ubGVuZ3RoIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBudW0gPSAnMCcgKyBudW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtYXROYW1lID0gKG1hdGNoOiBzdHJpbmcsIHZhbHVlOiBhbnksIHNob3J0TmFtZXM6IGFueSwgbG9uZ05hbWVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9va0FoZWFkKG1hdGNoKSA/IGxvbmdOYW1lc1t2YWx1ZV0gOiBzaG9ydE5hbWVzW3ZhbHVlXTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGxldCBvdXRwdXQgPSAnJztcbiAgICAgICAgbGV0IGxpdGVyYWwgPSBmYWxzZTtcblxuICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgZm9yIChpRm9ybWF0ID0gMDsgaUZvcm1hdCA8IGZvcm1hdC5sZW5ndGg7IGlGb3JtYXQrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXRlcmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtYXQuY2hhckF0KGlGb3JtYXQpID09PSBcIidcIiAmJiAhbG9va0FoZWFkKFwiJ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdC5jaGFyQXQoaUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXROdW1iZXIoJ2QnLCBkYXRlLmdldERhdGUoKSwgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0TmFtZSgnRCcsIGRhdGUuZ2V0RGF5KCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FU19TSE9SVCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FUykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdE51bWJlcignbycsIE1hdGgucm91bmQoKG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSkuZ2V0VGltZSgpIC0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCAwLCAwKS5nZXRUaW1lKCkpIC8gODY0MDAwMDApLCAzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXROdW1iZXIoJ20nLCBkYXRlLmdldE1vbnRoKCkgKyAxLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXROYW1lKCdNJywgZGF0ZS5nZXRNb250aCgpLCB0aGlzLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5NT05USF9OQU1FU19TSE9SVCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLk1PTlRIX05BTUVTKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gbG9va0FoZWFkKCd5JykgPyBkYXRlLmdldEZ1bGxZZWFyKCkgOiAoZGF0ZS5nZXRGdWxsWWVhcigpICUgMTAwIDwgMTAgPyAnMCcgOiAnJykgKyAoZGF0ZS5nZXRGdWxsWWVhcigpICUgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0AnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJyEnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBkYXRlLmdldFRpbWUoKSAqIDEwMDAwICsgPG51bWJlcj50aGlzLnRpY2tzVG8xOTcwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIidcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9va0FoZWFkKFwiJ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gXCInXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0LmNoYXJBdChpRm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIGZvcm1hdFRpbWUoZGF0ZTogYW55KSB7XG4gICAgICAgIGlmICghZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG91dHB1dCA9ICcnO1xuICAgICAgICBsZXQgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIGxldCBtaW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgIGxldCBzZWNvbmRzID0gZGF0ZS5nZXRTZWNvbmRzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInICYmIGhvdXJzID4gMTEgJiYgaG91cnMgIT0gMTIpIHtcbiAgICAgICAgICAgIGhvdXJzIC09IDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gaG91cnMgPT09IDAgPyAxMiA6IGhvdXJzIDwgMTAgPyAnMCcgKyBob3VycyA6IGhvdXJzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0cHV0ICs9IGhvdXJzIDwgMTAgPyAnMCcgKyBob3VycyA6IGhvdXJzO1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dCArPSAnOic7XG4gICAgICAgIG91dHB1dCArPSBtaW51dGVzIDwgMTAgPyAnMCcgKyBtaW51dGVzIDogbWludXRlcztcblxuICAgICAgICBpZiAodGhpcy5zaG93U2Vjb25kcykge1xuICAgICAgICAgICAgb3V0cHV0ICs9ICc6JztcbiAgICAgICAgICAgIG91dHB1dCArPSBzZWNvbmRzIDwgMTAgPyAnMCcgKyBzZWNvbmRzIDogc2Vjb25kcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgb3V0cHV0ICs9IGRhdGUuZ2V0SG91cnMoKSA+IDExID8gJyBQTScgOiAnIEFNJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgcGFyc2VUaW1lKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgbGV0IHRva2Vuczogc3RyaW5nW10gPSB2YWx1ZS5zcGxpdCgnOicpO1xuICAgICAgICBsZXQgdmFsaWRUb2tlbkxlbmd0aCA9IHRoaXMuc2hvd1NlY29uZHMgPyAzIDogMjtcblxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAhPT0gdmFsaWRUb2tlbkxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgJ0ludmFsaWQgdGltZSc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaCA9IHBhcnNlSW50KHRva2Vuc1swXSk7XG4gICAgICAgIGxldCBtID0gcGFyc2VJbnQodG9rZW5zWzFdKTtcbiAgICAgICAgbGV0IHMgPSB0aGlzLnNob3dTZWNvbmRzID8gcGFyc2VJbnQodG9rZW5zWzJdKSA6IG51bGw7XG5cbiAgICAgICAgaWYgKGlzTmFOKGgpIHx8IGlzTmFOKG0pIHx8IGggPiAyMyB8fCBtID4gNTkgfHwgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInICYmIGggPiAxMikgfHwgKHRoaXMuc2hvd1NlY29uZHMgJiYgKGlzTmFOKDxhbnk+cykgfHwgPGFueT5zID4gNTkpKSkge1xuICAgICAgICAgICAgdGhyb3cgJ0ludmFsaWQgdGltZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgICAgICBpZiAoaCAhPT0gMTIgJiYgdGhpcy5wbSkge1xuICAgICAgICAgICAgICAgICAgICBoICs9IDEyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMucG0gJiYgaCA9PT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgaCAtPSAxMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7IGhvdXI6IGgsIG1pbnV0ZTogbSwgc2Vjb25kOiBzIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQb3J0ZWQgZnJvbSBqcXVlcnktdWkgZGF0ZXBpY2tlciBwYXJzZURhdGVcbiAgICBwYXJzZURhdGUodmFsdWU6IGFueSwgZm9ybWF0OiBhbnkpIHtcbiAgICAgICAgaWYgKGZvcm1hdCA9PSBudWxsIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93ICdJbnZhbGlkIGFyZ3VtZW50cyc7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgPyB2YWx1ZS50b1N0cmluZygpIDogdmFsdWUgKyAnJztcbiAgICAgICAgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaUZvcm1hdCE6IGFueSxcbiAgICAgICAgICAgIGRpbSxcbiAgICAgICAgICAgIGV4dHJhLFxuICAgICAgICAgICAgaVZhbHVlID0gMCxcbiAgICAgICAgICAgIHNob3J0WWVhckN1dG9mZiA9IHR5cGVvZiB0aGlzLnNob3J0WWVhckN1dG9mZiAhPT0gJ3N0cmluZycgPyB0aGlzLnNob3J0WWVhckN1dG9mZiA6IChuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgJSAxMDApICsgcGFyc2VJbnQodGhpcy5zaG9ydFllYXJDdXRvZmYsIDEwKSxcbiAgICAgICAgICAgIHllYXIgPSAtMSxcbiAgICAgICAgICAgIG1vbnRoID0gLTEsXG4gICAgICAgICAgICBkYXkgPSAtMSxcbiAgICAgICAgICAgIGRveSA9IC0xLFxuICAgICAgICAgICAgbGl0ZXJhbCA9IGZhbHNlLFxuICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgIGxvb2tBaGVhZCA9IChtYXRjaDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoZXMgPSBpRm9ybWF0ICsgMSA8IGZvcm1hdC5sZW5ndGggJiYgZm9ybWF0LmNoYXJBdChpRm9ybWF0ICsgMSkgPT09IG1hdGNoO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlGb3JtYXQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0TnVtYmVyID0gKG1hdGNoOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaXNEb3VibGVkID0gbG9va0FoZWFkKG1hdGNoKSxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IG1hdGNoID09PSAnQCcgPyAxNCA6IG1hdGNoID09PSAnIScgPyAyMCA6IG1hdGNoID09PSAneScgJiYgaXNEb3VibGVkID8gNCA6IG1hdGNoID09PSAnbycgPyAzIDogMixcbiAgICAgICAgICAgICAgICAgICAgbWluU2l6ZSA9IG1hdGNoID09PSAneScgPyBzaXplIDogMSxcbiAgICAgICAgICAgICAgICAgICAgZGlnaXRzID0gbmV3IFJlZ0V4cCgnXlxcXFxkeycgKyBtaW5TaXplICsgJywnICsgc2l6ZSArICd9JyksXG4gICAgICAgICAgICAgICAgICAgIG51bSA9IHZhbHVlLnN1YnN0cmluZyhpVmFsdWUpLm1hdGNoKGRpZ2l0cyk7XG4gICAgICAgICAgICAgICAgaWYgKCFudW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgJ01pc3NpbmcgbnVtYmVyIGF0IHBvc2l0aW9uICcgKyBpVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlWYWx1ZSArPSBudW1bMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChudW1bMF0sIDEwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXROYW1lID0gKG1hdGNoOiBhbnksIHNob3J0TmFtZXM6IGFueSwgbG9uZ05hbWVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gbG9va0FoZWFkKG1hdGNoKSA/IGxvbmdOYW1lcyA6IHNob3J0TmFtZXM7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBuYW1lcy5wdXNoKFtpLCBhcnJbaV1dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmFtZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLShhWzFdLmxlbmd0aCAtIGJbMV0ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBuYW1lc1tpXVsxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLnN1YnN0cihpVmFsdWUsIG5hbWUubGVuZ3RoKS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gbmFtZXNbaV1bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpVmFsdWUgKz0gbmFtZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyAnVW5rbm93biBuYW1lIGF0IHBvc2l0aW9uICcgKyBpVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoZWNrTGl0ZXJhbCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuY2hhckF0KGlWYWx1ZSkgIT09IGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgJ1VuZXhwZWN0ZWQgbGl0ZXJhbCBhdCBwb3NpdGlvbiAnICsgaVZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpVmFsdWUrKztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgZGF5ID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaUZvcm1hdCA9IDA7IGlGb3JtYXQgPCBmb3JtYXQubGVuZ3RoOyBpRm9ybWF0KyspIHtcbiAgICAgICAgICAgIGlmIChsaXRlcmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkgPT09IFwiJ1wiICYmICFsb29rQWhlYWQoXCInXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpdGVyYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjaGVja0xpdGVyYWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZm9ybWF0LmNoYXJBdChpRm9ybWF0KSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheSA9IGdldE51bWJlcignZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TmFtZSgnRCcsIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FU19TSE9SVCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FUykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ28nOlxuICAgICAgICAgICAgICAgICAgICAgICAgZG95ID0gZ2V0TnVtYmVyKCdvJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGdldE51bWJlcignbScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBnZXROYW1lKCdNJywgdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuTU9OVEhfTkFNRVNfU0hPUlQpLCB0aGlzLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5NT05USF9OQU1FUykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3knOlxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhciA9IGdldE51bWJlcigneScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0AnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGdldE51bWJlcignQCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICchJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgoZ2V0TnVtYmVyKCchJykgLSA8bnVtYmVyPnRoaXMudGlja3NUbzE5NzApIC8gMTAwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCInXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9va0FoZWFkKFwiJ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrTGl0ZXJhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXRlcmFsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tMaXRlcmFsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlWYWx1ZSA8IHZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgZXh0cmEgPSB2YWx1ZS5zdWJzdHIoaVZhbHVlKTtcbiAgICAgICAgICAgIGlmICghL15cXHMrLy50ZXN0KGV4dHJhKSkge1xuICAgICAgICAgICAgICAgIHRocm93ICdFeHRyYS91bnBhcnNlZCBjaGFyYWN0ZXJzIGZvdW5kIGluIGRhdGU6ICcgKyBleHRyYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5ZWFyID09PSAtMSkge1xuICAgICAgICAgICAgeWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDwgMTAwKSB7XG4gICAgICAgICAgICB5ZWFyICs9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtIChuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgJSAxMDApICsgKHllYXIgPD0gc2hvcnRZZWFyQ3V0b2ZmID8gMCA6IC0xMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRveSA+IC0xKSB7XG4gICAgICAgICAgICBtb250aCA9IDE7XG4gICAgICAgICAgICBkYXkgPSBkb3k7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgZGltID0gdGhpcy5nZXREYXlzQ291bnRJbk1vbnRoKHllYXIsIG1vbnRoIC0gMSk7XG4gICAgICAgICAgICAgICAgaWYgKGRheSA8PSBkaW0pIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vbnRoKys7XG4gICAgICAgICAgICAgICAgZGF5IC09IGRpbTtcbiAgICAgICAgICAgIH0gd2hpbGUgKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICBtb250aCA9IG1vbnRoID09PSAtMSA/IDEgOiBtb250aDtcbiAgICAgICAgICAgIGRheSA9IGRheSA9PT0gLTEgPyAxIDogZGF5O1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0ZSA9IHRoaXMuZGF5bGlnaHRTYXZpbmdBZGp1c3QobmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpKTtcblxuICAgICAgICBpZiAoZGF0ZS5nZXRGdWxsWWVhcigpICE9PSB5ZWFyIHx8IGRhdGUuZ2V0TW9udGgoKSArIDEgIT09IG1vbnRoIHx8IGRhdGUuZ2V0RGF0ZSgpICE9PSBkYXkpIHtcbiAgICAgICAgICAgIHRocm93ICdJbnZhbGlkIGRhdGUnOyAvLyBFLmcuIDMxLzAyLzAwXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICBkYXlsaWdodFNhdmluZ0FkanVzdChkYXRlOiBhbnkpIHtcbiAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGUuc2V0SG91cnMoZGF0ZS5nZXRIb3VycygpID4gMTIgPyBkYXRlLmdldEhvdXJzKCkgKyAyIDogMCk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgdXBkYXRlRmlsbGVkU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuZmlsbGVkID0gKHRoaXMuaW5wdXRGaWVsZFZhbHVlICYmIHRoaXMuaW5wdXRGaWVsZFZhbHVlICE9ICcnKSBhcyBib29sZWFuO1xuICAgIH1cblxuICAgIG9uVG9kYXlCdXR0b25DbGljayhldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCBkYXRlTWV0YSA9IHsgZGF5OiBkYXRlLmdldERhdGUoKSwgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSwgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLCBvdGhlck1vbnRoOiBkYXRlLmdldE1vbnRoKCkgIT09IHRoaXMuY3VycmVudE1vbnRoIHx8IGRhdGUuZ2V0RnVsbFllYXIoKSAhPT0gdGhpcy5jdXJyZW50WWVhciwgdG9kYXk6IHRydWUsIHNlbGVjdGFibGU6IHRydWUgfTtcblxuICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyhkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgIHRoaXMub25EYXRlU2VsZWN0KGV2ZW50LCBkYXRlTWV0YSk7XG4gICAgICAgIHRoaXMub25Ub2RheUNsaWNrLmVtaXQoZGF0ZSk7XG4gICAgfVxuXG4gICAgb25DbGVhckJ1dHRvbkNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbChudWxsKTtcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgdGhpcy5vbkNsZWFyQ2xpY2suZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVzcG9uc2l2ZVN0eWxlKCkge1xuICAgICAgICBpZiAodGhpcy5udW1iZXJPZk1vbnRocyA+IDEgJiYgdGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnJlc3BvbnNpdmVTdHlsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNpdmVTdHlsZUVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgKDxIVE1MU3R5bGVFbGVtZW50PnRoaXMucmVzcG9uc2l2ZVN0eWxlRWxlbWVudCkudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIHRoaXMucmVzcG9uc2l2ZVN0eWxlRWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNpdmVPcHRpb25zID0gWy4uLnRoaXMucmVzcG9uc2l2ZU9wdGlvbnNdLmZpbHRlcigobykgPT4gISEoby5icmVha3BvaW50ICYmIG8ubnVtTW9udGhzKSkuc29ydCgobzE6IGFueSwgbzI6IGFueSkgPT4gLTEgKiBvMS5icmVha3BvaW50LmxvY2FsZUNvbXBhcmUobzIuYnJlYWtwb2ludCwgdW5kZWZpbmVkLCB7IG51bWVyaWM6IHRydWUgfSkpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwb25zaXZlT3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgeyBicmVha3BvaW50LCBudW1Nb250aHMgfSA9IHJlc3BvbnNpdmVPcHRpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVzID0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgLnAtZGF0ZXBpY2tlclske3RoaXMuYXR0cmlidXRlU2VsZWN0b3J9XSAucC1kYXRlcGlja2VyLWdyb3VwOm50aC1jaGlsZCgke251bU1vbnRoc30pIC5wLWRhdGVwaWNrZXItbmV4dCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXggIWltcG9ydGFudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqOiBudW1iZXIgPSA8bnVtYmVyPm51bU1vbnRoczsgaiA8IHRoaXMubnVtYmVyT2ZNb250aHM7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzICs9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucC1kYXRlcGlja2VyWyR7dGhpcy5hdHRyaWJ1dGVTZWxlY3Rvcn1dIC5wLWRhdGVwaWNrZXItZ3JvdXA6bnRoLWNoaWxkKCR7aiArIDF9KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7YnJlYWtwb2ludH0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3N0eWxlc31cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICg8SFRNTFN0eWxlRWxlbWVudD50aGlzLnJlc3BvbnNpdmVTdHlsZUVsZW1lbnQpLmlubmVySFRNTCA9IGlubmVySFRNTDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3lSZXNwb25zaXZlU3R5bGVFbGVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnJlc3BvbnNpdmVTdHlsZUVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLnJlc3BvbnNpdmVTdHlsZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkb2N1bWVudFRhcmdldDogYW55ID0gdGhpcy5lbCA/IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50IDogdGhpcy5kb2N1bWVudDtcblxuICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnRUYXJnZXQsICdtb3VzZWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPdXRzaWRlQ2xpY2tlZChldmVudCkgJiYgdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25DbGlja091dHNpZGUuZW1pdChldmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgJiYgIXRoaXMudG91Y2hVSSkge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy53aW5kb3csICdyZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbmV3IENvbm5lY3RlZE92ZXJsYXlTY3JvbGxIYW5kbGVyKHRoaXMuY29udGFpbmVyVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHVuYmluZFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIudW5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzT3V0c2lkZUNsaWNrZWQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHJldHVybiAhKHRoaXMuZWwubmF0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGV2ZW50LnRhcmdldCkgfHwgdGhpcy5pc05hdkljb25DbGlja2VkKGV2ZW50KSB8fCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSB8fCAodGhpcy5vdmVybGF5ICYmIHRoaXMub3ZlcmxheS5jb250YWlucyg8Tm9kZT5ldmVudC50YXJnZXQpKSk7XG4gICAgfVxuXG4gICAgaXNOYXZJY29uQ2xpY2tlZChldmVudDogRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1kYXRlcGlja2VyLXByZXYnKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtZGF0ZXBpY2tlci1wcmV2LWljb24nKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtZGF0ZXBpY2tlci1uZXh0JykgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQsICdwLWRhdGVwaWNrZXItbmV4dC1pY29uJylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBvbldpbmRvd1Jlc2l6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUgJiYgIURvbUhhbmRsZXIuaXNUb3VjaERldmljZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk92ZXJsYXlIaWRlKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gdGhpcy52aWV3O1xuXG4gICAgICAgIGlmICh0aGlzLm1hc2spIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveU1hc2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMub3ZlcmxheSA9IG51bGw7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcih0aGlzLm92ZXJsYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXN0cm95UmVzcG9uc2l2ZVN0eWxlRWxlbWVudCgpO1xuICAgICAgICB0aGlzLmNsZWFyVGltZVBpY2tlclRpbWVyKCk7XG4gICAgICAgIHRoaXMucmVzdG9yZU92ZXJsYXlBcHBlbmQoKTtcbiAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEJ1dHRvbk1vZHVsZSwgU2hhcmVkTW9kdWxlLCBSaXBwbGVNb2R1bGUsIENoZXZyb25MZWZ0SWNvbiwgQ2hldnJvblJpZ2h0SWNvbiwgQ2hldnJvblVwSWNvbiwgQ2hldnJvbkRvd25JY29uLCBUaW1lc0ljb24sIENhbGVuZGFySWNvbiwgQXV0b0ZvY3VzTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQ2FsZW5kYXIsIEJ1dHRvbk1vZHVsZSwgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtDYWxlbmRhcl1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb2R1bGUge31cbiJdfQ==