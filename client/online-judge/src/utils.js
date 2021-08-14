export const tagsData = [
  "Binary Search",
  "Bitmasks",
  "Bruteforce",
  "Combinatorics",
  "Constructive Algorithms",
  "Data Structures",
  "DFS and Similar",
  "Divide and Conquer",
  "Dynamic Programming",
  "DSU",
  "Flows",
  "Games",
  "Graphs",
  "Greedy",
  "Implementation",
  "Math",
  "Number Theory",
  "Shortest Paths",
  "Sortings",
  "Ternary Search",
  "Trees",
  "Two Pointers",
];

export const getDifficulty = (problem) => {
  if (problem.countTotal === 0) {
    return "Hard";
  } else {
    let ratio = problem.countAC / problem.countTotal;
    if (ratio > 0.7) return "Easy";
    else if (ratio > 0.3) return "Medium";
    else return "Hard";
  }
};

export const getDateTime = (value) => {
  const date =
    new Date(value).toLocaleString("default", {
      month: "short",
    }) +
    " " +
    new Date(value).getDate() +
    ", " +
    new Date(value).getFullYear();
  const time = new Date(value).toLocaleTimeString();
  return date + " " + time;
};
