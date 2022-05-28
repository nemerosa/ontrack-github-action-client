ontrack-github-action-client
============================

Reusable low-level Ontrack GraphQL client for GitHub Actions.

# Installation

```bash
npm login --scope=@nemerosa --registry=https://npm.pkg.github.com
npm install @nemerosa/ontrack-github-ingestion-build-links
```

# Usage

```javascript
const client = require('@nemerosa/ontrack-github-ingestion-build-links');

// logging: true or false or undefined
const clientEnvironment = client.checkEnvironment(logging);

// Performing the call
const result = client.graphQL(clientEnvironment, query, variables, logging);
```

# Prerequisites

The following environment variables must be available:

* `ONTRACK_URL` - the root URL of the Ontrack installation
* `ONTRACK_TOKEN` - the Ontrack authentication token

Typically, these will be defined at repository or organization level and exposed to the GitHub Actions workflow:

```yaml
env:
  ONTRACK_URL: "${{ secrets.ONTRACK_URL }}"
  ONTRACK_TOKEN: "${{ secrets.ONTRACK_TOKEN }}"
```

# See also

* [`ontrack-github-ingestion-build-links`](https://github/nemerosa/ontrack-github-ingestion-build-links)

