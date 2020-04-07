import { lazy } from 'react';
const Home = lazy(() => import('../pages/home'))
const Login = lazy(() => import('../pages/login'))
const MyHome = lazy(() => import('../pages/myHome'))
const Search = lazy(() => import('../pages/search'))
const Chat = lazy(() => import('../pages/chat'))
const Edit = lazy(() => import('../pages/edit'))
const Demo = lazy(() => import('../pages/demo'))
const Setting = lazy(() => import('../pages/setting'))
const Send = lazy(() => import('../pages/send'))
const Friends = lazy(() => import('../pages/friends'))
const DyDetails = lazy(() => import('../pages/dyDetails'))
const Voice = lazy(() => import('../pages/voice'))
const Matching = lazy(() => import('../pages/matching'))


export default [
  { path: '/login', name: 'Login', component: Login, exact: false },
  { path: '/demo', name: 'Demo', component: Demo, auth: true, exact: false },
  { path: '/setting', name: 'Setting', component: Setting, auth: true, exact: false },
  { path: '/search', name: 'Search', component: Search, auth: true, exact: false },
  { path: '/send', name: 'Send', component: Send, auth: true, exact: false },
  { path: '/friend', name: 'Friend', component: Friends, auth: true, exact: false },
  { path: '/voice/:channel/:id', name: 'Voice', component: Voice, auth: true, exact: false },
  { path: '/matching', name: 'Matching', component: Matching, auth: true, exact: false },
  { path: '/edit', name: 'Edit', component: Edit, auth: true, exact: false },
  { path: '/dyDetails/:id', name: 'DyDetails', component: DyDetails, auth: true, exact: false },
  { path: '/chat/:id', name: 'Chat', component: Chat, auth: true, exact: false },
  { path: '/myHome/:id', name: 'MyHome', component: MyHome, auth: true, exact: false },
  { path: '/', name: 'App', component: Home, auth: true, exact: false }
]
