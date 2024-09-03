import type Router from './Router';
import { ROUTES_PATH } from '../lib/constants/routes';

class RouteManager {
  private static router: Router | null = null;

  public static setRouter(router: Router): void {
    RouteManager.router = router;
  }

  public static goRoute(route: keyof typeof ROUTES_PATH): void {
    if (RouteManager.router) {
      const path = ROUTES_PATH[route];
      if (path) {
        RouteManager.router.go(path);
      }
    }
  }
}

export default RouteManager;
