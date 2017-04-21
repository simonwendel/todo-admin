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

import {async, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {SharedModule, DataTableModule} from 'primeng/primeng';

import {AuthenticationListComponent} from './authentication-list.component';
import {AuthenticationService, Authentication} from '../shared';
import {MockAuthenticationService} from '../mocks/authentication.mock.service';
import {DebugElement} from '@angular/core';

describe('component: AuthenticationListComponent', () => {

    let sut: AuthenticationListComponent;

    let service: any;

    beforeEach(() => {
        service = new MockAuthenticationService();
        sut = new AuthenticationListComponent(service);
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthenticationListComponent],
            imports: [SharedModule, DataTableModule],
            providers: [{provide: AuthenticationService, useClass: MockAuthenticationService}]
        }).compileComponents();
    }));

    it('(ctor) should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(ctor) should retrieve no authentication items when constructed.', () => {
        expect(sut.items).toEqual([]);
        expect(service.getAll.called).toBeFalsy();
    });

    it('(ngOnInit) should retrieve authentication items when when calling ngOnInit.', () => {
        sut.ngOnInit();

        expect(sut.items).toEqual(service.items);
        expect(service.getAll.calledOnce).toBeTruthy();
    });

    it('(html) should have a p-datatable containing items from the auth service.', () => {
        const fixture = TestBed.createComponent(AuthenticationListComponent);
        const component = fixture.debugElement;
        fixture.detectChanges();

        expect(getTableElements(component).length).toBe(1);
        expect(getAccountNamesFromTables(component))
            .toEqual(service.items.map((item: Authentication) => item.accountName));
    });

    function getTableElements(component: DebugElement): Array<DebugElement> {
        return component.queryAll(By.css('p-datatable'));
    }

    function getAccountNamesFromTables(component: DebugElement): Array<string> {
        return component
            .queryAll(By.css('p-datatable td.data-account-name span.ui-cell-data'))
            .map((node) => node.nativeElement.innerText);
    }
});
