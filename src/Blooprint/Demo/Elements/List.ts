import UiElement, { applyMixins } from "../../Base/UiElement";
import { FontSettings, ListSettings, PaddingSettings } from "./Mixins";
import {UiElementType} from "./UiElementType";

class List extends UiElement { constructor() { super(UiElementType.List); }}
interface List extends ListSettings, FontSettings, PaddingSettings {}
applyMixins(List, [ ListSettings, FontSettings, PaddingSettings ]);

export default List;