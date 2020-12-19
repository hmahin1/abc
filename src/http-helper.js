const request = (url, method, payload, auth) => {
  const options = {
    method: method ? method : 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  };
  if(auth) {
    options.headers['Authorization'] = "Bearer " + localStorage.getItem('token');
  }
  if(payload) {
        options.body = JSON.stringify(payload);
  }
  console.log('url', options);
 
  return fetch(url, options)
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => console.error(error));
}

export { request };