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

namespace TodoAdmin.Core
{
    using Microsoft.EntityFrameworkCore;

    internal partial class AuthenticationDbContext : DbContext
    {
        public virtual DbSet<Authentication> Authentication { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
            optionsBuilder.UseSqlServer(@"Server=localhost\sqlexpress;Database=TodoStorage_Stage;User Id=sa;Password=sa;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Authentication>(entity =>
            {
                entity
                    .HasKey(e => e.AppId)
                    .HasName("PK_Authentication_AppId");

                entity
                    .Property(e => e.AppId)
                    .ValueGeneratedNever();

                entity
                    .Property(e => e.AccountName)
                    .IsRequired()
                    .HasMaxLength(255);

                entity
                    .Property(e => e.Created)
                    .HasColumnType("datetime2")
                    .HasDefaultValueSql("getdate()");

                entity
                    .Property(e => e.Secret)
                    .HasMaxLength(32)
                    .HasColumnType("binary(32)");
            });
        }
    }
}
