import ApiArticleRoutes from '../../services/ApiArticleRoutes';
import { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import Infographie from '../../components/Infographie';
import Loading from '../../components/Loading';

function Article() {
  const emptyArticle = {
    title: 'Titre',
    tags: 'tags',
    text: 'texte',
    infographie: 'none',
    sources: ['source1'],
  };

  const [article, updateArticle] = useState(emptyArticle);
  const [isLoading, updateIsLoading] = useState(true);

  useEffect(() => {
    ApiArticleRoutes.getLastArticle()
      .then((response) => {
        updateArticle(response.data[0]);
        updateIsLoading(false);
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
  let sources = article.sources;

  return (
    <main className="article">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Pagination />
          <h2>{title}</h2>
          <h4>
            {tags[0]}, {tags[1]}
          </h4>
          <p>{text}</p>
          <Infographie data={data} infoName={infoName} />
          <h5>Sources :</h5>
          <ul>
            {sources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

export default Article;
