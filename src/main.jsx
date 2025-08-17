import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://b968c4dfee79a074b5060d8750f022b8@o4509853236527104.ingest.de.sentry.io/4509853238952016",
  sendDefaultPii: true
});

createRoot(document.getElementById('root')).render(
  <App />,
)
