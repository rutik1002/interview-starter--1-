import { bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from "@angular/router";

import { StoreModule, provideStore } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AppComponent } from "@app/app.component";
import { AppRoutes } from "@app/app-router";
import { UsersEffects } from "@app/_state/users/users-effects";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CommonIntercept } from "@app/_shared/interceptor/common-interceptor";
import { UsersReducer } from "@app/_state/users/users-store";

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(AppRoutes),
        provideStore(),
        importProvidersFrom(BrowserAnimationsModule,
            HttpClientModule,
            EffectsModule.forRoot([UsersEffects]),
            StoreModule.forRoot({ usersReducer: UsersReducer })
        ),
        { provide: HTTP_INTERCEPTORS, useClass: CommonIntercept, multi: true }
    ]
});