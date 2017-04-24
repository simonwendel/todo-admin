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

import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TestBed, async} from '@angular/core/testing';

import {SharedModule, DataTableModule, ButtonModule, DialogModule} from 'primeng/primeng';

import {AppComponent} from './app.component';
import {AuthenticationListComponent, AuthenticationDialogComponent} from './authentication-list';
import {AuthenticationService} from './shared';
import {MockAuthenticationService} from './mocks/authentication.mock.service';

describe('component, compiled: AppComponent', () => {

    let sut: AppComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, AuthenticationListComponent, AuthenticationDialogComponent],
            imports: [FormsModule, BrowserAnimationsModule, SharedModule, DataTableModule, ButtonModule, DialogModule],
            providers: [{provide: AuthenticationService, useClass: MockAuthenticationService}]
        }).compileComponents();
    }));

    beforeEach(() => {
        const fixture = TestBed.createComponent(AppComponent);
        sut = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('(compiling) should be compiling the app and dependencies.', () => {
        expect(sut).toBeTruthy();
    });
});
