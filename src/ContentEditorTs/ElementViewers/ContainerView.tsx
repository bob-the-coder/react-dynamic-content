import React from 'react';
import {ElementViewProps} from "../BlueprintConfiguration";
import Container from "../Demo/Elements/Container";

export default function ContainerView(props: ElementViewProps<Container>) {
  return (
    <div>
        {props.element.children.map(element => props.config.getElementView(element)({...props, element}))}
    </div>
  )
}
