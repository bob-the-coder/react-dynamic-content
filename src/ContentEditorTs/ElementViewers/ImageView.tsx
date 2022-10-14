import React from 'react';
import {ElementViewProps} from "../BlueprintConfiguration";
import Image from "../Demo/Elements/Image";

export default function ImageView(props: ElementViewProps<Image>) {
  return (
    <img alt={props.element.alt} src={props.element.url} />
  )
}
