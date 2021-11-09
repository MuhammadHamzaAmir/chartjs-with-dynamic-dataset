 cube(`Organizations`, {

    
   dimensions: {
     id: {
       sql: `id`,
       type: `string`,
       primaryKey: true,
     },
     name: {
       sql: `category`,
       type: `string`,
     },
   },
 });