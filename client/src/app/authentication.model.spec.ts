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

describe('model: Authentication', () => {

    it('should be instantiable without an object to copy.', () => {
        const sut = new Authentication();

        expect(sut.appId).toBeUndefined();
        expect(sut.accountName).toBeUndefined();
        expect(sut.secret).toBeUndefined();
    });

    it('should have a copy constructor for setting properties from an object.', () => {
        const sut = new Authentication({
            appId: 'it\'s me',
            accountName: 'acct',
            secret: 'shush'
        });

        expect(sut.appId).toBe('it\'s me');
        expect(sut.accountName).toBe('acct');
        expect(sut.secret).toBe('shush');
    });
});
