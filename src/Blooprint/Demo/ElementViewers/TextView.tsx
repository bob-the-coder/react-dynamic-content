import React from 'react'
import {BlooprintViewProps} from "../../Base/BlooprintConfiguration";
import {Text} from '../Data/ExampleElements';
import {DefaultSettings} from "../Data/ExampleSettings";

export default function TextView(props: BlooprintViewProps<Text>) {
  const { element } = props;
  
  const padding = {...DefaultSettings.Padding, ...element.settings.Padding};
  const margin = {...DefaultSettings.Margins, ...element.settings.Margins};
  const font = {...DefaultSettings.Font, ...element.settings.Font};
  const text = element.settings.Text;

  let style = { 
    ...font, 
    paddingTop: padding.top,
    paddingBottom: padding.bottom,
    paddingLeft: padding.left,
    paddingRight: padding.right,
    marginTop: margin.top,
    marginBottom: margin.bottom,
    marginLeft: margin.left,
    marginRight: margin.right,
  };

  return (
    <div style={style}>{text.text}</div>
  )
}
