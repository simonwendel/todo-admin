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
    using Moq;
    using TodoAdmin.Domain;
    using Xunit;

    public class AuthenticationControllerTests
    {
        private readonly Mock<IAuthenticationRepository> repository;

        private readonly IEnumerable<Authentication> persistedEntities;

        private readonly AuthenticationController sut;

        public AuthenticationControllerTests()
        {
            persistedEntities = new Authentication[0];

            repository = new Mock<IAuthenticationRepository>();
            repository
                .Setup(r => r.GetAll())
                .Returns(persistedEntities);

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
        public void Get_ReturnsAllFromRepository()
        {
            var retrievedEntities = sut.Get();

            retrievedEntities
                .Should().BeSameAs(persistedEntities);

            repository.Verify(
                r => r.GetAll(),
                Times.Once);
        }
    }
}
