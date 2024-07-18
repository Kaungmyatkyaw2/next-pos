'use server';

import bcrypt from 'bcrypt';
import { prisma } from '../prisma';

export const signup = async (body: { name: string; password: string; email: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user) {
      throw new Error('Email is already used!');
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);
    const createdUser = await prisma.user.create({
      data: { ...body, password: hashedPassword },
    });

    return createdUser;
  } catch (error) {
    throw error;
  }
};
