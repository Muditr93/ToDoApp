/**
 *
 * Asynchronously loads the component for WelcomePage
 *
 */

import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null
});
