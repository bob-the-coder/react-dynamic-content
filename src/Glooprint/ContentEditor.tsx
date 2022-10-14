import React, {Component} from 'react';

import './ContentEditor.css';
import "simplebar/src/simplebar.css";

import ExampleTree from './Demo/Data/ExampleTree';
import ExampleConfiguration from "./Demo/Data/ExampleConfiguration";
import Container from "./Demo/Elements/Container";
import GlooprintManager, {GlooprintManagerProps} from "./Base/GlooprintManager";

const defaultRoot = new Container();

export default class ContentEditor extends Component {
    render() {
        const props: GlooprintManagerProps = {
            config: ExampleConfiguration,
            glooprint: ExampleTree,
            defaultRoot
        }

        return <GlooprintManager {...props} />
    }
}
