import React from 'react';
import {ElementViewProps} from "../../Base/BlooprintConfiguration";
import Container from "../Elements/Container";

export default function ContainerView(props: ElementViewProps<Container>) {
  return (
    <div>
        {props.element.children.map(element => props.config.getElementView(element)({...props, element}))}
    </div>
  )
}
