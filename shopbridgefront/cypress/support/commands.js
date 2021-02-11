// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("invokeFixtures", () => {
    // sets up cy.server, so cypress knows to prepare network responses
    cy.server();
    // this is where we tell cypress to intercept certain XHR calls, and to stub in our fixture instead
    cy.route("GET", `**/api/inventorys**`, "fixture:inventorys").as("inventory_request");
    cy.route("GET", `**/api/inventorys/${id}`, "fixture:inventory_detail").as("inventory_detail_request");
    cy.route("POST", `**/api/inventorys`, "fixture:inventory_create").as("inventory_create_request");
    cy.route("PUT", `**/api/inventorys/${id}`, "fixture:inventory_edit").as("inventory_edit_request");
    cy.route("DELETE", `**/api/inventorys/${id}`, "fixture:inventory_delete").as("inventory_delete_request");
});