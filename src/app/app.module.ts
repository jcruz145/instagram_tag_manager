import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 


import { AppComponent } from './app.component';
import { TagDatabaseService } from './tag-database.service';
import { TagManagerComponent } from './tag-manager/tag-manager.component';


@NgModule({
  declarations: [
    AppComponent,
    TagManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TagDatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
