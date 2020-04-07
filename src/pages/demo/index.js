import { PullToRefresh, ListView, Button } from 'antd-mobile';
import React, { useState, useEffect } from 'react'
import api from '../../api'
import DynamicTab from '../../components/dynamicTab'

const G = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [list, setList] = useState()
  const [page, setPage] = useState(1)
  const [dataSource, setDataSource] = useState(new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  }))
  useEffect(() => {
    onRefresh()
  }, [])
  function onRefresh() {
    setRefreshing(true)
    setIsLoading(true)
    api.dyList({ page: 1 }).then(res => {
      setIsLoading(false)
      setRefreshing(false)
      setList(res.list)
      setDataSource(dataSource.cloneWithRows(res.list))
    })
  }
  function onEndReached(event) {
    setPage(page => page + 1)
    setIsLoading(true)
    api.dyList({ page: page + 1 }).then(res => {
      setIsLoading(false)
      setList([...list, ...res.list])
      setDataSource(dataSource.cloneWithRows([...list, ...res.list]))
    })
  }
  const row = (rowData, sectionID, rowID) => {
    return <div>
      <DynamicTab list={rowData}></DynamicTab>
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
          {isLoading ? 'Loading...' : '到底了'}
        </div>)}
        pullToRefresh={<PullToRefresh
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
        onEndReached={(event) => onEndReached(event)}
      />
    </div>
  )
}
export default G