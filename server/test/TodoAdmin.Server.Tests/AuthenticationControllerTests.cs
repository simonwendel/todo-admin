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

        private readonly int existingId;

        private readonly int nonExistingId;

        private readonly AuthenticationController sut;

        public AuthenticationControllerTests()
        {
            persistedEntities = new Authentication[0];
            persistedEntity = new Authentication();

            existingId = 8;
            nonExistingId = 9;

            repository = new Mock<IAuthenticationRepository>();
            repository
                .Setup(r => r.GetAll())
                .Returns(persistedEntities);

            repository
                .Setup(r => r.Get(It.Is<int>(i => i == nonExistingId)))
                .Returns((Authentication)null);

            repository
                .Setup(r => r.Get(It.Is<int>(i => i == existingId)))
                .Returns(persistedEntity);

            repository
                .Setup(r => r.Delete(It.Is<int>(i => i == nonExistingId)))
                .Returns(false);

            repository
                .Setup(r => r.Delete(It.Is<int>(i => i == existingId)))
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
                r => r.Get(It.Is<int>(i => i == nonExistingId)),
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
                r => r.Get(It.Is<int>(i => i == existingId)),
                Times.Once);
        }

        [Fact]
        public void Delete_GivenNonExistingId_ReturnsNotFound()
        {
            var response = sut.Delete(nonExistingId);

            response
                .Should().BeOfType<NotFoundResult>();

            repository.Verify(
                r => r.Delete(It.Is<int>(i => i == nonExistingId)),
                Times.Once);
        }

        [Fact]
        public void Delete_GivenExistingId_ReturnsNoContent()
        {
            var response = sut.Delete(existingId);

            response
                .Should().BeOfType<NoContentResult>();

            repository.Verify(
                r => r.Delete(It.Is<int>(i => i == existingId)),
                Times.Once);
        }
    }
}
