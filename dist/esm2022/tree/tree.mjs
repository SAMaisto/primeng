import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, forwardRef, Inject, Input, NgModule, numberAttribute, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { RippleModule } from 'primeng/ripple';
import { ScrollerModule } from 'primeng/scroller';
import { ObjectUtils } from 'primeng/utils';
import { CheckIcon } from 'primeng/icons/check';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { MinusIcon } from 'primeng/icons/minus';
import { PlusIcon } from 'primeng/icons/plus';
import { SearchIcon } from 'primeng/icons/search';
import { SpinnerIcon } from 'primeng/icons/spinner';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
import * as i3 from "primeng/api";
import * as i4 from "primeng/scroller";
export class UITreeNode {
    static ICON_CLASS = 'p-treenode-icon ';
    rowNode;
    node;
    parentNode;
    root;
    index;
    firstChild;
    lastChild;
    level;
    indentation;
    itemSize;
    tree;
    timeout;
    draghoverPrev;
    draghoverNext;
    draghoverNode;
    get ariaSelected() {
        return this.tree.selectionMode === 'single' || this.tree.selectionMode === 'multiple' ? this.isSelected() : undefined;
    }
    get ariaChecked() {
        return this.tree.selectionMode === 'checkbox' ? this.isSelected() : undefined;
    }
    constructor(tree) {
        this.tree = tree;
    }
    ngOnInit() {
        this.node.parent = this.parentNode;
        if (this.parentNode) {
            this.setAllNodesTabIndexes();
            this.tree.syncNodeOption(this.node, this.tree.value, 'parent', this.tree.getNodeWithKey(this.parentNode.key, this.tree.value));
        }
    }
    getIcon() {
        let icon;
        if (this.node.icon)
            icon = this.node.icon;
        else
            icon = this.node.expanded && this.node.children && this.node.children?.length ? this.node.expandedIcon : this.node.collapsedIcon;
        return UITreeNode.ICON_CLASS + ' ' + icon;
    }
    isLeaf() {
        return this.tree.isNodeLeaf(this.node);
    }
    toggle(event) {
        if (this.node.expanded)
            this.collapse(event);
        else
            this.expand(event);
        event.stopPropagation();
    }
    expand(event) {
        this.node.expanded = true;
        if (this.tree.virtualScroll) {
            this.tree.updateSerializedValue();
            this.focusVirtualNode();
        }
        this.tree.onNodeExpand.emit({ originalEvent: event, node: this.node });
    }
    collapse(event) {
        this.node.expanded = false;
        if (this.tree.virtualScroll) {
            this.tree.updateSerializedValue();
            this.focusVirtualNode();
        }
        this.tree.onNodeCollapse.emit({ originalEvent: event, node: this.node });
    }
    onNodeClick(event) {
        this.tree.onNodeClick(event, this.node);
    }
    onNodeKeydown(event) {
        if (event.key === 'Enter') {
            this.tree.onNodeClick(event, this.node);
        }
    }
    onNodeTouchEnd() {
        this.tree.onNodeTouchEnd();
    }
    onNodeRightClick(event) {
        this.tree.onNodeRightClick(event, this.node);
    }
    isSelected() {
        return this.tree.isSelected(this.node);
    }
    isSameNode(event) {
        return event.currentTarget && (event.currentTarget.isSameNode(event.target) || event.currentTarget.isSameNode(event.target.closest('[role="treeitem"]')));
    }
    onDropPoint(event, position) {
        event.preventDefault();
        let dragNode = this.tree.dragNode;
        let dragNodeIndex = this.tree.dragNodeIndex;
        let dragNodeScope = this.tree.dragNodeScope;
        let isValidDropPointIndex = this.tree.dragNodeTree === this.tree ? position === 1 || dragNodeIndex !== this.index - 1 : true;
        if (this.tree.allowDrop(dragNode, this.node, dragNodeScope) && isValidDropPointIndex) {
            let dropParams = { ...this.createDropPointEventMetadata(position) };
            if (this.tree.validateDrop) {
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode: dragNode,
                    dropNode: this.node,
                    index: this.index,
                    accept: () => {
                        this.processPointDrop(dropParams);
                    }
                });
            }
            else {
                this.processPointDrop(dropParams);
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode: dragNode,
                    dropNode: this.node,
                    index: this.index
                });
            }
        }
        this.draghoverPrev = false;
        this.draghoverNext = false;
    }
    processPointDrop(event) {
        let newNodeList = event.dropNode.parent ? event.dropNode.parent.children : this.tree.value;
        event.dragNodeSubNodes.splice(event.dragNodeIndex, 1);
        let dropIndex = this.index;
        if (event.position < 0) {
            dropIndex = event.dragNodeSubNodes === newNodeList ? (event.dragNodeIndex > event.index ? event.index : event.index - 1) : event.index;
            newNodeList.splice(dropIndex, 0, event.dragNode);
        }
        else {
            dropIndex = newNodeList.length;
            newNodeList.push(event.dragNode);
        }
        this.tree.dragDropService.stopDrag({
            node: event.dragNode,
            subNodes: event.dropNode.parent ? event.dropNode.parent.children : this.tree.value,
            index: event.dragNodeIndex
        });
    }
    createDropPointEventMetadata(position) {
        return {
            dragNode: this.tree.dragNode,
            dragNodeIndex: this.tree.dragNodeIndex,
            dragNodeSubNodes: this.tree.dragNodeSubNodes,
            dropNode: this.node,
            index: this.index,
            position: position
        };
    }
    onDropPointDragOver(event) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
    }
    onDropPointDragEnter(event, position) {
        if (this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
            if (position < 0)
                this.draghoverPrev = true;
            else
                this.draghoverNext = true;
        }
    }
    onDropPointDragLeave(event) {
        this.draghoverPrev = false;
        this.draghoverNext = false;
    }
    onDragStart(event) {
        if (this.tree.draggableNodes && this.node.draggable !== false) {
            event.dataTransfer.setData('text', 'data');
            this.tree.dragDropService.startDrag({
                tree: this,
                node: this.node,
                subNodes: this.node?.parent ? this.node.parent.children : this.tree.value,
                index: this.index,
                scope: this.tree.draggableScope
            });
        }
        else {
            event.preventDefault();
        }
    }
    onDragStop(event) {
        this.tree.dragDropService.stopDrag({
            node: this.node,
            subNodes: this.node?.parent ? this.node.parent.children : this.tree.value,
            index: this.index
        });
    }
    onDropNodeDragOver(event) {
        event.dataTransfer.dropEffect = 'move';
        if (this.tree.droppableNodes) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    onDropNode(event) {
        if (this.tree.droppableNodes && this.node?.droppable !== false) {
            let dragNode = this.tree.dragNode;
            if (this.tree.allowDrop(dragNode, this.node, this.tree.dragNodeScope)) {
                let dropParams = { ...this.createDropNodeEventMetadata() };
                if (this.tree.validateDrop) {
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: this.node,
                        index: this.index,
                        accept: () => {
                            this.processNodeDrop(dropParams);
                        }
                    });
                }
                else {
                    this.processNodeDrop(dropParams);
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: this.node,
                        index: this.index
                    });
                }
            }
        }
        event.preventDefault();
        event.stopPropagation();
        this.draghoverNode = false;
    }
    createDropNodeEventMetadata() {
        return {
            dragNode: this.tree.dragNode,
            dragNodeIndex: this.tree.dragNodeIndex,
            dragNodeSubNodes: this.tree.dragNodeSubNodes,
            dropNode: this.node
        };
    }
    processNodeDrop(event) {
        let dragNodeIndex = event.dragNodeIndex;
        event.dragNodeSubNodes.splice(dragNodeIndex, 1);
        if (event.dropNode.children)
            event.dropNode.children.push(event.dragNode);
        else
            event.dropNode.children = [event.dragNode];
        this.tree.dragDropService.stopDrag({
            node: event.dragNode,
            subNodes: event.dropNode.parent ? event.dropNode.parent.children : this.tree.value,
            index: dragNodeIndex
        });
    }
    onDropNodeDragEnter(event) {
        if (this.tree.droppableNodes && this.node?.droppable !== false && this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
            this.draghoverNode = true;
        }
    }
    onDropNodeDragLeave(event) {
        if (this.tree.droppableNodes) {
            let rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y >= Math.floor(rect.top + rect.height) || event.y < rect.top) {
                this.draghoverNode = false;
            }
        }
    }
    onKeyDown(event) {
        if (!this.isSameNode(event) || (this.tree.contextMenu && this.tree.contextMenu.containerViewChild?.nativeElement.style.display === 'block')) {
            return;
        }
        switch (event.code) {
            //down arrow
            case 'ArrowDown':
                this.onArrowDown(event);
                break;
            //up arrow
            case 'ArrowUp':
                this.onArrowUp(event);
                break;
            //right arrow
            case 'ArrowRight':
                this.onArrowRight(event);
                break;
            //left arrow
            case 'ArrowLeft':
                this.onArrowLeft(event);
                break;
            //enter
            case 'Enter':
            case 'Space':
            case 'NumpadEnter':
                this.onEnter(event);
                break;
            //tab
            case 'Tab':
                this.setAllNodesTabIndexes();
                break;
            default:
                //no op
                break;
        }
    }
    onArrowUp(event) {
        const nodeElement = event.target.getAttribute('data-pc-section') === 'toggler' ? event.target.closest('[role="treeitem"]') : event.target.parentElement;
        if (nodeElement.previousElementSibling) {
            this.focusRowChange(nodeElement, nodeElement.previousElementSibling, this.findLastVisibleDescendant(nodeElement.previousElementSibling));
        }
        else {
            let parentNodeElement = this.getParentNodeElement(nodeElement);
            if (parentNodeElement) {
                this.focusRowChange(nodeElement, parentNodeElement);
            }
        }
        event.preventDefault();
    }
    onArrowDown(event) {
        const nodeElement = event.target.getAttribute('data-pc-section') === 'toggler' ? event.target.closest('[role="treeitem"]') : event.target;
        const listElement = nodeElement.children[1];
        if (listElement && listElement.children.length > 0) {
            this.focusRowChange(nodeElement, listElement.children[0]);
        }
        else {
            if (nodeElement.parentElement.nextElementSibling) {
                this.focusRowChange(nodeElement, nodeElement.parentElement.nextElementSibling);
            }
            else {
                let nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement.parentElement);
                if (nextSiblingAncestor) {
                    this.focusRowChange(nodeElement, nextSiblingAncestor);
                }
            }
        }
        event.preventDefault();
    }
    onArrowRight(event) {
        if (!this.node?.expanded && !this.tree.isNodeLeaf(this.node)) {
            this.expand(event);
            event.currentTarget.tabIndex = -1;
            setTimeout(() => {
                this.onArrowDown(event);
            }, 1);
        }
        event.preventDefault();
    }
    onArrowLeft(event) {
        const nodeElement = event.target.getAttribute('data-pc-section') === 'toggler' ? event.target.closest('[role="treeitem"]') : event.target;
        if (this.level === 0 && !this.node?.expanded) {
            return false;
        }
        if (this.node?.expanded) {
            this.collapse(event);
            return;
        }
        let parentNodeElement = this.getParentNodeElement(nodeElement.parentElement);
        if (parentNodeElement) {
            this.focusRowChange(event.currentTarget, parentNodeElement);
        }
        event.preventDefault();
    }
    onEnter(event) {
        this.tree.onNodeClick(event, this.node);
        this.setTabIndexForSelectionMode(event, this.tree.nodeTouched);
        event.preventDefault();
    }
    setAllNodesTabIndexes() {
        const nodes = DomHandler.find(this.tree.el.nativeElement, '.p-treenode');
        const hasSelectedNode = [...nodes].some((node) => node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-checked') === 'true');
        [...nodes].forEach((node) => {
            node.tabIndex = -1;
        });
        if (hasSelectedNode) {
            const selectedNodes = [...nodes].filter((node) => node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-checked') === 'true');
            selectedNodes[0].tabIndex = 0;
            return;
        }
        [...nodes][0].tabIndex = 0;
    }
    setTabIndexForSelectionMode(event, nodeTouched) {
        if (this.tree.selectionMode !== null) {
            const elements = [...DomHandler.find(this.tree.el.nativeElement, '.p-treenode')];
            event.currentTarget.tabIndex = nodeTouched === false ? -1 : 0;
            if (elements.every((element) => element.tabIndex === -1)) {
                elements[0].tabIndex = 0;
            }
        }
    }
    findNextSiblingOfAncestor(nodeElement) {
        let parentNodeElement = this.getParentNodeElement(nodeElement);
        if (parentNodeElement) {
            if (parentNodeElement.nextElementSibling)
                return parentNodeElement.nextElementSibling;
            else
                return this.findNextSiblingOfAncestor(parentNodeElement);
        }
        else {
            return null;
        }
    }
    findLastVisibleDescendant(nodeElement) {
        const listElement = Array.from(nodeElement.children).find((el) => DomHandler.hasClass(el, 'p-treenode'));
        const childrenListElement = listElement.children[1];
        if (childrenListElement && childrenListElement.children.length > 0) {
            const lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];
            return this.findLastVisibleDescendant(lastChildElement);
        }
        else {
            return nodeElement;
        }
    }
    getParentNodeElement(nodeElement) {
        const parentNodeElement = nodeElement.parentElement?.parentElement?.parentElement;
        return parentNodeElement?.tagName === 'P-TREENODE' ? parentNodeElement : null;
    }
    focusNode(element) {
        if (this.tree.droppableNodes)
            element.children[1].focus();
        else
            element.children[0].focus();
    }
    focusRowChange(firstFocusableRow, currentFocusedRow, lastVisibleDescendant) {
        firstFocusableRow.tabIndex = '-1';
        currentFocusedRow.children[0].tabIndex = '0';
        this.focusNode(lastVisibleDescendant || currentFocusedRow);
    }
    focusVirtualNode() {
        this.timeout = setTimeout(() => {
            let node = DomHandler.findSingle(document.body, `[data-id="${this.node?.key ?? this.node?.data}"]`);
            DomHandler.focus(node);
        }, 1);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: UITreeNode, deps: [{ token: forwardRef(() => Tree) }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: UITreeNode, selector: "p-treeNode", inputs: { rowNode: "rowNode", node: "node", parentNode: "parentNode", root: ["root", "root", booleanAttribute], index: ["index", "index", numberAttribute], firstChild: ["firstChild", "firstChild", booleanAttribute], lastChild: ["lastChild", "lastChild", booleanAttribute], level: ["level", "level", numberAttribute], indentation: ["indentation", "indentation", numberAttribute], itemSize: ["itemSize", "itemSize", numberAttribute] }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <ng-template [ngIf]="node">
            <li
                *ngIf="tree.droppableNodes"
                class="p-treenode-droppoint"
                [attr.aria-hidden]="true"
                [ngClass]="{ 'p-treenode-droppoint-active': draghoverPrev }"
                (drop)="onDropPoint($event, -1)"
                (dragover)="onDropPointDragOver($event)"
                (dragenter)="onDropPointDragEnter($event, -1)"
                (dragleave)="onDropPointDragLeave($event)"
            ></li>
            <li
                *ngIf="!tree.horizontal"
                [ngClass]="['p-treenode', node.styleClass || '', isLeaf() ? 'p-treenode-leaf' : '']"
                [ngStyle]="{ height: itemSize + 'px' }"
                [style]="node.style"
                [attr.aria-label]="node.label"
                [attr.aria-checked]="ariaChecked"
                [attr.aria-setsize]="node.children ? node.children.length : 0"
                [attr.aria-selected]="ariaSelected"
                [attr.aria-expanded]="node.expanded"
                [attr.aria-posinset]="index + 1"
                [attr.aria-level]="level + 1"
                [attr.tabindex]="index === 0 ? 0 : -1"
                [attr.data-id]="node.key"
                role="treeitem"
                (keydown)="onKeyDown($event)"
            >
                <div
                    class="p-treenode-content"
                    [style.paddingLeft]="level * indentation + 'rem'"
                    (click)="onNodeClick($event)"
                    (contextmenu)="onNodeRightClick($event)"
                    (touchend)="onNodeTouchEnd()"
                    (drop)="onDropNode($event)"
                    (dragover)="onDropNodeDragOver($event)"
                    (dragenter)="onDropNodeDragEnter($event)"
                    (dragleave)="onDropNodeDragLeave($event)"
                    [draggable]="tree.draggableNodes"
                    (dragstart)="onDragStart($event)"
                    (dragend)="onDragStop($event)"
                    [ngClass]="{ 'p-treenode-selectable': tree.selectionMode && node.selectable !== false, 'p-treenode-dragover': draghoverNode, 'p-highlight': isSelected() }"
                >
                    <button type="button" [attr.data-pc-section]="'toggler'" class="p-tree-toggler p-link" (click)="toggle($event)" pRipple tabindex="-1" aria-hidden="true">
                        <ng-container *ngIf="!tree.togglerIconTemplate">
                            <ChevronRightIcon *ngIf="!node.expanded" [styleClass]="'p-tree-toggler-icon'" />
                            <ChevronDownIcon *ngIf="node.expanded" [styleClass]="'p-tree-toggler-icon'" />
                        </ng-container>
                        <span *ngIf="tree.togglerIconTemplate" class="p-tree-toggler-icon">
                            <ng-template *ngTemplateOutlet="tree.togglerIconTemplate; context: { $implicit: node.expanded }"></ng-template>
                        </span>
                    </button>
                    <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-disabled p-disabled': node.selectable === false }" *ngIf="tree.selectionMode == 'checkbox'" aria-hidden="true">
                        <div class="p-checkbox-box" [ngClass]="{ 'p-highlight': isSelected(), 'p-indeterminate': node.partialSelected }" role="checkbox">
                            <ng-container *ngIf="!tree.checkboxIconTemplate">
                                <CheckIcon *ngIf="!node.partialSelected && isSelected()" [styleClass]="'p-checkbox-icon'" />
                                <MinusIcon *ngIf="node.partialSelected" [styleClass]="'p-checkbox-icon'" />
                            </ng-container>
                            <ng-template *ngTemplateOutlet="tree.checkboxIconTemplate; context: { $implicit: isSelected(), partialSelected: node.partialSelected }"></ng-template>
                        </div>
                    </div>
                    <span [class]="getIcon()" *ngIf="node.icon || node.expandedIcon || node.collapsedIcon"></span>
                    <span class="p-treenode-label">
                        <span *ngIf="!tree.getTemplateForNode(node)">{{ node.label }}</span>
                        <span *ngIf="tree.getTemplateForNode(node)">
                            <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: { $implicit: node }"></ng-container>
                        </span>
                    </span>
                </div>
                <ul class="p-treenode-children" style="display: none;" *ngIf="!tree.virtualScroll && node.children && node.expanded" [style.display]="node.expanded ? 'block' : 'none'" role="tree">
                    <p-treeNode
                        *ngFor="let childNode of node.children; let firstChild = first; let lastChild = last; let index = index; trackBy: tree.trackBy"
                        [node]="childNode"
                        [parentNode]="node"
                        [firstChild]="firstChild"
                        [lastChild]="lastChild"
                        [index]="index"
                        [itemSize]="itemSize"
                        [level]="level + 1"
                    ></p-treeNode>
                </ul>
            </li>

            <li
                *ngIf="tree.droppableNodes && lastChild"
                class="p-treenode-droppoint"
                [ngClass]="{ 'p-treenode-droppoint-active': draghoverNext }"
                (drop)="onDropPoint($event, 1)"
                [attr.aria-hidden]="true"
                (dragover)="onDropPointDragOver($event)"
                (dragenter)="onDropPointDragEnter($event, 1)"
                (dragleave)="onDropPointDragLeave($event)"
            ></li>

            <table *ngIf="tree.horizontal" [class]="node.styleClass">
                <tbody>
                    <tr>
                        <td class="p-treenode-connector" *ngIf="!root">
                            <table class="p-treenode-connector-table">
                                <tbody>
                                    <tr>
                                        <td [ngClass]="{ 'p-treenode-connector-line': !firstChild }"></td>
                                    </tr>
                                    <tr>
                                        <td [ngClass]="{ 'p-treenode-connector-line': !lastChild }"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="p-treenode" [ngClass]="{ 'p-treenode-collapsed': !node.expanded }">
                            <div
                                class="p-treenode-content"
                                tabindex="0"
                                [ngClass]="{ 'p-treenode-selectable': tree.selectionMode, 'p-highlight': isSelected() }"
                                (click)="onNodeClick($event)"
                                (contextmenu)="onNodeRightClick($event)"
                                (touchend)="onNodeTouchEnd()"
                                (keydown)="onNodeKeydown($event)"
                            >
                                <span *ngIf="!isLeaf()" [ngClass]="'p-tree-toggler'" (click)="toggle($event)">
                                    <ng-container *ngIf="!tree.togglerIconTemplate">
                                        <PlusIcon *ngIf="!node.expanded" [styleClass]="'p-tree-toggler-icon'" [ariaLabel]="tree.togglerAriaLabel" />
                                        <MinusIcon *ngIf="node.expanded" [styleClass]="'p-tree-toggler-icon'" [ariaLabel]="tree.togglerAriaLabel" />
                                    </ng-container>
                                    <span *ngIf="tree.togglerIconTemplate" class="p-tree-toggler-icon">
                                        <ng-template *ngTemplateOutlet="tree.togglerIconTemplate; context: { $implicit: node.expanded }"></ng-template>
                                    </span>
                                </span>
                                <span [class]="getIcon()" *ngIf="node.icon || node.expandedIcon || node.collapsedIcon"></span>
                                <span class="p-treenode-label">
                                    <span *ngIf="!tree.getTemplateForNode(node)">{{ node.label }}</span>
                                    <span *ngIf="tree.getTemplateForNode(node)">
                                        <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: { $implicit: node }"></ng-container>
                                    </span>
                                </span>
                            </div>
                        </td>
                        <td class="p-treenode-children-container" *ngIf="node.children && node.expanded" [style.display]="node.expanded ? 'table-cell' : 'none'">
                            <div class="p-treenode-children">
                                <p-treeNode *ngFor="let childNode of node.children; let firstChild = first; let lastChild = last; trackBy: tree.trackBy" [node]="childNode" [firstChild]="firstChild" [lastChild]="lastChild"></p-treeNode>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ng-template>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => CheckIcon), selector: "CheckIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(() => MinusIcon), selector: "MinusIcon" }, { kind: "component", type: i0.forwardRef(() => PlusIcon), selector: "PlusIcon" }, { kind: "component", type: i0.forwardRef(() => UITreeNode), selector: "p-treeNode", inputs: ["rowNode", "node", "parentNode", "root", "index", "firstChild", "lastChild", "level", "indentation", "itemSize"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: UITreeNode, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-treeNode',
                    template: `
        <ng-template [ngIf]="node">
            <li
                *ngIf="tree.droppableNodes"
                class="p-treenode-droppoint"
                [attr.aria-hidden]="true"
                [ngClass]="{ 'p-treenode-droppoint-active': draghoverPrev }"
                (drop)="onDropPoint($event, -1)"
                (dragover)="onDropPointDragOver($event)"
                (dragenter)="onDropPointDragEnter($event, -1)"
                (dragleave)="onDropPointDragLeave($event)"
            ></li>
            <li
                *ngIf="!tree.horizontal"
                [ngClass]="['p-treenode', node.styleClass || '', isLeaf() ? 'p-treenode-leaf' : '']"
                [ngStyle]="{ height: itemSize + 'px' }"
                [style]="node.style"
                [attr.aria-label]="node.label"
                [attr.aria-checked]="ariaChecked"
                [attr.aria-setsize]="node.children ? node.children.length : 0"
                [attr.aria-selected]="ariaSelected"
                [attr.aria-expanded]="node.expanded"
                [attr.aria-posinset]="index + 1"
                [attr.aria-level]="level + 1"
                [attr.tabindex]="index === 0 ? 0 : -1"
                [attr.data-id]="node.key"
                role="treeitem"
                (keydown)="onKeyDown($event)"
            >
                <div
                    class="p-treenode-content"
                    [style.paddingLeft]="level * indentation + 'rem'"
                    (click)="onNodeClick($event)"
                    (contextmenu)="onNodeRightClick($event)"
                    (touchend)="onNodeTouchEnd()"
                    (drop)="onDropNode($event)"
                    (dragover)="onDropNodeDragOver($event)"
                    (dragenter)="onDropNodeDragEnter($event)"
                    (dragleave)="onDropNodeDragLeave($event)"
                    [draggable]="tree.draggableNodes"
                    (dragstart)="onDragStart($event)"
                    (dragend)="onDragStop($event)"
                    [ngClass]="{ 'p-treenode-selectable': tree.selectionMode && node.selectable !== false, 'p-treenode-dragover': draghoverNode, 'p-highlight': isSelected() }"
                >
                    <button type="button" [attr.data-pc-section]="'toggler'" class="p-tree-toggler p-link" (click)="toggle($event)" pRipple tabindex="-1" aria-hidden="true">
                        <ng-container *ngIf="!tree.togglerIconTemplate">
                            <ChevronRightIcon *ngIf="!node.expanded" [styleClass]="'p-tree-toggler-icon'" />
                            <ChevronDownIcon *ngIf="node.expanded" [styleClass]="'p-tree-toggler-icon'" />
                        </ng-container>
                        <span *ngIf="tree.togglerIconTemplate" class="p-tree-toggler-icon">
                            <ng-template *ngTemplateOutlet="tree.togglerIconTemplate; context: { $implicit: node.expanded }"></ng-template>
                        </span>
                    </button>
                    <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-disabled p-disabled': node.selectable === false }" *ngIf="tree.selectionMode == 'checkbox'" aria-hidden="true">
                        <div class="p-checkbox-box" [ngClass]="{ 'p-highlight': isSelected(), 'p-indeterminate': node.partialSelected }" role="checkbox">
                            <ng-container *ngIf="!tree.checkboxIconTemplate">
                                <CheckIcon *ngIf="!node.partialSelected && isSelected()" [styleClass]="'p-checkbox-icon'" />
                                <MinusIcon *ngIf="node.partialSelected" [styleClass]="'p-checkbox-icon'" />
                            </ng-container>
                            <ng-template *ngTemplateOutlet="tree.checkboxIconTemplate; context: { $implicit: isSelected(), partialSelected: node.partialSelected }"></ng-template>
                        </div>
                    </div>
                    <span [class]="getIcon()" *ngIf="node.icon || node.expandedIcon || node.collapsedIcon"></span>
                    <span class="p-treenode-label">
                        <span *ngIf="!tree.getTemplateForNode(node)">{{ node.label }}</span>
                        <span *ngIf="tree.getTemplateForNode(node)">
                            <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: { $implicit: node }"></ng-container>
                        </span>
                    </span>
                </div>
                <ul class="p-treenode-children" style="display: none;" *ngIf="!tree.virtualScroll && node.children && node.expanded" [style.display]="node.expanded ? 'block' : 'none'" role="tree">
                    <p-treeNode
                        *ngFor="let childNode of node.children; let firstChild = first; let lastChild = last; let index = index; trackBy: tree.trackBy"
                        [node]="childNode"
                        [parentNode]="node"
                        [firstChild]="firstChild"
                        [lastChild]="lastChild"
                        [index]="index"
                        [itemSize]="itemSize"
                        [level]="level + 1"
                    ></p-treeNode>
                </ul>
            </li>

            <li
                *ngIf="tree.droppableNodes && lastChild"
                class="p-treenode-droppoint"
                [ngClass]="{ 'p-treenode-droppoint-active': draghoverNext }"
                (drop)="onDropPoint($event, 1)"
                [attr.aria-hidden]="true"
                (dragover)="onDropPointDragOver($event)"
                (dragenter)="onDropPointDragEnter($event, 1)"
                (dragleave)="onDropPointDragLeave($event)"
            ></li>

            <table *ngIf="tree.horizontal" [class]="node.styleClass">
                <tbody>
                    <tr>
                        <td class="p-treenode-connector" *ngIf="!root">
                            <table class="p-treenode-connector-table">
                                <tbody>
                                    <tr>
                                        <td [ngClass]="{ 'p-treenode-connector-line': !firstChild }"></td>
                                    </tr>
                                    <tr>
                                        <td [ngClass]="{ 'p-treenode-connector-line': !lastChild }"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="p-treenode" [ngClass]="{ 'p-treenode-collapsed': !node.expanded }">
                            <div
                                class="p-treenode-content"
                                tabindex="0"
                                [ngClass]="{ 'p-treenode-selectable': tree.selectionMode, 'p-highlight': isSelected() }"
                                (click)="onNodeClick($event)"
                                (contextmenu)="onNodeRightClick($event)"
                                (touchend)="onNodeTouchEnd()"
                                (keydown)="onNodeKeydown($event)"
                            >
                                <span *ngIf="!isLeaf()" [ngClass]="'p-tree-toggler'" (click)="toggle($event)">
                                    <ng-container *ngIf="!tree.togglerIconTemplate">
                                        <PlusIcon *ngIf="!node.expanded" [styleClass]="'p-tree-toggler-icon'" [ariaLabel]="tree.togglerAriaLabel" />
                                        <MinusIcon *ngIf="node.expanded" [styleClass]="'p-tree-toggler-icon'" [ariaLabel]="tree.togglerAriaLabel" />
                                    </ng-container>
                                    <span *ngIf="tree.togglerIconTemplate" class="p-tree-toggler-icon">
                                        <ng-template *ngTemplateOutlet="tree.togglerIconTemplate; context: { $implicit: node.expanded }"></ng-template>
                                    </span>
                                </span>
                                <span [class]="getIcon()" *ngIf="node.icon || node.expandedIcon || node.collapsedIcon"></span>
                                <span class="p-treenode-label">
                                    <span *ngIf="!tree.getTemplateForNode(node)">{{ node.label }}</span>
                                    <span *ngIf="tree.getTemplateForNode(node)">
                                        <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: { $implicit: node }"></ng-container>
                                    </span>
                                </span>
                            </div>
                        </td>
                        <td class="p-treenode-children-container" *ngIf="node.children && node.expanded" [style.display]="node.expanded ? 'table-cell' : 'none'">
                            <div class="p-treenode-children">
                                <p-treeNode *ngFor="let childNode of node.children; let firstChild = first; let lastChild = last; trackBy: tree.trackBy" [node]="childNode" [firstChild]="firstChild" [lastChild]="lastChild"></p-treeNode>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ng-template>
    `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Tree, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => Tree)]
                }] }], propDecorators: { rowNode: [{
                type: Input
            }], node: [{
                type: Input
            }], parentNode: [{
                type: Input
            }], root: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], index: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], firstChild: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], lastChild: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], level: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], indentation: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], itemSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }] } });
