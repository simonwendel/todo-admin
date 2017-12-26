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

import {Injectable} from '@angular/core';
import {Authentication} from './';

@Injectable()
export class AuthenticationStorageService {

    private exception: Error = new Error('Not implemented.');

    constructor() {
    }

    getItems(): never {
        throw this.exception;
    }

    saveItem(item: Authentication): never {
        throw this.exception;
    }

    deleteItem(item: Authentication): never {
        throw  this.exception;
    }
}
