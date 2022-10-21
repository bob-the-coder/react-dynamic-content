import React, {useState} from 'react';

import './App.css';
import 'rsuite/dist/rsuite.min.css'
import {CustomProvider, Input} from 'rsuite';

import ContentEditor from './Blueprint/ContentEditor';
import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Provider, useDispatch, useSelector} from "react-redux";

function Error(ex: any) {
    return <div>{ex.toString()}</div>
}

export default function App() {
    try {
        return (
            <div className="App">
                    <CustomProvider theme="dark">
                        <ContentEditor />
                    </CustomProvider>
            </div>
        );
    } catch (ex: any) {
        return Error(ex);
    }
}
