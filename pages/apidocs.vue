<script setup>
const backendUrl = 'https://publicwatchke.vercel.app'
</script>

<template>
  <div class="mx-auto lg:w-3/5">
    <h1 class="mb-4 text-center text-3xl font-bold">
      Public Watch API
    </h1>
    <div class="p-6 text-justify">
      <h2 class="mb-4 text-2xl font-bold">
        Introduction
      </h2>
      <p class="text-justify light:text-gray-700">
        This API provides access to graft cases and politicians data.
      </p>

      <h2 class="mb-4 text-2xl font-bold">
        Endpoints
      </h2>
      <p class="pb-4 text-justify light:text-gray-700">
        Return a list of politicians with graft cases.
      </p>
      <pre class="overflow-hidden rounded-md p-2 text-justify dark:bg-gray-900 light:bg-gray-100">
        {{ backendUrl }}/api/v1/politicians
      </pre>
      <p class="py-4 text-justify light:text-gray-700">
        Return a list of graft cases.
      </p>
      <pre class="overflow-hidden rounded-md p-4 text-justify dark:bg-gray-900 light:bg-gray-100">
        {{ backendUrl }}/api/v1/graftcases
      </pre>

      <p class="my-4 text-2xl light:text-gray-700">
        <strong>Request:</strong>
      </p>
      <pre class="overflow-hidden rounded-md p-4 text-justify dark:bg-gray-900 light:bg-gray-100">
        curl -X GET {{ backendUrl }}/api/v1/graftcases
      </pre>
      <p class="my-4 text-2xl light:text-gray-700">
        <strong>Response:</strong>
      </p>
      <pre class="overflow-hidden rounded-md p-4 text-justify dark:bg-gray-900 light:bg-gray-100">
  "graft":[
        {
          "id": 1,
          "politician_id": 10,
          "title": "Case Title",
          "name": "John Doe",
          "case_description": "This is a case description.",
          "legal_outcome": "Win",
          "case_date": "2023-11-28",
          "downvotes": 5,
          "upvotes": 10,
          "link": "https://example.com/case/1",
          "created_at": "2023-11-28T12:34:56",
          "updated_at": "2023-12-01T15:22:33"
        },
]
    </pre>

      <p class="my-4 text-2xl light:text-gray-700">
        <strong>Request:</strong>
      </p>
      <pre class="overflow-hidden rounded-md p-4 text-justify dark:bg-gray-900 light:bg-gray-100">
        curl -X GET {{ backendUrl }}/api/v1/politicians
      </pre>
      <p class="my-4 text-2xl light:text-gray-700">
        <strong>Response:</strong>
      </p>
      <pre class="overflow-hidden rounded-md p-4 text-justify dark:bg-gray-900 light:bg-gray-100">
        "success": true,
        "data": {
          "Multiple": [
            {
              "politician_id": 2,
              "name": "William Ruto",
              "office": "President",
              "county": "Uasin Gishu",
              "political_party": "JP",
              "source_website": "https://en.wikipedia.org/wiki/KPC_Ngong_Forest_land_scandal",
              "photo_url": "https://kenyastockholm.com/wp-content/uploads/2015/08/william-ruto.jpg",
              "created_at": "2024-08-12T16:29:12.766842",
              "updated_at": "2024-08-12T16:29:12.766842"
            },
            ...
            }]
    </pre>

      <h2 class="my-4 text-2xl font-bold">
        Error Handling
      </h2>
      <p class="pb-2">
        All error messages will contain the schema below
      </p>
      <pre class="overflow-hidden rounded-md p-4 text-justify dark:bg-gray-900 light:bg-gray-100">
        {
          "success": false,
          "error": "Politician with ID 234 Not Found"
        }
    </pre>
    </div>
  </div>
</template>
