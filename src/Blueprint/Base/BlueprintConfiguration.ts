import {FunctionComponent, ReactElement} from "react";
import {BlueprintElement, BlueprintSettings, BlueprintSettingsMap, BlueprintSettingsPartial} from "./Blueprint";
import {BlueprintApi} from "./Redux/BlueprintApi";
import {ElementViewProps} from "./BlueprintView";

export type SettingsEditorProps<T extends BlueprintSettings> = {
    settings: T;
    blueprint: BlueprintApi;
    updateSettings: (settings: BlueprintSettingsPartial) => any;
}
export type SettingsEditorProvider<T extends  BlueprintSettings> = FunctionComponent<SettingsEditorProps<T>>;


export type SettingsConfiguration<T extends BlueprintSettings> = {
    type: string;
    defaultValue: T;
    editor: SettingsEditorProvider<T>
}

export type BlueprintElementConfiguration<T extends BlueprintElement> = {
    type: string;
    view: FunctionComponent<ElementViewProps<T>>
}

class BlueprintConfiguration {
    settingsConfig: { [key: string]: SettingsConfiguration<any & BlueprintSettings> } = {};
    elementConfig: { [key: string]: BlueprintElementConfiguration<any & BlueprintElement> } = {};

    configureSettings<T extends BlueprintSettings>(settings: SettingsConfiguration<T>) {
        let existing = this.settingsConfig[settings.type];
        if (existing) throw new Error(`${settings.type} is already configured.`);
        
        settings.defaultValue.type = settings.type;

        this.settingsConfig[settings.type] = settings;
    }

    configureElement<T extends BlueprintElement>(config: BlueprintElementConfiguration<T>) {
        const existing = this.elementConfig[config.type];
        if (existing) throw new Error(`${config.type} is already configured.`);
        
        this.elementConfig[config.type] = config;
    }
}

export default BlueprintConfiguration;