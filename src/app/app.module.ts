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
import { TrackingMainComponent } from './tracking/tracking-main/tracking-main.component';
import { ReportingMainComponent } from './reporting/reporting-main/reporting-main.component';
import { AccountingMainComponent } from './accounting/accounting-main/accounting-main.component';
import { SingleShipmentComponent } from './tracking/single-shipment/single-shipment.component';
import { MultipleShipmentComponent } from './tracking/multiple-shipment/multiple-shipment.component';
import { UpdateShipmentComponent } from './tracking/update-shipment/update-shipment.component';
import { DetailedReportComponent } from './reporting/detailed-report/detailed-report.component';
import { CreateAccountComponent } from './accounting/create-account/create-account.component';
import { CreateInvoiceComponent } from './accounting/create-invoice/create-invoice.component';
import { SuccessfulDeliveryComponent } from './accounting/successful-delivery/successful-delivery.component';
import { DeliveredReportingComponent } from './reporting/delivered-reporting/delivered-reporting.component';
import { CreateInventoryComponent } from './inventory/create-inventory/create-inventory.component';
import { OutFromInventoryComponent } from './inventory/out-from-inventory/out-from-inventory.component';
import { LoginComponent } from './view/login/login.component';

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
    DeleteThirdpartyShipmentComponent,
    TrackingMainComponent,
    ReportingMainComponent,
    AccountingMainComponent,
    SingleShipmentComponent,
    MultipleShipmentComponent,
    UpdateShipmentComponent,
    DetailedReportComponent,
    CreateAccountComponent,
    CreateInvoiceComponent,
    SuccessfulDeliveryComponent,
    DeliveredReportingComponent,
    CreateInventoryComponent,
    OutFromInventoryComponent,
    LoginComponent
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
