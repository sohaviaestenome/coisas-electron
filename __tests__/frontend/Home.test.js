// Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from '../../src/pages/Home';

// Mock the Electron functions
window.electron = {
  getCoisas: () => Promise.resolve({ data: [
    { id: 1, nome: 'Item 1', origem: 'City A', destino: 'City B' },
    { id: 2, nome: 'Item 2', origem: 'City A', destino: 'City B' },
  ]}),
};

describe('Home component', () => {
  it('renders Coisas a Levar list with items', async () => {
    render(<Home />);

    // Check if the header is rendered
    expect(screen.getByText(/Coisas a Levar/i)).toBeInTheDocument();

    // Wait for the items to load and check if they are rendered
    const listItem1 = await screen.findByText('Item 1');
    const listItem2 = await screen.findByText('Item 2');
    expect(listItem1).toBeInTheDocument();
    expect(listItem2).toBeInTheDocument();

    // Check if the origin and destination are rendered
    expect(screen.getByText('City A - City B')).toBeInTheDocument();
  });

  it('creates a new Coisa and updates the list', async () => {
    // Mock the Electron functions for adding a Coisa
    window.electron.addCoisa = () => Promise.resolve({ data: { id: 3, nome: 'Item 3', origem: 'City A', destino: 'City B' }});
    window.electron.getCidades = () => Promise.resolve([
      { nome: 'City A' },
      { nome: 'City B' },
      { nome: 'City C' },
    ]);

    render(<Home />);

    // Click on the "Create Coisa a Levar" button
    const createButton = screen.getByText(/Create Coisa a Levar/i);
    userEvent.click(createButton);

    // Wait for the form to open and fill in the fields
    const nomeField = await screen.findByLabelText('Nome');
    userEvent.type(nomeField, 'Item 3');

    const origemField = screen.getByLabelText('Origem');
    userEvent.selectOptions(origemField, 'City A');

    const destinoField = screen.getByLabelText('Destino');
    userEvent.selectOptions(destinoField, 'City B');

    const quantidadeField = screen.getByLabelText('Quantidade');
    userEvent.type(quantidadeField, '3');

    // Click on the "Criar" button to submit the form
    const submitButton = screen.getByText(/Criar/i);
    userEvent.click(submitButton);

    // Wait for the Snackbar to show up and close it
    const snackbar = await screen.findByText(/Coisa a levar criada com sucesso!/i);
    userEvent.click(snackbar);

    // Wait for the new item to appear in the list
    const newItem = await screen.findByText('Item 3');
    expect(newItem).toBeInTheDocument();
  });
});
