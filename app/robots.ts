import {siteOrigin} from '@/lib/site-config';
export default function robots(){return {rules:{userAgent:'*',allow:'/',disallow:'/api/'},sitemap:`${siteOrigin}/sitemap.xml`}}
