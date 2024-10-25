import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;
  currentUserId: string | null = null;

  constructor(private recipeService: RecipeService, private authService: AuthService, private router: Router) {
    this.recipes$ = this.recipeService.getRecipes();
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUserId = user?.uid || null;
    });
  }

  viewRecipe(id: string) {
    this.router.navigate([`/recipes/${id}`]);
  }

  // Edit
  editRecipe(id: string) {
    if (id) {
      this.router.navigate([`/recipes/edit/${id}`]);
    }
  }

  // Delete
  deleteRecipe(id: string) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(id).then(() => {
        console.log('Recipe deleted');
        this.router.navigate([`/recipes`]);
      }).catch(error => {
        console.error('Error deleting recipe:', error);
      });
    }
  }
}
