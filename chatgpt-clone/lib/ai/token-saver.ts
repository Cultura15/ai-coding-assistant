const codingKeywords = [
  // Java / Spring Boot
  "spring boot", "java", "jpa", "dto", "restcontroller", "service", "repository", "entity", "controller", "requestmapping", "autowired",

  // PHP / Laravel
  "php", "laravel", "migration", "eloquent", "artisan", "routes/api.php", "form request", "middleware", "model", "seeder", "validator",

  // React / Next.js / TSX / JSX
  "next.js", "nextjs", "react", "tsx", "jsx", "useeffect", "usestate", "router", "app router", "pages router", "client component", "server component",

  // Tailwind CSS / HTML / Frontend
  "tailwind", "tailwindcss", "html", "css", "responsive", "classname", "grid", "flex", "semantic html",

  // TypeScript / JavaScript
  "typescript", "ts", "js", "javascript", "arrow function", "optional chaining", "strict typing", "interface", "type", "export", "import",

  // General Dev Terms
  "api", "rest api", "endpoint", "backend", "frontend", "full stack", "validation", "form", "hook", "component", "props", "state", "layout"
];

export const isCodingPrompt = (input: string): boolean => {
  const lower = input.toLowerCase();
  return codingKeywords.some(keyword => lower.includes(keyword));
};
