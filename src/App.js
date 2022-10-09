import React from 'react';

import './App.css';
import ContentEditor from './ContentEditor/ContentEditor';

import demo from './ContentEditor/Demo';

function App() {


  return (
    <div className="App">
      <ContentEditor model={demo.model} manager={demo.manager} />
    </div> 
  );
}

export default App;
