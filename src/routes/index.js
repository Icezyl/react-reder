import { lazy } from 'react';
const Home = lazy(() => import('../pages/home'))
const Login = lazy(() => import('../pages/login'))
const News = lazy(() => import('../pages/news'))
const Search = lazy(() => import('../pages/search'))
const Personal = lazy(() => import('../pages/personal'))
const Chat = lazy(() => import('../pages/chat'))
const Edit = lazy(() => import('../pages/edit'))
const Demo = lazy(() => import('../pages/demo'))

export default [
  { path: '/login', name: 'Login', component: Login, exact: false },
  { path: '/demo', name: 'Demo', component: Demo, auth: true, exact: false },
  { path: '/news', name: 'News', component: News, auth: true, exact: false },
  { path: '/search', name: 'Search', component: Search, auth: true, exact: false },
  { path: '/edit', name: 'Edit', component: Edit, auth: true, exact: false },
  { path: '/personal/:id', name: 'Personal', component: Personal, auth: true, exact: false },
  { path: '/chat/:name/:id', name: 'Chat', component: Chat, auth: true, exact: false },
  { path: '/', name: 'App', component: Home, auth: true, exact: false }
]
