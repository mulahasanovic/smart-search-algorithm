# smart-search-algorithm

Full-stack developer - Technical challenge

## Install

- Run `pnpm install` for package.json requirements
- Install `knex` globally `pnpm install knex -g` (we need CLI for migration)
- Create postgresql database with the name `foodstyles_fullstack_test`
- Set up the `.env` file with the following values (update `DB_USER` and `DB_PWD` values)

```
DB_HOST="127.0.0.1"
DB_PORT="5432"
DB_USER=???
DB_PWD=???
DB_NAME="foodstyles_fullstack_test",
```

- Run `knex migrate:latest`
- Run `knex seed:run`

## Usage

Import `extractEntities`

```javascript
extractEntities("McDonald's in London or Man");
```

or as CLI from project root

```bash
node index.js "McDonald's"
node index.js "McDonald's in London"
node index.js "vegan sushi in London"
```
