const {fetch} = require('cross-fetch');

const checkEnvironment = (logging) => {
    // URL
    const url = process.env['ONTRACK_URL'];
    if (!url) {
        if (logging) console.log("ONTRACK_URL environment variable is not defined.")
        return false;
    }
    // Token
    const token = process.env['ONTRACK_TOKEN'];
    if (!token) {
        if (logging) console.log("ONTRACK_TOKEN secret is not defined.")
        return false;
    }
    // OK
    return {
        url: url,
        token: token,
    };
};


const graphQL = async (clientEnvironment, query, variables, logging) => {
    const url = `${clientEnvironment.url}/graphql`;
    if (logging) {
        console.log("URL      : ", url);
        console.log("Query    : ", query);
        console.log("Variables: ", variables);
    }
    const result = await fetch(url, {
        method: "POST",
        headers: {
            'X-Ontrack-Token': clientEnvironment.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: "omit",
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    });
    if (result.status >= 200 && result.status < 300) {
        const json = await result.json();
        if (logging) {
            console.log("Answer: ", json);
        }
        return json;
    } else {
        throw Error(`HTTP ${result.status}`);
    }
};

const client = {
    checkEnvironment: checkEnvironment,
    graphQL: graphQL
}

module.exports = client;
