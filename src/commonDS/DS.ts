export let CountryName:Array<string> =
[
"UAE",
"Saudi Arabia",
"Kuwait",
"Omani",
"Baharaini",
"Qatar"
];
export let Currency:Array<string> = 
[
"UAE - Dirham",
"Saudi Arabia- Riyal",
"Kuwait - Dinar",
"Omani - Rial",
"Baharaini - Dinar",
"Qatar - Riyal"
];

export let ServiceType:Array<string>=
[
"Document", 
"Non Document", 
"B2B", 
"eComerce", 
"Cash(Prepaid)", 
"CC(Pay in Destination)", 
"COD", 
"COR", 
"Export Documents", 
"Export Non Documents", 
"Heavy Shipment"
];

export let ShipmentStatus:Array<string> = [];
export let Role:Array<string> = 
[
"Employee",
"Contract-X",
"Customer",
"Agent",
"Driver",
"Misc"
];
export let Events:Array<string> = 
[
"Document Prepared", 
"Out For Delivery", 
"Arrived in HUB", 
"Not Delivered - Incomplete Address",
"Not Delivered - Adverse Weather",
"Not Delivered - Consignee Moved",
"Not Delivered - Consignee Schedule Delivery",
"Not Delivered - Courier Out of Time",
"Not Delivered - Inaccurate/Incomplete Address",
"Not Delivered - Miscoded",
"Not Delivered - No One Available/Home",
"Not Delivered - No Response/ Mobile switch Off",
"Not Delivered - Refused By Customer",
"Not Delivered - Unable to Locate Consignee",
"Not Delivered - Customer out of country",
"Held In Branch",
"Customer Refused",
"Customer Not Available",
"Attempted-Customer Refused",
"Attempted - No Answer / Mobile Close",
"Attempted - Address change",
"Attempted - Reschedule-Delivery",
"Attempted - Customer not available",
"Attempted-Customer Refused - Other (Request to open)",
"Attempted- Mobile Wrong",
"Attempted - Pickup from Branch",
"Attempted - Money not ready",
"Out for Delivery",
"Proof-of Delivery",
"Held From Uplift-Pending Customs",
"Held in Branch- No-Service", 
"Collection",
"Documentation prepared",
"COD Paid to Customer",
"Damaged",
"Flight Arrival",
"Held in Branch",
"Held in Customs",
"Holiday",
"In Transit Delay-Pandemic Restrictions",
"In Transit to Destination",
"Info Message Sent to Recipient",
"Misroute",
"Attempted-Courier out of Time",
"Attempted-Inaccurate / Incomplete Address",
"Attempted-Unable to Locate Consignee",
"Attempted- Customer out of Country",
"On-Hold-Prohibited/ Restricted Goods",
"On-Hold-Required Consignee ID / Tax numder",
"On-Hold-Required Commercial Invoice",
"On Hold-Requires Correct Telephone Number",
"On Hold for KYC",
"Onforwarded Via Third Party",
"Pickup Arranged",
"Pre Sort to Area",
"Released From Custom",
"RTO-Enroute",
"Scheduled for Delivery",
"Shipment Declared Lost",
"Shipment Returned to Sender",
"Shiment Returned to Sending Station",
"Shipper Contacted",
"Shipper/Receiver Initiated shipment Details Change",
"Shortlanded",
"SMS sent to Receiver with delivery advice",
"Sorted to Destination",
"Weight Variation",
"User Initiated Shipment Cancellation"
];

export class ActivityOnShipment {
  date: string;
  event: string;
  time: string;
  notes: string;
  connote: string;
  driver:string;
  updatedBy: string;
  eventLocation: string;

  constructor()
  constructor(_ac: ActivityOnShipment)
  constructor(_ac?: ActivityOnShipment) {
    this.date = _ac && _ac.date || "";
    this.event = _ac && _ac.event || "";
    this.time = _ac && _ac.time || "";
    this.notes = _ac && _ac.notes || "";
    this.connote = _ac && _ac.connote || "";
    this.driver = _ac && _ac.driver || "";
    this.updatedBy = _ac && _ac.updatedBy || "";
    this.eventLocation = _ac && _ac.eventLocation || "";
  }

}

export class Shipment {
    activity: Array<ActivityOnShipment>;
    createdOn:Date;
    createdBy: string;
    autogenerate: string;
    shipmentNo: string;
    altRefNo:string;
    /*! Sender Information */
    accountCode:string; /*! same as accountCode */
    referenceNo:string; /*! same as accountCode */
    name:string;
    country:string;
    address:string;
    city:string;
    state:string;
    postalCode:string;
    contact:string;
    phone:string;
    email:string;
    recvCountryTaxId:string;
    /*! Shipment Information */
    service: string;
    noOfItems: string;
    description: string;
    goodsValue:string;
    customValue:string;
    weight:string;
    weightUnit:string;
    cubicWeight:string;
    codAmount:string;
    currency:string;

    /*! Receiver Information */
    sku: string;
    receiverName:string;
    receiverCountry:string;
    receiverAddress:string;
    receiverCity:string;
    receiverState:string
    receiverPostalCode:string;
    receiverContact:string;
    receiverPhone:string;
    receiverEmail: string;

