import { Component, OnInit, OnDestroy, HostBinding, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';

interface User {
  name: string;
  image: string;
  email: string;
}

interface Note {
  created_at: number;
  created_by: string;
  text: string;
  pinned: string;
  completed: string;
  deleted: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  profileMenu: boolean;
  uid: string;
  user: User;
  user$: FirebaseObjectObservable<User>;
  userSubscribtion: Subscription;
  notes: Array<Note> = [];
  pinnedNotes: Array<Note> = [];
  otherNotes: Array<Note> = [];
  notes$: FirebaseListObservable<Note[]>;
  notesSubscription: Subscription;

  constructor(private router: Router, private af: AngularFire) {
    this.uid = af.auth.getAuth().uid;
    this.user$ = this.af.database.object(`/users/${this.uid}`);
    this.notes$ = this.af.database.list('/notes', {
      query: {
        limitToLast: 50
      }
    });
  }

  ngOnInit() {
    this.notesSubscription = this.notes$.subscribe((notes) => {
      this.notes = notes;
      this.notes = notes.sort((noteA, noteB) => (noteB.created_at - noteA.created_at));
      this.pinnedNotes = this.notes.filter(note => note.pinned);
      this.otherNotes = this.notes.filter(note => !note.pinned);
    });
    this.userSubscribtion = this.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.notesSubscription.unsubscribe();
    this.userSubscribtion.unsubscribe();
  }

  createNote(note: string) {
    this.notes$.push(note);
  }

  isPinNotes() {
    return this.pinnedNotes.length > 0;
  }

  pinNote(note) {
    this.notes$.update(note, {pinned: true});
  }

  unPinNote(note) {
    this.notes$.update(note, {pinned: false});
  }

  logout() {
    this.af.auth.logout().then(_ => this.router.navigate(['/login']));
  }

  hideProfileMenu() {
    if (this.profileMenu) {
      this.profileMenu = false;
    }
  }

}
