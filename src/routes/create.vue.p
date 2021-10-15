<preview name="default" device="desktop">
  <setup :requests="{
      '/api/project/example.com/dashboard/default': $p.http.delayed(Infinity),
      '/passwordless/jwt/refresh': () => import('../fixtures/passwordless/jwt/refresh.json'),
      'QUERY /graphql {me{*}}': () => import('../fixtures/graphql/me/user.json'),
      'QUERY /graphql {projects{*}}': () => import('../fixtures/graphql/projects/example.json'),
    }" />
  
  <create />
</preview>
