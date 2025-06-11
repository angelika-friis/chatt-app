# Chat-app

## Beskrivning
Detta är en chattapplikation i React med autentisering, meddelanden och användarhantering. Projektet använder ett externt API ([Chatify API](https://chatify-api.up.railway.app/api-docs/)) för alla backendfunktioner.

Inlämningsuppgift i kursen "Avancerad webbutveckling med JavaScript".

## Mockup

Hittar du [här](https://www.figma.com/design/sYzQblwCt1wUusF7mXTO8s/Chatify?node-id=25-85&t=mRpk5N6nQA7bNXjH-1)

## ✅ TODO

### 🔹 FAS 1 – Förberedelser
- [x] Läs igenom API-dokumentationen via Swagger
- [x] Testa endpoints med Postman/Insomnia
- [x] Skapa nytt projekt via `npm create vite@latest`
- [x] Installera beroenden (`react-router-dom`, `jwt-decode`)
- [x] Strukturera projektmappar: `pages/`, `components/`, `context/`, `utils/`
- [ ] Gör mockups för projekt

### 🔹 FAS 2 – Funktionalitet för G-betyg
#### 🔐 Autentisering
- [x] Skapa `Register.jsx` med validering och redirect vid lyckad registrering
- [x] Skapa `Login.jsx` med hantering av felmeddelanden
- [ ] Spara JWT-token och användardata i state och localStorage
- [ ] Dekoda JWT-token
- [ ] Visa användarnamn och avatar vid inloggning
- [ ] Skydda routes med `PrivateRoute`

#### 💬 Chat-funktionalitet (`Chat.jsx`)
- [ ] Hämta alla meddelanden
- [ ] Visa egna meddelanden till höger, andras till vänster
- [ ] Skapa nya meddelanden (med sanitering)
- [ ] Radera egna meddelanden

#### 🧭 Navigering
- [ ] Skapa `SideNav.jsx` med logout-knapp
- [ ] Implementera redirect till login vid utloggning

#### 🌐 Hosting & CSP
- [ ] Lägg till CSP-policy i `index.html` för avatar-domäner
- [ ] Deploya projektet på Netlify
- [ ] Testa CORS och avatar-hämtning

### 🔹 FAS 3 – Funktionalitet för VG-betyg
#### 📄 Loggning & Monitorering
- [ ] Lägg till loggning enligt riktlinjer
- [ ] Anslut loggverktyg som Sentry eller Rollbar
- [ ] Skapa screenshots eller dela nyckel för att visa loggar

#### 🧵 Flera konversationer
- [ ] Lägg till stöd för flera `conversationId` via `crypto.randomUUID()`
- [ ] Hämta och visa meddelanden per konversation

#### 👤 Profilfunktionalitet (`Profile.jsx`)
- [ ] Skapa profilvy med möjlighet att uppdatera namn, e-post och avatar
- [ ] Visa live-preview vid ändrad avatar-URL
- [ ] Möjlighet att radera användarkonto med bekräftelse och automatisk utloggning

### 📅 Deadline
- [ ] Säkerställ att allt är klart och repot är pushat till GitHub innan **22 augusti kl. 23:59**
- [ ] Lämna in GitHub-länk + bifogat dokument via LearnPoint
