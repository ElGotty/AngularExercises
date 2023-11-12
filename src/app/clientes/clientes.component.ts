import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ClientePage } from './clientePage';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  clientes: ClientePage;
  
  pageNumber: number;
  pageSize: number;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.pageNumber = params['page'] > 0 ? params['page']-1 : 0;
      this.pageSize = params['pageSize'] ?? 5;
    });

    this.getClients();
  }

  getClients(pageNumber: number = this.pageNumber, pageSize: number = this.pageSize): void{
    this.clienteService.getClientes(pageNumber, pageSize).subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.getClients();
            swalWithBootstrapButtons.fire(
              'Cliente eliminado!',
              `Cliente ${cliente.nombre} eliminado con exito.`,
              'success'
            )
          }
        )
        
      } 
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageNumber = e.pageIndex;
    this.getClients();
  }


}
