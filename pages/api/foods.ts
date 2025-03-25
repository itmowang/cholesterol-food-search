import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;
  try {
    const foods = await prisma.food.findMany({
      where: {
        name: {
          contains: q ? q.toString() : '',
        }
      }
    });
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: '获取食物数据时出错' });
  }
}
