import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { QuestionPageModule } from '../question/question.module';
import { QuestionPage } from '../question/question';

@NgModule({
    declarations: [HomePage],
    imports: [QuestionPageModule, IonicPageModule.forChild(HomePage)],
    exports: [HomePage]
})
export class HomeModule { }
