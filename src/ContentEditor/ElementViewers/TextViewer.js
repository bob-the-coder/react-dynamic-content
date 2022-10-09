import React from 'react'
import demo from '../Demo';

const defaultPadding = { top: 0, bottom: 0, left: 0, right: 0 };

export default function TextViewer({ element }) {
  let fontOptions = {...demo.fontOptions, ...element.fontOptions};
  let padding = {...defaultPadding, ...element.padding};

  let style = { 
    ...fontOptions, 
    paddingTop: padding.top,
    paddingBottom: padding.bottom,
    paddingLeft: padding.left,
    paddingRight: padding.right,
  };

  return (
    <div style={style}>{element.text}</div>
  )
}
