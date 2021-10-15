<template>
  <div class="mx-auto bg-white max-w-6xl">
    <header>
      <slot name="header">
        <div class="flex flex-row mx-4 pt-8 pb-6">
          <div class="flex-1">
            <RouterLink to="/" class="cursor-pointer">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                title="Back"
              >
                <path
                  d="M8.57951 16.43C8.90735 16.753 9.43497 16.7491 9.75799 16.4213C10.081 16.0934 10.0771 15.5658 9.74926 15.2428L5.27396 10.8333H16.6666C17.1269 10.8333 17.5 10.4602 17.5 9.99998C17.5 9.53974 17.1269 9.16664 16.6666 9.16664H5.27947L9.74926 4.76257C10.0771 4.43955 10.081 3.91193 9.75799 3.58409C9.43497 3.25625 8.90735 3.25234 8.57951 3.57536L2.80935 9.26068C2.39526 9.66869 2.39526 10.3367 2.80935 10.7447L8.57951 16.43Z"
                  fill="#999999"
                />
              </svg>
            </RouterLink>
          </div>

          <div class="mx-auto flex-1 text-center">
            <RouterLink to="/" class="cursor-pointer">
              <img src="../assets/logo.svg" class="w-6 inline-block" />
            </RouterLink>
          </div>

          <div class="text-xs text-right flex-1">
            <a
              class="text-blue-500 hover:underline focus:underline"
              href="https://znck.typeform.com/to/W6kdJSw7"
              rel="noreferrer noopener"
              target="_blank"
              >Upgrade</a
            >
            <span class="sr-only md:not-sr-only"> to see older data</span>
          </div>
        </div>
        <hr class="hidden md:block mx-4 mb-8 border-gray-300" />
      </slot>
    </header>
    <main class="m-4">
      <slot />
    </main>
    <footer>
      <div></div>
    </footer>
  </div>
</template>
