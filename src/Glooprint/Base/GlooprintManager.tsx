import React, {useState} from 'react';
import SimpleBar from "simplebar-react";
import GlooprintConfiguration, {GlooprintApi} from "./GlooprintConfiguration";
import UiElement from "./UiElement";
import ElementEditor from "./ElementEditor";
import ElementView from "./ElementView";
import Canvas, {CanvasAppearance, CanvasSize} from "./Canvas";
import {Form, Radio, RadioGroup} from "rsuite";

export type GlooprintManagerProps = {
    config: GlooprintConfiguration;
    defaultRoot: UiElement;
    glooprint?: UiElement;
    onUpdate?: (Glooprint: UiElement) => any
}

export default function GlooprintManager(props: GlooprintManagerProps) {
    const config = props.config;
    let elements = new Array<UiElement>(0);

    const [glooprint, setGlooprint] = useState(props.glooprint);
    if (glooprint) {
        elements = props.glooprint
            ? parse(props.glooprint, '')
            : [{...props.defaultRoot}]
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
        parent = {
            ...parent,
            children: findChildren(parent.id)
        }
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
        let glooprint = buildElement(elements[0]);

        setGlooprint(glooprint);
        if (!props.onUpdate) return;

        props.onUpdate(glooprint);
    }

    const glooprintApi: GlooprintApi = {
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
                glooprintApi.removeElement(children[i]);
            }

            if (!elements.length) elements.push({...props.defaultRoot});
            buildAndNotify();
        },
        updateElement: function (newElement: UiElement) {
            let element = findById(newElement.id);

            elements[elements.indexOf(element)] = newElement;
            buildAndNotify();
        },
        highlight: function (element?: UiElement) {
            for (let i = 0; i < elements.length; i++) {
                if (!element) elements[i].isHighlighted = false;
                else elements[i].isHighlighted = elements[i].id === element.id;
            }
            buildAndNotify();
        },
        isHighlighting: function (): boolean {
            return elements.filter(element => element.isHighlighted).length > 0;
        }
    }

    if (!glooprint) {
        return <h1>Glooprint is loading</h1>
    }

    const [appearance, setAppearance] = useState(CanvasAppearance.screen);
    const [size, setSize] = useState(CanvasSize.web);

    try {
        return (
            <div>
                <div className={'workspace-title'}>Content editor proof of concept</div>
                <div className='workspace'>
                    <SimpleBar style={{maxHeight: '100%'}} className='workspace-editor'>
                        <ElementEditor element={glooprint} glooprint={glooprintApi} config={config}/>
                    </SimpleBar>
                    <div className='workspace-viewer'>
                        <Form.Group className={'workspace-viewer--settings'}>
                            <Form.Group {...{inline: 'true'}}>
                                <Form.ControlLabel>Appearance</Form.ControlLabel>
                                <RadioGroup value={appearance}
                                            onChange={appearance => setAppearance(appearance.toString())}
                                            inline={true}>
                                    <Radio value={CanvasAppearance.screen}>Screen-Only</Radio>
                                    <Radio value={CanvasAppearance.device}>Device</Radio>
                                </RadioGroup>
                            </Form.Group>
                            <Form.Group {...{inline: 'true'}}>
                                <Form.ControlLabel>Size</Form.ControlLabel>
                                <RadioGroup value={size} onChange={size => setSize(size.toString())} inline={true}>
                                    <Radio value={CanvasSize.web}>Web</Radio>
                                    <Radio value={CanvasSize.tablet}>Tablet</Radio>
                                    <Radio value={CanvasSize.mobile}>Mobile</Radio>
                                </RadioGroup>
                            </Form.Group>
                        </Form.Group>
                        <Canvas appearance={appearance} size={size}>
                            <ElementView element={glooprint} glooprint={glooprintApi} config={config}/>
                        </Canvas>
                    </div>
                </div>
            </div>
        )
    } catch (ex) {
        debugger;
        return <div></div>
    }
}
