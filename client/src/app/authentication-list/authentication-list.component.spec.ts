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

import {AuthenticationListComponent} from './authentication-list.component';
import {MockAuthenticationService} from '../mocks';

describe('component: AuthenticationListComponent', () => {

    let sut: AuthenticationListComponent;

    let service: any;

    beforeEach(() => {
        service = new MockAuthenticationService();
        sut = new AuthenticationListComponent(service);
    });

    it('(ctor) should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(ctor) should retrieve no authentication items when constructed.', () => {
        expect(sut.items).toEqual([]);
    });

    it('(ngOnInit) should retrieve authentication items when when calling ngOnInit.', () => {
        sut.ngOnInit();

        expect(sut.items).toEqual(service.getAll());
    });
});
