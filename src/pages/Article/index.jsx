import ApiArticleRoutes from '../../services/getArticles';
import { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';

function Article() {
  const emptyArticle = {
    title: 'Titre',
    tags: 'tags',
    text: 'texte',
    info: 'empty',
  };

  const [article, updateArticle] = useState(emptyArticle);

  useEffect(() => {
    ApiArticleRoutes.getLastArticle()
      .then((response) => {
        updateArticle(response.data[0]);
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let title = article.title;
  let tags = article.tags;
  let text = article.text;

  return (
    <div className="article">
      <Pagination />
      <h2>{title}</h2>
      <h4>
        {tags[0]}, {tags[1]}
      </h4>
      <p>{text}</p>
    </div>
  );
}

export default Article;
