<template>
  <div class="mx-auto w-full text-justify lg:w-3/5">
    <div class="mx-auto max-w-3xl border border-gray-1 rounded-md p-6">
      <h2 class="mb-6 text-center text-2xl font-semibold">
        Whistleblower Submission Form
      </h2>
      <form action="/submit" method="POST" enctype="multipart/form-data">
        <!-- Anonymous Submission -->
        <div class="mb-4">
          <label class="flex items-center">
            <input type="checkbox" name="anonymous" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
            <span class="ml-2">Submit Anonymously</span>
          </label>
        </div>

        <!-- Personal Information -->
        <div class="mb-4">
          <label for="name" class="block">Name (Optional)</label>
          <input id="name" type="text" name="name" placeholder="Enter name" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
        </div>

        <div class="mb-4">
          <label for="contact" class="block">Contact Information (Optional)</label>
          <input id="contact" type="text" name="contact" placeholder="Email or Phone Number" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
        </div>

        <div class="mb-4">
          <label for="role" class="block">Role/Position (Optional)</label>
          <input id="role" type="text" placeholder="Enter role/position" name="role" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
        </div>

        <!-- Incident Details -->
        <div class="mb-4">
          <label for="incident-description" class="block">Incident Description</label>
          <textarea id="incident-description" name="incident-description" rows="4" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500" placeholder="Describe the incident in detail..." />
        </div>

        <div class="mb-4">
          <label for="location" class="block">Location</label>
          <input id="location" type="text" placeholder="Enter location of incident" name="location" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
        </div>

        <div class="mb-4">
          <label for="date" class="block">Date/Time</label>
          <input id="date" type="date" name="date" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
        </div>

        <div class="mb-4">
          <label for="involved-parties" class="block">Involved Parties</label>
          <input id="involved-parties" type="text" name="involved-parties" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500" placeholder="Name and roles of those involved">
        </div>

        <!-- Type of Corruption -->
        <div class="mb-4">
          <label for="type-of-misconduct" class="block">Type of Misconduct</label>
          <select id="type-of-misconduct" name="type-of-misconduct" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
            <option value="bribery">
              Bribery
            </option>
            <option value="fraud">
              Fraud
            </option>
            <option value="embezzlement">
              Embezzlement
            </option>
            <option value="abuse-of-power">
              Abuse of Power
            </option>
            <option value="conflict-of-interest">
              Conflict of Interest
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label for="severity" class="block">Severity Level</label>
          <select id="severity" name="severity" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-500 focus:outline-none focus:ring-green-500">
            <option value="minor">
              Minor
            </option>
            <option value="moderate">
              Moderate
            </option>
            <option value="severe">
              Severe
            </option>
          </select>
        </div>

        <!-- Evidence Submission -->
        <div class="mb-4">
          <label for="evidence" class="block">Attach Evidence</label>
          <input id="evidence" type="file" name="evidence" class="mt-1 block w-full bg-gray-50">
          <small class="text-gray-500">Upload documents, images, or other evidence.</small>
        </div>

        <div class="mb-4">
          <label for="evidence-description" class="block">Evidence Description</label>
          <textarea id="evidence-description" name="evidence-description" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-500 focus:outline-none focus:ring-green-500" placeholder="Describe the evidence you are providing..." />
        </div>

        <!-- Previous Reporting -->
        <div class="mb-4">
          <label for="previous-reports" class="block">Previous Reports</label>
          <select id="previous-reports" name="previous-reports" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-500 focus:outline-none focus:ring-green-500">
            <option value="no">
              No
            </option>
            <option value="yes">
              Yes
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label for="previous-outcome" class="block">Outcome of Previous Reports</label>
          <textarea id="previous-outcome" name="previous-outcome" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-500 focus:outline-none focus:ring-green-500" placeholder="Describe any outcomes or responses from previous reports..." />
        </div>

        <!-- Desired Outcome -->
        <div class="mb-4">
          <label for="desired-outcome" class="block">Desired Action</label>
          <textarea id="desired-outcome" name="desired-outcome" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500" placeholder="What do you hope to achieve by submitting this report?" />
        </div>

        <!-- Confidentiality and Security -->
        <div class="mb-4">
          <label class="flex items-center">
            <input type="checkbox" name="confidentiality" class="form-checkbox h-4 w-4 bg-gray-50 text-indigo-600 transition duration-150 ease-in-out" required>
            <span class="ml-2">I agree to the confidentiality terms</span>
          </label>
        </div>

        <div class="mb-4">
          <label class="flex items-center">
            <input type="checkbox" name="consent" class="form-checkbox h-4 w-4 bg-gray-50 text-indigo-600 transition duration-150 ease-in-out">
            <span class="ml-2">I agree to be contacted for further information if needed</span>
          </label>
        </div>

        <!-- Submission Button -->
        <div class="mt-6">
          <button type="submit" class="w-full justify-center btn">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>
