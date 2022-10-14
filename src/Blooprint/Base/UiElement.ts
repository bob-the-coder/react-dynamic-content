import {UiElementType} from "../Demo/Elements/UiElementType";

const uid = () => ('' + Math.abs(Math.random() + Math.random() + Math.random())).replace(/\D/g, '');

export default class UiElement {
    id: string = uid();
    parentId: string = '';
    type: string = UiElementType.None;
    isHighlighted: boolean = false;
    children: UiElement[] = [];

    constructor(type: UiElementType) {
        this.type = type;
    }
}

export function applyMixins(derivedCtor: any, constructors: any[]) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(
                derivedCtor.prototype,
                name,
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
            );
        });
    });
}