### Monorepos

- Turborepo - Vercel
- NX - Nrwl
- Bazel - Google
- Package manager - npm/yarn (Workspaces)
- Lerna

### Pros & Cons

### Large monorepos and how they are managed

- Google
  - [Video - Why Google Stores Billions of Lines of Code in a Single Repository](https://youtu.be/W71BTkUbdqE)
  - [Why Google Stores Billions of Lines of Code in a Single Repository](https://cacm.acm.org/magazines/2016/7/204032-why-google-stores-billions-of-lines-of-code-in-a-single-repository/fulltext#R2)
    In the Piper workflow, developers create a local copy of files in the repository before changing them. These files are stored in a workspace owned by the developer. A Piper workspace is comparable to a working copy in Apache Subversion, a local clone in Git, or a client in Perforce. Updates from the Piper repository can be pulled into a workspace and merged with ongoing work, as desired. A snapshot of the workspace can be shared with other developers for review. Files in a workspace are committed to the central repository only after going through the Google code-review process, as described later.
    Most developers access Piper through a system called Clients in the Cloud, or CitC... ...Developers see their workspaces as directories in the file system, including their changes overlaid on top of the full Piper repository. CitC supports code browsing and normal Unix tools with no need to clone or sync state locally... ...This structure means CitC workspaces typically consume only a small amount of storage (an average workspace has fewer than 10 files) while presenting a seamless view of the entire Piper codebase to the developer.
