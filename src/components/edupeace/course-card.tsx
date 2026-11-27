import {Link} from '@tanstack/react-router';
import {ArrowUpRight,Clock,BookOpen} from 'lucide-react';
import {Button} from '@/components/ui/button';
import type {Course} from '@/lib/learning';
import digital from '@/assets/digital.asset.json';
import peace from '@/assets/peace.asset.json';
import literacy from '@/assets/literacy.asset.json';
const images={digital:digital.url,peace:peace.url,literacy:literacy.url};
export function CourseCard({course}:{course:Course}){return <article className="course-card"><Link to="/courses/$slug" params={{slug:course.slug}} className="course-photo"><img src={images[course.image]} alt={course.image==='peace'?'Learners sharing a respectful dialogue':course.image==='digital'?'A learner developing computer skills':'Learners reading together'} loading="lazy"/><span className="free-tag">Free course</span></Link><div className="course-card-body"><span className={`category-label ${course.image}`}>{course.category}</span><h3><Link to="/courses/$slug" params={{slug:course.slug}}>{course.title}</Link></h3><p>{course.description}</p><div className="course-meta"><span><Clock size={14}/> Self-paced</span><span><BookOpen size={14}/> 3 lessons</span></div><div className="course-bottom"><span>By {course.instructor}</span><Button variant="ghost" size="icon" asChild aria-label={`Explore ${course.title}`}><Link to="/courses/$slug" params={{slug:course.slug}}><ArrowUpRight/></Link></Button></div></div></article>}
