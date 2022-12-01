import "./resourceCard.scss";

import { IconOption } from "@Components";
import { Card, Button } from "react-bootstrap";

type ResourceCardProps = {
  name: string;
  description: string;
  url: string;
  category: string[];
  nameColor: string;
  headerColor: string;
};

export const ResourceCard = ({
  name,
  description,
  url,
  category,
  nameColor,
  headerColor,
}: ResourceCardProps): JSX.Element => {
  return (
    <Card id="resourceCard">
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
              {item.name}
            </div>
          ))}
        </div>
      </Card.Body>
      <Card.Footer>
        <Button className="btn-open" variant="primary">
          <a href={url} target="_blank">
            Open
          </a>
        </Button>
      </Card.Footer>
    </Card>
  );
};
