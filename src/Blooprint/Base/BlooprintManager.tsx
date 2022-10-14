import React, {useState} from 'react';
import SimpleBar from "simplebar-react";
import BlooprintConfiguration from "./BlooprintConfiguration";
import UiElement from "./UiElement";
import ElementEditor from "./ElementEditor";
import ElementView from "./ElementView";

export type BlooprintManagerProps = {
    config: BlooprintConfiguration;
    defaultRoot: UiElement;
    blooprint?: UiElement;
    onUpdate?: (Blooprint: UiElement) => any
}

export default function BlooprintManager(props: BlooprintManagerProps) {
    const config = props.config;
    let elements = new Array<UiElement>(0);

    const [blooprint, setBlooprint] = useState(props.blooprint);
    if (blooprint) {
        elements = props.blooprint
            ? parse(props.blooprint, '')
            : [props.defaultRoot]
    }

    function parse(element: UiElement, parentId: string): UiElement[] {
        if (!element) return [];

        element.parentId = parentId;
        if (!element.children || element.children.length === 0) {
            return [element];
        }

        let elementTree: UiElement[] = [element];
        for (let i = 0; i < element.children.length; i++) {
            let subTree = parse(element.children[i], element.id);
            elementTree = elementTree.concat(subTree);
        }

        return elementTree;
    }

    function findById(id: string): UiElement {
        let matches = elements.filter(element => element.id === id);
        if (matches.length !== 1) throw new Error(`There is more than one item with self id. (id: ${id})`);

        return matches[0] || null;
    }

    function removeById(id: string) {
        let element = findById(id);

        elements.splice(elements.indexOf(element), 1);
    }

    function findChildren(id: string): UiElement[] {
        return elements.filter(element => element.parentId === id);
    }

    function buildElement(parent: UiElement) {
        parent.children = findChildren(parent.id);
        if (parent.children.length === 0) return parent;

        for (let i = 0; i < parent.children.length; i++) {
            let element = parent.children[i];
            if (!element.children || element.children.length === 0) continue;

            parent.children[i] = buildElement(element);
        }

        return parent;
    }

    function buildAndNotify() {
        //console.log(self._elements);
        // console.log(contentTree);
        let root = {...elements[0]};
        let Blooprint = buildElement(root);

        setBlooprint(Blooprint);
        if (!props.onUpdate) return;

        props.onUpdate(Blooprint);
    }

    const blooprintApi = {
        addElement: function (parent: UiElement, type: string) {
            if (!parent) throw new Error(`Container element is missing.`);
            let elementConfig = config.getConfiguration(type);
            if (!elementConfig) throw new Error(`${type} is not a configured element.`);

            elements.push(elementConfig.defaultValue);
            buildAndNotify();
        },
        removeElement: function (element: UiElement) {
            removeById(element.id);
            if (!element.children || element.children.length === 0) return;

            let children = findChildren(element.id);
            for (let i = 0; i < children.length; i++) {
                blooprintApi.removeElement(children[i]);
            }

            if (!elements.length) elements.push({...props.defaultRoot});
            buildAndNotify();
        },
        updateElement: function (newElement: UiElement) {
            let element = findById(newElement.id);

            elements[elements.indexOf(element)] = newElement;
            buildAndNotify();
        },
        highlight: function(element?: UiElement) {
            for (let i = 0; i < elements.length; i++) {
                if (!element) elements[i].isHighlighted = false;
                else elements[i].isHighlighted = elements[i].id === element.id;
            }
            buildAndNotify();
        },
        isHighlighting: function(): boolean {
            return elements.filter(element => element.isHighlighted).length > 0;
        }
    }

    if (!blooprint) {
        return <h1>Blooprint is loading</h1>
    }
    
    return (
        <div className='content-editor'>
            <h1>Content editor proof of concept</h1>
            <div className='workspace'>
                <SimpleBar style={{maxHeight: '80vh'}} className='workspace-editor'>
                    <ElementEditor element={blooprint} blooprint={blooprintApi} config={config}/>
                </SimpleBar>
                <SimpleBar className='workspace-viewer'>
                    <div className='workspace-viewer--canvas'>
                        <ElementView element={blooprint} blooprint={blooprintApi} config={config}/>
                    </div>
                </SimpleBar>
            </div>
        </div>
    )
}
