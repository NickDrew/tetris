import { render } from "@testing-library/react";
import { Game } from "./Game";


describe("Game", () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
    });

    test("Should render as expected", () => {
        expect(render(<Game />).baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <div
      class="game"
      tabindex="0"
    >
      <div
        class="cellgrid"
      >
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color1"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color1"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
        <div
          class="cell color0"
        />
      </div>
      <div
        class="scoreboardOuter"
      >
        <div
          class="scoreboardInner"
        >
          <div>
            <div>
              Score:
              0
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
`)
    })
})