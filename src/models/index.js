// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Item, Category } = initSchema(schema);

export {
  Item,
  Category
};