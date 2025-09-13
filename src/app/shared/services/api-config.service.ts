import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  private readonly API_BASE = environment.API_ROOT;
  private readonly API_BASE_AUTH = `${this.API_BASE}/auth-identity/v1`;
  private readonly API_BASE_FINANCE = `${this.API_BASE}/finance/v1`;
  private readonly API_BASE_PROMOTION = `${this.API_BASE}/promotion/v1`;
  private readonly API_BASE_HOTEL = `${this.API_BASE}/hotel/v1`;
  private readonly API_BASE_REVIEWS = `${this.API_BASE}/reviews/v1`;
  private readonly API_BASE_RESTAURANT = `${this.API_BASE}/restaurant/v1`;

  // auth
  public readonly API_AUTH = `${this.API_BASE_AUTH}/auth`;
  public readonly API_CUSTOMERS = `${this.API_BASE_AUTH}/customers`;

  // Hotel endpoints
  public readonly API_HOTEL = `${this.API_BASE_HOTEL}/hotels`;
  public readonly API_HOTEL_ROOMS = `${this.API_BASE_HOTEL}/rooms`;
  public readonly API_HOTEL_RESERVATIONS = `${this.API_BASE_HOTEL}/reservations`;

  // restaurant
  public readonly API_RESTAURANT = `${this.API_BASE_RESTAURANT}/restaurants`;
  public readonly API_RESTAURANT_DISHES = `${this.API_BASE_RESTAURANT}/dishes`;

  //finance
  public readonly API_PAY_EMPLOYEES = `${this.API_BASE_FINANCE}/payments/employees`;
  public readonly API_BILL = `${this.API_BASE_FINANCE}/bills`;
  public readonly API_EXPORT = `${this.API_BASE_FINANCE}/exports`;


  // promotions
  public readonly API_PROMOTION = `${this.API_BASE_PROMOTION}/promotions`;

  // reviews
  public readonly API_REVIEWS = `${this.API_BASE_REVIEWS}/reviews`;
  public readonly API_REVIEWS_HOTEL = `${this.API_REVIEWS}/hotel`;
  public readonly API_REVIEWS_RESTAURANT = `${this.API_REVIEWS}/restaurant`;
  public readonly API_REVIEWS_ROOM = `${this.API_REVIEWS}/room`;
  public readonly API_REVIEWS_DISHES = `${this.API_REVIEWS}/dishes`;

  /**
   * eliminar xd
   */
  private readonly API_BASE_EMPLOYEE = `${this.API_BASE}/auth-identity/v1`;
  private readonly API_BASE_PHARMACY = `${this.API_BASE}/rx/v1`;
  private readonly API_BASE_WARD = `${this.API_BASE}/ward/v1`;

  //employees
  public readonly API_AREA = `${this.API_BASE_EMPLOYEE}/areas`;
  public readonly API_EMPLOYEE = `${this.API_BASE_EMPLOYEE}/employees`;
  public readonly API_CONTRACT = `${this.API_BASE_EMPLOYEE}/contracts`;
  public readonly API_VACATION = `${this.API_BASE_EMPLOYEE}/vacations`;
  public readonly API_PAYMENT = `${this.API_BASE_EMPLOYEE}/payments`;

  //pharmacy
  API_MEDICINE = `${this.API_BASE_PHARMACY}/medicines`;
  API_PURCHES = `${this.API_BASE_PHARMACY}/purchaches`;
  API_SALES = `${this.API_BASE_PHARMACY}/sales`;

  //users
  API_USER = `${this.API_BASE_AUTH}/user`;
  API_ROL = `${this.API_BASE_AUTH}/roles`;

  //ward
  API_PATIENT = `${this.API_BASE_WARD}/patients`;
  API_BILL_ITEMS = `${this.API_BASE_WARD}/bill-items`;

  API_ROOM = `${this.API_BASE_WARD}/rooms`;
  API_ASSIGNED_EMPLOYEE = `${this.API_BASE_WARD}/assigned-employees`;
  API_SURGERY_SPECIALISTS = `${this.API_BASE_WARD}/surgery-specialists`;
  API_TARIFF = `${this.API_BASE_WARD}/tariffs`;
}
