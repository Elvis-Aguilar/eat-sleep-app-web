import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { RoleDto, UserEmployeeDto } from '../../models/users.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ModalMsgComponent } from '@shared/components/modal-msg/modal-msg.component';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, ModalMsgComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  @ViewChild('modal1') modalRef2!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal3') modalUpdateSalaryRef!: ElementRef<HTMLDialogElement>;


  private readonly _userService = inject(UsersService);

  classSucces = 'text-purple-700 text-lg'
  classError = 'text-red-700 text-lg'
  classWarning = 'text-yellow-700 text-lg'
  calssValue = ''
  titleModal = ''
  contentModal = ''

  users: UserEmployeeDto[] = [];
  roles: RoleDto[] = []
  active: boolean = true
  userId: number = 0;
  roleId: number = 0;

  ngOnInit() {
    this.getActiveTrue()
    this.getAllRoles()
  }

  getAllRoles() {
    this._userService.getAllRoles().subscribe({
      next: value => {
        this.roles = value
      }
    })
  }


  getActiveFalse() {
    this.active = false;
    this._userService.findAllEmployeesWithActiveTrueUser().subscribe({
      next: value => {
        this.users = value
      }
    })

  }

  getActiveTrue() {
    this.active = true
    this._userService.findAllEmployeesWithActiveFalseUser().subscribe({
      next: value => {
        this.users = value
      }
    })

  }

  getState(isActiv: boolean) {
    return isActiv ? 'Si' : 'No'
  }

  updateActive(acti: boolean, userId: number) {
    this._userService.updateUserActive(userId, acti).subscribe({
      next: value => {
        this.calssValue = this.classSucces
        this.titleModal = 'Actalizacion de Usuario'
        this.contentModal = 'El estado del usario se actualizo exitosamente'
        this.getActiveTrue()
        this.modalRef2.nativeElement.showModal();
      },
      error: err => {
        this.calssValue = this.classError
        this.titleModal = 'Error al Actualizar estado'
        this.contentModal = err.error.message
        this.modalRef2.nativeElement.showModal();
      }
    })
  }

  showModalUpdateRole(userId: number) {
    this.userId = Number(userId)
    this.roleId = 0
    this.modalUpdateSalaryRef.nativeElement.showModal();

  }

  closeModalUpdatRoles() {
    this.modalUpdateSalaryRef.nativeElement.close();
  }

  updateRole() {

    this._userService.updateUserRole(this.userId, this.roleId).subscribe({
      next: value => {
        this.calssValue = this.classSucces
        this.titleModal = 'Actalizacion de Rol'
        this.contentModal = 'El Rol del usario se actualizo exitosamente'
        this.modalUpdateSalaryRef.nativeElement.close();
        this.getActiveTrue()
        this.modalRef2.nativeElement.showModal();
      },
      error: err => {
        this.calssValue = this.classError
        this.titleModal = 'Error al Actualizar Rol'
        this.contentModal = err.error.message
        this.modalUpdateSalaryRef.nativeElement.close();
        this.modalRef2.nativeElement.showModal();
      }
    })

  }


}
