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
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';

import {AuthenticationStorageService} from './authentication-storage.service';
import {Authentication} from './authentication.model';

@Injectable()
export class AuthenticationService {

    public readonly todo: Observable<Array<Authentication>>;

    public readonly edited: Observable<Authentication>;

    private readonly todoSubject: BehaviorSubject<Array<Authentication>>;

    private readonly editedSubject: Subject<Authentication>;

    private readonly todoItems: Array<Authentication>;

    private editedItem: Authentication;

    constructor(private readonly storage: AuthenticationStorageService) {
        this.todoItems = this.storage.getItems();
        this.todoSubject = new BehaviorSubject(this.todoItems);
        this.todo = this.todoSubject.asObservable();

        this.editedSubject = new Subject();
        this.edited = this.editedSubject.asObservable();
    }

    useNewItem(): void {
        this.useItem(new Authentication());
    }

    useItem(item: Authentication): void {
        this.editedItem = new Authentication(item);
        this.editedSubject.next(this.editedItem);
    }

    saveItem(): void {
        this.storage.saveItem(this.editedItem);

        if (this.todoItems.includes(this.editedItem) === false) {
            this.todoItems.push(this.editedItem);
        }

        this.todoSubject.next(this.todoItems);
    }

    deleteItem(): void {
        this.storage.deleteItem(this.editedItem);

        const index = this.todoItems.findIndex(
            i => i.appId === this.editedItem.appId);
            
        if (index >= 0) {
            this.todoItems.splice(index, 1);
        }

        this.todoSubject.next(this.todoItems);
    }
}
