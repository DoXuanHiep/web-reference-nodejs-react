import React, { useState, useEffect } from "react";
import config from "../../config";

function ReqPacket() {
  const [numRequests, setNumRequests] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  const [responseTime, setResponseTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function makeSingleRequest() {
    const url = config.api.url; // Replace with your API endpoint URL
    setIsLoading(true);
    const start = Date.now();
    const timestamp = new Date().getTime();
    const response = await fetch(`${url}?timestamp=${timestamp}`, {
      headers: {
        "Cache-Control": "no-cache"
      }
    });
    const end = Date.now();
    const responseTime = end - start;
    setIsLoading(false);
    setResponseTime(responseTime);
  }

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(makeRequests, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, numRequests]);

  async function makeRequests() {
    const url = config.api.url; // Replace with your API endpoint URL
    setIsLoading(true);
    let times = [];
    for (let i = 0; i < numRequests; i++) {
      const timestamp = new Date().getTime();
      fetch(`${url}?timestamp=${timestamp}`, {
        headers: {
          "Cache-Control": "no-cache"
        }
      })
    }
    setIsLoading(false);
    setNumRequests((numRequests) => numRequests * 2);
  }

  function handleChangeStatus() {
    setIsRunning(!isRunning);
  }

  return (
    <div>
      {
        <button onClick={handleChangeStatus}>
          {isRunning ? "Stop" : "Start Continuous Request"}
        </button>
      }
      <button onClick={makeSingleRequest}>Send Single Request</button>
      {isLoading ? <p>Pending...</p> : responseTime && <p>Response time: {responseTime} ms</p>}
    </div>
  );
}

export default ReqPacket;