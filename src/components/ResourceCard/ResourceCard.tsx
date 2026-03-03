import './resourceCard.scss';

interface ResourceCardProps {
  name: string;
  description: string;
  url: string;
  nameColor: string;
  headerColor: string;
  category: string[];
}

export const ResourceCard = ({
  name,
  description,
  url,
  nameColor,
  headerColor,
  category,
}: ResourceCardProps) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    id="resourceCard"
    aria-label={`Open ${name}`}
  >
    <div className="resource-header" style={{ backgroundColor: headerColor, color: nameColor }}>
      <span className="resource-name">{name}</span>
      <div className="resource-badges">
        {category.map((cat) => (
          <span key={cat} className="badge">{cat}</span>
        ))}
      </div>
    </div>
    <div className="card-body">
      <p className="card-text">{description}</p>
    </div>
  </a>
);
