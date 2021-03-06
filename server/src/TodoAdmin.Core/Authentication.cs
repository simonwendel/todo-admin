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

namespace TodoAdmin.Core
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Security.Cryptography;

    internal partial class Authentication : IAuthentication
    {
        private const int SecretLength = 32;

        public Guid AppId { get; internal set; }

        [MinLength(1)]
        [MaxLength(255)]
        public string AccountName { get; internal set; }

        [MinLength(SecretLength)]
        [MaxLength(SecretLength)]
        public byte[] Secret { get; internal set; }

        public DateTime Created { get; internal set; }

        public static Authentication New(string accountName = "N/A")
        {
            return new Authentication
            {
                AppId = Guid.NewGuid(),
                AccountName = accountName,
                Secret = TellMeASecret(),
                Created = DateTime.Now
            };
        }

        public override bool Equals(object obj)
        {
            if (obj == null || obj is Authentication == false)
            {
                return false;
            }

            if (obj == this)
            {
                return true;
            }

            var otherEntity = (Authentication)obj;
            return AppId.Equals(otherEntity.AppId)
                && AccountName.Equals(otherEntity.AccountName)
                && Created.Equals(otherEntity.Created)
                && Secret.SequenceEqual(otherEntity.Secret);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                var hash = (17 * 486187739) + AppId.GetHashCode();
                hash = (hash * 486187739) + AccountName.GetHashCode();
                hash = (hash * 486187739) + Created.GetHashCode();

                foreach (var b in Secret)
                {
                    hash = (hash * 486187739) + b;
                }

                return hash;
            }
        }

        internal void RefreshSecret()
        {
            Secret = TellMeASecret();
        }

        private static byte[] TellMeASecret()
        {
            using (var cryptoProvider = RandomNumberGenerator.Create())
            {
                var secretKey = new byte[SecretLength];
                cryptoProvider.GetBytes(secretKey);
                return secretKey;
            }
        }
    }
}
