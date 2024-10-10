/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(app)` | `/(app)/Chat` | `/(app)/ChatRoom` | `/(app)/NewPost` | `/(app)/home` | `/Chat` | `/ChatRoom` | `/NewPost` | `/SignIn` | `/SignUp` | `/_sitemap` | `/datachange` | `/home`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
