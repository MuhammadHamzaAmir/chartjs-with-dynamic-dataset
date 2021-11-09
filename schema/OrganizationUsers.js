cube(`OrganizationUsers`, {

  joins: {
    Organizations: {
      sql: `${CUBE}.organization_id = ${Organizations}.id`,
      relationship: `hasMany`,
    },
  },

  dimensions: {
    id: {
      // Joins require a primary key, so we'll create one on-the-fly
      sql: `CONCAT(${CUBE}.user_id, ':', ${CUBE}.organization_id)`,
      type: `string`,
      primaryKey: true,
    },
  },
});