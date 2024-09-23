#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";
import * as fs from "fs";
import { nanoid } from "nanoid";

const program = new Command();
const STORE = "./src/tasks.json";

interface Task {
  id: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  createdAt: Date;
  updatedAt: Date;
}

function loadTasks(): Task[] {
  if (!fs.existsSync(STORE)) {
    return [];
  }

  const data = fs.readFileSync(STORE, "utf-8");
  return JSON.parse(data) as Task[];
}

function saveTasks(tasks: Task[]): void {
  fs.writeFileSync(STORE, JSON.stringify(tasks, null, 2), "utf-8");
}

program
  .command("add <task>")
  .description("Add new task")
  .action((task: string) => {
    const tasks = loadTasks();
    const newTask: Task = {
      id: nanoid(),
      description: task,
      status: "todo",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(chalk.green(`Task added succssfully (ID: ${newTask.id})`));
  });

program
  .command("update <id> <newTask>")
  .description("Update a task")
  .action((id: string, newTask: string) => {
    const tasks = loadTasks();
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.description = newTask;
      task.updatedAt = new Date();
      saveTasks(tasks);
      console.log(chalk.blue(`Task update to: ${newTask}`));
    } else {
      console.log(chalk.red(`Task not found`));
    }
  });

program
  .command("delete <id>")
  .description("Delete a task")
  .action((id: string) => {
    let tasks = loadTasks();
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks(tasks);
    console.log(chalk.red(`Task with ID: ${id} deleted`));
  });

program
  .command("mark-in-progress <id>")
  .description("Mark task as in-progress")
  .action((id: string) => {
    const tasks = loadTasks();
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.status = "in-progress";
      task.updatedAt = new Date();
      saveTasks(tasks);
      console.log(
        chalk.yellow(`Task marked as in-progress: ${task.description}`)
      );
    } else {
      console.log(chalk.red("Task not found"));
    }
  });

program
  .command("mark-done <id>")
  .description("Mark task as done")
  .action((id: string) => {
    const tasks = loadTasks();
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.status = "done";
      task.updatedAt = new Date();
      saveTasks(tasks);
      console.log(chalk.yellow(`Task marked as done: ${task.description}`));
    } else {
      console.log(chalk.red("Task not found"));
    }
  });

program
  .command("list [status]")
  .description(
    "Lists all tasks or filters tasks by status (todo, in-progress, done)"
  )
  .action((status?: string) => {
    const tasks = loadTasks();

    if (status) {
      const filteredTasks = tasks.filter((t) => t.status === status);
      if (filteredTasks.length) {
        console.log(chalk.cyan(`${status} tasks:`));
        filteredTasks.forEach((t) => console.log(`${t.id}: ${t.description}`));
      } else {
        console.log(chalk.red(`No tasks found with status: ${status}`));
      }
    } else {
      console.log(chalk.cyan(`Tasks:`));
      tasks.forEach((t) =>
        console.log(`${t.id}: ${t.description} [${t.status}]`)
      );
    }
  });

program.parse(process.argv);
