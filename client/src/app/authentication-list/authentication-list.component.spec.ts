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
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ButtonModule, DataTableModule, DialogModule, SharedModule} from 'primeng/primeng';

import {MockAuthenticationService} from '../mocks/authentication.mock.service';
import {Authentication, AuthenticationService} from '../shared';
import {AuthenticationListComponent, AuthenticationDialogComponent} from './';

describe('component: AuthenticationListComponent', () => {

    let sut: AuthenticationListComponent;

    let service: any;

    beforeEach(() => {
        service = new MockAuthenticationService();
        sut = new AuthenticationListComponent(service);
    });

    it('(ctor) should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(ctor) should retrieve no authentication items when constructed.', () => {
        expect(sut.items).toEqual([]);
        expect(service.getAll.called).toBeFalsy();
    });

    it('(ctor) should hide dialog on construction.', () => {
        expect(sut.showDialog).toBeFalsy();
    });

    it('(ngOnInit) should retrieve authentication items when when calling ngOnInit.', () => {
        sut.ngOnInit();

        expect(sut.items).toEqual(service.items);
        expect(service.getAll.calledOnce).toBeTruthy();
    });

    it('(addNew) should unselect item from datatable.', () => {
        const previouslySelected = new Authentication();
        sut.selectedItem = previouslySelected;

        sut.addNew();

        expect(sut.selectedItem).not.toBe(previouslySelected);
    });

    it('(addNew) should attach new item to selection.', () => {
        const emptyItem = new Authentication();
        sut.selectedItem = new Authentication(
            {appId: '1', accountName: '1', secret: '1'});

        sut.addNew();

        expect(sut.selectedItem).toEqual(emptyItem);
    });

    it('(addNew) should show dialog.', () => {
        sut.addNew();

        expect(sut.showDialog).toBeTruthy();
    });
});

describe('compiled: AuthenticationListComponent', () => {

    let sut: AuthenticationListComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthenticationListComponent, AuthenticationDialogComponent],
            imports: [FormsModule, BrowserAnimationsModule, SharedModule, DataTableModule, ButtonModule, DialogModule],
            providers: [{provide: AuthenticationService, useClass: MockAuthenticationService}]
        }).compileComponents();
    }));

    beforeEach(() => {
        const fixture = TestBed.createComponent(AuthenticationListComponent);
        sut = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('(compiling) should be compiling the component and dependencies.', () => {
        expect(sut).toBeTruthy();
    });
});
