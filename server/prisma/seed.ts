import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2';

const prisma = new PrismaClient()

async function main() {
    let promises = [];

    const testUser = await prisma.user.create({
        data: {
            email: 'test@yandex.ru',
            name: 'test',
            password: await hash('123456'),
            picture: '/uploads/default-user-image.png',
            roles: {
                create: [
                    {
                        value: 'USER',
                    },
                    {
                        value: 'ADMIN',
                    },
                ],
            },
            basket: {
                create: {}
            },
        },
    })

    await prisma.product.create({
        data: {
            name: `Test Product 1`,
            description: 'Test Description',
            price: 100,
            images: ['/uploads/products/1742831709205-15785035526011.png', '/uploads/default-product-image.jpg'],
            Category: {
                connectOrCreate: {
                    where: {
                        name: 'Одежда',
                    },
                    create: {
                        name: 'Одежда',
                    }
                },
            },
        }
    })

    for (let i = 2; i < 10; i++) {
        promises.push(
            prisma.product.create({
                data: {
                    name: `Test Product ${i}`,
                    description: 'Test Description',
                    price: 100 * i,
                    images: ['/uploads/products/1742831709205-15785035526011.png', '/uploads/default-product-image.jpg'],
                    Category: {
                        connectOrCreate: {
                            where: {
                                name: 'Одежда',
                            },
                            create: {
                                name: 'Одежда',
                            }
                        },
                    },
                }
            })
        );
    }
    await Promise.all(promises);

    promises = [];
    for (let i = 0; i < 5; i++) {
        promises.push(
            prisma.track.create({
                data: {
                    name: 'I',
                    artist: 'Deep-ex-sense',
                    picture: '/uploads/tracks/pictures/1742831961927--bZtpqWRLE4.jpg',
                    audio: '/uploads/tracks/audio/1742831921507-DEEP-EX-SENSE_-_I_58467235.mp3',
                },
            })
        );
    }
    await Promise.all(promises);

    promises = [];
    for (let i = 5; i < 10; i++) {
        promises.push(
            prisma.track.create({
                data: {
                    name: 'Инквизитор всегда прав',
                    artist: 'Deep-ex-sense',
                    picture: '/uploads/tracks/pictures/1742831961927--bZtpqWRLE4.jpg',
                    audio: '/uploads/tracks/audio/1742831888649-DEEP-EX-SENSE_-_Inkvizitor_vsegda_prav_58467229.mp3',
                },
            })
        );
    }
    await Promise.all(promises);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })