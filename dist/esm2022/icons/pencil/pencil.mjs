import { Component } from '@angular/core';
import { BaseIcon } from 'primeng/baseicon';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
export class PencilIcon extends BaseIcon {
    pathId;
    ngOnInit() {
        this.pathId = 'url(#' + UniqueComponentId() + ')';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: PencilIcon, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.1", type: PencilIcon, isStandalone: true, selector: "PencilIcon", usesInheritance: true, ngImport: i0, template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    d="M0.609628 13.959C0.530658 13.9599 0.452305 13.9451 0.379077 13.9156C0.305849 13.8861 0.239191 13.8424 0.18294 13.787C0.118447 13.7234 0.0688234 13.6464 0.0376166 13.5614C0.00640987 13.4765 -0.00560954 13.3857 0.00241768 13.2956L0.25679 10.1501C0.267698 10.0041 0.331934 9.86709 0.437312 9.76516L9.51265 0.705715C10.0183 0.233014 10.6911 -0.0203041 11.3835 0.00127367C12.0714 0.00660201 12.7315 0.27311 13.2298 0.746671C13.7076 1.23651 13.9824 1.88848 13.9992 2.57201C14.0159 3.25554 13.7733 3.92015 13.32 4.4327L4.23648 13.5331C4.13482 13.6342 4.0017 13.6978 3.85903 13.7133L0.667067 14L0.609628 13.959ZM1.43018 10.4696L1.25787 12.714L3.50619 12.5092L12.4502 3.56444C12.6246 3.35841 12.7361 3.10674 12.7714 2.83933C12.8067 2.57193 12.7644 2.30002 12.6495 2.05591C12.5346 1.8118 12.3519 1.60575 12.1231 1.46224C11.8943 1.31873 11.6291 1.2438 11.3589 1.24633C11.1813 1.23508 11.0033 1.25975 10.8355 1.31887C10.6677 1.37798 10.5136 1.47033 10.3824 1.59036L1.43018 10.4696Z"
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: PencilIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'PencilIcon',
                    standalone: true,
                    imports: [BaseIcon],
                    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    d="M0.609628 13.959C0.530658 13.9599 0.452305 13.9451 0.379077 13.9156C0.305849 13.8861 0.239191 13.8424 0.18294 13.787C0.118447 13.7234 0.0688234 13.6464 0.0376166 13.5614C0.00640987 13.4765 -0.00560954 13.3857 0.00241768 13.2956L0.25679 10.1501C0.267698 10.0041 0.331934 9.86709 0.437312 9.76516L9.51265 0.705715C10.0183 0.233014 10.6911 -0.0203041 11.3835 0.00127367C12.0714 0.00660201 12.7315 0.27311 13.2298 0.746671C13.7076 1.23651 13.9824 1.88848 13.9992 2.57201C14.0159 3.25554 13.7733 3.92015 13.32 4.4327L4.23648 13.5331C4.13482 13.6342 4.0017 13.6978 3.85903 13.7133L0.667067 14L0.609628 13.959ZM1.43018 10.4696L1.25787 12.714L3.50619 12.5092L12.4502 3.56444C12.6246 3.35841 12.7361 3.10674 12.7714 2.83933C12.8067 2.57193 12.7644 2.30002 12.6495 2.05591C12.5346 1.8118 12.3519 1.60575 12.1231 1.46224C11.8943 1.31873 11.6291 1.2438 11.3589 1.24633C11.1813 1.23508 11.0033 1.25975 10.8355 1.31887C10.6677 1.37798 10.5136 1.47033 10.3824 1.59036L1.43018 10.4696Z"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuY2lsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2ljb25zL3BlbmNpbC9wZW5jaWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXNCbEQsTUFBTSxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBQ3BDLE1BQU0sQ0FBUztJQUVmLFFBQVE7UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxpQkFBaUIsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUN0RCxDQUFDO3VHQUxRLFVBQVU7MkZBQVYsVUFBVSw2RkFoQlQ7Ozs7Ozs7Ozs7Ozs7O0tBY1Q7OzJGQUVRLFVBQVU7a0JBcEJ0QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxZQUFZO29CQUN0QixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUNuQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0tBY1Q7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VJY29uIH0gZnJvbSAncHJpbWVuZy9iYXNlaWNvbic7XG5pbXBvcnQgeyBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1BlbmNpbEljb24nLFxuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgaW1wb3J0czogW0Jhc2VJY29uXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxNFwiIHZpZXdCb3g9XCIwIDAgMTQgMTRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiIFthdHRyLmFyaWEtaGlkZGVuXT1cImFyaWFIaWRkZW5cIiBbYXR0ci5yb2xlXT1cInJvbGVcIiBbY2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygpXCI+XG4gICAgICAgICAgICA8ZyBbYXR0ci5jbGlwLXBhdGhdPVwicGF0aElkXCI+XG4gICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgZD1cIk0wLjYwOTYyOCAxMy45NTlDMC41MzA2NTggMTMuOTU5OSAwLjQ1MjMwNSAxMy45NDUxIDAuMzc5MDc3IDEzLjkxNTZDMC4zMDU4NDkgMTMuODg2MSAwLjIzOTE5MSAxMy44NDI0IDAuMTgyOTQgMTMuNzg3QzAuMTE4NDQ3IDEzLjcyMzQgMC4wNjg4MjM0IDEzLjY0NjQgMC4wMzc2MTY2IDEzLjU2MTRDMC4wMDY0MDk4NyAxMy40NzY1IC0wLjAwNTYwOTU0IDEzLjM4NTcgMC4wMDI0MTc2OCAxMy4yOTU2TDAuMjU2NzkgMTAuMTUwMUMwLjI2NzY5OCAxMC4wMDQxIDAuMzMxOTM0IDkuODY3MDkgMC40MzczMTIgOS43NjUxNkw5LjUxMjY1IDAuNzA1NzE1QzEwLjAxODMgMC4yMzMwMTQgMTAuNjkxMSAtMC4wMjAzMDQxIDExLjM4MzUgMC4wMDEyNzM2N0MxMi4wNzE0IDAuMDA2NjAyMDEgMTIuNzMxNSAwLjI3MzExIDEzLjIyOTggMC43NDY2NzFDMTMuNzA3NiAxLjIzNjUxIDEzLjk4MjQgMS44ODg0OCAxMy45OTkyIDIuNTcyMDFDMTQuMDE1OSAzLjI1NTU0IDEzLjc3MzMgMy45MjAxNSAxMy4zMiA0LjQzMjdMNC4yMzY0OCAxMy41MzMxQzQuMTM0ODIgMTMuNjM0MiA0LjAwMTcgMTMuNjk3OCAzLjg1OTAzIDEzLjcxMzNMMC42NjcwNjcgMTRMMC42MDk2MjggMTMuOTU5Wk0xLjQzMDE4IDEwLjQ2OTZMMS4yNTc4NyAxMi43MTRMMy41MDYxOSAxMi41MDkyTDEyLjQ1MDIgMy41NjQ0NEMxMi42MjQ2IDMuMzU4NDEgMTIuNzM2MSAzLjEwNjc0IDEyLjc3MTQgMi44MzkzM0MxMi44MDY3IDIuNTcxOTMgMTIuNzY0NCAyLjMwMDAyIDEyLjY0OTUgMi4wNTU5MUMxMi41MzQ2IDEuODExOCAxMi4zNTE5IDEuNjA1NzUgMTIuMTIzMSAxLjQ2MjI0QzExLjg5NDMgMS4zMTg3MyAxMS42MjkxIDEuMjQzOCAxMS4zNTg5IDEuMjQ2MzNDMTEuMTgxMyAxLjIzNTA4IDExLjAwMzMgMS4yNTk3NSAxMC44MzU1IDEuMzE4ODdDMTAuNjY3NyAxLjM3Nzk4IDEwLjUxMzYgMS40NzAzMyAxMC4zODI0IDEuNTkwMzZMMS40MzAxOCAxMC40Njk2WlwiXG4gICAgICAgICAgICAgICAgICAgIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8ZGVmcz5cbiAgICAgICAgICAgICAgICA8Y2xpcFBhdGggW2lkXT1cInBhdGhJZFwiPlxuICAgICAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTRcIiBmaWxsPVwid2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgIDwvY2xpcFBhdGg+XG4gICAgICAgICAgICA8L2RlZnM+XG4gICAgICAgIDwvc3ZnPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgUGVuY2lsSWNvbiBleHRlbmRzIEJhc2VJY29uIHtcbiAgICBwYXRoSWQ6IHN0cmluZztcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnBhdGhJZCA9ICd1cmwoIycgKyBVbmlxdWVDb21wb25lbnRJZCgpICsgJyknO1xuICAgIH1cbn1cbiJdfQ==