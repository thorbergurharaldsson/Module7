### 1. Setting up the workspace

Run the following command in your terminal to create the workspace for building applications: `npx create-nx-workspace --preset=apps`

Workspace options:

```
Workspace name: MyOrg
Use NX Cloud: No
```

Now we have an empty monorepo called MyOrg, let's navigate into that monorepo using: `cd my-org`

### 2. Generating applications

Now let's create two react application, you can call them what ever you want but I will call mine web1 and web2:

`npx nx generate @nrwl/react:app web1`

`npx nx generate @nrwl/react:app web2`

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

Next we will create an api using express

First we need to install express using: `npm install --save-dev @nrwl/express`

Then we can generate the application `npx nx g @nrwl/express:app api`

### 3. Serving the applications

We can serve individual applications by using the `npx nx serve web1` command or serve multiple or all applications at once using the run-many command like this:
`npx nx run-many --target=serve --all`

I will use the run-many command to run everything at once

### 4. Generating libraries

Now that the applications are ready let's generate some libraries!

First let's generate a library for shared components that we can use to create react components that will be accessible throughout the repository

`npx nx g @nrwl/react:library sharedComponents`

Next let's generate a library for utils that we can also use throughout the repo:

`npx nx g library utils`

Now the monorepo is setup ready for us to start coding.

### 5. Creating a react component
