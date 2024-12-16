[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/CPaVbk1_)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17551392)
# mash-game-starter

A starter template for students working on a "mash" like game in JavaScript, using React as a basic framework.

## Running this Project
To run this project, open the Terminal (below) and type:

```sh
npm run dev
```

## Requirements

Build a game using React which uses lists and strings. The project is named the "MASH" project because "MASH" is one such game: you tell someone's fortunes by compiling a list of possibilities (MASH stands for possible domiciles: Mansion, Apartment, Shack or House), and then traditionally using a counting method, you choose among the options to tell the users fortune.

You do not have to implement MASH, though -- you can think of another game, such as:

- **the dictionary game**: guess a word by alphabetically narrowing in on it.
- **word scrambler**: present a scrambled word to the user, who must unscramble it.
- **memory game**: create a grid of "cards" -- when user clicks them, they reveal a word
  which they must remember. User's goal is to match cards in as few clicks as possible.
- **mad libs**: ask the user for words that match given parts of speech, then fill in a story
  using those words.  
- **sentence scrambler**: like word scrambler, but use a famous phrase instead of a simple word.
- **hangman**: guess a word by filling in letters.

Note: if you want to make the game fit a more specific purpose, you could tailor the topic to a particular motif: for example, you could build a sentence scrambler using lines from famous speeches in history or from a favorite movie series.

## Resources

There are *many* resources on the web that will help you with React. However, I strongly recommend beginning with our textbook (ThinkJS), which has two chapters:

- [Web GUIs with React](https://thinkle-iacs.github.io/think-js/gui.html) - introduces the idea of `.jsx` and the basics of `html`
- [Interactive GUIs](https://thinkle-iacs.github.io/think-js/react-interaction.html) - introduces the concept of state in react.
- [There is a shorter overview below in this file](#tldr-version).
- *Codepen Demos*:
    - [Starter Codepen](https://codepen.io/thinkle-iacs/pen/YPKGvPo?editors=0010) - if you would rather work in a codepen to play w/ ideas quickly, this is the same code
    as is in App.jsx in this project.
    - [Text Inputs](https://codepen.io/thinkle-iacs/pen/xbKEzGy?editors=0010)
    - [Conditional Output ("If" logic in templates)](https://codepen.io/thinkle-iacs/pen/bNbwKwg?editors=0010)
    - [Using Lists as State](https://codepen.io/thinkle-iacs/pen/azomKwX?editors=0010).
    - [Collection of Demos](https://codepen.io/collection/QbLrJg) - I will add more demos here as the class works on the project!

## Example Prompt

Note: if you try to get help from AI with this project, a problem is that much React code is too complex for beginners. I recommend two steps:


1. Paste this text in at the start of any chat:
```text
	I am a beginner learning React, and I’m working on a project where I’m managing lists and strings as basic data types. I am using React18 and using useState for
    state management. Please act as a coding coach and explain concepts clearly and step by step. Here are the specific details about my project and how I’m approaching it: all of my code and state exists in a top-level App component (I'm not yet learning to pass state between components). I will use helper functions to separate out complex logic, as I'm learning to break code into functions. I will avoid ternary statements and overly terse code (such as complex chained uses of .map, .filter, etc. or nested ternary statements) and prefer clear 
    expressive logic like if statements and for... of loops where possible. My goal is to write a simple game which uses lists and strings and updates the UI based on state. Please avoid advanced techniques or methods that might confuse me and stick to clear, beginner-friendly examples. Please ask follow-up questions to engage me and help test and build my understanding.  Remind me to cite help I get from AI in my work using comments! Please work slowly and one step at a time.
```
2. When getting help, paste your entire App.jsx file into any AI you prompt so it has context.
3. Always cite help you get from AI in comments.

## TLDR Version

The short version is this: in `jsx` files, we define a new data type, much like a string or a number, which is markup, so you can
write a function like this:

```jsx
const makeHelloTag = () => {
    return <h1>Hello</h1>
}
```

You can insert JavaScript expressions into your markup using `{...}` fences, so you can also create jsx like this:

```jsx
const makeGreeting = (name, age) => {
    return <h1>Hello {name}, on your next birthday you'll be {age + 1}</h1>
}
```

React "components" are by convention functions with a capitalized letter that return JSX, and they can be used much like
tags in HTML. For this project, we will just make one component: App, which is defined in `App.jsx`.

```jsx
export const App = () => {
    ...
    // return some markup...
    return <></>
}
```

### Events & State

Two key concepts in all GUI-driven programs are events and state, i.e.:

1. **state** - what is the current state of the program.
2. **events** - what inputs can change the current state of the program.

React is named "react" because it is a system designed to "react" to changes
in state. Anything that your user does that changes the output of your program
will need to change a piece of *state* because in React, every new output is
linked to a change in state.

In the starter App, there is a dummy piece of state representing a switch:

```jsx
...
const [toggle, setToggle] = useState(toggle);
```

In react, any time you want to *change* a state, you have to call the special
*setter* function, so you can't simply assign a new value...

```jsx
toggle = false; // YOU CAN'T DO THIS!
```

but rather, you have to call a function:

```jsx
setToggle(false);
```

Why? Because you're not simply changing a value in React: every time you change state,
you're actually re-rendering your entire component!



