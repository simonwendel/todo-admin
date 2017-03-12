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

namespace TodoAdmin.Domain.Tests
{
    using System;
    using FluentAssertions;
    using Xunit;

    public class TodoStorageContextTests
    {
        /// <summary>
        /// Not terribly elegant integration test making sure complete roundtripping 
        /// of <see cref="Authentication" /> object works as expected.
        /// </summary>
        [Fact]
        public void Context_ShouldRoundTripEntity()
        {
            var entity = new Authentication
            {
                AppId = Guid.NewGuid(),
                AccountName = "SomeAccount",
                Created = new DateTime(2017, 1, 2, 1, 32, 45),
                Secret = new byte[] { 1, 2, 3 }
            };

            // save
            using (var sut = new TodoStorageContext())
            {
                sut.Add(entity);
                sut.SaveChanges();
            }

            // query
            using (var sut = new TodoStorageContext())
            {
                sut.Authentication
                    .Should().ContainSingle(e => e.Equals(entity));
            }

            // delete
            using (var sut = new TodoStorageContext())
            {
                sut.Authentication.Remove(entity);
                sut.SaveChanges();
            }

            // query
            using (var sut = new TodoStorageContext())
            {
                sut.Authentication
                    .Should().NotContain(e => e.Equals(entity));
            }
        }
    }
}
