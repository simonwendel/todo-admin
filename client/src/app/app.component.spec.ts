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
import {MockAuthenticationService} from './mocks';
import {Authentication, AuthenticationService} from './shared';
import {AuthenticationListComponent} from './authentication-list';
import {AuthenticationDialogComponent} from './authentication-dialog/authentication-dialog.component';

describe('component: AppComponent', () => {

    let sut: AppComponent;

    let service: any;

    beforeEach(() => {
        service = new MockAuthenticationService();
        sut = new AppComponent(service);
    });

    it('(ctor) should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(ctor) should retrieve no authentication items when constructed.', () => {
        expect(sut.items).toEqual([]);
        expect(service.getItems.called).toBe(false);
    });

    it('(ctor) should hide dialog on construction.', () => {
        expect(sut.showDialog).toBe(false);
    });

    it('(ngOnInit) should retrieve authentication items when when calling ngOnInit.', () => {
        sut.ngOnInit();

        expect(sut.items).toEqual(service.items);
        expect(service.getItems.calledOnce).toBe(true);
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

        expect(sut.showDialog).toBe(true);
    });
});

describe('compiled: AppComponent', () => {

    let sut: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, AuthenticationListComponent, AuthenticationDialogComponent],
            imports: [FormsModule, BrowserAnimationsModule, SharedModule, DataTableModule, ButtonModule, DialogModule],
            providers: [{provide: AuthenticationService, useClass: MockAuthenticationService}]
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

    it('(compiling) should not display dialog on first init.', () => {
        const dialog = getDialogElement();

        expect(dialog).toBeFalsy();
    });

    it('(addNew) should display dialog when add button is toggled.', () => {
        sut.addNew();
        const dialog = getDialogElement();

        expect(dialog).toBeTruthy();
    });

    function getDialogElement(): HTMLElement {
        fixture.detectChanges();
        return fixture.nativeElement.querySelector('tc-authentication-dialog');
    }
});
