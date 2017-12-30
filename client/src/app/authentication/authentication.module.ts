/**
 * @license
 * Todo Storage for wifeys Todo app.
 * Copyright (C) 2017  Simon Wendel
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {SharedModule, DataTableModule, DialogModule, ButtonModule} from 'primeng/primeng';

import {AppConfig} from '../app.config';
import {AuthenticationComponent} from './authentication.component';
import {AuthenticationService, AuthenticationApiService, AuthenticationStorageService} from './shared';
import {MockAuthenticationStorageService} from './mocks';
import {AuthenticationListComponent} from './authentication-list';
import {AuthenticationDialogService, AuthenticationDialogComponent} from './authentication-dialog';

@NgModule({
    declarations: [
        AuthenticationComponent,
        AuthenticationListComponent,
        AuthenticationDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,

        SharedModule,
        DataTableModule,
        DialogModule,
        ButtonModule
    ],
    providers: [
        AppConfig,
        {provide: AuthenticationStorageService, useClass: MockAuthenticationStorageService},
        AuthenticationApiService,
        AuthenticationService,
        AuthenticationDialogService],
    exports: [AuthenticationComponent]
})
export class AuthenticationModule {
}
