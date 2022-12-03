import "./FilterBar.scss";

import { Input } from "antd";

type FilterPropsType = {
  resourceList: [];
  handleFilter: (resources: any) => void;
};

export const FilterBar = ({ resourceList, handleFilter }: FilterPropsType) => {
  const searchResource = (event: any) => {
    const search = event.target.value;
    const filter = resourceList.filter((resource: any) =>
      resource.name.toLowerCase().includes(search.toLowerCase())
    );
    handleFilter(filter);
  };

  return (
    <>
      <div id="filterBar">
        <Input
          id="searchBar"
          name="searchBar"
          type="text"
          placeholder="Search resources by name"
          onChange={searchResource}
        />
      </div>
    </>
  );
};
