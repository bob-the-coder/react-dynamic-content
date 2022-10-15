import React, {useState} from 'react';
import SimpleBar from "simplebar-react";
import UiElement from "./UiElement";
import ElementEditor from "./ElementEditor";
import ElementView from "./ElementView";
import Canvas, {CanvasAppearance, CanvasSize} from "./Canvas";
import {Form, Radio, RadioGroup} from "rsuite";
import Blooprint from "./Blooprint";

export type BlooprintBenchParams = {
    blooprint: Blooprint,
    blooprintElement?: UiElement
}

export default function BlooprintBench(props: BlooprintBenchParams) {
    if (!props.blooprintElement) {
        return <h1>Blooprint is loading</h1>
    }

    const [appearance, setAppearance] = useState(CanvasAppearance.screen);
    const [size, setSize] = useState(CanvasSize.web);

    try {
        return (
            <div>
                <div className={'workspace-title'}>Content editor proof of concept</div>
                <div className='workspace'>
                    <SimpleBar style={{maxHeight: '100%'}} className='workspace-editor'>
                        <ElementEditor element={props.blooprintElement} blooprint={props.blooprint} />
                    </SimpleBar>
                    <div className='workspace-viewer'>
                        <Form.Group className={'workspace-viewer--settings'}>
                            <Form.Group {...{inline: 'true'}}>
                                <Form.ControlLabel>Appearance</Form.ControlLabel>
                                <RadioGroup value={appearance}
                                            onChange={appearance => setAppearance(appearance.toString())}
                                            inline={true}>
                                    <Radio value={CanvasAppearance.screen}>Screen-Only</Radio>
                                    <Radio value={CanvasAppearance.device}>Device</Radio>
                                </RadioGroup>
                            </Form.Group>
                            <Form.Group {...{inline: 'true'}}>
                                <Form.ControlLabel>Size</Form.ControlLabel>
                                <RadioGroup value={size} onChange={size => setSize(size.toString())} inline={true}>
                                    <Radio value={CanvasSize.web}>Web</Radio>
                                    <Radio value={CanvasSize.tablet}>Tablet</Radio>
                                    <Radio value={CanvasSize.mobile}>Mobile</Radio>
                                </RadioGroup>
                            </Form.Group>
                        </Form.Group>
                        <Canvas appearance={appearance} size={size}>
                            <ElementView element={props.blooprintElement} blooprint={props.blooprint} />
                        </Canvas>
                    </div>
                </div>
            </div>
        )
    } catch (ex) {
        debugger;
        return <div></div>
    }
}
