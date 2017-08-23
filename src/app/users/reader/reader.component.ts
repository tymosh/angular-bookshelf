import { Component, OnInit } from '@angular/core';
import { Reader } from '../../shared/models/reader.model';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { Bookshelf } from '../../shared/models/bookshelf.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  reader: Reader = null;

  constructor(private authService: AuthService,
              private dsService: DataStorageService) {
  }

  ngOnInit() {
    const authUser = this.authService.getUser();
    const userUid = authUser.uid;
    const rawReader = {
      id: userUid,
      fullName: authUser.displayName,
      login: authUser.email,
      imageUrl: authUser.photoURL,
      bookshelves: []
    };
    this.dsService.loadUserBookshelves(userUid)
      .subscribe(
        (response) => {
          rawReader.bookshelves = response.json();
          this.reader = new Reader(rawReader);
          console.log(this.reader);
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
