import {BlooprintElement} from "../../Base/Blooprint";
import {
    ContainerSettings,
    FontSettings,
    PaddingSettings,
    TextSettings,
    ImageSettings,
    ListSettings,
    MarginsSettings, DefaultSettings
} from "./ExampleSettings";
import {guid} from "rsuite/utils";

export type Container = BlooprintElement & {
    settings: {
        Container: ContainerSettings,
        Padding: PaddingSettings,
    }
}

export type Text = BlooprintElement & {
    settings: {
        Text: TextSettings,
        Font: FontSettings,
        Padding: PaddingSettings
    }
}

export type Image = BlooprintElement & {
    settings: {
        Image: ImageSettings,
        Margins: MarginsSettings
    }
}

export type List = BlooprintElement & {
    settings: {
        List: ListSettings,
        Font: FontSettings,
        Padding: PaddingSettings
    }
}

const DefaultBlooprintElement: BlooprintElement = {
    id: '',
    settings: {}
};

export const DefaultElements: {
    Container: (children: BlooprintElement[]) => Container,
    Text: (text: string) => Text,
    Image: (url: string, alt: string) => Image,
    List: (items: string[]) => List
} = {
    Container: function(children: BlooprintElement[]) {
        const value = {
            type: 'Container',
            ...DefaultBlooprintElement,
            settings: {
                Container: {...DefaultSettings.Container},
                Padding: {...DefaultSettings.Padding}
            }
        }
        value.children = children;
        return value;
    },
    Text: (text: string) => {
        const value = {
            ...DefaultBlooprintElement,
            type: 'Text',
            settings: {
                Text: {...DefaultSettings.Text},
                Font: {...DefaultSettings.Font},
                Padding: {...DefaultSettings.Padding}
            }
        }
        value.settings.Text.text = text;
        return value;
    },
    Image: (url: string, alt: string) => {
        const value = {
            ...DefaultBlooprintElement,
            type: 'Image',
            settings: {
                Image: {...DefaultSettings.Image},
                Margins: {...DefaultSettings.Margins}
            }
        };
        value.settings.Image.url = url;
        value.settings.Image.alt = alt;
        
        return value;
    },
    List: (items: string[]) => {
        const value = {
            ...DefaultBlooprintElement,
            type: 'List',
            settings: {
                List: {...DefaultSettings.List},
                Font: {...DefaultSettings.Font},
                Padding: {...DefaultSettings.Padding}
            }
        };
        value.settings.List.items = items;
        return value;
    }
}