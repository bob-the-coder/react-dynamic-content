import React, { ReactElement } from 'react';
import ElementEditor from './LiveEditor/ElementEditor';
import ElementViewer from './LiveEditor/ElementViewer';
import UiElement from "./Base/UiElement";
import UiContainer from "./Base/UiContainer";

export class UiElementConfiguration<T> {
    defaultValue: () => T;
    editor: (element: T, uiManager: UiManager, onUpdate: () => any) => ReactElement | ReactElement[];
    viewer: (element: T, uiManager: UiManager, onUpdate: () => any) => ReactElement | ReactElement[]; 
    actions: (element: T, uiManager: UiManager, onUpdate: () => any) => ReactElement | ReactElement[];

    constructor(
        defaultValue: () => T,
        editor: (element: T, uiManager: UiManager, onUpdate: () => any) => ReactElement | ReactElement[],
        viewer: (element: T, uiManager: UiManager, onUpdate: () => any) => ReactElement | ReactElement[], 
        actions: (element: T, uiManager: UiManager, onUpdate: () => any) => ReactElement | ReactElement[]
    ) {
        this.defaultValue = defaultValue;
        this.editor = editor;
        this.viewer = viewer;
        this.actions = actions;
    }
}

function CreateUiElement<T extends UiElement>(): T {
    return JSON.parse('{}') as T;
}


export default class UiManager {
    elements: UiElement[];
    config: UiElementConfiguration<any>[];

    constructor(model: UiElement, config) {
        this.elements = [new UiContainer()];
        this.config = [];
        if (model) {
            this.elements = this.parse(model, '');
        }
    }

    private getConfig<T extends UiElement>(): UiElementConfiguration<T> {
        return this.config.filter(config => config instanceof UiElementConfiguration<T>)[0];
    }

    configure<T extends UiElement>(config: UiElementConfiguration<T>) {
        if (this.getConfig<T>()) throw new Error(`UiElement is already configured.`);
        
        this.config.push(config);
    }

    getEditors<T extends UiElement>(element: T, onUpdate: () => any): ReactElement {
        if (!element) throw new Error("Element is null.");
        if (!element.id) throw new Error("element doesn't have an id.");

        return (
            <ElementEditor element={element} manager={this} onUpdate={onUpdate}>
                {this.getConfig<T>().editor(element, this, onUpdate)}
            </ElementEditor>
        )
    }

    getViewer<T extends UiElement>(element: T, onUpdate: () => any): ReactElement {
        return (
            <ElementViewer element={element} manager={this} onUpdate={onUpdate}>
                {this.getConfig<T>().viewer(element, this, onUpdate)}
            </ElementViewer>
        );
    }

    getActions<T extends UiElement>(element: T, onUpdate: () => any) {
        return this.config[element.type].actions(element, this, onUpdate);
    }

    parse(element: UiElement, parentId: string): UiElement[] {
        if (!element) return [];

        element.parentId = parentId;
        if (!(element instanceof UiContainer)) {
            
            return [ element ];
        };

        element.children = [];
        let elementTree: UiElement[] = [ element ];
        for (let i = 0; i < element.children.length; i++) {
            let subTree = this.parse(element.children[i], element.id);
            elementTree = elementTree.concat(subTree);
        }

        return elementTree;
    }

    findById(id: string): UiElement {
        var matches = this.elements.filter(element => element.id === id);
        if (matches.length !== 1) throw new Error(`There is more than one item with this id. (id: ${id})`);
        
        return matches[0] || null;
    }

    addElement<T extends UiElement>(parent: UiContainer) {
        if (!parent) throw new Error(`Container element is missing.`);

        this.elements.push(CreateUiElement<T>());
    }

    removeById(id: string) {
        let element = this.findById(id);

        this.elements.splice(this.elements.indexOf(element), 1);
    }

    removeElement<T extends UiElement>(element: T) {
        this.removeById(element.id);
        if (!(element instanceof UiContainer)) return;

        let children = this.findChildren(element.id);
        for (let i = 0; i < children.length; i++) {
            this.removeElement(children[i]);
        }

        if (!this.elements.length) this.elements.push(new UiContainer());
    }

    updateElement<T extends UiElement>(newElement: T) {
        let element = this.findById(newElement.id);
        
        this.elements[this.elements.indexOf(element)] = newElement;
    }

    highlight(element: UiElement | null) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].isHighlighted = this.elements[i].id === element?.id;
        }
    }

    isHighlighting(): boolean {
        return this.elements.filter(element => element.isHighlighted).length > 0;
    }

    findChildren(id: string): UiElement[] {
        return this.elements.filter(element => element.parentId === id);
    }

    buildContainer(container: UiContainer) {
        container.children = this.findChildren(container.id);
        if (container.children.length === 0) return container;

        for (let i = 0; i < container.children.length; i++) {
            let element = container.children[i];
            if (!(element instanceof UiContainer)) continue;
            container.children[i] = this.buildContainer(element);
        }

        return container;
    }

    build(): UiContainer {
        //console.log(this.elements);
        // console.log(contentTree);
        let root = this.elements[0];
        if (!(root instanceof UiContainer)) throw new Error("Root element is not a container.");

        return this.buildContainer(root);
    }
}
