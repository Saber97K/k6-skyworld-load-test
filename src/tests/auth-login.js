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
      preAllocatedVUs: config.VUS, 
      stages: [
        { target: config.RAMPING_UP_RATE, duration: config.RAMPING_UP_TIME },
        { target: STAY_RATE, duration: STAY_TIME }, 
        { target: RAMPING_DOWN_RATE, duration: RAMPING_DOWN_TIME }, 
      ],
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
