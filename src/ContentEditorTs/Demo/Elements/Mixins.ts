export class FontSettings {
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

export class PaddingSettings {
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

export class ImageSettings {
    url: string = '';
    alt: string = '';
}

export class ListSettings {
    items: string[] = [];
}

export class TextSettings {
    text: string = '';
}