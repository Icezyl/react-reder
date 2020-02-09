import React, { useState, useRef, useEffect } from 'react';
import { SearchBar } from 'antd-mobile'
import { Meg } from '../../components'
import api from '../../api'
const Search = (props) => {
  const ser = useRef()
  const [List, setList] = useState({ list: [] })
  useEffect(() => {
    ser.current.onFocus()
  }, [])
  function onSearch(name) {
    api.search(name).then(res => {
      console.log(res)
      setList(res)
    })
  }
  const [value, setValue] = useState()
  return (
    <div>
      <SearchBar
        ref={ser}
        value={value}
        placeholder="请输入用户名"
        onSubmit={value => onSearch(value)}
        onClear={value => console.log(value, 'onClear')}
        onFocus={() => console.log('onFocus')}
        onBlur={() => { console.log('onBlur') }}
        onCancel={() => props.history.go(-1)}
        showCancelButton
        onChange={(e) => { setValue(e) }}
      />
      {List.list.map((item, index) => {
        return <Meg key={index} list={item} onValueId={(id) => {
          props.history.push(`/personal/${id}`)
        }} />
      })}

    </div>
  )
}

export default Search;