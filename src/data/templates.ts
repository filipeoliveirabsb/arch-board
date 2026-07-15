import type { ArchEdge, ArchNode } from '../types';

interface Preset {
  nodes: ArchNode[];
  edges: ArchEdge[];
}

const node = (id: string, type: 'server' | 'database', label: string, resourceType: string, x: number, y: number): ArchNode => ({
  id,
  type,
  position: { x, y },
  data: { label, resourceType: resourceType as ArchNode['data']['resourceType'] },
});

export function createMicroservicesPreset(offsetY: number): Preset {
  const p = crypto.randomUUID().slice(0, 8);
  const gateway = `gateway_${p}`;
  const users = `users_${p}`;
  const orders = `orders_${p}`;
  const usersDb = `users_db_${p}`;
  const ordersDb = `orders_db_${p}`;

  return {
    nodes: [
      node(gateway, 'server', 'API Gateway', 'Node.js', 300, offsetY),
      node(users, 'server', 'Users Service', 'Node.js', 100, offsetY + 150),
      node(orders, 'server', 'Orders Service', 'Node.js', 500, offsetY + 150),
      node(usersDb, 'database', 'Users DB', 'PostgreSQL', 100, offsetY + 300),
      node(ordersDb, 'database', 'Orders DB', 'PostgreSQL', 500, offsetY + 300),
    ],
    edges: [
      { id: `${gateway}-${users}`, source: gateway, target: users },
      { id: `${gateway}-${orders}`, source: gateway, target: orders },
      { id: `${users}-${usersDb}`, source: users, target: usersDb },
      { id: `${orders}-${ordersDb}`, source: orders, target: ordersDb },
    ],
  };
}

export function createServerlessPreset(offsetY: number): Preset {
  const p = crypto.randomUUID().slice(0, 8);
  const api = `api_${p}`;
  const db = `db_${p}`;
  const cache = `cache_${p}`;

  return {
    nodes: [
      node(api, 'server', 'Lambda API', 'Node.js', 300, offsetY),
      node(db, 'database', 'Serverless DB', 'MongoDB', 150, offsetY + 150),
      node(cache, 'database', 'Cache Layer', 'Redis', 450, offsetY + 150),
    ],
    edges: [
      { id: `${api}-${db}`, source: api, target: db },
      { id: `${api}-${cache}`, source: api, target: cache },
    ],
  };
}
