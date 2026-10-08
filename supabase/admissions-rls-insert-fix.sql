drop policy if exists "Anyone can submit applications" on public.admission_applications;

create policy "Anyone can submit applications"
on public.admission_applications
as permissive
for insert
to public
with check (true);

grant usage on schema public to anon, authenticated;
grant insert on table public.admission_applications to anon, authenticated;
