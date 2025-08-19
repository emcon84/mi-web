# Configuración para Vercel SPA

Este proyecto está configurado para Vercel con el archivo `vercel.json` que incluye:

1. **Rewrites para SPA**: Todas las rutas se redirigen a index.html para permitir que React maneje el routing del lado del cliente.

2. **Headers de seguridad**:

   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff

3. **Cache optimizado**: Los archivos estáticos tienen cache de 1 año.

## Después de hacer cambios:

1. Commitea los cambios
2. Haz push al repositorio
3. Vercel redesplegará automáticamente
4. Verifica que las URLs directas del blog funcionen correctamente

## URLs a probar:

- https://www.emilianoconti.com/blog
- https://www.emilianoconti.com/blog/como-migre-de-css-a-tailwind-css-en-proyectos-react
- https://www.emilianoconti.com/projects
- https://www.emilianoconti.com/skills
- https://www.emilianoconti.com/contact
