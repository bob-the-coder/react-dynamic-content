import React from "react";
import {BlooprintApi, useBlooprintSelector} from "./Redux/BlooprintApi";
import {BlooprintSettings} from "./Blooprint";
import {useDispatch} from "react-redux";

type BlooprintSettingsEditorProps = {
    elementId: string,
    type: string,
    blooprint: BlooprintApi
}

export default function (props: BlooprintSettingsEditorProps) {
    const {blooprint, elementId, type} = props;
    const dispatch = useDispatch();

    function updateSettings(settings: BlooprintSettings) {
        settings.type = type;
        dispatch(blooprint.updateSettings({
            elementId,
            settings
        }));
    }

    const SettingsEditor = blooprint.config.settingsConfig[type].editor;
    const settings = useBlooprintSelector(state => state.settings[`${elementId}_${type}`]);

    return <SettingsEditor settings={settings} blooprint={blooprint} updateSettings={updateSettings}/>
}