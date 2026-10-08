create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'admissions',
  created_at timestamptz not null default now()
);

create table if not exists public.admission_applications (
  id uuid primary key default gen_random_uuid(),
  application_id text not null unique,
  status text not null default 'Submitted' check (status in ('Submitted', 'Under Review', 'Accepted', 'Payment Pending', 'Paid / Enrolled', 'Waitlisted', 'More Information Required', 'Closed / Withdrawn')),
  payment_status text not null default 'Pending',
  first_name text not null,
  middle_name text,
  last_name text not null,
  phone text not null,
  email text not null,
  state text not null,
  city text not null,
  age_range text not null,
  education text not null,
  current_status text not null,
  occupation text,
  experience text not null,
  primary_course text not null,
  second_choice text,
  cohort text,
  smartphone text not null,
  computer text not null,
  internet text not null,
  hours text not null,
  format text not null,
  goal text not null,
  source text not null,
  referral text,
  campaign jsonb default '{}'::jsonb,
  updates boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (email),
  unique (phone)
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists admission_applications_updated_at on public.admission_applications;
create trigger admission_applications_updated_at
before update on public.admission_applications
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.admission_applications enable row level security;

create policy "Anyone can submit applications"
on public.admission_applications
for insert
to anon, authenticated
with check (true);

create policy "Admins can read applications"
on public.admission_applications
for select
to authenticated
using (exists (select 1 from public.admin_users where lower(email) = lower(auth.jwt() ->> 'email')));

create policy "Admins can update applications"
on public.admission_applications
for update
to authenticated
using (exists (select 1 from public.admin_users where lower(email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users where lower(email) = lower(auth.jwt() ->> 'email')));

create policy "Admins can read admin list"
on public.admin_users
for select
to authenticated
using (exists (select 1 from public.admin_users where lower(email) = lower(auth.jwt() ->> 'email')));

insert into public.admin_users (email, role)
values ('contact@affidexacademy.com.ng', 'super_admin')
on conflict (email) do nothing;


create or replace function public.check_application_status(lookup_application_id text, lookup_contact text)
returns table (
  application_id text,
  status text,
  primary_course text,
  created_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select a.application_id, a.status, a.primary_course, a.created_at
  from public.admission_applications a
  where lower(a.application_id) = lower(trim(lookup_application_id))
    and (
      lower(a.email) = lower(trim(lookup_contact))
      or lower(regexp_replace(a.phone, '\D', '', 'g')) = lower(regexp_replace(trim(lookup_contact), '\D', '', 'g'))
      or lower(regexp_replace(a.phone, '\D', '', 'g')) = lower(regexp_replace(regexp_replace(trim(lookup_contact), '^0', '234'), '\D', '', 'g'))
    )
  limit 1;
$$;

grant execute on function public.check_application_status(text, text) to anon, authenticated;
