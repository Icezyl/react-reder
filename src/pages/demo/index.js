import React, { useState, useRef } from 'react'
import plupload from 'plupload'
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';
import './style.less'
import axios from 'axios'
import api from '../../api'
const Demo = () => {
  const [files, setFiles] = useState([{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
  }])
  const form = useRef()
  const onChange = (files, type, index) => {
    console.log(files, type, index);
    setFiles(files)
  }
  const [img,setImg] =useState() 
  return (
    <div>
      <ImagePicker
        length='2'
        files={files}
        onImageClick={(index, fs) => console.log(index, fs)}
        onChange={onChange}
        selectable={files.length < 2}
        onAddImageClick={(e) => {
          console.log(e)
          const url = [{ url: e.url, id: '123' }]
          setFiles(url)
        }}
        disableDelete
      />
        <input name="file" type="file" accept='.jpg,.png' onChange={(e) => {
          var formData = new FormData()
          formData.append('file', e.target.files[0])
          api.yun().then(res => {
            formData.append('token', res.token)
            axios({
              method: 'post',
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              url: 'http://up.qiniu.com', data: formData
            }).then(res => {
              console.log(res.data)
              setImg(res.data.hash)
            })
          })
        }} />
      <img src={'http://q5y12w23r.bkt.clouddn.com/'+img}></img>
    </div>
  )
}
export default Demo