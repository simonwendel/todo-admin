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
import {AuthenticationDialogService} from './authentication-dialog.service';

describe('component: AuthenticationDialogComponent', () => {

    let sut: AuthenticationDialogComponent;
    let dialog: AuthenticationDialogService;
    let isVisible: SinonStub;

    beforeEach(() => {
        dialog = new AuthenticationDialogService();
        isVisible = stub(dialog, 'isVisible').returns(false);

        sut = new AuthenticationDialogComponent(dialog);
    });

    it('(ctor) should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(ctor) should fetch dialog visibility from dialog service.', () => {
        expect(isVisible.calledOnce).toBe(true);
    });
});

describe('compiled: AuthenticationDialogComponent', () => {

    let sut: AuthenticationDialogComponent;
    let fixture: ComponentFixture<AuthenticationDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthenticationDialogComponent],
            imports: [NoopAnimationsModule, FormsModule, SharedModule, ButtonModule, DialogModule],
            providers: [AuthenticationDialogService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthenticationDialogComponent);

        sut = fixture.debugElement.componentInstance;
        sut.authenticationItem = new Authentication();

        fixture.detectChanges();
    });

    it('(compiling) should be compilable.', () => {
        expect(sut).toBeTruthy();
    });
});
