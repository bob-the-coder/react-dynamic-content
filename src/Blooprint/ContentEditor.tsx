import React, {Component, useState} from 'react';

import './ContentEditor.css';
import "simplebar/src/simplebar.css";

import ExampleBlooprint from './Demo/Data/ExampleBlooprint';
import ExampleConfiguration from "./Demo/Data/ExampleConfiguration";
import BlooprintBench from "./Base/BlooprintBench";
import {Provider} from "react-redux";
import {createBlooprintStore} from "./Base/Redux/BlooprintApi";

const [blooprint, store] = createBlooprintStore(ExampleConfiguration, ExampleBlooprint);

export default function ContentEditor(props: any) {
    return (
        <Provider store={store}>
            <BlooprintBench blooprint={blooprint} />
        </Provider>
    );
} 
