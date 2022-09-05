import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { SecureComponent } from './secure.component';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RolesComponent } from './roles/roles.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { RoleCreateComponent } from './roles/role-create/role-create.component';
import { ArticlesComponent } from './articles/articles.component';
import { CategoriesComponent } from './categories/categories.component';
import { TagsComponent } from './tags/tags.component';
import { SettingsComponent } from './settings/settings.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { TagEditComponent } from './tags/tag-edit/tag-edit.component';
import { TagCreateComponent } from './tags/tag-create/tag-create.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ArticleCreateComponent } from './articles/article-create/article-create.component';
import { ArticleEditComponent } from './articles/article-edit/article-edit.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { PhotosComponent } from './galleries/photos/photos.component';
import { GalleriesComponent } from './galleries/galleries.component';
import { PhotoCreateComponent } from './galleries/photos/photo-create/photo-create.component';
import { PhotoEditComponent } from './galleries/photos/photo-edit/photo-edit.component';
import { ProductsComponent } from './products/products.component';
import { PartnersComponent } from './partners/partners.component';
import { PortfoliosComponent } from './portfolios/portfolios.component';
import { MvolaiservComponent } from './mvolaiserv/mvolaiserv.component';
import { MvolaiservCreateComponent } from './mvolaiserv/mvolaiserv-create/mvolaiserv-create.component';
import { MvolaiservEditComponent } from './mvolaiserv/mvolaiserv-edit/mvolaiserv-edit.component';
import { PortfolioCreateComponent } from './portfolios/portfolio-create/portfolio-create.component';
import { PortfolioEditComponent } from './portfolios/portfolio-edit/portfolio-edit.component';
import { PartnerCreateComponent } from './partners/partner-create/partner-create.component';
import { PartnerEditComponent } from './partners/partner-edit/partner-edit.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';


@NgModule({
  declarations: [
    SecureComponent,
    NavComponent,
    MenuComponent,
    DashboardComponent,
    UsersComponent,
    FooterComponent,
    ProfileComponent,
    UserCreateComponent,
    UserEditComponent,
    RolesComponent,
    RoleEditComponent,
    RoleCreateComponent,
    ArticlesComponent,
    CategoriesComponent,
    TagsComponent,
    SettingsComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    TagEditComponent,
    TagCreateComponent,
    PaginatorComponent,
    ArticleCreateComponent,
    ArticleEditComponent,
    ImageUploadComponent,
    PhotosComponent,
    GalleriesComponent,
    PhotoCreateComponent,
    PhotoEditComponent,
    ProductsComponent,
    PartnersComponent,
    PortfoliosComponent,
    MvolaiservComponent,
    MvolaiservCreateComponent,
    MvolaiservEditComponent,
    PortfolioCreateComponent,
    PortfolioEditComponent,
    PartnerCreateComponent,
    PartnerEditComponent,
    ProductCreateComponent,
    ProductEditComponent
  ],
  exports: [SecureComponent],
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule,
    AngularEditorModule,
    HttpClientModule
  ],
})
export class SecureModule {}
