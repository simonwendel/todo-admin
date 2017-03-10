/*
 * Todo Storage for wifeys Todo app.
 * Copyright (C) 2016  Simon Wendel
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

namespace TodoAdmin.Persistence
{
    using System;

    public class AuthenticationModel
    {
        public Guid AppId { get; set; }

        public string AccountName { get; set; }

        public DateTime? Created { get; set; }

        public override bool Equals(object obj)
        {
            if (obj == null || obj is AuthenticationModel == false)
            {
                return false;
            }

            if (obj == this)
            {
                return true;
            }

            var otherModel = (AuthenticationModel)obj;
            return AppId.Equals(otherModel.AppId)
                && AccountName.Equals(otherModel.AccountName)
                && Created.Equals(otherModel.Created);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                var hash = (17 * 486187739) + AppId.GetHashCode();
                hash = (hash * 486187739) + AccountName.GetHashCode();
                hash = (hash * 486187739) + Created.GetHashCode();
                return hash;
            }
        }
    }
}
