grant usage on schema public to anon, authenticated;
grant insert on table public.admission_applications to anon, authenticated;
grant select on table public.admission_applications to authenticated;
grant update on table public.admission_applications to authenticated;
grant select on table public.admin_users to authenticated;
grant execute on function public.check_application_status(text, text) to anon, authenticated;
