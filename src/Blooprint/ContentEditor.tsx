import React, {Component, useState} from 'react';

import './ContentEditor.css';
import "simplebar/src/simplebar.css";

import ExampleBlooprint from './Demo/Data/ExampleBlooprint';
import ExampleConfiguration from "./Demo/Data/ExampleConfiguration";
import BlooprintBench from "./Base/BlooprintBench";
import {Provider} from "react-redux";
import {createBlooprintStore} from "./Base/Redux/BlooprintStore";

const blooprint = createBlooprintStore(ExampleConfiguration, ExampleBlooprint);

export default function ContentEditor(props: any) {
    const [bootstrapped, setBootstrapped] = useState(false);
    
    if (!bootstrapped) {
        setBootstrapped(true);
    }

    return (
        <Provider store={blooprint.reduxStore}>
            <BlooprintBench blooprint={blooprint} />
        </Provider>
    );
} 
