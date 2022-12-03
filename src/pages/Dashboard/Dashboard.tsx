import "./Dashboard.scss";
import { Fragment, useEffect, useState } from "react";
import { ResourceCard, FilterBar } from "@Components";
import { useDispatch, useSelector } from "react-redux";
import { getAllResources } from "../../redux/middlewares/resourcesMiddleware";
import { getAllCategories } from "../../redux/middlewares/categoriesMiddleware";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, resources, error } = useSelector(
    (state: any) => state.resources
  );
  const { categories } = useSelector((state: any) => state.categories);

  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    dispatch(getAllResources());
    dispatch(getAllCategories());
    handleFilter(resources);
  }, [resources.length === 0]);

  const getFilteredCategories = (categoryData: any[]): any[] =>
    categoryData.map((category) =>
      categories.find((item: any) => category.toUpperCase() === item.key)
    );

  const handleFilter = (resourceList: []) => {
    setFilteredResources(resourceList);
  };

  return (
    <Fragment>
      <div id="api">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Dashboard</h1>
          </div>
          <FilterBar resourceList={resources} handleFilter={handleFilter} />
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error...</p>}
        {filteredResources.length > 0 && (
          <div className="row">
            {categories.length > 0 &&
              filteredResources.map((item: any, index: number) => (
                <div className="col col-xs-6 col-sm-4 col-md-3 mb-4" key={index}>
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
