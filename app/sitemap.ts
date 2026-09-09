import {siteOrigin} from '@/lib/site-config';
export default function sitemap(){return ['','labs','ai-security','platform','research','research/thesis','research/ai-security','research/dynamic-environments','research/scenario-generation','research/evaluation','research/telemetry','educators','enterprise','pricing','early-access'].map(path=>({url:`${siteOrigin}/${path}`}))}
