#!/usr/bin/env node
import { RofiElement } from "./types";
import { lookpath } from "lookpath";
import { capture } from "./capture";
import { bin_grimshot } from "./utils";

const target_file: RofiElement = { name: "file", icon: "💾" };
const target_clipboard: RofiElement = { name: "clipboard", icon: "📎" };
const targets: RofiElement[] = [target_file, target_clipboard];

const area_screen: RofiElement = { name: "screen", icon: "🖥" };
const area_selection: RofiElement = { name: "selection", icon: "📐" };
const areas: RofiElement[] = [area_screen, area_selection];

const parse = (input: RofiElement) => input.icon + " " + input.name;
const separator = " => ";

const required_binaries = ["swaymsg", bin_grimshot, "notify-send", "sleep"];

(async () => {
  // make sure all utils are installed
  for (const binaryName of required_binaries) {
    const path = await lookpath(binaryName);
    if (!path) throw new Error(`${binaryName} not found in path`);
  }

  const arg = process.argv[2];
  const [in_target, in_area, in_format] =
    arg !== undefined ? arg.split(separator) : [arg];

  // mode selected => target?
  if (arg === undefined) {
    targets.forEach((target) => console.log(parse(target)));
    process.exit();
  }

  // target selected => area?
  if (!!in_target && !in_area) {
    areas.forEach((area) => console.log(`${arg} => ${parse(area)}`));
    process.exit();
  }

  // perform capture
  if (!!in_target && !!in_area && !in_format) {
    await capture({
      target: in_target.includes("clipboard") ? "clipboard" : "file",
      area: in_area.includes("selection") ? "selection" : "screen",
    });
    process.exit();
  }

  throw new Error(`No idea what you want me to do ${arg}`);
})();
