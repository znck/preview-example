<preview name="loading" device="desktop">
  <setup :requests="{
      '/api/project/example.com/dashboard/default': $p.http.delayed(Infinity),
      '/passwordless/jwt/refresh': () => import('../fixtures/passwordless/jwt/refresh.json'),
      'QUERY /graphql {me{*}}': $p.http.delayed(Infinity),
      'QUERY /graphql {projects{*}}': () => import('../fixtures/graphql/projects/example.json'),
    }" />
  
  <downgrade />
</preview>

<preview name="default" device="desktop">
  <setup :requests="{
      '/api/project/example.com/dashboard/default': $p.http.delayed(Infinity),
      '/passwordless/jwt/refresh': () => import('../fixtures/passwordless/jwt/refresh.json'),
      'QUERY /graphql {me{*}}': () => import('../fixtures/graphql/me/user.json'),
      'QUERY /graphql {projects{*}}': () => import('../fixtures/graphql/projects/example.json'),
    }" />
  
  <downgrade />
</preview>
