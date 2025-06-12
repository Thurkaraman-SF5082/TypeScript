import { User, MedicineInfo, Order, orderStatus } from "./model";

export let UserArrayList: Array<User> = new Array<User>();

UserArrayList.push(new User("Ravi", "ravi@gmail.com", "Ravi@1", "9789011226"));
UserArrayList.push(new User("Baskaran", "baskaran@gmail.com", "Baskaran@1", "9445153060"));

export let MedicineList: Array<MedicineInfo> = new Array<MedicineInfo>();

MedicineList.push(new MedicineInfo("Mobile (Samsung)", 10, 10000, 3));
MedicineList.push(new MedicineInfo("Tablet (Lenovo)", 5, 15000, 2));
MedicineList.push(new MedicineInfo("Camara (Sony)", 3, 20000, 4));
MedicineList.push(new MedicineInfo("iPhone", 5, 50000, 6));
MedicineList.push(new MedicineInfo("Laptop (Lenovo I3)", 3, 40000, 3));
MedicineList.push(new MedicineInfo("HeadPhone (Boat) ", 5, 1000, 2));
MedicineList.push(new MedicineInfo("Speakers (Boat)", 4, 500, 2));

export let OrderList: Array<Order> = new Array<Order>();
OrderList.push(new Order("PID101","Mobile (Samsung)","UID1001", 20000,2, orderStatus.cancelled,new Date(2025,5,20)));
OrderList.push(new Order("PID102","Tablet (Lenovo)","UID1002", 30000,2, orderStatus.purchased,new Date(2024,10,10)));
OrderList.push(new Order("PID103","Camara (Sony)","UID1001", 80000,4, orderStatus.purchased,new Date(2024,10,10)));