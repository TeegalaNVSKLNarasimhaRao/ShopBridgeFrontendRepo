context('The Home page: inventory details', () =>{
    beforeEach(()=>{
        cy.invokeFixtures()
        cy.visit("http://localhost:3000/")
        cy.wait("@inventory_request")
    })

    it('create inventory item', function() {
        cy.get(".btn-primary").eq(0).click();
        cy.get("input[id=name]").type("product3");
        cy.get("textarea[id=description]").type("Item in inventory");
        cy.get("input[id=price]").type("20");
        cy.get(".btn-primary").eq(1).click();
        cy.wait("@inventory_create_request");
    })
})