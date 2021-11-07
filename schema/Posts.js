cube(`Posts`, {
  sql: `SELECT * FROM public.posts`,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  joins: {
    PostTopics: {
      relationship: `belongsTo`,
      sql: `${PostTopics}.post_id = ${Posts}.id`,
    },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [id],
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
    },

    post: {
      sql: `post`,
      type: `string`,
    },
  },

  dataSource: `default`,
});
