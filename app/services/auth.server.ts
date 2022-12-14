import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import findUser, { User } from "~/models/User.model";
// import type { User } from "./session.server";
import { sessionStorage } from "./session.server";

const authenticator = new Authenticator<User | Error | null>(sessionStorage, {
  sessionKey: "sessionKey",
  sessionErrorKey: "sessionErrorKey",
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email") as string;
    let password = form.get("password") as string;

    if (!email || email?.length === 0)
      throw new AuthorizationError("Bad Credentials: Email is required");
    if (typeof email !== "string")
      throw new AuthorizationError("Bad Credentials: Email must be a string");

    if (!password || password?.length === 0)
      throw new AuthorizationError("Bad Credentials: Password is required");
    if (typeof password !== "string")
      throw new AuthorizationError(
        "Bad Credentials: Password must be a string"
      );

    let user = await findUser(email, password);

    if (user) {
      return await Promise.resolve({ ...user });
    } else {
      throw new AuthorizationError("Bad Credentials");
    }
  })
);

export default authenticator;
