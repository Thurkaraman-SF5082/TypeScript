import { User, BookInfo, Borrow, borrowedStatus, availabilityDetails} from "./model";

export let UserArrayList: Array<User> = new Array<User>();

UserArrayList.push(new User("Ravi", "ravi@gmail.com", "Ravi@1", "9789011226","IT"));
UserArrayList.push(new User("Baskaran", "baskaran@gmail.com", "Baskaran@1", "9445153060","ECE"));

export let BookList: Array<BookInfo> = new Array<BookInfo>();

BookList.push(new BookInfo("C#", "Author1", availabilityDetails.issued));
BookList.push(new BookInfo("HTML", "Author2", availabilityDetails.available));
BookList.push(new BookInfo("HTML1", "Author2", availabilityDetails.damaged));
BookList.push(new BookInfo("CSS", "Author1", availabilityDetails.available));
BookList.push(new BookInfo("JS", "Author1", availabilityDetails.available));
BookList.push(new BookInfo("TS", "Author2", availabilityDetails.available));
BookList.push(new BookInfo("TS1", "Author2", availabilityDetails.damaged));
BookList.push(new BookInfo("JS", "Author3", availabilityDetails.issued));

export let BorrowList: Array<Borrow> = new Array<Borrow>();
BorrowList.push(new Borrow("BID101", "UID1001", new Date(2024, 9, 10), borrowedStatus.borrowed, 0));
BorrowList.push(new Borrow("BID103", "UID1001", new Date(2024, 9, 12), borrowedStatus.borrowed, 0));
BorrowList.push(new Borrow("BID104", "UID1001", new Date(2024, 8, 14), borrowedStatus.returned, 16));
BorrowList.push(new Borrow("BID102", "UID1002", new Date(2024, 9, 11), borrowedStatus.borrowed, 0));
BorrowList.push(new Borrow("BID105", "UID1002", new Date(2024, 7, 7), borrowedStatus.returned, 20));