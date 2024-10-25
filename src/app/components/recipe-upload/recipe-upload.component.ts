import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-upload',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recipe-upload.component.html',
  styleUrls: ['./recipe-upload.component.scss']
})
export class RecipeUploadComponent {
  recipeForm: FormGroup;
  selectedFile: File | null = null;
  currentUser: any = null;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  async submitRecipe() {
    if (this.recipeForm.valid && this.selectedFile && this.currentUser) {
      const path = `recipes/${this.selectedFile.name}`;

      try {
        const fileUrl = await this.storageService.uploadRecipe(this.selectedFile, path);
        const recipeData = {
          name: this.recipeForm.value.name,
          description: this.recipeForm.value.description,
          createdBy: this.currentUser.uid,
          username: this.currentUser.displayName,
          fileUrl
        };

        await this.recipeService.addRecipe(recipeData);
        console.log('Recipe successfully uploaded and saved!');
        this.recipeForm.reset();
        this.selectedFile = null;
      } catch (error) {
        console.error('Error during recipe upload or save:', error);
      }
    } else {
      console.log('Form is invalid or no file selected.');
    }
  }
}
