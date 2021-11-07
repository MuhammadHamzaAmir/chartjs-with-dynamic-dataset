cube(`Transaction`, {
  sql: `SELECT * FROM public.transaction`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, campaignId]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    campaignId: {
      sql: `campaign_id`,
      type: `string`
    }
  },
  
  dataSource: `default`
});
