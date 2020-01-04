# Bitdev
### Components easily managed

> Notice: This is a unofficial extension made by Wassim Benzarti

## This extension is still under development

## Getting started
### Step 0: Things to keep in mind
Make sure that you are inside the project that has bit (meaning the .bitmap is in the root folder of the workspace). Currently this is a limitation for now.

### Step 1: Installing bit
You can install [Bit](https://github.com/teambit/bit) globally using this command:
```bash
# using npm
npm install -g bit-bin
# or using yarn
yarn global add bit-bin
```

### Step 2: Login
To login to your [Bit.dev](http://bit.dev/) account follow these steps:
1. Make sure you have a [Bit.dev](http://bit.dev/) account.
2. Ctrl+Shift+p in VScode to open the Command Palette.
3. Type `Bit Login` and hit enter

This command will create a new terminal instance and call `bit login` command, follow the shown instructions in order to complete the login process.

### Step 3: Init Bit project
> If you **already initialized** your project with bit.dev, you can skip this step.

In order to use [Bit](http://bit.dev/) you just need to initialize your project. There is a command palette for this called:
```
Bit: Setup
```

### Enjoy bit
Happy coding!

## Guide
### Commands
1. Init bit project
```
Bit: Setup
```
2. List components

This command will help you find your component's files easily.
```
Bit: List components
```
Once you run it, it will show you all the components of your project. Clicking on one of the components, will prompt the diffrent files of that component. Choose the file that you want to open.

3. Add a component

Before running this command make sure you are inside `index.js` file of your component
```
Bit: Add component
```
4. Login into bit.dev
```
Bit: Login
```