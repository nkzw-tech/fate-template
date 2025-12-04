import { VStack } from '@nkzw/stack';

export default function Error({ error }: { error: Error }) {
  return (
    <VStack gap={12}>
      <h3 className="text-xl font-semibold text-red-700">Error</h3>
      <code>{error.stack || `fate Error: ${error.message}`}</code>
      <div>
        <a
          className="cursor-pointer underline decoration-gray-300 hover:no-underline"
          onClick={() => window.location.reload()}
        >
          <fbt desc="Try again button">Try again</fbt>
        </a>
      </div>
    </VStack>
  );
}
