module.exports = ({ db }) => ({
  async getLinks() {
    return db.$queryRaw`
    SELECT
      links.id as id,
      original_url,
      code,
      links.created_at as created_at,
      links.updated_at as updated_at,
      count(link_visits.id)::int as total_clicks_count,
      count(DISTINCT link_visits.visitor_id)::int as unique_visitors_count
    FROM links
    LEFT JOIN link_visits ON links.id = link_visits.link_id
    GROUP BY links.id
  `;
  },
  async createLink({ original_url, code }) {
    return db.link.create({
      data: {
        original_url,
        code
      },
      select: {
        code: true,
        original_url: true
      }
    });
  }
});
