export interface Application {
  id: string;
  code: string;
  name: string;
  plan_ids: string[];
  plan_codes: string[];
  url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}