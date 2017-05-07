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

import {Authentication} from './authentication.model';
import {AuthenticationStorageService} from './authentication-storage.service';

describe('service: AuthenticationStorageService', () => {

    let sut: AuthenticationStorageService;

    beforeEach(() => {
        sut = new AuthenticationStorageService();
    });

    it('(ctor) should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(getItems) should throw exception.', () => {
        expect(() => sut.getItems()).toThrowError('Not implemented.');
    });

    it('(saveItem) should throw exception.', () => {
        expect(() => sut.saveItem(new Authentication())).toThrowError('Not implemented.');
    });

    it('(deleteItem) should throw exception.', () => {
        expect(() => sut.deleteItem(new Authentication())).toThrowError('Not implemented.');
    });
});
