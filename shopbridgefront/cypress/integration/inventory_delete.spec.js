context('The Home page: inventory details', () =>{
    beforeEach(()=>{
        cy.invokeFixtures()
        cy.visit("http://localhost:3000/")
        cy.wait("@inventory_request")
    })

    it('Delete inventory item', function() {
        cy.get(".ml-1").eq(0).click();
        cy.wait("@inventory_delete_request");
    })
})