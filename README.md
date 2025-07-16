<img src="https://skillicons.dev/icons?i=next" alt="Cultura">

# AI Coding Assistant

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## About the Project

The **AI Coding Assistant** is a ChatGPT-style clone tailored specifically for developers. It is designed to help **debug, explain, and review large codebases**, with support for input and output of **900+ lines of code** — ideal for diagnosing long scripts or full-stack applications.

It is powered by **OpenAI's GPT-4.1** and includes custom system prompts for coding-only responses, as well as a limiter guard to control token usage.

### Key Features:
- GPT-4.1 integration with custom code-only prompt
- React-based UI with enhanced chat experience  
- Syntax-highlighted code outputs (Java, TS, JS, PHP, HTML, CSS, JSON, etc.)
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
DATABASE_URL=your-database-url
OPENAI_API_KEY=your-openai-api-key
```

- `DATABASE_URL` is used for Prisma (optional, if you're using a database)
- `OPENAI_API_KEY` is required to connect to the GPT-4.1 model

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
│   └── ai/route.ts          # API route that sends user input to OpenAI
├── components/
│   ├── renderer.tsx         # Renders markdown + code output
│   └── highlighter.tsx      # Syntax highlighter for code responses
├── utils/
│   ├── codeOnlySystemPrompt.ts
│   └── limitGuard.ts
.env
prisma/
├── schema.prisma
```

---

## 📚 Learn More

To learn more about the stack:

- [Next.js Documentation](https://nextjs.org/docs) – Features and API
- [Prisma ORM](https://www.prisma.io/docs) – Database integration
- [OpenAI API Docs](https://platform.openai.com/docs) – Model usage and setup
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) – Code formatting

---

## ☁️ Deployment

You can deploy this project on Vercel for free:

1. Push to GitHub
2. Connect to Vercel
3. Set your `OPENAI_API_KEY` and `DATABASE_URL` in the environment variables
4. Deploy!

Read more: [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)

---

## 🛠 Future Improvements

- [ ] Add auth and chat history
- [ ] Stream AI responses
- [ ] Support multiple system modes (debug, explain, optimize)
- [ ] Add conversation persistence
- [ ] Implement code execution sandbox
- [ ] Add collaborative coding features

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
