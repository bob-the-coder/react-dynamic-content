import React, { Component } from 'react';

import './ContentEditor.css';
import "simplebar/src/simplebar.css";

import ExampleTree from './Demo/Data/ExampleTree';
import ExampleConfiguration from "./Demo/Data/ExampleConfiguration";
import BlueprintManager, {BlueprintManagerProps} from "./BlueprintManager";
import Container from "./Demo/Elements/Container";

const defaultRoot = new Container();

export default class ContentEditor extends Component {
  render() {
    const props: BlueprintManagerProps = {
      config: ExampleConfiguration,
      blueprint: ExampleTree,
      defaultRoot
    }
    
    return <BlueprintManager {...props} />
  }
}
