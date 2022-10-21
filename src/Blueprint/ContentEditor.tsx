import React, {Component, useState} from 'react';

import './ContentEditor.css';
import "simplebar/src/simplebar.css";

import ExampleBlueprint from './Demo/Data/ExampleBlueprint';
import ExampleConfiguration from "./Demo/Data/ExampleConfiguration";
import BlueprintBench from "./Base/BlueprintBench";
import {Provider} from "react-redux";
import {createBlueprintStore} from "./Base/Redux/BlueprintApi";

const [blueprint, store] = createBlueprintStore(ExampleConfiguration, ExampleBlueprint);

export default function ContentEditor(props: any) {
    return (
        <Provider store={store}>
            <BlueprintBench blueprint={blueprint} />
        </Provider>
    );
} 
