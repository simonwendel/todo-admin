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
    using System.Collections.Generic;
    using System.Linq;
    using FluentAssertions;
    using Xunit;

    public class AuthenticationModelTests
    {
        [Fact]
        public void Equals_GivenSameObject_ReturnsTrue()
        {
            var sut = BuildAuthenticationModel();

            sut.Equals(sut)
                .Should().BeTrue();
        }

        [Fact]
        public void Equals_GivenNull_ReturnsFalse()
        {
            var sut = BuildAuthenticationModel();

            sut.Equals(null)
                .Should().BeFalse();
        }

        [Fact]
        public void Equals_GivenObjectOfWrongType_ReturnsFalse()
        {
            var sut = BuildAuthenticationModel();

            sut.Equals(new object())
                .Should().BeFalse();
        }

        [Fact]
        public void Equals_GivenObjectWithSameProperties_ReturnsTrue()
        {
            var sut = BuildAuthenticationModel();
            var same = BuildAuthenticationModel();

            sut.Equals(same)
                .Should().BeTrue();
        }

        [Fact]
        public void Equals_GivenObjectWithDifferingProperties_ReturnsFalse()
        {
            var sut = BuildAuthenticationModel();
            var differing = BuildDifferingModels();

            differing.Any(entity => sut.Equals(entity))
                .Should().BeFalse();
        }

        [Fact]
        public void GetHashCode_ReturnsHashByProperties()
        {
            var sut = BuildAuthenticationModel();

            var start = 17;
            var multiplier = 486187739;

            var hash = start;
            unchecked
            {
                hash = (hash * multiplier) + sut.AppId.GetHashCode();
                hash = (hash * multiplier) + sut.AccountName.GetHashCode();
                hash = (hash * multiplier) + sut.Created.GetHashCode();
            }

            sut.GetHashCode()
                .Should().Be(hash);
        }

        private AuthenticationModel BuildAuthenticationModel()
        {
            return new AuthenticationModel
            {
                AppId = new Guid("d3d6289e-5612-433f-82cd-6cff35683aa1"),
                AccountName = "grko",
                Created = DateTime.Now
            };
        }

        private IEnumerable<AuthenticationModel> BuildDifferingModels()
        {
            var otherModel1 = BuildAuthenticationModel();
            otherModel1.AppId = Guid.NewGuid();

            var otherModel2 = BuildAuthenticationModel();
            otherModel2.AccountName = "otherAccount";
            
            var otherModel3 = BuildAuthenticationModel();
            otherModel3.Created = otherModel3.Created?.AddDays(1);

            return new[] { otherModel1, otherModel2, otherModel3 };
        }
    }
}
