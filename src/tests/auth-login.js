import http from "k6/http";
import { check } from "k6";
import { URL } from "https://jslib.k6.io/url/1.0.0/index.js";
import { api } from "../utils/api.js";

export const options = {
  scenarios: {
    constant_load: {
      executor: "constant-vus",
      vus: config.VUS, // Number of VUs to run
      duration: config.TEST_DURATION, // Duration for which the VUs should run
      startTime: "0s", // When to start the scenario
      gracefulStop: "30s", // Time to wait for VUs to complete their iterations
    },
  },
};

export default function () {
  const url = new URL(api().authLogin); 

  // Set request payload
  const payload = JSON.stringify({
    loginName: "Alikhan",
    loginPassword: "29008Aaa!",
  });

  // Set headers
  const headers = {
    "Content-Type": "application/json",
  };

  const response = http.post(url.toString(), payload, {
    headers: headers,
    insecure: true,
  });

  const isStatus200 = check(response, {
    "HTTP status code for login is 200": (r) => r.status === 200,
  });
}
