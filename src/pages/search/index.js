import React, { useState, useRef, useEffect, useContext } from 'react';
import { SearchBar, Toast } from 'antd-mobile'
import { AppContext } from '../../reducer'
import api from '../../api'
import './style.less'
const Search = (props) => {
  const [state, dispatch] = useContext(AppContext)
  const ser = useRef()
  const [list, setList] = useState([])
  const [hiddin, setHiddin] = useState(false)
  useEffect(() => {
    ser.current.focus()
  }, [])
  const onSearch = (name) => {
    if (name.trim()) {
      api.search({ name, id: state.id }).then(res => {
        setList(res)
        setHiddin(true)
      })
    }
  }
  const [value, setValue] = useState()

  const Info = props => {
    return (
      <div className='info' onClick={() => props.onClick(props.user._id)}>
        <div className='left_img'>
          <img alt='' src={props.user.avatar}></img>
        </div>
        <p className='left_name'>{props.user.username}</p>
      </div>
    )
  }
  return (
    <div className='search'>
      <SearchBar
        ref={ser}
        value={value}
        placeholder="请输入用户名"
        onSubmit={value => onSearch(value)}
        onCancel={() => props.history.go(-1)}
        showCancelButton
        onFocus={() => setHiddin(false)}
        onChange={(e) => { setValue(e) }}
      />
      {
        list.length ?
          <div className='contacts'>
            <p className='title'>联系人</p>
            {list.map((item, index) => {
              return <Info user={item} key={index} onClick={(id) => props.history.push(`/myHome/${id}`)}></Info>
            })}
          </div>
          : <div hidden={!hiddin} style={{ textAlign: 'center', padding: '10px 0', color: '#888888' }}>没有找到相关内容</div>
      }
    </div>
  )
}

export default Search;