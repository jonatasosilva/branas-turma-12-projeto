export default interface PassengerRepository {
    save(passenger: any): Promise<void>;
    get(passengerId: string): Promise<any>;
}