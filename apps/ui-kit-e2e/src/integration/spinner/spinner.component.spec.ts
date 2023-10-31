describe('ui-kit', () => {
  beforeEach(() => cy.visit('/iframe.html?id=spinnercomponent--primary'));
  it('should render the component', () => {
    cy.get('cz-spinner').should('exist');
  });
});
