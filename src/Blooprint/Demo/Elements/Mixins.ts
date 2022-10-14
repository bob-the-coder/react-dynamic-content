import {UiSettings} from "../../Base/UiSettings";

export class FontSettings extends UiSettings {
    font: {
        fontSize: number;
        fontWeight: string;
        color: string;
    } = {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'white'
    }
}

export class PaddingSettings extends UiSettings {
    padding: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    } = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
}

export class ImageSettings extends UiSettings {
    url: string = '';
    alt: string = '';
}

export class ListSettings extends UiSettings {
    items: string[] = [];
    ordered: boolean = false;
}

export class TextSettings extends UiSettings {
    text: string = '';
}

export class ContainerSettings extends UiSettings {
    alignContent: string = 'left';
}
