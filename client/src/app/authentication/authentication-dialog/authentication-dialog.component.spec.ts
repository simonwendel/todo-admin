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
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SharedModule, ButtonModule, DialogModule} from 'primeng/primeng';
import {spy, stub, SinonSpy, SinonStub, createStubInstance} from 'sinon';

import {MockAuthenticationStorageService} from '../mocks';
import {Authentication, AuthenticationService, AuthenticationStorageService} from '../shared';
import {AuthenticationDialogComponent} from './authentication-dialog.component';
import {AuthenticationDialogService} from './authentication-dialog.service';
import {Observable} from 'rxjs/Observable';

describe('component: AuthenticationDialogComponent', () => {

    let sut: AuthenticationDialogComponent;
    let subscribeToObservable: SinonSpy;
    let cancelEdit: SinonStub;
    let deleteItem: SinonStub;
    let saveItem: SinonStub;

    beforeEach(() => {
        subscribeToObservable = spy(Observable.prototype, 'subscribe');

        const service = createStubInstance(AuthenticationDialogService);
        cancelEdit = service.cancelEdit = stub();
        deleteItem = service.deleteItem = stub();
        saveItem = service.saveItem = stub();

        sut = new AuthenticationDialogComponent(service);
    });

    afterEach(() => {
        subscribeToObservable.restore();
    });

    it('(ctor) should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(ctor) should not subscribe to todo items from service.', () => {
        expect(subscribeToObservable.called).toBe(false);
    });

    it('(cancelEdit) should call dialog service hide method.', () => {
        sut.cancelEdit();
        expect(cancelEdit.calledOnce).toBe(true);
    });

    it('(deleteItem) should call dialog service delete method.', () => {
        sut.deleteItem();
        expect(deleteItem.calledOnce).toBe(true);
    });

    it('(saveItem) should call dialog service delete method.', () => {
        sut.saveItem();
        expect(saveItem.calledOnce).toBe(true);
    });
});

describe('compiled: AuthenticationDialogComponent', () => {

    let sut: AuthenticationDialogComponent;
    let fixture: ComponentFixture<AuthenticationDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthenticationDialogComponent],
            imports: [NoopAnimationsModule, FormsModule, SharedModule, ButtonModule, DialogModule],
            providers: [
                AuthenticationDialogService,
                AuthenticationService,
                {provide: AuthenticationStorageService, useClass: MockAuthenticationStorageService}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthenticationDialogComponent);

        sut = fixture.debugElement.componentInstance;
        
        fixture.detectChanges();
    });

    it('(compiling) should be compilable.', () => {
        expect(sut).toBeTruthy();
    });
});
