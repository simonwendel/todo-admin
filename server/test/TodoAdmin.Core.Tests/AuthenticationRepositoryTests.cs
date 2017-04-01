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

        private readonly Authentication oneAuthentication;

        private readonly Authentication notPersistedAuthentication;

        private readonly Mock<DbSet<Authentication>> authenticationSet;

        private readonly Mock<AuthenticationDbContext> context;

        private readonly AuthenticationRepository sut;

        public AuthenticationRepositoryTests()
        {
            someAuthentication =
                Enumerable.Range(0, 5).Select(s => Authentication.New()).ToList();

            oneAuthentication = someAuthentication.Skip(2).First();

            notPersistedAuthentication = Authentication.New();

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
        public void Create_GivenNullAuthentication_ThrowsException()
        {
            Action createCall =
                () => sut.Create(null);

            createCall
                .ShouldThrow<ArgumentNullException>();
        }

        [Fact]
        public void Create_GivenAuthentication_PersistsAuthentication()
        {
            var entity = sut.Create(notPersistedAuthentication);

            entity
                .ShouldBeEquivalentTo(notPersistedAuthentication);

            authenticationSet.Verify(
                s => s.Add(It.Is<Authentication>(a => a == notPersistedAuthentication)),
                Times.Once);

            context.Verify(
                c => c.SaveChanges(),
                Times.Once);
        }

        [Fact]
        public void Create_GivenAuthenticationWithEmptyId_GivesAuthenticationNewId()
        {
            notPersistedAuthentication.AppId = Guid.Empty;

            var entity = sut.Create(notPersistedAuthentication);

            entity
                .ShouldBeEquivalentTo(notPersistedAuthentication);

            entity.AppId
                .Should().NotBe(Guid.Empty);

            authenticationSet.Verify(
                s => s.Add(It.Is<Authentication>(a => a == notPersistedAuthentication)),
                Times.Once);

            context.Verify(
                c => c.SaveChanges(),
                Times.Once);
        }

        [Fact]
        public void Create_GivenAuthenticationWithNullSecret_GivesAuthenticationNewSecret()
        {
            notPersistedAuthentication.Secret = null;

            var entity = sut.Create(notPersistedAuthentication);

            entity
                .ShouldBeEquivalentTo(notPersistedAuthentication);

            entity.Secret
                .Should().NotBeNull()
                .And.HaveCount(32);
        }

        [Fact]
        public void Create_GivenAuthenticationWithEmptySecret_GivesAuthenticationNewSecret()
        {
            notPersistedAuthentication.Secret = new byte[0];

            var entity = sut.Create(notPersistedAuthentication);

            entity
                .ShouldBeEquivalentTo(notPersistedAuthentication);

            entity.Secret
                .Should().NotBeNull()
                .And.HaveCount(32);
        }

        [Fact]
        public void Create_GivenAuthentication_PopulatesCreatedPropertyWithPresentTime()
        {
            notPersistedAuthentication.Created = DateTime.Now.AddDays(-1);
            var oldDate = notPersistedAuthentication.Created;

            var entity = sut.Create(notPersistedAuthentication);

            entity.Created
                .Should().BeAfter(oldDate);
        }

        [Fact]
        public void Update_GivenNullAuthentication_ThrowsException()
        {
            Action updateCall =
                () => sut.Update(null);

            updateCall
                .ShouldThrow<ArgumentNullException>();
        }

        [Fact]
        public void Update_GivenAuthentication_UpdatesAuthentication()
        {
            sut.Update(oneAuthentication);

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
