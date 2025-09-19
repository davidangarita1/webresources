import "./FilterBar.scss";

import { Input } from "antd";

import { Resource } from "@models";


interface FilterProps {
  resourceList: Resource[];
  handleFilter: (resources: any) => void;
}

export const FilterBar = ({ resourceList, handleFilter }: FilterProps) => {
  const searchResource = (event: any) => {
    const search = event.target.value;
    const filter = resourceList.filter((resource: Resource) =>
      resource.name.toLowerCase().includes(search.toLowerCase())
    );
    handleFilter(filter);
  };

  return (
    <>
      <div id="filterBar">
        <Input
          className="searchBar"
          name="searchBar"
          type="text"
          placeholder="Search resources by name"
          onChange={searchResource}
        />
      </div>
    </>
  );
};
