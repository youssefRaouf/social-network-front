const apiKey =
  'cda11v2OkqSI1rhQm37PBXKnpisMtlaDzoc4w0U6uNATgZRbJG&fbclid=IwAR0xMMxqpz0NIJwy9L5hq7qKTPrNQZwRaBCebgRVCxIq5fkO4oYIT1wsp2E';
export const baseUrl = 'http://192.168.1.6:4000/';
  function doRequest(url, options = {}, data = {}) {
    // console.log("sdfsad")
    let headers = {};
    if (options) {
      headers = {
        ...headers,
        ...options.headers,
      };
    }
    const queryString = Object.keys(data)
      .map(key => key + '=' + data[key])
      .join('&');
      // console.log(queryString)
    return fetch(`${baseUrl}${url}?${queryString}`);
  }

  const getPosts = (offset) => {
    const limit =15;
    const eventsRequest = () => {
        return doRequest('posts', {method: 'GET'}, {offset,limit});
    };
    return eventsRequest()
      .then(response => response.json())
  };


const getEvents = (page, category_id, user_id) => {
  const count = 10;
  const eventsRequest = () => {
    if (category_id) {
      return doRequest('get_category_posts', {method: 'GET'}, {count, page});
    } else if (user_id) {
      return doRequest('get_recent_posts', {method: 'GET'}, {count, page});
    } else {
      return doRequest('get_recent_posts', {method: 'GET'}, {count, page});
    }
  };
  return eventsRequest()
    .then(response => response.json())
    .then(res => res.posts);
};

const getEventById = id => {
  const eventsRequest = () => {
    return doRequest('get_post_detail', {method: 'GET'}, {id: id});
  };
  return eventsRequest()
    .then(response => response.json())
    .then(res => res.post);
};

// const getAlerts = page => {
//   const alerts = require('../data/Alerts-search.json');
//   if (alerts) {
//     return alerts.alerts;
//   }
//   return [];
// };
const getCategories = page => {
  const eventsRequest = () => {
    return doRequest('get_category_index', {method: 'GET'});
  };
  return eventsRequest()
    .then(response => response.json())
    .then(res => res.categories);
};
// const getReviews = () => {
//   const reviews = require('../data/Reviews.json');

//   return reviews.reviews;
// };

export {getEvents,getCategories, getEventById,getPosts};
