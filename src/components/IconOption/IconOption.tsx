import { Fragment, createElement } from "react";
import "./IconOption.scss";

import * as SiIcons from "react-icons/si";
import { IconType } from "react-icons";

type IconOptionProps = {
  iconName: string;
  name: string;
  size?: string;
  color: string;
};

export const IconOption = ({
  iconName,
  name,
  size,
  color,
}: IconOptionProps): JSX.Element => (
  <Fragment>
    <span style={{ fontSize: size, color: color }}>
      {createElement(SiIcons[iconName as keyof IconType])}
    </span>
    {` ${name}`}
  </Fragment>
);
