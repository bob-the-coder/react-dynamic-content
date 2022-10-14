import React from 'react';

import './App.css';
import 'rsuite/dist/rsuite.min.css'
import { CustomProvider } from 'rsuite';

import ContentEditor from './Glooprint/ContentEditor';

function Error(ex) {
    return <div>{ex}</div>
}

function App() {
    try {
        return (
            <div className="App">
                <CustomProvider theme="dark">
                    <ContentEditor />
                </CustomProvider>
            </div>
        );
    } catch (ex){
        return Error(ex);
    }
}

export default App;
