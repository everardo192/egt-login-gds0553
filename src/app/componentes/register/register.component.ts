import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../interfaces/auth';
import { Router, response } from 'express';
import { error } from 'console';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm = this.fb.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]


  });

  constructor(private fb:FormBuilder, private authService: AuthService, private messageService: MessageService ){
    
  }

  get email() {
    return this.registerForm.controls['email']
  }

  get fullname() {
    return this.registerForm.controls['fullname']
  }

  get password() {
    return this.registerForm.controls['password']
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword']
  }



  enviarUsuario(){
    console.log("Estoy enviando datos");

    const datos = {...this.registerForm.value}
    delete datos.confirmPassword;

    this.authService.registerUser(datos as User).subscribe(
      response =>{
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Registro Exitoso', 
          detail: 'El usuario ha sido registrado con Exito' });
      },
      error => {

      }
    )
  }
}