import "./FilterBar.scss";
import { useState } from "react";

import { Input, Select } from "antd";
import { IconOption } from "@components";

import { Resource, Category } from "@models";

const { Option } = Select;

interface FilterProps {
  categoriyList: Category[];
  resourceList: Resource[];
  handleFilter: (resources: any) => void;
}

export const FilterBar = ({
  categoriyList,
  resourceList,
  handleFilter,
}: FilterProps) => {
  const [selectedValue, setSelectedValue] = useState("all");

  const searchResource = (event: any) => {
    const search = event.target.value;
    const filter = resourceList.filter((resource: Resource) =>
      resource.name.toLowerCase().includes(search.toLowerCase())
    );
    handleFilter(filter);
  };

  const filterResources = (key: string) => {
    setSelectedValue(key);
    const filter = resourceList.filter((resource: Resource) =>
      resource.category.includes(key)
    );
    handleFilter(key != "all" ? filter : resourceList);
  };

  return (
    <>
      <div id="filterBar">
        <Select
          className="filters"
          value={selectedValue}
          onChange={filterResources}
        >
          <Option value="all">All</Option>
          {categoriyList.map((category, index) => (
            <Option key={index} value={category.key}>
              <IconOption iconName={category.icon} color={category.color} />
              {category.name}
            </Option>
          ))}
        </Select>
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
