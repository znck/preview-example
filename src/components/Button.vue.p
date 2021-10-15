<preview name="Default">
  <Button>Button</Button>
  <Button appearance="primary">Primary Button</Button>
  <Button appearance="secondary">Secondary Button</Button>
  <Button appearance="cta">CTA Button</Button>
</preview>

<preview name="Loading">
  <Button isLoading>Button</Button>
  <Button isLoading appearance="primary">Primary Button</Button>
  <Button isLoading appearance="secondary">Secondary Button</Button>
  <Button isLoading appearance="cta">CTA Button</Button>
</preview>

<preview name="Interactive" controls>
  <setup :state="{ isLoading: false }" />
  <Button :isLoading="p.state.isLoading" @click="p.state.isLoading = !p.state.isLoading" appearance="primary">Primary Button</Button>
</preview>
