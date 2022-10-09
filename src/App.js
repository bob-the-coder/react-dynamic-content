import React from 'react';

import './App.css';
import 'rsuite/dist/rsuite.min.css'
import { CustomProvider, Panel } from 'rsuite';

import ContentEditor from './ContentEditor/ContentEditor';

import demo from './ContentEditor/Demo';

function App() {


  return (
    <Panel className="App">
      <CustomProvider theme="dark">
        <ContentEditor model={demo.model} manager={demo.manager} />
      </CustomProvider>
    </Panel> 
  );
}

export default App;
