import Stack, { VStack } from '@nkzw/stack';
import { fbs } from 'fbtee';
import { ExternalLinkIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router';
import { Button } from '../ui/Button.tsx';
import Card from '../ui/Card.tsx';
import H2 from '../ui/H2.tsx';
import Input from '../ui/Input.tsx';
import AuthClient from './AuthClient.tsx';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data: session } = AuthClient.useSession();

  const signIn = async (event: FormEvent) => {
    event.preventDefault();

    await AuthClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {},
        onRequest: () => {},
        onSuccess: () => {},
      },
    );
  };

  if (session) {
    return <Navigate replace to="/" />;
  }

  return (
    <VStack center gap={16}>
      <H2 className="pl-5">
        <fbt desc="Sign In headline">Sign In</fbt>
      </H2>
      <Stack gap={32} wrap>
        <Card className="w-84">
          <Stack gap vertical>
            <VStack as="form" gap={12} onSubmit={signIn}>
              <Input
                className="w-48"
                onChange={(e) => setEmail(e.target.value)}
                placeholder={fbs('email', 'Email placeholder')}
                type="email"
                value={email}
              />
              <Input
                className="w-48"
                onChange={(e) => setPassword(e.target.value)}
                placeholder={fbs('password', 'Password placeholder')}
                type="password"
                value={password}
              />
              <div>
                <Button type="submit" variant="outline">
                  <fbt desc="Sign in button">Sign In</fbt>
                </Button>
              </div>
            </VStack>
          </Stack>
        </Card>
        <Card className="w-84">
          <p>
            <fbt desc="Login details">
              Try one of the
              <Stack
                alignCenter
                as="a"
                className="inline-flex! underline hover:no-underline px-1"
                gap={4}
                href="https://github.com/nkzw-tech/fate-template/blob/main/server/src/prisma/seed.tsx#L7"
                rel="noreferrer"
                target="_blank"
              >
                Example Accounts
                <ExternalLinkIcon className="h-4 w-4" />
              </Stack>{' '}
              in the seed data.
            </fbt>
          </p>
        </Card>
      </Stack>
    </VStack>
  );
}
