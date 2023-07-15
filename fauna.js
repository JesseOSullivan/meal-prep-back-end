const axios = require('axios');

exports.faunaFetch = async ({ query, variables }) => {
  console.log(`Running query: ${query}`);
  console.log(`With variables: ${JSON.stringify(variables)}`);

  try {
    const response = await axios.post('https://graphql.eu.fauna.com/graphql', 
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = response.data;
    console.log(`Response from Fauna: ${JSON.stringify(jsonResponse)}`);
    return jsonResponse;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw error; // throw the error again after logging
  }
};
