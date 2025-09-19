import { FilterBar, ResourceCard } from "@components";
import { Fragment, useState } from "react";
import "./Dashboard.scss";

import { Resource } from "@models";
import resources from "../../data/resources.json";

const Dashboard = () => {
  const new_resources: Resource[] = resources.map((r) => ({
    ...r,
    date: new Date(r.date),
  }));
  const [filteredResources, setFilteredResources] = useState<Resource[]>(new_resources);

  const handleFilter = (resourceList: Resource[]) => {
    setFilteredResources(resourceList);
  };

  return (
    <Fragment>
      <div id="api">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Dashboard</h1>
          </div>
          <FilterBar
            resourceList={new_resources as Resource[]}
            handleFilter={handleFilter}
          />
        </div>
        {filteredResources.length > 0 && (
          <div className="row">
            {filteredResources.map((item: any, index: number) => (
              <div
                className="col col-xs-6 col-sm-4 col-md-3 col-lg-2 mb-3"
                key={index}
              >
                <ResourceCard
                  name={item.name}
                  description={item.description}
                  url={item.url}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Dashboard;
