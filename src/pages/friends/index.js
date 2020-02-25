import React, { useEffect, useState, useContext } from 'react'
import Meg from '../../components/Meg'
import api from '../../api'
import { NavBar, Icon } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { AppContext } from '../../reducer'
import './style.less'
const Friends = (props) => {
  const [state] = useContext(AppContext)
  const [List, setList] = useState({ list: [] })
  useEffect(() => {
    api.friends({ _id: state.id }).then(res => {
      setList(res)
    })
  }, [state.id])
  return (
    <div className='friend'>
      <NavBar mode='dark'
        rightContent={
          <Link to='/search' style={{ color: 'white' }}>
            <Icon type='search' />
          </Link>
        }
      >好友</NavBar>
      <div className='news'>
        <Link className='news_a' to='/news'>新朋友</Link>
      </div>
      {List ? List.list.map((item, index) => {
        const [list] = item.user_info
        return <Meg list={list} key={index} onValueId={(id) => {
          props.history.push(`/personal/${id}`)
        }}></Meg>
      }) : <div>ddd</div>}
    </div>
  )
}

export default Friends