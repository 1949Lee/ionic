import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { QuestionPageModule } from './question/question.module';
import { DetailsPageModule } from './details/details.module';
import { AnwserPageModule } from './anwser/anwser.module';

@NgModule({
    declarations: [HomePage],
    imports: [
        QuestionPageModule,
        DetailsPageModule,
        AnwserPageModule,
        IonicPageModule.forChild(HomePage)
    ],
    exports: [HomePage,
        QuestionPageModule,
        DetailsPageModule,
        AnwserPageModule
    ]
})
export class HomeModule { }
