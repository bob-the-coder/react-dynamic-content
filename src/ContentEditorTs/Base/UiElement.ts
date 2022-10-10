const uid = () => ('' + Math.abs(Math.random() + Math.random() + Math.random())).replace(/[^\d]/g, '');

export default class UiElement {
    id: string = uid();
    parentId: string;
    type: number;
    typeName: string;
    isHighlighted: boolean;

    constructor(type: number, typeName: string) {
        this.type = type;
        this.typeName = typeName[0].toUpperCase() + typeName.substring(1);
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