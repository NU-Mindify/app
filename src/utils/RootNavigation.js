import { createNavigationContainerRef } from "@react-navigation/native";
import { createRef } from "react";

export const navigationRef = createNavigationContainerRef();
export const currentRouteName = createRef();

/**
 * Navigates to a screen by name.
 * @param {string} name - The name of the screen to navigate to.
 * @param {object} [params] - Optional parameters to pass to the screen.
 */
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  } else {
    // Optionally log or handle cases where navigationRef isn't ready yet
    console.warn('Navigation ref not ready. Could not navigate to:', name);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  } else {
    console.warn('Navigation ref not ready or cannot go back.');
  }
}

export const getActiveRouteName = (state) => {
  if (!state || !state.routes || state.routes.length === 0) {
    return undefined;
  }
  const route = state.routes[state.index];
  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }
  return route.name;
};