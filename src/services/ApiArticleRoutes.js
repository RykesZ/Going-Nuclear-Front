import axios from 'axios';
const api = 'https://going-nuclear.herokuapp.com/api/articles';

class ApiArticleRoutes {
  getOneArticle = async (data) => {
    const articleId = data.articleId;
    try {
      const response = await axios.get(api + `/${articleId}`);
      return response;
    } catch (error) {
      return error;
    }
  };

  getArticles = async () => {
    try {
      const response = await axios.get(api + '/');
      return response;
    } catch (error) {
      return error;
    }
  };

  getLastArticle = async () => {
    try {
      const response = await axios.get(api + '/last');
      return response;
    } catch (error) {
      return error;
    }
  };

  getArticlesCount = async () => {
    try {
      const response = await axios.get(api + '/count');
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new ApiArticleRoutes();
