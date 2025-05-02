import { Component, Input } from '@angular/core';
import { Book } from '../../services/book.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-book-card',
  imports: [NgIf],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  @Input({required:true}) book !: Book
}
