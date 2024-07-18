import { AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email:',
          type: 'text',
        },
        password: {
          label: 'password:',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          throw new Error("User doesn't exist");
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials?.password!,
          user?.password!,
        );

        if (!isPasswordMatch) {
          throw new Error('Invalid Password!');
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({ where: { email: token.email! } });

      if (!dbUser) {
        throw new Error('No user is found with this email!');
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
          image: token.picture,
        };
      }

      return session;
    },
  },
} satisfies AuthOptions;

export function getSession() {
  return getServerSession(authOptions);
}
