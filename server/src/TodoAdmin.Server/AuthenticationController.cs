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

namespace TodoAdmin.Server
{
    using System;
    using Microsoft.AspNetCore.Mvc;
    using TodoAdmin.Core;

    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly IAuthenticationRepository repository;

        public AuthenticationController(IAuthenticationRepository repository)
        {
            this.repository = repository
                ?? throw new ArgumentNullException(nameof(repository));
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(repository.GetAll());
        }

        [HttpGet("{appId}")]
        public IActionResult Get(Guid appId)
        {
            var result = repository.Get(appId);
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Authentication authentication)
        {
            if (ModelState.IsValid == false)
            {
                // 422 -> Unprocessable Entity
                return StatusCode(422);
            }

            if (repository.Get(authentication.AppId) != null)
            {
                // 409 -> Conflict
                return StatusCode(409);
            }

            var newEntity = repository.Create(authentication.AccountName);
            var url = $"/api/authentication/{newEntity.AppId}";

            return Created(url, newEntity);
        }

        [HttpPut("{appId}")]
        public IActionResult Put(Guid appId, [FromBody]Authentication authentication)
        {
            if (appId != authentication.AppId || repository.Get(appId) == null)
            {
                return NotFound();
            }

            repository.Update(authentication);
            return NoContent();
        }

        [HttpDelete("{appId}")]
        public IActionResult Delete(Guid appId)
        {
            var authentication = repository.Get(appId) as Authentication;
            if (authentication == null)
            {
                return NotFound();
            }

            repository.Delete(appId);
            return NoContent();
        }
    }
}
