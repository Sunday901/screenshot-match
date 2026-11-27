import {describe,it,expect} from 'vitest';
import {canPostToWall,lessonProgress,languages,courses} from './learning';
describe('inclusive learning rules',()=>{
 it('supports the five requested starting languages',()=>expect(languages.map(l=>l.code)).toEqual(['en','sw','so','ar','fr']));
 it('allows adult wall submissions',()=>expect(canPostToWall('adult')).toBe(true));
 it('restricts public posting by younger learners pending safeguarding workflows',()=>expect(canPostToWall('child')).toBe(false));
 it('tracks unique completed lessons without inflated progress',()=>{expect(lessonProgress([0,0])).toBe(33);expect(lessonProgress([0,1,2])).toBe(100);expect(lessonProgress([8])).toBe(0)});
 it('provides actual learning material and correct quiz answers',()=>{for(const c of courses)for(const l of c.lessons){expect(l.content.length).toBeGreaterThan(0);expect(l.options[l.answer]).toBeDefined()}});
});
