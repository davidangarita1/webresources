import "./resourceCard.scss";

import { IconOption } from "@components";
import { Card } from "react-bootstrap";

interface ResourceCardProps {
  name: string;
  description: string;
  url: string;
  category: string[];
  nameColor: string;
  headerColor: string;
}

export const ResourceCard = ({
  name,
  description,
  url,
  category,
  nameColor,
  headerColor,
}: ResourceCardProps): JSX.Element => {
  const openUrl = () => {
    window.open(url);
  };

  return (
    <Card id="resourceCard" onClick={openUrl}>
      <Card.Header style={{ backgroundColor: headerColor, color: nameColor }}>
        {name}
      </Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <div className="categories">
          {category.map((item: any, index: number) => (
            <div
              key={index}
              className="badge"
              style={{ backgroundColor: `${item.color}` }}
            >
              <IconOption iconName={`${item.icon}`} />
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};
