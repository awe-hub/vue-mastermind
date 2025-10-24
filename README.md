# Mastermind Game (Vue 3 + Vite)

A classic code-breaking game inspired by Mastermind, implemented in Vue 3 and Vite.

## Inspiration

Long long ago, before the modern web, as a 9-year-old kid, I codified Mastermind, one of my favorite logic games at the time, as a personal project. It was one of my first real programming exercises. Beyond the satisfaction of creating a complete, usable game, I remember struggling with implementing a truly random code generator. The computer's built-in random generator was not truly random and could be gamed, so I ended up implementing my own random generator based on the timing of the user's keystrokes.

Recently, I decided to resurrect this game as a means to expand my knowledge and experience with Vue3. Little did I know when I started this project that Mastermind is a go-to exercise for learning new languages. I had to suppress Copilot suggestions to ensure I experienced the necessary struggles needed to truly learn the framework, though I did use the AI to help with debugging and improving syntax and I adapted one of the AI suggestions for a later feature.

As I explored other implementations of this game, I noticed that most are gross simplifications of the original game where the game feedback includes position information for the correct pegs. The original game does **not** indicate which pegs are correct. It only indicates how many pegs have the correct color and are in the correct position, and also how many have the correct color but are in the wrong position. So, as a matter of purpose, my implementation adheres to the original rules, retaining the challenge and entertainment value of the classic game.

Enjoy!

## Features

- Play the classic code-breaking game in your browser
- Responsive, modern UI
- Game statistics (wins/losses) stored in your browser
- Reset and Give Up options
- Feedback pegs (black/white) just like the original game that are **not** position oriented
- Built with Vue 3 `<script setup>` SFCs and Vite

## Live Demo
Play the game here: https://my-mastermind.s3.us-east-2.amazonaws.com/index.html

## Getting Started

### Project Setup

```sh
npm install
```

### Compiles and hot-reloads for development

```sh
npm run dev
```

### Compiles and minifies for production

```sh
npm run build
```

### Preview the production build

```sh
npm run preview
```

### Deploy to GitHub Pages

```sh
npm run deploy
```

## How to Play

- Try to guess the secret color code in 10 attempts or less.
- Click pegs to cycle through the 4 colors: green, red, blue, yellow.
- Submit your guess to receive feedback:
  - **Black peg:** Correct color in the correct position.
  - **White peg:** Correct color in the wrong position.
  - Note that position of the black and white feedback pegs do not relate to the position of your guess!
- Win by guessing the exact code before running out of attempts!

## Legal & Disclaimer

This project is an open-source implementation inspired by the classic Mastermind game.  
**Mastermind** is a registered trademark of Hasbro.  
This project is not affiliated with or endorsed by Hasbro.

The game logic, code, and assets in this repository are original and released under the MIT License.  
Game rules are not copyrightable, but please do not use original Mastermind branding, logos, or proprietary artwork.

## License

MIT License

---

*Built with [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/).*
