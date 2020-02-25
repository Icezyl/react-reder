import React, { useContext, useState, lazy, Suspense } from 'react'
import { TabBar} from 'antd-mobile'
import { AppContext } from '../../reducer'
import { Route, Switch } from 'react-router-dom'
const Message = lazy(() => import('../message'))
const Friends = lazy(() => import('../friends'))
const My = lazy(() => import('../my'))
const Index = lazy(() => import('../index'))
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
        return <TabBar.Item title={item.title}
          key={item.key}
          selected={item.route === selectedTab}
          onPress={() => {
            setSelectedTab(item.route)
            props.history.push(item.route)
          }}
          icon={<div style={{ 'height': '22px', 'width': '22px' }} ><span className={'iconfont ' + item.icon} style={{ fontSize: '20px' }}></span></div>}
          selectedIcon={<div style={{ 'height': '22px', 'width': '22px' }} >
            <span className={'iconfont ' + item.selectedIcon} style={{ fontSize: '20px' }}></span>
          </div>} >
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path='/friends' component={Friends} />
              <Route path='/my' component={My} />
              <Route path='/message' component={Message} />
              <Route path='/' component={Index}></Route>
            </Switch>
          </Suspense>
        </TabBar.Item>
      })}
    </TabBar>
  )
}
export default Home