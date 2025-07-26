const codingKeywords = [
  // ==========================
  // ✅ Java / Spring Boot
  // ==========================
  "spring boot", "java", "jpa", "dto", "entity", "service", "repository", "controller",
  "@restcontroller", "@service", "@repository", "@entity", "@requestmapping", "@getmapping", "@postmapping",
  "@putmapping", "@deletemapping", "@autowired", "@pathvariable", "@requestbody", "@valid", "@crossorigin",
  "responseentity", "resttemplate", "application.properties", "application.yml", "spring.datasource", "spring.jpa",
  "spring.application.name", "pom.xml", "gradle.build",

  // ==========================
  // ✅ PHP / Laravel
  // ==========================
  "php", "laravel", "artisan", "routes/api.php", "routes/web.php", "migration", "migrations", "eloquent",
  "model", "controller", "form request", "resource", "request", "validator", "middleware", "auth", "policy",
  "seeder", "factory", "belongsTo", "hasMany", "hasOne", "withTrashed", "softDeletes", "public function up", "public function down",
  "$table->", "schema::create", "php artisan make:", "php artisan migrate", "php artisan db:seed", "route::get",
  "route::post", "route::middleware", "route::resource", "request->validate",

  // ==========================
  // ✅ React / Next.js (TSX/JSX)
  // ==========================
  "next.js", "nextjs", "react", "tsx", "jsx", "usestate", "useeffect", "usecontext", "usereducer", "usememo",
  "usecallback", "useparams", "usepathname", "router.push", "router.replace", "next/router", "app router",
  "pages router", "client component", "server component", "page.tsx", "layout.tsx", "head.tsx", "metadata",
  "getserverSideProps", "getStaticProps", "next.config.js", "api route", "use client", "link from next/link",
  "image from next/image", "dynamic()", "useSearchParams", "fetch", "async component",

   // ==========================
  // ✅ Python / Django
  // ==========================
  "python", "django", "django rest framework", "drf", "views.py", "models.py", "urls.py", "serializers.py",
  "queryset", "orm", "migrations", "manage.py", "python manage.py", "@login_required", "@api_view", "request.data",
  "path(", "include(", "render(request", "redirect(", "HttpResponse", "get_object_or_404", "from django.", "settings.py",

  // ==========================
  // ✅ Flutter / Dart
  // ==========================
  "flutter", "dart", "statelesswidget", "statefulwidget", "buildcontext", "materialapp", "scaffold",
  "container(", "row(", "column(", "text(", "icon(", "navigator.push", "setstate(()", "async", "await",
  "initstate()", "dispose()", "pubspec.yaml", "hot reload", "flutter sdk", "flutter run", "flutter build",
  
  // ==========================
  // ✅ Tailwind CSS / HTML
  // ==========================
  "tailwind", "tailwindcss", "class=", "classname=", "flex", "grid", "gap-", "px-", "py-", "bg-", "text-",
  "rounded", "hover:", "focus:", "responsive", "dark:", "transition", "shadow", "font-", "border-", "w-", "h-",
  "container", "mx-auto", "p-", "m-", "sm:", "md:", "lg:", "xl:", "2xl:", "text-center",

  // ==========================
  // ✅ TypeScript / JavaScript
  // ==========================
  "typescript", "ts", "javascript", "js", "interface", "type", "enum", "any", "void", "unknown", "as const",
  "arrow function", "=>", "import", "export", "from", "require(", "module.exports", "optional chaining", "?.",
  "nullish coalescing", "??", "strict typing", "let", "const", "var", "function(", "async", "await", "try {",

  // ==========================
  // ✅ General Dev / API / Full Stack
  // ==========================
  "api", "rest api", "endpoint", "json", "http request", "postman", "axios", "fetch", "response", "request",
  "req.body", "res.status", "res.json", "crud", "backend", "frontend", "full stack", "validation", "form",
  "hook", "component", "props", "state", "layout", "map(", "filter(", "reduce(", "forEach("
];


export const isCodingPrompt = (input: string): boolean => {
  const lower = input.toLowerCase();
  return codingKeywords.some(keyword => lower.includes(keyword));
};
