import React, {Component} from 'react';

import './ContentEditor.css';
import "simplebar/src/simplebar.css";

import ExampleTree from './Demo/Data/ExampleTree';
import ExampleConfiguration from "./Demo/Data/ExampleConfiguration";
import Container from "./Demo/Elements/Container";
import BlooprintBench from "./Base/BlooprintBench";
import Blooprint from "./Base/Blooprint";
import UiElement from "./Base/UiElement";

const defaultElement = () => new Container();
const exampleBlooprint = new Blooprint({
    initial: ExampleTree,
    defaultElement,
    config: ExampleConfiguration
});
exampleBlooprint.build();

type stateProps = {
    blooprint?: UiElement
}

export default class ContentEditor extends Component {
    private blooprint: Blooprint = exampleBlooprint;
    state: stateProps = {
        blooprint: undefined
    }

    constructor(props: any) {
        super(props);
        
        const self = this;
        
        self.state.blooprint = self.blooprint.build();
    }
    
    componentDidMount() {
        let self = this;
        self.blooprint.onBuilt(blooprintElement => self.setState({
            blooprint: blooprintElement
        }));
    }
    
    render() {
        return <BlooprintBench blooprintElement={this.state.blooprint} blooprint={this.blooprint} />
    }
}
