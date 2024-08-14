import cheerio from 'cheerio';

const getUggItemBuilds = async (champion) => {
  const url = `https://u.gg/lol/champions/${champion}/build`;
  
  // Use fetch instead of axios
  const response = await fetch(url);
  const data = await response.text(); // Convert response to text

  const $ = cheerio.load(data);

  const itemBuilds = [];

  $('.recommended-items div').each((i, element) => {
    const build = [];
    $(element).find('.item').each((j, item) => {
      build.push($(item).attr('alt'));  // Getting the item's name from the 'alt' attribute
    });
    itemBuilds.push(build);
  });

  return itemBuilds;
};

export default async function handler(req, res) {
  const { champion } = req.query;

  if (!champion) {
    return res.status(400).json({ error: 'Champion is required' });
  }

  try {
    const builds = await getUggItemBuilds(champion);
    res.status(200).json(builds);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item builds' });
  }
}
