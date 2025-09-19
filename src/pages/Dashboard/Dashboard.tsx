import "./Dashboard.scss";
import { Fragment, useEffect, useState } from "react";
import { ResourceCard, FilterBar } from "@components";
import { useDispatch, useSelector } from "react-redux";

import { Resource, Category } from "@models";
import { getAllResources } from "../../redux/middlewares/resourcesMiddleware";
import { getAllCategories } from "../../redux/middlewares/categoriesMiddleware";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, resources, error } = useSelector(
    (state: any) => state.resources
  );
  const { categories } = useSelector((state: any) => state.categories);

  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);

  useEffect(() => {
    dispatch(getAllResources());
    dispatch(getAllCategories());
    handleFilter(resources);
  }, [resources.length === 0]);

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
            categoriyList={categories as Category[]}
            resourceList={resources as Resource[]}
            handleFilter={handleFilter}
          />
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error...</p>}
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
