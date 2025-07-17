<img src="https://skillicons.dev/icons?i=next" alt="Cultura">

# AI Coding Assistant

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## About the Project

Designed to help **debug, explain, and review large codebases**, with support for input and output of **900+ lines of code** — ideal for diagnosing long scripts or full-stack applications.

It is powered by **OpenAI's GPT-4.1** and includes custom system prompts for coding-only responses, as well as a limiter guard to control token usage.

### Key Features:
- GPT-4.1 powered
- Syntax-highlighted code outputs
- Markdown + readableStream output
- Message token/line limit guard for performance
- Built specifically for debugging long code

---

## 🚀 Getting Started

First, clone the repository:

```bash
git clone https://github.com/your-username/chatgpt-coding-assistant.git
cd chatgpt-coding-assistant
```

Install dependencies:

```bash
npm install
# or
yarn install
```

### ⚙️ Environment Variables

Create a `.env` file at the root with the following:

```env
FIREBASE=your-firebase-private-key
OPENAI_API_KEY=your-openai-api-key
NEXTAUTH=your-nextauth-secret
GITHUB=your-clientID-clientsecret
```

- `OPENAI_API_KEY` is required to connect to the GPT-4.1 model
  
- `FIREBASE_PRIVATE_KEY` 
- `FIREBASE_CLIENT_EMAIL` 
- `FIREBASE_PROJECT_ID`
  
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
  
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` 

### 🧪 Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) to see the result. 

---

## 📁 Key Project Structure

```
app/
├── api/
│   ├── ai/
│   │   └── route.ts           # API route to handle AI chat requests via OpenAI
│   └── auth/
│       └── [...nextauth].ts   # NextAuth API route for authentication
│
├── chat/                      # Chat page route
│   └── page.tsx               
│
├── signin/                    # Sign-in page route
│   └── page.tsx               
│
├── layout.tsx                 # Root layout for the app (includes HTML & body)
├── page.tsx                   
└── providers.tsx              # Context providers (theme, session, etc.)

components/
├── ui/                        # Reusable UI components (buttons, inputs, etc.)
│   └── ...                    # Example: button.tsx, input.tsx
├── autoResizeInputarea.tsx    # Expands input area height based on text length
├── autoScroll.tsx             # Scrolls to bottom during AI response
├── highlighter.tsx            # Syntax highlighter for code blocks
├── renderer.tsx               # Renders Markdown and code output from AI
└── warningNotif.tsx           # Validation notification

lib/
├── ai/
│   ├── codeOnly.ts            # System prompt focused on code-only replies
│   ├── limitGuard.ts          # Input/output token limitation logic
│   └── token-saver.ts         # Saves and manages OpenAI token usage
│
├── auth.ts                    # NextAuth options (GitHub provider, Firestore adapter)
└── firebase.ts                # Firebase configuration and initialization

.env                            # Environment variables
package.json                    # Project dependencies and scripts

```

---

## 📚 Learn More

To learn more about the stack:

- [Next.js Documentation](https://nextjs.org/docs) – Features and API  
- [OpenAI API Docs](https://platform.openai.com/docs) – Model usage and setup  
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) – Code formatting
- [Markdown Rendering with React](https://github.com/remarkjs/react-markdown) – Used for rendering Markdown in the `renderer.tsx` component    
- [GitHub OAuth Apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) – How to create a GitHub Client ID and Secret  
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction) – Auth setup, providers, adapters  
- [Firebase Admin SDK Setup](https://firebase.google.com/docs/admin/setup) – How to generate service account credentials for Firebase  
- [Firebase Docs](https://firebase.google.com/docs) – Full platform guide and integrations

---

## ☁️ Deployment

You can deploy this project on Vercel for free:

1. Push to GitHub
2. Connect to Vercel
3. Set your `OPENAI_API_KEY`, `FIREBASE`, `GITHUB`, and `NEXTAUTH` in the environment variables
4. Deploy!

Read more: [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)

---

## 🛠 Future Improvements

- [ ] Add chat history
- [ ] Support multiple system modes (debug, explain, optimize)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
