create or replace function public.submit_admission_application(payload jsonb)
returns table (
  application_id text,
  status text,
  primary_course text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted public.admission_applications;
begin
  insert into public.admission_applications (
    application_id,
    status,
    payment_status,
    first_name,
    middle_name,
    last_name,
    phone,
    email,
    state,
    city,
    age_range,
    education,
    current_status,
    occupation,
    experience,
    primary_course,
    second_choice,
    smartphone,
    computer,
    internet,
    hours,
    format,
    goal,
    source,
    referral,
    campaign,
    updates
  ) values (
    payload ->> 'application_id',
    coalesce(payload ->> 'status', 'Submitted'),
    coalesce(payload ->> 'payment_status', 'Pending'),
    payload ->> 'first_name',
    nullif(payload ->> 'middle_name', ''),
    payload ->> 'last_name',
    payload ->> 'phone',
    lower(payload ->> 'email'),
    payload ->> 'state',
    payload ->> 'city',
    payload ->> 'age_range',
    payload ->> 'education',
    payload ->> 'current_status',
    nullif(payload ->> 'occupation', ''),
    payload ->> 'experience',
    payload ->> 'primary_course',
    nullif(payload ->> 'second_choice', ''),
    payload ->> 'smartphone',
    payload ->> 'computer',
    payload ->> 'internet',
    payload ->> 'hours',
    payload ->> 'format',
    payload ->> 'goal',
    payload ->> 'source',
    nullif(payload ->> 'referral', ''),
    coalesce(payload -> 'campaign', '{}'::jsonb),
    coalesce((payload ->> 'updates')::boolean, false)
  ) returning * into inserted;

  return query select inserted.application_id, inserted.status, inserted.primary_course, inserted.created_at;
end;
$$;

grant execute on function public.submit_admission_application(jsonb) to anon, authenticated;
