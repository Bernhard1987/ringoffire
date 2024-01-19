import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-7fb78","appId":"1:44257950141:web:1489bda551a50467ab3ad4","storageBucket":"ring-of-fire-7fb78.appspot.com","apiKey":"AIzaSyBAxKnwIYEHbcdnmNzVbj5bkYgVEH0d5mk","authDomain":"ring-of-fire-7fb78.firebaseapp.com","messagingSenderId":"44257950141"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
