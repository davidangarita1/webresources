import './Building.scss';
import { MdOutlineBuild } from 'react-icons/md';

interface BuildingPageProps {
  title: string;
}

export const BuildingPage = ({ title }: BuildingPageProps) => (
  <div id="building">
    <div className="building-container">
      <MdOutlineBuild className="building-icon" />
      <h1>{title}</h1>
      <p>This section is currently under construction. Check back soon!</p>
    </div>
  </div>
);
