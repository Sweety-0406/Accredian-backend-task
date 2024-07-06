const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createReferral = async (data) => {
  return await prisma.referral.create({
    data,
  });
};

module.exports = {
  createReferral,
};
