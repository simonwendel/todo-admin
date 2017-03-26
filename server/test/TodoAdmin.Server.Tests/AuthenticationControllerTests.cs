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

        private readonly Guid existingId;

        private readonly Guid nonExistingId;

        private readonly AuthenticationController sut;

        public AuthenticationControllerTests()
        {
            persistedEntities = new Authentication[0];

            persistedEntity = Authentication.New();
            nonPersistedEntity = Authentication.New();

            existingId = persistedEntity.AppId;
            nonExistingId = nonPersistedEntity.AppId;

            repository = new Mock<IAuthenticationRepository>();
            repository
                .Setup(r => r.GetAll())
                .Returns(persistedEntities);

            repository
                .Setup(r => r.Get(It.Is<Guid>(i => i == nonExistingId)))
                .Returns((Authentication)null);

            repository
                .Setup(r => r.Get(It.Is<Guid>(i => i == existingId)))
                .Returns(persistedEntity);

            repository
                .Setup(r => r.Create(It.Is<Authentication>(a => a == nonPersistedEntity)))
                .Returns(persistedEntity);

            repository
                .Setup(r => r.Delete(It.Is<Guid>(i => i == nonExistingId)))
                .Returns(false);

            repository
                .Setup(r => r.Delete(It.Is<Guid>(i => i == existingId)))
                .Returns(true);

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
            var response = sut.Get(nonExistingId);

            response
                .Should().BeOfType<NotFoundResult>();

            repository.Verify(
                r => r.Get(It.Is<Guid>(i => i == nonExistingId)),
                Times.Once);
        }

        [Fact]
        public void Get_GivenExistingId_ReturnsOkWithResult()
        {
            var response = sut.Get(existingId);

            response
                .Should().BeOfType<OkObjectResult>()
                .Which.Value
                    .Should().BeSameAs(persistedEntity);

            repository.Verify(
                r => r.Get(It.Is<Guid>(i => i == existingId)),
                Times.Once);
        }

        [Fact]
        public void Post_GivenModelError_ReturnsUnprocessableEntity()
        {
            sut.ModelState.AddModelError("error, dawg", "Something fishy with the dataz");

            var response = sut.Post(nonPersistedEntity);

            response
                .Should().BeOfType<StatusCodeResult>()
                .Which.StatusCode
                    .Should().Be(422);
        }

        [Fact]
        public void Post_GivenAuthentication_PersistsEntity()
        {
            sut.Post(nonPersistedEntity);

            repository.Verify(
                r => r.Create(It.Is<Authentication>(a => a == nonPersistedEntity)),
                Times.Once);
        }

        [Fact]
        public void Post_GivenAuthentication_ReturnsCreatedResult()
        {
            var response = sut.Post(nonPersistedEntity);

            response
                .Should().BeOfType<CreatedResult>()
                .Which.Location
                    .Should().Be($"/api/authentication/{persistedEntity.AppId}");
        }

        [Fact]
        public void Delete_GivenNonExistingId_ReturnsNotFound()
        {
            var response = sut.Delete(nonExistingId);

            response
                .Should().BeOfType<NotFoundResult>();

            repository.Verify(
                r => r.Delete(It.Is<Guid>(i => i == nonExistingId)),
                Times.Once);
        }

        [Fact]
        public void Delete_GivenExistingId_ReturnsNoContent()
        {
            var response = sut.Delete(existingId);

            response
                .Should().BeOfType<NoContentResult>();

            repository.Verify(
                r => r.Delete(It.Is<Guid>(i => i == existingId)),
                Times.Once);
        }
    }
}
