import "./Dashboard.scss";
import { Fragment, useEffect } from "react";
import { ResourceCard } from "@Components";
import { useDispatch, useSelector } from "react-redux";
import { getAllResources } from "../../redux/middlewares/resourcesMiddleware";
import { getAllCategories } from "../../redux/middlewares/categoriesMiddleware";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, resources, error } = useSelector(
    (state: any) => state.resources
  );
  const { categories } = useSelector((state: any) => state.categories);

  useEffect(() => {
    dispatch(getAllResources());
    dispatch(getAllCategories());
  }, []);

  const getFilteredCategories = (categoryData: any[]): any[] =>
    categoryData.map((category) =>
      categories.find((item: any) => category.toUpperCase() === item.key)
    );

  return (
    <Fragment>
      <div id="api">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Dashboard</h1>
          </div>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error...</p>}
        {resources.length && (
          <div className="row">
            {categories.length &&
              resources.map((item: any, index: number) => (
                <div className="col mb-2" key={index}>
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
