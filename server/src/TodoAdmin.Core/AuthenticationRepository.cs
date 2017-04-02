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

        private readonly IAuthenticationFactory factory;

        public AuthenticationRepository(AuthenticationDbContext context, IAuthenticationFactory factory)
        {
            this.context = context
                ?? throw new ArgumentNullException(nameof(context));

            this.factory = factory
                ?? throw new ArgumentNullException(nameof(factory));
        }

        public IEnumerable<IAuthentication> GetAll()
        {
            return context.Authentication
                .ToList()
                .AsReadOnly();
        }

        public IAuthentication Get(Guid appId)
        {
            return GetBy(appId);
        }

        public IAuthentication Create(string accountName)
        {
            if (accountName == null)
            {
                throw new ArgumentNullException(nameof(accountName));
            }

            var authentication = factory.BuildWithName(accountName);

            context.Authentication.Add(authentication);
            context.SaveChanges();

            return authentication;
        }

        public void Update(Guid appId, string accountName)
        {
            var authentication = GetBy(appId);

            authentication.AccountName =
                accountName ?? throw new ArgumentNullException(nameof(accountName));

            context.Authentication.Update(authentication);
            context.SaveChanges();
        }

        public void Delete(Guid appId)
        {
            var authentication = GetBy(appId);

            context.Authentication.Remove(authentication);
            context.SaveChanges();
        }

        private Authentication GetBy(Guid appId)
        {
            return context.Authentication
                .SingleOrDefault(a => a.AppId == appId);
        }
    }
}
