cube(`PostTopics`, {
  sql: `SELECT * FROM public.post_topics`,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  joins: {
    Topics: {
      sql: `${CUBE}.topic_id = ${Topics}.id`,
      relationship: `hasMany`,
    },

    // Posts: {
    //   sql: `${CUBE}.post_id = ${Posts}.id`,
    //   relationship: `belongsTo`,
    // },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    id: {
      sql: `CONCAT(${CUBE}.topic_id, ${CUBE}.post_id)`,
      type: `number`,
      primaryKey: true,
    },
  },

  dataSource: `default`,
});
