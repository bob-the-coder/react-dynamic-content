import UiElement, { applyMixins } from "./UiElement";

class ContainerSettings {
    children: UiElement[] = [];
}

class UiContainer extends UiElement { constructor() { super(0, 'UiContainer'); }}
interface UiContainer extends ContainerSettings {}
applyMixins(UiContainer, [ ContainerSettings ]);

export default UiContainer;