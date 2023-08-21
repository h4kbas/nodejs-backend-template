declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";

      TYPEORM_HOST?: string;
      TYPEORM_USERNAME?: string;
      TYPEORM_PASSWORD?: string;
      TYPEORM_DATABASE?: string;
      TYPEORM_PORT?: string;
      TYPEORM_SYNCHRONIZE?: string;
      TYPEORM_LOGGING?: string;
      TYPEORM_ENTITIES?: string;

      APP_PORT?: string;
      APP_LOGGING_LEVEL?: string;

      JWT_SECRET: string;
      JWT_ISSUER: string;
      JWT_EXPIRES_IN: string;
    }
  }
}
