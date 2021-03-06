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

import {Authentication} from '../shared';
import {MockAuthenticationStorageService} from './authentication-storage.mock.service';

describe('mock: MockAuthenticationStorageService', () => {

    const items: Array<Authentication> = [
        new Authentication({appId: 'app 1', accountName: 'account 1', secret: 'secret 1'}),
        new Authentication({appId: 'app 2', accountName: 'account 2', secret: 'secret 2'}),
        new Authentication({appId: 'app 3', accountName: 'account 3', secret: 'secret 3'})
    ];

    let sut: MockAuthenticationStorageService;

    beforeEach(() => {
        sut = new MockAuthenticationStorageService();
    });

    it('(getItems) should return a bunch of items.', () => {
        expect(sut.getItems()).toEqual(items);
    });

    it('(saveItem) should add new item when saving with new app id.', () => {
        const newItem = new Authentication(
            {appId: 'app 4', accountName: 'account 4', secret: 'secret 4'});

        const updatedItems = items.concat(newItem);

        sut.saveItem(newItem);

        expect(sut.items).toEqual(updatedItems);
    });

    it('(saveItem) should update existing item when saving with old app id.', () => {
        const existingItem = new Authentication(
            {appId: 'app 3', accountName: 'account 4', secret: 'secret 4'});

        const updatedItems = items
            .filter(i => i.appId !== existingItem.appId)
            .concat(existingItem);

        sut.saveItem(existingItem);

        expect(sut.items).toEqual(updatedItems);
    });

    it('(deleteItem) should delete nothing from array when given unknown item.', () => {
        const existingItem = new Authentication(
            {appId: 'app 4', accountName: 'account 4', secret: 'secret 4'});

        const itemsBefore = [...items];

        sut.deleteItem(existingItem);

        expect(sut.items).toEqual(itemsBefore);
    });

    it('(deleteItem) should delete item from array when given existing item.', () => {
        const existingItem = new Authentication(
            {appId: 'app 3', accountName: 'account 3', secret: 'secret 3'});

        const updatedItems = items
            .filter(i => i.appId !== existingItem.appId);

        sut.deleteItem(existingItem);

        expect(sut.items).toEqual(updatedItems);
    });
});
