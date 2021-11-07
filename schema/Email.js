cube(`Email`, {
  sql: `SELECT * FROM public.email`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, campaignName, campaignId]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    campaignName: {
      sql: `campaign_name`,
      type: `string`
    },
    
    campaignId: {
      sql: `campaign_id`,
      type: `string`
    }
  },
  
  dataSource: `default`
});
