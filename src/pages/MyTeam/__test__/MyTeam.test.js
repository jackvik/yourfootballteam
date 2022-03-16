import React from 'react'
import { render} from "@testing-library/react"
import MyTeam from '..'
import * as redux from 'react-redux'

beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
  });
describe('MyTeam Component', () => {
    it('LocalStorage getItem method has been called', async () => {
      render(<MyTeam />)
     
      expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    })
  })