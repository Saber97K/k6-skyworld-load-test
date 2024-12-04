# K6 Load Testing Tool Documentation

## Introduction
K6 is an open-source load testing tool designed to help developers and QA engineers test the performance of their APIs, microservices, and websites. Built with developers in mind, k6 uses JavaScript as its scripting language while being implemented in Go for performance. It's particularly well-suited for testing HTTP/HTTPS APIs and websites.

## Key Concepts

### Virtual Users (VUs)
Virtual Users (VUs) are virtual entities that execute your test script. Each VU:
- Runs your test script in isolation
- Has its own independent context and variables
- Can simulate real user behavior with concurrent connections
- Maintains its own cookies and session state

### Iterations
An iteration represents one complete execution of your test script by a VU. During an iteration:
- The default function in your script runs once
- All code within the function is executed
- Metrics are collected for that particular execution
- Multiple iterations can run concurrently across different VUs

### Checks
Checks are like assertions that allow you to verify your system's behavior under load. They:
- Don't halt test execution if they fail
- Are used to validate response data, status codes, and other conditions
- Provide pass/fail metrics in the test results
- Help identify issues during load testing

## Test Script Flow Explanation

Let's break down the provided script:

### 1. Imports and Setup
```javascript
import http from "k6/http";
import { check } from "k6";
import { URL } from "https://jslib.k6.io/url/1.0.0/index.js";
```
This section imports necessary modules for HTTP requests, checks, and URL handling.

### 2. Test Configuration
```javascript
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
```
This configuration defines:
- A ramping arrival rate scenario
- Test duration of 30 seconds
- Target rate of 1 request per second
- Pre-allocated VUs for execution

### 3. Test Execution
```javascript
export default function () {
  const url = new URL(api().authLogin);
  const payload = JSON.stringify({
    loginName: "Alikhan",
    loginPassword: "29008Aaa!",
  });
  const headers = {
    "Content-Type": "application/json",
  };
```
This section:
- Defines the main test function
- Prepares the request URL
- Sets up the request payload
- Configures request headers

### 4. Request and Validation
```javascript
  const response = http.post(url.toString(), payload, {
    headers: headers,
    insecure: true,
  });

  const isStatus200 = check(response, {
    "HTTP status code for login is 200": (r) => r.status === 200,
  });
```
This part:
- Executes the HTTP POST request
- Performs response validation
- Checks for a 200 status code

## Additional Topics to Consider

### 1. Performance Metrics
- Response time metrics (p95, p99, median)
- Error rates and types
- Requests per second
- Data transfer metrics

### 2. Test Types
- Smoke testing
- Load testing
- Stress testing
- Soak testing
- Spike testing

### 3. Advanced Features
- Custom metrics
- Thresholds
- Groups and tags
- Environment variables
- HTTP request batching

### 4. Best Practices
- Script organization
- Error handling
- Resource cleanup
- Test data management
- Monitoring and debugging

### 5. Reporting
- Real-time metrics
- End-of-test summary
- Custom dashboards
- Integration with monitoring tools

### 6. CI/CD Integration
- Running tests in pipelines
- Automated performance testing
- Test result analysis
- Performance regression detection
