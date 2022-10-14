import UiElement, { applyMixins } from "../../Base/UiElement";
import { PaddingSettings, ContainerSettings } from "./Mixins";
import {UiElementType} from "./UiElementType";

class Container extends UiElement { constructor() { super(UiElementType.Container); }}
interface Container extends ContainerSettings, PaddingSettings {}
applyMixins(Container, [ ContainerSettings, PaddingSettings ]);

export default Container;