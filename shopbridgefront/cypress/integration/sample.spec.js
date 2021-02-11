context('The Home page: inventory details', () =>{
    beforeEach(()=>{
        cy.visit("http://localhost:3000")
        cy.wait('@inventory_request')
    })

    it('check invemtory list', function() {
        cy.get(".container").should("have.length", 5);
    })
})