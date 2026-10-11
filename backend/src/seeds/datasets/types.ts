import { DomainItemStatus } from '../../models/DomainItem';

export interface SeedItemTemplate {
  seedKey: string;
  title: string;
  description: string;
  category: string;
  status: DomainItemStatus;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  attributes?: Record<string, any>;
  daysAgo: number;
}

export interface SeedDataset {
  name: string;
  description: string;
  items: SeedItemTemplate[];
}
