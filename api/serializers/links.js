const { SHORT_LINKS_BASE_URL } = process.env;

const serializeLinksListItem = (link) => ({
  original_url: link.original_url,
  code: link.code,
  short_url: new URL(`/${link.code}`, SHORT_LINKS_BASE_URL),
  created_at: link.created_at,
  updated_at: link.updated_at,
  total_clicks_count: link.total_clicks_count,
  unique_visitors_count: link.unique_visitors_count
});

exports.serializeLinksList = (links) => links.map((link) => serializeLinksListItem(link));

exports.serializeNewLinkResponse = (link) => ({
  original_url: link.original_url,
  code: link.code,
  short_url: new URL(`/${link.code}`, SHORT_LINKS_BASE_URL)
});