/**
 * Tree is used to display hierarchical data.
 * @group Components
 */
export class Tree {
    el;
    dragDropService;
    config;
    cd;
    /**
     * An array of treenodes.
     * @group Props
     */
    value;
    /**
     * Defines the selection mode.
     * @group Props
     */
    selectionMode;
    /**
     * A single treenode instance or an array to refer to the selections.
     * @group Props
     */
    selection;
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
     * Context menu instance.
     * @group Props
     */
    contextMenu;
    /**
     * Defines the orientation of the tree, valid values are 'vertical' and 'horizontal'.
     * @group Props
     */
    layout = 'vertical';
    /**
     * Scope of the draggable nodes to match a droppableScope.
     * @group Props
     */
    draggableScope;
    /**
     * Scope of the droppable nodes to match a draggableScope.
     * @group Props
     */
    droppableScope;
    /**
     * Whether the nodes are draggable.
     * @group Props
     */
    draggableNodes;
    /**
     * Whether the nodes are droppable.
     * @group Props
     */
    droppableNodes;
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    metaKeySelection = false;
    /**
     * Whether checkbox selections propagate to ancestor nodes.
     * @group Props
     */
    propagateSelectionUp = true;
    /**
     * Whether checkbox selections propagate to descendant nodes.
     * @group Props
     */
    propagateSelectionDown = true;
    /**
     * Displays a loader to indicate data load is in progress.
     * @group Props
     */
    loading;
    /**
     * The icon to show while indicating data load is in progress.
     * @group Props
     */
    loadingIcon;
    /**
     * Text to display when there is no data.
     * @group Props
     */
    emptyMessage = '';
    /**
     * Used to define a string that labels the tree.
     * @group Props
     */
    ariaLabel;
    /**
     * Defines a string that labels the toggler icon for accessibility.
     * @group Props
     */
    togglerAriaLabel;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * When enabled, drop can be accepted or rejected based on condition defined at onNodeDrop.
     * @group Props
     */
    validateDrop;
    /**
     * When specified, displays an input field to filter the items.
     * @group Props
     */
    filter;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    filterBy = 'label';
    /**
     * Mode for filtering valid values are "lenient" and "strict". Default is lenient.
     * @group Props
     */
    filterMode = 'lenient';
    /**
     * Placeholder text to show when filter input is empty.
     * @group Props
     */
    filterPlaceholder;
    /**
     * Values after the tree nodes are filtered.
     * @group Props
     */
    filteredNodes;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale;
    /**
     * Height of the scrollable viewport.
     * @group Props
     */
    scrollHeight;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    lazy = false;
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    virtualScroll;
    /**
     * Height of an item in the list for VirtualScrolling.
     * @group Props
     */
    virtualScrollItemSize;
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    virtualScrollOptions;
    /**
     * Indentation factor for spacing of the nested node when virtual scrolling is enabled.
     * @group Props
     */
    indentation = 1.5;
    /**
     * Custom templates of the component.
     * @group Props
     */
    _templateMap;
    /**
     * Function to optimize the node list rendering, default algorithm checks for object identity.
     * @group Props
     */
    trackBy = (index, item) => item;
    /**
     * Height of the node.
     * @group Props
     * @deprecated use virtualScrollItemSize property instead.
     */
    _virtualNodeHeight;
    get virtualNodeHeight() {
        return this._virtualNodeHeight;
    }
    set virtualNodeHeight(val) {
        this._virtualNodeHeight = val;
        console.warn('The virtualNodeHeight property is deprecated, use virtualScrollItemSize property instead.');
    }
    /**
     * Callback to invoke on selection change.
     * @param {(TreeNode<any> | TreeNode<any>[] | null)} event - Custom selection change event.
     * @group Emits
     */
    selectionChange = new EventEmitter();
    /**
     * Callback to invoke when a node is selected.
     * @param {TreeNodeSelectEvent} event - Node select event.
     * @group Emits
     */
    onNodeSelect = new EventEmitter();
    /**
     * Callback to invoke when a node is unselected.
     * @param {TreeNodeUnSelectEvent} event - Node unselect event.
     * @group Emits
     */
    onNodeUnselect = new EventEmitter();
    /**
     * Callback to invoke when a node is expanded.
     * @param {TreeNodeExpandEvent} event - Node expand event.
     * @group Emits
     */
    onNodeExpand = new EventEmitter();
    /**
     * Callback to invoke when a node is collapsed.
     * @param {TreeNodeCollapseEvent} event - Node collapse event.
     * @group Emits
     */
    onNodeCollapse = new EventEmitter();
    /**
     * Callback to invoke when a node is selected with right click.
     * @param {onNodeContextMenuSelect} event - Node context menu select event.
     * @group Emits
     */
    onNodeContextMenuSelect = new EventEmitter();
    /**
     * Callback to invoke when a node is dropped.
     * @param {TreeNodeDropEvent} event - Node drop event.
     * @group Emits
     */
    onNodeDrop = new EventEmitter();
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {TreeLazyLoadEvent} event - Custom lazy load event.
     * @group Emits
     */
    onLazyLoad = new EventEmitter();
    /**
     * Callback to invoke in virtual scroll mode when scroll position changes.
     * @param {TreeScrollEvent} event - Custom scroll event.
     * @group Emits
     */
    onScroll = new EventEmitter();
    /**
     * Callback to invoke in virtual scroll mode when scroll position and item's range in view changes.
     * @param {TreeScrollIndexChangeEvent} event - Scroll index change event.
     * @group Emits
     */
    onScrollIndexChange = new EventEmitter();
    /**
     * Callback to invoke when data is filtered.
     * @param {TreeFilterEvent} event - Custom filter event.
     * @group Emits
     */
    onFilter = new EventEmitter();
    templates;
    filterViewChild;
    scroller;
    wrapperViewChild;
    serializedValue;
    headerTemplate;
    footerTemplate;
    loaderTemplate;
    emptyMessageTemplate;
    togglerIconTemplate;
    checkboxIconTemplate;
    loadingIconTemplate;
    filterIconTemplate;
    nodeTouched;
    dragNodeTree;
    dragNode;
    dragNodeSubNodes;
    dragNodeIndex;
    dragNodeScope;
    dragHover;
    dragStartSubscription;
    dragStopSubscription;
    constructor(el, dragDropService, config, cd) {
        this.el = el;
        this.dragDropService = dragDropService;
        this.config = config;
        this.cd = cd;
    }
    ngOnInit() {
        if (this.droppableNodes) {
            this.dragStartSubscription = this.dragDropService.dragStart$.subscribe((event) => {
                this.dragNodeTree = event.tree;
                this.dragNode = event.node;
                this.dragNodeSubNodes = event.subNodes;
                this.dragNodeIndex = event.index;
                this.dragNodeScope = event.scope;
            });
            this.dragStopSubscription = this.dragDropService.dragStop$.subscribe((event) => {
                this.dragNodeTree = null;
                this.dragNode = null;
                this.dragNodeSubNodes = null;
                this.dragNodeIndex = null;
                this.dragNodeScope = null;
                this.dragHover = false;
            });
        }
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.value) {
            this.updateSerializedValue();
        }
    }
    get horizontal() {
        return this.layout == 'horizontal';
    }
    get emptyMessageLabel() {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }
    ngAfterContentInit() {
        if (this.templates.length) {
            this._templateMap = {};
        }
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'empty':
                    this.emptyMessageTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'loader':
                    this.loaderTemplate = item.template;
                    break;
                case 'togglericon':
                    this.togglerIconTemplate = item.template;
                    break;
                case 'checkboxicon':
                    this.checkboxIconTemplate = item.template;
                    break;
                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;
                case 'filtericon':
                    this.filterIconTemplate = item.template;
                    break;
                default:
                    this._templateMap[item.name] = item.template;
                    break;
            }
        });
    }
    updateSerializedValue() {
        this.serializedValue = [];
        this.serializeNodes(null, this.getRootNode(), 0, true);
    }
    serializeNodes(parent, nodes, level, visible) {
        if (nodes && nodes.length) {
            for (let node of nodes) {
                node.parent = parent;
                const rowNode = {
                    node: node,
                    parent: parent,
                    level: level,
                    visible: visible && (parent ? parent.expanded : true)
                };
                this.serializedValue.push(rowNode);
                if (rowNode.visible && node.expanded) {
                    this.serializeNodes(node, node.children, level + 1, rowNode.visible);
                }
            }
        }
    }
    onNodeClick(event, node) {
        let eventTarget = event.target;
        if (DomHandler.hasClass(eventTarget, 'p-tree-toggler') || DomHandler.hasClass(eventTarget, 'p-tree-toggler-icon')) {
            return;
        }
        else if (this.selectionMode) {
            if (node.selectable === false) {
                return;
            }
            if (this.hasFilteredNodes()) {
                node = this.getNodeWithKey(node.key, this.filteredNodes);
                if (!node) {
                    return;
                }
            }
            let index = this.findIndexInSelection(node);
            let selected = index >= 0;
            if (this.isCheckboxSelectionMode()) {
                if (selected) {
                    if (this.propagateSelectionDown)
                        this.propagateDown(node, false);
                    else
                        this.selection = this.selection.filter((val, i) => i != index);
                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, false);
                    }
                    this.selectionChange.emit(this.selection);
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                }
                else {
                    if (this.propagateSelectionDown)
                        this.propagateDown(node, true);
                    else
                        this.selection = [...(this.selection || []), node];
                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, true);
                    }
                    this.selectionChange.emit(this.selection);
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            else {
                let metaSelection = this.nodeTouched ? false : this.metaKeySelection;
                if (metaSelection) {
                    let metaKey = event.metaKey || event.ctrlKey;
                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(null);
                        }
                        else {
                            this.selection = this.selection.filter((val, i) => i != index);
                            this.selectionChange.emit(this.selection);
                        }
                        this.onNodeUnselect.emit({ originalEvent: event, node: node });
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(node);
                        }
                        else if (this.isMultipleSelectionMode()) {
                            this.selection = !metaKey ? [] : this.selection || [];
                            this.selection = [...this.selection, node];
                            this.selectionChange.emit(this.selection);
                        }
                        this.onNodeSelect.emit({ originalEvent: event, node: node });
                    }
                }
                else {
                    if (this.isSingleSelectionMode()) {
                        if (selected) {
                            this.selection = null;
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        }
                        else {
                            this.selection = node;
                            this.onNodeSelect.emit({ originalEvent: event, node: node });
                        }
                    }
                    else {
                        if (selected) {
                            this.selection = this.selection.filter((val, i) => i != index);
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        }
                        else {
                            this.selection = [...(this.selection || []), node];
                            this.onNodeSelect.emit({ originalEvent: event, node: node });
                        }
                    }
                    this.selectionChange.emit(this.selection);
                }
            }
        }
        this.nodeTouched = false;
    }
    onNodeTouchEnd() {
        this.nodeTouched = true;
    }
    onNodeRightClick(event, node) {
        if (this.contextMenu) {
            let eventTarget = event.target;
            if (eventTarget.className && eventTarget.className.indexOf('p-tree-toggler') === 0) {
                return;
            }
            else {
                let index = this.findIndexInSelection(node);
                let selected = index >= 0;
                if (!selected) {
                    if (this.isSingleSelectionMode())
                        this.selectionChange.emit(node);
                    else
                        this.selectionChange.emit([node]);
                }
                this.contextMenu.show(event);
                this.onNodeContextMenuSelect.emit({ originalEvent: event, node: node });
            }
        }
    }
    findIndexInSelection(node) {
        let index = -1;
        if (this.selectionMode && this.selection) {
            if (this.isSingleSelectionMode()) {
                let areNodesEqual = (this.selection.key && this.selection.key === node.key) || this.selection == node;
                index = areNodesEqual ? 0 : -1;
            }
            else {
                for (let i = 0; i < this.selection.length; i++) {
                    let selectedNode = this.selection[i];
                    let areNodesEqual = (selectedNode.key && selectedNode.key === node.key) || selectedNode == node;
                    if (areNodesEqual) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    }
    syncNodeOption(node, parentNodes, option, value) {
        // to synchronize the node option between the filtered nodes and the original nodes(this.value)
        const _node = this.hasFilteredNodes() ? this.getNodeWithKey(node.key, parentNodes) : null;
        if (_node) {
            _node[option] = value || node[option];
        }
    }
    hasFilteredNodes() {
        return this.filter && this.filteredNodes && this.filteredNodes.length;
    }
    getNodeWithKey(key, nodes) {
        for (let node of nodes) {
            if (node.key === key) {
                return node;
            }
            if (node.children) {
                let matchedNode = this.getNodeWithKey(key, node.children);
                if (matchedNode) {
                    return matchedNode;
                }
            }
        }
    }
    propagateUp(node, select) {
        if (node.children && node.children.length) {
            let selectedCount = 0;
            let childPartialSelected = false;
            for (let child of node.children) {
                if (this.isSelected(child)) {
                    selectedCount++;
                }
                else if (child.partialSelected) {
                    childPartialSelected = true;
                }
            }
            if (select && selectedCount == node.children.length) {
                this.selection = [...(this.selection || []), node];
                node.partialSelected = false;
            }
            else {
                if (!select) {
                    let index = this.findIndexInSelection(node);
                    if (index >= 0) {
                        this.selection = this.selection.filter((val, i) => i != index);
                    }
                }
                if (childPartialSelected || (selectedCount > 0 && selectedCount != node.children.length))
                    node.partialSelected = true;
                else
                    node.partialSelected = false;
            }
            this.syncNodeOption(node, this.filteredNodes, 'partialSelected');
        }
        let parent = node.parent;
        if (parent) {
            this.propagateUp(parent, select);
        }
    }
    propagateDown(node, select) {
        let index = this.findIndexInSelection(node);
        if (select && index == -1) {
            this.selection = [...(this.selection || []), node];
        }
        else if (!select && index > -1) {
            this.selection = this.selection.filter((val, i) => i != index);
        }
        node.partialSelected = false;
        this.syncNodeOption(node, this.filteredNodes, 'partialSelected');
        if (node.children && node.children.length) {
            for (let child of node.children) {
                this.propagateDown(child, select);
            }
        }
    }
    isSelected(node) {
        return this.findIndexInSelection(node) != -1;
    }
    isSingleSelectionMode() {
        return this.selectionMode && this.selectionMode == 'single';
    }
    isMultipleSelectionMode() {
        return this.selectionMode && this.selectionMode == 'multiple';
    }
    isCheckboxSelectionMode() {
        return this.selectionMode && this.selectionMode == 'checkbox';
    }
    isNodeLeaf(node) {
        return node.leaf == false ? false : !(node.children && node.children.length);
    }
    getRootNode() {
        return this.filteredNodes ? this.filteredNodes : this.value;
    }
    getTemplateForNode(node) {
        if (this._templateMap)
            return node.type ? this._templateMap[node.type] : this._templateMap['default'];
        else
            return null;
    }
    onDragOver(event) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.dataTransfer.dropEffect = 'move';
            event.preventDefault();
        }
    }
    onDrop(event) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.preventDefault();
            let dragNode = this.dragNode;
            if (this.allowDrop(dragNode, null, this.dragNodeScope)) {
                let dragNodeIndex = this.dragNodeIndex;
                this.value = this.value || [];
                if (this.validateDrop) {
                    this.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: null,
                        index: dragNodeIndex,
                        accept: () => {
                            this.processTreeDrop(dragNode, dragNodeIndex);
                        }
                    });
                }
                else {
                    this.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: null,
                        index: dragNodeIndex
                    });
                    this.processTreeDrop(dragNode, dragNodeIndex);
                }
            }
        }
    }
    processTreeDrop(dragNode, dragNodeIndex) {
        this.dragNodeSubNodes.splice(dragNodeIndex, 1);
        this.value.push(dragNode);
        this.dragDropService.stopDrag({
            node: dragNode
        });
    }
    onDragEnter() {
        if (this.droppableNodes && this.allowDrop(this.dragNode, null, this.dragNodeScope)) {
            this.dragHover = true;
        }
    }
    onDragLeave(event) {
        if (this.droppableNodes) {
            let rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y > rect.top + rect.height || event.y < rect.top) {
                this.dragHover = false;
            }
        }
    }
    allowDrop(dragNode, dropNode, dragNodeScope) {
        if (!dragNode) {
            //prevent random html elements to be dragged
            return false;
        }
        else if (this.isValidDragScope(dragNodeScope)) {
            let allow = true;
            if (dropNode) {
                if (dragNode === dropNode) {
                    allow = false;
                }
                else {
                    let parent = dropNode.parent;
                    while (parent != null) {
                        if (parent === dragNode) {
                            allow = false;
                            break;
                        }
                        parent = parent.parent;
                    }
                }
            }
            return allow;
        }
        else {
            return false;
        }
    }
    isValidDragScope(dragScope) {
        let dropScope = this.droppableScope;
        if (dropScope) {
            if (typeof dropScope === 'string') {
                if (typeof dragScope === 'string')
                    return dropScope === dragScope;
                else if (Array.isArray(dragScope))
                    return dragScope.indexOf(dropScope) != -1;
            }
            else if (Array.isArray(dropScope)) {
                if (typeof dragScope === 'string') {
                    return dropScope.indexOf(dragScope) != -1;
                }
                else if (Array.isArray(dragScope)) {
                    for (let s of dropScope) {
                        for (let ds of dragScope) {
                            if (s === ds) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }
        else {
            return true;
        }
    }
    _filter(value) {
        let filterValue = value;
        if (filterValue === '') {
            this.filteredNodes = null;
        }
        else {
            this.filteredNodes = [];
            const searchFields = this.filterBy.split(',');
            const filterText = ObjectUtils.removeAccents(filterValue).toLocaleLowerCase(this.filterLocale);
            const isStrictMode = this.filterMode === 'strict';
            for (let node of this.value) {
                let copyNode = { ...node };
                let paramsWithoutNode = { searchFields, filterText, isStrictMode };
                if ((isStrictMode && (this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode))) ||
                    (!isStrictMode && (this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode)))) {
                    this.filteredNodes.push(copyNode);
                }
            }
        }
        this.updateSerializedValue();
        this.onFilter.emit({
            filter: filterValue,
            filteredValue: this.filteredNodes
        });
    }
    /**
     * Resets filter.
     * @group Method
     */
    resetFilter() {
        this.filteredNodes = null;
        if (this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterViewChild.nativeElement.value = '';
        }
    }
    /**
     * Scrolls to virtual index.
     * @param {number} number - Index to be scrolled.
     * @group Method
     */
    scrollToVirtualIndex(index) {
        this.virtualScroll && this.scroller?.scrollToIndex(index);
    }
    /**
     * Scrolls to virtual index.
     * @param {ScrollToOptions} options - Scroll options.
     * @group Method
     */
    scrollTo(options) {
        if (this.virtualScroll) {
            this.scroller?.scrollTo(options);
        }
        else if (this.wrapperViewChild && this.wrapperViewChild.nativeElement) {
            if (this.wrapperViewChild.nativeElement.scrollTo) {
                this.wrapperViewChild.nativeElement.scrollTo(options);
            }
            else {
                this.wrapperViewChild.nativeElement.scrollLeft = options.left;
                this.wrapperViewChild.nativeElement.scrollTop = options.top;
            }
        }
    }
    findFilteredNodes(node, paramsWithoutNode) {
        if (node) {
            let matched = false;
            if (node.children) {
                let childNodes = [...node.children];
                node.children = [];
                for (let childNode of childNodes) {
                    let copyChildNode = { ...childNode };
                    if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                        matched = true;
                        node.children.push(copyChildNode);
                    }
                }
            }
            if (matched) {
                node.expanded = true;
                return true;
            }
        }
    }
    isFilterMatched(node, params) {
        let { searchFields, filterText, isStrictMode } = params;
        let matched = false;
        for (let field of searchFields) {
            let fieldValue = ObjectUtils.removeAccents(String(ObjectUtils.resolveFieldData(node, field))).toLocaleLowerCase(this.filterLocale);
            if (fieldValue.indexOf(filterText) > -1) {
                matched = true;
            }
        }
        if (!matched || (isStrictMode && !this.isNodeLeaf(node))) {
            matched = this.findFilteredNodes(node, { searchFields, filterText, isStrictMode }) || matched;
        }
        return matched;
    }
    getIndex(options, index) {
        const getItemOptions = options['getItemOptions'];
        return getItemOptions ? getItemOptions(index).index : index;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    ngOnDestroy() {
        if (this.dragStartSubscription) {
            this.dragStartSubscription.unsubscribe();
        }
        if (this.dragStopSubscription) {
            this.dragStopSubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Tree, deps: [{ token: i0.ElementRef }, { token: i3.TreeDragDropService, optional: true }, { token: i3.PrimeNGConfig }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: Tree, selector: "p-tree", inputs: { value: "value", selectionMode: "selectionMode", selection: "selection", style: "style", styleClass: "styleClass", contextMenu: "contextMenu", layout: "layout", draggableScope: "draggableScope", droppableScope: "droppableScope", draggableNodes: ["draggableNodes", "draggableNodes", booleanAttribute], droppableNodes: ["droppableNodes", "droppableNodes", booleanAttribute], metaKeySelection: ["metaKeySelection", "metaKeySelection", booleanAttribute], propagateSelectionUp: ["propagateSelectionUp", "propagateSelectionUp", booleanAttribute], propagateSelectionDown: ["propagateSelectionDown", "propagateSelectionDown", booleanAttribute], loading: ["loading", "loading", booleanAttribute], loadingIcon: "loadingIcon", emptyMessage: "emptyMessage", ariaLabel: "ariaLabel", togglerAriaLabel: "togglerAriaLabel", ariaLabelledBy: "ariaLabelledBy", validateDrop: ["validateDrop", "validateDrop", booleanAttribute], filter: ["filter", "filter", booleanAttribute], filterBy: "filterBy", filterMode: "filterMode", filterPlaceholder: "filterPlaceholder", filteredNodes: "filteredNodes", filterLocale: "filterLocale", scrollHeight: "scrollHeight", lazy: ["lazy", "lazy", booleanAttribute], virtualScroll: ["virtualScroll", "virtualScroll", booleanAttribute], virtualScrollItemSize: ["virtualScrollItemSize", "virtualScrollItemSize", numberAttribute], virtualScrollOptions: "virtualScrollOptions", indentation: ["indentation", "indentation", numberAttribute], _templateMap: "_templateMap", trackBy: "trackBy", virtualNodeHeight: "virtualNodeHeight" }, outputs: { selectionChange: "selectionChange", onNodeSelect: "onNodeSelect", onNodeUnselect: "onNodeUnselect", onNodeExpand: "onNodeExpand", onNodeCollapse: "onNodeCollapse", onNodeContextMenuSelect: "onNodeContextMenuSelect", onNodeDrop: "onNodeDrop", onLazyLoad: "onLazyLoad", onScroll: "onScroll", onScrollIndexChange: "onScrollIndexChange", onFilter: "onFilter" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "filterViewChild", first: true, predicate: ["filter"], descendants: true }, { propertyName: "scroller", first: true, predicate: ["scroller"], descendants: true }, { propertyName: "wrapperViewChild", first: true, predicate: ["wrapper"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <div
            [ngClass]="{ 'p-tree p-component': true, 'p-tree-selectable': selectionMode, 'p-treenode-dragover': dragHover, 'p-tree-loading': loading, 'p-tree-flex-scrollable': scrollHeight === 'flex' }"
            [ngStyle]="style"
            [class]="styleClass"
            *ngIf="!horizontal"
            (drop)="onDrop($event)"
            (dragover)="onDragOver($event)"
            (dragenter)="onDragEnter()"
            (dragleave)="onDragLeave($event)"
        >
            <div class="p-tree-loading-overlay p-component-overlay" *ngIf="loading">
                <i *ngIf="loadingIcon" [class]="'p-tree-loading-icon pi-spin ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-tree-loading-icon'" />
                    <span *ngIf="loadingIconTemplate" class="p-tree-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            <div *ngIf="filter" class="p-tree-filter-container">
                <input #filter type="text" autocomplete="off" class="p-tree-filter p-inputtext p-component" [attr.placeholder]="filterPlaceholder" (keydown.enter)="$event.preventDefault()" (input)="_filter($event.target.value)" />
                <SearchIcon *ngIf="!filterIconTemplate" [styleClass]="'p-tree-filter-icon'" />
                <span *ngIf="filterIconTemplate" class="p-tree-filter-icon">
                    <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                </span>
            </div>

            <p-scroller
                #scroller
                *ngIf="virtualScroll"
                [items]="serializedValue"
                [tabindex]="-1"
                styleClass="p-tree-wrapper"
                [style]="{ height: scrollHeight !== 'flex' ? scrollHeight : undefined }"
                [scrollHeight]="scrollHeight !== 'flex' ? undefined : '100%'"
                [itemSize]="virtualScrollItemSize || _virtualNodeHeight"
                [lazy]="lazy"
                (onScroll)="onScroll.emit($event)"
                (onScrollIndexChange)="onScrollIndexChange.emit($event)"
                (onLazyLoad)="onLazyLoad.emit($event)"
                [options]="virtualScrollOptions"
            >
                <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                    <ul *ngIf="items" class="p-tree-container" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="tree" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy">
                        <p-treeNode
                            #treeNode
                            *ngFor="let rowNode of items; let firstChild = first; let lastChild = last; let index = index; trackBy: trackBy"
                            [level]="rowNode.level"
                            [rowNode]="rowNode"
                            [node]="rowNode.node"
                            [parentNode]="rowNode.parent"
                            [firstChild]="firstChild"
                            [lastChild]="lastChild"
                            [index]="getIndex(scrollerOptions, index)"
                            [itemSize]="scrollerOptions.itemSize"
                            [indentation]="indentation"
                        ></p-treeNode>
                    </ul>
                </ng-template>
                <ng-container *ngIf="loaderTemplate">
                    <ng-template pTemplate="loader" let-scrollerOptions="options">
                        <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                    </ng-template>
                </ng-container>
            </p-scroller>
            <ng-container *ngIf="!virtualScroll">
                <div #wrapper class="p-tree-wrapper" [style.max-height]="scrollHeight">
                    <ul class="p-tree-container" *ngIf="getRootNode()" role="tree" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy">
                        <p-treeNode
                            *ngFor="let node of getRootNode(); let firstChild = first; let lastChild = last; let index = index; trackBy: trackBy"
                            [node]="node"
                            [firstChild]="firstChild"
                            [lastChild]="lastChild"
                            [index]="index"
                            [level]="0"
                        ></p-treeNode>
                    </ul>
                </div>
            </ng-container>

            <div class="p-tree-empty-message" *ngIf="!loading && (getRootNode() == null || getRootNode().length === 0)">
                <ng-container *ngIf="!emptyMessageTemplate; else emptyFilter">
                    {{ emptyMessageLabel }}
                </ng-container>
                <ng-container #emptyFilter *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
            </div>
            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </div>
        <div [ngClass]="{ 'p-tree p-tree-horizontal p-component': true, 'p-tree-selectable': selectionMode }" [ngStyle]="style" [class]="styleClass" *ngIf="horizontal">
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            <div class="p-tree-loading-mask p-component-overlay" *ngIf="loading">
                <i *ngIf="loadingIcon" [class]="'p-tree-loading-icon pi-spin ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-tree-loading-icon'" />
                    <span *ngIf="loadingIconTemplate" class="p-tree-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <table *ngIf="value && value[0]">
                <p-treeNode [node]="value[0]" [root]="true"></p-treeNode>
            </table>
            <div class="p-tree-empty-message" *ngIf="!loading && (getRootNode() == null || getRootNode().length === 0)">
                <ng-container *ngIf="!emptyMessageTemplate; else emptyFilter">
                    {{ emptyMessageLabel }}
                </ng-container>
                <ng-container #emptyFilter *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
            </div>
            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-tree-container{margin:0;padding:0;list-style-type:none;overflow:auto}.p-treenode-children{margin:0;padding:0;list-style-type:none}.p-tree-wrapper{overflow:auto}.p-treenode-selectable{cursor:pointer;user-select:none}.p-tree-toggler{cursor:pointer;user-select:none;display:inline-flex;align-items:center;justify-content:center;overflow:hidden;position:relative;flex-shrink:0}.p-treenode-leaf>.p-treenode-content .p-tree-toggler{visibility:hidden}.p-treenode-content{display:flex;align-items:center}.p-tree-filter{width:100%}.p-tree-filter-container{position:relative;display:block;width:100%}.p-tree-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-tree-loading{position:relative;min-height:4rem}.p-tree .p-tree-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;z-index:2}.p-tree-flex-scrollable{display:flex;flex:1;height:100%;flex-direction:column}.p-tree-flex-scrollable .p-tree-wrapper{flex:1}.p-tree .p-treenode-droppoint{height:4px;list-style-type:none}.p-tree .p-treenode-droppoint-active{border:0 none}.p-tree-horizontal{width:auto;padding-left:0;padding-right:0;overflow:auto}.p-tree.p-tree-horizontal table,.p-tree.p-tree-horizontal tr,.p-tree.p-tree-horizontal td{border-collapse:collapse;margin:0;padding:0;vertical-align:middle}.p-tree-horizontal .p-treenode-content{font-weight:400;padding:.4em 1em .4em .2em;display:flex;align-items:center}.p-tree-horizontal .p-treenode-parent .p-treenode-content{font-weight:400;white-space:nowrap}.p-tree.p-tree-horizontal .p-treenode{background:url(data:image/gif;base64,R0lGODlhAQABAIAAALGxsf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAxMC0wMy0xMVQxMDoxNjo0MVo8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAxMC0wMy0xMVQxMjo0NDoxOVo8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9naWY8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PAA6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQABwD/ACwAAAAAAQABAAACAkQBADs=) repeat-x scroll center center transparent;padding:.25rem 2.5rem}.p-tree.p-tree-horizontal .p-treenode.p-treenode-leaf,.p-tree.p-tree-horizontal .p-treenode.p-treenode-collapsed{padding-right:0}.p-tree.p-tree-horizontal .p-treenode-children{padding:0;margin:0}.p-tree.p-tree-horizontal .p-treenode-connector{width:1px}.p-tree.p-tree-horizontal .p-treenode-connector-table{height:100%;width:1px}.p-tree.p-tree-horizontal .p-treenode-connector-line{background:url(data:image/gif;base64,R0lGODlhAQABAIAAALGxsf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAxMC0wMy0xMVQxMDoxNjo0MVo8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAxMC0wMy0xMVQxMjo0NDoxOVo8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9naWY8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PAA6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQABwD/ACwAAAAAAQABAAACAkQBADs=) repeat-y scroll 0 0 transparent;width:1px}.p-tree.p-tree-horizontal table{height:0}.p-scroller .p-tree-container{overflow:visible}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.PrimeTemplate), selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "component", type: i0.forwardRef(() => i4.Scroller), selector: "p-scroller", inputs: ["id", "style", "styleClass", "tabindex", "items", "itemSize", "scrollHeight", "scrollWidth", "orientation", "step", "delay", "resizeDelay", "appendOnly", "inline", "lazy", "disabled", "loaderDisabled", "columns", "showSpacer", "showLoader", "numToleratedItems", "loading", "autoSize", "trackBy", "options"], outputs: ["onLazyLoad", "onScroll", "onScrollIndexChange"] }, { kind: "component", type: i0.forwardRef(() => SearchIcon), selector: "SearchIcon" }, { kind: "component", type: i0.forwardRef(() => SpinnerIcon), selector: "SpinnerIcon" }, { kind: "component", type: i0.forwardRef(() => UITreeNode), selector: "p-treeNode", inputs: ["rowNode", "node", "parentNode", "root", "index", "firstChild", "lastChild", "level", "indentation", "itemSize"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Tree, decorators: [{
            type: Component,
            args: [{ selector: 'p-tree', template: `
        <div
            [ngClass]="{ 'p-tree p-component': true, 'p-tree-selectable': selectionMode, 'p-treenode-dragover': dragHover, 'p-tree-loading': loading, 'p-tree-flex-scrollable': scrollHeight === 'flex' }"
            [ngStyle]="style"
            [class]="styleClass"
            *ngIf="!horizontal"
            (drop)="onDrop($event)"
            (dragover)="onDragOver($event)"
            (dragenter)="onDragEnter()"
            (dragleave)="onDragLeave($event)"
        >
            <div class="p-tree-loading-overlay p-component-overlay" *ngIf="loading">
                <i *ngIf="loadingIcon" [class]="'p-tree-loading-icon pi-spin ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-tree-loading-icon'" />
                    <span *ngIf="loadingIconTemplate" class="p-tree-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            <div *ngIf="filter" class="p-tree-filter-container">
                <input #filter type="text" autocomplete="off" class="p-tree-filter p-inputtext p-component" [attr.placeholder]="filterPlaceholder" (keydown.enter)="$event.preventDefault()" (input)="_filter($event.target.value)" />
                <SearchIcon *ngIf="!filterIconTemplate" [styleClass]="'p-tree-filter-icon'" />
                <span *ngIf="filterIconTemplate" class="p-tree-filter-icon">
                    <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                </span>
            </div>

            <p-scroller
                #scroller
                *ngIf="virtualScroll"
                [items]="serializedValue"
                [tabindex]="-1"
                styleClass="p-tree-wrapper"
                [style]="{ height: scrollHeight !== 'flex' ? scrollHeight : undefined }"
                [scrollHeight]="scrollHeight !== 'flex' ? undefined : '100%'"
                [itemSize]="virtualScrollItemSize || _virtualNodeHeight"
                [lazy]="lazy"
                (onScroll)="onScroll.emit($event)"
                (onScrollIndexChange)="onScrollIndexChange.emit($event)"
                (onLazyLoad)="onLazyLoad.emit($event)"
                [options]="virtualScrollOptions"
            >
                <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                    <ul *ngIf="items" class="p-tree-container" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="tree" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy">
                        <p-treeNode
                            #treeNode
                            *ngFor="let rowNode of items; let firstChild = first; let lastChild = last; let index = index; trackBy: trackBy"
                            [level]="rowNode.level"
                            [rowNode]="rowNode"
                            [node]="rowNode.node"
                            [parentNode]="rowNode.parent"
                            [firstChild]="firstChild"
                            [lastChild]="lastChild"
                            [index]="getIndex(scrollerOptions, index)"
                            [itemSize]="scrollerOptions.itemSize"
                            [indentation]="indentation"
                        ></p-treeNode>
                    </ul>
                </ng-template>
                <ng-container *ngIf="loaderTemplate">
                    <ng-template pTemplate="loader" let-scrollerOptions="options">
                        <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                    </ng-template>
                </ng-container>
            </p-scroller>
            <ng-container *ngIf="!virtualScroll">
                <div #wrapper class="p-tree-wrapper" [style.max-height]="scrollHeight">
                    <ul class="p-tree-container" *ngIf="getRootNode()" role="tree" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy">
                        <p-treeNode
                            *ngFor="let node of getRootNode(); let firstChild = first; let lastChild = last; let index = index; trackBy: trackBy"
                            [node]="node"
                            [firstChild]="firstChild"
                            [lastChild]="lastChild"
                            [index]="index"
                            [level]="0"
                        ></p-treeNode>
                    </ul>
                </div>
            </ng-container>

            <div class="p-tree-empty-message" *ngIf="!loading && (getRootNode() == null || getRootNode().length === 0)">
                <ng-container *ngIf="!emptyMessageTemplate; else emptyFilter">
                    {{ emptyMessageLabel }}
                </ng-container>
                <ng-container #emptyFilter *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
            </div>
            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </div>
        <div [ngClass]="{ 'p-tree p-tree-horizontal p-component': true, 'p-tree-selectable': selectionMode }" [ngStyle]="style" [class]="styleClass" *ngIf="horizontal">
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            <div class="p-tree-loading-mask p-component-overlay" *ngIf="loading">
                <i *ngIf="loadingIcon" [class]="'p-tree-loading-icon pi-spin ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-tree-loading-icon'" />
                    <span *ngIf="loadingIconTemplate" class="p-tree-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <table *ngIf="value && value[0]">
                <p-treeNode [node]="value[0]" [root]="true"></p-treeNode>
            </table>
            <div class="p-tree-empty-message" *ngIf="!loading && (getRootNode() == null || getRootNode().length === 0)">
                <ng-container *ngIf="!emptyMessageTemplate; else emptyFilter">
                    {{ emptyMessageLabel }}
                </ng-container>
                <ng-container #emptyFilter *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
            </div>
            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </div>
    `, changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-tree-container{margin:0;padding:0;list-style-type:none;overflow:auto}.p-treenode-children{margin:0;padding:0;list-style-type:none}.p-tree-wrapper{overflow:auto}.p-treenode-selectable{cursor:pointer;user-select:none}.p-tree-toggler{cursor:pointer;user-select:none;display:inline-flex;align-items:center;justify-content:center;overflow:hidden;position:relative;flex-shrink:0}.p-treenode-leaf>.p-treenode-content .p-tree-toggler{visibility:hidden}.p-treenode-content{display:flex;align-items:center}.p-tree-filter{width:100%}.p-tree-filter-container{position:relative;display:block;width:100%}.p-tree-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-tree-loading{position:relative;min-height:4rem}.p-tree .p-tree-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;z-index:2}.p-tree-flex-scrollable{display:flex;flex:1;height:100%;flex-direction:column}.p-tree-flex-scrollable .p-tree-wrapper{flex:1}.p-tree .p-treenode-droppoint{height:4px;list-style-type:none}.p-tree .p-treenode-droppoint-active{border:0 none}.p-tree-horizontal{width:auto;padding-left:0;padding-right:0;overflow:auto}.p-tree.p-tree-horizontal table,.p-tree.p-tree-horizontal tr,.p-tree.p-tree-horizontal td{border-collapse:collapse;margin:0;padding:0;vertical-align:middle}.p-tree-horizontal .p-treenode-content{font-weight:400;padding:.4em 1em .4em .2em;display:flex;align-items:center}.p-tree-horizontal .p-treenode-parent .p-treenode-content{font-weight:400;white-space:nowrap}.p-tree.p-tree-horizontal .p-treenode{background:url(data:image/gif;base64,R0lGODlhAQABAIAAALGxsf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAxMC0wMy0xMVQxMDoxNjo0MVo8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAxMC0wMy0xMVQxMjo0NDoxOVo8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9naWY8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PAA6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQABwD/ACwAAAAAAQABAAACAkQBADs=) repeat-x scroll center center transparent;padding:.25rem 2.5rem}.p-tree.p-tree-horizontal .p-treenode.p-treenode-leaf,.p-tree.p-tree-horizontal .p-treenode.p-treenode-collapsed{padding-right:0}.p-tree.p-tree-horizontal .p-treenode-children{padding:0;margin:0}.p-tree.p-tree-horizontal .p-treenode-connector{width:1px}.p-tree.p-tree-horizontal .p-treenode-connector-table{height:100%;width:1px}.p-tree.p-tree-horizontal .p-treenode-connector-line{background:url(data:image/gif;base64,R0lGODlhAQABAIAAALGxsf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAxMC0wMy0xMVQxMDoxNjo0MVo8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAxMC0wMy0xMVQxMjo0NDoxOVo8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9naWY8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PAA6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQABwD/ACwAAAAAAQABAAACAkQBADs=) repeat-y scroll 0 0 transparent;width:1px}.p-tree.p-tree-horizontal table{height:0}.p-scroller .p-tree-container{overflow:visible}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i3.TreeDragDropService, decorators: [{
                    type: Optional
                }] }, { type: i3.PrimeNGConfig }, { type: i0.ChangeDetectorRef }], propDecorators: { value: [{
                type: Input
            }], selectionMode: [{
                type: Input
            }], selection: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], contextMenu: [{
                type: Input
            }], layout: [{
                type: Input
            }], draggableScope: [{
                type: Input
            }], droppableScope: [{
                type: Input
            }], draggableNodes: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], droppableNodes: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], metaKeySelection: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], propagateSelectionUp: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], propagateSelectionDown: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], loading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], loadingIcon: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], togglerAriaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], validateDrop: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], filter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], filterBy: [{
                type: Input
            }], filterMode: [{
                type: Input
            }], filterPlaceholder: [{
                type: Input
            }], filteredNodes: [{
                type: Input
            }], filterLocale: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], lazy: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], virtualScroll: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], virtualScrollItemSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], virtualScrollOptions: [{
                type: Input
            }], indentation: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], _templateMap: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], virtualNodeHeight: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }], onNodeSelect: [{
                type: Output
            }], onNodeUnselect: [{
                type: Output
            }], onNodeExpand: [{
                type: Output
            }], onNodeCollapse: [{
                type: Output
            }], onNodeContextMenuSelect: [{
                type: Output
            }], onNodeDrop: [{
                type: Output
            }], onLazyLoad: [{
                type: Output
            }], onScroll: [{
                type: Output
            }], onScrollIndexChange: [{
                type: Output
            }], onFilter: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], filterViewChild: [{
                type: ViewChild,
                args: ['filter']
            }], scroller: [{
                type: ViewChild,
                args: ['scroller']
            }], wrapperViewChild: [{
                type: ViewChild,
                args: ['wrapper']
            }] } });
