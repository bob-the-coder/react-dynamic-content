import React from 'react'
import Text from '../Demo/Elements/Text';
import PropTypes from '../LiveEditor/ElementPropTypes';


export default function TextViewer(props: PropTypes<Text>) {
  let padding = props.element.padding;

  let style = { 
    ...props.element.font, 
    paddingTop: padding.top,
    paddingBottom: padding.bottom,
    paddingLeft: padding.left,
    paddingRight: padding.right,
  };

  return (
    <div style={style}>{props.element.text}</div>
  )
}
