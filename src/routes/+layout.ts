import posthog from 'posthog-js'
import { browser } from '$app/environment';

export const load = async () => {
  if (browser) {
      posthog.init(
        'phc_9jWIHnBxG3UB30XPaefs17euzBn9bBiXlsu2UWShlSP',
        {
            api_host: 'https://us.i.posthog.com',
            defaults: '2025-11-30',
            person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
        }
      )
   }

    return
};
