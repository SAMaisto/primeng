import { Component } from '@angular/core';
import { BaseIcon } from 'primeng/baseicon';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
export class SearchPlusIcon extends BaseIcon {
    pathId;
    ngOnInit() {
        this.pathId = 'url(#' + UniqueComponentId() + ')';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SearchPlusIcon, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.1", type: SearchPlusIcon, isStandalone: true, selector: "SearchPlusIcon", usesInheritance: true, ngImport: i0, template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.67596 11.0265C3.66604 11.688 4.83005 12.0411 6.0208 12.0411C6.81143 12.0411 7.59432 11.8854 8.32477 11.5828C8.86999 11.357 9.37802 11.0526 9.83311 10.6803L12.9768 13.8241C13.0322 13.8801 13.0982 13.9245 13.171 13.9548C13.2437 13.985 13.3218 14.0003 13.4006 14C13.4794 14.0003 13.5575 13.985 13.6302 13.9548C13.703 13.9245 13.769 13.8801 13.8244 13.8241C13.9367 13.7116 13.9997 13.5592 13.9997 13.4003C13.9997 13.2414 13.9367 13.089 13.8244 12.9765L10.6806 9.8328C11.0529 9.37773 11.3572 8.86972 11.5831 8.32452C11.8856 7.59408 12.0414 6.81119 12.0414 6.02056C12.0414 4.8298 11.6883 3.66579 11.0267 2.67572C10.3652 1.68564 9.42488 0.913972 8.32477 0.45829C7.22466 0.00260857 6.01412 -0.116618 4.84625 0.115686C3.67838 0.34799 2.60562 0.921393 1.76363 1.76338C0.921637 2.60537 0.348235 3.67813 0.11593 4.84601C-0.116374 6.01388 0.00285271 7.22441 0.458534 8.32452C0.914216 9.42464 1.68589 10.3649 2.67596 11.0265ZM3.35559 2.0158C4.14449 1.48867 5.07199 1.20731 6.0208 1.20731C7.29311 1.20731 8.51331 1.71274 9.41297 2.6124C10.3126 3.51206 10.8181 4.73226 10.8181 6.00457C10.8181 6.95337 10.5367 7.88088 10.0096 8.66978C9.48244 9.45868 8.73322 10.0736 7.85663 10.4367C6.98005 10.7997 6.01548 10.8947 5.0849 10.7096C4.15433 10.5245 3.29954 10.0676 2.62863 9.39674C1.95772 8.72583 1.50083 7.87104 1.31572 6.94046C1.13062 6.00989 1.22562 5.04532 1.58872 4.16874C1.95181 3.29215 2.56669 2.54292 3.35559 2.0158ZM6.00481 8.60309C5.84641 8.60102 5.69509 8.53718 5.58308 8.42517C5.47107 8.31316 5.40722 8.16183 5.40515 8.00344V6.60422H4.00591C3.84687 6.60422 3.69434 6.54104 3.58189 6.42859C3.46943 6.31613 3.40625 6.1636 3.40625 6.00456C3.40625 5.84553 3.46943 5.693 3.58189 5.58054C3.69434 5.46809 3.84687 5.40491 4.00591 5.40491H5.40515V4.00572C5.40515 3.84668 5.46833 3.69416 5.58079 3.5817C5.69324 3.46924 5.84577 3.40607 6.00481 3.40607C6.16385 3.40607 6.31637 3.46924 6.42883 3.5817C6.54129 3.69416 6.60447 3.84668 6.60447 4.00572V5.40491H8.00362C8.16266 5.40491 8.31518 5.46809 8.42764 5.58054C8.5401 5.693 8.60328 5.84553 8.60328 6.00456C8.60328 6.1636 8.5401 6.31613 8.42764 6.42859C8.31518 6.54104 8.16266 6.60422 8.00362 6.60422H6.60447V8.00344C6.60239 8.16183 6.53855 8.31316 6.42654 8.42517C6.31453 8.53718 6.1632 8.60102 6.00481 8.60309Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath [id]="pathId">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: SearchPlusIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'SearchPlusIcon',
                    standalone: true,
                    imports: [BaseIcon],
                    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.67596 11.0265C3.66604 11.688 4.83005 12.0411 6.0208 12.0411C6.81143 12.0411 7.59432 11.8854 8.32477 11.5828C8.86999 11.357 9.37802 11.0526 9.83311 10.6803L12.9768 13.8241C13.0322 13.8801 13.0982 13.9245 13.171 13.9548C13.2437 13.985 13.3218 14.0003 13.4006 14C13.4794 14.0003 13.5575 13.985 13.6302 13.9548C13.703 13.9245 13.769 13.8801 13.8244 13.8241C13.9367 13.7116 13.9997 13.5592 13.9997 13.4003C13.9997 13.2414 13.9367 13.089 13.8244 12.9765L10.6806 9.8328C11.0529 9.37773 11.3572 8.86972 11.5831 8.32452C11.8856 7.59408 12.0414 6.81119 12.0414 6.02056C12.0414 4.8298 11.6883 3.66579 11.0267 2.67572C10.3652 1.68564 9.42488 0.913972 8.32477 0.45829C7.22466 0.00260857 6.01412 -0.116618 4.84625 0.115686C3.67838 0.34799 2.60562 0.921393 1.76363 1.76338C0.921637 2.60537 0.348235 3.67813 0.11593 4.84601C-0.116374 6.01388 0.00285271 7.22441 0.458534 8.32452C0.914216 9.42464 1.68589 10.3649 2.67596 11.0265ZM3.35559 2.0158C4.14449 1.48867 5.07199 1.20731 6.0208 1.20731C7.29311 1.20731 8.51331 1.71274 9.41297 2.6124C10.3126 3.51206 10.8181 4.73226 10.8181 6.00457C10.8181 6.95337 10.5367 7.88088 10.0096 8.66978C9.48244 9.45868 8.73322 10.0736 7.85663 10.4367C6.98005 10.7997 6.01548 10.8947 5.0849 10.7096C4.15433 10.5245 3.29954 10.0676 2.62863 9.39674C1.95772 8.72583 1.50083 7.87104 1.31572 6.94046C1.13062 6.00989 1.22562 5.04532 1.58872 4.16874C1.95181 3.29215 2.56669 2.54292 3.35559 2.0158ZM6.00481 8.60309C5.84641 8.60102 5.69509 8.53718 5.58308 8.42517C5.47107 8.31316 5.40722 8.16183 5.40515 8.00344V6.60422H4.00591C3.84687 6.60422 3.69434 6.54104 3.58189 6.42859C3.46943 6.31613 3.40625 6.1636 3.40625 6.00456C3.40625 5.84553 3.46943 5.693 3.58189 5.58054C3.69434 5.46809 3.84687 5.40491 4.00591 5.40491H5.40515V4.00572C5.40515 3.84668 5.46833 3.69416 5.58079 3.5817C5.69324 3.46924 5.84577 3.40607 6.00481 3.40607C6.16385 3.40607 6.31637 3.46924 6.42883 3.5817C6.54129 3.69416 6.60447 3.84668 6.60447 4.00572V5.40491H8.00362C8.16266 5.40491 8.31518 5.46809 8.42764 5.58054C8.5401 5.693 8.60328 5.84553 8.60328 6.00456C8.60328 6.1636 8.5401 6.31613 8.42764 6.42859C8.31518 6.54104 8.16266 6.60422 8.00362 6.60422H6.60447V8.00344C6.60239 8.16183 6.53855 8.31316 6.42654 8.42517C6.31453 8.53718 6.1632 8.60102 6.00481 8.60309Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath [id]="pathId">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNocGx1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9pY29ucy9zZWFyY2hwbHVzL3NlYXJjaHBsdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXdCbEQsTUFBTSxPQUFPLGNBQWUsU0FBUSxRQUFRO0lBQ3hDLE1BQU0sQ0FBUztJQUVmLFFBQVE7UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxpQkFBaUIsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUN0RCxDQUFDO3VHQUxRLGNBQWM7MkZBQWQsY0FBYyxpR0FsQmI7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQlQ7OzJGQUVRLGNBQWM7a0JBdEIxQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBQ25CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztLQWdCVDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUljb24gfSBmcm9tICdwcmltZW5nL2Jhc2VpY29uJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnU2VhcmNoUGx1c0ljb24nLFxuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgaW1wb3J0czogW0Jhc2VJY29uXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxNFwiIHZpZXdCb3g9XCIwIDAgMTQgMTRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiIFthdHRyLmFyaWEtaGlkZGVuXT1cImFyaWFIaWRkZW5cIiBbYXR0ci5yb2xlXT1cInJvbGVcIiBbY2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygpXCI+XG4gICAgICAgICAgICA8ZyBbYXR0ci5jbGlwLXBhdGhdPVwicGF0aElkXCI+XG4gICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgZmlsbC1ydWxlPVwiZXZlbm9kZFwiXG4gICAgICAgICAgICAgICAgICAgIGNsaXAtcnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICAgICAgICAgICAgICBkPVwiTTIuNjc1OTYgMTEuMDI2NUMzLjY2NjA0IDExLjY4OCA0LjgzMDA1IDEyLjA0MTEgNi4wMjA4IDEyLjA0MTFDNi44MTE0MyAxMi4wNDExIDcuNTk0MzIgMTEuODg1NCA4LjMyNDc3IDExLjU4MjhDOC44Njk5OSAxMS4zNTcgOS4zNzgwMiAxMS4wNTI2IDkuODMzMTEgMTAuNjgwM0wxMi45NzY4IDEzLjgyNDFDMTMuMDMyMiAxMy44ODAxIDEzLjA5ODIgMTMuOTI0NSAxMy4xNzEgMTMuOTU0OEMxMy4yNDM3IDEzLjk4NSAxMy4zMjE4IDE0LjAwMDMgMTMuNDAwNiAxNEMxMy40Nzk0IDE0LjAwMDMgMTMuNTU3NSAxMy45ODUgMTMuNjMwMiAxMy45NTQ4QzEzLjcwMyAxMy45MjQ1IDEzLjc2OSAxMy44ODAxIDEzLjgyNDQgMTMuODI0MUMxMy45MzY3IDEzLjcxMTYgMTMuOTk5NyAxMy41NTkyIDEzLjk5OTcgMTMuNDAwM0MxMy45OTk3IDEzLjI0MTQgMTMuOTM2NyAxMy4wODkgMTMuODI0NCAxMi45NzY1TDEwLjY4MDYgOS44MzI4QzExLjA1MjkgOS4zNzc3MyAxMS4zNTcyIDguODY5NzIgMTEuNTgzMSA4LjMyNDUyQzExLjg4NTYgNy41OTQwOCAxMi4wNDE0IDYuODExMTkgMTIuMDQxNCA2LjAyMDU2QzEyLjA0MTQgNC44Mjk4IDExLjY4ODMgMy42NjU3OSAxMS4wMjY3IDIuNjc1NzJDMTAuMzY1MiAxLjY4NTY0IDkuNDI0ODggMC45MTM5NzIgOC4zMjQ3NyAwLjQ1ODI5QzcuMjI0NjYgMC4wMDI2MDg1NyA2LjAxNDEyIC0wLjExNjYxOCA0Ljg0NjI1IDAuMTE1Njg2QzMuNjc4MzggMC4zNDc5OSAyLjYwNTYyIDAuOTIxMzkzIDEuNzYzNjMgMS43NjMzOEMwLjkyMTYzNyAyLjYwNTM3IDAuMzQ4MjM1IDMuNjc4MTMgMC4xMTU5MyA0Ljg0NjAxQy0wLjExNjM3NCA2LjAxMzg4IDAuMDAyODUyNzEgNy4yMjQ0MSAwLjQ1ODUzNCA4LjMyNDUyQzAuOTE0MjE2IDkuNDI0NjQgMS42ODU4OSAxMC4zNjQ5IDIuNjc1OTYgMTEuMDI2NVpNMy4zNTU1OSAyLjAxNThDNC4xNDQ0OSAxLjQ4ODY3IDUuMDcxOTkgMS4yMDczMSA2LjAyMDggMS4yMDczMUM3LjI5MzExIDEuMjA3MzEgOC41MTMzMSAxLjcxMjc0IDkuNDEyOTcgMi42MTI0QzEwLjMxMjYgMy41MTIwNiAxMC44MTgxIDQuNzMyMjYgMTAuODE4MSA2LjAwNDU3QzEwLjgxODEgNi45NTMzNyAxMC41MzY3IDcuODgwODggMTAuMDA5NiA4LjY2OTc4QzkuNDgyNDQgOS40NTg2OCA4LjczMzIyIDEwLjA3MzYgNy44NTY2MyAxMC40MzY3QzYuOTgwMDUgMTAuNzk5NyA2LjAxNTQ4IDEwLjg5NDcgNS4wODQ5IDEwLjcwOTZDNC4xNTQzMyAxMC41MjQ1IDMuMjk5NTQgMTAuMDY3NiAyLjYyODYzIDkuMzk2NzRDMS45NTc3MiA4LjcyNTgzIDEuNTAwODMgNy44NzEwNCAxLjMxNTcyIDYuOTQwNDZDMS4xMzA2MiA2LjAwOTg5IDEuMjI1NjIgNS4wNDUzMiAxLjU4ODcyIDQuMTY4NzRDMS45NTE4MSAzLjI5MjE1IDIuNTY2NjkgMi41NDI5MiAzLjM1NTU5IDIuMDE1OFpNNi4wMDQ4MSA4LjYwMzA5QzUuODQ2NDEgOC42MDEwMiA1LjY5NTA5IDguNTM3MTggNS41ODMwOCA4LjQyNTE3QzUuNDcxMDcgOC4zMTMxNiA1LjQwNzIyIDguMTYxODMgNS40MDUxNSA4LjAwMzQ0VjYuNjA0MjJINC4wMDU5MUMzLjg0Njg3IDYuNjA0MjIgMy42OTQzNCA2LjU0MTA0IDMuNTgxODkgNi40Mjg1OUMzLjQ2OTQzIDYuMzE2MTMgMy40MDYyNSA2LjE2MzYgMy40MDYyNSA2LjAwNDU2QzMuNDA2MjUgNS44NDU1MyAzLjQ2OTQzIDUuNjkzIDMuNTgxODkgNS41ODA1NEMzLjY5NDM0IDUuNDY4MDkgMy44NDY4NyA1LjQwNDkxIDQuMDA1OTEgNS40MDQ5MUg1LjQwNTE1VjQuMDA1NzJDNS40MDUxNSAzLjg0NjY4IDUuNDY4MzMgMy42OTQxNiA1LjU4MDc5IDMuNTgxN0M1LjY5MzI0IDMuNDY5MjQgNS44NDU3NyAzLjQwNjA3IDYuMDA0ODEgMy40MDYwN0M2LjE2Mzg1IDMuNDA2MDcgNi4zMTYzNyAzLjQ2OTI0IDYuNDI4ODMgMy41ODE3QzYuNTQxMjkgMy42OTQxNiA2LjYwNDQ3IDMuODQ2NjggNi42MDQ0NyA0LjAwNTcyVjUuNDA0OTFIOC4wMDM2MkM4LjE2MjY2IDUuNDA0OTEgOC4zMTUxOCA1LjQ2ODA5IDguNDI3NjQgNS41ODA1NEM4LjU0MDEgNS42OTMgOC42MDMyOCA1Ljg0NTUzIDguNjAzMjggNi4wMDQ1NkM4LjYwMzI4IDYuMTYzNiA4LjU0MDEgNi4zMTYxMyA4LjQyNzY0IDYuNDI4NTlDOC4zMTUxOCA2LjU0MTA0IDguMTYyNjYgNi42MDQyMiA4LjAwMzYyIDYuNjA0MjJINi42MDQ0N1Y4LjAwMzQ0QzYuNjAyMzkgOC4xNjE4MyA2LjUzODU1IDguMzEzMTYgNi40MjY1NCA4LjQyNTE3QzYuMzE0NTMgOC41MzcxOCA2LjE2MzIgOC42MDEwMiA2LjAwNDgxIDguNjAzMDlaXCJcbiAgICAgICAgICAgICAgICAgICAgZmlsbD1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDxkZWZzPlxuICAgICAgICAgICAgICAgIDxjbGlwUGF0aCBbaWRdPVwicGF0aElkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxNFwiIGZpbGw9XCJ3aGl0ZVwiIC8+XG4gICAgICAgICAgICAgICAgPC9jbGlwUGF0aD5cbiAgICAgICAgICAgIDwvZGVmcz5cbiAgICAgICAgPC9zdmc+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hQbHVzSWNvbiBleHRlbmRzIEJhc2VJY29uIHtcbiAgICBwYXRoSWQ6IHN0cmluZztcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnBhdGhJZCA9ICd1cmwoIycgKyBVbmlxdWVDb21wb25lbnRJZCgpICsgJyknO1xuICAgIH1cbn1cbiJdfQ==