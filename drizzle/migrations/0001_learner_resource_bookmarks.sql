CREATE TABLE public.resource_bookmarks (user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE, resource_slug text NOT NULL, PRIMARY KEY(user_id,resource_slug));
GRANT SELECT, INSERT, DELETE ON public.resource_bookmarks TO authenticated; GRANT ALL ON public.resource_bookmarks TO service_role;
ALTER TABLE public.resource_bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY bookmark_read ON public.resource_bookmarks FOR SELECT TO authenticated USING(user_id = auth.uid());
CREATE POLICY bookmark_insert ON public.resource_bookmarks FOR INSERT TO authenticated WITH CHECK(user_id = auth.uid());
CREATE POLICY bookmark_delete ON public.resource_bookmarks FOR DELETE TO authenticated USING(user_id = auth.uid());