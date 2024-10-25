import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; // Create this component for the home page
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeUploadComponent } from './components/recipe-upload/recipe-upload.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'recipes/add', component: RecipeUploadComponent },
  { path: 'recipes/edit/:id', component: RecipeEditComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
