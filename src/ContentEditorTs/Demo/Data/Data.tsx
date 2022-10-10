
import React, { ReactElement } from 'react';

import UiElement from '../../Base/UiElement';
import UiContainer from '../../Base/UiContainer';
import Text from '../Elements/Text';
import Image from '../Elements/Image';
import List from '../Elements/List';

import FontOptionsEditor from '../../ElementEditors/FontOptionsEditor';
import TextEditor from '../../ElementEditors/TextEditor';
import ImageEditor from '../../ElementEditors/ImageEditor';
import ListEditor from '../../ElementEditors/ListEditor';
import ContainerEditor from '../../ElementEditors/ContainerEditor';
import PaddingOptionsEditor from '../../ElementEditors/PaddingOptionsEditor';
import MultiEditor from '../../ElementEditors/MultiEditor';

import TextViewer from '../../ElementViewers/TextViewer';
import ImageViewer from '../../ElementViewers/ImageViewer';
import ListViewer from '../../ElementViewers/ListViewer';
import ContainerViewer from '../../ElementViewers/ContainerViewer';

import UiManager, { UiElementConfiguration } from "../../UiManager";
import { Button } from 'rsuite';

import ExampleTree from './ExampleTree';


function addElementAction<T extends UiElement>(manager: UiManager, parent: UiContainer, label: string, onUpdate: () => any): ReactElement {
    return (
        <Button appearance="ghost"
            onClick={function() {
                manager.addElement<T>(parent);
                onUpdate();
            }}
        >
            {label}
        </Button>
    )
}

function removeElement(manager: UiManager, element: UiElement, label: string, onUpdate: () => any) {
    return (
        <Button appearance="ghost"
            onClick={function() {
                manager.removeElement(element);
                onUpdate();
            }}
        >
            {label}
        </Button>
    )
}

const demoManager = new UiManager(ExampleTree, null);

demoManager.configure<Text>(new UiElementConfiguration<Text>(
    () => new Text(),
    (element, manager, onUpdate) => [
        <MultiEditor manager={manager} element={element} onUpdate={onUpdate} editors={[
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
    (element, manager, onUpdate) => <TextViewer manager={manager} element={element} onUpdate={onUpdate} />,
    (element, onUpdate) => [
        removeElementAction(demoManager, onUpdate, element)
    ]
});

demoManager.configure(ElementType.Image, {
    elementFactory: () => new ImageElement({}),
    editorsProvider: (element, onUpdate) => [
        <MultiEditor manager={demoManager} element={element} onUpdate={onUpdate} editors={[
            {
                name: 'Image Settings',
                editor: (element, manager, onUpdate) => <ImageEditor manager={demoManager} element={element} onUpdate={onUpdate} />
            },
            {
                name: 'Padding Settings',
                editor: (element, manager, onUpdate) => <PaddingOptionsEditor manager={manager} element={element} onUpdate={onUpdate} />
            }
        ]}/>
    ],
    viewerProvider: (element) => <ImageViewer manager={demoManager} element={element} />,
    actionsProvider: (element, onUpdate) => [
        removeElementAction(demoManager, onUpdate, element)
    ]
});

demoManager.configure(ElementType.List, {
    elementFactory: () => new ListElement({}),
    editorsProvider: (element, onUpdate) => [
        <MultiEditor manager={demoManager} element={element} onUpdate={onUpdate} editors={[
            {
                name: 'List Settings',
                editor: (element, manager, onUpdate) => <ListEditor manager={demoManager} element={element} onUpdate={onUpdate} />
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

export default demoModel;