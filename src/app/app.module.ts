import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './Admin_Pages/product-list/product-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CreateProductComponent } from './Admin_Pages/create-product/create-product.component';
import { UpdateProductComponent } from './Admin_Pages/update-product/update-product.component';
import { ViewProductComponent } from './Admin_Pages/view-product/view-product.component';
import { AdminSideComponent } from './Admin_Pages/admin-side/admin-side.component';
import { UserListComponent } from './Admin_Pages/user-list/user-list.component';
import { ViewUserComponent } from './Admin_Pages/view-user/view-user.component';
import { UpdateUserComponent } from './Admin_Pages/update-user/update-user.component';
import { LoginComponent } from './User_Pages/login/login.component';
import { LoginAdminComponent } from './Admin_Pages/login-admin/login-admin.component';
import { UserDashboardComponent } from './User_Pages/user-dashboard/user-dashboard.component';
import { RegisterUserComponent } from './User_Pages/register-user/register-user.component';
import { NavUserComponent } from './User_Pages/nav-user/nav-user.component';
import { CreateUserComponent } from './Admin_Pages/create-user/create-user.component';
import { RegisterAdminComponent } from './Admin_Pages/register-admin/register-admin.component';
import { NavAdminComponent } from './Admin_Pages/nav-admin/nav-admin.component';
import { ProfileComponent } from './User_Pages/profile/profile.component';
import { HomeComponent } from './User_Pages/home/home.component';
import { ListItemsComponent } from './User_Pages/list-items/list-items.component';
import { RentProductComponent } from './User_Pages/rent-product/rent-product.component';
import { DetailProductComponent } from './User_Pages/detail-product/detail-product.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { RentRequestComponent } from './User_Pages/rent-request/rent-request.component';
import { RequestListComponent } from './Admin_Pages/request-list/request-list.component';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './Admin_Pages/payment/payment.component';
import { CategoryProductComponent } from './User_Pages/category-product/category-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ViewProductComponent,
    AdminSideComponent,
    UserListComponent,
    CreateUserComponent,
    ViewUserComponent,
    UpdateUserComponent,
    LoginComponent,
    LoginAdminComponent,
    UserDashboardComponent,
    RegisterAdminComponent,
    RegisterUserComponent,
    NavUserComponent,
    NavAdminComponent,
    ProfileComponent,
    HomeComponent,
    ListItemsComponent,
    RentProductComponent,
    DetailProductComponent,
    RentRequestComponent,
    RequestListComponent,
    PaymentComponent,
    CategoryProductComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    provideClientHydration(withEventReplay())

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
