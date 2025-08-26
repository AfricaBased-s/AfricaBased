-- If this file is used for HTML/JS, add Supabase setup. Otherwise, skip.
-- Create user_wallet table
create table if not exists public.user_wallet (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  balance decimal(10,2) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create withdrawal_requests table
create table if not exists public.withdrawal_requests (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  amount decimal(10,2) not null,
  total_amount decimal(10,2) not null,
  fee decimal(10,2) not null,
  method text not null,
  recipient_details text not null,
  status text default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  transaction_id text
);

-- Enable RLS
alter table public.user_wallet enable row level security;
alter table public.withdrawal_requests enable row level security;

-- Policies for user_wallet
create policy "Users can view their own wallet"
  on public.user_wallet for select
  using (auth.uid() = user_id);

create policy "Users can update their own wallet"
  on public.user_wallet for update
  using (auth.uid() = user_id);

-- Policies for withdrawal_requests
create policy "Users can view their own withdrawal requests"
  on public.withdrawal_requests for select
  using (auth.uid() = user_id);

create policy "Users can create withdrawal requests"
  on public.withdrawal_requests for insert
  with check (auth.uid() = user_id);

-- Admin policies
create policy "Admins can view all withdrawal requests"
  on public.withdrawal_requests for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update withdrawal requests"
  on public.withdrawal_requests for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Create indexes
create index if not exists idx_user_wallet_user_id on public.user_wallet(user_id);
create index if not exists idx_withdrawal_requests_user_id on public.withdrawal_requests(user_id);
create index if not exists idx_withdrawal_requests_status on public.withdrawal_requests(status);
