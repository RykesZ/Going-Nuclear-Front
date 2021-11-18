import axios from 'axios';
require('dotenv').config({ path: '../.env' });
const api = `https://going-nuclear-back-a99nq.ondigitalocean.app/api/contact`;

class ApiContactRoutes {
  sendNewMessage = async (email, object, text) => {
    let data = { email: email, object: object, text: text };
    try {
      console.log('tentative de contact');
      const response = await axios.post(api + '/', data);
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new ApiContactRoutes();
