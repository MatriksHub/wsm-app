# WSMApp Repository

This repository contains the codebase for the **WSMApp** project. The repository follows a structured branching model to ensure smooth collaboration and maintain the stability of the codebase.

## **Branch Overview**

### 1. **master**

- **Purpose**: 

  - This is the main branch that holds the production-ready code.
  - Only thoroughly tested and approved features are merged into this branch.

- **Usage**:

  - Direct commits are **not allowed**. All changes must come through pull requests from the `staging` branch.

- **Protection**:

  - Protected against direct pushes.
  - Requires pull request reviews and successful tests before merging.

---

### 2. **development**

- **Purpose**: 

  - The primary branch for active development.
  - All feature branches and fixes are merged into `development`.

- **Usage**:
  - Developers create feature branches from this branch.
  - Pull requests from `features` branches are merged here after code reviews.

- **Testing**:
  - Code in this branch is tested internally by the team.

---


### 3. **staging**

- **Purpose**:

  - Acts as the pre-production environment.
  - Contains code from `development` that is ready for final testing before being deployed to `master`.

- **Usage**:

  - Code from `development` is merged into `staging` for QA and final testing.
  - No direct commits are allowed.

- **Testing**:

  - Perform rigorous testing here to catch any issues before release.

---