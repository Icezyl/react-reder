import React, { useEffect, useContext, useMemo, useState } from 'react';
import { AppContext } from '../../reducer'
import api from '../../api'
import Mey from '../../components/Meg'
import { NavBar, Icon, Toast } from 'antd-mobile';

const News = (props) => {
  const [state] = useContext(AppContext)
  const [List, setList] = useState([])
  useEffect(() => {
    api.news({ _id: state.id }).then(res => {
      console.log(res.data)
      setList(res.data)
    })
  }, [state.id])
  function agree(id) {
    api.agree({ _id: id }).then(res => {
      Toast.success(res.msg, 1);
    })
  }
  return (
    <div>
      <NavBar
        icon={<Icon type="left" />}
        onLeftClick={() => props.history.go(-1)}
      >新朋友</NavBar>
      <div>好友通知</div>
      { List.map((item, index) => {
        const [user] = item.user_info
        console.log(123)
        return <Mey list={user} success={item.success} key={index} button={true} buid={item._id} onButton={(id) => {
          agree(id)
          const ls = JSON.parse(JSON.stringify(List))
          ls.splice(index, 1)
          setList(ls)
        }}></Mey>
      })}
    </div>
  )
}

export default News;