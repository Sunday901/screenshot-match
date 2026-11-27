import {createFileRoute,notFound,Outlet} from '@tanstack/react-router';
import {courses} from '@/lib/learning';
export const Route=createFileRoute('/courses/$slug')({loader:({params})=>{const course=courses.find(c=>c.slug===params.slug);if(!course)throw notFound();return course;},component:()=> <Outlet/>});
