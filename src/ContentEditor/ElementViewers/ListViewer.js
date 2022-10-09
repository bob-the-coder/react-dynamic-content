import React from 'react';
import demo from '../Demo.js';

export default function ListViewer({ element }) {
  let fontOptions = {...demo.fontOptions, ...element.fontOptions};

  return (
    <div>
      {element.items.map((text, index) => <div key={index} style={fontOptions}>{text}</div>)}
    </div>
  )
}
