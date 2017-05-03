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

import {AuthenticationDialogService} from './authentication-dialog.service';

describe('service: AuthenticationDialogService', () => {

    let sut: AuthenticationDialogService;

    beforeEach(() => {
        sut = new AuthenticationDialogService();
    });

    it('(ctor) should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(ctor) should be hidden on instantiation.', () => {
        expect(sut.isVisible()).toBe(false);
    });

    it('(show) should show dialog.', () => {
        sut.show();

        expect(sut.isVisible()).toBe(true);
    });

    it('(hide) should hide dialog.', () => {
        sut.hide();

        expect(sut.isVisible()).toBe(false);
    });
});
