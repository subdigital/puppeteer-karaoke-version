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

function extractArtistAndTrack(url) {
  const urlPattern =
    /https?:\/\/[^\/]+\/custombackingtrack\/([a-z0-9-]+)\/([a-z0-9-]+)\.html/;
  const match = url.match(urlPattern);
  if (!match) {
    throw new Error("Invalid song URL format");
  }

  let [_, artistName, trackName] = match;

  // Sanitize names
  artistName = artistName.replace(/-/g, "_");
  trackName = trackName.replace(/-/g, "_");

  return { artistName, trackName };
}

export default { getArgValue, sleep, extractArtistAndTrack };
