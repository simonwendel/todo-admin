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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ButtonModule, DataTableModule, DialogModule, SharedModule} from 'primeng/primeng';

import {AppComponent} from './app.component';
import {MockAuthenticationStorageService} from './mocks';
import {AuthenticationService, AuthenticationStorageService} from './shared';
import {AuthenticationListComponent} from './authentication-list';
import {AuthenticationDialogService, AuthenticationDialogComponent} from './authentication-dialog';

describe('compiled: AppComponent', () => {

    let sut: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, AuthenticationListComponent, AuthenticationDialogComponent],
            imports: [FormsModule, BrowserAnimationsModule, SharedModule, DataTableModule, ButtonModule, DialogModule],
            providers: [
                {provide: AuthenticationStorageService, useClass: MockAuthenticationStorageService},
                AuthenticationService,
                AuthenticationDialogService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        sut = fixture.debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('(compiling) should be compiling the app and dependencies.', () => {
        expect(sut).toBeTruthy();
    });
});
