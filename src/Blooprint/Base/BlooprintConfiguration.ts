import {FunctionComponent, ReactElement, ReactNode} from "react";
import {BlooprintElement, BlooprintSettings, BlooprintSettingsPartial} from "./Blooprint";
import {BlooprintStore} from "./Redux/BlooprintStore";

export type SettingsEditorProps<T extends BlooprintSettings> = {
    element: BlooprintElement;
    settings: T;
    blooprint: BlooprintStore;
    updateSettings: (settings: BlooprintSettingsPartial) => any;
}
export type SettingsEditorProvider<T extends  BlooprintSettings> = FunctionComponent<SettingsEditorProps<T>>;

export type BlooprintViewProps<T extends BlooprintElement> = {
    element: T;
    blooprint: BlooprintStore;
    children?: ReactElement | ReactElement[]; 
}
export type BlooprintView<T extends BlooprintElement> = FunctionComponent<BlooprintViewProps<T>>;

export type SettingsConfiguration<T extends BlooprintSettings> = {
    type: string;
    defaultValue: T;
    editor: SettingsEditorProvider<T>
}

export type BlooprintElementConfiguration<T extends BlooprintElement> = {
    type: string;
    view: BlooprintView<T>
}

class BlooprintConfiguration {
    settingsConfig: { [key: string]: SettingsConfiguration<any> } = {};
    elementConfig: { [key: string]: BlooprintElementConfiguration<any> } = {};

    configureSettings<T extends BlooprintSettings>(settings: SettingsConfiguration<T>) {
        let existing = this.settingsConfig[settings.type];
        if (existing) throw new Error(`${settings.type} is already configured.`);
        
        settings.defaultValue.type = settings.type;

        this.settingsConfig[settings.type] = settings;
    }

    configureElement<T extends BlooprintElement>(config: BlooprintElementConfiguration<T>) {
        const existing = this.elementConfig[config.type];
        if (existing) throw new Error(`${config.type} is already configured.`);
        
        this.elementConfig[config.type] = config;
    }
}

export default BlooprintConfiguration;