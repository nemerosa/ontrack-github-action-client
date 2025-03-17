const client = require('./index')

test('check environment when no URL', async () => {
    const oldUrl = process.env.ONTRACK_URL
    try {
        process.env.ONTRACK_URL = ''
        const config = client.checkEnvironment()
        expect(config).toStrictEqual(false)
    } finally {
        if (oldUrl) {
            process.env.ONTRACK_URL = oldUrl
        } else {
            delete process.env.ONTRACK_URL
        }
    }
})

test('check environment when no token', async () => {
    const oldUrl = process.env.ONTRACK_URL
    const oldToken = process.env.ONTRACK_TOKEN
    try {
        process.env.ONTRACK_URL = 'https://some.url'
        process.env.ONTRACK_TOKEN = ''
        const config = client.checkEnvironment()
        expect(config).toStrictEqual(false)
    } finally {
        if (oldUrl) {
            process.env.ONTRACK_URL = oldUrl
        } else {
            delete process.env.ONTRACK_URL
        }
        if (oldToken) {
            process.env.ONTRACK_TOKEN = oldToken
        } else {
            delete process.env.ONTRACK_TOKEN
        }
    }
})

test('check environment when URL and token', async () => {
    const oldUrl = process.env.ONTRACK_URL
    const oldToken = process.env.ONTRACK_TOKEN
    try {
        process.env.ONTRACK_URL = 'https://some.url'
        process.env.ONTRACK_TOKEN = 'some-token'
        const config = client.checkEnvironment()
        expect(config).toStrictEqual({
            url: 'https://some.url',
            token: 'some-token',
        })
    } finally {
        if (oldUrl) {
            process.env.ONTRACK_URL = oldUrl
        } else {
            delete process.env.ONTRACK_URL
        }
        if (oldToken) {
            process.env.ONTRACK_TOKEN = oldToken
        } else {
            delete process.env.ONTRACK_TOKEN
        }
    }
})

test('testing a simple GraphQL query', async () => {
    // Checking the environment
    console.log(`Testing with Ontrack URL = ${process.env.ONTRACK_URL}`)
    expect(process.env.ONTRACK_URL).not.toBeUndefined()
    expect(process.env.ONTRACK_TOKEN).not.toBeUndefined()
    expect(process.env.ONTRACK_PROJECT).not.toBeUndefined()
    const config = client.checkEnvironment()
    // Calling
    const json = await client.graphQL(config, `
        query GetProject($project: String!) {
            projects(name: $project) {
                id
                name
            }
        }
    `, {project: process.env.ONTRACK_PROJECT}, true)
    // Checking
    expect(Number(json.data.projects[0].id)).toBeGreaterThan(0)
    expect(json.data.projects[0].name).toBe(process.env.ONTRACK_PROJECT)
})