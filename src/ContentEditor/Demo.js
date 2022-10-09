import React from 'react';
import { Container, TextElement, ImageElement, ListElement, ElementType, ElementTypeName } from "./ContentModel";

import FontOptionsEditor from './ElementEditors/FontOptionsEditor';
import TextEditor from './ElementEditors/TextEditor';
import ImageEditor from './ElementEditors/ImageEditor';
import ListEditor from './ElementEditors/ListEditor';
import ContainerEditor from './ElementEditors/ContainerEditor';
import PaddingOptionsEditor from './ElementEditors/PaddingOptionsEditor';
import MultiEditor from './ElementEditors/MultiEditor';

import TextViewer from './ElementViewers/TextViewer';
import ImageViewer from './ElementViewers/ImageViewer';
import ListViewer from './ElementViewers/ListViewer';
import ContainerViewer from './ElementViewers/ContainerViewer';

import ContentManager from "./ContentManager";
import { Button } from 'rsuite';

const defaultFontOptions = {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'white'
};

const demoModel = new Container({
    children: [
        new TextElement({
            text: 'From nested trees to personalized frameworks',
            fontOptions: {
                fontSize: 28,
                fontWeight: 'bold',
                color: 'red'
            }
        }),
        new TextElement({
            text: 'Building a nested tree is fun',
            fontOptions: defaultFontOptions
        }),
        new Container({
            children: [
                new TextElement({
                    text: 'Here is everything you need to get started:',
                    fontOptions: defaultFontOptions
                }),
                new ListElement({
                    items: [
                        "Get yourself an IDE. Any one will do.",
                        "Start learning programming. Javascript is a good place to start.",
                        "Learn all you can about binary trees.",
                        "Learn what you can about decision trees.",
                        "Find a course on React that teaches you more than a todo list.",
                        "Realize that half of the solutions on the internet don't suit your particular needs.",
                        "Start developing your own framework.",
                        "???",
                        "Profit."
                    ]
                })
            ]
        }),
        new TextElement({
            text: "If you don't think it's this easy, check the source code of this app. It's a few hundred lines.",
            fontOptions: defaultFontOptions
        }),
        new ImageElement({
            url: 'https://www.alimentarium.org/sites/default/files/media/image/2017-02/AL027-01_pomme_de_terre_0_0.jpg',
            alt: 'There should be a potato here'
        }),
        new TextElement({
            text: "Here's a potato."
        })
    ]
});

const addElementAction = (manager, onUpdate, element, elementType) => (
    <Button appearance="ghost"
        onClick={function() {
            manager.addElement(element, elementType);
            onUpdate();
        }}
    >
        {`Add ${ElementTypeName[elementType]}`}
    </Button>
);

const removeElementAction = (manager, onUpdate, element) => (
    <Button appearance="ghost"
        onClick={function() {
            manager.removeElement(element);
            onUpdate();
        }}
    >
        {`Remove ${ElementTypeName[element.type]}`}
    </Button>
);

const demoManager = new ContentManager({ model: demoModel });

demoManager.configure(ElementType.Text, {
    elementFactory: () => new TextElement({}),
    editorsProvider: (element, onUpdate) => [
        <MultiEditor manager={demoManager} element={element} onUpdate={onUpdate} editors={[
            {
                name: 'Text Settings',
                editor: (element, manager, onUpdate) => <TextEditor manager={manager} element={element} onUpdate={onUpdate} />
            },
            {
                name: 'Font Settings',
                editor: (element, manager, onUpdate) => <FontOptionsEditor manager={manager} element={element} onUpdate={onUpdate} />
            },
            {
                name: 'Padding Settings',
                editor: (element, manager, onUpdate) => <PaddingOptionsEditor manager={manager} element={element} onUpdate={onUpdate} />
            }
        ]}/>
    ],
    viewerProvider: (element) => <TextViewer manager={demoManager} element={element} />,
    actionsProvider: (element, onUpdate) => [
        removeElementAction(demoManager, onUpdate, element)
    ]
});

demoManager.configure(ElementType.Image, {
    elementFactory: () => new ImageElement({}),
    editorsProvider: (element, onUpdate) => [
        <ImageEditor manager={demoManager} element={element} onUpdate={onUpdate} />
    ],
    viewerProvider: (element) => <ImageViewer manager={demoManager} element={element} />,
    actionsProvider: (element, onUpdate) => [
        removeElementAction(demoManager, onUpdate, element)
    ]
});

demoManager.configure(ElementType.List, {
    elementFactory: () => new ListElement({}),
    editorsProvider: (element, onUpdate) =>  [
        <ListEditor manager={demoManager} element={element} onUpdate={onUpdate} />,
        <FontOptionsEditor manager={demoManager} element={element} onUpdate={onUpdate} />
    ],
    viewerProvider: (element) => <ListViewer manager={demoManager} element={element} />,
    actionsProvider: (element, onUpdate) => [
        <Button appearance="ghost"
            onClick={_ => {
                element.items.push('');
                onUpdate();
        }}>Add list item</Button>,
        removeElementAction(demoManager, onUpdate, element)
    ]
});

demoManager.configure(ElementType.Container, {
    elementFactory: () => new Container({}),
    editorsProvider: (element, onUpdate) => [
        <ContainerEditor manager={demoManager} element={element} onUpdate={onUpdate} />
    ],
    viewerProvider: (element, onUpdate) => <ContainerViewer manager={demoManager} element={element} onUpdate={onUpdate} />,
    actionsProvider: (element, onUpdate) => [
        addElementAction(demoManager, onUpdate, element, ElementType.Container),
        addElementAction(demoManager, onUpdate, element, ElementType.Text),
        addElementAction(demoManager, onUpdate, element, ElementType.Image),
        addElementAction(demoManager, onUpdate, element, ElementType.List),
        removeElementAction(demoManager, onUpdate, element)
    ]
});

export default {
    model: demoModel,
    manager: demoManager,
    fontOptions: defaultFontOptions
};