/**
 * Storage Service
 *
 * Handles file uploads and storage using Supabase Storage
 * Provides secure file management for documents and images
 *
 * Architecture: Enhanced Modular Monolith Service Layer
 * Dependencies: @supabase/supabase-js
 */

import type { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

export type UploadResult = {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
};

export type FileMetadata = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
};

export class StorageService {
  private supabase: ReturnType<typeof createClient<Database>>;

  constructor(supabaseClient: ReturnType<typeof createClient<Database>>) {
    this.supabase = supabaseClient;
  }

  /**
   * Upload a file to Supabase Storage
   */
  async uploadFile(
    bucket: string,
    path: string,
    file: File,
    options?: {
      cacheControl?: string;
      contentType?: string;
      upsert?: boolean;
    },
  ): Promise<UploadResult> {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: options?.cacheControl || '3600',
          contentType: options?.contentType || file.type,
          upsert: options?.upsert || false,
        });

      if (error) {
        console.error('File upload error:', error);
        return { success: false, error: error.message };
      }

      // Get public URL
      const { data: urlData } = this.supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return {
        success: true,
        url: urlData.publicUrl,
        path: data.path,
      };
    } catch (error) {
      console.error('Storage service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Download a file from Supabase Storage
   */
  async downloadFile(bucket: string, path: string): Promise<Blob | null> {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .download(path);

      if (error) {
        console.error('File download error:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Storage service error:', error);
      return null;
    }
  }

  /**
   * Delete a file from Supabase Storage
   */
  async deleteFile(bucket: string, path: string): Promise<boolean> {
    try {
      const { error } = await this.supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) {
        console.error('File delete error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Storage service error:', error);
      return false;
    }
  }

  /**
   * Get file metadata
   */
  async getFileMetadata(bucket: string, path: string): Promise<FileMetadata | null> {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .list(path.split('/').slice(0, -1).join('/'), {
          search: path.split('/').pop(),
        });

      if (error || !data || data.length === 0) {
        console.error('File metadata error:', error);
        return null;
      }

      const file = data[0];
      if (!file) {
        return null;
      }

      return {
        name: file.name,
        size: file.metadata?.size || 0,
        type: file.metadata?.mimetype || 'application/octet-stream',
        lastModified: new Date(file.updated_at).getTime(),
      };
    } catch (error) {
      console.error('Storage service error:', error);
      return null;
    }
  }

  /**
   * Get public URL for a file
   */
  getPublicUrl(bucket: string, path: string): string {
    const { data } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  /**
   * Create a signed URL for private file access
   */
  async createSignedUrl(
    bucket: string,
    path: string,
    expiresIn: number = 3600,
  ): Promise<string | null> {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .createSignedUrl(path, expiresIn);

      if (error) {
        console.error('Signed URL error:', error);
        return null;
      }

      return data.signedUrl;
    } catch (error) {
      console.error('Storage service error:', error);
      return null;
    }
  }

  /**
   * List files in a bucket
   */
  async listFiles(
    bucket: string,
    path: string = '',
    options?: {
      limit?: number;
      offset?: number;
      sortBy?: { column: string; order: 'asc' | 'desc' };
    },
  ): Promise<any[]> {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .list(path, {
          limit: options?.limit || 100,
          offset: options?.offset || 0,
          sortBy: options?.sortBy || { column: 'updated_at', order: 'desc' },
        });

      if (error) {
        console.error('List files error:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Storage service error:', error);
      return [];
    }
  }

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(
    bucket: string,
    files: Array<{ file: File; path: string }>,
    options?: {
      cacheControl?: string;
      upsert?: boolean;
    },
  ): Promise<Array<UploadResult>> {
    const results: Array<UploadResult> = [];

    for (const { file, path } of files) {
      const result = await this.uploadFile(bucket, path, file, options);
      results.push(result);
    }

    return results;
  }

  /**
   * Delete multiple files
   */
  async deleteMultipleFiles(bucket: string, paths: string[]): Promise<boolean> {
    try {
      const { error } = await this.supabase.storage
        .from(bucket)
        .remove(paths);

      if (error) {
        console.error('Delete multiple files error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Storage service error:', error);
      return false;
    }
  }
}

// Storage bucket names
export const StorageBuckets = {
  DOCUMENTS: 'loan-documents',
  IMAGES: 'property-images',
  TEMP: 'temp-uploads',
  AVATARS: 'user-avatars',
} as const;

// Helper function to generate file paths
export const generateFilePath = (entityType: string, entityId: string, fileName: string): string => {
  const timestamp = Date.now();
  const extension = fileName.split('.').pop();
  const baseName = fileName.replace(/\.[^/.]+$/, '');
  const sanitizedName = baseName.replace(/[^\w-]/g, '_');

  return `${entityType}/${entityId}/${sanitizedName}_${timestamp}.${extension}`;
};
