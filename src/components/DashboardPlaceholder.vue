<template>
  <div class="dashboard flex flex-row flex-wrap my-4">
    <div class="border border-gray-200 p-4 rounded" data-widget="card">
      <h2 class="text-gray-600 mb-2">Active Users</h2>

      <div class="h-8 rounded u-placeholder-shimmer" style="width: 100px" />
      <div class="w-full h-12" />
    </div>
    <div class="border border-gray-200 p-4 rounded" data-widget="card">
      <h2 class="text-gray-600 mb-2">Pageviews</h2>

      <div class="h-8 rounded u-placeholder-shimmer" style="width: 100px" />
      <div class="w-full h-12" />
    </div>
    <div class="border border-gray-200 p-4 rounded" data-widget="card">
      <h2 class="text-gray-600 mb-2">Visitors</h2>

      <div class="h-8 rounded u-placeholder-shimmer" style="width: 100px" />
      <div class="w-full h-12" />
    </div>
    <div class="border border-gray-200 p-4 rounded" data-widget="card">
      <h2 class="text-gray-600 mb-2">Engagement</h2>

      <div class="h-8 rounded u-placeholder-shimmer" style="width: 100px" />
      <div class="w-full h-12" />
    </div>

    <div class="border border-gray-200 rounded flex" data-widget="chart">
      <div class="h-64 border-r border-gray-200 p-4" style="width: 300px">
        <div class="h-8 w-full u-placeholder-shimmer mb-2" />
        <div class="h-8 w-full u-placeholder-shimmer mb-2" />
        <div class="h-8 w-full u-placeholder-shimmer mb-2" />
      </div>
      <div class="grid place-items-center flex-1">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          class="animate-spin text-gray-200"
        >
          <path
            d="M17.0336 17.1393C19.6964 14.4764 19.6964 10.1591 17.0336 7.49619C15.9817 6.44434 14.6717 5.80798 13.3075 5.58711C12.7831 5.5022 12.3561 5.07573 12.3561 4.54448C12.3561 3.99901 12.8045 3.55386 13.3454 3.62399C15.1978 3.86413 16.9882 4.69567 18.4111 6.11861C21.8348 9.54229 21.8348 15.0932 18.4111 18.5168C14.9875 21.9405 9.43659 21.9405 6.01291 18.5168C3.93016 16.4341 3.05729 13.49 3.60404 10.6521C3.70582 10.1238 4.21657 9.7781 4.74483 9.87987C5.2731 9.98165 5.61883 10.4924 5.51706 11.0207C5.09135 13.2303 5.76978 15.5185 7.39049 17.1393C10.0534 19.8021 14.3707 19.8021 17.0336 17.1393Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>

    <div class="border border-gray-200 p-4 h-64 rounded" data-widget="list">
      <h2 class="border-b border-gray-200 text-gray-600 -mx-4 px-4 pb-4 mb-4">
        Browsers
      </h2>
      <div class="h-8 w-full u-placeholder-shimmer mb-2" />
      <div class="h-8 w-full u-placeholder-shimmer mb-2" />
      <div class="h-8 w-full u-placeholder-shimmer mb-2" />
    </div>
    <div class="border border-gray-200 p-4 h-64 rounded" data-widget="list">
      <h2 class="border-b border-gray-200 text-gray-600 -mx-4 px-4 pb-4 mb-4">
        Traffic Sources
      </h2>
      <div class="h-8 w-full u-placeholder-shimmer mb-2" />
      <div class="h-8 w-full u-placeholder-shimmer mb-2" />
      <div class="h-8 w-full u-placeholder-shimmer mb-2" />
    </div>
    <div class="border border-gray-200 p-4 h-64 rounded" data-widget="list">
      <h2 class="border-b border-gray-200 text-gray-600 -mx-4 px-4 pb-4 mb-4">
        Traffic Origin
      </h2>
      <div class="h-8 w-full u-placeholder-shimmer mb-2" />
      <div class="h-8 w-full u-placeholder-shimmer mb-2" />
      <div class="h-8 w-full u-placeholder-shimmer mb-2" />
    </div>
  </div>
</template>
