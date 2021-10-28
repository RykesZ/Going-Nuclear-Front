import ApiArticleRoutes from '../../services/getArticles'
import { useState, useEffect } from 'react'

function Pagination() {
  const [articleCount, updateArticleCount] = useState(0)

  useEffect(() => {
    ApiArticleRoutes.getArticlesCount()
      .then((response) => {
        updateArticleCount(response.data.count)
        console.log(response.data.count)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  let count = articleCount
  return (
    <div>
      <p>{count}</p>
    </div>
  )
}

export default Pagination
