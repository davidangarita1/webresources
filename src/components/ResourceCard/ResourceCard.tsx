import "./resourceCard.scss";

import { IconOption } from "@Components";
import { Card, Button } from "react-bootstrap";

type ResourceCardProps = {
  name: string;
  description: string;
  url: string;
  category: any[];
};

export const ResourceCard = ({
  name,
  description,
  url,
  category,
}: ResourceCardProps): JSX.Element => {
  return (
    <Card id="resourceCard">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="categories">
          {category.map((item: any) => (
            <div
              key={item.id}
              className="badge"
              style={{ backgroundColor: `${item.color}` }}
            >
              <IconOption iconName={`${item.icon}`} />
              {item.name}
            </div>
          ))}
        </div>
        <Button className="btn-open" variant="primary">
          <a href={url} target="_blank">
            Open
          </a>
        </Button>
      </Card.Body>
    </Card>
  );
};
