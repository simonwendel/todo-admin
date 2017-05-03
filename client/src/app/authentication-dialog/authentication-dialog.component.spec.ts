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
import {stub, SinonStub} from 'sinon';

import {Authentication} from '../shared';
import {AuthenticationDialogComponent} from './authentication-dialog.component';

describe('component: AuthenticationDialogComponent', () => {

    let sut: AuthenticationDialogComponent;

    beforeEach(() => {
        sut = new AuthenticationDialogComponent();
    });

    it('(ctor) it should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(ngOnInit) should throw if saveFunction callback is not set.', () => {
        sut.deleteFunction = stub();
        sut.authenticationItem = new Authentication();

        expect(() => sut.ngOnInit()).toThrowError(
            'Input saveFunction not set on tc-authentication-dialog!');
    });

    it('(ngOnInit) should throw if deleteFunction callback is not set.', () => {
        sut.saveFunction = stub();
        sut.authenticationItem = new Authentication();

        expect(() => sut.ngOnInit()).toThrowError(
            'Input deleteFunction not set on tc-authentication-dialog!');
    });

    it('(ngOnInit) should throw if authenticationItem input is not set.', () => {
        sut.saveFunction = stub();
        sut.deleteFunction = stub();

        expect(() => sut.ngOnInit()).toThrowError(
            'Input authenticationItem not set on tc-authentication-dialog!');
    });

    it('(ngOnInit) should do nothing if callbacks and item are set.', () => {
        sut.saveFunction = stub();
        sut.deleteFunction = stub();
        sut.authenticationItem = new Authentication();

        expect(() => sut.ngOnInit()).not.toThrowError();
    });
});

describe('compiled: AuthenticationDialogComponent', () => {

    let sut: AuthenticationDialogComponent;
    let fixture: ComponentFixture<AuthenticationDialogComponent>;

    let saveButton: HTMLElement;
    let deleteButton: HTMLElement;

    let saveFunction: SinonStub;
    let deleteFunction: SinonStub;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthenticationDialogComponent],
            imports: [NoopAnimationsModule, FormsModule, SharedModule, ButtonModule, DialogModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        saveFunction = stub();
        deleteFunction = stub();

        fixture = TestBed.createComponent(AuthenticationDialogComponent);

        sut = fixture.debugElement.componentInstance;
        sut.saveFunction = saveFunction;
        sut.deleteFunction = deleteFunction;
        sut.authenticationItem = new Authentication();

        fixture.detectChanges();
    });

    beforeEach(async(() => {
        saveButton = fixture.nativeElement.querySelector('button.save-button');
        deleteButton = fixture.nativeElement.querySelector('button.delete-button');
    }));

    it('(compiling) it should be compilable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(save button clicked) should call saveFunction on save button click.', async(() => {
        saveButton.click();

        expect(saveFunction.calledOnce).toBe(true);
        expect(saveFunction.calledWith(sut.authenticationItem)).toBe(true);
        expect(deleteFunction.called).toBe(false);
    }));

    it('(delete button clicked) should call deleteFunction on delete button click.', async(() => {
        deleteButton.click();

        expect(deleteFunction.calledOnce).toBe(true);
        expect(deleteFunction.calledWith(sut.authenticationItem)).toBe(true);
        expect(saveFunction.called).toBe(false);
    }));
});
