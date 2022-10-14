import React from 'react'
import Text from '../Demo/Elements/Text';
import {ElementViewProps} from "../BlueprintConfiguration";
import {FontSettings, PaddingSettings} from "../Demo/Elements/Mixins";


export default function TextView(props: ElementViewProps<Text>) {
  let padding = props.element.padding || new PaddingSettings().padding;

  let style = { 
    ...props.element.font || new FontSettings().font, 
    paddingTop: padding.top,
    paddingBottom: padding.bottom,
    paddingLeft: padding.left,
    paddingRight: padding.right,
  };

  return (
    <div style={style}>{props.element.text}</div>
  )
}
