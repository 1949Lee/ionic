import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmojiPickerComponent } from './components/emoji-picker';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [EmojiPickerComponent],
    imports: [ CommonModule,IonicPageModule.forChild(EmojiPickerComponent)],
    exports: [EmojiPickerComponent]
})
export class ShareModule {}
