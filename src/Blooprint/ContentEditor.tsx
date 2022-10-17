import React, {Component, useState} from 'react';

import './ContentEditor.css';
import "simplebar/src/simplebar.css";

import ExampleBlooprint from './Demo/Data/ExampleBlooprint';
import ExampleConfiguration from "./Demo/Data/ExampleConfiguration";
import BlooprintBench from "./Base/BlooprintBench";
import Blooprint, {BlooprintMap} from "./Base/Blooprint";
import {DefaultElements} from "./Demo/Data/ExampleElements";

const exampleBlooprint = new Blooprint({
    initial: ExampleBlooprint,
    defaultElement: () => DefaultElements.Container,
    config: ExampleConfiguration
});

export default function ContentEditor(props: any) {
    const [bootstrapped, setBootstrapped] = useState(false);
    
    if (!bootstrapped) {
        setBootstrapped(true);
    }

    return <BlooprintBench blooprint={exampleBlooprint} />
} 
