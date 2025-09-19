import "./resourceCard.scss";
import { Card } from "react-bootstrap";

interface ResourceCardProps {
  name: string;
  description: string;
  url: string;
}

export const ResourceCard = ({
  name,
  description,
  url,
}: ResourceCardProps): JSX.Element => {
  const openUrl = () => {
    window.open(url);
  };

  return (
    <Card id="resourceCard" onClick={openUrl}>
      <Card.Header className="resource-header">
        {name}
      </Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};
