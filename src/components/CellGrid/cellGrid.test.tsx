import { render } from '@testing-library/react'
import React from 'react'

import { CellGrid } from './CellGrid'

describe('CellGrid', () => {
  test('Should render as expected', () => {
    expect(render(<CellGrid rows={2} cols={3} defaultColor={1} colorGrid={[[0, 0, 0], []]} />).baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <div
      class="cellgrid"
    >
      <div
        class="cell color1"
      />
      <div
        class="cell color1"
      />
      <div
        class="cell color1"
      />
      <div
        class="cell color1"
      />
      <div
        class="cell color1"
      />
      <div
        class="cell color1"
      />
    </div>
  </div>
</body>
`)
  })
})
