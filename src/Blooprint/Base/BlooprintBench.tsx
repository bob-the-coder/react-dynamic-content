import React, {useState} from 'react';
import SimpleBar from "simplebar-react";
import BlooprintEditor from "./BlooprintEditor";
import BlooprintView from "./BlooprintView";
import Canvas, {CanvasAppearance, CanvasSize} from "./Canvas";
import {Form, Radio, RadioGroup} from "rsuite";
import {useSelector} from "react-redux";
import {Blooprint, BlooprintApi} from "./Redux/BlooprintApi";

export type BlooprintBenchParams = {
    blooprint: BlooprintApi
}

export default function BlooprintBench(props: BlooprintBenchParams) {
    const [appearance, setAppearance] = useState(CanvasAppearance.screen);
    const [size, setSize] = useState(CanvasSize.web);
    const blooprint = props.blooprint;
    const root = useSelector((blooprint: Blooprint) => blooprint.root);

    try {
        return (
            <div>
                <div className={'workspace-title'}>Content editor proof of concept</div>
                <div className='workspace'>
                    <SimpleBar style={{maxHeight: '100%'}} className='workspace-editor'>
                        <BlooprintEditor elementId={root.id} blooprint={blooprint} />
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
                            <BlooprintView element={root} blooprint={blooprint} />
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
