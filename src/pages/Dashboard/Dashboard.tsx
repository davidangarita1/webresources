import { Fragment } from 'react';
import './Dashboard.scss';
import { FilterBar, ResourceCard } from '@components';
import { useResources } from '@hooks';

const Dashboard = () => {
  const { filtered, filterByName } = useResources();

  return (
    <Fragment>
      <div id="api">
        <div className="dashboard-header">
          <h1>Resources</h1>
          <p className="dashboard-subtitle">Discover tools and references for developers</p>
          <FilterBar onSearch={filterByName} />
        </div>
        {filtered.length === 0 ? (
          <p className="no-results">No resources found matching your search.</p>
        ) : (
          <div className="cards">
            {filtered.map((item, index) => (
              <ResourceCard
                key={index}
                name={item.name}
                description={item.description}
                url={item.url}
                nameColor={item.nameColor}
                headerColor={item.headerColor}
                category={item.category}
              />
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Dashboard;
