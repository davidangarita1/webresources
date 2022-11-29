import { createElement } from "react";
import "./IconOption.scss";

import * as SiIcons from "react-icons/si";
import { IconType } from "react-icons";

type IconOptionProps = {
  iconName: string;
};

export const IconOption = ({ iconName }: IconOptionProps): JSX.Element => (
  <>
    <span id="iconOption">
      {createElement(SiIcons[iconName as keyof IconType])}
    </span>
  </>
);
