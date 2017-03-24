import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit, OnDestroy {
  @Output() value: string;
  @Output() onDone = new EventEmitter();

  constructor(private auth: AngularFireAuth) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  onEnter() {
    if (this.value) {
      const uid = this.auth.getAuth().uid;
      this.onDone.emit({
        created_at: Date.now(),
        created_by: uid || '',
        pinned: false,
        text: this.value || ''
      });
      this.value = '';
    }
  }

}
