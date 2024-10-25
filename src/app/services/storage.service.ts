import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) {}

  async uploadRecipe(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(this.storage, path);

      await uploadBytes(storageRef, file);

      const fileUrl = await getDownloadURL(storageRef);
      return fileUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}
