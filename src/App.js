import React from 'react'
import ReactDOM from 'react-dom'
import Bisection from './Root/Bisection'
import Falseposition from './Root/Falsepostion'
import Onepoint from './Root/Onepoint'
import Newtonraphson from './Root/Newtonraphson'
import Secant from './Root/Secant'
import Forwardoh from './Derivative/Forwardoh'
import Backwardoh from './Derivative/Backwardoh'
import Centraloh from './Derivative/Centraloh'
import Centraloh4 from './Derivative/Centraloh4'
import Forwardoh2 from './Derivative/Forwardoh2'
import Backwardoh2 from './Derivative/Backwardoh2'
import Trapzoidal from './Intregration/Trapzoidal'
import Compositetrap from './Intregration/CompositeTrap'
import Simpson13 from './Intregration/Simpson1-3'
import Compositesimpson from './Intregration/CompositeSimson'
import Home from './Home'
import './App.css'
import 'antd/dist/antd.css'
import { Layout, Menu, Breadcrumb} from 'antd'
import { SyncOutlined,SettingFilled } from '@ant-design/icons'
var { Header, Content, Footer, Sider } = Layout;
var { SubMenu } = Menu;

class App extends React.Component {
  state = {
    openKeys: [''],
    collapsed: false,
    pageName: 'Home',
  };
  rootSubmenuKeys = ['subroot', 'subalgebra', 'subinterpolate', 'subregression', 'subintegrate', 'subNDD', 'Ode'];
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  onChangePage = (props) => {
    if (props.key.localeCompare("Bisection") === 0) {
      ReactDOM.render(<Bisection />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Falsepositon") === 0) {
      ReactDOM.render(<Falseposition />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Onepoint") === 0) {
      ReactDOM.render(<Onepoint />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Newtonraphson") === 0) {
      ReactDOM.render(<Newtonraphson />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Secant") === 0) {
      ReactDOM.render(<Secant />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Forwardoh") === 0) {
      ReactDOM.render(<Forwardoh />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Backwardoh") === 0) {
      ReactDOM.render(<Backwardoh />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Centralh2") === 0) {
      ReactDOM.render(<Centraloh />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Centralh4") === 0) {
      ReactDOM.render(<Centraloh4 />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Menu") === 0) {
      ReactDOM.render(<Menu />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Forwardoh2") === 0) {
      ReactDOM.render(<Forwardoh2 />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Backwardoh2") === 0) {
      ReactDOM.render(<Backwardoh2 />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Trapzoidal") === 0) {
      ReactDOM.render(<Trapzoidal />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Compositetrap") === 0) {
      ReactDOM.render(<Compositetrap />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Simpson13") === 0) {
      ReactDOM.render(<Simpson13 />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Compositesimp") === 0) {
      ReactDOM.render(<Compositesimpson />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Home") === 0) {
      ReactDOM.render(<Home />, document.getElementById("content"));
    }
    this.setState({
      pageName: props.key,
    })
  }
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Layout style={{ minHeight: '100vh'}}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          onClick={this.onChangePage}
          >
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"
            >
              <Menu.Item key="Home">
              <span>Numerical Method</span>
            </Menu.Item>
            </Menu>
            <SubMenu
              key="Root"
              title={
                <span>
                   <SettingFilled spin />
                  <span>Loot of Equation</span>
                </span>
              }
            >
              <Menu.Item key="Bisection">Bisection</Menu.Item>
              <Menu.Item key="Falsepositon">False-Position</Menu.Item>
              <Menu.Item key="Onepoint">One Point</Menu.Item>
              <Menu.Item key="Newtonraphson">Newton Raphson</Menu.Item>
              <Menu.Item key="Secant">Secant Method</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub1"
              title={
                <span>
                  <SettingFilled spin />
                  <span>Differentiation</span>
                </span>
              }
            >
              <Menu.Item key="Forwardoh">Forward FWO(h)</Menu.Item>
              <Menu.Item key="Backwardoh">Backword BWO(h)</Menu.Item>
              <Menu.Item key="Centralh2">Central O(h^2)</Menu.Item>
              <Menu.Item key="Centralh4">Central O(h^4)</Menu.Item>
              <Menu.Item key="Forwardoh2">Forward FWO(h^2)</Menu.Item>
              <Menu.Item key="Backwardoh2">Backward BWO(h^2)</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub2"
              title={
                <span>
                  <SettingFilled spin />
                  <span>Integration</span>
                </span>
              }
            >
              <Menu.Item key="Trapzoidal">Trapzoidal Rule</Menu.Item>
              <Menu.Item key="Compositetrap">Composite Trapzoidal Rule</Menu.Item>
              <Menu.Item key="Simpson13">Simpson 1/3 Rule</Menu.Item>
              <Menu.Item key="Compositesimp">Composite Simpson's Rule</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        <Layout>
          <Header style={{ background: '#C9E2EF', padding: 0 }} />
          <Content style={{ margin: '0 0px', background: '#642C66'}}>
            <Breadcrumb style={{ margin: '16px 0'}}>
              <Breadcrumb.Item style={{ color: "white", fontWeight: "bold" }}>&nbsp;&nbsp;Numerical Method</Breadcrumb.Item>
            <Breadcrumb.Item style={{ color: "white", fontWeight: "bold" }}>{this.state.pageName}</Breadcrumb.Item>
            </Breadcrumb>
            <div id="content" style={{ padding: 24, background: '#ECACAE', minHeight: 360 }}>
              <h2>Welcome to Numerical Method Calculator!</h2>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center',background: '#C9E2EF' }}>6004062630264 - KMUTNB</Footer>
        </Layout>
      </Layout>
      
    );
  }
}


export default App;
