const ElementType = {
    Container: 0,
    Text: 1,
    Image: 3,
    List: 4
}

const ElementTypeName = {
}
for (let k in ElementType) {
    ElementTypeName[ElementType[k]] = k;
}

const uid = () => ('' + (Math.random() + Math.random() + Math.random())).replace(/[^\d]/g, '');
function newId() {
    while (true) {
        let id = uid();
        if (id <= -1) continue;
        return id;
    }
}

class Element {
    constructor() {
        this.id = newId();
        this.parentId = null;
    }
}

class Container extends Element {
    constructor(init) {
        super();
        this.type = ElementType.Container;
        this.children = init.children || [];
    }
}

class TextElement extends Element {
    constructor(init){
        super();
        this.type = ElementType.Text;
        this.text = init.text || 'This is a text element';
        this.horizontalAlignment = init.horizontalAlignment || 0;
        this.fontOptions = init.fontOptions || {};
    }
}

class ImageElement extends Element {
    constructor(init) {
        super();
        this.type = ElementType.Image;
        this.url = init.url || '';
        this.alt = init.alt || 'Missing image';
        this.height = init.height || 'auto';
        this.width = init.width || 'auto';
    }
}

class ListElement extends Element {
    constructor(init) {
        super();
        this.type = ElementType.List;
        this.items = init.items || []
    }
}

export {
    ElementType,
    ElementTypeName,
    Container,
    TextElement,
    ImageElement,
    ListElement
}