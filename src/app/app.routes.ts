import { Routes } from '@angular/router';
import { LayoutComponent } from './Pages/layout/layout.component';
import { HomeComponent } from './Pages/home/home.component';
import { TranlateWithTextComponent } from './Pages/Components/tranlate-with-text/tranlate-with-text.component';
import { TranlateWithImagesComponent } from './Pages/Components/tranlate-with-images/tranlate-with-images.component';
import { TranlateWithVoiceComponent } from './Pages/Components/tranlate-with-voice/tranlate-with-voice.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path: 'home',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'Text', 
                        pathMatch: 'full'
                    },
                    {
                        path: 'Text',
                        component: TranlateWithTextComponent 
                    },
                    {
                        path: 'Images',
                        component: TranlateWithImagesComponent
                    },
                    {
                        path: 'Voice',
                        component: TranlateWithVoiceComponent
                    }
                ]
            }
        ]
    },
    {    
        path: '**',
        redirectTo: 'home/Text'
      }
];
