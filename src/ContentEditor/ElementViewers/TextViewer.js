import React from 'react'
import demo from '../Demo';

export default function TextViewer({ element }) {
  let fontOptions = {...demo.fontOptions, ...element.fontOptions};

  return (
    <div style={fontOptions}>{element.text}</div>
  )
}
