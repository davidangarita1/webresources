import { createElement } from "react";
import "./IconOption.scss";

import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";
import * as BiIcons from "react-icons/bi";
import * as GrIcons from "react-icons/gr";
import * as GiIcons from "react-icons/gi";

import { IconType } from "react-icons";

type IconOptionProps = {
  iconName: string;
};

const iconLibraries: any = {
  Si: SiIcons,
  Md: MdIcons,
  Bi: BiIcons,
  Gr: GrIcons,
  Gi: GiIcons,
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
