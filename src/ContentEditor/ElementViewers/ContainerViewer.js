import React from 'react';
import { ElementType } from '../ContentModel';
import ElementView from '../LiveEditor/ElementView';
import ImageViewer from './ImageViewer';
import TextViewer from './TextViewer';
import ListViewer from './ListViewer';

export default function ContainerViewer({ model, manager }) {
    function renderChild(child) {
        switch (child.type) {
            case ElementType.Container: return <ContainerViewer key={child.id} model={child} manager={manager} />;
            case ElementType.Text: return <TextViewer key={child.id} model={child} manager={manager} />;
            case ElementType.Image: return <ImageViewer key={child.id} model={child} manager={manager} />;
            case ElementType.List: return <ListViewer key={child.id} model={child} manager={manager} />;
            default: return null;
        }
    }

  return (
    <ElementView model={model} manager={manager}>
        {model.children.map(renderChild)}
    </ElementView>
  )
}
