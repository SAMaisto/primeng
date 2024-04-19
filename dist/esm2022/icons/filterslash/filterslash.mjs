import { Component } from '@angular/core';
import { BaseIcon } from 'primeng/baseicon';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
export class FilterSlashIcon extends BaseIcon {
    pathId;
    ngOnInit() {
        this.pathId = 'url(#' + UniqueComponentId() + ')';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FilterSlashIcon, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.1", type: FilterSlashIcon, isStandalone: true, selector: "FilterSlashIcon", usesInheritance: true, ngImport: i0, template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.4994 0.0920138C13.5967 0.151519 13.6758 0.236453 13.7283 0.337647C13.7807 0.439133 13.8031 0.553448 13.7929 0.667208C13.7827 0.780968 13.7403 0.889466 13.6707 0.98L11.406 4.06823C11.3099 4.19928 11.1656 4.28679 11.005 4.3115C10.8444 4.33621 10.6805 4.2961 10.5495 4.2C10.4184 4.1039 10.3309 3.95967 10.3062 3.79905C10.2815 3.63843 10.3216 3.47458 10.4177 3.34353L11.9412 1.23529H7.41184C7.24803 1.23529 7.09093 1.17022 6.97509 1.05439C6.85926 0.938558 6.79419 0.781457 6.79419 0.617647C6.79419 0.453837 6.85926 0.296736 6.97509 0.180905C7.09093 0.0650733 7.24803 0 7.41184 0H13.1765C13.2905 0.000692754 13.4022 0.0325088 13.4994 0.0920138ZM4.20008 0.181168H4.24126L13.2013 9.03411C13.3169 9.14992 13.3819 9.3069 13.3819 9.47058C13.3819 9.63426 13.3169 9.79124 13.2013 9.90705C13.1445 9.96517 13.0766 10.0112 13.0016 10.0423C12.9266 10.0735 12.846 10.0891 12.7648 10.0882C12.6836 10.0886 12.6032 10.0728 12.5283 10.0417C12.4533 10.0106 12.3853 9.96479 12.3283 9.90705L9.3142 6.92587L9.26479 6.99999V13.3823C9.26265 13.5455 9.19689 13.7014 9.08152 13.8167C8.96615 13.9321 8.81029 13.9979 8.64714 14H5.35302C5.18987 13.9979 5.03401 13.9321 4.91864 13.8167C4.80327 13.7014 4.73751 13.5455 4.73537 13.3823V6.99999L0.329492 1.02117C0.259855 0.930634 0.21745 0.822137 0.207241 0.708376C0.197031 0.594616 0.21944 0.480301 0.271844 0.378815C0.324343 0.277621 0.403484 0.192687 0.500724 0.133182C0.597964 0.073677 0.709609 0.041861 0.823609 0.0411682H3.86243C3.92448 0.0461551 3.9855 0.060022 4.04361 0.0823446C4.10037 0.10735 4.15311 0.140655 4.20008 0.181168ZM8.02949 6.79411C8.02884 6.66289 8.07235 6.53526 8.15302 6.43176L8.42478 6.05293L3.55773 1.23529H2.0589L5.84714 6.43176C5.92781 6.53526 5.97132 6.66289 5.97067 6.79411V12.7647H8.02949V6.79411Z"
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FilterSlashIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'FilterSlashIcon',
                    standalone: true,
                    imports: [BaseIcon],
                    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.4994 0.0920138C13.5967 0.151519 13.6758 0.236453 13.7283 0.337647C13.7807 0.439133 13.8031 0.553448 13.7929 0.667208C13.7827 0.780968 13.7403 0.889466 13.6707 0.98L11.406 4.06823C11.3099 4.19928 11.1656 4.28679 11.005 4.3115C10.8444 4.33621 10.6805 4.2961 10.5495 4.2C10.4184 4.1039 10.3309 3.95967 10.3062 3.79905C10.2815 3.63843 10.3216 3.47458 10.4177 3.34353L11.9412 1.23529H7.41184C7.24803 1.23529 7.09093 1.17022 6.97509 1.05439C6.85926 0.938558 6.79419 0.781457 6.79419 0.617647C6.79419 0.453837 6.85926 0.296736 6.97509 0.180905C7.09093 0.0650733 7.24803 0 7.41184 0H13.1765C13.2905 0.000692754 13.4022 0.0325088 13.4994 0.0920138ZM4.20008 0.181168H4.24126L13.2013 9.03411C13.3169 9.14992 13.3819 9.3069 13.3819 9.47058C13.3819 9.63426 13.3169 9.79124 13.2013 9.90705C13.1445 9.96517 13.0766 10.0112 13.0016 10.0423C12.9266 10.0735 12.846 10.0891 12.7648 10.0882C12.6836 10.0886 12.6032 10.0728 12.5283 10.0417C12.4533 10.0106 12.3853 9.96479 12.3283 9.90705L9.3142 6.92587L9.26479 6.99999V13.3823C9.26265 13.5455 9.19689 13.7014 9.08152 13.8167C8.96615 13.9321 8.81029 13.9979 8.64714 14H5.35302C5.18987 13.9979 5.03401 13.9321 4.91864 13.8167C4.80327 13.7014 4.73751 13.5455 4.73537 13.3823V6.99999L0.329492 1.02117C0.259855 0.930634 0.21745 0.822137 0.207241 0.708376C0.197031 0.594616 0.21944 0.480301 0.271844 0.378815C0.324343 0.277621 0.403484 0.192687 0.500724 0.133182C0.597964 0.073677 0.709609 0.041861 0.823609 0.0411682H3.86243C3.92448 0.0461551 3.9855 0.060022 4.04361 0.0823446C4.10037 0.10735 4.15311 0.140655 4.20008 0.181168ZM8.02949 6.79411C8.02884 6.66289 8.07235 6.53526 8.15302 6.43176L8.42478 6.05293L3.55773 1.23529H2.0589L5.84714 6.43176C5.92781 6.53526 5.97132 6.66289 5.97067 6.79411V12.7647H8.02949V6.79411Z"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyc2xhc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvaWNvbnMvZmlsdGVyc2xhc2gvZmlsdGVyc2xhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXdCbEQsTUFBTSxPQUFPLGVBQWdCLFNBQVEsUUFBUTtJQUN6QyxNQUFNLENBQVM7SUFFZixRQUFRO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLEdBQUcsaUJBQWlCLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDdEQsQ0FBQzt1R0FMUSxlQUFlOzJGQUFmLGVBQWUsa0dBbEJkOzs7Ozs7Ozs7Ozs7Ozs7O0tBZ0JUOzsyRkFFUSxlQUFlO2tCQXRCM0IsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUNuQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQlQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VJY29uIH0gZnJvbSAncHJpbWVuZy9iYXNlaWNvbic7XG5pbXBvcnQgeyBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ0ZpbHRlclNsYXNoSWNvbicsXG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBpbXBvcnRzOiBbQmFzZUljb25dLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjE0XCIgdmlld0JveD1cIjAgMCAxNCAxNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwiYXJpYUhpZGRlblwiIFthdHRyLnJvbGVdPVwicm9sZVwiIFtjbGFzc109XCJnZXRDbGFzc05hbWVzKClcIj5cbiAgICAgICAgICAgIDxnIFthdHRyLmNsaXAtcGF0aF09XCJwYXRoSWRcIj5cbiAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICBmaWxsLXJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgICAgICAgICAgICAgY2xpcC1ydWxlPVwiZXZlbm9kZFwiXG4gICAgICAgICAgICAgICAgICAgIGQ9XCJNMTMuNDk5NCAwLjA5MjAxMzhDMTMuNTk2NyAwLjE1MTUxOSAxMy42NzU4IDAuMjM2NDUzIDEzLjcyODMgMC4zMzc2NDdDMTMuNzgwNyAwLjQzOTEzMyAxMy44MDMxIDAuNTUzNDQ4IDEzLjc5MjkgMC42NjcyMDhDMTMuNzgyNyAwLjc4MDk2OCAxMy43NDAzIDAuODg5NDY2IDEzLjY3MDcgMC45OEwxMS40MDYgNC4wNjgyM0MxMS4zMDk5IDQuMTk5MjggMTEuMTY1NiA0LjI4Njc5IDExLjAwNSA0LjMxMTVDMTAuODQ0NCA0LjMzNjIxIDEwLjY4MDUgNC4yOTYxIDEwLjU0OTUgNC4yQzEwLjQxODQgNC4xMDM5IDEwLjMzMDkgMy45NTk2NyAxMC4zMDYyIDMuNzk5MDVDMTAuMjgxNSAzLjYzODQzIDEwLjMyMTYgMy40NzQ1OCAxMC40MTc3IDMuMzQzNTNMMTEuOTQxMiAxLjIzNTI5SDcuNDExODRDNy4yNDgwMyAxLjIzNTI5IDcuMDkwOTMgMS4xNzAyMiA2Ljk3NTA5IDEuMDU0MzlDNi44NTkyNiAwLjkzODU1OCA2Ljc5NDE5IDAuNzgxNDU3IDYuNzk0MTkgMC42MTc2NDdDNi43OTQxOSAwLjQ1MzgzNyA2Ljg1OTI2IDAuMjk2NzM2IDYuOTc1MDkgMC4xODA5MDVDNy4wOTA5MyAwLjA2NTA3MzMgNy4yNDgwMyAwIDcuNDExODQgMEgxMy4xNzY1QzEzLjI5MDUgMC4wMDA2OTI3NTQgMTMuNDAyMiAwLjAzMjUwODggMTMuNDk5NCAwLjA5MjAxMzhaTTQuMjAwMDggMC4xODExNjhINC4yNDEyNkwxMy4yMDEzIDkuMDM0MTFDMTMuMzE2OSA5LjE0OTkyIDEzLjM4MTkgOS4zMDY5IDEzLjM4MTkgOS40NzA1OEMxMy4zODE5IDkuNjM0MjYgMTMuMzE2OSA5Ljc5MTI0IDEzLjIwMTMgOS45MDcwNUMxMy4xNDQ1IDkuOTY1MTcgMTMuMDc2NiAxMC4wMTEyIDEzLjAwMTYgMTAuMDQyM0MxMi45MjY2IDEwLjA3MzUgMTIuODQ2IDEwLjA4OTEgMTIuNzY0OCAxMC4wODgyQzEyLjY4MzYgMTAuMDg4NiAxMi42MDMyIDEwLjA3MjggMTIuNTI4MyAxMC4wNDE3QzEyLjQ1MzMgMTAuMDEwNiAxMi4zODUzIDkuOTY0NzkgMTIuMzI4MyA5LjkwNzA1TDkuMzE0MiA2LjkyNTg3TDkuMjY0NzkgNi45OTk5OVYxMy4zODIzQzkuMjYyNjUgMTMuNTQ1NSA5LjE5Njg5IDEzLjcwMTQgOS4wODE1MiAxMy44MTY3QzguOTY2MTUgMTMuOTMyMSA4LjgxMDI5IDEzLjk5NzkgOC42NDcxNCAxNEg1LjM1MzAyQzUuMTg5ODcgMTMuOTk3OSA1LjAzNDAxIDEzLjkzMjEgNC45MTg2NCAxMy44MTY3QzQuODAzMjcgMTMuNzAxNCA0LjczNzUxIDEzLjU0NTUgNC43MzUzNyAxMy4zODIzVjYuOTk5OTlMMC4zMjk0OTIgMS4wMjExN0MwLjI1OTg1NSAwLjkzMDYzNCAwLjIxNzQ1IDAuODIyMTM3IDAuMjA3MjQxIDAuNzA4Mzc2QzAuMTk3MDMxIDAuNTk0NjE2IDAuMjE5NDQgMC40ODAzMDEgMC4yNzE4NDQgMC4zNzg4MTVDMC4zMjQzNDMgMC4yNzc2MjEgMC40MDM0ODQgMC4xOTI2ODcgMC41MDA3MjQgMC4xMzMxODJDMC41OTc5NjQgMC4wNzM2NzcgMC43MDk2MDkgMC4wNDE4NjEgMC44MjM2MDkgMC4wNDExNjgySDMuODYyNDNDMy45MjQ0OCAwLjA0NjE1NTEgMy45ODU1IDAuMDYwMDIyIDQuMDQzNjEgMC4wODIzNDQ2QzQuMTAwMzcgMC4xMDczNSA0LjE1MzExIDAuMTQwNjU1IDQuMjAwMDggMC4xODExNjhaTTguMDI5NDkgNi43OTQxMUM4LjAyODg0IDYuNjYyODkgOC4wNzIzNSA2LjUzNTI2IDguMTUzMDIgNi40MzE3Nkw4LjQyNDc4IDYuMDUyOTNMMy41NTc3MyAxLjIzNTI5SDIuMDU4OUw1Ljg0NzE0IDYuNDMxNzZDNS45Mjc4MSA2LjUzNTI2IDUuOTcxMzIgNi42NjI4OSA1Ljk3MDY3IDYuNzk0MTFWMTIuNzY0N0g4LjAyOTQ5VjYuNzk0MTFaXCJcbiAgICAgICAgICAgICAgICAgICAgZmlsbD1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDxkZWZzPlxuICAgICAgICAgICAgICAgIDxjbGlwUGF0aCBbaWRdPVwicGF0aElkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxNFwiIGZpbGw9XCJ3aGl0ZVwiIC8+XG4gICAgICAgICAgICAgICAgPC9jbGlwUGF0aD5cbiAgICAgICAgICAgIDwvZGVmcz5cbiAgICAgICAgPC9zdmc+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJTbGFzaEljb24gZXh0ZW5kcyBCYXNlSWNvbiB7XG4gICAgcGF0aElkOiBzdHJpbmc7XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wYXRoSWQgPSAndXJsKCMnICsgVW5pcXVlQ29tcG9uZW50SWQoKSArICcpJztcbiAgICB9XG59XG4iXX0=