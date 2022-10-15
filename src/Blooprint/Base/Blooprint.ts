import UiElement from "./UiElement";
import BlooprintConfiguration, {
    ElementViewProvider,
    SettingsConfiguration
} from "./BlooprintConfiguration";
import {UiSettings} from "./UiSettings";

export type BlooprintParams = {
    initial: UiElement | UiElement[],
    config: BlooprintConfiguration,
    defaultElement: (...args: any) => UiElement,
}

export default class Blooprint {
    private readonly elements: UiElement[] = [];
    private blooprint: UiElement = new UiElement('');

    private config: BlooprintConfiguration;
    private readonly defaultElement: (...args: any) => UiElement;
    private buildCallback?: (blooprint: UiElement) => any;

    constructor(params: BlooprintParams) {
        this.config = params.config;
        this.defaultElement = params.defaultElement

        if (Array.isArray(params.initial)) {
            this.elements = params.initial.map(_ => _);
        } else {
            this.elements = Blooprint.parse(params.initial, '');
        }
    }

    private static parse(element: UiElement, parentId: string): UiElement[] {
        if (!element) return [];

        element.parentId = parentId;
        if (!element.children || element.children.length === 0) {
            return [element];
        }

        let elementTree: UiElement[] = [element];
        for (let i = 0; i < element.children.length; i++) {
            let subTree = Blooprint.parse(element.children[i], element.id);
            elementTree = elementTree.concat(subTree);
        }

        return elementTree;
    }

    private findById(id: string): UiElement {
        let matches = this.elements.filter(element => element.id === id);
        if (matches.length !== 1) throw new Error(`There is more than one item with self id. (id: ${id})`);

        return matches[0] || null;
    }

    private removeById(id: string) {
        let element = this.findById(id);

        this.elements.splice(this.elements.indexOf(element), 1);
    }

    private findChildren(id: string): UiElement[] {
        return this.elements.filter(element => element.parentId === id);
    }

    private buildElement(parent: UiElement) {
        parent = {
            ...parent,
            children: this.findChildren(parent.id)
        }
        if (parent.children.length === 0) return parent;

        for (let i = 0; i < parent.children.length; i++) {
            let element = parent.children[i];
            if (!element.children || element.children.length === 0) continue;

            parent.children[i] = this.buildElement(element);
        }

        return parent;
    }

    build() {
        //console.log(self._elements);
        // console.log(contentTree);
        this.blooprint = this.buildElement(this.elements[0]);

        if (this.buildCallback) this.buildCallback(this.blooprint);
        
        return this.blooprint;
    }
    
    onBuilt(callback: (arg: UiElement) => any) {
        this.buildCallback = callback;
    }

    addElement(parent: UiElement, type: string) {
        if (!parent) throw new Error(`Container element is missing.`);
        let elementConfig = this.config.getConfiguration(type);
        if (!elementConfig) throw new Error(`${type} is not a configured element.`);

        this.elements.push(elementConfig.defaultValue);
        this.build();
    }

    removeElement(element: UiElement) {
        this.removeById(element.id);
        if (!element.children || element.children.length === 0) return;

        let children = this.findChildren(element.id);
        for (let i = 0; i < children.length; i++) {
            this.removeElement(children[i]);
        }

        if (!this.elements.length) this.elements.push(this.defaultElement());
        this.build();
    }

    updateElement(newElement: UiElement) {
        let element = this.findById(newElement.id);

        this.elements[this.elements.indexOf(element)] = newElement;
        this.build();
    }

    highlight(element?: UiElement) {
        for (let i = 0; i < this.elements.length; i++) {
            if (!element) this.elements[i].isHighlighted = false;
            else this.elements[i].isHighlighted = this.elements[i].id === element.id;
        }
        this.build();
    }

    isHighlighting(): boolean {
        return this.elements.filter(element => element.isHighlighted).length > 0;
    }

    getSettings<T extends UiElement>(element: T): SettingsConfiguration<UiSettings>[] {
        return this.config.getSettings<T>(element);
    }
    
    getView<T extends UiElement>(element: T): ElementViewProvider<T> {
        return this.config.getElementView<T>(element);
    }
}