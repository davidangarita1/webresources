import "./IconOption.scss";
import { createElement } from "react";

import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";
import * as BiIcons from "react-icons/bi";
import * as GrIcons from "react-icons/gr";
import * as GiIcons from "react-icons/gi";

import { IconType } from "react-icons";

type IconOptionProps = {
  iconName: string;
  color?: string;
};

const iconLibraries: any = {
  Si: SiIcons,
  Md: MdIcons,
  Bi: BiIcons,
  Gr: GrIcons,
  Gi: GiIcons,
};

export const IconOption = ({
  iconName,
  color,
}: IconOptionProps): JSX.Element => (
  <>
    <span id="iconOption" style={{ color: color }}>
      {createElement(
        iconLibraries[iconName.slice(0, 2)][iconName as keyof IconType]
      )}
    </span>
  </>
);
