import { Analytics } from '@vercel/analytics/react';
import PetosChatbot from "./PetosChatbot";

function App() {
  return (
    <>
      <PetosChatbot />
      <Analytics />
    </>
  );
}

export default App;