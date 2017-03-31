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

namespace TodoAdmin.Core
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    internal class AuthenticationRepository : IAuthenticationRepository
    {
        private readonly AuthenticationDbContext context;

        public AuthenticationRepository(AuthenticationDbContext context)
        {
            this.context = context
                ?? throw new ArgumentNullException(nameof(context));
        }

        public IEnumerable<Authentication> GetAll()
        {
            return context.Authentication
                .ToList()
                .AsReadOnly();
        }

        public Authentication Get(Guid appId)
        {
            return context.Authentication
                .SingleOrDefault(e => e.AppId.Equals(appId));
        }

        public Authentication Create(Authentication authentication)
        {
            if (authentication == null)
            {
                throw new ArgumentNullException(nameof(authentication));
            }

            if (authentication.AppId.Equals(Guid.Empty))
            {
                authentication.AppId = Guid.NewGuid();
            }

            context.Authentication.Add(authentication);
            context.SaveChanges();

            return authentication;
        }

        public void Update(Authentication authentication)
        {
            if (authentication == null)
            {
                throw new ArgumentNullException(nameof(authentication));
            }

            context.Authentication.Update(authentication);
            context.SaveChanges();
        }

        public bool Delete(Guid appId)
        {
            throw new NotImplementedException();
        }
    }
}
