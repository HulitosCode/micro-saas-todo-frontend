import { getUrl } from "@/lib/get-url";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token");

  const pathname = request.nextUrl.pathname;

  // Redireciona para /app se o usuário já tiver um token e estiver tentando acessar a página de autenticação
  if (pathname == "/auth" && token) {
    return NextResponse.redirect(new URL(getUrl("/app")));
  }

  // Redireciona para /auth se o usuário não tiver um token e tentar acessar a página /app
  if (pathname.includes("/app") && !token) {
    return NextResponse.redirect(new URL(getUrl("/auth")));
  }

  // Se não houver necessidade de redirecionamento, a execução continua normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
