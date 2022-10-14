import React from 'react';

import './App.css';
import 'rsuite/dist/rsuite.min.css'
import { CustomProvider, Panel } from 'rsuite';

import ContentEditor from './Blooprint/ContentEditor';


function App() {


  return (
    <Panel className="App">
      <CustomProvider theme="dark">
        <ContentEditor />
      </CustomProvider>
    </Panel> 
  );
}

export default App;
