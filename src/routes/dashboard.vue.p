<preview name="loading" device="desktop">
  <setup :requests="{
      '/api/project/example.com/dashboard/default': $p.http.delayed(Infinity),
      '/passwordless/jwt/refresh': () => import('../fixtures/passwordless/jwt/refresh.json'),
      'QUERY /graphql {me{*}}': () => import('../fixtures/graphql/me/user.json'),
      'QUERY /graphql {projects{*}}': () => import('../fixtures/graphql/projects/example.json'),
    }" />
  <dashboard domain="example.com" />
</preview>

<preview name="not found" device="desktop">
  <setup :requests="{
      '/api/project/example.com/dashboard/default': $p.http.status(404),
      '/passwordless/jwt/refresh': () => import('../fixtures/passwordless/jwt/refresh.json'),
      'QUERY /graphql {me{*}}': () => import('../fixtures/graphql/me/user.json'),
      'QUERY /graphql {projects{*}}': () => import('../fixtures/graphql/projects/none.json'),
    }" />
  <dashboard domain="example.com" />
</preview>

<preview name="blocked" device="desktop">
  <setup :requests="{
      '/api/project/example.com/dashboard/default': () => import('../fixtures/dashboards/example.com/default-blocked.json'),
      '/passwordless/jwt/refresh': () => import('../fixtures/passwordless/jwt/refresh.json'),
      '/api/project/example.com/stats': $p.http.status(407),
      '/api/project/example.com/live-stats': $p.http.status(407),
      'QUERY /graphql {me{*}}': () => import('../fixtures/graphql/me/user.json'),
      'QUERY /graphql {projects{*}}': () => import('../fixtures/graphql/projects/example.json'),
    }" />
  <dashboard domain="example.com" />
</preview>

<preview name="pending setup" device="desktop">
  <setup :requests="{
      '/api/project/example.com/dashboard/default': () => import('../fixtures/dashboards/example.com/default-pending-setup.json'),
      '/passwordless/jwt/refresh': () => import('../fixtures/passwordless/jwt/refresh.json'),
      '/api/project/example.com/stats': () => import('../fixtures/stats/example.com/_all-empty'),
      '/api/project/example.com/live-stats': () => import('../fixtures/stats-live/example.com/_all-empty'),
      'QUERY /graphql {me{*}}': () => import('../fixtures/graphql/me/user.json'),
      'QUERY /graphql {projects{*}}': () => import('../fixtures/graphql/projects/example.json'),
    }" />
  <dashboard domain="example.com" />
</preview>

<preview name="pending setup" device="desktop">
  <setup :requests="{
      '/api/project/example.com/dashboard/default': () => import('../fixtures/dashboards/example.com/default-pending-setup.json'),
      '/passwordless/jwt/refresh': () => import('../fixtures/passwordless/jwt/refresh.json'),
      '/api/project/example.com/stats': () => import('../fixtures/stats/example.com/_all-empty'),
      '/api/project/example.com/live-stats': () => import('../fixtures/stats-live/example.com/_all-empty'),
      'QUERY /graphql {me{*}}': () => import('../fixtures/graphql/me/user.json'),
      'QUERY /graphql {projects{*}}': () => import('../fixtures/graphql/projects/example.json'),
    }" />
  <dashboard domain="example.com" />
</preview>

<preview name="limit approaching" device="desktop">
  <setup :requests="{
      '/api/project/example.com/dashboard/default': () => import('../fixtures/dashboards/example.com/default-limit-approaching.json'),
      '/passwordless/jwt/refresh': () => import('../fixtures/passwordless/jwt/refresh.json'),
      '/api/project/example.com/stats': () => import('../fixtures/stats/example.com/_all-empty'),
      '/api/project/example.com/live-stats': () => import('../fixtures/stats-live/example.com/_all-empty'),
      'QUERY /graphql {me{*}}': () => import('../fixtures/graphql/me/user.json'),
      'QUERY /graphql {projects{*}}': () => import('../fixtures/graphql/projects/example.json'),
    }" />
  <dashboard domain="example.com" />
</preview>

<preview name="limit exceeded" device="desktop">
  <setup :requests="{
      '/api/project/example.com/dashboard/default': () => import('../fixtures/dashboards/example.com/default-limit-exceeded.json'),
      '/passwordless/jwt/refresh': () => import('../fixtures/passwordless/jwt/refresh.json'),
      '/api/project/example.com/stats': () => import('../fixtures/stats/example.com/_all-empty'),
      '/api/project/example.com/live-stats': () => import('../fixtures/stats-live/example.com/_all-empty'),
      'QUERY /graphql {me{*}}': () => import('../fixtures/graphql/me/user.json'),
      'QUERY /graphql {projects{*}}': () => import('../fixtures/graphql/projects/example.json'),
    }" />
  <dashboard domain="example.com" />
</preview>

<preview name="limit approaching - pro" device="desktop">
  <setup :requests="{
      '/api/project/example.com/dashboard/default': () => import('../fixtures/dashboards/example.com/default-limit-approaching-pro.json'),
      '/passwordless/jwt/refresh': () => import('../fixtures/passwordless/jwt/refresh.json'),
      '/api/project/example.com/stats': () => import('../fixtures/stats/example.com/_all-empty'),
      '/api/project/example.com/live-stats': () => import('../fixtures/stats-live/example.com/_all-empty'),
      'QUERY /graphql {me{*}}': () => import('../fixtures/graphql/me/user.json'),
      'QUERY /graphql {projects{*}}': () => import('../fixtures/graphql/projects/example.json'),
    }" />
  <dashboard domain="example.com" />
</preview>

<preview name="limit exceeded - pro" device="desktop">
  <setup :requests="{
      '/api/project/example.com/dashboard/default': () => import('../fixtures/dashboards/example.com/default-limit-exceeded-pro.json'),
      '/passwordless/jwt/refresh': () => import('../fixtures/passwordless/jwt/refresh.json'),
      '/api/project/example.com/stats': () => import('../fixtures/stats/example.com/_all-empty'),
      '/api/project/example.com/live-stats': () => import('../fixtures/stats-live/example.com/_all-empty'),
      'QUERY /graphql {me{*}}': () => import('../fixtures/graphql/me/user.json'),
      'QUERY /graphql {projects{*}}': () => import('../fixtures/graphql/projects/example.json'),
    }" />
  <dashboard domain="example.com" />
</preview>

<preview name="active dashbaord" device="desktop">
  <setup :requests="{
      '/api/project/example.com/dashboard/default': () => import('../fixtures/dashboards/example.com/default.json'),
      '/passwordless/jwt/refresh': () => import('../fixtures/passwordless/jwt/refresh.json'),
      '/api/project/example.com/stats': () => import('../fixtures/stats/example.com/_all'),
      '/api/project/example.com/live-stats': () => import('../fixtures/stats-live/example.com/_all'),
      'QUERY /graphql {me{*}}': () => import('../fixtures/graphql/me/user.json'),
      'QUERY /graphql {projects{*}}': () => import('../fixtures/graphql/projects/example.json'),
    }" />
  <dashboard domain="example.com" />
</preview>
