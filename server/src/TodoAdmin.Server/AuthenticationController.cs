/*
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

namespace TodoAdmin.Server
{
    using System;
    using Microsoft.AspNetCore.Mvc;
    using Swashbuckle.AspNetCore.SwaggerGen;
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
        [SwaggerResponse(200, description: "All items returned with response.")]
        public IActionResult Get()
        {
            return Ok(repository.GetAll());
        }

        [HttpGet("{appId}")]
        [SwaggerResponse(200, description: "Item found and returned with response.")]
        [SwaggerResponse(404, description: "No item with specified AppId found.")]
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
        [SwaggerResponse(201, description: "Item created and location returned with response.")]
        [SwaggerResponse(422, description: "Item could not be created due to model errors.")]
        public IActionResult Post([FromBody]string accountName)
        {
            if (ModelState.IsValid == false)
            {
                // 422 -> Unprocessable Entity
                return StatusCode(422);
            }

            var newEntity = repository.Create(accountName);
            var url = $"/api/authentication/{newEntity.AppId}";

            return Created(url, newEntity);
        }

        [HttpPut("{appId}")]
        [SwaggerResponse(204, description: "Item updated. No content.")]
        [SwaggerResponse(404, description: "No item with specified AppId found.")]
        public IActionResult Put(Guid appId, [FromBody]string accountName)
        {
            if (repository.Get(appId) == null)
            {
                return NotFound();
            }

            repository.Update(appId, accountName);
            return NoContent();
        }

        [HttpDelete("{appId}")]
        [SwaggerResponse(204, description: "Item deleted. No content.")]
        [SwaggerResponse(404, description: "No item with specified AppId found.")]
        public IActionResult Delete(Guid appId)
        {
            var authentication = repository.Get(appId);
            if (authentication == null)
            {
                return NotFound();
            }

            repository.Delete(appId);
            return NoContent();
        }
    }
}
