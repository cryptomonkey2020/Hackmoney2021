import { Card, Button, Layout, Space, Image } from "antd";
import React from "react";
import environment from "../assets/environment.jpg";
import children from "../assets/children.jpg";
import animals from "../assets/animals.jpg";

const { Content } = Layout;

const Donate = () => {

  return (
    <div className="donate">
      
      <Layout>
        <Content>
          <h1>Please select the organization you want to donate to.</h1>
          <Card title="Organizations Looking for help">
            <Space>
              <Card type="inner" title="Support The Environment">
                <Space direction="vertical">
                  <Image width={200} src={environment} />
                  We have a dream, one of lives transformed, and autism embraced. With the hope of enriching the lives
                  of children, youths and...
                  <Button>Donate</Button>
                </Space>
              </Card>
              <Card type="inner" title="Support Children in Need">
                <Space direction="vertical">
                  <Image width={200} src={children} />
                  We have a dream, one of lives transformed, and autism embraced. With the hope of enriching the lives
                  of children, youths and...
                  <Button>Donate</Button>
                </Space>
              </Card>
              <Card type="inner" title="Support Homeless Animals">
                <Space direction="vertical">
                  <Image width={200} src={animals} />
                  We have a dream, one of lives transformed, and autism embraced. With the hope of enriching the lives
                  of children, youths and...
                  <Button>Donate</Button>
                </Space>
              </Card>
            </Space>
          </Card>
        </Content>
      </Layout>
    </div>
  );
}

export default Donate