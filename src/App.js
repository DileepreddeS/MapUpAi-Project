import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  DesktopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Layout,
  Menu,
  Select,
  theme,
} from "antd";
import Card from "antd/es/card/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapComponent from "./components/Map";

import { setLocation } from "./features/cords/cordsSlice";
import { setLocationData } from "./features/Loaction/locationSlice";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const App = () => {
  const cords = useSelector((state) => state.cords.value);
  const location = useSelector((state) => state.location.value);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [valueSelect, setValueSelect] = useState("india");

  const [value, setValue] = useState("india");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    dispatch(setLocation(valueSelect));
    dispatch(setLocationData(valueSelect));
  }, []);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: "#001529",
            display: "flex",
            paddingRight: "10px",
            paddingLeft: "10px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "white" }}>MAPUP.AI</div>
          <div style={{ color: "white" }}>Login</div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Card>
              <Form>
                <Form.Item label="Select">
                  <Select
                    defaultValue={valueSelect}
                    onChange={(e) => {
                      setValueSelect(e);
                    }}
                  >
                    <Select.Option value="india">India</Select.Option>
                    <Select.Option value="usa">United States</Select.Option>
                    <Select.Option value="united kingdom">
                      United Kingdom
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    onClick={() => {
                      dispatch(setLocation(valueSelect));
                      dispatch(setLocationData(valueSelect));
                    }}
                  >
                    Load
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            <div style={{ height: "70vh" }}>
              <MapComponent country={value} />
            </div>
            <Card>
              <div>
                <div>Country: {location.name}</div>{" "}
                <div>Capital : {location.capital}</div>{" "}
                <div>Timezone : {location.timezone}</div>{" "}
                <div>Currency Symbol : {location.currencySymbol}</div>
                <div>
                  Flag :{" "}
                  <img src={location.flag} style={{ height: "10px" }}></img>
                </div>
              </div>
            </Card>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
