#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const yarnLockPath = path.join(process.cwd(), "yarn.lock");
const packageLockPath = path.join(process.cwd(), "package-lock.json");
const pnpmLockPath = path.join(process.cwd(), "pnpm-lock.yaml");

if (!fs.existsSync(yarnLockPath)) {
  console.error(
    "❌ yarn.lock not found. Please use yarn to install dependencies."
  );
  console.error("Run: yarn install");
  process.exit(1);
}

let found = false;
if (fs.existsSync(packageLockPath)) {
  found = true;
  fs.unlinkSync(packageLockPath);
  console.error(
    "❌ package-lock.json found and deleted. This project uses yarn only."
  );
}
if (fs.existsSync(pnpmLockPath)) {
  found = true;
  fs.unlinkSync(pnpmLockPath);
  console.error(
    "❌ pnpm-lock.yaml found and deleted. This project uses yarn only."
  );
}
if (found) {
  console.error("Please use yarn to install dependencies. Run: yarn install");
  process.exit(1);
}

console.log("✅ Package manager check passed. Using yarn.");
