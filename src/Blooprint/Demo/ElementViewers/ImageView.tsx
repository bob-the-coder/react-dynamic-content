import React from 'react';
import {Image} from "../Data/ExampleElements";
import {DefaultSettings} from "../Data/ExampleSettings";
import {ElementViewProps} from "../../Base/BlooprintView";

export default function ImageView(props: ElementViewProps<Image>) {
  const { element } = props;
  const image = element.settings.Image;
  
  const margins = {...DefaultSettings.Margins, ...element.settings.Margins};
  
  const style = {
    marginTop: margins.top,
    marginBottom: margins.bottom,
    marginLeft: margins.left,
    marginRight: margins.right,
  }
  
  return (
    <img style={style} alt={image.alt} src={image.url} />
  )
}
