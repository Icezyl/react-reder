import React, { useContext, useEffect } from 'react'
import { Button } from 'antd-mobile'
import api from '../../api'
import { AppContext } from '../../reducer'
const Index = (props) => {
  const [state, dispatch] = useContext(AppContext)
  useEffect(() => {
  }, [])

  return (
    <div>
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Button inline size='small' onClick={() => props.history.push('/matching')}>语音匹配</Button>
      </div>
    </div>
  )
}

export default Index