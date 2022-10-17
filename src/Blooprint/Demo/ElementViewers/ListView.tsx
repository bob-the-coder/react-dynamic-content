import React from 'react';
import {BlooprintViewProps} from "../../Base/BlooprintConfiguration";
import {List} from "../Data/ExampleElements";
import {DefaultSettings} from "../Data/ExampleSettings";

export default function ListView(props: BlooprintViewProps<List>) {
  const { element } = props;
  
  const fontOptions = {...DefaultSettings.Font, ...element.settings.Font};
  
  const list = element.settings.List;

  return list.ordered 
    ? (
      <ol>
        {list.items.map((text, index) => <li key={index} style={fontOptions}>{text}</li>)}
      </ol>
    )
    : (
      <ul>
        {list.items.map((text, index) => <li key={index} style={fontOptions}>{text}</li>)}
      </ul>
    )
}
