import React from 'react';
import { Container, ElementType, ImageElement, ListElement, TextElement } from '../ContentModel';
import ElementEditor from '../LiveEditor/ElementEditor';
import ImageEditor from './ImageEditor';
import TextEditor from './TextEditor';
import ListEditor from './ListEditor';

export default function ContainerEditor({ model, manager, onUpdate }) {
    function getNewElementByType(elementType) {
        switch (elementType) {
            case ElementType.Container: return new Container({});
            case ElementType.Text: return new TextElement({});
            case ElementType.Image: return new ImageElement({});
            case ElementType.List: return new ListElement({});
            default: return null;
        }
    }

    function addChild(elementType) {
        let element = getNewElementByType(elementType);
        if (element === null) throw new Error(`Invalid element type ${elementType}`);

        manager.addElement(model, element);
        onUpdate();
    }

    function renderChild(child) {
        switch (child.type) {
            case ElementType.Container: return <ContainerEditor key={child.id} model={child} manager={manager} onUpdate={onUpdate} />;
            case ElementType.Text: return <TextEditor key={child.id} model={child} manager={manager} onUpdate={onUpdate} />;
            case ElementType.Image: return <ImageEditor key={child.id} model={child} manager={manager} onUpdate={onUpdate} />;
            case ElementType.List: return <ListEditor key={child.id} model={child} manager={manager} onUpdate={onUpdate} />;
            default: return null;
        }
    }

    const actions = [
        { textLabel: 'Add Container', handler: _ => addChild(ElementType.Container)},
        { textLabel: 'Add Text', handler: _ => addChild(ElementType.Text)},
        { textLabel: 'Add Image', handler: _ => addChild(ElementType.Image)},
        { textLabel: 'Add List', handler: _ => addChild(ElementType.List)}
    ]

    return (
        <ElementEditor model={model} manager={manager} actions={actions} onUpdate={onUpdate}>
            <div className='container-editor--inner'>
                {model.children.map(renderChild)}
            </div>
        </ElementEditor>
    )
}
