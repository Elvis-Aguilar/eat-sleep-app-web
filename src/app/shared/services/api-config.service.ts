import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiConfigService {

    private readonly API_BASE = environment.API_ROOT;
    private readonly API_BASE_AUTH = `${this.API_BASE}/auth-identity/v1`
    private readonly API_BASE_EMPLOYEE = `${this.API_BASE}/auth-identity/v1`
    private readonly API_BASE_FINANCE = `${this.API_BASE}/finance/v1`
    private readonly API_BASE_PHARMACY = `${this.API_BASE}/rx/v1`
    private readonly API_BASE_WARD = `${this.API_BASE}/ward/v1`


    public readonly API_AUTH = `${this.API_BASE_AUTH}/auth`;

    //employees
    public readonly API_AREA = `${this.API_BASE_EMPLOYEE}/areas`
    public readonly API_EMPLOYEE = `${this.API_BASE_EMPLOYEE}/employees`
    public readonly API_CONTRACT = `${this.API_BASE_EMPLOYEE}/contracts`
    public readonly API_VACATION = `${this.API_BASE_EMPLOYEE}/vacations`
    public readonly API_PAYMENT = `${this.API_BASE_EMPLOYEE}/payments`

    //finance
    public readonly API_PAY_EMPLOYEES = `${this.API_BASE_FINANCE}/payments/employees`

    //pharmacy
    API_MEDICINE = `${this.API_BASE_PHARMACY}/medicines`;
    API_PURCHES = `${this.API_BASE_PHARMACY}/purchaches`;
    API_SALES = `${this.API_BASE_PHARMACY}/sales`;

    //users
    API_USER = `${this.API_BASE_AUTH}/user`;
    API_ROL = `${this.API_BASE_AUTH}/roles`;

    //ward
    API_PATIENT = `${this.API_BASE_WARD}/patients`
    API_BILL_ITEMS = `${this.API_BASE_WARD}/bill-items`


    API_ROOM = `${this.API_BASE_WARD}/rooms`
    API_ASSIGNED_EMPLOYEE = `${this.API_BASE_WARD}/assigned-employees`
    API_SURGERY_SPECIALISTS = `${this.API_BASE_WARD}/surgery-specialists`
    API_TARIFF = `${this.API_BASE_WARD}/tariffs`
}