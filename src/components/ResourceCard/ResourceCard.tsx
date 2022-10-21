import "./resourceCard.css";
import { Card, Button } from "react-bootstrap";
import { categoryData } from "../../data/categoryData";

export const ResourceCard = ({ name, description, url, category }: any) => (
  <Card style={{ width: "18rem" }} id="resourceCard">
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>{description}</Card.Text>
      <Button variant="primary">
        <a href={url} target="_blank">
          Open
        </a>
      </Button>
      {category.map((item: any, index: any) => (
        <span key={index}>{categoryData[item]}</span>
      ))}
    </Card.Body>
  </Card>
);
