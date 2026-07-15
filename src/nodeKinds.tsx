import { Database, Server, Network, ListOrdered, Globe, Zap, User, type LucideIcon } from 'lucide-react';
import type { NodeKind, ResourceType } from './types';

interface NodeKindConfig {
  label: string;
  icon: LucideIcon;
  color: string;
  resourceOptions: ResourceType[];
}

export const NODE_KIND_CONFIG: Record<NodeKind, NodeKindConfig> = {
  database: { label: 'Database', icon: Database, color: '#3b82f6', resourceOptions: ['PostgreSQL', 'Redis', 'MongoDB'] },
  server: { label: 'API Server', icon: Server, color: '#22c55e', resourceOptions: ['Node.js', 'Python', 'Go'] },
  loadbalancer: { label: 'Load Balancer', icon: Network, color: '#f97316', resourceOptions: ['NGINX', 'HAProxy', 'ALB'] },
  queue: { label: 'Message Queue', icon: ListOrdered, color: '#a855f7', resourceOptions: ['Kafka', 'RabbitMQ', 'SQS'] },
  cdn: { label: 'CDN', icon: Globe, color: '#06b6d4', resourceOptions: ['CloudFront', 'Cloudflare', 'Fastly'] },
  cache: { label: 'Cache', icon: Zap, color: '#eab308', resourceOptions: ['Redis', 'Memcached'] },
  client: { label: 'Cliente', icon: User, color: '#ec4899', resourceOptions: [] },
};

export const NODE_KIND_ORDER = Object.keys(NODE_KIND_CONFIG) as NodeKind[];
