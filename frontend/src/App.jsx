import CreatePaste from "./CreatePaste";
import ViewPaste from "./ViewPaste";

export default function App() {
  const path = window.location.pathname;

  if (path.startsWith("/p/")) {
    return <ViewPaste />;
  }

  return <CreatePaste />;
}
