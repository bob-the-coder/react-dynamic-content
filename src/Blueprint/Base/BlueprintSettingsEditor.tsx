import React from "react";
import {BlueprintApi, useBlueprintSelector} from "./Redux/BlueprintApi";
import {BlueprintSettings} from "./Blueprint";
import {useDispatch} from "react-redux";

type BlueprintSettingsEditorProps = {
    elementId: string,
    type: string,
    blueprint: BlueprintApi
}

export default function (props: BlueprintSettingsEditorProps) {
    const {blueprint, elementId, type} = props;
    const dispatch = useDispatch();

    const SettingsEditor = blueprint.config.settingsConfig[type].editor;
    const settings = useBlueprintSelector(state => state.settings[`${elementId}_${type}`]);

    return (
        <SettingsEditor
            settings={settings}
            blueprint={blueprint}
            updateSettings={settings => dispatch(blueprint.updateSettings({
                elementId,
                settings: {
                    ...settings,
                    type
                }
            }))}
        />
    );
}