import type {Metadata} from 'next';
import './globals.css';
import './editorial.css';
import {siteOrigin} from '@/lib/site-config';
export const metadata:Metadata={metadataBase:new URL(siteOrigin),title:'CyberMindSpace Labs — Programmable Security Environments',description:'Cybersecurity exercises and research on evidence-backed evaluation of AI systems. Explore the thesis, run browser experiments and discuss a partnership.',icons:{icon:'/brand/logo-mark.png'},openGraph:{title:'CyberMindSpace Labs',description:'Security practice and systems research. Understand the boundary. Prove what crossed it.',type:'website'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>}
