import { Container, ElementType } from './ContentModel';

export default class ContentManager {

    constructor(options) {
        this.elements = [new Container({})];
        if (options && options.model) {
            this.elements = this.parse(options.model, null);
        }
    }

    parse(element, parentId) {
        if (!element) return [];
        if (element.type !== ElementType.Container) return [ { ...element, parentId } ];

        let elementTree = [ {...element, parentId, children: []} ];
        for (let i = 0; i < element.children.length; i++) {
            elementTree = elementTree.concat(this.parse(element.children[i], element.id));
        }

        return elementTree;
    }

    findById(id) {
        var matches = this.elements.filter(element => element.id === id);
        if (matches.length !== 1) throw new Error("There is more than one item with this id.");
        return matches[0];
    }

    addElement(parent, element) {
        if (!parent) throw new Error(`Container element is missing.`);
        if (element.id === parent.id) throw new Error("Cannot place element within itself.");

        parent = this.findById(parent.id);
        if (!parent) throw new Error(`Element ${parent.id} not found.`);
        if (parent.type !== ElementType.Container) throw new Error(`Element ${parent.id} is not a container.`);

        element.parentId = parent.id;
        this.elements.push(element);
    }

    removeById(elementId) {
        let element = this.findById(element.id);
        if (!element) throw new Error(`Element ${element.id} not found.`);

        this.elements.splice(this.elements.indexOf(element), 1);
    }

    removeElement(element) {
        this.removeById(element.id);
        if (element.type !== ElementType.Container) return;

        let children = this.findChildren(element.id);
        for (let i = 0; i < children.length; i++) {
            this.removeByElement(children[i]);
        }

        if (!this.elements.length) this.elements.push(new Container({}));
    }

    updateElement(newElement) {
        let element = this.findById(newElement.id);
        if (!element) throw new Error(`Element ${newElement.id} not found.`);
        
        this.elements[this.elements.indexOf(element)] = newElement;
    }

    highlight(element) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].highlight = this.elements[i].id === element.id;
        }
    }

    isHighlighting() {
        return this.elements.filter(element => element.highlight).length > 0;
    }

    findChildren(id) {
        return this.elements.filter(element => element.parentId === id);
    }

    buildContainer(id) {
        let container = this.findById(id);
        if (!container) throw new Error(`Element ${id} not found.`);
        if (container.type !== ElementType.Container) throw new Error(`Element ${id} is not a container.`);

        container.children = this.findChildren(container.id);
        if (container.children.length === 0) return container;

        for (let i = 0; i < container.children.length; i++) {
            let element = container.children[i]
            if (element.type !== ElementType.Container) continue;
            container.children[i] = this.buildContainer(element.id);
        }

        return container;
    }

    build() {
        // console.log(this.elements);
        // console.log(contentTree);

        return this.buildContainer(this.elements[0].id);
    }
}
