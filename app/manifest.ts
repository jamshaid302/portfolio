import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Muhammad Jamshaid Khan | Senior Full Stack Engineer',
    short_name: 'Jamshaid',
    description: 'Portfolio of Muhammad Jamshaid Khan. Senior Full Stack Engineer specializing in Microservices, Apache Kafka, React, NestJS, and AWS.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0d1a',
    theme_color: '#0075de',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
