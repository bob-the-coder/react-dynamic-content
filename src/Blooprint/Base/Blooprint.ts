import {guid} from "rsuite/utils";
import BlooprintConfiguration from "./BlooprintConfiguration";

export type BlooprintElement = {
    id: string;
    parentId?: string;
    type?: string;
    isHighlighted: boolean;
    settings: {[key: string]: BlooprintSettings};
    children?: BlooprintElement[];
}

export type BlooprintSettings = {
    type?: string;
}

export type BlooprintParams = {
    initial: BlooprintElement | BlooprintElement[],
    config: BlooprintConfiguration,
    defaultElement: (...args: any) => BlooprintElement,
}

export type BlooprintMap = {[key: string]: BlooprintElement};

export default class Blooprint {
    public elements: BlooprintMap = {};
    private readonly defaultElement: (...args: any) => BlooprintElement;
    private buildCallback?: (blooprintMap: BlooprintMap) => any;
    
    public config: BlooprintConfiguration;
    public root: BlooprintElement;
    
    constructor(params: BlooprintParams) {
        this.config = params.config;
        this.defaultElement = params.defaultElement

        let root: BlooprintElement;
        if (Array.isArray(params.initial)) {
            root = this.parseList(params.initial);
        } else {
            root = params.initial;
        }
        if (!root.id) root.id = guid();
        
        this.elements = {};
        this.deconstructElement(root);
        this.root = this.elements[root.id];
    }

    private parseElement(current: BlooprintElement, elements: BlooprintElement[]) {
        current.children = elements.filter(element => element.parentId === current.id);
        if (!current.children || current.children.length === 0) return current;

        for (let i = 0; i < current.children.length; i++) {
            let element = current.children[i];
            if (!element.children || element.children.length === 0) continue;

            current.children[i] = this.parseElement(element, elements);
        }

        return current;
    }
    
    private parseList(elements: BlooprintElement[]) {
        const possibleRoots = elements.filter(element => !element.parentId);
        if (possibleRoots.length === 0) throw new Error('Sequence contains no root element.');
        if (possibleRoots.length > 1) throw new Error('Sequence should contain a single root element.');
        
        const root = possibleRoots[0]
        
        return this.parseElement(root, elements);
    }
    
    private deconstructElement(element: BlooprintElement, parentId?: string) {
        if (!element.type) throw new Error('Undefined element type.');
        if (!element.id) element.id = guid();
        
        const childElements = element.children;
        
        element.parentId = parentId;
        element.children = [];
        this.elements[element.id] = element;
        
        if (!childElements || childElements.length === 0) return;
        
        for (let i = 0; i < childElements.length; i++){
            this.deconstructElement(childElements[i], element.id);
        }
    }
    
    build() {
        if (this.buildCallback) this.buildCallback(this.elements);
    }
    
    updateElement<T extends BlooprintElement>(element: T) {
        if (!element.id && !this.elements[element.id]) return;

        this.elements[element.id] = element;
        
        this.build();
    }
    
    updateSettings(id: string, settings: BlooprintSettings) {
        if (!settings.type) throw new Error("Invalid settings.");
        
        if (!this.elements[id]) return;
        
        this.elements[id].settings[settings.type] = settings;
        this.build();
    }

    highlight(id?: string) {
        if (id) console.log(`Element ${id} is being highlighted.`)
        else console.log('Element is no longer being highlighted.');
    }

    isHighlighting(): boolean {
        return false;
    }
    
    public childrenOf(id: string) {
        const element = this.elements[id];
        
        const childElements = [];
        for (let k in this.elements) {
            if (this.elements[k].parentId !== id) continue;
            
            childElements.push(this.elements[k]);
        }
        return childElements;
    }
}