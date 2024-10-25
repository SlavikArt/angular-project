import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe, RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  recipeId: string | null = null;
  currentUser: any = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });

    this.recipeId = this.route.snapshot.paramMap.get('id');
    if (this.recipeId) {
      this.recipeService.getRecipe(this.recipeId).subscribe(recipe => {
        if (recipe) {
          this.recipeForm.patchValue({
            name: recipe.name,
            description: recipe.description
          });
        } else {
          console.error('Recipe not found');
          this.router.navigate(['/recipes']);
        }
      });
    }
  }

  // Update (Edit)
  updateRecipe() {
    if (this.recipeForm.valid && this.recipeId && this.currentUser) {
      const updatedRecipe: Recipe = {
        ...this.recipeForm.value,
        createdBy: this.currentUser.uid,
      };

      this.recipeService.updateRecipe(this.recipeId, updatedRecipe).then(() => {
        console.log('Recipe updated successfully');
        this.router.navigate(['/recipes']);
      }).catch(error => console.error('Error updating recipe:', error));
    } else {
      console.log('Form is invalid or user is not authenticated.');
    }
  }
}
