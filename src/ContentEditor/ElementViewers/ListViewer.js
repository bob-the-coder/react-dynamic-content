import React from 'react';
import demo from '../Demo.js';

export default function ListViewer({ element }) {
  let fontOptions = {...demo.fontOptions, ...element.fontOptions};

  return element.ordered 
    ? (
      <ol>
        {element.items.map((text, index) => <li key={index} style={fontOptions}>{text}</li>)}
      </ol>
    )
    : (
      <ul>
        {element.items.map((text, index) => <li key={index} style={fontOptions}>{text}</li>)}
      </ul>
    )
}
