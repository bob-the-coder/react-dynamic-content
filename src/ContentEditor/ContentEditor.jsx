import React, { Component } from 'react';
import ContentManager from './ContentManager';
import ContainerEditor from './ElementEditors/ContainerEditor';
import ContainerViewer from './ElementViewers/ContainerViewer';

import './ContentEditor.css';
import demo from './DemoTree';
import SimpleBar from 'simplebar-react';
import "simplebar/src/simplebar.css";

export default class ContentEditor extends Component {
  constructor(){
    super();

    this.manager = new ContentManager({ model: demo.model });
    window.manager = this.manager;
    this.state = {
      model: null
    }
  }

  componentDidMount() {
    this.onUpdate();
  }

  onUpdate() {
    this.setState({
      model: this.manager.build()
    })
  }

  render() {
    let model = this.state.model;
    if (!model) return;

    return (
      <div className='content-editor'>
        <h1>Content editor proof of concept</h1>
        <div className='workspace'>
          <SimpleBar style={{maxHeight: '80vh'}} className='workspace-editor'>
            <ContainerEditor model={model} manager={this.manager} onUpdate={this.onUpdate.bind(this)} />
          </SimpleBar>
          <SimpleBar className='workspace-viewer'>
            <ContainerViewer model={model} manager={this.manager} />
          </SimpleBar>
        </div>
      </div>
    )
  }
}
