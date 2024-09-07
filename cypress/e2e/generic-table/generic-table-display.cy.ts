describe("Generic table display", () => {
  it("Table should be visible", () => {
    cy.goto("/");
    cy.get("table").should("be.visible");
  });

  it("Table should render the correct table headers", () => {
    cy.goto("/");
    const headers = [
      "",
      "user_id",
      "username",
      "email",
      "role",
      "active",
      "Actions",
    ];

    headers.forEach((header, index) => {
      cy.get("table th").eq(index).should("contain.text", header);
    });
  });

  it("should render the correct number of rows", () => {
    cy.goto("/");
    cy.get("table tbody tr").should("have.length", 8);
  });
});
