const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('KLAVIYO_API_KEY');
    const listId = Deno.env.get('KLAVIYO_LIST_ID');

    if (!apiKey || !listId) {
      console.error('Missing Klaviyo configuration');
      return new Response(
        JSON.stringify({ error: 'Server not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const source = typeof body?.source === 'string' ? body.source.slice(0, 100) : 'footer';

    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid email address.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Klaviyo Subscribe Profiles API (server-side)
    const payload = {
      data: {
        type: 'profile-subscription-bulk-create-job',
        attributes: {
          profiles: {
            data: [
              {
                type: 'profile',
                attributes: {
                  email,
                  subscriptions: {
                    email: { marketing: { consent: 'SUBSCRIBED' } },
                  },
                  properties: { signup_source: source },
                },
              },
            ],
          },
          custom_source: source,
        },
        relationships: {
          list: { data: { type: 'list', id: listId } },
        },
      },
    };

    const res = await fetch(
      'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs',
      {
        method: 'POST',
        headers: {
          Authorization: `Klaviyo-API-Key ${apiKey}`,
          'Content-Type': 'application/json',
          accept: 'application/vnd.api+json',
          revision: '2024-10-15',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok && res.status !== 202) {
      const errText = await res.text();
      console.error('Klaviyo error', res.status, errText);
      return new Response(
        JSON.stringify({ error: 'Subscription failed. Please try again later.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('klaviyo-subscribe exception', err);
    return new Response(
      JSON.stringify({ error: 'Unexpected error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
