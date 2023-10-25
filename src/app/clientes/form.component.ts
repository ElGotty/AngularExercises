import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit{
  public cliente: Cliente = new Cliente();
  public titulo:string = "Crear cliente";
  public errores: string[];

  constructor(private clienteService: ClienteService,
   private router: Router,
   private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente():void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe(
          cliente => this.cliente = cliente
        )
      }
    })
  }
  

  create(): void{
    this.clienteService.create(this.cliente).subscribe({
      next: (json) => {
        this.router.navigate(['/clientes']);
        Swal.fire('Nuevo cliente', `Cliente ${json.cliente.nombre} creado con exito`, 'success');
      },
      error: (err) => {
        this.errores = err.error.errors as string[];
      }
    }
      
    )
  }

  update():void{
    this.clienteService.update(this.cliente).subscribe({
      next:(cliente) => {
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente actualizado', `Cliente ${cliente.nombre} actualizado con exito`, 'success')
      },
      error: (err) => {
        this.errores = err.error.errors as string[];
      }
    }
      
    )
  }
  

}
