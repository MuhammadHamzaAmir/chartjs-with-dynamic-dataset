cube(`Campaigns`, {
  sql: `
SELECT
  campaign_id,
  campaign_name
FROM email
`,

  joins: {
    Transaction: {
      relationship: `hasMany`,
      sql: `${Transaction}.campaign_name = ${Campaigns}.campaign_name
      AND ${Transaction}.campaign_id = ${Campaigns}.campaign_id`,
    },
  },
  measures: {
    count: {
      type: `count`,
    },
  },

  dimensions: {
    id: {
      sql: `campaign_id`,
      type: `string`,
      primaryKey: true,
    },

    name: {
      sql: `campaign_name`,
      type: `string`,
    },
  },
});
