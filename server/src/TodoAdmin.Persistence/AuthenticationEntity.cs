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
    using System.Linq;

    public partial class AuthenticationEntity
    {
        public Guid AppId { get; internal set; }

        public string AccountName { get; internal set; }

        public byte[] Secret { get; internal set; }

        public DateTime Created { get; internal set; }

        public override bool Equals(object obj)
        {
            if (obj == null || obj is AuthenticationEntity == false)
            {
                return false;
            }

            if (obj == this)
            {
                return true;
            }

            var otherEntity = (AuthenticationEntity)obj;
            return AppId.Equals(otherEntity.AppId)
                && AccountName.Equals(otherEntity.AccountName)
                && Created.Equals(otherEntity.Created)
                && Secret.SequenceEqual(otherEntity.Secret);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                var hash = (17 * 486187739) + AppId.GetHashCode();
                hash = (hash * 486187739) + AccountName.GetHashCode();
                hash = (hash * 486187739) + Created.GetHashCode();

                foreach (var b in Secret)
                {
                    hash = (hash * 486187739) + b;
                }

                return hash;
            }
        }
    }
}
