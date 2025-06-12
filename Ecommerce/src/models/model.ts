let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 100;
let OrderIdAutoIncrement = 2000;

export class User {
    userId: string = "UID" + UserIdAutoIncrement++;
    amount: number = 0;
    // Define properties directly in the constructor
    constructor( public name: string, public email: string, public password: string, public userPhoneNumber: string) 
    {
        this.userId = "UID" + UserIdAutoIncrement++;
    }
}
export class MedicineInfo {

    medicineId: string;
    medicineName: string;
    medicineCount: number;
    medicinePrice: number;
    expiryDate: number

    constructor(medicineName: string, medicineCount: number, medicinePrice: number, expiryDate: number) {
        this.medicineId = "PID" + MedicineIdAutoIncrement++;
        this.medicineName = medicineName;
        this.medicineCount = medicineCount;
        this.medicinePrice = medicinePrice;
        this.expiryDate = expiryDate;
    }

}
export enum orderStatus {
    default = 'Default',
    purchased = 'Purchased',
    cancelled = 'Cancelled'
}

export  class Order {
    orderId: string;
    medicineId: string;
    medicineName: string;
    userId: string;
    totalPrice: number;
    medicineCount: number;
    purchaseStatus: orderStatus;
    orderDate: Date;

    constructor(medicineID: string,medicineName: string,userID: string,totalPrice: number , medicineCount: number,  order: orderStatus,orderDate: Date) 
    {
        this.orderId = "OID" + OrderIdAutoIncrement++;
        this.medicineId = medicineID;
        this.medicineName = medicineName;
        this.userId = userID;
        this.totalPrice = totalPrice;
        this.medicineCount = medicineCount;
        this.purchaseStatus = order;
        this.orderDate = orderDate;
    }
}