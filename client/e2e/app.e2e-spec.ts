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

import {TodoAdminClientPage} from './app.po';

describe('e2e: Authentication admin page', () => {

    let adminPage: TodoAdminClientPage;
    let numberOfSecrets: number;

    beforeEach(async () => {
        adminPage = new TodoAdminClientPage();
        await adminPage.navigateTo();
    });

    it('should have a datatable.', async () => {
        expect(adminPage.dataTableVisibility()).toEqual([true]);
    });

    it('should have secrets in red.', async () => {
        numberOfSecrets = await adminPage.getNumberOfSecrets();
        const red = 'rgba(255, 0, 0, 1)';
        const expected = Array(numberOfSecrets).fill(red);

        expect(numberOfSecrets).toBeGreaterThan(0);
        expect(adminPage.getColorsOfSecrets()).toEqual(expected);
    });
});
