import React from 'react';
import {ElementViewProps} from "../../Base/BlooprintConfiguration";
import List from "../Elements/List";
import {FontSettings} from "../Elements/Mixins";

export default function ListView(props: ElementViewProps<List>) {
  let fontOptions = props.element.font || new FontSettings().font;

  return props.element.ordered 
    ? (
      <ol>
        {props.element.items.map((text, index) => <li key={index} style={fontOptions}>{text}</li>)}
      </ol>
    )
    : (
      <ul>
        {props.element.items.map((text, index) => <li key={index} style={fontOptions}>{text}</li>)}
      </ul>
    )
}
