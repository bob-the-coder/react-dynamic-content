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
    isHighlighted: false,
    settings: {}
};

export const DefaultElements: {
    Container: Container,
    Text: Text,
    Image: Image,
    List: List
} = {
    Container: {
        ...DefaultBlooprintElement,
        settings: {
            Container: {...DefaultSettings.Container},
            Padding: {...DefaultSettings.Padding}
        }
    },
    Text: {
        ...DefaultBlooprintElement,
        settings: {
            Text: {...DefaultSettings.Text},
            Font: {...DefaultSettings.Font},
            Padding: {...DefaultSettings.Padding}
        }
    },
    Image: {
        ...DefaultBlooprintElement,
        settings: {
            Image: {...DefaultSettings.Image},
            Margins: {...DefaultSettings.Margins}
        }
    },
    List: {
        ...DefaultBlooprintElement,
        settings: {
            List: {...DefaultSettings.List},
            Font: {...DefaultSettings.Font},
            Padding: {...DefaultSettings.Padding}
        }
    }
}