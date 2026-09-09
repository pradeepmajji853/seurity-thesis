import {z} from 'zod';
export const roles=['Student','Educator','Security professional','Researcher','Enterprise','University'] as const;
export const interestSchema=z.object({name:z.string().trim().min(2,'Enter your name.').max(100),email:z.string().trim().email('Enter a valid email address.').max(254).transform(x=>x.toLowerCase()),role:z.enum(roles),organization:z.string().trim().max(160).default(''),message:z.string().trim().max(1500).default(''),consent:z.literal(true),website:z.string().max(500).optional()});
export type InterestInput=z.input<typeof interestSchema>;
