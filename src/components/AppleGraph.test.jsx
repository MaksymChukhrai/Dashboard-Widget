import React from 'react';
import { render, screen } from '@testing-library/react';
import AppleGraph from './AppleGraph';

describe('AppleGraph Component', () => {
    test('renders spinner while loading', () => {
      render(<AppleGraph />); // Передайте компоненту AppleGraph пустые пропсы для имитации загрузки данных
  
      // Проверяем, что спиннер отображается при загрузке данных
      const spinnerElement = screen.getByAltText('Loading...');
      expect(spinnerElement).toBeInTheDocument();
    });
  });