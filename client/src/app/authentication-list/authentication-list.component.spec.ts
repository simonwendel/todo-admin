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

import {Subject} from 'rxjs/Subject';

import {spy, SinonSpy} from 'sinon';

import {AuthenticationListComponent} from './authentication-list.component';
import {AuthenticationService, AuthenticationStorageService} from '../shared';
import {MockAuthenticationStorageService} from '../mocks/authentication-storage.mock.service';

describe('component: AuthenticationListComponent', () => {

    let sut: AuthenticationListComponent;
    let createNewItem: SinonSpy;
    let subscribe: SinonSpy;

    beforeAll(() => {
        subscribe = spy(Subject.prototype, 'subscribe');
    });

    afterEach(() => {
        subscribe.reset();
    });

    beforeEach(() => {
        const storage: any = new MockAuthenticationStorageService();
        const service = new AuthenticationService(storage as AuthenticationStorageService);

        createNewItem = spy(service, 'createNewItem');

        sut = new AuthenticationListComponent(service);
    });

    it('(ctor) should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(ctor) should not subscribe to todo items from service.', () => {
        expect(subscribe.called).toBe(false);
    });

    it('(ngOnInit) should subscribe to todo items from service.', () => {
        sut.ngOnInit();

        expect(subscribe.calledOnce).toBe(true);
    });

    it('(onButtonClick) should call service to create new item.', () => {
        sut.onButtonClick();

        expect(createNewItem.calledOnce).toBe(true);
    });
});
