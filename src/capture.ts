import { bin_grimshot, notify } from "./utils";
import { execSync } from "child_process";

export const capture = async ({
  target,
  area,
}: {
  target: "clipboard" | "file";
  area: "selection" | "screen";
}) => {
  execSync(`${bin_grimshot} check`);

  if (area === "selection") {
    notify("Screenshot", "Select a region to capture");
  }
  execSync(
    `${bin_grimshot} --notify ${target === "clipboard" ? "copy" : "save"} ${
      area === "selection" ? "window" : "output"
    } &`
  );
};
