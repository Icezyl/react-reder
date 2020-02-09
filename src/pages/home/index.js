import React, { useContext, useState, lazy, Suspense } from 'react'
import { TabBar, NavBar, Icon } from 'antd-mobile'
import { AppContext } from '../../reducer'
import { Route, Switch, Link } from 'react-router-dom'
const Message = lazy(() => import('../message'))
const Friends = lazy(() => import('../friends'))
const My = lazy(() => import('../my'))
const Loading = lazy(() => import('../../components/LoadingV2'))

const Home = (props) => {
  const [selectedTab, setSelectedTab] = useState(props.location.pathname)
  const [state] = useContext(AppContext)

  return (
    <TabBar unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
      tabBarPosition="bottom"
      hidden={false}>
      {state.tabBarList.map((item) => {
        return <TabBar.Item title={item.title} key={item.key} selected={item.route === selectedTab} onPress={() => {
          setSelectedTab(item.route)
          props.history.push(item.route)
        }} icon={<div style={{ 'background': 'url(' + item.icon + ')center center /  21px 21px no-repeat', 'height': '22px', 'width': '22px' }} ></div>} selectedIcon={<div style={{ 'background': 'url(' + item.selectedIcon + ')center center /  21px 21px no-repeat', 'height': '22px', 'width': '22px' }} ></div>} >
          <NavBar mode='dark'
            rightContent={
              <Link to='/search' style={{color: 'white'}}>
                <Icon type='search' />
              </Link>
            }
          >{item.title}</NavBar>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path='/friends' component={Friends} />
              <Route path='/my' component={My} />
              <Route path='/' component={Message} />
            </Switch>
          </Suspense>
        </TabBar.Item>
      })}
    </TabBar>
  )
}
export default Home