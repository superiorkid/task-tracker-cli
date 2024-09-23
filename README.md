# Task Tracker CLI

The **Task Tracker CLI** is a challenge project inspired by [roadmap.sh](https://roadmap.sh). It allows you to manage tasks directly from the command line using Node.js and TypeScript. The project focuses on building a simple but functional CLI that lets users add, update, and delete tasks, as well as mark them as completed. This challenge is a great way to practice TypeScript, Node.js, and work with command-line interfaces, making it an excellent learning opportunity for those looking to enhance their backend and tool-building skills. You can find the full details of the challenge [here](https://roadmap.sh/projects/task-tracker).

## Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your system. You can download them from the official [Node.js website](https://nodejs.org/).

## Installation

Follow these steps to install and set up the Task Tracker CLI on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://your-github-repo-url.git
   cd task-tracker-cli
   ```

2. **Install dependencies:**

   ```bash
   npm install  # or yarn install
   ```

3. **Build the project:**

   Compile the TypeScript files into JavaScript:

   ```bash
   npx tsc
   ```

4. **Make the CLI executable:**

   After building, make the `index.js` file executable:

   ```bash
   chmod +x dist/index.js
   ```

5. **Link the CLI tool globally:**

   This will make the CLI accessible from anywhere on your machine:

   ```bash
   sudo npm link
   ```

   Now you can run the `task-cli` command globally.

## Usage

After installing, you can use the following commands to interact with the Task Tracker CLI.

### Adding a New Task

```bash
task-cli add "Buy groceries"
```

### Updating a Task

```bash
task-cli update 1 "Buy groceries and cook dinner"
```

### Deleting a Task

```bash
task-cli delete 1
```

### Marking a Task as In Progress

```bash
task-cli mark-in-progress 1
```

### Marking a Task as Done

```bash
task-cli mark-done 1
```

### Listing All Tasks

```bash
task-cli list
```

### Listing Tasks by Status

```bash
task-cli list todo
task-cli list in-progress
task-cli list done
```

## Development

To develop the CLI further or make changes, follow these steps:

1. Rebuild the TypeScript files
   During development, you can use the watch mode to automatically compile changes:

```bash
npx tsc --watch
```

2. Unlink the CLI tool (if needed):
   If you need to unlink the CLI, run:

   ```bash
   npm unlink
   ```
