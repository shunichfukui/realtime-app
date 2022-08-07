/// <reference types="cypress" />

describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Shall navigate to DashBoard when successfully login', () => {
    cy.get('input[placeholder="メールアドレス"]').type('test@gmail.com')
    cy.get('input[placeholder="パスワード"]').type('1111111')
    cy.get("[type='submit']").click()
    cy.get('[data-testid="logout"]').should('be.visible')
  })

  it('Shall navigate to Auth when logout clicked', () => {
    cy.get('input[placeholder="メールアドレス"]').type('test@gmail.com')
    cy.get('input[placeholder="パスワード"]').type('1111111')
    cy.get("[type='submit']").click()
    cy.get('[data-testid="logout"]').should('be.visible')
    cy.get('[data-testid="logout"]').click()
    cy.get('input[placeholder="メールアドレス"]').should('be.visible')
    cy.get('input[placeholder="パスワード"]').should('be.visible')
  })

  it('Shall not navigate to DashBoard with wrong credentials', () => {
    cy.get('input[placeholder="メールアドレス"]').type('test@gmail.com')
    cy.get('input[placeholder="パスワード"]').type('1111111a')
    cy.get("[type='submit']").click()
    cy.get('[data-testid="logout"]').should('not.exist')
  })
})

  export {}