export class TreeModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: TreeModule, declarations: [Tree, UITreeNode], imports: [CommonModule, SharedModule, RippleModule, ScrollerModule, CheckIcon, ChevronDownIcon, ChevronRightIcon, MinusIcon, SearchIcon, SpinnerIcon, PlusIcon], exports: [Tree, SharedModule, ScrollerModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TreeModule, imports: [CommonModule, SharedModule, RippleModule, ScrollerModule, CheckIcon, ChevronDownIcon, ChevronRightIcon, MinusIcon, SearchIcon, SpinnerIcon, PlusIcon, SharedModule, ScrollerModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: TreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, RippleModule, ScrollerModule, CheckIcon, ChevronDownIcon, ChevronRightIcon, MinusIcon, SearchIcon, SpinnerIcon, PlusIcon],
                    exports: [Tree, SharedModule, ScrollerModule],
                    declarations: [Tree, UITreeNode]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy90cmVlL3RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFFSCxnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixlQUFlLEVBSWYsUUFBUSxFQUNSLE1BQU0sRUFJTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBOEIsYUFBYSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQWlDLE1BQU0sYUFBYSxDQUFDO0FBQ3RJLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBWSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7QUEwS3BELE1BQU0sT0FB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aW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBib29sZWFuQXR0cmlidXRlLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgbnVtYmVyQXR0cmlidXRlLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCbG9ja2FibGVVSSwgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlLCBUcmFuc2xhdGlvbktleXMsIFRyZWVEcmFnRHJvcFNlcnZpY2UsIFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IFJpcHBsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7IFNjcm9sbGVyLCBTY3JvbGxlck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvc2Nyb2xsZXInO1xuaW1wb3J0IHsgU2Nyb2xsZXJPcHRpb25zIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2hlY2tJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGVjayc7XG5pbXBvcnQgeyBDaGV2cm9uRG93bkljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25kb3duJztcbmltcG9ydCB7IENoZXZyb25SaWdodEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25yaWdodCc7XG5pbXBvcnQgeyBNaW51c0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL21pbnVzJztcbmltcG9ydCB7IFBsdXNJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9wbHVzJztcbmltcG9ydCB7IFNlYXJjaEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3NlYXJjaCc7XG5pbXBvcnQgeyBTcGlubmVySWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvc3Bpbm5lcic7XG5pbXBvcnQgeyBOdWxsYWJsZSB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQge1xuICAgIFRyZWVGaWx0ZXJFdmVudCxcbiAgICBUcmVlTGF6eUxvYWRFdmVudCxcbiAgICBUcmVlTm9kZUNvbGxhcHNlRXZlbnQsXG4gICAgVHJlZU5vZGVDb250ZXh0TWVudVNlbGVjdEV2ZW50LFxuICAgIFRyZWVOb2RlRHJvcEV2ZW50LFxuICAgIFRyZWVOb2RlRXhwYW5kRXZlbnQsXG4gICAgVHJlZU5vZGVTZWxlY3RFdmVudCxcbiAgICBUcmVlTm9kZVVuU2VsZWN0RXZlbnQsXG4gICAgVHJlZVNjcm9sbEV2ZW50LFxuICAgIFRyZWVTY3JvbGxJbmRleENoYW5nZUV2ZW50XG59IGZyb20gJy4vdHJlZS5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdHJlZU5vZGUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJub2RlXCI+XG4gICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAqbmdJZj1cInRyZWUuZHJvcHBhYmxlTm9kZXNcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC10cmVlbm9kZS1kcm9wcG9pbnRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtdHJlZW5vZGUtZHJvcHBvaW50LWFjdGl2ZSc6IGRyYWdob3ZlclByZXYgfVwiXG4gICAgICAgICAgICAgICAgKGRyb3ApPVwib25Ecm9wUG9pbnQoJGV2ZW50LCAtMSlcIlxuICAgICAgICAgICAgICAgIChkcmFnb3Zlcik9XCJvbkRyb3BQb2ludERyYWdPdmVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChkcmFnZW50ZXIpPVwib25Ecm9wUG9pbnREcmFnRW50ZXIoJGV2ZW50LCAtMSlcIlxuICAgICAgICAgICAgICAgIChkcmFnbGVhdmUpPVwib25Ecm9wUG9pbnREcmFnTGVhdmUoJGV2ZW50KVwiXG4gICAgICAgICAgICA+PC9saT5cbiAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICpuZ0lmPVwiIXRyZWUuaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiWydwLXRyZWVub2RlJywgbm9kZS5zdHlsZUNsYXNzIHx8ICcnLCBpc0xlYWYoKSA/ICdwLXRyZWVub2RlLWxlYWYnIDogJyddXCJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7IGhlaWdodDogaXRlbVNpemUgKyAncHgnIH1cIlxuICAgICAgICAgICAgICAgIFtzdHlsZV09XCJub2RlLnN0eWxlXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5vZGUubGFiZWxcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY2hlY2tlZF09XCJhcmlhQ2hlY2tlZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZXRzaXplXT1cIm5vZGUuY2hpbGRyZW4gPyBub2RlLmNoaWxkcmVuLmxlbmd0aCA6IDBcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiYXJpYVNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIm5vZGUuZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtcG9zaW5zZXRdPVwiaW5kZXggKyAxXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxldmVsXT1cImxldmVsICsgMVwiXG4gICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiaW5kZXggPT09IDAgPyAwIDogLTFcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtaWRdPVwibm9kZS5rZXlcIlxuICAgICAgICAgICAgICAgIHJvbGU9XCJ0cmVlaXRlbVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXRyZWVub2RlLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICBbc3R5bGUucGFkZGluZ0xlZnRdPVwibGV2ZWwgKiBpbmRlbnRhdGlvbiArICdyZW0nXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uTm9kZUNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAoY29udGV4dG1lbnUpPVwib25Ob2RlUmlnaHRDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKHRvdWNoZW5kKT1cIm9uTm9kZVRvdWNoRW5kKClcIlxuICAgICAgICAgICAgICAgICAgICAoZHJvcCk9XCJvbkRyb3BOb2RlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAoZHJhZ292ZXIpPVwib25Ecm9wTm9kZURyYWdPdmVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAoZHJhZ2VudGVyKT1cIm9uRHJvcE5vZGVEcmFnRW50ZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChkcmFnbGVhdmUpPVwib25Ecm9wTm9kZURyYWdMZWF2ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW2RyYWdnYWJsZV09XCJ0cmVlLmRyYWdnYWJsZU5vZGVzXCJcbiAgICAgICAgICAgICAgICAgICAgKGRyYWdzdGFydCk9XCJvbkRyYWdTdGFydCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKGRyYWdlbmQpPVwib25EcmFnU3RvcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC10cmVlbm9kZS1zZWxlY3RhYmxlJzogdHJlZS5zZWxlY3Rpb25Nb2RlICYmIG5vZGUuc2VsZWN0YWJsZSAhPT0gZmFsc2UsICdwLXRyZWVub2RlLWRyYWdvdmVyJzogZHJhZ2hvdmVyTm9kZSwgJ3AtaGlnaGxpZ2h0JzogaXNTZWxlY3RlZCgpIH1cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0b2dnbGVyJ1wiIGNsYXNzPVwicC10cmVlLXRvZ2dsZXIgcC1saW5rXCIgKGNsaWNrKT1cInRvZ2dsZSgkZXZlbnQpXCIgcFJpcHBsZSB0YWJpbmRleD1cIi0xXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXRyZWUudG9nZ2xlckljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uUmlnaHRJY29uICpuZ0lmPVwiIW5vZGUuZXhwYW5kZWRcIiBbc3R5bGVDbGFzc109XCIncC10cmVlLXRvZ2dsZXItaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uRG93bkljb24gKm5nSWY9XCJub2RlLmV4cGFuZGVkXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtdHJlZS10b2dnbGVyLWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0cmVlLnRvZ2dsZXJJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtdHJlZS10b2dnbGVyLWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0cmVlLnRvZ2dsZXJJY29uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBub2RlLmV4cGFuZGVkIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtY2hlY2tib3ggcC1jb21wb25lbnRcIiBbbmdDbGFzc109XCJ7ICdwLWNoZWNrYm94LWRpc2FibGVkIHAtZGlzYWJsZWQnOiBub2RlLnNlbGVjdGFibGUgPT09IGZhbHNlIH1cIiAqbmdJZj1cInRyZWUuc2VsZWN0aW9uTW9kZSA9PSAnY2hlY2tib3gnXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jaGVja2JveC1ib3hcIiBbbmdDbGFzc109XCJ7ICdwLWhpZ2hsaWdodCc6IGlzU2VsZWN0ZWQoKSwgJ3AtaW5kZXRlcm1pbmF0ZSc6IG5vZGUucGFydGlhbFNlbGVjdGVkIH1cIiByb2xlPVwiY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXRyZWUuY2hlY2tib3hJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZWNrSWNvbiAqbmdJZj1cIiFub2RlLnBhcnRpYWxTZWxlY3RlZCAmJiBpc1NlbGVjdGVkKClcIiBbc3R5bGVDbGFzc109XCIncC1jaGVja2JveC1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNaW51c0ljb24gKm5nSWY9XCJub2RlLnBhcnRpYWxTZWxlY3RlZFwiIFtzdHlsZUNsYXNzXT1cIidwLWNoZWNrYm94LWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0cmVlLmNoZWNrYm94SWNvblRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXNTZWxlY3RlZCgpLCBwYXJ0aWFsU2VsZWN0ZWQ6IG5vZGUucGFydGlhbFNlbGVjdGVkIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiZ2V0SWNvbigpXCIgKm5nSWY9XCJub2RlLmljb24gfHwgbm9kZS5leHBhbmRlZEljb24gfHwgbm9kZS5jb2xsYXBzZWRJY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtdHJlZW5vZGUtbGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXRyZWUuZ2V0VGVtcGxhdGVGb3JOb2RlKG5vZGUpXCI+e3sgbm9kZS5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidHJlZS5nZXRUZW1wbGF0ZUZvck5vZGUobm9kZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidHJlZS5nZXRUZW1wbGF0ZUZvck5vZGUobm9kZSk7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBub2RlIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInAtdHJlZW5vZGUtY2hpbGRyZW5cIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgKm5nSWY9XCIhdHJlZS52aXJ0dWFsU2Nyb2xsICYmIG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5leHBhbmRlZFwiIFtzdHlsZS5kaXNwbGF5XT1cIm5vZGUuZXhwYW5kZWQgPyAnYmxvY2snIDogJ25vbmUnXCIgcm9sZT1cInRyZWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAtdHJlZU5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjaGlsZE5vZGUgb2Ygbm9kZS5jaGlsZHJlbjsgbGV0IGZpcnN0Q2hpbGQgPSBmaXJzdDsgbGV0IGxhc3RDaGlsZCA9IGxhc3Q7IGxldCBpbmRleCA9IGluZGV4OyB0cmFja0J5OiB0cmVlLnRyYWNrQnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25vZGVdPVwiY2hpbGROb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwYXJlbnROb2RlXT1cIm5vZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZpcnN0Q2hpbGRdPVwiZmlyc3RDaGlsZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbGFzdENoaWxkXT1cImxhc3RDaGlsZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbaW5kZXhdPVwiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2l0ZW1TaXplXT1cIml0ZW1TaXplXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtsZXZlbF09XCJsZXZlbCArIDFcIlxuICAgICAgICAgICAgICAgICAgICA+PC9wLXRyZWVOb2RlPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAqbmdJZj1cInRyZWUuZHJvcHBhYmxlTm9kZXMgJiYgbGFzdENoaWxkXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInAtdHJlZW5vZGUtZHJvcHBvaW50XCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLXRyZWVub2RlLWRyb3Bwb2ludC1hY3RpdmUnOiBkcmFnaG92ZXJOZXh0IH1cIlxuICAgICAgICAgICAgICAgIChkcm9wKT1cIm9uRHJvcFBvaW50KCRldmVudCwgMSlcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIlxuICAgICAgICAgICAgICAgIChkcmFnb3Zlcik9XCJvbkRyb3BQb2ludERyYWdPdmVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChkcmFnZW50ZXIpPVwib25Ecm9wUG9pbnREcmFnRW50ZXIoJGV2ZW50LCAxKVwiXG4gICAgICAgICAgICAgICAgKGRyYWdsZWF2ZSk9XCJvbkRyb3BQb2ludERyYWdMZWF2ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgID48L2xpPlxuXG4gICAgICAgICAgICA8dGFibGUgKm5nSWY9XCJ0cmVlLmhvcml6b250YWxcIiBbY2xhc3NdPVwibm9kZS5zdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJwLXRyZWVub2RlLWNvbm5lY3RvclwiICpuZ0lmPVwiIXJvb3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJwLXRyZWVub2RlLWNvbm5lY3Rvci10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIFtuZ0NsYXNzXT1cInsgJ3AtdHJlZW5vZGUtY29ubmVjdG9yLWxpbmUnOiAhZmlyc3RDaGlsZCB9XCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIFtuZ0NsYXNzXT1cInsgJ3AtdHJlZW5vZGUtY29ubmVjdG9yLWxpbmUnOiAhbGFzdENoaWxkIH1cIj48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInAtdHJlZW5vZGVcIiBbbmdDbGFzc109XCJ7ICdwLXRyZWVub2RlLWNvbGxhcHNlZCc6ICFub2RlLmV4cGFuZGVkIH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC10cmVlbm9kZS1jb250ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC10cmVlbm9kZS1zZWxlY3RhYmxlJzogdHJlZS5zZWxlY3Rpb25Nb2RlLCAncC1oaWdobGlnaHQnOiBpc1NlbGVjdGVkKCkgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbk5vZGVDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvbnRleHRtZW51KT1cIm9uTm9kZVJpZ2h0Q2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0b3VjaGVuZCk9XCJvbk5vZGVUb3VjaEVuZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25Ob2RlS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWlzTGVhZigpXCIgW25nQ2xhc3NdPVwiJ3AtdHJlZS10b2dnbGVyJ1wiIChjbGljayk9XCJ0b2dnbGUoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF0cmVlLnRvZ2dsZXJJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGx1c0ljb24gKm5nSWY9XCIhbm9kZS5leHBhbmRlZFwiIFtzdHlsZUNsYXNzXT1cIidwLXRyZWUtdG9nZ2xlci1pY29uJ1wiIFthcmlhTGFiZWxdPVwidHJlZS50b2dnbGVyQXJpYUxhYmVsXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TWludXNJY29uICpuZ0lmPVwibm9kZS5leHBhbmRlZFwiIFtzdHlsZUNsYXNzXT1cIidwLXRyZWUtdG9nZ2xlci1pY29uJ1wiIFthcmlhTGFiZWxdPVwidHJlZS50b2dnbGVyQXJpYUxhYmVsXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0cmVlLnRvZ2dsZXJJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtdHJlZS10b2dnbGVyLWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0cmVlLnRvZ2dsZXJJY29uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBub2RlLmV4cGFuZGVkIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJnZXRJY29uKClcIiAqbmdJZj1cIm5vZGUuaWNvbiB8fCBub2RlLmV4cGFuZGVkSWNvbiB8fCBub2RlLmNvbGxhcHNlZEljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC10cmVlbm9kZS1sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhdHJlZS5nZXRUZW1wbGF0ZUZvck5vZGUobm9kZSlcIj57eyBub2RlLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0cmVlLmdldFRlbXBsYXRlRm9yTm9kZShub2RlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0cmVlLmdldFRlbXBsYXRlRm9yTm9kZShub2RlKTsgY29udGV4dDogeyAkaW1wbGljaXQ6IG5vZGUgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicC10cmVlbm9kZS1jaGlsZHJlbi1jb250YWluZXJcIiAqbmdJZj1cIm5vZGUuY2hpbGRyZW4gJiYgbm9kZS5leHBhbmRlZFwiIFtzdHlsZS5kaXNwbGF5XT1cIm5vZGUuZXhwYW5kZWQgPyAndGFibGUtY2VsbCcgOiAnbm9uZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10cmVlbm9kZS1jaGlsZHJlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cC10cmVlTm9kZSAqbmdGb3I9XCJsZXQgY2hpbGROb2RlIG9mIG5vZGUuY2hpbGRyZW47IGxldCBmaXJzdENoaWxkID0gZmlyc3Q7IGxldCBsYXN0Q2hpbGQgPSBsYXN0OyB0cmFja0J5OiB0cmVlLnRyYWNrQnlcIiBbbm9kZV09XCJjaGlsZE5vZGVcIiBbZmlyc3RDaGlsZF09XCJmaXJzdENoaWxkXCIgW2xhc3RDaGlsZF09XCJsYXN0Q2hpbGRcIj48L3AtdHJlZU5vZGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVUlUcmVlTm9kZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgc3RhdGljIElDT05fQ0xBU1M6IHN0cmluZyA9ICdwLXRyZWVub2RlLWljb24gJztcblxuICAgIEBJbnB1dCgpIHJvd05vZGU6IGFueTtcblxuICAgIEBJbnB1dCgpIG5vZGU6IFRyZWVOb2RlPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBwYXJlbnROb2RlOiBUcmVlTm9kZTxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHJvb3Q6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGZpcnN0Q2hpbGQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgbGFzdENoaWxkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgbGV2ZWw6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIGluZGVudGF0aW9uOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBpdGVtU2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgdHJlZTogVHJlZTtcblxuICAgIHRpbWVvdXQ6IGFueTtcblxuICAgIGRyYWdob3ZlclByZXY6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBkcmFnaG92ZXJOZXh0OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgZHJhZ2hvdmVyTm9kZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGdldCBhcmlhU2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZScgfHwgdGhpcy50cmVlLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aXBsZScgPyB0aGlzLmlzU2VsZWN0ZWQoKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgYXJpYUNoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUuc2VsZWN0aW9uTW9kZSA9PT0gJ2NoZWNrYm94JyA/IHRoaXMuaXNTZWxlY3RlZCgpIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBUcmVlKSkgdHJlZTogVHJlZSkge1xuICAgICAgICB0aGlzLnRyZWUgPSB0cmVlIGFzIFRyZWU7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgICg8VHJlZU5vZGU+dGhpcy5ub2RlKS5wYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QWxsTm9kZXNUYWJJbmRleGVzKCk7XG4gICAgICAgICAgICB0aGlzLnRyZWUuc3luY05vZGVPcHRpb24oPFRyZWVOb2RlPnRoaXMubm9kZSwgPFRyZWVOb2RlPGFueT5bXT50aGlzLnRyZWUudmFsdWUsICdwYXJlbnQnLCB0aGlzLnRyZWUuZ2V0Tm9kZVdpdGhLZXkoPHN0cmluZz50aGlzLnBhcmVudE5vZGUua2V5LCA8VHJlZU5vZGU8YW55PltdPnRoaXMudHJlZS52YWx1ZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SWNvbigpIHtcbiAgICAgICAgbGV0IGljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoKDxUcmVlTm9kZT50aGlzLm5vZGUpLmljb24pIGljb24gPSAoPFRyZWVOb2RlPnRoaXMubm9kZSkuaWNvbiBhcyBzdHJpbmc7XG4gICAgICAgIGVsc2UgaWNvbiA9ICg8VHJlZU5vZGU+dGhpcy5ub2RlKS5leHBhbmRlZCAmJiAoPFRyZWVOb2RlPnRoaXMubm9kZSkuY2hpbGRyZW4gJiYgKDxUcmVlTm9kZT50aGlzLm5vZGUpLmNoaWxkcmVuPy5sZW5ndGggPyAoPFRyZWVOb2RlPnRoaXMubm9kZSkuZXhwYW5kZWRJY29uIDogKDxUcmVlTm9kZT50aGlzLm5vZGUpLmNvbGxhcHNlZEljb247XG5cbiAgICAgICAgcmV0dXJuIFVJVHJlZU5vZGUuSUNPTl9DTEFTUyArICcgJyArIGljb247XG4gICAgfVxuXG4gICAgaXNMZWFmKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlLmlzTm9kZUxlYWYoPFRyZWVOb2RlPnRoaXMubm9kZSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoKDxUcmVlTm9kZT50aGlzLm5vZGUpLmV4cGFuZGVkKSB0aGlzLmNvbGxhcHNlKGV2ZW50KTtcbiAgICAgICAgZWxzZSB0aGlzLmV4cGFuZChldmVudCk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgZXhwYW5kKGV2ZW50OiBFdmVudCkge1xuICAgICAgICAoPFRyZWVOb2RlPnRoaXMubm9kZSkuZXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy50cmVlLnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS51cGRhdGVTZXJpYWxpemVkVmFsdWUoKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNWaXJ0dWFsTm9kZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJlZS5vbk5vZGVFeHBhbmQuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiA8VHJlZU5vZGU+dGhpcy5ub2RlIH0pO1xuICAgIH1cblxuICAgIGNvbGxhcHNlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICAoPFRyZWVOb2RlPnRoaXMubm9kZSkuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMudHJlZS52aXJ0dWFsU2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUudXBkYXRlU2VyaWFsaXplZFZhbHVlKCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzVmlydHVhbE5vZGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyZWUub25Ob2RlQ29sbGFwc2UuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiA8VHJlZU5vZGU+dGhpcy5ub2RlIH0pO1xuICAgIH1cblxuICAgIG9uTm9kZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMudHJlZS5vbk5vZGVDbGljayhldmVudCwgPFRyZWVOb2RlPnRoaXMubm9kZSk7XG4gICAgfVxuXG4gICAgb25Ob2RlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUub25Ob2RlQ2xpY2soZXZlbnQsIDxUcmVlTm9kZT50aGlzLm5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ob2RlVG91Y2hFbmQoKSB7XG4gICAgICAgIHRoaXMudHJlZS5vbk5vZGVUb3VjaEVuZCgpO1xuICAgIH1cblxuICAgIG9uTm9kZVJpZ2h0Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy50cmVlLm9uTm9kZVJpZ2h0Q2xpY2soZXZlbnQsIDxUcmVlTm9kZT50aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUuaXNTZWxlY3RlZCg8VHJlZU5vZGU+dGhpcy5ub2RlKTtcbiAgICB9XG5cbiAgICBpc1NhbWVOb2RlKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudC5jdXJyZW50VGFyZ2V0ICYmIChldmVudC5jdXJyZW50VGFyZ2V0LmlzU2FtZU5vZGUoZXZlbnQudGFyZ2V0KSB8fCBldmVudC5jdXJyZW50VGFyZ2V0LmlzU2FtZU5vZGUoZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tyb2xlPVwidHJlZWl0ZW1cIl0nKSkpO1xuICAgIH1cblxuICAgIG9uRHJvcFBvaW50KGV2ZW50OiBEcmFnRXZlbnQsIHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IGRyYWdOb2RlID0gdGhpcy50cmVlLmRyYWdOb2RlO1xuICAgICAgICBsZXQgZHJhZ05vZGVJbmRleCA9IHRoaXMudHJlZS5kcmFnTm9kZUluZGV4O1xuICAgICAgICBsZXQgZHJhZ05vZGVTY29wZSA9IHRoaXMudHJlZS5kcmFnTm9kZVNjb3BlO1xuICAgICAgICBsZXQgaXNWYWxpZERyb3BQb2ludEluZGV4ID0gdGhpcy50cmVlLmRyYWdOb2RlVHJlZSA9PT0gdGhpcy50cmVlID8gcG9zaXRpb24gPT09IDEgfHwgZHJhZ05vZGVJbmRleCAhPT0gPG51bWJlcj50aGlzLmluZGV4IC0gMSA6IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMudHJlZS5hbGxvd0Ryb3AoPFRyZWVOb2RlPmRyYWdOb2RlLCA8VHJlZU5vZGU+dGhpcy5ub2RlLCBkcmFnTm9kZVNjb3BlKSAmJiBpc1ZhbGlkRHJvcFBvaW50SW5kZXgpIHtcbiAgICAgICAgICAgIGxldCBkcm9wUGFyYW1zID0geyAuLi50aGlzLmNyZWF0ZURyb3BQb2ludEV2ZW50TWV0YWRhdGEoPG51bWJlcj5wb3NpdGlvbikgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudHJlZS52YWxpZGF0ZURyb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWUub25Ob2RlRHJvcC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGRyYWdOb2RlOiBkcmFnTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgZHJvcE5vZGU6IHRoaXMubm9kZSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGFjY2VwdDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzUG9pbnREcm9wKGRyb3BQYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1BvaW50RHJvcChkcm9wUGFyYW1zKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWUub25Ob2RlRHJvcC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGRyYWdOb2RlOiBkcmFnTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgZHJvcE5vZGU6IHRoaXMubm9kZSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhZ2hvdmVyUHJldiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRyYWdob3Zlck5leHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcm9jZXNzUG9pbnREcm9wKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgbGV0IG5ld05vZGVMaXN0ID0gZXZlbnQuZHJvcE5vZGUucGFyZW50ID8gZXZlbnQuZHJvcE5vZGUucGFyZW50LmNoaWxkcmVuIDogdGhpcy50cmVlLnZhbHVlO1xuICAgICAgICBldmVudC5kcmFnTm9kZVN1Yk5vZGVzLnNwbGljZShldmVudC5kcmFnTm9kZUluZGV4LCAxKTtcbiAgICAgICAgbGV0IGRyb3BJbmRleCA9IHRoaXMuaW5kZXg7XG5cbiAgICAgICAgaWYgKGV2ZW50LnBvc2l0aW9uIDwgMCkge1xuICAgICAgICAgICAgZHJvcEluZGV4ID0gZXZlbnQuZHJhZ05vZGVTdWJOb2RlcyA9PT0gbmV3Tm9kZUxpc3QgPyAoZXZlbnQuZHJhZ05vZGVJbmRleCA+IGV2ZW50LmluZGV4ID8gZXZlbnQuaW5kZXggOiBldmVudC5pbmRleCAtIDEpIDogZXZlbnQuaW5kZXg7XG4gICAgICAgICAgICBuZXdOb2RlTGlzdC5zcGxpY2UoZHJvcEluZGV4LCAwLCBldmVudC5kcmFnTm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcm9wSW5kZXggPSBuZXdOb2RlTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBuZXdOb2RlTGlzdC5wdXNoKGV2ZW50LmRyYWdOb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJlZS5kcmFnRHJvcFNlcnZpY2Uuc3RvcERyYWcoe1xuICAgICAgICAgICAgbm9kZTogZXZlbnQuZHJhZ05vZGUsXG4gICAgICAgICAgICBzdWJOb2RlczogZXZlbnQuZHJvcE5vZGUucGFyZW50ID8gZXZlbnQuZHJvcE5vZGUucGFyZW50LmNoaWxkcmVuIDogdGhpcy50cmVlLnZhbHVlLFxuICAgICAgICAgICAgaW5kZXg6IGV2ZW50LmRyYWdOb2RlSW5kZXhcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlRHJvcFBvaW50RXZlbnRNZXRhZGF0YShwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkcmFnTm9kZTogdGhpcy50cmVlLmRyYWdOb2RlLFxuICAgICAgICAgICAgZHJhZ05vZGVJbmRleDogdGhpcy50cmVlLmRyYWdOb2RlSW5kZXgsXG4gICAgICAgICAgICBkcmFnTm9kZVN1Yk5vZGVzOiB0aGlzLnRyZWUuZHJhZ05vZGVTdWJOb2RlcyxcbiAgICAgICAgICAgIGRyb3BOb2RlOiB0aGlzLm5vZGUsXG4gICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvblxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uRHJvcFBvaW50RHJhZ092ZXIoZXZlbnQ6IGFueSkge1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkRyb3BQb2ludERyYWdFbnRlcihldmVudDogRXZlbnQsIHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5hbGxvd0Ryb3AoPFRyZWVOb2RlPnRoaXMudHJlZS5kcmFnTm9kZSwgPFRyZWVOb2RlPnRoaXMubm9kZSwgdGhpcy50cmVlLmRyYWdOb2RlU2NvcGUpKSB7XG4gICAgICAgICAgICBpZiAocG9zaXRpb24gPCAwKSB0aGlzLmRyYWdob3ZlclByZXYgPSB0cnVlO1xuICAgICAgICAgICAgZWxzZSB0aGlzLmRyYWdob3Zlck5leHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ecm9wUG9pbnREcmFnTGVhdmUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZHJhZ2hvdmVyUHJldiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRyYWdob3Zlck5leHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkRyYWdTdGFydChldmVudDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnRyZWUuZHJhZ2dhYmxlTm9kZXMgJiYgKDxUcmVlTm9kZT50aGlzLm5vZGUpLmRyYWdnYWJsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJ2RhdGEnKTtcblxuICAgICAgICAgICAgdGhpcy50cmVlLmRyYWdEcm9wU2VydmljZS5zdGFydERyYWcoe1xuICAgICAgICAgICAgICAgIHRyZWU6IHRoaXMsXG4gICAgICAgICAgICAgICAgbm9kZTogdGhpcy5ub2RlLFxuICAgICAgICAgICAgICAgIHN1Yk5vZGVzOiB0aGlzLm5vZGU/LnBhcmVudCA/IHRoaXMubm9kZS5wYXJlbnQuY2hpbGRyZW4gOiB0aGlzLnRyZWUudmFsdWUsXG4gICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgICAgICAgICAgc2NvcGU6IHRoaXMudHJlZS5kcmFnZ2FibGVTY29wZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EcmFnU3RvcChldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMudHJlZS5kcmFnRHJvcFNlcnZpY2Uuc3RvcERyYWcoe1xuICAgICAgICAgICAgbm9kZTogdGhpcy5ub2RlLFxuICAgICAgICAgICAgc3ViTm9kZXM6IHRoaXMubm9kZT8ucGFyZW50ID8gdGhpcy5ub2RlLnBhcmVudC5jaGlsZHJlbiA6IHRoaXMudHJlZS52YWx1ZSxcbiAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRHJvcE5vZGVEcmFnT3ZlcihldmVudDogYW55KSB7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICAgICAgICBpZiAodGhpcy50cmVlLmRyb3BwYWJsZU5vZGVzKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRyb3BOb2RlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5kcm9wcGFibGVOb2RlcyAmJiB0aGlzLm5vZGU/LmRyb3BwYWJsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGxldCBkcmFnTm9kZSA9IHRoaXMudHJlZS5kcmFnTm9kZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudHJlZS5hbGxvd0Ryb3AoPFRyZWVOb2RlPmRyYWdOb2RlLCA8VHJlZU5vZGU+dGhpcy5ub2RlLCB0aGlzLnRyZWUuZHJhZ05vZGVTY29wZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZHJvcFBhcmFtcyA9IHsgLi4udGhpcy5jcmVhdGVEcm9wTm9kZUV2ZW50TWV0YWRhdGEoKSB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJlZS52YWxpZGF0ZURyb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLm9uTm9kZURyb3AuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdOb2RlOiBkcmFnTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BOb2RlOiB0aGlzLm5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2VwdDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc05vZGVEcm9wKGRyb3BQYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NOb2RlRHJvcChkcm9wUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLm9uTm9kZURyb3AuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdOb2RlOiBkcmFnTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BOb2RlOiB0aGlzLm5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5kcmFnaG92ZXJOb2RlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY3JlYXRlRHJvcE5vZGVFdmVudE1ldGFkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZHJhZ05vZGU6IHRoaXMudHJlZS5kcmFnTm9kZSxcbiAgICAgICAgICAgIGRyYWdOb2RlSW5kZXg6IHRoaXMudHJlZS5kcmFnTm9kZUluZGV4LFxuICAgICAgICAgICAgZHJhZ05vZGVTdWJOb2RlczogdGhpcy50cmVlLmRyYWdOb2RlU3ViTm9kZXMsXG4gICAgICAgICAgICBkcm9wTm9kZTogdGhpcy5ub2RlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvY2Vzc05vZGVEcm9wKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgbGV0IGRyYWdOb2RlSW5kZXggPSBldmVudC5kcmFnTm9kZUluZGV4O1xuICAgICAgICBldmVudC5kcmFnTm9kZVN1Yk5vZGVzLnNwbGljZShkcmFnTm9kZUluZGV4LCAxKTtcblxuICAgICAgICBpZiAoZXZlbnQuZHJvcE5vZGUuY2hpbGRyZW4pIGV2ZW50LmRyb3BOb2RlLmNoaWxkcmVuLnB1c2goZXZlbnQuZHJhZ05vZGUpO1xuICAgICAgICBlbHNlIGV2ZW50LmRyb3BOb2RlLmNoaWxkcmVuID0gW2V2ZW50LmRyYWdOb2RlXTtcblxuICAgICAgICB0aGlzLnRyZWUuZHJhZ0Ryb3BTZXJ2aWNlLnN0b3BEcmFnKHtcbiAgICAgICAgICAgIG5vZGU6IGV2ZW50LmRyYWdOb2RlLFxuICAgICAgICAgICAgc3ViTm9kZXM6IGV2ZW50LmRyb3BOb2RlLnBhcmVudCA/IGV2ZW50LmRyb3BOb2RlLnBhcmVudC5jaGlsZHJlbiA6IHRoaXMudHJlZS52YWx1ZSxcbiAgICAgICAgICAgIGluZGV4OiBkcmFnTm9kZUluZGV4XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRHJvcE5vZGVEcmFnRW50ZXIoZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy50cmVlLmRyb3BwYWJsZU5vZGVzICYmIHRoaXMubm9kZT8uZHJvcHBhYmxlICE9PSBmYWxzZSAmJiB0aGlzLnRyZWUuYWxsb3dEcm9wKDxUcmVlTm9kZT50aGlzLnRyZWUuZHJhZ05vZGUsIDxUcmVlTm9kZT50aGlzLm5vZGUsIHRoaXMudHJlZS5kcmFnTm9kZVNjb3BlKSkge1xuICAgICAgICAgICAgdGhpcy5kcmFnaG92ZXJOb2RlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJvcE5vZGVEcmFnTGVhdmUoZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy50cmVlLmRyb3BwYWJsZU5vZGVzKSB7XG4gICAgICAgICAgICBsZXQgcmVjdCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoZXZlbnQueCA+IHJlY3QubGVmdCArIHJlY3Qud2lkdGggfHwgZXZlbnQueCA8IHJlY3QubGVmdCB8fCBldmVudC55ID49IE1hdGguZmxvb3IocmVjdC50b3AgKyByZWN0LmhlaWdodCkgfHwgZXZlbnQueSA8IHJlY3QudG9wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnaG92ZXJOb2RlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2FtZU5vZGUoZXZlbnQpIHx8ICh0aGlzLnRyZWUuY29udGV4dE1lbnUgJiYgdGhpcy50cmVlLmNvbnRleHRNZW51LmNvbnRhaW5lclZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID09PSAnYmxvY2snKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICAvL2Rvd24gYXJyb3dcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93RG93bihldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vdXAgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1VwKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9yaWdodCBhcnJvd1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93UmlnaHQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL2xlZnQgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93TGVmdChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vZW50ZXJcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgIGNhc2UgJ051bXBhZEVudGVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRW50ZXIoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy90YWJcbiAgICAgICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBbGxOb2Rlc1RhYkluZGV4ZXMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvL25vIG9wXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFycm93VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3Qgbm9kZUVsZW1lbnQgPSAoPEhUTUxEaXZFbGVtZW50PmV2ZW50LnRhcmdldCkuZ2V0QXR0cmlidXRlKCdkYXRhLXBjLXNlY3Rpb24nKSA9PT0gJ3RvZ2dsZXInID8gKDxIVE1MRGl2RWxlbWVudD5ldmVudC50YXJnZXQpLmNsb3Nlc3QoJ1tyb2xlPVwidHJlZWl0ZW1cIl0nKSA6ICg8SFRNTERpdkVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgIGlmIChub2RlRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzUm93Q2hhbmdlKG5vZGVFbGVtZW50LCBub2RlRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLCB0aGlzLmZpbmRMYXN0VmlzaWJsZURlc2NlbmRhbnQobm9kZUVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBhcmVudE5vZGVFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnROb2RlRWxlbWVudChub2RlRWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNSb3dDaGFuZ2Uobm9kZUVsZW1lbnQsIHBhcmVudE5vZGVFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25BcnJvd0Rvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3Qgbm9kZUVsZW1lbnQgPSAoPEhUTUxEaXZFbGVtZW50PmV2ZW50LnRhcmdldCkuZ2V0QXR0cmlidXRlKCdkYXRhLXBjLXNlY3Rpb24nKSA9PT0gJ3RvZ2dsZXInID8gKDxIVE1MRGl2RWxlbWVudD5ldmVudC50YXJnZXQpLmNsb3Nlc3QoJ1tyb2xlPVwidHJlZWl0ZW1cIl0nKSA6IDxIVE1MRGl2RWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IGxpc3RFbGVtZW50ID0gbm9kZUVsZW1lbnQuY2hpbGRyZW5bMV07XG5cbiAgICAgICAgaWYgKGxpc3RFbGVtZW50ICYmIGxpc3RFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNSb3dDaGFuZ2Uobm9kZUVsZW1lbnQsIGxpc3RFbGVtZW50LmNoaWxkcmVuWzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChub2RlRWxlbWVudC5wYXJlbnRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNSb3dDaGFuZ2Uobm9kZUVsZW1lbnQsIG5vZGVFbGVtZW50LnBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRTaWJsaW5nQW5jZXN0b3IgPSB0aGlzLmZpbmROZXh0U2libGluZ09mQW5jZXN0b3Iobm9kZUVsZW1lbnQucGFyZW50RWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAobmV4dFNpYmxpbmdBbmNlc3Rvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzUm93Q2hhbmdlKG5vZGVFbGVtZW50LCBuZXh0U2libGluZ0FuY2VzdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkFycm93UmlnaHQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vZGU/LmV4cGFuZGVkICYmICF0aGlzLnRyZWUuaXNOb2RlTGVhZig8VHJlZU5vZGU+dGhpcy5ub2RlKSkge1xuICAgICAgICAgICAgdGhpcy5leHBhbmQoZXZlbnQpO1xuICAgICAgICAgICAgKDxIVE1MRGl2RWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0KS50YWJJbmRleCA9IC0xO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dEb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25BcnJvd0xlZnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3Qgbm9kZUVsZW1lbnQgPSAoPEhUTUxEaXZFbGVtZW50PmV2ZW50LnRhcmdldCkuZ2V0QXR0cmlidXRlKCdkYXRhLXBjLXNlY3Rpb24nKSA9PT0gJ3RvZ2dsZXInID8gKDxIVE1MRGl2RWxlbWVudD5ldmVudC50YXJnZXQpLmNsb3Nlc3QoJ1tyb2xlPVwidHJlZWl0ZW1cIl0nKSA6IDxIVE1MRGl2RWxlbWVudD5ldmVudC50YXJnZXQ7XG5cbiAgICAgICAgaWYgKHRoaXMubGV2ZWwgPT09IDAgJiYgIXRoaXMubm9kZT8uZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5vZGU/LmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlKGV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJlbnROb2RlRWxlbWVudCA9IHRoaXMuZ2V0UGFyZW50Tm9kZUVsZW1lbnQobm9kZUVsZW1lbnQucGFyZW50RWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHBhcmVudE5vZGVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzUm93Q2hhbmdlKGV2ZW50LmN1cnJlbnRUYXJnZXQsIHBhcmVudE5vZGVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25FbnRlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLnRyZWUub25Ob2RlQ2xpY2soZXZlbnQsIDxUcmVlTm9kZT50aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLnNldFRhYkluZGV4Rm9yU2VsZWN0aW9uTW9kZShldmVudCwgdGhpcy50cmVlLm5vZGVUb3VjaGVkKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBzZXRBbGxOb2Rlc1RhYkluZGV4ZXMoKSB7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gRG9tSGFuZGxlci5maW5kKHRoaXMudHJlZS5lbC5uYXRpdmVFbGVtZW50LCAnLnAtdHJlZW5vZGUnKTtcblxuICAgICAgICBjb25zdCBoYXNTZWxlY3RlZE5vZGUgPSBbLi4ubm9kZXNdLnNvbWUoKG5vZGUpID0+IG5vZGUuZ2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJykgPT09ICd0cnVlJyB8fCBub2RlLmdldEF0dHJpYnV0ZSgnYXJpYS1jaGVja2VkJykgPT09ICd0cnVlJyk7XG5cbiAgICAgICAgWy4uLm5vZGVzXS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLnRhYkluZGV4ID0gLTE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChoYXNTZWxlY3RlZE5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkTm9kZXMgPSBbLi4ubm9kZXNdLmZpbHRlcigobm9kZSkgPT4gbm9kZS5nZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKSA9PT0gJ3RydWUnIHx8IG5vZGUuZ2V0QXR0cmlidXRlKCdhcmlhLWNoZWNrZWQnKSA9PT0gJ3RydWUnKTtcblxuICAgICAgICAgICAgc2VsZWN0ZWROb2Rlc1swXS50YWJJbmRleCA9IDA7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIFsuLi5ub2Rlc11bMF0udGFiSW5kZXggPSAwO1xuICAgIH1cblxuICAgIHNldFRhYkluZGV4Rm9yU2VsZWN0aW9uTW9kZShldmVudCwgbm9kZVRvdWNoZWQpIHtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5zZWxlY3Rpb25Nb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IFsuLi5Eb21IYW5kbGVyLmZpbmQodGhpcy50cmVlLmVsLm5hdGl2ZUVsZW1lbnQsICcucC10cmVlbm9kZScpXTtcblxuICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC50YWJJbmRleCA9IG5vZGVUb3VjaGVkID09PSBmYWxzZSA/IC0xIDogMDtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnRzLmV2ZXJ5KChlbGVtZW50KSA9PiBlbGVtZW50LnRhYkluZGV4ID09PSAtMSkpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50c1swXS50YWJJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTmV4dFNpYmxpbmdPZkFuY2VzdG9yKG5vZGVFbGVtZW50OiBhbnkpOiBhbnkge1xuICAgICAgICBsZXQgcGFyZW50Tm9kZUVsZW1lbnQgPSB0aGlzLmdldFBhcmVudE5vZGVFbGVtZW50KG5vZGVFbGVtZW50KTtcblxuICAgICAgICBpZiAocGFyZW50Tm9kZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcpIHJldHVybiBwYXJlbnROb2RlRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICBlbHNlIHJldHVybiB0aGlzLmZpbmROZXh0U2libGluZ09mQW5jZXN0b3IocGFyZW50Tm9kZUVsZW1lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTGFzdFZpc2libGVEZXNjZW5kYW50KG5vZGVFbGVtZW50OiBhbnkpOiBhbnkge1xuICAgICAgICBjb25zdCBsaXN0RWxlbWVudCA9IDxIVE1MRWxlbWVudD5BcnJheS5mcm9tKG5vZGVFbGVtZW50LmNoaWxkcmVuKS5maW5kKChlbCkgPT4gRG9tSGFuZGxlci5oYXNDbGFzcyhlbCwgJ3AtdHJlZW5vZGUnKSk7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuTGlzdEVsZW1lbnQgPSBsaXN0RWxlbWVudC5jaGlsZHJlblsxXTtcbiAgICAgICAgaWYgKGNoaWxkcmVuTGlzdEVsZW1lbnQgJiYgY2hpbGRyZW5MaXN0RWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0Q2hpbGRFbGVtZW50ID0gY2hpbGRyZW5MaXN0RWxlbWVudC5jaGlsZHJlbltjaGlsZHJlbkxpc3RFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kTGFzdFZpc2libGVEZXNjZW5kYW50KGxhc3RDaGlsZEVsZW1lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGFyZW50Tm9kZUVsZW1lbnQobm9kZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgRWxlbWVudCkge1xuICAgICAgICBjb25zdCBwYXJlbnROb2RlRWxlbWVudCA9IG5vZGVFbGVtZW50LnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgcmV0dXJuIHBhcmVudE5vZGVFbGVtZW50Py50YWdOYW1lID09PSAnUC1UUkVFTk9ERScgPyBwYXJlbnROb2RlRWxlbWVudCA6IG51bGw7XG4gICAgfVxuXG4gICAgZm9jdXNOb2RlKGVsZW1lbnQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy50cmVlLmRyb3BwYWJsZU5vZGVzKSAoZWxlbWVudC5jaGlsZHJlblsxXSBhcyBIVE1MRWxlbWVudCkuZm9jdXMoKTtcbiAgICAgICAgZWxzZSAoZWxlbWVudC5jaGlsZHJlblswXSBhcyBIVE1MRWxlbWVudCkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmb2N1c1Jvd0NoYW5nZShmaXJzdEZvY3VzYWJsZVJvdywgY3VycmVudEZvY3VzZWRSb3csIGxhc3RWaXNpYmxlRGVzY2VuZGFudD8pIHtcbiAgICAgICAgZmlyc3RGb2N1c2FibGVSb3cudGFiSW5kZXggPSAnLTEnO1xuICAgICAgICBjdXJyZW50Rm9jdXNlZFJvdy5jaGlsZHJlblswXS50YWJJbmRleCA9ICcwJztcblxuICAgICAgICB0aGlzLmZvY3VzTm9kZShsYXN0VmlzaWJsZURlc2NlbmRhbnQgfHwgY3VycmVudEZvY3VzZWRSb3cpO1xuICAgIH1cblxuICAgIGZvY3VzVmlydHVhbE5vZGUoKSB7XG4gICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoZG9jdW1lbnQuYm9keSwgYFtkYXRhLWlkPVwiJHs8VHJlZU5vZGU+dGhpcy5ub2RlPy5rZXkgPz8gPFRyZWVOb2RlPnRoaXMubm9kZT8uZGF0YX1cIl1gKTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuZm9jdXMobm9kZSk7XG4gICAgICAgIH0sIDEpO1xuICAgIH1cbn1cbi8qKlxuICogVHJlZSBpcyB1c2VkIHRvIGRpc3BsYXkgaGllcmFyY2hpY2FsIGRhdGEuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdHJlZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC10cmVlIHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtdHJlZS1zZWxlY3RhYmxlJzogc2VsZWN0aW9uTW9kZSwgJ3AtdHJlZW5vZGUtZHJhZ292ZXInOiBkcmFnSG92ZXIsICdwLXRyZWUtbG9hZGluZyc6IGxvYWRpbmcsICdwLXRyZWUtZmxleC1zY3JvbGxhYmxlJzogc2Nyb2xsSGVpZ2h0ID09PSAnZmxleCcgfVwiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJzdHlsZVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAqbmdJZj1cIiFob3Jpem9udGFsXCJcbiAgICAgICAgICAgIChkcm9wKT1cIm9uRHJvcCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChkcmFnb3Zlcik9XCJvbkRyYWdPdmVyKCRldmVudClcIlxuICAgICAgICAgICAgKGRyYWdlbnRlcik9XCJvbkRyYWdFbnRlcigpXCJcbiAgICAgICAgICAgIChkcmFnbGVhdmUpPVwib25EcmFnTGVhdmUoJGV2ZW50KVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRyZWUtbG9hZGluZy1vdmVybGF5IHAtY29tcG9uZW50LW92ZXJsYXlcIiAqbmdJZj1cImxvYWRpbmdcIj5cbiAgICAgICAgICAgICAgICA8aSAqbmdJZj1cImxvYWRpbmdJY29uXCIgW2NsYXNzXT1cIidwLXRyZWUtbG9hZGluZy1pY29uIHBpLXNwaW4gJyArIGxvYWRpbmdJY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbG9hZGluZ0ljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPFNwaW5uZXJJY29uICpuZ0lmPVwiIWxvYWRpbmdJY29uVGVtcGxhdGVcIiBbc3Bpbl09XCJ0cnVlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtdHJlZS1sb2FkaW5nLWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJsb2FkaW5nSWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLXRyZWUtbG9hZGluZy1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJsb2FkaW5nSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJmaWx0ZXJcIiBjbGFzcz1cInAtdHJlZS1maWx0ZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNmaWx0ZXIgdHlwZT1cInRleHRcIiBhdXRvY29tcGxldGU9XCJvZmZcIiBjbGFzcz1cInAtdHJlZS1maWx0ZXIgcC1pbnB1dHRleHQgcC1jb21wb25lbnRcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJmaWx0ZXJQbGFjZWhvbGRlclwiIChrZXlkb3duLmVudGVyKT1cIiRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCIgKGlucHV0KT1cIl9maWx0ZXIoJGV2ZW50LnRhcmdldC52YWx1ZSlcIiAvPlxuICAgICAgICAgICAgICAgIDxTZWFyY2hJY29uICpuZ0lmPVwiIWZpbHRlckljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLXRyZWUtZmlsdGVyLWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImZpbHRlckljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC10cmVlLWZpbHRlci1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImZpbHRlckljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxwLXNjcm9sbGVyXG4gICAgICAgICAgICAgICAgI3Njcm9sbGVyXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJ2aXJ0dWFsU2Nyb2xsXCJcbiAgICAgICAgICAgICAgICBbaXRlbXNdPVwic2VyaWFsaXplZFZhbHVlXCJcbiAgICAgICAgICAgICAgICBbdGFiaW5kZXhdPVwiLTFcIlxuICAgICAgICAgICAgICAgIHN0eWxlQ2xhc3M9XCJwLXRyZWUtd3JhcHBlclwiXG4gICAgICAgICAgICAgICAgW3N0eWxlXT1cInsgaGVpZ2h0OiBzY3JvbGxIZWlnaHQgIT09ICdmbGV4JyA/IHNjcm9sbEhlaWdodCA6IHVuZGVmaW5lZCB9XCJcbiAgICAgICAgICAgICAgICBbc2Nyb2xsSGVpZ2h0XT1cInNjcm9sbEhlaWdodCAhPT0gJ2ZsZXgnID8gdW5kZWZpbmVkIDogJzEwMCUnXCJcbiAgICAgICAgICAgICAgICBbaXRlbVNpemVdPVwidmlydHVhbFNjcm9sbEl0ZW1TaXplIHx8IF92aXJ0dWFsTm9kZUhlaWdodFwiXG4gICAgICAgICAgICAgICAgW2xhenldPVwibGF6eVwiXG4gICAgICAgICAgICAgICAgKG9uU2Nyb2xsKT1cIm9uU2Nyb2xsLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG9uU2Nyb2xsSW5kZXhDaGFuZ2UpPVwib25TY3JvbGxJbmRleENoYW5nZS5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgICAgIChvbkxhenlMb2FkKT1cIm9uTGF6eUxvYWQuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbb3B0aW9uc109XCJ2aXJ0dWFsU2Nyb2xsT3B0aW9uc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cImNvbnRlbnRcIiBsZXQtaXRlbXMgbGV0LXNjcm9sbGVyT3B0aW9ucz1cIm9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHVsICpuZ0lmPVwiaXRlbXNcIiBjbGFzcz1cInAtdHJlZS1jb250YWluZXJcIiBbbmdDbGFzc109XCJzY3JvbGxlck9wdGlvbnMuY29udGVudFN0eWxlQ2xhc3NcIiBbc3R5bGVdPVwic2Nyb2xsZXJPcHRpb25zLmNvbnRlbnRTdHlsZVwiIHJvbGU9XCJ0cmVlXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwLXRyZWVOb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgI3RyZWVOb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHJvd05vZGUgb2YgaXRlbXM7IGxldCBmaXJzdENoaWxkID0gZmlyc3Q7IGxldCBsYXN0Q2hpbGQgPSBsYXN0OyBsZXQgaW5kZXggPSBpbmRleDsgdHJhY2tCeTogdHJhY2tCeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xldmVsXT1cInJvd05vZGUubGV2ZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3dOb2RlXT1cInJvd05vZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtub2RlXT1cInJvd05vZGUubm9kZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BhcmVudE5vZGVdPVwicm93Tm9kZS5wYXJlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmaXJzdENoaWxkXT1cImZpcnN0Q2hpbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYXN0Q2hpbGRdPVwibGFzdENoaWxkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaW5kZXhdPVwiZ2V0SW5kZXgoc2Nyb2xsZXJPcHRpb25zLCBpbmRleClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpdGVtU2l6ZV09XCJzY3JvbGxlck9wdGlvbnMuaXRlbVNpemVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpbmRlbnRhdGlvbl09XCJpbmRlbnRhdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC9wLXRyZWVOb2RlPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxvYWRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJsb2FkZXJcIiBsZXQtc2Nyb2xsZXJPcHRpb25zPVwib3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImxvYWRlclRlbXBsYXRlOyBjb250ZXh0OiB7IG9wdGlvbnM6IHNjcm9sbGVyT3B0aW9ucyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L3Atc2Nyb2xsZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXZpcnR1YWxTY3JvbGxcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICN3cmFwcGVyIGNsYXNzPVwicC10cmVlLXdyYXBwZXJcIiBbc3R5bGUubWF4LWhlaWdodF09XCJzY3JvbGxIZWlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicC10cmVlLWNvbnRhaW5lclwiICpuZ0lmPVwiZ2V0Um9vdE5vZGUoKVwiIHJvbGU9XCJ0cmVlXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwLXRyZWVOb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG5vZGUgb2YgZ2V0Um9vdE5vZGUoKTsgbGV0IGZpcnN0Q2hpbGQgPSBmaXJzdDsgbGV0IGxhc3RDaGlsZCA9IGxhc3Q7IGxldCBpbmRleCA9IGluZGV4OyB0cmFja0J5OiB0cmFja0J5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbm9kZV09XCJub2RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZmlyc3RDaGlsZF09XCJmaXJzdENoaWxkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGFzdENoaWxkXT1cImxhc3RDaGlsZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2luZGV4XT1cImluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGV2ZWxdPVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC9wLXRyZWVOb2RlPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRyZWUtZW1wdHktbWVzc2FnZVwiICpuZ0lmPVwiIWxvYWRpbmcgJiYgKGdldFJvb3ROb2RlKCkgPT0gbnVsbCB8fCBnZXRSb290Tm9kZSgpLmxlbmd0aCA9PT0gMClcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWVtcHR5TWVzc2FnZVRlbXBsYXRlOyBlbHNlIGVtcHR5RmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGVtcHR5TWVzc2FnZUxhYmVsIH19XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAjZW1wdHlGaWx0ZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJlbXB0eU1lc3NhZ2VUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZm9vdGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyAncC10cmVlIHAtdHJlZS1ob3Jpem9udGFsIHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtdHJlZS1zZWxlY3RhYmxlJzogc2VsZWN0aW9uTW9kZSB9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiICpuZ0lmPVwiaG9yaXpvbnRhbFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10cmVlLWxvYWRpbmctbWFzayBwLWNvbXBvbmVudC1vdmVybGF5XCIgKm5nSWY9XCJsb2FkaW5nXCI+XG4gICAgICAgICAgICAgICAgPGkgKm5nSWY9XCJsb2FkaW5nSWNvblwiIFtjbGFzc109XCIncC10cmVlLWxvYWRpbmctaWNvbiBwaS1zcGluICcgKyBsb2FkaW5nSWNvblwiPjwvaT5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWxvYWRpbmdJY29uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTcGlubmVySWNvbiAqbmdJZj1cIiFsb2FkaW5nSWNvblRlbXBsYXRlXCIgW3NwaW5dPVwidHJ1ZVwiIFtzdHlsZUNsYXNzXT1cIidwLXRyZWUtbG9hZGluZy1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibG9hZGluZ0ljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC10cmVlLWxvYWRpbmctaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibG9hZGluZ0ljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHRhYmxlICpuZ0lmPVwidmFsdWUgJiYgdmFsdWVbMF1cIj5cbiAgICAgICAgICAgICAgICA8cC10cmVlTm9kZSBbbm9kZV09XCJ2YWx1ZVswXVwiIFtyb290XT1cInRydWVcIj48L3AtdHJlZU5vZGU+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtdHJlZS1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCIhbG9hZGluZyAmJiAoZ2V0Um9vdE5vZGUoKSA9PSBudWxsIHx8IGdldFJvb3ROb2RlKCkubGVuZ3RoID09PSAwKVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZW1wdHlNZXNzYWdlVGVtcGxhdGU7IGVsc2UgZW1wdHlGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgZW1wdHlNZXNzYWdlTGFiZWwgfX1cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICNlbXB0eUZpbHRlciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5TWVzc2FnZVRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmb290ZXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL3RyZWUuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFRyZWUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBCbG9ja2FibGVVSSB7XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgdHJlZW5vZGVzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHZhbHVlOiBUcmVlTm9kZTxhbnk+IHwgVHJlZU5vZGU8YW55PltdIHwgYW55W10gfCBhbnk7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgc2VsZWN0aW9uIG1vZGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2VsZWN0aW9uTW9kZTogJ3NpbmdsZScgfCAnbXVsdGlwbGUnIHwgJ2NoZWNrYm94JyB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQSBzaW5nbGUgdHJlZW5vZGUgaW5zdGFuY2Ugb3IgYW4gYXJyYXkgdG8gcmVmZXIgdG8gdGhlIHNlbGVjdGlvbnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2VsZWN0aW9uOiBhbnk7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQ29udGV4dCBtZW51IGluc3RhbmNlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbnRleHRNZW51OiBhbnk7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgb3JpZW50YXRpb24gb2YgdGhlIHRyZWUsIHZhbGlkIHZhbHVlcyBhcmUgJ3ZlcnRpY2FsJyBhbmQgJ2hvcml6b250YWwnLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxheW91dDogc3RyaW5nID0gJ3ZlcnRpY2FsJztcbiAgICAvKipcbiAgICAgKiBTY29wZSBvZiB0aGUgZHJhZ2dhYmxlIG5vZGVzIHRvIG1hdGNoIGEgZHJvcHBhYmxlU2NvcGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZHJhZ2dhYmxlU2NvcGU6IGFueTtcbiAgICAvKipcbiAgICAgKiBTY29wZSBvZiB0aGUgZHJvcHBhYmxlIG5vZGVzIHRvIG1hdGNoIGEgZHJhZ2dhYmxlU2NvcGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZHJvcHBhYmxlU2NvcGU6IGFueTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBub2RlcyBhcmUgZHJhZ2dhYmxlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBkcmFnZ2FibGVOb2RlczogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBub2RlcyBhcmUgZHJvcHBhYmxlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBkcm9wcGFibGVOb2RlczogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGhvdyBtdWx0aXBsZSBpdGVtcyBjYW4gYmUgc2VsZWN0ZWQsIHdoZW4gdHJ1ZSBtZXRhS2V5IG5lZWRzIHRvIGJlIHByZXNzZWQgdG8gc2VsZWN0IG9yIHVuc2VsZWN0IGFuIGl0ZW0gYW5kIHdoZW4gc2V0IHRvIGZhbHNlIHNlbGVjdGlvbiBvZiBlYWNoIGl0ZW0gY2FuIGJlIHRvZ2dsZWQgaW5kaXZpZHVhbGx5LiBPbiB0b3VjaCBlbmFibGVkIGRldmljZXMsIG1ldGFLZXlTZWxlY3Rpb24gaXMgdHVybmVkIG9mZiBhdXRvbWF0aWNhbGx5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBtZXRhS2V5U2VsZWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hldGhlciBjaGVja2JveCBzZWxlY3Rpb25zIHByb3BhZ2F0ZSB0byBhbmNlc3RvciBub2Rlcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcHJvcGFnYXRlU2VsZWN0aW9uVXA6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgY2hlY2tib3ggc2VsZWN0aW9ucyBwcm9wYWdhdGUgdG8gZGVzY2VuZGFudCBub2Rlcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcHJvcGFnYXRlU2VsZWN0aW9uRG93bjogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogRGlzcGxheXMgYSBsb2FkZXIgdG8gaW5kaWNhdGUgZGF0YSBsb2FkIGlzIGluIHByb2dyZXNzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBsb2FkaW5nOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRoZSBpY29uIHRvIHNob3cgd2hpbGUgaW5kaWNhdGluZyBkYXRhIGxvYWQgaXMgaW4gcHJvZ3Jlc3MuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbG9hZGluZ0ljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUZXh0IHRvIGRpc3BsYXkgd2hlbiB0aGVyZSBpcyBubyBkYXRhLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGVtcHR5TWVzc2FnZTogc3RyaW5nID0gJyc7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBkZWZpbmUgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIHRyZWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgdG9nZ2xlciBpY29uIGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvZ2dsZXJBcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBFc3RhYmxpc2hlcyByZWxhdGlvbnNoaXBzIGJldHdlZW4gdGhlIGNvbXBvbmVudCBhbmQgbGFiZWwocykgd2hlcmUgaXRzIHZhbHVlIHNob3VsZCBiZSBvbmUgb3IgbW9yZSBlbGVtZW50IElEcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCwgZHJvcCBjYW4gYmUgYWNjZXB0ZWQgb3IgcmVqZWN0ZWQgYmFzZWQgb24gY29uZGl0aW9uIGRlZmluZWQgYXQgb25Ob2RlRHJvcC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgdmFsaWRhdGVEcm9wOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gc3BlY2lmaWVkLCBkaXNwbGF5cyBhbiBpbnB1dCBmaWVsZCB0byBmaWx0ZXIgdGhlIGl0ZW1zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBmaWx0ZXI6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBmaWx0ZXJpbmcgaXMgZW5hYmxlZCwgZmlsdGVyQnkgZGVjaWRlcyB3aGljaCBmaWVsZCBvciBmaWVsZHMgKGNvbW1hIHNlcGFyYXRlZCkgdG8gc2VhcmNoIGFnYWluc3QuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyQnk6IHN0cmluZyA9ICdsYWJlbCc7XG4gICAgLyoqXG4gICAgICogTW9kZSBmb3IgZmlsdGVyaW5nIHZhbGlkIHZhbHVlcyBhcmUgXCJsZW5pZW50XCIgYW5kIFwic3RyaWN0XCIuIERlZmF1bHQgaXMgbGVuaWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJNb2RlOiBzdHJpbmcgPSAnbGVuaWVudCc7XG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgdGV4dCB0byBzaG93IHdoZW4gZmlsdGVyIGlucHV0IGlzIGVtcHR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZpbHRlclBsYWNlaG9sZGVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVmFsdWVzIGFmdGVyIHRoZSB0cmVlIG5vZGVzIGFyZSBmaWx0ZXJlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJlZE5vZGVzOiBUcmVlTm9kZTxhbnk+W10gfCB1bmRlZmluZWQgfCBudWxsO1xuICAgIC8qKlxuICAgICAqIExvY2FsZSB0byB1c2UgaW4gZmlsdGVyaW5nLiBUaGUgZGVmYXVsdCBsb2NhbGUgaXMgdGhlIGhvc3QgZW52aXJvbm1lbnQncyBjdXJyZW50IGxvY2FsZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJMb2NhbGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBIZWlnaHQgb2YgdGhlIHNjcm9sbGFibGUgdmlld3BvcnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2Nyb2xsSGVpZ2h0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiBkYXRhIGlzIGxvYWRlZCBhbmQgaW50ZXJhY3RlZCB3aXRoIGluIGxhenkgbWFubmVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBsYXp5OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZGF0YSBzaG91bGQgYmUgbG9hZGVkIG9uIGRlbWFuZCBkdXJpbmcgc2Nyb2xsLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSB2aXJ0dWFsU2Nyb2xsOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEhlaWdodCBvZiBhbiBpdGVtIGluIHRoZSBsaXN0IGZvciBWaXJ0dWFsU2Nyb2xsaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gdXNlIHRoZSBzY3JvbGxlciBmZWF0dXJlLiBUaGUgcHJvcGVydGllcyBvZiBzY3JvbGxlciBjb21wb25lbnQgY2FuIGJlIHVzZWQgbGlrZSBhbiBvYmplY3QgaW4gaXQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmlydHVhbFNjcm9sbE9wdGlvbnM6IFNjcm9sbGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmRlbnRhdGlvbiBmYWN0b3IgZm9yIHNwYWNpbmcgb2YgdGhlIG5lc3RlZCBub2RlIHdoZW4gdmlydHVhbCBzY3JvbGxpbmcgaXMgZW5hYmxlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBpbmRlbnRhdGlvbjogbnVtYmVyID0gMS41O1xuICAgIC8qKlxuICAgICAqIEN1c3RvbSB0ZW1wbGF0ZXMgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBfdGVtcGxhdGVNYXA6IGFueTtcbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBvcHRpbWl6ZSB0aGUgbm9kZSBsaXN0IHJlbmRlcmluZywgZGVmYXVsdCBhbGdvcml0aG0gY2hlY2tzIGZvciBvYmplY3QgaWRlbnRpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdHJhY2tCeTogRnVuY3Rpb24gPSAoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSA9PiBpdGVtO1xuICAgIC8qKlxuICAgICAqIEhlaWdodCBvZiB0aGUgbm9kZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVwcmVjYXRlZCB1c2UgdmlydHVhbFNjcm9sbEl0ZW1TaXplIHByb3BlcnR5IGluc3RlYWQuXG4gICAgICovXG4gICAgX3ZpcnR1YWxOb2RlSGVpZ2h0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgQElucHV0KCkgZ2V0IHZpcnR1YWxOb2RlSGVpZ2h0KCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXJ0dWFsTm9kZUhlaWdodDtcbiAgICB9XG4gICAgc2V0IHZpcnR1YWxOb2RlSGVpZ2h0KHZhbDogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3ZpcnR1YWxOb2RlSGVpZ2h0ID0gdmFsO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSB2aXJ0dWFsTm9kZUhlaWdodCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLCB1c2UgdmlydHVhbFNjcm9sbEl0ZW1TaXplIHByb3BlcnR5IGluc3RlYWQuJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiBzZWxlY3Rpb24gY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7KFRyZWVOb2RlPGFueT4gfCBUcmVlTm9kZTxhbnk+W10gfCBudWxsKX0gZXZlbnQgLSBDdXN0b20gc2VsZWN0aW9uIGNoYW5nZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8VHJlZU5vZGU8YW55PiB8IFRyZWVOb2RlPGFueT5bXSB8IG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxUcmVlTm9kZTxhbnk+IHwgVHJlZU5vZGU8YW55PltdIHwgbnVsbD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIG5vZGUgaXMgc2VsZWN0ZWQuXG4gICAgICogQHBhcmFtIHtUcmVlTm9kZVNlbGVjdEV2ZW50fSBldmVudCAtIE5vZGUgc2VsZWN0IGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbk5vZGVTZWxlY3Q6IEV2ZW50RW1pdHRlcjxUcmVlTm9kZVNlbGVjdEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VHJlZU5vZGVTZWxlY3RFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIG5vZGUgaXMgdW5zZWxlY3RlZC5cbiAgICAgKiBAcGFyYW0ge1RyZWVOb2RlVW5TZWxlY3RFdmVudH0gZXZlbnQgLSBOb2RlIHVuc2VsZWN0IGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbk5vZGVVbnNlbGVjdDogRXZlbnRFbWl0dGVyPFRyZWVOb2RlVW5TZWxlY3RFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRyZWVOb2RlVW5TZWxlY3RFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIG5vZGUgaXMgZXhwYW5kZWQuXG4gICAgICogQHBhcmFtIHtUcmVlTm9kZUV4cGFuZEV2ZW50fSBldmVudCAtIE5vZGUgZXhwYW5kIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbk5vZGVFeHBhbmQ6IEV2ZW50RW1pdHRlcjxUcmVlTm9kZUV4cGFuZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VHJlZU5vZGVFeHBhbmRFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIG5vZGUgaXMgY29sbGFwc2VkLlxuICAgICAqIEBwYXJhbSB7VHJlZU5vZGVDb2xsYXBzZUV2ZW50fSBldmVudCAtIE5vZGUgY29sbGFwc2UgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uTm9kZUNvbGxhcHNlOiBFdmVudEVtaXR0ZXI8VHJlZU5vZGVDb2xsYXBzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VHJlZU5vZGVDb2xsYXBzZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgbm9kZSBpcyBzZWxlY3RlZCB3aXRoIHJpZ2h0IGNsaWNrLlxuICAgICAqIEBwYXJhbSB7b25Ob2RlQ29udGV4dE1lbnVTZWxlY3R9IGV2ZW50IC0gTm9kZSBjb250ZXh0IG1lbnUgc2VsZWN0IGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbk5vZGVDb250ZXh0TWVudVNlbGVjdDogRXZlbnRFbWl0dGVyPFRyZWVOb2RlQ29udGV4dE1lbnVTZWxlY3RFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRyZWVOb2RlQ29udGV4dE1lbnVTZWxlY3RFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIG5vZGUgaXMgZHJvcHBlZC5cbiAgICAgKiBAcGFyYW0ge1RyZWVOb2RlRHJvcEV2ZW50fSBldmVudCAtIE5vZGUgZHJvcCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Ob2RlRHJvcDogRXZlbnRFbWl0dGVyPFRyZWVOb2RlRHJvcEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VHJlZU5vZGVEcm9wRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIGluIGxhenkgbW9kZSB0byBsb2FkIG5ldyBkYXRhLlxuICAgICAqIEBwYXJhbSB7VHJlZUxhenlMb2FkRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIGxhenkgbG9hZCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25MYXp5TG9hZDogRXZlbnRFbWl0dGVyPFRyZWVMYXp5TG9hZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VHJlZUxhenlMb2FkRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIGluIHZpcnR1YWwgc2Nyb2xsIG1vZGUgd2hlbiBzY3JvbGwgcG9zaXRpb24gY2hhbmdlcy5cbiAgICAgKiBAcGFyYW0ge1RyZWVTY3JvbGxFdmVudH0gZXZlbnQgLSBDdXN0b20gc2Nyb2xsIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNjcm9sbDogRXZlbnRFbWl0dGVyPFRyZWVTY3JvbGxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRyZWVTY3JvbGxFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2UgaW4gdmlydHVhbCBzY3JvbGwgbW9kZSB3aGVuIHNjcm9sbCBwb3NpdGlvbiBhbmQgaXRlbSdzIHJhbmdlIGluIHZpZXcgY2hhbmdlcy5cbiAgICAgKiBAcGFyYW0ge1RyZWVTY3JvbGxJbmRleENoYW5nZUV2ZW50fSBldmVudCAtIFNjcm9sbCBpbmRleCBjaGFuZ2UgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2Nyb2xsSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxUcmVlU2Nyb2xsSW5kZXhDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRyZWVTY3JvbGxJbmRleENoYW5nZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGRhdGEgaXMgZmlsdGVyZWQuXG4gICAgICogQHBhcmFtIHtUcmVlRmlsdGVyRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIGZpbHRlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25GaWx0ZXI6IEV2ZW50RW1pdHRlcjxUcmVlRmlsdGVyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUcmVlRmlsdGVyRXZlbnQ+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogTnVsbGFibGU8UXVlcnlMaXN0PGFueT4+O1xuXG4gICAgQFZpZXdDaGlsZCgnZmlsdGVyJykgZmlsdGVyVmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3Njcm9sbGVyJykgc2Nyb2xsZXI6IE51bGxhYmxlPFNjcm9sbGVyPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3dyYXBwZXInKSB3cmFwcGVyVmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIHNlcmlhbGl6ZWRWYWx1ZTogTnVsbGFibGU8VHJlZU5vZGU8YW55PltdPjtcblxuICAgIGhlYWRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZvb3RlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGxvYWRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGVtcHR5TWVzc2FnZVRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHRvZ2dsZXJJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgY2hlY2tib3hJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgbG9hZGluZ0ljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBmaWx0ZXJJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgcHVibGljIG5vZGVUb3VjaGVkOiBib29sZWFuIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIHB1YmxpYyBkcmFnTm9kZVRyZWU6IFRyZWUgfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gICAgcHVibGljIGRyYWdOb2RlOiBUcmVlTm9kZTxhbnk+IHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIHB1YmxpYyBkcmFnTm9kZVN1Yk5vZGVzOiBUcmVlTm9kZTxhbnk+W10gfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gICAgcHVibGljIGRyYWdOb2RlSW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBwdWJsaWMgZHJhZ05vZGVTY29wZTogYW55O1xuXG4gICAgcHVibGljIGRyYWdIb3ZlcjogYm9vbGVhbiB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBwdWJsaWMgZHJhZ1N0YXJ0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gICAgcHVibGljIGRyYWdTdG9wU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBAT3B0aW9uYWwoKSBwdWJsaWMgZHJhZ0Ryb3BTZXJ2aWNlOiBUcmVlRHJhZ0Ryb3BTZXJ2aWNlLCBwdWJsaWMgY29uZmlnOiBQcmltZU5HQ29uZmlnLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5kcm9wcGFibGVOb2Rlcykge1xuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRTdWJzY3JpcHRpb24gPSB0aGlzLmRyYWdEcm9wU2VydmljZS5kcmFnU3RhcnQkLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlVHJlZSA9IGV2ZW50LnRyZWU7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTm9kZSA9IGV2ZW50Lm5vZGU7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTm9kZVN1Yk5vZGVzID0gZXZlbnQuc3ViTm9kZXM7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTm9kZUluZGV4ID0gZXZlbnQuaW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTm9kZVNjb3BlID0gZXZlbnQuc2NvcGU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnU3RvcFN1YnNjcmlwdGlvbiA9IHRoaXMuZHJhZ0Ryb3BTZXJ2aWNlLmRyYWdTdG9wJC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTm9kZVRyZWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGVTdWJOb2RlcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTm9kZUluZGV4ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlU2NvcGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0hvdmVyID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKHNpbXBsZUNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNlcmlhbGl6ZWRWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGhvcml6b250YWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmxheW91dCA9PSAnaG9yaXpvbnRhbCc7XG4gICAgfVxuXG4gICAgZ2V0IGVtcHR5TWVzc2FnZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5TWVzc2FnZSB8fCB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuRU1QVFlfTUVTU0FHRSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICBpZiAoKHRoaXMudGVtcGxhdGVzIGFzIFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPikubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl90ZW1wbGF0ZU1hcCA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgKHRoaXMudGVtcGxhdGVzIGFzIFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPikuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VtcHR5JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eU1lc3NhZ2VUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAndG9nZ2xlcmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NoZWNrYm94aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tib3hJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xvYWRpbmdpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmaWx0ZXJpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RlbXBsYXRlTWFwWzxhbnk+aXRlbS5uYW1lXSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVTZXJpYWxpemVkVmFsdWUoKSB7XG4gICAgICAgIHRoaXMuc2VyaWFsaXplZFZhbHVlID0gW107XG4gICAgICAgIHRoaXMuc2VyaWFsaXplTm9kZXMobnVsbCwgdGhpcy5nZXRSb290Tm9kZSgpLCAwLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzZXJpYWxpemVOb2RlcyhwYXJlbnQ6IFRyZWVOb2RlPGFueT4gfCBudWxsLCBub2RlczogVHJlZU5vZGU8YW55PltdIHwgYW55LCBsZXZlbDogbnVtYmVyLCB2aXNpYmxlOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChub2RlcyAmJiBub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgICAgICAgICBjb25zdCByb3dOb2RlID0ge1xuICAgICAgICAgICAgICAgICAgICBub2RlOiBub2RlLFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IGxldmVsLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB2aXNpYmxlICYmIChwYXJlbnQgPyBwYXJlbnQuZXhwYW5kZWQgOiB0cnVlKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgKHRoaXMuc2VyaWFsaXplZFZhbHVlIGFzIFRyZWVOb2RlPGFueT5bXSkucHVzaCg8VHJlZU5vZGU+cm93Tm9kZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocm93Tm9kZS52aXNpYmxlICYmIG5vZGUuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJpYWxpemVOb2Rlcyhub2RlLCBub2RlLmNoaWxkcmVuLCBsZXZlbCArIDEsIHJvd05vZGUudmlzaWJsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ob2RlQ2xpY2soZXZlbnQ6IEV2ZW50LCBub2RlOiBUcmVlTm9kZSkge1xuICAgICAgICBsZXQgZXZlbnRUYXJnZXQgPSA8RWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50VGFyZ2V0LCAncC10cmVlLXRvZ2dsZXInKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50VGFyZ2V0LCAncC10cmVlLXRvZ2dsZXItaWNvbicpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5zZWxlY3RhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzRmlsdGVyZWROb2RlcygpKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuZ2V0Tm9kZVdpdGhLZXkoPHN0cmluZz5ub2RlLmtleSwgPFRyZWVOb2RlPGFueT5bXT50aGlzLmZpbHRlcmVkTm9kZXMpIGFzIFRyZWVOb2RlO1xuICAgICAgICAgICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gaW5kZXggPj0gMDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNDaGVja2JveFNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wYWdhdGVTZWxlY3Rpb25Eb3duKSB0aGlzLnByb3BhZ2F0ZURvd24obm9kZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWw6IFRyZWVOb2RlLCBpOiBudW1iZXIpID0+IGkgIT0gaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BhZ2F0ZVNlbGVjdGlvblVwICYmIG5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZVVwKG5vZGUucGFyZW50LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVVbnNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGUgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcGFnYXRlU2VsZWN0aW9uRG93bikgdGhpcy5wcm9wYWdhdGVEb3duKG5vZGUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc2VsZWN0aW9uID0gWy4uLih0aGlzLnNlbGVjdGlvbiB8fCBbXSksIG5vZGVdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BhZ2F0ZVNlbGVjdGlvblVwICYmIG5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZVVwKG5vZGUucGFyZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbWV0YVNlbGVjdGlvbiA9IHRoaXMubm9kZVRvdWNoZWQgPyBmYWxzZSA6IHRoaXMubWV0YUtleVNlbGVjdGlvbjtcblxuICAgICAgICAgICAgICAgIGlmIChtZXRhU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gKDxLZXlib2FyZEV2ZW50PmV2ZW50KS5tZXRhS2V5IHx8ICg8S2V5Ym9hcmRFdmVudD5ldmVudCkuY3RybEtleTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgbWV0YUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsOiBUcmVlTm9kZSwgaTogbnVtYmVyKSA9PiBpICE9IGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVVbnNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQoPFRyZWVOb2RlPm5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9ICFtZXRhS2V5ID8gW10gOiB0aGlzLnNlbGVjdGlvbiB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IFsuLi50aGlzLnNlbGVjdGlvbiwgbm9kZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlU2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogbm9kZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVVbnNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gbm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsOiBUcmVlTm9kZSwgaTogbnVtYmVyKSA9PiBpICE9IGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVVuc2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogbm9kZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBbLi4uKHRoaXMuc2VsZWN0aW9uIHx8IFtdKSwgbm9kZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVTZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub2RlVG91Y2hlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uTm9kZVRvdWNoRW5kKCkge1xuICAgICAgICB0aGlzLm5vZGVUb3VjaGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbk5vZGVSaWdodENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBUcmVlTm9kZTxhbnk+KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHRNZW51KSB7XG4gICAgICAgICAgICBsZXQgZXZlbnRUYXJnZXQgPSA8RWxlbWVudD5ldmVudC50YXJnZXQ7XG5cbiAgICAgICAgICAgIGlmIChldmVudFRhcmdldC5jbGFzc05hbWUgJiYgZXZlbnRUYXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoJ3AtdHJlZS10b2dnbGVyJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24obm9kZSk7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gaW5kZXggPj0gMDtcblxuICAgICAgICAgICAgICAgIGlmICghc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChbbm9kZV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuc2hvdyhldmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVDb250ZXh0TWVudVNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kSW5kZXhJblNlbGVjdGlvbihub2RlOiBUcmVlTm9kZSkge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IC0xO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlICYmIHRoaXMuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgIGxldCBhcmVOb2Rlc0VxdWFsID0gKHRoaXMuc2VsZWN0aW9uLmtleSAmJiB0aGlzLnNlbGVjdGlvbi5rZXkgPT09IG5vZGUua2V5KSB8fCB0aGlzLnNlbGVjdGlvbiA9PSBub2RlO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gYXJlTm9kZXNFcXVhbCA/IDAgOiAtMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWROb2RlID0gdGhpcy5zZWxlY3Rpb25baV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcmVOb2Rlc0VxdWFsID0gKHNlbGVjdGVkTm9kZS5rZXkgJiYgc2VsZWN0ZWROb2RlLmtleSA9PT0gbm9kZS5rZXkpIHx8IHNlbGVjdGVkTm9kZSA9PSBub2RlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJlTm9kZXNFcXVhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgc3luY05vZGVPcHRpb24obm9kZTogVHJlZU5vZGUsIHBhcmVudE5vZGVzOiBUcmVlTm9kZTxhbnk+W10sIG9wdGlvbjogYW55LCB2YWx1ZT86IGFueSkge1xuICAgICAgICAvLyB0byBzeW5jaHJvbml6ZSB0aGUgbm9kZSBvcHRpb24gYmV0d2VlbiB0aGUgZmlsdGVyZWQgbm9kZXMgYW5kIHRoZSBvcmlnaW5hbCBub2Rlcyh0aGlzLnZhbHVlKVxuICAgICAgICBjb25zdCBfbm9kZSA9IHRoaXMuaGFzRmlsdGVyZWROb2RlcygpID8gdGhpcy5nZXROb2RlV2l0aEtleSg8c3RyaW5nPm5vZGUua2V5LCBwYXJlbnROb2RlcykgOiBudWxsO1xuICAgICAgICBpZiAoX25vZGUpIHtcbiAgICAgICAgICAgICg8YW55Pl9ub2RlKVtvcHRpb25dID0gdmFsdWUgfHwgKDxhbnk+bm9kZSlbb3B0aW9uXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc0ZpbHRlcmVkTm9kZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlcmVkTm9kZXMgJiYgdGhpcy5maWx0ZXJlZE5vZGVzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXROb2RlV2l0aEtleShrZXk6IHN0cmluZywgbm9kZXM6IFRyZWVOb2RlPGFueT5bXSk6IFRyZWVOb2RlPGFueT4gfCB1bmRlZmluZWQge1xuICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5rZXkgPT09IGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGxldCBtYXRjaGVkTm9kZSA9IHRoaXMuZ2V0Tm9kZVdpdGhLZXkoa2V5LCBub2RlLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlZE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZWROb2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3BhZ2F0ZVVwKG5vZGU6IFRyZWVOb2RlLCBzZWxlY3Q6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZENvdW50OiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgbGV0IGNoaWxkUGFydGlhbFNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZChjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDb3VudCsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hpbGQucGFydGlhbFNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkUGFydGlhbFNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3QgJiYgc2VsZWN0ZWRDb3VudCA9PSBub2RlLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gWy4uLih0aGlzLnNlbGVjdGlvbiB8fCBbXSksIG5vZGVdO1xuICAgICAgICAgICAgICAgIG5vZGUucGFydGlhbFNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24obm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsOiBUcmVlTm9kZSwgaTogbnVtYmVyKSA9PiBpICE9IGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjaGlsZFBhcnRpYWxTZWxlY3RlZCB8fCAoc2VsZWN0ZWRDb3VudCA+IDAgJiYgc2VsZWN0ZWRDb3VudCAhPSBub2RlLmNoaWxkcmVuLmxlbmd0aCkpIG5vZGUucGFydGlhbFNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlbHNlIG5vZGUucGFydGlhbFNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc3luY05vZGVPcHRpb24obm9kZSwgPFRyZWVOb2RlPGFueT5bXT50aGlzLmZpbHRlcmVkTm9kZXMsICdwYXJ0aWFsU2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJlbnQgPSBub2RlLnBhcmVudDtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVVcChwYXJlbnQsIHNlbGVjdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9wYWdhdGVEb3duKG5vZGU6IFRyZWVOb2RlLCBzZWxlY3Q6IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihub2RlKTtcblxuICAgICAgICBpZiAoc2VsZWN0ICYmIGluZGV4ID09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IFsuLi4odGhpcy5zZWxlY3Rpb24gfHwgW10pLCBub2RlXTtcbiAgICAgICAgfSBlbHNlIGlmICghc2VsZWN0ICYmIGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWw6IFRyZWVOb2RlLCBpOiBudW1iZXIpID0+IGkgIT0gaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS5wYXJ0aWFsU2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnN5bmNOb2RlT3B0aW9uKG5vZGUsIDxUcmVlTm9kZTxhbnk+W10+dGhpcy5maWx0ZXJlZE5vZGVzLCAncGFydGlhbFNlbGVjdGVkJyk7XG5cbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZURvd24oY2hpbGQsIHNlbGVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKG5vZGU6IFRyZWVOb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpICE9IC0xO1xuICAgIH1cblxuICAgIGlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZSAmJiB0aGlzLnNlbGVjdGlvbk1vZGUgPT0gJ3NpbmdsZSc7XG4gICAgfVxuXG4gICAgaXNNdWx0aXBsZVNlbGVjdGlvbk1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09ICdtdWx0aXBsZSc7XG4gICAgfVxuXG4gICAgaXNDaGVja2JveFNlbGVjdGlvbk1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09ICdjaGVja2JveCc7XG4gICAgfVxuXG4gICAgaXNOb2RlTGVhZihub2RlOiBUcmVlTm9kZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbm9kZS5sZWFmID09IGZhbHNlID8gZmFsc2UgOiAhKG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGgpO1xuICAgIH1cblxuICAgIGdldFJvb3ROb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJlZE5vZGVzID8gdGhpcy5maWx0ZXJlZE5vZGVzIDogdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICBnZXRUZW1wbGF0ZUZvck5vZGUobm9kZTogVHJlZU5vZGUpOiBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCB7XG4gICAgICAgIGlmICh0aGlzLl90ZW1wbGF0ZU1hcCkgcmV0dXJuIG5vZGUudHlwZSA/IHRoaXMuX3RlbXBsYXRlTWFwW25vZGUudHlwZV0gOiB0aGlzLl90ZW1wbGF0ZU1hcFsnZGVmYXVsdCddO1xuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIG9uRHJhZ092ZXIoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5kcm9wcGFibGVOb2RlcyAmJiAoIXRoaXMudmFsdWUgfHwgKDxhbnk+dGhpcy52YWx1ZSkubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgKDxhbnk+ZXZlbnQpLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJvcChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU5vZGVzICYmICghdGhpcy52YWx1ZSB8fCAoPGFueT50aGlzLnZhbHVlKS5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IGRyYWdOb2RlID0gdGhpcy5kcmFnTm9kZSBhcyBUcmVlTm9kZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYWxsb3dEcm9wKGRyYWdOb2RlLCBudWxsLCB0aGlzLmRyYWdOb2RlU2NvcGUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRyYWdOb2RlSW5kZXggPSA8bnVtYmVyPnRoaXMuZHJhZ05vZGVJbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZSB8fCBbXTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRlRHJvcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZURyb3AuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdOb2RlOiBkcmFnTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BOb2RlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGRyYWdOb2RlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NUcmVlRHJvcChkcmFnTm9kZSwgZHJhZ05vZGVJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlRHJvcC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ05vZGU6IGRyYWdOb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE5vZGU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogZHJhZ05vZGVJbmRleFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NUcmVlRHJvcChkcmFnTm9kZSwgZHJhZ05vZGVJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc1RyZWVEcm9wKGRyYWdOb2RlOiBUcmVlTm9kZSwgZHJhZ05vZGVJbmRleDogbnVtYmVyKSB7XG4gICAgICAgICg8VHJlZU5vZGU8YW55PltdPnRoaXMuZHJhZ05vZGVTdWJOb2Rlcykuc3BsaWNlKGRyYWdOb2RlSW5kZXgsIDEpO1xuICAgICAgICAodGhpcy52YWx1ZSBhcyBUcmVlTm9kZTxhbnk+W10pLnB1c2goZHJhZ05vZGUpO1xuICAgICAgICB0aGlzLmRyYWdEcm9wU2VydmljZS5zdG9wRHJhZyh7XG4gICAgICAgICAgICBub2RlOiBkcmFnTm9kZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkRyYWdFbnRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTm9kZXMgJiYgdGhpcy5hbGxvd0Ryb3AoPFRyZWVOb2RlPnRoaXMuZHJhZ05vZGUsIG51bGwsIHRoaXMuZHJhZ05vZGVTY29wZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0hvdmVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhZ0xlYXZlKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTm9kZXMpIHtcbiAgICAgICAgICAgIGxldCByZWN0ID0gKGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnggPiByZWN0LmxlZnQgKyByZWN0LndpZHRoIHx8IGV2ZW50LnggPCByZWN0LmxlZnQgfHwgZXZlbnQueSA+IHJlY3QudG9wICsgcmVjdC5oZWlnaHQgfHwgZXZlbnQueSA8IHJlY3QudG9wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnSG92ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsbG93RHJvcChkcmFnTm9kZTogVHJlZU5vZGUsIGRyb3BOb2RlOiBUcmVlTm9kZTxhbnk+IHwgbnVsbCwgZHJhZ05vZGVTY29wZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghZHJhZ05vZGUpIHtcbiAgICAgICAgICAgIC8vcHJldmVudCByYW5kb20gaHRtbCBlbGVtZW50cyB0byBiZSBkcmFnZ2VkXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1ZhbGlkRHJhZ1Njb3BlKGRyYWdOb2RlU2NvcGUpKSB7XG4gICAgICAgICAgICBsZXQgYWxsb3c6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGRyb3BOb2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRyYWdOb2RlID09PSBkcm9wTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBhbGxvdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJlbnQgPSBkcm9wTm9kZS5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChwYXJlbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gZHJhZ05vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxvdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFsbG93O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNWYWxpZERyYWdTY29wZShkcmFnU2NvcGU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgZHJvcFNjb3BlID0gdGhpcy5kcm9wcGFibGVTY29wZTtcblxuICAgICAgICBpZiAoZHJvcFNjb3BlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRyb3BTY29wZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRyYWdTY29wZSA9PT0gJ3N0cmluZycpIHJldHVybiBkcm9wU2NvcGUgPT09IGRyYWdTY29wZTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRyYWdTY29wZSkpIHJldHVybiAoPEFycmF5PGFueT4+ZHJhZ1Njb3BlKS5pbmRleE9mKGRyb3BTY29wZSkgIT0gLTE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZHJvcFNjb3BlKSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZHJhZ1Njb3BlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxBcnJheTxhbnk+PmRyb3BTY29wZSkuaW5kZXhPZihkcmFnU2NvcGUpICE9IC0xO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkcmFnU2NvcGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHMgb2YgZHJvcFNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBkcyBvZiBkcmFnU2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocyA9PT0gZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgX2ZpbHRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBmaWx0ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAoZmlsdGVyVmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkTm9kZXMgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZE5vZGVzID0gW107XG4gICAgICAgICAgICBjb25zdCBzZWFyY2hGaWVsZHM6IHN0cmluZ1tdID0gdGhpcy5maWx0ZXJCeS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyVGV4dCA9IE9iamVjdFV0aWxzLnJlbW92ZUFjY2VudHMoZmlsdGVyVmFsdWUpLnRvTG9jYWxlTG93ZXJDYXNlKHRoaXMuZmlsdGVyTG9jYWxlKTtcbiAgICAgICAgICAgIGNvbnN0IGlzU3RyaWN0TW9kZSA9IHRoaXMuZmlsdGVyTW9kZSA9PT0gJ3N0cmljdCc7XG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIDxUcmVlTm9kZTxhbnk+W10+dGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGxldCBjb3B5Tm9kZSA9IHsgLi4ubm9kZSB9O1xuICAgICAgICAgICAgICAgIGxldCBwYXJhbXNXaXRob3V0Tm9kZSA9IHsgc2VhcmNoRmllbGRzLCBmaWx0ZXJUZXh0LCBpc1N0cmljdE1vZGUgfTtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIChpc1N0cmljdE1vZGUgJiYgKHRoaXMuZmluZEZpbHRlcmVkTm9kZXMoY29weU5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSB8fCB0aGlzLmlzRmlsdGVyTWF0Y2hlZChjb3B5Tm9kZSwgcGFyYW1zV2l0aG91dE5vZGUpKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgKCFpc1N0cmljdE1vZGUgJiYgKHRoaXMuaXNGaWx0ZXJNYXRjaGVkKGNvcHlOb2RlLCBwYXJhbXNXaXRob3V0Tm9kZSkgfHwgdGhpcy5maW5kRmlsdGVyZWROb2Rlcyhjb3B5Tm9kZSwgcGFyYW1zV2l0aG91dE5vZGUpKSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZE5vZGVzLnB1c2goY29weU5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlU2VyaWFsaXplZFZhbHVlKCk7XG4gICAgICAgIHRoaXMub25GaWx0ZXIuZW1pdCh7XG4gICAgICAgICAgICBmaWx0ZXI6IGZpbHRlclZhbHVlLFxuICAgICAgICAgICAgZmlsdGVyZWRWYWx1ZTogdGhpcy5maWx0ZXJlZE5vZGVzXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyBmaWx0ZXIuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyByZXNldEZpbHRlcigpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJlZE5vZGVzID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJWaWV3Q2hpbGQgJiYgdGhpcy5maWx0ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNjcm9sbHMgdG8gdmlydHVhbCBpbmRleC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIC0gSW5kZXggdG8gYmUgc2Nyb2xsZWQuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBzY3JvbGxUb1ZpcnR1YWxJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudmlydHVhbFNjcm9sbCAmJiB0aGlzLnNjcm9sbGVyPy5zY3JvbGxUb0luZGV4KGluZGV4KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2Nyb2xscyB0byB2aXJ0dWFsIGluZGV4LlxuICAgICAqIEBwYXJhbSB7U2Nyb2xsVG9PcHRpb25zfSBvcHRpb25zIC0gU2Nyb2xsIG9wdGlvbnMuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBzY3JvbGxUbyhvcHRpb25zOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxlcj8uc2Nyb2xsVG8ob3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy53cmFwcGVyVmlld0NoaWxkICYmIHRoaXMud3JhcHBlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy53cmFwcGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUbyhvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCA9IG9wdGlvbnMubGVmdDtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBvcHRpb25zLnRvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRGaWx0ZXJlZE5vZGVzKG5vZGU6IFRyZWVOb2RlLCBwYXJhbXNXaXRob3V0Tm9kZTogYW55KSB7XG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBsZXQgbWF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGROb2RlcyA9IFsuLi5ub2RlLmNoaWxkcmVuXTtcbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGROb2RlIG9mIGNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcHlDaGlsZE5vZGUgPSB7IC4uLmNoaWxkTm9kZSB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ZpbHRlck1hdGNoZWQoY29weUNoaWxkTm9kZSwgcGFyYW1zV2l0aG91dE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4ucHVzaChjb3B5Q2hpbGROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hdGNoZWQpIHtcbiAgICAgICAgICAgICAgICBub2RlLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRmlsdGVyTWF0Y2hlZChub2RlOiBUcmVlTm9kZSwgcGFyYW1zOiBhbnkpIHtcbiAgICAgICAgbGV0IHsgc2VhcmNoRmllbGRzLCBmaWx0ZXJUZXh0LCBpc1N0cmljdE1vZGUgfSA9IHBhcmFtcztcbiAgICAgICAgbGV0IG1hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgZmllbGQgb2Ygc2VhcmNoRmllbGRzKSB7XG4gICAgICAgICAgICBsZXQgZmllbGRWYWx1ZSA9IE9iamVjdFV0aWxzLnJlbW92ZUFjY2VudHMoU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEobm9kZSwgZmllbGQpKSkudG9Mb2NhbGVMb3dlckNhc2UodGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICAgICAgaWYgKGZpZWxkVmFsdWUuaW5kZXhPZihmaWx0ZXJUZXh0KSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW1hdGNoZWQgfHwgKGlzU3RyaWN0TW9kZSAmJiAhdGhpcy5pc05vZGVMZWFmKG5vZGUpKSkge1xuICAgICAgICAgICAgbWF0Y2hlZCA9IHRoaXMuZmluZEZpbHRlcmVkTm9kZXMobm9kZSwgeyBzZWFyY2hGaWVsZHMsIGZpbHRlclRleHQsIGlzU3RyaWN0TW9kZSB9KSB8fCBtYXRjaGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWQ7XG4gICAgfVxuXG4gICAgZ2V0SW5kZXgob3B0aW9uczogYW55LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGdldEl0ZW1PcHRpb25zID0gb3B0aW9uc1snZ2V0SXRlbU9wdGlvbnMnXTtcbiAgICAgICAgcmV0dXJuIGdldEl0ZW1PcHRpb25zID8gZ2V0SXRlbU9wdGlvbnMoaW5kZXgpLmluZGV4IDogaW5kZXg7XG4gICAgfVxuXG4gICAgZ2V0QmxvY2thYmxlRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdTdGFydFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRyYWdTdG9wU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdTdG9wU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFNoYXJlZE1vZHVsZSwgUmlwcGxlTW9kdWxlLCBTY3JvbGxlck1vZHVsZSwgQ2hlY2tJY29uLCBDaGV2cm9uRG93bkljb24sIENoZXZyb25SaWdodEljb24sIE1pbnVzSWNvbiwgU2VhcmNoSWNvbiwgU3Bpbm5lckljb24sIFBsdXNJY29uXSxcbiAgICBleHBvcnRzOiBbVHJlZSwgU2hhcmVkTW9kdWxlLCBTY3JvbGxlck1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbVHJlZSwgVUlUcmVlTm9kZV1cbn0pXG5leHBvcnQgY2xhc3MgVHJlZU1vZHVsZSB7fVxuIl19