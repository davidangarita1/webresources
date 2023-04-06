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

  const getFilteredCategories = (categoryData: string[]): any[] =>
    categoryData.map((category: string) =>
      categories.find((item: Category) => category.toUpperCase() === item.key)
    );

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
            categoriyList={categories}
            resourceList={resources}
            handleFilter={handleFilter}
          />
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error...</p>}
        {filteredResources.length > 0 && (
          <div className="row">
            {categories.length > 0 &&
              filteredResources.map((item: any, index: number) => (
                <div
                  className="col col-xs-6 col-sm-4 col-md-3 mb-2"
                  key={index}
                >
                  <ResourceCard
                    name={item.name}
                    description={item.description}
                    url={item.url}
                    category={getFilteredCategories(item.category)}
                    nameColor={item.nameColor}
                    headerColor={item.headerColor}
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
