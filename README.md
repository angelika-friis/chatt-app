# Chat-app

<p align="center">
  <img src="./public/logo.png" alt="Chat-app logotyp" width="150"/>
</p>

## Beskrivning
Detta är en chattapplikation med autentisering, meddelandehantering och användarprofiler. Projektet använder ett externt API ([Chatify API](https://chatify-api.up.railway.app/api-docs/)) för backend-funktionalitet.

Projektet är en inlämningsuppgift i kursen *Avancerad webbutveckling med JavaScript*.

## Screenshots och demos

### Login and register
<a href="./screenshots/register-and-login-demo.gif">
  <img src="./screenshots/register-and-login-demo.gif" alt="Login-and-register-demo" width="300"/>
</a>

### Chat
<a href="./screenshots/conversations-page.png">
  <img src="./screenshots/conversations-page.png" alt="Chatsida" width="300"/>
</a>

<a href="./screenshots/invites-page.png">
  <img src="./screenshots/invites-page.png" alt="Sida med medeleandeförfrågningar" width="300"/>
</a>

<a href="./screenshots/conversation-demo.gif">
  <img src="./screenshots/conversation-demo.gif" alt="Demo konversation" width="300"/>
</a>

### Profil
<a href="./screenshots/update-user-info-demo.gif">
  <img src="./screenshots/update-user-info-demo.gif" alt="Profilsida" width="300"/>
</a>

##

## Funktioner

### Användarfunktioner
- Användarregistrering & inloggning
- Visa & skapa konversationer
- Visa, skapa och radera meddelanden
- Användarprofil som kan redigeras
- Responsiv design

### Säkerhet
- Skyddad routing
- JWT-autentisering
- CSRF-skydd
- Content Security Policy (CSP)
- Sanering av användarinput (XSS-skydd)

### Övrigt
- Deployment via [Netlify](https://angelikas-chatt.netlify.app/)
- Loggning & monitorering med [Sentry](https://sentry.io/)

## Teknologier
- React + Vite
- React Router DOM
- [MUI (Material UI)](https://mui.com/)
- JWT-decode
- REST API ([Chatify API](https://chatify-api.up.railway.app/api-docs/))

## Deployment

Applikationen är hostad på Netlify:
👉 [https://angelikas-chatt.netlify.app/](https://angelikas-chatt.netlify.app/)

## Kom igång lokalt

### Installation och start
```bash
npm install
npm run dev
```

### Kommandon
```bash
npm install – Installerar beroenden
npm run dev – Startar utvecklingsservern
npm run build – Skapar produktionsbuild
```
### Miljöinställningar

Lägg till eventuell CSP i index.html:
```
/*
  Content-Security-Policy: default-src 'self'; img-src 'self' https://i.pravatar.cc https://freeimage.host https://fastly.picsum.photos https://picsum.photos; style-src 'self' 'unsafe-inline' blob:; font-src 'self' data:; connect-src 'self' https://*.sentry.io https://chatify-api.up.railway.app;
```

## Mockups

Designskisser finns i Figma:
👉 [Mockups här](https://www.figma.com/design/sYzQblwCt1wUusF7mXTO8s/Chatify?node-id=25-85&t=mRpk5N6nQA7bNXjH-1)


## Lärdomar

Projektet har varit mycket kul och lärorikt. Extra roligt att det resulterade i högsta betyg!

### Några konkritiserade lärdomar: 
- **Loggning och monitorering är guld värt.** Tack vare Sentry kunde jag snabbt se fel som uppstod hos mina testanvändare.
- **Första gången med MUI.** Jag använde ett styling bibliotek för första gången. Jag uppskattade verkligen att jobba med MUI (som desutom ger en komponenter) och jag tror inte jag kommer gå tillbaka till enbart CSS i första hand framöver.
- **CSP-policy.** Jag lärde mig sätta upp en CSP policy även om jag inte hade själv satt så stränga regler för avatar bilder som instruktionerna i uppgiften efterfrågade.
- **Min första deploy.** Netlify gjorde processen enkel och jag fick se hur appen faktiskt fungerade på en riktig mobil. En följdelaktig lärdom var att mobilen kan skapa andra beteenden hos sidan, så som skillnad i scrollning.
