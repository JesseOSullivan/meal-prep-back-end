const fetch = require('node-fetch');

exports.faunaFetch = async ({ query, variables }) => {
  console.log(`Running query: ${query}`);
  console.log(`With variables: ${JSON.stringify(variables)}`);

  try {
    const response = await fetch('https://graphql.eu.fauna.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    console.log(`Response from Fauna: ${JSON.stringify(jsonResponse)}`);
    return jsonResponse;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw error; // throw the error again after logging
  }
};
