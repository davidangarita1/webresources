import "./Dashboard.css";
import React, { useEffect } from "react";
import ResourceCard from "../../components/ResourceCard/ResourceCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllResources } from "../../redux/middlewares/resourcesMiddleware";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, resources, error } = useSelector(
    (state: any) => state.resources
  );

  useEffect(() => {
    dispatch(getAllResources());
  }, []);

  return (
    <>
      <div id="api">
        <h1>Dashboard</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error...</p>}
        <div className="cards">
          {resources.length && resources.map((item: any) => (
            <div key={item.id}>
              <ResourceCard
                name={item.name}
				description={item.description}
				url={item.url}
                category={item.category}
                width={200}
                height={200}
                color={"#000000"}
                fontWeight={"bold"}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
