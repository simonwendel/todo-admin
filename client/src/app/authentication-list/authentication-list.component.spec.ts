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
import {stub} from 'sinon';

import {AuthenticationListComponent} from './authentication-list.component';
import {AuthenticationService, Authentication} from '../shared';

describe('component: AuthenticationListComponent', () => {

    let sut: AuthenticationListComponent;
    let fixture: ComponentFixture<AuthenticationListComponent>;

    let service: any;
    let items: Authentication[];

    beforeEach(() => {
        items = [];
        service = {
            getAll: stub().returns(items)
        };
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthenticationListComponent],
            providers: [{provide: AuthenticationService, useValue: service}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthenticationListComponent);
        sut = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('should retrieve all authentication items from the backend.', () => {
        expect(sut.items).toEqual(items);
        expect(service.GetAll.called).toBeTruthy();
    });
});
