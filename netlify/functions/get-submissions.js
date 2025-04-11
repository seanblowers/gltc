const fetch = require('node-fetch');

exports.handler = async () => {
  const formId = 'your-form-id'; // Replace with your Netlify form ID
  const apiKey = 'your-netlify-api-key'; // Replace with your Netlify API key

  try {
    const response = await fetch(`https://api.netlify.com/api/v1/forms/${formId}/submissions`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch submissions' }),
      };
    }

    const submissions = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ count: submissions.length }),
    };
  } catch (error) {
    console.error('Error in serverless function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
