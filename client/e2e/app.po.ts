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

import {browser, element, by} from 'protractor';

import {WebDriverPromise} from './e2e-types';

export class TodoAdminClientPage {

    navigateTo(): WebDriverPromise<void> {
        return browser.get('/');
    }

    dataTableVisibility(): WebDriverPromise<boolean> {
        return element.all(by.css('.authentication-list')).isDisplayed();
    }

    getNumberOfSecrets(): WebDriverPromise<number> {
        return element.all(by.css('.data-secret-val')).count();
    }

    getColorsOfSecrets(): WebDriverPromise<string> {
        return element.all(by.css('.data-secret-val')).getCssValue('color');
    }
}
