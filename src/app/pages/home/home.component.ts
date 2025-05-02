import { Component, inject, OnInit } from '@angular/core';
import { Book, BookService } from '../../services/book.service';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [BookCardComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  bookService = inject(BookService)
  books:Book[] = []
  ngOnInit(): void {
    this.onGetAllBooks()
  }

  onGetAllBooks(){
    this.bookService.httpGetAllBooks().subscribe({
      next:(res)=>{
        this.books = res.data        
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
