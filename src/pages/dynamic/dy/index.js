import React, { useState, useEffect, useContext } from 'react'
import api from '../../../api'
import { PullToRefresh, ListView } from 'antd-mobile'
import { AppContext } from '../../../reducer'
import DynamicTab from '../../../components/dynamicTab'
const Follow = props => {
  const [list, setList] = useState()
  const [state] = useContext(AppContext)
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const [dataSource, setDataSource] = useState(new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  }))
  useEffect(() => {
    onRefresh()
  }, [])
  const apis = (e = 0) => {
    if (props.follow) {
      return api.dyFollow({ id: state.id, page: e })
    } else if (props.user) {
      return api.dyUserId({ id: props.user, page: e })
    } else {
      return api.dyList({ page: e })
    }
  }
  const onRefresh = () => {
    setRefreshing(true)
    setIsLoading(true)
    apis().then(res => {
      setIsLoading(false)
      setRefreshing(false)
      setList(res.list)
      setDataSource(dataSource.cloneWithRows(res.list))
    })
  }
  const onEndReached = (event) => {
    setPage(page => page + 1)
    setIsLoading(true)
    apis(page + 1).then(res => {
      setIsLoading(false)
      setList([...list, ...res.list])
      setDataSource(dataSource.cloneWithRows([...list, ...res.list]))
    })
  }
  const row = (rowData, sectionID, rowID) => {
    return <div>
      <DynamicTab list={rowData} id={state.id} onRefresh={onRefresh} />
    </div>
  }
  return (
    <div>
      <ListView
        style={{
          overflow: 'auto'
        }}
        dataSource={dataSource}
        renderRow={row}
        useBodyScroll={true}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {isLoading ? 'Loading...' : ''}
        </div>)}
        pullToRefresh={<PullToRefresh
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
        onEndReachedThreshold={20}
        onEndReached={(event) => onEndReached(event)}
        pageSize={5}
      />

    </div>
  )
}
export default Follow