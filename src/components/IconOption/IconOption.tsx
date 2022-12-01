import { createElement } from "react";
import "./IconOption.scss";

import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";

import { IconType } from "react-icons";

type IconOptionProps = {
  iconName: string;
};

const iconLibraries: any = {
  Si: SiIcons,
  Md: MdIcons,
};

export const IconOption = ({ iconName }: IconOptionProps): JSX.Element => (
  <>
    <span id="iconOption">
      {createElement(
        iconLibraries[iconName.slice(0, 2)][iconName as keyof IconType]
      )}
    </span>
  </>
);
