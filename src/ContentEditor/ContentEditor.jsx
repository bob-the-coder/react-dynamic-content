import React, { Component } from 'react';

import './ContentEditor.css';
import SimpleBar from 'simplebar-react';
import "simplebar/src/simplebar.css";

export default class ContentEditor extends Component {
  constructor(props){
    super();

    this.manager = props.manager;
    window.manager = this.manager;
    this.state = {
      root: null
    }
  }

  componentDidMount() {
    this.onUpdate();
  }

  onUpdate() {
    this.setState({
      root: this.manager.build()
    });
    if (typeof this.props.onChange !== 'function') return;

    this.props.onChange(this.state.root);
  }

  render() {
    let root = this.state.root;
    if (!root) return;

    const editor = this.manager.getEditors(root, this.onUpdate.bind(this));
    const viewer = this.manager.getViewer(root, this.onUpdate.bind(this));

    return (
      <div className='content-editor'>
        <h1>Content editor proof of concept</h1>
        <div className='workspace'>
          <SimpleBar style={{maxHeight: '80vh'}} className='workspace-editor'>
            {editor}
          </SimpleBar>
          <SimpleBar className='workspace-viewer'>
            {viewer}
          </SimpleBar>
        </div>
      </div>
    )
  }
}
