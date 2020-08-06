import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Layout, Row, Col, Drawer, Space } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import SidePanel from './views/SidePanel'
import CentralDisplay from './views/CentralDisplay'
const { Header, Footer, Sider, Content } = Layout

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerVisible: false
    }
  }

  showDrawer = () => {
    this.setState({
      drawerVisible: true,
    })
  }


  hideDrawer = () => {
    this.setState({
      drawerVisible: false,
    })
  }
  

  render() {
    let drawerVisible = false

    return (
      <Layout>

        <Header
          style={{
            background: 'white'
          }}
        >
          <Space>
            <MenuOutlined onClick={this.showDrawer}/>
            <span>
            Today
            </span>
            
          </Space>
        </Header>
        
        <Row>
          <Col xs={2}  sm={2}  md={3}  lg={4} xl={5} style={{background: 'green'}}>
            left
          </Col>
          <Col xs={20} sm={20} md={18} lg={16} xl={14} style={{background: '#aaa'}}>
            <Content>
              <CentralDisplay/>
            </Content>
          </Col>
          <Col xs={2}  sm={2}  md={3}  lg={4} xl={5} style={{background: 'green'}}>
            right
          </Col>
        </Row>
        
        {/* <Footer>Footer</Footer> */}
        <Drawer
          placement="left"
          closable={false}
          onClose={this.hideDrawer}
          visible={this.state.drawerVisible}
          width={350}
        >
          <SidePanel hideDrawer={this.hideDrawer}/>
        </Drawer>
      </Layout>
    );
  }
}

export default App;
