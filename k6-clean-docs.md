# K6 Load Testing Project Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Repository Structure](#repository-structure)
3. [Test Scripts](#test-scripts)
4. [CI/CD Integration](#ci-cd-integration)
5. [Configuration](#configuration)
6. [Running Tests](#running-tests)
7. [Best Practices](#best-practices)

## Introduction

This project implements load testing for the Skyworld application using k6, a modern load testing tool. The repository is located at [k6-skyworld-load-test](https://github.com/Saber97K/k6-skyworld-load-test/tree/master).

### What is K6?
K6 is a developer-centric performance testing tool that allows you to write tests in JavaScript while executing them in a high-performance Go runtime. It's designed for testing API endpoints, microservices, and websites under various load conditions.

## Repository Structure
```
k6-skyworld-load-test/
├── .github/
│   └── workflows/
│       └── k6-auth-login.yml
├── src/
│   ├── tests/
│   │   └── auth-login.js
│   └── utils/
│       ├── api.js
│       └── config.js
└── README.md
```

## Test Scripts

### Authentication Login Test
Located at `src/tests/auth-login.js`, this script tests the authentication endpoint:

```javascript
import http from "k6/http";
import { check } from "k6";
import { URL } from "https://jslib.k6.io/url/1.0.0/index.js";
import { api } from "../utils/api.js";
import * as config from "../utils/config.js";

export const options = {
  scenarios: {
    rate_load: {
      executor: "ramping-arrival-rate",
      timeUnit: "1s",
      preAllocatedVUs: 1,
      stages: [
        { target: 1, duration: "30s" },
      ],
    },
  },
};

export default function () {
  const url = new URL(api().authLogin);
  
  const payload = JSON.stringify({
    loginName: "Alikhan",
    loginPassword: "29008Aaa!",
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const response = http.post(url.toString(), payload, {
    headers: headers,
    insecure: true,
  });

  check(response, {
    "HTTP status code for login is 200": (r) => r.status === 200,
  });
}
```

## CI/CD Integration

### GitHub Actions Workflow
The project uses GitHub Actions for automated test execution. The workflow file is located at `.github/workflows/k6-auth-login.yml`:

```yaml
name: k6-auth-login
permissions:
  id-token: write
  contents: read
on:
  workflow_dispatch:
    inputs:
      runner:
        description: "Choose the runner"
        type: choice
        default: "self-hosted"
        options:
          - "self-hosted"
      file_path:
        description: 'File Path'
        required: true
        default: '/src/tests/auth-login.js'
        type: choice
        options:
          - '/src/tests/auth-login.js'
      vus:
        description: "Number of pre-allocated VUs"
        required: true
        default: "1"
```

### Workflow Parameters
The GitHub Actions workflow supports the following configurable parameters:

1. **Runner Selection**
   - Type: Choice
   - Default: "self-hosted"
   - Options: ["self-hosted"]

2. **Test File Path**
   - Default: "/src/tests/auth-login.js"
   - Type: Choice selection

3. **Load Test Parameters**
   - VUs (Virtual Users)
   - Ramping up rate
   - Stay rate
   - Ramping down rate
   - Stage durations

## Configuration

### Load Test Profiles
The test supports three stages of load:

1. **Ramp-up Phase**
   - Gradually increases load from 0 to target rate
   - Configurable duration and target rate

2. **Steady State**
   - Maintains constant load
   - Configurable duration and rate

3. **Ramp-down Phase**
   - Gradually decreases load
   - Configurable duration and final rate

### Environment Variables
```bash
VUS                  # Number of pre-allocated virtual users
RAMPING_UP_RATE      # Target requests per second during ramp-up
STAY_RATE           # Target requests per second during steady state
RAMPING_DOWN_RATE   # Target requests per second during ramp-down
RAMPING_UP_TIME     # Duration of ramp-up phase
STAY_TIME           # Duration of steady state
RAMPING_DOWN_TIME   # Duration of ramp-down phase
```

## Running Tests

### Locally
```bash
k6 run src/tests/auth-login.js
```

### Via GitHub Actions
1. Navigate to the Actions tab in the repository
2. Select the "k6-auth-login" workflow
3. Click "Run workflow"
4. Configure the parameters as needed
5. Click "Run workflow" to start the test

## Best Practices

1. **Version Control**
   - Keep test scripts in version control
   - Use meaningful commit messages
   - Review changes before merging

2. **Test Script Organization**
   - Separate concerns (config, utils, tests)
   - Use meaningful file names
   - Document script purpose and parameters

3. **CI/CD Integration**
   - Use self-hosted runners for consistent results
   - Configure appropriate timeouts
   - Set up notifications for test failures

4. **Monitoring and Reporting**
   - Use k6's prometheus output for metrics
   - Set up dashboards for visualization
   - Monitor system resources during tests

5. **Security**
   - Don't commit sensitive credentials
   - Use environment variables for secrets
   - Implement proper access controls

## Future Enhancements
1. Add more test scenarios
2. Implement detailed reporting
3. Add test result visualization
4. Integrate with monitoring systems
5. Expand CI/CD pipeline capabilities

For more information or to contribute to the project, visit the [GitHub repository](https://github.com/Saber97K/k6-skyworld-load-test/tree/master).
