import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, deleteDoc, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';

export interface Recipe {
  id?: string;
  name: string;
  description: string;
  createdBy: string;
  username: string;
  fileUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private firestore: Firestore) {}

  getRecipes(): Observable<Recipe[]> {
    const recipesCollection = collection(this.firestore, 'recipes');
    return collectionData(recipesCollection, { idField: 'id' }) as Observable<Recipe[]>;
  }

  getRecipe(id: string): Observable<Recipe | null> {
    const recipeDoc = doc(this.firestore, `recipes/${id}`);
    return from(getDoc(recipeDoc)).pipe(
      map((doc) => {
        if (doc.exists()) {
          return { id: doc.id, ...doc.data() } as Recipe;
        } else {
          return null;
        }
      })
    );
  }

  async addRecipe(recipe: Recipe): Promise<void> {
    try {
      const recipesCollection = collection(this.firestore, 'recipes');
      await addDoc(recipesCollection, recipe);
      console.log('Recipe added successfully');
    } catch (error) {
      console.error('Error adding recipe:', error);
      throw error;
    }
  }

  async updateRecipe(id: string, data: Partial<Recipe>): Promise<void> {
    const recipeDoc = doc(this.firestore, `recipes/${id}`);
    return setDoc(recipeDoc, data, { merge: true });
  }

  async deleteRecipe(id: string): Promise<void> {
    const recipeDoc = doc(this.firestore, `recipes/${id}`);
    return deleteDoc(recipeDoc);
  }
}
