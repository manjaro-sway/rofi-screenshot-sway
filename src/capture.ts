import { bin_grimshot, notify } from "./utils";
import execa from "execa";

export const capture = async ({
  target,
  area,
}: {
  target: "clipboard" | "file";
  area: "selection" | "screen";
}) => {
  await execa.command(`${bin_grimshot} check`);

  if (area === "selection") {
    await notify("Screenshot", "Select a region to capture");
  }
  execa.command(
    `${bin_grimshot} --notify ${target === "clipboard" ? "copy" : "save"} ${
      area === "selection" ? "window" : "output"
    }`,
    { cleanup: false }
  );
};
