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

import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'tc-authentication-dialog',
    templateUrl: './authentication-dialog.html',
    styleUrls: ['./authentication-dialog.css']
})
export class AuthenticationDialogComponent implements OnInit {

    @Input() saveFunction: () => void;

    @Input() deleteFunction: () => void;

    constructor() {
    }

    ngOnInit() {
        if (this.saveFunction == null) {
            throw new Error('Input saveFunction not set on tc-authentication-dialog!');
        }

        if (this.deleteFunction == null) {
            throw new Error('Input deleteFunction not set on tc-authentication-dialog!');
        }
    }
}
