import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyNewShipmentComponent } from './shipping/my-new-shipment/my-new-shipment.component';
import { B2bNewShipmentComponent } from './shipping/b2b-new-shipment/b2b-new-shipment.component';
import { ShippingMainComponent } from './shipping/shipping-main/shipping-main.component';
import { BasicViewComponent } from './view/basic-view/basic-view.component';
import { AdvancedViewComponent } from './view/advanced-view/advanced-view.component';
import { ShippingNavbarComponent } from './shipping/shipping-navbar/shipping-navbar.component';
import { MenubarComponent } from './main-menu/menubar/menubar.component';
import { TopbarComponent } from './main-menu/topbar/topbar.component';
import { FooterComponent } from './main-menu/footer/footer.component';
import { CreateThirdrdpartyShipmentComponent } from './shipping/create-thirdrdparty-shipment/create-thirdrdparty-shipment.component';
import { ShipmentListComponent } from './shipping/shipment-list/shipment-list.component';
import { ShipmentBatchUploadComponent } from './shipping/shipment-batch-upload/shipment-batch-upload.component';
import { DeleteShipmentComponent } from './shipping/delete-shipment/delete-shipment.component';
import { DeleteThirdpartyShipmentComponent } from './shipping/delete-thirdparty-shipment/delete-thirdparty-shipment.component';

@NgModule({
  declarations: [
    AppComponent,
    MyNewShipmentComponent,
    B2bNewShipmentComponent,
    ShippingMainComponent,
    BasicViewComponent,
    AdvancedViewComponent,
    ShippingNavbarComponent,
    MenubarComponent,
    TopbarComponent,
    FooterComponent,
    CreateThirdrdpartyShipmentComponent,
    ShipmentListComponent,
    ShipmentBatchUploadComponent,
    DeleteShipmentComponent,
    DeleteThirdpartyShipmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
