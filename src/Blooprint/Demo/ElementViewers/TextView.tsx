import React from 'react'
import {ElementViewProps} from "../../Base/BlooprintConfiguration";
import Text from "../Elements/Text";
import {FontSettings, PaddingSettings} from "../Elements/Mixins";


export default function TextView(props: ElementViewProps<Text>) {
  let padding = {...new PaddingSettings().padding, ...props.element.padding};

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
