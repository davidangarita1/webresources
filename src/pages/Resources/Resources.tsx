import "./Resources.scss";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllCategories } from "../../redux/middlewares/categoriesMiddleware";

import { ResourceForm } from "@components";

const Resources = () => {
  const dispatch = useDispatch();
  const { isLoading, categories, error } = useSelector(
    (state: any) => state.categories
  );

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <Fragment>
      <div id="resources">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Resources</h1>
          </div>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error...</p>}
        {categories.length && (
          <div className="row">
            <div className="col-12">
              <ResourceForm categories={categories} />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Resources;
