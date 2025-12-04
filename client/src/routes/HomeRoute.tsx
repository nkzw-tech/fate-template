import Stack, { VStack } from '@nkzw/stack';
import { ConnectionRef, useListView, useRequest } from 'react-fate';
import { Link } from 'react-router';
import cx from '../lib/cx.tsx';
import { Button } from '../ui/Button.tsx';
import Card from '../ui/Card.tsx';
import H2 from '../ui/H2.tsx';
import { PostCard, PostView } from '../ui/PostCard.tsx';
import Section from '../ui/Section.tsx';
import UserCard, { UserView } from '../ui/UserCard.tsx';

const PostConnectionView = {
  args: { first: 3 },
  items: {
    node: PostView,
  },
  pagination: {
    hasNext: true,
  },
};

const PostFeed = ({ posts: postsRef }: { posts: ConnectionRef<'Post'> }) => {
  const [posts, loadNext] = useListView(PostConnectionView, postsRef);

  return posts.length ? (
    <VStack gap={16}>
      <H2 className="pl-5">
        <fbt desc="Latest posts header">Latest posts</fbt>
      </H2>
      <VStack gap={32}>
        {posts.map(({ node }) => (
          <PostCard key={node.id} post={node} />
        ))}
        {loadNext ? (
          <Stack center>
            <Button onClick={loadNext} variant="ghost">
              <fbt desc="Load more posts button">Load more posts</fbt>
            </Button>
          </Stack>
        ) : null}
      </VStack>
    </VStack>
  ) : null;
};

export default function HomeRoute() {
  const { posts, viewer } = useRequest({
    posts: { list: PostConnectionView },
    viewer: { view: UserView },
  });

  return (
    <Section gap={32}>
      <div
        className={cx('grid gap-8 lg:items-stretch', viewer?.id ? 'lg:grid-cols-[1.6fr_1fr]' : '')}
      >
        <Card className="border border-white/20 bg-linear-to-r from-blue-500 to-sky-500 dark:from-blue-600 dark:to-sky-600 text-white">
          <Stack alignCenter gap={12} wrap>
            <span className="squircle bg-white/20 px-2 py-1 text-xs font-semibold uppercase tracking-widest">
              <span className="lowercase italic">fate</span> demo
            </span>
          </Stack>
          <div className="space-y-3">
            <h1 className="text-balance text-3xl font-semibold leading-tight lg:text-4xl">
              <fbt desc="Description of fate">
                fate is a modern data client for React and tRPC inspired by Relay and GraphQL.
              </fbt>
            </h1>
            <p className="text-white/80 text-sm lg:text-base">
              <fbt desc="Tagline for fate">
                fate combines view composition, normalized caching, data masking, Async React
                features, and tRPC&apos;s type safety.
              </fbt>
            </p>
          </div>
          <Stack alignCenter gap={12} wrap>
            {!viewer?.id && (
              <>
                <Button asChild size="sm" variant="secondary">
                  <Link className="squircle px-4 py-2 text-sm font-semibold" to="/login">
                    <fbt desc="Login button">Login</fbt>
                  </Link>
                </Button>
                <span className="text-white/80 text-sm">
                  <fbt desc="Login button label">Sign in to post comments.</fbt>
                </span>
              </>
            )}
          </Stack>
        </Card>
        {viewer?.id && <UserCard user={viewer} />}
      </div>
      <PostFeed posts={posts} />
    </Section>
  );
}
