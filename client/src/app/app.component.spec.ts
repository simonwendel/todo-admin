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

import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AuthenticationListComponent} from './authentication-list';
import {AuthenticationService} from './shared';
import {MockAuthenticationService} from './mocks/authentication.mock.service';

describe('component: AppComponent', () => {

    let sut: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, AuthenticationListComponent],
            providers: [{provide: AuthenticationService, useClass: MockAuthenticationService}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        sut = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('(ctor) should create the app', () => {
        expect(sut).toBeTruthy();
    });

    it('(html) should render an authentication list component.', () => {
        const compiled = fixture.debugElement;

        expect(compiled.queryAll(By.css('tc-authentication-list')).length).toBe(1);
    });
});
