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
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

import {AppConfig} from '../../app.config';
import {Authentication} from './';

@Injectable()
export class AuthenticationApiService {

    constructor(
        private readonly config: AppConfig,
        private readonly http: HttpClient) {
    }

    getAll(): Observable<Array<Authentication>> {
        return this.http
            .get<Array<Authentication>>(this.config.API_AUTHENTICATION_URL)
            .retry(this.config.API_MAX_RETRIES);
    }
}
