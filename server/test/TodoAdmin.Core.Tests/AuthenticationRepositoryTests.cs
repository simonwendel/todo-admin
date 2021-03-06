﻿/*
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
        private readonly Mock<IAuthenticationFactory> authFactory;

        private readonly IEnumerable<Authentication> someAuthentication;

        private readonly Authentication oneAuthentication;

        private readonly Authentication notPersistedAuthentication;

        private readonly Mock<DbSet<Authentication>> authenticationSet;

        private readonly Mock<AuthenticationDbContext> context;

        private readonly AuthenticationRepository sut;

        public AuthenticationRepositoryTests()
        {
            authFactory = new Mock<IAuthenticationFactory>();

            someAuthentication =
                Enumerable.Range(0, 5).Select(s => Authentication.New()).ToList();

            oneAuthentication = someAuthentication.Skip(2).First();

            notPersistedAuthentication = Authentication.New();
            authFactory
                .Setup(f => f.BuildWithName(It.Is<string>(n => n.Equals(notPersistedAuthentication.AccountName))))
                .Returns(notPersistedAuthentication);

            authenticationSet = new Mock<DbSet<Authentication>>();

            SetupDbSetQueryability(authenticationSet, someAuthentication);

            context = new Mock<AuthenticationDbContext>(new Configuration());
            context
                .SetupGet(c => c.Authentication)
                .Returns(authenticationSet.Object);

            sut = new AuthenticationRepository(context.Object, authFactory.Object);
        }

        [Fact]
        public void Ctor_GivenNullDbContext_ThrowsException()
        {
            Action constructorCall =
                () => new AuthenticationRepository(null, authFactory.Object);

            constructorCall
                .ShouldThrow<ArgumentNullException>();
        }

        [Fact]
        public void Ctor_GivenNullAuthenticationFactory_ThrowsException()
        {
            Action constructorCall =
                () => new AuthenticationRepository(context.Object, null);

            constructorCall
                .ShouldThrow<ArgumentNullException>();
        }

        [Fact]
        public void GetAll_GetsDataFromDbContext()
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

        [Fact]
        public void Get_GivenAppId_GetsDataFromDbContext()
        {
            sut.Get(oneAuthentication.AppId);

            context.VerifyGet(
                c => c.Authentication,
                Times.Once);
        }

        [Fact]
        public void Get_GivenNonExistingAppId_ReturnsNull()
        {
            var entity = sut.Get(Guid.NewGuid());

            entity
                .Should().BeNull();
        }

        [Fact]
        public void Get_GivenValidAppId_ReturnsAuthentication()
        {
            var entity = sut.Get(oneAuthentication.AppId);

            entity
                .Should().BeSameAs(oneAuthentication);
        }

        [Fact]
        public void Create_GivenNullAccountName_ThrowsException()
        {
            Action createCall =
                () => sut.Create(null);

            createCall
                .ShouldThrow<ArgumentNullException>();
        }

        [Fact]
        public void Create_GivenAccountName_BuildsAuthentication()
        {
            sut.Create(notPersistedAuthentication.AccountName);

            authFactory.Verify(
                f => f.BuildWithName(It.Is<string>(s => s.Equals(notPersistedAuthentication.AccountName))),
                Times.Once);
        }

        [Fact]
        public void Create_GivenAccountName_PersistsAuthentication()
        {
            var entity = sut.Create(notPersistedAuthentication.AccountName);

            entity
                .Should().BeSameAs(notPersistedAuthentication);

            authenticationSet.Verify(
                s => s.Add(It.Is<Authentication>(a => a == notPersistedAuthentication)),
                Times.Once);

            context.Verify(
                c => c.SaveChanges(),
                Times.Once);
        }

        [Fact]
        public void Update_GivenNullAccountName_ThrowsException()
        {
            Action updateCall =
                () => sut.Update(oneAuthentication.AppId, null);

            updateCall
                .ShouldThrow<ArgumentNullException>();
        }

        [Fact]
        public void Update_GivenNewName_UpdatesAuthentication()
        {
            sut.Update(oneAuthentication.AppId, "new name");

            oneAuthentication.AccountName
                .Should().Be("new name");

            authenticationSet.Verify(
                s => s.Update(It.Is<Authentication>(a => a == oneAuthentication)),
                Times.Once);

            context.Verify(
                c => c.SaveChanges(),
                Times.Once);
        }

        [Fact]
        public void Delete_GivenAuthentication_DeletesAuthentication()
        {
            sut.Delete(oneAuthentication.AppId);

            authenticationSet.Verify(
                s => s.Remove(It.Is<Authentication>(a => a == oneAuthentication)),
                Times.Once);

            context.Verify(
                c => c.SaveChanges(),
                Times.Once);
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
