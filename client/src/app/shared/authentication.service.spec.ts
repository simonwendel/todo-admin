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

import {stub, SinonSpy} from 'sinon';

import {AuthenticationService} from './authentication.service';
import {AuthenticationStorageService} from './authentication-storage.service';
import {Authentication} from './authentication.model';

describe('AuthenticationService', () => {

    let sut: AuthenticationService;
    let getItems: SinonSpy;
    let someItems: Array<Authentication>;
    let storage: AuthenticationStorageService;

    beforeEach(() => {
        storage = new AuthenticationStorageService();

        someItems = [new Authentication(), new Authentication()];
        getItems = stub(storage, 'getItems').returns(someItems);

        sut = new AuthenticationService(storage);
    });

    it('(ctor) should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(ctor) should not get items from storage on instantiation.', () => {
        expect(getItems.called).toBe(false);
    });

    it('(listItems) should get items fom storage.', () => {
        const items = sut.listItems();

        expect(items).toBe(someItems);
        expect(getItems.calledOnce).toBe(true);
    });
});
