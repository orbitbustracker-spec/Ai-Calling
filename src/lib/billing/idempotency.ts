import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Ensures an operation is only processed once.
 * Throws if the key already exists.
 */
export async function runIdempotentOperation<T>(
  key: string,
  operation: () => Promise<T>
): Promise<T> {
  // 1. Try to claim the idempotency key
  try {
    await prisma.idempotencyKey.create({
      data: { key }
    });
  } catch (error: unknown) {
    // If it's a unique constraint violation (P2002), it was already processed
    if (error !== null && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'P2002') {
      throw new Error(`Operation with idempotency key ${key} was already processed.`);
    }
    throw error;
  }

  // 2. Run the operation
  try {
    const result = await operation();
    return result;
  } catch (error) {
    // If the operation fails, we should ideally release the lock so it can be retried.
    // Depending on the business requirement, you might want to keep it locked if it's a fatal error.
    await prisma.idempotencyKey.delete({ where: { key } }).catch(() => {});
    throw error;
  }
}
