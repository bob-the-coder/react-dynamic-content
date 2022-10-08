import React from 'react';
import ElementView from '../LiveEditor/ElementView';

export default function ImageViewer({ model, manager }) {
  return (
    <ElementView model={model} manager={manager}>
      <img alt={model.alt} src={model.url} />
    </ElementView>
  )
}
