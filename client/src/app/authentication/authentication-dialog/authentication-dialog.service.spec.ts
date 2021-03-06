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

import {Observable} from 'rxjs/Rx';

import {stub, SinonStub} from 'sinon';
import {async} from '@angular/core/testing';

import {MockAuthenticationStorageService} from '../mocks';
import {AuthenticationService} from '../shared';
import {AuthenticationDialogService} from './authentication-dialog.service';

describe('service: AuthenticationDialogService', () => {

    let sut: AuthenticationDialogService;
    let authenticationService: AuthenticationService;
    let subscribeToObservable: SinonStub;
    let hideDialog: SinonStub;
    let deleteItem: SinonStub;
    let saveItem: SinonStub;

    beforeEach(() => {
        subscribeToObservable = stub(Observable.prototype, 'subscribe');

        const mock: any = new MockAuthenticationStorageService();
        authenticationService = new AuthenticationService(mock);

        deleteItem = stub(authenticationService, 'deleteItem');
        saveItem = stub(authenticationService, 'saveItem');

        sut = new AuthenticationDialogService(authenticationService);
        hideDialog = stub(sut, 'hideDialog');
    });

    afterEach(() => {
        subscribeToObservable.restore();
    });

    it('(ctor) should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(ctor) should be hidden on instantiation.', () => {
        sut.visible.subscribe(visible => {
            expect(visible).toBe(false);
        });
    });

    it('(ctor) should subscribe to edited from authentication service.', () => {
        expect(subscribeToObservable.calledOn(authenticationService.edited)).toBe(true);
    });

    it('(showDialog) should issue new visibility as true.', async(() => {
        sut.visible.skip(1).subscribe(visible => {
            expect(visible).toBe(true);
        });

        sut.showDialog();
    }));

    it('(hideDialog) should issue new visibility as false.', async(() => {
        sut.visible.skip(1).subscribe(visible => {
            expect(visible).toBe(false);
        });

        sut.hideDialog();
    }));

    it('(cancelEdit) should hide dialog.', async(() => {
        sut.cancelEdit();
        expect(hideDialog.calledOnce).toBe(true);
    }));

    it('(deleteItem) should hide dialog.', async(() => {
        sut.deleteItem();
        expect(hideDialog.calledOnce).toBe(true);
    }));

    it('(deleteItem) should call deleteItem.', async(() => {
        sut.deleteItem();
        expect(deleteItem.calledOnce).toBe(true);
    }));

    it('(saveItem) should hide dialog.', async(() => {
        sut.saveItem();
        expect(hideDialog.calledOnce).toBe(true);
    }));

    it('(saveItem) should call saveItem.', async(() => {
        sut.saveItem();
        expect(saveItem.calledOnce).toBe(true);
    }));
});
