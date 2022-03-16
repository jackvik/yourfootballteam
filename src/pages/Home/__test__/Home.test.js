import React from 'react'
import { render} from "@testing-library/react"

import Home from '..'
import * as redux from 'react-redux'

const mockPlayer =[ {
    country: "Chelsea FC",
    id: "171",
    isButton : true,
    name: "Kai Havertz",
    position: "MidFielder",
  }];
  beforeEach(() => {
const spy = jest.spyOn(redux, 'useSelector')
spy.mockReturnValue(mockPlayer)

});

describe('<Home /> spec', () => {
    
it('renders the Home component', () => {
    const { asFragment } = render(<Home />)
    expect(asFragment(<Home />)).toMatchSnapshot()
 })



})