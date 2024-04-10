function InfiniteScrollList({ columnWidth, newsItemWidth }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // 加载数据
    if (!loading && hasMore) {
      setLoading(true)
      fetchData()
    }
  }, [page])

  const handleScroll = () => {
    // 检查是否滚动到页面底部
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setPage(page + 1)
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`your-api-url?page=${page}`)
      const newData = await response.json()
      setData([...data, ...newData])
      setLoading(false)
      if (newData.length === 0) {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='news-list'>
        {data.map(news => (
          <div key={news.id} className='news-item ' style={{ flex: `0 0 calc(${columnWidth} - 20px)` }}>
            <div className='news-item-content' style={{ width: newsItemWidth }}>
              <div className='news-item-index'>{news.id}</div>
              <img src={news.image} alt={news.title} style={{ width: `${columnWidth}` }} />
              <div className='news-item-title'>{news.title}</div>
              <div>
                <p>word</p>
              </div>
              <div>
                <p>word</p>
              </div>
              <div>
                <p>word</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>}
      {!loading && !hasMore && <div>No more data</div>}
    </div>
  )
}

export default InfiniteScrollList
