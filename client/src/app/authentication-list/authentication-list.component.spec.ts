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

import {async} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';

import {spy, SinonSpy} from 'sinon';

import {Authentication, AuthenticationService} from '../shared';
import {MockAuthenticationStorageService} from '../mocks';
import {AuthenticationListComponent} from './authentication-list.component';

describe('component: AuthenticationListComponent', () => {

    let sut: AuthenticationListComponent;
    let service: AuthenticationService;
    let useNewItem: SinonSpy;
    let subscribeToObservable: SinonSpy;
    let useItem: SinonSpy;
    let someItem: Authentication;

    beforeEach(() => {
        subscribeToObservable = spy(Observable.prototype, 'subscribe');

        const mock: any = new MockAuthenticationStorageService();
        service = new AuthenticationService(mock);

        useNewItem = spy(service, 'useNewItem');

        useItem = spy(service, 'useItem');
        someItem = new Authentication({appId: '1', accountName: 'n1', secret: 's1'});

        sut = new AuthenticationListComponent(service);
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

    it('(ngOnInit) should subscribe to todo items from service.', async(() => {
        sut.ngOnInit();

        expect(subscribeToObservable.calledOn(service.todo)).toBe(true);
    }));

    it('(onButtonClick) should call service to create new item.', () => {
        sut.onButtonClick();

        expect(useNewItem.calledOnce).toBe(true);
    });

    it('(onRowSelect) should call service to edit selected item.', () => {
        const event: PrimeEvent = {
            data: someItem
        };

        sut.onRowSelect(event);

        const arg = useItem.firstCall.args[0];

        expect(useItem.calledOnce).toBe(true);
        expect(arg).not.toBe(event.data);
        expect(arg).toEqual(event.data);
    });
});
