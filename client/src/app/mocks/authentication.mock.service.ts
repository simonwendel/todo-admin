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

import {spy, SinonSpy} from 'sinon';

import {Authentication} from '../shared';

export class MockAuthenticationService {

    getAll: SinonSpy;

    save: SinonSpy;

    items: Array<Authentication> = [
        new Authentication({appId: 'app 1', accountName: 'account 1', secret: 'secret 1'}),
        new Authentication({appId: 'app 2', accountName: 'account 2', secret: 'secret 2'}),
        new Authentication({appId: 'app 3', accountName: 'account 3', secret: 'secret 3'})
    ];

    constructor() {
        this.getAll = spy(this.getAllInternal);
        this.save = spy(this.saveInternal);
    }

    private getAllInternal(): Array<Authentication> {
        return this.items;
    }

    private saveInternal(item: Authentication): void {
        const found = this.items.find(i => i.appId === item.appId);
        if (found) {
            const index = this.items.indexOf(found);
            this.items[index] = item;
            return;
        }

        this.items.push(item);
    }
}
