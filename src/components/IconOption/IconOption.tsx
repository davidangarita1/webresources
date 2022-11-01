import { Fragment, createElement } from "react";
import "./IconOption.scss";

import * as SiIcons from "react-icons/si";

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
      {createElement(SiIcons[iconName])}
    </span>
    {` ${name}`}
  </Fragment>
);
