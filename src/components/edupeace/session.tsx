import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import type {User} from '@supabase/supabase-js';
import {useQueryClient} from '@tanstack/react-query';
import {useRouter} from '@tanstack/react-router';
import {supabase} from '@/integrations/supabase/client';
import {navigation,type Language} from '@/lib/learning';
const SessionContext = createContext<{user:User|null;ready:boolean;language:Language;setLanguage:(l:Language)=>void}>({user:null,ready:false,language:'en',setLanguage:()=>{}});
export function SessionProvider({children}:{children:ReactNode}) {
 const [user,setUser]=useState<User|null>(null); const [ready,setReady]=useState(false); const [language,setLanguage]=useState<Language>('en');
 const router=useRouter(); const queryClient=useQueryClient();
 useEffect(()=>{ const saved=localStorage.getItem('edupeace-language'); if(saved && saved in navigation) setLanguage(saved as Language);
 const {data:{subscription}}=supabase.auth.onAuthStateChange((event,session)=>{if(event==='INITIAL_SESSION'){setReady(true);setUser(session?.user??null);return;} if(!['SIGNED_IN','SIGNED_OUT','USER_UPDATED'].includes(event))return; setUser(session?.user??null);setReady(true); void router.invalidate(); if(event!=='SIGNED_OUT')void queryClient.invalidateQueries();else queryClient.clear();});
 void supabase.auth.getUser().then(({data})=>{setUser(data.user);setReady(true)});return()=>subscription.unsubscribe(); },[router,queryClient]);
 useEffect(()=>{document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr';},[language]);
 return <SessionContext.Provider value={{user,ready,language,setLanguage:(l)=>{setLanguage(l);localStorage.setItem('edupeace-language',l)}}}>{children}</SessionContext.Provider>;
}
export const useSession=()=>useContext(SessionContext);
