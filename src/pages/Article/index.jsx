import ApiArticleRoutes from '../../services/ApiArticleRoutes';
import { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import Infographie from '../../components/Infographie';

function Article() {
  const emptyArticle = {
    title: 'Titre',
    tags: 'tags',
    text: 'texte',
    infographie: 'none',
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
  let infoName = article.infographie;
  let data = article;

  return (
    <main className="article">
      <Pagination />
      <h2>{title}</h2>
      <h4>
        {tags[0]}, {tags[1]}
      </h4>
      <p>{text}</p>
      <Infographie data={data} infoName={infoName} />
    </main>
  );
}

export default Article;
