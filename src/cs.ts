import { Quest, Task } from "grimoire-kolmafia";
import { myStorageMeat, myAdventures, Path, myPath } from "kolmafia";
import { $item, ascend, $class, Lifestyle, $path, get } from "libram";
import { garbo } from "./garbo";
import {
  cliExecuteThrow,
  breakStone,
  breakfast,
  dupeTask,
  swagger,
  trackSessionMeat,
} from "./util";

export const csAscend: Task[] = [
  {
    name: "Ascend",
    after: ["Swagger"],
    do: () => cliExecuteThrow("phccs_gash softcore"),
    completed: () => get("ascensionsToday") === 1,
  },
];

export const csQuest: Quest<Task> = {
  name: "CS",
  tasks: [
    {
      name: "PHCCS",
      completed: () => myPath() !== $path`Community Service`,
      do: () => cliExecuteThrow("phccs softcore"),
    },
    {
      name: "Hagnk",
      completed: () => myStorageMeat() === 0,
      do: () => cliExecuteThrow("hagnk all"),
    },
    breakStone(),
    breakfast(),
    dupeTask(),
    ...garbo(true, ["Hagnk"]),
    swagger(),
    trackSessionMeat("CS"),
    {
      name: "Ascend",
      after: ["Overdrunk"],
      ready: () => myAdventures() === 0,
      completed: () => get("ascensionsToday") === 2,
      do: () =>
        ascend(
          Path.none,
          $class`Seal Clubber`,
          Lifestyle.casual,
          "platypus",
          $item`astral six-pack`
        ),
    },
  ],
  completed: () => get("ascensionsToday") > 1,
};
