import { CommonModule } from '@angular/common';
import { Component ,Input, Output,EventEmitter} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-applyform',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule,ReactiveFormsModule,],
  templateUrl: './applyform.component.html',
  styleUrl: './applyform.component.css'
})
export class ApplyformComponent {


  @Output() cancel = new EventEmitter<void>();

  constructor(){}

  closeModal(){
    this.cancel.emit();
  }
}
