import React, { Suspense, useReducer } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { LoadingV2 } from './components'
import Routers from './routes'
import reducer, { AppContext, initial } from './reducer'
const App = (props) => {
  const [state, dispatch] = useReducer(reducer, initial);
  return (
    <AppContext.Provider style={{ height: 'calc(100vh)' }} value={[state, dispatch]}>
      <HashRouter>
        <Suspense fallback={<LoadingV2 />}>
          <Switch>
            {Routers.map((item, index) => {
              return <Route key={index} path={item.path} exact={item.exact} render={props =>
                (!item.auth ? (!state.token ? <item.component {...props} /> : <Redirect to={{
                  pathname: '/', state: { from: props.location }
                }} />) : (state.token ? <item.component {...props} /> : <Redirect to={{
                  pathname: '/login', state: { from: props.location }
                }} />)
                )} />
            })}
            <Route component={LoadingV2} />
          </Switch>
        </Suspense>
      </HashRouter>
    </AppContext.Provider>
  )
}

export default App;