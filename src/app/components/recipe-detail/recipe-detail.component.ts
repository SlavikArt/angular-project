import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  recipeId: string | null = null;
  currentUserId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUserId = user?.uid || null;
    });

    this.recipeId = this.route.snapshot.paramMap.get('id');
    if (this.recipeId) {
      this.recipeService.getRecipe(this.recipeId).subscribe(recipe => {
        this.recipe = recipe;
      });
    }
  }

  // Edit
  editRecipe() {
    if (this.recipeId) {
      this.router.navigate([`/recipes/edit/${this.recipeId}`]);
    }
  }

  // Delete
  deleteRecipe() {
    if (this.recipeId && confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(this.recipeId).then(() => {
        console.log('Recipe deleted');
        this.router.navigate(['/recipes']);
      }).catch(error => {
        console.error('Error deleting recipe:', error);
      });
    }
  }
}
