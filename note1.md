### NEST JS Note

`@Modudle` is a `decorator` for a class, a decorator is a anotation that add metadata to a class, function, etc,..

`@Module` can import other module.

`@Module` is like service, for this example, we divide `@Module` into feature modules, like services.

`Prisma`, is a ORM, like JPA in Java

`Baron export pattern` is a way, a convention to export pattern, used in the auth/dto

`pipe` is function that transform your data, for example, if a param is /../user/1, the `1` could be a string, but inside our code I want to use it as number, so, I can use pipe to turn it to a number, moreover, pipe can be used to validate dto before send them to request.

Different between using passport and jwt, can we just use one?
