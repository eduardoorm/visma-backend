import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ambassadorNames = [
  'Jordyn Herwitz',
  'Carla Siphron',
  'Terry Press',
  'Kierra Rosser',
  'Ana García López',
  'Miguel Santos Rivera',
  'Laura Fernández Ruiz',
  'Carlos Martín González',
  'Sofia Rodríguez Pérez',
  'David López Martínez',
  'Elena Vásquez Torres',
  'Roberto Díaz Silva',
  'Natalia Morales Castro',
  'Fernando Herrera Jiménez',
];

function getRandomAmbassador(): string | null {
  return Math.random() > 0.5 ? ambassadorNames[Math.floor(Math.random() * ambassadorNames.length)] : null;
}

async function main() {
  await prisma.division.deleteMany();

  const ceo = await prisma.division.create({
    data: {
      name: 'CEO',
      collaborators: randomInt(1, 3),
      level: 1,
      ambassadorName: getRandomAmbassador(),
    },
  });

  const direccionGeneral = await prisma.division.create({
    data: {
      name: 'Dirección General',
      collaborators: randomInt(8, 15),
      level: 2,
      ambassadorName: getRandomAmbassador(),
      parentId: ceo.id,
    },
  });

  const tecnologia = await prisma.division.create({
    data: {
      name: 'Tecnología',
      collaborators: randomInt(20, 35),
      level: 2,
      ambassadorName: getRandomAmbassador(),
      parentId: ceo.id,
    },
  });

  const recursosHumanos = await prisma.division.create({
    data: {
      name: 'Recursos Humanos',
      collaborators: randomInt(5, 12),
      level: 2,
      ambassadorName: getRandomAmbassador(),
      parentId: ceo.id,
    },
  });

  const finanzas = await prisma.division.create({
    data: {
      name: 'Finanzas',
      collaborators: randomInt(6, 10),
      level: 2,
      ambassadorName: getRandomAmbassador(),
      parentId: ceo.id,
    },
  });

  await prisma.division.create({
    data: {
      name: 'Operaciones',
      collaborators: randomInt(4, 8),
      level: 3,
      ambassadorName: getRandomAmbassador(),
      parentId: direccionGeneral.id,
    },
  });

  await prisma.division.create({
    data: {
      name: 'Estrategia Corporativa',
      collaborators: randomInt(3, 6),
      level: 3,
      ambassadorName: getRandomAmbassador(),
      parentId: direccionGeneral.id,
    },
  });

  await prisma.division.create({
    data: {
      name: 'Desarrollo de Software',
      collaborators: randomInt(15, 25),
      level: 3,
      ambassadorName: getRandomAmbassador(),
      parentId: tecnologia.id,
    },
  });

  await prisma.division.create({
    data: {
      name: 'Infraestructura IT',
      collaborators: randomInt(8, 12),
      level: 3,
      ambassadorName: getRandomAmbassador(),
      parentId: tecnologia.id,
    },
  });

  await prisma.division.create({
    data: {
      name: 'Seguridad Informática',
      collaborators: randomInt(4, 8),
      level: 3,
      ambassadorName: getRandomAmbassador(),
      parentId: tecnologia.id,
    },
  });

  await prisma.division.create({
    data: {
      name: 'Reclutamiento',
      collaborators: randomInt(2, 5),
      level: 3,
      ambassadorName: getRandomAmbassador(),
      parentId: recursosHumanos.id,
    },
  });

  await prisma.division.create({
    data: {
      name: 'Desarrollo Organizacional',
      collaborators: randomInt(3, 6),
      level: 3,
      ambassadorName: getRandomAmbassador(),
      parentId: recursosHumanos.id,
    },
  });

  await prisma.division.create({
    data: {
      name: 'Contabilidad',
      collaborators: randomInt(3, 6),
      level: 3,
      ambassadorName: getRandomAmbassador(),
      parentId: finanzas.id,
    },
  });

  await prisma.division.create({
    data: {
      name: 'Tesorería',
      collaborators: randomInt(2, 4),
      level: 3,
      ambassadorName: getRandomAmbassador(),
      parentId: finanzas.id,
    },
  });

  const desarrollo = await prisma.division.findFirst({
    where: { name: 'Desarrollo de Software' }
  });

  if (desarrollo) {
    await prisma.division.create({
      data: {
        name: 'Frontend',
        collaborators: randomInt(6, 10),
        level: 4,
        ambassadorName: getRandomAmbassador(),
        parentId: desarrollo.id,
      },
    });

    await prisma.division.create({
      data: {
        name: 'Backend',
        collaborators: randomInt(8, 12),
        level: 4,
        ambassadorName: getRandomAmbassador(),
        parentId: desarrollo.id,
      },
    });

    await prisma.division.create({
      data: {
        name: 'QA Testing',
        collaborators: randomInt(4, 8),
        level: 4,
        ambassadorName: getRandomAmbassador(),
        parentId: desarrollo.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });