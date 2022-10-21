# React Blueprint

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Summary
This package offers a clear-cut, low-level **TypeScript** API which can be used to generate, store, and render serializable documents based 
on any type of **React** components. 

### Table of contents

- [Architecture](#architecture)
  - [Blueprint Settings](#bp_settings)
  - [Blueprint Element](#bp_element)
  - [Blueprint Configuration](#bp_configuration)
  - [Blueprint State](#bp_state)
  - [Dynamic Redux Store](#bp_store)
- [API](#api)
  - [Blueprint API](#bp_api)
  - [Blueprint Editor](#bp_editor)
  - [Blueprint Settings Editor](#bp_settings_editor)
  - [Blueprint View](#bp_view)
- [Demo](#demo)
  - [Example Settings](#demo_settings)
  - [Example Elements](#demo_elements)
  - [Example Configuration](#demo_configuration)
  - [Example Blueprint](#demo_blueprint)
  - [Demo in action](#demo_usage)

## Architecture {#architecture}
The blueprint is modelled as a tree comprised of blueprint elements. Each element can be decorated with any 
number of uniquely identifiable settings properties.


### 1. Blueprint Settings {#bp_settings}
This defines any type of settings   which can be attached to a blueprint element. The type is non-restrictive,
with the exception of a mandatory `type` property which ***uniquely*** identifies settings on a given element.

The base type `BlueprintSettingsPartial` is used **exclusively** for updating existing settings.
```angular2html
type BlueprintSettingsPartial = {
    [key: string]: any
}
```
 
The `BlueprintSettings` type extends `BlueprintSettingsPartial` in order to mandate the `type` property 
which is used internally to identify a specific object instance. Whenever a `BlueprintSettings` instance
missing the `type` property is encountered, an error is thrown.
```
type BlueprintSettings = BlueprintSettingsPartial & {
    type?: string;
}
```

### Example

Let's model for instance some settings which will allow us to customize some fancy text. 
We want to be able to specify the text which we want to display, as well as the font size and color.

We can define a `FancyTextSettings` type which will
contain the necessary properties. We do this by extending the base `BlueprintSettings` type and adding
our own properties over it.

```angular2html
type FancyTextSettings = BlueprintSettings & {
    fancyText: string;
    fontSize: number;
    color: string;
}
```
That's it. Now we can instantiate an object containing some mock data
```
const myFancyTextSettings: FancyTextSettings = {
    type: "FancyText",
    fancyText: "This is the fancy text.",
    fontSize: 14,
    color: "fancy"
}
```

### 2. Blueprint Element {#bp_element}
Quite literally the building block of any blueprint. This type is used to model the blueprint tree.
```angular2html
type BlueprintElement = {
    id: string;
    parentId?: string;
    type?: string;
    settings: BlueprintSettingsMap;
    children?: BlueprintElement[];
}
```
- `id` uniquely identifies an element within a blueprint.
- `parentId` is not mandatory. Elements without a `parentId` are treated as a root element. Each blueprint
must have a **single** root element. Typically this is a non-issue because when parsing a blueprint - which
is a `Blueprint Element` itself - child elements' `parentId`s are automatically assigned the value of the
container element.
- `type` specifies the type of the element. 
- `children` any  child elements the element may contain.
- `settings` is a map of all settings available on the element.

#### Blueprint Settings Map
```angular2html
type BlueprintSettingsMap = {
    [key: string]: BlueprintSettings;
}
```
The `Blueprint Settings Map` defines the available settings on a given element. The map is modelled as an
object whose properties are named after the specific type of settings.


Now that we have our fancy settings, we can use them to decorate a blueprint element.
```angular2html
const myFancyTextElement: BlueprintElement = {
    id: "some id",
    type: "FancyTextElement",
    settings: {
        FancyText: myFancyTextSettings
    }
}
```
**Caution!** Note that the settings property on `myFancyTextElement` *has the same name* as the *value*
of `myFancySettings`'s `type` property. This is important because otherwise the blueprint cannot detect
these settings on the element, and as a result an error will be thrown.

## API