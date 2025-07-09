import { ClientSocialInterface } from '@/shared/interfaces/social.interface';

export const socialNetworks: ClientSocialInterface[] = [
  {
    network: 'Facebook',
    url: 'https://www.facebook.com',
    icon: 'images/facebook.svg',
    urlRegex: /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9\.]+\/?$/i,
  },
  {
    network: 'X',
    url: 'https://www.twitter.com',
    icon: 'images/facebook.svg',
    urlRegex: /^https:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/i,
  },
  {
    network: 'Instagram',
    url: 'https://www.instagram.com',
    icon: 'images/facebook.svg',
    urlRegex: /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/i,
  },
  {
    network: 'LinkedIn',
    url: 'https://www.linkedin.com/in',
    icon: 'images/linkedin.svg',
    urlRegex: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-]+\/?$/i,
  },
  {
    network: 'Discord',
    url: 'https://www.discord.com/users',
    icon: 'images/discord.svg',
    urlRegex: /^https:\/\/(www\.)?discord\.com\/users\/\d+\/?$/i,
  },
  {
    network: 'Telegram',
    url: 'https://t.me',
    icon: 'images/facebook.svg',
    urlRegex: /^https:\/\/t\.me\/[a-zA-Z0-9_]+\/?$/i,
  },
];
