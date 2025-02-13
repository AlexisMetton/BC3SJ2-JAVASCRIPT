describe("Tests d'authentification", () => {
  const user = {
      nom: "Test",
      prenom: "User",
      email: "testuser@example.com",
      mot_de_passe: "password123"
  };

  beforeEach(() => {
      cy.visit("http://localhost:5173");
  });

  it("Inscription d'un nouvel utilisateur", () => {
      cy.visit("/register");

      cy.get("input[name='nom']").type(user.nom);
      cy.get("input[name='prenom']").type(user.prenom);
      cy.get("input[name='email']").type(user.email);
      cy.get("input[name='mot_de_passe']").type(user.mot_de_passe);
      cy.get("button[type='submit']").click();

      //cy.contains("Utilisateur inscrit avec succès").should("exist");
  });

  it("Connexion avec l'utilisateur inscrit", () => {
      cy.visit("/login");

      cy.get("input[name='email']").type(user.email);
      cy.get("input[name='mot_de_passe']").type(user.mot_de_passe);
      cy.get("button[type='submit']").click();

      //cy.url().should("include", "/profile");
      //cy.contains("Profil Utilisateur").should("exist");
  });
});
