import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

// ── Métricas personalizadas ────────────────────────────────────────────────
const latencyTrend = new Trend('inventory_latency', true);
const errorRate = new Rate('inventory_error_rate');
const transactionCount = new Counter('inventory_transactions_total');

// ── Configuración del escenario ────────────────────────────────────────────
// Controla desde variables de entorno para los 16 escenarios
const BASE_URL = __ENV.BASE_URL || 'https://welcoming-quietude-production-9908.up.railway.app';
const TENANT_ID = __ENV.TENANT_ID || 'a98378c8-ff85-4ac4-8260-3dbd2bad475c';
const SCENARIO = __ENV.SCENARIO || 'E1';

// Niveles de carga por escenario
const LOAD_PROFILES = {
    // ρ ≈ 30% — carga baja
    E1:  { vus: 2,  duration: '12m' },
    E2:  { vus: 2,  duration: '12m' },
    E3:  { vus: 2,  duration: '12m' },
    E4:  { vus: 2,  duration: '12m' },
    // ρ ≈ 60% — carga media
    E5:  { vus: 5,  duration: '12m' },
    E6:  { vus: 5,  duration: '12m' },
    E7:  { vus: 5,  duration: '12m' },
    E8:  { vus: 5,  duration: '12m' },
    // ρ ≈ 80% — carga alta
    E9:  { vus: 8,  duration: '12m' },
    E10: { vus: 8,  duration: '12m' },
    E11: { vus: 8,  duration: '12m' },
    E12: { vus: 8,  duration: '12m' },
    // ρ ≈ 95% — saturación
    E13: { vus: 10, duration: '12m' },
    E14: { vus: 10, duration: '12m' },
    E15: { vus: 10, duration: '12m' },
    E16: { vus: 10, duration: '12m' },
};

const profile = LOAD_PROFILES[SCENARIO];

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
            vus: profile.vus,
            duration: profile.duration,
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
            'p(95)<2000',
            'p(99)<5000',
        ],
        'inventory_error_rate{phase:load}': ['rate<0.05'],
    },
};

// ── Autenticación ──────────────────────────────────────────────────────────
function getToken() {
    const res = http.post(
        `${BASE_URL}/api/auth/login`,
        JSON.stringify({ email: 'admin@agaveerp.com', password: 'admin123' }),
        { headers: { 'Content-Type': 'application/json' } }
    );
    return res.json('token');
}

// ── Operaciones OLTP ───────────────────────────────────────────────────────
// Distribución: 70% lecturas / 30% escrituras (Narasayya & Chaudhuri, 2021)

function consultarProductos(headers) {
    const res = http.get(
        `${BASE_URL}/api/inventory/tenants/${TENANT_ID}/products`,
        { headers, tags: { operation: 'read_products' } }
    );
    latencyTrend.add(res.timings.duration, { operation: 'read_products' });
    errorRate.add(res.status !== 200, { operation: 'read_products' });
    transactionCount.add(1, { operation: 'read_products' });
    check(res, { 'products 200': (r) => r.status === 200 });
    return res;
}

function consultarProductosDisponibles(headers) {
    const res = http.get(
        `${BASE_URL}/api/inventory/tenants/${TENANT_ID}/products/available`,
        { headers, tags: { operation: 'read_available' } }
    );
    latencyTrend.add(res.timings.duration, { operation: 'read_available' });
    errorRate.add(res.status !== 200, { operation: 'read_available' });
    transactionCount.add(1, { operation: 'read_available' });
    check(res, { 'available 200': (r) => r.status === 200 });
    return res;
}

function consultarMovimientos(headers) {
    const res = http.get(
        `${BASE_URL}/api/inventory/tenants/${TENANT_ID}/movements`,
        { headers, tags: { operation: 'read_movements' } }
    );
    latencyTrend.add(res.timings.duration, { operation: 'read_movements' });
    errorRate.add(res.status !== 200, { operation: 'read_movements' });
    transactionCount.add(1, { operation: 'read_movements' });
    check(res, { 'movements 200': (r) => r.status === 200 });
    return res;
}

function registrarMovimientoEntrada(headers, productId) {
    const body = JSON.stringify({
        productId: productId,
        type: 'IN',
        quantity: Math.floor(Math.random() * 10) + 1,
        reason: 'Reposicion automatica k6',
    });
    const res = http.post(
        `${BASE_URL}/api/inventory/tenants/${TENANT_ID}/movements`,
        body,
        { headers, tags: { operation: 'write_stock_in' } }
    );
    latencyTrend.add(res.timings.duration, { operation: 'write_stock_in' });
    errorRate.add(res.status !== 201, { operation: 'write_stock_in' });
    transactionCount.add(1, { operation: 'write_stock_in' });
    check(res, { 'stock in 201': (r) => r.status === 201 });
    return res;
}

function registrarMovimientoSalida(headers, productId) {
    const body = JSON.stringify({
        productId: productId,
        type: 'OUT',
        quantity: 1,
        reason: 'Venta k6',
    });
    const res = http.post(
        `${BASE_URL}/api/inventory/tenants/${TENANT_ID}/movements`,
        body,
        { headers, tags: { operation: 'write_stock_out' } }
    );
    latencyTrend.add(res.timings.duration, { operation: 'write_stock_out' });
    errorRate.add(res.status !== 201, { operation: 'write_stock_out' });
    transactionCount.add(1, { operation: 'write_stock_out' });
    check(res, { 'stock out 201': (r) => r.status === 201 });
    return res;
}

// ── Setup — se ejecuta una vez antes del test ──────────────────────────────
export function setup() {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    // Obtener productos disponibles para el test
    const res = http.get(
        `${BASE_URL}/api/inventory/tenants/${TENANT_ID}/products`,
        { headers }
    );

    const products = res.json();
    const productIds = products.map((p) => p.id);

    return { token, productIds };
}

// ── Función principal — ejecutada por cada VU en cada iteración ────────────
export default function (data) {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
    };

    const productIds = data.productIds;
    if (!productIds || productIds.length === 0) {
        sleep(1);
        return;
    }

    const productId = productIds[Math.floor(Math.random() * productIds.length)];

    // Distribución 70/30 lecturas/escrituras
    const roll = Math.random();

    if (roll < 0.35) {
        // 35% — consulta de productos
        consultarProductos(headers);
    } else if (roll < 0.60) {
        // 25% — consulta de productos disponibles
        consultarProductosDisponibles(headers);
    } else if (roll < 0.70) {
        // 10% — consulta de movimientos
        consultarMovimientos(headers);
    } else if (roll < 0.85) {
        // 15% — entrada de stock
        registrarMovimientoEntrada(headers, productId);
    } else {
        // 15% — salida de stock
        registrarMovimientoSalida(headers, productId);
    }

    sleep(0.5);
}