# tetris
A simple tetris game in react.

I wanted to do a deep dive into how React hooks manage references under complex scenarios, so dove into a system with a game loop that would re-run paints on every loop.
I had so much fun I decided to polish it a bit with some refactoring and tests (not so much fun!)

Not sure if I would take the exact same approach were I to do this again. Some problems that came out of my approach:
* The ahead-of-loop check for collisions with the bottom of the grid create some edge cases where the tetris blocks can't be swung under other shapes.
* Rather than writing a true rotational algo I short-cut it with multiple hardcoded templates for each shape. Pragmatic, but not as much fun!
* It's possible to rotate a shape out of the edge of the grid, so I probably need some checks against the grid borders when rotating.
* Adding levels that speed up the game would be a pain as I have used the game 'tick' number as a double for the x coordinate.

```
npm run build               # compile the application
npm run start               # run the application
npm run test                # run the Jest unit tests
npm run lint                # run Eslint
```