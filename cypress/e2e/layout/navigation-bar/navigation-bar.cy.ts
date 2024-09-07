describe("navigation bar", () => {
  it("Table should have 2 navigation items", () => {
    cy.goto("/");
    const navitems = ["users-navitem", "orders-navitem"];

    navitems.forEach((navitem) => {
      cy.get(`[data-testid='${navitem}']`).should("exist");
    });
  });
});
