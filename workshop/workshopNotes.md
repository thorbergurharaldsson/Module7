### 1. Setting up the workspace

Run the following command in your terminal to install the create-nx-workspace package and create the workspace for building applications:

`npm install -g create-nx-workspace`

`npx create-nx-workspace --preset=apps`

Workspace options:

```
Workspace name: MyOrg
Use NX Cloud: No
```

Now we have an empty monorepo called MyOrg, let's navigate into that monorepo using: `cd my-org`

### 2. Generating applications

Before we generate the apps we need to install the nrwl/react package to create a react app

`npm install @nrwl/react`

Now let's create two react application, you can call them what ever you want but I will call mine web1 and web2:

`npx nx generate @nrwl/react:app web1`

`npx nx generate @nrwl/react:app web2`

Next we will create an api using express

First we need to install express using: `npm install @nrwl/express`

Then we can generate the application `npx nx g @nrwl/express:app api`

### 3. Generating libraries

Now that the applications are ready let's generate some libraries!

First let's generate a library for shared components that we can use to create react components that will be accessible throughout the repository

`npx nx g @nrwl/react:library sharedComponents`

Next let's generate a library for utils that we can also use throughout the repo:

`npx nx g library utils`

Now the monorepo is setup ready for us to start coding.

### 4. Creating a react component

Now the monorepo is setup and we can start developing. I will type `code .` in the terminal to open vs code in the current directory

Next I will navigate to libs > shared-components > src > lib and in the lib directory create a file called foo.tsx and write the following code in the file:

```tsx
export const Foo = () => {
  return <p>This component can be used everywhere</p>;
};

export default Foo;
```

We also need to export it from the shared-components library, we do this in the index.ts file under src

Add this line: `export * from "./lib/foo"`

### 5. Using the component

Now let's use the component in the web apps we have, let's navigate to apps > web1 > src > app > app.tsx

Here we will import the component and use it the the code so the app.tsx file should look like this:

```tsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "./app.module.scss";
import NxWelcome from "./nx-welcome";
import { Foo } from "@my-org/shared-components";

export function App() {
  return (
    <>
      <Foo />
      <NxWelcome title="web1" />
      <div />
    </>
  );
}

export default App;
```

Now let's do the same for web2

### 6. Serving the applications

Since both react apps are served on the same port by default we need to edit the project.json in the web2 folder and add "port": 4201 to the serve > options like this:

```
"serve": {
  "executor": "@nrwl/web:dev-server",
  "options": {
    "buildTarget": "web2:build",
    "hmr": true,
    "port": 4201
  },
  "configurations": {
    "production": {
      "buildTarget": "web2:build:production",
      "hmr": false
    }
  }
}
```

We can serve individual applications by using the `npx nx serve web1` command or serve multiple or all applications at once using the run-many command like this:
`npx nx run-many --target=serve --all`

I will use the run-many command to run everything at once

### 7. Viewing the dependancy graph

A really cool thing about using NX is that we can see a dependancy graph to see what our apps and libraries are depending on, let's try running it for this project: `npx nx dep-graph`

Now we can see that web1 and web2 are dependant on shared-components. Now let's try to make the dependancy graph a bit more complex just for demenstration purposes.

To do this I will import the utils in both web1, api and shared-components
`import { Utils } from "@my-org/utils"`

Now if we restart the dep-graph we can see that

- api is dependant on utils
- web1 is dependant on utils and shared-components
- web2 is dependant on shared-components
- shared-components is dependant on utils

This means that if we for example make changes to the utils library, that change will affect api, web1 and shared components, web2 will be affected through shared components. If we make changes to shared-components, that will affect web1 and web2 but not api and utils.
