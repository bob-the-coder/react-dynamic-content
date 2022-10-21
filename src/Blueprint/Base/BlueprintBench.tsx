import React, {useState} from 'react';
import SimpleBar from "simplebar-react";
import BlueprintEditor from "./BlueprintEditor";
import BlueprintView from "./BlueprintView";
import Canvas, {CanvasAppearance, CanvasSize} from "./Canvas";
import {Form, Radio, RadioGroup} from "rsuite";
import {useBlueprintSelector, BlueprintApi} from "./Redux/BlueprintApi";

export type BlueprintBenchParams = {
    blueprint: BlueprintApi
}

export default function BlueprintBench(props: BlueprintBenchParams) {
    const [appearance, setAppearance] = useState(CanvasAppearance.screen);
    const [size, setSize] = useState(CanvasSize.web);
    const blueprint = props.blueprint;
    const root = useBlueprintSelector(state => state.root);

    try {
        return (
            <div>
                <div className={'workspace-title'}>Content editor proof of concept</div>
                <div className='workspace'>
                    <SimpleBar style={{maxHeight: '100%'}} className='workspace-editor'>
                        <BlueprintEditor elementId={root} blueprint={blueprint} />
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
                            <BlueprintView elementId={root} blueprint={blueprint} />
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
