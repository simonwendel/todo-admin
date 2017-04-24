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

import {stub} from 'sinon';

import {Authentication} from '../shared';
import {AuthenticationDialogComponent} from './authentication-dialog.component';

describe('component: AuthenticationDialogComponent', () => {

    let sut: AuthenticationDialogComponent;

    beforeEach(() => {
        sut = new AuthenticationDialogComponent();
    });

    it('(ctor) it should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(ngOnInit) should throw if saveFunction callback is not set.', () => {
        sut.deleteFunction = stub();
        sut.authenticationItem = new Authentication();

        expect(() => sut.ngOnInit()).toThrowError(
            'Input saveFunction not set on tc-authentication-dialog!');
    });

    it('(ngOnInit) should throw if deleteFunction callback is not set.', () => {
        sut.saveFunction = stub();
        sut.authenticationItem = new Authentication();

        expect(() => sut.ngOnInit()).toThrowError(
            'Input deleteFunction not set on tc-authentication-dialog!');
    });

    it('(ngOnInit) should throw if authenticationItem input is not set.', () => {
        sut.saveFunction = stub();
        sut.deleteFunction = stub();

        expect(() => sut.ngOnInit()).toThrowError(
            'Input authenticationItem not set on tc-authentication-dialog!');
    });

    it('(ngOnInit) should do nothing if callbacks and item are set.', () => {
        sut.saveFunction = stub();
        sut.deleteFunction = stub();
        sut.authenticationItem = new Authentication();

        expect(() => sut.ngOnInit()).not.toThrowError();
    });
});
