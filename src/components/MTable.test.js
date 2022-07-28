/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import MTable from './MTable'

test('renders content', () => {
  const note = {
    content: 'This is a test',
    important: true
  }
  const component = render(<MTable/>)
  console.log(component)
  component.getByText('pulpos')
})
