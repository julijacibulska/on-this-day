export const fetchWikiOnThisDay = async () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;

  // TODO: implement error handling
  // POSSIBLE RESPONSES:
  // 200 Success
  // 400 Invalid param
  // 404 NotFound
  // 501 Unsupported language

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_WIKI_ACCESS_TOKEN}`,
    },
  });
  return await response.json();
};
