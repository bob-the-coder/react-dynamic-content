import React from 'react';
import { Panel } from 'rsuite';
import {ContainerSettings, FontSettings} from "../Demo/Elements/Mixins";
import {SettingsEditorProps} from "../BlueprintConfiguration";
import UiElement from "../Base/UiElement";

const alignOptions = ['left', 'center', 'right']
export default function ContainerSettingsEditor<TProps extends SettingsEditorProps<UiElement & ContainerSettings>>(props: TProps) {
    return (
        <></>
    )
}
