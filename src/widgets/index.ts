import { AsyncComponentLoader, Component, defineAsyncComponent } from 'vue'
import PlaceholderList from './PlaceholderList.vue'
import PlaceholderCard from './PlaceholderCard.vue'
import PlaceholderChart from './PlaceholderChart.vue'

function widget<T>(
  loader: AsyncComponentLoader<T>,
  loadingComponent: Component,
) {
  return defineAsyncComponent({
    loader: loader,
    loadingComponent,
  })
}

export default {
  // Live Cards
  LiveCardPageviews: widget(
    () => import('./LiveCardPageviews.vue'),
    PlaceholderCard,
  ),

  // Cards
  CardTotalPageviews: widget(
    () => import('./CardTotalPageviews.vue'),
    PlaceholderCard,
  ),
  CardTotalVisitors: widget(
    () => import('./CardTotalVisitors.vue'),
    PlaceholderCard,
  ),
  CardAverageTimeSpent: widget(
    () => import('./CardAverageTimeSpent.vue'),
    PlaceholderCard,
  ),

  // Graphs & Charts
  ChartPageviews: widget(
    () => import('./ChartPageviews.vue'),
    PlaceholderChart,
  ),

  // Lists
  ListBrowsers: widget(() => import('./ListBrowsers.vue'), PlaceholderList),
  ListCountries: widget(() => import('./ListCountries.vue'), PlaceholderList),
  ListReferrers: widget(() => import('./ListReferrers.vue'), PlaceholderList),
}
