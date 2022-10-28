import "./resourceCard.scss";
import { Card, Button, Badge } from "react-bootstrap";

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
        <Card.Text className="categories">
          {category.map((item: any) => (
            <Badge key={item.id} bg={item.color}>
              {item.name}
            </Badge>
          ))}
        </Card.Text>
        <Button variant="primary">
          <a href={url} target="_blank">
            Open
          </a>
        </Button>
      </Card.Body>
    </Card>
  );
};
