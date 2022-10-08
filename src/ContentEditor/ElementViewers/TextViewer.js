import React from 'react'
import ElementView from '../LiveEditor/ElementView';
import demo from '../DemoTree';

export default function TextViewer({ model, manager }) {
  let fontOptions = {...demo.fontOptions, ...model.fontOptions};

  return (
    <ElementView model={model} manager={manager}>
      <div style={fontOptions}>{model.text}</div>
    </ElementView>
  )
}
