<preview name="default" device="desktop">
  <setup :requests="{
      '/passwordless/jwt/refresh': $p.http.status(403),
      'QUERY /graphql {me{*}}': $p.http.status(403),
      'QUERY /graphql {projects{*}}': $p.http.status(403),
    }" />
  
  <login />
</preview>
