import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Layout, Row, Col, Drawer, Space } from 'antd'
import { MenuOutlined, GithubOutlined } from '@ant-design/icons'
import SidePanel from './views/SidePanel'
import CentralDisplay from './views/CentralDisplay'
import Store from './core/Store'
import Tools from './core/Tools'
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
  

  backOnToday = () => {
    Store.set('selectedDate', Tools.getIso8601z({onlyDate: true}))
  }

  render() {
    let drawerVisible = false

    const logo = (
      <span
        className="today-logo"
      >
        <span style={{fontWeight: 600, marginRight: '0.25em'}}>today</span> 
        <span style={{fontWeight: 300}}>today</span>
      </span>
    )

    let footer = (
      <span>Made by <a href="https://twitter.com/jonathanlurie">@jonathanlurie</a>. Fork it on <a href="https://github.com/jonathanlurie/todaytoday">GitHub</a>.</span>
    )

    return (
      <Layout style={{background: '#fff'}}>

        <Header
          style={{
            background: 'white'
          }}
        >
          <Space size="middle">
            <MenuOutlined onClick={this.showDrawer}/>
            <div onClick={this.backOnToday}>{logo}</div>
          </Space>
        </Header>
        
        <Row>
          <Col xs={2}  sm={2}  md={4}  lg={4} xl={6}>
            
          </Col>
          <Col xs={20} sm={20} md={16} lg={16} xl={12}>
            <Content>
              <CentralDisplay/>
            </Content>
          </Col>
          <Col xs={2}  sm={2}  md={4}  lg={4} xl={6}>
            
          </Col>
        </Row>
        
        {/* <Footer>Footer</Footer> */}
        <Drawer
          title={logo}
          placement="left"
          closable={false}
          onClose={this.hideDrawer}
          visible={this.state.drawerVisible}
          width={350}
          footer={footer}
        >
          <SidePanel hideDrawer={this.hideDrawer}/>
        </Drawer>
      </Layout>
    );
  }
}

export default App;
