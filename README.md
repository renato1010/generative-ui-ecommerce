# E-Commerce with Generative UI

### Notes:

Prisma issue supporting [pg_vectore #18442](https://github.com/prisma/prisma/issues/18442)  
people are using Prisma raw query e.g [langchaing repo](https://github.com/langchain-ai/langchainjs/blob/2886ad92d97c1f9efdfbc1906d61e57265b16b5a/langchain/src/vectorstores/prisma.ts#L248)

[pgvector oss repo](https://github.com/pgvector/pgvector)

[Prisma Postgresql Extension](https://github.com/prisma/prisma/issues/15835)
Update: Discontinuation planned for Jun - Aug 2025

**After careful evaluation, we’ve determined that the current implementation of the postgresqlExtensions preview feature is too complex and doesn’t provide enough value.**

While this specific feature will be discontinued, we remain committed to supporting Postgres extensions. Instead of this approach, we’ll ship support for specific extensions—such as PostGIS—through focused, independent efforts.
[Read more here #26136](https://github.com/prisma/prisma/discussions/26136)
