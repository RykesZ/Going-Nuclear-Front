import axios from 'axios';
const api = 'http://localhost:5000/api/newsletter';

class ApiNewsletterRoutes {
  postNewSubscriber = async (data) => {
    const subscriberEmail = data;
    try {
      const response = await axios.post(api + '/', { email: subscriberEmail });
      return response;
    } catch (error) {
      return error;
    }
  };

  deleteSubscriber = async (data) => {
    const subscriberEmail = data;
    try {
      const response = await axios.delete(api + '/', {
        data: {
          email: subscriberEmail,
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new ApiNewsletterRoutes();
