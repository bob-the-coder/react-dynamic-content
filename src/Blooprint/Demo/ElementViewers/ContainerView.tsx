import React from 'react';
import {BlooprintViewProps} from "../../Base/BlooprintConfiguration";
import {Container} from "../Data/ExampleElements";
import {DefaultSettings} from "../Data/ExampleSettings";

export default function ContainerView(props: BlooprintViewProps<Container>) {
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