    constructor(_sp: Shipment ) {
        this.activity = _sp.activity;
        this.createdOn= _sp.createdOn;
        this.createdBy = _sp.createdBy;
        this.referenceNo = _sp.referenceNo;
        this.autogenerate = _sp.autogenerate;
        this.shipmentNo = _sp.shipmentNo;
        this.altRefNo = _sp.altRefNo;
        /*! Sender Information */
        this.accountCode = _sp.accountCode;
        this.name = _sp.name;
        this.country = _sp.country;
        this.address = _sp.address;
        this.city = _sp.city;
        this.state = _sp.state;
        this.postalCode = _sp.postalCode;
        this.contact = _sp.contact;
        this.phone = _sp.phone;
        this.email = _sp.email;
        this.recvCountryTaxId = _sp.recvCountryTaxId;
        /*! Shipment Information */
        this.service = _sp.service;
        this.noOfItems = _sp.noOfItems;
        this.description = _sp.description;
        this.goodsValue = _sp.goodsValue;
        this.customValue = _sp.customValue;
        this.weight = _sp.weight;
        this.weightUnit = _sp.weightUnit;
        this.cubicWeight = _sp.cubicWeight;
        this.codAmount = _sp.codAmount;
        this.currency = _sp.currency;

        /*! Receiver Information */
        this.sku = _sp.sku;
        this.receiverName = _sp.receiverName;
        this.receiverCountry = _sp.receiverCountry;
        this.receiverAddress = _sp.receiverAddress;
        this.receiverCity = _sp.receiverCity;
        this.receiverState = _sp.receiverState;
        this.receiverPostalCode = _sp.receiverPostalCode;
        this.receiverContact = _sp.receiverContact;
        this.receiverPhone = _sp.receiverPhone;
        this.receiverEmail = _sp.receiverEmail;
      }
}

export class ShipmentList {
  m_length: number;
  m_elm: Shipment[];
  constructor(_sl?: ShipmentList) {
    this.m_length = _sl && _sl.m_length || 0;
    this.m_elm = _sl && _sl.m_elm || [];
  }

  public set_length(ln: number): void {
    this.m_length = ln;
  }

  public set_elm(_sh: Shipment[]): void {
    this.m_elm = _sh;
  }
}

export class Account {
      accountCode:string;
      accountPassword:string;
      companyName:string;
      role: string;
      name:string;
      address: string;
      city:string;
      state: string;
      postalCode:string;
      country: string;
      contact:string;
      email:string;
      quotedAmount:string;
      currency:string;
      vat:string;
      tradingLicense:string;
      bankAccountNo:string;
      ibnNo:string;
      autogenerate: boolean;
      phone: string;
      recvCountryTaxId: string;

      constructor();
      constructor(_ac: Account);
      constructor(_ac?: Account) {
        this.autogenerate = _ac && _ac.autogenerate || false;
        this.accountCode = _ac && _ac.accountCode || "";
        this.accountPassword = _ac && _ac.accountPassword || "";
        this.companyName = _ac && _ac.companyName || "";
        this.role = _ac && _ac.role || "";
        this.name = _ac && _ac.name || "";
        this.address = _ac && _ac.address || "";
        this.city = _ac && _ac.city || "";
        this.state = _ac && _ac.state || "";
        this.postalCode = _ac && _ac.postalCode || "";
        this.country = _ac && _ac.country || "";
        this.contact = _ac && _ac.contact || "";
        this.phone = _ac && _ac.phone || "";
        this.email = _ac && _ac.email || "";
        this.recvCountryTaxId = _ac && _ac.recvCountryTaxId || "";
        this.quotedAmount = _ac && _ac.quotedAmount || "";
        this.currency = _ac && _ac.currency || "";
        this.vat = _ac && _ac.vat || "";
        this.tradingLicense = _ac && _ac.tradingLicense || "";
        this.bankAccountNo = _ac && _ac.bankAccountNo || "";
        this.ibnNo = _ac && _ac.ibnNo || "";
      }
      
}


export class SenderInformation {
    /*! Sender Information */
    accountCode:string; /*! same as accountCode */
    referenceNo:string; /*! same as accountCode */
    name:string;
    country:string;
    address:string;
    city:string;
    state:string;
    postalCode:string;
    contact:string;
    phone:string;
    email:string;
    recvCountryTaxId:string;
    companyName: string;
    quotedAmount:string;
    currency:string;
    vat:string;
    tradingLicense:string;
    bankAccountNo:string;
    ibnNo:string;
    
    constructor(_sp: SenderInformation ) {
        /*! Sender Information */
        this.companyName = _sp.companyName;
        this.referenceNo = _sp.referenceNo;
        this.accountCode = _sp.accountCode;
        this.name = _sp.name;
        this.country = _sp.country;
        this.address = _sp.address;
        this.city = _sp.city;
        this.state = _sp.state;
        this.postalCode = _sp.postalCode;
        this.contact = _sp.contact;
        this.phone = _sp.phone;
        this.email = _sp.email;
        this.recvCountryTaxId = _sp.recvCountryTaxId;
        this.quotedAmount = _sp.quotedAmount;
        this.currency = _sp.currency;
        this.vat = _sp.vat;
        this.tradingLicense = _sp.tradingLicense;
        this.bankAccountNo = _sp.bankAccountNo;
        this.ibnNo = _sp.ibnNo;
      }
}
