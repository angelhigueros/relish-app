import axios from 'axios';
import type { Photo, PhotoFilters } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://relish-api-production.up.railway.app/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const getSinglePhoto = async (id: number): Promise<Photo> => {
  const response = await api.get(`/photos/${id}`);
  return response.data;
};

export const photoApi = {
  getPhotos: async (filters: PhotoFilters = {}): Promise<Photo[]> => {
    if (filters.id) {
      try {
        const photo = await getSinglePhoto(filters.id);
        return [photo];
      } catch (error) {
        console.error('Error fetching single photo:', error);
        return [];
      }
    }

    const params = new URLSearchParams();
    
    if (filters.title) params.append('title', filters.title);
    if (filters['album.title']) params.append('album.title', filters['album.title']);
    if (filters['album.user.email']) params.append('album.user.email', filters['album.user.email']);
    
    params.append('limit', (filters.limit || 25).toString());
    params.append('offset', (filters.offset || 0).toString());
    
    const response = await api.get(`/photos?${params.toString()}`);
    return response.data.data.photos;
  },

  getPhoto: getSinglePhoto,

  healthCheck: async (): Promise<{ status: string }> => {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api;