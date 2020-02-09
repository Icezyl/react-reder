import React, { useEffect, useState, useContext } from 'react'
import Meg from '../../components/Meg'
import api from '../../api'
import { Link } from 'react-router-dom'
import { AppContext } from '../../reducer'
import './style.less'
const Friends = (props) => {
  const [state] = useContext(AppContext)
  const [List, setList] = useState({ list: [] })
  useEffect(() => {
    api.friends(state.id).then(res => {
      console.log(res.data)
      setList(res.data)
    })
  }, [state.id])
  return (
    <div>
      <div className='news'>
        <Link className='news_a' to='/news'>新朋友</Link>
      </div>
      {List ? List.list.map((item, index) => {
        const [list] = item.user_info
        return <Meg list={list} key={index} onValueId={(id) => {
          console.log(id, item.user_info)
          props.history.push(`/personal/${id}`)
        }}></Meg>
      }) : <div>ddd</div>}
    </div>
  )
}

export default Friends