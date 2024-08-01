<script setup>
import { backendUrl } from '../constants'
</script>

<template>
  <div class="mx-auto lg:w-3/5">
    <h1 class="mb-4 text-center text-3xl font-bold">
      Public Watch API
    </h1>
    <div class="p-6">
      <h2 class="mb-4 text-2xl font-bold">
        Introduction
      </h2>
      <p class="text-justify light:text-gray-700">
        This API provides access to graft cases and politicians data.
      </p>

      <h2 class="mb-4 text-2xl font-bold">
        Endpoints
      </h2>
      <p class="text-justify light:text-gray-700">
        Return a list of politicians with graft cases.
      </p>
      <h3 class="my-2 text-justify text-xl font-bold">
        {{ backendUrl }}/api/v1/politicians
      </h3>
      <p class="text-justify light:text-gray-700">
        Return a list of graft cases.
      </p>
      <h3 class="my-2 text-justify text-xl font-bold">
        {{ backendUrl }}/api/v1/graftcases
      </h3>

      <p class="my-4 text-2xl light:text-gray-700">
        <strong>Request:</strong>
      </p>
      <pre class="overflow-hidden rounded-md p-4 text-justify light:bg-gray-100">
        curl "GET {{ backendUrl }}/api/v1/graftcases"
      </pre>
      <p class="my-4 text-2xl light:text-gray-700">
        <strong>Response:</strong>
      </p>
      <pre class="overflow-hidden rounded-md p-4 text-justify light:bg-gray-100">
  "graft": [
    {
      "id": 1,
      "politician_id": 1,
      "name": "String",
      "case_description": "suspended",
      "legal_outcome": "suspended",
      "case_date": "comeover",
      "created_at": "2024-07-25T11:00:46.687891",
      "updated_at": "2024-07-25T11:00:46.687891"
    },
    ...
  ]
    </pre>

      <p class="my-4 text-2xl light:text-gray-700">
        <strong>Request:</strong>
      </p>
      <pre class="overflow-hidden rounded-md p-4 text-justify light:bg-gray-100">
        curl "GET {{ backendUrl }}/api/v1/politicians"
      </pre>
      <p class="my-4 text-2xl light:text-gray-700">
        <strong>Response:</strong>
      </p>
      <pre class="overflow-hidden rounded-md p-4 text-justify light:bg-gray-100">
        "success": true,
        "data": {
          "Multiple": [
            {
              "politician_id": 1,
              "name": "Anne Waiguru",
              "office": "Governor",
              "county": "Kirinyaga",
              "political_party": "Independent",
              "source_website": "https://www.standardmedia.co.ke/article/2000176045/fraudsters-stole-sh791-million-from-national-youth-service-says-devolution-cabinet-secretary-anne-waiguru",
              "photo_url": "https://cdn.standardmedia.co.ke/images/thursday/pahtsz1j9bivc56e1db7dc3f9e.jpg",
              "created_at": "2024-07-25T07:01:35.393017",
              "updated_at": "2024-07-25T07:01:35.393017"
            },
            ...
    </pre>

      <h2 class="mb-4 text-2xl font-bold">
        Error Handling
      </h2>
      <h2 class="mb-4 text-2xl font-bold">
        Code Examples
      </h2>
    </div>
  </div>
</template>
