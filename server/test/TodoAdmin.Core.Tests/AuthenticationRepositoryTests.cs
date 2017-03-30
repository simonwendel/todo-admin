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

namespace TodoAdmin.Core.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using FluentAssertions;
    using Microsoft.EntityFrameworkCore;
    using Moq;
    using Xunit;

    public class AuthenticationRepositoryTests
    {
        private readonly IEnumerable<Authentication> someAuthentication;

        private readonly Mock<DbSet<Authentication>> authenticationSet;

        private readonly Mock<AuthenticationDbContext> context;

        private readonly AuthenticationRepository sut;

        public AuthenticationRepositoryTests()
        {
            someAuthentication =
                Enumerable.Range(0, 5).Select(s => Authentication.New()).ToList();

            authenticationSet = new Mock<DbSet<Authentication>>();

            SetupDbSetQueryability(authenticationSet, someAuthentication);

            context = new Mock<AuthenticationDbContext>(new Configuration());
            context
                .SetupGet(c => c.Authentication)
                .Returns(authenticationSet.Object);

            sut = new AuthenticationRepository(context.Object);
        }

        [Fact]
        public void Ctor_GivenNullDbContext_ThrowsException()
        {
            Action constructorCall =
                () => new AuthenticationRepository(null);

            constructorCall
                .ShouldThrow<ArgumentNullException>();
        }

        [Fact]
        public void GetAll_CallsAuthenticationPropertyGet()
        {
            sut.GetAll();

            context.VerifyGet(
                c => c.Authentication,
                Times.Once);
        }

        [Fact]
        public void GetAll_ReturnsReadOnlyCollection()
        {
            var list = sut.GetAll();

            list
                .Should().BeOfType<ReadOnlyCollection<Authentication>>()
                .Which
                .Should().Equal(someAuthentication);
        }

        private static void SetupDbSetQueryability(Mock<DbSet<Authentication>> targetSet, IEnumerable<Authentication> collection)
        {
            var enumerable = targetSet.As<IQueryable<Authentication>>();
            var queryable = collection.AsQueryable();

            enumerable.Setup(m => m.Provider).Returns(queryable.Provider);
            enumerable.Setup(m => m.Expression).Returns(queryable.Expression);
            enumerable.Setup(m => m.ElementType).Returns(queryable.ElementType);
            enumerable.Setup(m => m.GetEnumerator()).Returns(() => queryable.GetEnumerator());
        }
    }
}
