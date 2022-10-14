import React from 'react';
import {ElementViewProps} from "../../Base/GlooprintConfiguration";
import Container from "../Elements/Container";
import {PaddingSettings} from "../Elements/Mixins";

export default function ContainerView(props: ElementViewProps<Container>) {
  const elementPadding = props.element.padding || new PaddingSettings();
  const padding = {
    paddingTop: elementPadding.top,
    paddingBottom: elementPadding.bottom,
    paddingLeft: elementPadding.left,
    paddingRight: elementPadding.right,
  }
  
  return (
    <div style={padding}>
    </div>
  )
}
