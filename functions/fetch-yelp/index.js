const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

exports.handler = async (event) => {
  const { zip } = event.queryStringParameters;
  const { search } = event.queryStringParameters;
  console.log('this is the zip', { zip, search });
  console.log(event.queryStringParameters);
  // console.log('this is zipper', { zip });
  // add code here to fetch data from yelp API
  // be sure to include the parameters from event.queryStringParameters
  try {
    const resp = await fetch(
      `https://api.yelp.com/v3/businesses/search?location=${zip}&term=${search}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
        },
      }
    );
    const data = await resp.json();
    const json = JSON.stringify(data.businesses);
    return {
      statusCode: 200,
      body: json,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed Retrieving data' }),
    };
  }
};
