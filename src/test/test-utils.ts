import { render } from '@testing-library/react';
import { ReactElement } from 'react';

// Reutilizar render con un proveedor si es necesario
const customRender = (ui: ReactElement, options = {}) => 
  render(ui, { wrapper: ({ children }) => children, ...options });

export * from '@testing-library/react';
export { customRender as render };