import { render, } from '@testing-library/react'

import { Cell } from "./Cell"


describe("Scoreboard", () => {
    test("Should render as expected", () => {
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