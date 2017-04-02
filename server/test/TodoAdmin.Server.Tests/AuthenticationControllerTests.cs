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

namespace TodoAdmin.Server.Tests
{
    using System;
    using System.Collections.Generic;
    using FluentAssertions;
    using Microsoft.AspNetCore.Mvc;
    using Moq;
    using TodoAdmin.Core;
    using Xunit;

    public class AuthenticationControllerTests
    {
        private readonly Mock<IAuthenticationRepository> repository;

        private readonly IEnumerable<Authentication> persistedEntities;

        private readonly Authentication persistedEntity;

        private readonly Authentication nonPersistedEntity;

        private readonly AuthenticationController sut;

        public AuthenticationControllerTests()
        {
            persistedEntities = new Authentication[0];

            persistedEntity = Authentication.New();
            nonPersistedEntity = Authentication.New();

            repository = new Mock<IAuthenticationRepository>();
            repository
                .Setup(r => r.GetAll())
                .Returns(persistedEntities);

            repository
                .Setup(r => r.Get(It.Is<Guid>(i => i == nonPersistedEntity.AppId)))
                .Returns((Authentication)null);

            repository
                .Setup(r => r.Get(It.Is<Guid>(i => i == persistedEntity.AppId)))
                .Returns(persistedEntity);

            repository
                .Setup(r => r.Create(It.Is<string>(a => a == nonPersistedEntity.AccountName)))
                .Returns(persistedEntity);

            sut = new AuthenticationController(repository.Object);
        }

        [Fact]
        public void Ctor_GivenNullRepository_ThrowsException()
        {
            Action constructorCall =
                () => new AuthenticationController(null);

            constructorCall
                .ShouldThrow<ArgumentNullException>();
        }

        [Fact]
        public void Get_ReturnsOkWithAllFromRepository()
        {
            var response = sut.Get();

            response
                .Should().BeOfType<OkObjectResult>()
                .Which.Value
                    .Should().BeSameAs(persistedEntities);

            repository.Verify(
                r => r.GetAll(),
                Times.Once);
        }

        [Fact]
        public void Get_GivenNonExistingId_ReturnsNotFound()
        {
            var response = sut.Get(nonPersistedEntity.AppId);

            response
                .Should().BeOfType<NotFoundResult>();

            repository.Verify(
                r => r.Get(It.Is<Guid>(i => i == nonPersistedEntity.AppId)),
                Times.Once);
        }

        [Fact]
        public void Get_GivenExistingId_ReturnsOkWithResult()
        {
            var response = sut.Get(persistedEntity.AppId);

            response
                .Should().BeOfType<OkObjectResult>()
                .Which.Value
                    .Should().BeSameAs(persistedEntity);

            repository.Verify(
                r => r.Get(It.Is<Guid>(i => i == persistedEntity.AppId)),
                Times.Once);
        }

        [Fact]
        public void Post_GivenModelError_ReturnsUnprocessableEntity()
        {
            sut.ModelState.AddModelError("error, dawg", "Something fishy with the dataz");

            var response = sut.Post(nonPersistedEntity.AccountName);

            response
                .Should().BeOfType<StatusCodeResult>()
                .Which.StatusCode
                    .Should().Be(422);
        }

        [Fact]
        public void Post_GivenAccountName_PersistsNewEntity()
        {
            sut.Post(nonPersistedEntity.AccountName);

            repository.Verify(
                r => r.Create(It.Is<string>(a => a == nonPersistedEntity.AccountName)),
                Times.Once);
        }

        [Fact]
        public void Post_GivenAccountName_ReturnsCreatedResult()
        {
            var response = sut.Post(nonPersistedEntity.AccountName);

            response
                .Should().BeOfType<CreatedResult>()
                .Which.Location
                    .Should().Be($"/api/authentication/{persistedEntity.AppId}");
        }

        [Fact]
        public void Put_GivenNonExistingAppId_ReturnsNotFound()
        {
            var response = sut.Put(nonPersistedEntity.AppId, nonPersistedEntity.AccountName);

            response
                .Should().BeOfType<NotFoundResult>();

            repository.Verify(
                r => r.Update(It.IsAny<Guid>(), It.IsAny<string>()),
                Times.Never);
        }

        [Fact]
        public void Put_GivenAppIdAndAccountName_UpdatesEntity()
        {
            sut.Put(persistedEntity.AppId, "new name");

            repository.Verify(
                r => r.Update(It.Is<Guid>(i => i == persistedEntity.AppId), It.Is<string>(n => n.Equals("new name"))),
                Times.Once);
        }

        [Fact]
        public void Put_GivenAppIdAndAccountName_ReturnsNoContentResult()
        {
            var response = sut.Put(persistedEntity.AppId, "new name");

            response
                .Should().BeOfType<NoContentResult>();
        }

        [Fact]
        public void Delete_GivenNonExistingId_ReturnsNotFound()
        {
            var response = sut.Delete(nonPersistedEntity.AppId);

            response
                .Should().BeOfType<NotFoundResult>();

            repository.Verify(
                r => r.Delete(It.IsAny<Guid>()),
                Times.Never);
        }

        [Fact]
        public void Delete_GivenExistingId_ReturnsNoContent()
        {
            var response = sut.Delete(persistedEntity.AppId);

            response
                .Should().BeOfType<NoContentResult>();

            repository.Verify(
                r => r.Delete(It.Is<Guid>(g => g == persistedEntity.AppId)),
                Times.Once);
        }
    }
}
