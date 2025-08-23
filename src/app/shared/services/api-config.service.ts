import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiConfigService {

    private readonly API_BASE = environment.API_ROOT;
    private readonly API_BASE_AUTH = `${this.API_BASE}/gatekeeper/v1`
    private readonly API_BASE_EMPLOYEE = `${this.API_BASE}/hr/v1`
    private readonly API_BASE_PHARMACY = `${this.API_BASE}/rx/v1`
    private readonly API_BASE_WARD = `${this.API_BASE}/ward/v1`


    API_AUTH = `${this.API_BASE_AUTH}/auth`;

    //employees
    API_AREA = `${this.API_BASE_EMPLOYEE}/areas`
    API_EMPLOYEE = `${this.API_BASE_EMPLOYEE}/employees`
    API_CONTRACT = `${this.API_BASE_EMPLOYEE}/contracts`
    API_VACATION = `${this.API_BASE_EMPLOYEE}/vacations`
    API_PAYMENT = `${this.API_BASE_EMPLOYEE}/payments`

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