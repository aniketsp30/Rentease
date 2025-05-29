import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './Admin_Pages/product-list/product-list.component';
import { CreateProductComponent } from './Admin_Pages/create-product/create-product.component';
import { UpdateProductComponent } from './Admin_Pages/update-product/update-product.component';
import { ViewProductComponent } from './Admin_Pages/view-product/view-product.component';
import { ViewUserComponent } from './Admin_Pages/view-user/view-user.component';
import { UserListComponent } from './Admin_Pages/user-list/user-list.component';
import { UpdateUserComponent } from './Admin_Pages/update-user/update-user.component';
import { LoginComponent } from './User_Pages/login/login.component';
import { AdminSideComponent } from './Admin_Pages/admin-side/admin-side.component';
import { LoginAdminComponent } from './Admin_Pages/login-admin/login-admin.component';
import { UserDashboardComponent } from './User_Pages/user-dashboard/user-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterUserComponent } from './User_Pages/register-user/register-user.component';
import { CreateUserComponent } from './Admin_Pages/create-user/create-user.component';
import { RegisterAdminComponent } from './Admin_Pages/register-admin/register-admin.component';
import { ProfileComponent } from './User_Pages/profile/profile.component';
import { HomeComponent } from './User_Pages/home/home.component';
import { ListItemsComponent } from './User_Pages/list-items/list-items.component';
import { RentProductComponent } from './User_Pages/rent-product/rent-product.component';
import { DetailProductComponent } from './User_Pages/detail-product/detail-product.component';
import { RentRequestComponent } from './User_Pages/rent-request/rent-request.component';
import { RequestListComponent } from './Admin_Pages/request-list/request-list.component';
import { PaymentComponent } from './Admin_Pages/payment/payment.component';
import { CategoryProductComponent } from './User_Pages/category-product/category-product.component';

const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: AdminSideComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'products', component: ProductListComponent },
      { path: 'users', component: UserListComponent },
      { path: 'requests', component: RequestListComponent},
      { path: 'create-product', component: CreateProductComponent},
      { path: 'create-user', component: CreateUserComponent },
      { path: 'update-product/:id', component: UpdateProductComponent },
      { path: 'view-product/:id', component: ViewProductComponent },
      { path: 'update-user/:id', component: UpdateUserComponent },
      { path: 'view-user/:id', component: ViewUserComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' }
    ]
  },
  { path: 'payment',component:PaymentComponent},
  { path: 'user-login', component: LoginComponent },
  { path: 'admin-login', component: LoginAdminComponent },
  { path: 'register-admin', component: RegisterAdminComponent },
  { path: 'register-user', component: RegisterUserComponent },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'category/:categoryName', component: CategoryProductComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'home', component: HomeComponent },
      { path: 'items', component: ListItemsComponent },
      { path: 'request-list',component:RentRequestComponent},
      { path: 'view/:id', component: DetailProductComponent }, 
      { path: 'rent/:id', component: RentProductComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'user-login', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
