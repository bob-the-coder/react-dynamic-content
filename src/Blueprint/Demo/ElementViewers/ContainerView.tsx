import React from 'react';
import {Container} from "../Data/ExampleElements";
import {DefaultSettings} from "../Data/ExampleSettings";
import {ElementViewProps} from "../../Base/BlueprintView";

export default function ContainerView(props: ElementViewProps<Container>) {
  const { element } = props;
  
  const padding = {...DefaultSettings.Padding, ...element.settings.Padding};
  const style = {
    paddingTop: padding.top,
    paddingBottom: padding.bottom,
    paddingLeft: padding.left,
    paddingRight: padding.right,
  }
  
  return (
    <div style={style}>
      {props.children}
    </div>
  )
}
