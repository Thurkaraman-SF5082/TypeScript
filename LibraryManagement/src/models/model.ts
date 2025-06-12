let UserIdAutoIncrement = 1000;
let BookIdAutoIncrement = 100;
let BorrowIdAutoIncrement = 2000;

export class User {
    userId: string = "UID" + UserIdAutoIncrement++;
    amount: number = 0;
    // Define properties directly in the constructor
    constructor(public name: string, public email: string, public password: string, public userPhoneNumber: string, public userDepartment: string) {
        this.userId = "UID" + UserIdAutoIncrement++;
    }
}
export class BookInfo {

    bookId: string;
    bookName: string;
    authorName: string;
    availability: availabilityDetails;

    constructor(bookName: string, authorName: string, availability: availabilityDetails) {
        this.bookId = "BID" + BookIdAutoIncrement++;
        this.bookName = bookName;
        this.authorName = authorName;
        this.availability = availability;
    }

}
export enum borrowedStatus {
    default = 'Default',
    borrowed = 'Borrowed',
    returned = 'Returned'
}
export enum availabilityDetails {
    default = 'Default',
    available = 'Available',
    damaged = 'Damaged',
    issued = 'Issued'
}

export class Borrow {
    borrowId: string;
    bookId: string;
    userId: string;
    borrowDate: Date;
    borrowStatus: borrowedStatus;
    fineAmount: number;

    constructor(bookId: string, userID: string, borrowDate: Date, borrowStatus: borrowedStatus, fineAmount: number) {
        this.borrowId = "OID" + BorrowIdAutoIncrement++;
        this.bookId = bookId;
        this.userId = userID;
        this.borrowDate = borrowDate;
        this.borrowStatus = borrowStatus;
        this.fineAmount = fineAmount;
    }
}