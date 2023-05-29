
import { render } from '@testing-library/react'
import React from 'react'
import { Scoreboard } from './Scoreboard'

describe('Scoreboard', () => {
  test('Should render as expected', () => {
    expect(render(<Scoreboard score={1} />).baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <div
      class="scoreboardOuter"
    >
      <div
        class="scoreboardInner"
      >
        <div>
          <div>
            Score:
            1
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
`)
  })
})
