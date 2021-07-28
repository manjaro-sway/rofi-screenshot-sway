import execa from "execa";

export const notify = (
  title: string,
  message: string,
  timeoutSeconds: number = 1
) => {
  return execa(`notify-send`, [
    title,
    message,
    "-t",
    `${timeoutSeconds * 1000}`,
  ]);
};

export const countdown = async (title: string, times: number = 3) => {
  for (let i = times; i--; i >= 0) {
    await notify(title, `${title} in ${i + 1} seconds`);
    await execa("sleep", ["1"]);
  }
};

export const bin_grimshot = "/usr/share/sway/scripts/grimshot";
