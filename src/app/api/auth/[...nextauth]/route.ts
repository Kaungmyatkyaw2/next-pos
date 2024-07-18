import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth/next';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
