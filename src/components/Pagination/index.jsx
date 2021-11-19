import ApiArticleRoutes from '../../services/ApiArticleRoutes';
import { useState, useEffect } from 'react';

function Pagination() {
  const [articleCount, updateArticleCount] = useState(0);

  useEffect(() => {
    ApiArticleRoutes.getArticlesCount()
      .then((response) => {
        updateArticleCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let count = articleCount;
  return (
    <div className="pagination">
      <p>{count}</p>
    </div>
  );
}

export default Pagination;
