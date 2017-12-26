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

import {AuthenticationService} from '../shared';

@Injectable()
export class AuthenticationDialogService {

    public readonly visible: Observable<boolean>;

    private readonly visibleSubject: BehaviorSubject<boolean>;

    constructor(private readonly authenticationService: AuthenticationService) {
        this.visibleSubject = new BehaviorSubject(false);
        this.visible = this.visibleSubject.asObservable();

        this.authenticationService.edited.subscribe(i => this.show());
    }

    show(): void {
        this.visibleSubject.next(true);
    }

    hide(): void {
        this.visibleSubject.next(false);
    }
}