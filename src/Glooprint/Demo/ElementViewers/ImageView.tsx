import React from 'react';
import {ElementViewProps} from "../../Base/GlooprintConfiguration";
import Image from "../Elements/Image";

export default function ImageView(props: ElementViewProps<Image>) {
  return (
    <img alt={props.element.alt} src={props.element.url} />
  )
}
