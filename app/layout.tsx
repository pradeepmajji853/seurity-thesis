import type {Metadata} from 'next';
import './globals.css';
import {siteOrigin} from '@/lib/site-config';
export const metadata:Metadata={metadataBase:new URL(siteOrigin),title:'CyberMindSpace Labs — Programmable Security Environments',description:'Researching programmable, reproducible and measurable cybersecurity and AI-security environments. Platform in development. Join early access.',icons:{icon:'/brand/logo-mark.png'},openGraph:{title:'CyberMindSpace Labs',description:'The infrastructure for hands-on cybersecurity. Research program and platform in development.',type:'website'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>}
