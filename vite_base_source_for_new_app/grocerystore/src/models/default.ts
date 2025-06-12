import { User, MedicineInfo, Order, orderStatus } from "./model";

export let UserArrayList: Array<User> = new Array<User>();

UserArrayList.push(new User("Ravi", "ravi@gmail.com", "Ravi@1", "9789011226"));
UserArrayList.push(new User("Baskaran", "baskaran@gmail.com", "Baskaran@1", "9445153060"));

export let MedicineList: Array<MedicineInfo> = new Array<MedicineInfo>();

MedicineList.push(new MedicineInfo("Paracetomol", 5, 5, new Date(2025, 6, 30)));
MedicineList.push(new MedicineInfo("Colpal", 5, 5, new Date(2025, 5, 30)));
MedicineList.push(new MedicineInfo("Gelucil", 5, 40, new Date(2025, 4, 30)));
MedicineList.push(new MedicineInfo("Metrogel", 5, 50, new Date(2025, 12, 30)));
MedicineList.push(new MedicineInfo("Povidin Iodin", 5, 50, new Date(2024, 10, 30)));

export let OrderList: Array<Order> = new Array<Order>();
OrderList.push(new Order("MD101", "Paracetomol", "UID1001", 10, 2, orderStatus.cancelled, new Date(2025, 11, 13)));
OrderList.push(new Order("MD102", "Colpal", "UID1002", 10, 2, orderStatus.purchased, new Date(2024, 11, 13)));
OrderList.push(new Order("MD103", "Gelucil", "UID1002", 10, 2, orderStatus.purchased, new Date(2025, 11, 13)));
OrderList.push(new Order("MD104", "Metrogel", "UID1001", 10, 2, orderStatus.purchased, new Date(2025, 11, 13)));
OrderList.push(new Order("MD105", "Povidin Iodin", "UID1002", 10, 2, orderStatus.purchased, new Date(2025, 11, 13)));