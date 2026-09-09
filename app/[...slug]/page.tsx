import {ContentPage,pageInfo} from '@/components/labs/pages';
import type {Metadata} from 'next';
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{const path=(await params).slug.join('/');const data=pageInfo[path];return {alternates:{canonical:`/${path}`},title:data?`${data[0]} — CyberMindSpace Labs`:'Not found — CyberMindSpace Labs',description:data?.[1]||'Explore CyberMindSpace Labs.',openGraph:{title:data?.[0]||'CyberMindSpace Labs',description:data?.[1]}}}
export default async function Page({params}:{params:Promise<{slug:string[]}>}){return <ContentPage path={(await params).slug.join('/')}/>}
