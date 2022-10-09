import React from 'react'
import { Form, InputNumber, InputGroup, Divider, FlexboxGrid, Button } from 'rsuite'
import InputGroupAddon from 'rsuite/esm/InputGroup/InputGroupAddon'

const defaultPadding = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
}

const step = 5;

export default function PaddingOptionsEditor({ element, manager, onUpdate }) {
    let padding = {...defaultPadding, ...element.padding }

    function updatePadding(newPadding) {
        manager.updateElement({...element, padding: {...padding, ...newPadding}});
        onUpdate();
    }

    return (
        <FlexboxGrid justify='space-between'>
            <FlexboxGrid.Item colspan={11}>
                <Form.Group>
                    <Form.ControlLabel>Top</Form.ControlLabel>
                    <Form.Group>
                        <InputGroup inline={true}>
                            <InputNumber value={padding.top} step={step} onChange={value => updatePadding({ top: +value})} />
                            <InputGroupAddon>px</InputGroupAddon>
                        </InputGroup>
                    </Form.Group>
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Bottom</Form.ControlLabel>
                    <InputGroup>
                        <InputNumber value={padding.bottom} step={step} onChange={value => updatePadding({ bottom: +value})} />
                        <InputGroupAddon>px</InputGroupAddon>
                    </InputGroup>
                </Form.Group>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={11}>
                <Form.Group>
                    <Form.ControlLabel>Left</Form.ControlLabel>
                    <InputGroup>
                        <InputNumber value={padding.left} step={step} onChange={value => updatePadding({ left: +value})} />
                        <InputGroupAddon>px</InputGroupAddon>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Right</Form.ControlLabel>
                    <InputGroup>
                        <InputNumber value={padding.right} step={step} onChange={value => updatePadding({ right: +value})} />
                        <InputGroupAddon>px</InputGroupAddon>
                    </InputGroup>
                </Form.Group>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    )
}
