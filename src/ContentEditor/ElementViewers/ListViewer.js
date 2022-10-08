import React from 'react';
import ElementView from '../LiveEditor/ElementView';
import demo from '../DemoTree.js';

export default function ListViewer({ model, manager }) {
  let fontOptions = {...demo.fontOptions, ...model.fontOptions};

  return (
    <ElementView model={model} manager={manager}>
      {model.items.map((text, index) => <div key={index} style={fontOptions}>{text}</div>)}
    </ElementView>
  )
}
