import React, {useState} from 'react';
import UiElement from "./Base/UiElement";
import BlueprintConfiguration from "./BlueprintConfiguration";
import ElementEditor from './LiveEditor/ElementEditor';
import ElementView from "./LiveEditor/ElementView";
import SimpleBar from "simplebar-react";

export type BlueprintManagerProps = {
    config: BlueprintConfiguration;
    defaultRoot: UiElement;
    blueprint?: UiElement;
    onUpdate?: (blueprint: UiElement) => any
}

export default function BlueprintManager(props: BlueprintManagerProps) {
    const config = props.config;
    let elements = new Array<UiElement>(0);

    const [blueprint, setBlueprint] = useState(props.blueprint);
    if (blueprint) {
        elements = props.blueprint
            ? parse(props.blueprint, '')
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
        let blueprint = buildElement(root);

        setBlueprint(blueprint);
        if (!props.onUpdate) return;

        props.onUpdate(blueprint);
    }

    const blueprintApi = {
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
                blueprintApi.removeElement(children[i]);
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

    function renderEditor() {
        if (!blueprint) throw new Error("Element tree is null.");

        return (
            <ElementEditor element={blueprint} blueprint={blueprintApi} config={config}/>
        )
    }

    function renderView() {
        if (!blueprint) throw new Error("Element tree is null.");

        return (
            <ElementView element={blueprint} blueprint={blueprintApi} config={config}/>
        )
    }

    return (
        <div className='content-editor'>
            <h1>Content editor proof of concept</h1>
            <div className='workspace'>
                <SimpleBar style={{maxHeight: '80vh'}} className='workspace-editor'>
                    {renderEditor()}
                </SimpleBar>
                <SimpleBar className='workspace-viewer'>
                    {renderView()}
                </SimpleBar>
            </div>
        </div>
    )
}
