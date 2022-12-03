import "./ResourceForm.scss";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

import { IconOption } from "@Components";
import { Input, Row, Button, Select, notification } from "antd";
import { IconType } from "antd/lib/notification";
import { createResource } from "../../redux/middlewares/resourcesMiddleware";

const { Option } = Select;
const { TextArea } = Input;

type ResourceType = {
  userId: string;
  name: string;
  description: string;
  url: string;
  image: string;
  category: string[];
  nameColor: string;
  headerColor: string;
};

const INITIAL_VALUES = {
  userId: "xxxxx",
  name: "",
  description: "",
  url: "",
  image: "",
  category: [],
  nameColor: "#ffffff",
  headerColor: "#000000"
};

const MESSAGES = {
  success: "Resource created",
  error: "Error creating resource",
};

export const ResourceForm = ({ categories }: any): JSX.Element => {
  const [values, setValues] = useState(INITIAL_VALUES);
  const dispatch = useDispatch();

  const openNotificationWithIcon = (type: IconType, message: string) => {
    notification[type]({
      message: message,
      placement: "bottomLeft",
    });
  };

  const handleSubmitResource = (event: any) => {
    event.preventDefault();
    try {
      dispatch(createResource(values));
      openNotificationWithIcon("success", MESSAGES.success);
      setValues(INITIAL_VALUES)
    } catch (error) {
      openNotificationWithIcon("error", MESSAGES.error);
    }
  };

  return (
    <Fragment>
      <div id="form">
        <Row>
          <form onSubmit={(e) => handleSubmitResource(e)}>
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              required
            />
            <br />
            <label htmlFor="description">Description</label>
            <TextArea
              id="description"
              name="description"
              rows={4}
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
              required
            />
            <br />
            <label htmlFor="url">Url</label>
            <Input
              id="url"
              name="url"
              type="text"
              value={values.url}
              onChange={(e) => setValues({ ...values, url: e.target.value })}
              required
            />
            <br />
            <label htmlFor="nameColor">Color Name</label>
            <Input
              id="nameColor"
              name="nameColor"
              type="color"
              value={values.nameColor}
              onChange={(e) => setValues({ ...values, nameColor: e.target.value })}
              required
            />
            <br />
            <label htmlFor="headerColor">Color Header</label>
            <Input
              id="headerColor"
              name="headerColor"
              type="color"
              value={values.headerColor}
              onChange={(e) => setValues({ ...values, headerColor: e.target.value })}
              required
            />
            <br />
            <label htmlFor="category">Categories</label>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={(newValue) =>
                setValues({ ...values, category: newValue })
              }
              defaultValue={[]}
            >
              {categories
                .sort((a: any, b: any) => a.name.localeCompare(b.name))
                .map((category: any, index: number) => (
                  <Option key={index} value={category.name}>
                    <IconOption iconName={category.icon} />
                    {category.name}
                  </Option>
                ))}
            </Select>
            <br />
            <br />
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </form>
        </Row>
      </div>
    </Fragment>
  );
};
