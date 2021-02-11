context('The Home page: inventory details', () =>{
    beforeEach(()=>{
        cy.invokeFixtures()
        cy.visit("http://localhost:3000/")
        cy.wait("@inventory_request")
    })

    it('check invemtory list', function() {
        cy.get("#wrapper").should("have.length", 1);
        cy.get(".col").eq(1).click()
        cy.get(".row").eq(0).should("have.text", "Name: Item1");
    })
})