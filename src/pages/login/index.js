import React, { lazy, Suspense } from 'react'
import './style.less'
import { Switch, Route } from 'react-router-dom'
import { LoadingV2 } from '../../components'

const Sign = lazy(() => import('./sign'))
const Reg = lazy(() => import('./reg'))
const Retrieve = lazy(() => import('./retrieve'))
const Login = () => {
  return (
    <div className="login">
      <Suspense fallback={<LoadingV2 />}>
        <Switch>
          <Route path="/login/reg" component={Reg}></Route>
          <Route path='/login/retrieve' component={Retrieve}></Route>
          <Route path="/login" component={Sign}></Route>
        </Switch>
      </Suspense>
    </div>
  )
}

export default Login