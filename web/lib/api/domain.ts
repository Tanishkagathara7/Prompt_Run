import { apiClient } from './client';
import {
  DomainItem,
  PaginatedResponse,
  SingleResponse,
  CreateItemPayload,
  UpdateItemPayload,
  ItemListQuery,
  AnalyticsOverviewData,
  UploadedFile,
  AppNotification,
} from '../types';

export const itemsApi = {
  async getItems(params: ItemListQuery = {}): Promise<PaginatedResponse<DomainItem>> {
    return apiClient.get<PaginatedResponse<DomainItem>>('/items', params);
  },

  async getItem(id: string): Promise<SingleResponse<DomainItem>> {
    return apiClient.get<SingleResponse<DomainItem>>(`/items/${id}`);
  },

  async createItem(payload: CreateItemPayload): Promise<SingleResponse<DomainItem>> {
    return apiClient.post<SingleResponse<DomainItem>>('/items', payload);
  },

  async updateItem(id: string, payload: UpdateItemPayload): Promise<SingleResponse<DomainItem>> {
    return apiClient.put<SingleResponse<DomainItem>>(`/items/${id}`, payload);
  },

  async deleteItem(id: string): Promise<{ success: boolean; message: string }> {
    return apiClient.delete<{ success: boolean; message: string }>(`/items/${id}`);
  },
};

export const analyticsApi = {
  async getOverview(): Promise<AnalyticsOverviewData> {
    const res = await apiClient.get<{ success: boolean; data: AnalyticsOverviewData }>('/analytics/overview');
    return res.data;
  },
};

export const filesApi = {
  async upload(file: File): Promise<{ success: boolean; data: UploadedFile }> {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post<{ success: boolean; data: UploadedFile }>('/files', formData);
  },

  async getFile(id: string): Promise<{ success: boolean; data: UploadedFile }> {
    return apiClient.get<{ success: boolean; data: UploadedFile }>(`/files/${id}`);
  },

  async deleteFile(id: string): Promise<{ success: boolean; message: string }> {
    return apiClient.delete<{ success: boolean; message: string }>(`/files/${id}`);
  },
};

export const notificationsApi = {
  async getNotifications(page: number = 1, limit: number = 20): Promise<{ success: boolean; data: AppNotification[] }> {
    try {
      return await apiClient.get<{ success: boolean; data: AppNotification[] }>('/notifications', { page, limit });
    } catch {
      return { success: true, data: [] };
    }
  },

  async getUnreadCount(): Promise<number> {
    try {
      const res = await apiClient.get<{ success: boolean; data: { count: number } }>('/notifications/unread-count');
      return res.data?.count ?? 0;
    } catch {
      return 0;
    }
  },

  async markAsRead(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      return await apiClient.patch<{ success: boolean; message?: string }>(`/notifications/${id}/read`);
    } catch {
      return { success: true };
    }
  },

  async markAllAsRead(): Promise<{ success: boolean; message?: string }> {
    try {
      return await apiClient.patch<{ success: boolean; message?: string }>('/notifications/read-all');
    } catch {
      return { success: true };
    }
  },
};
