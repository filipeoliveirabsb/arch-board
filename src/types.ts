import type { Node, Edge } from 'reactflow';

export type NodeKind = 'database' | 'server' | 'loadbalancer' | 'queue' | 'cdn' | 'cache' | 'client';

export type ResourceType =
  | 'PostgreSQL'
  | 'Redis'
  | 'MongoDB'
  | 'Node.js'
  | 'Python'
  | 'Go'
  | 'NGINX'
  | 'HAProxy'
  | 'ALB'
  | 'Kafka'
  | 'RabbitMQ'
  | 'SQS'
  | 'CloudFront'
  | 'Cloudflare'
  | 'Fastly'
  | 'Memcached';

export interface NodeData {
  label: string;
  resourceType?: ResourceType;
}

export type ArchNode = Node<NodeData>;
export type ArchEdge = Edge;
