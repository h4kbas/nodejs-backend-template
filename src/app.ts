// this shim is required
import { Action, createExpressServer, getMetadataArgsStorage} from "routing-controllers";
import { routingControllersToSpec } from 'routing-controllers-openapi'

import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import swaggerUi from "swagger-ui-express";

import controllers from "./controllers";
import { User } from "./entities/User";
import dataSource from "./lib/DataSource";

export type JwtPayload = {
  id: number;
  email: string;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async function (jwt_payload: JwtPayload, done) {
      const userRepository = dataSource.getRepository(User);
      try {
        const user = await userRepository.findOne({
          where: { id: jwt_payload.id },
        });
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  controllers,
  validation: true,
  classTransformer: true,
  authorizationChecker: (action: Action) =>
    new Promise<boolean>((resolve, reject) => {
      passport.authenticate("jwt", (err: Error, user: User) => {
        if (err) {
          return reject(err);
        }
        if (!user) {
          return resolve(false);
        }
        action.request.user = user;
        return resolve(true);
      })(action.request, action.response, action.next);
    }),
  currentUserChecker: (action: Action) => action.request.user,
});

// Register Swagger UI with OpenAPI spec
const storage = getMetadataArgsStorage()
const spec = routingControllersToSpec(storage)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

export default app;
