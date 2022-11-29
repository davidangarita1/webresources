import "./Dashboard.scss";
import { Fragment, useEffect } from "react";
import { ResourceCard } from "@Components";
import { useDispatch, useSelector } from "react-redux";
import { getAllResources } from "../../redux/middlewares/resourcesMiddleware";

import { categoryData } from "../../data/categoryData";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, resources, error } = useSelector(
    (state: any) => state.resources
  );

  useEffect(() => {
    dispatch(getAllResources());
  }, []);

  const getFilteredCategories = (categories: any[]): any[] =>
    categories.map((category) =>
      categoryData.find((item) => category === item.name)
    );

  return (
    <Fragment>
      <div id="api">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Dashboard</h1>
          </div>
        </div>
        <div className="row">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error...</p>}
          {resources.length &&
            resources.map((item: any) => (
              <div className="col mb-2" key={item.id}>
                <ResourceCard
                  name={item.name}
                  description={item.description}
                  url={item.url}
                  category={getFilteredCategories(item.category)}
                />
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
