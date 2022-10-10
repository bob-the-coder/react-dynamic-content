import { ReactElement } from "react";
import UiElement from "../Base/UiElement";
import UiManager from "../UiManager";

type PropTypes<T extends UiElement> = {
    element: T, 
    manager: UiManager, 
    onUpdate: () => any, 
    children?: ReactElement | ReactElement[] | null | undefined
};

export default PropTypes;