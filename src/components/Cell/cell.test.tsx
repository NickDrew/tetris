import { render } from '@testing-library/react'
import React from 'react'
import { Cell } from './Cell'

describe('Cell', () => {
  test('Should render as expected', () => {
    expect(render(<Cell color={1} />).baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <div
      class="cell color1"
    />
  </div>
</body>
`)
  })
})
