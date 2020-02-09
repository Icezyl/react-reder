import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../reducer'
import api from '../../api'
import Mey from '../../components/Meg'
import { NavBar, Icon, Toast } from 'antd-mobile';

const News = (props) => {
  const [state] = useContext(AppContext)
  const [List, setList] = useState({ list: [] })
  useEffect(() => {
    api.news(state.id).then(res => {
      console.log(res)
      setList(res.data)
    })
  }, [state.id])
  function agree(id) {
    api.agree(id).then(res => {
      Toast.success(res.msg, 1);
    })
  }
  return (
    <div>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => props.history.go(-1)}
      >新朋友</NavBar>
      {List.list.map((item, index) => {
        const [userlist] = item.user_info
        return <Mey list={userlist} success={item.success} key={index} button={true} buid={item._id} onButton={(id) => {
          agree(id)
        }}></Mey>
      })}
    </div>
  )
}

export default News;