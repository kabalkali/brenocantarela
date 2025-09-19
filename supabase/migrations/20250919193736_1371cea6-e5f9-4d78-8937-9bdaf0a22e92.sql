-- Add breno@breno.com as admin
INSERT INTO public.admin_config (admin_email) 
VALUES ('breno@breno.com')
ON CONFLICT (admin_email) DO NOTHING;