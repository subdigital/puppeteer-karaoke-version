function getArgValue(args, name) {
  const i = args.indexOf(name);
  console.log("i ", i);
  if (i > -1 && i < args.length - 1) {
    return args[i + 1];
  }
  return null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default { getArgValue, sleep };
