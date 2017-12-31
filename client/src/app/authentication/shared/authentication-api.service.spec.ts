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

import {TestBed, async} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {AppConfig} from '../../app.config';
import {Authentication} from './authentication.model';
import {AuthenticationApiService} from './authentication-api.service';

describe('compiled: AuthenticationApiService', () => {

    let config: AppConfig;
    let httpMock: HttpTestingController;
    let allItems: Array<Authentication>;
    let sut: AuthenticationApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AppConfig,
                AuthenticationApiService
            ],
            imports: [
                HttpClientTestingModule,
            ],
        })

        allItems = [
            new Authentication({appId: 'app 1', accountName: 'acct 1', secret: 'secret 1'}),
            new Authentication({appId: 'app 2', accountName: 'acct 2', secret: 'secret 2'}),
            new Authentication({appId: 'app 3', accountName: 'acct 3', secret: 'secret 3'})];

        config = TestBed.get(AppConfig);
        httpMock = TestBed.get(HttpTestingController);

        sut = TestBed.get(AuthenticationApiService);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('(ctor) should be instantiable.', () => {
        expect(sut).toBeTruthy();
    });

    it('(getAll) should HTTP GET from the API using the HttpClient.', async(() => {
        sut.getAll()
            .subscribe(items => expect(items).toBe(allItems));

        const req = httpMock.expectOne(config.API_AUTHENTICATION_URL);
        expect(req.request.method).toEqual('GET');

        req.flush(allItems);
    }));
});
