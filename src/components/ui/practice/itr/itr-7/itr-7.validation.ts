import { z } from 'zod';

export const itr7ValidationSchema = z.object({
  // Basic Information
  gen_name: z.string().min(1, 'Company name is required').optional(),
  gen_pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format').optional(),
  gen_cin: z.string().optional(),
  
  // Address
  gen_flat_door_block: z.string().optional(),
  gen_premises_building: z.string().optional(),
  gen_road_street_post: z.string().optional(),
  gen_area_locality: z.string().optional(),
  gen_town_city_district: z.string().optional(),
  gen_state: z.string().optional(),
  gen_pin_code: z.string().regex(/^\d{6}$/, 'Invalid PIN code').optional(),
  gen_country: z.string().optional(),
  
  // Contact
  gen_office_phone_std: z.string().optional(),
  gen_office_phone_number: z.string().optional(),
  gen_mobile_2: z.string().optional(),
  gen_email_1: z.string().email('Invalid email').optional(),
  gen_email_2: z.string().email('Invalid email').optional(),
  
  // Dates
  gen_incorporation_date: z.string().optional(),
  gen_commencement_date: z.string().optional(),
  
  // Company Type
  gen_company_type: z.enum(['domestic', 'foreign']).optional(),
  gen_company_classification: z.string().optional(),
  
  // Residential Status
  gen_residential_status: z.enum(['resident', 'non_resident']).optional(),
  
  // All other fields as optional
}).passthrough();

export type ITR7ValidationSchema = z.infer<typeof itr7ValidationSchema>;
