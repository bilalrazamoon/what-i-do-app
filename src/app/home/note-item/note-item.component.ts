import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit, OnDestroy {
  @Input() note;
  @Output() onPin = new EventEmitter();
  @Output() onUnPin = new EventEmitter();
  @Output() onComplete = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  togglePin() {
    if (this.note.pinned) {
      this.onUnPin.emit(this.note);
    } else {
      this.onPin.emit(this.note);
    }
  }

  complete() {
    this.onComplete.emit(this.note);
  }

  remove() {
    this.onRemove.emit(this.note);
  }

}
