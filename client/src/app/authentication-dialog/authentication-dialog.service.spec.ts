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

import {Observable} from 'rxjs/Observable';

import {spy, SinonSpy} from 'sinon';
import {async} from '@angular/core/testing';

import {MockAuthenticationStorageService} from '../mocks';
import {AuthenticationService} from '../shared';
import {AuthenticationDialogService} from './authentication-dialog.service';

describe('service: AuthenticationDialogService', () => {

    let sut: AuthenticationDialogService;
    let service: AuthenticationService;
    let subscribeToObservable: SinonSpy;

    beforeEach(() => {
        subscribeToObservable = spy(Observable.prototype, 'subscribe');

        const mock: any = new MockAuthenticationStorageService();
        service = new AuthenticationService(mock);

        sut = new AuthenticationDialogService(service);
    });

    afterEach(() => {
        subscribeToObservable.restore();
    });

    it('(ctor) should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(ctor) should be hidden on instantiation.', () => {
        sut.visible.subscribe(visible => {
            expect(visible).toBe(false);
        });
    });

    it('(ctor) should subscribe to edited from authentication service.', () => {
        expect(subscribeToObservable.calledOn(service.edited)).toBe(true);
    });

    it('(show) should issue new visibility as true.', async(() => {
        sut.visible.skip(1).subscribe(visible => {
            expect(visible).toBe(true);
        });

        sut.show();
    }));

    it('(hide) should issue new visibility as false.', async(() => {
        sut.visible.skip(1).subscribe(visible => {
            expect(visible).toBe(false);
        });

        sut.hide();
    }));
});
