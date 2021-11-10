import ApiArticleRoutes from '../../services/ApiArticleRoutes';
import { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import Infographie from '../../components/Infographie';

const data = [
  { year: '1980', efficiency: 24.3, sales: 8949000 },
  { year: '1985', efficiency: 27.6, sales: 10979000 },
  { year: '1990', efficiency: 28, sales: 9303000 },
  { year: '1991', efficiency: 28.4, sales: 8185000 },
  { year: '1992', efficiency: 27.9, sales: 8213000 },
];

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
