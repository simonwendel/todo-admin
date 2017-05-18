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
import {Subject} from 'rxjs/Subject';

import {spy, createStubInstance, SinonStub, SinonSpy} from 'sinon';

import {AuthenticationService} from './authentication.service';
import {AuthenticationStorageService} from './authentication-storage.service';
import {Authentication} from './authentication.model';

describe('AuthenticationService', () => {

    let sut: AuthenticationService;
    let getItemsFromStorage: SinonStub;
    let someItems: Array<Authentication>;
    let oneItem: Authentication;
    let next: SinonSpy;
    let saveItemToStorage: SinonStub;

    beforeAll(() => {
        next = spy(Subject.prototype, 'next');
    });

    afterEach(() => {
        next.reset();
    });

    beforeEach(() => {
        const storage = createStubInstance(AuthenticationStorageService);

        const first: Authentication = {appId: '1', accountName: 'n1', secret: 's1'};
        const second: Authentication = {appId: '2', accountName: 'n2', secret: 's2'};

        someItems = [first, second];
        getItemsFromStorage = storage.getItems.returns(someItems);

        oneItem = {appId: '3', accountName: 'n3', secret: 's3'};

        saveItemToStorage = storage.saveItem;

        sut = new AuthenticationService(storage);
    });

    it('(ctor) should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(ctor) should not issue an edited item on instantiation.', () => {
        expect(next.called).toBe(false);
    });

    it('(ctor) should get items from storage on instantiation.', () => {
        expect(getItemsFromStorage.calledOnce).toBe(true);
    });

    it('(todo) should list items from storage.', async(() => {
        sut.todo.subscribe(items => {
            expect(items).toEqual(someItems);
        });
    }));

    it('(createNewItem) should issue new value to subscribers on edited observable.', async(() => {
        sut.createNewItem();

        expect(next.calledOnce).toBe(true);
        expect(next.calledWithExactly(new Authentication())).toBe(true);
    }));

    it('(editItem) should issue supplied value to subscribers on edited observable.', async(() => {
        sut.editItem(oneItem);

        expect(next.calledOnce).toBe(true);
        expect(next.calledWithExactly(oneItem)).toBe(true);
    }));

    it('(saveItem) should save the edited item to storage.', () => {
        sut.editItem(oneItem);

        sut.saveItem();

        expect(saveItemToStorage.calledWithExactly(oneItem)).toBe(true);
    });
});
