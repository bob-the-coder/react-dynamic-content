import React from 'react'
import {Text} from '../Data/ExampleElements';
import {DefaultSettings} from "../Data/ExampleSettings";
import {ElementViewProps} from "../../Base/BlueprintView";

export default function TextView(props: ElementViewProps<Text>) {
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
