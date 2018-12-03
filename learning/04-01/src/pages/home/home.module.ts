import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { QuestionPageModule } from './question/question.module';
import { QuestionPage } from './question/question';
import { DetailsPageModule } from './details/details.module';

@NgModule({
    declarations: [HomePage],
    imports: [
        QuestionPageModule,
        DetailsPageModule,
        IonicPageModule.forChild(HomePage)
    ],
    exports: [HomePage,
        QuestionPageModule,
        DetailsPageModule
    ]
})
export class HomeModule { }
