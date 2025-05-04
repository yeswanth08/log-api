import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    basic_read: {
      executor: 'constant-vus',
      vus: 10,
      duration: '20s',
      exec: 'readIncidents',
    },
    spike_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 100 },
        { duration: '5s', target: 100 },
        { duration: '5s', target: 0 },
      ],
      exec: 'readIncidents',
      startTime: '50s',
    },
    soak_test: {
      executor: 'constant-vus',
      vus: 10,
      duration: '2m',
      exec: 'readIncidents',
      startTime: '60s',
    },
  },
};

// Functions

export function readIncidents() {
  const res = http.get('http://backend_application:3000/api/incidents');
  check(res, {
    'status was 200': (r) => r.status === 200,
  });
  sleep(1);
}

  
export function mixedTraffic() {
  readIncidents();
  Math.random() > 0.5 ? addIncident() : addIncidentWithAuth();
}
