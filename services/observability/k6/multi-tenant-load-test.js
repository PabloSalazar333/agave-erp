import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

// ── Métricas personalizadas ────────────────────────────────────────────────
const latencyTrend = new Trend('inventory_latency', true);
const errorRate = new Rate('inventory_error_rate');
const transactionCount = new Counter('inventory_transactions_total');

// ── Configuración por escenario ────────────────────────────────────────────
const SCENARIO = __ENV.SCENARIO || 'E1';

const TENANTS = [
  {
    baseUrl: 'http://35.223.252.76:8081',
    tenantId: 'dbae488d-5202-476f-a1e5-56fdbc76bf09',
    productId: 'f2eae1af-2119-4ad5-86b7-b64b6f4a4318',
    email: 'admin@agaveerp.com',
    password: 'admin123'
  },
  {
    baseUrl: 'http://34.46.20.174:8081',
    tenantId: 'c153e512-249d-4024-9615-9f684875b687',
    productId: 'cad5a9c7-d94c-41ee-900c-daa0ec6c3118',
    email: 'admin@agaveerp.com',
    password: 'admin123'
  },
  {
    baseUrl: 'http://34.134.174.82:8081',
    tenantId: 'ed6f7985-2fa5-4287-b9f5-e98202219642',
    productId: '68b91117-82aa-42c4-9f8f-c4c9fdb07cf1',
    email: 'admin@agaveerp.com',
    password: 'admin123'
  },
  {
    baseUrl: 'http://34.70.29.231:8081',
    tenantId: '91270e8a-a9f0-4b2e-b066-a5b2ec705780',
    productId: '77fbc2a7-e116-499c-b094-6ca4e8837db1',
    email: 'admin@agaveerp.com',
    password: 'admin123'
  }
];

// Número de tenants activos según escenario
const TENANT_COUNT = {
  E1: 1, E2: 2, E3: 3, E4: 4,
  E5: 1, E6: 2, E7: 3, E8: 4,
  E9: 1, E10: 2, E11: 3, E12: 4,
  E13: 1, E14: 2, E15: 3, E16: 4,
};

// VUs por escenario
const LOAD_PROFILES = {
  E1: 2,  E2: 2,  E3: 2,  E4: 2,
  E5: 5,  E6: 5,  E7: 5,  E8: 5,
  E9: 8,  E10: 8, E11: 8, E12: 8,
  E13: 10, E14: 10, E15: 10, E16: 10,
};

const activeTenants = TENANTS.slice(0, TENANT_COUNT[SCENARIO]);
const vus = LOAD_PROFILES[SCENARIO];

export const options = {
  scenarios: {
    warmup: {
      executor: 'constant-vus',
      vus: 1,
      duration: '2m',
      tags: { phase: 'warmup' },
    },
    load: {
      executor: 'constant-vus',
      vus: vus,
      duration: '12m',
      startTime: '2m',
      tags: { phase: 'load', scenario: SCENARIO },
    },
    cooldown: {
      executor: 'constant-vus',
      vus: 1,
      duration: '1m',
      startTime: '14m',
      tags: { phase: 'cooldown' },
    },
  },
  thresholds: {
    'inventory_latency{phase:load}': [
      'p(95)<5000',
      'p(99)<10000',
    ],
    'inventory_error_rate{phase:load}': ['rate<0.05'],
  },
};

// ── Setup ──────────────────────────────────────────────────────────────────
export function setup() {
  const tenantData = [];

  for (const tenant of activeTenants) {
    const res = http.post(
      `${tenant.baseUrl}/api/auth/login`,
      JSON.stringify({ email: tenant.email, password: tenant.password }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    const token = res.json('token');
    tenantData.push({
      baseUrl: tenant.baseUrl,
      tenantId: tenant.tenantId,
      productId: tenant.productId,
      token: token,
    });
  }

  return { tenants: tenantData };
}

// ── Operaciones OLTP ───────────────────────────────────────────────────────
function runOLTP(tenant) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tenant.token}`,
  };

  const roll = Math.random();

  let res;
  let operation;

  if (roll < 0.35) {
    operation = 'read_products';
    res = http.get(
      `${tenant.baseUrl}/api/inventory/tenants/${tenant.tenantId}/products`,
      { headers, tags: { operation } }
    );
  } else if (roll < 0.60) {
    operation = 'read_available';
    res = http.get(
      `${tenant.baseUrl}/api/inventory/tenants/${tenant.tenantId}/products/available`,
      { headers, tags: { operation } }
    );
  } else if (roll < 0.70) {
    operation = 'read_movements';
    res = http.get(
      `${tenant.baseUrl}/api/inventory/tenants/${tenant.tenantId}/movements`,
      { headers, tags: { operation } }
    );
  } else if (roll < 0.85) {
    operation = 'write_stock_in';
    res = http.post(
      `${tenant.baseUrl}/api/inventory/tenants/${tenant.tenantId}/movements`,
      JSON.stringify({
        productId: tenant.productId,
        type: 'IN',
        quantity: Math.floor(Math.random() * 5) + 1,
        reason: 'Reposicion k6',
      }),
      { headers, tags: { operation } }
    );
  } else {
    operation = 'write_stock_out';
    res = http.post(
      `${tenant.baseUrl}/api/inventory/tenants/${tenant.tenantId}/movements`,
      JSON.stringify({
        productId: tenant.productId,
        type: 'OUT',
        quantity: 1,
        reason: 'Venta k6',
      }),
      { headers, tags: { operation } }
    );
  }

  latencyTrend.add(res.timings.duration, { operation, phase: 'load' });
  errorRate.add(res.status >= 400, { operation, phase: 'load' });
  transactionCount.add(1, { operation });
  check(res, { [`${operation} ok`]: (r) => r.status < 400 });
}

// ── Función principal ──────────────────────────────────────────────────────
export default function (data) {
  const tenants = data.tenants;
  const tenant = tenants[Math.floor(Math.random() * tenants.length)];
  runOLTP(tenant);
  sleep(0.5);
}