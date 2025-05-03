import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    basic_read: {
      executor: 'constant-vus',
      vus: 50,
      duration: '20s',
      exec: 'readIncidents',
    },
    write_without_auth: {
      executor: 'constant-vus',
      vus: 30,
      duration: '20s',
      exec: 'addIncident',
    },
    write_with_auth: {
      executor: 'constant-vus',
      vus: 20,
      duration: '20s',
      exec: 'addIncidentWithAuth',
    },
    mixed_traffic: {
      executor: 'per-vu-iterations',
      vus: 20,
      iterations: 10,
      exec: 'mixedTraffic',
      startTime: '25s',
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
  const res = http.get('http://host.docker.internal:3000/api/incidents');
  check(res, {
    'status was 200': (r) => r.status === 200,
  });
  sleep(1);
}

export function addIncident() {
  const payload = JSON.stringify({ title: 'Test Incident', message: 'No auth' });
  const headers = { 'Content-Type': 'application/json' };

  const res = http.post('http://host.docker.internal:3000/api/add/incidents', payload, { headers });
  check(res, {
    'status was 200 or 201': (r) => r.status === 200 || r.status === 201,
  });
  sleep(1);
}

export function addIncidentWithAuth() {
    const payload = JSON.stringify({
      name: 'admin',
      password: 'test@123',
      title: 'Auth Incident',
      message: 'With auth'
    });
  
    const headers = {
      'Content-Type': 'application/json',
    };
  
    const res = http.post('http://host.docker.internal:3000/api/addwithauth/incidents', payload, { headers });
    check(res, {
      'auth status 200 or 201': (r) => r.status === 200 || r.status === 201,
    });
    sleep(1);
}
  

export function mixedTraffic() {
  readIncidents();
  Math.random() > 0.5 ? addIncident() : addIncidentWithAuth();
}
