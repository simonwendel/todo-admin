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

    public class AuthenticationTests
    {
        [Fact]
        public void Equals_GivenSameObject_ReturnsTrue()
        {
            var sut = BuildAuthenticationEntity();

            sut.Equals(sut)
                .Should().BeTrue();
        }

        [Fact]
        public void Equals_GivenNull_ReturnsFalse()
        {
            var sut = BuildAuthenticationEntity();

            sut.Equals(null)
                .Should().BeFalse();
        }

        [Fact]
        public void Equals_GivenObjectOfWrongType_ReturnsFalse()
        {
            var sut = BuildAuthenticationEntity();

            sut.Equals(new object())
                .Should().BeFalse();
        }

        [Fact]
        public void Equals_GivenObjectWithSameProperties_ReturnsTrue()
        {
            var sut = BuildAuthenticationEntity();
            var same = BuildAuthenticationEntity();

            sut.Equals(same)
                .Should().BeTrue();
        }

        [Fact]
        public void Equals_GivenObjectWithDifferingProperties_ReturnsFalse()
        {
            var sut = BuildAuthenticationEntity();
            var differing = BuildDifferingEntities();

            differing.Any(entity => sut.Equals(entity))
                .Should().BeFalse();
        }

        [Fact]
        public void GetHashCode_ReturnsHashByProperties()
        {
            var sut = BuildAuthenticationEntity();

            var start = 17;
            var multiplier = 486187739;

            var hash = start;
            unchecked
            {
                hash = (hash * multiplier) + sut.AppId.GetHashCode();
                hash = (hash * multiplier) + sut.AccountName.GetHashCode();
                hash = (hash * multiplier) + sut.Created.GetHashCode();
                hash = sut.Secret.Aggregate(
                    seed: hash,
                    func: (currentHash, nextSecretByte) => (currentHash * multiplier) + nextSecretByte.GetHashCode());
            }

            sut.GetHashCode()
                .Should().Be(hash);
        }

        private static Authentication BuildAuthenticationEntity()
        {
            return new Authentication
            {
                AppId = new Guid("d3d6289e-5612-433f-82cd-6cff35683aa1"),
                AccountName = "autoFixtureOn.NETCoreWouldBeNice",
                Secret = new byte[]
                {
                    83, 219, 113, 221, 232, 17, 175, 121, 161, 203, 140, 77, 205, 212, 73, 226,
                    107, 59, 199, 13, 10, 191, 183, 43, 150, 110, 157, 165, 98, 200, 87, 229
                },
                Created = DateTime.Now
            };
        }

        private static IEnumerable<Authentication> BuildDifferingEntities()
        {
            var otherEntity1 = BuildAuthenticationEntity();
            otherEntity1.AppId = Guid.NewGuid();

            var otherEntity2 = BuildAuthenticationEntity();
            otherEntity2.AccountName = "otherAccount";

            var otherEntity3 = BuildAuthenticationEntity();
            otherEntity3.Secret[1]++;

            var otherEntity4 = BuildAuthenticationEntity();
            otherEntity4.Created = otherEntity4.Created.AddDays(1);

            return new[] { otherEntity1, otherEntity2, otherEntity3, otherEntity4 };
        }
    }
}
